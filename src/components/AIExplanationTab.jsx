import { useState, useCallback } from 'react';
import { callClaude, parseJSON } from '../api.js';
import { ANALYSIS_SYSTEM_PROMPT, CORRECTION_SYSTEM_PROMPT } from '../constants.js';
import { sanitizeAiCode } from '../aiCodeUtils.js';
import { analyticsStore } from '../analytics.js';
import styles from './AIExplanationTab.module.css';

/* ── SVG Icons ────────────────────────────────────────────── */
function IconLightbulb() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path d="M12 2a7 7 0 015.292 11.604C16.573 14.73 16 15.878 16 17v1a2 2 0 01-2 2h-4a2 2 0 01-2-2v-1c0-1.122-.573-2.27-1.292-3.396A7 7 0 0112 2z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M9 21h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function IconBook() { return null; } // kept for safety, unused
function IconBug() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
      <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 9V6M9 10.5L6.5 8M15 10.5L17.5 8M8 13H5M16 13h3M9 15.5L6.5 18M15 15.5L17.5 18"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
function IconLightning() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
      <path d="M13 2L5 14h7l-1 8 8-11h-7l1-9z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}
function IconStar() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" width="14" height="14">
      <path d="M8 1l1.5 4.5H14l-3.5 2.5 1.5 4.5L8 10l-4 2.5 1.5-4.5L2 5.5h4.5L8 1z"/>
    </svg>
  );
}
function ChevronUp() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <path d="M5 12.5l5-5 5 5" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function ChevronDown() {
  return (
    <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6"
        strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Typing dots ── */
function TypingDots() {
  return (
    <span className={styles.typingDots}>
      <span /><span /><span />
    </span>
  );
}

/* ── Collapsible section ── */
function AccordionSection({ icon, iconBg, iconColor, title, sectionClass, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`${styles.accordion} ${styles[sectionClass]}`}>
      <button className={styles.accordionHead} onClick={() => setOpen(v => !v)}>
        <span className={styles.accordionIcon} style={{ background: iconBg, color: iconColor }}>
          {icon}
        </span>
        <span className={styles.accordionTitle}>{title}</span>
        <span className={styles.accordionChevron}>
          {open ? <ChevronUp /> : <ChevronDown />}
        </span>
      </button>
      {open && <div className={styles.accordionBody}>{children}</div>}
    </div>
  );
}

/* ── Numbered list item ── */
function NumItem({ num, text, muted }) {
  return (
    <div className={styles.numItem}>
      <span className={styles.numBadge}>{num}</span>
      <span className={`${styles.numText} ${muted ? styles.numTextMuted : ''}`}>{text}</span>
    </div>
  );
}

/* ── Truncate helper ── */
function trunc(str, len = 85) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len - 1).trimEnd() + '…' : str;
}

/* ══════════════════════════════════════════════════════════════
   AGGREGATED ANALYSIS CARD
   Shows all issues in ONE card with 4 sections.
   ══════════════════════════════════════════════════════════════ */
/* ── Type badge colours ── */
const TYPE_CONFIG = {
  logical: { bg: '#fef3c7', color: '#92400e', label: 'Logical' },
  syntax:  { bg: '#fee2e2', color: '#991b1b', label: 'Syntax'  },
};

function TypeBadge({ type }) {
  const cfg = TYPE_CONFIG[type] ?? { bg: '#f3f4f6', color: '#374151', label: type };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: cfg.bg, color: cfg.color,
      fontSize: '10px', fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase',
      borderRadius: '5px', padding: '2px 7px',
      flexShrink: 0,
    }}>
      {cfg.label}
    </span>
  );
}

function AggregatedCard({ issues }) {
  // Filter real issues only
  const real = issues.filter(i => i.type !== 'clean');
  if (!real.length) return null;

  const hints = real.map(i => i.hint).filter(Boolean);
  const fixes  = real.filter(i => i.corrected_code_snippet);

  return (
    <div className={styles.aggCard}>

      {/* ── AI Analysis banner ── */}
      <div className={styles.aggBanner}>
        <span className={styles.aggBannerIcon}>
          <IconLightbulb />
        </span>
        <div className={styles.aggBannerBody}>
          <span className={styles.aggBannerTitle}>AI Analysis</span>
          <div className={styles.aggNumList}>
            {hints.map((h, i) => (
              <NumItem key={i} num={i + 1} text={trunc(h, 90)} />
            ))}
            {hints.length === 0 && real.map((issue, i) => (
              <NumItem key={i} num={i + 1} text={trunc(issue.description, 90)} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Root Cause — compact: line + type + SHORT hint only ── */}
      <AccordionSection
        icon={<IconBug />}
        iconBg="linear-gradient(135deg,#fee2e2,#fecaca)"
        iconColor="#dc2626"
        title="Root Cause"
        sectionClass="sectionRose"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {real.map((issue, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fff',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '8px 12px',
              flexWrap: 'wrap',
            }}>
              {issue.line != null ? (
                <span className={styles.linePill}>Line {issue.line}</span>
              ) : (
                <span className={styles.linePill} style={{ background: '#f3f4f6', color: '#6b7280', borderColor: '#e5e7eb' }}>General</span>
              )}
              <TypeBadge type={issue.type} />
              <span style={{ fontSize: '12.5px', color: '#374151', lineHeight: '1.5', flex: 1, minWidth: '120px' }}>
                {issue.hint || issue.description || '—'}
              </span>
            </div>
          ))}
        </div>
      </AccordionSection>

      {/* ── How to Fix ── */}
      <AccordionSection
        icon={<IconLightning />}
        iconBg="linear-gradient(135deg,#dbeafe,#bae6fd)"
        iconColor="#0284c7"
        title="How to Fix"
        sectionClass="sectionSky"
        defaultOpen={false}
      >
        <div className={styles.fixList}>
          {fixes.map((issue, i) => (
            <div key={i} className={styles.fixItem}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '2px' }}>
                {fixes.length > 1 && (
                  <span className={styles.fixNum}>Fix {i + 1}</span>
                )}
                {issue.line != null && (
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#6b7280' }}>— Line {issue.line}</span>
                )}
              </div>
              <pre className={styles.fixCode}><code>{issue.corrected_code_snippet}</code></pre>
            </div>
          ))}
          {fixes.length === 0 && hints.map((h, i) => (
            <NumItem key={i} num={i + 1} text={h} />
          ))}
        </div>
      </AccordionSection>

    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN TAB
   ══════════════════════════════════════════════════════════════ */
export default function AIExplanationTab({ code, onApplyFix }) {
  const [isAnalyzing, setIsAnalyzing]     = useState(false);
  const [issues, setIssues]               = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  const [isGenerating, setIsGenerating]   = useState(false);
  const [correctedCode, setCorrectedCode] = useState(null);
  const [learningNotes, setLearningNotes] = useState(null);
  const [generateError, setGenerateError] = useState(null);

  const [applied, setApplied]           = useState(false);
  const [showAllNotes, setShowAllNotes] = useState(false);

  /* ── Analyze ── */
  const handleAnalyze = useCallback(async () => {
    const stats = analyticsStore.getStats();
    if (analyticsStore.isLimitReached()) {
      setAnalysisError(`You have used ${stats.ai_tokens_used}/${stats.token_limit} tokens according to your limit for AI analysis.`);
      return;
    }
    setIsAnalyzing(true);
    setIssues(null);
    setAnalysisError(null);
    setCorrectedCode(null);
    setLearningNotes(null);
    setApplied(false);
    setShowAllNotes(false);
    try {
      // Prepend line numbers so the AI sees exact line positions
      const numberedCode = code.split('\n').map((line, i) => `${i + 1}: ${line}`).join('\n');
      const raw    = await callClaude(ANALYSIS_SYSTEM_PROMPT, 'Code:\n' + numberedCode);
      let parsed = parseJSON(raw);

      // Normalise whatever the AI returns into the array format we need.
      // Groq / z.ai can return the data in several shapes depending on whether
      // json_object mode is active, so we handle all known cases gracefully.
      if (parsed !== null && !Array.isArray(parsed) && typeof parsed === 'object') {
        const vals = Object.values(parsed);

        // Case A: { issues: [{...}], ... }  — one key holds the array
        const arrVal = vals.find(v => Array.isArray(v));
        if (arrVal) {
          parsed = arrVal;

        // Case B: { "1": {...}, "2": {...} }  — numbered-key object
        } else if (vals.every(v => v && typeof v === 'object' && ('type' in v || 'id' in v))) {
          parsed = vals;

        // Case C: the object IS a single issue  { id, type, hint, ... }
        } else if ('type' in parsed || 'id' in parsed) {
          parsed = [parsed];

        // Case D: totally unknown shape — build a generic issue so UI doesn't blank
        } else {
          const rawText = JSON.stringify(parsed);
          parsed = [{ id: 1, type: 'logical', hint: 'See description', line: null,
                      description: rawText.slice(0, 120), fix: '', corrected_code_snippet: '' }];
        }
      }

      // Last-resort: if it's still not an array, extract anything useful from raw text
      if (!Array.isArray(parsed) || parsed.length === 0) {
        // Try one more time — scan the raw string for any bracketed JSON array
        const arrMatch = raw.match(/\[[\s\S]*\]/);
        if (arrMatch) {
          try { parsed = JSON.parse(arrMatch[0]); } catch (_) { /* ignore */ }
        }
      }

      if (!Array.isArray(parsed) || parsed.length === 0) {
        // Absolute fallback: show a generic message rather than a blank screen
        parsed = [{ id: 0, type: 'clean', hint: 'Analysis inconclusive', line: null,
                    description: 'No issues were detected, or the AI response could not be parsed.',
                    fix: '', corrected_code_snippet: '' }];
      }

      setIssues(parsed);
    } catch (err) {
      console.error('Analysis error:', err);
      if (err.message.includes('Limit Reached') || err.message.includes('limit reached') || analyticsStore.isLimitReached()) {
        setAnalysisError(`You have used ${stats.ai_tokens_used}/${stats.token_limit} tokens according to your limit for AI analysis.`);
      } else {
        setAnalysisError(`Analysis failed: ${err.message.replace(/\.+$/, '')}. Check your connection and try again.`);
      }
    } finally {
      setIsAnalyzing(false);
    }
  }, [code]);

  /* ── Generate corrected code ── */
  const handleGenerate = useCallback(async () => {
    if (!issues) return;
    const stats = analyticsStore.getStats();
    if (analyticsStore.isLimitReached()) {
      setGenerateError(`You have used ${stats.ai_tokens_used}/${stats.token_limit} tokens according to your limit for AI analysis.`);
      return;
    }
    setIsGenerating(true);
    setGenerateError(null);
    setCorrectedCode(null);
    setLearningNotes(null);
    setApplied(false);
    try {
      const issuesSummary = issues
        .filter(i => i.type !== 'clean')
        .map(i => `L${i.line ?? '?'} (${i.type}): ${i.description}`)
        .join('\n');
      const raw    = await callClaude(CORRECTION_SYSTEM_PROMPT,
        `Code:\n${code}\n\nIssues:\n${issuesSummary}`);
      const parsed = parseJSON(raw);
      const rawCode = parsed.corrected_code ?? '';
      // sanitizeAiCode strips markdown fences and converts double-escaped
      // structural \n sequences to real newlines while leaving C string
      // escapes like printf("hello\n") intact.
      const cleanCode = sanitizeAiCode(rawCode);
      setCorrectedCode(cleanCode);
      setLearningNotes(parsed.learning_notes ?? []);
    } catch (err) {
      console.error('Generate error:', err);
      if (err.message.includes('Limit Reached') || err.message.includes('limit reached') || analyticsStore.isLimitReached()) {
        setGenerateError(`You have used ${stats.ai_tokens_used}/${stats.token_limit} tokens according to your limit for AI analysis.`);
      } else {
        setGenerateError(`Could not generate the fix: ${err.message}. Please try again.`);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [code, issues]);

  /* ── Apply fix ── */
  const handleApplyFix = useCallback(() => {
    if (correctedCode && !applied) {
      onApplyFix(correctedCode);
      setApplied(true);
    }
  }, [correctedCode, applied, onApplyFix]);

  const isClean      = issues?.length === 1 && issues[0]?.type === 'clean';
  const realIssues   = issues?.filter(i => i.type !== 'clean') ?? [];
  const visibleNotes = showAllNotes ? learningNotes : learningNotes?.slice(0, 3);
  const hasMoreNotes = learningNotes && learningNotes.length > 3 && !showAllNotes;
  const noteColors   = ['#10b981', '#0ea5e9', '#6366f1'];

  return (
    <div className={styles.container}>

      {/* ── Run Analysis button ── */}
      <div className={styles.header}>
        <button
          id="analyze-btn"
          className={styles.analyzeBtn}
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <><span className={styles.spinner} /> Analyzing…</>
          ) : (
            <><IconStar /> Run Analysis</>
          )}
        </button>
        <p className={styles.headerSub}>Finds syntax errors, logic mistakes, and offers fixes</p>
      </div>

      {/* ── Error ── */}
      {analysisError && (
        <div className={styles.errorBanner} role="alert">{analysisError}</div>
      )}

      {/* ── Results ── */}
      {issues && (
        <div className={styles.results}>

          {isClean ? (
            <div className={styles.cleanCard}>
              <span className={styles.cleanDot} />
              <div>
                <div className={styles.cleanTitle}>Looks good</div>
                <div className={styles.cleanSub}>No errors found. Logic checks out.</div>
              </div>
            </div>
          ) : (
            <>
              {/* Single aggregated card */}
              <AggregatedCard issues={realIssues} />

              {/* Generate fix */}
              {!correctedCode && (
                <div className={styles.generateWrap}>
                  <button
                    id="generate-btn"
                    className={styles.generateBtn}
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <><TypingDots /> Building fix…</>
                    ) : (
                      <>
                        <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                          <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Show corrected code
                      </>
                    )}
                  </button>
                  {generateError && <p className={styles.errorBanner}>{generateError}</p>}
                </div>
              )}
            </>
          )}

          {/* Corrected code */}
          {correctedCode && (
            <div className={styles.correctedSection}>
              <div className={styles.correctedHeader}>
                <span className={styles.correctedLabel}>Corrected program</span>
                {applied && <span className={styles.appliedPill}>✓ Applied</span>}
              </div>
              <pre className={styles.correctedCode}><code>{correctedCode}</code></pre>
              {!applied && (
                <button id="apply-fix-btn" className={styles.applyBtn} onClick={handleApplyFix}>
                  Apply to editor
                </button>
              )}
            </div>
          )}

          {/* Learning notes */}
          {learningNotes && learningNotes.length > 0 && (
            <div className={styles.notes}>
              <div className={styles.notesTitle}>Key takeaways</div>
              <div className={styles.notesList}>
                {visibleNotes.map((note, i) => (
                  <div key={i} className={styles.noteRow}>
                    <span className={styles.noteNum} style={{ background: noteColors[i % 3] }}>
                      {i + 1}
                    </span>
                    <p className={styles.noteText}>{note}</p>
                  </div>
                ))}
              </div>
              {hasMoreNotes && (
                <button className={styles.showMoreBtn} onClick={() => setShowAllNotes(true)}>
                  Show {learningNotes.length - 3} more
                </button>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
}
