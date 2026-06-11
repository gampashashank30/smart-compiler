import { useState, useRef, useCallback } from 'react';
import StdinOutputTab from './StdinOutputTab.jsx';
import AIExplanationTab from './AIExplanationTab.jsx';
import styles from './RightPanel.module.css';

const TABS = [
  { id: 'stdin', label: 'Stdin / Output' },
  { id: 'ai', label: 'AI Explanation' },
];

export default function RightPanel({
  stdin, onStdinChange,
  output,
  activeTab, onTabChange,
  code,
  onApplyFix,
}) {
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
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'stdin' && (
          <StdinOutputTab
            stdin={stdin}
            onStdinChange={onStdinChange}
            output={output}
          />
        )}
        {activeTab === 'ai' && (
          <AIExplanationTab
            code={code}
            onApplyFix={onApplyFix}
            onSwitchTab={() => onTabChange('stdin')}
          />
        )}
      </div>
    </div>
  );
}
