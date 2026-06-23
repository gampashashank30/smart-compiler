/**
 * unescapeStructuralNewlines
 *
 * Some LLMs double-escape every newline so structural line breaks (between
 * C statements) arrive as the two-character sequence backslash-n.
 *
 * This function converts ONLY structural \n sequences (outside C string
 * literals) back to real newlines. C-string escapes like printf("hello\n")
 * are left intact so the code compiles and runs correctly.
 *
 * @param {string} code - Raw code string possibly containing \\n sequences
 * @returns {string}    - Code with structural newlines restored
 */
export function unescapeStructuralNewlines(code) {
  let result  = '';
  let inDoubleQuote = false; // inside a C double-quoted string
  let inSingleQuote = false; // inside a C single-quoted character constant
  let i       = 0;

  while (i < code.length) {
    const ch   = code[i];
    const next = code[i + 1];

    if (inDoubleQuote) {
      if (ch === '\\') {
        // Any escape sequence inside a string — copy both chars as-is
        result += ch + (next ?? '');
        i += 2;
        continue;
      }
      if (ch === '"') {
        inDoubleQuote = false; // closing quote
      }
      result += ch;
      i++;
    } else if (inSingleQuote) {
      if (ch === '\\') {
        // Any escape sequence inside a character literal — copy both chars as-is
        result += ch + (next ?? '');
        i += 2;
        continue;
      }
      if (ch === "'") {
        inSingleQuote = false; // closing quote
      }
      result += ch;
      i++;
    } else {
      if (ch === '"') {
        inDoubleQuote = true; // opening double quote
        result += ch;
        i++;
        continue;
      }
      if (ch === "'") {
        inSingleQuote = true; // opening single quote
        result += ch;
        i++;
        continue;
      }
      // Outside quotes: convert \n sequence → real newline
      if (ch === '\\' && next === 'n') {
        result += '\n';
        i += 2;
        continue;
      }
      // Outside quotes: convert \t sequence → real tab
      if (ch === '\\' && next === 't') {
        result += '\t';
        i += 2;
        continue;
      }
      result += ch;
      i++;
    }
  }

  return result;
}

/**
 * sanitizeAiCode
 *
 * Cleans up AI-generated C code before injecting it into the editor.
 * Handles the two most common LLM output artifacts:
 *   1. Markdown code fences (```c ... ```)
 *   2. Double-escaped structural newlines (\\n between lines)
 *
 * @param {string} rawCode - Raw code string from the AI
 * @returns {string}       - Clean, editor-ready code
 */
export function sanitizeAiCode(rawCode) {
  if (!rawCode) return '';

  // 1. Strip accidental markdown fences
  let code = rawCode
    .replace(/^```[\w]*\n?/m, '')
    .replace(/\n?```$/m, '')
    .trim();

  // 2. If there are NO real newlines but there ARE literal \n sequences,
  //    the entire code is double-escaped — unescape all structural \n.
  if (!code.includes('\n') && code.includes('\\n')) {
    code = unescapeStructuralNewlines(code);
  }

  return code;
}
