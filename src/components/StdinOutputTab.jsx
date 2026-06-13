import { useRef, useEffect, useCallback, useState } from 'react';
import DragDivider from './DragDivider.jsx';
import styles from './StdinOutputTab.module.css';

// ── Output type → visual config ──────────────────────────────────────────────
function getOutputConfig(type) {
  switch (type) {
    case 'running':
      return { label: 'COMPILING…', labelClass: styles.badgeRunning, bodyClass: styles.bodyRunning };
    case 'success':
      return { label: 'SUCCESS',    labelClass: styles.badgeSuccess, bodyClass: styles.bodySuccess };
    case 'compile-error':
      return { label: 'COMPILE ERROR', labelClass: styles.badgeError, bodyClass: styles.bodyError };
    case 'tle':
      return { label: 'TIME LIMIT EXCEEDED', labelClass: styles.badgeTle, bodyClass: styles.bodyTle };
    case 'runtime-error':
      return { label: 'RUNTIME ERROR', labelClass: styles.badgeError, bodyClass: styles.bodyError };
    case 'error':
      return { label: 'ERROR',      labelClass: styles.badgeError, bodyClass: styles.bodyError };
    default:
      return { label: null, labelClass: '', bodyClass: '' };
  }
}

export default function StdinOutputTab({ stdin, onStdinChange, output, isRunning = false }) {
  const [topHeight, setTopHeight] = useState(32); // percent — input section
  const containerRef = useRef(null);
  const draggingRef  = useRef(false);
  const outputRef    = useRef(null);
  const stdinRef     = useRef(null);

  // Auto-scroll output into view when new output arrives
  useEffect(() => {
    if (output && output.type !== 'running' && outputRef.current) {
      outputRef.current.scrollTop = 0;
    }
  }, [output]);

  // Focus stdin on mount so user can type immediately
  useEffect(() => {
    if (stdinRef.current && !isRunning) {
      stdinRef.current.focus();
    }
  }, []);

  const onDividerMouseDown = useCallback((e) => {
    e.preventDefault();
    draggingRef.current = true;
    document.body.style.cursor    = 'row-resize';
    document.body.style.userSelect = 'none';

    const onMove = (ev) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect   = containerRef.current.getBoundingClientRect();
      const newPct = ((ev.clientY - rect.top) / rect.height) * 100;
      setTopHeight(Math.max(20, Math.min(70, newPct)));
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

  const cfg = output ? getOutputConfig(output.type) : { label: null, labelClass: '', bodyClass: '' };

  // ── Render the output body based on type ─────────────────────────────────
  function renderBody() {
    if (!output) {
      return (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>▷</span>
          <span>No output yet.</span>
          <span className={styles.emptyHint}>Press <strong>Run</strong> or <kbd>Ctrl+Enter</kbd> to compile &amp; execute.</span>
        </div>
      );
    }

    if (output.type === 'running') {
      return (
        <div className={styles.compilingState}>
          <span className={styles.compilingSpinner} aria-hidden="true" />
          <span>Sending to GCC compiler…</span>
          <span className={styles.emptyHint}>Infinite loops will be killed after 10 s</span>
        </div>
      );
    }

    return (
      <>
        {/* Meta bar: exit code + time */}
        <div className={styles.metaBar}>
          <span className={cfg.labelClass}>{cfg.label}</span>
          {output.exitCode !== undefined && (
            <span className={styles.exitBadge}>
              exit&nbsp;<strong>{output.exitCode}</strong>
            </span>
          )}
          {output.timeMs !== undefined && (
            <span className={styles.timeBadge}>{output.timeMs} ms</span>
          )}
          {output.killed && (
            <span className={styles.killedBadge}>⏱ killed (TLE)</span>
          )}
          {output.compileError && (
            <span className={styles.compileBadge}>gcc</span>
          )}
          {output.engine && output.engine !== 'unknown' && (() => {
            const isDocker  = output.engine === 'docker';
            const isWandbox = output.engine === 'wandbox';
            const cls       = isDocker  ? styles.engineDockerBadge
                            : isWandbox ? styles.engineWandboxBadge
                            : styles.enginePistonBadge;
            const icon      = isDocker  ? '🐳 docker'
                            : isWandbox ? '🌿 wandbox'
                            : '☁ piston';
            const tip       = isDocker  ? 'Ran in a local Docker container (sandboxed)'
                            : isWandbox ? 'Ran via Wandbox GCC (free public API, fallback)'
                            : 'Ran via Piston public API (fallback)';
            return <span className={cls} title={tip}>{icon}</span>;
          })()}
        </div>

        {/* TLE explanation */}
        {output.type === 'tle' && (
          <div className={styles.tleExplain}>
            Your program ran for more than 10 seconds and was forcefully terminated.
            This usually means an <strong>infinite loop</strong> or a very slow algorithm.
            {output.text ? '\n\nPartial output before kill:' : ''}
          </div>
        )}

        {/* Stdout */}
        {output.text ? (
          <pre className={`${styles.outputPre} ${cfg.bodyClass}`}>{output.text}</pre>
        ) : (output.type === 'success' ? (
          <pre className={`${styles.outputPre} ${styles.bodyMuted}`}>(program produced no stdout output)</pre>
        ) : null)}

        {/* Stderr / GCC warnings (shown separately below stdout) */}
        {output.stderr && output.stderr.trim() && (
          <div className={styles.stderrBlock}>
            <div className={styles.stderrLabel}>
              {output.compileError ? '🔴 compiler output (stderr)' : '⚠ stderr / warnings'}
            </div>
            <pre className={styles.stderrPre}>{output.stderr}</pre>
          </div>
        )}
      </>
    );
  }

  return (
    <div ref={containerRef} className={styles.container}>

      {/* ── INPUT (stdin) section — like OnlineGDB "Custom Input" ── */}
      <div className={styles.section} style={{ height: `${topHeight}%` }}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <span className={styles.sectionIcon}>⌨</span>
            <span className={styles.sectionLabel}>Input (stdin)</span>
          </div>
          <div className={styles.sectionHeaderRight}>
            {stdin.trim() ? (
              <span className={styles.inputStatus}>
                {stdin.split('\n').length} line{stdin.split('\n').length !== 1 ? 's' : ''}
              </span>
            ) : (
              <span className={styles.inputStatusEmpty}>empty</span>
            )}
            {stdin && (
              <button
                className={styles.clearBtn}
                onClick={() => onStdinChange('')}
                title="Clear input"
                disabled={isRunning}
              >
                ✕ clear
              </button>
            )}
          </div>
        </div>
        <textarea
          ref={stdinRef}
          id="stdin-input"
          className={styles.stdinArea}
          value={stdin}
          onChange={(e) => onStdinChange(e.target.value)}
          placeholder={"Type program input here…\n\nEach line = one input value.\nExample:\n5\nhello world\n42"}
          spellCheck={false}
          disabled={isRunning}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      <DragDivider orientation="horizontal" onMouseDown={onDividerMouseDown} />

      {/* ── OUTPUT section ── */}
      <div className={styles.section} style={{ height: `${100 - topHeight}%` }}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderLeft}>
            <span className={styles.sectionIcon}>▶</span>
            <span className={styles.sectionLabel}>Output</span>
          </div>
          {output && output.type !== 'running' && (
            <div className={styles.sectionHeaderRight}>
              <button
                className={styles.copyBtn}
                onClick={() => {
                  const text = output.text || '';
                  navigator.clipboard?.writeText(text).catch(() => {});
                }}
                title="Copy output"
              >
                ⧉ copy
              </button>
            </div>
          )}
        </div>
        <div ref={outputRef} id="output-area" className={styles.outputArea}>
          {renderBody()}
        </div>
      </div>

    </div>
  );
}
