import { useState, useEffect, useCallback } from 'react';
import { X, Trophy, Flame, RefreshCw, Zap, Star } from 'lucide-react';
import { supabase } from '../supabaseClient.js';
import styles from './LeaderboardPanel.module.css';

// ── Language config ───────────────────────────────────────────────────────────
const LANG_COLORS = {
  c:      '#2563eb',
  java:   '#f97316',
  python: '#3b82f6',
};

const LANG_ACTIVE_CLASSES = {
  c:      styles.langPillActiveC,
  java:   styles.langPillActiveJava,
  python: styles.langPillActivePython,
};

function LangBadge({ lang }) {
  const key = lang.toLowerCase();
  return (
    <span
      className={styles.langBadge}
      style={{ background: LANG_COLORS[key] || '#6b7280' }}
    >
      {key === 'c' ? 'C' : key === 'java' ? 'Java' : 'Python'}
    </span>
  );
}

function getBadges(row) {
  if (!row.runs_by_lang) return [];
  const badges = [];
  if ((row.runs_by_lang.c      || 0) > 0) badges.push('c');
  if ((row.runs_by_lang.java   || 0) > 0) badges.push('java');
  if ((row.runs_by_lang.python || 0) > 0) badges.push('python');
  return badges;
}

// Consistent avatar background based on name
function getAvatarBg(name) {
  const colors = [
    'linear-gradient(135deg,#6366f1,#8b5cf6)',
    'linear-gradient(135deg,#f59e0b,#d97706)',
    'linear-gradient(135deg,#10b981,#059669)',
    'linear-gradient(135deg,#3b82f6,#1d4ed8)',
    'linear-gradient(135deg,#ec4899,#db2777)',
    'linear-gradient(135deg,#f97316,#ea580c)',
    'linear-gradient(135deg,#14b8a6,#0d9488)',
    'linear-gradient(135deg,#a855f7,#7c3aed)',
  ];
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return colors[Math.abs(hash) % colors.length];
}

function Avatar({ name, size = 38, gold = false, silver = false, bronze = false, small = false }) {
  let bg = getAvatarBg(name);
  if (gold)   bg = 'linear-gradient(135deg,#f59e0b,#d97706)';
  if (silver) bg = 'linear-gradient(135deg,#94a3b8,#64748b)';
  if (bronze) bg = 'linear-gradient(135deg,#f97316,#c2410c)';

  const letter = (name || '?')[0].toUpperCase();
  return (
    <div
      className={`${styles.avatar} ${small ? styles.avatarSmall : ''}`}
      style={{
        width: size,
        height: size,
        background: bg,
        fontSize: Math.round(size * 0.4),
        minWidth: size,
      }}
    >
      {letter}
    </div>
  );
}

// Podium heights: silver=80, gold=110, bronze=60
const PEDESTAL_HEIGHTS = [110, 80, 60];

function PodiumCard({ row, position }) {
  const medals  = ['🥇', '🥈', '🥉'];
  const isGold   = position === 0;
  const isSilver = position === 1;
  const isBronze = position === 2;
  const cardClass = isGold
    ? styles.podiumGold
    : isSilver
    ? styles.podiumSilver
    : styles.podiumBronze;

  return (
    <div className={`${styles.podiumCard} ${cardClass}`}>
      {isGold && <span className={styles.crownIcon}>👑</span>}
      <Avatar
        name={row.display_name}
        size={isGold ? 56 : 46}
        gold={isGold}
        silver={isSilver}
        bronze={isBronze}
      />
      <div className={styles.podiumName}>{row.display_name}</div>
      <div className={styles.podiumMeta}>
        <Flame size={13} className={styles.flameIcon} />
        <span>{row.current_streak}d</span>
      </div>
      <div className={styles.podiumXp}>{row.xp} XP</div>
      <div
        className={styles.podiumPedestal}
        style={{ height: PEDESTAL_HEIGHTS[position] }}
      >
        <span className={styles.podiumMedal}>{medals[position]}</span>
        <span className={styles.podiumRankNum}>#{row.rank}</span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LeaderboardPanel({ onClose }) {
  const [language,  setLanguage]  = useState('all');
  const [timeframe, setTimeframe] = useState('weekly');
  const [rows,      setRows]      = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [myUserId,  setMyUserId]  = useState(null);

  // Get logged-in user
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setMyUserId(session?.user?.id || null);
    });
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/leaderboard?language=${language}&timeframe=${timeframe}`
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || body.error || `Server error ${res.status}`);
      }
      const json = await res.json();
      setRows(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      setError(err.message || 'Failed to load leaderboard');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [language, timeframe]);

  useEffect(() => { fetchLeaderboard(); }, [fetchLeaderboard]);

  // Keyboard close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Derived data
  const myRow   = rows.find(r => r.user_id === myUserId) || null;
  const top3    = rows.slice(0, 3);
  const rest    = rows.slice(3);
  const aboveMe = myRow ? rows.find(r => Number(r.rank) === Number(myRow.rank) - 1) : null;
  const xpGap   = myRow && aboveMe ? aboveMe.xp - myRow.xp : null;

  // Language pill active class
  const getLangPillClass = (key) => {
    if (language !== key) return styles.langPill;
    if (key === 'all')    return `${styles.langPill} ${styles.langPillActive}`;
    return `${styles.langPill} ${LANG_ACTIVE_CLASSES[key] || styles.langPillActive}`;
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.panel} role="dialog" aria-label="Leaderboard" aria-modal="true">

        {/* ── Header ── */}
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>
            <Trophy size={22} className={styles.trophyIcon} />
            <span>Leaderboard</span>
          </div>
          <div className={styles.timeTabs}>
            <button
              className={`${styles.timeTab} ${timeframe === 'weekly'  ? styles.timeTabActive : ''}`}
              onClick={() => setTimeframe('weekly')}
            >
              🏃 Weekly Sprint
            </button>
            <button
              className={`${styles.timeTab} ${timeframe === 'alltime' ? styles.timeTabActive : ''}`}
              onClick={() => setTimeframe('alltime')}
            >
              ⭐ All-Time
            </button>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close leaderboard">
            <X size={18} />
          </button>
        </div>

        {/* ── Language filter ── */}
        <div className={styles.langBar}>
          {[
            { key: 'all',    label: '🌐 All' },
            { key: 'c',      label: '⚙️ C' },
            { key: 'java',   label: '☕ Java' },
            { key: 'python', label: '🐍 Python' },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={getLangPillClass(key)}
              onClick={() => setLanguage(key)}
            >
              {label}
            </button>
          ))}
          <button
            className={styles.refreshBtn}
            onClick={fetchLeaderboard}
            aria-label="Refresh"
            title="Refresh leaderboard"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        {/* ── XP Info card ── */}
        <div className={styles.xpCard}>
          <span className={styles.xpCardTitle}>
            <Zap size={12} /> How XP Works
          </span>
          <span className={styles.xpRule}>
            ✅ Clean Run (0 errors): <strong>+10 XP</strong>
          </span>
          <span className={styles.xpDivider}>|</span>
          <span className={styles.xpRule}>
            🔥 Daily Streak Bonus: <strong>+20 XP</strong> per active day
          </span>
        </div>

        {/* ── Body ── */}
        <div className={styles.body}>

          {/* Loading */}
          {loading && (
            <div className={styles.stateBox}>
              <div className={styles.spinner} />
              <span>Loading leaderboard…</span>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className={styles.stateBox}>
              <span className={styles.emptyIcon}>😕</span>
              <span className={styles.errorText}>Couldn't load the leaderboard</span>
              <span className={styles.errorSubtext}>
                {error.includes('42883') || error.includes('does not exist')
                  ? 'The leaderboard database function is not set up yet. Please run the SQL migration in Supabase.'
                  : error}
              </span>
              <button className={styles.retryBtn} onClick={fetchLeaderboard}>
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && rows.length === 0 && (
            <div className={styles.stateBox}>
              <span className={styles.emptyIcon}>🏆</span>
              <span className={styles.emptyText}>
                No students on the{' '}
                {language !== 'all' ? language.toUpperCase() + ' ' : ''}
                {timeframe === 'weekly' ? 'weekly' : 'all-time'} leaderboard yet.
              </span>
              <span className={styles.emptyHint}>
                Run code to earn XP and claim your spot!
              </span>
            </div>
          )}

          {/* Data */}
          {!loading && !error && rows.length > 0 && (
            <>
              {/* Podium: #2, #1, #3 so gold is centre */}
              {top3.length > 0 && (
                <div className={styles.podiumSection}>
                  <div className={styles.podiumLabel}>🏆 Top Performers</div>
                  <div className={styles.podium}>
                    {top3.length >= 2 && <PodiumCard row={top3[1]} position={1} />}
                    {top3.length >= 1 && <PodiumCard row={top3[0]} position={0} />}
                    {top3.length >= 3 && <PodiumCard row={top3[2]} position={2} />}
                  </div>
                </div>
              )}

              {/* Ranked list #4+ */}
              {rest.length > 0 && (
                <div className={styles.rankSection}>
                  <div className={styles.rankSectionLabel}>
                    <Star size={10} style={{ display: 'inline', marginRight: 4 }} />
                    Rankings
                  </div>
                  <div className={styles.rankList}>
                    {/* Column header */}
                    <div className={styles.rankListHeader}>
                      <span>#</span>
                      <span>Student</span>
                      <span>Langs</span>
                      <span>Streak</span>
                      <span style={{ textAlign: 'right' }}>XP</span>
                    </div>

                    {rest.map((row) => {
                      const isMe   = row.user_id === myUserId;
                      const badges = getBadges(row);
                      return (
                        <div
                          key={row.rank}
                          className={`${styles.rankRow} ${isMe ? styles.rankRowMe : ''}`}
                        >
                          <span className={styles.rankNum}>#{row.rank}</span>

                          <div className={styles.rankUser}>
                            <Avatar name={row.display_name} size={30} small />
                            <span className={styles.rankName}>
                              {row.display_name}
                              {isMe && <span className={styles.youTag}>You</span>}
                            </span>
                          </div>

                          <div className={styles.rankBadges}>
                            {badges.map(b => <LangBadge key={b} lang={b} />)}
                          </div>

                          <div className={styles.rankStreak}>
                            <Flame size={13} className={styles.flameIcon} />
                            <span>{row.current_streak}d</span>
                          </div>

                          <span className={styles.rankXp}>{row.xp} XP</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Sticky "Your Position" bar ── */}
        {myRow && (
          <div className={styles.stickyBar}>
            <span className={styles.pinIcon}>📍</span>
            <span className={styles.stickyRank}>#{myRow.rank}</span>
            <span className={styles.stickyYou}>You — {myRow.display_name}</span>
            <span className={styles.stickyXp}>{myRow.xp} XP</span>
            {xpGap !== null && xpGap > 0 && (
              <span className={styles.stickyGap}>
                &nbsp;| 🎯 <strong>{xpGap} XP</strong> to overtake #{Number(myRow.rank) - 1}
              </span>
            )}
          </div>
        )}

      </div>
    </>
  );
}
