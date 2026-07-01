import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import styles from './TerminalPane.module.css';
import { classifyCompileError, extractLineHint } from '../bugTracker.js';
import { compilationHistoryStore } from '../compilationHistory.js';

/** Dispatch a bugtracker:record custom event — handled by App.jsx → bugTrackerStore */
function dispatchBugEvent(payload) {
  window.dispatchEvent(new CustomEvent('bugtracker:record', { detail: payload }));
}

/**
 * Strip ALL ANSI / VT100 escape sequences from a string.
 * Covers: CSI (ESC [ ... final), OSC (ESC ] ... ST/BEL), DCS/PM/APC,
 * private-mode sequences (ESC [ ? ... ), and lone ESC chars.
 */
function stripAnsi(str) {
  return str
    // CSI sequences: ESC [ <params> <final>  (covers ?, ;, digits, letters)
    .replace(/\x1b\[[\x30-\x3f]*[\x20-\x2f]*[\x40-\x7e]/g, '')
    // OSC sequences: ESC ] ... BEL  or  ESC ] ... ESC \\'
    .replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g, '')
    // DCS / PM / APC sequences
    .replace(/\x1b[P_^][^\x1b]*\x1b\\/g, '')
    // Single-char ESC sequences (ESC + one char that isn't [ ] P _ ^)
    .replace(/\x1b[^\[\]P_^]/g, '')
    // Lone ESC chars
    .replace(/\x1b/g, '');
}

/**
 * TerminalPane — xterm.js connected to the server's node-pty via WebSocket.
 *
 * Data flow (PTY mode — like OnlineGDB):
 *   User keystroke → term.onData → ws {type:'stdin'} → server → ptyProc.write()
 *                                                             ↓ PTY echo + program output
 *   xterm.js ← term.write() ← ws {type:'output'} ← ptyProc.onData ← PTY master
 *
 * Key design decisions:
 *   • NO local echo — the server's PTY echoes characters back through the output stream.
 *     This ensures echo is perfectly interleaved with program output (no race conditions).
 *   • term.onData sends RAW bytes — Ctrl+C (\x03), Ctrl+D (\x04), backspace (\x7f),
 *     and arrow keys are all forwarded as-is. The PTY line discipline handles them.
 *   • convertEol: true — handles both \n (fallback) and \r\n (PTY) correctly.
 *   • Resize events are forwarded so the PTY stays in sync with xterm.js dimensions.
 *
 * Exposed ref methods:
 *   .connect(wsUrl, code)   — open WebSocket + send run command
 *   .kill()                 — force-kill the running process
 *   .clear()                — clear terminal screen
 *   .focus()                — focus the terminal
 */
const TerminalPane = forwardRef(function TerminalPane(
  { onStatusChange, onDone },
  ref
) {
  const containerRef = useRef(null);
  const termRef = useRef(null);
  const fitRef = useRef(null);
  const wsRef = useRef(null);
  const runningRef = useRef(false);
  // Local echo buffer — chars we've shown immediately; stripped when server PTY echo arrives
  const localEchoRef = useRef('');
  // ── Stdout capture buffer for history ─────────────────────────────────
  // Accumulates clean (ANSI-stripped) program output during a run.
  // Reset at the start of every new connect() call.
  const outputBufRef = useRef('');
  // Track whether we're past the compile banner so we don't capture compile noise
  const capturingRef = useRef(false);

  // ── Initialise xterm.js once ─────────────────────────────────────────────
  useEffect(() => {
    if (termRef.current) return;

    const term = new Terminal({
      theme: {
        background: '#0d1117',
        foreground: '#e6edf3',
        cursor: '#58a6ff',
        cursorAccent: '#0d1117',
        black: '#484f58',
        red: '#ff7b72',
        green: '#3fb950',
        yellow: '#d29922',
        blue: '#58a6ff',
        magenta: '#bc8cff',
        cyan: '#39d353',
        white: '#b1bac4',
        brightBlack: '#6e7681',
        brightRed: '#ffa198',
        brightGreen: '#56d364',
        brightYellow: '#e3b341',
        brightBlue: '#79c0ff',
        brightMagenta: '#d2a8ff',
        brightCyan: '#56d364',
        brightWhite: '#f0f6fc',
        selectionBackground: '#264f78',
      },
      fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", "Courier New", monospace',
      fontSize: 14,
      lineHeight: 1.5,
      letterSpacing: 0,
      cursorBlink: true,
      cursorStyle: 'block',
      scrollback: 5000,
      convertEol: true,   // handles both \n (fallback) and \r\n (PTY) correctly
      allowTransparency: false,
    });

    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(containerRef.current);
    requestAnimationFrame(() => { try { fit.fit(); } catch { } });
    termRef.current = term;
    fitRef.current = fit;

    // Welcome banner
    term.writeln('\x1b[38;5;240m# Smart Compiler — Interactive Terminal\x1b[0m');
    term.writeln('\x1b[38;5;240m# Press ▶ Run or Ctrl+Enter to compile & run.\x1b[0m');
    term.writeln('\x1b[38;5;240m# Ctrl+C to interrupt  ·  Ctrl+D to send EOF\x1b[0m');
    term.writeln('');

    // ── Input: local echo + forward to server PTY ───────────────────────
    term.onData((data) => {
      if (!runningRef.current) return;
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;

      for (const ch of data) {
        const code = ch.codePointAt(0);
        if (code === 0x7f) {
          // Backspace
          if (localEchoRef.current.length > 0) {
            localEchoRef.current = localEchoRef.current.slice(0, -1);
            term.write('\b \b');
          }
        } else if (ch === '\r') {
          term.write('\r\n');
          localEchoRef.current += '\r\n';
        } else if (code >= 32 && code !== 127) {
          term.write(ch);
          localEchoRef.current += ch;
        }
      }
      ws.send(JSON.stringify({ type: 'stdin', data }));
    });

    // ── Resize: keep PTY dimensions in sync ──────────────────────────────
    term.onResize(({ cols, rows }) => {
      const ws = wsRef.current;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'resize', cols, rows }));
      }
    });

    // Resize observer — refit when container size changes
    const ro = new ResizeObserver(() => { try { fit.fit(); } catch { } });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      term.dispose();
      termRef.current = null;
      fitRef.current = null;
      if (wsRef.current) {
        try { wsRef.current.close(); } catch {}
        wsRef.current = null;
      }
    };
  }, []);

  // ── Connect to WebSocket and run code ────────────────────────────────────
  const connect = useCallback((wsUrl, code) => {
    const term = termRef.current;
    if (!term) return;

    // Close any existing connection
    if (wsRef.current) {
      try { wsRef.current.close(); } catch { }
      wsRef.current = null;
    }

    runningRef.current = false;
    localEchoRef.current = '';
    outputBufRef.current = '';
    capturingRef.current = false;

    // Reset terminal and show compile banner
    term.write('\x1bc');
    term.writeln('\x1b[38;5;240m# ─────────────────────────────────────────────\x1b[0m');
    term.writeln('\x1b[38;5;33m# Compiling...\x1b[0m');
    term.writeln('');
    onStatusChange?.('compiling');

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      // Token was already sent via the WS URL ?token= query param during the
      // HTTP upgrade — no need to resend it here.
      ws.send(JSON.stringify({
        type: 'run',
        code,
        cols: term.cols,
        rows: term.rows,
      }));
    };

    ws.onmessage = (event) => {
      let msg;
      try { msg = JSON.parse(event.data); } catch { return; }

      switch (msg.type) {

        case 'status':
          if (msg.data === 'running') {
            term.writeln('\x1b[38;5;240m# ─────────────────────────────────────────────\x1b[0m');
            term.writeln('');
            runningRef.current = true;
            capturingRef.current = true; // start capturing program stdout now
            onStatusChange?.('running');
            term.focus();
          }
          break;

        // ── Primary output path: raw PTY bytes (stdout + stderr + echo) ──
        case 'output': {
          const rawData = msg.data;

          // Capture into history BEFORE deduplication — PTY already echoes user input
          // naturally interleaved with program output, so this matches the console exactly.
          if (capturingRef.current) {
            const clean = stripAnsi(rawData)
              .replace(/\r\n/g, '\n')
              .replace(/\r/g, '\n')
              // Remove terminal control remnants (e.g. bracketed-paste sequences)
              .replace(/\[\?2004[hl]/g, '')
              .replace(/\[\d*[A-Z]/g, '') // cursor movement leftovers
              ;
            outputBufRef.current += clean;
          }

          // Deduplicate local echo for visual display only
          let output = rawData;
          if (localEchoRef.current) {
            let matchLen = 0;
            while (
              matchLen < localEchoRef.current.length &&
              matchLen < output.length &&
              output[matchLen] === localEchoRef.current[matchLen]
            ) { matchLen++; }
            if (matchLen > 0) {
              output = output.slice(matchLen);
              localEchoRef.current = localEchoRef.current.slice(matchLen);
            } else {
              localEchoRef.current = '';
            }
          }
          if (output) term.write(output);
          break;
        }

        // ── Compile error: format GCC output with colours ─────────────
        case 'compile-error': {
          term.writeln('\x1b[1;31m\u2717 Compile Error\x1b[0m');
          term.writeln('');
          const errorLines = msg.data.split('\n');
          let errorOutputText = '';
          for (const line of errorLines) {
            if (!line.trim()) { term.writeln(''); continue; }
            if (line.includes(': error:'))        { term.writeln(`\x1b[31m${line}\x1b[0m`); errorOutputText += line + '\n'; }
            else if (line.includes(': warning:')) { term.writeln(`\x1b[33m${line}\x1b[0m`); errorOutputText += line + '\n'; }
            else if (line.includes(': note:'))    { term.writeln(`\x1b[36m${line}\x1b[0m`); errorOutputText += line + '\n'; }
            else                                  { term.writeln(line); errorOutputText += line + '\n'; }
          }
          term.writeln('');
          localEchoRef.current = '';
          runningRef.current = false;
          capturingRef.current = false;
          onStatusChange?.('idle');
          onDone?.({ success: false, compileError: true });
          // ── Bug tracker ──
          dispatchBugEvent({
            type:      'compile-error',
            subtype:   classifyCompileError(msg.data),
            timestamp: Date.now(),
            timeMs:    null,
            exitCode:  null,
            lineHint:  extractLineHint(msg.data),
            stderr:    msg.data ?? '',
          });
          // ── Compilation history ──
          compilationHistoryStore.record({
            code,
            status:    'error',
            exitCode:  null,
            timeMs:    null,
            output:    errorOutputText.trim(),
            stdout:    '',           // no stdout for compile errors
            errorType: 'compile-error',
            killed:    false,
          });
          break;
        }

        case 'engine':
          break;

        // ── Program finished ──────────────────────────────────────────
        case 'done': {
          const capturedStdout = outputBufRef.current;
          localEchoRef.current = '';
          runningRef.current = false;
          capturingRef.current = false;
          outputBufRef.current = '';
          const { exitCode, timeMs, killed } = msg;

          term.writeln('');
          term.writeln('');
          if (killed) {
            term.writeln('\x1b[1;33m\u23f1  Program killed \u2014 Time Limit Exceeded (30 s)\x1b[0m');
          } else if (exitCode === 0) {
            term.writeln('\x1b[1;32m\u2713  Program finished with exit code 0\x1b[0m');
          } else {
            term.writeln(`\x1b[1;31m\u2717  Program finished with exit code ${exitCode}\x1b[0m`);
          }
          term.writeln(`\x1b[38;5;240m   Elapsed: ${timeMs} ms\x1b[0m`);

          onStatusChange?.('idle');
          onDone?.({ success: exitCode === 0 && !killed, exitCode, timeMs, killed });

          // ── Bug tracker ──
          let runtimeSubtype;
          if (killed || timeMs > 9500) {
            runtimeSubtype = 'Infinite Loop / TLE';
          } else if (exitCode !== 0) {
            runtimeSubtype = (msg.stderr ?? '').includes('Segmentation fault')
              ? 'Segmentation Fault'
              : 'Runtime Crash';
          } else {
            runtimeSubtype = 'Successful Run';
          }
          dispatchBugEvent({
            type:      'runtime',
            subtype:   runtimeSubtype,
            timestamp: Date.now(),
            timeMs:    timeMs ?? null,
            exitCode:  exitCode ?? null,
            lineHint:  null,
            stderr:    msg.stderr ?? '',
          });

          // ── Compilation history — pass real stdout ──
          const isSuccess = exitCode === 0 && !killed;
          compilationHistoryStore.record({
            code,
            status:    isSuccess ? 'success' : 'error',
            exitCode:  exitCode ?? null,
            timeMs:    timeMs ?? null,
            stdout:    capturedStdout.trim(),  // real program output
            output:    capturedStdout.trim(),  // same — kept for backwards compat
            errorType: isSuccess ? null : (killed ? 'infinite-loop' : 'runtime'),
            killed:    killed ?? false,
          });
          break;
        }

        // ── Unexpected server error ───────────────────────────────────
        case 'error':
          term.writeln('');
          term.writeln(`\x1b[1;31m✗  Error: ${msg.data}\x1b[0m`);
          localEchoRef.current = '';
          runningRef.current = false;
          capturingRef.current = false;
          onStatusChange?.('idle');
          onDone?.({ success: false, error: msg.data });
          break;

        default:
          break;
      }
    };

    ws.onerror = () => {
      term.writeln('');
      term.writeln('\x1b[1;31m✗  WebSocket connection failed.\x1b[0m');
      term.writeln('\x1b[38;5;240m   Make sure the server is running on port 3001.\x1b[0m');
      runningRef.current = false;
      capturingRef.current = false;
      onStatusChange?.('idle');
    };

    ws.onclose = () => {
      if (runningRef.current) {
        term.writeln('');
        term.writeln('\x1b[38;5;240m[Connection closed]\x1b[0m');
        runningRef.current = false;
        capturingRef.current = false;
        onStatusChange?.('idle');
      }
    };
  }, [onStatusChange, onDone]);

  // ── Kill running process ─────────────────────────────────────────────────
  const kill = useCallback(() => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: 'kill' }));
    }
    const term = termRef.current;
    if (term && runningRef.current) {
      term.writeln('');
      term.writeln('\x1b[1;33m[Killed by user]\x1b[0m');
    }
    localEchoRef.current = '';
    runningRef.current = false;
    capturingRef.current = false;
    onStatusChange?.('idle');
  }, [onStatusChange]);

  // ── Clear terminal ───────────────────────────────────────────────────────
  const clear = useCallback(() => {
    const term = termRef.current;
    if (!term) return;
    term.write('\x1bc');
    term.writeln('\x1b[38;5;240m# Smart Compiler — Interactive Terminal\x1b[0m');
    term.writeln('\x1b[38;5;240m# Press ▶ Run or Ctrl+Enter to compile & run.\x1b[0m');
    term.writeln('\x1b[38;5;240m# Ctrl+C to interrupt  ·  Ctrl+D to send EOF\x1b[0m');
    term.writeln('');
  }, []);

  // ── Expose API to parent ─────────────────────────────────────────────────
  useImperativeHandle(ref, () => ({
    connect,
    kill,
    clear,
    focus: () => termRef.current?.focus(),
  }), [connect, kill, clear]);

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.terminal} />
    </div>
  );
});

export default TerminalPane;
