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
      console.warn('[executor] Docker running but gcc-runner image not found. Attempting auto-build...');
      const dockerfileGcc = path.join(__dirname, 'Dockerfile.gcc');
      if (fs.existsSync(dockerfileGcc)) {
        try {
          console.log('[executor] Auto-building gcc-runner:latest Docker image...');
          await execFileAsync('docker', ['build', '-f', dockerfileGcc, '-t', DOCKER_IMAGE, __dirname], { timeout: 120_000 });
          _dockerReady = true;
          console.log('[executor] ✅ gcc-runner image auto-built successfully!');
          return _dockerReady;
        } catch (buildErr) {
          console.warn('[executor] Auto-build failed:', buildErr.message);
        }
      }
      console.warn('[executor]   → Falling back to Wandbox API');
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
  const baseTmp   = process.env.COMPILER_TMP_DIR || (process.platform === 'win32' ? os.tmpdir() : '/data/compiler-tmp');
  const tmpDir    = path.join(baseTmp, `sc-${runId}`);

  try {
    fs.mkdirSync(tmpDir, { recursive: true });
    try { fs.chmodSync(tmpDir, 0o777); } catch {}
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


// ── Local GCC execution (primary engine in production) ───────────────────────
// The production Dockerfile (Stage 3) installs GCC directly into the container.
// This means we can compile and run C code locally without docker-in-docker.
// Docker-in-docker was the root cause of the 24-hour restart bug where
// gcc-runner:latest would disappear and cause "Unable to find image" errors.
let _localGccReady = null;

async function isLocalGccReady() {
  if (_localGccReady !== null) return _localGccReady;
  try {
    await execFileAsync('gcc', ['--version'], { timeout: 3000 });
    console.log('[executor] Local GCC found — using local GCC engine (no docker-in-docker)');
    _localGccReady = true;
  } catch {
    console.warn('[executor] Local GCC not found in PATH');
    _localGccReady = false;
  }
  return _localGccReady;
}

async function runWithLocalGcc(code, stdin) {
  const startTime = Date.now();
  const runId     = uuidv4();
  const baseTmp   = process.env.COMPILER_TMP_DIR || os.tmpdir();
  const tmpDir    = path.join(baseTmp, `sc-local-${runId}`);

  try {
    fs.mkdirSync(tmpDir, { recursive: true });
    const srcFile  = path.join(tmpDir, 'main.c');
    const outFile  = path.join(tmpDir, 'prog');
    const errFile  = path.join(tmpDir, 'stderr.txt');
    fs.writeFileSync(srcFile, code, 'utf8');

    // ── Step 1: Compile ────────────────────────────────────────────
    let compileOut = '';
    let compileOk  = false;
    let compileKilled = false;

    await new Promise((resolve) => {
      const proc = spawn(
        'gcc',
        [srcFile, '-Wall', '-Wextra', '-O2', '-o', outFile, '-lm'],
        { stdio: ['ignore', 'pipe', 'pipe'] }
      );
      proc.stdout.on('data', d => { compileOut += d.toString(); });
      proc.stderr.on('data', d => { compileOut += d.toString(); });
      const t = setTimeout(() => {
        compileKilled = true;
        proc.kill('SIGKILL');
        resolve();
      }, COMPILE_TIMEOUT);
      proc.on('close', code => {
        clearTimeout(t);
        compileOk = code === 0;
        resolve();
      });
      proc.on('error', err => {
        clearTimeout(t);
        compileOut += `\nGCC error: ${err.message}`;
        resolve();
      });
    });

    // Normalise paths in compiler output
    const compileMsg = compileOut
      .replace(new RegExp(tmpDir.replace(/\\/g, '\\\\'), 'g'), '')
      .replace(/\/[^:]+main\.c/g, 'main.c')
      .trim();

    if (compileKilled || !compileOk) {
      return {
        success: false, stdout: '', stderr: compileMsg || 'Compilation failed',
        exitCode: 1, signal: null, killed: compileKilled, compileError: true,
        timeMs: Date.now() - startTime, engine: 'local-gcc',
      };
    }

    // ── Step 2: Run ───────────────────────────────────────────────
    let runStdout  = '';
    let runStderr  = '';
    let runExit    = 1;
    let runKilled  = false;
    let runSignal  = null;

    await new Promise((resolve) => {
      const proc = spawn(outFile, [], {
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: tmpDir,
      });

      if (stdin) proc.stdin.write(stdin);
      proc.stdin.end();

      const MAX_OUTPUT = 512 * 1024;
      proc.stdout.on('data', d => {
        if (runStdout.length < MAX_OUTPUT) runStdout += d.toString();
      });
      proc.stderr.on('data', d => {
        if (runStderr.length < MAX_OUTPUT) runStderr += d.toString();
      });

      const t = setTimeout(() => {
        runKilled = true;
        runSignal = 'SIGKILL';
        proc.kill('SIGKILL');
        resolve();
      }, EXEC_TIMEOUT_MS);

      proc.on('close', (code, sig) => {
        clearTimeout(t);
        runExit   = code ?? 1;
        runSignal = sig ?? null;
        if (code === 137 || sig === 'SIGKILL') runKilled = true;
        resolve();
      });
      proc.on('error', err => {
        clearTimeout(t);
        runStderr += `\nRuntime error: ${err.message}`;
        resolve();
      });
    });

    const fullStderr = [compileMsg, runStderr].filter(Boolean).join('\n').trim();
    return {
      success:      runExit === 0 && !runKilled,
      stdout:       runStdout.trimEnd(),
      stderr:       fullStderr,
      exitCode:     runExit,
      signal:       runSignal,
      killed:       runKilled,
      compileError: false,
      timeMs:       Date.now() - startTime,
      engine:       'local-gcc',
    };

  } finally {
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch { /* ignore */ }
  }
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
 * Execute C code.
 *
 * Engine priority (permanent fix for the 24-hour docker image loss bug):
 *   1. Local GCC  — always available in production (baked into Dockerfile Stage 3)
 *   2. Docker     — used only if docker socket is mounted AND gcc-runner image exists
 *   3. Wandbox    — last resort (batch mode, no interactive stdin)
 *
 * @param {string} code
 * @param {string} stdin
 * @returns {Promise<ExecutionResult>}
 */
async function execute(code, stdin = '') {
  // Block dangerous system-level calls before they reach any engine
  const blocked = checkDangerousCode(code);
  if (blocked) return blocked;

  // 1. Try local GCC first — always available in production container
  const localGcc = await isLocalGccReady();
  if (localGcc) {
    return runWithLocalGcc(code, stdin);
  }

  // 2. Try Docker (only if docker socket is mounted — e.g. self-hosted with Coolify)
  const dockerAvailable = await isDockerReady();
  if (dockerAvailable) {
    const result = await runWithDocker(code, stdin);
    // If docker failed due to missing image, fall through to Wandbox
    if (
      !result.success &&
      result.stderr &&
      (result.stderr.includes('Unable to find image') ||
       result.stderr.includes('pull access denied') ||
       result.stderr.includes('repository does not exist') ||
       result.stderr.includes('docker: Error response from daemon'))
    ) {
      console.warn('[executor] Docker runner image missing. Falling back to Wandbox API.');
      resetDockerCache();
      return runWithWandbox(code, stdin);
    }
    return result;
  }

  // 3. Last resort: Wandbox batch API
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

