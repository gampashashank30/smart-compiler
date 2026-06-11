// src/highlight.js — Pure JS C syntax highlighter (no dependencies)

const C_KEYWORDS = new Set([
  'auto', 'break', 'case', 'char', 'const', 'continue', 'default', 'do',
  'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if', 'int',
  'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static',
  'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile', 'while'
]);

function esc(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function span(cls, s) {
  return `<span class="hl-${cls}">${esc(s)}</span>`;
}

/**
 * Tokenize and highlight C source code.
 * Returns an HTML string safe to inject via dangerouslySetInnerHTML.
 */
export function highlightC(code) {
  let result = '';
  let i = 0;
  const len = code.length;

  while (i < len) {
    // ── Line comment ──────────────────────────────────────────────────────────
    if (code[i] === '/' && code[i + 1] === '/') {
      const end = code.indexOf('\n', i);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end);
      result += span('comment', tok);
      i += tok.length;
      continue;
    }

    // ── Block comment ─────────────────────────────────────────────────────────
    if (code[i] === '/' && code[i + 1] === '*') {
      const end = code.indexOf('*/', i + 2);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end + 2);
      result += span('comment', tok);
      i += tok.length;
      continue;
    }

    // ── Preprocessor (#include, #define …) ───────────────────────────────────
    if (code[i] === '#') {
      const end = code.indexOf('\n', i);
      const tok = end === -1 ? code.slice(i) : code.slice(i, end);
      // Color the directive itself, then the file/value slightly differently
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

    // ── Char literal ──────────────────────────────────────────────────────────
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
        // Look past whitespace to see if '(' follows → function call
        let j = i + word.length;
        while (j < len && (code[j] === ' ' || code[j] === '\t')) j++;
        const isCall = code[j] === '(';

        if (C_KEYWORDS.has(word)) {
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
      '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '<<', '>>'
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
