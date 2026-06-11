import styles from './Header.module.css';

/**
 * SmartCompiler Header
 *
 * Logo design rationale (inspired by LeetCode, HackerRank, JetBrains):
 * - A rounded-square container with gradient fill (like JetBrains product logos)
 * - A lightning bolt as the mark — universally signals "fast execution / smart"
 * - Pure SVG paths only — NO SVG <text> nodes (avoids font-load flicker & overlap)
 * - Explicit gap between logoMark and wordmark divs to prevent merging
 */
export default function Header() {
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

      {/* ── CENTER: Nav ──────────────────────────────────────── */}
      <nav className={styles.navCenter} aria-label="Primary navigation">
        <span className={styles.navItem}>Editor</span>
        <span className={styles.navSep} aria-hidden="true" />
        <span className={styles.navItem}>AI&nbsp;Analysis</span>
        <span className={styles.navSep} aria-hidden="true" />
        <span className={styles.navItem}>Learn&nbsp;C</span>
      </nav>

      {/* ── RIGHT: Status badges ─────────────────────────────── */}
      <div className={styles.rightSection} aria-label="Status">
        {/* Pulsing "AI Ready" indicator */}
        <div className={styles.aiBadge}>
          <span className={styles.aiBadgeDot} />
          <span>AI&nbsp;Ready</span>
        </div>

        {/* Language chip */}
        <div className={styles.langChip}>
          {/* Stacked layers icon — represents code layers/language */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M12 2L2 7l10 5 10-5-10-5z"
              stroke="#0891b2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12l10 5 10-5"
              stroke="#0891b2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 17l10 5 10-5"
              stroke="#0891b2"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>C&nbsp;Language</span>
        </div>

        {/* Version */}
        <div className={styles.versionPill}>v 1.0</div>
      </div>

    </header>
  );
}
