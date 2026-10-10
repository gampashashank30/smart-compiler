import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = path.resolve('./playwright-e2e-results');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runE2ETests() {
  console.log('🚀 Starting Comprehensive Playwright E2E Tests for Bug Tracker, Analytics & History...\n');
  
  const browser = await chromium.launch({
    headless: true,
  });

  const results = {
    passed: 0,
    failed: 0,
    tests: [],
  };

  function logTest(name, passed, details = '') {
    if (passed) {
      results.passed++;
      console.log(`  ✅ PASS: ${name} ${details ? '— ' + details : ''}`);
    } else {
      results.failed++;
      console.log(`  ❌ FAIL: ${name} ${details ? '— ' + details : ''}`);
    }
    results.tests.push({ name, passed, details });
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();

  const consoleLogs = [];
  const pageErrors = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
  page.on('pageerror', err => pageErrors.push(err.message));
  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  const langSelect = page.locator('#header-language-select');
  const bugTrackerBtn = page.locator('#bug-tracker-toggle-btn');
  const analyticsBtn = page.locator('#analytics-toggle-btn');
  const historyBtn = page.locator('#history-toggle-btn');

  try {
    // ══════════════════════════════════════════════════════════════
    // Suite 1: App Navigation & Header Controls
    // ══════════════════════════════════════════════════════════════
    console.log('--- Suite 1: App Navigation & Header Controls ---');
    const response = await page.goto('http://localhost:5173/app.html', {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });
    logTest('Page Navigation (HTTP 200)', response && response.status() === 200, `Status: ${response?.status()}`);

    await page.locator('#code-editor').waitFor({ timeout: 10000 });
    logTest('Code Editor is visible', true);

    logTest('Language dropdown exists', await langSelect.count() > 0);
    logTest('Bug Tracker button exists in Header', await bugTrackerBtn.count() > 0);
    logTest('Analytics button exists in Header', await analyticsBtn.count() > 0);
    logTest('History button exists in Header', await historyBtn.count() > 0);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-app-initial.png') });

    // ══════════════════════════════════════════════════════════════
    // Suite 2: Bug Tracker Panel & Multi-Language Switching
    // ══════════════════════════════════════════════════════════════
    console.log('\n--- Suite 2: Bug Tracker Panel & Multi-Language Switching ---');
    
    // Open Bug Tracker in default language (C)
    await bugTrackerBtn.click();
    const bugPanel = page.locator('aside[aria-label="Bug Tracker Analytics"]');
    await bugPanel.waitFor({ state: 'visible', timeout: 5000 });
    const bugPanelTitleC = await bugPanel.locator('[class*="panelTitle"]').first().innerText();
    logTest('Bug Tracker opens for C', bugPanelTitleC.toLowerCase().includes('bug tracker') && bugPanelTitleC.toLowerCase().includes('c'), bugPanelTitleC.replace(/\n/g, ' '));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-bugtracker-c.png') });

    // Close Bug Tracker via close button
    const bugCloseBtn = page.locator('#bug-tracker-close');
    logTest('Bug Tracker close button exists', await bugCloseBtn.count() > 0);
    await bugCloseBtn.click();
    await bugPanel.waitFor({ state: 'detached', timeout: 5000 });
    logTest('Bug Tracker closes smoothly', await bugPanel.count() === 0);

    // Switch to Python
    await langSelect.selectOption('python');
    await page.waitForTimeout(200);
    const activeLangValPy = await langSelect.inputValue();
    logTest('Language switched to Python', activeLangValPy === 'python');

    // Open Bug Tracker in Python
    await bugTrackerBtn.click();
    await bugPanel.waitFor({ state: 'visible', timeout: 5000 });
    const bugPanelTitlePy = await bugPanel.locator('[class*="panelTitle"]').first().innerText();
    logTest('Bug Tracker reflects Python header badge', bugPanelTitlePy.toLowerCase().includes('python'), bugPanelTitlePy.replace(/\n/g, ' '));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-bugtracker-python.png') });
    await page.locator('#bug-tracker-close').click();
    await bugPanel.waitFor({ state: 'detached', timeout: 5000 });

    // Switch to Java
    await langSelect.selectOption('java');
    await page.waitForTimeout(200);
    const activeLangValJava = await langSelect.inputValue();
    logTest('Language switched to Java', activeLangValJava === 'java');

    // Open Bug Tracker in Java
    await bugTrackerBtn.click();
    await bugPanel.waitFor({ state: 'visible', timeout: 5000 });
    const bugPanelTitleJava = await bugPanel.locator('[class*="panelTitle"]').first().innerText();
    logTest('Bug Tracker reflects Java header badge', bugPanelTitleJava.toLowerCase().includes('java'), bugPanelTitleJava.replace(/\n/g, ' '));
    await page.locator('#bug-tracker-close').click();
    await bugPanel.waitFor({ state: 'detached', timeout: 5000 });

    // ══════════════════════════════════════════════════════════════
    // Suite 3: Analytics Dashboard & Charts
    // ══════════════════════════════════════════════════════════════
    console.log('\n--- Suite 3: Analytics Dashboard & Charts ---');
    
    // Switch to C for analytics inspection
    await langSelect.selectOption('c');
    await page.waitForTimeout(200);

    await analyticsBtn.click();
    const analyticsPanel = page.locator('aside[aria-label="Analytics Dashboard"]');
    await analyticsPanel.waitFor({ state: 'visible', timeout: 5000 });
    const analyticsTitle = await analyticsPanel.locator('[class*="panelTitle"]').first().innerText();
    logTest('Analytics Dashboard opens', analyticsTitle.includes('Analytics'), analyticsTitle.replace(/\n/g, ' '));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-analytics-initial.png') });

    // Check Close
    const analyticsCloseBtn = page.locator('#analytics-close-btn');
    logTest('Analytics close button exists', await analyticsCloseBtn.count() > 0);
    await analyticsCloseBtn.click();
    await analyticsPanel.waitFor({ state: 'detached', timeout: 5000 });
    logTest('Analytics Dashboard closes properly', await analyticsPanel.count() === 0);

    // ══════════════════════════════════════════════════════════════
    // Suite 4: Compilation History Panel
    // ══════════════════════════════════════════════════════════════
    console.log('\n--- Suite 4: Compilation History Panel ---');
    await historyBtn.click();
    const historyPanel = page.locator('aside[aria-label="Compilation History"]');
    await historyPanel.waitFor({ state: 'visible', timeout: 5000 });
    const historyTitle = await historyPanel.locator('[class*="panelTitle"]').first().innerText();
    logTest('History panel opens', historyTitle.includes('History'), historyTitle.replace(/\n/g, ' '));

    const historySearch = historyPanel.locator('input[placeholder*="Search"]');
    logTest('History search bar exists', await historySearch.count() > 0);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-history-panel.png') });

    const historyCloseBtn = page.locator('#history-close-btn');
    logTest('History close button exists', await historyCloseBtn.count() > 0);
    await historyCloseBtn.click();
    await historyPanel.waitFor({ state: 'detached', timeout: 5000 });
    logTest('History panel closes properly', await historyPanel.count() === 0);

    // ══════════════════════════════════════════════════════════════
    // Suite 5: Cross-Language Isolation & Error Tracking E2E
    // ══════════════════════════════════════════════════════════════
    console.log('\n--- Suite 5: Cross-Language Isolation & Error Tracking E2E ---');

    // Dispatch a Python-specific error event
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('bugtracker:record', {
        detail: {
          type: 'compile-error',
          subtype: 'Indentation Error',
          rawMessage: 'IndentationError: unexpected indent at line 4',
          lineHint: 4,
          language: 'python',
          timestamp: Date.now(),
        }
      }));
    });
    await page.waitForTimeout(300);

    // Switch to Python and inspect Bug Tracker
    await langSelect.selectOption('python');
    await page.waitForTimeout(200);
    await bugTrackerBtn.click();
    await bugPanel.waitFor({ state: 'visible', timeout: 5000 });

    const pyBugCards = await bugPanel.locator('[class*="mistakeCard"]').allInnerTexts();
    const pyHasIndentError = pyBugCards.some(text => text.includes('Indentation Error'));
    logTest('Python Bug Tracker records Indentation Error', pyHasIndentError, `Found: ${pyBugCards.join(', ').replace(/\n/g, ' ')}`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-python-bug-recorded.png') });
    await page.locator('#bug-tracker-close').click();
    await bugPanel.waitFor({ state: 'detached', timeout: 5000 });

    // Switch to C and inspect Bug Tracker - MUST NOT have Indentation Error!
    await langSelect.selectOption('c');
    await page.waitForTimeout(200);
    await bugTrackerBtn.click();
    await bugPanel.waitFor({ state: 'visible', timeout: 5000 });

    const cBugCards = await bugPanel.locator('[class*="mistakeCard"]').allInnerTexts();
    const cHasIndentError = cBugCards.some(text => text.includes('Indentation Error'));
    logTest('C Bug Tracker is isolated from Python error (No contamination)', !cHasIndentError);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-c-bug-isolated.png') });
    await page.locator('#bug-tracker-close').click();
    await bugPanel.waitFor({ state: 'detached', timeout: 5000 });

    // ══════════════════════════════════════════════════════════════
    // Suite 6: Analytics Severity, Warning Indicator & Radar Chart
    // ══════════════════════════════════════════════════════════════
    console.log('\n--- Suite 6: Analytics Severity, Warning Indicator & Radar Chart ---');

    // Dispatch a run with a compiler warning for C
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('bugtracker:record', {
        detail: {
          type: 'runtime',
          subtype: 'Successful Run',
          exitCode: 0,
          rawMessage: 'warning: unused variable x',
          stderr: 'main.c:4: warning: unused variable x',
          hasWarning: true,
          language: 'c',
          timestamp: Date.now(),
        }
      }));
    });
    await page.waitForTimeout(300);

    // Open Analytics for C
    await analyticsBtn.click();
    await analyticsPanel.waitFor({ state: 'visible', timeout: 5000 });

    // Check Hero KPI card for Day Streak & Total Runs
    const heroCards = await analyticsPanel.locator('[class*="heroCard"]').allInnerTexts();
    logTest('Analytics Hero KPIs render successfully', heroCards.length === 4, `Cards count: ${heroCards.length}`);

    // Check Heatmap 14 days render
    const heatCells = analyticsPanel.locator('[class*="heatCell"]');
    const cellCount = await heatCells.count();
    logTest('14-day Activity Heatmap renders 14 cells', cellCount === 14, `Cells count: ${cellCount}`);

    // Check if warning amber dot indicator is present
    const warningIndicator = analyticsPanel.locator('[title="Succeeded with warnings"]');
    logTest('Amber warning indicator dot rendered on success with warning', await warningIndicator.count() > 0);

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-analytics-warning-indicator.png') });
    await page.locator('#analytics-close-btn').click();
    await analyticsPanel.waitFor({ state: 'detached', timeout: 5000 });

    // ══════════════════════════════════════════════════════════════
    // Suite 7: Language Reset Isolation E2E
    // ══════════════════════════════════════════════════════════════
    console.log('\n--- Suite 7: Language Reset Isolation E2E ---');

    // Switch to Python and click Reset Analytics in Bug Tracker
    await langSelect.selectOption('python');
    await page.waitForTimeout(200);
    await bugTrackerBtn.click();
    await bugPanel.waitFor({ state: 'visible', timeout: 5000 });

    const resetBtn = page.locator('#bug-tracker-reset');
    logTest('Reset button exists in Bug Tracker', await resetBtn.count() > 0);
    await resetBtn.click();
    await page.waitForTimeout(400);

    // Check that Python is now empty
    const pyEmptyState = bugPanel.locator('[class*="emptyState"]');
    logTest('Python Bug Tracker reset successfully clears Python data', await pyEmptyState.count() > 0);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09-python-reset-empty.png') });
    await page.locator('#bug-tracker-close').click();
    await bugPanel.waitFor({ state: 'detached', timeout: 5000 });

    // Verify C still retains its data after Python was reset
    await langSelect.selectOption('c');
    await page.waitForTimeout(200);
    await analyticsBtn.click();
    await analyticsPanel.waitFor({ state: 'visible', timeout: 5000 });
    const cHeroCardsAfterPyReset = await analyticsPanel.locator('[class*="heroCard"]').allInnerTexts();
    logTest('C analytics preserved intact after Python reset', cHeroCardsAfterPyReset.length === 4);
    await page.locator('#analytics-close-btn').click();
    await analyticsPanel.waitFor({ state: 'detached', timeout: 5000 });

  } catch (err) {
    console.error('💥 Test suite crashed with error:', err);
    console.error('🔴 Page errors:', pageErrors);
    console.error('📋 Recent console logs:', consoleLogs.slice(-20));
    logTest('Test Suite Execution', false, err.message);
  } finally {
    await browser.close();
  }

  console.log('\n======================================================');
  console.log(`📊 FINAL RESULTS: ${results.passed} Passed, ${results.failed} Failed out of ${results.tests.length} tests`);
  console.log(`🖼️ Screenshots saved in: ${SCREENSHOT_DIR}`);
  console.log('======================================================\n');

  if (results.failed > 0) {
    process.exit(1);
  }
}

runE2ETests();
