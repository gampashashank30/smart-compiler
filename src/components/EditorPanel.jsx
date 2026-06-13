import { useRef, useCallback, useMemo } from 'react';
import { highlightC } from '../highlight.js';
import styles from './EditorPanel.module.css';

export default function EditorPanel({
  code, onChange, onRun, onKill, onClear,
  isRunning = false,
  runStatus = 'idle',  // 'idle' | 'compiling' | 'running'
}) {
  const textareaRef = useRef(null);
  const preRef      = useRef(null);
  const gutterRef   = useRef(null);

  // Memoize the highlighted HTML so it only recomputes when code changes
  const highlighted = useMemo(() => highlightC(code), [code]);

  // Sync scroll between gutter, highlight layer, and textarea
  const syncScroll = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    if (preRef.current) {
      preRef.current.scrollTop  = ta.scrollTop;
      preRef.current.scrollLeft = ta.scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = ta.scrollTop;
    }
  }, []);

  // Tab key → 4 spaces | Ctrl+Enter → Run
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta    = textareaRef.current;
      const start = ta.selectionStart;
      const end   = ta.selectionEnd;
      const next  = code.substring(0, start) + '    ' + code.substring(end);
      onChange(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 4;
      });
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!isRunning) onRun();
    }
  }, [code, onChange, onRun, isRunning]);

  const lineCount = code.split('\n').length;

  return (
    <div className={styles.panel}>

      {/* ── Tab bar ──────────────────────────────────────────────────────── */}
      <div className={styles.tabBar}>
        <div className={styles.tabLeft}>
          <div className={styles.fileTab}>
            <span className={styles.fileDot} />
            <span className={styles.fileName}>main.c</span>
          </div>
        </div>
        <div className={styles.tabRight}>
          <span className={styles.langDot} />
          <span className={styles.tabMeta}>C Language</span>
        </div>
      </div>

      {/* ── Editor body ──────────────────────────────────────────────────── */}
      <div className={styles.editorBody}>

        {/* Line numbers gutter */}
        <div className={styles.gutter} ref={gutterRef} aria-hidden="true">
          {Array.from({ length: lineCount }, (_, idx) => (
            <div key={idx} className={styles.lineNum}>{idx + 1}</div>
          ))}
        </div>

        {/* Code overlay: pre (highlight layer) + textarea (input layer) */}
        <div className={styles.codeWrapper}>
          <pre
            ref={preRef}
            className={styles.highlight}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: highlighted + '\n' }}
          />
          <textarea
            ref={textareaRef}
            id="code-editor"
            className={styles.textarea}
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onScroll={syncScroll}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="C code editor"
          />
        </div>
      </div>

      {/* ── Bottom run bar ────────────────────────────────────────────────── */}
      <div className={styles.runBar}>
        <button
          id="clear-btn"
          className={styles.clearBtn}
          onClick={onClear}
          disabled={isRunning}
        >
          CLEAR
        </button>

        {/* Show STOP when running, RUN when idle */}
        {runStatus === 'running' ? (
          <button
            id="stop-btn"
            className={`${styles.runBtn} ${styles.stopBtn}`}
            onClick={onKill}
            aria-label="Stop running program"
          >
            <span className={styles.stopIcon}>■</span> STOP
          </button>
        ) : (
          <button
            id="run-btn"
            className={`${styles.runBtn} ${isRunning ? styles.runBtnRunning : ''}`}
            onClick={onRun}
            disabled={isRunning}
            aria-label={isRunning ? 'Compiling…' : 'Run program (Ctrl+Enter)'}
            title="Run (Ctrl+Enter)"
          >
            {runStatus === 'compiling'
              ? <><span className={styles.spinner} aria-hidden="true" /> COMPILING…</>
              : <><span className={styles.runIcon}>&#9654;</span> RUN</>}
          </button>
        )}
      </div>

    </div>
  );
}
