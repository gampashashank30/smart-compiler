/**
 * bugTracker.js - Permanent analytics store for SmartCompiler
 *
 * Architecture:
 *   • Primary storage: localStorage (survives React re-renders and closing the site)
 *   • Future: swap _persist / _hydrate for Supabase calls when auth is ready
 *   • Listeners pattern: any React component can subscribe for reactive updates
 *
 * Supabase readiness:
 *   The _persist and _hydrate methods are the ONLY places that touch storage.
 *   To enable Supabase, replace their bodies with supabase.from('bug_events').insert/select
 *   and keep the rest of the module unchanged.
 */

import { supabase } from './supabaseClient.js';
import { analyticsStore } from './analytics.js';

// ─── Error type definitions ──────────────────────────────────────────────────
export const ERROR_TYPES = {
  // ── Common & Compile-time errors ───────────────────────────────────────────
  'Missing Semicolon': { icon: ';', color: '#f59e0b', bg: '#fffbeb' },  // amber
  'Undeclared Variable': { icon: 'x', color: '#f97316', bg: '#fff7ed' },  // orange
  'Uninitialized Variable': { icon: '!', color: '#fb923c', bg: '#fff7ed' },  // light orange
  'Unclosed String': { icon: '"', color: '#10b981', bg: '#ecfdf5' },  // emerald green
  'Missing Parenthesis': { icon: '()', color: '#d946ef', bg: '#fdf4ff' },  // fuchsia/magenta
  'Missing Brace/Bracket': { icon: '}', color: '#3b82f6', bg: '#eff6ff' },  // blue
  'Missing < or >': { icon: '<>', color: '#06b6d4', bg: '#ecfeff' },  // cyan
  'Missing # Directive': { icon: '#', color: '#7c3aed', bg: '#f5f3ff' },  // violet
  'Implicit Declaration': { icon: 'ƒ', color: '#8b5cf6', bg: '#f5f3ff' },  // purple
  'Type Mismatch': { icon: '≠', color: '#ec4899', bg: '#fdf2f8' },  // pink
  'Array Out of Bounds': { icon: '[]', color: '#6366f1', bg: '#eef2ff' },  // indigo
  'Unused Variable': { icon: '~', color: '#64748b', bg: '#f8fafc' },  // slate
  'Format Specifier Mismatch': { icon: '%', color: '#0ea5e9', bg: '#f0f9ff' },  // sky blue
  'Compilation Error': { icon: '?', color: '#6b7280', bg: '#f9fafb' },  // gray

  // ── Java specific ─────────────────────────────────────────────────────────
  'Missing Return Statement': { icon: '↩', color: '#f43f5e', bg: '#fff1f2' },  // rose
  'Missing Import': { icon: '📦', color: '#8b5cf6', bg: '#f5f3ff' },  // violet
  'Static Context Error': { icon: '⚡', color: '#d946ef', bg: '#fdf4ff' },  // fuchsia
  'Class Not Found': { icon: '🔍', color: '#ea580c', bg: '#fff7ed' },  // orange-red
  'Null Pointer Exception': { icon: '∅', color: '#ef4444', bg: '#fef2f2' },  // red
  'Stack Overflow Error': { icon: '📚', color: '#b91c1c', bg: '#fef2f2' },  // deep red
  'Java Compilation Error': { icon: '☕', color: '#78716c', bg: '#fafaf9' },  // warm stone

  // ── Python specific ───────────────────────────────────────────────────────
  'Indentation Error': { icon: '⇥', color: '#f59e0b', bg: '#fffbeb' },  // amber
  'Syntax Error': { icon: '⚠', color: '#ef4444', bg: '#fef2f2' },  // red
  'Key Error': { icon: '🔑', color: '#d946ef', bg: '#fdf4ff' },  // fuchsia
  'Zero Division Error': { icon: '÷0', color: '#dc2626', bg: '#fef2f2' },  // red
  'Import Error': { icon: '📦', color: '#8b5cf6', bg: '#f5f3ff' },  // purple
  'File Not Found': { icon: '📁', color: '#ea580c', bg: '#fff7ed' },  // orange
  'Recursion Error': { icon: '🔄', color: '#b91c1c', bg: '#fef2f2' },  // dark red
  'Python Error': { icon: '🐍', color: '#059669', bg: '#ecfdf5' },  // emerald green

  // ── Runtime types ──────────────────────────────────────────────────────────
  'Infinite Loop / TLE': { icon: '∞', color: '#eab308', bg: '#fefce8' },  // yellow
  'Runtime Crash': { icon: '💥', color: '#dc2626', bg: '#fef2f2' },  // red
  'Segmentation Fault': { icon: '⚡', color: '#9f1239', bg: '#fff1f2' },  // deep crimson
  'Successful Run': { icon: '✓', color: '#059669', bg: '#ecfdf5' },  // emerald
};

// ─── Regex classifiers with multi-pattern lists ─────────────────────────────
const COMPILE_CLASSIFIERS = [
  {
    type: 'Missing Parenthesis',
    patterns: [
      /error:.*expected\s+'[()]/i,
      /expected\s*['"]?[()]/i,
      /missing\s*['"]?[()]/i,
      /unmatched\s*['"]?[()]/i,
    ],
  },
  {
    type: 'Missing Brace/Bracket',
    patterns: [
      /error:.*expected\s+'[}\]]/i,
      /expected\s*['"]?[}\]]/i,
      /missing\s*['"]?[}\]]/i,
      /expected\s+declaration\s+or\s+statement\s+at\s+end\s+of\s+input/i,
    ],
  },
  {
    type: 'Missing Semicolon',
    patterns: [
      /error:.*expected\s+'[;,]'/i,
      /expected\s*';'/i,
      /missing\s*semicolon/i,
      /expected\s*semicolon/i,
      /expected\s+';'\s+before/i,
      /expected\s+';'\s+after/i,
      /';'\s*expected/i,
      /expected\s*['"]?[;,]['"]?/i,
    ],
  },
  {
    type: 'Undeclared Variable',
    patterns: [
      /error:.*undeclared/i,
      /'\w+'\s*undeclared/i,
      /use of undeclared identifier/i,
      /undeclared\s+identifier/i,
    ],
  },
  {
    type: 'Uninitialized Variable',
    patterns: [
      /warning:.*uninitiali/i,
      /is used uninitialized/i,
      /may be used uninitialized/i,
    ],
  },
  {
    type: 'Missing < or >',
    patterns: [
      /error:.*missing terminating\s+>/i,
      /error:.*expected\s+'[<>]/i,
      /missing\s*'[<>]'/i,
      /'[<>]'\s*expected/i,
    ],
  },
  {
    type: 'Unclosed String',
    patterns: [
      /error:.*missing terminating\s+["']/i,
      /unterminated\s*string/i,
      /missing terminating\s+character/i,
    ],
  },
  {
    type: 'Missing # Directive',
    patterns: [
      /error:.*\binclude\b.*undeclared/i,
      /warning:.*implicit.*\binclude\b/i,
      /invalid preprocessing directive/i,
    ],
  },
  {
    type: 'Implicit Declaration',
    patterns: [
      /warning:.*implicit declaration/i,
      /implicit declaration of function/i,
    ],
  },
  {
    type: 'Type Mismatch',
    patterns: [
      /warning:.*incompatible/i,
      /error:.*cannot convert/i,
      /incompatible type/i,
      /assignment to .* from incompatible/i,
      /passing argument .* from incompatible pointer type/i,
    ],
  },
  {
    type: 'Array Out of Bounds',
    patterns: [
      /warning:.*array.*bound/i,
      /out of bound/i,
      /subscript .* is above array bounds/i,
    ],
  },
  {
    type: 'Unused Variable',
    patterns: [
      /warning:.*unused variable/i,
      /variable '.*' set but not used/i,
    ],
  },
  {
    type: 'Format Specifier Mismatch',
    patterns: [
      /warning:.*format/i,
      /%d.*float|%f.*int/i,
      /format '.*' expects argument of type/i,
    ],
  },
];

/**
 * Extract the primary diagnostic line from compiler or runtime stderr.
 * @param {string} stderr
 * @returns {string}
 */
export function extractRawMessage(stderr) {
  if (!stderr) return '';
  const lines = stderr.split('\n').map(l => l.trim()).filter(Boolean);
  const target = lines.find(l => /error:|warning:|Exception:|Error:/i.test(l)) || lines[0] || '';
  return target;
}

/**
 * Classify a gcc stderr string → error subtype string.
 */
export function classifyCompileError(stderr) {
  if (!stderr) return 'Compilation Error';

  const firstErrorLine = stderr
    .split('\n')
    .find(l => /error:|warning:/i.test(l)) ?? stderr;

  for (const { type, patterns } of COMPILE_CLASSIFIERS) {
    if (patterns.some(p => p.test(firstErrorLine))) return type;
  }
  for (const { type, patterns } of COMPILE_CLASSIFIERS) {
    if (patterns.some(p => p.test(stderr))) return type;
  }

  return 'Compilation Error';
}

// ─── Java error classifiers ───────────────────────────────────────────────────────────────
const JAVA_COMPILE_CLASSIFIERS = [
  {
    type: 'Missing Semicolon',
    patterns: [
      /error:.*';'\s*expected/i,
      /expected\s*';'/i,
      /missing\s*semicolon/i,
      /expected\s*semicolon/i,
    ],
  },
  {
    type: 'Missing Parenthesis',
    patterns: [
      /error:.*'\('\s*expected/i,
      /error:.*'\)'\s*expected/i,
      /expected\s*'[()]'/i,
    ],
  },
  {
    type: 'Missing Brace/Bracket',
    patterns: [
      /error:.*'\{'\s*expected/i,
      /error:.*'\}'\s*expected/i,
      /reached end of file while parsing/i,
    ],
  },
  {
    type: 'Missing Return Statement',
    patterns: [
      /error:.*missing return statement/i,
      /missing\s+return/i,
    ],
  },
  {
    type: 'Missing Import',
    patterns: [
      /error:.*package.*does not exist/i,
      /error:.*cannot find symbol.*class\s/i,
      /cannot find symbol\s+symbol:\s+class/i,
    ],
  },
  {
    type: 'Undeclared Variable',
    patterns: [
      /error:.*cannot find symbol/i,
      /cannot find symbol\s+symbol:\s+variable/i,
      /cannot find symbol\s+symbol:\s+method/i,
    ],
  },
  {
    type: 'Type Mismatch',
    patterns: [
      /error:.*incompatible types/i,
      /possible lossy conversion/i,
      /cannot be converted to/i,
    ],
  },
  {
    type: 'Static Context Error',
    patterns: [
      /error:.*non-static.*cannot be referenced from a static context/i,
      /static context/i,
    ],
  },
  {
    type: 'Class Not Found',
    patterns: [
      /error:.*class.*is public.*should be declared in a file/i,
      /class.*not found/i,
      /Could not find or load main class/i,
    ],
  },
  {
    type: 'Null Pointer Exception',
    patterns: [
      /NullPointerException/i,
      /java\.lang\.NullPointerException/i,
    ],
  },
  {
    type: 'Array Out of Bounds',
    patterns: [
      /ArrayIndexOutOfBoundsException/i,
      /IndexOutOfBoundsException/i,
    ],
  },
  {
    type: 'Stack Overflow Error',
    patterns: [
      /StackOverflowError/i,
      /java\.lang\.StackOverflowError/i,
    ],
  },
  {
    type: 'Infinite Loop / TLE',
    patterns: [
      /killed|TLE/i,
      /Time Limit Exceeded/i,
    ],
  },
];

/**
 * Classify a javac/java stderr string → error subtype string.
 */
export function classifyJavaError(stderr) {
  if (!stderr) return 'Java Compilation Error';

  const firstErrorLine = stderr
    .split('\n')
    .find(l => /error:|warning:|Exception|Error/i.test(l)) ?? stderr;

  for (const { type, patterns } of JAVA_COMPILE_CLASSIFIERS) {
    if (patterns.some(p => p.test(firstErrorLine))) return type;
  }
  for (const { type, patterns } of JAVA_COMPILE_CLASSIFIERS) {
    if (patterns.some(p => p.test(stderr))) return type;
  }

  return 'Java Compilation Error';
}

/**
 * Extract the first line number from gcc stderr like  main.c:12:5: error:…
 */
export function extractLineHint(stderr) {
  if (!stderr) return null;
  // Match any GCC-style filename:line:col: error format (not just main.c)
  const m = stderr.match(/[\w.\-/]+\.c:(\d+):/);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * Extract line number from javac error like  Main.java:12: error:…
 */
export function extractJavaLineHint(stderr) {
  if (!stderr) return null;
  const m = stderr.match(/\.java:(\d+):/);
  return m ? parseInt(m[1], 10) : null;
}

// ─── Python error classifiers ──────────────────────────────────────────────────────────────
const PYTHON_CLASSIFIERS = [
  {
    type: 'Indentation Error',
    patterns: [
      /IndentationError/i,
      /TabError/i,
      /unexpected indent/i,
      /expected an indented block/i,
      /unindent does not match/i,
    ],
  },
  {
    type: 'Syntax Error',
    patterns: [
      /SyntaxError/i,
      /invalid syntax/i,
      /was never closed/i,
      /expected ':'/i,
    ],
  },
  {
    type: 'Undeclared Variable',
    patterns: [
      /NameError/i,
      /name '.*' is not defined/i,
    ],
  },
  {
    type: 'Type Mismatch',
    patterns: [
      /TypeError/i,
      /unsupported operand type/i,
      /can only concatenate/i,
    ],
  },
  {
    type: 'Array Out of Bounds',
    patterns: [
      /IndexError/i,
      /list index out of range/i,
      /tuple index out of range/i,
    ],
  },
  {
    type: 'Key Error',
    patterns: [
      /KeyError/i,
    ],
  },
  {
    type: 'Runtime Crash',
    patterns: [
      /AttributeError/i,
      /ValueError/i,
      /UnboundLocalError/i,
    ],
  },
  {
    type: 'Infinite Loop / TLE',
    patterns: [
      /killed|TLE|TimeoutExpired/i,
      /Time Limit Exceeded/i,
    ],
  },
  {
    type: 'Segmentation Fault',
    patterns: [
      /Segmentation fault/i,
    ],
  },
  {
    type: 'Zero Division Error',
    patterns: [
      /ZeroDivisionError/i,
      /division by zero/i,
      /integer division or modulo by zero/i,
    ],
  },
  {
    type: 'Import Error',
    patterns: [
      /ImportError/i,
      /ModuleNotFoundError/i,
      /No module named/i,
    ],
  },
  {
    type: 'File Not Found',
    patterns: [
      /FileNotFoundError/i,
      /No such file or directory/i,
    ],
  },
  {
    type: 'Recursion Error',
    patterns: [
      /RecursionError/i,
      /maximum recursion depth exceeded/i,
    ],
  },
];

/**
 * Classify Python stderr → error subtype string.
 */
export function classifyPythonError(stderr) {
  if (!stderr) return 'Python Error';
  for (const { type, patterns } of PYTHON_CLASSIFIERS) {
    if (patterns.some(p => p.test(stderr))) return type;
  }
  return 'Python Error';
}

/**
 * Extract line number from Python traceback like  File "main.py", line 12
 */
export function extractPythonLineHint(stderr) {
  if (!stderr) return null;
  const m = stderr.match(/File "[^"]*", line (\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

/**
 * Classify error and retain the actual compiler diagnostic message.
 * @param {string} stderr
 * @param {'c'|'python'|'java'} language
 * @returns {{ subtype: string, rawMessage: string }}
 */
export function classifyErrorDetails(stderr, language) {
  const rawMessage = extractRawMessage(stderr);
  let subtype = 'Compilation Error';
  if (language === 'python') subtype = classifyPythonError(stderr);
  else if (language === 'java') subtype = classifyJavaError(stderr);
  else subtype = classifyCompileError(stderr);
  return { subtype, rawMessage };
}

/**
 * Universal classifier — dispatches based on language.
 * @param {string} stderr
 * @param {'c'|'python'|'java'} language
 * @returns {string} classified error subtype
 */
export function classifyError(stderr, language) {
  return classifyErrorDetails(stderr, language).subtype;
}

/**
 * Universal line hint extractor — dispatches based on language.
 * @param {string} stderr
 * @param {'c'|'python'|'java'} language
 * @returns {number|null}
 */
export function extractLineHintForLanguage(stderr, language) {
  if (language === 'python') return extractPythonLineHint(stderr);
  if (language === 'java') return extractJavaLineHint(stderr);
  return extractLineHint(stderr);
}

// ─── Language-specific tip knowledge base ───────────────────────────────────
export const LANGUAGE_TIPS = {
  c: {
    'Missing Semicolon': [
      'Every C statement ends with a semicolon (;) — if/for/while headers do NOT.',
      'Pro tip: compile after every few lines so errors stay localized.',
    ],
    'Undeclared Variable': [
      'Declare all variables before first use: e.g. int x = 0;',
      'In C89, all declarations must be placed at the very top of each code block.',
    ],
    'Uninitialized Variable': [
      'Always initialize variables when you declare them: int x = 0;',
      'Reading an uninitialized variable in C produces undefined behavior with garbage values.',
    ],
    'Unclosed String': [
      'Every opening double-quote (") needs a matching closing double-quote on the same line.',
      'Escape quotes inside strings using a backslash: \\"',
    ],
    'Missing Parenthesis': [
      'Every opening ( needs a matching closing ) — count them in each expression.',
      'Function calls need parentheses: printf("hi") not printf "hi".',
      'Conditions in if/while/for must be wrapped in (): if (x > 0) not if x > 0.',
    ],
    'Missing Brace/Bracket': [
      'Ensure every { has a matching }. Indent code cleanly to spot missing braces.',
      'Check function definitions and loop/conditional bodies.',
    ],
    'Missing < or >': [
      'In #include directives, angle brackets must be paired: #include <stdio.h>.',
      'In comparisons like if (a < b && c > d), check that every < and > is present.',
    ],
    'Missing # Directive': [
      'Preprocessor directives must start with #: write #include <stdio.h>, not include <stdio.h>.',
      'Other directives also need #: #define, #pragma, #ifdef, #endif.',
    ],
    'Implicit Declaration': [
      'Include the correct header file: #include <stdio.h> for printf/scanf.',
      'In modern C, calling a function before declaring it is a compiler error.',
    ],
    'Type Mismatch': [
      'Check variable types in assignments and calculations.',
      'Use explicit casts: (int)myFloat or (float)myInt when mixing types.',
    ],
    'Array Out of Bounds': [
      'Array indices in C are 0-indexed: an array of size 5 uses indices 0 to 4.',
      'Accessing arr[5] in a 5-element array corrupts adjacent stack or heap memory.',
    ],
    'Unused Variable': [
      'Remove unused variables to keep your code clean and prevent warnings.',
      'If intentionally unused, silence warnings with (void)varName;.',
    ],
    'Format Specifier Mismatch': [
      'Match printf/scanf specifiers: %d for int, %f for float, %lf for double, %s for string.',
      'Mismatched specifiers lead to undefined memory interpretation.',
    ],
    'Compilation Error': [
      'Read gcc error messages from the top down — first errors often cascade into later ones.',
      'Fix the first reported error first, then recompile.',
    ],
    'Infinite Loop / TLE': [
      'Check your loop condition and ensure the loop variable increments (i++) inside the body.',
      'Make sure while loops have an exit condition that eventually evaluates to false.',
    ],
    'Runtime Crash': [
      'Check for invalid memory access, null pointer dereference, or stack overflow.',
      'Add printf statements before suspected lines to find the crash location.',
    ],
    'Segmentation Fault': [
      'A segfault occurs when accessing memory your program does not own.',
      'Common causes: dereferencing NULL, accessing array out of bounds, or missing & in scanf("%d", &x).',
    ],
  },

  java: {
    'Missing Semicolon': [
      'Every Java statement must terminate with a semicolon (;). Class, method, and loop headers (if, for, while) do NOT.',
      'Common in Java: check variable declarations, method calls, and object instantiations (new Scanner(...);).',
    ],
    'Undeclared Variable': [
      'In Java, all variables must be declared with a type: e.g. int count = 0;',
      'Check for spelling typos or variable scope (is the variable declared inside another method or block?).',
    ],
    'Uninitialized Variable': [
      'Local method variables in Java are NOT initialized by default — assign a value before reading: int sum = 0;',
      'Only class fields receive default values (0, null, false); local variables do not.',
    ],
    'Unclosed String': [
      'String literals in Java must be enclosed in double quotes: "Hello World".',
      'Java strings cannot span multiple lines without concatenation (+) or text blocks ("""...""").',
    ],
    'Missing Parenthesis': [
      'Ensure every opening ( has a matching closing ). Check method calls like System.out.println(...);.',
      'Conditions in if, while, and switch expressions must be surrounded by parentheses.',
    ],
    'Missing Brace/Bracket': [
      'In Java, all class definitions and method bodies must be enclosed in curly braces { }.',
      'Check that your class Main has a closing } at the very end of the file.',
    ],
    'Missing Return Statement': [
      'Methods with a non-void return type must return a value along every possible execution path.',
      'If using if/else, ensure all branches return a value matching the method signature.',
    ],
    'Missing Import': [
      'Classes outside java.lang must be imported at the top: e.g. import java.util.Scanner; or import java.util.ArrayList;',
      'Classes in java.lang (String, System, Math, Integer) are imported automatically.',
    ],
    'Type Mismatch': [
      'Java is strictly typed: incompatible types cannot be directly assigned.',
      'Use explicit casting: int x = (int) 3.14; or Integer.parseInt(str) for String to int conversions.',
    ],
    'Static Context Error': [
      'Non-static methods and instance variables cannot be referenced directly from a static method (like main).',
      'Either mark the helper method as static (e.g. static void helper()) or instantiate the class: new Main().helper().',
    ],
    'Class Not Found': [
      'In Java, the public class name must match the filename (Main.java -> public class Main).',
      'Make sure your entry class is named Main and contains public static void main(String[] args).',
    ],
    'Null Pointer Exception': [
      'You attempted to access a method or property on an object reference that is null.',
      'Ensure objects and arrays are instantiated with "new" before using them: e.g. Scanner sc = new Scanner(System.in);.',
    ],
    'Array Out of Bounds': [
      'Java arrays are 0-indexed: valid indices for an array of length N are 0 to N-1.',
      'Check loop bounds: use i < arr.length, not i <= arr.length.',
    ],
    'Stack Overflow Error': [
      'Caused by excessive or infinite recursion without a base case.',
      'Verify that recursive methods have a base condition that terminates.',
    ],
    'Compilation Error': [
      'Read javac error messages starting from the first reported line.',
      'Fix the first error first, as compiler state cascades to subsequent lines.',
    ],
    'Java Compilation Error': [
      'Review javac compiler output for line numbers and symbol names.',
      'Ensure all brackets, semicolons, and class declarations are structured correctly.',
    ],
    'Infinite Loop / TLE': [
      'Your program exceeded the 15-second execution limit.',
      'Check loop termination conditions and make sure iteration counters (i++) advance.',
    ],
    'Runtime Crash': [
      'An unhandled exception terminated the JVM. Check the exception name and stack trace.',
      'Wrap error-prone operations in try-catch or validate input before processing.',
    ],
  },

  python: {
    'Indentation Error': [
      'Python relies on indentation to define code blocks (typically 4 spaces).',
      'Never mix tabs and spaces. Ensure lines following if/for/while/def/class are indented.',
    ],
    'Syntax Error': [
      'Check for missing colons (:) at the end of if, else, for, while, def, and class statements.',
      'Make sure all quotes, parentheses, brackets, and braces are paired.',
    ],
    'Undeclared Variable': [
      'NameError: variable or function name is not defined.',
      'Check for typos in variable names, or ensure the variable was assigned before being read.',
    ],
    'Type Mismatch': [
      'TypeError: an operation was applied to an inappropriate type (e.g. adding int + str).',
      'Convert types explicitly: str(num) or int(str_val).',
    ],
    'Array Out of Bounds': [
      'IndexError: list index out of range.',
      'Valid indices are 0 to len(lst) - 1. Check loop ranges: range(len(lst)).',
    ],
    'Key Error': [
      'KeyError: dictionary key was not found.',
      'Use dict.get(key, default) or check "if key in dict:" before accessing.',
    ],
    'Zero Division Error': [
      'ZeroDivisionError: division or modulo by zero.',
      'Validate divisor != 0 before dividing or modulo.',
    ],
    'Import Error': [
      'ModuleNotFoundError: the requested module is not installed or misspelled.',
      'Check module spelling or standard library availability.',
    ],
    'File Not Found': [
      'FileNotFoundError: target file does not exist in the working directory.',
      'Verify the file path and ensure it is created before opening.',
    ],
    'Recursion Error': [
      'RecursionError: maximum recursion depth exceeded.',
      'Ensure recursive functions have a proper base condition to stop recursion.',
    ],
    'Infinite Loop / TLE': [
      'Your Python script timed out after 15 seconds.',
      'Check while loop conditions and ensure variables affecting the condition are updated.',
    ],
    'Runtime Crash': [
      'An unhandled exception terminated the script. Read the bottom line of the traceback.',
      'Use try-except blocks to catch expected exceptions gracefully.',
    ],
    'Python Error': [
      'Examine the Python traceback: the last line identifies the exact exception type and message.',
      'The line right above indicates the file and line number where the issue occurred.',
    ],
  },
};

/**
 * Get tips tailored to the given error type and programming language.
 * @param {string} type - Error subtype name
 * @param {'c'|'java'|'python'} language - Target programming language
 * @returns {string[]} Array of actionable tips
 */
export function getTips(type, language = 'c') {
  if (!type) return [];
  const langKey = (language || 'c').toLowerCase();
  const langMap = LANGUAGE_TIPS[langKey] || LANGUAGE_TIPS.c;
  if (langMap[type]?.length) {
    return langMap[type];
  }
  if (LANGUAGE_TIPS.c[type]?.length) {
    return LANGUAGE_TIPS.c[type];
  }
  return [
    `Carefully inspect the compiler / runtime output around this ${type}.`,
    'Double-check syntax, variable scope, and closing brackets near the reported line.',
  ];
}

// Backwards-compatible fallback object for any legacy direct TIPS[type] accesses
export const TIPS = new Proxy(LANGUAGE_TIPS.c, {
  get(target, prop) {
    if (typeof prop === 'string') {
      return getTips(prop, 'c');
    }
    return target[prop];
  },
});

// ─── Storage adapters per language ───────────────────────────────────────────
const STORAGE_KEY_PREFIX = 'sc_bug_tracker_';
const LEGACY_STORAGE_KEY = 'sc_bug_tracker_v1';

export const MAX_SESSIONS = 50;

function _getStorageKey(lang = 'c') {
  return `${STORAGE_KEY_PREFIX}${lang || 'c'}`;
}

function _hydrate(lang = 'c') {
  try {
    const key = _getStorageKey(lang);
    let raw = localStorage.getItem(key);
    if (!raw && lang === 'c') {
      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacy) {
        try {
          const parsed = JSON.parse(legacy);
          _persist(parsed, 'c');
          return parsed;
        } catch { }
      }
    }
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function _persist(sessions, lang = 'c') {
  try {
    const key = _getStorageKey(lang);
    localStorage.setItem(key, JSON.stringify(sessions));
  } catch {
    // localStorage full - silently ignore
  }
}

// ─── Error Episode & Resolution Tracking ─────────────────────────────────────

/**
 * Normalize compiler error message for fuzzy matching across consecutive runs.
 */
export function normalizeErrorMessage(msg) {
  if (!msg) return '';
  return msg
    .toLowerCase()
    .replace(/^.*?:\d+(:\d+)?:\s*/gm, '') // strip file:line:col prefix
    .replace(/['"`]/g, '')               // strip quotes
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Generate a strong error fingerprint combining:
 * language + subtype + line + normalized compiler message
 */
export function getErrorFingerprint(err) {
  if (!err) return '';
  const lang = (err.language || 'c').toLowerCase();
  const subtype = err.subtype || 'Compilation Error';
  const line = err.lineHint != null ? String(err.lineHint) : 'unknown';
  const normMsg = normalizeErrorMessage(err.rawMessage || err.stderr || '');
  return `${lang}::${subtype}::${line}::${normMsg}`;
}

/**
 * Check if current error belongs to the same logical episode as previous error.
 * Uses a strong fingerprint: language + subtype + line + normalized compiler message.
 * Gives line matching less priority than the normalized compiler message:
 * - If normalized messages differ, they are considered different problems (even if lines match).
 * - If normalized messages match, exact line match confirms the same problem.
 * - Does NOT allow ±1 line drift so nearby new errors don't merge into old ones.
 */
export function isSameError(previous, current) {
  if (!previous || !current) return false;

  // Language and subtype must match strictly
  const prevLang = (previous.language || 'c').toLowerCase();
  const currLang = (current.language || 'c').toLowerCase();
  if (prevLang !== currLang) return false;
  if (previous.subtype !== current.subtype) return false;

  const prevMsg = normalizeErrorMessage(previous.rawMessage || previous.stderr);
  const currMsg = normalizeErrorMessage(current.rawMessage || current.stderr);

  // Message matching is primary: if both have messages and they differ, they are DIFFERENT problems
  if (prevMsg && currMsg && prevMsg !== currMsg) {
    return false;
  }

  // Exact line matching: if both have line hints, require exact equality (no ±1 drift)
  if (previous.lineHint != null && current.lineHint != null) {
    return previous.lineHint === current.lineHint;
  }

  // If normalized messages are identical and non-empty, consider it the same problem
  if (prevMsg && currMsg && prevMsg === currMsg) {
    return true;
  }

  // Fallback: both lines are null and subtypes match
  return previous.lineHint == null && current.lineHint == null;
}

/**
 * Maintain active error episodes across chronological runs.
 * Grouped strictly by: language + subtype + line + normalized compiler message.
 */
export function computeErrorEpisodes(sessions) {
  if (!sessions || sessions.length === 0) return [];

  const sorted = [...sessions].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  const episodes = [];
  let activeEpisode = null;

  for (const s of sorted) {
    const isSuccess = s.subtype === 'Successful Run';

    if (isSuccess) {
      if (activeEpisode) {
        activeEpisode.resolvedAt = s.timestamp;
        activeEpisode.resolved = true;
        episodes.push(activeEpisode);
        activeEpisode = null;
      }
    } else {
      const current = {
        language: s.language || 'c',
        subtype: s.subtype,
        lineHint: s.lineHint ?? null,
        rawMessage: s.rawMessage || s.stderr || '',
        timestamp: s.timestamp,
      };

      if (activeEpisode && isSameError(activeEpisode, current)) {
        activeEpisode.attempts += 1;
        activeEpisode.lastSeen = s.timestamp;
        if (current.rawMessage) activeEpisode.rawMessage = current.rawMessage;
      } else {
        if (activeEpisode) {
          activeEpisode.resolved = false;
          episodes.push(activeEpisode);
        }
        activeEpisode = {
          language: current.language,
          errorType: s.subtype,
          subtype: s.subtype,
          lineHint: s.lineHint ?? null,
          rawMessage: s.rawMessage || s.stderr || '',
          fingerprint: getErrorFingerprint(current),
          firstSeen: s.timestamp,
          lastSeen: s.timestamp,
          attempts: 1,
          resolvedAt: null,
          resolved: false,
        };
      }
    }
  }

  if (activeEpisode) {
    episodes.push(activeEpisode);
  }

  return episodes;
}

/**
 * Compare recent performance against previous performance to track improvement.
 * E.g., Previous 14% → Latest 6% = 57% error reduction.
 */
export function computeImprovement(sessions) {
  if (!sessions || sessions.length < 4) {
    return {
      hasData: false,
      overallDecrease: null,
      byType: [],
      topImprovement: null,
      summaryText: null,
    };
  }

  const midpoint = Math.floor(sessions.length / 2);
  const prevWindow = sessions.slice(0, midpoint);
  const recentWindow = sessions.slice(midpoint);

  const prevTotal = prevWindow.length;
  const recentTotal = recentWindow.length;

  if (prevTotal === 0 || recentTotal === 0) {
    return { hasData: false, overallDecrease: null, byType: [], topImprovement: null, summaryText: null };
  }

  const prevCounts = {};
  let prevErrors = 0;
  for (const s of prevWindow) {
    if (s.subtype !== 'Successful Run') {
      prevErrors++;
      prevCounts[s.subtype] = (prevCounts[s.subtype] || 0) + 1;
    }
  }

  const recentCounts = {};
  let recentErrors = 0;
  for (const s of recentWindow) {
    if (s.subtype !== 'Successful Run') {
      recentErrors++;
      recentCounts[s.subtype] = (recentCounts[s.subtype] || 0) + 1;
    }
  }

  const prevErrorRate = (prevErrors / prevTotal) * 100;
  const recentErrorRate = (recentErrors / recentTotal) * 100;
  const overallDecrease = prevErrorRate > 0
    ? Math.round(((prevErrorRate - recentErrorRate) / prevErrorRate) * 100)
    : null;

  const allSubtypes = Array.from(new Set([...Object.keys(prevCounts), ...Object.keys(recentCounts)]));
  const byType = [];

  for (const type of allSubtypes) {
    const prevCount = prevCounts[type] || 0;
    const recentCount = recentCounts[type] || 0;

    const prevPct = (prevCount / prevTotal) * 100;
    const recentPct = (recentCount / recentTotal) * 100;

    let pctDecrease = null;
    if (prevPct > 0) {
      pctDecrease = Math.round(((prevPct - recentPct) / prevPct) * 100);
    }

    byType.push({
      type,
      prevCount,
      recentCount,
      prevPct: Math.round(prevPct),
      recentPct: Math.round(recentPct),
      pctDecrease,
      improved: pctDecrease !== null && pctDecrease > 0,
    });
  }

  const improvedTypes = byType
    .filter(t => t.improved && t.prevCount >= 1)
    .sort((a, b) => (b.pctDecrease || 0) - (a.pctDecrease || 0));

  let topImprovement = null;
  let summaryText = null;

  if (improvedTypes.length > 0) {
    const top = improvedTypes[0];
    topImprovement = {
      type: top.type,
      percent: top.pctDecrease,
      prevPct: top.prevPct,
      recentPct: top.recentPct,
      text: `${top.type} errors decreased by ${top.pctDecrease}%`,
    };
    summaryText = `${top.type} errors decreased by ${top.pctDecrease}% (from ${top.prevPct}% to ${top.recentPct}%)`;
  } else if (overallDecrease !== null && overallDecrease > 0) {
    summaryText = `Overall error rate decreased by ${overallDecrease}% across recent runs`;
  }

  return {
    hasData: true,
    prevWindowSize: prevTotal,
    recentWindowSize: recentTotal,
    overallDecrease,
    prevErrorRate: Math.round(prevErrorRate),
    recentErrorRate: Math.round(recentErrorRate),
    byType,
    topImprovement,
    summaryText,
  };
}

// ─── Event Severity ──────────────────────────────────────────────────────────
/**
 * Categorize event into an explicit severity level:
 * 'success' | 'warning' | 'error' | 'runtime_error' | 'timeout'
 */
export function getEventSeverity(event) {
  if (!event) return 'error';
  if (event.severity) return event.severity;
  if (event.subtype === 'Infinite Loop / TLE' || event.killed) {
    return 'timeout';
  }
  if (event.subtype === 'Segmentation Fault' || event.subtype === 'Runtime Crash') {
    return 'runtime_error';
  }
  if (event.type === 'runtime' && event.exitCode !== 0 && event.subtype !== 'Successful Run') {
    return 'runtime_error';
  }
  if (/warning/i.test(event.subtype) || (event.subtype === 'Successful Run' && ((event.stderr && /warning[:\s]/i.test(event.stderr)) || event.hasWarning))) {
    return 'warning';
  }
  if (event.subtype === 'Successful Run' || (event.exitCode === 0 && !event.killed && event.type !== 'compile-error')) {
    return 'success';
  }
  return 'error';
}

// ─── Store ───────────────────────────────────────────────────────────────────
export const bugTrackerStore = {
  activeLanguage: 'c',
  sessionsByLang: {
    c: _hydrate('c'),
    python: _hydrate('python'),
    java: _hydrate('java'),
  },
  listeners: [],
  userId: null,

  get sessions() {
    return this.sessionsByLang[this.activeLanguage] || [];
  },
  set sessions(s) {
    this.sessionsByLang[this.activeLanguage] = s;
  },

  setActiveLanguage(lang) {
    if (!lang || this.activeLanguage === lang) return;
    this.activeLanguage = lang;
    if (!this.sessionsByLang[lang]) {
      this.sessionsByLang[lang] = _hydrate(lang);
    }
    this._notify();
  },

  getActiveLanguage() {
    return this.activeLanguage;
  },

  getSessions(language = null) {
    const lang = language || this.activeLanguage;
    return [...(this.sessionsByLang[lang] || [])];
  },

  async init(user) {
    if (!user) {
      this.userId = null;
      this.sessionsByLang = {
        c: _hydrate('c'),
        python: _hydrate('python'),
        java: _hydrate('java'),
      };
      this._notify();
      return;
    }
    this.userId = user.id;

    if (supabase && !supabase.isDummy) {
      try {
        const supportedLangs = ['c', 'python', 'java'];
        const results = await Promise.all(
          supportedLangs.map(async (l) => {
            const { data, error } = await supabase
              .from('bug_events')
              .select('*')
              .eq('user_id', this.userId)
              .eq('language', l)
              .order('timestamp', { ascending: false })
              .limit(MAX_SESSIONS);
            return { lang: l, data, error };
          })
        );

        let anyLoaded = false;
        for (const res of results) {
          if (!res.error && res.data && res.data.length > 0) {
            anyLoaded = true;
            // order was descending so we got latest 50; reverse to get chronological
            const rows = res.data.reverse();
            this.sessionsByLang[res.lang] = rows.map(d => {
              const entry = {
                id: Number(d.event_id),
                type: d.type,
                subtype: d.subtype,
                rawMessage: d.raw_message || d.stderr || '',
                timestamp: Number(d.timestamp),
                timeMs: d.time_ms,
                exitCode: d.exit_code,
                lineHint: d.line_hint,
                stderr: d.stderr ?? '',
                language: d.language ?? res.lang,
              };
              entry.severity = d.severity || getEventSeverity(entry);
              return entry;
            });
            _persist(this.sessionsByLang[res.lang], res.lang);
          } else if (res.error) {
            console.error(`[BugTracker] DB error loading sessions for ${res.lang}:`, res.error.message);
          }
        }
        if (anyLoaded) {
          this._notify();
          return;
        }
      } catch (err) {
        console.error('[BugTracker] Failed to load sessions from Supabase:', err.message);
      }
    }

    // Fallback to localStorage if not logged in or DB call failed
    this.sessionsByLang = {
      c: _hydrate('c'),
      python: _hydrate('python'),
      java: _hydrate('java'),
    };
    this._notify();
  },

  /**
   * Record a new analytics event.
   * @param {{ type: string, subtype: string, rawMessage?: string, timestamp: number,
   *            timeMs: number|null, exitCode: number|null, lineHint: number|null,
   *            stderr: string, language?: string, severity?: string }} event
   */
  async record(event) {
    const lang = event.language || this.activeLanguage || 'c';
    const rawMsg = event.rawMessage || extractRawMessage(event.stderr) || '';
    const severity = event.severity || getEventSeverity({ ...event, rawMessage: rawMsg });
    const entry = {
      id: Date.now() + Math.random(),
      type: event.type,        // 'compile-error' | 'runtime'
      subtype: event.subtype,     // human-readable classification
      severity,
      rawMessage: rawMsg,      // actual compiler message line
      timestamp: event.timestamp ?? Date.now(),
      timeMs: event.timeMs ?? null,
      exitCode: event.exitCode ?? null,
      lineHint: event.lineHint ?? null,
      stderr: event.stderr ?? '',
      language: lang,
    };

    if (!this.sessionsByLang[lang]) this.sessionsByLang[lang] = [];
    this.sessionsByLang[lang] = [...this.sessionsByLang[lang], entry].slice(-MAX_SESSIONS);
    _persist(this.sessionsByLang[lang], lang);
    this._notify();

    // Sync local analyticsStore for immediate UI feedback (pass explicit language)
    if (entry.subtype !== 'Successful Run' && analyticsStore && typeof analyticsStore.syncLocalErrors === 'function') {
      const currentStats = analyticsStore.getStats(lang);
      const breakdown = { ...(currentStats.error_breakdown || {}) };
      breakdown[entry.subtype] = (breakdown[entry.subtype] || 0) + 1;
      const newCount = (currentStats.lang_errors ?? currentStats.error_counts ?? 0) + 1;
      analyticsStore.syncLocalErrors(newCount, breakdown, lang);
    }

    if (supabase && !supabase.isDummy && this.userId) {
      try {
        const { error: insertError } = await supabase
          .from('bug_events')
          .insert({
            user_id: this.userId,
            event_id: entry.id,
            type: entry.type,
            subtype: entry.subtype,
            timestamp: entry.timestamp,
            time_ms: entry.timeMs,
            exit_code: entry.exitCode,
            line_hint: entry.lineHint,
            stderr: entry.stderr,
            language: lang,
          });
        if (insertError) throw insertError;
      } catch (err) {
        console.error('[BugTracker] Failed to persist bug to DB:', err.message);
      }
    }
  },

  subscribe(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  },

  async reset(language = null) {
    const lang = language || this.activeLanguage;
    this.sessionsByLang[lang] = [];
    _persist([], lang);
    this._notify();

    // Reset local analyticsStore for THIS language only (prevent cross-language contamination)
    if (analyticsStore && typeof analyticsStore.syncLocalErrors === 'function') {
      analyticsStore.syncLocalErrors(0, {}, lang);
    }

    if (supabase && !supabase.isDummy && this.userId) {
      try {
        // Scoped to both user AND specific language (resets C without touching Java/Python)
        const { error: deleteError } = await supabase
          .from('bug_events')
          .delete()
          .eq('user_id', this.userId)
          .eq('language', lang);

        if (deleteError) throw deleteError;
      } catch (err) {
        console.error('[BugTracker] Failed to reset database analytics:', err.message);
      }
    }
  },

  _notify() {
    const stats = this.getStats(this.activeLanguage);
    for (const fn of this.listeners) {
      try { fn(stats); } catch { }
    }
  },

  /**
   * Returns derived statistics for the UI.
   * @param {'c'|'python'|'java'|null} language - filter by language, or null for activeLanguage
   */
  getStats(language = null) {
    const lang = language || this.activeLanguage;
    const sessions = this.sessionsByLang[lang] || [];

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

    // Active error episodes
    const episodes = computeErrorEpisodes(sessions);

    // Track performance improvements (previous window vs recent window)
    const improvement = computeImprovement(sessions);

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
      errors: errorEvents.length,
      successes: successEvents.length,
      byType,
      recent,
      consecutiveTLE,
      episodes,
      improvement,
    };
  },
};