import styles from './IssueCard.module.css';

const TYPE_META = {
  syntax: {
    label: 'Syntax Error',
    badgeClass: 'badgeSyntax',
  },
  logical: {
    label: 'Logical Error',
    badgeClass: 'badgeLogical',
  },
  clean: {
    label: 'Clean',
    badgeClass: 'badgeClean',
  },
};

export default function IssueCard({ issue }) {
  const meta = TYPE_META[issue.type] ?? TYPE_META.syntax;

  return (
    <div className={styles.card} id={`issue-card-${issue.id}`}>
      <div className={styles.cardHeader}>
        <span className={`${styles.badge} ${styles[meta.badgeClass]}`}>
          {meta.label}
        </span>
        {issue.line != null && (
          <span className={styles.lineRef}>Line {issue.line}</span>
        )}
      </div>

      <div className={styles.cardBody}>
        {/* Hint */}
        <div className={styles.row}>
          <span className={styles.rowLabel}>Hint</span>
          <p className={styles.hintText}>{issue.hint}</p>
        </div>

        {/* Description */}
        <div className={styles.row}>
          <span className={styles.rowLabel}>What's wrong</span>
          <p className={styles.bodyText}>{issue.description}</p>
        </div>

        {/* Fix */}
        {issue.fix && (
          <div className={styles.row}>
            <span className={styles.rowLabel}>How to fix</span>
            <p className={styles.bodyText}>{issue.fix}</p>
          </div>
        )}

        {/* Corrected snippet */}
        {issue.corrected_code_snippet && (
          <div className={styles.snippetRow}>
            <span className={styles.rowLabel}>Corrected line</span>
            <pre className={styles.snippet}><code>{issue.corrected_code_snippet}</code></pre>
          </div>
        )}
      </div>
    </div>
  );
}
