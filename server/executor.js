'use strict';
/**
 * executor.js — Core C code execution engine
 *
 * Strategy:
 *   1. On startup, probe whether Docker is available and whether
 *      the gcc-runner image exists.
 *   2. If Docker is ready → run each submission in an ephemeral
 *      Docker container (isolated, resource-limited, time-limited).
 *   3. If Docker is NOT available → fall back to the Piston public
 *      API transparently. The caller never knows the difference.
 *
 * All results are normalised to:
 *   { success, stdout, stderr, exitCode, signal, killed,
 *     compileError, timeMs, engine }
 */

const { execFile, spawn } = require('child_process');
const { promisify }       = require('util');
const fs                  = require('fs');
const https               = require('https');
const os                  = require('os');
const path                = require('path');
const { v4: uuidv4 }      = require('uuid');

const execFileAsync = promisify(execFile);

// ── Constants ────────────────────────────────────────────────────────────────
const DOCKER_IMAGE     = 'gcc-runner:latest';
const EXEC_TIMEOUT_MS  = 10_000;   // 10 s — kills infinite loops
const COMPILE_TIMEOUT  = 10_000;   // 10 s to compile
const MEMORY_LIMIT     = '64m';    // 64 MB RAM per container
const CPU_LIMIT        = '0.5';    // 0.5 CPU cores
const PIDS_LIMIT       = '64';     // max processes inside container

// Wandbox fallback — free, no API key, GCC head (latest), supports stdin
// https://wandbox.org/  |  API docs: https://github.com/melpon/wandbox/blob/master/kennel2/API.rst
const WANDBOX_URL = 'https://wandbox.org/api/compile.json';
const WANDBOX_COMPILER = 'gcc-head-c'; // GCC latest stable C compiler

// ── Docker availability probe ────────────────────────────────────────────────
let _dockerReady = null;  // null = not checked yet, true/false after first check

/**
 * Returns true if Docker daemon is running AND gcc-runner image exists.
 * Result is cached after first call.
 */
async function isDockerReady() {
  if (_dockerReady !== null) return _dockerReady;

  try {
    // Check Docker daemon
    await execFileAsync('docker', ['info'], { timeout: 3000 });

    // Check our image exists
    const { stdout } = await execFileAsync(
      'docker', ['images', '-q', DOCKER_IMAGE],
      { timeout: 3000 }
    );

    _dockerReady = stdout.trim().length > 0;

    if (_dockerReady) {
      console.log('[executor] Docker ready — using Docker engine');
    } else {
      console.warn('[executor] Docker running but gcc-runner image not found');
      console.warn('[executor]   → Run server/build-image.bat to build the image');
      console.warn('[executor]   → Falling back to Piston API');
    }
  } catch {
    _dockerReady = false;
    console.warn('[executor] Docker not available — using Wandbox API fallback');
  }

  return _dockerReady;
}

// Force re-check (called by health endpoint)
function resetDockerCache() {
  _dockerReady = null;
}

// ── Docker execution ─────────────────────────────────────────────────────────
/**
 * Write code to a temp directory, mount it into the Docker container,
 * compile with GCC then run the binary. Stdin is piped in via --init.
 */
async function runWithDocker(code, stdin) {
  const startTime = Date.now();
  const runId     = uuidv4();
  const tmpDir    = path.join(os.tmpdir(), `sc-${runId}`);

  try {
    fs.mkdirSync(tmpDir, { recursive: true });
    const srcFile = path.join(tmpDir, 'main.c');
    fs.writeFileSync(srcFile, code, 'utf8');

    // ── Step 1: Compile ──────────────────────────────────────────────────
    const compileResult = await runDockerCommand(
      tmpDir,
      [
        'sh', '-c',
        'ulimit -f 20480 -v 65536; gcc /sandbox/main.c -Wall -Wextra -O3 -o /sandbox/prog -lm 2>&1; echo "::EXIT::$?"'
      ],
      '',              // no stdin for compilation
      COMPILE_TIMEOUT
    );

    const compileLines  = compileResult.output.split('\n');
    const exitMarker    = compileLines.findLast(l => l.startsWith('::EXIT::'));
    const compileExitCode = exitMarker ? parseInt(exitMarker.replace('::EXIT::', ''), 10) : 1;
    const compileStderr = compileLines
      .filter(l => !l.startsWith('::EXIT::'))
      .join('\n')
      .trim();

    if (compileExitCode !== 0) {
      return {
        success:      false,
        stdout:       '',
        stderr:       compileStderr || 'Compilation failed',
        exitCode:     compileExitCode,
        signal:       null,
        killed:       compileResult.killed,
        compileError: true,
        timeMs:       Date.now() - startTime,
        engine:       'docker',
      };
    }

    // ── Step 2: Run ──────────────────────────────────────────────────────
    const runResult = await runDockerCommand(
      tmpDir,
      ['sh', '-c', 'ulimit -f 20480 -v 32768; /sandbox/prog 2>/sandbox/stderr.txt; echo "::EXIT::$?"'],
      stdin,
      EXEC_TIMEOUT_MS
    );

    // Read stderr from file (so we can separate it from stdout)
    let runtimeStderr = '';
    const stderrFile = path.join(tmpDir, 'stderr.txt');
    if (fs.existsSync(stderrFile)) {
      runtimeStderr = fs.readFileSync(stderrFile, 'utf8').trim();
    }

    const runLines   = runResult.output.split('\n');
    const runMarker  = runLines.findLast(l => l.startsWith('::EXIT::'));
    const runExit    = runMarker ? parseInt(runMarker.replace('::EXIT::', ''), 10) : (runResult.killed ? 137 : 1);
    const runStdout  = runLines
      .filter(l => !l.startsWith('::EXIT::'))
      .join('\n')
      .trimEnd();

    const fullStderr = [compileStderr, runtimeStderr].filter(Boolean).join('\n').trim();

    return {
      success:      runExit === 0 && !runResult.killed,
      stdout:       runStdout,
      stderr:       fullStderr,
      exitCode:     runExit,
      signal:       runResult.signal,
      killed:       runResult.killed,
      compileError: false,
      timeMs:       Date.now() - startTime,
      engine:       'docker',
    };

  } finally {
    // Always clean up temp files
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch { /* ignore */ }
  }
}

/**
 * Spawn a single Docker container with strict resource limits.
 * Returns { output, killed, signal }.
 */
function runDockerCommand(mountDir, command, stdin, timeoutMs) {
  return new Promise((resolve) => {
    const containerName = `sc-exec-${uuidv4()}`;
    // Convert Windows path to Docker-compatible format
    const mountPath = mountDir.replace(/\\/g, '/').replace(/^([A-Z]):/, (_, d) => `//${d.toLowerCase()}`);

    const args = [
      'run',
      '--rm',                          // auto-remove container after exit
      '--name', containerName,
      '--init',                         // proper PID 1 (handles signals correctly)
      '--network', 'none',              // no network access
      '--memory', MEMORY_LIMIT,         // RAM cap
      '--cpus', CPU_LIMIT,              // CPU cap
      '--pids-limit', PIDS_LIMIT,       // fork bomb prevention
      '--read-only',                    // read-only root filesystem
      '--tmpfs', '/tmp:size=10m',       // writable /tmp (10 MB max)
      '-v', `${mountPath}:/sandbox`,    // mount code directory
      '--user', 'runner',               // non-root user
      '--cap-drop', 'ALL',              // drop all Linux capabilities
      '--security-opt', 'no-new-privileges',
      DOCKER_IMAGE,
      ...command,
    ];

    let output  = '';
    let killed  = false;
    let signal  = null;
    let timer;

    const proc = spawn('docker', args, { stdio: ['pipe', 'pipe', 'pipe'] });

    // Pipe stdin to the container
    if (stdin) {
      proc.stdin.write(stdin);
    }
    proc.stdin.end();

    const MAX_OUTPUT_LIMIT = 512 * 1024; // 512 KB
    proc.stdout.on('data', (d) => {
      if (output.length < MAX_OUTPUT_LIMIT) {
        output += d.toString();
        if (output.length >= MAX_OUTPUT_LIMIT) {
          output += '\n... [stdout truncated due to size limit] ...';
        }
      }
    });
    proc.stderr.on('data', (d) => {
      if (output.length < MAX_OUTPUT_LIMIT) {
        output += d.toString();
        if (output.length >= MAX_OUTPUT_LIMIT) {
          output += '\n... [stderr truncated due to size limit] ...';
        }
      }
    }); // capture docker errors

    proc.on('close', (code, sig) => {
      clearTimeout(timer);
      signal = sig;
      // Exit 137 = SIGKILL (our timeout or OOM)
      if (code === 137 || sig === 'SIGKILL') killed = true;
      resolve({ output, killed, signal });
    });

    proc.on('error', (err) => {
      clearTimeout(timer);
      resolve({ output: `Docker error: ${err.message}`, killed: false, signal: null });
    });

    // Hard timeout — kill the container if it runs too long
    timer = setTimeout(() => {
      killed = true;
      signal = 'SIGKILL';
      proc.kill('SIGKILL');
      // Also force-kill the Docker container (belt and suspenders)
      try {
        execFile('docker', ['kill', containerName], () => {});
      } catch { /* ignore */ }
    }, timeoutMs);
  });
}

// ── Wandbox fallback execution (free, no API key needed) ──────────────────────
async function runWithWandbox(code, stdin) {
  const startTime = Date.now();

  const body = {
    compiler: WANDBOX_COMPILER,
    code,
    stdin:   stdin || '',
    options: 'warning,optimize',
    'compiler-option-raw': '-lm',   // link math library (sin, cos, sqrt, etc.)
  };

  let data;
  try {
    data = await httpsPost(WANDBOX_URL, body, 20_000);
  } catch (err) {
    const msg = err.message === 'RATE_LIMITED'
      ? 'Execution service is busy. Try again in a moment.'
      : `Could not reach execution service: ${err.message}`;
    return {
      success: false, stdout: '', stderr: msg,
      exitCode: -1, signal: null, killed: false, compileError: false,
      timeMs: Date.now() - startTime, engine: 'wandbox',
    };
  }

  const timeMs = Date.now() - startTime;

  const compilerMessage = (data.compiler_error || data.compiler_output || '').trim();
  const exitCode        = parseInt(data.status ?? '0', 10);
  const killed          = data.signal === 'Killed' || data.signal === 'TLE';
  // Compile error = non-zero exit AND compiler produced error text AND no program output
  const compileError    = exitCode !== 0 && !!(data.compiler_error || '').trim() && !data.program_output;

  return {
    success:      exitCode === 0 && !killed,
    stdout:       (data.program_output || '').trimEnd(),
    stderr:       compilerMessage,
    exitCode,
    signal:       data.signal || null,
    killed,
    compileError,
    timeMs,
    engine:       'wandbox',
  };
}


// ── Local GCC fallback execution (Stubbed to false for security/pentesting) ──
async function isLocalGccReady() {
  return false;
}

// ── Dangerous code scanner ────────────────────────────────────────────────────
/**
 * Patterns for system-level calls that are not allowed in the sandbox.
 * These calls attempt to interact with the host OS shell, file system,
 * or spawn child processes — all of which are blocked for security.
 */
const DANGEROUS_PATTERNS = [
  { re: /\bsystem\s*\(/, label: 'system()' },
  { re: /\bpopen\s*\(/,  label: 'popen()' },
  { re: /\bexecv[ep]?\s*\(/, label: 'execv/execvp/execve()' },
  { re: /\bexecl[ep]?\s*\(/, label: 'execl/execlp/execle()' },
  { re: /\bexecve\s*\(/, label: 'execve()' },
  { re: /\bfork\s*\(/,   label: 'fork()' },
  { re: /\bvfork\s*\(/,  label: 'vfork()' },
  { re: /\bshellcode\b/, label: 'shellcode' },
];

/**
 * Checks whether the submitted code contains dangerous system-level calls.
 * Returns a blocked result object if dangerous, or null if safe to run.
 * Ignores content inside single-line (//) and multi-line (/* *\/) comments.
 */
function checkDangerousCode(code) {
  // Strip single-line comments
  let stripped = code.replace(/\/\/.*/g, '');
  // Strip multi-line comments
  stripped = stripped.replace(/\/\*[\s\S]*?\*\//g, '');
  // Strip string literals to avoid false positives like printf("system(\"ls\")")
  stripped = stripped.replace(/"(?:[^"\\]|\\.)*"/g, '""');
  stripped = stripped.replace(/'(?:[^'\\]|\\.)*'/g, "''");

  for (const { re, label } of DANGEROUS_PATTERNS) {
    if (re.test(stripped)) {
      return {
        success:      false,
        stdout:       '',
        stderr:       `This environment does not support \`${label}\`. System-level calls that spawn shell commands or processes are not allowed in this sandbox.\n\nNote: This is an intentional security restriction — not a bug in your code.`,
        exitCode:     1,
        signal:       null,
        killed:       false,
        compileError: false,
        timeMs:       0,
        engine:       'blocked',
      };
    }
  }
  return null;
}

// ── Public API ───────────────────────────────────────────────────────────────
/**
 * Execute C code. Automatically chooses Docker or Wandbox.
 * @param {string} code
 * @param {string} stdin
 * @returns {Promise<ExecutionResult>}
 */
async function execute(code, stdin = '') {
  // Block dangerous system-level calls before they reach any engine
  const blocked = checkDangerousCode(code);
  if (blocked) return blocked;

  const dockerAvailable = await isDockerReady();
  if (dockerAvailable) {
    return runWithDocker(code, stdin);
  }
  return runWithWandbox(code, stdin);
}

/**
 * Simple HTTPS POST helper using Node built-ins.
 * Returns parsed JSON or throws.
 */
function httpsPost(url, body, timeoutMs = 20_000) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body);
    const parsed  = new URL(url);

    const options = {
      hostname: parsed.hostname,
      path:     parsed.pathname + parsed.search,
      method:   'POST',
      headers:  {
        'Content-Type':   'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent':     'smart-compiler/1.0',
      },
    };

    const req = https.request(options, (res) => {
      let raw = '';
      res.on('data', (chunk) => { raw += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(raw);
          if (res.statusCode === 429) {
            reject(new Error('RATE_LIMITED'));
          } else if (res.statusCode >= 400) {
            reject(new Error(`Piston HTTP ${res.statusCode}: ${raw.slice(0, 200)}`));
          } else {
            resolve(json);
          }
        } catch {
          reject(new Error(`Invalid JSON from Piston: ${raw.slice(0, 200)}`));
        }
      });
    });

    const timer = setTimeout(() => {
      req.destroy();
      reject(new Error('Piston request timed out'));
    }, timeoutMs);

    req.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });

    req.on('close', () => clearTimeout(timer));
    req.write(payload);
    req.end();
  });
}

module.exports = { execute, isDockerReady, resetDockerCache, checkDangerousCode };

