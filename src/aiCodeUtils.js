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
  let inStr   = false; // inside a C double-quoted string
  let i       = 0;

  while (i < code.length) {
    const ch   = code[i];
    const next = code[i + 1];

    if (inStr) {
      if (ch === '\\') {
        // Any escape sequence inside a string — copy both chars as-is
        result += ch + (next ?? '');
        i += 2;
        continue;
      }
      if (ch === '"') {
        inStr = false; // closing quote
      }
      result += ch;
      i++;
    } else {
      if (ch === '"') {
        inStr = true; // opening quote
        result += ch;
        i++;
        continue;
      }
      // Outside a string: convert \n sequence → real newline
      if (ch === '\\' && next === 'n') {
        result += '\n';
        i += 2;
        continue;
      }
      // Outside a string: convert \t sequence → real tab
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
 * Handles the most common LLM output artifacts:
 *   1. Markdown code fences (```c ... ```)
 *   2. Literal \n sequences that the JSON serialiser produced INSIDE C string
 *      literals — e.g. printf("Hello\n") arriving as two display lines because
 *      JSON parse left the \n as two characters instead of a real newline.
 *
 * Strategy:
 *   - Always run the state-machine unescaper when ANY literal \\n sequence is
 *     detected, regardless of whether real newlines already exist.
 *   - The state-machine preserves \\n INSIDE C double-quoted strings (they are
 *     valid C escape sequences and must stay as-is for compilation).
 *   - It converts \\n OUTSIDE strings → real newlines (structural line breaks).
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

  // 2. If there are ANY literal \n sequences (two characters: backslash + n),
  //    run the state-machine unescaper.
  //    This correctly handles the mixed case where the JSON layer left some
  //    real newlines (between top-level statements) but also left literal \n
  //    inside printf("...") string literals — the old guard
  //    `!code.includes('\n')` skipped this step when real newlines existed,
  //    causing the printf closing `");` to appear on its own line.
  if (code.includes('\\n')) {
    code = unescapeStructuralNewlines(code);
  }

  return code;
}
