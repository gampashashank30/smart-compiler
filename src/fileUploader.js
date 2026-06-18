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
  // Normalize carriage returns, vertical tabs, soft breaks, and non-breaking spaces
  let normalizedText = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\u000b/g, '\n')
    .replace(/\v/g, '\n')
    .replace(/\u00a0/g, ' '); // Non-breaking space to regular space

  // Remove other hidden unprintable control characters (bell, backspace, null, etc.)
  normalizedText = normalizedText.replace(/[\u0000-\u0008\u000e-\u001f\u007f-\u009f]/g, '');

  const lines = normalizedText.split('\n');

  // ── Find the start of code ─────────────────────────────────────────────
  // Look for common code start markers (C preprocessor directives, or common
  // patterns in other languages like Python, JS, Java, etc.)
  const codeStartPatterns = [
    /^\s*#\s*(include|define|pragma|ifndef|ifdef|if\b)/,  // C preprocessor
    // JS ES6 import (requires quotes for from source) OR Python/Java import (single identifier path, optional semicolon)
    /^\s*import\s+[\w\s,{}*]+\s+from\s+['"].+['"]/,
    /^\s*import\s+[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*\s*;?$/,
    /^\s*from\s+(?!\d)\S+\s+import/,                       // Python from ... import
    /^\s*package\s+(?!means\b|is\b|refers\b|discipline\b)[a-zA-Z_]\w*\s*;?$/, // Java/Go package
    /^\s*using\s+(?!means\b|is\b|refers\b)[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*\s*;?$/,      // C# using
    /^\s*#!\//,                                            // Shebang
    /^\s*(int|void|char|float|double|long|short|unsigned|signed|struct|enum|typedef)\s+(?!means\b|is\b|stands\b|refers\b|speaking\b)[a-zA-Z_]\w*\s*(?:[=;(),]|$)/, // C type declarations
    /^\s*def\s+\w+\s*\(/,                                  // Python function
    /^\s*class\s+[A-Za-z_]\w*\s*(?:[:{]|\bextends\b|\bimplements\b|\(\s*[A-Za-z_]\w*\s*\)\s*:)/, // Python/Java class definition (stricter colon/brace checks)
    /^\s*print\s*\(/,                                      // Python print
    /^\s*printf\s*\(/,                                     // C printf
    /^\s*System\.out\.(print|println|printf)\s*\(/,        // Java print
    /^\s*console\.log\s*\(/,                               // JS console.log
    /^\s*function\s+\w+\s*\(/,                             // JS/TS function
    /\binput\s*\(/,                                        // Python input()
    /\bstd::/,                                             // C++ std
    /^\s*for\s+\w+\s+in\s+/,                               // Python for loop
    /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\s+(?!means\b|is\b|your\b|the\b|a\b)[A-Za-z_*]/i, // SQL
  ];

  let firstMatchIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (codeStartPatterns.some(pat => pat.test(line))) {
      firstMatchIdx = i;
      break;
    }
  }

  // If no code marker found, throw an error to reject plain text
  if (firstMatchIdx === -1) {
    throw new Error('No programming code found in the Word document. Please ensure your document contains code starting with standard markers like #include, def, class, or import.');
  }

  // Helper to check if a line looks like programming code
  const isCodeLikeLine = (line) => {
    const trimmed = line.trim();
    if (trimmed === '') return true;
    
    // Comments
    if (trimmed.startsWith('#') || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.endsWith('*/') || trimmed.startsWith('*')) {
      return true;
    }
    
    // Keywords at the start of the line
    if (/^(def|class|import|from|print|return|if|else|elif|for|while|try|except|finally|with|as|pass|break|continue|void|int|float|double|char|struct|typedef|public|static|package|using|const|let|var|function)\b/.test(trimmed)) {
      return true;
    }
    
    // Assignments (including update assignments like +=, -=, etc.)
    if (/^[a-zA-Z_]\w*(?:\s*,\s*[a-zA-Z_]\w*)*\s*(?:\+|-|\*|\/|%|&|\||\^|<<|>>|\/\/|\*\*|)?=\s*/.test(trimmed)) {
      return true;
    }

    // Common code ending tokens (excluding colon, which has special checks)
    if (trimmed.endsWith(';') || trimmed.endsWith('{') || trimmed.endsWith('}') || trimmed.endsWith(',') || trimmed.endsWith('(') || trimmed.endsWith('[') || trimmed.endsWith(')') || trimmed.endsWith(']')) {
      return true;
    }

    // Special handling for colons to prevent matching text headers like "Objective:"
    if (trimmed.endsWith(':')) {
      if (/^(if|else|elif|for|while|def|class|try|except|finally|with|switch|case|default)\b/.test(trimmed)) {
        return true;
      }
      if (/^(public|private|protected)$/.test(trimmed)) {
        return true;
      }
      if (/^[a-zA-Z_]\w*:$/.test(trimmed)) {
        return true;
      }
      return false;
    }
    
    // Function calls
    if (/^[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*\s*\(.*\)$/.test(trimmed)) {
      return true;
    }
    
    // Stream/pointer operations
    if (/\bcout\s*<<|\bcin\s*>>/.test(trimmed)) {
      return true;
    }
    
    return false;
  };

  // Walk backwards from the first match to include preceding code
  let startLine = firstMatchIdx;
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

  // Walk forward from the first match to find the end of the contiguous code block
  let endLine = firstMatchIdx;
  for (let i = firstMatchIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (outputStartPatterns.some(pat => pat.test(line))) {
      break;
    }
    if (isCodeLikeLine(line)) {
      endLine = i;
    } else {
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
  return lines.slice(startLine, endLine + 1).join('\n').trim();
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

  // Normalize carriage returns, vertical tabs, soft breaks, and non-breaking spaces for all files
  content = content
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/\u000b/g, '\n')
    .replace(/\v/g, '\n')
    .replace(/\u00a0/g, ' '); // Non-breaking space to regular space

  // Remove other hidden unprintable control characters (bell, backspace, null, etc.)
  content = content.replace(/[\u0000-\u0008\u000e-\u001f\u007f-\u009f]/g, '');

  return {
    content: content,
    filename: file.name,
  };
}
