import { forwardRef, useState } from 'react';
import TerminalPane from './TerminalPane.jsx';
import AIExplanationTab from './AIExplanationTab.jsx';
import styles from './RightPanel.module.css';

const TABS = [
  { id: 'terminal', label: '▶ Console' },
  { id: 'ai',       label: '✦ AI Explanation' },
];

const RightPanel = forwardRef(function RightPanel(
  {
    activeTab, onTabChange,
    code,
    onApplyFix,
    isRunning,
    onStatusChange,
    onDone,
    stdin,
    onStdinChange,
  },
  terminalRef
) {
  const [stdinOpen, setStdinOpen] = useState(false);

  return (
    <div className={styles.panel}>
      <div className={styles.tabBar}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            onClick={() => onTabChange(tab.id)}
            aria-selected={activeTab === tab.id}
            role="tab"
          >
            {tab.label}
          </button>
        ))}

        {/* Status indicator */}
        <div className={styles.statusArea}>
          {isRunning === 'compiling' && (
            <span className={styles.statusCompiling}>
              <span className={styles.spinner} /> Compiling…
            </span>
          )}
          {isRunning === 'running' && (
            <span className={styles.statusRunning}>
              <span className={styles.runDot} /> Running
            </span>
          )}
        </div>
      </div>

      {/* ── stdin input bar (collapsible) — only shown on Console tab ── */}
      {activeTab === 'terminal' && (
        <div className={styles.stdinBar}>
          <button
            className={styles.stdinToggle}
            onClick={() => setStdinOpen(o => !o)}
            title={stdinOpen ? 'Hide stdin input' : 'Show stdin input (for programs that ask for user input)'}
          >
            <span className={styles.stdinIcon}>⌨</span>
            <span>Input (stdin)</span>
            {stdin && stdin.trim() && (
              <span className={styles.stdinBadge}>{stdin.trim().split('\n').length} line{stdin.trim().split('\n').length !== 1 ? 's' : ''}</span>
            )}
            <span className={styles.stdinChevron}>{stdinOpen ? '▲' : '▼'}</span>
          </button>

          {stdinOpen && (
            <div className={styles.stdinPanel}>
              <textarea
                id="terminal-stdin-input"
                className={styles.stdinTextarea}
                value={stdin}
                onChange={e => onStdinChange(e.target.value)}
                placeholder={"Type input here before pressing Run…\n\nEach line = one value your program reads with scanf/fgets.\nExample:\n5\nhello world\n42"}
                spellCheck={false}
                disabled={isRunning === 'running' || isRunning === 'compiling'}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                rows={5}
              />
              <div className={styles.stdinHint}>
                💡 Enter all input values here before pressing <strong>Run ▶</strong>. The terminal will still allow typing during execution (interactive mode).
              </div>
            </div>
          )}
        </div>
      )}

      <div className={styles.tabContent}>
        {/* Terminal is always mounted (so it persists), just hidden when on AI tab */}
        <div style={{
          display:  activeTab === 'terminal' ? 'block' : 'none',
          position: 'absolute',
          inset:    0,
        }}>
          <TerminalPane
            ref={terminalRef}
            onStatusChange={onStatusChange}
            onDone={onDone}
          />
        </div>

        {activeTab === 'ai' && (
          <AIExplanationTab
            code={code}
            onApplyFix={onApplyFix}
          />
        )}
      </div>
    </div>
  );
});

export default RightPanel;
