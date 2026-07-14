/**
 * SmartCompiler - Cookie Consent Manager + Google AdSense Integration
 * ==========================================================================
 * 
 * This module handles:
 *  1. Cookie consent banner (GDPR/CCPA compliant)
 *  2. Conditional loading of Google AdSense (only after consent)
 *  3. Google Consent Mode v2 signals
 *  4. Consent state persistence in localStorage
 *  5. Cookie settings button (for revoking consent)
 * 
 * SETUP INSTRUCTIONS:
 *  - Replace ADSENSE_PUBLISHER_ID with your actual ca-pub-XXXXXXXXXXXXXXXX
 *  - Add <script src="/adsense.js"></script> to your index.html <head>
 *  - AdSense ad units can be placed anywhere on the page after this script loads
 * 
 * USAGE IN HTML (after approval):
 *  <ins class="adsbygoogle"
 *       style="display:block"
 *       data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
 *       data-ad-slot="XXXXXXXXXX"
 *       data-ad-format="auto"
 *       data-full-width-responsive="true"></ins>
 */

(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────────────────────
  // 🔴 REPLACE THIS with your actual Google AdSense Publisher ID after approval
  const ADSENSE_PUBLISHER_ID = 'ca-pub-XXXXXXXXXXXXXXXX';
  
  const CONSENT_KEY = 'sc_cookie_consent';
  const CONSENT_VERSION = 'v1';

  // ── Consent State ───────────────────────────────────────────────────────────
  function getConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Expire consent after 12 months (GDPR requirement)
      if (data.version !== CONSENT_VERSION) return null;
      if (Date.now() - data.timestamp > 365 * 24 * 60 * 60 * 1000) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  }

  function saveConsent(granted) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        granted,
        version: CONSENT_VERSION,
        timestamp: Date.now()
      }));
    } catch {}
  }

  // ── Google Consent Mode v2 ──────────────────────────────────────────────────
  // This MUST be set BEFORE loading any Google scripts
  // It tells Google what the user's consent state is
  function initConsentMode(granted) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;

    gtag('consent', 'default', {
      'ad_storage':             granted ? 'granted' : 'denied',
      'ad_user_data':           granted ? 'granted' : 'denied',
      'ad_personalization':     granted ? 'granted' : 'denied',
      'analytics_storage':      granted ? 'granted' : 'denied',
      'functionality_storage':  'granted',  // Always needed for auth
      'security_storage':       'granted',  // Always needed for auth
      'wait_for_update': 500
    });
  }

  function updateConsentMode(granted) {
    if (!window.gtag) return;
    window.gtag('consent', 'update', {
      'ad_storage':         granted ? 'granted' : 'denied',
      'ad_user_data':       granted ? 'granted' : 'denied',
      'ad_personalization': granted ? 'granted' : 'denied',
      'analytics_storage':  granted ? 'granted' : 'denied',
    });
  }

  // ── Load Google AdSense ─────────────────────────────────────────────────────
  function loadAdSense() {
    if (document.getElementById('adsense-script')) return; // Already loaded

    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUBLISHER_ID}`;
    document.head.appendChild(script);

    // Initialize any ad units already in the DOM
    script.onload = function () {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {}
    };
  }

  // ── Cookie Consent Banner Styles ────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('sc-consent-styles')) return;
    const style = document.createElement('style');
    style.id = 'sc-consent-styles';
    style.textContent = `
      /* ── Cookie Consent Banner ── */
      #sc-consent-banner {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        z-index: 999999;
        background: #0d1117;
        border-top: 1px solid #21262d;
        box-shadow: 0 -8px 32px rgba(0,0,0,0.4);
        padding: 0;
        transform: translateY(100%);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'Inter', system-ui, sans-serif;
      }
      #sc-consent-banner.visible {
        transform: translateY(0);
      }
      .sc-consent-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px 24px;
        display: flex;
        align-items: center;
        gap: 20px;
        flex-wrap: wrap;
      }
      .sc-consent-icon {
        font-size: 1.8rem;
        flex-shrink: 0;
      }
      .sc-consent-text {
        flex: 1;
        min-width: 240px;
      }
      .sc-consent-text h3 {
        font-size: 0.9rem;
        font-weight: 700;
        color: #c9d1d9;
        margin-bottom: 4px;
      }
      .sc-consent-text p {
        font-size: 0.8rem;
        color: #8b949e;
        line-height: 1.5;
      }
      .sc-consent-text p a {
        color: #0fa57c;
        text-decoration: none;
      }
      .sc-consent-text p a:hover { text-decoration: underline; }
      .sc-consent-actions {
        display: flex;
        gap: 10px;
        align-items: center;
        flex-shrink: 0;
        flex-wrap: wrap;
      }
      .sc-btn-accept {
        background: linear-gradient(135deg, #0fa57c, #14b8a6);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 22px;
        font-size: 0.875rem;
        font-weight: 700;
        cursor: pointer;
        transition: transform 0.15s, box-shadow 0.15s;
        font-family: inherit;
        white-space: nowrap;
      }
      .sc-btn-accept:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(15,165,124,0.4);
      }
      .sc-btn-decline {
        background: transparent;
        color: #8b949e;
        border: 1px solid #30363d;
        border-radius: 8px;
        padding: 10px 18px;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: border-color 0.15s, color 0.15s;
        font-family: inherit;
        white-space: nowrap;
      }
      .sc-btn-decline:hover {
        border-color: #8b949e;
        color: #c9d1d9;
      }
      .sc-btn-settings {
        background: transparent;
        color: #8b949e;
        border: none;
        border-bottom: 1px dashed #30363d;
        padding: 2px 0;
        font-size: 0.78rem;
        font-weight: 500;
        cursor: pointer;
        font-family: inherit;
        transition: color 0.15s;
        white-space: nowrap;
      }
      .sc-btn-settings:hover { color: #c9d1d9; }

      /* ── Floating Cookie Settings Button ── */
      #sc-cookie-settings-btn {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 9999;
        background: #161b22;
        border: 1px solid #21262d;
        border-radius: 10px;
        padding: 8px 14px;
        font-size: 0.78rem;
        font-weight: 600;
        color: #8b949e;
        cursor: pointer;
        font-family: 'Inter', sans-serif;
        transition: all 0.2s;
        display: none;
        align-items: center;
        gap: 6px;
      }
      #sc-cookie-settings-btn:hover {
        background: #21262d;
        color: #c9d1d9;
        border-color: #30363d;
      }

      /* ── Ad Container Styles ── */
      .sc-ad-unit {
        overflow: hidden;
        border-radius: 10px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        position: relative;
      }
      .sc-ad-unit[data-size="leaderboard"] { width: 100%; min-height: 90px; }
      .sc-ad-unit[data-size="rectangle"] { width: 300px; min-height: 250px; }
      .sc-ad-unit[data-size="responsive"] { width: 100%; min-height: 100px; }

      /* Consent placeholder when ads are blocked */
      .sc-ad-consent-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        min-height: 90px;
        padding: 16px;
        text-align: center;
        color: #94a3b8;
        font-size: 0.78rem;
        gap: 6px;
        font-family: 'Inter', sans-serif;
      }
      .sc-ad-consent-placeholder span { font-size: 1.5rem; }

      @media (max-width: 640px) {
        .sc-consent-inner { gap: 12px; padding: 16px; }
        .sc-consent-actions { width: 100%; }
        .sc-btn-accept, .sc-btn-decline { flex: 1; text-align: center; }
        #sc-cookie-settings-btn { bottom: 12px; left: 12px; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── Cookie Consent Banner ───────────────────────────────────────────────────
  function showBanner() {
    const banner = document.createElement('div');
    banner.id = 'sc-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'true');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="sc-consent-inner">
        <div class="sc-consent-icon" aria-hidden="true">🍪</div>
        <div class="sc-consent-text">
          <h3>We use cookies to keep SmartCompiler free</h3>
          <p>
            We use cookies for authentication and serve ads via <strong>Google AdSense</strong> to support the platform.
            Ad cookies help us show you relevant ads based on your browsing.
            See our <a href="/privacy-policy.html" target="_blank" rel="noopener">Privacy Policy</a> for details.
          </p>
        </div>
        <div class="sc-consent-actions">
          <button class="sc-btn-accept" id="sc-consent-accept" aria-label="Accept all cookies including advertising">Accept All</button>
          <button class="sc-btn-decline" id="sc-consent-decline" aria-label="Decline advertising cookies">Essential Only</button>
          <button class="sc-btn-settings" id="sc-consent-learn-more" aria-label="Learn more about our cookie policy">Learn more</button>
        </div>
      </div>
    `;
    document.body.appendChild(banner);

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => banner.classList.add('visible'));
    });

    // Handlers
    document.getElementById('sc-consent-accept').addEventListener('click', function () {
      handleConsent(true);
    });
    document.getElementById('sc-consent-decline').addEventListener('click', function () {
      handleConsent(false);
    });
    document.getElementById('sc-consent-learn-more').addEventListener('click', function () {
      window.open('/privacy-policy.html#sec3', '_blank', 'noopener,noreferrer');
    });

    // Trap focus within banner for accessibility
    banner.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') handleConsent(false);
    });
  }

  function hideBanner() {
    const banner = document.getElementById('sc-consent-banner');
    if (!banner) return;
    banner.classList.remove('visible');
    setTimeout(() => banner.remove(), 400);
  }

  function showSettingsButton() {
    let btn = document.getElementById('sc-cookie-settings-btn');
    if (!btn) {
      btn = document.createElement('button');
      btn.id = 'sc-cookie-settings-btn';
      btn.setAttribute('aria-label', 'Manage cookie settings');
      btn.innerHTML = '🍪 Cookie Settings';
      document.body.appendChild(btn);
      btn.addEventListener('click', resetConsent);
    }
    btn.style.display = 'flex';
  }

  function handleConsent(granted) {
    saveConsent(granted);
    updateConsentMode(granted);
    hideBanner();
    showSettingsButton();

    if (granted) {
      loadAdSense();
      showAdPlaceholders(true);
    } else {
      showAdPlaceholders(false);
    }
  }

  function resetConsent() {
    localStorage.removeItem(CONSENT_KEY);
    const settingsBtn = document.getElementById('sc-cookie-settings-btn');
    if (settingsBtn) settingsBtn.style.display = 'none';
    
    // Update consent mode to denied while banner shows
    updateConsentMode(false);
    showBanner();
  }

  // ── Ad Placeholder Management ────────────────────────────────────────────────
  // When consent is denied, show a friendly placeholder instead of leaving empty space
  function showAdPlaceholders(consentGranted) {
    const adUnits = document.querySelectorAll('.sc-ad-unit');
    adUnits.forEach(unit => {
      const placeholder = unit.querySelector('.sc-ad-consent-placeholder');
      const adEl = unit.querySelector('.adsbygoogle');
      if (consentGranted) {
        if (placeholder) placeholder.style.display = 'none';
        if (adEl) adEl.style.display = 'block';
      } else {
        if (placeholder) placeholder.style.display = 'flex';
        if (adEl) adEl.style.display = 'none';
      }
    });
  }

  // ── Initialize ───────────────────────────────────────────────────────────────
  function init() {
    injectStyles();

    const existingConsent = getConsent();

    if (existingConsent === null) {
      // No consent decision yet - initialize Consent Mode as denied by default (GDPR)
      initConsentMode(false);
      // Show banner when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showBanner);
      } else {
        // Small delay so banner doesn't flash on initial load
        setTimeout(showBanner, 1200);
      }
    } else {
      // Consent already given - initialize accordingly
      initConsentMode(existingConsent.granted);
      showSettingsButton();
      if (existingConsent.granted) {
        loadAdSense();
      }
    }
  }

  // Run immediately (before DOM is ready - Consent Mode must fire early)
  init();

  // ── Public API ────────────────────────────────────────────────────────────────
  // Expose for manual use in other scripts if needed
  window.SmartCompilerConsent = {
    accept: () => handleConsent(true),
    decline: () => handleConsent(false),
    reset: resetConsent,
    getStatus: () => getConsent(),
  };

})();
