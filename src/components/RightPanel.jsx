import { forwardRef } from 'react';
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
