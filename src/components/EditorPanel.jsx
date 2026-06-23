import { useRef, useCallback, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { getAcceptString } from '../fileUploader.js';
import styles from './EditorPanel.module.css';

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
  onFileUpload,
}) {
  const editorRef     = useRef(null);
  const renameInputRef = useRef(null);

  // ── Stable refs for Monaco command closures ──────────────────────────────
  // Monaco's addCommand captures these at mount time, so we use refs to always
  // have the latest values without re-registering commands.
  const isRunningRef = useRef(isRunning);
  const onRunRef     = useRef(onRun);
  useEffect(() => { isRunningRef.current = isRunning; }, [isRunning]);
  useEffect(() => { onRunRef.current = onRun; }, [onRun]);

  // ── Per-tab Monaco view state (cursor, scroll, undo stack) ──────────────
  const prevTabIdRef  = useRef(activeTabId);
  const viewStatesRef = useRef({});       // { [tabId]: ICodeEditorViewState }

  // ── Tab rename state ──────────────────────────────────────────────────────
  const [editingTabId, setEditingTabId] = useState(null);
  const [editingName,  setEditingName]  = useState('');

  // ── Add-tab dropdown state ────────────────────────────────────────────────
  const [showAddMenu, setShowAddMenu] = useState(false);
  const addMenuRef   = useRef(null);
  const addBtnRef    = useRef(null);
  const fileInputRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showAddMenu) return;
    const handleClick = (e) => {
      if (
        addMenuRef.current && !addMenuRef.current.contains(e.target) &&
        addBtnRef.current  && !addBtnRef.current.contains(e.target)
      ) {
        setShowAddMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showAddMenu]);

  // Calculate dropdown position from the + button's bounding rect
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const openAddMenu = useCallback(() => {
    setShowAddMenu(prev => {
      if (!prev && addBtnRef.current) {
        const rect = addBtnRef.current.getBoundingClientRect();
        setMenuPos({ top: rect.bottom + 6, left: rect.left });
      }
      return !prev;
    });
  }, []);

  // Handle file selection from the hidden <input>
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) onFileUpload(file);
    // Reset input so re-uploading the same file works
    e.target.value = '';
    setShowAddMenu(false);
  }, [onFileUpload]);

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

  // ── Monaco: mount handler ─────────────────────────────────────────────────
  const handleEditorDidMount = useCallback((editor, monaco) => {
    editorRef.current = editor;

    // ── Custom GitHub Dark theme — matches the app's existing colour palette ──
    monaco.editor.defineTheme('github-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword',              foreground: 'd2a8ff' },
        { token: 'comment',              foreground: '444c56', fontStyle: 'italic' },
        { token: 'comment.doc',          foreground: '444c56', fontStyle: 'italic' },
        { token: 'string',               foreground: '7ee787' },
        { token: 'string.escape',        foreground: '7ee787' },
        { token: 'number',               foreground: 'ff7b72' },
        { token: 'number.hex',           foreground: 'ff7b72' },
        { token: 'number.float',         foreground: 'ff7b72' },
        { token: 'delimiter',            foreground: '79c0ff' },
        { token: 'delimiter.bracket',    foreground: '79c0ff' },
        { token: 'delimiter.parenthesis',foreground: '79c0ff' },
        { token: 'delimiter.square',     foreground: '79c0ff' },
        { token: 'type',                 foreground: 'ffa657' },
        { token: 'type.identifier',      foreground: 'ffa657' },
        { token: 'identifier',           foreground: 'adbac7' },
        { token: 'operator',             foreground: '79c0ff' },
        { token: 'annotation',           foreground: 'd2a8ff' },
        { token: 'keyword.directive',    foreground: 'd2a8ff' },
        { token: 'keyword.directive.include', foreground: '7ee787' },
      ],
      colors: {
        'editor.background':                   '#0d1117',
        'editor.foreground':                   '#adbac7',
        'editorLineNumber.foreground':         '#3d444d',
        'editorLineNumber.activeForeground':   '#8b949e',
        'editor.lineHighlightBackground':      '#161b2266',
        'editor.lineHighlightBorder':          '#00000000',
        'editorCursor.foreground':             '#c9d1d9',
        'editor.selectionBackground':          '#264f78',
        'editor.inactiveSelectionBackground':  '#264f7866',
        'editorIndentGuide.background1':       '#21262d',
        'editorIndentGuide.activeBackground1': '#30363d',
        'editorWhitespace.foreground':         '#21262d',
        'scrollbarSlider.background':          '#2d333b88',
        'scrollbarSlider.hoverBackground':     '#444c56bb',
        'scrollbarSlider.activeBackground':    '#484f58',
        // Suggest / autocomplete widget
        'editorWidget.background':             '#161b22',
        'editorWidget.border':                 '#30363d',
        'editorSuggestWidget.background':      '#161b22',
        'editorSuggestWidget.border':          '#30363d',
        'editorSuggestWidget.selectedBackground': '#21262d',
        'editorSuggestWidget.highlightForeground': '#58a6ff',
        // List + input
        'list.hoverBackground':                '#21262d',
        'list.activeSelectionBackground':      '#264f78',
        'input.background':                    '#0d1117',
        'input.border':                        '#30363d',
        'focusBorder':                         '#58a6ff',
        // Find widget
        'editorFindMatch.background':          '#264f7866',
        'editorFindMatchHighlight.background': '#264f7833',
        'editorFindWidget.background':         '#161b22',
      },
    });
    monaco.editor.setTheme('github-dark');

    // ── Ctrl+Enter → Run ──────────────────────────────────────────────────────
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
      () => { if (!isRunningRef.current) onRunRef.current?.(); }
    );

    editor.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Tab switch: save / restore per-tab Monaco view state ─────────────────
  // This effect MUST be declared BEFORE the generic code-change effect so that
  // React runs it first when both activeTabId and code change simultaneously.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const prevId = prevTabIdRef.current;
    if (prevId === activeTabId) return; // same tab — nothing to do

    // Save the departing tab's view state (cursor, scroll, undo stack)
    viewStatesRef.current[prevId] = editor.saveViewState();
    prevTabIdRef.current = activeTabId;

    // Load new tab's content (code is already the new tab's value here)
    editor.setValue(code);

    // Restore saved view state or snap to top of file
    const saved = viewStatesRef.current[activeTabId];
    if (saved) {
      editor.restoreViewState(saved);
    } else {
      editor.setPosition({ lineNumber: 1, column: 1 });
      editor.revealPosition({ lineNumber: 1, column: 1 });
    }
  }, [activeTabId]); // eslint-disable-line react-hooks/exhaustive-deps
  // ^^ `code` is intentionally omitted — it is always current when activeTabId changes.

  // ── External code changes (AI fix, load from history, CLEAR, file upload) ─
  // When Monaco itself typed the change, editor.getValue() === code → we skip.
  // When something external updated the code prop, we push the new value in.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (editor.getValue() === code) return; // no-op: Monaco already has this value
    editor.setValue(code);
  }, [code]);

  // ── Download active tab as .c file ───────────────────────────────────────
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

      {/* ── Tab bar ─────────────────────────────────────────────────────────── */}
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

          {/* Add tab dropdown button */}
          <div style={{ alignSelf: 'center', marginLeft: '6px' }}>
            <button
              ref={addBtnRef}
              className={styles.tabAdd}
              onClick={openAddMenu}
              title="New tab or upload file"
              tabIndex={-1}
              aria-label="Add new tab or upload file"
            >
              +
            </button>
          </div>

          {/* Hidden file input for uploads */}
          <input
            ref={fileInputRef}
            type="file"
            accept={getAcceptString()}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            aria-hidden="true"
          />
        </div>

        {/* Dropdown menu rendered OUTSIDE the tabList to avoid overflow clipping */}
        {showAddMenu && (
          <div
            ref={addMenuRef}
            className={styles.addMenu}
            style={{ position: 'fixed', top: menuPos.top, left: menuPos.left }}
          >
            <button
              className={styles.addMenuItem}
              onClick={() => {
                fileInputRef.current?.click();
                setShowAddMenu(false);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 17h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M10 13V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M6 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload File
            </button>
            <button
              className={styles.addMenuItem}
              onClick={() => {
                onTabAdd?.();
                setShowAddMenu(false);
              }}
            >
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 8v4M8 10h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              New Tab
            </button>
          </div>
        )}

        {/* Right badge */}
        <div className={styles.tabRight}>
          <span className={styles.langDot} />
          <span className={styles.tabMeta}>C Language</span>
        </div>
      </div>

      {/* ── Monaco Editor ───────────────────────────────────────────────────── */}
      <div className={styles.editorBody}>
        <Editor
          height="100%"
          width="100%"
          defaultLanguage="c"
          defaultValue={code}
          onMount={handleEditorDidMount}
          onChange={(value) => onChange(value ?? '')}
          loading={
            <div className={styles.editorLoading}>
              <span className={styles.editorLoadingDot} />
              Loading editor…
            </div>
          }
          options={{
            fontSize:              13.5,
            fontFamily:            "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace",
            fontLigatures:         true,
            lineHeight:            22,               // ≈ 13.5 × 1.65
            minimap:               { enabled: false },
            scrollBeyondLastLine:  false,
            automaticLayout:       true,             // auto-resize on panel drag
            tabSize:               4,
            insertSpaces:          true,
            autoIndent:            'full',
            formatOnPaste:         true,
            bracketPairColorization: { enabled: true },
            cursorBlinking:        'smooth',
            cursorSmoothCaretAnimation: 'on',
            renderLineHighlight:   'line',
            smoothScrolling:       true,
            padding:               { top: 16, bottom: 16 },
            scrollbar: {
              verticalScrollbarSize:   8,
              horizontalScrollbarSize: 8,
            },
            suggest: {
              showKeywords:  true,
              showSnippets:  true,
              showFunctions: true,
              showVariables: true,
            },
            wordWrap:              'off',
            renderWhitespace:      'none',
            occurrencesHighlight:  'off',
            links:                 false,
          }}
        />
      </div>

      {/* ── Bottom run bar ──────────────────────────────────────────────────── */}
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
