import { useState, useEffect, useCallback, useRef } from 'react';
import { bugTrackerStore, ERROR_TYPES, TIPS, MAX_SESSIONS } from '../bugTracker.js';
import styles from './BugTrackerPanel.module.css';

// ─── Donut chart (pure SVG, no libs) ─────────────────────────────────────────
// hoveredType / onHover are lifted to parent so MistakeCards react too
function DonutChart({ byType, totalErrors, hoveredType, onHover }) {
  const R = 68;
  const STROKE = 16;
  const circumference = 2 * Math.PI * R;
  const CX = 88;
  const CY = 88;

  const sorted = Object.entries(byType)
    .filter(([k]) => k !== 'Successful Run')
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const total = sorted.reduce((s, [, c]) => s + c, 0) || 1;

  let offset = 0;
  const segments = sorted.map(([type, count]) => {
    const pct = count / total;
    const len = pct * circumference;
    const seg = { type, count, pct, len, offset };
    offset += len;
    return seg;
  });

  if (totalErrors === 0) {
    return (
      <div className={styles.donutSection}>
        <div className={styles.donutWrapper}>
          <svg className={styles.donutSvg} width="176" height="176" viewBox="0 0 176 176">
            <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f1f5f9" strokeWidth={STROKE} />
          </svg>
          <div className={styles.donutCenter}>
            <span className={styles.donutCount}>0</span>
            <span className={styles.donutLabel}>Errors</span>
          </div>
        </div>
        <p style={{ fontSize: 12, color: '#94a3b8', textAlign: 'center', margin: 0 }}>
          Run your code to start tracking errors
        </p>
      </div>
    );
  }

  return (
    <div className={styles.donutSection}>
      <div className={styles.donutWrapper}>
        <svg className={styles.donutSvg} width="176" height="176" viewBox="0 0 176 176">
          <circle cx={CX} cy={CY} r={R} fill="none" stroke="#f1f5f9" strokeWidth={STROKE} />
          {segments.map((seg, i) => {
            const color = ERROR_TYPES[seg.type]?.color ?? '#94a3b8';
            const isHov = hoveredType === seg.type;
            const isAnyHov = hoveredType !== null;
            return (
              <circle
                key={seg.type}
                cx={CX} cy={CY} r={R}
                fill="none"
                stroke={color}
                strokeWidth={isHov ? STROKE + 6 : STROKE}
                strokeLinecap="round"
                strokeDasharray={`${seg.len - 2} ${circumference - seg.len + 2}`}
                strokeDashoffset={-seg.offset}
                style={{
                  transition: 'stroke-width 0.2s ease, opacity 0.2s ease',
                  opacity: isAnyHov && !isHov ? 0.25 : 1,
                  animation: `dashIn 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms both`,
                  cursor: 'pointer',
                  filter: isHov ? `drop-shadow(0 0 6px ${color}99)` : 'none',
                }}
                onMouseEnter={() => onHover(seg.type)}
                onMouseLeave={() => onHover(null)}
              />
            );
          })}
          <style>{`@keyframes dashIn { from { stroke-dashoffset: ${circumference}; opacity: 0; } }`}</style>
        </svg>
        {/* Center label: shows hovered type name or total count */}
        <div className={styles.donutCenter}>
          {hoveredType ? (
            <>
              <span className={styles.donutHovIcon}>{ERROR_TYPES[hoveredType]?.icon ?? '?'}</span>
              <span className={styles.donutHovName} style={{ color: ERROR_TYPES[hoveredType]?.color ?? '#1e293b' }}>
                {hoveredType.length > 14 ? hoveredType.slice(0, 13) + '…' : hoveredType}
              </span>
            </>
          ) : (
            <>
              <span className={styles.donutCount}>{totalErrors}</span>
              <span className={styles.donutLabel}>Total</span>
            </>
          )}
        </div>
      </div>
      <div className={styles.donutLegend}>
        {segments.map((seg) => {
          const color = ERROR_TYPES[seg.type]?.color ?? '#94a3b8';
          const isHov = hoveredType === seg.type;
          const isAnyHov = hoveredType !== null;
          return (
            <div
              key={seg.type}
              className={styles.legendItem}
              style={{ opacity: isAnyHov && !isHov ? 0.35 : 1, transition: 'opacity 0.2s', cursor: 'pointer' }}
              onMouseEnter={() => onHover(seg.type)}
              onMouseLeave={() => onHover(null)}
            >
              <span
                className={styles.legendDot}
                style={{
                  background: color,
                  transform: isHov ? 'scale(1.5)' : 'scale(1)',
                  transition: 'transform 0.2s ease',
                }}
              />
              <span className={styles.legendName} style={{ fontWeight: isHov ? 700 : 500 }}>{seg.type}</span>
              <span className={styles.legendPct} style={{ color }}>{Math.round(seg.pct * 100)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Scroll-reveal section wrapper ───────────────────────────────────────────
function Section({ title, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.sectionBlock} ${visible ? styles.sectionVisible : styles.sectionHidden}`}
    >
      {title && <div className={styles.sectionLabel}>{title}</div>}
      {children}
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ number, label, color, delay = 0 }) {
  return (
    <div className={styles.statCard} style={{ animationDelay: `${delay}ms` }}>
      <div className={styles.statAccent} style={{ background: color }} />
      <div className={styles.statBody}>
        <div className={styles.statNumber} style={{ color }}>{number ?? '—'}</div>
        <div className={styles.statLabel}>{label}</div>
      </div>
    </div>
  );
}

// ─── Rank badge ───────────────────────────────────────────────────────────────
function RankBadge({ rank }) {
  const cls =
    rank === 1 ? styles.rankGold :
    rank === 2 ? styles.rankOrange :
    rank === 3 ? styles.rankGray :
    styles.rankLight;
  return <span className={`${styles.rankBadge} ${cls}`}>#{rank}</span>;
}

// ─── Common Mistakes card (clickable) ────────────────────────────────────────
function MistakeCard({ type, count, rank, maxCount, isSelected, onSelect, animDelay = 0, hoveredType, onHover }) {
  const meta = ERROR_TYPES[type] ?? { icon: '?', color: '#6b7280', bg: '#f9fafb' };
  const pct  = maxCount > 0 ? (count / maxCount) * 100 : 0;
  const hasTips = Boolean(TIPS[type]?.length);

  const isHov    = hoveredType === type;
  const isAnyHov = hoveredType !== null;

  return (
    <div
      className={`${styles.mistakeCard} ${isSelected ? styles.mistakeCardSelected : ''} ${hasTips ? styles.mistakeCardClickable : ''}`}
      style={{
        animationDelay: `${animDelay}ms`,
        opacity: isAnyHov && !isHov ? 0.35 : 1,
        transform: isHov ? 'translateY(-4px) scale(1.02)' : undefined,
        boxShadow: isHov ? `0 0 0 2px ${meta.color}, 0 8px 28px ${meta.color}33` : undefined,
        transition: 'opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
        zIndex: isHov ? 2 : undefined,
      }}
      onClick={() => hasTips && onSelect(type)}
      onMouseEnter={() => onHover(type)}
      onMouseLeave={() => onHover(null)}
      role={hasTips ? 'button' : undefined}
      tabIndex={hasTips ? 0 : undefined}
      aria-pressed={hasTips ? isSelected : undefined}
      onKeyDown={hasTips ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(type); } } : undefined}
      title={hasTips ? `View learning tips for ${type}` : undefined}
    >
      <RankBadge rank={rank} />

      {/* Tip indicator dot */}
      {hasTips && (
        <span
          className={styles.tipIndicator}
          style={{ background: isSelected ? meta.color : '#cbd5e1' }}
          title="Click to see tips"
        />
      )}

      <div
        className={styles.mistakeIconBox}
        style={{
          background: isSelected ? meta.color : meta.bg,
          color: isSelected ? '#ffffff' : meta.color,
        }}
      >
        {meta.icon}
      </div>
      <div className={styles.mistakeName}>{type}</div>
      <div className={styles.mistakeSubtitle}>
        {hasTips ? (isSelected ? '▼ Showing tips below' : 'Click to view tips') : 'Often missed in your code'}
      </div>
      <div className={styles.mistakeFreqRow}>
        <span className={styles.mistakeFreqLabel}>Frequency</span>
        <span
          className={styles.mistakeFreqPill}
          style={{ background: isSelected ? meta.color : meta.bg, color: isSelected ? '#fff' : meta.color }}
        >
          {count} {count === 1 ? 'time' : 'times'}
        </span>
      </div>
      <div className={styles.mistakeBar}>
        <div
          className={styles.mistakeBarFill}
          style={{ width: `${pct}%`, background: meta.color }}
        />
      </div>
    </div>
  );
}

// ─── Tips section ─────────────────────────────────────────────────────────────
function TipsSection({ selectedType, defaultType }) {
  // Show selected type's tips if available, else fall back to default (top error)
  const activeType = (selectedType && TIPS[selectedType]?.length) ? selectedType : defaultType;
  const tipList    = TIPS[activeType] ?? TIPS['Compilation Error'];
  const meta       = ERROR_TYPES[activeType] ?? { color: '#10b981', bg: '#ecfdf5', icon: '?' };
  const isFiltered = selectedType && selectedType !== defaultType && TIPS[selectedType]?.length;

  return (
    <div>
      {/* Header row */}
      <div className={styles.tipsSectionHeader}>
        <div className={styles.sectionLabel} style={{ marginBottom: 0 }}>
          💡 Learning Tips
        </div>

        {/* Active filter chip */}
        <div
          className={styles.tipsFilterChip}
          style={{
            background: meta.bg,
            borderColor: meta.color,
            color: meta.color,
          }}
        >
          <span
            className={styles.tipsFilterDot}
            style={{ background: meta.color }}
          />
          {activeType}
        </div>
      </div>

      {/* Subtitle describing what's shown */}
      <p className={styles.tipsSubtitle}>
        {isFiltered
          ? `Showing tips for "${activeType}" — click another card to switch`
          : `Showing tips for your most frequent error`}
      </p>

      {/* Tip cards — re-animate when activeType changes via key */}
      <div className={styles.tipsSection} key={activeType}>
        {tipList.map((tip, i) => (
          <div key={i} className={styles.tipCard} style={{ borderLeftColor: meta.color }}>
            <span className={styles.tipNum} style={{ background: meta.color }}>{i + 1}</span>
            <span className={styles.tipText}>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Panel component ─────────────────────────────────────────────────────
export default function BugTrackerPanel({ onClose }) {
  const [stats, setStats]               = useState(() => bugTrackerStore.getStats());
  const [tleDismissed, setTleDismissed] = useState(false);
  const [closing, setClosing]           = useState(false);
  // Which mistake card the user last clicked (null = auto — shows top error type's tips)
  const [selectedType, setSelectedType] = useState(null);
  // Shared hover state — syncs donut segments ↔ mistake cards
  const [hoveredType, setHoveredType]   = useState(null);

  // Subscribe to store updates
  useEffect(() => {
    const unsub = bugTrackerStore.subscribe(setStats);
    return unsub;
  }, []);

  // Animated close
  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 270);
  }, [onClose]);

  const handleReset = useCallback(() => {
    bugTrackerStore.reset();
    setTleDismissed(false);
    setSelectedType(null);
  }, []);

  // Close on backdrop click
  const handleBackdrop = useCallback(() => handleClose(), [handleClose]);

  // Keyboard: Escape to close
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  // Toggle: clicking the same card again deselects it
  const handleCardSelect = useCallback((type) => {
    setSelectedType(prev => (prev === type ? null : type));
  }, []);

  // Derived
  const { totalRuns, errors, successes, byType, consecutiveTLE } = stats;
  const accuracy = totalRuns > 0 ? ((successes / totalRuns) * 100).toFixed(1) : null;

  const sortedTypes = Object.entries(byType)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const maxCount  = sortedTypes[0]?.[1] ?? 1;
  const topType   = sortedTypes[0]?.[0] ?? 'Compilation Error';
  const showTLE   = consecutiveTLE >= 3 && !tleDismissed;
  const hasData   = totalRuns > 0;

  return (
    <>
      {/* Backdrop */}
      <div className={styles.backdrop} onClick={handleBackdrop} aria-hidden="true" />

      {/* Panel */}
      <aside
        className={`${styles.panel} ${closing ? styles.panelClosing : ''}`}
        role="dialog"
        aria-label="Bug Tracker Analytics"
        aria-modal="true"
      >
        {/* ── Sticky header ─────────────────────────────── */}
        <div className={styles.panelHeader}>
          <div className={styles.headerGradient} />
          <div className={styles.panelTitle}>
            <div className={styles.panelTitleIcon}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="10" cy="11" rx="5" ry="6" fill="#10b981" stroke="#059669" strokeWidth="1.2"/>
                <ellipse cx="10" cy="7" rx="3" ry="2.5" fill="#059669" stroke="#047857" strokeWidth="1"/>
                <line x1="10" y1="7" x2="10" y2="17" stroke="#047857" strokeWidth="1" strokeLinecap="round"/>
                <line x1="5" y1="9" x2="2" y2="7"  stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="5" y1="11" x2="1.5" y2="11" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="5" y1="13" x2="2" y2="15" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="15" y1="9" x2="18" y2="7"  stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="15" y1="11" x2="18.5" y2="11" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="15" y1="13" x2="18" y2="15" stroke="#059669" strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="8.5" cy="6.5" r="0.8" fill="white"/>
                <circle cx="11.5" cy="6.5" r="0.8" fill="white"/>
              </svg>
            </div>
            Bug Tracker
          </div>
          <div className={styles.headerActions}>
            {hasData && (
              <span
                style={{
                  fontSize: '0.7rem',
                  color: totalRuns >= MAX_SESSIONS ? '#f59e0b' : '#94a3b8',
                  fontVariantNumeric: 'tabular-nums',
                  marginRight: 4,
                }}
                title={totalRuns >= MAX_SESSIONS
                  ? 'Local event limit reached — older events will be archived to PostgreSQL once the database is integrated'
                  : `Tracking last ${MAX_SESSIONS} events locally`
                }
              >
                {totalRuns >= MAX_SESSIONS ? '⚠ ' : ''}{totalRuns} / {MAX_SESSIONS}
              </span>
            )}
            <button className={styles.resetBtn} onClick={handleReset} id="bug-tracker-reset">
              Reset Analytics
            </button>
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close panel" id="bug-tracker-close">
              ×
            </button>
          </div>
        </div>

        {/* ── Scrollable body ───────────────────────────── */}
        <div className={styles.panelBody}>

          {!hasData ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyStateIcon}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <ellipse cx="16" cy="18" rx="8" ry="9" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5"/>
                  <ellipse cx="16" cy="12" rx="5" ry="4" fill="#a7f3d0" stroke="#059669" strokeWidth="1.2"/>
                  <line x1="8" y1="14" x2="3" y2="11" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="8" y1="18" x2="2" y2="18" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="8" y1="22" x2="3" y2="25" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="24" y1="14" x2="29" y2="11" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="24" y1="18" x2="30" y2="18" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="24" y1="22" x2="29" y2="25" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className={styles.emptyStateTitle}>No compile attempts yet</p>
              <p className={styles.emptyStateSub}>
                Click ▶ Run to compile your code.<br/>
                Errors and patterns will appear here.
              </p>
            </div>
          ) : (
            <>
              {/* ── 1. Summary stats ──────────────────── */}
              <Section title="Overview">
                <div className={styles.statsGrid}>
                  <StatCard number={totalRuns}  label="Total Runs"      color="#3b82f6" delay={0} />
                  <StatCard number={errors}     label="Errors Found"    color="#ef4444" delay={60} />
                  <StatCard number={successes}  label="Successful Runs" color="#059669" delay={120} />
                  <StatCard
                    number={accuracy !== null ? `${accuracy}%` : '—'}
                    label="Accuracy"
                    color="#f59e0b"
                    delay={180}
                  />
                </div>
              </Section>

              {/* ── 2. Donut chart ────────────────────── */}
              {errors > 0 && (
                <Section title="Error Breakdown">
                  <DonutChart
                    byType={byType}
                    totalErrors={errors}
                    hoveredType={hoveredType}
                    onHover={setHoveredType}
                  />
                </Section>
              )}

              {/* ── Infinite Loop Banner ──────────────── */}
              {showTLE && (
                <div className={styles.tleBanner}>
                  <div className={styles.tleBannerContent}>
                    <div className={styles.tleBannerTitle}>
                      ⚠ Infinite Loop Pattern Detected
                    </div>
                    <div className={styles.tleBannerText}>
                      Your last {consecutiveTLE} runs were killed. Check for loops missing increment or incorrect conditions.<br/>
                      <strong>Common causes:</strong> <code>for(;;)</code>, <code>while(1)</code> without break, missing <code>i++</code>
                    </div>
                  </div>
                  <button
                    className={styles.tleBannerClose}
                    onClick={() => setTleDismissed(true)}
                    aria-label="Dismiss"
                  >×</button>
                </div>
              )}

              {/* ── 3. Common Mistakes ────────────────── */}
              {sortedTypes.length > 0 && (
                <Section>
                  <div className={styles.sectionHeading}>
                    <div className={styles.sectionHeadingTitle}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 1L11.09 6.26L17 6.27L12.45 9.74L14.18 15L9 11.77L3.82 15L5.55 9.74L1 6.27L6.91 6.26L9 1Z" fill="#f97316" stroke="#ea580c" strokeWidth="1" strokeLinejoin="round"/>
                      </svg>
                      Common Mistakes To Avoid
                    </div>
                    <p className={styles.sectionHeadingSubtitle}>
                      Click a card to view learning tips for that error type
                    </p>
                  </div>
                  <div className={styles.mistakesGrid}>
                    {sortedTypes.map(([type, count], i) => (
                      <MistakeCard
                        key={type}
                        type={type}
                        count={count}
                        rank={i + 1}
                        maxCount={maxCount}
                        isSelected={selectedType === type}
                        onSelect={handleCardSelect}
                        animDelay={i * 60}
                        hoveredType={hoveredType}
                        onHover={setHoveredType}
                      />
                    ))}
                  </div>
                </Section>
              )}

              {/* ── 4. Learning Tips ──────────────────── */}
              {errors > 0 && (
                <Section>
                  <TipsSection
                    selectedType={selectedType}
                    defaultType={topType}
                  />
                </Section>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
}