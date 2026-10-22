// ─── AI Tutor Curriculum Data for Python ───────────────────────────────────────
// Pre-written educational content for Python programming topics.
// Completely separate from C and Java curricula — zero shared state.
// All topics are strictly organized level-wise (Level 1 to Level 5).

export const PYTHON_LEVELS = {
  "1": {
    "name": "Python Fundamentals",
    "color": "#10b981",
    "tag": "beginner",
    "description": "Core syntax, print statements, dynamic variables, and conditionals"
  },
  "2": {
    "name": "Loops & Iterations",
    "color": "#0ea5e9",
    "tag": "beginner",
    "description": "While loops, for-in loops with range(), and list comprehensions"
  },
  "3": {
    "name": "Functions & Collections",
    "color": "#f59e0b",
    "tag": "intermediate",
    "description": "Reusable functions, list slicing, tuples, dictionaries, and sets"
  },
  "4": {
    "name": "Algorithms & Recursion",
    "color": "#6366f1",
    "tag": "intermediate",
    "description": "String algorithms, search, sorting, and recursive problem solving"
  },
  "5": {
    "name": "OOP & Error Handling",
    "color": "#8b5cf6",
    "tag": "advanced",
    "description": "Classes, __init__, methods, try-except blocks, and file processing"
  }
};

export const PYTHON_CATEGORIES = [
  "Fundamentals",
  "Loops & Iterations",
  "Functions & Collections",
  "Algorithms & Recursion",
  "OOP & Error Handling"
];

export const PYTHON_CURRICULUM = {
  "py-hello-world": {
    "id": "py-hello-world",
    "title": "Hello World & print()",
    "category": "Fundamentals",
    "level": "beginner",
    "levelNum": 1,
    "estimatedTime": "5 min",
    "icon": "🐍",
    "concept": {
      "summary": "Your very first Python program. Python emphasizes readability and eliminates boilerplate.",
      "whatIsIt": "Python is an interpreted, high-level programming language. Unlike C or Java, you don't need a main function, class definition, or explicit semicolons just to display text on screen.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Invoke print()",
          "description": "print(\"Hello, World!\") passes the string argument to Python's built-in print function."
        },
        {
          "step": 2,
          "title": "Automatic Newline",
          "description": "By default, print() appends a newline (end='\\n') so the next output appears on a fresh line."
        },
        {
          "step": 3,
          "title": "Direct Execution",
          "description": "The Python interpreter reads your script top-to-bottom and executes statements immediately."
        }
      ],
      "keyTerms": [
        {
          "term": "print()",
          "definition": "A built-in function that outputs text or expressions to stdout."
        },
        {
          "term": "Interpreter",
          "definition": "A program that executes Python source code line by line without manual compilation steps."
        },
        {
          "term": "String literal",
          "definition": "Characters enclosed in single quotes ('') or double quotes (\"\")."
        }
      ],
      "realWorldExample": "Think of print() like texting a message to your phone screen. You provide the text inside quotation marks, and Python delivers it instantly.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Use print() whenever you want to inspect variables, present results to users, or log program milestones.",
      "commonMistakes": [
        "Writing Print() with a capital P (Python is strictly case-sensitive)",
        "Forgetting parentheses: print \"text\" is Python 2 syntax and throws SyntaxError in Python 3",
        "Mismatched quotes: 'Hello\" causes Unterminated string literal error"
      ],
      "diagramType": "py-print-io"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Which is the valid Python 3 syntax to output text?",
        "options": [
          "echo 'Hello'",
          "print('Hello')",
          "System.out.println('Hello');",
          "printf('Hello');"
        ],
        "correct": 1,
        "explanation": "Python 3 uses the built-in function print(...) with parentheses."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "question": "What happens if you type Print('Hi') with a capital P?",
        "options": [
          "Prints in bold",
          "Runs normally",
          "NameError: name 'Print' is not defined",
          "Pauses execution"
        ],
        "correct": 2,
        "explanation": "Python is case-sensitive; 'print' is defined in the standard library, but 'Print' is not."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "What does print() append to the end of output by default?",
        "options": [
          "A space",
          "A newline (\\n)",
          "A semicolon",
          "Nothing"
        ],
        "correct": 1,
        "explanation": "The default value of end in print() is '\\n'."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "Which quotation styles are valid for single-line strings in Python?",
        "options": [
          "Only double quotes (\"hello\")",
          "Only single quotes ('hello')",
          "Both single ('hello') and double (\"hello\")",
          "Backticks (`hello`) only"
        ],
        "correct": 2,
        "explanation": "Python allows both single and double quotes interchangeably."
      },
      {
        "id": 5,
        "difficulty": "medium",
        "question": "How do you print two strings on the same line using multiple print() calls?",
        "options": [
          "print('Hello', end=' ') then print('World')",
          "print('Hello', inline=True)",
          "print.sameLine('Hello', 'World')",
          "print('Hello') ++ print('World')"
        ],
        "correct": 0,
        "explanation": "Setting end=' ' overrides the default newline with a space."
      }
    ],
    "logicHints": {
      "approach": "Call the print() function passing your message string.",
      "keySteps": [
        "Step 1: Write print(\"Hello, Python!\")",
        "Step 2: Run to see output in terminal"
      ],
      "pseudocode": "PRINT \"Hello, Python!\""
    },
    "referenceSolution": "# Python Hello World\nprint(\"Hello, Python!\")\n"
  },
  "py-variables-types": {
    "id": "py-variables-types",
    "title": "Variables & Dynamic Typing",
    "category": "Fundamentals",
    "level": "beginner",
    "levelNum": 1,
    "estimatedTime": "10 min",
    "icon": "📦",
    "concept": {
      "summary": "Variables in Python store references to values. Types are determined dynamically at runtime.",
      "whatIsIt": "In Python, you do not need to specify data types like int or float before a variable name. You assign a value using '=', and Python automatically infers the data type.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Assignment",
          "description": "name = 'Alice' assigns the string object to variable name."
        },
        {
          "step": 2,
          "title": "Dynamic Rebinding",
          "description": "Variables can refer to different types over their lifetime (e.g. x = 10 then x = 'ten')."
        },
        {
          "step": 3,
          "title": "f-Strings",
          "description": "Use f'Hello {name}, you have {score} points' to embed expressions cleanly inside strings."
        }
      ],
      "keyTerms": [
        {
          "term": "Dynamic Typing",
          "definition": "Types are associated with run-time values, not named variable bindings."
        },
        {
          "term": "f-String",
          "definition": "Formatted string literals prefixed with 'f' that allow inline variable interpolation."
        },
        {
          "term": "type()",
          "definition": "Built-in function returning the class type of any object."
        }
      ],
      "realWorldExample": "Think of a variable as a sticky note with a name. You can stick that label onto an integer box, and later move it onto a string box.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Every time you need to retain or transform calculations, names, or program state.",
      "commonMistakes": [
        "Concatenating str and int with + directly: 'Score: ' + 10 causes TypeError. Use f'Score: {10}'.",
        "Using variable names starting with digits (e.g. 1st_val)",
        "Shadowing built-in names like int, str, list, or print"
      ],
      "diagramType": "py-variables"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "How do you declare and initialize an integer variable in Python?",
        "options": [
          "int x = 5;",
          "var x = 5",
          "x = 5",
          "integer x := 5"
        ],
        "correct": 2,
        "explanation": "In Python, write the variable name, equals sign, and value: x = 5."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "question": "What is the output of type(3.14)?",
        "options": [
          "<class 'int'>",
          "<class 'float'>",
          "<class 'double'>",
          "<class 'decimal'>"
        ],
        "correct": 1,
        "explanation": "Floating-point numbers in Python are of class 'float'."
      },
      {
        "id": 3,
        "difficulty": "medium",
        "question": "What error occurs if you run: 'Age: ' + 25 ?",
        "options": [
          "SyntaxError",
          "TypeError: can only concatenate str to str",
          "ValueError",
          "NameError"
        ],
        "correct": 1,
        "explanation": "Python does not automatically coerce integers to strings during addition."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "question": "Which is a valid formatted string (f-string) in Python?",
        "options": [
          "format('Hello %s', name)",
          "f'Hello {name}'",
          "@'Hello {name}'",
          "${Hello name}"
        ],
        "correct": 1,
        "explanation": "Prefixing quotes with 'f' creates an f-string."
      },
      {
        "id": 5,
        "difficulty": "medium",
        "question": "What is the boolean evaluation of the integer 0 in Python?",
        "options": [
          "True",
          "False",
          "None",
          "Error"
        ],
        "correct": 1,
        "explanation": "In Python, numeric 0 evaluates to False in a boolean context ('falsy')."
      }
    ],
    "logicHints": {
      "approach": "Create variables for name, age, and temperature, then print them using an f-string.",
      "keySteps": [
        "Step 1: Set name = 'Pythonista'",
        "Step 2: Set age = 20",
        "Step 3: Set temp = 36.6",
        "Step 4: Use print(f'...')"
      ],
      "pseudocode": "SET name TO 'Pythonista'\nSET age TO 20\nPRINT formatted string with name and age"
    },
    "referenceSolution": "# Variables and Data Types in Python\nname = \"Pythonista\"\nage = 20\ntemp = 36.6\nis_active = True\n\nprint(f\"Name: {name} ({type(name).__name__})\")\nprint(f\"Age: {age} ({type(age).__name__})\")\nprint(f\"Temp: {temp} ({type(temp).__name__})\")\nprint(f\"Active: {is_active} ({type(is_active).__name__})\")\n"
  },
  "py-operators-math": {
    "id": "py-operators-math",
    "title": "Arithmetic & Math Operators",
    "category": "Fundamentals",
    "level": "beginner",
    "levelNum": 1,
    "estimatedTime": "8 min",
    "icon": "➗",
    "concept": {
      "summary": "Perform calculations using arithmetic operators (+, -, *, /, //, %, **).",
      "whatIsIt": "Python supports standard arithmetic plus floor division (//) that truncates decimals, and power (**). Division (/) always returns a float in Python 3.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Standard Division (/)",
          "description": "7 / 2 returns 3.5 (float)."
        },
        {
          "step": 2,
          "title": "Floor Division (//)",
          "description": "7 // 2 returns 3 (integer quotient)."
        },
        {
          "step": 3,
          "title": "Modulus (%) & Power (**)",
          "description": "7 % 2 returns 1 (remainder); 2 ** 3 returns 8 (exponentiation)."
        }
      ],
      "keyTerms": [
        {
          "term": "// (Floor division)",
          "definition": "Divides and rounds down to the nearest integer."
        },
        {
          "term": "% (Modulus)",
          "definition": "Returns the remainder of a division operation."
        },
        {
          "term": "** (Power)",
          "definition": "Raises the left operand to the power of the right operand."
        }
      ],
      "realWorldExample": "Modulus (%) is like checking the minute hand on a clock: 65 minutes is 65 % 60 = 5 minutes past the hour.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "whenToUse": "For any numeric computation, even/odd tests (num % 2 == 0), or geometric formulas.",
      "commonMistakes": [
        "Confusing / (float division) with // (integer floor division)",
        "ZeroDivisionError when dividing by 0",
        "Confusing ^ (bitwise XOR) with ** (exponentiation)"
      ],
      "diagramType": "py-variables"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What is the result of 9 // 2 in Python?",
        "options": [
          "4.5",
          "4",
          "5",
          "1"
        ],
        "correct": 1,
        "explanation": "// performs floor division, rounding 4.5 down to 4."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "question": "What is the operator for exponentiation (e.g., 2 to the power 3) in Python?",
        "options": [
          "^",
          "**",
          "pow",
          "^^"
        ],
        "correct": 1,
        "explanation": "Python uses '**' for exponentiation: 2 ** 3 = 8."
      },
      {
        "id": 3,
        "difficulty": "medium",
        "question": "What is the result of 17 % 5?",
        "options": [
          "3.4",
          "3",
          "2",
          "1"
        ],
        "correct": 2,
        "explanation": "17 divided by 5 is 3 with remainder 2."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "question": "What does 10 / 2 evaluate to in Python 3?",
        "options": [
          "5",
          "5.0",
          "Error",
          "5L"
        ],
        "correct": 1,
        "explanation": "Single slash '/' division always produces a float in Python 3 (5.0)."
      },
      {
        "id": 5,
        "difficulty": "medium",
        "question": "How do you check if a number x is even in Python?",
        "options": [
          "x / 2 == 0",
          "x % 2 == 0",
          "x // 2 == 0",
          "is_even(x)"
        ],
        "correct": 1,
        "explanation": "x % 2 == 0 checks if dividing x by 2 yields a remainder of 0."
      }
    ],
    "logicHints": {
      "approach": "Calculate area and perimeter of a rectangle with length and width.",
      "keySteps": [
        "Step 1: Set length = 10, width = 5",
        "Step 2: area = length * width",
        "Step 3: perimeter = 2 * (length + width)",
        "Step 4: Print results"
      ],
      "pseudocode": "SET length = 10, width = 5\narea = length * width\nperimeter = 2 * (length + width)\nPRINT area, perimeter"
    },
    "referenceSolution": "# Arithmetic calculations in Python\nlength = 10\nwidth = 5\n\narea = length * width\nperimeter = 2 * (length + width)\n\nprint(f\"Length: {length}, Width: {width}\")\nprint(f\"Area: {area}\")\nprint(f\"Perimeter: {perimeter}\")\nprint(f\"Floor division (17 // 5): {17 // 5}\")\nprint(f\"Modulus (17 % 5): {17 % 5}\")\nprint(f\"Exponent (2 ** 4): {2 ** 4}\")\n"
  },
  "py-user-input": {
    "id": "py-user-input",
    "title": "User Input & Type Casting",
    "category": "Fundamentals",
    "level": "beginner",
    "levelNum": 1,
    "estimatedTime": "10 min",
    "icon": "⌨️",
    "concept": {
      "summary": "Read input from stdin using input() and convert types using int(), float(), and str().",
      "whatIsIt": "input() reads a line from stdin as a string. To perform arithmetic, you must convert the string into a numeric type like int() or float().",
      "howItWorks": [
        {
          "step": 1,
          "title": "Read String",
          "description": "text = input() reads standard input as a string."
        },
        {
          "step": 2,
          "title": "Type Cast",
          "description": "num = int(text) parses the string into an integer."
        },
        {
          "step": 3,
          "title": "Compute & Output",
          "description": "Use the converted number in calculations and display results."
        }
      ],
      "keyTerms": [
        {
          "term": "input()",
          "definition": "Built-in function that reads a line from input as a string."
        },
        {
          "term": "Type Casting",
          "definition": "Explicitly converting a value from one data type to another (e.g. int('42') -> 42)."
        },
        {
          "term": "ValueError",
          "definition": "Raised when trying to cast an incompatible string (like int('abc'))."
        }
      ],
      "realWorldExample": "A digital thermometer takes an analog sensor voltage and casts it into a human-readable decimal temperature number.",
      "timeComplexity": "O(length of input string)",
      "spaceComplexity": "O(length of input string)",
      "whenToUse": "Whenever interacting with a user or processing input piped into the script.",
      "commonMistakes": [
        "Forgetting that input() always returns str: input() + input() concatenates strings instead of adding numbers",
        "Passing a float string directly to int(): int('3.14') throws ValueError (use float('3.14') instead)"
      ],
      "diagramType": "py-print-io"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What data type does input() always return in Python?",
        "options": [
          "int",
          "str",
          "object",
          "dynamic based on content"
        ],
        "correct": 1,
        "explanation": "input() always returns a string (str)."
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "If the user enters 5 and 3, what does print(a + b) output without casting?",
        "options": [
          "8",
          "53",
          "15",
          "TypeError"
        ],
        "correct": 1,
        "explanation": "Since a and b are strings '5' and '3', + concatenates them into '53'."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "Which function converts a string to an integer?",
        "options": [
          "to_int()",
          "int()",
          "Integer.parse()",
          "cast_int()"
        ],
        "correct": 1,
        "explanation": "int() converts valid numeric strings to integers."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "What error is raised by int('hello')?",
        "options": [
          "TypeError",
          "ValueError",
          "KeyError",
          "CastError"
        ],
        "correct": 1,
        "explanation": "Converting non-numeric strings to int raises a ValueError."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "question": "How do you convert float 3.99 into an integer?",
        "options": [
          "int(3.99) -> 3",
          "round(3.99) -> 3",
          "floor(3.99) -> 4",
          "toInt(3.99)"
        ],
        "correct": 0,
        "explanation": "int() truncates the decimal portion, resulting in 3."
      }
    ],
    "logicHints": {
      "approach": "Read a number from input or set a default, square it, and print the result.",
      "keySteps": [
        "Step 1: Read val = input() or use a fallback",
        "Step 2: Cast n = int(val)",
        "Step 3: Compute square = n * n",
        "Step 4: Print the squared value"
      ],
      "pseudocode": "val = INPUT\nn = CAST val TO INT\nPRINT n * n"
    },
    "referenceSolution": "# User Input and Type Casting\nimport sys\n\nraw = sys.stdin.read().strip()\nif not raw:\n    raw = \"7\"\n\nnum = int(raw.split()[0])\nsquare = num ** 2\n\nprint(f\"Input number: {num}\")\nprint(f\"{num} squared is: {square}\")\n"
  },
  "py-conditionals": {
    "id": "py-conditionals",
    "title": "Conditionals (if, elif, else)",
    "category": "Fundamentals",
    "level": "beginner",
    "levelNum": 1,
    "estimatedTime": "10 min",
    "icon": "🔀",
    "concept": {
      "summary": "Branch your code based on logical conditions using if, elif, and else with strict indentation.",
      "whatIsIt": "Python uses whitespace indentation (4 spaces) instead of curly braces to define code blocks. Conditions are evaluated from top to bottom.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Check condition",
          "description": "if score >= 90: evaluates the boolean expression. The colon ':' marks block start."
        },
        {
          "step": 2,
          "title": "Indented Block",
          "description": "All statements in that branch must be indented consistently."
        },
        {
          "step": 3,
          "title": "elif & else",
          "description": "elif handles alternative tests; else handles any fallback."
        }
      ],
      "keyTerms": [
        {
          "term": "Indentation",
          "definition": "Leading whitespace that defines block scope in Python."
        },
        {
          "term": "elif",
          "definition": "Short for 'else if' — tests another condition if previous tests were False."
        },
        {
          "term": "Logical Operators",
          "definition": "Python uses plain English words: 'and', 'or', and 'not'."
        }
      ],
      "realWorldExample": "A traffic light: IF light is green -> go; ELIF light is yellow -> prepare to stop; ELSE -> stop.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "whenToUse": "To make decisions, validate inputs, or branch execution paths.",
      "commonMistakes": [
        "Forgetting the colon ':' at the end of if/elif/else lines",
        "Mixing tabs and spaces (IndentationError)",
        "Writing 'else if' instead of the keyword 'elif'"
      ],
      "diagramType": "py-conditionals"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What character MUST follow an if or elif condition in Python?",
        "options": [
          "Semicolon (;)",
          "Colon (:)",
          "Left brace ({)",
          "Arrow (->)"
        ],
        "correct": 1,
        "explanation": "Every if, elif, else in Python ends with a colon (:)."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "question": "How does Python define the body of an if statement?",
        "options": [
          "Surrounding with begin/end",
          "Surrounding with { }",
          "Whitespace indentation",
          "Parentheses ( )"
        ],
        "correct": 2,
        "explanation": "Python enforces indentation to determine code block boundaries."
      },
      {
        "id": 3,
        "difficulty": "medium",
        "question": "Which logical operators are native to Python?",
        "options": [
          "&&, ||, !",
          "and, or, not",
          "AND, OR, NOT",
          "&, |, ~"
        ],
        "correct": 1,
        "explanation": "Python uses lowercase keywords: 'and', 'or', 'not'."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "question": "What is the keyword for 'else if' in Python?",
        "options": [
          "else if",
          "elseif",
          "elif",
          "else_if"
        ],
        "correct": 2,
        "explanation": "Python uses 'elif'."
      },
      {
        "id": 5,
        "difficulty": "medium",
        "question": "What prints if score = 75?\nif score >= 90: print('A')\nelif score >= 70: print('B')\nelse: print('C')",
        "options": [
          "A",
          "B",
          "C",
          "B and C"
        ],
        "correct": 1,
        "explanation": "75 >= 70 is True, so 'B' is printed."
      }
    ],
    "logicHints": {
      "approach": "Check if a number is positive, negative, or zero.",
      "keySteps": [
        "Step 1: Define num = 42",
        "Step 2: if num > 0 -> Positive",
        "Step 3: elif num < 0 -> Negative",
        "Step 4: else -> Zero"
      ],
      "pseudocode": "IF num > 0 THEN PRINT 'Positive'\nELIF num < 0 THEN PRINT 'Negative'\nELSE PRINT 'Zero'"
    },
    "referenceSolution": "# Conditionals in Python\nnum = 42\n\nif num > 0:\n    print(f\"{num} is Positive\")\nelif num < 0:\n    print(f\"{num} is Negative\")\nelse:\n    print(\"Number is Zero\")\n"
  },
  "py-loops": {
    "id": "py-loops",
    "title": "Loops with for & range()",
    "category": "Loops & Iterations",
    "level": "beginner",
    "levelNum": 2,
    "estimatedTime": "10 min",
    "icon": "🔁",
    "concept": {
      "summary": "Iterate across sequences and numeric ranges cleanly using Python's for loop.",
      "whatIsIt": "Python for-loops are iterators that iterate over elements of any sequence (range, lists, strings), avoiding off-by-one counter bugs.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Generate range",
          "description": "range(start, stop, step) generates integers starting at start up to stop - 1."
        },
        {
          "step": 2,
          "title": "Iteration",
          "description": "for i in range(5): executes 5 times with i = 0, 1, 2, 3, 4."
        },
        {
          "step": 3,
          "title": "Accumulate",
          "description": "Add each value into a running total or perform repetitive logic."
        }
      ],
      "keyTerms": [
        {
          "term": "range(n)",
          "definition": "Returns a sequence of integers from 0 to n-1."
        },
        {
          "term": "for-in",
          "definition": "Iterates through each element in an iterable object."
        },
        {
          "term": "Accumulator",
          "definition": "A variable used to maintain a running sum or state across loop iterations."
        }
      ],
      "realWorldExample": "A playlist playing song 1, song 2, song 3 until the end of the list is reached.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Whenever you know how many times to repeat code or want to traverse a collection.",
      "commonMistakes": [
        "Assuming range(1, 5) includes 5 — it stops at 4",
        "Modifying a list while iterating directly over it"
      ],
      "diagramType": "py-loops"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What numbers does range(1, 5) produce?",
        "options": [
          "1, 2, 3, 4, 5",
          "1, 2, 3, 4",
          "0, 1, 2, 3, 4, 5",
          "2, 3, 4, 5"
        ],
        "correct": 1,
        "explanation": "range(start, stop) stops before stop, producing 1, 2, 3, 4."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "question": "How many times does 'for i in range(3):' execute?",
        "options": [
          "2 times",
          "3 times",
          "4 times",
          "0 times"
        ],
        "correct": 1,
        "explanation": "Iterates for i = 0, 1, 2 (3 times)."
      },
      {
        "id": 3,
        "difficulty": "medium",
        "question": "What does range(10, 0, -2) generate?",
        "options": [
          "10, 8, 6, 4, 2",
          "10, 8, 6, 4, 2, 0",
          "8, 6, 4, 2, 0",
          "Empty sequence"
        ],
        "correct": 0,
        "explanation": "Starts at 10, decrements by 2, stops before 0 (10, 8, 6, 4, 2)."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "question": "Which keyword immediately exits a loop?",
        "options": [
          "exit",
          "skip",
          "break",
          "stop"
        ],
        "correct": 2,
        "explanation": "'break' exits the loop immediately."
      },
      {
        "id": 5,
        "difficulty": "medium",
        "question": "What is the value of total after: total = sum(range(1, 4))?",
        "options": [
          "6",
          "10",
          "4",
          "3"
        ],
        "correct": 0,
        "explanation": "1 + 2 + 3 = 6."
      }
    ],
    "logicHints": {
      "approach": "Sum numbers from 1 to N using range(1, n + 1).",
      "keySteps": [
        "Step 1: n = 5, total = 0",
        "Step 2: for i in range(1, n + 1): total += i",
        "Step 3: Print total"
      ],
      "pseudocode": "total = 0\nFOR i FROM 1 TO N: total += i\nPRINT total"
    },
    "referenceSolution": "# Sum of numbers 1 to N in Python\nn = 5\ntotal = 0\n\nfor i in range(1, n + 1):\n    total += i\n\nprint(f\"Sum of 1 to {n} is: {total}\")\n"
  },
  "py-while-loops": {
    "id": "py-while-loops",
    "title": "While Loops & Sentinel Control",
    "category": "Loops & Iterations",
    "level": "beginner",
    "levelNum": 2,
    "estimatedTime": "10 min",
    "icon": "🔄",
    "concept": {
      "summary": "Repeat code while a boolean condition remains true.",
      "whatIsIt": "While loops execute as long as their condition is True. They are ideal when the number of iterations is not known beforehand (e.g. countdowns, game loops).",
      "howItWorks": [
        {
          "step": 1,
          "title": "Evaluate Condition",
          "description": "while count > 0: checks if count is greater than zero."
        },
        {
          "step": 2,
          "title": "Execute Body",
          "description": "Run statements inside the block."
        },
        {
          "step": 3,
          "title": "Update State",
          "description": "Must update count (e.g. count -= 1) to avoid an infinite loop."
        }
      ],
      "keyTerms": [
        {
          "term": "while",
          "definition": "Executes a block repeatedly as long as the test condition is True."
        },
        {
          "term": "Infinite Loop",
          "definition": "A loop whose condition never becomes False, hanging the program."
        },
        {
          "term": "Sentinel Value",
          "definition": "A special value used to terminate a loop (e.g. typing 'quit')."
        }
      ],
      "realWorldExample": "A battery charger running: while battery < 100%: keep charging.",
      "timeComplexity": "O(iterations)",
      "spaceComplexity": "O(1)",
      "whenToUse": "When loop termination depends on dynamic conditions or user commands.",
      "commonMistakes": [
        "Forgetting to increment/decrement the counter, resulting in an infinite loop",
        "Off-by-one comparisons (using > instead of >=)"
      ],
      "diagramType": "py-loops"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What causes a while loop to become infinite?",
        "options": [
          "Using a break statement",
          "The condition never evaluates to False",
          "Using Python 3",
          "Indenting 4 spaces"
        ],
        "correct": 1,
        "explanation": "If the test condition never becomes False, the loop never terminates."
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "How many times does this loop run?\nx = 3\nwhile x > 0:\n    x -= 1",
        "options": [
          "2 times",
          "3 times",
          "4 times",
          "Infinite"
        ],
        "correct": 1,
        "explanation": "Runs for x = 3, 2, 1 (3 times); when x = 0 the condition is False."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "Which statement skips to the next loop iteration?",
        "options": [
          "skip",
          "pass",
          "continue",
          "next"
        ],
        "correct": 2,
        "explanation": "'continue' skips the rest of the current iteration."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "Can a while loop have an 'else' block in Python?",
        "options": [
          "No, only if statements have else",
          "Yes, it runs when the while condition becomes False naturally",
          "Only in functions",
          "Only with try-except"
        ],
        "correct": 1,
        "explanation": "A while-else block executes when the loop condition becomes False (unless exited by break)."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "question": "What does x -= 1 mean?",
        "options": [
          "x = x - 1",
          "x is less than 1",
          "x equals -1",
          "x decrements only if positive"
        ],
        "correct": 0,
        "explanation": "x -= 1 is shorthand for x = x - 1."
      }
    ],
    "logicHints": {
      "approach": "Reverse the digits of a positive number using a while loop and modulus math.",
      "keySteps": [
        "Step 1: n = 1234, reversed_num = 0",
        "Step 2: while n > 0: digit = n % 10; reversed_num = reversed_num * 10 + digit; n //= 10",
        "Step 3: Print reversed_num"
      ],
      "pseudocode": "WHILE n > 0:\n  digit = n % 10\n  rev = rev * 10 + digit\n  n = n // 10\nPRINT rev"
    },
    "referenceSolution": "# Reverse a number with while loop\nnum = 12345\noriginal = num\nreversed_num = 0\n\nwhile num > 0:\n    digit = num % 10\n    reversed_num = (reversed_num * 10) + digit\n    num //= 10\n\nprint(f\"Original: {original}\")\nprint(f\"Reversed: {reversed_num}\")\n"
  },
  "py-nested-loops-patterns": {
    "id": "py-nested-loops-patterns",
    "title": "Nested Loops & Star Patterns",
    "category": "Loops & Iterations",
    "level": "beginner",
    "levelNum": 2,
    "estimatedTime": "12 min",
    "icon": "⭐",
    "concept": {
      "summary": "Place loops inside loops to generate 2D grids, multiplication tables, and geometric patterns.",
      "whatIsIt": "For each single iteration of the outer loop, the inner loop runs to completion. This is the foundation of 2D coordinates, matrices, and pattern drawing.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Outer Loop (Rows)",
          "description": "Controls which row is currently being printed."
        },
        {
          "step": 2,
          "title": "Inner Loop (Columns)",
          "description": "Prints symbols or values across that row."
        },
        {
          "step": 3,
          "title": "Row Break",
          "description": "After inner loop completes, print() moves to the next line."
        }
      ],
      "keyTerms": [
        {
          "term": "Nested Loop",
          "definition": "A loop statement placed inside the body of another loop."
        },
        {
          "term": "Time Complexity O(N^2)",
          "definition": "Running an N-step loop inside an N-step loop performs N * N iterations."
        }
      ],
      "realWorldExample": "A calendar grid: for each week (outer loop), iterate through each day Monday to Sunday (inner loop).",
      "timeComplexity": "O(rows * cols)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Drawing grids, processing pixels in an image, or comparing pairs of items.",
      "commonMistakes": [
        "Using the same loop variable name for both outer and inner loops",
        "Forgetting print() at the end of each row to move to the next line"
      ],
      "diagramType": "py-loops"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "If outer loop runs 3 times and inner loop runs 4 times, how many total inner iterations occur?",
        "options": [
          "7",
          "12",
          "9",
          "4"
        ],
        "correct": 1,
        "explanation": "3 * 4 = 12 total iterations."
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "How do you print without moving to a new line in Python?",
        "options": [
          "print(x, nl=False)",
          "print(x, end='')",
          "print.noNewline(x)",
          "print(x, next=False)"
        ],
        "correct": 1,
        "explanation": "end='' overrides the default newline with an empty string."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "What is printed by: print('*' * 4)?",
        "options": [
          "****",
          "* * * *",
          "16",
          "SyntaxError"
        ],
        "correct": 0,
        "explanation": "Python string multiplication repeats the string: '****'."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "Which loop runs faster in nested loops?",
        "options": [
          "Outer loop",
          "Inner loop finishes all its cycles per single outer step",
          "Both run in parallel",
          "Depends on variable names"
        ],
        "correct": 1,
        "explanation": "The inner loop runs through all its steps for every single step of the outer loop."
      },
      {
        "id": 5,
        "difficulty": "medium",
        "question": "What complexity results from two loops each iterating N times?",
        "options": [
          "O(N)",
          "O(2N)",
          "O(N^2)",
          "O(log N)"
        ],
        "correct": 2,
        "explanation": "N iterations * N iterations = O(N^2) quadratic complexity."
      }
    ],
    "logicHints": {
      "approach": "Print a right-angled star triangle of height 5.",
      "keySteps": [
        "Step 1: for i in range(1, 6):",
        "Step 2: print('* ' * i)",
        "Step 3: Run and view triangle"
      ],
      "pseudocode": "FOR i FROM 1 TO rows:\n  PRINT '*' i times"
    },
    "referenceSolution": "# Right-angled triangle pattern in Python\nrows = 5\n\nfor i in range(1, rows + 1):\n    for j in range(1, i + 1):\n        print(\"*\", end=\" \")\n    print()  # Move to next row\n"
  },
  "py-list-comprehensions": {
    "id": "py-list-comprehensions",
    "title": "List Comprehensions",
    "category": "Loops & Iterations",
    "level": "beginner",
    "levelNum": 2,
    "estimatedTime": "10 min",
    "icon": "✨",
    "concept": {
      "summary": "Write elegant, one-line list creation and filtering expressions in idiomatic Python.",
      "whatIsIt": "List comprehensions provide a concise way to create lists from existing iterables: [expression for item in iterable if condition].",
      "howItWorks": [
        {
          "step": 1,
          "title": "Expression",
          "description": "The transformed output value placed at the start (e.g. x ** 2)."
        },
        {
          "step": 2,
          "title": "For clause",
          "description": "for x in range(10) specifies the source items."
        },
        {
          "step": 3,
          "title": "Optional Filter",
          "description": "if x % 2 == 0 filters only even items."
        }
      ],
      "keyTerms": [
        {
          "term": "List Comprehension",
          "definition": "A syntactic construct for creating a list based on existing lists."
        },
        {
          "term": "Idiomatic Python (Pythonic)",
          "definition": "Writing code that exploits Python's native features for readability and speed."
        }
      ],
      "realWorldExample": "Filtering a fruit basket: [fruit.upper() for fruit in basket if 'berry' in fruit].",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "whenToUse": "When creating new lists by mapping or filtering existing data.",
      "commonMistakes": [
        "Making comprehensions too long and complex (hurts readability; split into regular loops if > 2 clauses)"
      ],
      "diagramType": "py-collections"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What does [x * 2 for x in [1, 2, 3]] evaluate to?",
        "options": [
          "[1, 2, 3]",
          "[2, 4, 6]",
          "[2, 2, 2]",
          "Error"
        ],
        "correct": 1,
        "explanation": "Multiplies each element by 2: [2, 4, 6]."
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "What does [x for x in range(10) if x % 2 == 0] produce?",
        "options": [
          "All numbers 0-9",
          "Odd numbers [1, 3, 5, 7, 9]",
          "Even numbers [0, 2, 4, 6, 8]",
          "[2, 4, 6, 8, 10]"
        ],
        "correct": 2,
        "explanation": "Filters for even numbers from 0 to 9."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "Which brackets are used for a list comprehension?",
        "options": [
          "( )",
          "{ }",
          "[ ]",
          "< >"
        ],
        "correct": 2,
        "explanation": "Square brackets [ ] produce a list."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "Are list comprehensions generally faster than equivalent manual for-append loops in CPython?",
        "options": [
          "Yes, they run at C-level bytecode optimization",
          "No, they are always slower",
          "They are identical in every way",
          "Only on Linux"
        ],
        "correct": 0,
        "explanation": "List comprehensions are implemented in optimized C bytecode."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "question": "Can a list comprehension transform strings?",
        "options": [
          "No, numbers only",
          "Yes, e.g. [s.upper() for s in words]",
          "Only single characters",
          "Only with regular expressions"
        ],
        "correct": 1,
        "explanation": "Any valid Python expression can be used as the output transformation."
      }
    ],
    "logicHints": {
      "approach": "Create a list of squares for all even numbers between 1 and 10.",
      "keySteps": [
        "Step 1: Use [x ** 2 for x in range(1, 11) if x % 2 == 0]",
        "Step 2: Print the resulting list"
      ],
      "pseudocode": "result = [x * x FOR x IN 1..10 IF x IS EVEN]\nPRINT result"
    },
    "referenceSolution": "# List comprehension in Python\nnumbers = range(1, 11)\neven_squares = [x ** 2 for x in numbers if x % 2 == 0]\n\nprint(\"Original:\", list(numbers))\nprint(\"Even squares:\", even_squares)\n"
  },
  "py-functions-modules": {
    "id": "py-functions-modules",
    "title": "Functions & Default Arguments",
    "category": "Functions & Collections",
    "level": "intermediate",
    "levelNum": 3,
    "estimatedTime": "12 min",
    "icon": "⚡",
    "concept": {
      "summary": "Define reusable functions using def, handle return values, and set default parameters.",
      "whatIsIt": "Functions organize code into modular, testable units. In Python, functions are first-class objects that can be passed as arguments and returned from other functions.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Define with def",
          "description": "def greet(name, greeting='Hello'): defines parameters with optional defaults."
        },
        {
          "step": 2,
          "title": "Return Statement",
          "description": "return value passes results back; without return, None is returned."
        },
        {
          "step": 3,
          "title": "Invoke",
          "description": "Call with positional or keyword arguments: greet('Alice', greeting='Hi')."
        }
      ],
      "keyTerms": [
        {
          "term": "def",
          "definition": "Keyword used to declare a function."
        },
        {
          "term": "Default Argument",
          "definition": "A fallback value assumed when caller does not provide an argument."
        },
        {
          "term": "None",
          "definition": "Python's singleton object representing absence of a value."
        }
      ],
      "realWorldExample": "A blender: put in fruit (parameters), press blend (function body), pour out smoothie (return value).",
      "timeComplexity": "O(1) call overhead",
      "spaceComplexity": "O(1) frame per call",
      "whenToUse": "Whenever you repeat code or want to divide a program into logical modules.",
      "commonMistakes": [
        "Forgetting return and expecting a value from the function",
        "Using mutable defaults like def fn(lst=[]): — the list is shared across calls! Use lst=None instead."
      ],
      "diagramType": "py-functions"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Which keyword defines a function in Python?",
        "options": [
          "function",
          "def",
          "fn",
          "define"
        ],
        "correct": 1,
        "explanation": "Python uses 'def'."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "question": "What does a function return if there is no explicit return statement?",
        "options": [
          "0",
          "False",
          "None",
          "Error"
        ],
        "correct": 2,
        "explanation": "Functions implicitly return None without an explicit return statement."
      },
      {
        "id": 3,
        "difficulty": "medium",
        "question": "Given def add(a, b=10): return a + b, what is add(5)?",
        "options": [
          "5",
          "10",
          "15",
          "Error"
        ],
        "correct": 2,
        "explanation": "b takes default value 10, so 5 + 10 = 15."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "Can a Python function return multiple values?",
        "options": [
          "No, only one",
          "Yes, packed as a tuple",
          "Only via global variables",
          "Only with arrays"
        ],
        "correct": 1,
        "explanation": "Writing 'return x, y' returns a tuple (x, y) that can be unpacked."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "question": "What is a docstring?",
        "options": [
          "A comment inside quotes right after def to document the function",
          "An encrypted string",
          "A type annotation",
          "A debugger tool"
        ],
        "correct": 0,
        "explanation": "Docstrings provide built-in documentation for functions."
      }
    ],
    "logicHints": {
      "approach": "Write a function to calculate factorial iteratively.",
      "keySteps": [
        "Step 1: def factorial(n):",
        "Step 2: result = 1; for i in range(1, n + 1): result *= i",
        "Step 3: return result"
      ],
      "pseudocode": "DEF factorial(n):\n  res = 1\n  FOR i IN 1..n: res *= i\n  RETURN res"
    },
    "referenceSolution": "# Factorial function in Python\ndef factorial(n):\n    \"\"\"Calculate factorial of n iteratively.\"\"\"\n    if n < 0:\n        return None\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result\n\nfor num in [0, 3, 5]:\n    print(f\"{num}! = {factorial(num)}\")\n"
  },
  "py-lists-dictionaries": {
    "id": "py-lists-dictionaries",
    "title": "Lists & Dictionaries",
    "category": "Functions & Collections",
    "level": "intermediate",
    "levelNum": 3,
    "estimatedTime": "15 min",
    "icon": "📚",
    "concept": {
      "summary": "Lists store ordered sequences; dictionaries store fast key-value lookups.",
      "whatIsIt": "Lists ([]) are mutable, ordered sequences accessed by zero-based indexes. Dictionaries ({}) are hash tables mapping unique keys to values with O(1) average lookup.",
      "howItWorks": [
        {
          "step": 1,
          "title": "List Operations",
          "description": "items.append('x'), items.pop(), items[1:3] slicing."
        },
        {
          "step": 2,
          "title": "Dictionary Pairs",
          "description": "person = {'name': 'Sam', 'age': 25}; person['role'] = 'Dev'."
        },
        {
          "step": 3,
          "title": "Safe Access",
          "description": "person.get('salary', 0) prevents KeyError if key does not exist."
        }
      ],
      "keyTerms": [
        {
          "term": "List",
          "definition": "A mutable, ordered collection of items enclosed in square brackets []."
        },
        {
          "term": "Dictionary (dict)",
          "definition": "A collection of key-value pairs enclosed in curly braces {}."
        },
        {
          "term": "dict.get(k, def)",
          "definition": "Safe lookup returning fallback instead of KeyError."
        }
      ],
      "realWorldExample": "A list is like a numbered grocery list. A dictionary is like a contacts app where you look up a person's name to find their phone number.",
      "timeComplexity": "List append: O(1), Dict lookup: O(1)",
      "spaceComplexity": "O(N)",
      "whenToUse": "Use lists for sequences; use dictionaries whenever you need key-based lookup.",
      "commonMistakes": [
        "IndexError when accessing an out-of-range list index",
        "KeyError when accessing a non-existent dictionary key directly"
      ],
      "diagramType": "py-collections"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "How do you append an element to a list?",
        "options": [
          "list.add(x)",
          "list.push(x)",
          "list.append(x)",
          "list.insert(x)"
        ],
        "correct": 2,
        "explanation": "Python lists use .append(x)."
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "What is [10, 20, 30, 40][1:3]?",
        "options": [
          "[10, 20]",
          "[20, 30]",
          "[20, 30, 40]",
          "[10, 20, 30]"
        ],
        "correct": 1,
        "explanation": "Slice [1:3] takes indexes 1 and 2: [20, 30]."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "Which brackets declare a dictionary literal?",
        "options": [
          "( )",
          "[ ]",
          "{ }",
          "< >"
        ],
        "correct": 2,
        "explanation": "Dictionaries use curly braces: {'a': 1}."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "Why use dict.get('k', 0) instead of dict['k']?",
        "options": [
          "Faster",
          "Avoids KeyError if 'k' is missing",
          "Sorts dictionary",
          "Deletes 'k'"
        ],
        "correct": 1,
        "explanation": ".get() returns fallback value instead of raising KeyError."
      },
      {
        "id": 5,
        "difficulty": "medium",
        "question": "What does len({'a': 1, 'b': 2}) return?",
        "options": [
          "1",
          "2",
          "3",
          "4"
        ],
        "correct": 1,
        "explanation": "Returns the number of key-value pairs (2)."
      }
    ],
    "logicHints": {
      "approach": "Calculate sum and average of score list and store summary in dictionary.",
      "keySteps": [
        "Step 1: scores = [85, 92, 78, 90]",
        "Step 2: total = sum(scores), avg = total / len(scores)",
        "Step 3: summary = {'total': total, 'avg': avg}",
        "Step 4: Print summary"
      ],
      "pseudocode": "scores = [85, 92, 78, 90]\ntotal = SUM(scores)\navg = total / LEN(scores)\nPRINT summary"
    },
    "referenceSolution": "# Lists and Dictionaries in Python\nscores = [85, 92, 78, 90]\n\ntotal = sum(scores)\ncount = len(scores)\naverage = total / count\n\nsummary = {\n    \"count\": count,\n    \"total\": total,\n    \"average\": average\n}\n\nprint(\"Scores:\", scores)\nprint(f\"Summary: {summary}\")\n"
  },
  "py-tuples-sets": {
    "id": "py-tuples-sets",
    "title": "Tuples & Sets",
    "category": "Functions & Collections",
    "level": "intermediate",
    "levelNum": 3,
    "estimatedTime": "12 min",
    "icon": "💎",
    "concept": {
      "summary": "Tuples provide immutable sequences; sets enforce unique elements with fast membership testing.",
      "whatIsIt": "Tuples (()) cannot be changed after creation (immutable), making them safe for fixed records and dictionary keys. Sets (set()) hold unordered, unique elements with O(1) membership tests ('in').",
      "howItWorks": [
        {
          "step": 1,
          "title": "Tuples (Immutable)",
          "description": "point = (10, 20); point[0] = 5 throws TypeError."
        },
        {
          "step": 2,
          "title": "Sets (Unique)",
          "description": "unique_ids = {1, 2, 2, 3} automatically de-duplicates to {1, 2, 3}."
        },
        {
          "step": 3,
          "title": "Set Math",
          "description": "setA & setB (intersection), setA | setB (union), setA - setB (difference)."
        }
      ],
      "keyTerms": [
        {
          "term": "Tuple",
          "definition": "An immutable ordered sequence enclosed in parentheses ()."
        },
        {
          "term": "Set",
          "definition": "An unordered collection of unique elements enclosed in curly braces {}."
        },
        {
          "term": "Membership test ('in')",
          "definition": "Checking if an element exists in a collection (O(1) in sets, O(N) in lists)."
        }
      ],
      "realWorldExample": "A tuple is like your date of birth (cannot be altered). A set is like a box of distinct colored markers — duplicate caps are not kept.",
      "timeComplexity": "Set lookup/add: O(1)",
      "spaceComplexity": "O(N)",
      "whenToUse": "Use tuples for read-only records; use sets for de-duplication and membership testing.",
      "commonMistakes": [
        "A single-element tuple requires a trailing comma: (42,) — writing (42) is just an integer inside parentheses!",
        "Trying to declare an empty set with {} — that creates an empty dict! Use set() instead."
      ],
      "diagramType": "py-collections"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Can you modify an element in a tuple after it is created?",
        "options": [
          "Yes, anytime",
          "No, tuples are immutable",
          "Only if it contains numbers",
          "Only in Python 2"
        ],
        "correct": 1,
        "explanation": "Tuples are immutable; modifying them raises a TypeError."
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "How do you create an empty set in Python?",
        "options": [
          "{}",
          "set()",
          "[]",
          "empty_set()"
        ],
        "correct": 1,
        "explanation": "{} creates an empty dictionary; set() creates an empty set."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "What does set([1, 2, 2, 3, 3, 3]) produce?",
        "options": [
          "{1, 2, 2, 3, 3, 3}",
          "{1, 2, 3}",
          "[1, 2, 3]",
          "Error"
        ],
        "correct": 1,
        "explanation": "Sets automatically discard duplicate values: {1, 2, 3}."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "What is the time complexity of 'item in my_set' on average?",
        "options": [
          "O(N)",
          "O(1)",
          "O(N^2)",
          "O(log N)"
        ],
        "correct": 1,
        "explanation": "Sets use hash tables, making membership testing O(1) on average."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "question": "What operator computes the intersection (common items) of two sets?",
        "options": [
          "+",
          "&",
          "|",
          "^"
        ],
        "correct": 1,
        "explanation": "The ampersand '&' performs set intersection."
      }
    ],
    "logicHints": {
      "approach": "Remove duplicates from a list using a set, and find common elements between two sets.",
      "keySteps": [
        "Step 1: nums = [1, 2, 2, 3, 4, 4, 5]",
        "Step 2: unique = set(nums)",
        "Step 3: other = {4, 5, 6, 7}",
        "Step 4: common = unique & other; print both"
      ],
      "pseudocode": "unique = TO_SET(nums)\ncommon = unique INTERSECT other\nPRINT unique, common"
    },
    "referenceSolution": "# Tuples and Sets in Python\ncoordinates = (37.7749, -122.4194)\nprint(f\"Tuple coordinates: {coordinates}\")\n\nraw_data = [1, 2, 2, 3, 4, 4, 5]\nunique_items = set(raw_data)\nallowed_ids = {3, 4, 5, 6, 7}\n\ncommon = unique_items & allowed_ids\nunion = unique_items | allowed_ids\n\nprint(f\"De-duplicated: {unique_items}\")\nprint(f\"Intersection: {common}\")\nprint(f\"Union: {union}\")\n"
  },
  "py-string-algorithms": {
    "id": "py-string-algorithms",
    "title": "String Algorithms & Palindromes",
    "category": "Algorithms & Recursion",
    "level": "intermediate",
    "levelNum": 4,
    "estimatedTime": "15 min",
    "icon": "🔤",
    "concept": {
      "summary": "Process characters, reverse strings with [::-1], and check for palindromes and anagrams.",
      "whatIsIt": "Strings in Python are immutable sequences of Unicode characters. Slicing with step -1 (`s[::-1]`) reverses strings in O(N) time with minimal code.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Clean & Normalize",
          "description": "clean = s.lower().replace(' ', '') removes case differences and spaces."
        },
        {
          "step": 2,
          "title": "Reverse Slice",
          "description": "clean[::-1] creates a reversed copy of the string."
        },
        {
          "step": 3,
          "title": "Comparison",
          "description": "clean == clean[::-1] evaluates True for palindromes."
        }
      ],
      "keyTerms": [
        {
          "term": "Palindrome",
          "definition": "A word or phrase that reads the same forwards and backwards (e.g. 'racecar')."
        },
        {
          "term": "Slice Step [::-1]",
          "definition": "Slicing with step -1 reverses the sequence."
        },
        {
          "term": "str.join()",
          "definition": "Concatenates a list of strings using a delimiter."
        }
      ],
      "realWorldExample": "DNA sequence analysis: checking if a genetic sequence contains symmetrical palindromic restriction sites.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(N)",
      "whenToUse": "Text search, data sanitization, cryptography, and string validation.",
      "commonMistakes": [
        "Forgetting to normalize case: 'Racecar' != 'racecaR' unless both are .lower()",
        "Strings are immutable: s[0] = 'a' throws TypeError; use slicing or join to rebuild"
      ],
      "diagramType": "py-collections"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "How do you reverse a string 'hello' in Python using slicing?",
        "options": [
          "'hello'.reverse()",
          "'hello'[::-1]",
          "'hello'[-1::]",
          "reverse('hello')"
        ],
        "correct": 1,
        "explanation": "[::-1] steps backwards through the entire string."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "question": "Can you change a character in a Python string in place (s[0] = 'X')?",
        "options": [
          "Yes, anytime",
          "No, strings are immutable",
          "Only in Python 3.12+",
          "Only if declared as var"
        ],
        "correct": 1,
        "explanation": "Strings are immutable; you must create a new string."
      },
      {
        "id": 3,
        "difficulty": "medium",
        "question": "What does 'racecar' == 'racecar'[::-1] return?",
        "options": [
          "True",
          "False",
          "None",
          "SyntaxError"
        ],
        "correct": 0,
        "explanation": "'racecar' is identical forwards and backwards (True)."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "question": "What does '-'.join(['a', 'b', 'c']) return?",
        "options": [
          "'abc'",
          "'a-b-c'",
          "'a,b,c'",
          "['-a-', '-b-', '-c-']"
        ],
        "correct": 1,
        "explanation": "join concatenates elements with '-' between them: 'a-b-c'."
      },
      {
        "id": 5,
        "difficulty": "medium",
        "question": "How do you check if two words are anagrams in Python?",
        "options": [
          "word1 == word2",
          "sorted(word1) == sorted(word2)",
          "word1.anagram(word2)",
          "hash(word1) == hash(word2)"
        ],
        "correct": 1,
        "explanation": "If sorted lists of letters match, the words are anagrams."
      }
    ],
    "logicHints": {
      "approach": "Normalize string to lowercase and check if it equals its reverse.",
      "keySteps": [
        "Step 1: clean = text.lower().replace(' ', '')",
        "Step 2: is_pal = clean == clean[::-1]",
        "Step 3: Print result"
      ],
      "pseudocode": "clean = LOWERCASE(text)\nIF clean == REVERSE(clean) THEN\n  PRINT 'Palindrome'\nELSE PRINT 'Not Palindrome'"
    },
    "referenceSolution": "# Palindrome Checker in Python\ndef is_palindrome(text):\n    clean = \"\".join(ch.lower() for ch in text if ch.isalnum())\n    return clean == clean[::-1]\n\ntest_words = [\"racecar\", \"A man a plan a canal Panama\", \"hello\"]\nfor word in test_words:\n    status = \"is a palindrome\" if is_palindrome(word) else \"is NOT a palindrome\"\n    print(f\"'{word}' -> {status}\")\n"
  },
  "py-searching": {
    "id": "py-searching",
    "title": "Linear & Binary Search",
    "category": "Algorithms & Recursion",
    "level": "intermediate",
    "levelNum": 4,
    "estimatedTime": "15 min",
    "icon": "🔍",
    "concept": {
      "summary": "Locate elements sequentially with Linear Search O(N) or divide-and-conquer with Binary Search O(log N).",
      "whatIsIt": "Binary Search finds the position of a target value within a SORTED list by repeatedly dividing the search interval in half, outperforming linear search on large datasets.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Pointers",
          "description": "Set low = 0 and high = len(arr) - 1."
        },
        {
          "step": 2,
          "title": "Midpoint",
          "description": "mid = (low + high) // 2. If arr[mid] == target, return mid."
        },
        {
          "step": 3,
          "title": "Halve Search Space",
          "description": "If arr[mid] < target, set low = mid + 1; otherwise set high = mid - 1."
        }
      ],
      "keyTerms": [
        {
          "term": "Linear Search",
          "definition": "Checks every element one by one from start to finish (O(N))."
        },
        {
          "term": "Binary Search",
          "definition": "Efficiently searches a SORTED collection by halving search space (O(log N))."
        },
        {
          "term": "Sorted Precondition",
          "definition": "Binary search ONLY works if data is already sorted."
        }
      ],
      "realWorldExample": "Opening a physical dictionary: you don't read from page 1; you open the middle, see if your word is earlier or later, and discard half the book.",
      "timeComplexity": "Linear: O(N), Binary: O(log N)",
      "spaceComplexity": "O(1) iterative",
      "whenToUse": "Use Linear search on small/unsorted data; use Binary search on sorted lists.",
      "commonMistakes": [
        "Applying binary search to an unsorted list without sorting first",
        "Integer overflow or infinite loop if pointers are updated incorrectly (use mid + 1 and mid - 1)"
      ],
      "diagramType": "py-loops"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What is the prerequisite for Binary Search to work correctly?",
        "options": [
          "List must contain only integers",
          "List must be sorted",
          "List must have even length",
          "List must be a set"
        ],
        "correct": 1,
        "explanation": "Binary search requires sorted data to decide which half to discard."
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "What is the time complexity of Binary Search on a list of size N?",
        "options": [
          "O(N)",
          "O(N^2)",
          "O(log N)",
          "O(1)"
        ],
        "correct": 2,
        "explanation": "Each step cuts the search space in half, giving O(log N) logarithmic time."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "At most how many comparisons does Binary Search take for 1,000 items?",
        "options": [
          "1,000",
          "500",
          "About 10 (log2 1000 ≈ 10)",
          "100"
        ],
        "correct": 2,
        "explanation": "2^10 = 1024, so at most 10 comparisons are needed."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "What value should a search function return if the target is NOT found?",
        "options": [
          "None or -1",
          "0",
          "True",
          "Raise ZeroDivisionError"
        ],
        "correct": 0,
        "explanation": "By convention, index -1 or None signals element not found."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "question": "Which Python module provides built-in binary search functions?",
        "options": [
          "math",
          "bisect",
          "search",
          "collections"
        ],
        "correct": 1,
        "explanation": "The 'bisect' module provides binary search algorithms (bisect_left, insort)."
      }
    ],
    "logicHints": {
      "approach": "Implement iterative binary search on a sorted list.",
      "keySteps": [
        "Step 1: low = 0, high = len(arr) - 1",
        "Step 2: while low <= high: mid = (low + high) // 2",
        "Step 3: Adjust low or high based on comparison",
        "Step 4: Return index or -1"
      ],
      "pseudocode": "WHILE low <= high:\n  mid = (low + high) // 2\n  IF arr[mid] == target: RETURN mid\n  ELIF arr[mid] < target: low = mid + 1\n  ELSE: high = mid - 1\nRETURN -1"
    },
    "referenceSolution": "# Binary Search in Python\ndef binary_search(arr, target):\n    low = 0\n    high = len(arr) - 1\n\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nsorted_nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]\ntarget = 23\n\nidx = binary_search(sorted_nums, target)\nprint(f\"List: {sorted_nums}\")\nprint(f\"Target {target} found at index: {idx}\")\n"
  },
  "py-sorting": {
    "id": "py-sorting",
    "title": "Sorting Algorithms (Bubble & Selection)",
    "category": "Algorithms & Recursion",
    "level": "intermediate",
    "levelNum": 4,
    "estimatedTime": "15 min",
    "icon": "📊",
    "concept": {
      "summary": "Understand the fundamentals of ordering elements by comparing and swapping.",
      "whatIsIt": "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest elements 'bubble' to the top.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Outer Pass",
          "description": "for i in range(n - 1) makes n passes over the list."
        },
        {
          "step": 2,
          "title": "Adjacent Comparison",
          "description": "if arr[j] > arr[j + 1]: swap arr[j] and arr[j + 1]."
        },
        {
          "step": 3,
          "title": "Python Swap",
          "description": "Use Python's tuple unpacking: arr[j], arr[j+1] = arr[j+1], arr[j]."
        }
      ],
      "keyTerms": [
        {
          "term": "Bubble Sort",
          "definition": "A comparison sort that swaps adjacent out-of-order elements (O(N^2))."
        },
        {
          "term": "Tuple Swap",
          "definition": "a, b = b, a swaps two variables in Python without needing a temporary variable."
        },
        {
          "term": "sorted() & .sort()",
          "definition": "Python's built-in Timsort algorithm running in O(N log N) time."
        }
      ],
      "realWorldExample": "Sorting playing cards in your hand by sliding higher cards past lower ones until all are in order.",
      "timeComplexity": "Bubble: O(N^2), Python built-in Timsort: O(N log N)",
      "spaceComplexity": "O(1) in-place",
      "whenToUse": "Great for learning algorithm mechanics and understanding comparisons/swaps.",
      "commonMistakes": [
        "Confusing sorted(lst) (returns a new list) with lst.sort() (sorts in place and returns None)"
      ],
      "diagramType": "py-loops"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "How do you swap two variables a and b in Python without a third variable?",
        "options": [
          "swap(a, b)",
          "a, b = b, a",
          "a.swap(b)",
          "a = b; b = a"
        ],
        "correct": 1,
        "explanation": "Python tuple assignment 'a, b = b, a' swaps values in one atomic step."
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "What is the worst-case time complexity of Bubble Sort?",
        "options": [
          "O(N)",
          "O(N log N)",
          "O(N^2)",
          "O(1)"
        ],
        "correct": 2,
        "explanation": "Bubble sort makes N passes with up to N comparisons, giving O(N^2)."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "What does my_list.sort() return in Python?",
        "options": [
          "The sorted list",
          "None (sorts in place)",
          "The length of the list",
          "A boolean"
        ],
        "correct": 1,
        "explanation": "list.sort() modifies the list in place and returns None."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "What sorting algorithm is built into Python's sorted()?",
        "options": [
          "QuickSort",
          "HeapSort",
          "Timsort (hybrid Merge/Insertion sort)",
          "BubbleSort"
        ],
        "correct": 2,
        "explanation": "Python uses Timsort, created by Tim Peters, which is adaptive and stable O(N log N)."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "question": "How do you sort a list in descending order?",
        "options": [
          "lst.sort(descending=True)",
          "lst.sort(reverse=True)",
          "reverse(lst.sort())",
          "lst.sort(-1)"
        ],
        "correct": 1,
        "explanation": "Pass reverse=True: lst.sort(reverse=True) or sorted(lst, reverse=True)."
      }
    ],
    "logicHints": {
      "approach": "Implement bubble sort using nested loops and tuple swapping.",
      "keySteps": [
        "Step 1: n = len(arr)",
        "Step 2: for i in range(n): for j in range(0, n - i - 1):",
        "Step 3: if arr[j] > arr[j+1]: swap",
        "Step 4: Return sorted array"
      ],
      "pseudocode": "FOR i FROM 0 TO n-1:\n  FOR j FROM 0 TO n-i-2:\n    IF arr[j] > arr[j+1]: SWAP(arr[j], arr[j+1])"
    },
    "referenceSolution": "# Bubble Sort in Python\ndef bubble_sort(arr):\n    a = arr.copy()\n    n = len(a)\n    for i in range(n):\n        swapped = False\n        for j in range(0, n - i - 1):\n            if a[j] > a[j + 1]:\n                a[j], a[j + 1] = a[j + 1], a[j]\n                swapped = True\n        if not swapped:\n            break\n    return a\n\nraw = [64, 34, 25, 12, 22, 11, 90]\nsorted_arr = bubble_sort(raw)\nprint(\"Original:\", raw)\nprint(\"Sorted:  \", sorted_arr)\n"
  },
  "py-recursion-basics": {
    "id": "py-recursion-basics",
    "title": "Recursion & Call Stack",
    "category": "Algorithms & Recursion",
    "level": "intermediate",
    "levelNum": 4,
    "estimatedTime": "15 min",
    "icon": "🪞",
    "concept": {
      "summary": "Solve problems by dividing them into smaller subproblems through self-calling functions.",
      "whatIsIt": "A recursive function calls itself to solve smaller instances of the same problem until it reaches a terminating condition called the Base Case.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Base Case",
          "description": "if n <= 1: return 1 stops the recursion and prevents stack overflow."
        },
        {
          "step": 2,
          "title": "Recursive Step",
          "description": "return n * factorial(n - 1) breaks the problem down."
        },
        {
          "step": 3,
          "title": "Stack Unwinding",
          "description": "Once the base case is hit, stack frames return values back up the chain."
        }
      ],
      "keyTerms": [
        {
          "term": "Base Case",
          "definition": "The condition under which a recursive function returns without making further recursive calls."
        },
        {
          "term": "Call Stack",
          "definition": "Memory structure storing active function frames; recursion pushes a new frame for every call."
        },
        {
          "term": "RecursionError",
          "definition": "Raised when Python exceeds its maximum recursion depth (default 1000)."
        }
      ],
      "realWorldExample": "Russian Matryoshka nesting dolls: you open a doll to find a smaller doll, until you reach the smallest solid doll (base case).",
      "timeComplexity": "Factorial: O(N), Fibonacci: O(2^N)",
      "spaceComplexity": "O(N) stack frames",
      "whenToUse": "Tree traversal, divide-and-conquer algorithms, and mathematical recurrence relations.",
      "commonMistakes": [
        "Omitting the base case, leading to RecursionError: maximum recursion depth exceeded",
        "Modifying state without passing updated arguments into the recursive call"
      ],
      "diagramType": "py-functions"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What must EVERY recursive function have to avoid infinite execution?",
        "options": [
          "A while loop",
          "A base case",
          "A global variable",
          "A lambda function"
        ],
        "correct": 1,
        "explanation": "Without a base case, the function calls itself indefinitely."
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "What exception is raised when Python exceeds its recursion limit?",
        "options": [
          "StackOverflowError",
          "RecursionError",
          "MemoryError",
          "DepthExceededException"
        ],
        "correct": 1,
        "explanation": "Python raises RecursionError: maximum recursion depth exceeded."
      },
      {
        "id": 3,
        "difficulty": "medium",
        "question": "What is the base case for calculating n! (factorial)?",
        "options": [
          "n == 10",
          "n <= 1 (returns 1)",
          "n == 0 (returns 0)",
          "n < 0"
        ],
        "correct": 1,
        "explanation": "0! and 1! both equal 1, making n <= 1 the base case."
      },
      {
        "id": 4,
        "difficulty": "easy",
        "question": "Where are active recursive function calls stored in memory?",
        "options": [
          "Heap",
          "Call Stack",
          "Hard Drive",
          "Cache Register"
        ],
        "correct": 1,
        "explanation": "Each function call pushes an execution frame onto the Call Stack."
      },
      {
        "id": 5,
        "difficulty": "medium",
        "question": "How do you calculate Fibonacci recursively?",
        "options": [
          "fib(n-1) * fib(n-2)",
          "fib(n-1) + fib(n-2)",
          "fib(n) / 2",
          "fib(n-1) - 1"
        ],
        "correct": 1,
        "explanation": "Fibonacci numbers are defined by F(n) = F(n-1) + F(n-2)."
      }
    ],
    "logicHints": {
      "approach": "Implement recursive Fibonacci with base cases n == 0 -> 0, n == 1 -> 1.",
      "keySteps": [
        "Step 1: if n <= 0: return 0",
        "Step 2: if n == 1: return 1",
        "Step 3: return fib(n - 1) + fib(n - 2)"
      ],
      "pseudocode": "DEF fib(n):\n  IF n <= 0: RETURN 0\n  IF n == 1: RETURN 1\n  RETURN fib(n-1) + fib(n-2)"
    },
    "referenceSolution": "# Recursive Fibonacci in Python\ndef fibonacci(n):\n    if n <= 0:\n        return 0\n    elif n == 1:\n        return 1\n    return fibonacci(n - 1) + fibonacci(n - 2)\n\nterms = 8\nprint(f\"First {terms} Fibonacci numbers:\")\nfor i in range(terms):\n    print(fibonacci(i), end=\" \")\nprint()\n"
  },
  "py-oop-classes": {
    "id": "py-oop-classes",
    "title": "Classes & Objects",
    "category": "OOP & Error Handling",
    "level": "advanced",
    "levelNum": 5,
    "estimatedTime": "20 min",
    "icon": "🏛️",
    "concept": {
      "summary": "Model entities with classes, encapsulate state with __init__, and bind methods with self.",
      "whatIsIt": "Classes are blueprints for creating objects. An object encapsulates data (attributes) and behavior (methods). In Python, 'self' represents the instance itself.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Class Definition",
          "description": "class Student: defines the blueprint."
        },
        {
          "step": 2,
          "title": "__init__ Constructor",
          "description": "def __init__(self, name, gpa): initializes instance variables."
        },
        {
          "step": 3,
          "title": "Instance Methods",
          "description": "Methods inside the class take self as first parameter to access attributes."
        }
      ],
      "keyTerms": [
        {
          "term": "class",
          "definition": "A blueprint for creating objects with defined attributes and methods."
        },
        {
          "term": "self",
          "definition": "Explicit reference to the current instance of the class in method definitions."
        },
        {
          "term": "__init__",
          "definition": "The special initializer method invoked during instantiation."
        }
      ],
      "realWorldExample": "A blueprint for a car is the Class. Every car manufactured on the road is an Object instance.",
      "timeComplexity": "O(1) attribute access",
      "spaceComplexity": "O(attributes) per instance",
      "whenToUse": "When structuring complex state, building APIs, or domain models.",
      "commonMistakes": [
        "Omitting 'self' as first parameter in method signatures",
        "Confusing class attributes (shared by all) with instance attributes (self.x)"
      ],
      "diagramType": "py-oop"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What is the initializer method called in Python classes?",
        "options": [
          "constructor()",
          "__init__()",
          "new()",
          "__construct__()"
        ],
        "correct": 1,
        "explanation": "Python classes use __init__() as the initializer."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "question": "What must be the first parameter of every instance method?",
        "options": [
          "this",
          "cls",
          "self",
          "obj"
        ],
        "correct": 2,
        "explanation": "Instance methods declare 'self' as their first parameter."
      },
      {
        "id": 3,
        "difficulty": "medium",
        "question": "How do you instantiate an object of class Dog with name='Buddy'?",
        "options": [
          "Dog dog = new Dog('Buddy')",
          "my_dog = Dog('Buddy')",
          "my_dog = create Dog('Buddy')",
          "my_dog = Dog.new('Buddy')"
        ],
        "correct": 1,
        "explanation": "Python calls the class directly without 'new': my_dog = Dog('Buddy')."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "What does __str__() do in a Python class?",
        "options": [
          "Converts class to binary",
          "Defines the string representation when printed",
          "Counts characters in class",
          "Deletes object"
        ],
        "correct": 1,
        "explanation": "__str__() defines the string displayed by str() or print()."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "question": "What is an attribute bound to self called?",
        "options": [
          "Class variable",
          "Instance variable",
          "Global variable",
          "Macro"
        ],
        "correct": 1,
        "explanation": "Attributes on self are instance variables unique to each object."
      }
    ],
    "logicHints": {
      "approach": "Create a BankAccount class with deposit and withdraw methods.",
      "keySteps": [
        "Step 1: class BankAccount with __init__(self, owner, balance=0)",
        "Step 2: def deposit(self, amt)",
        "Step 3: def withdraw(self, amt)",
        "Step 4: Instantiate and test"
      ],
      "pseudocode": "CLASS BankAccount:\n  INIT(owner, balance):\n    self.owner = owner\n    self.balance = balance\n  METHOD deposit(amount): balance += amount\n  METHOD withdraw(amount): balance -= amount"
    },
    "referenceSolution": "# BankAccount OOP in Python\nclass BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n\n    def deposit(self, amount):\n        if amount > 0:\n            self.balance += amount\n            print(f\"Deposited ${amount}. Balance: ${self.balance}\")\n        return self.balance\n\n    def withdraw(self, amount):\n        if amount > self.balance:\n            print(\"Insufficient funds!\")\n            return False\n        self.balance -= amount\n        print(f\"Withdrew ${amount}. Balance: ${self.balance}\")\n        return True\n\nacc = BankAccount(\"Alice\", 100)\nacc.deposit(50)\nacc.withdraw(30)\nprint(f\"Final balance for {acc.owner}: ${acc.balance}\")\n"
  },
  "py-oop-inheritance": {
    "id": "py-oop-inheritance",
    "title": "Inheritance & Polymorphism",
    "category": "OOP & Error Handling",
    "level": "advanced",
    "levelNum": 5,
    "estimatedTime": "18 min",
    "icon": "🧬",
    "concept": {
      "summary": "Reuse and extend classes using inheritance, super(), and method overriding.",
      "whatIsIt": "Inheritance allows a child class to inherit attributes and methods from a parent class. super() delegates method calls to the parent class.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Parent Class",
          "description": "class Animal: defines common attributes like name and sound."
        },
        {
          "step": 2,
          "title": "Child Class",
          "description": "class Dog(Animal): inherits all methods from Animal."
        },
        {
          "step": 3,
          "title": "super() Call",
          "description": "super().__init__(name) invokes the parent constructor."
        }
      ],
      "keyTerms": [
        {
          "term": "Inheritance",
          "definition": "Mechanism where a subclass inherits methods and fields from a superclass."
        },
        {
          "term": "super()",
          "definition": "Built-in function giving access to methods in a parent class."
        },
        {
          "term": "Method Overriding",
          "definition": "A subclass providing its own specific implementation of a method defined in the parent."
        }
      ],
      "realWorldExample": "Vehicle is a parent class; Car and ElectricCar are subclasses that inherit wheels and steering, but ElectricCar adds battery logic.",
      "timeComplexity": "O(1) method resolution (MRO)",
      "spaceComplexity": "O(instance fields)",
      "whenToUse": "When multiple entities share common behavior and form an 'is-a' relationship.",
      "commonMistakes": [
        "Forgetting to call super().__init__() in the subclass constructor",
        "Deep inheritance trees (prefer composition over deep inheritance)"
      ],
      "diagramType": "py-oop"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "How does a class Dog inherit from class Animal in Python?",
        "options": [
          "class Dog extends Animal:",
          "class Dog(Animal):",
          "class Dog implements Animal:",
          "class Dog: Animal"
        ],
        "correct": 1,
        "explanation": "Python uses parentheses for inheritance: class Dog(Animal):"
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "What does super().__init__() do?",
        "options": [
          "Calls the child constructor",
          "Calls the parent class constructor",
          "Deletes the instance",
          "Resets all variables to 0"
        ],
        "correct": 1,
        "explanation": "super().__init__() executes the constructor of the parent class."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "What is polymorphism?",
        "options": [
          "Using classes in multiple files",
          "Different classes responding to the same method call with their own behavior",
          "Encrypting code",
          "Converting types"
        ],
        "correct": 1,
        "explanation": "Polymorphism allows different classes to share the same method interface."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "Can a Python class inherit from multiple classes simultaneously?",
        "options": [
          "No, only single inheritance",
          "Yes, Python supports multiple inheritance",
          "Only if interfaces are used",
          "Only in Python 2"
        ],
        "correct": 1,
        "explanation": "Python natively supports multiple inheritance (class C(A, B):)."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "question": "Which built-in function checks if an object is an instance of a class?",
        "options": [
          "type_of()",
          "isinstance()",
          "is_a()",
          "has_type()"
        ],
        "correct": 1,
        "explanation": "isinstance(obj, ClassName) returns True if obj is an instance."
      }
    ],
    "logicHints": {
      "approach": "Create a Shape base class with area() and a Rectangle subclass that implements area().",
      "keySteps": [
        "Step 1: class Shape: def area(self): return 0",
        "Step 2: class Rectangle(Shape): def __init__(self, w, h): self.w = w; self.h = h",
        "Step 3: def area(self): return self.w * self.h",
        "Step 4: Instantiate and print area"
      ],
      "pseudocode": "CLASS Shape:\n  METHOD area(): RETURN 0\nCLASS Rectangle(Shape):\n  INIT(w, h): self.w = w, self.h = h\n  METHOD area(): RETURN w * h"
    },
    "referenceSolution": "# Inheritance and Polymorphism in Python\nclass Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return \"...\"\n\nclass Dog(Animal):\n    def speak(self):\n        return \"Woof!\"\n\nclass Cat(Animal):\n    def speak(self):\n        return \"Meow!\"\n\nanimals = [Dog(\"Buddy\"), Cat(\"Luna\")]\nfor a in animals:\n    print(f\"{a.name} says: {a.speak()}\")\n"
  },
  "py-exceptions": {
    "id": "py-exceptions",
    "title": "Exception Handling (try-except-finally)",
    "category": "OOP & Error Handling",
    "level": "advanced",
    "levelNum": 5,
    "estimatedTime": "15 min",
    "icon": "🛡️",
    "concept": {
      "summary": "Write fault-tolerant code by intercepting runtime errors using try, except, else, and finally.",
      "whatIsIt": "Exceptions are runtime errors (ZeroDivisionError, ValueError, KeyError). Catching them prevents crashes and lets programs recover gracefully.",
      "howItWorks": [
        {
          "step": 1,
          "title": "try block",
          "description": "Enclose code that might fail inside try:."
        },
        {
          "step": 2,
          "title": "except block",
          "description": "except ValueError as e: catches specific error types and handles them."
        },
        {
          "step": 3,
          "title": "finally block",
          "description": "finally: executes clean-up logic unconditionally, regardless of errors."
        }
      ],
      "keyTerms": [
        {
          "term": "try-except",
          "definition": "Construct to catch and handle runtime exceptions."
        },
        {
          "term": "finally",
          "definition": "A block that is guaranteed to run, often used for closing files or connections."
        },
        {
          "term": "raise",
          "definition": "Keyword used to trigger an exception intentionally."
        }
      ],
      "realWorldExample": "A seatbelt in a car: under normal conditions you drive freely; if a sudden crash occurs (exception), the seatbelt engages and saves you.",
      "timeComplexity": "O(1) overhead when no exception occurs",
      "spaceComplexity": "O(traceback) during exception",
      "whenToUse": "File I/O, parsing user input, network calls, and data conversions.",
      "commonMistakes": [
        "Using bare except: without specifying the error type (swallows bugs and Ctrl+C)",
        "Putting too much unrelated code inside the try block"
      ],
      "diagramType": "py-print-io"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Which block always runs, whether an exception occurred or not?",
        "options": [
          "try",
          "except",
          "else",
          "finally"
        ],
        "correct": 3,
        "explanation": "The 'finally' block is guaranteed to execute."
      },
      {
        "id": 2,
        "difficulty": "medium",
        "question": "What error does 10 / 0 raise in Python?",
        "options": [
          "ArithmeticError",
          "ZeroDivisionError",
          "NullError",
          "MathError"
        ],
        "correct": 1,
        "explanation": "Dividing by zero raises ZeroDivisionError."
      },
      {
        "id": 3,
        "difficulty": "easy",
        "question": "Which keyword is used to trigger an exception manually?",
        "options": [
          "throw",
          "raise",
          "error",
          "catch"
        ],
        "correct": 1,
        "explanation": "Python uses 'raise' (unlike Java/JS which use 'throw')."
      },
      {
        "id": 4,
        "difficulty": "medium",
        "question": "What does the 'else' block do in a try-except structure?",
        "options": [
          "Runs if an exception was caught",
          "Runs ONLY if NO exception occurred in the try block",
          "Runs before the try block",
          "Replaces finally"
        ],
        "correct": 1,
        "explanation": "The 'else' block executes only if the try block succeeded without errors."
      },
      {
        "id": 5,
        "difficulty": "easy",
        "question": "Why is bare 'except:' considered bad practice?",
        "options": [
          "It is slower",
          "It catches SystemExit and KeyboardInterrupt, preventing user cancellation",
          "It is deprecated in Python 3",
          "It crashes the interpreter"
        ],
        "correct": 1,
        "explanation": "A bare except catches interrupt signals, masking true errors."
      }
    ],
    "logicHints": {
      "approach": "Implement safe division that handles ZeroDivisionError and ValueError.",
      "keySteps": [
        "Step 1: try: res = a / b",
        "Step 2: except ZeroDivisionError: return 'Cannot divide by zero'",
        "Step 3: Test with valid numbers and 0"
      ],
      "pseudocode": "TRY:\n  res = a / b\nEXCEPT ZeroDivisionError:\n  RETURN 'Error: Division by zero'\nRETURN res"
    },
    "referenceSolution": "# Exception Handling in Python\ndef safe_divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        return \"Error: Cannot divide by zero!\"\n    except TypeError:\n        return \"Error: Both inputs must be numbers!\"\n    else:\n        return f\"Result: {result}\"\n    finally:\n        # Clean up or logging milestone\n        pass\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))\nprint(safe_divide(\"10\", 2))\n"
  }
};
