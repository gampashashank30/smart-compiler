import { useState } from 'react';
import styles from './IssueCard.module.css';

/* ─── Inline SVG Icons ─────────────────────────────────────── */
function IconLightbulb() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2a7 7 0 015.292 11.604C16.573 14.73 16 15.878 16 17v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1c0-1.122-.573-2.27-1.292-3.396A7 7 0 0112 2z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 21h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 4.5A2.5 2.5 0 016.5 2H18a1 1 0 011 1v16a1 1 0 01-1 1H6.5A2.5 2.5 0 014 17.5v-13z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M4 17.5A2.5 2.5 0 006.5 20H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M9 8h6M9 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function IconBug() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 9V6M9 10.5L6.5 8M15 10.5L17.5 8M8 13H5M16 13h3M9 15.5L6.5 18M15 15.5L17.5 18"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function IconLightning() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M13 2L5 14h7l-1 8 8-11h-7l1-9z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg className={styles.chevronIcon} viewBox="0 0 20 20" fill="none">
      <path d="M5 12.5l5-5 5 5" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg className={styles.chevronIcon} viewBox="0 0 20 20" fill="none">
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ─── Collapsible section card ─────────────────────────────── */
function SectionCard({ icon, iconBg, iconColor, title, cardClass, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`${styles.sectionCard} ${styles[cardClass]}`}>
      <button
        className={styles.sectionRow}
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
      >
        <span className={styles.sectionIconBox} style={{ background: iconBg, color: iconColor }}>
          {icon}
        </span>
        <span className={styles.sectionTitle}>{title}</span>
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && (
        <div className={styles.sectionContent}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ─── Short description helper ─────────────────────────────── */
function shortSummary(desc) {
  if (!desc) return '';
  // Take first sentence, max 90 chars
  const s = desc.split(/[.!?]/)[0].trim();
  return s.length > 90 ? s.slice(0, 88) + '…' : s;
}

/* ─── Config by error type ─────────────────────────────────── */
const CONFIG = {
  logical: {
    bannerBg: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)',
    bannerBorder: '#fed7aa',
    bannerIconBg: '#fde8c8',
    bannerIconColor: '#ea580c',
  },
  syntax: {
    bannerBg: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)',
    bannerBorder: '#fde68a',
    bannerIconBg: '#fef3c7',
    bannerIconColor: '#d97706',
  },
};

/* ─── Main IssueCard ───────────────────────────────────────── */
export default function IssueCard({ issue }) {
  const type   = issue.type ?? 'syntax';
  const config = CONFIG[type] ?? CONFIG.syntax;
  const summary = shortSummary(issue.description);

  return (
    <div className={styles.issueGroup} id={`issue-card-${issue.id}`}>

      {/* ── Top banner: "AI Analysis" + hint subtitle ── */}
      <div
        className={styles.banner}
        style={{
          background: config.bannerBg,
          borderColor: config.bannerBorder,
        }}
      >
        <span
          className={styles.bannerIconBox}
          style={{ background: config.bannerIconBg, color: config.bannerIconColor }}
        >
          <IconLightbulb />
        </span>
        <div className={styles.bannerText}>
          <span className={styles.bannerTitle}>AI Analysis</span>
          {issue.hint && (
            <span className={styles.bannerSub}>{issue.hint}</span>
          )}
        </div>
      </div>

      {/* ── Section 1: Analysis Summary (white card) ── */}
      <SectionCard
        icon={<IconBook />}
        iconBg="#dbeafe"
        iconColor="#2563eb"
        title="Analysis Summary"
        cardClass="cardWhite"
        defaultOpen={true}
      >
        <p className={styles.sectionText}>{summary || issue.hint || '—'}</p>
      </SectionCard>

      {/* ── Section 2: Root Cause (rose card) ── */}
      <SectionCard
        icon={<IconBug />}
        iconBg="#fee2e2"
        iconColor="#dc2626"
        title="Root Cause"
        cardClass="cardRose"
        defaultOpen={true}
      >
        {issue.line != null ? (
          <p className={styles.lineText}>Line {issue.line}</p>
        ) : (
          <p className={styles.sectionText}>See description above.</p>
        )}
      </SectionCard>

      {/* ── Section 3: How to Fix (sky card) ── */}
      <SectionCard
        icon={<IconLightning />}
        iconBg="#dbeafe"
        iconColor="#2563eb"
        title="How to Fix"
        cardClass="cardSky"
        defaultOpen={true}
      >
        {issue.corrected_code_snippet ? (
          <pre className={styles.fixCode}><code>{issue.corrected_code_snippet}</code></pre>
        ) : (
          <p className={styles.sectionText}>{issue.hint || '—'}</p>
        )}
      </SectionCard>

    </div>
  );
}