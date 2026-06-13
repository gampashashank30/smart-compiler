// API utility — Groq (AI) + Piston (real C execution)

// ─── Groq / AI ──────────────────────────────────────────────────────────────
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL   = 'llama-3.3-70b-versatile';
const API_KEY      = import.meta.env.VITE_GROQ_API_KEY || '';

/**
 * Call the Groq API (OpenAI-compatible)
 * @param {string} systemPrompt
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
export async function callClaude(systemPrompt, userMessage) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      max_tokens: 4096,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: userMessage  },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`API error ${response.status}: ${errBody}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? '';
}

/**
 * Parse JSON safely from AI response.
 * Strips markdown code fences if the model wraps the JSON.
 */
export function parseJSON(raw) {
  let text = raw.trim();
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  return JSON.parse(text);
}

// ─── C Code Execution — via smart-compiler backend ──────────────────────────
// The backend (server/index.js) decides whether to use Docker or Piston.
// The frontend never needs to know which engine ran the code.
// In dev: Vite proxies /api → http://localhost:3001 (see vite.config.js)
// In prod: same path, served from the same origin or a configured API_URL.
const COMPILE_URL = '/api/compile';

/**
 * Compile and execute C code via the smart-compiler backend.
 *
 * @param {string} code   - Full C source code
 * @param {string} stdin  - Program input (may be empty string)
 * @returns {Promise<{
 *   success: boolean,
 *   stdout: string,
 *   stderr: string,
 *   exitCode: number,
 *   signal: string|null,
 *   killed: boolean,
 *   compileError: boolean,
 *   timeMs: number,
 *   engine: 'docker'|'piston'
 * }>}
 */
export async function compileC(code, stdin = '') {
  const startTime = performance.now();

  let response;
  try {
    response = await fetch(COMPILE_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ code, stdin }),
    });
  } catch (err) {
    // Network error — backend not running or no internet
    const msg = err.message.includes('fetch')
      ? 'Cannot connect to the compiler server. Make sure it is running:\n  cd server && npm install && node index.js'
      : `Network error: ${err.message}`;
    return {
      success: false, stdout: '', stderr: msg,
      exitCode: -1, signal: null, killed: false,
      compileError: false,
      timeMs: Math.round(performance.now() - startTime),
      engine: 'unknown',
    };
  }

  // Handle HTTP errors from the backend
  if (!response.ok) {
    let errorMsg = `Server error ${response.status}`;
    try {
      const body = await response.json();
      errorMsg = body.message || body.error || errorMsg;
    } catch { /* ignore parse error */ }

    return {
      success: false, stdout: '', stderr: errorMsg,
      exitCode: -1, signal: null, killed: false,
      compileError: false,
      timeMs: Math.round(performance.now() - startTime),
      engine: 'unknown',
    };
  }

  const result = await response.json();
  // Backend already returns the normalised result — pass it straight through
  return result;
}

