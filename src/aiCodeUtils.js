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

  // 3. LAST-RESORT FALLBACK: If the entire program arrived as a single line
  //    (no real newlines at all), inject newlines around C structural tokens.
  //    This handles the case where the AI ignores formatting instructions and
  //    collapses everything onto one line separated only by spaces.
  if (!code.includes('\n') && code.length > 40) {
    code = reconstructNewlinesFromFlatCode(code);
  }

  return code;
}

/**
 * reconstructNewlinesFromFlatCode
 *
 * Last-resort formatter for single-line C code output from AI.
 * Injects newlines around structural C tokens: { } ; preprocessor directives.
 * Preserves content inside string literals so printf("a; b") stays intact.
 *
 * @param {string} code - Flat single-line C code
 * @returns {string}    - Code with newlines restored
 */
function reconstructNewlinesFromFlatCode(code) {
  let result = '';
  let inStr  = false;   // inside a double-quoted C string literal
  let i      = 0;

  while (i < code.length) {
    const ch   = code[i];
    const next = code[i + 1] ?? '';

    // ── Inside a string literal — copy verbatim ────────────────────────────
    if (inStr) {
      if (ch === '\\') {
        // Escape sequence — copy both chars as-is
        result += ch + next;
        i += 2;
        continue;
      }
      if (ch === '"') {
        inStr = false; // closing quote
      }
      result += ch;
      i++;
      continue;
    }

    // ── Outside a string literal ───────────────────────────────────────────
    if (ch === '"') {
      inStr = true;
      result += ch;
      i++;
      continue;
    }

    // Opening brace → newline before {, newline after {
    if (ch === '{') {
      // Trim trailing spaces before {
      result = result.trimEnd();
      result += '\n{\n';
      i++;
      continue;
    }

    // Closing brace → newline before }, newline after }
    if (ch === '}') {
      result = result.trimEnd();
      result += '\n}';
      // Add newline after } unless next non-space char is ; (struct/array end)
      if (next !== ';') {
        result += '\n';
      }
      i++;
      continue;
    }

    // Semicolon → newline after ;
    if (ch === ';') {
      result += ';\n';
      // Skip following spaces — the newline replaces them
      i++;
      while (i < code.length && code[i] === ' ') i++;
      continue;
    }

    // Preprocessor directive (#include, #define, etc.) → newline after
    if (ch === '#') {
      // Collect the whole directive until a space that precedes another #
      let directive = '';
      while (i < code.length && code[i] !== '\n') {
        // Stop before the next preprocessor directive
        if (code[i] === ' ' && code[i + 1] === '#') break;
        directive += code[i];
        i++;
      }
      result += directive.trimEnd() + '\n';
      // Skip spaces between directives
      while (i < code.length && code[i] === ' ') i++;
      continue;
    }

    result += ch;
    i++;
  }

  // Clean up: collapse 3+ blank lines into 1, trim
  return result
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
