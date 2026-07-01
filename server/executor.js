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
const WANDBOX_COMPILER = 'gcc-head'; // GCC latest stable

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
        'gcc /sandbox/main.c -Wall -Wextra -O3 -o /sandbox/prog 2>&1; echo "::EXIT::$?"'
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
      ['sh', '-c', '/sandbox/prog 2>/sandbox/stderr.txt; echo "::EXIT::$?"'],
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
  const compileError    = exitCode !== 0 && !data.program_output && !!compilerMessage;

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


// ── Local GCC fallback execution ──────────────────────────────────────────────
let _localGccReady = null;

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

async function isLocalGccReady() {
  if (_localGccReady !== null) return _localGccReady;

  // Disable on Render (RENDER=true is auto-set), production, staging, or explicit flag.
  // Local GCC runs code directly on the host machine with NO sandbox — never allow in cloud.
  const isCloud = process.env.RENDER === 'true' || process.env.RAILWAY_ENVIRONMENT || process.env.FLY_APP_NAME;
  const isProdOrStaging = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
  if (isCloud || isProdOrStaging || process.env.DISABLE_LOCAL_GCC === 'true') {
    console.warn('[executor] Local GCC fallback DISABLED — cloud/production environment detected.');
    console.warn('[executor]   Code will fall back to Wandbox API instead.');
    _localGccReady = false;
    return _localGccReady;
  }

  try {
    await execFileAsync('gcc', ['--version'], { timeout: 3000 });
    _localGccReady = true;
    console.warn('[executor] WARNING: Local GCC is available and will be used as a fallback.');
    console.warn('[executor]          This executes user code directly on the host machine without sandboxing!');
  } catch {
    _localGccReady = false;
  }
  return _localGccReady;
}

async function runWithLocalGcc(code, stdin) {
  const startTime = Date.now();
  const runId     = uuidv4();
  const tmpDir    = path.join(os.tmpdir(), `sc-local-${runId}`);
  const isWin     = os.platform() === 'win32';
  const exeExt    = isWin ? '.exe' : '';
  const srcFile   = path.join(tmpDir, 'main.c');
  const exeFile   = path.join(tmpDir, `prog${exeExt}`);

  try {
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.writeFileSync(srcFile, code, 'utf8');

    // Compile
    let compileOut = '';
    let compileExitCode = 0;
    try {
      const cleanEnv = getCleanEnv();
      const { stdout, stderr } = await execFileAsync('gcc', [srcFile, '-Wall', '-Wextra', '-O3', '-o', exeFile], { timeout: COMPILE_TIMEOUT, env: cleanEnv });
      compileOut = (stdout || '') + (stderr || '');
    } catch (err) {
      compileExitCode = err.code || 1;
      compileOut = err.message + '\n' + (err.stdout || '') + (err.stderr || '');
    }

    if (compileExitCode !== 0) {
      const compileStderr = compileOut.replace(new RegExp(tmpDir.replace(/\\/g, '\\\\'), 'g'), '').trim();
      return {
        success:      false,
        stdout:       '',
        stderr:       compileStderr || 'Compilation failed',
        exitCode:     compileExitCode,
        signal:       null,
        killed:       false,
        compileError: true,
        timeMs:       Date.now() - startTime,
        engine:       'local-gcc',
      };
    }

    // Run
    return new Promise((resolve) => {
      const cleanEnv = getCleanEnv();
      const proc = spawn(exeFile, [], { stdio: ['pipe', 'pipe', 'pipe'], env: cleanEnv });
      let stdout = '';
      let stderr = '';
      let killed = false;
      let signal = null;

      if (stdin) {
        proc.stdin.write(stdin);
      }
      proc.stdin.end();

      const MAX_OUTPUT_LIMIT = 512 * 1024; // 512 KB
      proc.stdout.on('data', (d) => {
        if (stdout.length < MAX_OUTPUT_LIMIT) {
          stdout += d.toString();
          if (stdout.length >= MAX_OUTPUT_LIMIT) {
            stdout += '\n... [stdout truncated due to size limit] ...';
          }
        }
      });
      proc.stderr.on('data', (d) => {
        if (stderr.length < MAX_OUTPUT_LIMIT) {
          stderr += d.toString();
          if (stderr.length >= MAX_OUTPUT_LIMIT) {
            stderr += '\n... [stderr truncated due to size limit] ...';
          }
        }
      });

      const timer = setTimeout(() => {
        killed = true;
        signal = 'SIGKILL';
        proc.kill('SIGKILL');
      }, EXEC_TIMEOUT_MS);

      proc.on('close', (code, sig) => {
        clearTimeout(timer);
        resolve({
          success:      code === 0 && !killed,
          stdout:       stdout.trimEnd(),
          stderr:       stderr.trim(),
          exitCode:     code ?? (killed ? 137 : 1),
          signal:       sig || signal,
          killed,
          compileError: false,
          timeMs:       Date.now() - startTime,
          engine:       'local-gcc',
        });
      });

      proc.on('error', (err) => {
        clearTimeout(timer);
        resolve({
          success:      false,
          stdout:       stdout.trimEnd(),
          stderr:       (stderr + '\n' + err.message).trim(),
          exitCode:     -1,
          signal:       null,
          killed:       false,
          compileError: false,
          timeMs:       Date.now() - startTime,
          engine:       'local-gcc',
        });
      });
    });

  } finally {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch { /* ignore */ }
  }
}

// ── Public API ───────────────────────────────────────────────────────────────
/**
 * Execute C code. Automatically chooses Docker, Local GCC, or Piston/Wandbox.
 * @param {string} code
 * @param {string} stdin
 * @returns {Promise<ExecutionResult>}
 */
async function execute(code, stdin = '') {
  const dockerAvailable = await isDockerReady();
  if (dockerAvailable) {
    return runWithDocker(code, stdin);
  }
  const gccAvailable = await isLocalGccReady();
  if (gccAvailable) {
    return runWithLocalGcc(code, stdin);
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

module.exports = { execute, isDockerReady, isLocalGccReady, resetDockerCache };

