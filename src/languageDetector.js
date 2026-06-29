/**
 * languageDetector.js
 * ───────────────────
 * Local, heuristic-based programming language detector.
 * Zero network calls — all regex / string matching.
 *
 * Supports 20+ languages with deeply researched signals:
 *   C, C++, Python, Java, JavaScript, TypeScript,
 *   PHP, C#, SQL, HTML, CSS, Perl, Scala, MATLAB
 *
 * Architecture:
 *   Phase 1 — QUICK_KEYWORDS: Definitive, exclusive keywords checked first.
 *              If a strong hit is found → return immediately (high confidence).
 *   Phase 2 — LANGUAGE_SIGNALS: Full weighted scoring across all languages.
 *              Each signal contributes `weight` points when matched.
 *              confidence = blend(rawPct, dominanceOverSecond).
 *
 * Returns: { language, confidence, signals, scores }
 *   language   – language key (e.g. 'python', 'rust', 'unknown')
 *   confidence – 0–100 integer
 *   signals    – array of matched signal labels for debugging
 *   scores     – per-language normalised score map (0-100)
 */

// ─── Phase 1: QUICK KEYWORDS (definitive exclusive patterns) ─────────────────
// Only add signals here that are EXCLUSIVE to ONE language — never ambiguous.
// These run first for short snippets AND as a tiebreaker for all lengths.
const QUICK_KEYWORDS = [
  // ── Python ──────────────────────────────────────────────────────────────
  { lang: 'python', confidence: 95, label: 'elif keyword',          test: (c) => /\belif\b/.test(c) },
  { lang: 'python', confidence: 92, label: 'from X import Y',       test: (c) => /^\s*from\s+[\w.]+\s+import/m.test(c) },
  { lang: 'python', confidence: 90, label: 'def + colon block',     test: (c) => /^\s*def\s+\w+\s*\(.*?\)(?:\s*->\s*[^:]+)?\s*:/m.test(c) },
  { lang: 'python', confidence: 88, label: 'f-string literal',      test: (c) => /\bf["']/.test(c) },
  { lang: 'python', confidence: 88, label: 'float/int(input())',    test: (c) => /\b(float|int|str)\s*\(\s*input\s*\(/.test(c) },
  // Python print() — require NOT preceded by '.' (excludes System.out.print) and
  // NOT in a context with C-style function/type declarations
  { lang: 'python', confidence: 85, label: 'print() call',         test: (c) => /(?<!\.)\bprint\s*\(/.test(c) && !/\b(void|int|float|double)\s+\w+\s*\(/.test(c) },
  { lang: 'python', confidence: 85, label: 'input() call',          test: (c) => /(?<!\.)\binput\s*\(/.test(c) },
  { lang: 'python', confidence: 85, label: 'import statement',      test: (c) => /^\s*import\s+[\w.]+(?!\s*;)/m.test(c) && !/^\s*import\s+(UIKit|SwiftUI|Foundation|AppKit)\b/m.test(c) },
  { lang: 'python', confidence: 85, label: 'True/False/None',       test: (c) => /\b(True|False|None)\b/.test(c) },
  { lang: 'python', confidence: 85, label: '__name__==__main__',    test: (c) => /__name__\s*==\s*['"]__main__['"]/.test(c) },
  { lang: 'python', confidence: 82, label: 'list comprehension',    test: (c) => /\[.+\bfor\b.+\bin\b.+\]/.test(c) },
  { lang: 'python', confidence: 82, label: 'range() call',          test: (c) => /\brange\s*\(/.test(c) },
  { lang: 'python', confidence: 80, label: 'with statement',        test: (c) => /^\s*with\s+\w+.+as\s+\w+\s*:/m.test(c) },
  { lang: 'python', confidence: 80, label: 'lambda expression',     test: (c) => /\blambda\s+[\w,\s]+:/.test(c) },

  // ── JavaScript ──────────────────────────────────────────────────────────
  // console.log fires for JS ONLY when there's no TypeScript type annotation in the code
  { lang: 'javascript', confidence: 92, label: 'console.log()',        test: (c) => /\bconsole\.(log|warn|error|info)\s*\(/.test(c) && !/:\s*(string|number|boolean|any|void|never|unknown)\b/.test(c) },
  { lang: 'javascript', confidence: 90, label: 'arrow function =>',    test: (c) => /=>\s*[{(\w]/.test(c) && !/:\s*(string|number|boolean|any|void|never|unknown)\b/.test(c) },
  { lang: 'javascript', confidence: 88, label: 'import from ES6',      test: (c) => /\bimport\s+.+\bfrom\s+['"]/.test(c) && !/:\s*(string|number|boolean|any|void|never|unknown)\b/.test(c) },
  { lang: 'javascript', confidence: 88, label: 'export default/named', test: (c) => /\bexport\s+(default|const|function|class|let|var)\b/.test(c) && !/:\s*(string|number|boolean|any|void|never|unknown)\b/.test(c) },
  { lang: 'javascript', confidence: 85, label: 'const/let declaration',test: (c) => /\b(const|let)\s+\w+\s*=/.test(c) && !/:\s*(string|number|boolean|any|void|never|unknown)\b/.test(c) },
  { lang: 'javascript', confidence: 85, label: 'require()',            test: (c) => /\brequire\s*\(['"]/.test(c) },
  { lang: 'javascript', confidence: 85, label: 'module.exports',       test: (c) => /module\.exports/.test(c) },
  { lang: 'javascript', confidence: 82, label: 'async/await',          test: (c) => /\basync\s+function|\basync\s*\(|\bawait\s+\w/.test(c) && !/:\s*(string|number|boolean|any|void|never|unknown)\b/.test(c) },
  { lang: 'javascript', confidence: 80, label: 'template literal',     test: (c) => /`[^`]+`/.test(c) && !/:\s*(string|number|boolean|any|void|never|unknown)\b/.test(c) },
  { lang: 'javascript', confidence: 80, label: 'document/window DOM',  test: (c) => /\bdocument\.(querySelector|getElementById|createElement)|\bwindow\.(addEventListener|location)/.test(c) },
  { lang: 'javascript', confidence: 80, label: '.forEach/.map/.filter',test: (c) => /\.(forEach|map|filter|reduce|find|some|every)\s*\(/.test(c) && !/:\s*(string|number|boolean|any|void|never|unknown)\b/.test(c) },
  // JS function declaration without TypeScript return type (e.g. function foo(x) {} not function foo(x: T): R {})
  { lang: 'javascript', confidence: 78, label: 'JS function decl',     test: (c) => /\bfunction\s+\w+\s*\([^:)]*\)\s*\{/.test(c) && !/:\s*(string|number|boolean|any|void|never|unknown)\b/.test(c) },

  // ── TypeScript ──────────────────────────────────────────────────────────
  { lang: 'typescript', confidence: 95, label: 'TS type annotation',   test: (c) => /:\s*(string|number|boolean|any|void|never|unknown)\b/.test(c) },
  { lang: 'typescript', confidence: 95, label: 'interface declaration', test: (c) => /\binterface\s+\w+\s*\{/.test(c) },
  { lang: 'typescript', confidence: 92, label: 'type alias',            test: (c) => /^\s*type\s+\w+\s*=/m.test(c) },
  { lang: 'typescript', confidence: 90, label: 'generic syntax <T>',   test: (c) => /<[A-Z]\w*>/.test(c) || /\w+<\w+>/.test(c) },
  { lang: 'typescript', confidence: 88, label: 'enum declaration',      test: (c) => /\benum\s+\w+\s*\{/.test(c) },
  { lang: 'typescript', confidence: 85, label: 'access modifiers',      test: (c) => /\b(public|private|protected|readonly)\s+\w+/.test(c) },
  { lang: 'typescript', confidence: 82, label: 'as type casting',       test: (c) => /\bas\s+(string|number|boolean|any|\w+)\b/.test(c) },

  // ── C++ ─────────────────────────────────────────────────────────────────
  { lang: 'cpp', confidence: 95, label: '#include <iostream>',     test: (c) => /#include\s*<iostream>/i.test(c) },
  { lang: 'cpp', confidence: 95, label: 'using namespace std',     test: (c) => /using\s+namespace\s+std/.test(c) },
  { lang: 'cpp', confidence: 92, label: 'cout << / cin >>',        test: (c) => /\bcout\s*<<|\bcin\s*>>/.test(c) },
  { lang: 'cpp', confidence: 90, label: 'std:: prefix',            test: (c) => /\bstd::/.test(c) },
  { lang: 'cpp', confidence: 88, label: '#include <vector/map>',   test: (c) => /#include\s*<(vector|map|set|unordered_map|stack|queue|list|deque|algorithm|functional)>/i.test(c) },
  { lang: 'cpp', confidence: 85, label: 'template<>',              test: (c) => /\btemplate\s*</.test(c) },
  { lang: 'cpp', confidence: 85, label: ':: scope resolution',     test: (c) => /\w+::\w+/.test(c) },
  { lang: 'cpp', confidence: 82, label: 'endl',                    test: (c) => /\bendl\b/.test(c) },
  { lang: 'cpp', confidence: 82, label: 'new/delete operators',    test: (c) => /\bnew\s+\w+|\bdelete\s+/.test(c) },

  // ── C ────────────────────────────────────────────────────────────────────
  // NOTE: C-specific quick keywords (not shared with C++)
  { lang: 'c', confidence: 90, label: '#include <stdio.h>',       test: (c) => /#include\s*<stdio\.h>/i.test(c) },
  { lang: 'c', confidence: 88, label: 'int main()',               test: (c) => /\bint\s+main\s*\(/.test(c) && !/#include\s*<iostream>/.test(c) && !/\bstd::/.test(c) },
  { lang: 'c', confidence: 85, label: 'printf()',                 test: (c) => /\bprintf\s*\(/.test(c) && !/#include\s*<iostream>/.test(c) },
  { lang: 'c', confidence: 84, label: 'scanf()',                  test: (c) => /\bscanf\s*\(/.test(c) },
  { lang: 'c', confidence: 82, label: '#include <stdlib.h>',      test: (c) => /#include\s*<stdlib\.h>/i.test(c) },
  { lang: 'c', confidence: 80, label: 'malloc/calloc/free',       test: (c) => /\b(malloc|calloc|realloc|free)\s*\(/.test(c) },

  // ── Java ─────────────────────────────────────────────────────────────────
  { lang: 'java', confidence: 95, label: 'public class + {',       test: (c) => /\bpublic\s+class\s+\w+/.test(c) },
  { lang: 'java', confidence: 95, label: 'public static void main',test: (c) => /public\s+static\s+void\s+main/.test(c) },
  { lang: 'java', confidence: 92, label: 'System.out.println',     test: (c) => /System\.out\.(print|println|printf)\s*\(/.test(c) },
  { lang: 'java', confidence: 90, label: 'import java.',           test: (c) => /\bimport\s+java\./.test(c) },
  { lang: 'java', confidence: 88, label: 'String[] args',          test: (c) => /String\[\]\s*args/.test(c) },
  { lang: 'java', confidence: 85, label: '@Override annotation',   test: (c) => /@(Override|Autowired|Component|Service|Repository|Controller|SpringBootApplication|Test)\b/.test(c) },
  { lang: 'java', confidence: 82, label: 'extends/implements',     test: (c) => /\b(extends|implements)\s+\w+/.test(c) },
  { lang: 'java', confidence: 80, label: 'throws keyword',         test: (c) => /\bthrows\s+\w+Exception/.test(c) },


  // ── Ruby ─────────────────────────────────────────────────────────────────
  { lang: 'ruby', confidence: 95, label: 'do...end block',         test: (c) => /\bdo\s*\|[\w,\s]+\|/.test(c) },
  { lang: 'ruby', confidence: 92, label: 'puts/print statement',   test: (c) => /^\s*puts\s+|^\s*print\s+/m.test(c) },
  { lang: 'ruby', confidence: 90, label: 'def...end method',       test: (c) => /^\s*def\s+\w+[\s(].*$[\s\S]*?^\s*end\s*$/m.test(c) },
  { lang: 'ruby', confidence: 88, label: 'require/require_relative',test: (c) => /^\s*(require|require_relative)\s+['"]/m.test(c) },
  { lang: 'ruby', confidence: 85, label: 'attr_accessor/attr_reader',test: (c) => /\battr_(accessor|reader|writer)\b/.test(c) },
  { lang: 'ruby', confidence: 82, label: 'string interpolation #{}',test: (c) => /#\{/.test(c) },
  { lang: 'ruby', confidence: 80, label: '.each/.map iteration',   test: (c) => /\.(each|map|select|reject|inject|reduce|times)\s*(?:\{|\bdo\b)/.test(c) },
  { lang: 'ruby', confidence: 80, label: '@instance variable',     test: (c) => /@\w+\s*=/.test(c) },

  // ── PHP ──────────────────────────────────────────────────────────────────
  { lang: 'php', confidence: 99, label: '<?php tag',               test: (c) => /<\?php\b/i.test(c) },
  { lang: 'php', confidence: 95, label: '$variable syntax',        test: (c) => /\$[a-zA-Z_]\w*\s*=/.test(c) },
  { lang: 'php', confidence: 92, label: 'echo statement',          test: (c) => /^\s*echo\s+/m.test(c) },
  { lang: 'php', confidence: 88, label: '-> object accessor',      test: (c) => /\$\w+->\w+/.test(c) },
  { lang: 'php', confidence: 85, label: ':: static accessor',      test: (c) => /[A-Z]\w+::\w+/.test(c) },
  { lang: 'php', confidence: 82, label: 'namespace declaration',   test: (c) => /^\s*namespace\s+[\w\\]+;/m.test(c) },
  { lang: 'php', confidence: 80, label: 'array() / [] syntax',     test: (c) => /\barray\s*\(/.test(c) },

  // ── Scala ────────────────────────────────────────────────────────────────
  { lang: 'scala', confidence: 95, label: 'object App / extends App',test: (c) => /\bobject\s+\w+\s*(extends\s+App)?\s*\{/.test(c) },
  { lang: 'scala', confidence: 92, label: 'println() Scala',       test: (c) => /\bprintln\s*\(/.test(c) && /\bval\b|\bvar\b|\bdef\b/.test(c) },
  { lang: 'scala', confidence: 88, label: 'val/var Scala',         test: (c) => /^\s*(val|var)\s+\w+\s*[:=]/m.test(c) && !/^\s*fun\s/m.test(c) },
  { lang: 'scala', confidence: 85, label: 'case class',            test: (c) => /\bcase\s+class\s+\w+/.test(c) },
  { lang: 'scala', confidence: 82, label: 'match/case Scala',      test: (c) => /\bmatch\s*\{[\s\S]*?\bcase\b/.test(c) },


  { lang: 'matlab', confidence: 95, label: 'disp()/fprintf()',      test: (c) => /\b(disp|fprintf|sprintf)\s*\(/.test(c) },
  { lang: 'matlab', confidence: 92, label: 'end keyword (MATLAB)',  test: (c) => /^\s*end\s*$/m.test(c) && !/\bdef\b/.test(c) && !/\bclass\b/.test(c) },
  { lang: 'matlab', confidence: 88, label: 'function declaration',  test: (c) => /^\s*function\s+(\w+\s*=\s*)?\w+\s*\(/m.test(c) && /^\s*end\s*$/m.test(c) },
  { lang: 'matlab', confidence: 85, label: '% comment style',       test: (c) => /^\s*%/.test(c) },
  { lang: 'matlab', confidence: 82, label: 'zeros/ones/linspace',   test: (c) => /\b(zeros|ones|linspace|length|size|numel)\s*\(/.test(c) },
];

// ─── Phase 2: Full scoring signal definitions ────────────────────────────────
// Used when quick-keyword fast-path doesn't fire (or to confirm it).
const LANGUAGE_SIGNALS = {
  c: [
    { label: '#include <stdio.h>',     weight: 35, test: (c) => /#include\s*<stdio\.h>/i.test(c) },
    { label: '#include <stdlib.h>',    weight: 25, test: (c) => /#include\s*<stdlib\.h>/i.test(c) },
    { label: '#include <string.h>',    weight: 20, test: (c) => /#include\s*<string\.h>/i.test(c) },
    { label: '#include <math.h>',      weight: 15, test: (c) => /#include\s*<math\.h>/i.test(c) },
    { label: 'int main()',             weight: 30, test: (c) => /\bint\s+main\s*\(/.test(c) },
    { label: 'printf()',               weight: 25, test: (c) => /\bprintf\s*\(/.test(c) },
    { label: 'scanf()',                weight: 25, test: (c) => /\bscanf\s*\(/.test(c) },
    { label: 'malloc/calloc/free',     weight: 20, test: (c) => /\b(malloc|calloc|realloc|free)\s*\(/.test(c) },
    { label: 'pointer * declaration',  weight: 12, test: (c) => /\b\w+\s*\*\s*\w+\s*[=;,)]/.test(c) },
    { label: 'struct keyword',         weight: 15, test: (c) => /\bstruct\s+\w+/.test(c) },
    { label: '#define directive',      weight: 10, test: (c) => /^#define\s+/m.test(c) },
    { label: 'format specifier %d/%s', weight: 10, test: (c) => /"%[dscflxXoueEgGp]/.test(c) },
    { label: 'return 0;',              weight: 8,  test: (c) => /\breturn\s+0\s*;/.test(c) },
    { label: 'sizeof() operator',      weight: 10, test: (c) => /\bsizeof\s*\(/.test(c) },
    { label: 'typedef keyword',        weight: 8,  test: (c) => /\btypedef\s+/.test(c) },
    { label: 'C-style /* comment */',  weight: 5,  test: (c) => /\/\*[\s\S]*?\*\//.test(c) },
    { label: 'C99 // comment',         weight: 4,  test: (c) => /^\s*\/\//.test(c) },
    { label: 'void function',          weight: 8,  test: (c) => /\bvoid\s+\w+\s*\(/.test(c) },
    { label: '#include <...>',         weight: 12, test: (c) => /#include\s*<\w+\.h>/.test(c) },
  ],

  cpp: [
    { label: '#include <iostream>',    weight: 45, test: (c) => /#include\s*<iostream>/i.test(c) },
    { label: '#include <vector>',      weight: 35, test: (c) => /#include\s*<vector>/i.test(c) },
    { label: '#include <string>',      weight: 30, test: (c) => /#include\s*<string>/i.test(c) },
    { label: '#include <algorithm>',   weight: 25, test: (c) => /#include\s*<algorithm>/i.test(c) },
    { label: '#include STL headers',   weight: 20, test: (c) => /#include\s*<(map|set|queue|stack|unordered_map|list|deque|functional)>/i.test(c) },
    { label: 'using namespace std',    weight: 40, test: (c) => /using\s+namespace\s+std/.test(c) },
    { label: 'cout << / cin >>',       weight: 35, test: (c) => /\bcout\s*<<|\bcin\s*>>/.test(c) },
    { label: 'std:: prefix',           weight: 25, test: (c) => /\bstd::/.test(c) },
    { label: 'class keyword',          weight: 20, test: (c) => /\bclass\s+\w+/.test(c) },
    { label: 'new / delete',           weight: 18, test: (c) => /\bnew\s+\w+|\bdelete\s+/.test(c) },
    { label: 'template<>',             weight: 22, test: (c) => /\btemplate\s*</.test(c) },
    { label: 'auto keyword',           weight: 12, test: (c) => /\bauto\s+\w+/.test(c) },
    { label: ':: scope resolution',    weight: 15, test: (c) => /\w+::\w+/.test(c) },
    { label: 'endl',                   weight: 12, test: (c) => /\bendl\b/.test(c) },
    { label: 'int main()',             weight: 10, test: (c) => /\bint\s+main\s*\(/.test(c) },
    { label: 'override/virtual',       weight: 15, test: (c) => /\b(override|virtual|final)\b/.test(c) },
    { label: 'nullptr',                weight: 18, test: (c) => /\bnullptr\b/.test(c) },
  ],

  python: [
    { label: 'def keyword',            weight: 50, test: (c) => /^\s*def\s+\w+\s*\(/m.test(c) },
    { label: 'print() call',           weight: 35, test: (c) => /\bprint\s*\(/.test(c) },
    { label: 'import statement',       weight: 40, test: (c) => /^\s*import\s+[\w.]+(?!\s*;)/m.test(c) },
    { label: 'from X import Y',        weight: 40, test: (c) => /^\s*from\s+[\w.]+\s+import/m.test(c) },
    { label: 'input() call',           weight: 30, test: (c) => /\binput\s*\(/.test(c) },
    { label: 'elif keyword',           weight: 45, test: (c) => /\belif\b/.test(c) },
    { label: 'colon block :',          weight: 30, test: (c) => /:\s*[\r\n]\s+\S/.test(c) },
    { label: 'indentation block',      weight: 20, test: (c) => /^    \S/m.test(c) || /^\t\S/m.test(c) },
    { label: 'f-string',               weight: 35, test: (c) => /\bf["']/.test(c) },
    { label: 'list comprehension',     weight: 28, test: (c) => /\[.+\bfor\b.+\bin\b.+\]/.test(c) },
    { label: 'range() call',           weight: 22, test: (c) => /\brange\s*\(/.test(c) },
    { label: 'class definition',       weight: 22, test: (c) => /^\s*class\s+\w+\s*[:(]/m.test(c) },
    { label: '__name__==__main__',     weight: 28, test: (c) => /__name__\s*==\s*['"]__main__['"]/.test(c) },
    { label: 'True/False/None',        weight: 25, test: (c) => /\b(True|False|None)\b/.test(c) },
    { label: '# comment',              weight: 10, test: (c) => /^\s*#\s+\S/m.test(c) },
    { label: 'no semicolons',          weight: 8,  test: (c) => !/;\s*$/.test(c.replace(/['"]{3}[\s\S]*?['"]{3}|["'].*?["']/g, '')) },
    { label: 'lambda expression',      weight: 20, test: (c) => /\blambda\s+[\w,\s]+:/.test(c) },
    { label: 'with statement',         weight: 18, test: (c) => /^\s*with\s+/m.test(c) },
    { label: 'float/int(input())',      weight: 30, test: (c) => /\b(float|int|str)\s*\(\s*input\s*\(/.test(c) },
    // Python type-hinted function: def f(a: int, b: str) -> bool:
    // The -> must be followed by a Python built-in or identifier AND terminated with :
    { label: 'type-hinted def ->',      weight: 35, test: (c) => /^\s*def\s+\w+\s*\(.*?\)\s*->\s*[\w\[\]|, ]+\s*:/m.test(c) },
    { label: 'enumerate/zip/map',      weight: 18, test: (c) => /\b(enumerate|zip|map|filter|sorted|reversed)\s*\(/.test(c) },
  ],

  java: [
    { label: 'public class',           weight: 45, test: (c) => /\bpublic\s+class\s+\w+/.test(c) },
    { label: 'public static void main',weight: 45, test: (c) => /public\s+static\s+void\s+main/.test(c) },
    { label: 'System.out.println',     weight: 40, test: (c) => /System\.out\.(print|println|printf)\s*\(/.test(c) },
    { label: 'import java.',           weight: 40, test: (c) => /\bimport\s+java\./.test(c) },
    { label: 'new ClassName()',        weight: 22, test: (c) => /\bnew\s+[A-Z]\w+\s*\(/.test(c) },
    { label: '@Override annotation',   weight: 28, test: (c) => /@(Override|Autowired|Test|SpringBootApplication|RestController)\b/.test(c) },
    { label: 'extends/implements',     weight: 22, test: (c) => /\b(extends|implements)\s+\w+/.test(c) },
    { label: 'String[] args',          weight: 35, test: (c) => /String\[\]\s*args/.test(c) },
    { label: 'throws keyword',         weight: 18, test: (c) => /\bthrows\s+\w+/.test(c) },
    { label: 'final keyword',          weight: 10, test: (c) => /\bfinal\s+\w+/.test(c) },
    { label: 'ArrayList/HashMap',      weight: 20, test: (c) => /\b(ArrayList|HashMap|HashSet|LinkedList|Scanner)\s*</.test(c) },
    { label: 'interface declaration',  weight: 18, test: (c) => /\binterface\s+\w+/.test(c) },
    // Lower-weight generic Java-like signals (help with ambiguous OOP code)
    { label: 'class declaration',      weight: 14, test: (c) => /\bclass\s+[A-Z]\w*\s*\{/.test(c) && !/#include\b/.test(c) },
    { label: 'typed field (int/String)',weight: 12, test: (c) => /^\s+(int|String|boolean|double|float|char|long|byte|short)\s+\w+\s*;/m.test(c) },
  ],

  javascript: [
    { label: 'const / let / var',      weight: 22, test: (c) => /\b(const|let|var)\s+\w+\s*=/.test(c) },
    { label: 'function keyword',       weight: 18, test: (c) => /\bfunction\s+\w+\s*\(/.test(c) },
    { label: 'arrow function =>',      weight: 28, test: (c) => /=>\s*[{(\w]/.test(c) },
    { label: 'console.log()',          weight: 35, test: (c) => /\bconsole\.(log|warn|error|info)\s*\(/.test(c) },
    { label: 'document/window DOM',    weight: 30, test: (c) => /\bdocument\.|\bwindow\./.test(c) },
    { label: 'require()',              weight: 28, test: (c) => /\brequire\s*\(['"]/.test(c) },
    { label: 'module.exports',         weight: 28, test: (c) => /module\.exports/.test(c) },
    { label: 'async/await',            weight: 22, test: (c) => /\basync\s+(function|\()|\bawait\s+/.test(c) },
    { label: 'Promise',                weight: 18, test: (c) => /\bPromise\s*[.(]/.test(c) },
    { label: 'template literal `',    weight: 22, test: (c) => /`[^`]+`/.test(c) },
    { label: '=== strict equality',   weight: 12, test: (c) => /===|!==/.test(c) },
    { label: 'import/export ES6',      weight: 28, test: (c) => /\bimport\s+.+\bfrom\s+['"]|\bexport\s+(default|const|function|class)/.test(c) },
    { label: '.forEach/.map/.filter',  weight: 18, test: (c) => /\.(forEach|map|filter|reduce)\s*\(/.test(c) },
    { label: 'typeof operator',        weight: 12, test: (c) => /\btypeof\s+\w+/.test(c) },
    { label: 'JSON.parse/stringify',   weight: 15, test: (c) => /\bJSON\.(parse|stringify)\s*\(/.test(c) },
  ],

  typescript: [
    { label: ': string/number/bool type', weight: 40, test: (c) => /:\s*(string|number|boolean|any|void|never|unknown|object)\b/.test(c) },
    { label: 'interface declaration',  weight: 45, test: (c) => /\binterface\s+\w+\s*\{/.test(c) },
    { label: 'type alias',             weight: 40, test: (c) => /^\s*type\s+\w+\s*=/m.test(c) },
    { label: 'generic <T>',            weight: 35, test: (c) => /\w+<\w+>/.test(c) },
    { label: 'enum declaration',       weight: 38, test: (c) => /\benum\s+\w+\s*\{/.test(c) },
    { label: 'access modifiers',       weight: 30, test: (c) => /\b(public|private|protected|readonly)\s+\w+/.test(c) },
    { label: 'as type casting',        weight: 28, test: (c) => /\bas\s+(string|number|boolean|any|\w+)\b/.test(c) },
    { label: 'import from ES6',        weight: 22, test: (c) => /\bimport\s+.+\bfrom\s+['"]/.test(c) },
    { label: 'const/let declaration',  weight: 15, test: (c) => /\b(const|let)\s+\w+\s*=/.test(c) },
    { label: 'optional ? parameter',   weight: 25, test: (c) => /\w+\?\s*:\s*\w+/.test(c) },
    { label: 'arrow function =>',      weight: 18, test: (c) => /=>\s*[{(\w]/.test(c) },
  ],

  go: [
    { label: 'package declaration',   weight: 50, test: (c) => /^\s*package\s+\w+/m.test(c) },
    { label: 'func keyword',          weight: 45, test: (c) => /^\s*func\s+\w+\s*\(/m.test(c) },
    { label: 'fmt.Println/Printf',    weight: 40, test: (c) => /\bfmt\.(Println|Printf|Sprintf|Scanf|Scan)\s*\(/.test(c) },
    { label: ':= short assign',       weight: 38, test: (c) => /\w+\s*:=\s*/.test(c) },
    { label: 'import "..."',          weight: 35, test: (c) => /\bimport\s+["(`]/.test(c) },
    { label: 'goroutine/chan',         weight: 30, test: (c) => /\bgo\s+\w+\s*\(|\bchan\b/.test(c) },
    { label: 'var type declaration',  weight: 25, test: (c) => /^\s*var\s+\w+\s+\w+/m.test(c) },
    { label: 'defer statement',       weight: 22, test: (c) => /\bdefer\s+/.test(c) },
    { label: 'struct literal {}',     weight: 20, test: (c) => /\w+\{\s*\w+:/.test(c) },
    { label: 'error handling',        weight: 18, test: (c) => /\bif\s+err\s*!=\s*nil/.test(c) },
    { label: ':= multiple assign',    weight: 20, test: (c) => /\w+,\s*\w+\s*:=/.test(c) },
  ],

  rust: [
    { label: 'fn main()',             weight: 50, test: (c) => /^\s*fn\s+main\s*\(\s*\)/m.test(c) },
    { label: 'println! macro',        weight: 45, test: (c) => /\bprintln!\s*\(/.test(c) },
    { label: 'let mut binding',       weight: 42, test: (c) => /\blet\s+mut\b/.test(c) },
    { label: 'use std::/crate::',     weight: 40, test: (c) => /^\s*use\s+(std|crate|self)::/m.test(c) },
    { label: 'impl block',            weight: 38, test: (c) => /\bimpl\s+\w+/.test(c) },
    { label: 'fn keyword',            weight: 35, test: (c) => /\bfn\s+\w+\s*\(/.test(c) },
    { label: '-> return type',        weight: 28, test: (c) => /\)\s*->\s*\w+/.test(c) },
    { label: 'match expression',      weight: 30, test: (c) => /\bmatch\s+\w+\s*\{/.test(c) },
    { label: 'vec!/format! macros',   weight: 25, test: (c) => /\b(vec!|format!|eprintln!|panic!)\s*[(\[]/.test(c) },
    { label: 'Option<>/Result<>',     weight: 28, test: (c) => /\b(Option|Result|Some|None|Ok|Err)\b/.test(c) },
    { label: '& reference / borrow',  weight: 18, test: (c) => /&(mut\s+)?\w+|\bBox</.test(c) },
    { label: 'struct definition',     weight: 22, test: (c) => /\bstruct\s+\w+\s*\{/.test(c) },
    { label: '#[derive()]',           weight: 20, test: (c) => /#\[derive\(/.test(c) },
  ],

  ruby: [
    { label: 'puts/print',            weight: 40, test: (c) => /^\s*puts\s+|^\s*print\s+/m.test(c) },
    { label: 'def...end method',      weight: 45, test: (c) => /^\s*def\s+\w+[\s(]/m.test(c) },
    { label: 'do...end block',        weight: 42, test: (c) => /\bdo\s*\|[\w,\s]+\|/.test(c) },
    { label: 'require/require_rel',   weight: 35, test: (c) => /^\s*(require|require_relative)\s+['"]/m.test(c) },
    { label: 'attr_accessor',         weight: 38, test: (c) => /\battr_(accessor|reader|writer)\b/.test(c) },
    { label: 'string interpolation',  weight: 32, test: (c) => /#\{/.test(c) },
    { label: '.each/.map Ruby',       weight: 28, test: (c) => /\.(each|map|select|reject|inject|times)\s*(?:\{|\bdo\b)/.test(c) },
    { label: '@instance_variable',    weight: 25, test: (c) => /@\w+/.test(c) },
    { label: 'end keyword',           weight: 20, test: (c) => /^\s*end\s*$/m.test(c) },
    { label: 'symbol :sym',           weight: 18, test: (c) => /:\w+\s*=>|=>\s*:\w+|\bsym\b/.test(c) },
    { label: 'elsif keyword',         weight: 30, test: (c) => /\belsif\b/.test(c) },
    { label: 'nil keyword',           weight: 15, test: (c) => /\bnil\b/.test(c) },
  ],

  bash: [
    { label: '<?php tag',             weight: 60, test: (c) => /<\?php\b/i.test(c) },
    { label: '$variable',             weight: 45, test: (c) => /\$[a-zA-Z_]\w*/.test(c) },
    { label: 'echo statement',        weight: 35, test: (c) => /^\s*echo\s+/m.test(c) },
    { label: '-> object accessor',    weight: 30, test: (c) => /\$\w+->\w+/.test(c) },
    { label: 'namespace',             weight: 28, test: (c) => /^\s*namespace\s+[\w\\]+;/m.test(c) },
    { label: 'array() syntax',        weight: 22, test: (c) => /\barray\s*\(/.test(c) },
    { label: 'use keyword PHP',       weight: 20, test: (c) => /^\s*use\s+[\w\\]+;/m.test(c) },
    { label: 'function PHP',          weight: 18, test: (c) => /\bfunction\s+\w+\s*\(/.test(c) },
    { label: 'string concatenation .', weight: 15, test: (c) => /\.\s*['"\$]/.test(c) },
    { label: 'NULL/TRUE/FALSE PHP',   weight: 12, test: (c) => /\b(NULL|TRUE|FALSE)\b/.test(c) },
  ],

  bash: [
    { label: '#!/bin/bash shebang',   weight: 60, test: (c) => /^#!\/bin\/(bash|sh|zsh)/.test(c) },
    { label: '#!/usr/bin/env bash',   weight: 58, test: (c) => /^#!\/usr\/bin\/env\s+(bash|sh|zsh)/.test(c) },
    { label: '$() subshell',          weight: 40, test: (c) => /\$\([^)]+\)/.test(c) },
    { label: '${var} substitution',   weight: 38, test: (c) => /\$\{\w+\}/.test(c) },
    { label: 'if [ ] / [[ ]]',        weight: 35, test: (c) => /\[\[?\s+[^\]\[]+\s+\]\]?/.test(c) && !/^\s*(def|class|for|if|while|print|import|from)\b/m.test(c) },
    { label: 'echo + $var',           weight: 30, test: (c) => /\becho\s+.*("|'|\$)/.test(c) },
    { label: 'for...in...do...done',  weight: 32, test: (c) => /\bfor\s+\w+\s+in\s+[\s\S]*?\bdo\b/.test(c) },
    { label: 'fi/esac/done keywords', weight: 28, test: (c) => /\b(fi|esac|done)\b/.test(c) },
    { label: 'function() {} bash',    weight: 25, test: (c) => /\w+\s*\(\s*\)\s*\{/.test(c) },
    { label: '# comment bash',        weight: 10, test: (c) => /^\s*#\s+\S/m.test(c) },
    { label: 'export VAR=value',      weight: 22, test: (c) => /\bexport\s+\w+=/.test(c) },
  ],

  sql: [
    { label: 'SELECT ... FROM',       weight: 50, test: (c) => /\bSELECT\b.+\bFROM\b/is.test(c) },
    { label: 'CREATE TABLE',          weight: 45, test: (c) => /\bCREATE\s+TABLE\b/i.test(c) },
    { label: 'INSERT INTO',           weight: 40, test: (c) => /\bINSERT\s+INTO\b/i.test(c) },
    { label: 'UPDATE ... SET',        weight: 38, test: (c) => /\bUPDATE\s+\w+\s+SET\b/i.test(c) },
    { label: 'WHERE clause',          weight: 35, test: (c) => /\bWHERE\s+\w+/.test(c) },
    { label: 'JOIN clause',           weight: 32, test: (c) => /\b(INNER|LEFT|RIGHT|FULL|CROSS)?\s*JOIN\b/i.test(c) },
    { label: 'GROUP BY / ORDER BY',   weight: 30, test: (c) => /\b(GROUP|ORDER)\s+BY\b/i.test(c) },
    { label: 'DROP TABLE/DATABASE',   weight: 35, test: (c) => /\bDROP\s+(TABLE|DATABASE|INDEX)\b/i.test(c) },
    { label: 'PRIMARY KEY',           weight: 30, test: (c) => /\bPRIMARY\s+KEY\b/i.test(c) },
    { label: 'ALTER TABLE',           weight: 28, test: (c) => /\bALTER\s+TABLE\b/i.test(c) },
  ],

  html: [
    { label: '<!DOCTYPE html>',       weight: 60, test: (c) => /<!DOCTYPE\s+html>/i.test(c) },
    { label: '<html> tag',            weight: 50, test: (c) => /<html[\s>]/i.test(c) },
    { label: '<head>/<body> tag',     weight: 45, test: (c) => /<(head|body)[\s>]/i.test(c) },
    { label: '<div>/<p>/<span>',      weight: 35, test: (c) => /<(div|p|span|section|article|header|footer|nav|main)\b/i.test(c) },
    { label: 'class="/id=" attr',     weight: 28, test: (c) => /\s(class|id)=["']/.test(c) },
    { label: 'href/src attributes',   weight: 22, test: (c) => /\b(href|src)=["']/.test(c) },
    { label: '<script>/<style>',      weight: 25, test: (c) => /<(script|style)\b/i.test(c) },
    { label: 'HTML5 input/form',      weight: 18, test: (c) => /<(form|input|button|select|textarea)\b/i.test(c) },
    { label: 'HTML meta charset',     weight: 20, test: (c) => /<meta\s/i.test(c) },
  ],

  css: [
    { label: 'property: value;',      weight: 45, test: (c) => /^\s*(color|background|margin|padding|font-size|font-family|width|height|display|position|border|flex|grid|overflow|opacity|transform|transition|text-align|line-height|z-index)\s*:\s*[^;{]+;/m.test(c) },
    // CSS selector: MUST start with . # * : @ or known HTML tag to avoid matching function/class declarations
    { label: 'CSS selector + {}',     weight: 40, test: (c) => /^(?:[.#*:@]|(?:a|p|ul|li|ol|div|span|h[1-6]|body|html|form|input|button|select|textarea|section|article|nav|header|footer|main|table|thead|tbody|tr|td|th|img|video|canvas|svg|figure|aside)(?=[\s,{>~+:])).*\{/m.test(c) },
    { label: '@media query',          weight: 38, test: (c) => /@media\s*\(/.test(c) },
    { label: ':hover/:focus pseudo',  weight: 32, test: (c) => /:(hover|focus|active|first-child|last-child|nth-child|before|after)\b/.test(c) },
    { label: 'CSS variable --var',    weight: 30, test: (c) => /--[\w-]+\s*:/.test(c) },
    { label: '@keyframes animation',  weight: 35, test: (c) => /@keyframes\s+\w+/.test(c) },
    { label: 'px/em/rem units',       weight: 20, test: (c) => /\b\d+(px|em|rem|vh|vw|%)\b/.test(c) },
    { label: 'rgba/hex colors',       weight: 18, test: (c) => /rgba?\(|#[0-9a-fA-F]{3,6}\b/.test(c) },
  ],

  perl: [
    { label: '#!/usr/bin/perl',      weight: 60, test: (c) => /^#!.*perl\b/.test(c) },
    { label: 'use strict/warnings',  weight: 50, test: (c) => /^\s*use\s+(strict|warnings);/m.test(c) },
    { label: 'my $variable',         weight: 45, test: (c) => /\bmy\s+\$\w+/.test(c) },
    { label: '@array / %hash',       weight: 40, test: (c) => /\@\w+|\%\w+/.test(c) },
    { label: 'print STDOUT',         weight: 35, test: (c) => /\bprint\s+(STDOUT|STDERR|\$\w+)?/.test(c) },
    { label: 'chomp/chop',           weight: 32, test: (c) => /\b(chomp|chop)\s*\(/.test(c) },
    { label: 'qw() quote words',     weight: 30, test: (c) => /\bqw\s*[(\[\/]/.test(c) },
  ],

  matlab: [
    { label: 'disp()/fprintf()',     weight: 45, test: (c) => /\b(disp|fprintf|sprintf)\s*\(/.test(c) },
    { label: 'function...end MATLAB',weight: 42, test: (c) => /^\s*function\s+\w+/m.test(c) && /^\s*end\s*$/m.test(c) },
    { label: '% comment MATLAB',     weight: 35, test: (c) => /^\s*%/.test(c) },
    { label: 'zeros/ones/linspace',  weight: 38, test: (c) => /\b(zeros|ones|linspace|length|size|numel|find)\s*\(/.test(c) },
    { label: 'end keyword MATLAB',   weight: 25, test: (c) => /^\s*end\s*$/m.test(c) },
    { label: ': colon range',        weight: 20, test: (c) => /\d+:\d+/.test(c) },
    { label: 'plot/figure functions',weight: 30, test: (c) => /\b(plot|figure|subplot|xlabel|ylabel|title|legend)\s*\(/.test(c) },
    { label: '; suppress output',    weight: 15, test: (c) => /;\s*$/.test(c) },
  ],
};


// ─── Pre-compute max scores ───────────────────────────────────────────────────
const MAX_SCORES = Object.fromEntries(
  Object.entries(LANGUAGE_SIGNALS).map(([lang, signals]) => [
    lang,
    signals.reduce((sum, s) => sum + s.weight, 0),
  ])
);

// ─── Main detector ────────────────────────────────────────────────────────────
/**
 * Detect the programming language of the given code snippet.
 *
 * @param {string} code
 * @returns {{ language: string, confidence: number, signals: string[], scores: Record<string, number> }}
 */
export function detectLanguage(code) {
  if (!code || code.trim().length < 2) {
    return { language: 'unknown', confidence: 0, signals: [], scores: {} };
  }

  const lineCount = code.trim().split(/\r?\n/).length;

  // ── Phase 1: Quick-keyword fast-path (ALL snippet lengths) ───────────────
  // Collect ALL quick-keyword hits first. The language with the highest
  // *accumulated* confidence from multiple unique hits wins.
  const byLang = {};
  for (const kw of QUICK_KEYWORDS) {
    if (kw.test(code)) {
      if (!byLang[kw.lang]) byLang[kw.lang] = { total: 0, count: 0, maxConf: 0, labels: [] };
      byLang[kw.lang].total   += kw.confidence;
      byLang[kw.lang].count   += 1;
      byLang[kw.lang].maxConf  = Math.max(byLang[kw.lang].maxConf, kw.confidence);
      byLang[kw.lang].labels.push(kw.label);
    }
  }

  // For SHORT code (≤ 12 lines), the quick-keyword system is authoritative.
  // For longer code, we still use it as a strong tiebreaker signal.
  const quickRanked = Object.entries(byLang).sort((a, b) => b[1].total - a[1].total);

  if (lineCount <= 12 && quickRanked.length > 0) {
    const [bestLang, bestData] = quickRanked[0];
    const secondTotal = quickRanked[1]?.[1].total ?? 0;
    const margin = bestData.total - secondTotal;

    // Only use fast-path if we have a clear winner (margin > 30 OR count >= 2)
    if (margin >= 30 || bestData.count >= 2) {
      const topConf    = Math.min(99, bestData.maxConf);
      const topTotal   = bestData.total;
      const scores     = {};
      const signalsMap = {};
      for (const [l, d] of quickRanked) {
        // Normalize: top language = topConf, others proportionally scaled
        scores[l]     = topTotal > 0 ? Math.min(99, Math.round((d.total / topTotal) * topConf)) : 0;
        signalsMap[l] = d.labels;
      }
      return {
        language:   bestLang,
        confidence: topConf,
        signals:    bestData.labels,
        scores,
        signalsMap,
      };
    }
  }

  // ── Phase 2: Full weighted scoring across all signal tables ──────────────
  const results = {};
  for (const [lang, signals] of Object.entries(LANGUAGE_SIGNALS)) {
    let score = 0;
    const matched = [];
    for (const sig of signals) {
      if (sig.test(code)) {
        score += sig.weight;
        matched.push(sig.label);
      }
    }
    results[lang] = { score, matched, pct: Math.round((score / MAX_SCORES[lang]) * 100) };
  }

  // Sort by raw score
  const ranked = Object.entries(results).sort((a, b) => b[1].score - a[1].score);
  const [topLang, topData]   = ranked[0];
  const [, secondData]       = ranked[1] ?? [null, { score: 0, pct: 0 }];

  const rawPct  = topData.pct;
  const lead    = topData.score - secondData.score;
  const leadPct = Math.round((lead / MAX_SCORES[topLang]) * 100);

  // Confidence = 50% raw match % + 50% dominance over second place
  let confidence = Math.min(99, Math.round(rawPct * 0.5 + leadPct * 0.5));

  // ── Quick-keyword boost for Phase 2 winner ────────────────────────────────
  // If the Phase 2 winner also had quick-keyword hits, boost confidence.
  if (byLang[topLang]) {
    const boost = Math.min(15, byLang[topLang].count * 5);
    confidence  = Math.min(99, confidence + boost);
  }

  // ── Normalize scores relative to the top scorer ──────────────────────────
  // Old: (lang_score / lang_max_score) * 100  ← misleading, each language
  //      graded against its own ceiling independently.
  // New: (lang_raw_score / top_raw_score) * confidence  ← truthful comparison.
  //      Top language = actual confidence; others shown proportionally.
  const topRawScore = topData.score;
  const scores = Object.fromEntries(
    Object.entries(results).map(([l, d]) => [
      l,
      topRawScore > 0
        ? Math.min(99, Math.round((d.score / topRawScore) * confidence))
        : 0,
    ])
  );

  // signalsMap: per-language matched signal labels for all languages
  const signalsMap = Object.fromEntries(
    Object.entries(results).map(([l, d]) => [l, d.matched])
  );

  if (confidence < 20 || topData.score === 0) {
    return { language: 'unknown', confidence, signals: topData.matched, scores, signalsMap };
  }

  return { language: topLang, confidence, signals: topData.matched, scores, signalsMap };

}

// ─── Human-readable language names ───────────────────────────────────────────
export const LANG_NAMES = {
  c:          'C',
  cpp:        'C++',
  python:     'Python',
  java:       'Java',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  php:        'PHP',
  csharp:     'C#',
  sql:        'SQL',
  html:       'HTML',
  css:        'CSS',
  perl:       'Perl',
  scala:      'Scala',
  matlab:     'MATLAB',
  unknown:    'Unknown',
};

// ─── Language accent colours for the popup badge ─────────────────────────────
export const LANG_COLORS = {
  c:          '#58a6ff',
  cpp:        '#7ee787',
  python:     '#f7cc50',
  java:       '#e35535',
  javascript: '#f0db4f',
  typescript: '#3178c6',
  php:        '#8892be',
  csharp:     '#9b4f96',
  sql:        '#f29111',
  html:       '#e34c26',
  css:        '#563d7c',
  perl:       '#39457e',
  scala:      '#dc322f',
  matlab:     '#e16737',
  unknown:    '#8b949e',
};
