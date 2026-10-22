import { useState, useEffect, useCallback } from 'react';
import { X, Trophy, Flame, RefreshCw } from 'lucide-react';
import { supabase } from '../supabaseClient.js';
import styles from './LeaderboardPanel.module.css';

// ── Language badge colours ────────────────────────────────────────────────────
const LANG_COLORS = { c: '#60a5fa', java: '#fb923c', python: '#4ade80' };
const LANG_LABELS = { c: 'C', java: 'Java', python: 'Python' };

function LangBadge({ lang }) {
  const key = lang.toLowerCase();
  return (
    <span className={styles.langBadge} style={{ background: LANG_COLORS[key] || '#64748b' }}>
      {LANG_LABELS[key] || lang}
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

function Avatar({ name, size = 38, gold = false, silver = false, bronze = false }) {
  let bg = '#334155';
  if (gold)   bg = 'linear-gradient(135deg,#f59e0b,#d97706)';
  if (silver) bg = 'linear-gradient(135deg,#94a3b8,#64748b)';
  if (bronze) bg = 'linear-gradient(135deg,#cd7c2f,#92400e)';
  const letter = (name || '?')[0].toUpperCase();
  return (
    <div className={styles.avatar} style={{ width: size, height: size, background: bg, fontSize: Math.round(size * 0.38) }}>
      {letter}
    </div>
  );
}

function PodiumCard({ row, position }) {
  const medals  = ['🥇', '🥈', '🥉'];
  const heights = [110, 78, 60];
  const isGold   = position === 0;
  const isSilver = position === 1;
  const isBronze = position === 2;
  return (
    <div className={`${styles.podiumCard} ${isGold ? styles.podiumGold : isSilver ? styles.podiumSilver : styles.podiumBronze}`}>
      {isGold && <span className={styles.crownIcon}>👑</span>}
      <Avatar name={row.display_name} size={isGold ? 52 : 42} gold={isGold} silver={isSilver} bronze={isBronze} />
      <div className={styles.podiumName}>{row.display_name}</div>
      <div className={styles.podiumMeta}>
        <Flame size={12} className={styles.flameIcon} />
        <span>{row.current_streak}d</span>
      </div>
      <div className={styles.podiumXp}>{row.xp} XP</div>
      <div className={styles.podiumPedestal} style={{ height: heights[position] }}>
        <span className={styles.podiumMedal}>{medals[position]}</span>
        <span className={styles.podiumRankNum}>#{row.rank}</span>
      </div>
    </div>
  );
}

export default function LeaderboardPanel({ onClose }) {
  const [language,  setLanguage]  = useState('all');
  const [timeframe, setTimeframe] = useState('weekly');
  const [rows,      setRows]      = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);
  const [myUserId,  setMyUserId]  = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setMyUserId(session?.user?.id || null);
    });
  }, []);

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`/api/leaderboard?language=${language}&timeframe=${timeframe}`);
      if (!res.ok) throw new Error(`Server error ${res.status}`);
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

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const myRow   = rows.find(r => r.user_id === myUserId) || null;
  const top3    = rows.slice(0, 3);
  const rest    = rows.slice(3);
  const aboveMe = myRow ? rows.find(r => Number(r.rank) === Number(myRow.rank) - 1) : null;
  const xpGap   = myRow && aboveMe ? aboveMe.xp - myRow.xp : null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.panel} role="dialog" aria-label="Leaderboard" aria-modal="true">

        {/* Header */}
        <div className={styles.panelHeader}>
          <div className={styles.panelTitle}>
            <Trophy size={20} className={styles.trophyIcon} />
            <span>Leaderboard</span>
          </div>
          <div className={styles.timeTabs}>
            <button className={`${styles.timeTab} ${timeframe === 'weekly'  ? styles.timeTabActive : ''}`} onClick={() => setTimeframe('weekly')}>Weekly Sprint</button>
            <button className={`${styles.timeTab} ${timeframe === 'alltime' ? styles.timeTabActive : ''}`} onClick={() => setTimeframe('alltime')}>All-Time</button>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close leaderboard"><X size={18} /></button>
        </div>

        {/* Language filter */}
        <div className={styles.langBar}>
          {[{ key:'all', label:'All Languages' }, { key:'c', label:'C' }, { key:'java', label:'Java' }, { key:'python', label:'Python' }].map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.langPill} ${language === key ? styles.langPillActive : ''}`}
              style={language === key && key !== 'all' ? { background: LANG_COLORS[key], color: '#0f172a', borderColor: LANG_COLORS[key] } : {}}
              onClick={() => setLanguage(key)}
            >
              {label}
            </button>
          ))}
          <button className={styles.refreshBtn} onClick={fetchLeaderboard} aria-label="Refresh" title="Refresh leaderboard">
            <RefreshCw size={13} />
          </button>
        </div>

        {/* XP info card */}
        <div className={styles.xpCard}>
          <span className={styles.xpCardTitle}>How XP Works</span>
          <span className={styles.xpRule}>✅ Clean Run (0 errors): <strong>+10 XP</strong></span>
          <span className={styles.xpDivider}>|</span>
          <span className={styles.xpRule}>🔥 Daily Streak Bonus: <strong>+20 XP</strong> per active day</span>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {loading && (
            <div className={styles.stateBox}>
              <div className={styles.spinner} />
              <span>Loading leaderboard...</span>
            </div>
          )}

          {!loading && error && (
            <div className={styles.stateBox}>
              <span className={styles.errorText}>⚠ {error}</span>
              <button className={styles.retryBtn} onClick={fetchLeaderboard}>Retry</button>
            </div>
          )}

          {!loading && !error && rows.length === 0 && (
            <div className={styles.stateBox}>
              <Trophy size={40} style={{ opacity: 0.25, color: '#64748b' }} />
              <span className={styles.emptyText}>
                No students on the {language !== 'all' ? language.toUpperCase() + ' ' : ''}
                {timeframe === 'weekly' ? 'weekly' : 'all-time'} leaderboard yet.
              </span>
              <span className={styles.emptyHint}>Run code to earn XP and appear here!</span>
            </div>
          )}

          {!loading && !error && rows.length > 0 && (
            <>
              {/* Podium — top 3: order is #2, #1, #3 so gold is centre */}
              {top3.length > 0 && (
                <div className={styles.podium}>
                  {top3.length >= 2 && <PodiumCard row={top3[1]} position={1} />}
                  {top3.length >= 1 && <PodiumCard row={top3[0]} position={0} />}
                  {top3.length >= 3 && <PodiumCard row={top3[2]} position={2} />}
                </div>
              )}

              {/* Ranked list #4+ */}
              {rest.length > 0 && (
                <div className={styles.rankList}>
                  <div className={styles.rankListHeader}>
                    <span>#</span>
                    <span>Student</span>
                    <span>Langs</span>
                    <span>Streak</span>
                    <span>XP</span>
                  </div>
                  {rest.map((row) => {
                    const isMe   = row.user_id === myUserId;
                    const badges = getBadges(row);
                    return (
                      <div key={row.rank} className={`${styles.rankRow} ${isMe ? styles.rankRowMe : ''}`}>
                        <span className={styles.rankNum}>#{row.rank}</span>
                        <div className={styles.rankUser}>
                          <Avatar name={row.display_name} size={28} />
                          <span className={styles.rankName}>
                            {row.display_name}
                            {isMe && <span className={styles.youTag}>You</span>}
                          </span>
                        </div>
                        <div className={styles.rankBadges}>
                          {badges.map(b => <LangBadge key={b} lang={b} />)}
                        </div>
                        <div className={styles.rankStreak}>
                          <Flame size={12} className={styles.flameIcon} />
                          <span>{row.current_streak}d</span>
                        </div>
                        <span className={styles.rankXp}>{row.xp} XP</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Sticky "Your Position" bar */}
        {myRow && (
          <div className={styles.stickyBar}>
            <span>📍</span>
            <span className={styles.stickyRank}>#{myRow.rank}</span>
            <span className={styles.stickyYou}>You ({myRow.display_name})</span>
            <span className={styles.stickyXp}>— {myRow.xp} XP</span>
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
