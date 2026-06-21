import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import styles from './AiTutorPanel.module.css';
import { TUTOR_CURRICULUM, TUTOR_LEVELS } from '../tutorData';
import { TutorDiagram } from './TutorDiagrams';
import { callClaude, parseJSON, compileC } from '../api';
import { TUTOR_LOGIC_SYSTEM_PROMPT, TUTOR_CODE_SYSTEM_PROMPT } from '../constants';
import { highlightC } from '../highlight';


export default function AiTutorPanel({ onClose }) {
  // Curriculum selection & Navigation
  const [selectedTopicId, setSelectedTopicId] = useState('hello-world');
  const [step, setStep] = useState(1); // 1: Concept, 2: Quiz, 3: Logic, 4: Code
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0); // 0 = All Levels

  // Step 2: Quiz State
  const [quizAnswers, setQuizAnswers] = useState({}); // { questionId: selectedIndex }
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizPassed, setQuizPassed] = useState(false);
  const [activeQuizIdx, setActiveQuizIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Step 3: Logic State
  const [logicText, setLogicText] = useState('');
  const [isValidatingLogic, setIsValidatingLogic] = useState(false);
  const [logicResult, setLogicResult] = useState(null); // { correct, feedback, hints }

  // Step 4: Code State
  const [codeText, setCodeText] = useState(() => {
    const defaultTopic = TUTOR_CURRICULUM['hello-world'];
    if (defaultTopic.referenceSolution) {
      const headerLines = defaultTopic.referenceSolution.split('\n');
      const includes = headerLines.filter(line => line.startsWith('#include')).join('\n');
      return `${includes}\n\nint main() {\n    // Write your code for: ${defaultTopic.title}\n    // Refer to Step 1 & 3 concepts\n    \n    return 0;\n}`;
    }
    return '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}';
  });
  const [stdinText, setStdinText] = useState('');
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState('');
  const [isValidatingCode, setIsValidatingCode] = useState(false);
  const [codeResult, setCodeResult] = useState(null); // { correct, feedback, issues }
  const [showSolution, setShowSolution] = useState(false);
  const [isGeneratingSolution, setIsGeneratingSolution] = useState(false);

  // Completed Topics (tracked in memory since no localStorage requirement)
  const [completedTopics, setCompletedTopics] = useState(new Set());
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const stepBodyRef = useRef(null);

  // Auto-scroll the tutor panel body to top when step, question, or topic changes
  useEffect(() => {
    if (stepBodyRef.current) {
      stepBodyRef.current.scrollTop = 0;
    }
  }, [step, activeQuizIdx, selectedTopicId]);

  // Retrieve current topic details
  const currentTopic = useMemo(() => {
    return TUTOR_CURRICULUM[selectedTopicId] || TUTOR_CURRICULUM['hello-world'];
  }, [selectedTopicId]);

  // Helper to change topic and reset all step states
  const selectTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setStep(1);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizPassed(false);
    setActiveQuizIdx(0);
    setSelectedOptionIdx(null);
    setIsAnswerChecked(false);
    setLogicText('');
    setLogicResult(null);
    setCodeResult(null);
    setTerminalOutput('');
    setStdinText('');
    setShowSolution(false);
    setIsGeneratingSolution(false);

    const topic = TUTOR_CURRICULUM[topicId] || TUTOR_CURRICULUM['hello-world'];
    if (topic.referenceSolution) {
      const headerLines = topic.referenceSolution.split('\n');
      const includes = headerLines.filter(line => line.startsWith('#include')).join('\n');
      setCodeText(`${includes}\n\nint main() {\n    // Write your code for: ${topic.title}\n    // Refer to Step 1 & 3 concepts\n    \n    return 0;\n}`);
    } else {
      setCodeText('#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}');
    }
  };

  // Handle Search & Level Filtering
  const filteredTopics = useMemo(() => {
    return Object.values(TUTOR_CURRICULUM).filter(topic => {
      const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            topic.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLevel = selectedLevel === 0 || topic.levelNum === selectedLevel;
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, selectedLevel]);

  // Step 2 Quiz submission
  const handleSubmitQuiz = () => {
    if (!currentTopic.quiz) return;
    
    // Check if all questions are answered
    const allAnswered = currentTopic.quiz.every(q => quizAnswers[q.id] !== undefined);
    if (!allAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // Evaluate answers
    const allCorrect = currentTopic.quiz.every(q => {
      const answer = quizAnswers[q.id];
      return answer === q.correct;
    });

    setQuizSubmitted(true);
    if (allCorrect) {
      setQuizPassed(true);
    } else {
      setQuizPassed(false);
    }
  };

  // Step 3 Logic validation call
  const handleValidateLogic = async () => {
    if (!logicText.trim()) {
      alert("Please describe your logic or write pseudocode first.");
      return;
    }

    setIsValidatingLogic(true);
    setLogicResult(null);

    try {
      const userPrompt = `
Concept: ${currentTopic.title}
Category: ${currentTopic.category}
Level: ${currentTopic.levelNum}
Expected Approach: ${currentTopic.logicHints?.approach || ''}

Student's Proposed Logic:
"""
${logicText}
"""
`;

      const responseString = await callClaude(TUTOR_LOGIC_SYSTEM_PROMPT, userPrompt);
      const parsed = parseJSON(responseString);
      setLogicResult(parsed);
    } catch (err) {
      console.error(err);
      setLogicResult({
        correct: false,
        feedback: `Validation failed: ${err.message || err}. Please try again.`,
        hints: ["Make sure the compiler backend/AI endpoint is connected and running."]
      });
    } finally {
      setIsValidatingLogic(false);
    }
  };

  // Step 4 Run Code call
  const handleRunCode = async () => {
    setIsRunningCode(true);
    setTerminalOutput('Compiling and executing code...');

    try {
      const result = await compileC(codeText, stdinText);
      if (result.compileError) {
        setTerminalOutput(`[COMPILE ERROR]\n${result.stderr}`);
      } else {
        let output = '';
        if (result.stdout) output += result.stdout;
        if (result.stderr) output += `\n[STDERR]\n${result.stderr}`;
        if (!result.stdout && !result.stderr) output = '(Program completed with no output)';
        setTerminalOutput(output);
      }
    } catch (err) {
      setTerminalOutput(`Execution failed: ${err.message}`);
    } finally {
      setIsRunningCode(false);
    }
  };

  // Step 4 Code validation call
  const handleVerifyCode = async () => {
    setIsValidatingCode(true);
    setCodeResult(null);

    try {
      const userPrompt = `
Concept: ${currentTopic.title}
Reference Solution:
"""
${currentTopic.referenceSolution}
"""

Student's Submitted Code:
"""
${codeText}
"""
`;

      const responseString = await callClaude(TUTOR_CODE_SYSTEM_PROMPT, userPrompt);
      const parsed = parseJSON(responseString);
      setCodeResult(parsed);

      if (parsed.correct) {
        // Mark topic completed
        setCompletedTopics(prev => {
          const next = new Set(prev);
          next.add(selectedTopicId);
          return next;
        });
        setShowCompletionModal(true);
      }
    } catch (err) {
      console.error(err);
      setCodeResult({
        correct: false,
        feedback: `Verification failed: ${err.message || err}. Please try again.`,
        issues: [{ line: null, description: "Check connection to backend / Groq AI proxy." }]
      });
    } finally {
      setIsValidatingCode(false);
    }
  };

  // Navigate to next topic when done
  const handleNextTopic = () => {
    setShowCompletionModal(false);
    const topicListArray = Object.keys(TUTOR_CURRICULUM);
    const currIdx = topicListArray.indexOf(selectedTopicId);
    if (currIdx !== -1 && currIdx < topicListArray.length - 1) {
      selectTopic(topicListArray[currIdx + 1]);
    } else {
      // Loop back to start or keep same
      selectTopic(topicListArray[0]);
    }
  };

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.tutorContainer}>
        
        {/* ─── Sidebar ─── */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <div className={styles.sidebarTitle}>
              <span>AI Study Tutor</span>
            </div>
            
            {/* Search */}
            <div className={styles.searchBar}>
              <input 
                type="text" 
                placeholder="Search concepts..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          {/* Level Filter Tabs */}
          <div className={styles.levelTabs}>
            <button 
              className={`${styles.levelTab} ${selectedLevel === 0 ? styles.levelTabActive : ''}`}
              style={{ backgroundColor: selectedLevel === 0 ? '#4f46e5' : '#f1f5f9', color: selectedLevel === 0 ? '#ffffff' : '#475569' }}
              onClick={() => setSelectedLevel(0)}
            >
              All
            </button>
            {Object.entries(TUTOR_LEVELS).map(([levelNum, lvl]) => (
              <button
                key={levelNum}
                className={`${styles.levelTab} ${selectedLevel === Number(levelNum) ? styles.levelTabActive : ''}`}
                style={{
                  backgroundColor: selectedLevel === Number(levelNum) ? lvl.color : '#f1f5f9',
                  color: selectedLevel === Number(levelNum) ? '#ffffff' : '#475569'
                }}
                onClick={() => setSelectedLevel(Number(levelNum))}
              >
                Lvl {levelNum}
              </button>
            ))}
          </div>

          {/* Topic List */}
          <div className={styles.topicList}>
            {filteredTopics.length === 0 ? (
              <div className={styles.searchEmpty}>No topics match your filter.</div>
            ) : (
              filteredTopics.map(topic => {
                const isActive = topic.id === selectedTopicId;
                const isDone = completedTopics.has(topic.id);
                const lvlColor = TUTOR_LEVELS[topic.levelNum]?.color || '#6366f1';
                
                return (
                  <div
                    key={topic.id}
                    className={`${styles.topicCard} ${isActive ? styles.topicCardActive : ''}`}
                    onClick={() => selectTopic(topic.id)}
                    style={{ borderLeft: `4px solid ${lvlColor}` }}
                  >
                    {topic.icon && <span className={styles.topicIcon}>{topic.icon}</span>}
                    <div className={styles.topicMeta}>
                      <div className={styles.topicTitle}>{topic.title}</div>
                      <div className={styles.topicSub}>
                        <span>{topic.category}</span>
                        <span>•</span>
                        <span>{topic.estimatedTime}</span>
                      </div>
                    </div>
                    {isDone && <span className={styles.topicCheck}>✓</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ─── Main Panel Content ─── */}
        <div className={styles.mainContent}>
          
          {/* Header */}
          <div className={styles.mainHeader}>
            <div className={styles.headerLeft}>
              <span 
                className={styles.headerCategoryBadge}
                style={{ 
                  backgroundColor: `${TUTOR_LEVELS[currentTopic.levelNum]?.color}15`, 
                  color: TUTOR_LEVELS[currentTopic.levelNum]?.color 
                }}
              >
                Level {currentTopic.levelNum} • {currentTopic.category}
              </span>
              <h1 className={styles.headerTitle}>
                {currentTopic.icon && <span className={styles.headerIcon}>{currentTopic.icon}</span>}
                {currentTopic.title}
              </h1>
            </div>
            <button className={styles.closeButton} onClick={onClose}>✕</button>
          </div>

          {/* Step Progress Navigator */}
          <div className={styles.stepNav}>
            <div 
              className={`${styles.stepNavItem} ${step === 1 ? styles.stepNavActive : ''} ${step > 1 ? styles.stepNavDone : ''}`}
              onClick={() => setStep(1)}
            >
              <span className={styles.stepNumber}>1</span>
              <span>Learn Concept</span>
            </div>
            <div className={styles.stepNavSeparator} />
            <div 
              className={`${styles.stepNavItem} ${step === 2 ? styles.stepNavActive : ''} ${step > 2 ? styles.stepNavDone : ''}`}
              onClick={() => setStep(2)}
            >
              <span className={styles.stepNumber}>2</span>
              <span>Test Knowledge</span>
            </div>
            <div className={styles.stepNavSeparator} />
            <div 
              className={`${styles.stepNavItem} ${step === 3 ? styles.stepNavActive : ''} ${step > 3 ? styles.stepNavDone : ''}`}
              onClick={() => setStep(3)}
            >
              <span className={styles.stepNumber}>3</span>
              <span>Verify Logic</span>
            </div>
            <div className={styles.stepNavSeparator} />
            <div 
              className={`${styles.stepNavItem} ${step === 4 ? styles.stepNavActive : ''} ${step > 4 ? styles.stepNavDone : ''}`}
              onClick={() => setStep(4)}
            >
              <span className={styles.stepNumber}>4</span>
              <span>Code Solution</span>
            </div>
          </div>

          {/* Scrollable Step Content */}
          <div ref={stepBodyRef} className={styles.stepBody}>
            
            {/* STEP 1: LEARN CONCEPT */}
            {step === 1 && (
              <div className={styles.conceptGrid}>
                {/* Left Side: Summary & Explanation */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>What is it?</h2>
                    <p className={styles.whatIsItText}>{currentTopic.concept.whatIsIt}</p>
                  </div>

                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>How it works</h2>
                    <div className={styles.howItWorksList}>
                      {currentTopic.concept.howItWorks.map((step, idx) => (
                        <div key={idx} className={styles.howItWorksItem}>
                          <span className={styles.howItWorksNum}>{step.step}</span>
                          <div>
                            <div className={styles.howItWorksTitle}>{step.title}</div>
                            <div className={styles.howItWorksDesc}>{step.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Real-world Analogy</h2>
                    <p className={styles.whatIsItText} style={{ fontStyle: 'italic', color: '#4f46e5' }}>
                      "{currentTopic.concept.realWorldExample}"
                    </p>
                  </div>
                </div>

                {/* Right Side: Diagrams & Meta */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Visual Diagram */}
                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Visual Architecture</h2>
                    <TutorDiagram type={currentTopic.id} />
                  </div>

                  {/* Key Terms Grid */}
                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Key Vocabulary</h2>
                    <div className={styles.keyTermsGrid}>
                      {currentTopic.concept.keyTerms.slice(0, 4).map((term, idx) => (
                        <div key={idx} className={styles.termCard}>
                          <div className={styles.termWord}>{term.term}</div>
                          <div className={styles.termDef}>{term.definition}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Common Mistakes */}
                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Common Pitfalls</h2>
                    <div className={styles.mistakesList}>
                      {currentTopic.concept.commonMistakes.map((mistake, idx) => (
                        <div key={idx} className={styles.mistakeItem}>
                          <span className={styles.mistakeBullet}>•</span>
                          <span>{mistake}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Complexity Stats */}
                  <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Computational Cost</h2>
                    <div className={styles.metaGrid}>
                      <div className={styles.metaBox}>
                        <div className={styles.metaLabel}>Time Complexity</div>
                        <div className={styles.metaValue}>
                          {typeof currentTopic.concept.timeComplexity === 'object' 
                            ? currentTopic.concept.timeComplexity?.average || 'O(n)' 
                            : currentTopic.concept.timeComplexity || 'O(1)'}
                        </div>
                      </div>
                      <div className={styles.metaBox}>
                        <div className={styles.metaLabel}>Space Complexity</div>
                        <div className={styles.metaValue}>{currentTopic.concept.spaceComplexity}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: TEST KNOWLEDGE */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '640px', margin: '0 auto', width: '100%' }}>
                {activeQuizIdx < currentTopic.quiz.length ? (
                  // Single Question View
                  (() => {
                    const q = currentTopic.quiz[activeQuizIdx];
                    if (!q) return null;
                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Progress Indicator */}
                        <div className={styles.card} style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#475569', fontWeight: '700' }}>
                            <span>Question {activeQuizIdx + 1} of {currentTopic.quiz.length}</span>
                            <span style={{
                              padding: '4px 10px',
                              borderRadius: '9999px',
                              background: q.difficulty === 'hard' ? '#fee2e2' : (q.difficulty === 'medium' ? '#ffedd5' : '#dcfce7'),
                              color: q.difficulty === 'hard' ? '#991b1b' : (q.difficulty === 'medium' ? '#9a3412' : '#166534'),
                              fontWeight: '800',
                              fontSize: '11px',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}>
                              {q.difficulty}
                            </span>
                          </div>
                          
                          {/* Visual progress bar */}
                          <div style={{
                            height: '8px',
                            background: '#e2e8f0',
                            borderRadius: '9999px',
                            width: '100%',
                            position: 'relative',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              height: '100%',
                              background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                              width: `${((activeQuizIdx) / currentTopic.quiz.length) * 100}%`,
                              transition: 'width 0.3s ease-in-out',
                              borderRadius: '9999px'
                            }} />
                          </div>
                        </div>

                        {/* Question Card */}
                        <div className={`${styles.card} ${styles.quizCard}`} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <h2 className={styles.quizQuestion} style={{ margin: 0, fontSize: '17px', lineHeight: '1.4' }}>
                            {q.question}
                          </h2>
                          
                          <div className={styles.quizOptions} style={{ margin: 0 }}>
                            {q.options.map((option, optIdx) => {
                              const isSelected = selectedOptionIdx === optIdx;
                              const isCorrect = q.correct === optIdx;
                              let optionClass = styles.quizOption;
                              
                              if (isAnswerChecked) {
                                if (isCorrect) optionClass += ` ${styles.quizOptionCorrect}`;
                                else if (isSelected) optionClass += ` ${styles.quizOptionIncorrect}`;
                              } else if (isSelected) {
                                optionClass += ` ${styles.quizOptionSelected}`;
                              }

                              return (
                                <button
                                  key={optIdx}
                                  disabled={isAnswerChecked}
                                  className={optionClass}
                                  onClick={() => setSelectedOptionIdx(optIdx)}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '16px',
                                    borderWidth: '2px',
                                    transition: 'all 0.15s ease',
                                    cursor: isAnswerChecked ? 'default' : 'pointer'
                                  }}
                                >
                                  <span style={{ flex: 1, paddingRight: '12px' }}>{option}</span>
                                  {isAnswerChecked && isCorrect && (
                                    <span style={{
                                      width: '24px',
                                      height: '24px',
                                      borderRadius: '50%',
                                      background: '#d1fae5',
                                      color: '#065f46',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontWeight: '800',
                                      fontSize: '14px',
                                      flexShrink: 0
                                    }}>✓</span>
                                  )}
                                  {isAnswerChecked && isSelected && !isCorrect && (
                                    <span style={{
                                      width: '24px',
                                      height: '24px',
                                      borderRadius: '50%',
                                      background: '#fee2e2',
                                      color: '#991b1b',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontWeight: '800',
                                      fontSize: '14px',
                                      flexShrink: 0
                                    }}>✗</span>
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {isAnswerChecked && (
                            <div className={`${styles.quizFeedback} ${selectedOptionIdx === q.correct ? styles.quizFeedbackCorrect : styles.quizFeedbackIncorrect}`} style={{ margin: 0 }}>
                              <strong>{selectedOptionIdx === q.correct ? '✓ Correct! ' : '✗ Incorrect. '}</strong>
                              {q.explanation}
                            </div>
                          )}

                          <div style={{ marginTop: '8px' }}>
                            {!isAnswerChecked ? (
                              <button
                                className={styles.primaryButton}
                                disabled={selectedOptionIdx === null}
                                onClick={() => {
                                  setIsAnswerChecked(true);
                                  setQuizAnswers(prev => ({ ...prev, [q.id]: selectedOptionIdx }));
                                }}
                                style={{ width: '100%', justifyContent: 'center' }}
                              >
                                Check Answer
                              </button>
                            ) : (
                              <button
                                className={styles.primaryButton}
                                style={{ width: '100%', justifyContent: 'center', background: '#10b981', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)' }}
                                onClick={() => {
                                  if (activeQuizIdx === currentTopic.quiz.length - 1) {
                                    // Submit entire quiz
                                    const allCorrect = currentTopic.quiz.every(question => {
                                      const ans = question.id === q.id ? selectedOptionIdx : quizAnswers[question.id];
                                      return ans === question.correct;
                                    });
                                    setQuizPassed(allCorrect);
                                    setQuizSubmitted(true);
                                    setActiveQuizIdx(currentTopic.quiz.length);
                                  } else {
                                    setActiveQuizIdx(prev => prev + 1);
                                    setSelectedOptionIdx(null);
                                    setIsAnswerChecked(false);
                                  }
                                }}
                              >
                                {activeQuizIdx === currentTopic.quiz.length - 1 ? 'Finish Quiz →' : 'Continue →'}
                              </button>
                            )}
                          </div>

                        </div>
                      </div>
                    );
                  })()
                ) : (
                  // Quiz Summary Screen
                  (() => {
                    const score = currentTopic.quiz.filter(question => quizAnswers[question.id] === question.correct).length;
                    const total = currentTopic.quiz.length;
                    const percentage = Math.round((score / total) * 100);
                    return (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className={styles.card} style={{ textAlign: 'center', padding: '36px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                          <div style={{ fontSize: '48px', animation: 'bounce 1.5s infinite' }}>
                            {score === total ? '★' : (score >= total * 0.6 ? '◆' : '○')}
                          </div>
                          
                          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                            {score === total ? 'Perfect Score!' : 'Quiz Completed!'}
                          </h2>

                          {/* Circular progress circle */}
                          <div style={{
                            position: 'relative',
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: `conic-gradient(#10b981 ${percentage}%, #e2e8f0 0)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                            margin: '10px 0'
                          }}>
                            <div style={{
                              width: '98px',
                              height: '98px',
                              borderRadius: '50%',
                              background: '#ffffff',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <span style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a' }}>{score}/{total}</span>
                              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '800' }}>{percentage}% CORRECT</span>
                            </div>
                          </div>

                          <p className={styles.whatIsItText} style={{ margin: 0, color: '#475569' }}>
                            {score === total 
                              ? 'Unbelievable job! You got every question correct. You are fully prepared to start the practical steps.' 
                              : (score >= total * 0.6 
                                ? 'Well done! You got a solid grasp of this concept. Feel free to review your mistakes or proceed.' 
                                : 'Take some time to review the concepts and try again to improve your score.')
                            }
                          </p>

                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '12.5px',
                            color: '#4f46e5',
                            fontWeight: '700',
                            marginTop: '4px',
                            background: '#e0e7ff',
                            padding: '6px 16px',
                            borderRadius: '9999px',
                            animation: 'pulse 2s infinite ease-in-out'
                          }}>
                            <span>Scroll down to review detailed questions and explanations</span>
                          </div>

                          <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '8px' }}>
                            <button
                              className={styles.secondaryButton}
                              onClick={() => {
                                setQuizAnswers({});
                                setQuizSubmitted(false);
                                setQuizPassed(false);
                                setActiveQuizIdx(0);
                                setSelectedOptionIdx(null);
                                setIsAnswerChecked(false);
                              }}
                              style={{ flex: 1, padding: '14px' }}
                            >
                              Retry Quiz
                            </button>
                            <button
                              className={styles.primaryButton}
                              style={{ background: '#10b981', flex: 1, justifyContent: 'center', padding: '14px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)' }}
                              onClick={() => {
                                setStep(3);
                              }}
                            >
                              Next: Validate Logic →
                            </button>
                          </div>
                        </div>

                        {/* Mistakes / Questions Review Panel */}
                        <div className={styles.card} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', margin: 0, borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                            Questions Review
                          </h3>
                          
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {currentTopic.quiz.map((question, idx) => {
                              const uAns = quizAnswers[question.id];
                              const isCorrect = uAns === question.correct;
                              return (
                                <div 
                                  key={question.id} 
                                  style={{
                                    border: '1.5px solid',
                                    borderColor: isCorrect ? '#a7f3d0' : '#fca5a5',
                                    borderRadius: '12px',
                                    padding: '16px',
                                    backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                                    <span style={{
                                      width: '20px',
                                      height: '20px',
                                      borderRadius: '50%',
                                      background: isCorrect ? '#d1fae5' : '#fee2e2',
                                      color: isCorrect ? '#065f46' : '#991b1b',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontSize: '11px',
                                      fontWeight: '800',
                                      flexShrink: 0,
                                      marginTop: '2px'
                                    }}>
                                      {idx + 1}
                                    </span>
                                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
                                      {question.question}
                                    </span>
                                  </div>

                                  <div style={{ fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '28px' }}>
                                    <div style={{ color: isCorrect ? '#047857' : '#b91c1c' }}>
                                      <strong>Your Answer:</strong> {question.options[uAns] || 'Unanswered'}
                                    </div>
                                    {!isCorrect && (
                                      <div style={{ color: '#047857' }}>
                                        <strong>Correct Answer:</strong> {question.options[question.correct]}
                                      </div>
                                    )}
                                  </div>

                                  <div style={{ 
                                    fontSize: '12.5px', 
                                    color: '#475569', 
                                    borderTop: '1px dashed',
                                    borderColor: isCorrect ? '#a7f3d0' : '#fca5a5',
                                    paddingTop: '8px', 
                                    paddingLeft: '28px' 
                                  }}>
                                    {question.explanation}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })()
                )}
              </div>
            )}

            {/* STEP 3: LOGIC VALIDATION */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Describe Your Logic</h2>
                  <p className={styles.whatIsItText} style={{ marginBottom: '16px' }}>
                    Describe your algorithm, pseudocode, or step-by-step approach to solve the <strong>{currentTopic.title}</strong> challenge. 
                    AI will verify if your logic checks out before you begin coding.
                  </p>
                  
                  <textarea
                    className={styles.tutorTextarea}
                    placeholder="Example: First, read the input. Then, loop from 1 to n. Check if n is divisible... "
                    value={logicText}
                    onChange={e => setLogicText(e.target.value)}
                  />

                  <div className={styles.actionRow}>
                    <button
                      className={`${styles.primaryButton} ${isValidatingLogic ? styles.buttonDisabled : ''}`}
                      onClick={handleValidateLogic}
                    >
                      {isValidatingLogic ? (
                        <>
                          <div className={styles.loadingSpinner} />
                          Validating logic...
                        </>
                      ) : (
                        'Validate Logic'
                      )}
                    </button>
                  </div>
                </div>

                {/* AI logic feedback card */}
                {logicResult && (
                  <div className={`${styles.validationBox} ${logicResult.correct ? styles.validationSuccess : styles.validationFailure}`}>
                    <h3 style={{ fontSize: '15px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      {logicResult.correct ? 'Logic Approved!' : 'Logic Review Needed'}
                    </h3>
                    <p style={{ fontSize: '13.5px', lineHeight: '1.5' }}>{logicResult.feedback}</p>
                    
                    {logicResult.hints && logicResult.hints.length > 0 && (
                      <div>
                        <h4 className={styles.hintsTitle}>Suggestions to improve:</h4>
                        <ul className={styles.hintsList}>
                          {logicResult.hints.map((hint, idx) => (
                            <li key={idx} className={styles.hintItem}>{hint}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {!logicResult.correct && (
                      <div style={{
                        marginTop: '12px',
                        padding: '10px',
                        borderRadius: '6px',
                        backgroundColor: 'rgba(239, 68, 68, 0.05)',
                        border: '1px dashed #ef4444',
                        color: '#991b1b',
                        fontSize: '13px'
                      }}>
                        <strong>Tip:</strong> You can revise your explanation to try again, or click the button below to proceed to the coding stage anyway.
                      </div>
                    )}

                    {logicResult && (
                      <button
                        className={styles.primaryButton}
                        style={{ marginTop: '16px', background: '#10b981' }}
                        onClick={() => setStep(4)}
                      >
                        Next: Code Solution →
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: CODE SOLUTION */}
            {step === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Mock Terminal output */}
                <div className={styles.terminalCard}>
                  <div className={styles.terminalHeader}>
                    <span className={styles.terminalDot} style={{ backgroundColor: '#ef4444' }} />
                    <span className={styles.terminalDot} style={{ backgroundColor: '#f59e0b' }} />
                    <span className={styles.terminalDot} style={{ backgroundColor: '#10b981' }} />
                    <span style={{ color: '#94a3b8', fontSize: '11px', fontFamily: 'JetBrains Mono', marginLeft: '8px' }}>Terminal Output</span>
                  </div>
                  <div className={styles.terminalOutput}>
                    {terminalOutput || 'SmartCompiler Terminal v1.0.0\nPress "Run Code" to compile and execute your program.'}
                  </div>
                  {/* Integrated Stdin row directly below terminal output */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#090d16',
                    borderTop: '1px solid #1e293b',
                    padding: '10px 16px',
                    gap: '8px'
                  }}>
                    <span style={{ color: '#6366f1', fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', fontWeight: 'bold' }}>stdin &gt;</span>
                    <input
                      type="text"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: '#f8fafc',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '12.5px'
                      }}
                      placeholder="Type optional program input here..."
                      value={stdinText}
                      onChange={e => setStdinText(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.card}>
                  <h2 className={styles.cardTitle}>Implement in C</h2>
                  <p className={styles.whatIsItText} style={{ marginBottom: '16px' }}>
                    Now, write the C code to implement the logic for <strong>{currentTopic.title}</strong>. 
                    You can run the code against mock inputs, and submit it for AI verification when complete.
                  </p>

                  <TutorCodeEditor
                    code={codeText}
                    onChange={setCodeText}
                  />

                  <div className={styles.actionRow}>
                    <button
                      className={`${styles.secondaryButton} ${isRunningCode ? styles.buttonDisabled : ''}`}
                      onClick={handleRunCode}
                    >
                      {isRunningCode ? 'Running...' : 'Run Code'}
                    </button>
                    <button
                      className={`${styles.primaryButton} ${isValidatingCode ? styles.buttonDisabled : ''}`}
                      onClick={handleVerifyCode}
                    >
                      {isValidatingCode ? (
                        <>
                          <div className={styles.loadingSpinner} />
                          Verifying code...
                        </>
                      ) : (
                        'Verify Solution'
                      )}
                    </button>
                  </div>
                </div>

                {/* AI verification response */}
                {codeResult && (
                  <div className={`${styles.validationBox} ${codeResult.correct ? styles.validationSuccess : styles.validationFailure}`}>
                    <h3 style={{ fontSize: '15px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      {codeResult.correct ? 'Code Verified!' : 'Verification Feedback'}
                    </h3>
                    <p style={{ fontSize: '13.5px', lineHeight: '1.5' }}>{codeResult.feedback}</p>

                    {codeResult.issues && codeResult.issues.length > 0 && (
                      <div>
                        <h4 className={styles.hintsTitle}>Bugs or issues detected:</h4>
                        <ul className={styles.hintsList}>
                          {codeResult.issues.map((issue, idx) => (
                            <li key={idx} className={styles.hintItem}>
                              <strong>Line {issue.line || 'general'}:</strong> {issue.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Generate Full Solution section (shown when solution is incorrect) */}
                    {!codeResult.correct && (
                      <div style={{ marginTop: '16px' }}>
                        {isGeneratingSolution ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#991b1b', fontSize: '13.5px' }}>
                            <div className={styles.loadingSpinner} style={{ borderTopColor: '#ef4444' }} />
                            <span>Generating reference solution...</span>
                          </div>
                        ) : !showSolution ? (
                          <button
                            className={styles.secondaryButton}
                            style={{
                              border: '1.5px dashed #ef4444',
                              color: '#b91c1c',
                              background: '#fff5f5'
                            }}
                            onClick={() => {
                              setIsGeneratingSolution(true);
                              setTimeout(() => {
                                setIsGeneratingSolution(false);
                                setShowSolution(true);
                              }, 500);
                            }}
                          >
                            Generate Full Solution
                          </button>
                        ) : null}
                      </div>
                    )}
                  </div>
                )}

                {/* Reference Solution display card */}
                {showSolution && !isGeneratingSolution && (
                  <div className={styles.card} style={{ border: '1.5px solid #cbd5e1', background: '#f8fafc' }}>
                    <h3 className={styles.cardTitle} style={{ color: '#1e293b' }}>Reference Solution</h3>
                    <p className={styles.whatIsItText} style={{ fontSize: '13px', color: '#475569', marginBottom: '12px' }}>
                      Here is the correct solution for <strong>{currentTopic.title}</strong>. You can review the structure and comments below.
                    </p>
                    <pre style={{
                      background: '#0d1117',
                      color: '#adbac7',
                      padding: '16px',
                      borderRadius: '8px',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '12.5px',
                      overflowX: 'auto',
                      whiteSpace: 'pre',
                      border: '1px solid #21262d',
                      marginBottom: '16px'
                    }}>
                      {currentTopic.referenceSolution}
                    </pre>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        className={styles.primaryButton}
                        onClick={() => {
                          setCodeText(currentTopic.referenceSolution);
                          setShowSolution(false);
                        }}
                      >
                        Apply to Editor
                      </button>
                      <button
                        className={styles.secondaryButton}
                        onClick={() => setShowSolution(false)}
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Footer controls */}
          <div className={styles.footer}>
            <button 
              className={styles.secondaryButton} 
              disabled={step === 1}
              onClick={() => setStep(prev => prev - 1)}
            >
              ← Back
            </button>
            <span style={{ alignSelf: 'center', fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>
              Step {step} of 4
            </span>
            <button 
              className={styles.primaryButton}
              disabled={step === 4}
              onClick={() => setStep(prev => prev + 1)}
            >
              Next →
            </button>
          </div>

          {/* Success Overlay Modal */}
          {showCompletionModal && (
            <div className={styles.completionOverlay}>
              <div className={styles.completionCard}>
                <div className={styles.completionEmoji}>★</div>
                <h2 className={styles.completionTitle}>Concept Mastered!</h2>
                <p className={styles.completionDesc}>
                  Incredible job! You have fully completed the <strong>{currentTopic.title}</strong> module. 
                  Your logic was verified, and your C code compiler run was approved by AI.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button 
                    className={styles.secondaryButton}
                    onClick={() => setShowCompletionModal(false)}
                  >
                    Keep Coding
                  </button>
                  <button 
                    className={styles.primaryButton}
                    onClick={handleNextTopic}
                  >
                    Next Topic →
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </>
  );
}

// ─── Tutor Custom Editor Component ──────────────────────────────────────────
function TutorCodeEditor({ code, onChange }) {
  const textareaRef = useRef(null);
  const preRef = useRef(null);
  const gutterRef = useRef(null);

  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const highlighted = useMemo(() => highlightC(code), [code]);

  const syncScroll = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    if (preRef.current) {
      preRef.current.scrollTop  = ta.scrollTop;
      preRef.current.scrollLeft = ta.scrollLeft;
    }
    if (gutterRef.current) {
      // Gutter scrolls by the same amount as the textarea.
      // The gutter's first line has 16px padding-top to align with the
      // code wrapper's 16px padding-top, so straight scrollTop sync works.
      gutterRef.current.scrollTop = ta.scrollTop;
    }
  }, []);

  const handleKeyDown = useCallback((e) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const key = e.key;

    // Tab -> 4 spaces
    if (key === 'Tab') {
      e.preventDefault();
      const INDENT = '    ';
      const next = code.substring(0, start) + INDENT + code.substring(end);
      onChange(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 4;
      });
      return;
    }

    // Enter -> preserve indentation
    if (key === 'Enter') {
      e.preventDefault();
      const lineStart = code.lastIndexOf('\n', start - 1) + 1;
      const match = code.slice(lineStart).match(/^[ \t]*/);
      const indent = match ? match[0] : '';
      
      const charBefore = code[start - 1];
      const charAfter = code[start];

      // Bracket pair expansion: {|} -> {\n    |\n}
      if (charBefore === '{' && charAfter === '}') {
        const inner = '\n' + indent + '    ';
        const outer = '\n' + indent;
        const next = code.substring(0, start) + inner + outer + code.substring(end);
        const pos = start + inner.length;
        onChange(next);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = pos;
        });
        return;
      }

      const insert = '\n' + indent;
      const next = code.substring(0, start) + insert + code.substring(end);
      const pos = start + insert.length;
      onChange(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = pos;
      });
      return;
    }

    // Auto-close brackets & quotes
    const OPEN_TO_CLOSE = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'" };
    const CLOSE_CHARS = new Set([')', '}', ']', '"', "'"]);
    const OPEN_CHARS = new Set(['(', '{', '[', '"', "'"]);

    if (key === 'Backspace' && start === end) {
      const charBefore = code[start - 1];
      const charAfter = code[start];
      if (charBefore && OPEN_TO_CLOSE[charBefore] === charAfter) {
        e.preventDefault();
        const next = code.substring(0, start - 1) + code.substring(start + 1);
        const pos = start - 1;
        onChange(next);
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = pos;
        });
        return;
      }
    }

    if (CLOSE_CHARS.has(key) && start === end) {
      const charAfter = code[start];
      if (charAfter === key) {
        e.preventDefault();
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 1;
        });
        return;
      }
    }

    if (OPEN_CHARS.has(key) && start === end) {
      const close = OPEN_TO_CLOSE[key];
      const charAfter = code[start];

      if ((key === '"' || key === "'") && code[start - 1] === key) {
        return;
      }
      if (charAfter && /\w/.test(charAfter)) return;

      e.preventDefault();
      const next = code.substring(0, start) + key + close + code.substring(end);
      const pos = start + 1;
      onChange(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = pos;
      });
      return;
    }
  }, [code, onChange]);

  useEffect(() => {
    syncScroll();
  }, [code, syncScroll]);

  return (
    <div className={styles.tutorEditor}>
      <div className={styles.tutorGutter} ref={gutterRef} aria-hidden="true">
        {Array.from({ length: lineCount }, (_, idx) => (
          <div key={idx} className={styles.tutorLineNum}>{idx + 1}</div>
        ))}
      </div>
      <div className={styles.tutorCodeWrapper}>
        <pre
          ref={preRef}
          className={styles.tutorHighlight}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: highlighted + '\n' }}
        />
        <textarea
          ref={textareaRef}
          className={styles.tutorTextareaInput}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          aria-label="C code editor"
        />
      </div>
    </div>
  );
}

