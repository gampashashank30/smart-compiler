import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Trophy, Flame, RefreshCw, Zap } from 'lucide-react';
import { supabase } from '../supabaseClient.js';
import styles from './LeaderboardPanel.module.css';

// ── Language config ───────────────────────────────────────────────────────────
const LANG_COLORS = { c: '#3b82f6', java: '#f97316', python: '#10b981' };
const LANG_LABELS = { c: 'C', java: 'Java', python: 'Python' };

function LangBadge({ lang }) {
  const key = lang.toLowerCase();
  return (
    <span className={styles.langBadge} style={{ background: LANG_COLORS[key] || '#6b7280' }}>
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

// ── Avatar: Google photo if available, else styled initial circle ────────────
const AVATAR_PALETTE = [
  '#6366f1','#f59e0b','#10b981','#3b82f6',
  '#ec4899','#f97316','#14b8a6','#a855f7',
  '#ef4444','#06b6d4',
];

function getColor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}

function Avatar({ name = '?', avatarUrl, size = 40, ring = '' }) {
  const [imgError, setImgError] = useState(false);
  const letter = name[0]?.toUpperCase() || '?';
  const color  = getColor(name);

  const ringStyle = ring === 'gold'   ? { boxShadow: `0 0 0 3px #f59e0b, 0 0 0 5px #fde68a` }
                  : ring === 'silver' ? { boxShadow: `0 0 0 3px #9ca3af, 0 0 0 5px #e5e7eb` }
                  : ring === 'bronze' ? { boxShadow: `0 0 0 3px #f97316, 0 0 0 5px #fed7aa` }
                  : {};

  if (avatarUrl && !imgError) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={styles.avatarImg}
        style={{ width: size, height: size, borderRadius: '50%', ...ringStyle }}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={styles.avatarCircle}
      style={{
        width: size, height: size,
        background: color,
        fontSize: Math.round(size * 0.38),
        ...ringStyle,
      }}
    >
      {letter}
    </div>
  );
}

// ── Podium card (top 3) ───────────────────────────────────────────────────────
function PodiumCard({ row, position, avatarUrl }) {
  const isGold   = position === 0;
  const isSilver = position === 1;
  const isBronze = position === 2;

  const xpColor    = isGold ? '#f59e0b' : isSilver ? '#9ca3af' : '#f97316';
  const xpBg       = isGold ? '#fffbeb' : isSilver ? '#f3f4f6' : '#fff7ed';
  const xpBorder   = isGold ? '#fde68a' : isSilver ? '#e5e7eb' : '#fed7aa';
  const pedestalH  = isGold ? 90 : isSilver ? 65 : 50;
  const pedestalBg = isGold
    ? 'linear-gradient(180deg,#fde68a,#f59e0b)'
    : isSilver
    ? 'linear-gradient(180deg,#e5e7eb,#9ca3af)'
    : 'linear-gradient(180deg,#fed7aa,#f97316)';
  const ring = isGold ? 'gold' : isSilver ? 'silver' : 'bronze';
  const avatarSize = isGold ? 64 : 52;
  const medals     = ['🥇','🥈','🥉'];

  return (
    <div className={`${styles.podiumCard} ${isGold ? styles.podiumCenter : ''}`}>
      {isGold && <div className={styles.crown}>👑</div>}
      <Avatar name={row.display_name} avatarUrl={avatarUrl} size={avatarSize} ring={ring} />
      {/* XP badge overlaid on avatar */}
      <div className={styles.xpBadge} style={{ background: xpBg, border: `2px solid ${xpBorder}`, color: xpColor }}>
        {row.xp}
      </div>
      <div className={styles.podiumName}>{row.display_name}</div>
      <div className={styles.podiumStreak}>
        <Flame size={12} style={{ color: '#f97316' }} /> {row.current_streak}d
      </div>
      {/* Pedestal */}
      <div className={styles.pedestal} style={{ height: pedestalH, background: pedestalBg }}>
        <span className={styles.pedestalMedal}>{medals[position]}</span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LeaderboardPanel({ onClose, currentUser }) {
  const [language,  setLanguage]  = useState('all');
  const [timeframe, setTimeframe] = useState('weekly');
  const [rows,      setRows]      = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  // Map user_id → avatar_url for Google users (from Supabase auth)
  // We can only get the current user's own avatar reliably from client-side
  const myId        = currentUser?.id || null;
  const myAvatarUrl = currentUser?.user_metadata?.avatar_url || null;

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res  = await fetch(`/api/leaderboard?language=${language}&timeframe=${timeframe}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || body.error || `Error ${res.status}`);
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

  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const myRow   = rows.find(r => r.user_id === myId) || null;
  const top3    = rows.slice(0, 3);
  const rest    = rows.slice(3);
  const aboveMe = myRow ? rows.find(r => Number(r.rank) === Number(myRow.rank) - 1) : null;
  const xpGap   = myRow && aboveMe ? aboveMe.xp - myRow.xp : null;

  // For podium avatars — only current user's avatar is available client-side
  const getAvatar = (row) => row.user_id === myId ? myAvatarUrl : null;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.panel} role="dialog" aria-label="Leaderboard" aria-modal="true">

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Trophy size={20} className={styles.trophyIcon} />
            <span className={styles.headerTitle}>Champions</span>
          </div>

          {/* Timeframe tabs */}
          <div className={styles.timeTabs}>
            <button
              className={`${styles.timeTab} ${timeframe === 'weekly'  ? styles.timeTabActive : ''}`}
              onClick={() => setTimeframe('weekly')}
            >
              This Week
            </button>
            <button
              className={`${styles.timeTab} ${timeframe === 'alltime' ? styles.timeTabActive : ''}`}
              onClick={() => setTimeframe('alltime')}
            >
              All Time
            </button>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.refreshBtn} onClick={fetchLeaderboard} title="Refresh">
              <RefreshCw size={14} />
            </button>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Language pills ── */}
        <div className={styles.langBar}>
          {[
            { key: 'all',    label: 'All Languages', emoji: '🌐' },
            { key: 'c',      label: 'C',             emoji: '⚙️' },
            { key: 'java',   label: 'Java',          emoji: '☕' },
            { key: 'python', label: 'Python',        emoji: '🐍' },
          ].map(({ key, label, emoji }) => (
            <button
              key={key}
              className={`${styles.langPill} ${language === key ? styles.langPillActive : ''}`}
              style={language === key && key !== 'all'
                ? { background: LANG_COLORS[key], borderColor: LANG_COLORS[key], color: '#fff' }
                : {}}
              onClick={() => setLanguage(key)}
            >
              {emoji} {label}
            </button>
          ))}
        </div>

        {/* ── XP rule strip ── */}
        <div className={styles.xpStrip}>
          <Zap size={12} style={{ color: '#f59e0b', flexShrink: 0 }} />
          <span>✅ Clean Run <strong>+10 XP</strong></span>
          <span className={styles.dot}>·</span>
          <span>🔥 Daily Streak <strong>+20 XP</strong> per active day</span>
        </div>

        {/* ── Body ── */}
        <div className={styles.body}>

          {loading && (
            <div className={styles.stateBox}>
              <div className={styles.spinner} />
              <p>Loading champions…</p>
            </div>
          )}

          {!loading && error && (
            <div className={styles.stateBox}>
              <div className={styles.errorIcon}>😕</div>
              <p className={styles.errorTitle}>Couldn't load the leaderboard</p>
              <p className={styles.errorSub}>
                {error.includes('42883') || error.includes('does not exist')
                  ? 'Please run the SQL migration in Supabase to enable the leaderboard.'
                  : error}
              </p>
              <button className={styles.retryBtn} onClick={fetchLeaderboard}>Try Again</button>
            </div>
          )}

          {!loading && !error && rows.length === 0 && (
            <div className={styles.stateBox}>
              <div className={styles.errorIcon}>🏆</div>
              <p className={styles.errorTitle}>No students yet</p>
              <p className={styles.errorSub}>Run code to earn XP and appear here!</p>
            </div>
          )}

          {!loading && !error && rows.length > 0 && (
            <>
              {/* Podium */}
              {top3.length > 0 && (
                <div className={styles.podiumWrap}>
                  <div className={styles.podium}>
                    {top3.length >= 2 && <PodiumCard row={top3[1]} position={1} avatarUrl={getAvatar(top3[1])} />}
                    {top3.length >= 1 && <PodiumCard row={top3[0]} position={0} avatarUrl={getAvatar(top3[0])} />}
                    {top3.length >= 3 && <PodiumCard row={top3[2]} position={2} avatarUrl={getAvatar(top3[2])} />}
                  </div>
                </div>
              )}

              {/* Divider with label */}
              {rest.length > 0 && (
                <div className={styles.sectionLabel}>
                  <span>Your Performance</span>
                  <div className={styles.sectionTag}>{timeframe === 'weekly' ? 'This Week' : 'All Time'}</div>
                </div>
              )}

              {/* Ranked list */}
              {rest.length > 0 && (
                <div className={styles.table}>
                  {/* Header */}
                  <div className={styles.tableHeader}>
                    <span className={styles.colRank}>#</span>
                    <span className={styles.colName}>Student</span>
                    <span className={styles.colStat}>Score</span>
                    <span className={styles.colStat}>Streak</span>
                    <span className={styles.colBadges}>Languages</span>
                  </div>

                  {rest.map((row) => {
                    const isMe   = row.user_id === myId;
                    const badges = getBadges(row);
                    return (
                      <div key={row.rank} className={`${styles.tableRow} ${isMe ? styles.tableRowMe : ''}`}>
                        <span className={styles.colRank}>
                          <span className={styles.rankNum}>#{row.rank}</span>
                        </span>

                        <div className={styles.colName}>
                          <Avatar
                            name={row.display_name}
                            avatarUrl={getAvatar(row)}
                            size={36}
                          />
                          <div className={styles.nameBlock}>
                            <span className={styles.nameText}>{row.display_name}</span>
                            {isMe && <span className={styles.youBadge}>You</span>}
                          </div>
                        </div>

                        <div className={styles.colStat}>
                          <span className={styles.scoreVal}>{row.xp}</span>
                          <span className={styles.scoreLabel}>XP</span>
                        </div>

                        <div className={styles.colStat}>
                          <span className={styles.streakVal}>
                            <Flame size={13} style={{ color: '#f97316' }} />
                            {row.current_streak}d
                          </span>
                        </div>

                        <div className={styles.colBadges}>
                          {badges.map(b => <LangBadge key={b} lang={b} />)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Sticky "Your Position" bar ── */}
        {myRow && (
          <div className={styles.stickyBar}>
            <Avatar name={myRow.display_name} avatarUrl={myAvatarUrl} size={28} />
            <span className={styles.stickyRank}>#{myRow.rank}</span>
            <span className={styles.stickyName}>{myRow.display_name}</span>
            <span className={styles.stickyXp}>{myRow.xp} XP</span>
            {xpGap !== null && xpGap > 0 && (
              <span className={styles.stickyGap}>
                🎯 <strong>{xpGap} XP</strong> to overtake #{Number(myRow.rank) - 1}
              </span>
            )}
          </div>
        )}

      </div>
    </>
  );
}
