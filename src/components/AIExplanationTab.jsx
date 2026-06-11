import { useState, useCallback } from 'react';
import { callClaude, parseJSON } from '../api.js';
import { ANALYSIS_SYSTEM_PROMPT, CORRECTION_SYSTEM_PROMPT } from '../constants.js';
import IssueCard from './IssueCard.jsx';
import styles from './AIExplanationTab.module.css';

function Spinner() {
  return <span className={styles.spinner} aria-label="Loading" />;
}

export default function AIExplanationTab({ code, onApplyFix, onSwitchTab }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [issues, setIssues] = useState(null);
  const [analysisError, setAnalysisError] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [correctedCode, setCorrectedCode] = useState(null);
  const [learningNotes, setLearningNotes] = useState(null);
  const [generateError, setGenerateError] = useState(null);

  const [applied, setApplied] = useState(false);

  const handleAnalyze = useCallback(async () => {
    setIsAnalyzing(true);
    setIssues(null);
    setAnalysisError(null);
    setCorrectedCode(null);
    setLearningNotes(null);
    setApplied(false);

    try {
      const userMsg = 'Here is the C code to analyze:\n\n' + code;
      const raw = await callClaude(ANALYSIS_SYSTEM_PROMPT, userMsg);
      const parsed = parseJSON(raw);
      setIssues(parsed);
    } catch (err) {
      console.error('Analysis error:', err);
      setAnalysisError('Analysis failed. Please check your connection and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [code]);

  const handleGenerate = useCallback(async () => {
    if (!issues) return;
    setIsGenerating(true);
    setGenerateError(null);
    setCorrectedCode(null);
    setLearningNotes(null);
    setApplied(false);

    try {
      const issuesSummary = issues.map(i =>
        i.type === 'clean'
          ? 'No issues found.'
          : `Line ${i.line ?? '?'} (${i.type}): ${i.description}`
      ).join('\n');

      const userMsg =
        `Here is the original C code:\n\n${code}\n\n` +
        `Here are the issues found:\n${issuesSummary}\n\n` +
        `Generate the full corrected program and 3-5 learning notes.`;

      const raw = await callClaude(CORRECTION_SYSTEM_PROMPT, userMsg);
      const parsed = parseJSON(raw);
      setCorrectedCode(parsed.corrected_code ?? '');
      setLearningNotes(parsed.learning_notes ?? []);
    } catch (err) {
      console.error('Generate error:', err);
      setGenerateError('Failed to generate corrected code. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [code, issues]);

  const handleApplyFix = useCallback(() => {
    if (correctedCode) {
      onApplyFix(correctedCode);
      setApplied(true);
      setTimeout(() => onSwitchTab(), 300);
    }
  }, [correctedCode, onApplyFix, onSwitchTab]);

  const isClean = issues?.length === 1 && issues[0]?.type === 'clean';
  const hasRealIssues = issues && !isClean;

  return (
    <div className={styles.container}>
      {/* Trigger section */}
      <div className={styles.triggerSection}>
        <button
          id="analyze-btn"
          className={styles.analyzeBtn}
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <><Spinner /> Analyzing...</>
          ) : (
            'Run AI Analysis'
          )}
        </button>
        <p className={styles.analyzeSubtitle}>
          Scans your code for syntax errors, logical mistakes, and learning opportunities
        </p>
      </div>

      {/* Error state */}
      {analysisError && (
        <div className={styles.errorMsg}>{analysisError}</div>
      )}

      {/* Results */}
      {issues && (
        <div className={styles.resultsArea}>
          {isClean ? (
            <div className={styles.cleanCard}>
              <span className={styles.cleanBadge}>Clean</span>
              <p className={styles.cleanText}>Your code compiles and the logic appears correct.</p>
            </div>
          ) : (
            <>
              <div className={styles.issueCount}>
                {issues.length} issue{issues.length !== 1 ? 's' : ''} found
              </div>
              <div className={styles.issueList}>
                {issues.map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
              </div>

              {/* Generate button */}
              {!correctedCode && (
                <div className={styles.generateSection}>
                  <button
                    id="generate-btn"
                    className={styles.generateBtn}
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <><Spinner /> Generating...</>
                    ) : (
                      'Generate corrected code \u2192'
                    )}
                  </button>
                  {generateError && (
                    <p className={styles.errorMsg}>{generateError}</p>
                  )}
                </div>
              )}
            </>
          )}

          {/* Corrected code block */}
          {correctedCode && (
            <div className={styles.correctedSection}>
              <div className={styles.correctedHeader}>Corrected code</div>
              <pre className={styles.correctedCode}><code>{correctedCode}</code></pre>

              <button
                id="apply-fix-btn"
                className={`${styles.applyBtn} ${applied ? styles.applyBtnApplied : ''}`}
                onClick={handleApplyFix}
                disabled={applied}
              >
                {applied ? 'Code applied to editor' : 'Apply fix — replace editor code'}
              </button>

              {learningNotes && learningNotes.length > 0 && (
                <div className={styles.learningNotes}>
                  <div className={styles.notesHeader}>Mistakes to avoid — learning notes</div>
                  <ul className={styles.notesList}>
                    {learningNotes.map((note, i) => (
                      <li key={i} className={styles.noteItem}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
