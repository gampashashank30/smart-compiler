import { useState, useRef, useCallback, useEffect } from 'react';
import Header from './components/Header.jsx';
import EditorPanel from './components/EditorPanel.jsx';
import DragDivider from './components/DragDivider.jsx';
import RightPanel from './components/RightPanel.jsx';
import LanguageDetectorPopup from './components/LanguageDetectorPopup.jsx';
import BugTrackerPanel from './components/BugTrackerPanel.jsx';
import CompilationHistoryPanel from './components/CompilationHistoryPanel.jsx';
import AnalyticsPanel from './components/AnalyticsPanel.jsx';
import AiTutorPanel from './components/AiTutorPanel.jsx';
import { bugTrackerStore } from './bugTracker.js';
import { compilationHistoryStore } from './compilationHistory.js';
import { STARTER_CODE, LANG_TO_C_PROMPT } from './constants.js';
import { detectLanguage } from './languageDetector.js';
import { callClaude, parseJSON } from './api.js';
import { readUploadedFile } from './fileUploader.js';
import styles from './App.module.css';

// WebSocket URL — Vite proxies /ws → ws://localhost:3001 in dev
const WS_URL = (() => {
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${window.location.host}/ws/run`;
})();

// Minimum confidence (0-100) required before we show the popup
const DETECT_CONFIDENCE_THRESHOLD = 28;

/**
 * When an LLM double-escapes every newline (structural \n and C-string \n
 * alike become the two-char sequence backslash-n), we need to unescape only
 * the STRUCTURAL ones (outside string literals) back to real newlines.
 * C-string escapes like printf("hello\n") must stay as backslash-n so
 * they compile and display correctly.
 */
function unescapeStructuralNewlines(code) {
  let result  = '';
  let inStr   = false; // inside a C double-quoted string
  let i       = 0;

  while (i < code.length) {
    const ch   = code[i];
    const next = code[i + 1];

    if (inStr) {
      if (ch === '\\') {
        // Any escape sequence inside a string — copy both chars as-is
        result += ch + (next ?? '');
        i += 2;
        continue;
      }
      if (ch === '"') {
        inStr = false; // closing quote
      }
      result += ch;
      i++;
    } else {
      if (ch === '"') {
        inStr = true; // opening quote
        result += ch;
        i++;
        continue;
      }
      // Outside a string: convert \n sequence → real newline
      if (ch === '\\' && next === 'n') {
        result += '\n';
        i += 2;
        continue;
      }
      // Outside a string: convert \t sequence → real tab
      if (ch === '\\' && next === 't') {
        result += '\t';
        i += 2;
        continue;
      }
      result += ch;
      i++;
    }
  }

  return result;
}



export default function App() {
  // ── History panel state ──────────────────────────────────────────────────
  const [historyPanelOpen, setHistoryPanelOpen] = useState(false);
  const [historyCount, setHistoryCount] = useState(
    () => compilationHistoryStore.getAll().length
  );

  useEffect(() => {
    const unsub = compilationHistoryStore.subscribe((entries) => {
      setHistoryCount(entries.length);
    });
    return unsub;
  }, []);

  const handleHistoryToggle = useCallback(() => {
    setHistoryPanelOpen(prev => !prev);
  }, []);

  // ── Analytics state ──────────────────────────────────────────────────────
  const [analyticsPanelOpen, setAnalyticsPanelOpen] = useState(false);
  const handleAnalyticsToggle = useCallback(() => {
    setAnalyticsPanelOpen(prev => !prev);
  }, []);

  // ── Bug Tracker state ────────────────────────────────────────────────────
  const [bugPanelOpen, setBugPanelOpen] = useState(false);
  const [bugErrorCount, setBugErrorCount] = useState(
    () => bugTrackerStore.getStats().errors
  );

  // ── AI Tutor state ───────────────────────────────────────────────────────
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const handleAiTutorToggle = useCallback(() => {
    setAiTutorOpen(prev => !prev);
  }, []);

  // Listen for bugtracker:record events dispatched by TerminalPane
  useEffect(() => {
    const onRecord = (e) => {
      bugTrackerStore.record(e.detail);
      setBugErrorCount(bugTrackerStore.getStats().errors);
    };
    window.addEventListener('bugtracker:record', onRecord);
    return () => window.removeEventListener('bugtracker:record', onRecord);
  }, []);

  // Keep badge count in sync when store is reset externally
  useEffect(() => {
    const unsub = bugTrackerStore.subscribe((stats) => {
      setBugErrorCount(stats.errors);
    });
    return unsub;
  }, []);

  const handleBugTrackerToggle = useCallback(() => {
    setBugPanelOpen(prev => !prev);
  }, []);

  // ── Multi-tab state ────────────────────────────────────────────────────────
  const [tabs, setTabs]               = useState([{ id: 1, name: 'main.c', code: STARTER_CODE }]);
  const [activeTabId, setActiveTabId] = useState(1);

  // Derived: always the active tab's code
  const activeProgramTab = tabs.find(t => t.id === activeTabId) ?? tabs[0];
  const code             = activeProgramTab.code;
  const setCode          = useCallback(
    (newCode) => setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, code: newCode } : t)),
    [activeTabId]
  );

  // Load code from history into the active editor tab (defined after setCode)
  const handleLoadFromHistory = useCallback((historyCode) => {
    setCode(historyCode);
  }, [setCode]);
  const [runStatus, setRunStatus] = useState('idle'); // 'idle' | 'compiling' | 'running'
  const [activeTab, setActiveTab] = useState('terminal');

  // Panel width: left panel percent of total workspace width
  const [leftWidth, setLeftWidth] = useState(55);
  const containerRef = useRef(null);
  const draggingRef  = useRef(false);

  // Ref to the TerminalPane's imperative API
  const terminalRef = useRef(null);

  // ── Language detector state ──────────────────────────────────────────────
  const [langDetect, setLangDetect] = useState(null);
  // { language, confidence, signals, scores }
  const [showLangPopup, setShowLangPopup] = useState(false);
  const [converting, setConverting]       = useState(false);
  // Stores the exact code the user dismissed detection for ("Keep as C")
  const dismissedCodeRef = useRef(null);

  // ── Tab management ───────────────────────────────────────────────────────────
  const handleTabAdd = useCallback(() => {
    const id = Date.now();
    setTabs(prev => {
      const num = prev.length + 1;
      return [...prev, { id, name: `program${num}.c`, code: '' }];
    });
    setActiveTabId(id);
    dismissedCodeRef.current = null;
    setShowLangPopup(false);
  }, []);

  const handleTabClose = useCallback((closingId) => {
    setTabs(prev => {
      if (prev.length === 1) return prev; // never close the last tab
      const closingIdx = prev.findIndex(t => t.id === closingId);
      const next       = prev.filter(t => t.id !== closingId);
      if (activeTabId === closingId) {
        const newActive = next[Math.min(closingIdx, next.length - 1)];
        setActiveTabId(newActive.id);
        dismissedCodeRef.current = null;
        setShowLangPopup(false);
      }
      return next;
    });
  }, [activeTabId]);

  const handleTabSwitch = useCallback((id) => {
    if (id === activeTabId) return;
    setActiveTabId(id);
    dismissedCodeRef.current = null;
    setShowLangPopup(false);
  }, [activeTabId]);

  const handleTabRename = useCallback((id, name) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, name: name.trim() || t.name } : t));
  }, []);

  // ── File upload handler ─────────────────────────────────────────────────────
  const handleFileUpload = useCallback(async (file) => {
    try {
      const { content, filename } = await readUploadedFile(file);
      const id = Date.now();
      setTabs(prev => [...prev, { id, name: filename, code: content }]);
      setActiveTabId(id);
      dismissedCodeRef.current = null;
      setShowLangPopup(false);
    } catch (err) {
      alert(err.message || 'Failed to read the file.');
    }
  }, []);

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

  // Language detection runs only on Run click (see handleRun below)

  // ── Dismiss popup ─────────────────────────────────────────────────────────
  const handleDismissPopup = useCallback(() => {
    setShowLangPopup(false);
    // Remember the exact code that was dismissed — skip popup on next Run
    dismissedCodeRef.current = code;
  }, [code]);

  // ── Convert to C via AI ───────────────────────────────────────────────────
  const handleConvertToC = useCallback(async () => {
    if (!langDetect) return;
    setConverting(true);
    try {
      const userMessage = `The following is ${langDetect.language} code. Please translate it to C:\n\n${code}`;
      const raw = await callClaude(LANG_TO_C_PROMPT, userMessage);
      console.log('RAW AI RESPONSE:', raw);
      const parsed = parseJSON(raw);
      console.log('PARSED JSON:', parsed);
      if (parsed?.c_code) {
        let cCode = parsed.c_code;
        console.log('C CODE BEFORE UNESCAPE:', JSON.stringify(cCode));

        // Strip accidental markdown fences
        cCode = cCode.replace(/^```[\w]*\n?/m, '').replace(/\n?```$/m, '').trim();

        // Edge case: LLM double-escaped every newline so there are no real
        // newlines at all — every line break is a literal \n two-char sequence.
        // We must unescape ONLY the structural \n (between code lines),
        // NOT the \n inside C string literals like printf("hello\n").
        if (!cCode.includes('\n')) {
          cCode = unescapeStructuralNewlines(cCode);
        }

        setCode(cCode);
        setShowLangPopup(false);
        dismissedCodeRef.current = null; // reset — converted code is fresh C
        // Brief visual feedback — switch to terminal tab
        setActiveTab('terminal');
        // Show a note in terminal if available
        terminalRef.current?.clear?.();
      }
    } catch (err) {
      console.error('[LangDetect] Conversion failed:', err);
      // Don't crash the app — just close the popup
      setShowLangPopup(false);
    } finally {
      setConverting(false);
    }
  }, [code, langDetect]);

  // ── Run — connect WebSocket and send code for interactive execution ─────
  const handleRun = useCallback(() => {
    if (!code.trim()) {
      terminalRef.current?.clear();
      return;
    }
    if (runStatus === 'compiling' || runStatus === 'running') return;

    // ── Detect language immediately on Run (no debounce) ──────────────────
    // Skip if user already dismissed for this exact code ("Keep as C")
    if (dismissedCodeRef.current === code) {
      setActiveTab('terminal');
      terminalRef.current?.connect(WS_URL, code);
      return;
    }

    const result = detectLanguage(code);
    if (
      result.language !== 'c' &&
      result.language !== 'unknown' &&
      result.confidence >= DETECT_CONFIDENCE_THRESHOLD
    ) {
      setLangDetect(result);
      setShowLangPopup(true);
      // Don't connect the WebSocket yet — let the user decide
      return;
    }

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
      setShowLangPopup(false);
    }
  }, [setCode]);

  // ── Apply AI fix ──────────────────────────────────────────────────────────
  const handleApplyFix = useCallback((newCode) => {
    setCode(newCode);
  }, [setCode]);

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
      <Header
        onBugTrackerToggle={handleBugTrackerToggle}
        bugTrackerErrorCount={bugErrorCount}
        onHistoryToggle={handleHistoryToggle}
        historyCount={historyCount}
        onAnalyticsToggle={handleAnalyticsToggle}
        analyticsOpen={analyticsPanelOpen}
        onAiTutorToggle={handleAiTutorToggle}
        aiTutorOpen={aiTutorOpen}
      />

      <div className={styles.workspace} ref={containerRef}>
        {/* Left — Editor */}
        <div
          className={styles.leftPane}
          style={{ width: `${leftWidth}%` }}
        >
          <EditorPanel
            code={code}
            onChange={setCode}
            tabs={tabs}
            activeTabId={activeTabId}
            onTabSwitch={handleTabSwitch}
            onTabAdd={handleTabAdd}
            onTabClose={handleTabClose}
            onTabRename={handleTabRename}
            onFileUpload={handleFileUpload}
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

      {/* Language Detector Popup — rendered outside the split layout */}
      {showLangPopup && langDetect && (
        <LanguageDetectorPopup
          detectedLang={langDetect.language}
          confidence={langDetect.confidence}
          signals={langDetect.signals}
          scores={langDetect.scores}
          signalsMap={langDetect.signalsMap ?? {}}
          onConfirm={handleConvertToC}
          onDismiss={handleDismissPopup}
          converting={converting}
        />
      )}

      {/* Analytics Panel — slides in from right */}
      {analyticsPanelOpen && (
        <AnalyticsPanel onClose={() => setAnalyticsPanelOpen(false)} />
      )}

      {/* Bug Tracker Panel — slides in from right */}
      {bugPanelOpen && (
        <BugTrackerPanel onClose={() => setBugPanelOpen(false)} />
      )}

      {/* Compilation History Panel — slides in from right */}
      {historyPanelOpen && (
        <CompilationHistoryPanel
          onClose={() => setHistoryPanelOpen(false)}
          onLoadInEditor={handleLoadFromHistory}
        />
      )}

      {/* AI Tutor Panel — full screen overlay */}
      {aiTutorOpen && (
        <AiTutorPanel onClose={() => setAiTutorOpen(false)} />
      )}
    </div>
  );
}
