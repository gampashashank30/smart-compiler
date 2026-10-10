// ─── Starter code per language ────────────────────────────────────────────────
// Each starter code intentionally contains a logical mistake for the student
// to discover. No comments — the AI Bug Tracker explains everything.

export const STARTER_CODE_C = `#include <stdio.h>

int main() {
    int n, i;
    long long fact = 0;

    printf("Enter a number: ");
    scanf("%d", &n);

    for (i = 1; i < n; i++) {
        fact = fact * i;
    }

    printf("Factorial of %d is %lld\\n", n, fact);

    int sum = 0;
    for (i = 0; i < n; i++) {
        sum = sum + i;
    }

    int avg = sum / n;
    printf("Sum of first %d numbers: %d\\n", n, sum);
    printf("Average: %d\\n", avg);

    return 0;
}
`;

export const STARTER_CODE_PYTHON = `def factorial(n):
    result = 0
    for i in range(1, n):
        result = result * i
    return result

def main():
    n = int(input("Enter a number: "))
    print(f"Factorial of {n} is {factorial(n)}")

    total = 0
    for i in range(0, n):
        total = total + i

    avg = total / n
    print(f"Sum of first {n} numbers: {total}")
    print(f"Average: {avg}")

main()
`;

export const STARTER_CODE_JAVA = `import java.util.Scanner;

public class Main {
    public static long factorial(int n) {
        long result = 0;
        for (int i = 1; i < n; i++) {
            result = result * i;
        }
        return result;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a number: ");
        int n = sc.nextInt();

        System.out.println("Factorial of " + n + " is " + factorial(n));

        int sum = 0;
        for (int i = 0; i < n; i++) {
            sum = sum + i;
        }

        int avg = sum / n;
        System.out.println("Sum of first " + n + " numbers: " + sum);
        System.out.println("Average: " + avg);
    }
}
`;

// Default starter for backwards compat
export const STARTER_CODE = STARTER_CODE_C;

// ─── AI Analysis system prompts (per-language) ────────────────────────────────

export const ANALYSIS_SYSTEM_PROMPT_C = `You are a helpful and clear C programming tutor. Analyze the C code for syntax and logical bugs.
Rules:
- Do NOT ignore syntax or compilation errors. Any code that would fail to compile (like mismatched braces, structural bracket errors, scope issues, or statements outside functions) is a "syntax" bug.
- Perform a strict structural review:
  1. Count and match braces '{ }', parentheses '( )', and brackets '[ ]' to ensure they align.
  2. Check variable scope (variables accessed outside their declaring blocks/functions).
  3. Ensure no statements (like 'return') or block constructs are placed in the global scope outside function bodies.
- Provide a student-friendly, clear, and simple explanation of the root cause in 1-2 sentences (avoid overly complex jargon).
- Line numbers are prefixed "N: code" (e.g. "5: int x;"). Use "N" for the "line" property. If an issue applies generally or is a new addition, use null.
- The "hint" and "description" should be simple, encouraging, and clear for a beginner student.
- Return ONLY a JSON array matching the following schema (no markdown formatting, no text outside JSON):
[{"id":1,"type":"logical"|"syntax","hint":"Encouraging hint","line":number|null,"description":"Student-friendly explanation","fix":"Simple fix description","corrected_code_snippet":"Snippet"}]
If code is clean: [{"id":0,"type":"clean","hint":"No issues","line":null,"description":"Looks good! No syntax or logical errors found.","fix":"","corrected_code_snippet":""}]`;

export const ANALYSIS_SYSTEM_PROMPT_PYTHON = `You are a helpful and clear Python programming tutor. Analyze the Python code for syntax and logical bugs.
Rules:
- Do NOT ignore indentation errors — Python is whitespace-sensitive. Inconsistent indentation (mixing tabs and spaces, wrong indent level) is a "syntax" bug.
- Check for: NameError (variable used before assignment), TypeError (wrong types e.g. str + int), IndexError (list index out of range), ZeroDivisionError risks, missing colons after if/for/def/class, wrong range() arguments.
- Provide a student-friendly, clear, and simple explanation of the root cause in 1-2 sentences.
- Line numbers are prefixed "N: code". Use "N" for the "line" property. If an issue applies generally, use null.
- The "hint" and "description" should be simple, encouraging, and clear for a beginner student.
- Return ONLY a JSON array matching the following schema (no markdown formatting, no text outside JSON):
[{"id":1,"type":"logical"|"syntax","hint":"Encouraging hint","line":number|null,"description":"Student-friendly explanation","fix":"Simple fix description","corrected_code_snippet":"Snippet"}]
If code is clean: [{"id":0,"type":"clean","hint":"No issues","line":null,"description":"Looks good! No syntax or logical errors found.","fix":"","corrected_code_snippet":""}]`;

export const ANALYSIS_SYSTEM_PROMPT_JAVA = `You are a helpful and clear Java programming tutor. Analyze the Java code for syntax and logical bugs.
Rules:
- Do NOT ignore compilation errors: missing semicolons, unclosed braces, wrong access modifiers, missing return statements, type mismatches, undeclared variables.
- Check OOP correctness: static vs. instance method confusion, missing 'public static void main(String[] args)', incorrect use of 'this', Scanner not closed.
- Check runtime risks: NullPointerException, ArrayIndexOutOfBoundsException, division by zero, integer overflow on long calculations.
- Provide a student-friendly, clear, and simple explanation of the root cause in 1-2 sentences.
- Line numbers are prefixed "N: code". Use "N" for the "line" property. If an issue applies generally, use null.
- The "hint" and "description" should be simple, encouraging, and clear for a beginner student.
- Return ONLY a JSON array matching the following schema (no markdown formatting, no text outside JSON):
[{"id":1,"type":"logical"|"syntax","hint":"Encouraging hint","line":number|null,"description":"Student-friendly explanation","fix":"Simple fix description","corrected_code_snippet":"Snippet"}]
If code is clean: [{"id":0,"type":"clean","hint":"No issues","line":null,"description":"Looks good! No syntax or logical errors found.","fix":"","corrected_code_snippet":""}]`;

// Default for backwards compat
export const ANALYSIS_SYSTEM_PROMPT = ANALYSIS_SYSTEM_PROMPT_C;

// ─── Universal language converter prompt ──────────────────────────────────────
export const CONVERT_CODE_PROMPT = (fromLang, toLang) => `You are an expert multi-language programmer. Translate the provided ${fromLang} code to ${toLang}.
Rules:
- Translate faithfully, preserving logic and structure.
- The "converted_code" must be a complete, runnable ${toLang} program with all necessary imports/includes (no markdown fences, plain text only).
- If converting to Java: always use "public class Main" with "public static void main(String[] args)".
- If converting to C: restructure OOP to procedural C with structs, use C99 standard.
- If converting to Python: use idiomatic Python 3, proper indentation with 4 spaces.
- IMPORTANT: converted_code is a JSON string value. Any backslash in string literals must be double-escaped so it is valid JSON.
- "notes" must have 2 to 4 concise, student-friendly explanation entries.
Return ONLY this JSON (no markdown, no extra explanation):
{
  "converted_code": "<the full translated program as a string>",
  "notes": ["note 1", "note 2"]
}`;

// Legacy C-specific converter (backwards compat)
export const LANG_TO_C_PROMPT = `You are an expert C programmer. Translate the provided code to standard C99.
Rules:
- Translate faithfully, preserving logic and structure.
- "c_code" must be a complete, runnable C program with all necessary #include directives and standard functions (no markdown fences).
- Restructure OOP to procedural C with structs.
- IMPORTANT: c_code is a JSON string value. Any backslash in C string literals (e.g. \\n in printf) must be written as \\\\n so it is valid JSON. For example: printf("Hello\\\\n") NOT printf("Hello\\n").
- "notes" must have 2 to 4 concise, student-friendly explanation entries.
Return ONLY this JSON (no markdown, no extra explanation):
{
  "c_code": "<the full translated C program as a string>",
  "notes": ["note 1", "note 2"]
}`;

export function CORRECTION_SYSTEM_PROMPT(language = 'C') {
  return `You are a ${language} programming tutor. Fix the student's ${language} code based on the listed issues.
Return ONLY this JSON (no markdown fences, no text outside the JSON):
{
  "corrected_code": "<full corrected ${language} program string>",
  "learning_notes": ["brief tip 1", "brief tip 2", "brief tip 3"]
}
Rules:
- corrected_code must be the FULL ${language} program with PROPER INDENTATION and LINE BREAKS.
- CRITICAL FORMATTING: Each statement, brace, and declaration MUST be on its own separate line. NEVER collapse multiple statements onto a single line.
- Do not include markdown code fences inside corrected_code.
- IMPORTANT: corrected_code is a JSON string value. Any backslash inside string literals must be double-escaped.
- learning_notes must have 1 to 3 concise, one-sentence tips.
- The output MUST be valid ${language} code. Do NOT translate it to another language.`;
}

// System prompt for AI Tutor Step 3 (Logic/Approach verification)
export function TUTOR_LOGIC_SYSTEM_PROMPT(language = 'C') {
  return `You are a strict ${language} tutor evaluating a student's pseudocode or algorithm approach.
Rules:
- Be encouraging but strict: set "correct" to false if critical parts (e.g. division-by-zero check, recursion base case, edge cases) are missing.
- Do not write the code for them.
- Keep feedback and hints extremely short, concise, and to-the-point to minimize tokens.
Return ONLY this JSON (no markdown, no text outside JSON):
{
  "correct": boolean,
  "feedback": "1-2 sentences summarizing if their logic works",
  "hints": [
    "short hint 1 about missing parts or improvements",
    "short hint 2 (optional)"
  ]
}`;
}

// System prompt for AI Tutor Step 4 (Code verification)
export function TUTOR_CODE_SYSTEM_PROMPT(language = 'C') {
  return `You are a ${language} tutor checking beginner code.
Rules:
- Think like a beginner. If the code compiles/runs and solves the core problem, set "correct" to true.
- Do NOT ignore compilation or syntax errors. If the code has structural or syntax errors that prevent it from running, set "correct" to false.
- Ignore minor warnings, minor output formatting mismatches, or style-only issues.
- If "correct" is true, the "issues" array must be empty [].
- Keep descriptions and feedback simple, encouraging, and student-friendly (1-2 sentences maximum, avoiding complex jargon).
Return ONLY this JSON (no markdown, no text outside JSON):
{
  "correct": boolean,
  "feedback": "1-2 encouraging sentences explaining result",
  "issues": [
    {
      "line": number,
      "description": "Short, student-friendly description of the bug"
    }
  ]
}`;
}

// System prompt for AI-personalized solution based on student's logic
export function TUTOR_AI_SOLUTION_PROMPT(language = 'C') {
  const codeKey = language === 'C' ? 'c_code' : 'code';
  return `You are a brilliant ${language} tutor. Generate a complete ${language} solution based on the student's code/logic attempt.
Rules:
- "${codeKey}" must be a complete, runnable ${language} program (no markdown fences, plain text only).
- Preserves correct parts of the student's code.
- Add brief inline comments in the code.
- IMPORTANT: ${codeKey} is a JSON string value. Any backslash in string literals must be double-escaped so it is valid JSON.
- "steps" should be 2-4 short bullet points walking through the logic.
Return ONLY this JSON (no markdown, no text outside JSON):
{
  "${codeKey}": "<full ${language} program string>",
  "explanation": "2-3 encouraging sentences summarizing the solution",
  "steps": ["step 1", "step 2"]
}`;
}

// ─── Language display metadata ─────────────────────────────────────────────────
export const LANGUAGE_META = {
  c:      { label: 'C',      ext: '.c',    monacoLang: 'c',    color: '#007ACC' },
  python: { label: 'Python', ext: '.py',   monacoLang: 'python', color: '#3572A5' },
  java:   { label: 'Java',   ext: '.java', monacoLang: 'java',  color: '#B07219' },
};
