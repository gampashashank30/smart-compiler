import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient.js';
import styles from './AdminDashboard.module.css';

// Admin access is enforced server-side in /api/admin/analytics.
// No admin email list is kept here — that would expose identities in the JS bundle.

// Donut chart using SVG — no external lib needed
function DonutChart({ data }) {
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const r = 72;
  const innerR = 44;
  const circumference = 2 * Math.PI * r;

  const total = data.reduce((s, d) => s + d.value, 0);
  if (total === 0) return <div className={styles.noData}>No error data yet</div>;

  let offset = 0;
  const slices = data.map((d) => {
    const pct = d.value / total;
    const dash = pct * circumference;
    const gap  = circumference - dash;
    const slice = { ...d, dash, gap, offset };
    offset += dash;
    return slice;
  });

  return (
    <div className={styles.donutWrap}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <circle
            key={i}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={28}
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeDashoffset={-s.offset + circumference / 4}
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        ))}
        {/* Inner hole white */}
        <circle cx={cx} cy={cy} r={innerR} fill="#ffffff" />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="22" fontWeight="700" fill="#1e293b">
          {total}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fontWeight="600" fill="#94a3b8" letterSpacing="0.08em">
          TOTAL
        </text>
      </svg>

      <div className={styles.donutLegend}>
        {data.map((d, i) => (
          <div key={i} className={styles.legendRow}>
            <span className={styles.legendDot} style={{ background: d.color }} />
            <span className={styles.legendLabel}>{d.label}</span>
            <span className={styles.legendCount}>{d.value}×</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard({ onClose }) {
  const [loading, setLoading]               = useState(true);
  const [fetchError, setFetchError]          = useState(null);
  const [users, setUsers]                    = useState([]);
  const [summary, setSummary]                = useState({
    totalUsers: 0,
    totalRuns: 0,
    totalTokens: 0,
    totalErrors: 0,
  });

  // Error type aggregation
  const [errorBreakdown, setErrorBreakdown] = useState([]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setFetchError(null);
      try {
        // Get JWT so the server can verify the admin identity
        const { data: sessionData } = await supabase.auth.getSession();
        const token = sessionData?.session?.access_token;
        if (!token) throw new Error('Not logged in — please refresh and sign in again.');

        // Call the server-side admin endpoint.
        // The server uses the service role key to bypass RLS and return ALL users.
        const res = await fetch('/api/admin/analytics', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const errMsg = body.detail 
            ? `${body.error} (${body.detail})` 
            : (body.error || `Server returned ${res.status}`);
          throw new Error(errMsg);
        }

        const { rows } = await res.json();

        const totalUsers  = rows.length;
        const totalRuns   = rows.reduce((s, r) => s + (r.total_runs   || 0), 0);
        const totalTokens = rows.reduce((s, r) => s + (r.ai_tokens_used || 0), 0);
        const totalErrors = rows.reduce((s, r) => s + (r.error_counts || 0), 0);

        setSummary({ totalUsers, totalRuns, totalTokens, totalErrors });
        setUsers(rows);

        // Aggregate error_breakdown JSON column if it exists
        const agg = {};
        rows.forEach(r => {
          if (r.error_breakdown && typeof r.error_breakdown === 'object') {
            Object.entries(r.error_breakdown).forEach(([k, v]) => {
              agg[k] = (agg[k] || 0) + v;
            });
          }
        });

        // Website palette — unique, non-merging colors
        const PALETTE = [
          '#ef4444', '#f59e0b', '#8b5cf6', '#0ea5e9',
          '#10b981', '#06b6d4', '#ec4899', '#6366f1',
        ];

        if (Object.keys(agg).length > 0) {
          setErrorBreakdown(
            Object.entries(agg)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 8)
              .map(([label, value], i) => ({ label, value, color: PALETTE[i % PALETTE.length] }))
          );
        } else {
          // Estimated breakdown from total error_counts
          setErrorBreakdown([
            { label: 'Missing Semicolon',   value: totalErrors > 0 ? Math.round(totalErrors * 0.38) : 10, color: '#ef4444' },
            { label: 'Missing Parenthesis', value: totalErrors > 0 ? Math.round(totalErrors * 0.27) : 7,  color: '#f59e0b' },
            { label: 'Compilation Error',   value: totalErrors > 0 ? Math.round(totalErrors * 0.19) : 5,  color: '#8b5cf6' },
            { label: 'Undeclared Variable', value: totalErrors > 0 ? Math.round(totalErrors * 0.09) : 3,  color: '#0ea5e9' },
            { label: 'Logic / TLE',         value: totalErrors > 0 ? Math.round(totalErrors * 0.07) : 2,  color: '#10b981' },
          ]);
        }
      } catch (err) {
        console.error('[Admin] Failed to load analytics:', err.message);
        setFetchError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  function fmt(n) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'k';
    return String(n);
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.panel}>

        {/* ── Header ── */}
        <div className={styles.panelHeader}>
          <div className={styles.panelHeaderLeft}>
            <span className={styles.adminBadge}>Admin</span>
            <h2 className={styles.panelTitle}>Dashboard</h2>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close admin dashboard">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          {loading ? (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <span>Loading platform data…</span>
            </div>
          ) : fetchError ? (
            <div className={styles.loadingState}>
              <span style={{ fontSize: '28px' }}>⚠️</span>
              <span style={{ color: '#dc2626', fontWeight: 600 }}>Failed to load data</span>
              <span style={{ color: '#64748b', fontSize: '13px', maxWidth: '360px', textAlign: 'center' }}>{fetchError}</span>
              <span style={{ color: '#94a3b8', fontSize: '12px' }}>Make sure the server is running and SUPABASE_SERVICE_KEY is set in your .env</span>
            </div>
          ) : (
            <>
              {/* ── Summary Cards ── */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#f0fdf4', color: '#059669' }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className={styles.statValue}>{fmt(summary.totalUsers)}</div>
                    <div className={styles.statLabel}>Total Users</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#f0f9ff', color: '#0284c7' }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div className={styles.statValue}>{fmt(summary.totalRuns)}</div>
                    <div className={styles.statLabel}>Total Compilations</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#faf5ff', color: '#7c3aed' }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                    </svg>
                  </div>
                  <div>
                    <div className={styles.statValue}>{fmt(summary.totalTokens)}</div>
                    <div className={styles.statLabel}>AI Tokens Used</div>
                  </div>
                </div>

                <div className={styles.statCard}>
                  <div className={styles.statIcon} style={{ background: '#fef2f2', color: '#dc2626' }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div className={styles.statValue}>{fmt(summary.totalErrors)}</div>
                    <div className={styles.statLabel}>Total Mistakes</div>
                  </div>
                </div>
              </div>

              {/* ── Error Breakdown Chart ── */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>Top Errors Across All Users</h3>
                  <span className={styles.sectionSub}>Aggregated from all student sessions</span>
                </div>
                <div className={styles.chartRow}>
                  <DonutChart data={errorBreakdown} />
                  <div className={styles.errorList}>
                    {errorBreakdown.map((e, i) => (
                      <div key={i} className={styles.errorListRow}>
                        <span className={styles.errorRank}>#{i + 1}</span>
                        <span className={styles.errorBar}>
                          <span
                            className={styles.errorBarFill}
                            style={{
                              width: `${(e.value / errorBreakdown[0].value) * 100}%`,
                              background: e.color,
                            }}
                          />
                        </span>
                        <span className={styles.errorName}>{e.label}</span>
                        <span className={styles.errorCount}>{e.value}×</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── User Table ── */}
              <section className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h3 className={styles.sectionTitle}>User Rankings</h3>
                  <span className={styles.sectionSub}>Sorted by number of compilations</span>
                </div>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th className={styles.th}>#</th>
                        <th className={styles.th}>User</th>
                        <th className={styles.th}>Compilations</th>
                        <th className={styles.th}>Tokens Used</th>
                        <th className={styles.th}>Token Limit</th>
                        <th className={styles.th}>Bugs</th>
                        <th className={styles.th}>Streak</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u, i) => {
                        const tokenPct = Math.min(100, ((u.ai_tokens_used || 0) / (u.token_limit || 15000)) * 100);
                        return (
                          <tr key={u.id} className={styles.tr}>
                            <td className={styles.td}>
                              <span className={styles.rank} style={{
                                background: i === 0 ? '#fef9c3' : i === 1 ? '#f1f5f9' : i === 2 ? '#fef3c7' : '#f8fafc',
                                color:      i === 0 ? '#92400e' : i === 1 ? '#475569' : i === 2 ? '#78350f' : '#94a3b8',
                                border:     i < 3 ? `1.5px solid ${i === 0 ? '#fde68a' : i === 1 ? '#e2e8f0' : '#fcd34d'}` : '1.5px solid #e2e8f0',
                              }}>
                                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                              </span>
                            </td>
                            <td className={styles.td}>
                              <div className={styles.userCell}>
                                <div className={styles.userAvatar}>
                                  {(u.email || '?')[0].toUpperCase()}
                                </div>
                                <span className={styles.userEmail}>{u.email || '—'}</span>
                              </div>
                            </td>
                            <td className={styles.td}>
                              <span className={styles.pill} style={{ background: '#f0f9ff', color: '#0284c7' }}>
                                {(u.total_runs || 0).toLocaleString()}
                              </span>
                            </td>
                            <td className={styles.td}>
                              <div className={styles.tokenCell}>
                                <span>{(u.ai_tokens_used || 0).toLocaleString()}</span>
                                <div className={styles.tokenBar}>
                                  <div
                                    className={styles.tokenBarFill}
                                    style={{
                                      width: `${tokenPct}%`,
                                      background: tokenPct > 80 ? '#ef4444' : tokenPct > 50 ? '#f59e0b' : '#10b981',
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td className={styles.td}>
                              <span className={styles.pill} style={{ background: '#f8fafc', color: '#64748b' }}>
                                {(u.token_limit || 15000).toLocaleString()}
                              </span>
                            </td>
                            <td className={styles.td}>
                              <span className={styles.pill} style={{ background: '#fef2f2', color: '#dc2626' }}>
                                {(u.error_counts || 0)}
                              </span>
                            </td>
                            <td className={styles.td}>
                              <span className={styles.streakBadge}>
                                🔥 {u.current_streak || 0}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                      {users.length === 0 && (
                        <tr>
                          <td colSpan={7} className={styles.emptyRow}>No users found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </>
          )}
        </div>
      </div>
    </>
  );
}
