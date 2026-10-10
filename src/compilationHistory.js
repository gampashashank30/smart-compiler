/**
 * compilationHistory.js
 *
 * Lightweight reactive store that persists each compile attempt to
 * localStorage per-language so the user can review past runs across page refreshes.
 *
 * Separate storage keys:
 *   - sc_history_c
 *   - sc_history_python
 *   - sc_history_java
 *
 * Each entry:
 * {
 *   id        : string   — unique id
 *   timestamp : number   — Date.now()
 *   language  : 'c' | 'python' | 'java'
 *   code      : string   — source code that was compiled
 *   status    : 'success' | 'error'
 *   exitCode  : number | null
 *   timeMs    : number | null   — elapsed ms (null for compile errors)
 *   output    : string   — human-readable output/error text
 *   stdout    : string   — captured program stdout
 *   errorType : string | null   — 'compile-error' | 'runtime' | null
 * }
 */

const STORAGE_KEY_PREFIX = 'sc_history_';
const LEGACY_STORAGE_KEY = 'sc_compilation_history';

/**
 * Maximum local entries to keep in localStorage per language.
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

function getStorageKey(lang = 'c') {
  return `${STORAGE_KEY_PREFIX}${lang || 'c'}`;
}

function loadFromStorage(lang = 'c') {
  try {
    const key = getStorageKey(lang);
    let raw = localStorage.getItem(key);
    if (!raw && lang === 'c') {
      // Migrate legacy storage key if present
      const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyRaw) {
        try {
          const parsed = JSON.parse(legacyRaw);
          saveToStorage(parsed, 'c');
          return parsed;
        } catch {}
      }
    }
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveToStorage(entries, lang = 'c') {
  try {
    const key = getStorageKey(lang);
    localStorage.setItem(key, JSON.stringify(entries));
  } catch {
    // quota exceeded — silent fail
  }
}

// ── Store ─────────────────────────────────────────────────────────────────────

function createHistoryStore() {
  let activeLanguage = 'c';
  const entriesByLang = {
    c:      loadFromStorage('c'),
    python: loadFromStorage('python'),
    java:   loadFromStorage('java'),
  };
  const listeners = new Set();

  function notify() {
    const current = [...(entriesByLang[activeLanguage] || [])];
    listeners.forEach((fn) => {
      try { fn(current); } catch {}
    });
  }

  return {
    /** Set current active language filter ('c' | 'python' | 'java') */
    setActiveLanguage(lang) {
      if (!lang || activeLanguage === lang) return;
      activeLanguage = lang;
      // Reload from storage in case it changed in another tab
      if (!entriesByLang[lang]) {
        entriesByLang[lang] = loadFromStorage(lang);
      }
      notify();
    },

    getActiveLanguage() {
      return activeLanguage;
    },

    /** Push a new compilation entry */
    record(entry) {
      const lang = entry.language || activeLanguage || 'c';
      if (!entriesByLang[lang]) entriesByLang[lang] = [];

      const newEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
        language: lang,
        filename: entry.filename || (lang === 'java' ? 'Main.java' : lang === 'python' ? 'main.py' : 'main.c'),
        code: (entry.code ?? '').slice(0, 5000),
        status: entry.status ?? 'error',
        exitCode: entry.exitCode ?? null,
        timeMs: entry.timeMs ?? null,
        output: stripAnsi(entry.output ?? '').slice(0, 10000),
        stdout: stripAnsi(entry.stdout ?? entry.output ?? '').slice(0, 10000),
        errorType: entry.errorType ?? null,
        killed: entry.killed ?? false,
      };

      entriesByLang[lang] = [newEntry, ...entriesByLang[lang]].slice(0, MAX_ENTRIES);
      saveToStorage(entriesByLang[lang], lang);
      notify();
    },

    /** Delete a single entry by id */
    delete(id, lang = null) {
      const targetLang = lang || activeLanguage;
      if (entriesByLang[targetLang]) {
        entriesByLang[targetLang] = entriesByLang[targetLang].filter((e) => e.id !== id);
        saveToStorage(entriesByLang[targetLang], targetLang);
      } else {
        // Search all languages if lang wasn't specified
        for (const l of Object.keys(entriesByLang)) {
          entriesByLang[l] = entriesByLang[l].filter((e) => e.id !== id);
          saveToStorage(entriesByLang[l], l);
        }
      }
      notify();
    },

    /** Clear all entries for a language (or current active language) */
    clearAll(lang = null) {
      const targetLang = lang || activeLanguage;
      entriesByLang[targetLang] = [];
      saveToStorage([], targetLang);
      notify();
    },

    /** Get a snapshot of entries (newest-first) for a language */
    getAll(lang = null) {
      const targetLang = lang || activeLanguage;
      return [...(entriesByLang[targetLang] || [])];
    },

    /** Subscribe to changes; returns unsubscribe fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}

export const compilationHistoryStore = createHistoryStore();
