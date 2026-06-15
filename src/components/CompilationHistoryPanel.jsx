import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { compilationHistoryStore } from '../compilationHistory.js';
import styles from './CompilationHistoryPanel.module.css';

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString('en-US', {
    month: 'numeric', day: 'numeric', year: 'numeric',
    hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true,
  });
}

function timeAgo(ts) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60)   return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60)   return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// Keep output to a sane preview length
const MAX_PREVIEW_CHARS = 600;

// ── Status badge ─────────────────────────────────────────────────────────────

function StatusBadge({ entry }) {
  if (entry.killed) {
    return (
      <span className={styles.badgeTLE}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <circle cx="6" cy="6" r="5.5" stroke="#d97706" strokeWidth="1"/>
          <path d="M6 3v3.5l2 1.5" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Infinite Loop
      </span>
    );
  }
  if (entry.status === 'success') {
    return (
      <span className={styles.badgeSuccess}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <circle cx="6" cy="6" r="5.5" stroke="#059669" strokeWidth="1"/>
          <path d="M3.5 6l2 2 3-3" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Success
      </span>
    );
  }
  return (
    <span className={styles.badgeError}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <circle cx="6" cy="6" r="5.5" stroke="#ef4444" strokeWidth="1"/>
        <path d="M4 4l4 4M8 4l-4 4" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
      Error
    </span>
  );
}

// ── Infinite loop output display ──────────────────────────────────────────────

function InfiniteLoopOutput() {
  return (
    <div className={styles.tleOutput}>
      <div className={styles.tleHeader}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="6" stroke="#d97706" strokeWidth="1.3"/>
          <path d="M7 3.5v4l2.5 1.5" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Program ran indefinitely (killed at 30s)
      </div>
      <div className={styles.tleDotsRow}>
        <span className={`${styles.tleDot} ${styles.tleDot1}`} />
        <span className={`${styles.tleDot} ${styles.tleDot2}`} />
        <span className={`${styles.tleDot} ${styles.tleDot3}`} />
      </div>
      <p className={styles.tleTip}>
        Common causes: missing loop increment, off-by-one in condition, or unintentional <code>while(1)</code>
      </p>
    </div>
  );
}

// ── Output display ────────────────────────────────────────────────────────────

function OutputSection({ entry, maximized }) {
  const [showAll, setShowAll] = useState(false);
  const stdout = entry.stdout ?? entry.output ?? '';

  // Infinite loop — special display
  if (entry.killed) {
    return (
      <div className={styles.outputSection}>
        <div className={styles.outputLabelRow}>
          <span className={styles.outputLabel}>Output</span>
        </div>
        <InfiniteLoopOutput />
      </div>
    );
  }

  // Compile error — show GCC messages
  if (entry.errorType === 'compile-error') {
    const lines = stdout.split('\n').filter(Boolean);
    return (
      <div className={styles.outputSection}>
        <div className={styles.outputLabelRow}>
          <span className={styles.outputLabel}>Compiler Output</span>
          <span className={styles.outputLineCount}>{lines.length} lines</span>
        </div>
        <div className={styles.compileErrorBlock}>
          {lines.slice(0, maximized ? 999 : 12).map((line, i) => {
            let cls = styles.errLineNeutral;
            if (line.includes(': error:'))   cls = styles.errLineError;
            else if (line.includes(': warning:')) cls = styles.errLineWarning;
            else if (line.includes(': note:'))    cls = styles.errLineNote;
            return (
              <div key={i} className={`${styles.errLine} ${cls}`}>
                {line.includes(': error:') && <span className={styles.errPill}>error</span>}
                {line.includes(': warning:') && <span className={styles.warnPill}>warn</span>}
                {line}
              </div>
            );
          })}
          {!maximized && lines.length > 12 && (
            <button className={styles.showMoreBtn} onClick={() => setShowAll(v => !v)}>
              {showAll ? '▲ Show less' : `▼ ${lines.length - 12} more lines`}
            </button>
          )}
        </div>
      </div>
    );
  }

  // Runtime output — stdout
  if (!stdout) {
    return (
      <div className={styles.outputSection}>
        <div className={styles.outputLabelRow}>
          <span className={styles.outputLabel}>Output</span>
        </div>
        <div className={styles.outputEmpty}>No output produced</div>
      </div>
    );
  }

  const isLong = stdout.length > MAX_PREVIEW_CHARS;
  const displayText = (!maximized && isLong && !showAll)
    ? stdout.slice(0, MAX_PREVIEW_CHARS)
    : stdout;

  return (
    <div className={styles.outputSection}>
      <div className={styles.outputLabelRow}>
        <span className={styles.outputLabel}>Output</span>
        {entry.status === 'success' && (
          <span className={styles.outputSuccessTag}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 5l2.5 2.5 4-4" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            exit 0
          </span>
        )}
        {entry.status === 'error' && entry.exitCode != null && (
          <span className={styles.outputErrorTag}>exit {entry.exitCode}</span>
        )}
      </div>
      <div className={`${styles.stdoutBlock} ${entry.status === 'error' ? styles.stdoutBlockError : ''}`}>
        <pre className={styles.stdoutPre}>{displayText}{!maximized && isLong && !showAll ? '…' : ''}</pre>
        {!maximized && isLong && (
          <button className={styles.showMoreBtn} onClick={() => setShowAll(v => !v)}>
            {showAll ? '▲ Collapse' : `▼ Show full output (${stdout.split('\n').length} lines)`}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Maximize modal ────────────────────────────────────────────────────────────

function MaximizeModal({ entry, onClose, onLoadInEditor, onDelete }) {
  const [copied, setCopied] = useState(false);

  // ESC to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(entry.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [entry.code]);

  const codeLines = entry.code.split('\n');

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Compilation detail">
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        {/* Modal header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalTitleRow}>
            <StatusBadge entry={entry} />
            <span className={styles.modalDate}>{formatDate(entry.timestamp)}</span>
            {entry.timeMs != null && (
              <span className={styles.modalTimeBadge}>⏱ {entry.timeMs} ms</span>
            )}
          </div>
          <div className={styles.modalActions}>
            <button className={styles.modalCopyBtn} onClick={handleCopy}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="5" y="5" width="9" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M3 11H2a1 1 0 01-1-1V2a1 1 0 011-1h8a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.4"/>
              </svg>
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
            <button className={styles.modalLoadBtn} onClick={() => { onLoadInEditor(entry.code); onClose(); }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2h5v2H4v8h8v-3h2v5H2V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                <path d="M9 2h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2L8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Load in Editor
            </button>
            <button
              className={styles.modalDeleteBtn}
              onClick={() => { onDelete(entry.id); onClose(); }}
              title="Delete this entry"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close">×</button>
          </div>
        </div>

        {/* Modal body: split — code left, output right */}
        <div className={styles.modalBody}>
          {/* Code pane */}
          <div className={styles.modalCodePane}>
            <div className={styles.modalPaneHeader}>
              <span className={styles.modalPaneTitle}>Source Code</span>
              <span className={styles.modalLineCount}>{codeLines.length} lines</span>
            </div>
            <div className={styles.modalCodeScroll}>
              <div className={styles.modalCodeGutter}>
                {codeLines.map((_, i) => (
                  <div key={i} className={styles.modalGutterNum}>{i + 1}</div>
                ))}
              </div>
              <pre className={styles.modalCodePre}>{entry.code}</pre>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.modalDivider} />

          {/* Output pane */}
          <div className={styles.modalOutputPane}>
            <div className={styles.modalPaneHeader}>
              <span className={styles.modalPaneTitle}>
                {entry.errorType === 'compile-error' ? 'Compiler Output' : 'Program Output'}
              </span>
            </div>
            <div className={styles.modalOutputScroll}>
              <OutputSection entry={entry} maximized={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Kebab menu ────────────────────────────────────────────────────────────────

function KebabMenu({ entryId, code, onDelete, onMaximize }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setOpen(false);
  }, [code]);

  const handleDelete = useCallback(() => {
    onDelete(entryId);
    setOpen(false);
  }, [onDelete, entryId]);

  useEffect(() => {
    if (!open) return;
    const h = () => setOpen(false);
    window.addEventListener('click', h, { capture: true });
    return () => window.removeEventListener('click', h, { capture: true });
  }, [open]);

  return (
    <div className={styles.menuWrapper}>
      <button
        className={styles.kebabBtn}
        onClick={(e) => { e.stopPropagation(); setOpen(v => !v); }}
        aria-label="More options"
        title="More options"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="3" r="1.2" fill="currentColor"/>
          <circle cx="8" cy="8" r="1.2" fill="currentColor"/>
          <circle cx="8" cy="13" r="1.2" fill="currentColor"/>
        </svg>
      </button>
      {open && (
        <div className={styles.menuDropdown} onClick={e => e.stopPropagation()}>
          <button className={styles.menuItem} onClick={() => { onMaximize(); setOpen(false); }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 5V2h3M9 2h3v3M2 9v3h3M12 9v3h-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View Full
          </button>
          <button className={styles.menuItem} onClick={handleCopy}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="5" y="5" width="9" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
              <path d="M3 11H2a1 1 0 01-1-1V2a1 1 0 011-1h8a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.4"/>
            </svg>
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
          <div className={styles.menuDivider} />
          <button className={`${styles.menuItem} ${styles.menuItemDanger}`} onClick={handleDelete}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9h8l1-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

// ── Single History Card ───────────────────────────────────────────────────────

function HistoryCard({ entry, onLoadInEditor, onDelete }) {
  const [maximized, setMaximized] = useState(false);
  const [codeExpanded, setCodeExpanded] = useState(false);

  const codeLines = entry.code.split('\n');
  const previewLines = codeLines.slice(0, 7);
  const hasMoreCode = codeLines.length > 7;

  const borderClass = entry.killed
    ? styles.cardTLE
    : entry.status === 'success'
    ? styles.cardSuccess
    : styles.cardError;

  return (
    <>
      <div className={`${styles.card} ${borderClass}`}>
        {/* ── Card header ──────────────────────────────────── */}
        <div className={styles.cardHeader}>
          <StatusBadge entry={entry} />

          <div className={styles.cardHeaderRight}>
            {/* Maximize button */}
            <button
              className={styles.maximizeBtn}
              onClick={() => setMaximized(true)}
              title="View full detail"
              aria-label="Maximize"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 5V2h3M9 2h3v3M2 9v3h3M12 9v3h-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Expand
            </button>

            {/* Load in Editor */}
            <button
              className={styles.loadBtn}
              onClick={() => onLoadInEditor(entry.code)}
              title="Load this code into the editor"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M2 2h5v2H4v8h8v-3h2v5H2V2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                <path d="M9 2h5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2L8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Load in Editor
            </button>

            {/* Date */}
            <span className={styles.cardDate}>
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.1"/>
                <path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
              {formatDate(entry.timestamp)}
            </span>

            {/* Kebab */}
            <KebabMenu
              entryId={entry.id}
              code={entry.code}
              onDelete={onDelete}
              onMaximize={() => setMaximized(true)}
            />
          </div>
        </div>

        {/* ── Code preview ─────────────────────────────────── */}
        <div className={styles.codeBlock}>
          <pre className={styles.codePre}>
            {previewLines.join('\n')}
            {hasMoreCode && !codeExpanded ? '\n...' : ''}
            {codeExpanded ? '\n' + codeLines.slice(7).join('\n') : ''}
          </pre>
          {hasMoreCode && (
            <button
              className={styles.expandCodeBtn}
              onClick={() => setCodeExpanded(v => !v)}
            >
              {codeExpanded
                ? '▲ Show less'
                : `▼ Show all ${codeLines.length} lines`}
            </button>
          )}
        </div>

        {/* ── Output section ───────────────────────────────── */}
        <OutputSection entry={entry} maximized={false} />

        {/* ── Footer ──────────────────────────────────────── */}
        <div className={styles.cardFooter}>
          <div className={styles.footerChips}>
            {entry.timeMs != null && (
              <span className={styles.chip}>⏱ {entry.timeMs} ms</span>
            )}
            {entry.exitCode != null && !entry.killed && (
              <span className={`${styles.chip} ${entry.exitCode === 0 ? styles.chipGreen : styles.chipRed}`}>
                exit {entry.exitCode}
              </span>
            )}
            {entry.errorType === 'compile-error' && (
              <span className={styles.chipOrange}>⚙ Compile Error</span>
            )}
            {entry.killed && (
              <span className={styles.chipAmber}>⏱ Time Limit</span>
            )}
          </div>
          <span className={styles.timeAgo}>{timeAgo(entry.timestamp)}</span>
        </div>
      </div>

      {/* ── Maximize modal ──────────────────────────────── */}
      {maximized && (
        <MaximizeModal
          entry={entry}
          onClose={() => setMaximized(false)}
          onLoadInEditor={onLoadInEditor}
          onDelete={onDelete}
        />
      )}
    </>
  );
}

// ── Main Panel ────────────────────────────────────────────────────────────────

export default function CompilationHistoryPanel({ onClose, onLoadInEditor }) {
  const [entries, setEntries]       = useState(() => compilationHistoryStore.getAll());
  const [closing, setClosing]       = useState(false);
  const [search, setSearch]         = useState('');
  const [filter, setFilter]         = useState('all');
  const [confirmClear, setConfirmClear] = useState(false);
  const confirmTimerRef = useRef(null);

  useEffect(() => {
    const unsub = compilationHistoryStore.subscribe(setEntries);
    return unsub;
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 270);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  const handleDelete = useCallback((id) => {
    compilationHistoryStore.delete(id);
  }, []);

  const handleClearAll = useCallback(() => {
    if (!confirmClear) {
      setConfirmClear(true);
      clearTimeout(confirmTimerRef.current);
      confirmTimerRef.current = setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    compilationHistoryStore.clearAll();
    setConfirmClear(false);
  }, [confirmClear]);

  const handleLoadInEditor = useCallback((code) => {
    onLoadInEditor?.(code);
    handleClose();
  }, [onLoadInEditor, handleClose]);

  const filtered = useMemo(() => {
    let res = entries;
    if (filter === 'success') res = res.filter(e => e.status === 'success' && !e.killed);
    else if (filter === 'error') res = res.filter(e => e.status === 'error' || e.killed);
    if (search.trim()) {
      const q = search.toLowerCase();
      res = res.filter(e =>
        e.code.toLowerCase().includes(q) ||
        (e.stdout ?? e.output ?? '').toLowerCase().includes(q)
      );
    }
    return res;
  }, [entries, filter, search]);

  const successCount = entries.filter(e => e.status === 'success' && !e.killed).length;
  const errorCount   = entries.filter(e => e.status === 'error' || e.killed).length;

  return (
    <>
      <div className={styles.backdrop} onClick={handleClose} aria-hidden="true" />

      <aside
        className={`${styles.panel} ${closing ? styles.panelClosing : ''}`}
        role="dialog"
        aria-label="Compilation History"
        aria-modal="true"
      >
        {/* ── Header ─────────────────────────────────────── */}
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>
            <div className={styles.panelTitleIcon}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8.5" stroke="#10b981" strokeWidth="1.5"/>
                <path d="M10 5.5v5l3 2" stroke="#10b981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="10" r="1.2" fill="#10b981"/>
              </svg>
            </div>
            Compilation History
          </div>
          <div className={styles.headerActions}>
            {entries.length > 0 && (
              <button
                className={`${styles.clearBtn} ${confirmClear ? styles.clearBtnConfirm : ''}`}
                onClick={handleClearAll}
                onBlur={() => { clearTimeout(confirmTimerRef.current); setConfirmClear(false); }}
                id="history-clear-btn"
              >
                {confirmClear ? '⚠ Confirm?' : 'Clear All'}
              </button>
            )}
            <button
              className={styles.closeBtn}
              onClick={handleClose}
              aria-label="Close"
              id="history-close-btn"
            >×</button>
          </div>
        </div>

        {/* ── Search + Filter ─────────────────────────────── */}
        <div className={styles.searchBar}>
          <div className={styles.searchInputWrapper}>
            <svg className={styles.searchIcon} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search code or output..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search compilations"
            />
            {search && (
              <button className={styles.searchClear} onClick={() => setSearch('')} aria-label="Clear search">×</button>
            )}
          </div>

          <div className={styles.filterRow}>
            {[
              { key: 'all',     label: `All (${entries.length})` },
              { key: 'success', label: `✓ ${successCount}` },
              { key: 'error',   label: `✕ ${errorCount}` },
            ].map(f => (
              <button
                key={f.key}
                className={`${styles.filterPill} ${filter === f.key ? styles.filterPillActive : ''} ${f.key === 'success' ? styles.filterPillSuccess : f.key === 'error' ? styles.filterPillError : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────── */}
        <div className={styles.panelBody}>
          {entries.length === 0 ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                  <circle cx="26" cy="26" r="22" fill="#f0fdf4" stroke="#a7f3d0" strokeWidth="1.5"/>
                  <circle cx="26" cy="26" r="16" fill="none" stroke="#10b981" strokeWidth="1.4"/>
                  <path d="M26 14v13l6 4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="26" cy="26" r="2" fill="#10b981"/>
                </svg>
              </div>
              <p className={styles.emptyTitle}>No compilations yet</p>
              <p className={styles.emptySub}>Click ▶ Run to compile your code.<br/>Each run will appear here.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>No results</p>
              <p className={styles.emptySub}>Try a different search or filter.</p>
            </div>
          ) : (
            <div className={styles.cardList}>
              {filtered.map(entry => (
                <HistoryCard
                  key={entry.id}
                  entry={entry}
                  onLoadInEditor={handleLoadInEditor}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────── */}
        {entries.length > 0 && (
          <div className={styles.panelFooter}>
            <span className={styles.footerDot} style={{ background: '#10b981' }} />
            <span className={styles.footerText}>{successCount} passed</span>
            <span className={styles.footerSep}>·</span>
            <span className={styles.footerDot} style={{ background: '#ef4444' }} />
            <span className={styles.footerText}>{errorCount} failed</span>
            <span className={styles.footerSep}>·</span>
            <span className={styles.footerText}>{entries.length} total</span>
          </div>
        )}
      </aside>
    </>
  );
}
