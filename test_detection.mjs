import { detectLanguage } from './src/languageDetector.js';

const tests = [
  { label: 'JS factorial',       code: 'function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nconsole.log(factorial(5));' },
  { label: 'TS factorial',       code: 'function factorial(n: number): number {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}\nconsole.log(factorial(5));' },
  { label: 'C minimal',          code: 'int main() {\n  return 0;\n}' },
  { label: 'Python simple',      code: 'a = 10\nb = 20\nprint(a + b)' },
  { label: 'Java Hello World',   code: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}' },
  { label: 'C++ Hello World',    code: '#include <iostream>\nusing namespace std;\nint main() {\n  cout << "Hello" << endl;\n  return 0;\n}' },
  { label: 'CSS real',           code: '.container {\n  display: flex;\n  width: 100px;\n  background: red;\n}' },
  { label: 'CSS NOT matched on JS', code: 'function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n-1);\n}\nconsole.log(factorial(5));' },
  { label: 'Go',                 code: 'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello")\n}' },
  { label: 'Rust',               code: 'fn main() {\n  println!("Hello, world!");\n}' },
  { label: 'Python with import', code: 'import math\nresult = math.sqrt(16)\nprint(result)' },
  { label: 'SQL',                code: 'SELECT name, age FROM users WHERE age > 18 ORDER BY name;' },
  { label: 'Bash',               code: '#!/bin/bash\necho "Hello World"' },
  { label: 'Java w/o public',    code: 'class Student {\n  int age;\n}' },
];

let pass = 0, total = tests.length;
for (const { label, code } of tests) {
  const r = detectLanguage(code);
  const conf = r.confidence;
  const ok = conf >= 28 ? '✓' : '?';
  console.log(`${ok} ${label.padEnd(28)} -> ${r.language.padEnd(14)} ${conf}%`);
  if (conf >= 28) pass++;
}
console.log(`\nDetected ${pass}/${total} above threshold (28%)`);
