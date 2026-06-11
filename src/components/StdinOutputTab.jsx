import { useState, useRef, useCallback } from 'react';
import DragDivider from './DragDivider.jsx';
import styles from './StdinOutputTab.module.css';

export default function StdinOutputTab({ stdin, onStdinChange, output }) {
  const [topHeight, setTopHeight] = useState(38); // percent
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  const onDividerMouseDown = useCallback((e) => {
    e.preventDefault();
    draggingRef.current = true;
    document.body.style.cursor = 'row-resize';
    document.body.style.userSelect = 'none';

    const onMove = (ev) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPct = ((ev.clientY - rect.top) / rect.height) * 100;
      setTopHeight(Math.max(15, Math.min(75, newPct)));
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

  const isError = output?.type === 'error';
  const isSuccess = output?.type === 'success';
  const isInfo = output?.type === 'info';

  return (
    <div ref={containerRef} className={styles.container}>
      {/* STDIN section */}
      <div className={styles.section} style={{ height: `${topHeight}%` }}>
        <div className={styles.sectionLabel}>stdin</div>
        <textarea
          id="stdin-input"
          className={styles.stdinArea}
          value={stdin}
          onChange={(e) => onStdinChange(e.target.value)}
          placeholder="Enter program input here..."
          spellCheck={false}
        />
      </div>

      <DragDivider orientation="horizontal" onMouseDown={onDividerMouseDown} />

      {/* OUTPUT section */}
      <div className={styles.section} style={{ height: `${100 - topHeight}%` }}>
        <div className={styles.sectionLabel}>output</div>
        <div
          id="output-area"
          className={`${styles.outputArea} ${isError ? styles.outputError : ''} ${isSuccess ? styles.outputSuccess : ''} ${isInfo ? styles.outputInfo : ''}`}
        >
          {output?.text ?? 'No output yet. Click Run to execute.'}
        </div>
      </div>
    </div>
  );
}
