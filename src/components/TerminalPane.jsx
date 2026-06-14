import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import styles from './TerminalPane.module.css';

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
  const termRef      = useRef(null);
  const fitRef       = useRef(null);
  const wsRef        = useRef(null);
  const runningRef    = useRef(false);
  // Local echo buffer — chars we've shown immediately; stripped when server PTY echo arrives
  const localEchoRef  = useRef('');

  // ── Initialise xterm.js once ─────────────────────────────────────────────
  useEffect(() => {
    if (termRef.current) return;

    const term = new Terminal({
      theme: {
        background:        '#0d1117',
        foreground:        '#e6edf3',
        cursor:            '#58a6ff',
        cursorAccent:      '#0d1117',
        black:             '#484f58',
        red:               '#ff7b72',
        green:             '#3fb950',
        yellow:            '#d29922',
        blue:              '#58a6ff',
        magenta:           '#bc8cff',
        cyan:              '#39d353',
        white:             '#b1bac4',
        brightBlack:       '#6e7681',
        brightRed:         '#ffa198',
        brightGreen:       '#56d364',
        brightYellow:      '#e3b341',
        brightBlue:        '#79c0ff',
        brightMagenta:     '#d2a8ff',
        brightCyan:        '#56d364',
        brightWhite:       '#f0f6fc',
        selectionBackground: '#264f78',
      },
      fontFamily:        '"JetBrains Mono", "Fira Code", "Cascadia Code", "Courier New", monospace',
      fontSize:          14,
      lineHeight:        1.5,
      letterSpacing:     0,
      cursorBlink:       true,
      cursorStyle:       'block',
      scrollback:        5000,
      convertEol:        true,   // handles both \n (fallback) and \r\n (PTY) correctly
      allowTransparency: false,
    });

    const fit = new FitAddon();
    term.loadAddon(fit);
    term.open(containerRef.current);
    requestAnimationFrame(() => { try { fit.fit(); } catch {} });
    termRef.current = term;
    fitRef.current  = fit;

    // Welcome banner
    term.writeln('\x1b[38;5;240m# Smart Compiler — Interactive Terminal\x1b[0m');
    term.writeln('\x1b[38;5;240m# Press ▶ Run or Ctrl+Enter to compile & run.\x1b[0m');
    term.writeln('\x1b[38;5;240m# Ctrl+C to interrupt  ·  Ctrl+D to send EOF\x1b[0m');
    term.writeln('');

    // ── Input: local echo + forward to server PTY ───────────────────────
    // We echo printable chars immediately so typing feels instant regardless
    // of network latency. The server PTY also echoes back — we strip that
    // duplicate in the 'output' handler using localEchoRef.
    //
    // Rules:
    //   Printable (code 32-126, >127) → echo locally, track in localEchoRef
    //   Backspace (\x7f)              → erase locally, shrink localEchoRef
    //   Enter (\r)                    → echo \r\n locally, track \r\n
    //   Control chars (Ctrl+C etc.)   → send only, never echo locally
    term.onData((data) => {
      if (!runningRef.current) return;
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;

      for (const ch of data) {
        const code = ch.codePointAt(0);

        if (code === 0x7f) {
          // Backspace — erase the last locally-echoed char
          if (localEchoRef.current.length > 0) {
            localEchoRef.current = localEchoRef.current.slice(0, -1);
            term.write('\b \b'); // move back, blank, move back
          }
        } else if (ch === '\r') {
          // Enter — PTY will echo back \r\n
          term.write('\r\n');
          localEchoRef.current += '\r\n';
        } else if ((code >= 32 && code !== 127)) {
          // Printable character — show instantly
          term.write(ch);
          localEchoRef.current += ch;
        }
        // Control sequences (arrows, Ctrl+C, Ctrl+D …) — server handles, no local echo
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
    const ro = new ResizeObserver(() => { try { fit.fit(); } catch {} });
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
      term.dispose();
      termRef.current = null;
      fitRef.current  = null;
    };
  }, []);

  // ── Connect to WebSocket and run code ────────────────────────────────────
  const connect = useCallback((wsUrl, code) => {
    const term = termRef.current;
    if (!term) return;

    // Close any existing connection
    if (wsRef.current) {
      try { wsRef.current.close(); } catch {}
      wsRef.current = null;
    }

    runningRef.current   = false;
    localEchoRef.current = '';

    // Reset terminal and show compile banner
    term.write('\x1bc');
    term.writeln('\x1b[38;5;240m# ─────────────────────────────────────────────\x1b[0m');
    term.writeln('\x1b[38;5;33m# Compiling...\x1b[0m');
    term.writeln('');
    onStatusChange?.('compiling');

    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      // Send run command with current terminal size so PTY is sized correctly
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
            onStatusChange?.('running');
            term.focus();
          }
          break;

        // ── Primary output path: raw PTY bytes (stdout + stderr + echo) ──
        // Strip server-side PTY echo that we already displayed locally.
        case 'output': {
          let output = msg.data;
          if (localEchoRef.current) {
            // Try to consume a matching prefix from our locally-echoed buffer
            let matchLen = 0;
            while (
              matchLen < localEchoRef.current.length &&
              matchLen < output.length &&
              output[matchLen] === localEchoRef.current[matchLen]
            ) {
              matchLen++;
            }
            if (matchLen > 0) {
              output = output.slice(matchLen);
              localEchoRef.current = localEchoRef.current.slice(matchLen);
            } else {
              // No match — program output arrived before echo; clear buffer
              localEchoRef.current = '';
            }
          }
          if (output) term.write(output);
          break;
        }

        // ── Compile error: format GCC output with colours ─────────────
        case 'compile-error': {
          term.writeln('\x1b[1;31m✗ Compile Error\x1b[0m');
          term.writeln('');
          const errorLines = msg.data.split('\n');
          for (const line of errorLines) {
            if (!line.trim()) { term.writeln(''); continue; }
            if      (line.includes(': error:'))   term.writeln(`\x1b[31m${line}\x1b[0m`);
            else if (line.includes(': warning:')) term.writeln(`\x1b[33m${line}\x1b[0m`);
            else if (line.includes(': note:'))    term.writeln(`\x1b[36m${line}\x1b[0m`);
            else                                  term.writeln(line);
          }
          term.writeln('');
          localEchoRef.current = '';
          runningRef.current = false;
          onStatusChange?.('idle');
          onDone?.({ success: false, compileError: true });
          break;
        }

        case 'engine':
          // Engine info (docker / wandbox) — no UI action needed
          break;

        // ── Program finished ──────────────────────────────────────────
        case 'done': {
          localEchoRef.current = '';
          runningRef.current = false;
          const { exitCode, timeMs, killed } = msg;

          term.writeln('');
          term.writeln('');
          if (killed) {
            term.writeln('\x1b[1;33m⏱  Program killed — Time Limit Exceeded (30 s)\x1b[0m');
          } else if (exitCode === 0) {
            term.writeln('\x1b[1;32m✓  Program finished with exit code 0\x1b[0m');
          } else {
            term.writeln(`\x1b[1;31m✗  Program finished with exit code ${exitCode}\x1b[0m`);
          }
          term.writeln(`\x1b[38;5;240m   Elapsed: ${timeMs} ms\x1b[0m`);

          onStatusChange?.('idle');
          onDone?.({ success: exitCode === 0 && !killed, exitCode, timeMs, killed });
          break;
        }

        // ── Unexpected server error ───────────────────────────────────
        case 'error':
          term.writeln('');
          term.writeln(`\x1b[1;31m✗  Error: ${msg.data}\x1b[0m`);
          localEchoRef.current = '';
          runningRef.current = false;
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
      onStatusChange?.('idle');
    };

    ws.onclose = () => {
      if (runningRef.current) {
        term.writeln('');
        term.writeln('\x1b[38;5;240m[Connection closed]\x1b[0m');
        runningRef.current = false;
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
