import { useState, useCallback } from 'react';
import styles from './Header.module.css';
import { BookOpen, Presentation, BarChart2, Clock, Bug, X, Menu, User, ChevronDown } from 'lucide-react';
import { LANGUAGE_META } from '../constants.js';

/**
 * SmartCompiler Header
 *
 * Props:
 *   selectedLanguage — current active language ('c' | 'python' | 'java')
 *   onLanguageChange — callback when user switches language
 *   onBugTrackerToggle — called when the Bug Tracker button is clicked
 *   bugTrackerErrorCount — number to show in the red badge (0 = hide badge)
 */

export default function Header({
  selectedLanguage = 'c',
  onLanguageChange,
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
  isAdmin = false,
  user = null,
  onSignIn,
  onSignOut,
  onMobileAccountClick,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const handleDrawerAction = useCallback((action) => {
    action();
    closeDrawer();
  }, [closeDrawer]);

  return (
    <>
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
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-hidden="true"
              focusable="false"
            >
              <rect x="6" y="6" width="500" height="500" rx="108" fill="#0B192C" stroke="#1E293B" strokeWidth="12" />
              <path d="M200 140 L110 256 L200 372" stroke="white" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M312 140 L402 256 L312 372" stroke="white" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M256 166 Q256 256 316 256 Q256 256 256 346 Q256 256 196 256 Q256 256 256 166 Z" fill="#FF7A00" />
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

        {/* ── RIGHT: Language Select + AI Tutor + Analytics + History + Bug Tracker buttons ──── */}
        <div className={styles.rightSection}>

          {/* Language Selector Dropdown */}
          <div className={styles.langSelectWrap} title="Select Programming Language">
            <span
              className={styles.langDot}
              style={{ backgroundColor: LANGUAGE_META[selectedLanguage]?.color || '#007ACC' }}
            />
            <select
              id="header-language-select"
              className={styles.langSelect}
              value={selectedLanguage}
              onChange={(e) => onLanguageChange?.(e.target.value)}
              aria-label="Select Programming Language"
            >
              <option value="c">C (GCC)</option>
              <option value="python">Python 3</option>
              <option value="java">Java 21</option>
            </select>
            <ChevronDown size={14} className={styles.langSelectArrow} />
          </div>

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
            <Presentation size={15} aria-hidden="true" />
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
            <BookOpen size={16} aria-hidden="true" />
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
            <BarChart2 size={16} aria-hidden="true" />
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
            <Clock size={16} aria-hidden="true" />
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
            <Bug size={17} aria-hidden="true" />
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

        {/* ── MOBILE: Compact right side with avatar + hamburger ────── */}
        <div className={styles.mobileRight}>
          {/* Account button — tapping opens account sheet from top-right */}
          {user ? (
            <button
              className={styles.mobileAvatarBtn}
              onClick={onMobileAccountClick}
              aria-label="Account"
            >
              {user.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata?.full_name || 'User'}
                  className={styles.mobileAvatar}
                  onError={e => { e.target.style.display='none'; }}
                />
              ) : (
                <div className={styles.mobileAvatarFallback}>
                  <User size={18} />
                </div>
              )}
            </button>
          ) : (
            <button className={styles.mobileSignInBtn} onClick={onSignIn} aria-label="Sign In">
              <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </button>
          )}
          {/* Hamburger menu */}
          <button
            id="mobile-menu-btn"
            className={styles.hamburgerBtn}
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
          >
            <Menu size={22} />
          </button>
        </div>

      </header>

      {/* ── Mobile Drawer Backdrop ─────────────────────────────────────── */}
      {drawerOpen && (
        <div
          className={styles.drawerBackdrop}
          onClick={closeDrawer}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      <div className={`${styles.mobileDrawer} ${drawerOpen ? styles.mobileDrawerOpen : ''}`} role="dialog" aria-label="Menu">
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Menu</span>
          <button className={styles.drawerClose} onClick={closeDrawer} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* User section in drawer */}
        {user ? (
          <div className={styles.drawerUserSection}>
            <img
              src={user.user_metadata?.avatar_url || 'https://via.placeholder.com/150'}
              alt={user.user_metadata?.full_name || 'User'}
              className={styles.drawerUserAvatar}
            />
            <div className={styles.drawerUserInfo}>
              <span className={styles.drawerUserName}>{user.user_metadata?.full_name || user.email}</span>
              <button className={styles.drawerSignOutBtn} onClick={() => { onSignOut(); closeDrawer(); }}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <button className={styles.drawerSignInBtn} onClick={() => { onSignIn(); closeDrawer(); }}>
            <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Sign In with Google
          </button>
        )}

        <div className={styles.drawerDivider} />

        {/* Language selector in mobile drawer */}
        <div className={styles.drawerLangSection}>
          <span className={styles.drawerLangTitle}>Programming Language</span>
          <div className={styles.drawerLangPills}>
            {Object.entries(LANGUAGE_META).map(([langKey, meta]) => (
              <button
                key={langKey}
                type="button"
                className={`${styles.drawerLangPill} ${selectedLanguage === langKey ? styles.drawerLangPillActive : ''}`}
                onClick={() => { onLanguageChange?.(langKey); closeDrawer(); }}
              >
                <span className={styles.langDot} style={{ backgroundColor: meta.color }} />
                <span>{meta.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.drawerDivider} />

        {/* Tool buttons in drawer */}
        <div className={styles.drawerActions}>
          <button
            className={`${styles.drawerActionBtn} ${aiTutorOpen ? styles.drawerActionActive : ''}`}
            onClick={() => handleDrawerAction(onAiTutorToggle)}
          >
            <BookOpen size={18} />
            <span>AI Tutor</span>
          </button>

          <button
            className={`${styles.drawerActionBtn} ${analyticsOpen ? styles.drawerActionActive : ''}`}
            onClick={() => handleDrawerAction(onAnalyticsToggle)}
          >
            <BarChart2 size={18} />
            <span>Analytics</span>
          </button>

          <button
            className={styles.drawerActionBtn}
            onClick={() => handleDrawerAction(onHistoryToggle)}
          >
            <Clock size={18} />
            <span>History</span>
            {historyCount > 0 && (
              <span className={styles.drawerBadge}>{historyCount > 99 ? '99+' : historyCount}</span>
            )}
          </button>

          <button
            className={styles.drawerActionBtn}
            onClick={() => handleDrawerAction(onBugTrackerToggle)}
          >
            <Bug size={18} />
            <span>Bug Tracker</span>
            {bugTrackerErrorCount > 0 && (
              <span className={`${styles.drawerBadge} ${styles.drawerBadgeRed}`}>
                {bugTrackerErrorCount > 99 ? '99+' : bugTrackerErrorCount}
              </span>
            )}
          </button>

          {isAdmin && (
            <button
              className={`${styles.drawerActionBtn} ${adminDashboardOpen ? styles.drawerActionActive : ''}`}
              onClick={() => handleDrawerAction(onAdminToggle)}
            >
              <Presentation size={18} />
              <span>Admin Dashboard</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

