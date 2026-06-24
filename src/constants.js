// Starter C code — intentionally contains logical mistakes for the student to discover
// No comments so the purpose of the site becomes clear when AI flags the issues
export const STARTER_CODE = `#include <stdio.h>

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

// System prompt for error analysis
export const ANALYSIS_SYSTEM_PROMPT = `C tutor: Analyze code for syntax/logical bugs only. Ignore style/formatting, minor output differences, missing validation, or unneeded memory frees.
Line numbers: Use the exact line number from the prefix "N: line_of_code". Set "line": null if adding new code/checks.
Return ONLY this JSON array (no markdown, no extra text):
[
  {
    "id": 1,
    "type": "logical" | "syntax",
    "hint": "One-sentence hint (no direct answers)",
    "line": number or null,
    "description": "Brief description of the bug",
    "fix": "Short fix suggestion",
    "corrected_code_snippet": "Corrected line(s) only"
  }
]
If clean, return: [{"id":0,"type":"clean","hint":"No issues","line":null,"description":"Code looks correct.","fix":"","corrected_code_snippet":""}]`;


// System prompt for converting other languages to C
export const LANG_TO_C_PROMPT = `Translate the code to standard C99. Preserve logic, structure, and functions. Return ONLY this JSON (no markdown/fences, no text outside JSON):
{
  "c_code": "Full runnable C program with #includes (plain text, no backticks/fences)",
  "notes": ["2-4 brief, student-friendly explanation notes"]
}`;

// System prompt for generating corrected full code
export const CORRECTION_SYSTEM_PROMPT = `Fix the C code based on the listed issues. Return ONLY this JSON (no markdown fences/extra text):
{
  "corrected_code": "Full corrected C program (plain text, no code fences)",
  "learning_notes": ["1-3 brief one-sentence takeaways"]
}`;

// System prompt for AI Tutor Step 3 (Logic/Approach verification)
export const TUTOR_LOGIC_SYSTEM_PROMPT = `Evaluate student's pseudocode/logic approach for C. Be encouraging but strict (false if critical checks/base cases missing). Do not write code. Keep feedback/hints extremely short to minimize tokens. Return ONLY this JSON (no markdown/extra text):
{
  "correct": boolean,
  "feedback": "1-2 sentence feedback on their approach",
  "hints": ["1-2 extremely short, practical hints/improvements"]
}`;

// System prompt for AI Tutor Step 4 (C Code verification)
export const TUTOR_CODE_SYSTEM_PROMPT = `C tutor: Check if student's C code solves the core problem. Set correct to true if it compiles and works. Ignore memory leaks, missing input checks, or minor style differences. Set correct to false only for syntax or logical bugs. Return ONLY this JSON (no markdown/extra text):
{
  "correct": boolean,
  "feedback": "1-2 encouraging sentences explaining result",
  "issues": [
    {
      "line": number,
      "description": "Short bug description"
    }
  ]
}`;

// System prompt for AI-personalized solution based on student's logic
export const TUTOR_AI_SOLUTION_PROMPT = `C tutor: Generate a complete, well-commented C solution resolving the student's code/logic attempt. Preserve their correct parts, add inline comments, and keep walkthrough steps brief. Return ONLY this JSON (no markdown fences/extra text):
{
  "c_code": "Full C program (plain text, no backticks/fences)",
  "explanation": "2-3 encouraging sentences explaining enhancements",
  "steps": ["2-4 brief step-by-step explanations"]
}`;



