import { useState, useCallback } from 'react';
import { callClaude, parseJSON } from '../api.js';
import { ANALYSIS_SYSTEM_PROMPT, CORRECTION_SYSTEM_PROMPT } from '../constants.js';
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
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
      <path d="M4 4.5A2.5 2.5 0 016.5 2H18a1 1 0 011 1v16a1 1 0 01-1 1H6.5A2.5 2.5 0 014 17.5v-13z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M4 17.5A2.5 2.5 0 006.5 20H18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M9 8h6M9 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}
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
function AccordionSection({ icon, iconBg, iconColor, title, sectionClass, children }) {
  const [open, setOpen] = useState(true);
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
function AggregatedCard({ issues }) {
  // Filter real issues only
  const real = issues.filter(i => i.type !== 'clean');
  if (!real.length) return null;

  const hints       = real.map(i => i.hint).filter(Boolean);
  const descs       = real.map(i => i.description).filter(Boolean);
  const lines       = real.filter(i => i.line != null).map(i => i.line);
  const fixes       = real.filter(i => i.corrected_code_snippet);

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
            {/* If no hints, fall back to short description */}
            {hints.length === 0 && descs.map((d, i) => (
              <NumItem key={i} num={i + 1} text={trunc(d, 90)} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Analysis Summary ── */}
      <AccordionSection
        icon={<IconBook />}
        iconBg="#dbeafe"
        iconColor="#2563eb"
        title="Analysis Summary"
        sectionClass="sectionWhite"
      >
        <div className={styles.numList}>
          {descs.map((d, i) => (
            <NumItem key={i} num={i + 1} text={trunc(d, 100)} />
          ))}
        </div>
      </AccordionSection>

      {/* ── Root Cause — shows line numbers ── */}
      <AccordionSection
        icon={<IconBug />}
        iconBg="#fee2e2"
        iconColor="#dc2626"
        title="Root Cause"
        sectionClass="sectionRose"
      >
        {lines.length > 0 ? (
          <div className={styles.lineList}>
            {lines.map((ln, i) => (
              <span key={i} className={styles.linePill}>Line {ln}</span>
            ))}
          </div>
        ) : (
          <p className={styles.bodyText}>See analysis above.</p>
        )}
      </AccordionSection>

      {/* ── How to Fix ── */}
      <AccordionSection
        icon={<IconLightning />}
        iconBg="#dbeafe"
        iconColor="#2563eb"
        title="How to Fix"
        sectionClass="sectionSky"
      >
        <div className={styles.fixList}>
          {fixes.map((issue, i) => (
            <div key={i} className={styles.fixItem}>
              {fixes.length > 1 && (
                <span className={styles.fixNum}>{i + 1}</span>
              )}
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
    setIsAnalyzing(true);
    setIssues(null);
    setAnalysisError(null);
    setCorrectedCode(null);
    setLearningNotes(null);
    setApplied(false);
    setShowAllNotes(false);
    try {
      const raw    = await callClaude(ANALYSIS_SYSTEM_PROMPT, 'Here is the C code to analyze:\n\n' + code);
      const parsed = parseJSON(raw);
      setIssues(parsed);
    } catch (err) {
      console.error('Analysis error:', err);
      setAnalysisError('Analysis failed. Check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [code]);

  /* ── Generate corrected code ── */
  const handleGenerate = useCallback(async () => {
    if (!issues) return;
    setIsGenerating(true);
    setGenerateError(null);
    setCorrectedCode(null);
    setLearningNotes(null);
    setApplied(false);
    try {
      const issuesSummary = issues
        .map(i => i.type === 'clean' ? 'No issues.' : `Line ${i.line ?? '?'} (${i.type}): ${i.description}`)
        .join('\n');
      const raw    = await callClaude(CORRECTION_SYSTEM_PROMPT,
        `Code:\n\n${code}\n\nIssues:\n${issuesSummary}\n\nGenerate corrected program and 3-5 short learning notes.`);
      const parsed = parseJSON(raw);
      const rawCode = parsed.corrected_code ?? '';
      // Some LLMs emit literal \n (two chars) instead of real newlines.
      // If the code has no actual newlines but has literal \n sequences, convert them.
      const cleanCode = rawCode.includes('\n')
        ? rawCode
        : rawCode.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
      setCorrectedCode(cleanCode);
      setLearningNotes(parsed.learning_notes ?? []);
    } catch (err) {
      console.error('Generate error:', err);
      setGenerateError('Could not generate the fix. Please try again.');
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
