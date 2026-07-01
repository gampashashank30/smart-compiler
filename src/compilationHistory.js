/**
 * compilationHistory.js
 *
 * Lightweight reactive store that persists each compile attempt to
 * localStorage so the user can review past runs across page refreshes.
 *
 * Each entry:
 * {
 *   id        : string   — unique id
 *   timestamp : number   — Date.now()
 *   code      : string   — source code that was compiled
 *   status    : 'success' | 'error'
 *   exitCode  : number | null
 *   timeMs    : number | null   — elapsed ms (null for compile errors)
 *   output    : string   — human-readable output/error text
 *   errorType : string | null   — 'compile-error' | 'runtime' | null
 * }
 *
 * Note: Supabase sync is disabled. All data lives in localStorage only.
 * To re-enable cloud sync, restore supabase calls from git history.
 */

const STORAGE_KEY = 'sc_compilation_history';

/**
 * Maximum local entries to keep in localStorage.
 * Exported so the UI can display the limit.
 */
export const MAX_ENTRIES = 50;

// ── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Strip all ANSI / VT100 escape sequences from a string.
 */
function stripAnsi(str) {
  if (!str) return str;
  return str
    .replace(/\x1b\[[\x30-\x3f]*[\x20-\x2f]*[\x40-\x7e]/g, '')
    .replace(/\x1b\][^\x07\x1b]*(?:\x07|\x1b\\)/g, '')
    .replace(/\x1b[^\[\]]/g, '')
    .replace(/\x1b/g, '');
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveToStorage(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // quota exceeded — silent fail
  }
}

// ── Store ─────────────────────────────────────────────────────────────────────

function createHistoryStore() {
  let entries = loadFromStorage();
  const listeners = new Set();

  function notify() {
    const snapshot = [...entries];
    listeners.forEach((fn) => fn(snapshot));
  }

  return {
    /** Push a new compilation entry */
    record(entry) {
      const newEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
        code: (entry.code ?? '').slice(0, 5000),
        status: entry.status ?? 'error',
        exitCode: entry.exitCode ?? null,
        timeMs: entry.timeMs ?? null,
        output: stripAnsi(entry.output ?? '').slice(0, 10000),
        stdout: stripAnsi(entry.stdout ?? entry.output ?? '').slice(0, 10000),
        errorType: entry.errorType ?? null,
        killed: entry.killed ?? false,
      };

      entries = [newEntry, ...entries].slice(0, MAX_ENTRIES);
      saveToStorage(entries);
      notify();
    },

    /** Delete a single entry by id */
    delete(id) {
      entries = entries.filter((e) => e.id !== id);
      saveToStorage(entries);
      notify();
    },

    /** Clear all entries */
    clearAll() {
      entries = [];
      saveToStorage(entries);
      notify();
    },

    /** Get a snapshot of all entries (newest-first) */
    getAll() {
      return [...entries];
    },

    /** Subscribe to changes; returns unsubscribe fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}

export const compilationHistoryStore = createHistoryStore();
