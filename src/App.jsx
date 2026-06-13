import { useState, useRef, useCallback } from 'react';
import Header from './components/Header.jsx';
import EditorPanel from './components/EditorPanel.jsx';
import DragDivider from './components/DragDivider.jsx';
import RightPanel from './components/RightPanel.jsx';
import { STARTER_CODE } from './constants.js';
import styles from './App.module.css';

// WebSocket URL — Vite proxies /ws → ws://localhost:3001 in dev
const WS_URL = (() => {
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${window.location.host}/ws/run`;
})();

export default function App() {
  const [code, setCode]           = useState(STARTER_CODE);
  const [runStatus, setRunStatus] = useState('idle'); // 'idle' | 'compiling' | 'running'
  const [activeTab, setActiveTab] = useState('terminal');

  // Panel width: left panel percent of total workspace width
  const [leftWidth, setLeftWidth] = useState(55);
  const containerRef = useRef(null);
  const draggingRef  = useRef(false);

  // Ref to the TerminalPane's imperative API
  const terminalRef = useRef(null);

  // Vertical drag divider
  const onDividerMouseDown = useCallback((e) => {
    e.preventDefault();
    draggingRef.current = true;
    document.body.style.cursor    = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMove = (ev) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct  = ((ev.clientX - rect.left) / rect.width) * 100;
      setLeftWidth(Math.max(25, Math.min(75, pct)));
    };

    const onUp = () => {
      draggingRef.current = false;
      document.body.style.cursor    = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  // ── Run — connect WebSocket and send code for interactive execution ─────
  const handleRun = useCallback(() => {
    if (!code.trim()) {
      // Write error to terminal
      terminalRef.current?.clear();
      return;
    }
    if (runStatus === 'compiling' || runStatus === 'running') return;

    // Switch to terminal tab
    setActiveTab('terminal');

    // Connect terminal to WebSocket
    terminalRef.current?.connect(WS_URL, code);
  }, [code, runStatus]);

  // ── Kill running program ──────────────────────────────────────────────────
  const handleKill = useCallback(() => {
    terminalRef.current?.kill();
    setRunStatus('idle');
  }, []);

  // ── Clear editor ──────────────────────────────────────────────────────────
  const handleClear = useCallback(() => {
    if (window.confirm('Clear the editor? This cannot be undone.')) {
      setCode('');
      terminalRef.current?.clear();
    }
  }, []);

  // ── Apply AI fix ──────────────────────────────────────────────────────────
  const handleApplyFix = useCallback((newCode) => {
    setCode(newCode);
  }, []);

  // ── Status callbacks from TerminalPane ───────────────────────────────────
  const handleStatusChange = useCallback((status) => {
    setRunStatus(status);
  }, []);

  const handleDone = useCallback((_result) => {
    setRunStatus('idle');
  }, []);

  const isRunning = runStatus === 'compiling' || runStatus === 'running';

  return (
    <div className={styles.appShell}>
      <Header />

      <div className={styles.workspace} ref={containerRef}>
        {/* Left — Editor */}
        <div
          className={styles.leftPane}
          style={{ width: `${leftWidth}%` }}
        >
          <EditorPanel
            code={code}
            onChange={setCode}
            onRun={handleRun}
            onKill={handleKill}
            onClear={handleClear}
            isRunning={isRunning}
            runStatus={runStatus}
          />
        </div>

        {/* Vertical drag divider */}
        <DragDivider orientation="vertical" onMouseDown={onDividerMouseDown} />

        {/* Right — Terminal / AI */}
        <div
          className={styles.rightPane}
          style={{ width: `${100 - leftWidth}%` }}
        >
          <RightPanel
            ref={terminalRef}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            code={code}
            onApplyFix={handleApplyFix}
            isRunning={runStatus}
            onStatusChange={handleStatusChange}
            onDone={handleDone}
          />
        </div>
      </div>
    </div>
  );
}
