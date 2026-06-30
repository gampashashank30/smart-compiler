/**
 * bugTracker.js — Session-scoped analytics store for SmartCompiler
 *
 * Architecture:
 *   • Primary storage: sessionStorage (survives React re-renders, cleared on tab close)
 *   • Future: swap _persist / _hydrate for Supabase calls when auth is ready
 *   • Listeners pattern: any React component can subscribe for reactive updates
 *
 * Supabase readiness:
 *   The `_persist` and `_hydrate` methods are the ONLY places that touch storage.
 *   To enable Supabase, replace their bodies with supabase.from('bug_events').insert/select
 *   and keep the rest of the module unchanged.
 */

// ─── Error type definitions ──────────────────────────────────────────────────
export const ERROR_TYPES = {
  // ── Compile-time errors ────────────────────────────────────────────────────
  'Missing Semicolon':           { icon: ';',  color: '#f59e0b', bg: '#fffbeb' },  // amber
  'Undeclared Variable':         { icon: 'x',  color: '#f97316', bg: '#fff7ed' },  // orange  (was red — too close to Runtime Crash)
  'Uninitialized Variable':      { icon: '!',  color: '#fb923c', bg: '#fff7ed' },  // light orange
  'Unclosed String':             { icon: '"',  color: '#10b981', bg: '#ecfdf5' },  // emerald green
  'Missing Parenthesis':         { icon: '()', color: '#d946ef', bg: '#fdf4ff' },  // fuchsia/magenta (was rose-red — merged with Runtime Crash)
  'Missing Brace/Bracket':       { icon: '}',  color: '#3b82f6', bg: '#eff6ff' },  // blue
  'Missing < or >':              { icon: '<>', color: '#06b6d4', bg: '#ecfeff' },  // cyan
  'Missing # Directive':         { icon: '#',  color: '#7c3aed', bg: '#f5f3ff' },  // violet
  'Implicit Declaration':        { icon: 'ƒ',  color: '#8b5cf6', bg: '#f5f3ff' },  // purple
  'Type Mismatch':               { icon: '≠',  color: '#ec4899', bg: '#fdf2f8' },  // pink
  'Array Out of Bounds':         { icon: '[]', color: '#6366f1', bg: '#eef2ff' },  // indigo
  'Unused Variable':             { icon: '~',  color: '#64748b', bg: '#f8fafc' },  // slate
  'Format Specifier Mismatch':   { icon: '%',  color: '#0ea5e9', bg: '#f0f9ff' },  // sky blue
  'Compilation Error':           { icon: '?',  color: '#6b7280', bg: '#f9fafb' },  // gray

  // ── Runtime types ──────────────────────────────────────────────────────────
  'Infinite Loop / TLE':         { icon: '∞',  color: '#eab308', bg: '#fefce8' },  // yellow
  'Runtime Crash':               { icon: '💥', color: '#dc2626', bg: '#fef2f2' },  // red  (kept — canonical danger red)
  'Segmentation Fault':          { icon: '⚡', color: '#9f1239', bg: '#fff1f2' },  // deep crimson (was too close to Runtime Crash red)
  'Successful Run':              { icon: '✓',  color: '#059669', bg: '#ecfdf5' },  // emerald
};

// ─── Regex classifiers (compile-time) ────────────────────────────────────────────
const COMPILE_CLASSIFIERS = [
  // ── More specific patterns first — cascading errors often produce
  //    generic "expected ';'" messages that hide the real root cause ──
  { type: 'Missing Parenthesis',       re: /error:.*expected\s+'[()]/i },
  { type: 'Missing Brace/Bracket',     re: /error:.*expected\s+'[}\]]/i },
  { type: 'Missing Semicolon',         re: /error:.*expected\s+'[;,]/i },
  { type: 'Undeclared Variable',       re: /error:.*undeclared/i },
  { type: 'Uninitialized Variable',    re: /warning:.*uninitiali/i },
  // 'missing terminating > character' comes from #include <stdio.h missing the >
  // It must be checked BEFORE 'Unclosed String' which also uses "missing terminating"
  { type: 'Missing < or >',            re: /error:.*missing terminating\s+>|error:.*expected\s+'[<>]|error:.*missing '[<>]'|error:.*'[<>]'\s+expected/i },
  // Only match " or ' variant — NOT the > variant (that's caught above)
  { type: 'Unclosed String',           re: /error:.*missing terminating\s+["']/i },
  { type: 'Missing # Directive',       re: /error:.*\binclude\b.*undeclared|warning:.*implicit.*\binclude\b/i },
  { type: 'Implicit Declaration',      re: /warning:.*implicit declaration/i },
  { type: 'Type Mismatch',             re: /warning:.*incompatible|error:.*cannot convert/i },
  { type: 'Array Out of Bounds',       re: /warning:.*array.*bound|out of bound/i },
  { type: 'Unused Variable',           re: /warning:.*unused variable/i },
  { type: 'Format Specifier Mismatch', re: /warning:.*format|%d.*float|%f.*int/i },
];

/**
 * Classify a gcc stderr string → error subtype string.
 *
 * Strategy: run classifiers only against the FIRST error/warning line.
 * GCC cascades many secondary errors from one root cause — e.g. a missing ')'
 * on line 14 causes a spurious "expected ';'" on line 26.
 * By looking at only the first error line we get the true root cause.
 */
export function classifyCompileError(stderr) {
  if (!stderr) return 'Compilation Error';

  // Extract the first line that contains "error:" or "warning:"
  const firstErrorLine = stderr
    .split('\n')
    .find(l => /error:|warning:/i.test(l)) ?? stderr;

  for (const { type, re } of COMPILE_CLASSIFIERS) {
    if (re.test(firstErrorLine)) return type;
  }

  // Fallback: check full stderr (covers multi-line patterns like Unused Variable)
  for (const { type, re } of COMPILE_CLASSIFIERS) {
    if (re.test(stderr)) return type;
  }

  return 'Compilation Error';
}

/**
 * Extract the first line number from gcc stderr like  main.c:12:5: error:…
 */
export function extractLineHint(stderr) {
  if (!stderr) return null;
  const m = stderr.match(/main\.c:(\d+):/);
  return m ? parseInt(m[1], 10) : null;
}

// ─── Tip lookup table ─────────────────────────────────────────────────────────
export const TIPS = {
  'Missing Semicolon': [
    'Every C statement ends with a semicolon — if/for/while headers do NOT.',
    'Pro tip: compile after every few lines so errors stay localized.',
  ],
  'Undeclared Variable': [
    'Declare all variables at the top of main() or before first use.',
    'C89 requires declarations before any statements in a block.',
  ],
  'Uninitialized Variable': [
    'Always initialize variables when you declare them: int x = 0;',
    'Reading an uninitialized variable gives undefined behavior in C.',
  ],
  'Unclosed String': [
    'Every opening double-quote needs a matching closing double-quote on the same line.',
    'Escape an actual quote inside a string with backslash: \\"',
  ],
  'Missing Parenthesis': [
    'Every opening ( needs a matching closing ) — count them in each expression.',
    'Function calls need parentheses: printf("hi") not printf "hi".',
    'Condition in if/while/for must be wrapped in (): if (x > 0) not if x > 0.',
  ],
  'Missing Brace/Bracket': [
    'Use an editor with bracket matching to catch mismatched braces early.',
    'Indent your code consistently — misaligned braces are easier to spot.',
  ],
  'Missing < or >': [
    'In #include directives, angle brackets must be paired: #include <stdio.h>.',
    'In comparisons like if (a < b && c > d), check every < and > is present.',
    'Tip: read the error line carefully — gcc points to exactly where the < or > is missing.',
  ],
  'Missing # Directive': [
    'Preprocessor directives must start with #. Write #include <stdio.h>, not include <stdio.h>.',
    'The # sign tells the compiler this is a preprocessor command, not C code.',
    'Other directives also need #: #define, #pragma, #ifdef, #endif.',
  ],
  'Implicit Declaration': [
    'Include the correct header: #include <stdio.h> for printf/scanf.',
    'In C99+, calling a function before declaring/defining it is an error.',
  ],
  'Type Mismatch': [
    'Use explicit casts: (int)myFloat or (float)myInt when mixing types.',
    'Check printf format specifiers — %d for int, %f for float, %s for string.',
  ],
  'Array Out of Bounds': [
    'Array indices go from 0 to size-1. An array of 5 uses indices 0–4.',
    'Add bounds checks: if (i >= 0 && i < SIZE) before accessing arr[i].',
  ],
  'Unused Variable': [
    'Remove unused variables to keep code clean and avoid misleading readers.',
    'If the variable is intentionally unused, prefix with _ by convention.',
  ],
  'Format Specifier Mismatch': [
    'Use %d for int, %ld for long, %f for float, %lf for double, %s for char*.',
    'Mismatched specifiers cause undefined behavior — always match the type.',
  ],
  'Compilation Error': [
    'Read the full error message — gcc tells you exactly what went wrong.',
    'Fix errors top-down; one mistake early can cascade into many below it.',
  ],
  'Infinite Loop / TLE': [
    'Check your loop increment: make sure i++ is inside the loop body.',
    'Verify your loop condition — for(;;) and while(1) loop forever without a break.',
    'Common cause: forgetting to update the loop variable in a while loop.',
  ],
  'Runtime Crash': [
    'Check for null pointer dereferences and array out-of-bounds accesses.',
    'Use printf to debug — print variable values before the crash point.',
  ],
  'Segmentation Fault': [
    'A segfault usually means reading/writing memory you do not own.',
    'Common causes: null pointer, stack overflow from infinite recursion, out-of-bounds array.',
  ],
};

// ─── Storage adapters (swap these for Supabase later) ───────────────────────
const STORAGE_KEY = 'sc_bug_tracker_v1';

/**
 * Maximum events kept locally in sessionStorage.
 * When PostgreSQL is integrated, events beyond this cap will be
 * stored exclusively in the database — not in sessionStorage.
 * Exported so the Analytics panel can display the limit.
 */
export const MAX_SESSIONS = 50;

function _hydrate() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function _persist(sessions) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // sessionStorage full — silently ignore
  }
}

// ─── Store ───────────────────────────────────────────────────────────────────
export const bugTrackerStore = {
  sessions: _hydrate(),
  listeners: [],

  /**
   * Record a new analytics event.
   * @param {{ type: string, subtype: string, timestamp: number,
   *            timeMs: number|null, exitCode: number|null, lineHint: number|null,
   *            stderr: string }} event
   */
  record(event) {
    const entry = {
      id:        Date.now() + Math.random(),
      type:      event.type,        // 'compile-error' | 'runtime'
      subtype:   event.subtype,     // human-readable classification
      timestamp: event.timestamp ?? Date.now(),
      timeMs:    event.timeMs   ?? null,
      exitCode:  event.exitCode ?? null,
      lineHint:  event.lineHint ?? null,
      stderr:    event.stderr   ?? '',
    };
    // Keep only the most-recent MAX_SESSIONS entries.
    // Older entries will move to the PostgreSQL database once integrated.
    this.sessions = [...this.sessions, entry].slice(-MAX_SESSIONS);
    _persist(this.sessions);
    this._notify();
  },

  subscribe(fn) {
    this.listeners.push(fn);
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  },

  reset() {
    this.sessions = [];
    _persist([]);
    this._notify();
  },

  _notify() {
    const stats = this.getStats();
    for (const fn of this.listeners) fn(stats);
  },

  /**
   * Returns derived statistics for the UI.
   */
  getStats() {
    const sessions = this.sessions;

    // Total runs = compile-errors + successful/runtime done events
    const totalRuns = sessions.length;

    // Errors = everything that is NOT a successful run
    const errorEvents = sessions.filter(s => s.subtype !== 'Successful Run');
    const successEvents = sessions.filter(s => s.subtype === 'Successful Run');

    // Count by subtype
    const byType = {};
    for (const s of errorEvents) {
      byType[s.subtype] = (byType[s.subtype] ?? 0) + 1;
    }

    // Average fix time: time between first-error-of-type and next success
    let avgFixTime = null;
    if (errorEvents.length > 0 && successEvents.length > 0) {
      const firstError = errorEvents[0];
      const nextSuccess = successEvents.find(s => s.timestamp > firstError.timestamp);
      if (nextSuccess) {
        avgFixTime = Math.round((nextSuccess.timestamp - firstError.timestamp) / 1000);
      }
    }

    // Recent events (last 20)
    const recent = sessions.slice(-20).reverse();

    // Consecutive TLE count (from the end)
    let consecutiveTLE = 0;
    for (let i = sessions.length - 1; i >= 0; i--) {
      if (sessions[i].subtype === 'Infinite Loop / TLE') {
        consecutiveTLE++;
      } else {
        break;
      }
    }

    return {
      totalRuns,
      errors:   errorEvents.length,
      successes: successEvents.length,
      byType,
      recent,
      consecutiveTLE,
      avgFixTime,
    };
  },
};