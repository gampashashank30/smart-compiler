import { useState, useEffect, useCallback, useRef } from 'react';
import { bugTrackerStore, ERROR_TYPES, getTips, MAX_SESSIONS, getEventSeverity } from '../bugTracker.js';
import { analyticsStore, toLocalDateStr } from '../analytics.js';
import { LANGUAGE_META } from '../constants.js';
import styles from './AnalyticsPanel.module.css';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function computeStreak(sessions) {
  if (!sessions.length) return 0;
  const days = new Set(sessions.map(s => toLocalDateStr(s.timestamp)));
  let streak = 0;
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    if (days.has(toLocalDateStr(d))) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}


function checkFiveConsecutiveSuccesses(sessions) {
  try {
    let count = 0;
    for (let i = sessions.length - 1; i >= 0; i--) {
      const sev = getEventSeverity(sessions[i]);
      if (sev === 'success' || sev === 'warning') {
        count++;
        if (count >= 5) return true;
      } else {
        count = 0;
      }
    }
    return false;
  } catch { return false; }
}

function checkErrorFreeDay(sessions) {
  try {
    const today = toLocalDateStr(Date.now());
    const todaySessions = sessions.filter(s => toLocalDateStr(s.timestamp) === today);
    return todaySessions.length > 0 && todaySessions.every(s => {
      const sev = getEventSeverity(s);
      return sev === 'success' || sev === 'warning';
    });
  } catch { return false; }
}

function generateInsights(sessions, stats, language = 'c') {
  const insights = [];
  try {
    const { totalRuns, successes, byType, consecutiveTLE } = stats;
    if (totalRuns === 0) return [];

    const successRate = totalRuns > 0 ? (successes / totalRuns) * 100 : 0;
    const langLabel = LANGUAGE_META[language]?.label || 'code';

    // Insight 1 — Success rate
    if (successRate >= 80) {
      insights.push({ icon: 'star', title: 'Great accuracy!', text: `${successRate.toFixed(0)}% success rate — you write clean ${langLabel}. Keep it up!`, color: '#059669' });
    } else if (successRate >= 50) {
      insights.push({ icon: 'trending', title: 'Improving steadily', text: `${successRate.toFixed(0)}% success rate. Try reading errors top-down to fix root causes faster.`, color: '#0ea5e9' });
    } else if (totalRuns >= 3) {
      insights.push({ icon: 'bulb', title: 'Error patterns detected', text: `${(100 - successRate).toFixed(0)}% of runs have errors. Focus on one error type at a time.`, color: '#f59e0b' });
    }

    // Insight 1.5 — Improvement evidence
    if (stats.improvement?.topImprovement) {
      insights.push({
        icon: 'trending',
        title: 'Measurable Skill Growth!',
        text: `${stats.improvement.topImprovement.text} across recent runs. Outstanding progress!`,
        color: '#059669',
      });
    }

    // Insight 2 — Top error
    const topErr = Object.entries(byType).sort(([,a],[,b])=>b-a)[0];
    if (topErr) {
      const [type, count] = topErr;
      const tips = getTips(type, language);
      if (tips?.length) {
        insights.push({ icon: 'target', title: `Top mistake: ${type}`, text: `You've hit this ${count} time${count>1?'s':''} — ${tips[0]}`, color: ERROR_TYPES[type]?.color ?? '#6366f1' });
      }
    }

    // Insight 3 — TLE
    if (consecutiveTLE >= 2) {
      insights.push({ icon: 'infinity', title: 'Infinite loop pattern', text: `${consecutiveTLE} consecutive TLEs — check your loop increment (i++) and condition.`, color: '#d97706' });
    }


    // Insight 5 — streak
    const streak = computeStreak(sessions);
    if (streak >= 3) {
      insights.push({ icon: 'fire', title: `${streak}-day coding streak!`, text: `You've compiled code for ${streak} days in a row. Consistency is the key to mastery.`, color: '#f97316' });
    }

    // Insight 6 — no errors today
    const todaySuccess = checkErrorFreeDay(sessions);
    if (todaySuccess) {
      insights.push({ icon: 'gem', title: 'Error-free session today!', text: `All your runs today compiled successfully. You\'re on fire!`, color: '#06b6d4' });
    }

  } catch { /* safe */ }

  // Always return at least 1 insight
  if (insights.length === 0) {
    insights.push({ icon: 'rocket', title: 'Getting started', text: 'Run some code to unlock personalized insights based on your patterns!', color: '#10b981' });
  }

  return insights.slice(0, 4);
}

// ─── 1. KPI Hero Cards ────────────────────────────────────────────────────────
function HeroStats({ stats, sessions, cloudStreak }) {
  const { totalRuns, successes, errors } = stats;
  const successRate = totalRuns > 0 ? ((successes / totalRuns) * 100).toFixed(1) : null;
  // Prefer DB-backed streak (authoritative across sessions) over local computation
  const streak = cloudStreak ?? computeStreak(sessions);

  const cards = [
    { label: 'Total Runs', value: totalRuns || '0', icon: '▶', color: '#3b82f6', bg: '#eff6ff' },
    { label: 'Errors Found', value: errors || '0', icon: '⚠', color: '#ef4444', bg: '#fef2f2' },
    { label: 'Success Rate', value: successRate != null ? `${successRate}%` : '—', icon: '✓', color: '#059669', bg: '#ecfdf5' },
    { label: 'Day Streak', value: streak || '0', icon: '🔥', color: '#f97316', bg: '#fff7ed' },
  ];

  return (
    <div className={styles.heroGrid}>
      {cards.map((c, i) => (
        <div key={c.label} className={styles.heroCard} style={{ animationDelay: `${i * 60}ms` }}>
          <div className={styles.heroIconBox} style={{ background: c.bg, color: c.color }}>{c.icon}</div>
          <div className={styles.heroValue} style={{ color: c.color }}>{c.value}</div>
          <div className={styles.heroLabel}>{c.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── 2. 14-day Activity Heatmap ───────────────────────────────────────────────
function Heatmap({ sessions }) {
  const [hovIdx, setHovIdx] = useState(null);
  const gridRef = useRef(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Build daily map with explicit severities
  const dailyMap = {};
  sessions.forEach(s => {
    const d = toLocalDateStr(s.timestamp);
    if (!dailyMap[d]) dailyMap[d] = { total: 0, success: 0, warning: 0, mistakes: 0 };
    const sev = getEventSeverity(s);
    dailyMap[d].total++;
    if (sev === 'success') {
      dailyMap[d].success++;
    } else if (sev === 'warning') {
      dailyMap[d].warning++;
      dailyMap[d].success++; // Warnings count as success for Perfect Day & streak
    } else {
      dailyMap[d].mistakes++;
    }
  });

  // Last 14 days in user's LOCAL timezone
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    const str = toLocalDateStr(d);
    const info = dailyMap[str] || { total: 0, success: 0, warning: 0, mistakes: 0 };
    return { str, info, d };
  });

  const maxTotal = Math.max(...days.map(d => d.info.total), 1);

  function getCellColor(total, mistakes) {
    if (total === 0) return '#f1f5f9';
    if (mistakes === 0 && total > 0) return '#059669';  // perfect day — deepest green
    const intensity = total / maxTotal;
    if (intensity < 0.33) return '#bbf7d0';
    if (intensity < 0.66) return '#34d399';
    return '#059669';
  }

  function fmtDate(d) {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  const weekdays = ['S','M','T','W','T','F','S'];
  const hovDay = hovIdx !== null ? days[hovIdx] : null;
  const isPerfect = hovDay && hovDay.info.total > 0 && hovDay.info.mistakes === 0;

  return (
    <div className={styles.heatmapWrap} ref={gridRef}>
      <div className={styles.heatmapGrid}>
        {days.map((day, i) => (
          <div
            key={day.str}
            className={`${styles.heatCell} ${hovIdx === i ? styles.heatCellHov : ''}`}
            style={{ background: getCellColor(day.info.total, day.info.mistakes), position: 'relative' }}
            onMouseEnter={(e) => {
              setHovIdx(i);
              const gridRect = gridRef.current?.getBoundingClientRect();
              const cellRect = e.currentTarget.getBoundingClientRect();
              setTooltipPos({
                x: cellRect.left - (gridRect?.left ?? 0) + cellRect.width / 2,
                y: cellRect.top  - (gridRect?.top  ?? 0),
              });
            }}
            onMouseLeave={() => setHovIdx(null)}
            aria-label={`${day.str}: ${day.info.total} runs, ${day.info.mistakes} mistakes${day.info.warning ? `, ${day.info.warning} warnings` : ''}`}
          >
            {/* Amber indicator dot if day succeeded with compiler warnings */}
            {day.info.warning > 0 && day.info.mistakes === 0 && day.info.total > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#f59e0b',
                  boxShadow: '0 0 2px rgba(0,0,0,0.5)',
                  pointerEvents: 'none',
                }}
                title="Succeeded with warnings"
              />
            )}
          </div>
        ))}
      </div>

      {/* Inline tooltip — positioned relative to heatmapWrap */}
      {hovDay && (
        <div
          className={styles.heatTooltip}
          style={{
            left: tooltipPos.x,
            top:  tooltipPos.y - 8,
            transform: 'translate(-50%, -100%)',
          }}
        >
          <div className={styles.heatTipDate}>{fmtDate(hovDay.d)}</div>
          <div className={styles.heatTipRow}>
            <span className={styles.heatTipIcon} style={{ color: '#ef4444' }}>✕</span>
            {hovDay.info.mistakes} mistake{hovDay.info.mistakes !== 1 ? 's' : ''}
          </div>
          {hovDay.info.warning > 0 && (
            <div className={styles.heatTipRow}>
              <span className={styles.heatTipIcon} style={{ color: '#f59e0b' }}>⚠️</span>
              {hovDay.info.warning} warning{hovDay.info.warning !== 1 ? 's' : ''}
            </div>
          )}
          <div className={styles.heatTipRow}>
            <span className={styles.heatTipIcon} style={{ color: '#3b82f6' }}>▶</span>
            {hovDay.info.total} run{hovDay.info.total !== 1 ? 's' : ''}
          </div>
          {isPerfect && (
            <div className={styles.heatTipPerfect}>
              Perfect Day! 🌟 {hovDay.info.warning > 0 ? <span style={{ color: '#f59e0b', fontSize: '0.72rem' }}>(with warnings ⚠️)</span> : null}
            </div>
          )}
        </div>
      )}

      <div className={styles.heatLabels}>
        {days.map((day, i) => (
          <div key={i} className={styles.heatDayLabel}>{weekdays[day.d.getDay()]}</div>
        ))}
      </div>
      <div className={styles.heatLegend}>
        <span className={styles.heatLegendLabel}>Less</span>
        {['#f1f5f9','#bbf7d0','#34d399','#059669'].map(c => (
          <div key={c} className={styles.heatLegendCell} style={{ background: c }} />
        ))}
        <span className={styles.heatLegendLabel}>More</span>
      </div>
    </div>
  );
}

// ─── 3. Donut Chart ───────────────────────────────────────────────────────────
function DonutChart({ byType, totalErrors }) {
  const [hovered, setHovered] = useState(null);
  const R = 68; const STROKE = 16;
  const circumference = 2 * Math.PI * R;
  const sorted = Object.entries(byType).filter(([k]) => k !== 'Successful Run').sort(([,a],[,b]) => b - a).slice(0, 6);
  const total = sorted.reduce((s, [,c]) => s + c, 0) || 1;
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
      <div className={styles.donutWrap}>
        <svg width="176" height="176" viewBox="0 0 176 176" className={styles.donutSvg}>
          <circle cx="88" cy="88" r={R} fill="none" stroke="#f1f5f9" strokeWidth={STROKE} />
        </svg>
        <div className={styles.donutCenter}>
          <span className={styles.donutNum}>0</span>
          <span className={styles.donutLbl}>Errors</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.donutSection}>
      <div className={styles.donutWrap}>
        <svg width="176" height="176" viewBox="0 0 176 176" className={styles.donutSvg}>
          <circle cx="88" cy="88" r={R} fill="none" stroke="#f1f5f9" strokeWidth={STROKE} />
          {segments.map((seg, i) => {
            const color = ERROR_TYPES[seg.type]?.color ?? '#94a3b8';
            const isHov = hovered === seg.type;
            return (
              <circle key={seg.type}
                cx="88" cy="88" r={R}
                fill="none"
                stroke={color}
                strokeWidth={isHov ? STROKE + 4 : STROKE}
                strokeLinecap="round"
                strokeDasharray={`${seg.len - 2} ${circumference - seg.len + 2}`}
                strokeDashoffset={-seg.offset}
                style={{ transition: 'stroke-width 0.2s', animation: `dashIn 600ms cubic-bezier(0.16,1,0.3,1) ${i * 80}ms both`, cursor: 'pointer' }}
                onMouseEnter={() => setHovered(seg.type)}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })}
          <style>{`@keyframes dashIn { from { stroke-dashoffset: ${circumference}; opacity: 0; } }`}</style>
        </svg>
        <div className={styles.donutCenter}>
          <span className={styles.donutNum}>{totalErrors}</span>
          <span className={styles.donutLbl}>Total</span>
        </div>
      </div>
      <div className={styles.donutLegend}>
        {segments.map(seg => {
          const color = ERROR_TYPES[seg.type]?.color ?? '#94a3b8';
          const isHov = hovered === seg.type;
          return (
            <div key={seg.type} className={styles.legendRow}
              style={{ opacity: hovered && !isHov ? 0.45 : 1, transition: 'opacity 0.2s' }}
              onMouseEnter={() => setHovered(seg.type)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className={styles.legendDot} style={{ background: color }} />
              <span className={styles.legendName}>{seg.type}</span>
              <span className={styles.legendPct} style={{ color }}>{Math.round(seg.pct * 100)}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 4. Compile Timeline ──────────────────────────────────────────────────────
function CompileTimeline({ sessions }) {
  const [hov, setHov] = useState(null);
  const last20 = sessions.slice(-15);
  const maxMs = Math.max(...last20.map(s => s.timeMs || 100), 100);

  if (last20.length === 0) return <div className={styles.emptySmall}>No compile history yet</div>;

  function barColor(s) {
    if (s.subtype === 'Successful Run') return '#059669';
    if (s.subtype === 'Infinite Loop / TLE') return '#eab308';
    if (s.subtype === 'Runtime Crash' || s.subtype === 'Segmentation Fault') return '#f97316';
    return '#ef4444';
  }

  return (
    <div className={styles.timelineWrap}>
      <div className={styles.timelineBars}>
        {last20.map((s, i) => {
          const h = Math.max(8, ((s.timeMs || 100) / maxMs) * 72);
          const color = barColor(s);
          const isHov = hov === i;
          return (
            <div key={s.id} className={styles.timelineBarWrap}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
            >
              {isHov && (
                <div className={styles.timelineTooltip}>
                  <div style={{ fontWeight: 700, color }}>{s.subtype}</div>
                  <div style={{ color: '#94a3b8', fontSize: 10 }}>
                    {new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  {s.timeMs && <div style={{ color: '#475569', fontSize: 11 }}>{s.timeMs}ms</div>}
                </div>
              )}
              <div
                className={styles.timelineBar}
                style={{
                  height: h,
                  background: color,
                  opacity: hov !== null && !isHov ? 0.4 : 1,
                  animationDelay: `${i * 30}ms`,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.timelineLegend}>
        {[['#059669','Success'],['#ef4444','Error'],['#f97316','Runtime'],['#eab308','TLE']].map(([c,l]) => (
          <div key={l} className={styles.timelineLegItem}>
            <span style={{ width:8, height:8, borderRadius:2, background:c, display:'inline-block', marginRight:4 }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 5. Radar Chart ───────────────────────────────────────────────────────────

/**
 * Format error labels cleanly for radar axes so they never clip or truncate abruptly.
 * Returns an array of lines to render via <tspan>.
 */
function formatRadarLabel(name) {
  const overrides = {
    'Missing Semicolon': ['Missing', 'Semicolon'],
    'Undeclared Variable': ['Undeclared', 'Variable'],
    'Uninitialized Variable': ['Uninitialized', 'Variable'],
    'Unclosed String': ['Unclosed', 'String'],
    'Missing Parenthesis': ['Missing', 'Parenthesis'],
    'Missing Brace/Bracket': ['Missing Brace', 'or Bracket'],
    'Missing < or >': ['Missing', '< or >'],
    'Missing # Directive': ['Missing #', 'Directive'],
    'Implicit Declaration': ['Implicit', 'Declaration'],
    'Type Mismatch': ['Type', 'Mismatch'],
    'Array Out of Bounds': ['Array Out of', 'Bounds'],
    'Unused Variable': ['Unused', 'Variable'],
    'Format Specifier Mismatch': ['Format Spec', 'Mismatch'],
    'Compilation Error': ['Compilation', 'Error'],
    'Missing Return Statement': ['Missing Return', 'Statement'],
    'Missing Import': ['Missing', 'Import'],
    'Static Context Error': ['Static Context', 'Error'],
    'Class Not Found': ['Class Not', 'Found'],
    'Null Pointer Exception': ['Null Pointer', 'Exception'],
    'Stack Overflow Error': ['Stack Overflow', 'Error'],
    'Java Compilation Error': ['Java Compile', 'Error'],
    'Indentation Error': ['Indentation', 'Error'],
    'Syntax Error': ['Syntax', 'Error'],
    'Key Error': ['Key Error'],
    'Zero Division Error': ['Zero Division', 'Error'],
    'Import Error': ['Import', 'Error'],
    'File Not Found': ['File Not', 'Found'],
    'Recursion Error': ['Recursion', 'Error'],
    'Python Error': ['Python Error'],
    'Infinite Loop / TLE': ['Infinite Loop', '/ TLE'],
    'Runtime Crash': ['Runtime', 'Crash'],
    'Segmentation Fault': ['Segmentation', 'Fault'],
  };

  if (overrides[name]) return overrides[name];
  if (name.length <= 11) return [name];

  const words = name.split(' ');
  if (words.length <= 1) return [name];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
}

function RadarChart({ byType, totalRuns, language = 'c' }) {
  // Canonical top categories per language as intelligent defaults
  const defaultCategories = {
    c: ['Missing Semicolon', 'Undeclared Variable', 'Type Mismatch', 'Array Out of Bounds', 'Segmentation Fault'],
    python: ['Indentation Error', 'Syntax Error', 'Undeclared Variable', 'Type Mismatch', 'Zero Division Error'],
    java: ['Missing Semicolon', 'Type Mismatch', 'Array Out of Bounds', 'Null Pointer Exception', 'Runtime Crash'],
  };

  const canonical = defaultCategories[language] || defaultCategories.c;
  const tracked = Object.entries(byType || {})
    .filter(([k]) => k !== 'Successful Run')
    .sort(([, a], [, b]) => b - a);

  // Take top categories from real user data, filling up to 5 from canonical defaults if needed
  const selectedKeys = [];
  for (const [k] of tracked) {
    if (selectedKeys.length >= 5) break;
    selectedKeys.push(k);
  }
  for (const k of canonical) {
    if (selectedKeys.length >= 5) break;
    if (!selectedKeys.includes(k)) {
      selectedKeys.push(k);
    }
  }

  const axes = selectedKeys.slice(0, 5).map(key => ({
    key,
    lines: formatRadarLabel(key),
    count: byType?.[key] || 0,
  }));

  const N = axes.length;
  const CX = 190, CY = 142, R = 80;
  const maxCount = Math.max(...axes.map(ax => ax.count), 1);

  const pts = axes.map((ax, i) => {
    const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
    const ratio = ax.count > 0 ? Math.max(0.2, Math.min(ax.count / maxCount, 1)) : 0;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Dynamic text anchor and placement based on angle direction
    let anchor = 'middle';
    let lx = CX + (R + 14) * cos;
    let ly = CY + (R + 14) * sin;
    let dyFirst = '0.35em';

    if (cos > 0.25) {
      anchor = 'start';
      lx = CX + R * cos + 12;
      if (Math.abs(sin) <= 0.4) {
        ly = CY + R * sin;
        dyFirst = ax.lines.length > 1 ? '-0.25em' : '0.35em';
      } else if (sin > 0.4) {
        ly = CY + R * sin + 12;
        dyFirst = '0.4em';
      } else {
        ly = CY + R * sin - 8;
        dyFirst = '-0.6em';
      }
    } else if (cos < -0.25) {
      anchor = 'end';
      lx = CX + R * cos - 12;
      if (Math.abs(sin) <= 0.4) {
        ly = CY + R * sin;
        dyFirst = ax.lines.length > 1 ? '-0.25em' : '0.35em';
      } else if (sin > 0.4) {
        ly = CY + R * sin + 12;
        dyFirst = '0.4em';
      } else {
        ly = CY + R * sin - 8;
        dyFirst = '-0.6em';
      }
    } else {
      anchor = 'middle';
      if (sin < 0) {
        // Top vertex: place above apex
        ly = CY + R * sin - (ax.lines.length > 1 ? 22 : 14);
        dyFirst = '0em';
      } else {
        // Bottom vertex: place below apex
        ly = CY + R * sin + 14;
        dyFirst = '0.7em';
      }
    }

    return {
      key: ax.key,
      lines: ax.lines,
      count: ax.count,
      ratio,
      angle,
      anchor,
      dyFirst,
      x: CX + R * cos,
      y: CY + R * sin,
      vx: CX + R * ratio * cos,
      vy: CY + R * ratio * sin,
      lx,
      ly,
    };
  });

  const polyPoints = pts.map(p => `${p.vx},${p.vy}`).join(' ');
  const outerPoints = pts.map(p => `${p.x},${p.y}`).join(' ');

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg
      width="100%"
      height="auto"
      viewBox="0 0 380 284"
      className={styles.radarSvg}
      style={{ maxWidth: 380, overflow: 'visible' }}
    >
      {/* Grid rings */}
      {rings.map(r => (
        <polygon
          key={r}
          points={pts.map(p => {
            const rx = CX + R * r * Math.cos(p.angle);
            const ry = CY + R * r * Math.sin(p.angle);
            return `${rx},${ry}`;
          }).join(' ')}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="1"
        />
      ))}
      {/* Axis lines */}
      {pts.map(p => (
        <line key={p.key} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {/* Outer ring (baseline) */}
      <polygon points={outerPoints} fill="rgba(241,245,249,0.4)" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Student polygon */}
      <polygon
        points={polyPoints}
        fill="rgba(16,185,129,0.18)"
        stroke="#10b981"
        strokeWidth="2"
        style={{ animation: 'radarIn 700ms cubic-bezier(0.16,1,0.3,1) both' }}
      />
      <style>{`@keyframes radarIn { from { opacity:0; transform-origin:${CX}px ${CY}px; transform:scale(0.2); } }`}</style>
      {/* Data points */}
      {pts.map(p => (
        <circle
          key={p.key}
          cx={p.vx}
          cy={p.vy}
          r="4.5"
          fill="#10b981"
          stroke="#fff"
          strokeWidth="2"
        >
          <title>{`${p.key}: ${p.count} occurrence${p.count === 1 ? '' : 's'}`}</title>
        </circle>
      ))}
      {/* Labels */}
      {pts.map(p => (
        <text
          key={p.key}
          x={p.lx}
          y={p.ly}
          textAnchor={p.anchor}
          fontSize="10.5"
          fontWeight="600"
          fill="#475569"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
        >
          {p.lines.map((line, lIdx) => (
            <tspan
              key={lIdx}
              x={p.lx}
              dy={lIdx === 0 ? p.dyFirst : '1.2em'}
            >
              {line}
            </tspan>
          ))}
          <title>{`${p.key}: ${p.count} occurrence${p.count === 1 ? '' : 's'}`}</title>
        </text>
      ))}
    </svg>
  );
}

// ─── 6. Milestones ────────────────────────────────────────────────────────────
function Milestones({ sessions, stats }) {
  const { totalRuns, successes } = stats;
  const ms = {
    firstRun:  totalRuns >= 1,
    ten:       totalRuns >= 10,
    firstClean: successes >= 1,
    fiveConsec: checkFiveConsecutiveSuccesses(sessions),
    errorFreeDay: checkErrorFreeDay(sessions),
  };
  const streak = computeStreak(sessions);

  const badges = [
    { id: 'firstRun', emoji: '✓', label: 'First Run', desc: 'Compiled your first program', unlocked: ms.firstRun, color: '#3b82f6' },
    { id: 'ten', emoji: '🎖️', label: '10 Compiles', desc: 'Ran 10 programs', unlocked: ms.ten, color: '#f59e0b' },
    { id: 'firstClean', emoji: '🌟', label: 'Clean Run', desc: 'First successful execution', unlocked: ms.firstClean, color: '#059669' },
    { id: 'fiveConsec', emoji: '🏆', label: '5 in a Row', desc: 'Five consecutive successes', unlocked: ms.fiveConsec, color: '#7c3aed' },
    { id: 'errorFreeDay', emoji: '💎', label: 'Error-Free Day', desc: 'All runs today successful', unlocked: ms.errorFreeDay, color: '#06b6d4' },
  ];

  return (
    <div className={styles.milestonesWrap}>
      <div className={styles.streakBox}>
        <span className={styles.streakFlame}>🔥</span>
        <div>
          <div className={styles.streakNum}>{streak}</div>
          <div className={styles.streakLbl}>Day Streak</div>
        </div>
      </div>
      <div className={styles.badgesGrid}>
        {badges.map((b, i) => (
          <div
            key={b.id}
            className={`${styles.badge} ${b.unlocked ? styles.badgeUnlocked : styles.badgeLocked}`}
            style={{ animationDelay: `${i * 60}ms` }}
            title={b.desc}
          >
            <div className={styles.badgeEmoji} style={b.unlocked ? { filter: 'none' } : {}}>
              {b.unlocked ? b.emoji : '🔒'}
            </div>
            <div className={styles.badgeLabel} style={b.unlocked ? { color: b.color } : {}}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 7. Learning Velocity ─────────────────────────────────────────────────────
function VelocityGraph({ sessions }) {
  if (sessions.length < 2) return <div className={styles.emptySmall}>Need 2+ runs to show velocity</div>;

  const points = sessions.map((_, i, arr) => {
    const win = arr.slice(Math.max(0, i - 4), i + 1);
    return (win.filter(s => s.subtype === 'Successful Run').length / win.length) * 100;
  });

  const W = 440, H = 90, PAD = 10;
  const iW = W - PAD * 2, iH = H - PAD * 2;
  const best = Math.max(...points);

  const toX = (i) => PAD + (i / Math.max(points.length - 1, 1)) * iW;
  const toY = (v) => PAD + iH - (v / 100) * iH;

  const pathD = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');
  const areaD = `${pathD} L ${toX(points.length - 1)} ${H - PAD} L ${PAD} ${H - PAD} Z`;

  // Trend color: last 3 vs first 3
  const recent = points.slice(-3).reduce((a, b) => a + b, 0) / 3;
  const early = points.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
  const trendColor = recent >= early ? '#10b981' : '#ef4444';

  return (
    <div className={styles.velocityWrap}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(v => (
          <line key={v} x1={PAD} y1={toY(v)} x2={W - PAD} y2={toY(v)}
            stroke="#f1f5f9" strokeWidth="1" strokeDasharray={v === 0 ? '0' : '3,3'} />
        ))}
        {/* Personal best dotted line */}
        <line x1={PAD} y1={toY(best)} x2={W - PAD} y2={toY(best)}
          stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.8" />
        <text x={W - PAD - 2} y={toY(best) - 4} textAnchor="end" fontSize="9" fill="#f59e0b" fontFamily="Inter,sans-serif">Best</text>
        {/* Area fill */}
        <path d={areaD} fill={trendColor} opacity="0.08" />
        {/* Line */}
        <path d={pathD} fill="none" stroke={trendColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: 'velocityDraw 800ms ease both' }}
        />
        <style>{`@keyframes velocityDraw { from { stroke-dashoffset:2000; stroke-dasharray:2000; } to { stroke-dasharray:2000; } }`}</style>
        {/* Last point dot */}
        <circle cx={toX(points.length - 1)} cy={toY(points[points.length - 1])} r="4"
          fill={trendColor} stroke="#fff" strokeWidth="2" />
      </svg>
      <div className={styles.velocityLabels}>
        <span>Attempt 1</span>
        <span style={{ color: trendColor, fontWeight: 700 }}>
          {recent >= early ? '▲ Improving' : '▼ More practice needed'}
        </span>
        <span>Latest</span>
      </div>
    </div>
  );
}

// ─── 8. Error Tags ────────────────────────────────────────────────────────────
function ErrorTags({ byType, language = 'c' }) {
  const [expanded, setExpanded] = useState(null);
  const sorted = Object.entries(byType).sort(([,a],[,b]) => b - a).slice(0, 8);
  const max = sorted[0]?.[1] || 1;

  if (sorted.length === 0) return <div className={styles.emptySmall}>No errors recorded yet</div>;

  return (
    <div className={styles.tagsWrap}>
      {sorted.map(([type, count]) => {
        const meta = ERROR_TYPES[type] ?? { icon: '?', color: '#94a3b8', bg: '#f8fafc' };
        const pct = (count / max) * 100;
        const isExp = expanded === type;
        const tips = getTips(type, language);
        return (
          <div key={type} className={styles.tagRow}>
            <div className={styles.tagHeader}
              onClick={() => setExpanded(isExp ? null : type)}
              style={{ cursor: tips.length ? 'pointer' : 'default' }}
            >
              <span className={styles.tagIcon} style={{ color: meta.color, background: meta.bg }}>{meta.icon}</span>
              <span className={styles.tagName}>{type}</span>
              <span className={styles.tagCount} style={{ background: meta.bg, color: meta.color }}>{count}</span>
            </div>
            <div className={styles.tagBarTrack}>
              <div className={styles.tagBarFill} style={{ width: `${pct}%`, background: meta.color }} />
            </div>
            {isExp && tips.length > 0 && (
              <div className={styles.tagTips}>
                {tips.map((t, i) => (
                  <div key={i} className={styles.tagTip} style={{ borderLeftColor: meta.color }}>
                    <span className={styles.tagTipNum} style={{ background: meta.color }}>{i + 1}</span>
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── 9. Session Summary ───────────────────────────────────────────────────────
function SessionSummary({ sessions }) {
  if (sessions.length === 0) return <div className={styles.emptySmall}>Run some code to see session stats</div>;

  const today = toLocalDateStr(Date.now());
  const todaySessions = sessions.filter(s => toLocalDateStr(s.timestamp) === today);
  const todayErrors = todaySessions.filter(s => {
    const sev = getEventSeverity(s);
    return sev === 'error' || sev === 'runtime_error' || sev === 'timeout';
  }).length;
  const todaySuccess = todaySessions.filter(s => {
    const sev = getEventSeverity(s);
    return sev === 'success' || sev === 'warning';
  }).length;

  const first = todaySessions[0]?.timestamp;
  const last = todaySessions[todaySessions.length - 1]?.timestamp;
  const duration = first && last ? Math.round((last - first) / 60000) : 0;

  const topToday = (() => {
    const m = {};
    todaySessions.forEach(s => { if (s.subtype !== 'Successful Run') m[s.subtype] = (m[s.subtype] || 0) + 1; });
    return Object.entries(m).sort(([,a],[,b]) => b - a)[0]?.[0] ?? null;
  })();

  // Timeline events (last 8)
  const events = todaySessions.slice(-8);

  return (
    <div className={styles.sessionWrap}>
      <div className={styles.sessionKpis}>
        <div className={styles.sessionKpi}>
          <span className={styles.sessionKpiVal}>{todaySessions.length}</span>
          <span className={styles.sessionKpiLabel}>Runs Today</span>
        </div>
        <div className={styles.sessionKpi}>
          <span className={styles.sessionKpiVal} style={{ color: '#059669' }}>{todaySuccess}</span>
          <span className={styles.sessionKpiLabel}>Successes</span>
        </div>
        <div className={styles.sessionKpi}>
          <span className={styles.sessionKpiVal} style={{ color: '#ef4444' }}>{todayErrors}</span>
          <span className={styles.sessionKpiLabel}>Errors</span>
        </div>
        <div className={styles.sessionKpi}>
          <span className={styles.sessionKpiVal}>{duration}m</span>
          <span className={styles.sessionKpiLabel}>Active Time</span>
        </div>
      </div>

      {topToday && (
        <div className={styles.sessionTopError}>
          Most common today: <strong style={{ color: ERROR_TYPES[topToday]?.color }}>{topToday}</strong>
        </div>
      )}

      {events.length > 0 && (
        <div className={styles.sessionTimeline}>
          {events.map((s, i) => {
            const color = s.subtype === 'Successful Run' ? '#059669' : ERROR_TYPES[s.subtype]?.color ?? '#ef4444';
            return (
              <div key={s.id} className={styles.sessionEvent}>
                <div className={styles.sessionEventDot} style={{ background: color }} />
                {i < events.length - 1 && <div className={styles.sessionEventLine} />}
                <div className={styles.sessionEventLabel} style={{ color }}>
                  {s.subtype === 'Successful Run' ? '✓ Success' : s.subtype}
                </div>
                <div className={styles.sessionEventTime}>
                  {new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── 10. AI Insight Cards ─────────────────────────────────────────────────────
function InsightIcon({ name, color }) {
  const s = { width: 22, height: 22, display: 'block', flexShrink: 0 };
  switch (name) {
    case 'star':
      return (<svg style={s} viewBox="0 0 24 24" fill={color}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>);
    case 'trending':
      return (<svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>);
    case 'bulb':
      return (<svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>);
    case 'target':
      return (<svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>);
    case 'infinity':
      return (<svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4z"/><path d="M12 12c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z"/></svg>);
    case 'bolt':
      return (<svg style={s} viewBox="0 0 24 24" fill={color}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>);
    case 'search':
      return (<svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>);
    case 'fire':
      return (<svg style={s} viewBox="0 0 24 24" fill={color}><path d="M12 2c0 0-5 5.5-5 10a5 5 0 0010 0c0-4.5-5-10-5-10zm0 14a2 2 0 01-2-2c0-2 2-4.5 2-4.5s2 2.5 2 4.5a2 2 0 01-2 2z"/></svg>);
    case 'gem':
      return (<svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 18 3 22 9 12 22 2 9"/><line x1="2" y1="9" x2="22" y2="9"/><line x1="12" y1="3" x2="6" y2="9"/><line x1="12" y1="3" x2="18" y2="9"/></svg>);
    case 'rocket':
      return (<svg style={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>);
    default:
      return (<svg style={s} viewBox="0 0 24 24" fill={color}><circle cx="12" cy="12" r="5"/></svg>);
  }
}

function InsightCards({ sessions, stats, language = 'c' }) {
  const [active, setActive] = useState(0);
  const insights = generateInsights(sessions, stats, language);
  const timerRef = useRef(null);

  useEffect(() => {
    if (insights.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActive(prev => (prev + 1) % insights.length);
    }, 8000);
    return () => clearInterval(timerRef.current);
  }, [insights.length]);

  if (insights.length === 0) return null;

  const ins = insights[active];
  return (
    <div className={styles.insightWrap}>
      <div className={styles.insightCard} key={active} style={{ borderLeftColor: ins.color }}>
        <div className={styles.insightIcon}><InsightIcon name={ins.icon} color={ins.color} /></div>
        <div className={styles.insightContent}>
          <div className={styles.insightTitle} style={{ color: ins.color }}>{ins.title}</div>
          <div className={styles.insightText}>{ins.text}</div>
        </div>
      </div>
      {insights.length > 1 && (
        <div className={styles.insightDots}>
          {insights.map((_, i) => (
            <button key={i}
              className={`${styles.insightDot} ${i === active ? styles.insightDotActive : ''}`}
              onClick={() => { setActive(i); clearInterval(timerRef.current); }}
              aria-label={`Insight ${i + 1}`}
              style={i === active ? { background: ins.color } : {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState({ language = 'c' }) {
  const langLabel = LANGUAGE_META[language]?.label || language.toUpperCase();
  return (
    <div className={styles.emptyState}>
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect width="64" height="64" rx="32" fill="#ecfdf5" />
        <rect x="12" y="38" width="8" height="14" rx="2" fill="#a7f3d0" />
        <rect x="24" y="28" width="8" height="24" rx="2" fill="#6ee7b7" />
        <rect x="36" y="20" width="8" height="32" rx="2" fill="#34d399" />
        <rect x="48" y="12" width="8" height="40" rx="2" fill="#10b981" />
        <circle cx="16" cy="36" r="3" fill="#059669" />
        <circle cx="28" cy="26" r="3" fill="#059669" />
        <circle cx="40" cy="18" r="3" fill="#059669" />
        <circle cx="52" cy="10" r="3" fill="#059669" />
        <polyline points="16,36 28,26 40,18 52,10" stroke="#059669" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <p className={styles.emptyTitle}>No {langLabel} analytics yet</p>
      <p className={styles.emptySub}>Run your first {langLabel} program to start seeing insights, charts, and progress tracking here.</p>
    </div>
  );
}

// ─── Section Wrapper — with scroll-reveal ────────────────────────────────────
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
      className={`${styles.section} ${visible ? styles.sectionVisible : styles.sectionHidden}`}
    >
      <div className={styles.sectionLabel}>{title}</div>
      {children}
    </div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────────────────────
// ─── Cloud Profile Component ──────────────────────────────────────────────────
function CloudProfile({ stats }) {
  if (!stats.email) return null; // Only show if user is logged in
  
  const tokenLimit = stats.token_limit ?? 15000;
  const tokenPct = Math.min(100, (stats.ai_tokens_used / tokenLimit) * 100);
  
  // Format active time (seconds -> hh mm ss)
  const formatTime = (totalSeconds) => {
    if (!totalSeconds) return '0s';
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    const parts = [];
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0 || parts.length === 0) parts.push(`${s}s`);
    return parts.join(' ');
  };

  const isNearingLimit = stats.ai_tokens_used >= (tokenLimit * 0.8);
  const isOverLimit = stats.ai_tokens_used >= tokenLimit;
  
  let progressBarColor = '#10b981'; // Green
  if (isOverLimit) progressBarColor = '#ef4444'; // Red
  else if (isNearingLimit) progressBarColor = '#f59e0b'; // Amber

  return (
    <div className={styles.cloudCard}>
      <div className={styles.cloudHeader}>
        <div className={styles.cloudUser}>
          <span className={styles.cloudUserIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
            </svg>
          </span>
          <div className={styles.cloudUserInfo}>
            <div className={styles.cloudEmail}>{stats.email}</div>
            <div className={styles.cloudSyncStatus}>Connected &amp; Synced ✓</div>
          </div>
        </div>
        <span className={styles.cloudPulse} />
      </div>

      <div className={styles.cloudStatsGrid}>
        <div className={styles.cloudStatItem}>
          <div className={styles.cloudStatValue}>{stats.total_runs}</div>
          <div className={styles.cloudStatLabel}>Runs (All-Time)</div>
        </div>
        <div className={styles.cloudStatItem}>
          <div className={styles.cloudStatValue} style={{ color: '#ef4444' }}>{stats.error_counts}</div>
          <div className={styles.cloudStatLabel}>Errors Caught</div>
        </div>
        <div className={styles.cloudStatItem}>
          <div className={styles.cloudStatValue}>{formatTime(stats.time_spent)}</div>
          <div className={styles.cloudStatLabel}>Time Spent</div>
        </div>
        <div className={styles.cloudStatItem}>
          <div className={styles.cloudStatValue} style={{ color: '#f97316' }}>
            {stats.current_streak ?? 0} 🔥
          </div>
          <div className={styles.cloudStatLabel}>Day Streak</div>
        </div>
      </div>

      <div className={styles.tokenSection}>
        <div className={styles.tokenHeaders}>
          <span className={styles.tokenLabel}>AI Token Usage</span>
          <span className={styles.tokenValue} style={isOverLimit ? { color: '#ef4444', fontWeight: 'bold' } : {}}>
            {stats.ai_tokens_used.toLocaleString()} / {tokenLimit.toLocaleString()}
          </span>
        </div>
        <div className={styles.tokenBarTrack}>
          <div 
            className={styles.tokenBarFill} 
            style={{ 
              width: `${tokenPct}%`, 
              backgroundColor: progressBarColor 
            }} 
          />
        </div>
        {isOverLimit ? (
          <div className={styles.tokenWarning}>
            ⚠️ Free tier token limit reached ({tokenLimit.toLocaleString()}). AI analysis and Tutor features are disabled.
          </div>
        ) : isNearingLimit ? (
          <div className={styles.tokenWarning} style={{ color: '#d97706' }}>
            ⚠️ Approaching free tier limit of {tokenLimit.toLocaleString()} AI tokens.
          </div>
        ) : null}
      </div>
    </div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────────────────────
export default function AnalyticsPanel({ onClose, selectedLanguage = 'c' }) {
  const [sessions, setSessions] = useState(() => bugTrackerStore.getSessions(selectedLanguage));
  const [stats, setStats] = useState(() => bugTrackerStore.getStats(selectedLanguage));
  const [cloudStats, setCloudStats] = useState(() => analyticsStore.getStats(selectedLanguage));
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setSessions(bugTrackerStore.getSessions(selectedLanguage));
    setStats(bugTrackerStore.getStats(selectedLanguage));
    setCloudStats(analyticsStore.getStats(selectedLanguage));
  }, [selectedLanguage]);

  useEffect(() => {
    const unsub = analyticsStore.subscribe((newCloudStats) => {
      setCloudStats(newCloudStats);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = bugTrackerStore.subscribe(() => {
      setStats(bugTrackerStore.getStats(selectedLanguage));
      setSessions(bugTrackerStore.getSessions(selectedLanguage));
    });
    return unsub;
  }, [selectedLanguage]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 270);
  }, [onClose]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handleClose]);

  const hasData = stats.totalRuns > 0;

  return (
    <>
      <div className={styles.backdrop} onClick={handleClose} aria-hidden="true" />
      <aside
        className={`${styles.panel} ${closing ? styles.panelClosing : ''}`}
        role="dialog"
        aria-label="Analytics Dashboard"
        aria-modal="true"
      >
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className={styles.panelHeader}>
          <div className={styles.headerGradient} />
          <div className={styles.panelTitle}>
            <div className={styles.panelTitleIcon}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="12" width="3" height="6" rx="1" fill="#6366f1" />
                <rect x="7" y="8" width="3" height="10" rx="1" fill="#8b5cf6" />
                <rect x="12" y="4" width="3" height="14" rx="1" fill="#a78bfa" />
                <rect x="17" y="1" width="3" height="17" rx="1" fill="#c4b5fd" />
              </svg>
            </div>
            Analytics
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6366f1', marginLeft: 6 }}>
              {LANGUAGE_META[selectedLanguage]?.label || selectedLanguage.toUpperCase()}
            </span>
          </div>
          <div className={styles.headerActions}>
            {stats.totalRuns > 0 && (
              <>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: sessions.length >= MAX_SESSIONS ? '#f59e0b' : '#94a3b8',
                    fontVariantNumeric: 'tabular-nums',
                    marginRight: 4,
                  }}
                  title={sessions.length >= MAX_SESSIONS
                    ? 'Local limit reached — older events will be archived to PostgreSQL once the database is integrated'
                    : `Tracking last ${MAX_SESSIONS} events locally`
                  }
                >
                  {sessions.length >= MAX_SESSIONS ? '⚠ ' : ''}{sessions.length} / {MAX_SESSIONS}
                </span>
                <button
                  className={styles.clearBtn}
                  onClick={() => { bugTrackerStore.reset(selectedLanguage); }}
                  id="analytics-clear-btn"
                  title="Clear all analytics data"
                >
                  Clear Data
                </button>
              </>
            )}
            <button
              className={styles.closeBtn}
              onClick={handleClose}
              aria-label="Close analytics panel"
              id="analytics-close-btn"
            >×</button>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────────── */}
        <div className={styles.panelBody}>
          <CloudProfile stats={cloudStats} />
          {!hasData ? (
            <EmptyState language={selectedLanguage} />
          ) : (
            <>
              {/* 1 — Hero KPIs */}
              <Section title="Overview">
                <HeroStats stats={stats} sessions={sessions} cloudStreak={cloudStats.current_streak} />
              </Section>

              {/* 2 — Heatmap */}
              <Section title="14-Day Activity">
                <Heatmap sessions={sessions} />
              </Section>

              {/* 3 — Donut */}
              {stats.errors > 0 && (
                <Section title="Error Breakdown">
                  <DonutChart byType={stats.byType} totalErrors={stats.errors} />
                </Section>
              )}

              {/* 4 — Compile Timeline */}
              <Section title="Compile History (Last 15)">
                <CompileTimeline sessions={sessions} />
              </Section>

              {/* 5 — Radar */}
              {stats.errors > 0 && (
                <Section title="Error Profile">
                  <div className={styles.radarWrap}>
                    <RadarChart byType={stats.byType} totalRuns={stats.totalRuns} language={selectedLanguage} />
                    <div className={styles.radarLegend}>
                      <div className={styles.radarLegItem}>
                        <span style={{ display:'inline-block', width:12, height:12, borderRadius:2, background:'rgba(16,185,129,0.4)', border:'2px solid #10b981', marginRight:6 }} />
                        Your profile
                      </div>
                      <div className={styles.radarLegItem}>
                        <span style={{ display:'inline-block', width:12, height:12, borderRadius:2, background:'rgba(241,245,249,0.4)', border:'1.5px solid #e2e8f0', marginRight:6 }} />
                        Max scale
                      </div>
                    </div>
                  </div>
                </Section>
              )}

              {/* 6 — Streak & Milestones */}
              <Section title="Streak & Milestones">
                <Milestones sessions={sessions} stats={stats} />
              </Section>

              {/* 7 — Velocity */}
              <Section title="Learning Velocity">
                <VelocityGraph sessions={sessions} />
              </Section>

              {/* 8 — Error Tags */}
              {stats.errors > 0 && (
                <Section title="Error Frequency (click to see tips)">
                  <ErrorTags byType={stats.byType} language={selectedLanguage} />
                </Section>
              )}

              {/* 9 — Session Summary */}
              <Section title="Today's Session">
                <SessionSummary sessions={sessions} />
              </Section>

              {/* 10 — AI Insights */}
              <Section title="Personalized Insights">
                <InsightCards sessions={sessions} stats={stats} language={selectedLanguage} />
              </Section>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
