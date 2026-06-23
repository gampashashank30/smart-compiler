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

// Load root .env for local dev (no-op on Render where env vars come from the dashboard)
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express        = require('express');
const rateLimit      = require('express-rate-limit');
const { execute, isDockerReady, isLocalGccReady, resetDockerCache } = require('./executor');
const { attachWebSocketServer } = require('./ws-executor');

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

// Supabase config for JWT verification (server-side, anon key is fine here)
const SUPABASE_URL      = process.env.VITE_SUPABASE_URL      || 'https://ibztlqnbjvqpsfgigqop.supabase.co';
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_C98fRiosjZ7xX3_nFFvc7Q_wTVXBfzW';

// Allowed origins — requests from other origins are rejected
const ALLOWED_ORIGINS = [
  'https://smartcompiler.maadiotsolutions.co.in',
  'http://localhost:5173',
  'http://localhost:3001',
];

/**
 * Verify a Supabase access token by calling Supabase's /auth/v1/user endpoint.
 * Returns the user object if valid, or null if invalid/expired.
 */
async function verifySupabaseToken(token) {
  if (!token) return null;
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
const app = express();
app.use(express.json({ limit: '150kb' }));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ── Rate limiter ─────────────────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs:         60 * 1000,
  max:              30,
  standardHeaders:  true,
  legacyHeaders:    false,
  message: { error: 'Too many requests', message: 'Please wait a minute.' },
});
app.use('/api/compile', limiter);

// ── AI proxy endpoint ─────────────────────────────────────────────────────────
// Calls Groq (or Z.AI) from the server so the API key stays off the frontend bundle.
// Supports up to 3 API keys with automatic fallback when one hits a rate limit.
// 🔒 PROTECTED: Requires a valid Supabase JWT (logged-in user) + allowed origin.
app.post('/api/ai', async (req, res) => {
  // ── 1. Origin check ──────────────────────────────────────────────────────
  const origin = req.headers.origin || '';
  const isAllowedOrigin = ALLOWED_ORIGINS.some(o => origin.startsWith(o));
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

  // Build the key rotation pool — filter out empty / placeholder values
  const PLACEHOLDER = 'your_second_api_key_here';
  const allKeys = [
    process.env.GROQ_API_KEY   || process.env.VITE_GROQ_API_KEY,
    process.env.GROQ_API_KEY_2,
    process.env.GROQ_API_KEY_3,
  ].filter((k) => k && k.trim() && !k.startsWith(PLACEHOLDER) && !k.includes('your_'));

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
      if (isZai) payload.thinking = { type: 'disabled' };

      const response = await fetch(apiUrl, {
        method:  'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.status === 429 || response.status === 401) {
        // Rate-limited or bad key — try the next key
        const reason = response.status === 429 ? 'rate-limited' : 'auth error';
        console.warn(`[/api/ai] Key #${i + 1} ${reason} — trying next key...`);
        lastError = data?.error?.message || `Key #${i + 1} ${reason}`;
        continue; // 👈 move to next key
      }

      if (!response.ok) {
        return res.status(response.status).json({ error: data?.error?.message || 'AI API error' });
      }

      // ✅ Success — return the result (include which key index was used for transparency)
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


// ── Health endpoint ───────────────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  resetDockerCache();
  const docker = await isDockerReady();
  const localGcc = await isLocalGccReady();
  res.json({
    ok:     true,
    docker,
    localGcc,
    engine: docker ? 'docker' : (localGcc ? 'local-gcc' : 'wandbox'),
    queue:  queue ? { size: queue.size, pending: queue.pending } : null,
    uptime: Math.round(process.uptime()),
  });
});

// ── POST /api/compile  (legacy batch mode) ────────────────────────────────────
app.post('/api/compile', async (req, res) => {
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

  // Clean /app route serves the React editor
  app.get('/app', (req, res) => {
    res.sendFile(path.join(distDir, 'app.html'));
  });

  // Root and any other non-API route serves the landing page
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  // Dev fallback — Vite handles the frontend
  app.use((req, res) => {
    res.status(404).json({ error: `No route: ${req.method} ${req.path}` });
  });
}

// ── Create HTTP server and attach WebSocket ───────────────────────────────────
const server = http.createServer(app);
attachWebSocketServer(server);

server.listen(PORT, () => {
  console.log(`\n  ╔══════════════════════════════════════════════╗`);
  console.log(`  ║   smart-compiler API + WebSocket server      ║`);
  console.log(`  ║   http://localhost:${PORT}                      ║`);
  console.log(`  ╚══════════════════════════════════════════════╝\n`);
  console.log(`  Health:        http://localhost:${PORT}/api/health`);
  console.log(`  Batch compile: POST http://localhost:${PORT}/api/compile`);
  console.log(`  Interactive:   ws://localhost:${PORT}/ws/run\n`);
});
