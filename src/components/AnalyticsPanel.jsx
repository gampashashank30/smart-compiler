import { useState, useEffect, useCallback, useRef } from 'react';
import { bugTrackerStore, ERROR_TYPES, TIPS } from '../bugTracker.js';
import styles from './AnalyticsPanel.module.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toDateStr(ts) {
  return new Date(ts).toISOString().slice(0, 10);
}
function computeStreak(sessions) {
  if (!sessions.length) return 0;
  const days = new Set(sessions.map(s => toDateStr(s.timestamp)));
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    if (days.has(d.toISOString().slice(0, 10))) streak++;
    else break;
  }
  return streak;
}
function computeAvgFixTime(sessions) {
  try {
    let total = 0, count = 0;
    for (let i = 0; i < sessions.length - 1; i++) {
      if (sessions[i].subtype !== 'Successful Run') {
        const next = sessions.slice(i + 1).find(s => s.subtype === 'Successful Run');
        if (next) { total += Math.round((next.timestamp - sessions[i].timestamp) / 1000); count++; }
      }
    }
    return count > 0 ? Math.round(total / count) : null;
  } catch { return null; }
}
function checkFiveConsecutiveSuccesses(sessions) {
  try {
    let c = 0;
    for (let i = sessions.length - 1; i >= 0; i--) {
      if (sessions[i].subtype === 'Successful Run') { c++; if (c >= 5) return true; } else c = 0;
    }
    return false;
  } catch { return false; }
}
function checkErrorFreeDay(sessions) {
  try {
    const today = toDateStr(Date.now());
    const t = sessions.filter(s => toDateStr(s.timestamp) === today);
    return t.length > 0 && t.every(s => s.subtype === 'Successful Run');
  } catch { return false; }
}
function generateInsights(sessions, stats) {
  const ins = [];
  try {
    const { totalRuns, successes, byType, consecutiveTLE, avgFixTime } = stats;
    if (totalRuns === 0) return [];
    const sr = totalRuns > 0 ? (successes / totalRuns) * 100 : 0;
    if (sr >= 80) ins.push({ icon: '🌟', title: 'Great accuracy!', text: `${sr.toFixed(0)}% success rate — you write clean C code. Keep it up!`, color: '#059669' });
    else if (sr >= 50) ins.push({ icon: '📈', title: 'Improving steadily', text: `${sr.toFixed(0)}% success rate. Read errors top-down to fix root causes faster.`, color: '#0ea5e9' });
    else if (totalRuns >= 3) ins.push({ icon: '💡', title: 'Error patterns detected', text: `${(100 - sr).toFixed(0)}% of runs have errors. Focus on one error type at a time.`, color: '#f59e0b' });
    const topErr = Object.entries(byType).sort(([,a],[,b]) => b - a)[0];
    if (topErr) {
      const [type, count] = topErr;
      const tips = TIPS[type];
      if (tips?.length) ins.push({ icon: '🎯', title: `Top mistake: ${type}`, text: `You've hit this ${count} time${count>1?'s':''} — ${tips[0]}`, color: ERROR_TYPES[type]?.color ?? '#6366f1' });
    }
    if (consecutiveTLE >= 2) ins.push({ icon: '∞', title: 'Infinite loop pattern', text: `${consecutiveTLE} consecutive TLEs — check your loop increment and condition.`, color: '#d97706' });
    if (avgFixTime !== null) {
      if (avgFixTime < 30) ins.push({ icon: '⚡', title: 'Lightning fast fixes!', text: `~${avgFixTime}s avg fix time — excellent debugging instincts.`, color: '#8b5cf6' });
      else if (avgFixTime > 120) ins.push({ icon: '🔍', title: 'Take it step by step', text: `Avg fix time is ${avgFixTime}s. Fix the first error only, then recompile.`, color: '#64748b' });
    }
    const streak = computeStreak(sessions);
    if (streak >= 3) ins.push({ icon: '🔥', title: `${streak}-day streak!`, text: `Compiled code for ${streak} days in a row. Consistency is mastery.`, color: '#f97316' });
    if (checkErrorFreeDay(sessions)) ins.push({ icon: '💎', title: 'Error-free today!', text: `All runs today compiled successfully. You're on fire!`, color: '#06b6d4' });
  } catch { /* safe */ }
  if (ins.length === 0) ins.push({ icon: '🚀', title: 'Getting started', text: 'Run some code to unlock personalized insights!', color: '#10b981' });
  return ins.slice(0, 4);
}

// ─── useScrollReveal hook ─────────────────────────────────────────────────────
function useScrollReveal(delay = 0) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
    );
    // Small delay so first paint is visible before animating
    const t = setTimeout(() => obs.observe(el), 30);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, []);
  return { ref, vis, delay };
}

// ─── AnimSection — the key building block ────────────────────────────────────
function AnimSection({ title, idx = 0, children }) {
  const { ref, vis } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={styles.section}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'none' : 'translateY(48px) scale(0.96)',
        filter: vis ? 'none' : 'blur(6px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 70}ms,
                     transform 0.6s cubic-bezier(0.16,1,0.3,1) ${idx * 70}ms,
                     filter 0.5s ease ${idx * 70}ms`,
      }}
    >
      <div className={styles.sectionLabel}>{title}</div>
      {children}
    </div>
  );
}

// ─── 1. Hero KPI Cards ────────────────────────────────────────────────────────
function HeroStats({ stats, sessions, panelKey }) {
  const { totalRuns, successes } = stats;
  const successRate = totalRuns > 0 ? ((successes / totalRuns) * 100).toFixed(1) : null;
  const avgFix = computeAvgFixTime(sessions);
  const streak = computeStreak(sessions);

  const cards = [
    { label: 'Total Runs',   value: String(totalRuns || 0),                   icon: '▶', color: '#3b82f6', bg: '#eff6ff', grad: 'linear-gradient(135deg,#dbeafe,#eff6ff)' },
    { label: 'Success Rate', value: successRate != null ? `${successRate}%` : '—', icon: '✓', color: '#059669', bg: '#ecfdf5', grad: 'linear-gradient(135deg,#a7f3d0,#ecfdf5)' },
    { label: 'Avg Fix Time', value: avgFix != null ? `${avgFix}s` : '—',      icon: '⚡', color: '#f59e0b', bg: '#fffbeb', grad: 'linear-gradient(135deg,#fde68a,#fffbeb)' },
    { label: 'Day Streak',   value: String(streak || 0),                       icon: '🔥', color: '#f97316', bg: '#fff7ed', grad: 'linear-gradient(135deg,#fed7aa,#fff7ed)' },
  ];

  return (
    <div className={styles.heroGrid}>
      {cards.map((c, i) => (
        <div
          key={c.label}
          className={styles.heroCard}
          style={{
            background: c.grad,
            border: `1.5px solid ${c.color}22`,
            animationName: styles.heroCardPop,
            animationDuration: '700ms',
            animationTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
            animationFillMode: 'both',
            animationDelay: `${i * 90}ms`,
          }}
        >
          <div className={styles.heroIconBox} style={{ background: `${c.color}18`, color: c.color }}>
            {c.icon}
          </div>
          <div className={styles.heroValue} style={{ color: c.color }}>{c.value}</div>
          <div className={styles.heroLabel}>{c.label}</div>
        </div>
      ))}
    </div>
  );
}

// ─── 2. 14-day Heatmap ───────────────────────────────────────────────────────
function Heatmap({ sessions }) {
  const [tooltip, setTooltip] = useState(null);

  const dailyMap = {};
  sessions.forEach(s => {
    const d = toDateStr(s.timestamp);
    if (!dailyMap[d]) dailyMap[d] = { total: 0, success: 0, error: 0 };
    dailyMap[d].total++;
    if (s.subtype === 'Successful Run') dailyMap[d].success++;
    else dailyMap[d].error++;
  });

  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (13 - i));
    const str = d.toISOString().slice(0, 10);
    return { str, info: dailyMap[str] || { total: 0, success: 0, error: 0 }, d };
  });

  const maxTotal = Math.max(...days.map(d => d.info.total), 1);

  function getCellColor(total, info) {
    if (total === 0) return '#f1f5f9';
    if (info.error === 0) return '#059669';
    const v = total / maxTotal;
    if (v < 0.33) return '#bbf7d0';
    if (v < 0.66) return '#34d399';
    return '#10b981';
  }

  const weekdays = ['S','M','T','W','T','F','S'];

  return (
    <div className={styles.heatmapWrap}>
      <div className={styles.heatmapGrid}>
        {days.map((day, i) => (
          <div
            key={day.str}
            className={styles.heatCell}
            style={{
              background: getCellColor(day.info.total, day.info),
              animationName: 'heatWave',
              animationDuration: '550ms',
              animationTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)',
              animationFillMode: 'both',
              animationDelay: `${i * 35}ms`,
            }}
            onMouseEnter={e => {
              const rect = e.currentTarget.getBoundingClientRect();
              setTooltip({ day, rect });
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}
      </div>
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

      {tooltip && (() => {
        const { day, rect } = tooltip;
        const isPerfect = day.info.total > 0 && day.info.error === 0;
        const tipLeft = Math.min(Math.max(rect.left - 10, 8), window.innerWidth - 170);
        const tipTop  = rect.top - 112;
        return (
          <div className={styles.heatTooltip} style={{ top: tipTop, left: tipLeft }}>
            <div className={styles.heatTooltipDate}>
              {day.d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className={styles.heatTooltipStat}>{day.info.error} mistake{day.info.error !== 1 ? 's' : ''}</div>
            <div className={styles.heatTooltipStat}>{day.info.total} run{day.info.total !== 1 ? 's' : ''}</div>
            {isPerfect && <div className={styles.heatTooltipPerfect}>Perfect Day! 🌟</div>}
          </div>
        );
      })()}
    </div>
  );
}

// ─── 3. Donut Chart ───────────────────────────────────────────────────────────
function DonutChart({ byType, totalErrors }) {
  const [hovered, setHovered] = useState(null);
  const R = 68, STROKE = 16;
  const circumference = 2 * Math.PI * R;
  const sorted = Object.entries(byType).filter(([k]) => k !== 'Successful Run').sort(([,a],[,b]) => b - a).slice(0, 6);
  const total = sorted.reduce((s, [,c]) => s + c, 0) || 1;
  let offset = 0;
  const segments = sorted.map(([type, count]) => {
    const pct = count / total, len = pct * circumference;
    const seg = { type, count, pct, len, offset };
    offset += len; return seg;
  });

  if (totalErrors === 0) return (
    <div className={styles.donutWrap}>
      <svg width="176" height="176" viewBox="0 0 176 176" className={styles.donutSvg}>
        <circle cx="88" cy="88" r={R} fill="none" stroke="#f1f5f9" strokeWidth={STROKE} />
      </svg>
      <div className={styles.donutCenter}><span className={styles.donutNum}>0</span><span className={styles.donutLbl}>Errors</span></div>
    </div>
  );

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
                cx="88" cy="88" r={R} fill="none"
                stroke={color}
                strokeWidth={isHov ? STROKE + 5 : STROKE}
                strokeLinecap="round"
                strokeDasharray={`${seg.len - 2} ${circumference - seg.len + 2}`}
                strokeDashoffset={-seg.offset}
                style={{
                  transition: 'stroke-width 0.25s cubic-bezier(0.34,1.56,0.64,1)',
                  animation: `donutSpin 800ms cubic-bezier(0.16,1,0.3,1) ${i * 100}ms both`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setHovered(seg.type)}
                onMouseLeave={() => setHovered(null)}
              />
            );
          })}
        </svg>
        <div className={styles.donutCenter}>
          <span className={styles.donutNum}>{totalErrors}</span>
          <span className={styles.donutLbl}>Total</span>
        </div>
      </div>
      <div className={styles.donutLegend}>
        {segments.map(seg => {
          const color = ERROR_TYPES[seg.type]?.color ?? '#94a3b8';
          return (
            <div key={seg.type} className={styles.legendRow}
              style={{ opacity: hovered && hovered !== seg.type ? 0.35 : 1, transition: 'opacity 0.2s' }}
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
  const last15 = sessions.slice(-15);
  const maxMs = Math.max(...last15.map(s => s.timeMs || 100), 100);
  if (last15.length === 0) return <div className={styles.emptySmall}>No compile history yet</div>;

  function barColor(s) {
    if (s.subtype === 'Successful Run') return '#059669';
    if (s.subtype === 'Infinite Loop / TLE') return '#eab308';
    if (s.subtype === 'Runtime Crash' || s.subtype === 'Segmentation Fault') return '#f97316';
    return '#ef4444';
  }

  return (
    <div className={styles.timelineWrap}>
      <div className={styles.timelineBars}>
        {last15.map((s, i) => {
          const h = Math.max(10, ((s.timeMs || 100) / maxMs) * 72);
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
                  <div style={{ color: '#94a3b8', fontSize: 10 }}>{new Date(s.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  {s.timeMs && <div style={{ color: '#475569', fontSize: 11 }}>{s.timeMs}ms</div>}
                </div>
              )}
              <div
                className={styles.timelineBar}
                style={{
                  height: h, background: color,
                  opacity: hov !== null && !isHov ? 0.3 : 1,
                  transform: isHov ? 'scaleX(1.3)' : 'scaleX(1)',
                  transition: 'opacity 0.2s, transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                  animation: `barRise 600ms cubic-bezier(0.34,1.56,0.64,1) ${i * 40}ms both`,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.timelineLegend}>
        {[['#059669','Success'],['#ef4444','Error'],['#f97316','Runtime'],['#eab308','TLE']].map(([c,l]) => (
          <div key={l} className={styles.timelineLegItem}>
            <span style={{ width:8,height:8,borderRadius:2,background:c,display:'inline-block',marginRight:4 }} />
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 5. Radar Chart ───────────────────────────────────────────────────────────
function RadarChart({ byType, totalRuns }) {
  const axes = [
    { label: 'Syntax',   key: ['Missing Semicolon','Missing Parenthesis','Missing Brace/Bracket','Missing < or >','Unclosed String'] },
    { label: 'Variable', key: ['Undeclared Variable','Uninitialized Variable','Unused Variable'] },
    { label: 'Runtime',  key: ['Runtime Crash','Segmentation Fault'] },
    { label: 'Logic',    key: ['Infinite Loop / TLE','Array Out of Bounds'] },
    { label: 'Type',     key: ['Type Mismatch','Format Specifier Mismatch','Implicit Declaration'] },
  ];
  const N = axes.length, CX = 100, CY = 100, R = 75;
  const total = totalRuns || 1;
  const pts = axes.map((ax, i) => {
    const angle = (i / N) * 2 * Math.PI - Math.PI / 2;
    const count = ax.key.reduce((s, k) => s + (byType[k] || 0), 0);
    const ratio = Math.min(count / Math.max(total * 0.5, 1), 1);
    return {
      label: ax.label, ratio, angle,
      x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle),
      vx: CX + R * ratio * Math.cos(angle), vy: CY + R * ratio * Math.sin(angle),
      lx: CX + (R + 18) * Math.cos(angle), ly: CY + (R + 18) * Math.sin(angle),
    };
  });

  return (
    <svg width="200" height="200" viewBox="0 0 200 200" className={styles.radarSvg}>
      {[0.25,0.5,0.75,1].map(r => (
        <polygon key={r}
          points={pts.map(p => `${CX + R*r*Math.cos(p.angle)},${CY + R*r*Math.sin(p.angle)}`).join(' ')}
          fill="none" stroke="#e2e8f0" strokeWidth="1" />
      ))}
      {pts.map(p => <line key={p.label} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#e2e8f0" strokeWidth="1" />)}
      <polygon points={pts.map(p => `${p.x},${p.y}`).join(' ')} fill="rgba(241,245,249,0.4)" stroke="#e2e8f0" strokeWidth="1.5" />
      <polygon points={pts.map(p => `${p.vx},${p.vy}`).join(' ')}
        fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="2.5"
        style={{ animation: 'radarIn 900ms cubic-bezier(0.16,1,0.3,1) 200ms both' }} />
      {pts.map(p => (
        <circle key={p.label} cx={p.vx} cy={p.vy} r="5"
          fill="#10b981" stroke="#fff" strokeWidth="2"
          style={{ animation: 'radarDot 600ms cubic-bezier(0.34,1.56,0.64,1) 600ms both' }} />
      ))}
      {pts.map(p => (
        <text key={p.label} x={p.lx} y={p.ly} textAnchor="middle" dominantBaseline="middle"
          fontSize="10" fontWeight="700" fill="#475569" fontFamily="Inter,sans-serif">
          {p.label}
        </text>
      ))}
    </svg>
  );
}

// ─── 6. Milestones ────────────────────────────────────────────────────────────
function Milestones({ sessions, stats }) {
  const { totalRuns, successes } = stats;
  const badges = [
    { id:'r1',  emoji:'✓',  label:'First Run',     unlocked:totalRuns>=1,             color:'#3b82f6' },
    { id:'r10', emoji:'🎖️', label:'10 Compiles',   unlocked:totalRuns>=10,            color:'#f59e0b' },
    { id:'clr', emoji:'🌟', label:'Clean Run',      unlocked:successes>=1,             color:'#059669' },
    { id:'x5',  emoji:'🏆', label:'5 in a Row',    unlocked:checkFiveConsecutiveSuccesses(sessions), color:'#7c3aed' },
    { id:'pfr', emoji:'💎', label:'Error-Free Day', unlocked:checkErrorFreeDay(sessions), color:'#06b6d4' },
  ];
  const streak = computeStreak(sessions);

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
            style={{ animation: `badgePop 600ms cubic-bezier(0.34,1.56,0.64,1) ${i * 80}ms both` }}
            title={b.label}
          >
            <div className={styles.badgeEmoji}>{b.unlocked ? b.emoji : '🔒'}</div>
            <div className={styles.badgeLabel} style={b.unlocked ? { color: b.color } : {}}>{b.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 7. Velocity Graph ────────────────────────────────────────────────────────
function VelocityGraph({ sessions }) {
  if (sessions.length < 2) return <div className={styles.emptySmall}>Need 2+ runs to show velocity</div>;
  const points = sessions.map((_, i, arr) => {
    const win = arr.slice(Math.max(0, i - 4), i + 1);
    return (win.filter(s => s.subtype === 'Successful Run').length / win.length) * 100;
  });
  const W = 440, H = 90, PAD = 10;
  const iW = W - PAD * 2, iH = H - PAD * 2;
  const best = Math.max(...points);
  const toX = i => PAD + (i / Math.max(points.length - 1, 1)) * iW;
  const toY = v => PAD + iH - (v / 100) * iH;
  const pathD = points.map((v, i) => `${i===0?'M':'L'} ${toX(i)} ${toY(v)}`).join(' ');
  const areaD = `${pathD} L ${toX(points.length-1)} ${H-PAD} L ${PAD} ${H-PAD} Z`;
  const recent = points.slice(-3).reduce((a,b) => a+b, 0) / 3;
  const early  = points.slice(0, 3).reduce((a,b) => a+b, 0) / 3;
  const trendColor = recent >= early ? '#10b981' : '#ef4444';

  return (
    <div className={styles.velocityWrap}>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {[0,25,50,75,100].map(v => (
          <line key={v} x1={PAD} y1={toY(v)} x2={W-PAD} y2={toY(v)} stroke="#f1f5f9" strokeWidth="1" strokeDasharray={v?'3,3':'0'} />
        ))}
        <line x1={PAD} y1={toY(best)} x2={W-PAD} y2={toY(best)} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.8" />
        <text x={W-PAD-2} y={toY(best)-4} textAnchor="end" fontSize="9" fill="#f59e0b" fontFamily="Inter,sans-serif">Best</text>
        <path d={areaD} fill={trendColor} opacity="0.1" style={{ animation: 'areaFade 800ms ease 200ms both' }} />
        <path d={pathD} fill="none" stroke={trendColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ animation: 'lineDrawVelocity 1000ms ease both' }} />
        <circle cx={toX(points.length-1)} cy={toY(points[points.length-1])} r="5"
          fill={trendColor} stroke="#fff" strokeWidth="2"
          style={{ animation: 'dotPop 400ms cubic-bezier(0.34,1.56,0.64,1) 900ms both' }} />
      </svg>
      <div className={styles.velocityLabels}>
        <span>Attempt 1</span>
        <span style={{ color: trendColor, fontWeight: 700 }}>{recent >= early ? '▲ Improving' : '▼ More practice needed'}</span>
        <span>Latest</span>
      </div>
    </div>
  );
}

// ─── 8. Error Tags ────────────────────────────────────────────────────────────
function ErrorTags({ byType }) {
  const [expanded, setExpanded] = useState(null);
  const sorted = Object.entries(byType).sort(([,a],[,b]) => b - a).slice(0, 8);
  const max = sorted[0]?.[1] || 1;
  if (sorted.length === 0) return <div className={styles.emptySmall}>No errors recorded yet</div>;
  return (
    <div className={styles.tagsWrap}>
      {sorted.map(([type, count], i) => {
        const meta = ERROR_TYPES[type] ?? { icon: '?', color: '#94a3b8', bg: '#f8fafc' };
        const pct = (count / max) * 100;
        const isExp = expanded === type;
        const tips = TIPS[type] ?? [];
        return (
          <div key={type} className={styles.tagRow}
            style={{ animation: `tagSlide 500ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms both` }}>
            <div className={styles.tagHeader} onClick={() => setExpanded(isExp ? null : type)}
              style={{ cursor: tips.length ? 'pointer' : 'default' }}>
              <span className={styles.tagIcon} style={{ color: meta.color, background: meta.bg }}>{meta.icon}</span>
              <span className={styles.tagName}>{type}</span>
              <span className={styles.tagCount} style={{ background: meta.bg, color: meta.color }}>{count}</span>
            </div>
            <div className={styles.tagBarTrack}>
              <div className={styles.tagBarFill} style={{ width: `${pct}%`, background: meta.color }} />
            </div>
            {isExp && tips.length > 0 && (
              <div className={styles.tagTips}>
                {tips.map((t, j) => (
                  <div key={j} className={styles.tagTip} style={{ borderLeftColor: meta.color, animationDelay: `${j*60}ms` }}>
                    <span className={styles.tagTipNum} style={{ background: meta.color }}>{j+1}</span>
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
  const today = toDateStr(Date.now());
  const ts = sessions.filter(s => toDateStr(s.timestamp) === today);
  const todaySuccess = ts.filter(s => s.subtype === 'Successful Run').length;
  const todayErrors  = ts.filter(s => s.subtype !== 'Successful Run').length;
  const duration = ts.length > 1 ? Math.round((ts[ts.length-1].timestamp - ts[0].timestamp) / 60000) : 0;
  const topToday = (() => {
    const m = {}; ts.forEach(s => { if (s.subtype !== 'Successful Run') m[s.subtype] = (m[s.subtype]||0)+1; });
    return Object.entries(m).sort(([,a],[,b]) => b-a)[0]?.[0] ?? null;
  })();
  const events = ts.slice(-8);

  return (
    <div className={styles.sessionWrap}>
      <div className={styles.sessionKpis}>
        {[
          { label:'Runs Today', val: ts.length, color: '#1e293b' },
          { label:'Successes',  val: todaySuccess, color: '#059669' },
          { label:'Errors',     val: todayErrors,  color: '#ef4444' },
          { label:'Active Time',val: `${duration}m`,color: '#6366f1' },
        ].map((k, i) => (
          <div key={k.label} className={styles.sessionKpi}
            style={{ animation: `cardIn 500ms cubic-bezier(0.34,1.56,0.64,1) ${i*80}ms both` }}>
            <span className={styles.sessionKpiVal} style={{ color: k.color }}>{k.val}</span>
            <span className={styles.sessionKpiLabel}>{k.label}</span>
          </div>
        ))}
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
                {i < events.length-1 && <div className={styles.sessionEventLine} />}
                <div className={styles.sessionEventLabel} style={{ color }}>
                  {s.subtype === 'Successful Run' ? '✓ Success' : s.subtype}
                </div>
                <div className={styles.sessionEventTime}>
                  {new Date(s.timestamp).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── 10. Insight Cards ────────────────────────────────────────────────────────
function InsightCards({ sessions, stats }) {
  const [active, setActive] = useState(0);
  const insights = generateInsights(sessions, stats);
  const timerRef = useRef(null);

  useEffect(() => {
    if (insights.length <= 1) return;
    timerRef.current = setInterval(() => setActive(p => (p+1) % insights.length), 8000);
    return () => clearInterval(timerRef.current);
  }, [insights.length]);

  if (!insights.length) return null;
  const ins = insights[active];

  return (
    <div className={styles.insightWrap}>
      <div className={styles.insightCard} key={active} style={{ borderLeftColor: ins.color }}>
        <div className={styles.insightIcon}>{ins.icon}</div>
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
              style={i === active ? { background: ins.color } : {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <rect width="64" height="64" rx="32" fill="#ecfdf5" />
          <rect x="12" y="38" width="8" height="14" rx="2" fill="#a7f3d0" style={{ animation: 'barRise 600ms cubic-bezier(0.34,1.56,0.64,1) 100ms both' }} />
          <rect x="24" y="28" width="8" height="24" rx="2" fill="#6ee7b7" style={{ animation: 'barRise 600ms cubic-bezier(0.34,1.56,0.64,1) 200ms both' }} />
          <rect x="36" y="20" width="8" height="32" rx="2" fill="#34d399" style={{ animation: 'barRise 600ms cubic-bezier(0.34,1.56,0.64,1) 300ms both' }} />
          <rect x="48" y="12" width="8" height="40" rx="2" fill="#10b981" style={{ animation: 'barRise 600ms cubic-bezier(0.34,1.56,0.64,1) 400ms both' }} />
        </svg>
      </div>
      <p className={styles.emptyTitle}>No analytics yet</p>
      <p className={styles.emptySub}>Run your first program to start seeing insights, charts, and progress tracking here.</p>
    </div>
  );
}

// ─── Main Panel ───────────────────────────────────────────────────────────────
export default function AnalyticsPanel({ onClose }) {
  const [sessions, setSessions] = useState(() => [...bugTrackerStore.sessions]);
  const [stats, setStats]       = useState(() => bugTrackerStore.getStats());
  const [closing, setClosing]   = useState(false);
  // panelKey forces re-mount of children (and resets animations) every time panel opens
  const panelKey = useRef(Date.now()).current;

  useEffect(() => {
    const unsub = bugTrackerStore.subscribe(newStats => {
      setStats(newStats);
      setSessions([...bugTrackerStore.sessions]);
    });
    return unsub;
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 300);
  }, [onClose]);

  const handleClear = useCallback(() => bugTrackerStore.reset(), []);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') handleClose(); };
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
          </div>
          <div className={styles.headerActions}>
            {hasData && (
              <button className={styles.clearBtn} onClick={handleClear} id="analytics-clear-btn" title="Clear all analytics">
                🗑 Clear
              </button>
            )}
            <button className={styles.closeBtn} onClick={handleClose} aria-label="Close" id="analytics-close-btn">×</button>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────────── */}
        <div className={styles.panelBody} key={panelKey}>
          {!hasData ? (
            <EmptyState />
          ) : (
            <>
              <AnimSection title="Overview" idx={0}>
                <HeroStats stats={stats} sessions={sessions} panelKey={panelKey} />
              </AnimSection>

              <AnimSection title="14-Day Activity" idx={1}>
                <Heatmap sessions={sessions} />
              </AnimSection>

              {stats.errors > 0 && (
                <AnimSection title="Error Breakdown" idx={2}>
                  <DonutChart byType={stats.byType} totalErrors={stats.errors} />
                </AnimSection>
              )}

              <AnimSection title="Compile History (Last 15)" idx={3}>
                <CompileTimeline sessions={sessions} />
              </AnimSection>

              {stats.errors > 0 && (
                <AnimSection title="Error Profile" idx={4}>
                  <div className={styles.radarWrap}>
                    <RadarChart byType={stats.byType} totalRuns={stats.totalRuns} />
                    <div className={styles.radarLegend}>
                      <div className={styles.radarLegItem}>
                        <span style={{ display:'inline-block',width:12,height:12,borderRadius:2,background:'rgba(16,185,129,0.3)',border:'2px solid #10b981',marginRight:6 }} />
                        Your profile
                      </div>
                    </div>
                  </div>
                </AnimSection>
              )}

              <AnimSection title="Streak & Milestones" idx={5}>
                <Milestones sessions={sessions} stats={stats} />
              </AnimSection>

              <AnimSection title="Learning Velocity" idx={6}>
                <VelocityGraph sessions={sessions} />
              </AnimSection>

              {stats.errors > 0 && (
                <AnimSection title="Error Frequency (click for tips)" idx={7}>
                  <ErrorTags byType={stats.byType} />
                </AnimSection>
              )}

              <AnimSection title="Today's Session" idx={8}>
                <SessionSummary sessions={sessions} />
              </AnimSection>

              <AnimSection title="💡 Personalized Insights" idx={9}>
                <InsightCards sessions={sessions} stats={stats} />
              </AnimSection>
            </>
          )}
        </div>
      </aside>

      {/* Global keyframes injected once */}
      <style>{`
        @keyframes heatWave {
          0%   { opacity:0; transform: scale(0) rotate(12deg); }
          70%  { transform: scale(1.2) rotate(-4deg); }
          100% { opacity:1; transform: scale(1) rotate(0deg); }
        }
        @keyframes donutSpin {
          from { stroke-dashoffset: 430; opacity:0; }
          to   { opacity:1; }
        }
        @keyframes radarIn {
          from { opacity:0; transform-origin:100px 100px; transform:scale(0.1); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes radarDot {
          0%   { opacity:0; r:0; }
          100% { opacity:1; r:5; }
        }
        @keyframes barRise {
          from { transform: scaleY(0); transform-origin: bottom; opacity:0; }
          to   { transform: scaleY(1); opacity:1; }
        }
        @keyframes cardIn {
          0%   { opacity:0; transform: translateY(20px) scale(0.92); }
          60%  { transform: translateY(-4px) scale(1.02); }
          100% { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes badgePop {
          0%   { opacity:0; transform: scale(0) rotate(-15deg); }
          70%  { transform: scale(1.15) rotate(4deg); }
          100% { opacity:1; transform: scale(1) rotate(0deg); }
        }
        @keyframes tagSlide {
          from { opacity:0; transform: translateX(-20px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes areaFade {
          from { opacity:0; }
          to   { opacity:0.1; }
        }
        @keyframes lineDrawVelocity {
          from { stroke-dashoffset:2000; stroke-dasharray:2000; }
          to   { stroke-dasharray:2000; }
        }
        @keyframes dotPop {
          0%   { opacity:0; transform:scale(0); }
          70%  { transform:scale(1.4); }
          100% { opacity:1; transform:scale(1); }
        }
        @keyframes heroCardPop {
          0%   { opacity:0; transform: translateY(32px) scale(0.85); }
          55%  { transform: translateY(-6px) scale(1.04); }
          100% { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes insightSlide {
          from { opacity:0; transform:translateX(24px) scale(0.97); }
          to   { opacity:1; transform:translateX(0) scale(1); }
        }
        @keyframes tipReveal {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </>
  );
}
