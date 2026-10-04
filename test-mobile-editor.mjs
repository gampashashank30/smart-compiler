import { chromium, devices } from 'playwright';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve('./playwright-mobile-results');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runCheck() {
  console.log('🚀 Starting Playwright Mobile Editor Check...');
  const browser = await chromium.launch({
    headless: true,
  });

  const results = {
    checks: [],
    passed: 0,
    failed: 0,
    warnings: [],
  };

  function recordCheck(name, pass, details = '') {
    if (pass) {
      results.passed++;
      console.log(`  ✅ PASS: ${name} ${details ? '(' + details + ')' : ''}`);
    } else {
      results.failed++;
      console.log(`  ❌ FAIL: ${name} ${details ? '(' + details + ')' : ''}`);
    }
    results.checks.push({ name, pass, details });
  }

  const consoleLogs = [];
  const pageErrors = [];

  // Function to create an authenticated mobile context
  async function createMobileContext(deviceConfig) {
    const context = await browser.newContext({
      ...deviceConfig,
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    await context.addInitScript(() => {
      localStorage.setItem(
        'supabase-mock-session',
        JSON.stringify({
          user: { id: 'test-mobile-user', email: 'tester@smartcompiler.dev', user_metadata: { full_name: 'Mobile Tester' } },
          access_token: 'test-mock-token',
        })
      );
    });
    return context;
  }

  try {
    // ── Primary Device: iPhone 14 Full Functional Run ───────────────────────
    console.log('\n======================================================');
    console.log('📱 Testing Primary Device: iPhone 14 (390 x 844)');
    console.log('======================================================');
    
    const context = await createMobileContext(devices['iPhone 14']);
    const page = await context.newPage();

    page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
    page.on('pageerror', err => {
      pageErrors.push(err.message);
      console.error('❌ Page Error:', err.message);
    });
    page.on('dialog', async dialog => {
      console.log(`  💬 Dialog appeared: "${dialog.message()}" -> Accepting`);
      await dialog.accept();
    });

    // 1. Navigation
    console.log('\n📱 Step 1: Navigating to http://localhost:5173/app.html...');
    const response = await page.goto('http://localhost:5173/app.html', {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });
    recordCheck('Page Load (HTTP 200)', response && response.status() === 200, `Status: ${response?.status()}`);

    await page.waitForSelector('#code-editor', { timeout: 10000 });
    recordCheck('Code Editor Textarea Rendered', true);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01-mobile-editor-initial.png'), fullPage: false });

    // 2. Viewport & Layout
    console.log('\n📱 Step 2: Checking mobile viewport & layout constraints...');
    const layoutMetrics = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const clientWidth = document.documentElement.clientWidth;
      const bodyScrollWidth = document.body.scrollWidth;
      const bodyClientWidth = document.body.clientWidth;
      const hasHorizontalScroll = scrollWidth > clientWidth || bodyScrollWidth > bodyClientWidth;
      
      const leftPane = document.querySelector('[class*="leftPane"]');
      const rightPane = document.querySelector('[class*="rightPane"]');
      const mobileTabs = document.querySelector('[class*="mobileTabs"]');
      const mobileRight = document.querySelector('[class*="mobileRight"]');
      const hamburger = document.getElementById('mobile-menu-btn');
      
      return {
        hasHorizontalScroll,
        scrollWidth,
        clientWidth,
        leftPaneHidden: leftPane?.getAttribute('data-hidden'),
        rightPaneHidden: rightPane?.getAttribute('data-hidden'),
        mobileTabsVisible: mobileTabs ? window.getComputedStyle(mobileTabs).display !== 'none' : false,
        mobileRightVisible: mobileRight ? window.getComputedStyle(mobileRight).display !== 'none' : false,
        hamburgerVisible: hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false,
      };
    });

    recordCheck('No Horizontal Page Overflow', !layoutMetrics.hasHorizontalScroll, `scrollWidth: ${layoutMetrics.scrollWidth}px, clientWidth: ${layoutMetrics.clientWidth}px`);
    recordCheck('Mobile Bottom Tabs Navigation Visible', layoutMetrics.mobileTabsVisible, 'mobileTabs display != none');
    recordCheck('Mobile Header Hamburger Menu Visible', layoutMetrics.hamburgerVisible, 'mobileRight & hamburgerBtn visible');
    recordCheck('Editor Pane (Left) Active and Visible', layoutMetrics.leftPaneHidden === 'false' || layoutMetrics.leftPaneHidden === null, `data-hidden="${layoutMetrics.leftPaneHidden}"`);
    recordCheck('Console/Right Pane Inactive (Hidden)', layoutMetrics.rightPaneHidden === 'true', `data-hidden="${layoutMetrics.rightPaneHidden}"`);

    // 3. UI Elements & Touch Targets
    console.log('\n📱 Step 3: Checking Editor Panel UI Elements on Mobile...');
    const editorElements = await page.evaluate(() => {
      const editor = document.getElementById('code-editor');
      const runBtn = document.getElementById('run-btn');
      const clearBtn = document.getElementById('clear-btn');
      const downloadBtn = document.getElementById('download-btn');
      const gutter = document.querySelector('[class*="gutter"]');
      const highlight = document.querySelector('pre[class*="highlight"]');
      const tabList = document.querySelector('[class*="tabList"]');
      const tabs = Array.from(document.querySelectorAll('[class*="fileTab"]')).map(t => t.textContent.trim());

      const getBox = el => el ? {
        width: Math.round(el.getBoundingClientRect().width),
        height: Math.round(el.getBoundingClientRect().height),
      } : null;

      return {
        hasEditor: !!editor,
        hasRunBtn: !!runBtn,
        hasClearBtn: !!clearBtn,
        hasDownloadBtn: !!downloadBtn,
        hasGutter: !!gutter,
        hasHighlight: !!highlight,
        hasTabList: !!tabList,
        tabNames: tabs,
        runBtnBox: getBox(runBtn),
      };
    });

    recordCheck('Editor Textarea exists', editorElements.hasEditor);
    recordCheck('Syntax Highlight overlay exists', editorElements.hasHighlight);
    recordCheck('Line Numbers Gutter exists', editorElements.hasGutter);
    recordCheck('Run Button exists', editorElements.hasRunBtn);
    recordCheck('Clear Button exists', editorElements.hasClearBtn);
    recordCheck('Download Button exists', editorElements.hasDownloadBtn);
    recordCheck('Default File Tab main.c exists', editorElements.tabNames.some(t => t.includes('main.c')), `Tabs: ${editorElements.tabNames.join(', ')}`);
    recordCheck('Run Button Touch Target Adequate Height (>= 36px)', (editorElements.runBtnBox?.height || 0) >= 36, `Height: ${editorElements.runBtnBox?.height}px`);

    // 4. Code Editing & Syntax Highlighting
    console.log('\n📱 Step 4: Testing Code Editing & Typing on Mobile...');
    const originalCode = await page.$eval('#code-editor', el => el.value);
    recordCheck('Starter Code Loaded', originalCode.length > 0, `Length: ${originalCode.length} chars`);

    const testCode = '#include <stdio.h>\n\nint main() {\n    printf("Hello from Mobile Playwright!\\n");\n    return 0;\n}';
    await page.fill('#code-editor', testCode);
    await page.waitForTimeout(500);

    const updatedCode = await page.$eval('#code-editor', el => el.value);
    const codeMatch = updatedCode.includes('Hello from Mobile Playwright!');
    recordCheck('Editor Value Updated via fill()', codeMatch);

    const highlightContent = await page.$eval('pre[class*="highlight"]', el => el.innerHTML);
    const hasHighlightSpans = highlightContent.includes('<span') && highlightContent.includes('Hello from Mobile Playwright');
    recordCheck('Syntax Highlighting generated spans and synchronized with edited code', hasHighlightSpans);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02-mobile-editor-typed.png') });

    // 5. Add Tab Dropdown & Multi-tab
    console.log('\n📱 Step 5: Testing Tab addition on Mobile...');
    const addTabBtn = await page.$('button[class*="tabAdd"]');
    if (addTabBtn) {
      recordCheck('Add Tab Button found', true);
      await addTabBtn.click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03-mobile-add-tab-dropdown.png') });

      const menuItems = await page.$$('button[class*="addMenuItem"]');
      recordCheck('Add Tab Dropdown Opened with menu options', menuItems.length >= 2, `Options found: ${menuItems.length}`);

      if (menuItems.length >= 2) {
        await menuItems[1].click(); // 'New Tab'
        await page.waitForTimeout(500);

        const newTabsList = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('[class*="fileTab"]')).map(t => t.textContent.trim());
        });
        recordCheck('New Tab Created', newTabsList.length >= 2, `Tabs: ${newTabsList.join(', ')}`);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04-mobile-multitab.png') });

        // Switch back to main.c
        const firstTab = await page.$('[class*="fileTab"]');
        if (firstTab) {
          await firstTab.click();
          await page.waitForTimeout(300);
        }
      }
    } else {
      recordCheck('Add Tab Button found', false);
    }

    // 6. Mobile Drawer (Hamburger Menu)
    console.log('\n📱 Step 6: Testing Mobile Drawer Navigation...');
    const menuBtn = await page.$('#mobile-menu-btn');
    if (menuBtn) {
      await menuBtn.click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05-mobile-drawer.png') });

      const drawerIsOpen = await page.evaluate(() => {
        const drawer = document.querySelector('[class*="mobileDrawer"]');
        return drawer && drawer.classList.toString().includes('mobileDrawerOpen');
      });
      recordCheck('Mobile Drawer Opened smoothly', drawerIsOpen);

      const closeBtn = await page.$('button[class*="drawerClose"]');
      if (closeBtn) {
        await closeBtn.click();
        await page.waitForTimeout(400);
      }
    }

    // 7. Run Execution Flow
    console.log('\n📱 Step 7: Testing RUN button and automatic mobile tab transition...');
    const runBtn = await page.$('#run-btn');
    if (runBtn) {
      await runBtn.click();
      await page.waitForTimeout(1000);

      const postRunState = await page.evaluate(() => {
        const leftPane = document.querySelector('[class*="leftPane"]');
        const rightPane = document.querySelector('[class*="rightPane"]');
        const consoleTabBtn = document.getElementById('mobile-tab-console');
        const isConsoleTabActive = consoleTabBtn ? consoleTabBtn.classList.toString().includes('Active') : false;
        const terminalEl = document.querySelector('.xterm') || document.querySelector('[class*="terminal"]');
        
        return {
          leftPaneHidden: leftPane?.getAttribute('data-hidden'),
          rightPaneHidden: rightPane?.getAttribute('data-hidden'),
          isConsoleTabActive,
          hasTerminal: !!terminalEl,
        };
      });

      recordCheck(
        'Auto-switched to Console/Terminal on mobile Run',
        postRunState.rightPaneHidden === 'false' || postRunState.isConsoleTabActive,
        `rightPane hidden: ${postRunState.rightPaneHidden}, console tab active: ${postRunState.isConsoleTabActive}`
      );

      await page.waitForTimeout(2500);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06-mobile-console-output.png') });

      const termText = await page.evaluate(() => document.body.innerText);
      const hasOutput = termText.includes('Compiling') || termText.includes('gcc') || termText.includes('PROGRAM OUTPUT') || postRunState.hasTerminal;
      recordCheck('Program output or compilation activity detected', hasOutput);

      // 8. Switching Back to Editor via Bottom Bar
      console.log('\n📱 Step 8: Switching back to Editor via bottom tab bar...');
      const editorTabBtn = await page.$('#mobile-tab-editor');
      if (editorTabBtn) {
        await editorTabBtn.click();
        await page.waitForTimeout(500);

        const returnState = await page.evaluate(() => {
          const leftPane = document.querySelector('[class*="leftPane"]');
          const isEditorTabActive = document.getElementById('mobile-tab-editor')?.classList.toString().includes('Active');
          return {
            leftPaneHidden: leftPane?.getAttribute('data-hidden'),
            isEditorTabActive,
          };
        });

        recordCheck('Successfully switched back to Editor Pane', returnState.leftPaneHidden === 'false' && returnState.isEditorTabActive);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07-mobile-editor-returned.png') });
      }
    }

    // 9. Clear Button
    console.log('\n📱 Step 9: Testing Clear Button on Mobile...');
    const clearBtn = await page.$('#clear-btn');
    if (clearBtn) {
      await clearBtn.click();
      await page.waitForTimeout(500);
      const clearedCode = await page.$eval('#code-editor', el => el.value);
      recordCheck('Clear button emptied editor (dialog accepted)', clearedCode === '', `Value length: ${clearedCode.length}`);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08-mobile-editor-cleared.png') });
    }

    await context.close();

    // ── Additional Devices: Pixel 7 & iPhone SE ─────────────────────────────
    const otherDevices = [
      { name: 'Pixel 7 (Android, 412x915)', dev: devices['Pixel 7'], shot: '09-pixel-7-editor.png' },
      { name: 'iPhone SE (Small iOS, 375x667)', dev: devices['iPhone SE'], shot: '10-iphone-se-editor.png' },
    ];

    for (const d of otherDevices) {
      console.log(`\n======================================================`);
      console.log(`📱 Checking Responsive Layout on: ${d.name}`);
      console.log(`======================================================`);

      const dContext = await createMobileContext(d.dev);
      const dPage = await dContext.newPage();
      await dPage.goto('http://localhost:5173/app.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
      await dPage.waitForSelector('#code-editor', { timeout: 10000 });

      const dMetrics = await dPage.evaluate(() => {
        return {
          hasHorizontalScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth,
          editorVisible: !document.getElementById('code-editor').hidden,
          bottomTabsVisible: window.getComputedStyle(document.querySelector('[class*="mobileTabs"]')).display !== 'none',
        };
      });

      recordCheck(`[${d.name}] No Horizontal Overflow`, !dMetrics.hasHorizontalScroll);
      recordCheck(`[${d.name}] Editor Textarea Visible`, dMetrics.editorVisible);
      recordCheck(`[${d.name}] Bottom Navigation Tabs Visible`, dMetrics.bottomTabsVisible);

      await dPage.screenshot({ path: path.join(SCREENSHOT_DIR, d.shot), fullPage: false });
      await dContext.close();
    }

  } catch (err) {
    console.error('💥 Test execution error:', err);
    recordCheck('Test completed without fatal error', false, err.message);
  } finally {
    await browser.close();
  }

  console.log('\n========================================');
  console.log(`📊 FINAL SUMMARY: ${results.passed} Passed, ${results.failed} Failed`);
  console.log(`🖼️  Screenshots saved to: ${SCREENSHOT_DIR}`);
  console.log('========================================\n');

  fs.writeFileSync(path.join(SCREENSHOT_DIR, 'report.json'), JSON.stringify({ results, consoleLogs, pageErrors }, null, 2));

  if (results.failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runCheck().catch(err => {
  console.error('Fatal runner error:', err);
  process.exit(1);
});
