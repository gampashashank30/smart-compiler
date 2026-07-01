// API utility — Groq (AI) + C execution

// ─── Groq / AI ──────────────────────────────────────────────────────────────
// The Groq API key lives on the SERVER (process.env.GROQ_API_KEY).
// The frontend calls our own /api/ai endpoint — never Groq directly.
// This keeps the key off the frontend bundle and works without rebuilding.

import { analyticsStore } from './analytics.js';
import { supabase } from './supabaseClient.js';

/**
 * Call the Groq API via the server-side proxy (/api/ai)
 * @param {string} systemPrompt
 * @param {string} userMessage
 * @returns {Promise<string>}
 */
export async function callClaude(systemPrompt, userMessage) {
  // Enforce the 15,000 token limit per user
  if (analyticsStore.isLimitReached()) {
    throw new Error('AI Limit Reached: You have used all of your 15,000 free AI tokens. Upgrade to continue.');
  }

  // Attach the Supabase JWT so the server can verify the user is logged in
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token || '';

  const response = await fetch('/api/ai', {
    method:  'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ systemPrompt, userMessage }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`API error ${response.status}: ${errBody}`);
  }

  const data = await response.json();

  // Reload the authoritative token count from DB so the local counter stays accurate.
  // The server already wrote the correct new total — we just need to reflect it locally.
  if (data.usage?.total_tokens) {
    analyticsStore.recordTokens(data.usage.total_tokens);
  }

  return data.content ?? '';
}


/**
 * Parse JSON safely from AI response.
 * Strips markdown code fences if the model wraps the JSON.
 */
/**
 * Fix raw control characters (newlines, tabs, carriage returns) that some LLMs
 * mistakenly place inside JSON string values — which makes JSON.parse throw
 * "Bad control character in string literal".
 * Uses a simple state machine to track when we're inside a string.
 */
function sanitizeRawControlChars(text) {
  let result = '';
  let inString = false;
  let escaped  = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (escaped) {
      // Previous char was a backslash inside a string — emit as-is, clear flag
      result  += ch;
      escaped  = false;
      continue;
    }

    if (ch === '\\' && inString) {
      // Start of an escape sequence — emit backslash and set flag
      result  += ch;
      escaped  = true;
      continue;
    }

    if (ch === '"') {
      // Toggle string-mode on every unescaped double-quote
      inString = !inString;
      result   += ch;
      continue;
    }

    if (inString) {
      // Inside a JSON string — raw control chars are illegal; escape them
      if (ch === '\n') { result += '\\n';  continue; }
      if (ch === '\r') { result += '\\r';  continue; }
      if (ch === '\t') { result += '\\t';  continue; }
    }

    result += ch;
  }

  return result;
}

/**
 * Parse JSON safely from AI response.
 * Strips markdown code fences if the model wraps the JSON,
 * then falls back to sanitization if the first parse attempt fails.
 */
export function parseJSON(raw) {
  const text = raw.trim();

  // Stage 1: Try to extract from markdown code fences first
  const fenceRegex = /```(?:[a-zA-Z0-9+#-]+)?\s*([\s\S]*?)\s*```/;
  const fenceMatch = text.match(fenceRegex);
  if (fenceMatch) {
    const content = fenceMatch[1].trim();
    try {
      return JSON.parse(content);
    } catch (_) {
      try {
        return JSON.parse(sanitizeRawControlChars(content));
      } catch (_) {
        // If code fence contents failed to parse, fall through to other strategies
      }
    }
  }

  // Stage 2: Try to extract a JSON array [...] FIRST.
  // This must come before the object search because when the response contains
  // a JSON array like [{...},{...}], searching for the last '}' would extract
  // only the last object element, destroying the array structure.
  const firstBracket = text.indexOf('[');
  const lastBracket  = text.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    // Only try array extraction if '[' appears before any '{', OR if the text
    // starts with '[' — so we don't accidentally grab an array that's nested
    // inside a larger object when the outer object is what we actually want.
    const firstBrace = text.indexOf('{');
    if (firstBrace === -1 || firstBracket <= firstBrace) {
      const content = text.substring(firstBracket, lastBracket + 1);
      try {
        return JSON.parse(content);
      } catch (_) {
        try {
          return JSON.parse(sanitizeRawControlChars(content));
        } catch (_) {
          // Fall through to object search
        }
      }
    }
  }

  // Stage 3: Try to extract the JSON object {...}
  // Search from right-to-left (last to first) to find the start of the JSON block.
  const lastBrace = text.lastIndexOf('}');
  if (lastBrace !== -1) {
    let searchIndex = text.length;
    while (true) {
      const braceIndex = text.lastIndexOf('{', searchIndex);
      if (braceIndex === -1) break;
      const content = text.substring(braceIndex, lastBrace + 1);
      try {
        return JSON.parse(content);
      } catch (_) {
        try {
          return JSON.parse(sanitizeRawControlChars(content));
        } catch (_) {
          // Continue searching leftwards
        }
      }
      searchIndex = braceIndex - 1;
    }
  }

  // Stage 4: Object search failed — try the full array range now (covers nested arrays inside objects)
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    const content = text.substring(firstBracket, lastBracket + 1);
    try {
      return JSON.parse(content);
    } catch (_) {
      try {
        return JSON.parse(sanitizeRawControlChars(content));
      } catch (_) {
        // Fall through
      }
    }
  }

  // Stage 5: Fallback to direct parse of the entire string
  try {
    return JSON.parse(text);
  } catch (_) {
    return JSON.parse(sanitizeRawControlChars(text));
  }
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

