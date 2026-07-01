'use strict';
/**
 * ws-executor.js — WebSocket interactive C execution via node-pty
 *
 * Architecture (PTY mode — like OnlineGDB / CS50 IDE):
 *
 *   Browser xterm.js  ──WS──▶  node-pty (server)  ──PTY──▶  docker run -i ... /prog
 *
 * Why PTY?
 *   • Without PTY, libc fully-buffers stdout (printf hangs until program exits)
 *   • Without PTY, Ctrl+C/Ctrl+D can't be delivered as terminal signals
 *   • PTY provides echo, line-discipline, and signal delivery for free
 *
 * Extra fix — STDIO_INIT prepended to every user program:
 *   Forces stdout/stderr/stdin to be fully unbuffered via setvbuf().
 *   This ensures printf("prompt: ") appears immediately even without \n.
 *   A #line directive resets gcc error line numbers so they match the user's code.
 *
 * Protocol (JSON over WebSocket):
 *   Client → Server:
 *     { type: 'run',    code, cols, rows }
 *     { type: 'stdin',  data }   ← raw keystrokes (PTY handles echo + signals)
 *     { type: 'resize', cols, rows }
 *     { type: 'kill' }
 *
 *   Server → Client:
 *     { type: 'status',        data: 'compiling'|'running' }
 *     { type: 'output',        data }   ← raw PTY bytes (stdout+stderr+echo, ANSI OK)
 *     { type: 'compile-error', data }
 *     { type: 'done',          exitCode, timeMs, killed, signal }
 *     { type: 'error',         data }
 *     { type: 'engine',        data: 'docker'|'wandbox' }
 */

const { WebSocketServer } = require('ws');
const { spawn, execFile }  = require('child_process');
const { promisify }        = require('util');
const fs                   = require('fs');
const os                   = require('os');
const path                 = require('path');
const { v4: uuidv4 }       = require('uuid');
const https                = require('https');

// node-pty: graceful degradation if not installed
let nodePty = null;
try {
  nodePty = require('node-pty');
  console.log('[ws-executor] node-pty loaded — PTY mode active');
} catch (e) {
  console.warn('[ws-executor] node-pty not available — falling back to plain spawn');
  console.warn('[ws-executor]   Run: cd server && npm install node-pty');
}

const execFileAsync = promisify(execFile);

// ── Supabase JWT verification ─────────────────────────────────────────────────────────────────
const SUPABASE_URL      = process.env.VITE_SUPABASE_URL      || '';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || '';

async function verifySupabaseToken(token) {
  if (!token) return null;
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

// ── Per-IP WebSocket rate limiting ─────────────────────────────────────────────────────────
const WS_CONNECTIONS_PER_IP = new Map(); // ip → count
const MAX_WS_PER_IP = 5; // max simultaneous WebSocket connections per IP

// ── Constants ────────────────────────────────────────────────────────────────
const DOCKER_IMAGE    = 'gcc-runner:latest';
const COMPILE_TIMEOUT = 12_000;   // 12 s compile timeout
const EXEC_TIMEOUT_MS = 30_000;   // 30 s TLE (interactive programs need more time)
const MEMORY_LIMIT    = '64m';
const CPU_LIMIT       = '0.5';
const PIDS_LIMIT      = '64';

const WANDBOX_URL      = 'https://wandbox.org/api/compile.json';
const WANDBOX_COMPILER = 'gcc-head';

/**
 * Prepended to every user program before compilation.
 *
 * 1. Forces stdio fully unbuffered so output appears immediately.
 * 2. #line 1 "main.c" resets GCC error reporting so line numbers
 *    match the user's code (not our prepended lines).
 */
const STDIO_INIT = `\
#ifndef __SMART_COMPILER_INIT__
#define __SMART_COMPILER_INIT__
#include <stdio.h>
#include <stdlib.h>
static void __attribute__((constructor,used)) __sc_io_init__(void) {
  setvbuf(stdout, NULL, _IONBF, 0);
  setvbuf(stderr, NULL, _IONBF, 0);
  setvbuf(stdin,  NULL, _IONBF, 0);
}
#endif
#line 1 "main.c"
`;

/**
 * Strip PTY-only control sequences that node-pty / ConPTY inject into the
 * output stream but that are never part of a user program's actual output.
 * These sequences cause xterm.js to display artifacts like "[I" or "[?2004h"
 * when they arrive split across WebSocket frames.
 *
 * Sequences removed:
 *   ESC [ ? ... h/l  — private DEC modes (bracketed paste, alt screen, cursor keys)
 *   ESC [ I          — CHT (Cursor Forward Tabulation) — PTY tab init
 *   ESC [ 1 ; ... r  — DECSTBM (scroll region) — PTY window init
 *   ESC =  / ESC >   — keypad application / numeric mode
 *   ESC 7 / ESC 8    — save / restore cursor (DECSC/DECRC)
 */
function stripPtyNoise(data) {
  return data
    // Private DEC mode sequences: ESC [ ? <params> h/l  (e.g. ?2004h, ?1049h, ?1h)
    .replace(/\x1b\[\?[\d;]*[hl]/g, '')
    // CHT — Cursor Forward Tabulation: ESC [ <n> I
    .replace(/\x1b\[\d*I/g, '')
    // Scroll-region (DECSTBM): ESC [ <top> ; <bot> r
    .replace(/\x1b\[\d*;\d*r/g, '')
    // Keypad mode switches: ESC = and ESC >
    .replace(/\x1b[=>]/g, '')
    // Save/restore cursor (DECSC / DECRC): ESC 7 and ESC 8
    .replace(/\x1b[78]/g, '');
}

// ── Docker probe ─────────────────────────────────────────────────────────────
let _dockerReady = null;

async function isDockerReady() {
  if (_dockerReady !== null) return _dockerReady;
  try {
    await execFileAsync('docker', ['info'], { timeout: 3000 });
    const { stdout } = await execFileAsync(
      'docker', ['images', '-q', DOCKER_IMAGE], { timeout: 3000 }
    );
    _dockerReady = stdout.trim().length > 0;
    if (_dockerReady) {
      console.log('[ws-executor] Docker ready — using Docker engine');
    } else {
      console.warn('[ws-executor] gcc-runner image not found — using Wandbox fallback');
    }
  } catch {
    _dockerReady = false;
    console.warn('[ws-executor] Docker not available — using Wandbox fallback');
  }
  return _dockerReady;
}

function resetDockerCache() { _dockerReady = null; }

function getCleanEnv() {
  const cleanEnv = {};
  const safeKeys = [
    'PATH',
    'TERM',
    'TMPDIR',
    'TEMP',
    'TMP',
    'SystemRoot',
    'windir',
    'USER',
    'USERNAME',
    'HOME',
    'HOMEPATH',
    'HOMEDRIVE'
  ];
  for (const key of safeKeys) {
    if (process.env[key] !== undefined) {
      cleanEnv[key] = process.env[key];
    }
  }
  return cleanEnv;
}

let _localGccReady = null;
async function isLocalGccReady() {
  if (_localGccReady !== null) return _localGccReady;

  const isProdOrStaging = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
  if (process.env.DISABLE_LOCAL_GCC === 'true' || isProdOrStaging) {
    console.warn('[ws-executor] Local GCC fallback disabled for security (production/staging or DISABLE_LOCAL_GCC is set)');
    _localGccReady = false;
    return _localGccReady;
  }

  try {
    await execFileAsync('gcc', ['--version'], { timeout: 3000 });
    _localGccReady = true;
    console.warn('[ws-executor] WARNING: Local GCC is available and will be used as a fallback.');
    console.warn('[ws-executor]          This executes user code directly on the host machine without sandboxing!');
  } catch {
    _localGccReady = false;
  }
  return _localGccReady;
}

// ── Windows path → Docker mount path ─────────────────────────────────────────
function toDockerPath(p) {
  return p.replace(/\\/g, '/').replace(/^([A-Z]):/, (_, d) => `//${d.toLowerCase()}`);
}

// ── Shared Docker base args for the run step ──────────────────────────────────
function buildRunArgs(mountPath, runId) {
  const args = [
    'run', '--rm', '--init',
    '-i',                              // keep stdin pipe open
    '--network', 'none',               // no network inside container
    '--memory', MEMORY_LIMIT,
    '--cpus', CPU_LIMIT,
    '--pids-limit', PIDS_LIMIT,
    '--read-only',                     // read-only root filesystem
    '--tmpfs', '/tmp:size=10m',        // writable /tmp only
    '-v', `${mountPath}:/sandbox`,
    '--user', 'runner',                // non-root
    '--cap-drop', 'ALL',
    '--security-opt', 'no-new-privileges',
    '-e', 'TERM=xterm-256color',
  ];
  if (runId) {
    args.push('--name', `sc-run-${runId}`);
  }
  args.push(DOCKER_IMAGE, '/sandbox/prog');
  return args;
}

// ── Attach WebSocket server ───────────────────────────────────────────────────
function attachWebSocketServer(httpServer) {
  const wss = new WebSocketServer({ server: httpServer, path: '/ws/run' });

  wss.on('connection', (ws, req) => {
    // ── Per-IP rate limiting ────────────────────────────────────────────────────
    const clientIp = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
      || req.socket?.remoteAddress
      || 'unknown';

    const currentCount = WS_CONNECTIONS_PER_IP.get(clientIp) || 0;
    if (currentCount >= MAX_WS_PER_IP) {
      console.warn(`[ws-executor] Rejected connection from ${clientIp} — too many open connections (${currentCount})`);
      ws.close(1008, 'Too many connections from your IP. Please try again.');
      return;
    }
    WS_CONNECTIONS_PER_IP.set(clientIp, currentCount + 1);

    // Decrement count when this connection closes
    let countDecremented = false;
    const onWsClose = () => {
      if (countDecremented) return;
      countDecremented = true;
      const n = WS_CONNECTIONS_PER_IP.get(clientIp) || 1;
      if (n <= 1) WS_CONNECTIONS_PER_IP.delete(clientIp);
      else WS_CONNECTIONS_PER_IP.set(clientIp, n - 1);
    };
    ws.on('close', onWsClose);
    ws.on('error', onWsClose);

    let ptyProc     = null;   // node-pty process (PTY mode)
    let plainProc   = null;   // regular child_process (fallback)
    let compileProc = null;   // active compiler process
    let runId       = null;   // active run/execution ID
    let tmpDir      = null;
    let killTimer   = null;
    let cleaned     = false;
    let startTime   = 0;
    let cols        = 80;
    let rows        = 24;

    // ── Helpers ───────────────────────────────────────────────────────────
    function send(obj) {
      if (ws.readyState === 1 /* OPEN */) ws.send(JSON.stringify(obj));
    }

    function cleanup() {
      if (cleaned) return;
      cleaned = true;
      if (killTimer) clearTimeout(killTimer);
      if (ptyProc)   { try { ptyProc.kill('SIGKILL');   } catch {} ptyProc   = null; }
      if (plainProc && !plainProc.killed) {
        try { plainProc.kill('SIGKILL'); } catch {}
        plainProc = null;
      }
      if (compileProc && !compileProc.killed) {
        try { compileProc.kill('SIGKILL'); } catch {}
        compileProc = null;
      }
      if (runId) {
        try {
          execFile('docker', ['kill', `sc-compile-${runId}`], () => {});
          execFile('docker', ['kill', `sc-run-${runId}`], () => {});
        } catch {}
      }
      if (tmpDir) {
        try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
        tmpDir = null;
      }
    }

    // ── Message handler ───────────────────────────────────────────────────
    ws.on('message', async (raw) => {
      let msg;
      try { msg = JSON.parse(raw.toString()); } catch { return; }

      // ── stdin: forward raw keystrokes to PTY/process ──────────────────
      if (msg.type === 'stdin') {
        if (ptyProc) {
          try { ptyProc.write(msg.data); } catch {}
        } else if (plainProc?.stdin && !plainProc.stdin.destroyed) {
          try { plainProc.stdin.write(msg.data); } catch {}
        }
        return;
      }

      // ── resize: update PTY dimensions ────────────────────────────────
      if (msg.type === 'resize') {
        cols = Math.max(10, msg.cols || 80);
        rows = Math.max(4,  msg.rows || 24);
        if (ptyProc) { try { ptyProc.resize(cols, rows); } catch {} }
        return;
      }

      // ── kill: force-terminate ─────────────────────────────────────────
      if (msg.type === 'kill') {
        cleanup();
        send({ type: 'done', exitCode: -1, timeMs: 0, killed: true, signal: null });
        return;
      }

      // ── run: compile then execute ────────────────────────────────────────────────
      if (msg.type !== 'run') return;

      const { code, token } = msg;
      cols = Math.max(10, msg.cols || 80);
      rows = Math.max(4,  msg.rows || 24);

      // ── JWT verification — reject unauthenticated users before touching Docker ──
      const wsUser = await verifySupabaseToken(token);
      if (!wsUser?.id) {
        send({ type: 'error', data: 'Unauthorized: Please log in to compile and run code.' });
        cleanup();
        return;
      }

      if (!code?.trim()) {
        send({ type: 'error', data: 'No code provided.' });
        return;
      }

      cleaned = false;
      runId = uuidv4();
      tmpDir = path.join(os.tmpdir(), `sc-ws-${runId}`);
      fs.mkdirSync(tmpDir, { recursive: true });

      // Write code with stdio init prepended + #line directive for correct error lines
      fs.writeFileSync(path.join(tmpDir, 'main.c'), STDIO_INIT + code, 'utf8');

      const dockerAvailable = await isDockerReady();

      // ── Local GCC fallback or Wandbox ─────────────────────────────────
      if (!dockerAvailable) {
        const localGccAvailable = await isLocalGccReady();
        if (localGccAvailable) {
          send({ type: 'engine', data: 'local-gcc' });
          send({ type: 'status', data: 'compiling' });

          const isWin = os.platform() === 'win32';
          const exeExt = isWin ? '.exe' : '';
          const exeFile = path.join(tmpDir, `prog${exeExt}`);
          const srcFile = path.join(tmpDir, 'main.c');

          let compileOut = '';
          let compileTimeout = false;
          let compileExitCode = 0;

          await new Promise((resolve) => {
            const cleanEnv = getCleanEnv();
            compileProc = spawn('gcc', [srcFile, '-Wall', '-Wextra', '-O3', '-D__USE_MINGW_ANSI_STDIO', '-o', exeFile], { stdio: ['ignore', 'pipe', 'pipe'], env: cleanEnv });
            compileProc.stdout.on('data', d => { compileOut += d.toString(); });
            compileProc.stderr.on('data', d => { compileOut += d.toString(); });
            const t = setTimeout(() => { if (compileProc) compileProc.kill(); compileTimeout = true; resolve(); }, COMPILE_TIMEOUT);
            compileProc.on('close', (code) => { compileExitCode = code; clearTimeout(t); resolve(); });
            compileProc.on('error', err => {
              clearTimeout(t);
              compileTimeout = true;
              compileOut += `\nLocal GCC error: ${err.message}`;
              resolve();
            });
          });
          compileProc = null;

          const compileMsg = compileOut.replace(new RegExp(tmpDir.replace(/\\/g, '\\\\'), 'g'), '').trim();

          if (compileTimeout || compileExitCode !== 0) {
            send({ type: 'compile-error', data: compileMsg || 'Compilation failed.' });
            cleanup();
            return;
          }

          if (compileMsg) {
            send({ type: 'output', data: `\x1b[33m${compileMsg}\x1b[0m\r\n` });
          }

          // ── Step 2: Run ───────────────────────────────────────────────────
          send({ type: 'status', data: 'running' });
          startTime = Date.now();

          if (nodePty) {
            try {
              const cleanEnv = getCleanEnv();
              cleanEnv.TERM = 'xterm-256color';
              ptyProc = nodePty.spawn(exeFile, [], {
                name:  'xterm-256color',
                cols,
                rows,
                cwd:   tmpDir,
                env:   cleanEnv,
              });
            } catch (err) {
              send({ type: 'error', data: `Failed to start local program: ${err.message}` });
              cleanup();
              return;
            }

            ptyProc.onData(data => {
              if (!cleaned) {
                const out = stripPtyNoise(data);
                if (out) send({ type: 'output', data: out });
              }
            });

            ptyProc.onExit(({ exitCode: ec, signal: sig }) => {
              if (cleaned) return;
              const timeMs = Date.now() - startTime;
              const killed = ec === 137 || sig === 9;
              send({
                type:     'done',
                exitCode: ec ?? 1,
                timeMs,
                killed,
                signal:   sig ?? null,
              });
              cleanup();
            });

          } else {
            const cleanEnv = getCleanEnv();
            plainProc = spawn(exeFile, [], { cwd: tmpDir, stdio: ['pipe', 'pipe', 'pipe'], env: cleanEnv });

            const normalize = d => d.toString().replace(/\r?\n/g, '\r\n');

            plainProc.stdout.on('data', d => { if (!cleaned) send({ type: 'output', data: normalize(d) }); });
            plainProc.stderr.on('data', d => { if (!cleaned) send({ type: 'output', data: normalize(d) }); });

            plainProc.on('close', (code, sig) => {
              if (cleaned) return;
              const timeMs = Date.now() - startTime;
              const killed = code === 137 || sig === 'SIGKILL';
              send({ type: 'done', exitCode: code ?? 1, timeMs, killed, signal: sig ?? null });
              cleanup();
            });

            plainProc.on('error', err => {
              if (!cleaned) send({ type: 'error', data: `Runtime error: ${err.message}` });
              cleanup();
            });
          }

          killTimer = setTimeout(() => {
            if (!cleaned) {
              console.warn(`[ws-executor] Local TLE — killing after ${EXEC_TIMEOUT_MS}ms`);
              if (ptyProc)   { try { ptyProc.kill('SIGKILL');  } catch {} }
              if (plainProc) { try { plainProc.kill('SIGKILL'); } catch {} }
            }
          }, EXEC_TIMEOUT_MS);

          return;
        }

        // Wandbox fallback
        send({ type: 'engine', data: 'wandbox' });
        send({ type: 'status', data: 'compiling' });
        await runWithWandbox(code, send);
        cleanup();
        return;
      }

      send({ type: 'engine', data: 'docker' });
      send({ type: 'status', data: 'compiling' });

      // ── Step 1: Compile (no PTY needed) ──────────────────────────────
      const mountPath = toDockerPath(tmpDir);

      const compileArgs = [
        'run', '--rm', '--init', '--network', 'none',
        '--name', `sc-compile-${runId}`,
        '--memory', MEMORY_LIMIT, '--cpus', CPU_LIMIT,
        '--pids-limit', PIDS_LIMIT, '--read-only',
        '--tmpfs', '/tmp:size=10m',
        '-v', `${mountPath}:/sandbox`,
        '--user', 'runner', '--cap-drop', 'ALL',
        '--security-opt', 'no-new-privileges',
        DOCKER_IMAGE,
        'sh', '-c',
        // Compile, capture all output (stdout + stderr merged), print exit code
        'gcc /sandbox/main.c -Wall -Wextra -O3 -D__USE_MINGW_ANSI_STDIO -o /sandbox/prog 2>&1; echo "::CEXIT::$?"',
      ];

      let compileOut     = '';
      let compileTimeout = false;

      await new Promise((resolve) => {
        compileProc = spawn('docker', compileArgs, { stdio: ['ignore', 'pipe', 'pipe'] });
        compileProc.stdout.on('data', d => { compileOut += d.toString(); });
        compileProc.stderr.on('data', d => { compileOut += d.toString(); });
        const t = setTimeout(() => { if (compileProc) compileProc.kill(); compileTimeout = true; resolve(); }, COMPILE_TIMEOUT);
        compileProc.on('close', () => { clearTimeout(t); resolve(); });
        compileProc.on('error', err => {
          clearTimeout(t);
          compileTimeout = true;
          compileOut += `\nDocker error: ${err.message}`;
          resolve();
        });
      });
      compileProc = null;

      // Parse compile result
      const compileLines = compileOut.split('\n');
      const exitMarker   = compileLines.find(l => l.startsWith('::CEXIT::'));
      const exitCode     = exitMarker ? parseInt(exitMarker.replace('::CEXIT::', '').trim(), 10) : 1;

      // Clean up output: remove exit marker and /sandbox/ path prefix
      // (The #line directive makes gcc report "main.c" directly, so /sandbox/ shouldn't appear
      //  but we strip it anyway as defence in depth)
      const compileMsg = compileLines
        .filter(l => !l.startsWith('::CEXIT::'))
        .join('\n')
        .replace(/\/sandbox\//g, '')
        .trim();

      if (compileTimeout || exitCode !== 0) {
        send({ type: 'compile-error', data: compileMsg || 'Compilation failed.' });
        cleanup();
        return;
      }

      // Emit warnings even on success (exitCode === 0 but gcc printed something)
      if (compileMsg) {
        send({ type: 'output', data: `\x1b[33m${compileMsg}\x1b[0m\r\n` });
      }

      // ── Step 2: Run ───────────────────────────────────────────────────
      send({ type: 'status', data: 'running' });
      startTime = Date.now();

      const runArgs = buildRunArgs(mountPath, runId);

      if (nodePty) {
        // ── PTY mode (node-pty) ───────────────────────────────────────
        // node-pty creates a real pseudo-terminal on the host.
        // The PTY driver handles: echo, line-editing, Ctrl+C (SIGINT), Ctrl+D (EOF).
        // The setvbuf() in STDIO_INIT forces unbuffered I/O inside the container.
        try {
          const ptyEnv = getCleanEnv();
          ptyEnv.TERM = 'xterm-256color';
          ptyProc = nodePty.spawn('docker', runArgs, {
            name:  'xterm-256color',
            cols,
            rows,
            cwd:   os.tmpdir(),
            env:   ptyEnv,  // ✅ only safe keys — no API keys or secrets
          });
        } catch (err) {
          send({ type: 'error', data: `Failed to start program: ${err.message}` });
          cleanup();
          return;
        }

        ptyProc.onData(data => {
          if (!cleaned) {
            const out = stripPtyNoise(data);
            if (out) send({ type: 'output', data: out });
          }
        });

        ptyProc.onExit(({ exitCode: ec, signal: sig }) => {
          if (cleaned) return;
          const timeMs = Date.now() - startTime;
          // exit 137 = SIGKILL (OOM or our TLE timer)
          const killed = ec === 137 || sig === 9;
          send({
            type:     'done',
            exitCode: ec ?? 1,
            timeMs,
            killed,
            signal:   sig ?? null,
          });
          cleanup();
        });

      } else {
        // ── Plain spawn fallback (no node-pty) ────────────────────────
        // Output is pipe-based; normalize \n → \r\n for xterm.js.
        plainProc = spawn('docker', runArgs, { stdio: ['pipe', 'pipe', 'pipe'] });

        const normalize = d => d.toString().replace(/\r?\n/g, '\r\n');

        plainProc.stdout.on('data', d => { if (!cleaned) send({ type: 'output', data: normalize(d) }); });
        plainProc.stderr.on('data', d => { if (!cleaned) send({ type: 'output', data: normalize(d) }); });

        plainProc.on('close', (code, sig) => {
          if (cleaned) return;
          const timeMs = Date.now() - startTime;
          const killed = code === 137 || sig === 'SIGKILL';
          send({ type: 'done', exitCode: code ?? 1, timeMs, killed, signal: sig ?? null });
          cleanup();
        });

        plainProc.on('error', err => {
          if (!cleaned) send({ type: 'error', data: `Runtime error: ${err.message}` });
          cleanup();
        });
      }

      // Hard TLE — kills whatever is running after EXEC_TIMEOUT_MS
      killTimer = setTimeout(() => {
        if (cleaned) return;
        console.warn(`[ws-executor] TLE — killing after ${EXEC_TIMEOUT_MS}ms`);
        if (ptyProc)   { try { ptyProc.kill('SIGKILL');  } catch {} }
        if (plainProc) { try { plainProc.kill('SIGKILL'); } catch {} }
      }, EXEC_TIMEOUT_MS);
    });

    ws.on('close', cleanup);
    ws.on('error', cleanup);
  });

  return wss;
}

// ── Wandbox batch fallback (no Docker) ───────────────────────────────────────
async function runWithWandbox(code, send) {
  const startTime = Date.now();
  const body = JSON.stringify({
    compiler: WANDBOX_COMPILER,
    code,        // send original code — Wandbox doesn't need our setvbuf wrapper
    stdin:   '',
    options: 'warning,optimize',
  });

  return new Promise((resolve) => {
    const options = {
      hostname: 'wandbox.org',
      path:     '/api/compile.json',
      method:   'POST',
      headers: {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(body),
        'User-Agent':     'smart-compiler/1.0',
      },
    };

    const req = https.request(options, res => {
      let raw = '';
      res.on('data', c => { raw += c; });
      res.on('end', () => {
        try {
          const data    = JSON.parse(raw);
          const ec      = parseInt(data.status ?? '0', 10);
          const killed  = data.signal === 'Killed';
          const cMsg    = (data.compiler_error || data.compiler_output || '').trim();

          if (cMsg) {
            if (ec !== 0 && !data.program_output) {
              send({ type: 'compile-error', data: cMsg });
            } else {
              send({ type: 'output', data: `\x1b[33m${cMsg}\x1b[0m\r\n` });
            }
          }
          if (data.program_output) {
            // Normalize line endings for xterm.js
            send({ type: 'output', data: data.program_output.replace(/\r?\n/g, '\r\n') });
          }
          send({ type: 'done', exitCode: ec, timeMs: Date.now() - startTime, killed, signal: data.signal || null });
        } catch {
          send({ type: 'error', data: 'Wandbox returned invalid response.' });
        }
        resolve();
      });
    });

    const t = setTimeout(() => {
      req.destroy();
      send({ type: 'error', data: 'Wandbox timed out.' });
      resolve();
    }, 20_000);

    req.on('error', e => { clearTimeout(t); send({ type: 'error', data: e.message }); resolve(); });
    req.on('close', () => clearTimeout(t));
    req.write(body);
    req.end();
  });
}

module.exports = { attachWebSocketServer, resetDockerCache };
