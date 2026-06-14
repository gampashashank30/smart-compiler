import { useRef, useCallback, useMemo, useState, useEffect } from 'react';
import { highlightC } from '../highlight.js';
import styles from './EditorPanel.module.css';

// ── Smart editor helpers ─────────────────────────────────────────────────────
const OPEN_TO_CLOSE = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'" };
const CLOSE_CHARS   = new Set([')', '}', ']', '"', "'"]);
const OPEN_CHARS    = new Set(['(', '{', '[', '"', "'"]);

/**
 * Returns the indentation (leading spaces/tabs) of the line containing `pos`.
 */
function getLineIndent(text, pos) {
  const lineStart = text.lastIndexOf('\n', pos - 1) + 1;
  const match = text.slice(lineStart).match(/^[ \t]*/);
  return match ? match[0] : '';
}

export default function EditorPanel({
  code, onChange, onRun, onKill, onClear,
  isRunning = false,
  runStatus = 'idle',  // 'idle' | 'compiling' | 'running'
  // Multi-tab props
  tabs        = [],
  activeTabId = null,
  onTabSwitch,
  onTabAdd,
  onTabClose,
  onTabRename,
}) {
  const textareaRef   = useRef(null);
  const preRef        = useRef(null);
  const gutterRef     = useRef(null);
  const renameInputRef = useRef(null);

  // ── Undo / Redo history stack ─────────────────────────────────────────
  // Each entry: { code, start, end }
  const historyRef      = useRef([{ code, start: 0, end: 0 }]);
  const historyIdxRef   = useRef(0);
  const debounceTimer   = useRef(null);
  // Stores the latest typed state before the debounce timer fires
  const pendingEntryRef = useRef(null);

  // Push a snapshot to the undo stack (called after every programmatic edit)
  const pushHistory = useCallback((newCode, selStart, selEnd) => {
    // Truncate any redo entries ahead of current index
    historyRef.current = historyRef.current.slice(0, historyIdxRef.current + 1);
    historyRef.current.push({ code: newCode, start: selStart ?? 0, end: selEnd ?? 0 });
    historyIdxRef.current = historyRef.current.length - 1;
  }, []);

  // Flush any pending debounced entry into the history immediately
  const flushPending = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    if (pendingEntryRef.current) {
      const { code: c, start: s, end: en } = pendingEntryRef.current;
      pushHistory(c, s, en);
      pendingEntryRef.current = null;
    }
  }, [pushHistory]);

  // Keep the very first snapshot in sync when code is reset externally (tab switch)
  useEffect(() => {
    const cur = historyRef.current[historyIdxRef.current];
    if (cur && cur.code === code) return; // no-op if already matches
    // External reset (e.g. tab switch, AI convert) — clear history for new content
    clearTimeout(debounceTimer.current);
    pendingEntryRef.current = null;
    historyRef.current  = [{ code, start: 0, end: 0 }];
    historyIdxRef.current = 0;
  }, [activeTabId]); // reset when the active tab changes

  // ── Tab rename state ──────────────────────────────────────────────────
  const [editingTabId, setEditingTabId] = useState(null);
  const [editingName,  setEditingName]  = useState('');

  const startRename = useCallback((id, name, e) => {
    e?.stopPropagation();
    setEditingTabId(id);
    setEditingName(name);
  }, []);

  const confirmRename = useCallback(() => {
    if (editingTabId !== null) {
      onTabRename?.(editingTabId, editingName);
      setEditingTabId(null);
    }
  }, [editingTabId, editingName, onTabRename]);

  const cancelRename = useCallback(() => setEditingTabId(null), []);

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

  // ── Smart keyboard handler ──────────────────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    const ta    = textareaRef.current;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const key   = e.key;

    // ── Ctrl+Z → Undo ────────────────────────────────────────────────────────
    if ((e.ctrlKey || e.metaKey) && key === 'z' && !e.shiftKey) {
      e.preventDefault();
      // Commit any pending typed content into history first
      flushPending();
      if (historyIdxRef.current > 0) {
        historyIdxRef.current -= 1;
        const entry = historyRef.current[historyIdxRef.current];
        onChange(entry.code);
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = entry.start;
            textareaRef.current.selectionEnd   = entry.end;
          }
        });
      }
      return;
    }

    // ── Ctrl+Y / Ctrl+Shift+Z → Redo ─────────────────────────────────────────
    if ((e.ctrlKey || e.metaKey) && (key === 'y' || (key === 'z' && e.shiftKey))) {
      e.preventDefault();
      // Commit any pending typed content into history first
      flushPending();
      if (historyIdxRef.current < historyRef.current.length - 1) {
        historyIdxRef.current += 1;
        const entry = historyRef.current[historyIdxRef.current];
        onChange(entry.code);
        requestAnimationFrame(() => {
          if (textareaRef.current) {
            textareaRef.current.selectionStart = entry.start;
            textareaRef.current.selectionEnd   = entry.end;
          }
        });
      }
      return;
    }

    // ── Ctrl+Enter → Run ─────────────────────────────────────────────────────
    if ((e.ctrlKey || e.metaKey) && key === 'Enter') {
      e.preventDefault();
      if (!isRunning) onRun();
      return;
    }

    // ── Tab → 4 spaces (or un-indent selected block) ─────────────────────────
    if (key === 'Tab') {
      e.preventDefault();
      const INDENT = '    ';

      if (start === end) {
        // No selection — insert 4 spaces
        const next = code.substring(0, start) + INDENT + code.substring(end);
        pushHistory(next, start + 4, start + 4);
        onChange(next);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 4;
        });
      } else {
        // Selection — indent/un-indent all selected lines
        const lineStart = code.lastIndexOf('\n', start - 1) + 1;
        const lineEnd   = code.indexOf('\n', end - 1);
        const block     = code.slice(lineStart, lineEnd === -1 ? undefined : lineEnd);
        let   newBlock;
        let   cursorDelta;

        if (e.shiftKey) {
          // Un-indent: remove up to 4 leading spaces per line
          newBlock    = block.replace(/^    /gm, '');
          cursorDelta = -(block.length - newBlock.length);
        } else {
          // Indent: add 4 spaces to every line
          newBlock    = block.replace(/^/gm, INDENT);
          cursorDelta = newBlock.length - block.length;
        }
        const next = code.slice(0, lineStart) + newBlock + code.slice(lineEnd === -1 ? code.length : lineEnd);
        pushHistory(next, lineStart, lineStart + newBlock.length);
        onChange(next);
        requestAnimationFrame(() => {
          ta.selectionStart = lineStart;
          ta.selectionEnd   = lineStart + newBlock.length;
        });
      }
      return;
    }

    // ── Enter — smart indent / bracket expansion ──────────────────────────────
    if (key === 'Enter' && !e.ctrlKey && !e.metaKey) {
      const before = code.substring(0, start);
      const after  = code.substring(end);
      const indent = getLineIndent(code, start);
      const charBefore = before[before.length - 1];
      const charAfter  = after[0];

      // Bracket pair expansion: {| } → {\n    |\n}
      if (charBefore === '{' && charAfter === '}') {
        e.preventDefault();
        const inner = '\n' + indent + '    ';
        const outer = '\n' + indent;
        const next  = before + inner + outer + after;
        const pos   = start + inner.length;
        pushHistory(next, pos, pos);
        onChange(next);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = pos;
        });
        return;
      }

      // Normal Enter — preserve current line indentation
      e.preventDefault();
      const insert = '\n' + indent;
      const next   = before + insert + after;
      const pos    = start + insert.length;
      pushHistory(next, pos, pos);
      onChange(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = pos;
      });
      return;
    }

    // ── Backspace — smart pair deletion ──────────────────────────────────────
    if (key === 'Backspace' && start === end) {
      const charBefore = code[start - 1];
      const charAfter  = code[start];
      if (charBefore && OPEN_TO_CLOSE[charBefore] === charAfter) {
        e.preventDefault();
        const next = code.substring(0, start - 1) + code.substring(start + 1);
        const pos  = start - 1;
        pushHistory(next, pos, pos);
        onChange(next);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = pos;
        });
        return;
      }
    }

    // ── Skip over closing bracket/quote ──────────────────────────────────────
    if (CLOSE_CHARS.has(key) && start === end) {
      const charAfter = code[start];
      if (charAfter === key) {
        e.preventDefault();
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 1;
        });
        return;
      }
    }

    // ── Auto-close brackets & quotes ─────────────────────────────────────────
    if (OPEN_CHARS.has(key) && start === end) {
      const close     = OPEN_TO_CLOSE[key];
      const charAfter = code[start];

      // For quotes: don't auto-close if we're already inside a string
      // (simple heuristic: if same quote char is immediately before cursor)
      if ((key === '"' || key === "'") && code[start - 1] === key) {
        return; // let default behavior happen
      }

      // Don't auto-close if next char is alphanumeric (likely typing a word)
      if (charAfter && /\w/.test(charAfter)) return;

      e.preventDefault();
      const next = code.substring(0, start) + key + close + code.substring(end);
      const pos  = start + 1;
      pushHistory(next, pos, pos);
      onChange(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = pos;
      });
      return;
    }

    // ── Home key — go to first non-whitespace char (or column 0 if already there) ──
    if (key === 'Home' && !e.ctrlKey) {
      e.preventDefault();
      const lineStart  = code.lastIndexOf('\n', start - 1) + 1;
      const lineText   = code.slice(lineStart);
      const firstNonWs = lineText.search(/\S/);
      const firstPos   = firstNonWs === -1 ? lineStart : lineStart + firstNonWs;

      // Toggle: if already at first non-ws, go to column 0
      const targetPos  = start === firstPos ? lineStart : firstPos;
      requestAnimationFrame(() => {
        if (e.shiftKey) {
          ta.selectionStart = targetPos;
          ta.selectionEnd   = end;
        } else {
          ta.selectionStart = ta.selectionEnd = targetPos;
        }
      });
      return;
    }
  }, [code, onChange, onRun, isRunning]);

  const lineCount = code.split('\n').length;

  // ── Download active tab as .c file ──────────────────────────────────────────
  const handleDownload = useCallback(() => {
    const filename = tabs.find(t => t.id === activeTabId)?.name || 'main.c';
    const blob = new Blob([code], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code, tabs, activeTabId]);

  return (
    <div className={styles.panel}>

      {/* ── Tab bar ────────────────────────────────────────────────────── */}
      <div className={styles.tabBar}>
        {/* Scrollable tab list */}
        <div className={styles.tabList}>
          {tabs.map(tab => {
            const isActive  = tab.id === activeTabId;
            const isEditing = editingTabId === tab.id;
            return (
              <div
                key={tab.id}
                className={`${styles.fileTab} ${isActive ? styles.fileTabActive : styles.fileTabInactive}`}
                onClick={() => !isEditing && onTabSwitch?.(tab.id)}
                title={isEditing ? undefined : tab.name}
              >
                <span className={`${styles.fileDot} ${isActive ? '' : styles.fileDotInactive}`} />

                {isEditing ? (
                  <input
                    ref={renameInputRef}
                    className={styles.tabRenameInput}
                    value={editingName}
                    onChange={e => setEditingName(e.target.value)}
                    onBlur={confirmRename}
                    onKeyDown={e => {
                      e.stopPropagation();
                      if (e.key === 'Enter')  confirmRename();
                      if (e.key === 'Escape') cancelRename();
                    }}
                    autoFocus
                    onClick={e => e.stopPropagation()}
                  />
                ) : (
                  <span
                    className={styles.fileName}
                    onDoubleClick={e => startRename(tab.id, tab.name, e)}
                  >
                    {tab.name}
                  </span>
                )}

                {tabs.length > 1 && (
                  <button
                    className={styles.tabClose}
                    onClick={e => { e.stopPropagation(); onTabClose?.(tab.id); }}
                    title="Close"
                    tabIndex={-1}
                    aria-label={`Close ${tab.name}`}
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}

          {/* Add tab button */}
          <button
            className={styles.tabAdd}
            onClick={onTabAdd}
            title="New program"
            tabIndex={-1}
            aria-label="Add new program tab"
          >
            +
          </button>
        </div>

        {/* Right badge */}
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
            onChange={(e) => {
              const newCode = e.target.value;
              const sel     = e.target.selectionStart;
              // Store the latest typed state so flushPending() can commit it
              pendingEntryRef.current = { code: newCode, start: sel, end: sel };
              // Debounce history pushes for regular typing (group within 300 ms)
              clearTimeout(debounceTimer.current);
              debounceTimer.current = setTimeout(() => {
                pushHistory(newCode, sel, sel);
                pendingEntryRef.current = null;
                debounceTimer.current   = null;
              }, 300);
              onChange(newCode);
            }}
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

        {/* Download button */}
        <button
          id="download-btn"
          className={styles.downloadBtn}
          onClick={handleDownload}
          disabled={isRunning}
          title={`Download ${tabs.find(t => t.id === activeTabId)?.name || 'main.c'}`}
          aria-label="Download source file"
        >
          <svg
            width="14" height="14"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M8 1v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M4 7l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 14h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          DOWNLOAD
        </button>

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
