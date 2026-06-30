import { useEffect, useRef, useState } from 'react';
import { LANG_NAMES, LANG_COLORS } from '../languageDetector.js';
import styles from './LanguageDetectorPopup.module.css';

/* ─── Per-language theme tokens ─────────────────────────── */
const LANG_THEME = {
  python:     { from: '#fefce8', to: '#fef9c3', border: '#fde68a', glow: 'rgba(234,179,8,0.22)' },
  javascript: { from: '#fefce8', to: '#fef9c3', border: '#fde68a', glow: 'rgba(234,179,8,0.22)' },
  typescript: { from: '#eff6ff', to: '#dbeafe', border: '#60a5fa', glow: 'rgba(49,120,198,0.22)' },
  java:       { from: '#fff7ed', to: '#ffedd5', border: '#fdba74', glow: 'rgba(249,115,22,0.2)' },
  cpp:        { from: '#eff6ff', to: '#dbeafe', border: '#93c5fd', glow: 'rgba(59,130,246,0.2)' },
  c:          { from: '#eff6ff', to: '#dbeafe', border: '#93c5fd', glow: 'rgba(59,130,246,0.2)' },
  go:         { from: '#ecfeff', to: '#cffafe', border: '#67e8f9', glow: 'rgba(0,172,215,0.22)' },
  rust:       { from: '#fff7ed', to: '#ffedd5', border: '#fb923c', glow: 'rgba(206,66,43,0.22)' },
  ruby:       { from: '#fff1f2', to: '#ffe4e6', border: '#fca5a5', glow: 'rgba(204,52,45,0.2)' },
  php:        { from: '#f5f3ff', to: '#ede9fe', border: '#c4b5fd', glow: 'rgba(136,146,190,0.22)' },
  csharp:     { from: '#fdf4ff', to: '#fae8ff', border: '#d8b4fe', glow: 'rgba(155,79,150,0.2)' },
  swift:      { from: '#fff7ed', to: '#ffedd5', border: '#fdba74', glow: 'rgba(250,115,67,0.22)' },
  kotlin:     { from: '#f5f3ff', to: '#ede9fe', border: '#a78bfa', glow: 'rgba(127,82,255,0.2)' },
  r:          { from: '#eff6ff', to: '#dbeafe', border: '#93c5fd', glow: 'rgba(39,109,195,0.2)' },
  bash:       { from: '#f0fdf4', to: '#dcfce7', border: '#86efac', glow: 'rgba(78,170,37,0.2)' },
  sql:        { from: '#fff7ed', to: '#ffedd5', border: '#fcd34d', glow: 'rgba(242,145,17,0.2)' },
  html:       { from: '#fff7ed', to: '#ffedd5', border: '#f97316', glow: 'rgba(227,76,38,0.2)' },
  css:        { from: '#f5f3ff', to: '#ede9fe', border: '#a78bfa', glow: 'rgba(86,61,124,0.2)' },
  lua:        { from: '#eff6ff', to: '#dbeafe', border: '#93c5fd', glow: 'rgba(0,0,128,0.18)' },
  perl:       { from: '#eff6ff', to: '#dbeafe', border: '#93c5fd', glow: 'rgba(57,69,126,0.2)' },
  scala:      { from: '#fff1f2', to: '#ffe4e6', border: '#fca5a5', glow: 'rgba(220,50,47,0.2)' },
  dart:       { from: '#ecfeff', to: '#cffafe', border: '#67e8f9', glow: 'rgba(0,180,171,0.2)' },
  haskell:    { from: '#f5f3ff', to: '#ede9fe', border: '#c4b5fd', glow: 'rgba(94,80,134,0.2)' },
  matlab:     { from: '#fff7ed', to: '#ffedd5', border: '#fdba74', glow: 'rgba(225,103,55,0.2)' },
  unknown:    { from: '#f8fafc', to: '#f1f5f9', border: '#cbd5e1', glow: 'rgba(100,116,139,0.15)' },
};

/* ─── Official SVG language logos (inline) ──────────────────── */
function PythonLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="py-a" x1="12.959%" x2="79.639%" y1="12.039%" y2="79.201%">
          <stop offset="0%" stopColor="#387EB8"/>
          <stop offset="100%" stopColor="#366994"/>
        </linearGradient>
        <linearGradient id="py-b" x1="19.128%" x2="90.742%" y1="20.579%" y2="88.429%">
          <stop offset="0%" stopColor="#FFE052"/>
          <stop offset="100%" stopColor="#FFC331"/>
        </linearGradient>
      </defs>
      <path fill="url(#py-a)" d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zm-34.75 19.146c6.129 0 11.065 4.936 11.065 11.065 0 6.129-4.936 11.065-11.065 11.065-6.129 0-11.065-4.936-11.065-11.065 0-6.129 4.936-11.065 11.065-11.065z"/>
      <path fill="url(#py-b)" d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.519 33.897zm34.309-19.147c-6.129 0-11.065-4.935-11.065-11.064 0-6.129 4.936-11.065 11.065-11.065 6.129 0 11.065 4.936 11.065 11.065 0 6.129-4.936 11.064-11.065 11.064z"/>
    </svg>
  );
}

function JavaScriptLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
      <rect width="256" height="256" rx="20" fill="#F7DF1E"/>
      <path fill="#323330" d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.889-3.092 12.889-15.12v-81.798h24.058v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.994M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.731 12.029c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.579c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.818-24.576"/>
    </svg>
  );
}

function JavaLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 346" xmlns="http://www.w3.org/2000/svg">
      <path fill="#E76F00" d="M82.554 267.473s-13.198 7.675 9.393 10.272c27.369 3.122 41.356 2.675 71.517-3.034 0 0 7.93 4.972 19.003 9.279-67.611 28.978-153.019-1.679-99.913-16.517"/>
      <path fill="#E76F00" d="M74.292 229.659s-14.803 10.958 7.809 13.296c29.275 3.016 52.417 3.262 92.453-4.429 0 0 5.526 5.606 14.217 8.666-81.897 23.953-173.072 1.885-114.479-17.533"/>
      <path fill="#E76F00" d="M143.942 165.515c16.68 19.18-4.38 36.437-4.38 36.437s42.301-21.837 22.874-49.183c-18.144-25.5-32.059-38.172 43.268-81.858 0 0-118.238 29.53-61.762 94.604"/>
      <path fill="#E76F00" d="M233.1 295.442s9.765 8.048-10.76 14.268c-39.016 11.824-162.508 15.393-196.818.471-12.328-5.364 10.787-12.8 18.056-14.357 7.571-1.637 11.907-1.337 11.907-1.337-13.705-9.655-88.583 18.957-38.034 27.15 137.853 22.356 251.339-10.072 215.649-26.195"/>
      <path fill="#E76F00" d="M88.9 190.48s-62.771 14.913-22.228 20.323c17.118 2.292 51.243 1.774 83.03-.89 25.978-2.19 52.063-6.85 52.063-6.85s-9.16 3.923-15.791 8.448c-63.745 16.765-186.886 8.966-151.435-8.183 29.981-14.666 54.361-12.848 54.361-12.848"/>
      <path fill="#E76F00" d="M201.033 253.261c64.875-33.712 34.881-66.107 13.948-61.764-5.129 1.07-7.411 1.997-7.411 1.997s1.903-2.98 5.537-4.27c41.37-14.545 73.187 42.898-13.376 65.661 0 .001.954-.849 1.302-1.624"/>
      <path fill="#E76F00" d="M162.278.982s35.867 35.867-34.032 90.965c-56.063 44.266-12.786 69.498-.022 98.362-32.723-29.53-56.75-55.528-40.635-79.752C111.481 74.602 176.27 57.752 162.278.982"/>
      <path fill="#E76F00" d="M95.302 344.405c62.24 3.982 157.962-2.209 160.216-31.649 0 0-4.353 11.182-51.514 20.018-53.098 9.99-118.573 8.832-157.395 2.425 0 .001 7.95 6.567 48.693 9.206"/>
    </svg>
  );
}

function CppLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 306 344" xmlns="http://www.w3.org/2000/svg">
      <path fill="#659AD2" d="M302.107 258.262c2.803-4.813 4.393-10.361 4.393-16.192V102.01c0-5.831-1.59-11.38-4.394-16.192L153 172z"/>
      <path fill="#00599C" d="M166.25 341.193l126.5-73.034c5.042-2.91 9.01-7.077 11.357-11.897L153 172 41.893 256.262c2.347 4.82 6.315 8.987 11.357 11.897l126.5 73.034c10.083 5.823 22.584 5.823 32.5 0z"/>
      <path fill="#004482" d="M3.893 241.808C1.09 237.052-.5 231.504-.5 225.673V102.01c0-5.831 1.59-11.38 4.393-16.192L153 172z"/>
      <path fill="#659AD2" d="M153 2.807L26.5 75.841C16.416 81.664 9.916 92.6 9.916 104.246v-.236L153 172l143.084-68-.002.236c0-11.646-6.5-22.582-16.583-28.405z"/>
      <path fill="#fff" d="M153 94.5c43.078 0 78 34.922 78 78s-34.922 78-78 78-78-34.922-78-78 34.922-78 78-78z"/>
      <path fill="#00599C" d="M153 116.5c30.928 0 56 25.072 56 56s-25.072 56-56 56-56-25.072-56-56 25.072-56 56-56z"/>
      <path fill="#fff" d="M185.5 161h14v9h-14v14h-9v-14h-14v-9h14v-14h9v14zM217.5 161h14v9h-14v14h-9v-14h-14v-9h14v-14h9v14z"/>
      <path d="M121.5 172.5h63M153 141v63" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round"/>
    </svg>
  );
}

function CLogo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 306 344" xmlns="http://www.w3.org/2000/svg">
      <path fill="#A8B9CC" d="M302.107 258.262c2.803-4.813 4.393-10.361 4.393-16.192V102.01c0-5.831-1.59-11.38-4.394-16.192L153 172z"/>
      <path fill="#6B8FA9" d="M166.25 341.193l126.5-73.034c5.042-2.91 9.01-7.077 11.357-11.897L153 172 41.893 256.262c2.347 4.82 6.315 8.987 11.357 11.897l126.5 73.034c10.083 5.823 22.584 5.823 32.5 0z"/>
      <path fill="#4A708B" d="M3.893 241.808C1.09 237.052-.5 231.504-.5 225.673V102.01c0-5.831 1.59-11.38 4.393-16.192L153 172z"/>
      <path fill="#A8B9CC" d="M153 2.807L26.5 75.841C16.416 81.664 9.916 92.6 9.916 104.246v-.236L153 172l143.084-68-.002.236c0-11.646-6.5-22.582-16.583-28.405z"/>
      <path fill="#fff" d="M153 94.5c43.078 0 78 34.922 78 78s-34.922 78-78 78-78-34.922-78-78 34.922-78 78-78z"/>
      <path fill="#A8B9CC" d="M153 116.5c30.928 0 56 25.072 56 56s-25.072 56-56 56-56-25.072-56-56 25.072-56 56-56z"/>
      <path fill="#fff" d="M178.5 148.5a40 40 0 1 0 0 47" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

/* Map lang key → SVG logo component */
const LANG_LOGOS = {
  python:     PythonLogo,
  javascript: JavaScriptLogo,
  java:       JavaLogo,
  cpp:        CppLogo,
  c:          CLogo,
};

/* Emoji fallback icons for languages without custom SVG logos */
const LANG_EMOJI = {
  typescript: '🟦',
  go:         '🐹',
  rust:       '🦀',
  ruby:       '💎',
  php:        '🐘',
  csharp:     '🎯',
  swift:      '🦅',
  kotlin:     '🎨',
  r:          '📊',
  bash:       '🐚',
  sql:        '🗄️',
  html:       '🌐',
  css:        '🎨',
  lua:        '🌙',
  perl:       '🐪',
  scala:      '⚡',
  dart:       '🎯',
  haskell:    '🔣',
  matlab:     '📐',
};

/* Small inline logo for score bar rows */
function SmallLogo({ lang, size = 16 }) {
  const Logo = LANG_LOGOS[lang];
  if (Logo) return <Logo size={size} />;
  const emoji = LANG_EMOJI[lang];
  if (emoji) return <span style={{ fontSize: size, lineHeight: 1 }}>{emoji}</span>;
  return null;
}

/**
 * LanguageDetectorPopup — with per-language signal drill-down
 */
export default function LanguageDetectorPopup({
  detectedLang,
  confidence,
  signals = [],
  scores = {},
  signalsMap = {},
  onConfirm,
  onDismiss,
  converting = false,
}) {
  const popupRef = useRef(null);
  const [expandedLang, setExpandedLang] = useState(null);

  const langColor = LANG_COLORS[detectedLang] ?? '#10b981';
  const langName  = LANG_NAMES[detectedLang]  ?? detectedLang;
  const theme     = LANG_THEME[detectedLang]  ?? LANG_THEME.unknown;
  const HeroLogo  = LANG_LOGOS[detectedLang]  ?? null;
  const heroEmoji = LANG_EMOJI[detectedLang]  ?? null;

  // Trap focus
  useEffect(() => { popupRef.current?.focus(); }, []);

  // Escape key — close expanded panel first, then dismiss popup
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (expandedLang) setExpandedLang(null);
        else onDismiss();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onDismiss, expandedLang]);

  // Top languages for mini score bars (exclude 'c' & 'unknown')
  const barLangs = Object.entries(scores)
    .filter(([l]) => l !== 'c' && l !== 'unknown')
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const toggleExpand = (lang) =>
    setExpandedLang(prev => prev === lang ? null : lang);

  return (
    <div
      className={styles.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) onDismiss(); }}
    >
      <div
        className={styles.popup}
        ref={popupRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Language detected"
        style={{
          '--lang-color':   langColor,
          '--lang-bg-from': theme.from,
          '--lang-bg-to':   theme.to,
          '--lang-border':  theme.border,
          '--lang-glow':    theme.glow,
        }}
      >
        {/* ── Header ─────────────────────────────────── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.radarIcon} aria-hidden="true">⬡</span>
            <span className={styles.title}>Language Detector</span>
          </div>
          <button className={styles.closeBtn} onClick={onDismiss} aria-label="Dismiss" title="Dismiss (Esc)">
            ✕
          </button>
        </div>

        {/* ── Body ───────────────────────────────────── */}
        <div className={styles.body}>

          {/* Language hero */}
          <div className={styles.langHero}>
            <div className={styles.langIconWrap} aria-hidden="true">
              {HeroLogo
                ? <HeroLogo size={34} />
                : heroEmoji
                  ? <span style={{ fontSize: 32, lineHeight: 1 }}>{heroEmoji}</span>
                  : <span style={{ fontSize: 28 }}>🔍</span>
              }
            </div>
            <div className={styles.langTextStack}>
              <span className={styles.langName}>{langName}</span>
              <span className={styles.langSubtitle}>code detected in editor</span>
            </div>
          </div>

          {/* Confidence bar */}
          <div className={styles.confidenceCard}>
            <div className={styles.confidenceHeader}>
              <span className={styles.confidenceLabel}>Confidence</span>
              <span className={styles.confidenceVal}>{confidence}%</span>
            </div>
            <div className={styles.confidenceTrack}>
              <div className={styles.confidenceFill} style={{ width: `${confidence}%` }} />
            </div>
          </div>

          {/* Matched signals — top language */}
          {signals.length > 0 && (
            <div className={styles.signalsWrap}>
              <span className={styles.signalsLabel}>Matched signals</span>
              <div className={styles.signalsList}>
                {signals.slice(0, 6).map((s) => (
                  <span key={s} className={styles.signalPill}>{s}</span>
                ))}
                {signals.length > 6 && (
                  <span className={styles.signalPill}>+{signals.length - 6} more</span>
                )}
              </div>
            </div>
          )}

          {/* Language score bars + expandable signal panels */}
          {barLangs.length > 0 && (
            <div className={styles.scoresWrap}>
              {barLangs.map(([lang, pct]) => {
                const langSignals = signalsMap[lang] ?? [];
                const isExpanded  = expandedLang === lang;
                const hasSignals  = langSignals.length > 0;
                const barColor    = LANG_COLORS[lang] ?? '#94a3b8';

                return (
                  <div key={lang} className={styles.scoreBlock}>
                    {/* Score row */}
                    <div className={styles.scoreRow}>
                      <span className={styles.scoreLang}>
                        <SmallLogo lang={lang} size={14} />
                        {LANG_NAMES[lang] ?? lang}
                      </span>
                      <div className={styles.scoreTrack}>
                        <div
                          className={styles.scoreFill}
                          style={{ width: `${pct}%`, background: barColor }}
                        />
                      </div>
                      <span className={styles.scorePct}>{pct}%</span>

                      {/* ⓘ info / expand button */}
                      <button
                        className={`${styles.infoBtn} ${isExpanded ? styles.infoBtnActive : ''}`}
                        onClick={() => toggleExpand(lang)}
                        aria-label={`${isExpanded ? 'Hide' : 'Show'} matched signals for ${LANG_NAMES[lang] ?? lang}`}
                        title={isExpanded ? 'Hide matched keywords' : 'Show matched keywords'}
                        disabled={!hasSignals}
                        style={{ '--info-color': barColor }}
                      >
                        {isExpanded ? '▲' : 'ⓘ'}
                      </button>
                    </div>

                    {/* Expandable signals panel */}
                    <div
                      className={`${styles.expandPanel} ${isExpanded ? styles.expandPanelOpen : ''}`}
                      aria-hidden={!isExpanded}
                    >
                      {hasSignals ? (
                        <>
                          <span className={styles.expandLabel}>
                            Matched keywords · {langSignals.length} found
                          </span>
                          <div className={styles.expandPills}>
                            {langSignals.map((s) => (
                              <span
                                key={s}
                                className={styles.expandPill}
                                style={{ '--pill-color': barColor }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <span className={styles.expandEmpty}>No signals matched</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Question row */}
          <div className={styles.questionRow}>
            <div className={styles.questionLogoSmall} aria-hidden="true">
              {HeroLogo
                ? <HeroLogo size={20} />
                : heroEmoji
                  ? <span style={{ fontSize: 20, lineHeight: 1 }}>{heroEmoji}</span>
                  : null
              }
            </div>
            <p className={styles.questionText}>
              Is this{' '}
              <span className={styles.questionLang}>{langName}</span>
              {' '}code? Convert it to C?
            </p>
          </div>
        </div>

        {/* ── Actions ────────────────────────────────── */}
        <div className={styles.actions}>
          <button
            id="lang-detect-wrong-btn"
            className={styles.wrongBtn}
            onClick={onDismiss}
            disabled={converting}
            aria-label="Keep as C — do not convert"
          >
            <span className={styles.wrongIcon}>✕</span>
            <span>Keep as C</span>
          </button>

          <button
            id="lang-detect-correct-btn"
            className={styles.correctBtn}
            onClick={onConfirm}
            disabled={converting}
            aria-label="Yes, convert to C"
          >
            {converting ? (
              <>
                <span className={styles.spinner} />
                <span>Converting…</span>
              </>
            ) : (
              <>
                <span className={styles.correctIcon}>✓</span>
                <span>Yes, Convert to C</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}