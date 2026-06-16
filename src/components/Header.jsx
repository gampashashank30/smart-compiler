import styles from './Header.module.css';

/**
 * SmartCompiler Header
 *
 * Logo design rationale (inspired by LeetCode, HackerRank, JetBrains):
 * - A rounded-square container with gradient fill (like JetBrains product logos)
 * - A lightning bolt as the mark — universally signals "fast execution / smart"
 * - Pure SVG paths only — NO SVG <text> nodes (avoids font-load flicker & overlap)
 * - Explicit gap between logoMark and wordmark divs to prevent merging
 *
 * Props:
 *   onBugTrackerToggle — called when the Bug Tracker button is clicked
 *   bugTrackerErrorCount — number to show in the red badge (0 = hide badge)
 */
export default function Header({ onBugTrackerToggle, bugTrackerErrorCount = 0, onHistoryToggle, historyCount = 0, onAnalyticsToggle, analyticsOpen = false, onAiTutorToggle, aiTutorOpen = false }) {
  return (
    <header className={styles.header}>

      {/* ── LEFT: Logo icon + wordmark ───────────────────────── */}
      <div className={styles.brand}>

        {/* 
          Logo mark: 40×40 rounded square with green→teal gradient.
          Lightning bolt is drawn entirely as a polygon — zero SVG text.
          IDs are namespaced with "sc-" to avoid conflicts with other SVGs.
        */}
        <div className={styles.logoBox} aria-label="SmartCompiler">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
            focusable="false"
          >
            {/* Background rounded-square */}
            <rect width="40" height="40" rx="11" fill="url(#sc-grad)" />

            {/* 
              Lightning bolt — classic "flash" shape.
              Top point → left-middle → jog-right → bottom point → right-middle → jog-left.
              Scaled to fit 40×40 with comfortable inset (8px each side).
            */}
            <polygon
              points="24,8  13,23  20,23  16,33  27,18  20,18"
              fill="white"
              fillRule="evenodd"
            />

            <defs>
              <linearGradient
                id="sc-grad"
                x1="0" y1="0"
                x2="40" y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%"   stopColor="#10b981" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Wordmark — separated from logo by explicit margin in CSS */}
        <div className={styles.wordmark}>
          <div className={styles.brandName}>
            <span className={styles.wordSmart}>Smart</span>
            <span className={styles.wordCompiler}>Compiler</span>
          </div>
          <p className={styles.tagline}>
            Write &nbsp;·&nbsp; Analyze &nbsp;·&nbsp; Learn
          </p>
        </div>
      </div>

      {/* ── RIGHT: AI Tutor + Analytics + History + Bug Tracker buttons ──── */}
      <div className={styles.rightSection}>

        {/* AI Tutor button */}
        <button
          id="ai-tutor-toggle-btn"
          className={`${styles.aiTutorBtn} ${aiTutorOpen ? styles.aiTutorBtnActive : ''}`}
          onClick={onAiTutorToggle}
          aria-label="Open AI Tutor overlay"
          title="AI Tutor"
        >
          <span className={styles.aiTutorBtnIcon} aria-hidden="true">🎓</span>
          <span className={styles.aiTutorBtnLabel}>AI Tutor</span>
        </button>

        {/* Analytics button */}
        <button
          id="analytics-toggle-btn"
          className={`${styles.analyticsBtn} ${analyticsOpen ? styles.analyticsBtnActive : ''}`}
          onClick={onAnalyticsToggle}
          aria-label="Open Analytics Dashboard"
          title="Analytics Dashboard"
        >
          <span className={styles.analyticsBtnIcon} aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="12" width="3" height="6" rx="1" fill="currentColor" opacity="0.6"/>
              <rect x="7" y="8" width="3" height="10" rx="1" fill="currentColor" opacity="0.75"/>
              <rect x="12" y="4" width="3" height="14" rx="1" fill="currentColor" opacity="0.9"/>
              <rect x="17" y="1" width="3" height="17" rx="1" fill="currentColor"/>
            </svg>
          </span>
          <span className={styles.analyticsBtnLabel}>Analytics</span>
        </button>

        {/* History button */}
        <button
          id="history-toggle-btn"
          className={styles.historyBtn}
          onClick={onHistoryToggle}
          aria-label="Open Compilation History panel"
          title="Compilation History"
        >
          {/* Clock icon */}
          <span className={styles.historyBtnIcon} aria-hidden="true">
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M10 5.5v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="10" r="1" fill="currentColor"/>
            </svg>
          </span>
          <span className={styles.historyBtnLabel}>History</span>
          {/* Count badge — shows total compilations */}
          {historyCount > 0 && (
            <span className={styles.historyBadge} aria-label={`${historyCount} compilations recorded`}>
              {historyCount > 99 ? '99+' : historyCount}
            </span>
          )}
        </button>

        {/* Bug Tracker button */}
        <button
          id="bug-tracker-toggle-btn"
          className={styles.bugTrackerBtn}
          onClick={onBugTrackerToggle}
          aria-label="Open Bug Tracker panel"
          title="Bug Tracker — analytics dashboard"
        >
          {/* Hand-drawn beetle SVG icon */}
          <span className={styles.bugTrackerBtnIcon} aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="10" cy="11.5" rx="5" ry="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <ellipse cx="10" cy="7.2" rx="3" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1.3"/>
              <line x1="10" y1="7.5" x2="10" y2="17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <line x1="5.2" y1="9.5" x2="2" y2="7.2"  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="5.2" y1="12"  x2="1.5" y2="12"  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="5.2" y1="14.5" x2="2" y2="16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="14.8" y1="9.5" x2="18" y2="7.2"  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="14.8" y1="12"  x2="18.5" y2="12"  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <line x1="14.8" y1="14.5" x2="18" y2="16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <circle cx="8.3" cy="6.8" r="0.7" fill="currentColor"/>
              <circle cx="11.7" cy="6.8" r="0.7" fill="currentColor"/>
            </svg>
          </span>
          <span className={styles.bugTrackerBtnLabel}>Bug Tracker</span>

          {/* Pulsing error count badge */}
          {bugTrackerErrorCount > 0 && (
            <span className={styles.bugTrackerBadge} aria-label={`${bugTrackerErrorCount} errors recorded`}>
              <span className={styles.bugTrackerBadgeDot} />
              {bugTrackerErrorCount > 99 ? '99+' : bugTrackerErrorCount}
            </span>
          )}
        </button>
      </div>

    </header>
  );
}
