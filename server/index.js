'use strict';
/**
 * server/index.js — Express + WebSocket API for smart-compiler
 *
 * Endpoints:
 *   POST /api/compile   { code, stdin }  → ExecutionResult  (batch/legacy)
 *   GET  /api/health                     → { ok, docker, engine, queue }
 *   WS   /ws/run                         → Interactive execution (OnlineGDB-style)
 *
 * Concurrency control:
 *   - p-queue limits simultaneous Docker containers to MAX_CONCURRENT
 *   - express-rate-limit caps requests per IP
 *   - Requests beyond queue capacity get a 503
 */

const http           = require('http');
const path           = require('path');
const fs             = require('fs');
const { randomUUID } = require('crypto');

// Load root .env for local dev (no-op on Render where env vars come from the dashboard)
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express        = require('express');
const helmet         = require('helmet');
const rateLimit      = require('express-rate-limit');
const cors           = require('cors');
const { execute, isDockerReady, isLocalGccReady, resetDockerCache } = require('./executor');
const { attachWebSocketServer } = require('./ws-executor');
// ISSUE 7 FIX: Shared ticket store — no circular dependency
const { WS_TICKETS } = require('./ws-tickets');

// ── p-queue: ESM-only package, so we load it dynamically ────────────────────
let queue;
(async () => {
  const { default: PQueue } = await import('p-queue');
  queue = new PQueue({ concurrency: 50 });
})();

// ── Config ───────────────────────────────────────────────────────────────────
const PORT           = process.env.PORT   || 3001;
const MAX_CODE_BYTES = 100_000;
const MAX_STDIN_BYTES = 10_000;
const QUEUE_MAX_SIZE = 200;

// Supabase config for JWT verification — MUST be set as environment variables on Render.
// Never hardcode these values here; they are baked into the deployed Docker image via build args.
const SUPABASE_URL         = process.env.VITE_SUPABASE_URL      || '';
const SUPABASE_ANON_KEY    = process.env.VITE_SUPABASE_ANON_KEY || '';
// Service role key bypasses RLS — only used server-side, NEVER sent to the frontend
// ISSUE 9 FIX: standardized to SUPABASE_SERVICE_KEY (was SUPABASE_SERVICE_KEY, .env.example had SUPABASE_SECRET_KEY)
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY   || '';

// Crash fast at startup if critical env vars are missing (rather than silently using bad values)
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('[FATAL] VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set as environment variables.');
  console.error('[FATAL] Set them in Render → Environment → Environment Variables.');
  process.exit(1);
}

// ISSUE 5 FIX: Admin emails read from environment variable, NOT hardcoded in source.
// Set ADMIN_EMAILS=email1,email2,email3 in Render → Environment Variables.
// Falls back to empty list (no admins) if not set — this is safe: no one gets admin access.
const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map(e => e.trim().toLowerCase())
  .filter(Boolean);

// Allowed origins — requests from other origins are rejected
const ALLOWED_ORIGINS = [
  'https://smartcompiler.maadiotsolutions.co.in',
  'http://localhost:5173',
  'http://localhost:3001',
];

// Add specific Render external URL if configured (avoid wildcard subdomains for CORS safety)
if (process.env.RENDER_EXTERNAL_URL) {
  const renderUrl = process.env.RENDER_EXTERNAL_URL.trim().replace(/\/$/, '');
  if (renderUrl && !ALLOWED_ORIGINS.includes(renderUrl)) {
    ALLOWED_ORIGINS.push(renderUrl);
  }
}

/**
 * Verify a Supabase access token by calling Supabase's /auth/v1/user endpoint.
 * Returns the user object if valid, or null if invalid/expired.
 */
async function verifySupabaseToken(token) {
  if (!token) return null;
  // Local development fallback: only allow dummy token if SUPABASE_URL is configured as a dummy
  if (SUPABASE_URL.includes('dummy') && token === 'dummy-access-token') {
    return { id: 'dummy-user-id', email: 'guest@example.com' };
  }
  try {
    const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

// ── Express app ──────────────────────────────────────────────────────────────
// SECURITY NOTE — CSRF: This server uses stateless JWT Bearer-token authentication
// (Authorization: Bearer <token>), not cookies.  CSRF attacks require the browser
// to automatically attach credentials (i.e. cookies or Basic auth).  Because all
// protected endpoints require an Authorization header that a cross-origin page
// cannot set on behalf of a victim, no CSRF middleware (e.g. csurf) is needed.
const app = express();

// Trust exactly one proxy hop (Render's load balancer) so rate-limiting
// reads the real client IP from X-Forwarded-For, not the proxy's IP.
app.set('trust proxy', 1);

// ── Security headers via Helmet ───────────────────────────────────────────────
// ISSUE 4 FIX: Proper CSP — no longer disabled.
// ISSUE 8 FIX: Added Permissions-Policy and other headers.
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:     ["'self'"],
      scriptSrc:      ["'self'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
      styleSrc:       ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net"],
      fontSrc:        ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
      imgSrc:         ["'self'", "data:", "blob:", "https:"],
      connectSrc:     [
        "'self'",
        // Supabase — auth, DB, storage
        SUPABASE_URL || 'https://*.supabase.co',
        // Groq / Z.AI — AI completions (server-side proxied, but keep for fetch)
        "https://api.groq.com",
        "https://api.z.ai",
        // WebSocket — interactive terminal
        "ws://localhost:3001",
        "wss://smartcompiler.maadiotsolutions.co.in",
      ],
      frameSrc:       ["'none'"],
      objectSrc:      ["'none'"],
      baseUri:        ["'self'"],
      formAction:     ["'self'"],
      upgradeInsecureRequests: [],
    },
  },
  // HSTS — 1 year, include subdomains
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  // Prevent clickjacking
  frameguard: { action: 'deny' },
  // Prevent MIME-type sniffing
  noSniff: true,
  // Referrer policy
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  // Cross-origin policies
  crossOriginOpenerPolicy: { policy: 'same-origin' },
  crossOriginResourcePolicy: { policy: 'same-origin' },
}));

// Remove server fingerprint
app.disable('x-powered-by');

// ISSUE 8 FIX: Permissions-Policy — disable browser features the app never uses
app.use((req, res, next) => {
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()'
  );
  next();
});

app.use(express.json({ limit: '150kb' }));

// CORS — only allow requests from explicitly listed trusted origins
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server requests)
    if (!origin) {
      return callback(null, true);
    }
    const isAllowed = ALLOWED_ORIGINS.some(o => origin === o);
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ── Rate limiters ─────────────────────────────────────────────────────────────
// General API limiter — applied to all /api/* routes
const apiLimiter = rateLimit({
  windowMs:        60 * 1000,
  max:             60,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { error: 'Too many requests', message: 'Please wait a minute.' },
});

// Stricter limiter for the compile endpoint (spins up Docker containers)
const compileLimiter = rateLimit({
  windowMs:        60 * 1000,
  max:             30,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { error: 'Too many requests', message: 'Please wait a minute.' },
});

// Very strict limiter for the AI endpoint (costs real money per call)
const aiLimiter = rateLimit({
  windowMs:        60 * 1000,
  max:             20,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { error: 'Too many AI requests', message: 'Please wait a minute before trying again.' },
});

// Admin endpoints — low limit, any abuse is suspicious
const adminLimiter = rateLimit({
  windowMs:        60 * 1000,
  max:             15,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { error: 'Too many admin requests' },
});

// Apply the general limiter to all /api/* routes
app.use('/api/', apiLimiter);

// ── AI proxy endpoint ─────────────────────────────────────────────────────────
// Calls Groq (or Z.AI) from the server so the API key stays off the frontend bundle.
// Supports up to 3 API keys with automatic fallback when one hits a rate limit.
// 🔒 PROTECTED: Requires a valid Supabase JWT (logged-in user) + allowed origin.
app.post('/api/ai', aiLimiter, async (req, res) => {
  // ── 1. Origin check ──────────────────────────────────────────────────────
  const origin = req.headers.origin || '';
  const isAllowedOrigin = !origin 
    || ALLOWED_ORIGINS.some(o => origin === o);
  if (!isAllowedOrigin) {
    console.warn(`[/api/ai] Blocked request from disallowed origin: ${origin}`);
    return res.status(403).json({ error: 'Forbidden: Origin not allowed' });
  }

  // ── 2. JWT verification — must be a logged-in Supabase user ──────────────
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No session token provided. Please log in.' });
  }
  const supabaseUser = await verifySupabaseToken(token);
  if (!supabaseUser?.id) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session. Please log in again.' });
  }

  const { systemPrompt, userMessage } = req.body ?? {};

  // ── 3. Input size limits ──────────────────────────────────────────────────
  if (!systemPrompt || !userMessage) {
    return res.status(400).json({ error: 'systemPrompt and userMessage are required' });
  }
  if (systemPrompt.length > 10000 || userMessage.length > 20000) {
    return res.status(400).json({ error: 'Input too large' });
  }

  // ── 4. Server-side token quota check ─────────────────────────────────────
  // SECURITY: We use the SERVICE ROLE KEY (not the user's JWT) so that:
  //   a) RLS policies cannot hide or falsify the user's token count.
  //   b) A user cannot manipulate their own row to bypass the quota.
  // If the service key is not configured we fall back to the anon key and
  // log a warning — quota enforcement will then depend on correct RLS.
  let currentTokens = 0;
  let tokenLimit = 15000;
  const quotaKey    = SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY;
  const quotaBearer = SUPABASE_SERVICE_KEY || token;
  if (!SUPABASE_SERVICE_KEY) {
    console.warn('[/api/ai] SUPABASE_SERVICE_KEY is not set — token quota check is using anon key. ' +
      'Set SUPABASE_SERVICE_KEY in Render → Environment Variables for reliable enforcement.');
  }
  try {
    const analyticsRes = await fetch(
      `${SUPABASE_URL}/rest/v1/user_stats?id=eq.${supabaseUser.id}&select=ai_tokens_used,token_limit`,
      {
        headers: {
          'Authorization': `Bearer ${quotaBearer}`,
          'apikey':        quotaKey,
        },
      }
    );
    if (analyticsRes.ok) {
      const rows = await analyticsRes.json();
      currentTokens = rows[0]?.ai_tokens_used ?? 0;
      tokenLimit    = rows[0]?.token_limit    ?? 15000;
    } else {
      const errText = await analyticsRes.text();
      console.error('[/api/ai] Token quota fetch returned non-OK:', analyticsRes.status, errText);
      // Fail open — don't block the user if the quota DB is temporarily unavailable
    }
  } catch (err) {
    console.error('[/api/ai] Failed to fetch token count:', err.message);
    // Fail open on network errors
  }

  if (currentTokens >= tokenLimit) {
    console.warn(`[/api/ai] QUOTA EXCEEDED — user=${supabaseUser.id} used=${currentTokens} limit=${tokenLimit}`);
    return res.status(429).json({
      error: 'Token limit reached',
      message: `You have used all ${tokenLimit.toLocaleString()} free AI tokens. Upgrade to continue.`,
    });
  }

  // Build the key rotation pool — filter out empty / placeholder values.
  // IMPORTANT: only use server-side keys (no VITE_ prefix — those would bake into the bundle).
  const PLACEHOLDER_FRAGMENTS = ['your_', 'REPLACE_WITH', 'your_second_api_key_here'];
  const allKeys = [
    process.env.GROQ_API_KEY,
    process.env.GROQ_API_KEY_2,
    process.env.GROQ_API_KEY_3,
  ].filter((k) => k && k.trim() && !PLACEHOLDER_FRAGMENTS.some(p => k.includes(p)));

  if (allKeys.length === 0) {
    return res.status(503).json({ error: 'AI service not configured (no valid GROQ_API_KEY found)' });
  }

  let lastError = null;

  // Try each key in order; move to the next on rate-limit (429) or auth error (401)
  for (let i = 0; i < allKeys.length; i++) {
    const apiKey = allKeys[i];
    const isZai  = !apiKey.startsWith('gsk_');
    const apiUrl = isZai
      ? 'https://api.z.ai/api/paas/v4/chat/completions'
      : 'https://api.groq.com/openai/v1/chat/completions';
    const model  = isZai ? 'glm-4.7-Flash' : 'llama-3.3-70b-versatile';

    try {
      const payload = {
        model,
        max_tokens: 4096,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: userMessage  },
        ],
      };
      if (isZai) {
        payload.thinking = { type: 'disabled' };
      } else {
        // Enforce JSON mode for Groq models when systemPrompt contains "JSON".
        // IMPORTANT: json_object mode requires the top-level response to be an object {}.
        // If the prompt asks for a JSON array [...], do NOT enable json_object mode —
        // Groq will wrap the array in an object or fail, causing a blank/broken response.
        const promptLower = systemPrompt.toLowerCase();
        const wantsJsonObject = promptLower.includes('json') && !promptLower.includes('json array');
        if (wantsJsonObject) {
          payload.response_format = { type: 'json_object' };
        }
      }

      const response = await fetch(apiUrl, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data?.error?.message || `API error ${response.status}`;
        console.warn(`[/api/ai] Key #${i + 1} failed with status ${response.status}: ${errorMsg} — trying next key...`);
        lastError = errorMsg;
        continue; // 👈 move to next key
      }

      // ✅ Success — update token count in Supabase server-side, then return result
      const tokensUsed = data.usage?.total_tokens ?? 0;
      const newTotal = currentTokens + tokensUsed;

      // Fire-and-forget Supabase update to user_stats table — don't delay the response.
      // SECURITY: Uses the SERVICE ROLE KEY so the write cannot be blocked by a user-owned
      // RLS policy. Falls back to the anon key only when the service key is not configured.
      fetch(
        `${SUPABASE_URL}/rest/v1/user_stats?id=eq.${supabaseUser.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${quotaBearer}`,
            'apikey':        quotaKey,
            'Content-Type':  'application/json',
            'Prefer':        'return=minimal',
          },
          body: JSON.stringify({ ai_tokens_used: newTotal }),
        }
      ).catch(err => console.error('[/api/ai] Failed to update token count:', err.message));

      return res.json({
        content: data.choices?.[0]?.message?.content ?? '',
        usage: data.usage ?? { total_tokens: 0 }
      });

    } catch (err) {
      console.error(`[/api/ai] Key #${i + 1} threw an error:`, err.message);
      lastError = err.message;
      // Network error — also try the next key
    }
  }

  // All keys exhausted
  console.error('[/api/ai] All API keys failed. Last error:', lastError);
  return res.status(429).json({
    error: 'All AI API keys are rate-limited or unavailable. Please try again later.',
    detail: lastError,
  });
});


// ── Admin: is-admin check ──────────────────────────────────────────────────
// Returns { isAdmin: true } if the JWT belongs to an admin, { isAdmin: false } otherwise.
// The frontend uses this to conditionally show the Admin button — no emails in the bundle.
app.get('/api/admin/is-admin', adminLimiter, async (req, res) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.json({ isAdmin: false });
  const supabaseUser = await verifySupabaseToken(token);
  if (!supabaseUser?.email) return res.json({ isAdmin: false });
  return res.json({ isAdmin: ADMIN_EMAILS.includes(supabaseUser.email) });
});

// ── Admin analytics endpoint ───────────────────────────────────────────────
// Returns ALL rows from user_analytics.
// Protected: only the verified admin email can call this.
// Uses the service role key (server-side only) to bypass RLS.
app.get('/api/admin/analytics', adminLimiter, async (req, res) => {
  // 1. Origin check
  const origin = req.headers.origin || '';
  const isAllowedOrigin = !origin 
    || ALLOWED_ORIGINS.some(o => origin === o);
  if (!isAllowedOrigin) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // 2. Verify JWT and confirm it belongs to the admin
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  if (!token) return res.status(401).json({ error: 'No token' });

  const supabaseUser = await verifySupabaseToken(token);
  if (!supabaseUser?.email) return res.status(401).json({ error: 'Invalid token' });
  if (!ADMIN_EMAILS.includes(supabaseUser.email)) {
    return res.status(403).json({ error: 'Forbidden: Admin only' });
  }

  // 3. Fetch all rows using service role key (bypasses RLS)
  // Fall back to the admin's own JWT token + anon key if service key is not configured.
  // This allows the admin to read all rows if RLS policies are set up to allow the admin email.
  const useServiceKey = !!SUPABASE_SERVICE_KEY;
  const bearerToken = useServiceKey ? SUPABASE_SERVICE_KEY : token;
  const apiKey = useServiceKey ? SUPABASE_SERVICE_KEY : SUPABASE_ANON_KEY;

  try {
    // Query user_analytics and join user_stats
    const apiRes = await fetch(
      `${SUPABASE_URL}/rest/v1/user_analytics?select=*,user_stats(*)`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
          'apikey':        apiKey,
          'Content-Type':  'application/json',
        },
      }
    );

    if (!apiRes.ok) {
      const errText = await apiRes.text();
      console.error('[/api/admin/analytics] Supabase error:', errText);
      return res.status(502).json({ error: 'DB fetch failed', detail: errText });
    }

    const rawRows = await apiRes.json();
    // Flatten rows so the frontend AdminDashboard component receives the expected flat structure
    const rows = rawRows.map(r => {
      const stats = Array.isArray(r.user_stats) ? r.user_stats[0] : r.user_stats;
      const { user_stats, ...userRest } = r;
      return {
        ...userRest,
        ...(stats || {})
      };
    });

    // Sort flattened rows by total_runs descending
    rows.sort((a, b) => (b.total_runs || 0) - (a.total_runs || 0));

    return res.json({ rows });
  } catch (err) {
    console.error('[/api/admin/analytics] Error:', err.message);
    return res.status(500).json({ error: err.message });
  }
});

// ── Health endpoint ───────────────────────────────────────────────────────────
// ISSUE 6 FIX: Public callers only get { ok: true }.
// Full diagnostics (engine, queue, uptime) are only returned to verified admins.
app.get('/api/health', apiLimiter, async (req, res) => {
  // Check if the caller is a verified admin
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim();
  let isAdmin = false;
  if (token) {
    const u = await verifySupabaseToken(token);
    if (u?.email && ADMIN_EMAILS.includes(u.email.toLowerCase())) {
      isAdmin = true;
    }
  }

  if (!isAdmin) {
    // Minimal public response — no internal architecture info
    return res.json({ ok: true });
  }

  // Full diagnostics for admins only
  const docker   = await isDockerReady();
  const localGcc = await isLocalGccReady();
  return res.json({
    ok:     true,
    docker,
    localGcc,
    engine: docker ? 'docker' : (localGcc ? 'local-gcc' : 'wandbox'),
    queue:  queue ? { size: queue.size, pending: queue.pending } : null,
    uptime: Math.round(process.uptime()),
  });
});

// ── WebSocket ticket endpoint (ISSUE 7 FIX) ────────────────────────────────────
// Exchange a valid Supabase JWT for a short-lived (30s) single-use WS ticket.
// The client uses the ticket ID in the WS URL instead of the full JWT,
// so the JWT never appears in server access logs or browser history.
app.post('/api/ws-ticket', apiLimiter, async (req, res) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!token) return res.status(401).json({ error: 'No token' });

  const user = await verifySupabaseToken(token);
  if (!user?.id) return res.status(401).json({ error: 'Invalid or expired session' });

  const ticketId  = randomUUID();
  const expiresAt = Date.now() + 30_000; // 30 seconds
  WS_TICKETS.set(ticketId, { userId: user.id, userEmail: user.email, expiresAt });

  return res.json({ ticket: ticketId, expiresIn: 30 });
});


// ── POST /api/compile  (legacy batch mode) ────────────────────────────────────
// 🔒 PROTECTED: Requires a valid Supabase JWT — unauthenticated users cannot run code.
app.post('/api/compile', compileLimiter, async (req, res) => {
  // Auth check — must be a logged-in user
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Please log in to compile code.' });
  }
  const compileUser = await verifySupabaseToken(token);
  if (!compileUser?.id) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired session. Please log in again.' });
  }

  const { code = '', stdin = '' } = req.body ?? {};

  if (typeof code !== 'string' || !code.trim()) {
    return res.status(400).json({ error: 'code is required and must be a non-empty string' });
  }
  if (Buffer.byteLength(code, 'utf8') > MAX_CODE_BYTES) {
    return res.status(400).json({ error: `Code too large (max ${MAX_CODE_BYTES / 1000} KB)` });
  }
  if (typeof stdin !== 'string') {
    return res.status(400).json({ error: 'stdin must be a string' });
  }
  if (Buffer.byteLength(stdin, 'utf8') > MAX_STDIN_BYTES) {
    return res.status(400).json({ error: `Stdin too large (max ${MAX_STDIN_BYTES / 1000} KB)` });
  }

  if (queue && queue.size >= QUEUE_MAX_SIZE) {
    return res.status(503).json({
      error:   'Server is busy',
      message: 'Too many programs queued. Please try again.',
    });
  }

  try {
    const result = await (queue
      ? queue.add(() => execute(code, stdin))
      : execute(code, stdin)
    );
    return res.json(result);
  } catch (err) {
    console.error('[/api/compile] Unexpected error:', err);
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
});

// ── Serve built React app in production ──────────────────────────────────────
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));

  // /app route serves the React editor — requires a valid Supabase JWT cookie/header.
  // This is a defence-in-depth guard; the React app also redirects to /login.html.
  app.get('/app', apiLimiter, async (req, res) => {
    // Accept token only from Authorization header (prevent query parameter leakage)
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';

    const appUser = token ? await verifySupabaseToken(token) : null;
    if (!appUser?.id) {
      // Not authenticated — redirect to login
      return res.redirect('/login.html');
    }
    res.sendFile(path.join(distDir, 'app.html'));
  });

  // Root and any other non-API route serves the landing page
  app.get('*', apiLimiter, (req, res) => {
    // Prevent 404 error message from reflecting the raw request path
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  // Dev fallback — Vite handles the frontend
  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
}

// ── Create HTTP server and attach WebSocket ───────────────────────────────────
// SECURITY NOTE — HTTP vs HTTPS: The server intentionally listens on plain HTTP.
// TLS is terminated by Render's edge load-balancer before traffic reaches this
// process.  All external traffic is therefore served over HTTPS; the HTTP
// listener is only reachable inside Render's private network.
const server = http.createServer(app);
attachWebSocketServer(server);

server.listen(PORT, () => {
  // NOTE: The URLs below are LOCAL DEVELOPMENT addresses only.
  // In production, all traffic goes through Render's HTTPS/WSS edge (TLS terminated).
  console.log(`\n  ╔══════════════════════════════════════════════╗`);
  console.log(`  ║   smart-compiler API + WebSocket server      ║`);
  console.log(`  ║   http://localhost:${PORT}                      ║`);
  console.log(`  ╚══════════════════════════════════════════════╝\n`);
  console.log(`  Health:        http://localhost:${PORT}/api/health`);
  console.log(`  Batch compile: POST http://localhost:${PORT}/api/compile`);
  console.log(`  Interactive:   ws://localhost:${PORT}/ws/run  (wss:// in production)\n`);
});
