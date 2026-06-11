import { useState, useRef, useCallback } from 'react';
import Header from './components/Header.jsx';
import EditorPanel from './components/EditorPanel.jsx';
import DragDivider from './components/DragDivider.jsx';
import RightPanel from './components/RightPanel.jsx';
import { STARTER_CODE } from './constants.js';
import styles from './App.module.css';

export default function App() {
  const [code, setCode] = useState(STARTER_CODE);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState(null); // { type: 'info'|'success'|'error', text: string }
  const [activeTab, setActiveTab] = useState('stdin');

  // Panel width: left panel percent of total workspace width
  const [leftWidth, setLeftWidth] = useState(55);
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  // Vertical drag divider
  const onDividerMouseDown = useCallback((e) => {
    e.preventDefault();
    draggingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMove = (ev) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setLeftWidth(Math.max(25, Math.min(75, pct)));
    };

    const onUp = () => {
      draggingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, []);

  // Run handler — browser-mode simulation
  const handleRun = useCallback(() => {
    if (!code.trim()) {
      setOutput({ type: 'error', text: 'Editor is empty. Write some C code first.' });
      return;
    }

    const simulatedMsg =
      `[Browser Mode] Live C execution requires a backend compiler (e.g., gcc via a server).\n\n` +
      `Your code has been received (${code.split('\n').length} lines).\n` +
      (stdin.trim()
        ? `Stdin provided:\n${stdin}\n\n`
        : '') +
      `To run C code in production, connect this interface to a backend\n` +
      `running gcc or use a WebAssembly-compiled compiler like WasmGCC.\n\n` +
      `Tip: Use the AI Explanation tab to check your code for errors before compiling.`;

    setOutput({ type: 'info', text: simulatedMsg });
  }, [code, stdin]);

  // Clear editor
  const handleClear = useCallback(() => {
    if (window.confirm('Clear the editor? This cannot be undone.')) {
      setCode('');
      setOutput(null);
    }
  }, []);

  // Apply corrected code from AI
  const handleApplyFix = useCallback((newCode) => {
    setCode(newCode);
  }, []);

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
            onClear={handleClear}
          />
        </div>

        {/* Vertical drag divider */}
        <DragDivider orientation="vertical" onMouseDown={onDividerMouseDown} />

        {/* Right — Tabbed output */}
        <div
          className={styles.rightPane}
          style={{ width: `${100 - leftWidth}%` }}
        >
          <RightPanel
            stdin={stdin}
            onStdinChange={setStdin}
            output={output}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            code={code}
            onApplyFix={handleApplyFix}
          />
        </div>
      </div>
    </div>
  );
}
