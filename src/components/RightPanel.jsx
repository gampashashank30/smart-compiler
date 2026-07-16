import { forwardRef } from 'react';
import TerminalPane from './TerminalPane.jsx';
import AIExplanationTab from './AIExplanationTab.jsx';
import styles from './RightPanel.module.css';

const TABS = [
  { id: 'terminal', label: '▶ Console' },
  { id: 'input',    label: '⌨ Input'   },
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
            {tab.id === 'input' && stdin && stdin.trim() && (
              <span className={styles.inputBadge}>
                {stdin.trim().split('\n').length}
              </span>
            )}
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

      <div className={styles.tabContent}>
        {/* ── Console tab: xterm.js terminal — always mounted so it persists ── */}
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

        {/* ── Input tab: stdin textarea (like OneCompiler / HackerEarth) ── */}
        {activeTab === 'input' && (
          <div className={styles.inputTab}>
            <div className={styles.inputTabHeader}>
              <span className={styles.inputTabTitle}>Program Input (stdin)</span>
              <span className={styles.inputTabHint}>
                Enter all input values here before pressing <strong>Run ▶</strong>
              </span>
            </div>
            <textarea
              id="stdin-input"
              className={styles.stdinArea}
              value={stdin}
              onChange={e => onStdinChange(e.target.value)}
              placeholder={
                'Type your program\'s input here…\n\n' +
                'Each line = one value your program reads.\n\n' +
                'Example for a program that reads 3 numbers:\n' +
                '10\n' +
                '20\n' +
                '30'
              }
              spellCheck={false}
              disabled={isRunning === 'running' || isRunning === 'compiling'}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
            {stdin && stdin.trim() && (
              <div className={styles.inputSummary}>
                <span className={styles.inputSummaryIcon}>✓</span>
                {stdin.trim().split('\n').length} line{stdin.trim().split('\n').length !== 1 ? 's' : ''} of input ready — press <strong>Run ▶</strong> to execute
              </div>
            )}
          </div>
        )}

        {/* ── AI Explanation tab ── */}
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
