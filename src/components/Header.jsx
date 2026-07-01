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

export default function Header({
  onBugTrackerToggle,
  bugTrackerErrorCount = 0,
  onHistoryToggle,
  historyCount = 0,
  onAnalyticsToggle,
  analyticsOpen = false,
  onAiTutorToggle,
  aiTutorOpen = false,
  onAdminToggle,
  adminDashboardOpen = false,
  isAdmin = false,        // ← resolved server-side via /api/admin/is-admin
  user = null,
  onSignIn,
  onSignOut
}) {
  return (
    <header className={styles.header}>

      {/* ── LEFT: Logo icon + wordmark → links back to landing page ─── */}
      <a href="/" className={styles.brand} aria-label="SmartCompiler home — return to landing page">

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
      </a>

      {/* ── RIGHT: AI Tutor + Analytics + History + Bug Tracker buttons ──── */}
      <div className={styles.rightSection}>

        {/* Admin Dashboard button — only visible to admin (resolved server-side) */}
        {isAdmin && (
          <button
            id="admin-dashboard-btn"
            className={`${styles.aiTutorBtn} ${adminDashboardOpen ? styles.aiTutorBtnActive : ''}`}
            onClick={onAdminToggle}
            aria-label="Open Admin Dashboard"
            title="Admin Dashboard"
            style={adminDashboardOpen ? { borderColor: '#a7f3d0', color: '#059669', background: '#f0fdf4' } : {}}
          >
            <span className={styles.aiTutorBtnIcon} aria-hidden="true" style={{ fontSize: '14px' }}>⚙️</span>
            <span className={styles.aiTutorBtnLabel}>Admin</span>
          </button>
        )}

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

        {/* Google Authentication */}
        {user ? (
          <div className={styles.profileContainer}>
            <img
              src={user.user_metadata?.avatar_url || 'https://via.placeholder.com/150'}
              alt={user.user_metadata?.full_name || 'User'}
              className={styles.userAvatar}
            />
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user.user_metadata?.full_name || user.email}</span>
              <button className={styles.signOutBtn} onClick={onSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button className={styles.loginBtn} onClick={onSignIn}>
            <span className={styles.loginBtnIcon}>
              <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </span>
            Sign In
          </button>
        )}
      </div>

    </header>
  );
}
