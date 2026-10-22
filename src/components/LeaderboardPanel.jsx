import { useState, useEffect, useCallback } from 'react';
import { X, Trophy, Flame, RefreshCw, Zap } from 'lucide-react';
import { supabase } from '../supabaseClient.js';
import styles from './LeaderboardPanel.module.css';

/* ── Constants ────────────────────────────────────────────────────────────── */
const LANG_COLORS = { c: '#3b82f6', java: '#f97316', python: '#10b981' };
const LANG_LABELS = { c: 'C', java: 'Java', python: 'Python' };

const AVATAR_PALETTE = [
  '#6366f1','#0ea5e9','#10b981','#f59e0b',
  '#ec4899','#f97316','#14b8a6','#8b5cf6',
  '#ef4444','#06b6d4','#84cc16','#a78bfa',
];

function getColor(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_PALETTE[h % AVATAR_PALETTE.length];
}

/* ── Avatar component ─────────────────────────────────────────────────────── */
function Avatar({ name = '?', avatarUrl, size = 40, ringClass = '' }) {
  const [imgErr, setImgErr] = useState(false);
  const letter = name[0]?.toUpperCase() || '?';
  const color  = getColor(name);

  const shared = {
    width: size,
    height: size,
    borderRadius: '50%',
    flexShrink: 0,
  };

  // Ring styles via inline (gold/silver/bronze)
  const rings = {
    gold:   { boxShadow: '0 0 0 3px #f59e0b, 0 0 0 6px rgba(245,158,11,0.2)' },
    silver: { boxShadow: '0 0 0 3px #94a3b8, 0 0 0 6px rgba(148,163,184,0.2)' },
    bronze: { boxShadow: '0 0 0 3px #f97316, 0 0 0 6px rgba(249,115,22,0.2)' },
    '':     {},
  };

  if (avatarUrl && !imgErr) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className={styles.avatarImg}
        style={{ ...shared, ...rings[ringClass] }}
        onError={() => setImgErr(true)}
      />
    );
  }
  return (
    <div
      className={styles.avatarCircle}
      style={{
        ...shared,
        background: color,
        fontSize: Math.round(size * 0.39),
        fontWeight: 800,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...rings[ringClass],
      }}
    >
      {letter}
    </div>
  );
}

/* ── Language badge ───────────────────────────────────────────────────────── */
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
  return ['c','java','python'].filter(k => (row.runs_by_lang[k] || 0) > 0);
}

/* ── Podium card (real player) ────────────────────────────────────────────── */
function PodCard({ row, pos, avatarUrl }) {
  // pos: 0=gold, 1=silver, 2=bronze
  const cfg = [
    { ring: 'gold',   chipCls: styles.xpChipGold,   pedestalCls: styles.pedestalGold,   medal: '🥇', cardCls: styles.podCardGold,   size: 64 },
    { ring: 'silver', chipCls: styles.xpChipSilver, pedestalCls: styles.pedestalSilver, medal: '🥈', cardCls: styles.podCardSilver, size: 52 },
    { ring: 'bronze', chipCls: styles.xpChipBronze, pedestalCls: styles.pedestalBronze, medal: '🥉', cardCls: styles.podCardBronze, size: 48 },
  ][pos];

  return (
    <div className={`${styles.podCard} ${cfg.cardCls}`}>
      {pos === 0
        ? <div className={styles.crownWrap}>👑</div>
        : <div className={styles.crownPlaceholder} />}

      <div className={styles.podAvatar}>
        <Avatar name={row.display_name} avatarUrl={avatarUrl} size={cfg.size} ringClass={cfg.ring} />
      </div>

      <div className={`${styles.xpChip} ${cfg.chipCls}`}>{row.xp} XP</div>
      <div className={styles.podName}>{row.display_name}</div>
      <div className={styles.podStreak}>
        <Flame size={11} style={{ color: '#f97316' }} />
        {row.current_streak}d
      </div>
      <div className={`${styles.pedestal} ${cfg.pedestalCls}`}>
        <span className={styles.pedestalMedal}>{cfg.medal}</span>
        <span className={styles.pedestalRank}>#{row.rank}</span>
      </div>
    </div>
  );
}

/* ── Placeholder podium slot (empty) ─────────────────────────────────────── */
function PodPlaceholder({ pos }) {
  const sizes  = [64, 52, 48];
  const labels = ['1st Place', '2nd Place', '3rd Place'];
  const clses  = [styles.podCardGold, styles.podCardSilver, styles.podCardBronze];
  const pCls   = [styles.pedestalGold, styles.pedestalSilver, styles.pedestalBronze];
  const medals = ['🥇','🥈','🥉'];

  return (
    <div className={`${styles.podPlaceholder} ${clses[pos]}`}>
      {pos === 0
        ? <div className={styles.crownWrap}>👑</div>
        : <div className={styles.crownPlaceholder} />}
      <div
        className={styles.placeholderCircle}
        style={{ width: sizes[pos], height: sizes[pos], fontSize: sizes[pos] * 0.36 }}
      >
        ?
      </div>
      <div className={styles.placeholderText}>{labels[pos]}</div>
      <div className={styles.placeholderText} style={{ color: '#cbd5e1', fontSize: 11 }}>Be the first!</div>
      <div className={`${styles.pedestal} ${pCls[pos]}`} style={{ opacity: 0.4 }}>
        <span className={styles.pedestalMedal}>{medals[pos]}</span>
      </div>
    </div>
  );
}

/* ── Main panel ───────────────────────────────────────────────────────────── */
export default function LeaderboardPanel({ onClose, currentUser }) {
  const [language,  setLanguage]  = useState('all');
  const [timeframe, setTimeframe] = useState('weekly');
  const [rows,      setRows]      = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const myId        = currentUser?.id || null;
  const myAvatarUrl = currentUser?.user_metadata?.avatar_url || null;

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/leaderboard?language=${language}&timeframe=${timeframe}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || body.error || `Error ${res.status}`);
      }
      const json = await res.json();
      setRows(Array.isArray(json.data) ? json.data : []);
    } catch (err) {
      setError(err.message || 'Failed to load');
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

  // For podium: only our own avatar is available from client-side auth
  const getAvatar = (row) => (row?.user_id === myId ? myAvatarUrl : null);

  // Podium slots — fill with real data, pad with null for placeholders
  const podSlots = [top3[0] || null, top3[1] || null, top3[2] || null];

  // Language active pill class
  const pillClass = (key) =>
    `${styles.pill} ${language === key ? styles.pillActive : ''}`;

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} aria-hidden="true" />
      <div className={styles.panel} role="dialog" aria-label="Leaderboard" aria-modal="true">

        {/* ── Top bar ── */}
        <div className={styles.topBar}>
          <div className={styles.topBarLeft}>
            <Trophy size={20} className={styles.trophyIcon} />
            <span className={styles.topBarTitle}>Leaderboard</span>
          </div>

          {/* Segmented timeframe toggle */}
          <div className={styles.segmented}>
            <button
              className={`${styles.segBtn} ${timeframe === 'weekly'  ? styles.segBtnActive : ''}`}
              onClick={() => setTimeframe('weekly')}
            >
              This Week
            </button>
            <button
              className={`${styles.segBtn} ${timeframe === 'alltime' ? styles.segBtnActive : ''}`}
              onClick={() => setTimeframe('alltime')}
            >
              All Time
            </button>
          </div>

          {/* Language pills */}
          <div className={styles.langPills}>
            {[
              { key:'all', label:'All' },
              { key:'c',   label:'C' },
              { key:'java',label:'Java' },
              { key:'python', label:'Python' },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={pillClass(key)}
                style={language === key && key !== 'all'
                  ? { background: LANG_COLORS[key], borderColor: LANG_COLORS[key], color: '#fff' }
                  : {}}
                onClick={() => setLanguage(key)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className={styles.topBarActions}>
            <button className={styles.iconBtn} onClick={fetchLeaderboard} title="Refresh">
              <RefreshCw size={14} />
            </button>
            <button className={`${styles.iconBtn} ${styles.iconBtnClose}`} onClick={onClose} aria-label="Close">
              <X size={16} />
            </button>
          </div>
        </div>

{/* ── XP banner: two styled info cards ── */}
        <div className={styles.xpBanner}>
          <div className={`${styles.xpCard} ${styles.xpCardClean}`}>
            <span className={styles.xpCardIcon}>✅</span>
            <div className={styles.xpCardText}>
              <span className={styles.xpCardLabel}>Clean Run</span>
              <span className={styles.xpCardValue}>+10 XP</span>
            </div>
          </div>
          <div className={`${styles.xpCard} ${styles.xpCardStreak}`}>
            <span className={styles.xpCardIcon}>🔥</span>
            <div className={styles.xpCardText}>
              <span className={styles.xpCardLabel}>Daily Streak Bonus</span>
              <span className={styles.xpCardValue}>+20 XP / day</span>
            </div>
          </div>
        </div>

        {/* ── Loading / Error states ── */}
        {loading && (
          <div className={styles.stateBox}>
            <div className={styles.spinner} />
            <p className={styles.stateTitle}>Loading champions…</p>
          </div>
        )}

        {!loading && error && (
          <div className={styles.stateBox}>
            <div className={styles.stateEmoji}>😕</div>
            <p className={styles.stateTitle}>Couldn't load the leaderboard</p>
            <p className={styles.stateSub}>
              {error.includes('42883') || error.includes('does not exist')
                ? 'The database function is missing. Please run the SQL migration in Supabase.'
                : error}
            </p>
            <button className={styles.retryBtn} onClick={fetchLeaderboard}>Try Again</button>
          </div>
        )}

        {/* ── Main two-column layout ── */}
        {!loading && !error && (
          <div className={styles.mainLayout}>

            {/* LEFT: Podium */}
            <div className={styles.podiumPanel}>
              <div className={styles.podiumTitle}>🏆 Top Performers</div>
              <div className={styles.podium}>
                {/* Silver (#2) — left */}
                {podSlots[1]
                  ? <PodCard row={podSlots[1]} pos={1} avatarUrl={getAvatar(podSlots[1])} />
                  : <PodPlaceholder pos={1} />}

                {/* Gold (#1) — centre */}
                {podSlots[0]
                  ? <PodCard row={podSlots[0]} pos={0} avatarUrl={getAvatar(podSlots[0])} />
                  : <PodPlaceholder pos={0} />}

                {/* Bronze (#3) — right */}
                {podSlots[2]
                  ? <PodCard row={podSlots[2]} pos={2} avatarUrl={getAvatar(podSlots[2])} />
                  : <PodPlaceholder pos={2} />}
              </div>
            </div>

            {/* RIGHT: Ranked list */}
            <div className={styles.rankPanel}>
              <div className={styles.rankPanelHeader}>
                <span className={styles.rankPanelTitle}>Rankings</span>
                <span className={styles.rankTag}>
                  {timeframe === 'weekly' ? 'This Week' : 'All Time'}
                </span>
              </div>

              {/* Table header */}
              <div className={styles.tableHead}>
                <span>#</span>
                <span>Student</span>
                <span>Score</span>
                <span>Streak</span>
                <span>Languages</span>
              </div>

              {/* Rows */}
              <div className={styles.rowsScroll}>
                {rows.length === 0 && (
                  <div className={styles.emptyRows}>
                    <span style={{ fontSize: 40 }}>🏅</span>
                    <p style={{ margin: 0, fontWeight: 700, color: '#475569' }}>No entries yet</p>
                    <p style={{ margin: 0, color: '#94a3b8', fontSize: 13 }}>
                      Run code to earn XP and appear here!
                    </p>
                  </div>
                )}

                {rows.map((row) => {
                  const isMe   = row.user_id === myId;
                  const badges = getBadges(row);
                  return (
                    <div
                      key={row.rank}
                      className={`${styles.tableRow} ${isMe ? styles.tableRowMe : ''}`}
                    >
                      <span className={styles.rankNum}>{row.rank <= 3 ? ['🥇','🥈','🥉'][row.rank-1] : `#${row.rank}`}</span>

                      <div className={styles.userCol}>
                        <Avatar name={row.display_name} avatarUrl={getAvatar(row)} size={36} />
                        <div className={styles.userInfo}>
                          <span className={styles.userName}>
                            {row.display_name}
                            {isMe && <span className={styles.youTag}>You</span>}
                          </span>
                        </div>
                      </div>

                      <div className={styles.scoreCol}>
                        <span className={styles.scoreVal}>{row.xp}</span>
                        <span className={styles.scoreLabel}>XP</span>
                      </div>

                      <div className={styles.streakCol}>
                        <Flame size={13} style={{ color: '#f97316', flexShrink: 0 }} />
                        <span>{row.current_streak}d</span>
                      </div>

                      <div className={styles.badgesCol}>
                        {badges.map(b => <LangBadge key={b} lang={b} />)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── Sticky bar ── */}
        {!loading && !error && myRow && (
          <div className={styles.stickyBar}>
            {/* Left: who you are */}
            <div className={styles.stickyLeft}>
              <Avatar name={myRow.display_name} avatarUrl={myAvatarUrl} size={28} />
              <span className={styles.stickyRank}>#{myRow.rank}</span>
              <span className={styles.stickyName}>{myRow.display_name}</span>
              <div className={styles.stickyXpPill}>
                <Zap size={12} />
                {myRow.xp} XP
              </div>
            </div>

            {/* Divider */}
            {xpGap !== null && xpGap > 0 && aboveMe && (
              <>
                <div className={styles.stickyDivider} />

                {/* Right: overtake instructions */}
                <div className={styles.stickyOvertakeBox}>
                  <span className={styles.stickyOvertakeLabel}>🎯 How to overtake</span>
                  <div className={styles.stickyOvertakeDetail}>
                    <span>You need</span>
                    <span className={styles.stickyOvertakeXp}>+{xpGap} XP</span>
                    <span>to overtake</span>
                    <span className={styles.stickyOvertakeTarget}>
                      {aboveMe.display_name} (#{aboveMe.rank})
                    </span>
                  </div>
                  <span className={styles.stickyHowTo}>
                    Run {Math.ceil(xpGap / 10)} more clean program{Math.ceil(xpGap / 10) !== 1 ? 's' : ''} with 0 errors — each earns +10 XP
                  </span>
                </div>
              </>
            )}

            {/* If already #1 */}
            {myRow.rank === 1 && (
              <>
                <div className={styles.stickyDivider} />
                <div className={styles.stickyTop}>
                  <span className={styles.stickyTopLabel}>👑 You're #1!</span>
                  <span className={styles.stickyTopText}>Keep running clean code to hold your lead</span>
                </div>
              </>
            )}
          </div>
        )}

      </div>
    </>
  );
}
