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
import AdminDashboard from './components/AdminDashboard.jsx';
import { bugTrackerStore } from './bugTracker.js';
import { compilationHistoryStore } from './compilationHistory.js';
import { STARTER_CODE, LANG_TO_C_PROMPT } from './constants.js';
import { detectLanguage } from './languageDetector.js';
import { callClaude, parseJSON } from './api.js';
import { readUploadedFile } from './fileUploader.js';
import { useAuth } from './useAuth.js';
import { analyticsStore } from './analytics.js';
import { sanitizeAiCode } from './aiCodeUtils.js';
import { supabase } from './supabaseClient.js';
import styles from './App.module.css';

// ISSUE 7 FIX: Build the WebSocket URL using a short-lived ticket, NOT the raw JWT.
// Flow:
//   1. Exchange the Supabase JWT for a 30s ticket via POST /api/ws-ticket
//   2. Connect to WS using ?ticket=<uuid> — JWT never appears in URL or access logs
async function buildWsUrl() {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token || '';
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const base  = `${proto}//${window.location.host}/ws/run`;

  if (!token) return base; // unauthenticated — server will reject anyway

  try {
    // Exchange JWT for a 30-second single-use ticket
    const resp = await fetch('/api/ws-ticket', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (resp.ok) {
      const { ticket } = await resp.json();
      return `${base}?ticket=${encodeURIComponent(ticket)}`;
    }
  } catch {
    // Network error — fall back to token param (old behaviour, still auth'd)
    console.warn('[buildWsUrl] Could not get WS ticket — falling back to token param');
  }

  // Fallback: if ticket endpoint failed, use token directly (still secure, just logged)
  return `${base}?ticket=invalid`; // server will reject with clear message
}

// Minimum confidence (0-100) required before we show the popup
const DETECT_CONFIDENCE_THRESHOLD = 28;



export default function App() {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  // Redirect to login if user is not authenticated and loading is complete
  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login.html';
    }
  }, [user, loading]);

  // Initialize analytics store with the logged-in user
  useEffect(() => {
    analyticsStore.init(user);
  }, [user]);

  // Track time spent on the website when user is logged in (5-second heartbeats)
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      analyticsStore.addTimeSpent(5);
    }, 5000);

    return () => {
      clearInterval(interval);
      analyticsStore.syncTimeSpent();
    };
  }, [user]);



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

  // ── Admin Dashboard state ──────────────────────────────────────
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const handleAdminToggle = useCallback(() => {
    setAdminDashboardOpen(prev => !prev);
  }, []);

  // ── Is-admin check (server-side, no emails in frontend bundle) ──────────
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!user) { setIsAdmin(false); return; }
    supabase.auth.getSession().then(({ data: { session } }) => {
      const token = session?.access_token;
      if (!token) return;
      fetch('/api/admin/is-admin', {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(r => r.ok ? r.json() : { isAdmin: false })
        .then(data => setIsAdmin(!!data.isAdmin))
        .catch(() => setIsAdmin(false));
    });
  }, [user]);

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
      analyticsStore.recordErrors(stats.errors);
    });
    return unsub;
  }, []);

  const handleBugTrackerToggle = useCallback(() => {
    setBugPanelOpen(prev => !prev);
  }, []);

  // ── Multi-tab state ────────────────────────────────────────────────────────
  const [tabs, setTabs]               = useState([{ id: 1, name: 'main.c', code: STARTER_CODE }]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [isUploading, setIsUploading] = useState(false);

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
  // Brief success toast shown after a successful conversion
  const [conversionToast, setConversionToast] = useState(null);
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
    setIsUploading(true);
    try {
      const { content, filename } = await readUploadedFile(file);
      const id = Date.now();
      setTabs(prev => [...prev, { id, name: filename, code: content }]);
      setActiveTabId(id);
      dismissedCodeRef.current = null;
      setShowLangPopup(false);
    } catch (err) {
      alert(err.message || 'Failed to read the file.');
    } finally {
      setIsUploading(false);
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
    const stats = analyticsStore.getStats();
    if (analyticsStore.isLimitReached()) {
      alert(`You have used ${stats.ai_tokens_used}/${stats.token_limit} tokens according to your limit for AI analysis.`);
      setShowLangPopup(false);
      return;
    }
    setConverting(true);
    try {
      const userMessage = `The following is ${langDetect.language} code. Please translate it to C:\n\n${code}`;
      const raw = await callClaude(LANG_TO_C_PROMPT, userMessage);
      console.log('RAW AI RESPONSE:', raw);
      const parsed = parseJSON(raw);
      console.log('PARSED JSON:', parsed);
      if (parsed?.c_code) {
        // sanitizeAiCode strips markdown fences and fixes double-escaped
        // structural newlines while preserving C string escapes.
        const cCode = sanitizeAiCode(parsed.c_code);
        // 1. Load converted C code into the editor and close the popup.
        setCode(cCode);
        setShowLangPopup(false);
        dismissedCodeRef.current = cCode; // mark as C so next Run skips popup
        // 2. The editor is always on the left — show a success toast so the
        //    user knows the code has been loaded and they can click Run.
        setConversionToast(`✓ Converted to C! Click Run ▶ to execute.`);
        setTimeout(() => setConversionToast(null), 5000);
      } else {
        // AI responded but returned no c_code field — show useful error
        const preview = raw ? raw.slice(0, 200) : '(empty response)';
        alert(`Conversion failed: The AI did not return valid C code.\n\nAI response preview:\n${preview}`);
        setShowLangPopup(false);
      }
    } catch (err) {
      console.error('[LangDetect] Conversion failed:', err);
      if (err.message.includes('Limit Reached') || err.message.includes('limit reached') || analyticsStore.isLimitReached()) {
        alert(`You have used ${stats.ai_tokens_used}/${stats.token_limit} tokens according to your limit for AI analysis.`);
      } else {
        alert(`Failed to convert code: ${err.message || 'Unknown error'}`);
      }
      // Don't crash the app — just close the popup
      setShowLangPopup(false);
    } finally {
      setConverting(false);
    }
  }, [code, langDetect, setCode]);

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
      buildWsUrl().then(wsUrl => terminalRef.current?.connect(wsUrl, code));
      analyticsStore.recordRun();
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

    // Build WS URL with JWT token, then connect
    buildWsUrl().then(wsUrl => {
      terminalRef.current?.connect(wsUrl, code);
    });
    analyticsStore.recordRun();
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

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#0d1117',
        color: '#c9d1d9',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #161b22',
          borderTop: '3px solid #0fa57c',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}></div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <div style={{ marginTop: '16px', fontSize: '14px', color: '#8b949e' }}>Verifying session...</div>
      </div>
    );
  }

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
        onAdminToggle={handleAdminToggle}
        adminDashboardOpen={adminDashboardOpen}
        isAdmin={isAdmin}
        user={user}
        onSignIn={signInWithGoogle}
        onSignOut={signOut}
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

      {/* Admin Dashboard — only rendered for admin email, modal overlay */}
      {adminDashboardOpen && (
        <AdminDashboard onClose={() => setAdminDashboardOpen(false)} />
      )}

      {/* OCR/Upload Overlay */}
      {isUploading && (
        <div className={styles.uploadOverlay}>
          <div className={styles.uploadSpinnerContainer}>
            <div className={styles.uploadSpinner}></div>
            <div className={styles.uploadText}>Extracting Code with OCR...</div>
          </div>
        </div>
      )}

      {/* Conversion success toast — shown after "Yes, Convert to C" */}
      {conversionToast && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #0fa57c, #0d8f6a)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '10px',
          fontFamily: "'Inter', sans-serif",
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '0.02em',
          boxShadow: '0 8px 32px rgba(15,165,124,0.45)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'slideUp 0.3s ease',
          cursor: 'pointer',
        }} onClick={() => setConversionToast(null)}>
          <span style={{ fontSize: '18px' }}>✓</span>
          <span>{conversionToast}</span>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}
