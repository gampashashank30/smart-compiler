// src/highlight.js — Pure JS C, Python, and Java syntax highlighter (no dependencies)
//
// SECURITY: Every character of user-supplied code is passed through esc() before
// being placed in an HTML string.  esc() HTML-encodes &, <, >, ", ', and /,
// which is sufficient to prevent XSS.  Callers may safely use the returned
// string with dangerouslySetInnerHTML — no additional sanitization is required.

const C_KEYWORDS = new Set([
  'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
  'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int',
  'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static',
  'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while'
]);

const PYTHON_KEYWORDS = new Set([
  'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
  'def', 'del', 'elif', 'else', 'except', 'False', 'finally', 'for', 'from',
  'global', 'if', 'import', 'in', 'is', 'lambda', 'None', 'nonlocal', 'not',
  'or', 'pass', 'raise', 'return', 'True', 'try', 'while', 'with', 'yield',
  'self', 'print', 'range', 'len', 'int', 'str', 'float', 'list', 'dict', 'set', 'bool'
]);

const JAVA_KEYWORDS = new Set([
  'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
  'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
  'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
  'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new',
  'package', 'private', 'protected', 'public', 'return', 'short', 'static',
  'strictfp', 'super', 'switch', 'synchronized', 'this', 'throw', 'throws',
  'transient', 'try', 'void', 'volatile', 'while', 'true', 'false', 'null',
  'String', 'System', 'out', 'println', 'print', 'Scanner'
]);

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// span() always calls esc() on the content — class names are hard-coded literals.
function span(cls, s) {
  return `<span class="hl-${cls}">${esc(s)}</span>`;
}

/**
 * Tokenize and highlight code for a given language ('c', 'python', 'java').
 * Returns an HTML string safe to inject via dangerouslySetInnerHTML.
 */
export function highlightCode(code, lang = 'c') {
  if (!code) return '';
  const normalizedLang = (lang || 'c').toLowerCase();

  const isPython = normalizedLang === 'python';
  const isJava = normalizedLang === 'java';
  const keywords = isPython ? PYTHON_KEYWORDS : isJava ? JAVA_KEYWORDS : C_KEYWORDS;

  let result = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    // ── Python triple quotes ──────────────────────────────────────────────────
    if (isPython && (code.slice(i, i + 3) === '"""' || code.slice(i, i + 3) === "'''")) {
      const q = code.slice(i, i + 3);
      const end = code.indexOf(q, i + 3);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end + 3);
      result += span('string', tok);
      i += tok.length;
      continue;
    }

    // ── Python line comments (# ...) ──────────────────────────────────────────
    if (isPython && code[i] === '#') {
      const end = code.indexOf('\n', i);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end);
      result += span('comment', tok);
      i += tok.length;
      continue;
    }

    // ── C / Java Line comment ─────────────────────────────────────────────────
    if (!isPython && code[i] === '/' && code[i + 1] === '/') {
      const end = code.indexOf('\n', i);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end);
      result += span('comment', tok);
      i += tok.length;
      continue;
    }

    // ── C / Java Block comment ────────────────────────────────────────────────
    if (!isPython && code[i] === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      result += span('comment', tok);
      i += tok.length;
      continue;
    }

    // ── C Preprocessor (#include, #define …) ──────────────────────────────────
    if (!isPython && code[i] === '#') {
      const end = code.indexOf('\n', i);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end);
      const match = tok.match(/^(#\s*\w+)(\s+)?(.*)?$/);
      if (match) {
        result += span('preproc', match[1]);
        if (match[2]) result += esc(match[2]);
        if (match[3]) result += span('preproc-val', match[3]);
      } else {
        result += span('preproc', tok);
      }
      i += tok.length;
      continue;
    }

    // ── String literal ────────────────────────────────────────────────────────
    if (code[i] === '"') {
      let j = i + 1;
      while (j < len && code[j] !== '"') {
        if (code[j] === '\\') j++;
        j++;
      }
      if (j < len) j++; // include closing quote
      result += span('string', code.slice(i, j));
      i = j;
      continue;
    }

    // ── Char / Single-quote literal ───────────────────────────────────────────
    if (code[i] === "'") {
      let j = i + 1;
      while (j < len && code[j] !== "'") {
        if (code[j] === '\\') j++;
        j++;
      }
      if (j < len) j++;
      result += span('string', code.slice(i, j));
      i = j;
      continue;
    }

    // ── Number literal ────────────────────────────────────────────────────────
    if (/[0-9]/.test(code[i])) {
      const m = code.slice(i).match(
        /^(0[xX][0-9a-fA-F]+[uUlL]*|0[bB][01]+[uUlL]*|\d+(?:\.\d*)?(?:[eE][+-]?\d+)?[fFlLuU]*)/
      );
      if (m) {
        result += span('number', m[0]);
        i += m[0].length;
        continue;
      }
    }

    // ── Identifier / keyword / function call ─────────────────────────────────
    if (/[a-zA-Z_]/.test(code[i])) {
      const m = code.slice(i).match(/^[a-zA-Z_]\w*/);
      if (m) {
        const word = m[0];
        let j = i + word.length;
        while (j < len && (code[j] === ' ' || code[j] === '\t')) j++;
        const isCall = code[j] === '(';

        if (keywords.has(word)) {
          result += span('keyword', word);
        } else if (isCall) {
          result += span('function', word);
        } else {
          result += esc(word);
        }
        i += word.length;
        continue;
      }
    }

    // ── Two-character operators ───────────────────────────────────────────────
    const two = code.slice(i, i + 2);
    if ([
      '==', '!=', '<=', '>=', '&&', '||', '++', '--', '->',
      '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<', '>>', '**', '//'
    ].includes(two)) {
      result += span('operator', two);
      i += 2;
      continue;
    }

    // ── Single-character operators ────────────────────────────────────────────
    if ('+-*/%=<>!&|^~?:.'.includes(code[i])) {
      result += span('operator', code[i]);
      i++;
      continue;
    }

    // ── Punctuation ───────────────────────────────────────────────────────────
    if ('{}[]();,'.includes(code[i])) {
      result += span('punctuation', code[i]);
      i++;
      continue;
    }

    // ── Everything else (whitespace, newlines, etc.) ──────────────────────────
    result += esc(code[i]);
    i++;
  }

  return result;
}

/**
 * Tokenize and highlight C source code (backwards-compatible alias).
 */
export function highlightC(code) {
  return highlightCode(code, 'c');
}