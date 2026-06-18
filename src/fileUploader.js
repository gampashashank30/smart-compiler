// ─── File Upload Utility ──────────────────────────────────────────────────────
// Handles reading uploaded files (plain text and .docx) and extracting code.
// For .docx files, strips non-code content surrounding the actual program.

import mammoth from 'mammoth';

// File extensions we consider "plain text" and can read directly
const PLAIN_TEXT_EXTENSIONS = new Set([
  // C family
  'c', 'h', 'cpp', 'cc', 'cxx', 'hpp', 'hxx',
  // Other languages
  'py', 'java', 'js', 'jsx', 'ts', 'tsx', 'go', 'rs', 'rb',
  'swift', 'kt', 'kts', 'scala', 'cs', 'vb', 'php', 'pl', 'r',
  'lua', 'dart', 'zig', 'nim', 'v', 'odin', 'asm', 's',
  // Scripting / config
  'sh', 'bash', 'zsh', 'bat', 'cmd', 'ps1',
  'json', 'xml', 'yaml', 'yml', 'toml', 'ini', 'cfg',
  // Web
  'html', 'htm', 'css', 'scss', 'sass', 'less',
  // Plain text
  'txt', 'text', 'md', 'markdown', 'log', 'csv',
  // SQL / data
  'sql',
]);

// Word document extension
const DOCX_EXTENSION = 'docx';

// Max file size: 500 KB (generous for code files)
const MAX_FILE_SIZE = 500 * 1024;

/**
 * Get the lowercase file extension from a filename.
 */
function getExtension(filename) {
  const dot = filename.lastIndexOf('.');
  if (dot === -1) return '';
  return filename.slice(dot + 1).toLowerCase();
}

/**
 * Check if a file is supported for upload.
 */
export function isSupportedFile(filename) {
  const ext = getExtension(filename);
  return PLAIN_TEXT_EXTENSIONS.has(ext) || ext === DOCX_EXTENSION;
}

/**
 * Get the accept string for the file input dialog.
 * Lists all supported extensions + .docx
 */
export function getAcceptString() {
  const exts = [...PLAIN_TEXT_EXTENSIONS].map(e => `.${e}`);
  exts.push(`.${DOCX_EXTENSION}`);
  return exts.join(',');
}

/**
 * Extract code from plain text content of a Word document.
 * Strips non-code content before the first preprocessor directive (#include, #define, etc.)
 * and after the last closing brace '}' of the program.
 *
 * If no C-style code markers are found, returns the full text as-is.
 */
function extractCodeFromWordText(text) {
  const lines = text.split('\n');

  // ── Find the start of code ─────────────────────────────────────────────
  // Look for common code start markers (C preprocessor directives, or common
  // patterns in other languages like Python, JS, Java, etc.)
  const codeStartPatterns = [
    /^\s*#\s*(include|define|pragma|ifndef|ifdef|if\b)/,  // C preprocessor
    /^\s*import\s+/,                                       // Java/Python/JS
    /^\s*from\s+\S+\s+import/,                             // Python
    /^\s*package\s+/,                                      // Java/Go
    /^\s*using\s+/,                                        // C#
    /^\s*#!\//,                                            // Shebang
    /^\s*(int|void|char|float|double|long|short|unsigned|signed|struct|enum|typedef)\s+/, // C type declarations
    /^\s*def\s+\w+\s*\(/,                                  // Python function
    /^\s*class\s+\w+/,                                     // Python/Java class
    /^\s*print\s*\(/,                                      // Python print
    /^\s*console\.log\s*\(/,                               // JS console.log
    /^\s*function\s+\w+/,                                  // JS/TS function
  ];

  let firstMatchIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (codeStartPatterns.some(pat => pat.test(line))) {
      firstMatchIdx = i;
      break;
    }
  }

  // If no code marker found, return full text
  if (firstMatchIdx === -1) return text.trim();

  // Walk backwards to include comments, variable assignments, or empty lines
  // preceding the first matched code pattern, but stop at text headers.
  let startLine = firstMatchIdx;
  const isCodeLikeLine = (line) => {
    const trimmed = line.trim();
    if (trimmed === '') return true;
    if (trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.endsWith('*/')) return true;
    if (/^[a-zA-Z_]\w*\s*=\s*/.test(trimmed)) return true;
    if (/^(def|class|import|from|print|return|if|else|elif|for|while|try|except|with|as|pass|break|continue)\b/.test(trimmed)) return true;
    if (trimmed.endsWith(';') || trimmed.endsWith('{') || trimmed.endsWith('}') || trimmed.endsWith(':')) return true;
    return false;
  };

  for (let i = firstMatchIdx - 1; i >= 0; i--) {
    if (isCodeLikeLine(lines[i])) {
      startLine = i;
    } else {
      break;
    }
  }

  // ── Find the end of code ───────────────────────────────────────────────
  // Look for common headers indicating the start of the output/discussion section
  const outputStartPatterns = [
    /^\s*Output\s*:/i,
    /^\s*Expected\s+Output/i,
    /^\s*Screenshot/i,
    /^\s*Screen\s*shot/i,
    /^\s*Result\s*:/i,
    /^\s*Explanation\s*:/i,
    /^\s*Sample\s+Run/i,
  ];

  let endLine = lines.length - 1;
  for (let i = startLine; i < lines.length; i++) {
    const line = lines[i];
    if (outputStartPatterns.some(pat => pat.test(line))) {
      endLine = i - 1;
      break;
    }
  }

  // Look for the last closing brace '}' within the determined code range
  let foundBrace = false;
  for (let i = endLine; i >= startLine; i--) {
    if (lines[i].includes('}')) {
      endLine = i;
      foundBrace = true;
      break;
    }
  }

  // If no brace was found (e.g. Python/scripting), find the last non-empty line
  if (!foundBrace) {
    let lastNonEmpty = endLine;
    for (let i = endLine; i >= startLine; i--) {
      if (lines[i].trim().length > 0) {
        lastNonEmpty = i;
        break;
      }
    }
    endLine = lastNonEmpty;
  }

  // Extract the code portion
  const extracted = lines.slice(startLine, endLine + 1).join('\n').trim();
  return extracted || text.trim();
}

/**
 * Read a .docx file and extract text, then strip surrounding non-code content.
 * @param {File} file
 * @returns {Promise<string>}
 */
async function readDocxFile(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const rawText = result.value || '';

  if (!rawText.trim()) {
    throw new Error('The Word document appears to be empty.');
  }

  return extractCodeFromWordText(rawText);
}

/**
 * Read a plain text file using FileReader.
 * @param {File} file
 * @returns {Promise<string>}
 */
function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Failed to read the file.'));
    reader.readAsText(file, 'UTF-8');
  });
}

/**
 * Main entry point: read an uploaded file and return its text content.
 *
 * @param {File} file — the File object from an <input type="file"> or drag-and-drop
 * @returns {Promise<{ content: string, filename: string }>}
 * @throws {Error} if the file is unsupported, too large, or unreadable
 */
export async function readUploadedFile(file) {
  if (!file) throw new Error('No file provided.');

  // Size check
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File is too large (${(file.size / 1024).toFixed(0)} KB). Maximum is ${MAX_FILE_SIZE / 1024} KB.`);
  }

  const ext = getExtension(file.name);

  // Unsupported extension
  if (!PLAIN_TEXT_EXTENSIONS.has(ext) && ext !== DOCX_EXTENSION) {
    throw new Error(
      `Unsupported file type: .${ext}\n\nSupported: programming files (.c, .py, .java, .js, .cpp, .txt, etc.) and Word documents (.docx).`
    );
  }

  let content;

  if (ext === DOCX_EXTENSION) {
    content = await readDocxFile(file);
  } else {
    content = await readTextFile(file);
  }

  // Strip BOM if present
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  return {
    content: content,
    filename: file.name,
  };
}
