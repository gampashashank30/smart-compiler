// ─── AI Tutor Curriculum Data ─────────────────────────────────────────────────
// Pre-written educational content for all C programming topics.
// NO AI generation here — every word is hardcoded for reliability.
// Based on Anna University / VTU / JNTU / Mumbai University B.Tech CS syllabi.

export const TUTOR_CURRICULUM = {
    "hello-world": {
        "id": "hello-world",
        "title": "Hello World & Basic Output",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "👋",
        "estimatedTime": "5 min",
        "concept": {
            "summary": "Your very first C program — printing text to the screen. Every programmer starts here.",
            "whatIsIt": "A \"Hello World\" program is the simplest possible program you can write. It teaches you the basic skeleton of every C program: the includes, the main function, and how to print output. Think of it as learning to say \"Hello\" in a new language.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Include the header",
                    "description": "#include <stdio.h> loads the \"standard input/output\" library — it gives you printf() to print and scanf() to read input."
                },
                {
                    "step": 2,
                    "title": "Write the main function",
                    "description": "int main() is where your program starts running. Every C program MUST have exactly one main() function."
                },
                {
                    "step": 3,
                    "title": "Call printf()",
                    "description": "printf(\"Hello, World!\\n\") prints text to the screen. The \\n at the end moves the cursor to a new line."
                },
                {
                    "step": 4,
                    "title": "Return 0",
                    "description": "return 0; tells the operating system the program finished successfully. Non-zero means something went wrong."
                }
            ],
            "keyTerms": [
                {
                    "term": "#include",
                    "definition": "A preprocessor directive that pastes another file's contents into yours before compiling. Like copy-pasting a library."
                },
                {
                    "term": "stdio.h",
                    "definition": "Standard Input/Output header — contains printf, scanf, and other input/output functions."
                },
                {
                    "term": "main()",
                    "definition": "The entry point of every C program. Execution always starts here."
                },
                {
                    "term": "printf()",
                    "definition": "Print formatted — displays text or numbers on the screen."
                },
                {
                    "term": "\\n",
                    "definition": "Newline escape character — moves the cursor to the next line, like pressing Enter."
                },
                {
                    "term": "return 0",
                    "definition": "Exits the main function and tells the OS the program ran without errors."
                }
            ],
            "realWorldExample": "Think of #include like downloading an app. You don't build a calculator from scratch every time — you just use the calculator app. Similarly, #include <stdio.h> gives you ready-made input/output tools.",
            "timeComplexity": null,
            "spaceComplexity": "O(1)",
            "whenToUse": "This is your starting template — every C program begins with this skeleton.",
            "commonMistakes": [
                "Forgetting the semicolon after printf(\"Hello\");",
                "Writing Printf() with capital P — C is case-sensitive",
                "Forgetting #include <stdio.h> — printf won't work without it",
                "Using single quotes instead of double quotes: printf('Hello') is wrong"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What does #include <stdio.h> do in a C program?",
                "options": [
                    "A) It starts the program execution",
                    "B) It includes the standard input/output library for printf/scanf",
                    "C) It defines the main function",
                    "D) It prints text to the screen"
                ],
                "correct": 1,
                "explanation": "#include <stdio.h> loads the standard I/O library, which gives you access to printf() and scanf(). Without it, the compiler won't recognize printf."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What does \\n do inside a printf() string?",
                "options": [
                    "A) Prints the letter n",
                    "B) Ends the program",
                    "C) Moves the cursor to a new line",
                    "D) Adds a tab space"
                ],
                "correct": 2,
                "explanation": "\\n is an escape character that represents a newline. It moves the cursor to the beginning of the next line — like pressing Enter."
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": "What must every C program have?",
                "options": [
                    "A) A printf() statement",
                    "B) Multiple functions",
                    "C) A main() function",
                    "D) A for loop"
                ],
                "correct": 2,
                "explanation": "Every C program must have exactly one main() function. Execution always starts at main(). Without it, the program won't know where to begin."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "What is wrong with this code: printf(\"Hello World\")",
                "options": [
                    "A) Nothing is wrong",
                    "B) Missing semicolon at the end",
                    "C) Wrong function name",
                    "D) Missing #include"
                ],
                "correct": 1,
                "explanation": "Every statement in C must end with a semicolon (;). Missing it causes a compile error. Correct: printf(\"Hello World\");"
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What does \"return 0\" at the end of main() mean?",
                "options": [
                    "A) The program returns the value 0 to a variable",
                    "B) The program loops back to the beginning",
                    "C) The program exited successfully (no errors)",
                    "D) The program prints 0 on screen"
                ],
                "correct": 2,
                "explanation": "return 0 from main() tells the operating system the program finished without errors. A non-zero return value signals an error occurred."
            }
        ],
        "logicHints": {
            "approach": "Structure a minimal C program that prints a message to the console.",
            "keySteps": [
                "Step 1: Include <stdio.h> for printf",
                "Step 2: Write the int main() function signature",
                "Step 3: Call printf() with your message inside double quotes",
                "Step 4: Add \\n at the end of the string for a new line",
                "Step 5: Add return 0; and close the braces"
            ],
            "pseudocode": "INCLUDE stdio library\nDEFINE main function:\n  PRINT \"Hello, World!\" followed by newline\n  RETURN 0 (success)"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    /* printf prints text to the screen */\n    /* \\n moves the cursor to the next line */\n    printf(\"Hello, World!\\n\");\n\n    return 0; /* 0 = program ran successfully */\n}",
        "flowDiagramType": null
    },
    "variables-datatypes": {
        "id": "variables-datatypes",
        "title": "Variables & Data Types",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "📦",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Variables are named containers that store data. Data types tell the computer how much space to reserve and what kind of data goes in.",
            "whatIsIt": "Imagine your computer's memory as a row of numbered boxes. A variable is a label you put on a box so you can find it by name. The data type tells the computer how big the box should be — an int needs 4 bytes, a char needs 1 byte, and a double needs 8 bytes.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Choose a data type",
                    "description": "Decide what kind of data you need: int for whole numbers, float/double for decimals, char for single characters."
                },
                {
                    "step": 2,
                    "title": "Declare the variable",
                    "description": "Write: dataType variableName; — this reserves memory. Example: int age;"
                },
                {
                    "step": 3,
                    "title": "Assign a value",
                    "description": "Use the = operator to store a value: age = 20; You can also combine: int age = 20;"
                },
                {
                    "step": 4,
                    "title": "Use the variable",
                    "description": "Read or print the variable: printf(\"%d\", age); — use the right format specifier for the type."
                }
            ],
            "keyTerms": [
                {
                    "term": "int",
                    "definition": "Stores whole numbers (integers) like -5, 0, 42. Takes 4 bytes of memory."
                },
                {
                    "term": "float",
                    "definition": "Stores decimal numbers like 3.14, -0.5. Takes 4 bytes. Less precise than double."
                },
                {
                    "term": "double",
                    "definition": "Stores decimal numbers with more precision. Takes 8 bytes. Use this for most calculations."
                },
                {
                    "term": "char",
                    "definition": "Stores a single character like 'A' or '9'. Takes 1 byte. Uses single quotes."
                },
                {
                    "term": "Format specifier",
                    "definition": "A placeholder in printf/scanf that tells what type to print/read. %d for int, %f for float, %c for char, %s for string."
                },
                {
                    "term": "Declaration",
                    "definition": "Reserving memory for a variable by stating its type and name. int x; declares x."
                }
            ],
            "realWorldExample": "Think of a hotel. Each room has a number (variable name) and a type (single/double/suite). The hotel won't put 10 people in a single room — similarly, C won't store a decimal in an int without losing the fractional part.",
            "timeComplexity": null,
            "spaceComplexity": "O(1)",
            "whenToUse": "Use variables whenever you need to store, calculate, or display data in your program.",
            "commonMistakes": [
                "Using %f format specifier with int — use %d for int",
                "Using double quotes for char: char c = \"A\"; — should be single quotes char c = 'A';",
                "Not initializing a variable before using it — it contains garbage value",
                "Storing a float in an int — the decimal part is lost silently"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Which data type stores whole numbers like 10, -5, 0 in C?",
                "options": [
                    "A) float",
                    "B) char",
                    "C) int",
                    "D) double"
                ],
                "correct": 2,
                "explanation": "int (integer) stores whole numbers without decimal points. float and double are for decimals, char is for single characters."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the correct format specifier to print an int in printf()?",
                "options": [
                    "A) %f",
                    "B) %c",
                    "C) %s",
                    "D) %d"
                ],
                "correct": 3,
                "explanation": "%d is the format specifier for int. %f is for float, %c is for char, %s is for strings (char arrays)."
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": "What is wrong with: char grade = \"A\";",
                "options": [
                    "A) Nothing is wrong",
                    "B) Should use double quotes",
                    "C) char should be int",
                    "D) Should use single quotes: char grade = 'A';"
                ],
                "correct": 3,
                "explanation": "char stores a SINGLE character and uses single quotes. Double quotes create a string (char array), not a single character."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "What happens when you store 3.7 in an int variable?",
                "options": [
                    "A) It stores 3.7 correctly",
                    "B) The decimal part is lost — it stores 3",
                    "C) The program crashes",
                    "D) It rounds to 4"
                ],
                "correct": 1,
                "explanation": "int cannot store decimals. Assigning 3.7 to an int truncates (chops off) the decimal — it stores 3. This is a common silent bug!"
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "Which is the correct way to declare AND initialize a variable in one line?",
                "options": [
                    "A) int x; x = 5;",
                    "B) int x = 5;",
                    "C) x = 5; int x;",
                    "D) Both A and B are correct"
                ],
                "correct": 3,
                "explanation": "Both A (declare then assign) and B (declare and initialize together) are valid in C. B is the more concise way. C is wrong — you cannot use a variable before declaring it."
            }
        ],
        "logicHints": {
            "approach": "Declare variables of different types, assign values, and print them.",
            "keySteps": [
                "Step 1: Declare an int, a float, and a char variable",
                "Step 2: Assign values using = operator",
                "Step 3: Print each using printf with correct format specifiers (%d, %f, %c)",
                "Step 4: Also read values from user using scanf with & (address-of) operator"
            ],
            "pseudocode": "DECLARE integer age = 20\nDECLARE float height = 5.9\nDECLARE char grade = 'A'\nPRINT age using %d\nPRINT height using %f\nPRINT grade using %c"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    /* Declare and initialize variables */\n    int age = 20;\n    float height = 5.9;\n    char grade = 'A';\n    double salary = 50000.50;\n\n    /* Print each variable with correct format specifier */\n    printf(\"Age: %d\\n\", age);\n    printf(\"Height: %.1f\\n\", height);   /* .1 = 1 decimal place */\n    printf(\"Grade: %c\\n\", grade);\n    printf(\"Salary: %.2lf\\n\", salary);  /* lf for double */\n\n    /* Read a value from user */\n    int year;\n    printf(\"Enter year: \");\n    scanf(\"%d\", &year);                  /* & = address of the variable */\n    printf(\"You entered: %d\\n\", year);\n\n    return 0;\n}",
        "flowDiagramType": null
    },
    "arithmetic-operators": {
        "id": "arithmetic-operators",
        "title": "Arithmetic Operators",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "➕",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Arithmetic operators perform math on numbers. C supports +, -, *, /, and % (modulus). Understanding integer division vs float division is critical.",
            "whatIsIt": "Operators are symbols that perform operations on values. In C, arithmetic operators work on numbers. The tricky ones are division (/) and modulus (%): when both operands are int, division gives you only the whole number part. Modulus gives you the remainder.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Basic math operators",
                    "description": "+, -, * work exactly as you expect for both integers and floats."
                },
                {
                    "step": 2,
                    "title": "Integer division",
                    "description": "5 / 2 = 2, NOT 2.5. When both numbers are int, the result is int — the decimal part is dropped."
                },
                {
                    "step": 3,
                    "title": "Float division",
                    "description": "5.0 / 2 = 2.5. If EITHER number is float/double, the result is a decimal."
                },
                {
                    "step": 4,
                    "title": "Modulus operator %",
                    "description": "5 % 2 = 1. Gives the remainder of division. Only works with integers."
                },
                {
                    "step": 5,
                    "title": "Order of operations",
                    "description": "C follows BODMAS/PEMDAS: *, / before +, -. Use () to control order."
                }
            ],
            "keyTerms": [
                {
                    "term": "+",
                    "definition": "Addition operator. 3 + 4 = 7."
                },
                {
                    "term": "-",
                    "definition": "Subtraction operator. 10 - 3 = 7."
                },
                {
                    "term": "*",
                    "definition": "Multiplication operator. 3 * 4 = 12."
                },
                {
                    "term": "/",
                    "definition": "Division. 10 / 3 = 3 (int division), 10.0 / 3 = 3.333 (float division)."
                },
                {
                    "term": "%",
                    "definition": "Modulus — remainder of division. 10 % 3 = 1. Only works with int."
                },
                {
                    "term": "Integer division",
                    "definition": "When dividing two ints, the result is an int — the fractional part is lost. 7/2 = 3, not 3.5."
                }
            ],
            "realWorldExample": "Modulus (%) is used everywhere in programming: checking if a number is even (n % 2 == 0), getting the last digit of a number (n % 10), cycling through colors in a loop (i % numColors).",
            "timeComplexity": null,
            "spaceComplexity": "O(1)",
            "whenToUse": "Arithmetic operators are used in calculations, formulas, and any time you need to manipulate numeric data.",
            "commonMistakes": [
                "Integer division: int a=5, b=2; printf(\"%d\", a/b); prints 2, not 2.5",
                "Using % with float — modulus only works with integers",
                "Dividing by zero — this crashes the program at runtime",
                "Forgetting operator precedence: 2 + 3 * 4 = 14, not 20"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is the result of 10 % 3 in C?",
                "options": [
                    "A) 3",
                    "B) 1",
                    "C) 3.33",
                    "D) 0"
                ],
                "correct": 1,
                "explanation": "10 % 3 = 1, because 10 = 3×3 + 1. The modulus operator gives the remainder after division."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "In C, what is the result of 7 / 2 when both are int?",
                "options": [
                    "A) 3.5",
                    "B) 4",
                    "C) 3",
                    "D) 3.0"
                ],
                "correct": 2,
                "explanation": "7 / 2 = 3 because integer division drops the decimal. To get 3.5, use 7.0 / 2 or (float)7 / 2."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How do you check if a number n is even using modulus?",
                "options": [
                    "A) n % 1 == 0",
                    "B) n / 2 == 0",
                    "C) n % 2 == 0",
                    "D) n % 2 == 1"
                ],
                "correct": 2,
                "explanation": "n % 2 gives the remainder when divided by 2. If remainder is 0, the number is even. If 1, it's odd."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "What is the result of 2 + 3 * 4 in C?",
                "options": [
                    "A) 20",
                    "B) 14",
                    "C) 24",
                    "D) 9"
                ],
                "correct": 1,
                "explanation": "C follows standard math precedence: multiplication before addition. So 3 * 4 = 12 first, then 2 + 12 = 14."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "What does (float)7 / 2 evaluate to?",
                "options": [
                    "A) 3",
                    "B) 3.0",
                    "C) 3.5",
                    "D) Error"
                ],
                "correct": 2,
                "explanation": "(float)7 casts the integer 7 to float 7.0. Then 7.0 / 2 = 3.5 (float division). The cast makes one operand float, forcing float division."
            }
        ],
        "logicHints": {
            "approach": "Perform all 5 arithmetic operations on two numbers entered by the user.",
            "keySteps": [
                "Step 1: Read two integer values from user using scanf",
                "Step 2: Compute a+b, a-b, a*b, a/b, a%b",
                "Step 3: For division, check if b is 0 before dividing",
                "Step 4: Print each result with appropriate format specifier",
                "Step 5: For float division, cast one operand: (float)a / b"
            ],
            "pseudocode": "READ a, b from user\nPRINT a + b\nPRINT a - b\nPRINT a * b\nIF b != 0:\n  PRINT a / b (integer division)\n  PRINT (float)a / b (decimal division)\n  PRINT a % b (remainder)\nELSE:\n  PRINT \"Cannot divide by zero\""
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int a, b;\n\n    printf(\"Enter two numbers: \");\n    scanf(\"%d %d\", &a, &b);\n\n    printf(\"Sum: %d\\n\", a + b);\n    printf(\"Difference: %d\\n\", a - b);\n    printf(\"Product: %d\\n\", a * b);\n\n    if (b != 0) {\n        printf(\"Integer Division: %d\\n\", a / b);\n        printf(\"Float Division: %.2f\\n\", (float)a / b);\n        printf(\"Remainder: %d\\n\", a % b);\n    } else {\n        printf(\"Cannot divide by zero!\\n\");\n    }\n\n    return 0;\n}",
        "flowDiagramType": null
    },
    "if-else": {
        "id": "if-else",
        "title": "If-Else Conditions",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "🔀",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "If-else lets your program make decisions. If a condition is true, one block runs; otherwise, the else block runs.",
            "whatIsIt": "Without conditions, programs can only do the same thing every time. If-else lets you branch: \"IF the temperature is above 30, print HOT, ELSE print COLD.\" The condition inside if() is tested — if it evaluates to non-zero (true), the if-block runs; if zero (false), the else-block runs.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Write the condition",
                    "description": "Inside if(), write a comparison: age >= 18, score == 100, x != 0. Comparison operators: ==, !=, <, >, <=, >="
                },
                {
                    "step": 2,
                    "title": "If-block runs when TRUE",
                    "description": "The code inside { } after if runs only when the condition is true (non-zero)."
                },
                {
                    "step": 3,
                    "title": "Else-block runs when FALSE",
                    "description": "The code inside else { } runs when the condition is false (zero). Else is optional."
                },
                {
                    "step": 4,
                    "title": "Chain with else if",
                    "description": "For multiple conditions: if (score >= 90) → A; else if (score >= 80) → B; else → C."
                }
            ],
            "keyTerms": [
                {
                    "term": "if",
                    "definition": "Checks a condition. If true, executes the block inside {}."
                },
                {
                    "term": "else",
                    "definition": "Optional. Runs when the if condition is false."
                },
                {
                    "term": "else if",
                    "definition": "Checks another condition if the previous if was false. Used for multiple branches."
                },
                {
                    "term": "== (equals)",
                    "definition": "Comparison operator: checks if two values are equal. NOT the same as = (assignment)."
                },
                {
                    "term": "!= (not equals)",
                    "definition": "True when two values are different."
                },
                {
                    "term": "Logical operators",
                    "definition": "&& (AND), || (OR), ! (NOT) combine multiple conditions."
                }
            ],
            "realWorldExample": "ATM machine: IF balance >= withdrawal amount → give money, ELSE IF balance > 0 → show \"insufficient funds\", ELSE → show \"account empty\". That's if-else if-else in real life!",
            "timeComplexity": null,
            "spaceComplexity": "O(1)",
            "whenToUse": "Whenever your program needs to take different actions based on different conditions.",
            "commonMistakes": [
                "Using = instead of == in condition: if(x = 5) always true! Should be if(x == 5)",
                "Missing {} braces — without them, only the NEXT line is in the if block",
                "Comparing floats with == — use the difference: if(fabs(a-b) < 0.0001)",
                "Forgetting that else matches the nearest if, not the first one"
            ],
            "diagramType": "loop-flow"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is the difference between = and == in C?",
                "options": [
                    "A) They are the same",
                    "B) = assigns a value, == compares two values",
                    "C) == assigns, = compares",
                    "D) == is for strings only"
                ],
                "correct": 1,
                "explanation": "= is assignment (sets a value). == is comparison (checks if equal). Using = in an if condition is a classic bug: if(x = 5) sets x to 5 and always evaluates as true!"
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What does the else block execute?",
                "options": [
                    "A) Always",
                    "B) When the if condition is true",
                    "C) When the if condition is false",
                    "D) Never"
                ],
                "correct": 2,
                "explanation": "The else block runs only when the preceding if condition is false. If there is no else and the condition is false, nothing happens."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How do you check if a number x is between 10 and 20 (inclusive)?",
                "options": [
                    "A) if(10 < x < 20)",
                    "B) if(x >= 10 && x <= 20)",
                    "C) if(x >= 10 || x <= 20)",
                    "D) if(x > 10 & x < 20)"
                ],
                "correct": 1,
                "explanation": "You must use && (AND) to combine two conditions. if(10 < x < 20) doesn't work in C as expected — it evaluates left to right and gives wrong results."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "What is printed? int x = 5; if(x > 3) printf(\"A\"); else printf(\"B\");",
                "options": [
                    "A) B",
                    "B) AB",
                    "C) A",
                    "D) Nothing"
                ],
                "correct": 2,
                "explanation": "5 > 3 is true, so the if-block runs and prints \"A\". The else-block is skipped."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "What is printed? if(0) printf(\"Yes\"); else printf(\"No\");",
                "options": [
                    "A) Yes",
                    "B) No",
                    "C) YesNo",
                    "D) Error"
                ],
                "correct": 1,
                "explanation": "In C, 0 is FALSE and any non-zero value is TRUE. So if(0) is always false, and the else block \"No\" runs."
            }
        ],
        "logicHints": {
            "approach": "Read a number and use if-else to categorize it (positive/negative/zero, pass/fail, grade, etc.).",
            "keySteps": [
                "Step 1: Read a number from user with scanf",
                "Step 2: Use if(num > 0) to check if positive",
                "Step 3: Use else if(num < 0) to check if negative",
                "Step 4: Use else for zero",
                "Step 5: Print the appropriate message"
            ],
            "pseudocode": "READ number\nIF number > 0:\n  PRINT \"Positive\"\nELSE IF number < 0:\n  PRINT \"Negative\"\nELSE:\n  PRINT \"Zero\""
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int num;\n\n    printf(\"Enter a number: \");\n    scanf(\"%d\", &num);\n\n    /* Check and categorize the number */\n    if (num > 0) {\n        printf(\"%d is Positive\\n\", num);\n    } else if (num < 0) {\n        printf(\"%d is Negative\\n\", num);\n    } else {\n        printf(\"The number is Zero\\n\");\n    }\n\n    /* Grade example */\n    int score;\n    printf(\"Enter score (0-100): \");\n    scanf(\"%d\", &score);\n\n    if (score >= 90) {\n        printf(\"Grade: A\\n\");\n    } else if (score >= 80) {\n        printf(\"Grade: B\\n\");\n    } else if (score >= 70) {\n        printf(\"Grade: C\\n\");\n    } else if (score >= 60) {\n        printf(\"Grade: D\\n\");\n    } else {\n        printf(\"Grade: F\\n\");\n    }\n\n    return 0;\n}",
        "flowDiagramType": "loop-flow"
    },
    "even-odd": {
        "id": "even-odd",
        "title": "Even or Odd Check",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "🔢",
        "estimatedTime": "5 min",
        "concept": {
            "summary": "Determine if an integer is even or odd using the modulus operator %.",
            "whatIsIt": "Even numbers are completely divisible by 2 (remainder is 0). Odd numbers leave a remainder of 1 when divided by 2.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Check Remainder",
                    "description": "if (n % 2 == 0) -> even, else -> odd."
                }
            ],
            "keyTerms": [
                {
                    "term": "Modulus (%)",
                    "definition": "Returns the remainder of division."
                }
            ],
            "realWorldExample": "Dividing items equally between two people. If 1 is left over, the total number was odd.",
            "timeComplexity": "O(1)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Basic decision making and conditional branching exercises.",
            "commonMistakes": [
                "Using division / instead of modulus %"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Which expression is true if x is even?",
                "options": [
                    "A) x % 2 == 1",
                    "B) x / 2 == 0",
                    "C) x % 2 == 0",
                    "D) x % 2 != 0"
                ],
                "correct": 2,
                "explanation": "An even number has a remainder of 0 when divided by 2, which is checked by x % 2 == 0."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the remainder when an odd number is divided by 2 in C?",
                "options": [
                    "A) 0",
                    "B) 1",
                    "C) -1",
                    "D) 2"
                ],
                "correct": 1,
                "explanation": "An odd number leaves a remainder of 1 when divided by 2."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Given the C code snippet: if (num % 2 != 0), what can be concluded about 'num'?",
                "options": [
                    "A) 'num' is even",
                    "B) 'num' is odd",
                    "C) 'num' is zero",
                    "D) 'num' is a prime number"
                ],
                "correct": 1,
                "explanation": "The condition num % 2 != 0 checks if 'num' leaves a remainder when divided by 2, which is true for odd numbers."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider a C function that checks if a number is even or odd using the bitwise AND operator (&). Which expression would correctly identify an even number?",
                "options": [
                    "A) (x & 1) == 0",
                    "B) (x & 1) == 1",
                    "C) (x & 2) == 0",
                    "D) (x & 2) == 2"
                ],
                "correct": 0,
                "explanation": "The bitwise AND operator (&) with 1 checks the least significant bit. For even numbers, this bit is 0, so (x & 1) == 0."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "Which of the following C expressions will always evaluate to true for any even integer 'x'?",
                "options": [
                    "A) x % 2 == 1",
                    "B) x % 2 == 0",
                    "C) x / 2 == 0",
                    "D) x / 2 == 1"
                ],
                "correct": 1,
                "explanation": "For any even integer 'x', x % 2 will always be 0, because even numbers are completely divisible by 2."
            }
        ],
        "logicHints": {
            "approach": "Input a number, divide by 2, check if remainder is 0.",
            "keySteps": [
                "Read x",
                "if x % 2 == 0 print Even, else print Odd"
            ],
            "pseudocode": "READ x\nIF x % 2 == 0: PRINT \"Even\"\nELSE: PRINT \"Odd\""
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int num;\n    printf(\"Enter number: \");\n    scanf(\"%d\", &num);\n    if (num % 2 == 0) {\n        printf(\"Even\\n\");\n    } else {\n        printf(\"Odd\\n\");\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "positive-negative-zero": {
        "id": "positive-negative-zero",
        "title": "Sign of a Number",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "➖",
        "estimatedTime": "5 min",
        "concept": {
            "summary": "Determine if a number is positive, negative, or zero using if-else if.",
            "whatIsIt": "Checks the numeric range relative to zero.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "If conditions",
                    "description": "if n > 0 -> positive, else if n < 0 -> negative, else -> zero."
                }
            ],
            "keyTerms": [
                {
                    "term": "Conditional Branching",
                    "definition": "Directing flow based on value ranges."
                }
            ],
            "realWorldExample": "Classifying bank balances as positive, overdrawn (negative), or closed (zero).",
            "timeComplexity": "O(1)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Basic sign evaluation requirements.",
            "commonMistakes": [
                "Incorrect comparison operators."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Which operator is used to check if a number is positive?",
                "options": [
                    "A) <",
                    "B) >",
                    "C) ==",
                    "D) !="
                ],
                "correct": 1,
                "explanation": "Positive numbers are strictly greater than 0, checked with >."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the sign of the number 5?",
                "options": [
                    "A) Negative",
                    "B) Positive",
                    "C) Zero",
                    "D) Undefined"
                ],
                "correct": 1,
                "explanation": "The number 5 is greater than 0, so it is positive."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Given the C code `if (x > 0) { ... }`, what is the condition being checked?",
                "options": [
                    "A) If x is less than or equal to 0",
                    "B) If x is greater than or equal to 0",
                    "C) If x is strictly greater than 0",
                    "D) If x is less than 0"
                ],
                "correct": 2,
                "explanation": "The condition `x > 0` checks if x is strictly greater than 0, meaning x is positive."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider the C function `int sign(int x) { if (x > 0) return 1; else if (x < 0) return -1; else return 0; }`. What will be the output of `sign(-5)`?",
                "options": [
                    "A) 0",
                    "B) 1",
                    "C) -1",
                    "D) Compilation error"
                ],
                "correct": 2,
                "explanation": "The function `sign` returns -1 for negative numbers, so `sign(-5)` will return -1."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "Which of the following C expressions checks if a number `x` is negative?",
                "options": [
                    "A) x >= 0",
                    "B) x <= 0",
                    "C) x < 0",
                    "D) x > 0"
                ],
                "correct": 2,
                "explanation": "The expression `x < 0` checks if x is strictly less than 0, meaning x is negative."
            }
        ],
        "logicHints": {
            "approach": "Compare input with 0.",
            "keySteps": [
                "if n > 0 positive",
                "else if n < 0 negative",
                "else zero"
            ],
            "pseudocode": "IF n > 0: PRINT \"Positive\"\nELSE IF n < 0: PRINT \"Negative\"\nELSE: PRINT \"Zero\""
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int num = -10;\n    if (num > 0) printf(\"Positive\\n\");\n    else if (num < 0) printf(\"Negative\\n\");\n    else printf(\"Zero\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "leap-year": {
        "id": "leap-year",
        "title": "Leap Year Check",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "📅",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Check if a year is a leap year (366 days) using nested or logical conditions.",
            "whatIsIt": "A leap year is divisible by 4, except for end-of-century years which must be divisible by 400.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Conditions",
                    "description": "Leap year if: divisible by 400 OR (divisible by 4 AND NOT divisible by 100)."
                }
            ],
            "keyTerms": [
                {
                    "term": "Leap Year",
                    "definition": "A calendar year containing an extra day (Feb 29)."
                }
            ],
            "realWorldExample": "Calendar systems and time tracking software calculations.",
            "timeComplexity": "O(1)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Date validations and calendrical operations.",
            "commonMistakes": [
                "Assuming all years divisible by 4 are leap years (e.g. 1900 is divisible by 4 but NOT a leap year)."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Which of the following years is NOT a leap year?",
                "options": [
                    "A) 2000",
                    "B) 2004",
                    "C) 1900",
                    "D) 2024"
                ],
                "correct": 2,
                "explanation": "1900 is divisible by 100 but not by 400, so it is not a leap year."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the basic condition for a year to be a leap year?",
                "options": [
                    "A) The year must be divisible by 100",
                    "B) The year must be divisible by 4",
                    "C) The year must be divisible by 10",
                    "D) The year must be divisible by 20"
                ],
                "correct": 1,
                "explanation": "A year is a leap year if it is divisible by 4, except for end-of-century years which must be divisible by 400."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Which of the following C code snippets correctly checks if a year is a leap year?",
                "options": [
                    "A) if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) { printf(\"Leap year\"); }",
                    "B) if (year % 4 == 0) { printf(\"Leap year\"); }",
                    "C) if (year % 100 == 0) { printf(\"Leap year\"); }",
                    "D) if (year % 400 == 0) { printf(\"Leap year\"); }"
                ],
                "correct": 0,
                "explanation": "This code checks if the year is divisible by 4 and not by 100, or if it is divisible by 400, which are the conditions for a year to be a leap year."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What would be the output of the following C code: int year = 2000; if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) { printf(\"Leap year\"); } else { printf(\"Not a leap year\"); }",
                "options": [
                    "A) Leap year",
                    "B) Not a leap year",
                    "C) Compilation error",
                    "D) Runtime error"
                ],
                "correct": 0,
                "explanation": "The year 2000 is divisible by 400, so it is a leap year and the code will print \"Leap year\"."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "Which of the following years are leap years?",
                "options": [
                    "A) 2004 and 2100",
                    "B) 2004 and 2000",
                    "C) 1900 and 2004",
                    "D) 2000 and 2004"
                ],
                "correct": 3,
                "explanation": "2000 is a leap year because it is divisible by 400, and 2004 is a leap year because it is divisible by 4 but not by 100."
            }
        ],
        "logicHints": {
            "approach": "Use logic: year % 400 == 0 || (year % 4 == 0 && year % 100 != 0).",
            "keySteps": [
                "Apply leap check condition",
                "Print leap year or common year"
            ],
            "pseudocode": "IF year % 400 == 0 OR (year % 4 == 0 AND year % 100 != 0):\n  PRINT \"Leap Year\"\nELSE:\n  PRINT \"Not Leap Year\""
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int year = 1900;\n    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {\n        printf(\"%d is a Leap Year\\n\", year);\n    } else {\n        printf(\"%d is not a Leap Year\\n\", year);\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "swap-numbers": {
        "id": "swap-numbers",
        "title": "Swap Two Numbers",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "🔄",
        "estimatedTime": "5 min",
        "concept": {
            "summary": "Swap values of two variables using a temporary variable, or using arithmetic operations without a third variable.",
            "whatIsIt": "Swapping means exchanging values. If x=5 and y=10, after swapping x becomes 10 and y becomes 5. This can be done with a temp variable (like a third cup to exchange juice between two cups) or directly using math (+ and -).",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Using temp variable",
                    "description": "temp = a; a = b; b = temp;"
                },
                {
                    "step": 2,
                    "title": "Without temp variable",
                    "description": "a = a + b; b = a - b; a = a - b;"
                }
            ],
            "keyTerms": [
                {
                    "term": "Temporary Variable",
                    "definition": "A helper variable used to store a value temporarily during data exchange."
                }
            ],
            "realWorldExample": "Pouring milk from glass A and juice from glass B into each other by using an empty glass C.",
            "timeComplexity": "O(1)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Fundamental building block in sorting algorithms like Bubble Sort or Selection Sort.",
            "commonMistakes": [
                "Writing a = b; b = a; directly (this overwrites a, resulting in both variables having b's value)"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Which sequence correctly swaps two variables a and b using temp?",
                "options": [
                    "A) a = b; b = temp; temp = a;",
                    "B) temp = a; a = b; b = temp;",
                    "C) b = temp; temp = a; a = b;",
                    "D) temp = b; b = a; a = temp;"
                ],
                "correct": 1,
                "explanation": "We must save a's value first in temp, overwrite a with b, then set b to the saved temp."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the purpose of using a temporary variable when swapping two numbers in C?",
                "options": [
                    "A) To avoid using arithmetic operators",
                    "B) To hold the value of one variable temporarily while swapping",
                    "C) To reduce the number of lines of code",
                    "D) To increase the speed of the swapping process"
                ],
                "correct": 1,
                "explanation": "A temporary variable is used to hold the value of one variable temporarily while swapping, allowing the values to be exchanged without losing any data."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider the following C code snippet: `int x = 5, y = 10; x = x + y; y = x - y; x = x - y;`. What are the final values of x and y after executing this code?",
                "options": [
                    "A) x = 5, y = 10",
                    "B) x = 10, y = 5",
                    "C) x = 15, y = 15",
                    "D) x = 15, y = 5"
                ],
                "correct": 1,
                "explanation": "This code swaps the values of x and y using arithmetic operations. The final values are x = 10 and y = 5."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Suppose we want to swap two floating-point numbers `float a` and `float b` without using a temporary variable. Which of the following C code snippets achieves this?",
                "options": [
                    "A) a = a + b; b = a - b; a = a - b;",
                    "B) a = a * b; b = a / b; a = a / b;",
                    "C) a = a / b; b = a * b; a = b / a;",
                    "D) a = a ^ b; b = a ^ b; a = a ^ b;"
                ],
                "correct": 0,
                "explanation": "The correct code snippet to swap two floating-point numbers without using a temporary variable is `a = a + b; b = a - b; a = a - b;`. This works by adding the two numbers, then subtracting the original value of a from the sum to get the original value of b, and finally subtracting the new value of b from the sum to get the original value of a."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is a potential issue with swapping two numbers using the arithmetic method `x = x + y; y = x - y; x = x - y;`?",
                "options": [
                    "A) It may cause a loss of precision for floating-point numbers",
                    "B) It may cause an overflow for large integer values",
                    "C) It may cause a syntax error if not used with parentheses",
                    "D) It may cause a runtime error if the variables are not initialized"
                ],
                "correct": 1,
                "explanation": "The arithmetic method of swapping two numbers can cause an overflow for large integer values, because the sum of the two numbers may exceed the maximum limit of the data type."
            }
        ],
        "logicHints": {
            "approach": "Store a in temp, assign b to a, assign temp to b.",
            "keySteps": [
                "temp = a",
                "a = b",
                "b = temp"
            ],
            "pseudocode": "temp = a\na = b\nb = temp"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 10, temp;\n    printf(\"Before: a = %d, b = %d\\n\", a, b);\n    temp = a;\n    a = b;\n    b = temp;\n    printf(\"After: a = %d, b = %d\\n\", a, b);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "switch-statement": {
        "id": "switch-statement",
        "title": "Switch Statement",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "🎛️",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Switch is a cleaner way to handle multiple choices based on a single variable's value. It replaces long if-else if chains.",
            "whatIsIt": "When you have one variable that can have many specific values and you want to do different things for each value, switch is cleaner than many else-if blocks. The switch statement jumps directly to the matching case — like a jump table. Without break, it \"falls through\" to the next case.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Evaluate the expression",
                    "description": "switch(expression) — the expression must produce an integer (int or char). It CANNOT be float or string."
                },
                {
                    "step": 2,
                    "title": "Match a case",
                    "description": "Each case label is a specific value: case 1:, case 'A':. When the expression matches, that case runs."
                },
                {
                    "step": 3,
                    "title": "break to exit",
                    "description": "break; at the end of each case stops execution. Without break, code \"falls through\" to the next case."
                },
                {
                    "step": 4,
                    "title": "default for no match",
                    "description": "The default: case runs when no case matched — like the else in if-else."
                }
            ],
            "keyTerms": [
                {
                    "term": "switch",
                    "definition": "Evaluates an expression and jumps to the matching case label."
                },
                {
                    "term": "case",
                    "definition": "A label with a specific value. Code after the matching case runs."
                },
                {
                    "term": "break",
                    "definition": "Exits the switch block. Without it, execution falls through to the next case."
                },
                {
                    "term": "default",
                    "definition": "Optional. Runs when no case matches. Like the final else."
                },
                {
                    "term": "Fall-through",
                    "definition": "When break is missing, execution continues into the next case — usually a bug, but sometimes useful."
                }
            ],
            "realWorldExample": "A TV remote's mode selector: switch(channel) { case 1: show \"BBC\"; break; case 2: show \"CNN\"; break; default: show \"No Channel\"; }. Each button press (value) maps to a specific action.",
            "timeComplexity": null,
            "spaceComplexity": "O(1)",
            "whenToUse": "Use switch when testing a single integer or char variable against multiple fixed values. Avoid for range checks (like > 50) — use if-else for those.",
            "commonMistakes": [
                "Forgetting break — causes fall-through to next case (very common bug)",
                "Using float in switch — NOT allowed, only int and char",
                "Using a variable in case: case x: is illegal — case must be a constant",
                "Forgetting the colon after case: must be case 1:, not case 1"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What happens if you forget break at the end of a case in switch?",
                "options": [
                    "A) Compile error",
                    "B) The program exits",
                    "C) Execution falls through to the next case",
                    "D) Nothing, it works fine"
                ],
                "correct": 2,
                "explanation": "Without break, switch \"falls through\" — it continues executing code in the next case even if it doesn't match. This is one of the most common C bugs."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "Which data type CANNOT be used in a switch expression?",
                "options": [
                    "A) int",
                    "B) char",
                    "C) float",
                    "D) long"
                ],
                "correct": 2,
                "explanation": "switch only works with integer types (int, char, long, etc.). float and double are NOT allowed because floating-point comparison is imprecise."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What does the default case do in a switch statement?",
                "options": [
                    "A) It always executes",
                    "B) It executes when no other case matches",
                    "C) It must come first",
                    "D) It resets the switch"
                ],
                "correct": 1,
                "explanation": "The default case runs when the switch expression doesn't match any case value. It's optional but good practice to include."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "switch(x) { case 1: printf(\"One\"); case 2: printf(\"Two\"); } — if x=1, what prints?",
                "options": [
                    "A) One",
                    "B) Two",
                    "C) OneTwo (fall-through!)",
                    "D) Nothing"
                ],
                "correct": 2,
                "explanation": "Without break after case 1, it falls through to case 2. Both \"One\" and \"Two\" are printed. This is why break is critical."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "Can two case labels have the same value in a switch?",
                "options": [
                    "A) Yes, the first one runs",
                    "B) Yes, both run",
                    "C) No, it is a compile error",
                    "D) No, it causes a runtime error"
                ],
                "correct": 2,
                "explanation": "Duplicate case values cause a compile error in C. Each case must have a unique constant value."
            }
        ],
        "logicHints": {
            "approach": "Build a menu or calculator using switch to handle different choices.",
            "keySteps": [
                "Step 1: Read a choice from user (int or char)",
                "Step 2: Write switch(choice)",
                "Step 3: Write each case with its code and break",
                "Step 4: Add default for invalid input"
            ],
            "pseudocode": "READ choice\nSWITCH choice:\n  CASE 1: DO action 1; BREAK\n  CASE 2: DO action 2; BREAK\n  CASE 3: DO action 3; BREAK\n  DEFAULT: PRINT \"Invalid choice\""
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int choice;\n\n    printf(\"Menu:\\n\");\n    printf(\"1. Say Hello\\n\");\n    printf(\"2. Show Day\\n\");\n    printf(\"3. Show Season\\n\");\n    printf(\"Enter choice: \");\n    scanf(\"%d\", &choice);\n\n    switch (choice) {\n        case 1:\n            printf(\"Hello, World!\\n\");\n            break;\n        case 2: {\n            int day;\n            printf(\"Enter day (1-7): \");\n            scanf(\"%d\", &day);\n            switch (day) {\n                case 1: printf(\"Monday\\n\");    break;\n                case 2: printf(\"Tuesday\\n\");   break;\n                case 3: printf(\"Wednesday\\n\"); break;\n                case 4: printf(\"Thursday\\n\");  break;\n                case 5: printf(\"Friday\\n\");    break;\n                case 6: printf(\"Saturday\\n\");  break;\n                case 7: printf(\"Sunday\\n\");    break;\n                default: printf(\"Invalid day\\n\");\n            }\n            break;\n        }\n        case 3:\n            printf(\"Summer / Monsoon / Winter / Spring\\n\");\n            break;\n        default:\n            printf(\"Invalid choice! Enter 1, 2, or 3.\\n\");\n    }\n\n    return 0;\n}",
        "flowDiagramType": null
    },
    "calculator-switch": {
        "id": "calculator-switch",
        "title": "Simple Calculator",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "🧮",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Implement a basic arithmetic calculator (+, -, *, /) using a switch statement.",
            "whatIsIt": "Reads an operator (+, -, *, /) and two operands, and performs the corresponding math operation using switch(operator).",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Read operator",
                    "description": "Read operator char and two operands."
                },
                {
                    "step": 2,
                    "title": "Switch",
                    "description": "switch(operator) and execute matched case."
                }
            ],
            "keyTerms": [
                {
                    "term": "Switch Expression",
                    "definition": "The variable evaluated against case labels."
                }
            ],
            "realWorldExample": "A basic desk calculator interface.",
            "timeComplexity": "O(1)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Basic command interpreter and menu routing programs.",
            "commonMistakes": [
                "Forgetting division-by-zero check.",
                "Not putting break; in cases."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Which switch case handles operator multiplication?",
                "options": [
                    "A) case 'x':",
                    "B) case '*':",
                    "C) case \"*\":",
                    "D) case mult:"
                ],
                "correct": 1,
                "explanation": "Character constants use single quotes, so case '*': is correct."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the purpose of the switch statement in a simple calculator program?",
                "options": [
                    "A) To handle arrays and pointers",
                    "B) To perform arithmetic operations",
                    "C) To control the flow of the program based on the operator",
                    "D) To read input from the user"
                ],
                "correct": 2,
                "explanation": "The switch statement is used to control the flow of the program based on the operator, allowing the program to perform different arithmetic operations."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What would happen if the user enters an invalid operator in a simple calculator program that uses a switch statement?",
                "options": [
                    "A) The program will perform the default operation",
                    "B) The program will print an error message and exit",
                    "C) The program will ignore the input and continue running",
                    "D) The program will crash or produce undefined behavior if there is no default case"
                ],
                "correct": 3,
                "explanation": "If there is no default case in the switch statement, the program will crash or produce undefined behavior if the user enters an invalid operator."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "How can you modify a simple calculator program that uses a switch statement to handle multiple operators with the same precedence?",
                "options": [
                    "A) By using nested switch statements",
                    "B) By using if-else statements instead of switch",
                    "C) By using a single case label for multiple operators",
                    "D) By using fall-through cases"
                ],
                "correct": 3,
                "example": "For example, case '+': case '-':",
                "explanation": "You can modify the program to handle multiple operators with the same precedence by using a single case label for multiple operators, taking advantage of the fall-through behavior of the switch statement."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the purpose of the break statement in a switch case that handles an operator in a simple calculator program?",
                "options": [
                    "A) To skip to the next iteration of a loop",
                    "B) To exit the program",
                    "C) To prevent fall-through to the next case",
                    "D) To repeat the current case"
                ],
                "correct": 2,
                "explanation": "The break statement is used to prevent fall-through to the next case, ensuring that only the code for the specified operator is executed."
            }
        ],
        "logicHints": {
            "approach": "Switch on operator char. Check division by zero in division case.",
            "keySteps": [
                "Read op, a, b",
                "switch(op): case '+': print a+b; ..."
            ],
            "pseudocode": "SWITCH operator:\n  CASE '+': PRINT a + b; BREAK\n  CASE '/': IF b != 0: PRINT a / b; ELSE: PRINT \"Error\""
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    char op = '*';\n    double a = 12.0, b = 4.0;\n    switch (op) {\n        case '+': printf(\"%.1f\\n\", a + b); break;\n        case '-': printf(\"%.1f\\n\", a - b); break;\n        case '*': printf(\"%.1f\\n\", a * b); break;\n        case '/':\n            if (b != 0) printf(\"%.1f\\n\", a / b);\n            else printf(\"Division by zero!\\n\");\n            break;\n        default: printf(\"Invalid operator\\n\");\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "for-loop": {
        "id": "for-loop",
        "title": "For Loop",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "🔁",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "The for loop repeats code a specific number of times. It's the most-used loop in C when you know exactly how many times to repeat.",
            "whatIsIt": "A loop lets you run the same code multiple times without copy-pasting. The for loop is perfect when you know the count upfront: \"print this 10 times\", \"process 100 array elements\". It has 3 parts in one line: initialization, condition, and update.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Initialization",
                    "description": "int i = 0 — runs once at the start. Declares and sets the loop counter."
                },
                {
                    "step": 2,
                    "title": "Condition",
                    "description": "i < 10 — checked before EVERY iteration. If true, loop body runs. If false, loop ends."
                },
                {
                    "step": 3,
                    "title": "Update",
                    "description": "i++ — runs after EVERY iteration. Usually increments the counter."
                },
                {
                    "step": 4,
                    "title": "Body executes",
                    "description": "The code inside {} runs once per iteration, as long as the condition stays true."
                }
            ],
            "keyTerms": [
                {
                    "term": "for(init; condition; update)",
                    "definition": "The three-part loop header. All three parts are optional (but semicolons are not)."
                },
                {
                    "term": "Loop variable",
                    "definition": "The counter variable (usually i, j, k). Controls how many times the loop runs."
                },
                {
                    "term": "i++",
                    "definition": "Increment operator: adds 1 to i. Same as i = i + 1."
                },
                {
                    "term": "i--",
                    "definition": "Decrement operator: subtracts 1 from i."
                },
                {
                    "term": "Iteration",
                    "definition": "One pass through the loop body."
                },
                {
                    "term": "Infinite loop",
                    "definition": "A loop whose condition never becomes false. Caused by missing update or wrong condition."
                }
            ],
            "realWorldExample": "for loop is like a factory assembly line counter: \"Run this operation 1000 times.\" Each product (iteration) goes through the same process (body), the counter advances (update) until quota is met (condition false).",
            "timeComplexity": {
                "best": "O(n)",
                "average": "O(n)",
                "worst": "O(n)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "When you know the exact number of iterations. Arrays, counting, sequences, printing patterns.",
            "commonMistakes": [
                "Off-by-one: for(i=1; i<=n; i++) vs for(i=0; i<n; i++) — know which range you need",
                "Infinite loop: forgetting i++ update",
                "Modifying i inside the loop body — leads to unpredictable behavior",
                "Using semicolon after for(): for(i=0; i<5; i++); — this loops 5 times doing nothing!"
            ],
            "diagramType": "loop-flow"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "How many times does this loop run? for(int i=0; i<5; i++)",
                "options": [
                    "A) 4",
                    "B) 5",
                    "C) 6",
                    "D) Infinite"
                ],
                "correct": 1,
                "explanation": "i goes: 0, 1, 2, 3, 4 → that's 5 values. When i=5, the condition i<5 is false, so the loop stops. 5 iterations total."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "In for(int i=1; i<=10; i++), what are the first and last values of i?",
                "options": [
                    "A) 0 and 9",
                    "B) 1 and 10",
                    "C) 0 and 10",
                    "D) 1 and 9"
                ],
                "correct": 1,
                "explanation": "Starts at i=1 (initialization), runs while i<=10, so last iteration is i=10. Then i becomes 11, condition 11<=10 is false, loop ends."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What does for(;;) do?",
                "options": [
                    "A) Runs 0 times",
                    "B) Causes compile error",
                    "C) Runs forever (infinite loop)",
                    "D) Runs once"
                ],
                "correct": 2,
                "explanation": "for(;;) has empty init, condition (always true), and update. It's an infinite loop that runs forever until you use break to exit."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "What is printed? for(int i=0; i<3; i++) printf(\"%d \", i);",
                "options": [
                    "A) 1 2 3",
                    "B) 0 1 2 3",
                    "C) 0 1 2",
                    "D) 1 2"
                ],
                "correct": 2,
                "explanation": "i starts at 0 and goes up to (but not including) 3. So it prints 0, 1, 2. The space after %d adds spaces between numbers."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "What is the sum printed? int s=0; for(int i=1; i<=5; i++) s+=i; printf(\"%d\",s);",
                "options": [
                    "A) 5",
                    "B) 10",
                    "C) 15",
                    "D) 6"
                ],
                "correct": 2,
                "explanation": "s += i means s = s + i. Each iteration adds i to s: 0+1=1, 1+2=3, 3+3=6, 6+4=10, 10+5=15. Sum of 1 to 5 is 15."
            }
        ],
        "logicHints": {
            "approach": "Print numbers from 1 to n, or sum numbers, using a for loop.",
            "keySteps": [
                "Step 1: Read n from user",
                "Step 2: Initialize counter i = 1",
                "Step 3: Write condition i <= n",
                "Step 4: In body, do your computation (print, add to sum, etc.)",
                "Step 5: Update i++ at the end of each iteration"
            ],
            "pseudocode": "READ n\nFOR i = 1 TO n (i++):\n  PRINT i\n  ADD i to sum\nPRINT total sum"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int n;\n\n    printf(\"Enter n: \");\n    scanf(\"%d\", &n);\n\n    /* Print 1 to n */\n    printf(\"Numbers from 1 to %d: \", n);\n    for (int i = 1; i <= n; i++) {\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\");\n\n    /* Sum of 1 to n */\n    int sum = 0;\n    for (int i = 1; i <= n; i++) {\n        sum += i;    /* same as: sum = sum + i */\n    }\n    printf(\"Sum = %d\\n\", sum);\n\n    /* Print even numbers */\n    printf(\"Even numbers: \");\n    for (int i = 2; i <= n; i += 2) {\n        printf(\"%d \", i);\n    }\n    printf(\"\\n\");\n\n    return 0;\n}",
        "flowDiagramType": "loop-flow"
    },
    "while-loop": {
        "id": "while-loop",
        "title": "While Loop",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "🔄",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "The while loop repeats as long as a condition stays true. Use it when you don't know in advance how many times to loop.",
            "whatIsIt": "Unlike the for loop (where you know the count), the while loop keeps running as long as a condition is met. It's perfect for \"keep reading until the user enters -1\" or \"keep searching until found\". The condition is checked BEFORE every iteration.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Initialize before loop",
                    "description": "Set up any variables the condition needs before the while statement."
                },
                {
                    "step": 2,
                    "title": "Check condition",
                    "description": "while(condition) — checked before every iteration. If false at the start, the body never runs."
                },
                {
                    "step": 3,
                    "title": "Execute body",
                    "description": "The code inside {} runs while the condition is true."
                },
                {
                    "step": 4,
                    "title": "Update inside body",
                    "description": "You MUST change something inside the loop that eventually makes the condition false — otherwise infinite loop!"
                }
            ],
            "keyTerms": [
                {
                    "term": "while(condition)",
                    "definition": "Loops while condition is true. Checks condition BEFORE each iteration."
                },
                {
                    "term": "Entry-controlled loop",
                    "definition": "While loop is entry-controlled — the condition is checked before entering the loop body."
                },
                {
                    "term": "Loop body",
                    "definition": "The code inside {} that repeats on each iteration."
                },
                {
                    "term": "Exit condition",
                    "definition": "The point where the condition becomes false and the loop terminates."
                }
            ],
            "realWorldExample": "A guard at a gate: \"while (more people are waiting) { let one person in; check next person; }\". The guard doesn't know how many people will come — they just keep going until the queue is empty.",
            "timeComplexity": {
                "best": "O(1)",
                "average": "O(n)",
                "worst": "O(n)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "When the number of iterations is unknown. User input loops, searching, reading files.",
            "commonMistakes": [
                "Infinite loop — forgetting to update the variable inside the loop",
                "Condition never true — loop body never runs (not always an error)",
                "Using = instead of == in condition: while(x = 0) assigns 0 and always exits",
                "Missing the initialization before while: using an uninitialized variable in condition"
            ],
            "diagramType": "loop-flow"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What happens if the while condition is false from the beginning?",
                "options": [
                    "A) The loop runs once",
                    "B) The loop body never runs",
                    "C) Compile error",
                    "D) Infinite loop"
                ],
                "correct": 1,
                "explanation": "while checks the condition BEFORE running. If the condition is false from the start, the body is skipped entirely and execution continues after the loop."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "How is while loop different from for loop?",
                "options": [
                    "A) No difference",
                    "B) while loop cannot be used for counting",
                    "C) for loop has init and update in the header; while only has the condition",
                    "D) while loop always runs at least once"
                ],
                "correct": 2,
                "explanation": "for(init; cond; update) has all three parts in the header. while(cond) only has the condition — you manage init before and update inside the body."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "int i=0; while(i<3) { printf(\"%d \",i); } — what is the problem?",
                "options": [
                    "A) Syntax error",
                    "B) Infinite loop — i is never updated",
                    "C) Runs 4 times",
                    "D) i never reaches 3"
                ],
                "correct": 1,
                "explanation": "i is never incremented inside the loop, so i always equals 0, which is always < 3. This is an infinite loop. Add i++; inside the loop body."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "How many times does this run? int i=10; while(i>0) { i -= 3; }",
                "options": [
                    "A) 3",
                    "B) 4",
                    "C) 10",
                    "D) Infinite"
                ],
                "correct": 1,
                "explanation": "i: 10→7→4→1→-2. After 4 decrements, i becomes -2 which is not > 0, so loop stops. 4 iterations."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "What does this print? int n=1; while(n*n <= 100) { printf(\"%d \",n); n++; }",
                "options": [
                    "A) 1 to 100",
                    "B) 1 2 3 4 5 6 7 8 9 10",
                    "C) Squares up to 100",
                    "D) 1 4 9 16 25"
                ],
                "correct": 1,
                "explanation": "n*n <= 100 is true while n <= 10. So n goes from 1 to 10. It prints n (not n*n): 1 2 3 4 5 6 7 8 9 10."
            }
        ],
        "logicHints": {
            "approach": "Keep reading numbers until user enters 0, calculating sum along the way.",
            "keySteps": [
                "Step 1: Initialize sum = 0, and read first number",
                "Step 2: Write while(number != 0)",
                "Step 3: Inside loop, add number to sum",
                "Step 4: Read next number at end of loop body",
                "Step 5: After loop, print sum"
            ],
            "pseudocode": "SET sum = 0\nREAD num\nWHILE num != 0:\n  ADD num to sum\n  READ next num\nPRINT sum"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int num, sum = 0;\n\n    printf(\"Enter numbers (0 to stop):\\n\");\n    scanf(\"%d\", &num);\n\n    while (num != 0) {\n        sum += num;\n        scanf(\"%d\", &num);    /* read next number */\n    }\n\n    printf(\"Sum = %d\\n\", sum);\n\n    /* Another example: reverse digits */\n    int n, rev = 0;\n    printf(\"Enter a number to reverse: \");\n    scanf(\"%d\", &n);\n\n    while (n != 0) {\n        int digit = n % 10;   /* get last digit */\n        rev = rev * 10 + digit; /* append to result */\n        n /= 10;              /* remove last digit */\n    }\n    printf(\"Reversed: %d\\n\", rev);\n\n    return 0;\n}",
        "flowDiagramType": "loop-flow"
    },
    "do-while-loop": {
        "id": "do-while-loop",
        "title": "Do-While Loop",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "🔃",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Do-while executes the body FIRST, then checks the condition. It always runs at least once — perfect for menus and input validation.",
            "whatIsIt": "The do-while loop is the only \"exit-controlled\" loop in C — it checks the condition AFTER running the body. This guarantees the body executes at least once. This makes it perfect for showing a menu or asking for input, where you must display/ask before checking.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Execute body first",
                    "description": "The code inside do { } runs FIRST without any condition check."
                },
                {
                    "step": 2,
                    "title": "Check condition after",
                    "description": "while(condition) at the bottom — if true, loop back. If false, exit."
                },
                {
                    "step": 3,
                    "title": "Guarantees one run",
                    "description": "Even if condition is false from the beginning, the body executes once."
                },
                {
                    "step": 4,
                    "title": "Semicolon after while",
                    "description": "do { } while(condition); — don't forget the semicolon after the closing while!"
                }
            ],
            "keyTerms": [
                {
                    "term": "do { } while()",
                    "definition": "Exit-controlled loop. Body runs first, condition checked after."
                },
                {
                    "term": "Exit-controlled",
                    "definition": "Condition is checked at the exit (bottom) of the loop, not the entry."
                },
                {
                    "term": "At least once",
                    "definition": "The defining feature of do-while — body always executes at minimum one time."
                },
                {
                    "term": "Semicolon after while",
                    "definition": "do {} while(cond); needs a semicolon after the condition. Easy to forget!"
                }
            ],
            "realWorldExample": "A restaurant menu: \"Show menu → Take order → while(customer wants more food) → show menu again.\" You always show the menu at least once before checking if they want to continue.",
            "timeComplexity": {
                "best": "O(1)",
                "average": "O(n)",
                "worst": "O(n)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "Menus, input validation, any situation where the action must happen at least once before checking the condition.",
            "commonMistakes": [
                "Forgetting the semicolon after while(condition); — do{} while(cond) without ; is a syntax error",
                "Confusing with while — do-while always runs at least once, while may run zero times",
                "Forgetting that the condition is checked after, not before the first iteration"
            ],
            "diagramType": "loop-flow"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "How many times does do-while run if the condition is false from the start?",
                "options": [
                    "A) 0 times",
                    "B) 1 time",
                    "C) Infinite times",
                    "D) Depends on the code"
                ],
                "correct": 1,
                "explanation": "do-while always runs the body FIRST, then checks the condition. Even if the condition is initially false, the body runs exactly once."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is unique about the do-while loop compared to for and while?",
                "options": [
                    "A) It runs faster",
                    "B) It always executes the body at least once",
                    "C) It can only be used for menus",
                    "D) It doesn't need a condition"
                ],
                "correct": 1,
                "explanation": "do-while is the only loop that guarantees at least one execution of the body. This is because the condition check happens after the body, not before."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is wrong? do { printf(\"Hello\"); } while(1)",
                "options": [
                    "A) Nothing",
                    "B) Missing semicolon after while(1)",
                    "C) Infinite loop",
                    "D) Both B and C are issues"
                ],
                "correct": 3,
                "explanation": "Two issues: 1) Missing semicolon after while(1) — should be while(1); 2) while(1) is always true → infinite loop. For an infinite loop on purpose this is fine but needs the semicolon."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "Which loop is best for a menu that must show at least once?",
                "options": [
                    "A) for loop",
                    "B) while loop",
                    "C) do-while loop",
                    "D) No loop needed"
                ],
                "correct": 2,
                "explanation": "do-while is ideal for menus because you must display the menu before checking if the user wants to continue. The body (show menu, get choice) runs first."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "int x=5; do { x--; } while(x > 10); — what is x after the loop?",
                "options": [
                    "A) 5",
                    "B) 4",
                    "C) 0",
                    "D) Never exits"
                ],
                "correct": 1,
                "explanation": "The body runs once: x becomes 4. Then condition x > 10 → 4 > 10 → false. Loop exits. Final x = 4."
            }
        ],
        "logicHints": {
            "approach": "Build a repeating menu using do-while that keeps showing until user chooses to exit.",
            "keySteps": [
                "Step 1: Write do { open brace",
                "Step 2: Print menu options inside the body",
                "Step 3: Read user's choice",
                "Step 4: Use switch or if to handle each choice",
                "Step 5: Write } while(choice != 0); — loop until exit chosen"
            ],
            "pseudocode": "DO:\n  PRINT menu options\n  READ choice\n  HANDLE choice with switch\nWHILE choice != 0"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int choice;\n\n    do {\n        /* Menu always shows at least once */\n        printf(\"\\n=== MENU ===\\n\");\n        printf(\"1. Say Hello\\n\");\n        printf(\"2. Print Numbers\\n\");\n        printf(\"0. Exit\\n\");\n        printf(\"Enter choice: \");\n        scanf(\"%d\", &choice);\n\n        switch (choice) {\n            case 1:\n                printf(\"Hello, World!\\n\");\n                break;\n            case 2:\n                for (int i = 1; i <= 5; i++)\n                    printf(\"%d \", i);\n                printf(\"\\n\");\n                break;\n            case 0:\n                printf(\"Goodbye!\\n\");\n                break;\n            default:\n                printf(\"Invalid! Try again.\\n\");\n        }\n\n    } while (choice != 0); /* keep looping until user exits */\n\n    return 0;\n}",
        "flowDiagramType": "loop-flow"
    },
    "multiplication-table": {
        "id": "multiplication-table",
        "title": "Multiplication Table",
        "category": "Basics & Arithmetic",
        "level": "beginner",
        "levelNum": 1,
        "icon": "📊",
        "estimatedTime": "5 min",
        "concept": {
            "summary": "Print the multiplication table of a number up to a specified limit.",
            "whatIsIt": "Prints n * 1 = n, n * 2 = 2n, ..., n * limit = limit*n.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Loop and print",
                    "description": "Loop i from 1 to limit, printing n * i."
                }
            ],
            "keyTerms": [
                {
                    "term": "Multiplication Table",
                    "definition": "A grid or list showing multiples of a number."
                }
            ],
            "realWorldExample": "Creating lookup grids for basic math tables.",
            "timeComplexity": "O(limit)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Practice simple loop printing and formatted outputs.",
            "commonMistakes": [
                "Incorrect format specifiers in printf statements."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Which loop prints table of 5 up to 10?",
                "options": [
                    "A) for(int i=1; i<=10; i++) printf(\"%d\", i*5);",
                    "B) for(int i=1; i<10; i++) printf(\"%d\", i*5);",
                    "C) for(int i=5; i<=50; i++) printf(\"%d\", i);",
                    "D) None"
                ],
                "correct": 0,
                "explanation": "Loop i from 1 to 10 and print i * 5."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the output of the following code: for(int i=1; i<=3; i++) printf(\"%d * %d = %d\\n\", 4, i, 4*i);",
                "options": [
                    "A) 4 * 1 = 4, 4 * 2 = 8, 4 * 3 = 12",
                    "B) 4 * 1 = 1, 4 * 2 = 2, 4 * 3 = 3",
                    "C) 4 * 1 = 4, 4 * 2 = 4, 4 * 3 = 4",
                    "D) 4 * 1 = 1, 4 * 2 = 4, 4 * 3 = 9"
                ],
                "correct": 0,
                "explanation": "The loop iterates over i from 1 to 3, printing the multiplication of 4 by i."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Write a C code snippet to print the multiplication table of 7 up to 5. Which of the following is correct?",
                "options": [
                    "A) for(int i=1; i<=5; i++) printf(\"7 * %d = %d\\n\", i, i*7);",
                    "B) for(int i=1; i<5; i++) printf(\"7 * %d = %d\\n\", i, i*7);",
                    "C) for(int i=7; i<=35; i++) printf(\"%d\\n\", i);",
                    "D) for(int i=1; i<=7; i++) printf(\"7 * %d = %d\\n\", i, i*7);"
                ],
                "correct": 0,
                "explanation": "The loop should iterate over i from 1 to 5, printing the multiplication of 7 by i."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider the following code: int n, limit; printf(\"Enter a number and limit: \"); scanf(\"%d %d\", &n, &limit); for(int i=1; i<=limit; i++) printf(\"%d * %d = %d\\n\", n, i, n*i);. What will be the output if the user enters 9 and 4?",
                "options": [
                    "A) 9 * 1 = 9, 9 * 2 = 18, 9 * 3 = 27, 9 * 4 = 36",
                    "B) 9 * 1 = 1, 9 * 2 = 2, 9 * 3 = 3, 9 * 4 = 4",
                    "C) 9 * 1 = 9, 9 * 2 = 9, 9 * 3 = 9, 9 * 4 = 9",
                    "D) 9 * 1 = 1, 9 * 2 = 4, 9 * 3 = 9, 9 * 4 = 16"
                ],
                "correct": 0,
                "explanation": "The code takes two inputs from the user, a number and a limit, and prints the multiplication table of the number up to the limit."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the purpose of the loop condition i<=limit in the multiplication table printing code?",
                "options": [
                    "A) To ensure the loop iterates over all numbers from 1 to limit",
                    "B) To prevent the loop from iterating over numbers greater than limit",
                    "C) To print the multiplication table only up to the square of the number",
                    "D) To print the multiplication table only up to the cube of the number"
                ],
                "correct": 0,
                "explanation": "The loop condition i<=limit ensures that the loop iterates over all numbers from 1 to limit, printing the multiplication table of the number up to the specified limit."
            }
        ],
        "logicHints": {
            "approach": "Loop i from 1 to limit, printing the product of number and i.",
            "keySteps": [
                "FOR i = 1 to limit: print n * i"
            ],
            "pseudocode": "FOR i = 1 TO limit:\n  PRINT n, \"x\", i, \"=\", n * i"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int num = 5, limit = 10;\n    for (int i = 1; i <= limit; i++) {\n        printf(\"%d x %d = %d\\n\", num, i, num * i);\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "nested-loops": {
        "id": "nested-loops",
        "title": "Nested Loops",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "🌀",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "A nested loop is a loop inside another loop. The inner loop completes all its iterations for EACH iteration of the outer loop.",
            "whatIsIt": "Think of nested loops like a clock: the minute hand (inner loop) completes a full 60-rotation for every single rotation of the hour hand (outer loop). They are essential for working with 2D data (matrices), patterns, and combinations.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Outer loop runs once",
                    "description": "The outer loop starts, i = 1. Then control enters the inner loop."
                },
                {
                    "step": 2,
                    "title": "Inner loop completes fully",
                    "description": "For this value of i, the inner loop (j) runs ALL its iterations from start to end."
                },
                {
                    "step": 3,
                    "title": "Inner loop ends, outer continues",
                    "description": "When j's condition becomes false, inner loop exits. The outer loop increments i and starts again."
                },
                {
                    "step": 4,
                    "title": "Total iterations = outer × inner",
                    "description": "If outer runs n times and inner runs m times each, total body executions = n × m."
                }
            ],
            "keyTerms": [
                {
                    "term": "Outer loop",
                    "definition": "The loop that contains another loop inside it. Runs n times total."
                },
                {
                    "term": "Inner loop",
                    "definition": "The loop inside another loop. Runs m times for EACH outer iteration."
                },
                {
                    "term": "Loop variable",
                    "definition": "Use different variable names for each loop (i for outer, j for inner)."
                },
                {
                    "term": "Row/Column",
                    "definition": "In patterns, outer loop usually controls rows, inner loop controls columns."
                }
            ],
            "realWorldExample": "A teacher grading 30 students (outer loop), and each student has 5 subjects (inner loop). Total = 30 × 5 = 150 grade entries. This is exactly how nested loops work.",
            "timeComplexity": {
                "best": "O(n²)",
                "average": "O(n²)",
                "worst": "O(n²)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "Matrix operations, printing 2D patterns, generating combinations, bubble sort.",
            "commonMistakes": [
                "Using the same variable (i) for both loops — inner loop corrupts the outer counter",
                "Not printing newline (\\n) after the inner loop — all output on one line",
                "Forgetting that total iterations is n×m, which can be very slow for large n and m",
                "Off-by-one errors in inner loop bounds for patterns"
            ],
            "diagramType": "loop-flow"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "If outer loop runs 3 times and inner loop runs 4 times, how many times does the inner body run?",
                "options": [
                    "A) 3",
                    "B) 4",
                    "C) 7",
                    "D) 12"
                ],
                "correct": 3,
                "explanation": "Total inner iterations = outer × inner = 3 × 4 = 12. For each of the 3 outer loops, the inner loop completes all 4 of its iterations."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "In nested loops for printing a pattern, what does the outer loop usually control?",
                "options": [
                    "A) Number of columns",
                    "B) Number of rows",
                    "C) Total characters",
                    "D) Nothing specific"
                ],
                "correct": 1,
                "explanation": "The outer loop typically controls rows (lines). For each row, the inner loop prints all the characters in that row, then the outer loop moves to the next row with a newline."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What must you print after the inner loop to move to the next line?",
                "options": [
                    "A) printf(\" \");",
                    "B) printf(\"\\t\");",
                    "C) printf(\"\\n\");",
                    "D) Nothing needed"
                ],
                "correct": 2,
                "explanation": "After the inner loop finishes printing all characters in a row, you must print \"\\n\" (newline) to move to the next row. Without it, everything prints on one line."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "How many stars does this print? for(i=1;i<=3;i++) for(j=1;j<=i;j++) printf(\"*\");",
                "options": [
                    "A) 3",
                    "B) 6",
                    "C) 9",
                    "D) 1+2+3=6 stars in a triangle"
                ],
                "correct": 3,
                "explanation": "i=1: inner runs 1 time (1 star). i=2: inner runs 2 times (2 stars). i=3: 3 stars. Total = 1+2+3 = 6 stars arranged as a triangle."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "Why should the inner loop use variable j, not i?",
                "options": [
                    "A) j is faster than i",
                    "B) Using i for both would mean the inner loop modifies the outer loop's counter",
                    "C) Convention only, both work the same",
                    "D) j is reserved for inner loops"
                ],
                "correct": 1,
                "explanation": "If you use i for both loops, the inner loop would overwrite i. When the inner loop finishes, i would be at the inner loop's end value, breaking the outer loop's counting."
            }
        ],
        "logicHints": {
            "approach": "Use outer loop for rows, inner loop for columns/characters per row.",
            "keySteps": [
                "Step 1: Outer loop for(i=1; i<=n; i++) — controls rows",
                "Step 2: Inner loop for(j=1; j<=i; j++) — controls how many items per row",
                "Step 3: Inside inner loop, print the character (* or number)",
                "Step 4: After inner loop ends, print \\n for new row"
            ],
            "pseudocode": "FOR i = 1 TO n (rows):\n  FOR j = 1 TO i (columns):\n    PRINT \"*\"\n  PRINT newline"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int n;\n    printf(\"Enter number of rows: \");\n    scanf(\"%d\", &n);\n\n    /* Right Triangle Pattern */\n    printf(\"\\nRight Triangle:\\n\");\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"* \");\n        }\n        printf(\"\\n\");\n    }\n\n    /* Number Pattern */\n    printf(\"\\nNumber Triangle:\\n\");\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"%d \", j);\n        }\n        printf(\"\\n\");\n    }\n\n    /* Multiplication Table */\n    printf(\"\\nMultiplication Table (5x5):\\n\");\n    for (int i = 1; i <= 5; i++) {\n        for (int j = 1; j <= 5; j++) {\n            printf(\"%3d \", i * j);\n        }\n        printf(\"\\n\");\n    }\n\n    return 0;\n}",
        "flowDiagramType": "loop-flow"
    },
    "pattern-right-triangle": {
        "id": "pattern-right-triangle",
        "title": "Right Triangle Pattern",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "📐",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Print a right-angled triangle of stars using nested loops. Row i has i stars.",
            "whatIsIt": "The right triangle is the simplest pattern: row 1 has 1 star, row 2 has 2 stars, ..., row n has n stars. The key insight is: in row i, the inner loop runs exactly i times.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Outer loop for rows",
                    "description": "for(i=1; i<=n; i++) — i controls the current row number."
                },
                {
                    "step": 2,
                    "title": "Inner loop for stars",
                    "description": "for(j=1; j<=i; j++) — print i stars in row i."
                },
                {
                    "step": 3,
                    "title": "Print newline",
                    "description": "After inner loop, printf(\"\\n\") to go to next row."
                }
            ],
            "keyTerms": [
                {
                    "term": "Row",
                    "definition": "Each line in the pattern. Controlled by outer loop variable i."
                },
                {
                    "term": "Column",
                    "definition": "Each element in a row. Controlled by inner loop variable j."
                }
            ],
            "realWorldExample": "Staircase: step 1 is 1 unit wide, step 2 is 2 units, etc.",
            "timeComplexity": {
                "best": "O(n²)",
                "average": "O(n²)",
                "worst": "O(n²)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "Foundation pattern for all other star patterns.",
            "commonMistakes": [
                "Missing newline after inner loop — all stars on one line",
                "Wrong inner loop limit: j<=n instead of j<=i gives a square, not triangle"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "For a right triangle with n=4, how many stars are in row 3?",
                "options": [
                    "A) 4",
                    "B) 2",
                    "C) 3",
                    "D) 1"
                ],
                "correct": 2,
                "explanation": "In a right triangle, row i has exactly i stars. Row 3 has 3 stars."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the inner loop condition for a right triangle?",
                "options": [
                    "A) j <= n",
                    "B) j <= i",
                    "C) j < i",
                    "D) j <= n-i"
                ],
                "correct": 1,
                "explanation": "j <= i means the inner loop runs i times (1 to i), printing i stars in row i."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is printed if n=3? (right triangle with numbers)",
                "options": [
                    "A) 1 / 12 / 123",
                    "B) 123 / 12 / 1",
                    "C) * / ** / ***",
                    "D) 1 / 22 / 333"
                ],
                "correct": 0,
                "explanation": "Row 1: \"1\". Row 2: \"12\". Row 3: \"123\". The number at position j in row i is just j."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Total stars in a right triangle with n rows is?",
                "options": [
                    "A) n",
                    "B) n*n",
                    "C) n*(n+1)/2",
                    "D) 2*n"
                ],
                "correct": 2,
                "explanation": "Sum of 1+2+3+...+n = n*(n+1)/2. This is the triangular number formula."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "Consider the following C code snippet for printing a right triangle: for (int i = 1; i <= n; i++) { for (int j = 1; j <= i; j++) { printf(\"*\"); } printf(\"\\n\"); }. What will be the output for n = 5?",
                "options": [
                    "A) * / ** / *** / **** / *****",
                    "B) ***** / **** / *** / ** / *",
                    "C) * / ** / *** / **** / ******",
                    "D) 1 / 12 / 123 / 1234 / 12345"
                ],
                "correct": 0,
                "explanation": "The outer loop iterates over each row (i), and the inner loop prints i number of stars in each row, resulting in a right triangle pattern with n rows."
            }
        ],
        "logicHints": {
            "approach": "Outer loop for rows 1 to n. Inner loop prints i stars per row. Print newline after each row.",
            "keySteps": [
                "Outer: i from 1 to n",
                "Inner: j from 1 to i, print *",
                "Print \\n after inner"
            ],
            "pseudocode": "FOR i = 1 TO n:\n  FOR j = 1 TO i:\n    PRINT \"*\"\n  PRINT newline"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int n;\n    printf(\"Enter rows: \");\n    scanf(\"%d\", &n);\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"* \");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n/* Output for n=4:\n*\n* *\n* * *\n* * * *\n*/",
        "flowDiagramType": "loop-flow"
    },
    "pattern-inverted-triangle": {
        "id": "pattern-inverted-triangle",
        "title": "Inverted Triangle Pattern",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "🔽",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "An upside-down triangle: row 1 has n stars, row 2 has n-1 stars, ..., row n has 1 star.",
            "whatIsIt": "The inverted triangle is a right triangle flipped. In row i, you print (n - i + 1) stars. So the outer loop still goes from 1 to n, but the inner loop decreases.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Outer loop",
                    "description": "for(i=1; i<=n; i++) — same as before, rows 1 to n."
                },
                {
                    "step": 2,
                    "title": "Inner loop",
                    "description": "for(j=1; j<=(n-i+1); j++) — prints fewer stars as i increases."
                },
                {
                    "step": 3,
                    "title": "Newline",
                    "description": "printf(\"\\n\") after inner loop."
                }
            ],
            "keyTerms": [
                {
                    "term": "n - i + 1",
                    "definition": "The number of stars in row i of an inverted triangle. When i=1, gives n stars. When i=n, gives 1 star."
                }
            ],
            "realWorldExample": "A funnel: wide at the top, narrow at the bottom.",
            "timeComplexity": {
                "best": "O(n²)",
                "average": "O(n²)",
                "worst": "O(n²)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "Component of diamond pattern, and practice for loop bounds.",
            "commonMistakes": [
                "Inner loop: j<=n-i instead of j<=n-i+1 gives one too few stars"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "For n=5, how many stars are in row 3 of the inverted triangle?",
                "options": [
                    "A) 3",
                    "B) 5",
                    "C) 2",
                    "D) 3 (n-i+1 = 5-3+1 = 3)"
                ],
                "correct": 3,
                "explanation": "Stars in row i = n - i + 1. For row 3, n=5: 5-3+1 = 3 stars."
            },
            {
                "id": 2,
                "difficulty": "medium",
                "question": "What is the inner loop condition for an inverted triangle?",
                "options": [
                    "A) j <= i",
                    "B) j <= n",
                    "C) j <= n - i + 1",
                    "D) j <= n - i"
                ],
                "correct": 2,
                "explanation": "j <= n-i+1 ensures row i has exactly (n-i+1) stars: n stars in row 1, 1 star in row n."
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": "What is the number of stars in the last row of an inverted triangle with n=10?",
                "options": [
                    "A) 1",
                    "B) 5",
                    "C) 10",
                    "D) 20"
                ],
                "correct": 0,
                "explanation": "The last row of an inverted triangle has 1 star, since n - n + 1 = 1."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "Write a C code snippet to print the first row of an inverted triangle with n stars. Assume n is already defined.",
                "options": [
                    "A) for (int j = 1; j <= n; j++) printf(\" \");",
                    "B) for (int j = 1; j <= n; j++) printf(\"*\");",
                    "C) for (int j = 1; j <= n - 1; j++) printf(\"*\");",
                    "D) for (int j = 1; j <= n + 1; j++) printf(\"*\");"
                ],
                "correct": 1,
                "explanation": "The first row of an inverted triangle has n stars, so the loop should run from 1 to n, printing a star each time."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "Consider the following C code snippet: for (int i = 1; i <= n; i++) { for (int j = 1; j <= n - i + 1; j++) printf(\"*\"); printf(\"\\n\"); }. What pattern does this code print?",
                "options": [
                    "A) A right triangle",
                    "B) An inverted triangle",
                    "C) A square",
                    "D) A rectangle"
                ],
                "correct": 1,
                "explanation": "The code snippet prints an inverted triangle, since the number of stars in each row decreases by 1, starting from n stars in the first row."
            }
        ],
        "logicHints": {
            "approach": "Outer loop i from 1 to n. Inner loop j from 1 to (n-i+1). Decreasing number of stars.",
            "keySteps": [
                "Outer: i from 1 to n",
                "Inner: j from 1 to (n-i+1)",
                "Print \\n after inner"
            ],
            "pseudocode": "FOR i = 1 TO n:\n  FOR j = 1 TO (n - i + 1):\n    PRINT \"*\"\n  PRINT newline"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int n;\n    printf(\"Enter rows: \");\n    scanf(\"%d\", &n);\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n - i + 1; j++) {\n            printf(\"* \");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n/* Output for n=4:\n* * * *\n* * *\n* *\n*\n*/",
        "flowDiagramType": "loop-flow"
    },
    "pattern-pyramid": {
        "id": "pattern-pyramid",
        "title": "Pyramid Pattern",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "🔺",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "A centered pyramid of stars requires printing spaces before each row's stars to center them.",
            "whatIsIt": "The pyramid pattern is trickier because you need TWO inner loops per row: one for leading spaces (to center) and one for stars. Row i has (n-i) spaces and (2i-1) stars.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Outer loop rows",
                    "description": "for(i=1; i<=n; i++)"
                },
                {
                    "step": 2,
                    "title": "Print spaces first",
                    "description": "for(j=1; j<=(n-i); j++) printf(\" \"); — prints (n-i) spaces to center the row."
                },
                {
                    "step": 3,
                    "title": "Print stars",
                    "description": "for(j=1; j<=(2*i-1); j++) printf(\"*\"); — row i has (2i-1) stars."
                },
                {
                    "step": 4,
                    "title": "Newline",
                    "description": "printf(\"\\n\") to end each row."
                }
            ],
            "keyTerms": [
                {
                    "term": "2i - 1",
                    "definition": "Number of stars in row i of a pyramid. Row 1: 1 star, row 2: 3 stars, row 3: 5 stars (odd numbers)."
                },
                {
                    "term": "Leading spaces",
                    "definition": "(n-i) spaces before each row's stars to achieve the centered pyramid look."
                }
            ],
            "realWorldExample": "The Great Pyramid of Giza viewed from above — widest at bottom, point at top.",
            "timeComplexity": {
                "best": "O(n²)",
                "average": "O(n²)",
                "worst": "O(n²)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "Practice for multi-loop patterns and understanding how spaces create visual alignment.",
            "commonMistakes": [
                "Wrong star count: using j<=i instead of j<=(2*i-1)",
                "Forgetting to print spaces before stars"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "How many stars are in row 3 of a pyramid?",
                "options": [
                    "A) 3",
                    "B) 5",
                    "C) 6",
                    "D) 7"
                ],
                "correct": 1,
                "explanation": "Stars in row i = 2i - 1. For row 3: 2(3)-1 = 5 stars."
            },
            {
                "id": 2,
                "difficulty": "medium",
                "question": "How many leading spaces before row 2 stars in a 5-row pyramid?",
                "options": [
                    "A) 2",
                    "B) 3",
                    "C) 4",
                    "D) 1"
                ],
                "correct": 1,
                "explanation": "Spaces in row i = n - i. For n=5, row 2: 5-2 = 3 spaces."
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": "What is the formula to calculate the number of stars in row i of a pyramid?",
                "options": [
                    "A) 2i",
                    "B) 2i - 1",
                    "C) 2i + 1",
                    "D) i^2"
                ],
                "correct": 1,
                "explanation": "The formula to calculate the number of stars in row i is 2i - 1, where i is the row number."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "Write a C code snippet to print the leading spaces before the stars in row 3 of a 5-row pyramid. Assume the variable 'n' represents the total number of rows and 'i' represents the current row.",
                "options": [
                    "A) for (int j = 0; j < n - i; j++) printf(\" \");",
                    "B) for (int j = 0; j < i - n; j++) printf(\" \");",
                    "C) for (int j = 0; j < n + i; j++) printf(\" \");",
                    "D) for (int j = 0; j < 2 * i - 1; j++) printf(\" \");"
                ],
                "correct": 0,
                "explanation": "The correct code snippet to print the leading spaces is 'for (int j = 0; j < n - i; j++) printf(\" \");', where 'n' is the total number of rows and 'i' is the current row."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "Consider a pyramid with 'n' rows. Write a C code snippet to print the entire pyramid. Assume the variable 'n' represents the total number of rows.",
                "options": [
                    "A) for (int i = 1; i <= n; i++) { for (int j = 0; j < n - i; j++) printf(\" \"); for (int k = 0; k < 2 * i - 1; k++) printf(\"*\"); printf(\"\\n\"); }",
                    "B) for (int i = 1; i <= n; i++) { for (int j = 0; j < n + i; j++) printf(\" \"); for (int k = 0; k < i; k++) printf(\"*\"); printf(\"\\n\"); }",
                    "C) for (int i = 1; i <= n; i++) { for (int j = 0; j < i; j++) printf(\" \"); for (int k = 0; k < n - i; k++) printf(\"*\"); printf(\"\\n\"); }",
                    "D) for (int i = 1; i <= n; i++) { for (int j = 0; j < 2 * i - 1; j++) printf(\" \"); for (int k = 0; k < n - i; k++) printf(\"*\"); printf(\"\\n\"); }"
                ],
                "correct": 0,
                "explanation": "The correct code snippet to print the entire pyramid is 'for (int i = 1; i <= n; i++) { for (int j = 0; j < n - i; j++) printf(\" \"); for (int k = 0; k < 2 * i - 1; k++) printf(\"*\"); printf(\"\\n\"); }', where 'n' is the total number of rows."
            }
        ],
        "logicHints": {
            "approach": "Three loops per row: outer (rows), inner1 (spaces), inner2 (stars). Spaces = n-i, Stars = 2i-1.",
            "keySteps": [
                "FOR i=1 to n",
                "Print (n-i) spaces",
                "Print (2i-1) stars",
                "Print newline"
            ],
            "pseudocode": "FOR i = 1 TO n:\n  FOR j = 1 TO (n-i): PRINT \" \"\n  FOR j = 1 TO (2*i-1): PRINT \"*\"\n  PRINT newline"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int n;\n    printf(\"Enter rows: \");\n    scanf(\"%d\", &n);\n\n    for (int i = 1; i <= n; i++) {\n        /* Print leading spaces */\n        for (int j = 1; j <= n - i; j++) {\n            printf(\" \");\n        }\n        /* Print stars */\n        for (int j = 1; j <= 2 * i - 1; j++) {\n            printf(\"*\");\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n/* Output for n=4:\n   *\n  ***\n *****\n*******\n*/",
        "flowDiagramType": "loop-flow"
    },
    "pattern-diamond": {
        "id": "pattern-diamond",
        "title": "Diamond Pattern",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "💎",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "A diamond is a pyramid on top plus an inverted pyramid below. Print upper half then lower half.",
            "whatIsIt": "The diamond pattern combines two halves: the upper half is a pyramid (rows 1 to n), and the lower half is an inverted pyramid (rows n-1 down to 1). You need two separate nested loop groups.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Upper half",
                    "description": "Normal pyramid: spaces = n-i, stars = 2i-1, for i = 1 to n."
                },
                {
                    "step": 2,
                    "title": "Lower half",
                    "description": "Inverted pyramid: spaces = n-i, stars = 2i-1, but for i = n-1 DOWN TO 1."
                }
            ],
            "keyTerms": [
                {
                    "term": "Upper half",
                    "definition": "Pyramid from row 1 to n (widening)."
                },
                {
                    "term": "Lower half",
                    "definition": "Inverted pyramid from row n-1 to 1 (narrowing)."
                }
            ],
            "realWorldExample": "A diamond gemstone shape.",
            "timeComplexity": {
                "best": "O(n²)",
                "average": "O(n²)",
                "worst": "O(n²)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "Combines pyramid and inverted pyramid — good test of nested loop mastery.",
            "commonMistakes": [
                "Lower half starting at n instead of n-1 — repeats the middle row",
                "Not decrementing i in lower half loop: for(i=n-1; i>=1; i--)"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "A diamond has n=4. How many total rows are printed?",
                "options": [
                    "A) 4",
                    "B) 7",
                    "C) 8",
                    "D) 6"
                ],
                "correct": 1,
                "explanation": "Upper half: n rows (1-4). Lower half: n-1 rows (3-1). Total = n + (n-1) = 4+3 = 7 rows."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the purpose of the outer loop in a diamond pattern?",
                "options": [
                    "A) To print the spaces before the asterisks",
                    "B) To print the asterisks",
                    "C) To control the number of rows in the diamond",
                    "D) To control the number of columns in the diamond"
                ],
                "correct": 2,
                "explanation": "The outer loop controls the number of rows in the diamond, with each iteration representing a new row."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider a diamond pattern with n=5. How many asterisks are printed in the last row of the upper half?",
                "options": [
                    "A) 1",
                    "B) 3",
                    "C) 5",
                    "D) 9"
                ],
                "correct": 2,
                "explanation": "The last row of the upper half has 2*n - 1 = 2*5 - 1 = 9 asterisks, but since n=5 is the last row of the upper half, the number of asterisks is equal to 2*n - 1 = 9. However, for n=5, the number of asterisks in the last row is indeed 9, but the question asks for the last row of the upper half which is the 5th row and it indeed has 9 asterisks, the correct answer is not among the options, but if we consider the number of asterisks in the last row of the upper half for n=5, it is 9, so for n=5 the 5th row has 9 asterisks, for n=4 the last row has 7 asterisks, for n=3 the last row has 5 asterisks. So for n=5 the last row of the upper half has 9 asterisks, for n=4 the last row has 7 asterisks, for n=3 the last row has 5 asterisks. Therefore, the correct answer is indeed related to the number of asterisks in the last row of the upper half for different values of n, and for n=5 the last row has 9 asterisks, for n=4 the last row has 7 asterisks, for n=3 the last row has 5 asterisks. Given the options, the best answer is C) 5 for n=3, but the question is about n=5, and the last row of the upper half for n=5 has 9 asterisks, but the question asks for the last row of the upper half for n=5 and the options do not include 9, so the best answer among the options for the last row of the upper half for different values of n is indeed C) 5 for n=3, but for n=5 the correct answer is not among the options, it is 9."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Write a C code snippet to print a diamond pattern with n=6. Consider the following code: ```c int n = 6; for (int i = 1; i <= n; i++) { for (int j = 1; j <= n - i; j++) { printf(\" \"); } for (int k = 1; k <= 2 * i - 1; k++) { printf(\"*\"); } printf(\"\\n\"); } for (int i = n - 1; i >= 1; i--) { for (int j = 1; j <= n - i; j++) { printf(\" \"); } for (int k = 1; k <= 2 * i - 1; k++) { printf(\"*\"); } printf(\"\\n\"); } ``` What is the purpose of the second for loop in the first half of the diamond?",
                "options": [
                    "A) To print the spaces before the asterisks",
                    "B) To print the asterisks",
                    "C) To control the number of rows in the diamond",
                    "D) To control the number of columns in the diamond"
                ],
                "correct": 1,
                "explanation": "The second for loop in the first half of the diamond is used to print the spaces before the asterisks. The number of spaces decreases as the row number increases, which creates the pyramid shape of the upper half of the diamond."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "Consider a diamond pattern with n=7. What is the total number of asterisks printed in the diamond?",
                "options": [
                    "A) 49",
                    "B) 36",
                    "C) 28",
                    "D) 49 is not the correct answer, but the formula to calculate the total number of asterisks is n*(n+1), so the correct answer is indeed related to this formula"
                ],
                "correct": 0,
                "explanation": "To calculate the total number of asterisks, we can use the formula for the sum of an arithmetic series. The number of asterisks in each row of the upper half is 2*i - 1, where i is the row number. The number of asterisks in each row of the lower half is also 2*i - 1, but i decreases from n-1 to 1. The total number of asterisks is the sum of the number of asterisks in each row. This can be calculated as n*(n+1), but since we have two halves, the correct formula is indeed n*(n+1), but we need to consider that the last row of the upper half and the first row of the lower half are the same, so we need to subtract the number of asterisks in this row, which is 2*n - 1. Therefore, the correct formula is n*(n+1) - (2*n - 1) = n^2 + n - 2*n + 1 = n^2 - n + 1, but this is not among the options, and the question asks for n=7, so we can calculate the total number of asterisks as 1 + 3 + 5 + 7 + 7 + 5 + 3 + 1 = 32 + 16 = 48 + 1 = 49, but the formula to calculate the total number of asterisks is indeed n*(n+1), so for n=7 the total number of asterisks is indeed 49."
            }
        ],
        "logicHints": {
            "approach": "Two groups of nested loops: upper (i=1 to n) and lower (i=n-1 to 1).",
            "keySteps": [
                "Upper: i=1 to n, print (n-i) spaces and (2i-1) stars",
                "Lower: i=n-1 to 1, print (n-i) spaces and (2i-1) stars"
            ],
            "pseudocode": "/* Upper half */\nFOR i = 1 TO n:\n  PRINT (n-i) spaces, (2i-1) stars, newline\n/* Lower half */\nFOR i = n-1 DOWNTO 1:\n  PRINT (n-i) spaces, (2i-1) stars, newline"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int n;\n    printf(\"Enter n: \");\n    scanf(\"%d\", &n);\n\n    /* Upper half */\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= n - i; j++) printf(\" \");\n        for (int j = 1; j <= 2 * i - 1; j++) printf(\"*\");\n        printf(\"\\n\");\n    }\n    /* Lower half */\n    for (int i = n - 1; i >= 1; i--) {\n        for (int j = 1; j <= n - i; j++) printf(\" \");\n        for (int j = 1; j <= 2 * i - 1; j++) printf(\"*\");\n        printf(\"\\n\");\n    }\n    return 0;\n}",
        "flowDiagramType": "loop-flow"
    },
    "pattern-floyds-triangle": {
        "id": "pattern-floyds-triangle",
        "title": "Floyd's Triangle",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "🔢",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Floyd's Triangle fills rows with consecutive integers starting from 1. Row i has i numbers.",
            "whatIsIt": "Floyd's Triangle is a right triangle filled with consecutive numbers. Row 1: 1. Row 2: 2 3. Row 3: 4 5 6. The numbers are sequential — a counter keeps incrementing across all rows.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Initialize counter",
                    "description": "int num = 1; — starts at 1 before the loops."
                },
                {
                    "step": 2,
                    "title": "Outer loop rows",
                    "description": "for(i=1; i<=n; i++)"
                },
                {
                    "step": 3,
                    "title": "Inner loop prints and increments",
                    "description": "for(j=1; j<=i; j++) { printf(\"%d \", num); num++; }"
                },
                {
                    "step": 4,
                    "title": "Newline after row",
                    "description": "printf(\"\\n\")"
                }
            ],
            "keyTerms": [
                {
                    "term": "Sequential counter",
                    "definition": "A variable (num) that keeps increasing across all iterations of all inner loops."
                }
            ],
            "realWorldExample": "Numbering items in a triangle arrangement.",
            "timeComplexity": {
                "best": "O(n²)",
                "average": "O(n²)",
                "worst": "O(n²)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "Classic pattern problem in exams. Tests understanding of sequential counters across loops.",
            "commonMistakes": [
                "Initializing num inside outer loop — resets counter each row",
                "Forgetting num++ after printing"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is the first number in row 3 of Floyd's Triangle?",
                "options": [
                    "A) 3",
                    "B) 4",
                    "C) 6",
                    "D) 7"
                ],
                "correct": 1,
                "explanation": "Row 1 has 1 number (1). Row 2 has 2 numbers (2,3). Row 3 starts at 4 (1+2+1 = 4th number)."
            },
            {
                "id": 2,
                "difficulty": "medium",
                "question": "Where should the counter (num) variable be initialized?",
                "options": [
                    "A) Inside inner loop",
                    "B) Inside outer loop",
                    "C) Before both loops",
                    "D) After outer loop"
                ],
                "correct": 2,
                "explanation": "num must be initialized to 1 BEFORE both loops. If inside the outer loop, it resets each row, breaking the sequence."
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": "What is the pattern of the number of elements in each row of Floyd's Triangle?",
                "options": [
                    "A) Each row has one more element than the previous row",
                    "B) Each row has two more elements than the previous row",
                    "C) Each row has the same number of elements as the previous row",
                    "D) Each row has one less element than the previous row"
                ],
                "correct": 0,
                "explanation": "In Floyd's Triangle, the first row has 1 element, the second row has 2 elements, the third row has 3 elements, and so on. This means each row has one more element than the previous row."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "How can you calculate the total number of elements up to and including a given row in Floyd's Triangle?",
                "options": [
                    "A) By summing the numbers in the given row",
                    "B) By summing the numbers of elements in all rows up to the given row",
                    "C) By using the formula n*(n+1)/2, where n is the row number",
                    "D) By using the formula n*n, where n is the row number"
                ],
                "correct": 2,
                "explanation": "The total number of elements up to and including a given row in Floyd's Triangle can be calculated using the formula for the sum of an arithmetic series: n*(n+1)/2, where n is the row number."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "Write a C code snippet to print the nth row of Floyd's Triangle. Assume that the row number is stored in the variable 'n'.",
                "options": [
                    "A) for(int i = 1; i <= n; i++) { for(int j = 1; j <= i; j++) { printf(\"%d \", num); num++; } printf(\"\\n\"); }",
                    "B) for(int i = 1; i <= n; i++) { for(int j = 1; j <= n; j++) { printf(\"%d \", num); num++; } printf(\"\\n\"); }",
                    "C) for(int i = 1; i <= n; i++) { for(int j = 1; j <= n-i; j++) { printf(\"%d \", num); num++; } printf(\"\\n\"); }",
                    "D) for(int i = 1; i <= n; i++) { for(int j = 1; j <= i; j++) { printf(\"%d \", i); } printf(\"\\n\"); }"
                ],
                "correct": 0,
                "explanation": "The correct code snippet uses two nested loops to print the nth row of Floyd's Triangle. The outer loop iterates over each row, and the inner loop iterates over each element in the row, printing the current value of 'num' and incrementing it."
            }
        ],
        "logicHints": {
            "approach": "Use a counter variable outside loops. Inner loop prints and increments counter.",
            "keySteps": [
                "SET num = 1 (before loops)",
                "Outer: i=1 to n",
                "Inner: j=1 to i, print num then num++",
                "Print newline"
            ],
            "pseudocode": "SET num = 1\nFOR i = 1 TO n:\n  FOR j = 1 TO i:\n    PRINT num\n    num = num + 1\n  PRINT newline"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int n;\n    printf(\"Enter rows: \");\n    scanf(\"%d\", &n);\n\n    int num = 1; /* counter initialized OUTSIDE loops */\n\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= i; j++) {\n            printf(\"%d \", num);\n            num++;\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n/* Output for n=4:\n1\n2 3\n4 5 6\n7 8 9 10\n*/",
        "flowDiagramType": "loop-flow"
    },
    "pattern-pascals-triangle": {
        "id": "pattern-pascals-triangle",
        "title": "Pascal's Triangle",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "🔷",
        "estimatedTime": "18 min",
        "concept": {
            "summary": "Pascal's Triangle: each number is the sum of the two numbers above it. Row n contains binomial coefficients C(n,k).",
            "whatIsIt": "Pascal's Triangle starts with 1 at the top. Each subsequent row is built by adding adjacent elements from the row above. The value at row n, position k is the combination C(n,k) = n!/(k!(n-k)!). It appears in probability, algebra, and combinatorics.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Start with C = 1",
                    "description": "First element of each row is always 1 (C(n,0) = 1)."
                },
                {
                    "step": 2,
                    "title": "Calculate next element",
                    "description": "C = C * (i - j) / j — this updates C iteratively using the previous value."
                },
                {
                    "step": 3,
                    "title": "Print spaces for centering",
                    "description": "n-i spaces before each row."
                },
                {
                    "step": 4,
                    "title": "Print each element",
                    "description": "Print C and update it for the next position."
                }
            ],
            "keyTerms": [
                {
                    "term": "C(n, k)",
                    "definition": "Combination/Binomial coefficient. Number of ways to choose k items from n items."
                },
                {
                    "term": "Iterative formula",
                    "description": "C(n, k) = C(n, k-1) * (n-k+1) / k — avoids computing factorial repeatedly."
                }
            ],
            "realWorldExample": "Pascal's triangle appears in probability (coin flips), binomial expansion, and determining number of paths in a grid.",
            "timeComplexity": {
                "best": "O(n²)",
                "average": "O(n²)",
                "worst": "O(n²)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "University exam staple. Tests understanding of combinatorics and pattern printing.",
            "commonMistakes": [
                "Using factorial computation — works but overflows for large n; use iterative formula",
                "Wrong centering spaces"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the 3rd row (0-indexed as row 2) of Pascal's Triangle?",
                "options": [
                    "A) 1 2 1",
                    "B) 1 3 3 1",
                    "C) 1 1",
                    "D) 1 4 6 4 1"
                ],
                "correct": 0,
                "explanation": "Row 0: 1. Row 1: 1 1. Row 2: 1 2 1 (each element is sum of two above). Row 2 middle = 1+1 = 2."
            },
            {
                "id": 2,
                "difficulty": "hard",
                "question": "The iterative formula for Pascal's triangle is C = C * (i - j) / j. What does C start at for each row?",
                "options": [
                    "A) 0",
                    "B) j",
                    "C) 1",
                    "D) i"
                ],
                "correct": 2,
                "explanation": "C starts at 1 for each row because C(n,0) = 1 — the first element of every row is always 1."
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": "What is the first and last element of every row in Pascal's Triangle?",
                "options": [
                    "A) 0",
                    "B) 1",
                    "C) -1",
                    "D) The row number"
                ],
                "correct": 1,
                "explanation": "The first and last element of every row in Pascal's Triangle is always 1, because C(n,0) = C(n,n) = 1."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "How would you calculate the 5th element (0-indexed as 4) in the 6th row (0-indexed as 5) of Pascal's Triangle using the combination formula?",
                "options": [
                    "A) C(5,4) = 5! / (4! * (5-4)!) = 5",
                    "B) C(5,4) = 5! / (4! * (5-4)!) = 5, but we should use C(6,5) for the 6th row",
                    "C) C(6,5) = 6! / (5! * (6-5)!) = 6",
                    "D) C(6,4) = 6! / (4! * (6-4)!) = 15"
                ],
                "correct": 2,
                "explanation": "To calculate the 5th element in the 6th row, we use the combination formula C(n,k) = n! / (k!(n-k)!), so for the 6th row and 5th element, it's C(6,5) = 6! / (5! * 1!) = 6."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "Write a C function to generate Pascal's Triangle up to the nth row. What should be the condition in the outer loop?",
                "options": [
                    "A) i <= n",
                    "B) i < n",
                    "C) i < n + 1",
                    "D) i == n"
                ],
                "correct": 2,
                "explanation": "The condition in the outer loop should be i < n, because array indices in C are 0-based, so the nth row corresponds to index n-1, and the loop should run from i = 0 to i = n-1."
            }
        ],
        "logicHints": {
            "approach": "Use iterative combination formula. For each row i, C starts at 1 and updates as C = C*(i-j)/j.",
            "keySteps": [
                "Outer: i=0 to n-1",
                "Print (n-i-1) spaces",
                "SET C=1",
                "Inner: j=0 to i, print C, update C=C*(i-j)/(j+1)",
                "Newline"
            ],
            "pseudocode": "FOR i = 0 TO n-1:\n  PRINT (n-i-1) spaces\n  C = 1\n  FOR j = 0 TO i:\n    PRINT C\n    C = C * (i - j) / (j + 1)\n  PRINT newline"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int n;\n    printf(\"Enter rows: \");\n    scanf(\"%d\", &n);\n\n    for (int i = 0; i < n; i++) {\n        /* Centering spaces */\n        for (int j = 0; j < n - i - 1; j++) {\n            printf(\"  \");\n        }\n\n        int C = 1; /* C(i, 0) = 1 always */\n        for (int j = 0; j <= i; j++) {\n            printf(\"%4d\", C);\n            /* Iterative update — avoids factorial overflow */\n            C = C * (i - j) / (j + 1);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n/* Output for n=5:\n        1\n      1   1\n    1   2   1\n  1   3   3   1\n1   4   6   4   1\n*/",
        "flowDiagramType": "loop-flow"
    },
    "sum-of-digits": {
        "id": "sum-of-digits",
        "title": "Sum of Digits",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "🔢",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Extract each digit of a number and calculate their sum.",
            "whatIsIt": "For 123, sum = 1 + 2 + 3 = 6.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Extract digit",
                    "description": "d = num % 10"
                },
                {
                    "step": 2,
                    "title": "Add and shrink",
                    "description": "sum += d; num /= 10;"
                }
            ],
            "keyTerms": [
                {
                    "term": "Mod 10",
                    "definition": "Extracts the rightmost digit."
                }
            ],
            "realWorldExample": "Calculating checksum digits (like barcode validation sums).",
            "timeComplexity": "O(log n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Working with digit processing algorithms.",
            "commonMistakes": [
                "Infinite loop by not dividing num by 10 inside the loop."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is the sum of digits of 505?",
                "options": [
                    "A) 5",
                    "B) 10",
                    "C) 0",
                    "D) 55"
                ],
                "correct": 1,
                "explanation": "5 + 0 + 5 = 10."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the sum of digits of 101?",
                "options": [
                    "A) 1",
                    "B) 2",
                    "C) 3",
                    "D) 5"
                ],
                "correct": 1,
                "explanation": "1 + 0 + 1 = 2."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Write a C function to calculate the sum of digits of a given number. What should be the return type of this function?",
                "options": [
                    "A) void",
                    "B) int",
                    "C) float",
                    "D) double"
                ],
                "correct": 1,
                "explanation": "The sum of digits is always an integer, so the return type should be int."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider the following C code snippet: int sum_of_digits(int n) { int sum = 0; while (n > 0) { sum += n % 10; n /= 10; } return sum; }. What is the sum of digits of 1234 using this function?",
                "options": [
                    "A) 8",
                    "B) 10",
                    "C) 6",
                    "D) 9"
                ],
                "correct": 2,
                "explanation": "1 + 2 + 3 + 4 = 10."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the sum of digits of 999?",
                "options": [
                    "A) 25",
                    "B) 27",
                    "C) 26",
                    "D) 28"
                ],
                "correct": 2,
                "explanation": "9 + 9 + 9 = 27."
            }
        ],
        "logicHints": {
            "approach": "Extract digits using %10, add to sum, shrink using /10 until 0.",
            "keySteps": [
                "While n > 0: sum += n % 10; n /= 10;"
            ],
            "pseudocode": "sum = 0\nWHILE n > 0:\n  sum = sum + (n % 10)\n  n = n / 10\nRETURN sum"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int num = 1234, sum = 0;\n    while (num > 0) {\n        sum += num % 10;\n        num /= 10;\n    }\n    printf(\"Sum of digits: %d\\n\", sum);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "reverse-number": {
        "id": "reverse-number",
        "title": "Reverse a Number",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "🔄",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Reverse the order of digits of an integer.",
            "whatIsIt": "1234 becomes 4321.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Build reverse",
                    "description": "rev = rev * 10 + (num % 10); num /= 10;"
                }
            ],
            "keyTerms": [
                {
                    "term": "Reversal",
                    "definition": "Flipping digit order."
                }
            ],
            "realWorldExample": "Data processing tasks requiring reading digit keys in reverse.",
            "timeComplexity": "O(log n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "General digit manipulation tasks.",
            "commonMistakes": [
                "Not handling negative numbers correctly."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is the reversed version of 1200?",
                "options": [
                    "A) 0021",
                    "B) 21",
                    "C) 12",
                    "D) 2100"
                ],
                "correct": 1,
                "explanation": "Reversing 1200 gives 0021, which mathematically simplifies to 21."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the reversed version of 567?",
                "options": [
                    "A) 765",
                    "B) 756",
                    "C) 657",
                    "D) 576"
                ],
                "correct": 0,
                "explanation": "Reversing 567 gives 765."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Write a C function to reverse a number. What should be the condition in the while loop to reverse the number 1234?",
                "options": [
                    "A) n > 0",
                    "B) n < 0",
                    "C) n == 0",
                    "D) n != 0"
                ],
                "correct": 0,
                "explanation": "The condition in the while loop should be n > 0 to reverse the number 1234."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider the following C code snippet to reverse a number: int reverse(int n) { int reversed = 0; while (n != 0) { int remainder = n % 10; reversed = reversed * 10 + remainder; n /= 10; } return reversed; }. What will be the output of the function for the input 1001?",
                "options": [
                    "A) 1001",
                    "B) 101",
                    "C) 100",
                    "D) 1"
                ],
                "correct": 0,
                "explanation": "The output of the function for the input 1001 will be 1001 because the function correctly reverses the number."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What will be the output of the following C code snippet: int n = 1234; int reversed = 0; while (n > 0) { int remainder = n % 10; reversed = reversed * 10 + remainder; n = n / 10; } printf(\"%d\", reversed);",
                "options": [
                    "A) 4321",
                    "B) 1234",
                    "C) 0",
                    "D) 1"
                ],
                "correct": 0,
                "explanation": "The output of the code snippet will be 4321 because the while loop correctly reverses the number 1234."
            }
        ],
        "logicHints": {
            "approach": "Extract last digit and append to reversed number, shifting left by multiplying by 10.",
            "keySteps": [
                "While n > 0: rev = rev * 10 + (n % 10); n /= 10;"
            ],
            "pseudocode": "rev = 0\nWHILE n > 0:\n  rev = rev * 10 + (n % 10)\n  n = n / 10\nRETURN rev"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int num = 9876, rev = 0;\n    while (num > 0) {\n        rev = rev * 10 + (num % 10);\n        num /= 10;\n    }\n    printf(\"Reversed: %d\\n\", rev);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "palindrome-number": {
        "id": "palindrome-number",
        "title": "Palindrome Number Check",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "🔄",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Check if a number reads the same backwards as forwards (e.g. 121, 1331).",
            "whatIsIt": "A palindrome remains identical when reversed. We check this by reversing the digits and comparing the result to the original number.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Reverse digits",
                    "description": "Reconstruct reversed number: rev = rev * 10 + (num % 10)."
                },
                {
                    "step": 2,
                    "title": "Compare",
                    "description": "Check if original equals reversed."
                }
            ],
            "keyTerms": [
                {
                    "term": "Palindrome",
                    "definition": "A sequence that reads the same forwards and backwards."
                }
            ],
            "realWorldExample": "Dates like 02/02/2020 are palindrome dates.",
            "timeComplexity": "O(log n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Digit manipulation and reversing algorithms.",
            "commonMistakes": [
                "Integer overflow when reversing very large numbers (can use `long long` for reversed variable)."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Which of the following is a palindrome number?",
                "options": [
                    "A) 123",
                    "B) 121",
                    "C) 1232",
                    "D) 100"
                ],
                "correct": 1,
                "explanation": "121 reads the same backward as forward, so it is a palindrome."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the purpose of reversing a number to check if it is a palindrome in C?",
                "options": [
                    "A) To find the square root of the number",
                    "B) To compare the reversed number with the original number",
                    "C) To calculate the factorial of the number",
                    "D) To sort the digits of the number"
                ],
                "correct": 1,
                "explanation": "Reversing a number and comparing it with the original number is the basic method to check if a number is a palindrome."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider the following C code snippet: ```c int isPalindrome(int n) { int reversed = 0; while (n > 0) { reversed = reversed * 10 + n % 10; n /= 10; } return reversed; } ``` What is the purpose of the while loop in this code?",
                "options": [
                    "A) To print the digits of the number",
                    "B) To reverse the number",
                    "C) To calculate the sum of the digits",
                    "D) To find the largest digit"
                ],
                "correct": 1,
                "explanation": "The while loop is used to reverse the number by continuously taking the last digit of the number (n % 10) and appending it to the reversed number."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Suppose we want to check if a number is a palindrome without reversing it. We can do this by comparing the digits from the start and end of the number, moving towards the center. Which of the following C code snippets achieves this?",
                "options": [
                    "A) ```c int isPalindrome(int n) { int len = (int) log10(n) + 1; for (int i = 0; i < len / 2; i++) { if ((n / (int) pow(10, i)) % 10 != (n / (int) pow(10, len - i - 1)) % 10) return 0; } return 1; } ```",
                    "B) ```c int isPalindrome(int n) { int len = (int) log10(n) + 1; for (int i = 0; i < len; i++) { if ((n / (int) pow(10, i)) % 10 != (n / (int) pow(10, len - i - 1)) % 10) return 0; } return 1; } ```",
                    "C) ```c int isPalindrome(int n) { int len = (int) log10(n) + 1; for (int i = 0; i < len / 2; i++) { if ((n / (int) pow(10, i)) % 10 == (n / (int) pow(10, len - i - 1)) % 10) return 0; } return 1; } ```",
                    "D) ```c int isPalindrome(int n) { int len = (int) log10(n) + 1; for (int i = 0; i < len; i++) { if ((n / (int) pow(10, i)) % 10 == (n / (int) pow(10, len - i - 1)) % 10) return 0; } return 1; } ```"
                ],
                "correct": 0,
                "explanation": "This code snippet correctly checks if a number is a palindrome by comparing the digits from the start and end of the number, moving towards the center."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What will be the output of the following C code snippet: ```c #include <stdio.h> int main() { int num = 12321; int reversed = 0; while (num > 0) { reversed = reversed * 10 + num % 10; num /= 10; } if (reversed == 12321) printf(\"The number is a palindrome\"); else printf(\"The number is not a palindrome\"); return 0; } ```",
                "options": [
                    "A) The number is a palindrome",
                    "B) The number is not a palindrome",
                    "C) Compilation error",
                    "D) Runtime error"
                ],
                "correct": 0,
                "explanation": "The number 12321 is a palindrome because it reads the same backward as forward. The code correctly reverses the number and checks if it is equal to the original number, so it will print 'The number is a palindrome'."
            }
        ],
        "logicHints": {
            "approach": "Reverse digits by extracting last digit and building up reversed number. Compare with original copy.",
            "keySteps": [
                "Store copy = num",
                "While num > 0: rev = rev * 10 + (num % 10); num /= 10",
                "Compare copy == rev"
            ],
            "pseudocode": "copy = num, rev = 0\nWHILE num > 0:\n  rev = rev * 10 + (num % 10)\n  num = num / 10\nRETURN copy == rev"
        },
        "referenceSolution": "#include <stdio.h>\n\nint isPalindrome(int num) {\n    int original = num;\n    int reversed = 0;\n    while (num > 0) {\n        reversed = reversed * 10 + (num % 10);\n        num /= 10;\n    }\n    return original == reversed;\n}\n\nint main() {\n    int num = 12321;\n    if (isPalindrome(num)) printf(\"%d is Palindrome\\n\", num);\n    else printf(\"%d is not Palindrome\\n\", num);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "armstrong-number": {
        "id": "armstrong-number",
        "title": "Armstrong Number Check",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "💪",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Check if an n-digit number is equal to the sum of its digits raised to the nth power.",
            "whatIsIt": "For example, 153 is an Armstrong number because it has 3 digits, and 1³ + 5³ + 3³ = 1 + 125 + 27 = 153.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Count digits",
                    "description": "Count how many digits the number has."
                },
                {
                    "step": 2,
                    "title": "Sum powers",
                    "description": "Extract digits one by one, raise each to the power of digit count, and add to sum."
                },
                {
                    "step": 3,
                    "title": "Compare",
                    "description": "Check if sum equals original number."
                }
            ],
            "keyTerms": [
                {
                    "term": "Armstrong Number",
                    "definition": "A number equal to the sum of its own digits raised to the power of the number of digits."
                }
            ],
            "realWorldExample": "A recreational mathematics puzzle showing interesting digit patterns.",
            "timeComplexity": "O(log n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Digit extraction and math exercises.",
            "commonMistakes": [
                "Not using a copy of the original number when extracting digits (overwriting the original variable)."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Which of the following is an Armstrong number?",
                "options": [
                    "A) 153",
                    "B) 123",
                    "C) 200",
                    "D) 100"
                ],
                "correct": 0,
                "explanation": "1³ + 5³ + 3³ = 153, so 153 is an Armstrong number."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the condition for a number to be an Armstrong number?",
                "options": [
                    "A) The sum of its digits is equal to the number itself",
                    "B) The product of its digits is equal to the number itself",
                    "C) The sum of each digit raised to the power of the number of digits is equal to the number itself",
                    "D) The difference of its digits is equal to the number itself"
                ],
                "correct": 2,
                "explanation": "An Armstrong number is a number that is equal to the sum of its own digits each raised to the power of the number of digits."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Which of the following numbers is NOT an Armstrong number?",
                "options": [
                    "A) 371",
                    "B) 123",
                    "C) 407",
                    "D) 1634"
                ],
                "correct": 1,
                "explanation": "1³ + 2³ + 3³ = 1 + 8 + 27 = 36, not 123, so 123 is not an Armstrong number."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Write a C function to check if a given number is an Armstrong number. What should be the return type of this function?",
                "options": [
                    "A) int",
                    "B) float",
                    "C) void",
                    "D) bool"
                ],
                "correct": 3,
                "explanation": "The function should return nothing (void) as it can print whether the number is an Armstrong number or not, or it can return an integer value (0 or 1) to indicate whether the number is an Armstrong number or not, but in C, there is no built-in bool type, so the best answer is void."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What will be the output of the following C code: ```c\nint main() {\n  int num = 370;\n  int sum = 0;\n  int temp = num;\n  while(temp != 0) {\n    int digit = temp % 10;\n    sum += digit * digit * digit;\n    temp /= 10;\n  }\n  if(sum == num)\n    printf(\"%d is an Armstrong number\\n\", num);\n  else\n    printf(\"%d is not an Armstrong number\\n\", num);\n  return 0;\n}\n```",
                "options": [
                    "A) 370 is an Armstrong number",
                    "B) 370 is not an Armstrong number",
                    "C) Compilation error",
                    "D) Runtime error"
                ],
                "correct": 0,
                "explanation": "The sum of the cubes of the digits of 370 is 3³ + 7³ + 0³ = 27 + 343 + 0 = 370, so 370 is an Armstrong number."
            }
        ],
        "logicHints": {
            "approach": "Count digits, then extract each digit, raise to power of count, and sum.",
            "keySteps": [
                "Count digits `c` of `num`",
                "Copy `num` to `temp`",
                "While `temp > 0`, extract `digit = temp % 10`, compute power, add to sum, `temp /= 10`"
            ],
            "pseudocode": "c = countDigits(num)\ntemp = num, sum = 0\nWHILE temp > 0:\n  d = temp % 10\n  sum = sum + d^c\n  temp = temp / 10\nRETURN sum == num"
        },
        "referenceSolution": "#include <stdio.h>\n#include <math.h>\n\nint isArmstrong(int num) {\n    int temp = num, digits = 0, sum = 0;\n    while (temp > 0) {\n        digits++;\n        temp /= 10;\n    }\n    temp = num;\n    while (temp > 0) {\n        int d = temp % 10;\n        sum += round(pow(d, digits));\n        temp /= 10;\n    }\n    return sum == num;\n}\n\nint main() {\n    int num = 153;\n    if (isArmstrong(num)) printf(\"%d is Armstrong\\n\", num);\n    else printf(\"%d is not Armstrong\\n\", num);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "prime-check": {
        "id": "prime-check",
        "title": "Prime Number Check",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "⭐",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Check if a number is prime (divisible only by 1 and itself) by testing factors up to its square root.",
            "whatIsIt": "A prime number is a number greater than 1 with no positive divisors other than 1 and itself. For example: 2, 3, 5, 7, 11...",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Handle <= 1",
                    "description": "Numbers <= 1 are not prime."
                },
                {
                    "step": 2,
                    "title": "Loop factors",
                    "description": "Loop i from 2 to sqrt(n). If n % i == 0, it is not prime."
                }
            ],
            "keyTerms": [
                {
                    "term": "Prime Number",
                    "definition": "Integer > 1 that has no positive divisors other than 1 and itself."
                }
            ],
            "realWorldExample": "Cryptography algorithms like RSA use huge prime numbers to secure internet communications.",
            "timeComplexity": "O(sqrt(n))",
            "spaceComplexity": "O(1)",
            "whenToUse": "Basic math and number theory applications.",
            "commonMistakes": [
                "Checking factors up to n-1 (inefficient; only need to go up to sqrt(n))",
                "Considering 1 as prime (1 is neither prime nor composite)"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Why is it sufficient to check factors of n up to sqrt(n)?",
                "options": [
                    "A) It is just a convention",
                    "B) If a factor exists, its matching factor must be <= sqrt(n)",
                    "C) Numbers above sqrt(n) cannot divide n",
                    "D) Because prime numbers are always small"
                ],
                "correct": 1,
                "explanation": "Any factor greater than sqrt(n) must pair with a factor smaller than sqrt(n). If no factor is found up to sqrt(n), none will be found above it."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the definition of a prime number?",
                "options": [
                    "A) A number less than 1 with no divisors",
                    "B) A number greater than 1 with no positive divisors other than 1 and itself",
                    "C) A number with only one divisor",
                    "D) A number with an infinite number of divisors"
                ],
                "correct": 1,
                "explanation": "A prime number is a positive integer greater than 1 that has no positive divisors other than 1 and itself."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the most efficient way to check if a number is prime in C?",
                "options": [
                    "A) Check all numbers up to the given number",
                    "B) Check all numbers up to the square root of the given number",
                    "C) Check only even numbers",
                    "D) Check only odd numbers"
                ],
                "correct": 1,
                "explanation": "Checking all numbers up to the square root of the given number is the most efficient way to check if a number is prime, as any factor larger than the square root would have a corresponding factor smaller than the square root."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider the following C code snippet: ```c\nint is_prime(int n) {\n  if (n <= 1) return 0;\n  for (int i = 2; i * i <= n; i++) {\n    if (n % i == 0) return 0;\n  }\n  return 1;\n}\n``` What is the time complexity of this function?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(sqrt(n))",
                    "D) O(n)"
                ],
                "correct": 2,
                "explanation": "The time complexity of this function is O(sqrt(n)) because the loop iterates up to the square root of the input number n."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What will be the output of the following C code snippet: ```c\n#include <stdio.h>\nint main() {\n  int num = 25;\n  if (num % 2 == 0 && num % 3 == 0) {\n    printf(\"%d is not a prime number\", num);\n  } else if (num % 2 != 0 && num % 3 != 0) {\n    printf(\"%d is a prime number\", num);\n  } else {\n    printf(\"%d is not a prime number\", num);\n  }\n  return 0;\n}\n```",
                "options": [
                    "A) 25 is a prime number",
                    "B) 25 is not a prime number",
                    "C) Compilation error",
                    "D) Runtime error"
                ],
                "correct": 1,
                "explanation": "The code checks if the number is divisible by both 2 and 3, or not divisible by either. Since 25 is not divisible by 2 or 3, but is actually divisible by 5, the code incorrectly identifies it as a prime number. However, the correct output of the given code will be '25 is not a prime number' because 25 is not divisible by 2 or 3, but the condition in the else if statement is not sufficient to check for primality."
            }
        ],
        "logicHints": {
            "approach": "Loop i from 2 to sqrt(n). If divisible, set flag = 0 (not prime). If loop finishes, check flag.",
            "keySteps": [
                "Check n <= 1 -> not prime",
                "Loop i from 2 to i*i <= n",
                "If n % i == 0 -> set flag=0 and break"
            ],
            "pseudocode": "IF n <= 1: RETURN False\nFOR i = 2 TO i * i <= n:\n  IF n % i == 0: RETURN False\nRETURN True"
        },
        "referenceSolution": "#include <stdio.h>\n\nint isPrime(int n) {\n    if (n <= 1) return 0;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return 0;\n    }\n    return 1;\n}\n\nint main() {\n    int num = 29;\n    if (isPrime(num)) {\n        printf(\"%d is Prime\\n\", num);\n    } else {\n        printf(\"%d is not Prime\\n\", num);\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "gcd-lcm": {
        "id": "gcd-lcm",
        "title": "GCD and LCM",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "🧮",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Find the Greatest Common Divisor (GCD) using Euclidean Algorithm, and Least Common Multiple (LCM).",
            "whatIsIt": "GCD is the largest integer that divides both numbers. LCM is the smallest positive integer divisible by both. Relation: LCM(a,b) = (a * b) / GCD(a,b).",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Euclidean GCD",
                    "description": "Repeatedly replace a with b, and b with a % b, until b becomes 0. The last non-zero a is the GCD."
                },
                {
                    "step": 2,
                    "title": "Calculate LCM",
                    "description": "LCM = (a * b) / GCD."
                }
            ],
            "keyTerms": [
                {
                    "term": "Greatest Common Divisor",
                    "definition": "Largest divisor shared by two numbers."
                },
                {
                    "term": "Euclidean Algorithm",
                    "definition": "Efficient method for computing the GCD of two integers."
                }
            ],
            "realWorldExample": "Dividing two fields into largest possible equal square plots, or finding when two recurring events sync.",
            "timeComplexity": "O(log(min(a,b)))",
            "spaceComplexity": "O(1)",
            "whenToUse": "Fraction reductions, modular arithmetic, and general number theory.",
            "commonMistakes": [
                "Integer division overflow when calculating a * b before division: compute (a / GCD) * b instead."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the GCD of 12 and 18?",
                "options": [
                    "A) 2",
                    "B) 3",
                    "C) 6",
                    "D) 36"
                ],
                "correct": 2,
                "explanation": "Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. Greatest shared is 6."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What does GCD stand for in mathematics?",
                "options": [
                    "A) Greatest Common Divisor",
                    "B) Greatest Common Multiple",
                    "C) Least Common Multiple",
                    "D) Least Common Divisor"
                ],
                "correct": 0,
                "explanation": "GCD is an abbreviation for Greatest Common Divisor, which is the largest integer that divides both numbers."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the LCM of 12 and 18?",
                "options": [
                    "A) 12",
                    "B) 18",
                    "C) 36",
                    "D) 72"
                ],
                "correct": 2,
                "explanation": "To find the LCM, first find the GCD of 12 and 18, which is 6. Then use the formula LCM(a,b) = (a * b) / GCD(a,b). LCM(12,18) = (12 * 18) / 6 = 36."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Write a C function to calculate the GCD of two numbers using the Euclidean algorithm. What is the return type of this function?",
                "options": [
                    "A) void",
                    "B) int",
                    "C) float",
                    "D) double"
                ],
                "correct": 1,
                "explanation": "The Euclidean algorithm is used to find the GCD of two numbers. The return type of the function should be int because GCD is always an integer."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "If the GCD of two numbers a and b is 4, and a = 12, what is the value of b?",
                "options": [
                    "A) 4",
                    "B) 8",
                    "C) 12",
                    "D) 20"
                ],
                "correct": 1,
                "explanation": "Since the GCD of a and b is 4, and a = 12, b must be a multiple of 4. The only option that is a multiple of 4 is 8."
            }
        ],
        "logicHints": {
            "approach": "Use Euclid's modulo method to get GCD, then compute LCM.",
            "keySteps": [
                "While b != 0: temp = b; b = a % b; a = temp;",
                "GCD = a",
                "LCM = (origA * origB) / GCD"
            ],
            "pseudocode": "FUNCTION getGCD(a, b):\n  WHILE b != 0:\n    temp = b\n    b = a % b\n    a = temp\n  RETURN a"
        },
        "referenceSolution": "#include <stdio.h>\n\nint getGCD(int a, int b) {\n    while (b != 0) {\n        int temp = b;\n        b = a % b;\n        a = temp;\n    }\n    return a;\n}\n\nint main() {\n    int a = 12, b = 18;\n    int gcd = getGCD(a, b);\n    int lcm = (a * b) / gcd;\n    printf(\"GCD: %d, LCM: %d\\n\", gcd, lcm);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "power-number": {
        "id": "power-number",
        "title": "Power of a Number",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "⚡",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Calculate base raised to the power of exponent (base^exponent) without using pow().",
            "whatIsIt": "Multiplies the base by itself exponent times. For example, 2^3 = 2 * 2 * 2 = 8.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Initialize result = 1",
                    "description": "Start at multiplicative identity 1."
                },
                {
                    "step": 2,
                    "title": "Loop and multiply",
                    "description": "Loop exponent times, multiplying result by base."
                }
            ],
            "keyTerms": [
                {
                    "term": "Base",
                    "definition": "The number to be multiplied."
                },
                {
                    "term": "Exponent",
                    "definition": "The number of times the base is multiplied by itself."
                }
            ],
            "realWorldExample": "Calculating compound interest growth rates or binary code capacity combinations.",
            "timeComplexity": "O(exponent)",
            "spaceComplexity": "O(1)",
            "whenToUse": "General integer exponentiation without linking math.h library.",
            "commonMistakes": [
                "Initializing result to 0.",
                "Not handling negative exponents."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is 5 raised to power 0?",
                "options": [
                    "A) 0",
                    "B) 5",
                    "C) 1",
                    "D) Undefined"
                ],
                "correct": 2,
                "explanation": "Any non-zero number raised to the power of 0 is always 1."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the result of 2 raised to the power of 3 in C?",
                "options": [
                    "A) 5",
                    "B) 6",
                    "C) 8",
                    "D) 9"
                ],
                "correct": 2,
                "explanation": "2^3 = 2 * 2 * 2 = 8, which is a basic power calculation."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Write a C function to calculate the power of a number. What is the return type of this function if it takes two integer parameters, base and exponent, and returns the result of base raised to the power of exponent?",
                "options": [
                    "A) int",
                    "B) float",
                    "C) double",
                    "D) long long"
                ],
                "correct": 2,
                "explanation": "Since the result of the power operation can be a decimal number, the return type should be float to accommodate this."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider the following C code snippet: `double power(double base, int exponent) { double result = 1.0; for (int i = 0; i < exponent; i++) { result *= base; } return result; }`. What is the time complexity of this function?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n^2)"
                ],
                "correct": 2,
                "explanation": "The function has a single loop that runs 'exponent' times, making its time complexity linear, or O(n), where n is the exponent."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What will be the output of the following C code: `int main() { int base = 2; int exponent = 3; int result = 1; for (int i = 0; i < exponent; i++) { result *= base; } printf(\"%d\", result); return 0; }`",
                "options": [
                    "A) 5",
                    "B) 6",
                    "C) 8",
                    "D) 9"
                ],
                "correct": 2,
                "explanation": "The code calculates 2 raised to the power of 3, which equals 2 * 2 * 2 = 8."
            }
        ],
        "logicHints": {
            "approach": "Multiply result by base, exponent times in a loop.",
            "keySteps": [
                "result = 1",
                "Loop i from 1 to exp: result *= base"
            ],
            "pseudocode": "result = 1\nFOR i = 1 TO exponent:\n  result = result * base\nRETURN result"
        },
        "referenceSolution": "#include <stdio.h>\n\ndouble power(double base, int exp) {\n    double result = 1.0;\n    int positiveExp = exp < 0 ? -exp : exp;\n    for (int i = 0; i < positiveExp; i++) {\n        result *= base;\n    }\n    return exp < 0 ? 1.0 / result : result;\n}\n\nint main() {\n    printf(\"2^3 = %.1f\\n\", power(2.0, 3));\n    printf(\"2^-2 = %.2f\\n\", power(2.0, -2));\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "fibonacci-series": {
        "id": "fibonacci-series",
        "title": "Fibonacci Series (Iterative)",
        "category": "Loops & Math Logic",
        "level": "beginner",
        "levelNum": 2,
        "icon": "📈",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Generate and print the first n terms of the Fibonacci sequence iteratively.",
            "whatIsIt": "Prints the sequence 0, 1, 1, 2, 3, 5, 8, 13... where each term is the sum of the previous two.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Initialize first two",
                    "description": "t1 = 0, t2 = 1."
                },
                {
                    "step": 2,
                    "title": "Print and update",
                    "description": "Print next term. nextTerm = t1 + t2. Shift t1 = t2, t2 = nextTerm. Repeat."
                }
            ],
            "keyTerms": [
                {
                    "term": "Iterative Sequence",
                    "definition": "Generating terms step-by-step using a loop."
                }
            ],
            "realWorldExample": "Calculating rabbit population growth models or financial analysis indicators.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Standard method to print Fibonacci terms without stack overhead of recursion.",
            "commonMistakes": [
                "Forgetting to update both t1 and t2 in the correct order: must store nextTerm before shifting."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is the 5th term in the Fibonacci series (starting with 0, 1)?",
                "options": [
                    "A) 2",
                    "B) 3",
                    "C) 4",
                    "D) 5"
                ],
                "correct": 1,
                "explanation": "The series is: 0, 1, 1, 2, 3. The 5th term is 3."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the first term in the Fibonacci series?",
                "options": [
                    "A) 0",
                    "B) 1",
                    "C) 2",
                    "D) 3"
                ],
                "correct": 0,
                "explanation": "The Fibonacci series starts with 0, 1, so the first term is 0."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Write a C code snippet to print the first 10 terms of the Fibonacci series. Which of the following is the correct loop condition?",
                "options": [
                    "A) i < 10",
                    "B) i <= 10",
                    "C) i < 11",
                    "D) i <= 11"
                ],
                "correct": 2,
                "explanation": "Since array indices in C start at 0, to print the first 10 terms, the loop should run from 0 to 9, so the condition should be i < 10. However, considering the context of the question which asks for the first 10 terms and assuming the loop starts from 0, the correct condition to include the 10th term would indeed be i < 10 or i <= 9, but since i < 11 also includes the first 10 terms (from 0 to 9), it's a viable option in a different context."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider the following C code snippet for printing the Fibonacci series: int a = 0, b = 1; for (int i = 0; i < n; i++) { printf(\"%d \", a); int temp = a; a = b; b = temp + b; }. What is the time complexity of this algorithm?",
                "options": [
                    "A) O(n)",
                    "B) O(n^2)",
                    "C) O(2^n)",
                    "D) O(log n)"
                ],
                "correct": 0,
                "explanation": "The algorithm iterates through a loop 'n' times, performing a constant amount of work in each iteration. Therefore, the time complexity is linear, O(n)."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What will be the output of the following C code snippet: int a = 0, b = 1; for (int i = 0; i < 5; i++) { printf(\"%d \", a); int temp = a; a = b; b = temp + b; }?",
                "options": [
                    "A) 0 1 1 2 3",
                    "B) 0 1 1 2 3 5",
                    "C) 0 1 1 2 3 5 8",
                    "D) 0 1 1 2 3 5 8 13"
                ],
                "correct": 0,
                "explanation": "The loop runs 5 times, printing the first 5 terms of the Fibonacci series: 0, 1, 1, 2, 3."
            }
        ],
        "logicHints": {
            "approach": "Start with t1=0, t2=1. Loop n times, printing t1, then calculating nextTerm = t1+t2, then setting t1=t2, t2=nextTerm.",
            "keySteps": [
                "Print t1, t2",
                "Loop i from 3 to n: next = t1 + t2; print next; t1 = t2; t2 = next;"
            ],
            "pseudocode": "t1 = 0, t2 = 1\nFOR i = 1 TO n:\n  PRINT t1\n  next = t1 + t2\n  t1 = t2\n  t2 = next"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int n = 8, t1 = 0, t2 = 1, nextTerm;\n    printf(\"Fibonacci Series: \");\n    for (int i = 1; i <= n; ++i) {\n        printf(\"%d \", t1);\n        nextTerm = t1 + t2;\n        t1 = t2;\n        t2 = nextTerm;\n    }\n    printf(\"\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "functions-basics": {
        "id": "functions-basics",
        "title": "Function Basics",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "⚙️",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Functions are reusable blocks of code that perform specific tasks. They help modularize and clean up code.",
            "whatIsIt": "A function is like a recipe. Instead of writing the steps to bake a cake every time you want cake, you write a \"bakeCake\" function and call it by name. Functions take inputs (parameters), run code, and return an output (return value).",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Declare the function",
                    "description": "Write a prototype at the top: returnType funcName(parameters);"
                },
                {
                    "step": 2,
                    "title": "Define the function",
                    "description": "Write the actual code block implementing the prototype."
                },
                {
                    "step": 3,
                    "title": "Call the function",
                    "description": "Invoke it from main() or another function: funcName(arguments);"
                }
            ],
            "keyTerms": [
                {
                    "term": "Parameter",
                    "definition": "The variable declared in the function definition that receives input."
                },
                {
                    "term": "Argument",
                    "definition": "The actual value passed to the function when calling it."
                },
                {
                    "term": "Return Type",
                    "definition": "The data type of the value the function sends back to the caller (use void if none)."
                }
            ],
            "realWorldExample": "A juice maker machine. You put fruits in (arguments), it runs some blades (function logic), and pours juice out (return value).",
            "timeComplexity": "O(1)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Whenever you have a block of code that needs to repeat in different places, or to break a large program into small, readable pieces.",
            "commonMistakes": [
                "Forgetting the semicolon after the function declaration prototype",
                "Not returning a value when the return type is not void",
                "Declaring a function inside another function body"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Which return type is used when a function does not return any value?",
                "options": [
                    "A) int",
                    "B) null",
                    "C) void",
                    "D) empty"
                ],
                "correct": 2,
                "explanation": "void is the keyword used to specify that a function does not return any value."
            },
            {
                "id": 2,
                "difficulty": "medium",
                "question": "What is the difference between a parameter and an argument?",
                "options": [
                    "A) No difference",
                    "B) Parameter is in definition; Argument is the actual value passed in the call",
                    "C) Argument is in definition; Parameter is in call",
                    "D) Parameters are only integers"
                ],
                "correct": 1,
                "explanation": "Parameters are the placeholders in the function declaration/definition, while arguments are the actual values passed when the function is called."
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": "What is the purpose of the return statement in a function?",
                "options": [
                    "A) To exit the program",
                    "B) To pass arguments to the function",
                    "C) To return a value to the caller",
                    "D) To declare a variable"
                ],
                "correct": 2,
                "explanation": "The return statement is used to return a value from a function to its caller."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "What happens when a function is called recursively without a base case?",
                "options": [
                    "A) The function will execute only once",
                    "B) The function will execute a fixed number of times",
                    "C) The function will cause a stack overflow",
                    "D) The function will return an error message"
                ],
                "correct": 2,
                "explanation": "If a function calls itself recursively without a base case, it will continue to call itself indefinitely, leading to a stack overflow."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "What is the difference between a function declaration and a function definition in C?",
                "options": [
                    "A) A declaration specifies the function's return type and parameters, while a definition provides the function's implementation",
                    "B) A declaration provides the function's implementation, while a definition specifies the function's return type and parameters",
                    "C) A declaration is used for built-in functions, while a definition is used for user-defined functions",
                    "D) A declaration is used for recursive functions, while a definition is used for iterative functions"
                ],
                "correct": 0,
                "explanation": "A function declaration, also known as a function prototype, specifies the function's return type and parameters, while a function definition provides the actual implementation of the function."
            }
        ],
        "logicHints": {
            "approach": "Create a simple function to add two numbers and return the result.",
            "keySteps": [
                "Step 1: Declare the function prototype `int add(int a, int b);`",
                "Step 2: Define the function returning `a + b`",
                "Step 3: Call it in `main()` with sample numbers and print output"
            ],
            "pseudocode": "DEFINE FUNCTION add(a, b):\n  RETURN a + b\nMAIN:\n  CALL add(5, 10) AND PRINT RESULT"
        },
        "referenceSolution": "#include <stdio.h>\n\n/* Function prototype */\nint add(int a, int b);\n\nint main() {\n    int sum = add(10, 20);\n    printf(\"Sum is %d\\n\", sum);\n    return 0;\n}\n\n/* Function definition */\nint add(int a, int b) {\n    return a + b;\n}\n",
        "flowDiagramType": null
    },
    "arrays-basics": {
        "id": "arrays-basics",
        "title": "Array Basics",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "📊",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Arrays store multiple items of the same data type in contiguous memory locations.",
            "whatIsIt": "Instead of declaring 10 separate variables for 10 scores, you declare a single array: `int scores[10];`. Array indices start at 0, meaning the first element is `scores[0]` and the last is `scores[9]`.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Declare and size",
                    "description": "dataType name[size]; reserves memory for size elements."
                },
                {
                    "step": 2,
                    "title": "Access elements",
                    "description": "Use name[index] to read or write values. Remember index goes from 0 to size-1."
                },
                {
                    "step": 3,
                    "title": "Loop through",
                    "description": "Usually a for loop is used to read/write all elements."
                }
            ],
            "keyTerms": [
                {
                    "term": "Index",
                    "definition": "The integer coordinate of an element in the array, starting at 0."
                },
                {
                    "term": "Contiguous Memory",
                    "definition": "Memory locations placed side-by-side with no gaps."
                },
                {
                    "term": "Out of Bounds",
                    "definition": "Accessing an index less than 0 or >= size, causing undefined behavior or crashes."
                }
            ],
            "realWorldExample": "A egg carton. Each slot can hold one egg. You identify slots by their slot number, e.g., slot 0 to 11.",
            "timeComplexity": "O(1) access",
            "spaceComplexity": "O(n)",
            "whenToUse": "When you need to store and iterate over a list of items of the same type.",
            "commonMistakes": [
                "Starting indices at 1 instead of 0",
                "Accessing index size (e.g. arr[10] for an array of size 10) — this is out of bounds"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is the index of the first element in a C array?",
                "options": [
                    "A) 1",
                    "B) -1",
                    "C) 0",
                    "D) Any number"
                ],
                "correct": 2,
                "explanation": "C arrays are zero-indexed, meaning the first element is always at index 0."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the purpose of using arrays in C programming?",
                "options": [
                    "A) To declare a single variable",
                    "B) To declare multiple variables of the same type",
                    "C) To perform arithmetic operations",
                    "D) To control the flow of a program"
                ],
                "correct": 1,
                "explanation": "Arrays allow you to declare multiple variables of the same type, making it easier to store and manipulate large amounts of data."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider the following array declaration: `int scores[10];`. What is the index of the last element in the array?",
                "options": [
                    "A) 9",
                    "B) 10",
                    "C) 11",
                    "D) 0"
                ],
                "correct": 0,
                "explanation": "Since the array has 10 elements, the indices range from 0 to 9, making the last element at index 9."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What happens when you try to access an array element outside its bounds, for example, `scores[10]` in the array `int scores[10];`?",
                "options": [
                    "A) The program will throw a compile-time error",
                    "B) The program will throw a runtime error",
                    "C) The program will access a random memory location",
                    "D) The program will access the first element of the array"
                ],
                "correct": 2,
                "explanation": "Accessing an array element outside its bounds results in undefined behavior, which can lead to accessing a random memory location, potentially causing the program to crash or produce unexpected results."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "How do you declare an array to store the names of 5 students, assuming each name is a string of up to 20 characters?",
                "options": [
                    "A) `char names[5];`",
                    "B) `char names[5][20];`",
                    "C) `char names[20][5];`",
                    "D) `int names[5];`"
                ],
                "correct": 1,
                "explanation": "To store the names of 5 students, each with a string of up to 20 characters, you need a 2D array of characters, where the first dimension represents the number of students and the second dimension represents the maximum length of each name."
            }
        ],
        "logicHints": {
            "approach": "Declare an array of integers, initialize it, and print all values using a loop.",
            "keySteps": [
                "Step 1: Declare `int arr[5] = {10, 20, 30, 40, 50};`",
                "Step 2: Loop from 0 to 4",
                "Step 3: Print `arr[i]`"
            ],
            "pseudocode": "DECLARE arr[5] = [10, 20, 30, 40, 50]\nFOR i = 0 TO 4:\n  PRINT arr[i]"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    \n    printf(\"Array elements:\\n\");\n    for (int i = 0; i < 5; i++) {\n        printf(\"arr[%d] = %d\\n\", i, arr[i]);\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
    },
        "arrays-max-min": {
        "id": "arrays-max-min",
        "title": "Find Max & Min in Array",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "📈",
        "estimatedTime": "6 min",
        "concept": {
                "summary": "Scan the array to find the largest (maximum) and smallest (minimum) elements.",
                "whatIsIt": "Finding the extreme values in a collection. You initialize 'max' and 'min' with the first element, then loop through the rest of the array, updating them whenever a larger or smaller element is encountered.",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Initialize markers",
                                "description": "Set min = arr[0] and max = arr[0]. Do not initialize to 0 as that fails for all-negative or all-positive inputs."
                        },
                        {
                                "step": 2,
                                "title": "Loop and compare",
                                "description": "Iterate from index 1 to size - 1. If arr[i] > max, update max. If arr[i] < min, update min."
                        },
                        {
                                "step": 3,
                                "title": "Return results",
                                "description": "After the loop ends, max and min hold the absolute extremes."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "Maximum",
                                "definition": "The largest value in a set of numbers."
                        },
                        {
                                "term": "Minimum",
                                "definition": "The smallest value in a set of numbers."
                        }
                ],
                "realWorldExample": "Checking a weather station's logs to find the hottest and coldest temperatures recorded during the week.",
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(1)",
                "whenToUse": "Whenever you need to find the bounds or range of values in a dataset.",
                "commonMistakes": [
                        "Initializing max/min to 0 instead of arr[0]",
                        "Starting the loop at 0 instead of 1 (unnecessary comparison of first element with itself)"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "What is the best way to initialize the min and max variables?",
                        "options": [
                                "A) Set both to 0",
                                "B) Set min to 9999 and max to -9999",
                                "C) Set both to the first element of the array",
                                "D) Leave them uninitialized"
                        ],
                        "correct": 2,
                        "explanation": "Initializing with the first element (arr[0]) guarantees that the comparison values are actual members of the array, which is robust against all ranges."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "If an array has size N, how many comparisons are needed to find max/min using the standard loop?",
                        "options": [
                                "A) N comparisons",
                                "B) 2 * (N - 1) comparisons",
                                "C) N^2 comparisons",
                                "D) log(N) comparisons"
                        ],
                        "correct": 1,
                        "explanation": "For each of the N-1 remaining elements, we compare against both max and min, yielding 2*(N-1) comparisons."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "What is the time complexity of finding max and min in an unsorted array of size N?",
                        "options": [
                                "A) O(1)",
                                "B) O(log N)",
                                "C) O(N)",
                                "D) O(N log N)"
                        ],
                        "correct": 2,
                        "explanation": "We must visit every element in the array exactly once, which requires linear O(N) time."
                },
                {
                        "id": 4,
                        "difficulty": "hard",
                        "question": "What would happen if you initialized max to 0 and all array values were negative?",
                        "options": [
                                "A) The program crashes",
                                "B) The final max will be 0 (incorrect)",
                                "C) The compiler raises an error",
                                "D) The final max will be the correct smallest negative value"
                        ],
                        "correct": 1,
                        "explanation": "Since all array values are negative, none will be greater than 0, leaving max at 0, which is not in the array."
                },
                {
                        "id": 5,
                        "difficulty": "medium",
                        "question": "Which header is required for finding max/min in a basic array in C?",
                        "options": [
                                "A) <math.h>",
                                "B) <stdlib.h>",
                                "C) <stdio.h> (for standard IO)",
                                "D) No special header is required for raw comparisons"
                        ],
                        "correct": 3,
                        "explanation": "Raw comparison operators like < and > are built into core C language syntax, so no special mathematical library is required."
                }
        ],
        "logicHints": {
                "approach": "Set min and max to arr[0]. Loop and update both trackers.",
                "keySteps": [
                        "Initialize min = arr[0], max = arr[0]",
                        "Loop i from 1 to 4",
                        "Compare arr[i] and update min/max if needed"
                ],
                "pseudocode": "DECLARE arr[5] = [12, 5, 87, 1, 43]\nmin = arr[0]\nmax = arr[0]\nFOR i = 1 TO 4:\n  IF arr[i] > max THEN max = arr[i]\n  IF arr[i] < min THEN min = arr[i]\nPRINT max, min"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {12, 5, 87, 1, 43};\n    int min = arr[0];\n    int max = arr[0];\n    \n    for (int i = 1; i < 5; i++) {\n        if (arr[i] > max) {\n            max = arr[i];\n        }\n        if (arr[i] < min) {\n            min = arr[i];\n        }\n    }\n    printf(\"Minimum: %d\\n\", min);\n    printf(\"Maximum: %d\\n\", max);\n    return 0;\n}\n",
        "flowDiagramType": null
},
    "arrays-sum": {
        "id": "arrays-sum",
        "title": "Sum of Array Elements",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "➕",
        "estimatedTime": "5 min",
        "concept": {
                "summary": "Accumulate all values in an array into a single sum variable.",
                "whatIsIt": "A fundamental aggregation task. You initialize a sum variable to 0, then visit each slot in the array sequentially, adding its value to the sum.",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Initialize sum",
                                "description": "Start with sum = 0. Leaving it uninitialized adds items to garbage data."
                        },
                        {
                                "step": 2,
                                "title": "Iterate & add",
                                "description": "Loop through each index, adding the element to the accumulator: sum += arr[i]."
                        },
                        {
                                "step": 3,
                                "title": "Output",
                                "description": "The final sum value is now complete."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "Accumulator",
                                "definition": "A variable used to collect or gather intermediate results during iteration."
                        }
                ],
                "realWorldExample": "Summing up the individual item costs in a shopping cart array to compute the grand total bill.",
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(1)",
                "whenToUse": "To calculate aggregates, averages, or checksums on a list of numbers.",
                "commonMistakes": [
                        "Forgetting to initialize sum to 0",
                        "Off-by-one errors in loop boundaries"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "What happens if you do not initialize the sum variable to 0?",
                        "options": [
                                "A) It defaults to 0 automatically in C",
                                "B) It will contain a garbage value, producing an incorrect total",
                                "C) The program fails to compile",
                                "D) The array elements are erased"
                        ],
                        "correct": 1,
                        "explanation": "Local variables in C are not initialized to 0 by default. They contain random 'garbage' data from memory."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "How do you calculate the average after finding the sum of N elements?",
                        "options": [
                                "A) average = sum * N",
                                "B) average = (float)sum / N",
                                "C) average = sum % N",
                                "D) average = sum - N"
                        ],
                        "correct": 1,
                        "explanation": "Average is the total sum divided by the count. Casting to float prevents integer division truncation."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "What is the time complexity of summing an array of N elements?",
                        "options": [
                                "A) O(1)",
                                "B) O(N)",
                                "C) O(N^2)",
                                "D) O(log N)"
                        ],
                        "correct": 1,
                        "explanation": "You must visit each of the N elements exactly once, leading to linear O(N) time."
                },
                {
                        "id": 4,
                        "difficulty": "medium",
                        "question": "What is the correct loop condition to sum array `int a[5]`?",
                        "options": [
                                "A) for(int i=0; i<=5; i++)",
                                "B) for(int i=1; i<=5; i++)",
                                "C) for(int i=0; i<5; i++)",
                                "D) for(int i=0; i<4; i++)"
                        ],
                        "correct": 2,
                        "explanation": "Index starts at 0 and ends at 4, so `i < 5` is correct."
                },
                {
                        "id": 5,
                        "difficulty": "hard",
                        "question": "If you sum elements of a massive integer array and get a negative total, what likely occurred?",
                        "options": [
                                "A) C doesn't support big sums",
                                "B) Integer overflow",
                                "C) Memory leak",
                                "D) Compiler optimization bug"
                        ],
                        "correct": 1,
                        "explanation": "Accumulating beyond the maximum positive integer limit wraps the value into negative bounds (signed integer overflow)."
                }
        ],
        "logicHints": {
                "approach": "Loop through all elements and add them to sum.",
                "keySteps": [
                        "Initialize sum = 0",
                        "Loop from index 0 to 4",
                        "Add arr[i] to sum"
                ],
                "pseudocode": "sum = 0\nDECLARE arr[5] = [5, 10, 15, 20, 25]\nFOR i = 0 TO 4:\n  sum = sum + arr[i]\nPRINT sum"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {5, 10, 15, 20, 25};\n    int sum = 0;\n    \n    for (int i = 0; i < 5; i++) {\n        sum += arr[i];\n    }\n    printf(\"Sum: %d\\n\", sum);\n    return 0;\n}\n",
        "flowDiagramType": null
},
    "arrays-reverse": {
        "id": "arrays-reverse",
        "title": "Reverse an Array",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "🔄",
        "estimatedTime": "7 min",
        "concept": {
                "summary": "Reverse the order of elements in an array in-place.",
                "whatIsIt": "In-place reversal swaps elements from both ends (using left and right pointers) meeting in the middle, avoiding the need for an extra copy of the array.",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Initialize pointers",
                                "description": "Set start = 0 and end = size - 1."
                        },
                        {
                                "step": 2,
                                "title": "Swap elements",
                                "description": "While start < end, swap arr[start] and arr[end] using a temp variable."
                        },
                        {
                                "step": 3,
                                "title": "Move inward",
                                "description": "Increment start, decrement end, and repeat."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "In-Place",
                                "definition": "An algorithm that updates data structures using O(1) auxiliary space."
                        }
                ],
                "realWorldExample": "Reversing an audio wave sample array to play the sound backward.",
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(1)",
                "whenToUse": "To reverse lists, strings, or order-dependent datasets.",
                "commonMistakes": [
                        "Looping all the way to N, which swaps elements twice and restores the original array",
                        "Using end = size instead of size - 1 (causes out of bounds)"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "What happens if the swap loop condition is start <= end instead of start < end?",
                        "options": [
                                "A) It swaps the middle element with itself, which is harmless",
                                "B) It causes an infinite loop",
                                "C) The program crashes",
                                "D) The array is not reversed"
                        ],
                        "correct": 0,
                        "explanation": "If start == end, the middle element swaps with itself, which leaves the element unchanged and is harmless."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "If you reverse an array using a secondary copy array, what is the space complexity?",
                        "options": [
                                "A) O(1)",
                                "B) O(N)",
                                "C) O(N^2)",
                                "D) O(log N)"
                        ],
                        "correct": 1,
                        "explanation": "Creating a secondary array of size N requires auxiliary space proportional to N, hence O(N)."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "Which of the following is correct to swap a and b in C?",
                        "options": [
                                "A) a = b; b = a;",
                                "B) temp = a; a = b; b = temp;",
                                "C) a = temp; temp = b; b = a;",
                                "D) b = temp; temp = a; a = b;"
                        ],
                        "correct": 1,
                        "explanation": "We must save 'a' in a temp variable before overwriting it with 'b', then assign the saved value to 'b'."
                },
                {
                        "id": 4,
                        "difficulty": "hard",
                        "question": "How many swaps are performed to reverse an array of size N?",
                        "options": [
                                "A) N swaps",
                                "B) N / 2 swaps",
                                "C) N - 1 swaps",
                                "D) N^2 swaps"
                        ],
                        "correct": 1,
                        "explanation": "We swap elements from the edges until start meets end in the middle, resulting in N/2 swaps."
                },
                {
                        "id": 5,
                        "difficulty": "medium",
                        "question": "What is the index of the last element in array `int arr[N]`?",
                        "options": [
                                "A) N",
                                "B) N + 1",
                                "C) N - 1",
                                "D) 0"
                        ],
                        "correct": 2,
                        "explanation": "C arrays use zero-based indexing, so a size N array has indices 0 to N-1."
                }
        ],
        "logicHints": {
                "approach": "Swap elements from edges moving towards the center.",
                "keySteps": [
                        "Initialize start = 0, end = 4",
                        "While start < end, swap elements using a temp variable",
                        "Increment start, decrement end"
                ],
                "pseudocode": "DECLARE arr[5] = [1, 2, 3, 4, 5]\nstart = 0\nend = 4\nWHILE start < end:\n  temp = arr[start]\n  arr[start] = arr[end]\n  arr[end] = temp\n  start = start + 1\n  end = end - 1"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    int start = 0, end = 4;\n    \n    while (start < end) {\n        int temp = arr[start];\n        arr[start] = arr[end];\n        arr[end] = temp;\n        start++;\n        end--;\n    }\n    printf(\"Reversed array:\\n\");\n    for (int i = 0; i < 5; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
},
    "arrays-insert": {
        "id": "arrays-insert",
        "title": "Insert Element in Array",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "📥",
        "estimatedTime": "8 min",
        "concept": {
                "summary": "Insert a new value at a given position, shifting items right.",
                "whatIsIt": "Since array structures reside in contiguous memory, inserting an element at index `pos` requires shifting all elements at indices `pos` to `size-1` one slot to the right.",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Shift right",
                                "description": "Start from the last element (index size-1) and copy it to index i+1, shifting down to the target position."
                        },
                        {
                                "step": 2,
                                "title": "Insert value",
                                "description": "Place the new value in the now-vacant target slot: arr[pos] = value."
                        },
                        {
                                "step": 3,
                                "title": "Increase size count",
                                "description": "Increment the tracker representing the number of valid items in the array."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "Shifting",
                                "definition": "Moving array elements to adjacent index positions to make space or close gaps."
                        }
                ],
                "realWorldExample": "Adding a new member in the middle of a waiting list, requiring everyone behind them to step back one spot.",
                "timeComplexity": "O(n) worst-case",
                "spaceComplexity": "O(1)",
                "whenToUse": "To insert elements at specific sorted locations or list indexes.",
                "commonMistakes": [
                        "Shifting left-to-right (overwrites data)",
                        "Inserting beyond the allocated capacity of the array (causes buffer overflow)"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "Why must we shift elements from right to left (back to front)?",
                        "options": [
                                "A) To run faster",
                                "B) To avoid overwriting adjacent values before they are moved",
                                "C) C doesn't support left-to-right loops",
                                "D) To save memory"
                        ],
                        "correct": 1,
                        "explanation": "If we shift left-to-right, the element at pos overwrites pos+1, which then overwrites pos+2, causing loss of data."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "What is the worst-case time complexity of inserting into an array of size N?",
                        "options": [
                                "A) O(1)",
                                "B) O(N)",
                                "C) O(N^2)",
                                "D) O(log N)"
                        ],
                        "correct": 1,
                        "explanation": "Inserting at index 0 requires shifting all N elements, which takes O(N) operations."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "In which index is insertion fastest (O(1) complexity)?",
                        "options": [
                                "A) Index 0",
                                "B) The middle index",
                                "C) The very end of the array",
                                "D) Any index"
                        ],
                        "correct": 2,
                        "explanation": "Inserting at the end requires no shifting, making it an O(1) operation."
                },
                {
                        "id": 4,
                        "difficulty": "medium",
                        "question": "What happens if we insert an element when the array is already at its max declared capacity?",
                        "options": [
                                "A) It resizes automatically",
                                "B) Memory corruption / Out of Bounds crash",
                                "C) The compiler flags it",
                                "D) The element is ignored"
                        ],
                        "correct": 1,
                        "explanation": "Standard C arrays have fixed size. Accessing elements beyond capacity leads to undefined behavior or crashes."
                },
                {
                        "id": 5,
                        "difficulty": "hard",
                        "question": "What is the shift direction for array insertion?",
                        "options": [
                                "A) Shift Left",
                                "B) Shift Right",
                                "C) Swap Left",
                                "D) No shift needed"
                        ],
                        "correct": 1,
                        "explanation": "We shift elements to the right (higher indices) to clear a slot."
                }
        ],
        "logicHints": {
                "approach": "Shift elements from the end to the right, then write the element.",
                "keySteps": [
                        "Loop i from size-1 down to pos",
                        "Copy arr[i] to arr[i+1]",
                        "Set arr[pos] = new_value"
                ],
                "pseudocode": "DECLARE arr[6] = [10, 20, 30, 40, 50, 0] // capacity 6, size 5\npos = 2\nval = 99\nFOR i = 4 DOWNTO pos:\n  arr[i+1] = arr[i]\narr[pos] = val\nsize = 6"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int arr[6] = {10, 20, 30, 40, 50};\n    int size = 5;\n    int pos = 2;\n    int val = 99;\n    \n    for (int i = size - 1; i >= pos; i--) {\n        arr[i + 1] = arr[i];\n    }\n    arr[pos] = val;\n    size++;\n    \n    printf(\"After insertion:\\n\");\n    for (int i = 0; i < size; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
},
    "arrays-delete": {
        "id": "arrays-delete",
        "title": "Delete Element from Array",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "📤",
        "estimatedTime": "8 min",
        "concept": {
                "summary": "Remove an element at a given index, shifting elements left.",
                "whatIsIt": "Deletion overwrites the target slot, then shifts all subsequent elements to the left by one position to maintain contiguous storage.",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Target index",
                                "description": "Identify index pos to delete."
                        },
                        {
                                "step": 2,
                                "title": "Shift left",
                                "description": "Loop from pos to size-2. Copy arr[i+1] to arr[i] to overwrite the deleted slot."
                        },
                        {
                                "step": 3,
                                "title": "Decrement size",
                                "description": "Reduce the logical size variable of the array."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "Logical Size",
                                "definition": "The number of elements currently stored and active, as opposed to the physical array capacity."
                        }
                ],
                "realWorldExample": "Removing a line item from a grocery bill spreadsheet, causing all rows below to shift up.",
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(1)",
                "whenToUse": "To remove elements from specific slots in a list.",
                "commonMistakes": [
                        "Forgetting to decrement size tracker, leaving a duplicate element at the end",
                        "Off-by-one errors in left-shifting loops"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "What is the shift direction during deletion?",
                        "options": [
                                "A) Shift Right",
                                "B) Shift Left",
                                "C) Split",
                                "D) Swapping"
                        ],
                        "correct": 1,
                        "explanation": "We shift elements to the left (lower indices) to fill the vacated slot."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "What is the time complexity of deleting the first element in an array of size N?",
                        "options": [
                                "A) O(1)",
                                "B) O(N)",
                                "C) O(N^2)",
                                "D) O(log N)"
                        ],
                        "correct": 1,
                        "explanation": "Deleting the first element (index 0) requires shifting all remaining N-1 elements, taking linear O(N) time."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "Which index can be deleted in O(1) time?",
                        "options": [
                                "A) Index 0",
                                "B) The last index (size - 1)",
                                "C) The middle index",
                                "D) None"
                        ],
                        "correct": 1,
                        "explanation": "Deleting the last element requires no shifting. We just decrement the size variable, taking O(1) time."
                },
                {
                        "id": 4,
                        "difficulty": "medium",
                        "question": "Why is a duplicate of the last element sometimes left behind after deleting?",
                        "options": [
                                "A) C compiler copy bug",
                                "B) The loop shifts values left, but doesn't erase the old last slot. Decrementing size hides it.",
                                "C) Memory leak",
                                "D) Array expansion"
                        ],
                        "correct": 1,
                        "explanation": "Left shifting overwrites index positions. The last cell is copied to the second-to-last cell, but its original value remains unless overwritten. Decrementing the size correctly ignores it."
                },
                {
                        "id": 5,
                        "difficulty": "hard",
                        "question": "What is the boundary for the deletion shift loop for array of size N?",
                        "options": [
                                "A) i from pos to N-1",
                                "B) i from pos to N-2",
                                "C) i from N-1 down to pos",
                                "D) i from N-2 down to pos"
                        ],
                        "correct": 1,
                        "explanation": "Since we copy `arr[i+1]` to `arr[i]`, the loop index `i` must go up to `N-2` so that `i+1` is `N-1` (the last valid element)."
                }
        ],
        "logicHints": {
                "approach": "Overwrite the deletion slot by shifting subsequent elements left.",
                "keySteps": [
                        "Start loop i from pos to size - 2",
                        "Set arr[i] = arr[i+1]",
                        "Decrement size"
                ],
                "pseudocode": "DECLARE arr[5] = [10, 20, 30, 40, 50]\npos = 2\nFOR i = pos TO 3:\n  arr[i] = arr[i+1]\nsize = 4"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int size = 5;\n    int pos = 2;\n    \n    for (int i = pos; i < size - 1; i++) {\n        arr[i] = arr[i + 1];\n    }\n    size--;\n    \n    printf(\"After deletion:\\n\");\n    for (int i = 0; i < size; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
},
    "arrays-add-two": {
        "id": "arrays-add-two",
        "title": "Element-wise Array Addition",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "🪜",
        "estimatedTime": "6 min",
        "concept": {
                "summary": "Add corresponding elements of two source arrays.",
                "whatIsIt": "Given two arrays A and B of the same size, we compute a third array C where each element C[i] is the sum of A[i] and B[i]. This is a simple linear vector operation.",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Iterate index",
                                "description": "Loop i from 0 to size-1."
                        },
                        {
                                "step": 2,
                                "title": "Sum corresponding cells",
                                "description": "Set C[i] = A[i] + B[i]."
                        },
                        {
                                "step": 3,
                                "title": "Output result",
                                "description": "Print or return array C."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "Vector Addition",
                                "definition": "Adding corresponding coordinates or components of two sequences."
                        }
                ],
                "realWorldExample": "Adding two spreadsheets of monthly expenses (Jan + Feb) category by category.",
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(n) for the output array",
                "whenToUse": "To perform bulk component additions on parallel data.",
                "commonMistakes": [
                        "Adding indices together instead of elements, e.g. C[i] = A[i] + i",
                        "Mixing loop indices and getting index out of bounds"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "What is the result of adding arrays A = {1, 2} and B = {10, 20}?",
                        "options": [
                                "A) {11, 22}",
                                "B) {1, 2, 10, 20}",
                                "C) {12, 21}",
                                "D) {33}"
                        ],
                        "correct": 0,
                        "explanation": "A[0]+B[0] = 1+10 = 11. A[1]+B[1] = 2+20 = 22. So {11, 22}."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "What is the time complexity of adding two arrays of size N?",
                        "options": [
                                "A) O(1)",
                                "B) O(N)",
                                "C) O(N^2)",
                                "D) O(log N)"
                        ],
                        "correct": 1,
                        "explanation": "We iterate N times, doing 1 addition per step. This takes O(N) time."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "Do C arrays support direct addition like `C = A + B;`?",
                        "options": [
                                "A) Yes, C natively supports array math",
                                "B) No, you must iterate and add element-wise",
                                "C) Yes, using <array.h> library",
                                "D) Only double arrays support this"
                        ],
                        "correct": 1,
                        "explanation": "C does not have built-in array algebra. You must write a loop to add corresponding elements."
                },
                {
                        "id": 4,
                        "difficulty": "hard",
                        "question": "If you perform C[i] = A[i] + B[i] and array C is smaller than N, what occurs?",
                        "options": [
                                "A) C auto-grows",
                                "B) Buffer overflow / memory corruption",
                                "C) Output is truncated automatically",
                                "D) Compilation error"
                        ],
                        "correct": 1,
                        "explanation": "Writing beyond array C's boundary will corrupt neighboring variables, causing unstable behavior."
                },
                {
                        "id": 5,
                        "difficulty": "medium",
                        "question": "Which loop adds arrays A and B of size 3?",
                        "options": [
                                "A) for(i=0; i<3; i++) C[i] = A[i] + B[i]",
                                "B) for(i=1; i<=3; i++) C[i] = A[i] + B[i]",
                                "C) for(i=0; i<3; i++) C = A + B",
                                "D) for(i=0; i<=3; i++) C[i] = A[i] + B[i]"
                        ],
                        "correct": 0,
                        "explanation": "Indices must go from 0 to 2, which matches option A."
                }
        ],
        "logicHints": {
                "approach": "Loop from 0 to size-1, add elements, and store in output.",
                "keySteps": [
                        "Loop i from 0 to 2",
                        "Set C[i] = A[i] + B[i]"
                ],
                "pseudocode": "DECLARE A[3] = [1, 2, 3]\nDECLARE B[3] = [10, 20, 30]\nFOR i = 0 TO 2:\n  C[i] = A[i] + B[i]\nPRINT C"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int A[3] = {1, 2, 3};\n    int B[3] = {10, 20, 30};\n    int C[3];\n    \n    for (int i = 0; i < 3; i++) {\n        C[i] = A[i] + B[i];\n    }\n    printf(\"Result array: \");\n    for (int i = 0; i < 3; i++) {\n        printf(\"%d \", C[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
},
    "arrays-subtract-two": {
        "id": "arrays-subtract-two",
        "title": "Element-wise Array Subtraction",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "📉",
        "estimatedTime": "6 min",
        "concept": {
                "summary": "Subtract corresponding elements of one array from another.",
                "whatIsIt": "Similar to addition, we compute `C[i] = A[i] - B[i]` for each index `i`. This represents subtraction of N-dimensional vectors.",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Loop indices",
                                "description": "Loop i from 0 to size-1."
                        },
                        {
                                "step": 2,
                                "title": "Subtract values",
                                "description": "Set C[i] = A[i] - B[i]."
                        },
                        {
                                "step": 3,
                                "title": "Display result",
                                "description": "Output the final difference array C."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "Vector Subtraction",
                                "definition": "Subtracting corresponding coordinates of two sequences."
                        }
                ],
                "realWorldExample": "Calculating stock inventory changes by subtracting sold counts from initial counts category-wise.",
                "timeComplexity": "O(n)",
                "spaceComplexity": "O(n) for the output array",
                "whenToUse": "To obtain differences between parallel datasets.",
                "commonMistakes": [
                        "Swapping the operand order: A[i] - B[i] is not equal to B[i] - A[i]",
                        "Off-by-one boundary bugs"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "What is the element-wise difference of A = {20, 30} and B = {5, 10} (A - B)?",
                        "options": [
                                "A) {15, 20}",
                                "B) {-15, -20}",
                                "C) {25, 40}",
                                "D) {15, 15}"
                        ],
                        "correct": 0,
                        "explanation": "20-5 = 15. 30-10 = 20. Thus {15, 20}."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "Is matrix or array subtraction commutative (i.e. is A - B == B - A)?",
                        "options": [
                                "A) Yes, subtraction is always commutative",
                                "B) No, the signs are flipped",
                                "C) Only for positive values",
                                "D) Only if arrays are sorted"
                        ],
                        "correct": 1,
                        "explanation": "No, subtraction is not commutative. A - B is the negative of B - A."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "What is the time complexity of subtracting N elements element-wise?",
                        "options": [
                                "A) O(1)",
                                "B) O(N)",
                                "C) O(N^2)",
                                "D) O(log N)"
                        ],
                        "correct": 1,
                        "explanation": "We perform N operations in a single loop, leading to linear O(N) complexity."
                },
                {
                        "id": 4,
                        "difficulty": "medium",
                        "question": "What is the primary danger when subtracting unsigned integer arrays?",
                        "options": [
                                "A) Underflow wrapping to huge positive numbers",
                                "B) Compilation error",
                                "C) Memory leak",
                                "D) Divide by zero"
                        ],
                        "correct": 0,
                        "explanation": "Unsigned values cannot hold negative numbers. If A[i] < B[i], the subtraction underflows and wraps around to a very large positive number."
                },
                {
                        "id": 5,
                        "difficulty": "hard",
                        "question": "How do you declare array C to hold the results of subtracting two 10-element int arrays?",
                        "options": [
                                "A) `int C;`",
                                "B) `int C[10];`",
                                "C) `int C[20];`",
                                "D) `float C[10];`"
                        ],
                        "correct": 1,
                        "explanation": "The output array C must have the same size (10 elements) and type (int) as the source arrays."
                }
        ],
        "logicHints": {
                "approach": "Loop through indices and calculate A[i] - B[i].",
                "keySteps": [
                        "Loop i from 0 to 2",
                        "Set C[i] = A[i] - B[i]"
                ],
                "pseudocode": "DECLARE A[3] = [20, 25, 30]\nDECLARE B[3] = [5, 10, 15]\nFOR i = 0 TO 2:\n  C[i] = A[i] - B[i]\nPRINT C"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int A[3] = {20, 25, 30};\n    int B[3] = {5, 10, 15};\n    int C[3];\n    \n    for (int i = 0; i < 3; i++) {\n        C[i] = A[i] - B[i];\n    }\n    printf(\"Result array: \");\n    for (int i = 0; i < 3; i++) {\n        printf(\"%d \", C[i]);\n    }\n    printf(\"\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
},
"arrays-2d-matrix": {
        "id": "arrays-2d-matrix",
        "title": "2D Arrays (Matrix)",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "🏁",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "A 2D array is an array of arrays, representing a grid or matrix with rows and columns.",
            "whatIsIt": "A 2D array stores elements in a grid structure. You access elements using two indices: row index and column index, e.g., `matrix[row][col]`. Internally, C stores 2D arrays in row-major order (row by row) in contiguous memory.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Declare matrix",
                    "description": "dataType name[rows][cols]; e.g., int mat[3][4]; reserves 3 rows and 4 columns."
                },
                {
                    "step": 2,
                    "title": "Access elements",
                    "description": "Use two indices: mat[1][2] is row index 1, col index 2 (the 2nd row, 3rd column)."
                },
                {
                    "step": 3,
                    "title": "Nested loops to print",
                    "description": "Outer loop runs through rows, inner loop through columns."
                }
            ],
            "keyTerms": [
                {
                    "term": "Row-Major Order",
                    "definition": "Storing elements of a 2D array row by row sequentially in memory."
                }
            ],
            "realWorldExample": "A chess board, spreadsheet cells (row numbers and column letters), or pixel grids in digital images.",
            "timeComplexity": "O(1) access",
            "spaceComplexity": "O(rows * cols)",
            "whenToUse": "When representing grids, tables, coordinates, or mathematical matrices.",
            "commonMistakes": [
                "Swapping row and column indices, e.g., accessing mat[col][row] instead of mat[row][col]",
                "Forgetting that indices start at 0 for both rows and columns"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "How many integer elements are in int mat[3][4]?",
                "options": [
                    "A) 7",
                    "B) 12",
                    "C) 34",
                    "D) 10"
                ],
                "correct": 1,
                "explanation": "A 2D array of 3 rows and 4 columns contains a total of 3 * 4 = 12 elements."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary way C stores 2D arrays in memory?",
                "options": [
                    "A) Column-major order",
                    "B) Row-major order",
                    "C) Diagonal order",
                    "D) Random order"
                ],
                "correct": 1,
                "explanation": "C stores 2D arrays in row-major order, meaning it stores the elements row by row in contiguous memory."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Given the declaration int matrix[2][3], what is the correct way to access the element in the second row and second column?",
                "options": [
                    "A) matrix[1][1]",
                    "B) matrix[2][2]",
                    "C) matrix[3][1]",
                    "D) matrix[1][3]"
                ],
                "correct": 0,
                "explanation": "Since array indices in C start at 0, the second row is index 1 and the second column is index 1, so the correct access is matrix[1][1]."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider a 2D array int picture[100][100]. If we want to iterate over each element in the array and perform some operation, which of the following loops would be the most efficient in terms of memory access pattern?",
                "options": [
                    "A) for (int i = 0; i < 100; i++) for (int j = 0; j < 100; j++)",
                    "B) for (int j = 0; j < 100; j++) for (int i = 0; i < 100; i++)",
                    "C) for (int i = 99; i >= 0; i--) for (int j = 99; j >= 0; j--)",
                    "D) for (int j = 99; j >= 0; j--) for (int i = 99; i >= 0; i--)"
                ],
                "correct": 0,
                "explanation": "The most efficient loop in terms of memory access pattern is the one that iterates over the array in row-major order, which is how C stores 2D arrays in memory. This means iterating over the rows first and then the columns, as in option A."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the total amount of memory used by a 2D array declared as char board[8][8]?",
                "options": [
                    "A) 64 bytes",
                    "B) 64 chars",
                    "C) 128 bytes",
                    "D) 8 bytes"
                ],
                "correct": 1,
                "explanation": "Since the array is declared as char board[8][8], it has 8 * 8 = 64 elements. Each char in C typically occupies 1 byte, so the total memory used is 64 bytes."
            }
        ],
        "logicHints": {
            "approach": "Create nested loops to print a 2D array row by row, adding a newline after each row.",
            "keySteps": [
                "Step 1: Write outer loop row `i` from 0 to `rows-1`",
                "Step 2: Write inner loop col `j` from 0 to `cols-1`",
                "Step 3: Print `mat[i][j]` followed by a space",
                "Step 4: Print `\\n` after inner loop ends"
            ],
            "pseudocode": "FOR i = 0 TO rows - 1:\n  FOR j = 0 TO cols - 1:\n    PRINT mat[i][j]\n  PRINT newline"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int matrix[2][3] = {\n        {1, 2, 3},\n        {4, 5, 6}\n    };\n    \n    printf(\"Matrix elements:\\n\");\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++) {\n            printf(\"%d \", matrix[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
    },
        "matrix-addition": {
        "id": "matrix-addition",
        "title": "Matrix Addition",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "🧇",
        "estimatedTime": "8 min",
        "concept": {
                "summary": "Add corresponding elements of two 2D matrices of the same dimensions.",
                "whatIsIt": "Adding matrices requires visiting each cell (row `i`, column `j`) and computing `C[i][j] = A[i][j] + B[i][j]`. This necessitates nested loops.",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Outer loop rows",
                                "description": "Loop row index i from 0 to rows - 1."
                        },
                        {
                                "step": 2,
                                "title": "Inner loop cols",
                                "description": "Loop col index j from 0 to cols - 1."
                        },
                        {
                                "step": 3,
                                "title": "Add cells",
                                "description": "Set C[i][j] = A[i][j] + B[i][j]."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "Matrix",
                                "definition": "A rectangular grid of numbers organized in rows and columns."
                        }
                ],
                "realWorldExample": "Summing up sales grids of two store branches where rows represent items and columns represent days.",
                "timeComplexity": "O(rows * cols)",
                "spaceComplexity": "O(rows * cols)",
                "whenToUse": "To add two dimensional grids element-wise.",
                "commonMistakes": [
                        "Confusing row indices and col indices, e.g. using A[i][i]",
                        "Mismatching loop bounds"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "What is the requirement for two matrices to be added?",
                        "options": [
                                "A) They must be square matrices",
                                "B) They must have the same row and column dimensions",
                                "C) Columns of first must equal rows of second",
                                "D) Any matrices can be added"
                        ],
                        "correct": 1,
                        "explanation": "Matrix addition is element-wise, so the two matrices must have identical dimensions."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "How many additions are performed during addition of two 3x3 matrices?",
                        "options": [
                                "A) 3 additions",
                                "B) 6 additions",
                                "C) 9 additions",
                                "D) 27 additions"
                        ],
                        "correct": 2,
                        "explanation": "For a 3x3 matrix, there are 3 * 3 = 9 cells, so we perform exactly 9 additions."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "What is the correct way to declare a 2x2 integer matrix in C?",
                        "options": [
                                "A) `int mat[2, 2];`",
                                "B) `int mat[2][2];`",
                                "C) `matrix mat(2, 2);`",
                                "D) `int mat[4];`"
                        ],
                        "correct": 1,
                        "explanation": "C represents 2D arrays using brackets for each dimension: `int mat[rows][cols];`."
                },
                {
                        "id": 4,
                        "difficulty": "medium",
                        "question": "What is the time complexity of adding two matrices of size R x C?",
                        "options": [
                                "A) O(R)",
                                "B) O(C)",
                                "C) O(R * C)",
                                "D) O(R^2)"
                        ],
                        "correct": 2,
                        "explanation": "We visit R * C total locations using nested loops, which takes O(R * C) time."
                },
                {
                        "id": 5,
                        "difficulty": "hard",
                        "question": "What is the result cell C[0][1] if A = {{1, 2}, {3, 4}} and B = {{5, 6}, {7, 8}}?",
                        "options": [
                                "A) 6",
                                "B) 8",
                                "C) 10",
                                "D) 12"
                        ],
                        "correct": 1,
                        "explanation": "C[0][1] = A[0][1] + B[0][1] = 2 + 6 = 8."
                }
        ],
        "logicHints": {
                "approach": "Use nested loops to iterate rows and columns, adding elements.",
                "keySteps": [
                        "Loop i from 0 to 1 (rows)",
                        "Loop j from 0 to 1 (columns)",
                        "Set C[i][j] = A[i][j] + B[i][j]"
                ],
                "pseudocode": "FOR i = 0 TO 1:\n  FOR j = 0 TO 1:\n    C[i][j] = A[i][j] + B[i][j]"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int A[2][2] = {{1, 2}, {3, 4}};\n    int B[2][2] = {{5, 6}, {7, 8}};\n    int C[2][2];\n    \n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            C[i][j] = A[i][j] + B[i][j];\n        }\n    }\n    printf(\"Sum Matrix:\\n\");\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            printf(\"%d \", C[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
},
    "matrix-subtraction": {
        "id": "matrix-subtraction",
        "title": "Matrix Subtraction",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "🕸️",
        "estimatedTime": "8 min",
        "concept": {
                "summary": "Subtract corresponding elements of two 2D matrices.",
                "whatIsIt": "Element-wise matrix subtraction. The cell value at row `i`, col `j` of matrix B is subtracted from the corresponding cell of matrix A.",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Outer loop rows",
                                "description": "Loop row index i from 0 to rows - 1."
                        },
                        {
                                "step": 2,
                                "title": "Inner loop cols",
                                "description": "Loop col index j from 0 to cols - 1."
                        },
                        {
                                "step": 3,
                                "title": "Subtract cells",
                                "description": "Set C[i][j] = A[i][j] - B[i][j]."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "Matrix Subtraction",
                                "definition": "Calculating difference values cell by cell on parallel grid coordinates."
                        }
                ],
                "realWorldExample": "Calculating changes in inventory layouts between two consecutive months.",
                "timeComplexity": "O(rows * cols)",
                "spaceComplexity": "O(rows * cols)",
                "whenToUse": "To find differences in parallel matrices of identical sizes.",
                "commonMistakes": [
                        "Mismatched loops resulting in out of bounds indexing",
                        "Subtracting B from A when A - B was expected"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "What is the cell result C[1][0] if A = {{5, 6}, {7, 8}} and B = {{1, 2}, {3, 4}} (A - B)?",
                        "options": [
                                "A) 4",
                                "B) 2",
                                "C) 3",
                                "D) 7"
                        ],
                        "correct": 0,
                        "explanation": "C[1][0] = A[1][0] - B[1][0] = 7 - 3 = 4."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "What is the space complexity of matrix subtraction of size R x C?",
                        "options": [
                                "A) O(1) if in-place",
                                "B) O(R * C) if writing to new matrix",
                                "C) Both A and B are correct",
                                "D) O(R + C)"
                        ],
                        "correct": 2,
                        "explanation": "If the result is written in-place, the auxiliary space is O(1). If written to a new matrix, it is O(R * C)."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "Do dimensions need to match for matrix subtraction?",
                        "options": [
                                "A) No, columns are added with padding",
                                "B) Yes, row and column counts must be exactly equal",
                                "C) Only row counts need to match",
                                "D) Only column counts need to match"
                        ],
                        "correct": 1,
                        "explanation": "Subtraction is cell-by-cell, meaning dimensions must align exactly."
                },
                {
                        "id": 4,
                        "difficulty": "hard",
                        "question": "What occurs if you write nested loops for subtraction as `C[j][i] = A[j][i] - B[j][i]` where outer loop is `i` and inner is `j`?",
                        "options": [
                                "A) Compilation fails",
                                "B) Reverses column-major access, slower cache hit rate, but correct results",
                                "C) Results are transposed",
                                "D) Division by zero"
                        ],
                        "correct": 1,
                        "explanation": "It iterates correctly but access patterns are column-major, which violates caching locality in C's row-major memory format."
                },
                {
                        "id": 5,
                        "difficulty": "medium",
                        "question": "Which operator performs subtraction in C?",
                        "options": [
                                "A) `_`",
                                "B) `-`",
                                "C) `/`",
                                "D) `%`"
                        ],
                        "correct": 1,
                        "explanation": "The minus operator `-` is used for arithmetic subtraction in C."
                }
        ],
        "logicHints": {
                "approach": "Iterate cells using nested loops and subtract values.",
                "keySteps": [
                        "Loop i from 0 to 1",
                        "Loop j from 0 to 1",
                        "Set C[i][j] = A[i][j] - B[i][j]"
                ],
                "pseudocode": "FOR i = 0 TO 1:\n  FOR j = 0 TO 1:\n    C[i][j] = A[i][j] - B[i][j]"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int A[2][2] = {{5, 6}, {7, 8}};\n    int B[2][2] = {{1, 2}, {3, 4}};\n    int C[2][2];\n    \n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            C[i][j] = A[i][j] - B[i][j];\n        }\n    }\n    printf(\"Difference Matrix:\\n\");\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            printf(\"%d \", C[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
},
    "matrix-multiplication": {
        "id": "matrix-multiplication",
        "title": "Matrix Multiplication",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "✖️",
        "estimatedTime": "15 min",
        "concept": {
                "summary": "Multiply two matrices using row-by-column dot products.",
                "whatIsIt": "Multiplication is defined only if columns in Matrix A equal rows in Matrix B. If A is of size R1 x C1 and B is size C1 x C2, result matrix C has size R1 x C2. To calculate each cell C[i][j], accumulate the product of elements in row `i` of A and column `j` of B.",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Nested loops for cell coordinates",
                                "description": "Outer loop i through rows of A, inner loop j through columns of B."
                        },
                        {
                                "step": 2,
                                "title": "Initialize cell sum",
                                "description": "Set C[i][j] = 0 before accumulating the dot product."
                        },
                        {
                                "step": 3,
                                "title": "Third loop for product accumulation",
                                "description": "Loop k through columns of A (or rows of B) and calculate C[i][j] += A[i][k] * B[k][j]."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "Dot Product",
                                "definition": "The sum of products of corresponding entries of two sequences of numbers."
                        }
                ],
                "realWorldExample": "Calculating total revenues for multiple products: multiplying a product quantity grid by price tables.",
                "timeComplexity": "O(R1 * C1 * C2)",
                "spaceComplexity": "O(R1 * C2)",
                "whenToUse": "To perform linear transformations, coordinate rotations, or systems equations solving.",
                "commonMistakes": [
                        "Forgetting to initialize C[i][j] to 0",
                        "Multiplying matrices with incompatible dimensions"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "What is the requirement to multiply Matrix A (size R1 x C1) and Matrix B (size R2 x C2)?",
                        "options": [
                                "A) R1 must equal R2",
                                "B) C1 must equal R2",
                                "C) C1 must equal C2",
                                "D) R1 must equal C2"
                        ],
                        "correct": 1,
                        "explanation": "The number of columns in the first matrix must equal the number of rows in the second matrix."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "What are the dimensions of the product of a 3x2 matrix and a 2x4 matrix?",
                        "options": [
                                "A) 3x4",
                                "B) 2x2",
                                "C) 3x2",
                                "D) 2x4"
                        ],
                        "correct": 0,
                        "explanation": "If A is R1 x C1 and B is R2 x C2 (with C1 == R2), the product has size R1 x C2 (3 x 4)."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "How many nested loops are required to multiply two matrices of size N x N?",
                        "options": [
                                "A) One",
                                "B) Two",
                                "C) Three",
                                "D) Four"
                        ],
                        "correct": 2,
                        "explanation": "We need two loops to iterate rows and columns of the output matrix, and a third loop to calculate the dot product sum."
                },
                {
                        "id": 4,
                        "difficulty": "hard",
                        "question": "What is the time complexity of multiplying two N x N matrices?",
                        "options": [
                                "A) O(N)",
                                "B) O(N^2)",
                                "C) O(N^3)",
                                "D) O(2^N)"
                        ],
                        "correct": 2,
                        "explanation": "Because we use three nested loops running N times, the complexity is cubic: O(N^3)."
                },
                {
                        "id": 5,
                        "difficulty": "medium",
                        "question": "What is the cell C[0][0] if A = {{1, 2}, {3, 4}} and B = {{5, 6}, {7, 8}}?",
                        "options": [
                                "A) 5",
                                "B) 19",
                                "C) 22",
                                "D) 12"
                        ],
                        "correct": 1,
                        "explanation": "C[0][0] = A[0][0]*B[0][0] + A[0][1]*B[1][0] = 1*5 + 2*7 = 5 + 14 = 19."
                }
        ],
        "logicHints": {
                "approach": "Write a triple nested loop to accumulate products.",
                "keySteps": [
                        "Loop i from 0 to 1 (rows of A)",
                        "Loop j from 0 to 1 (cols of B)",
                        "Set C[i][j] = 0",
                        "Loop k from 0 to 1 (cols of A): C[i][j] += A[i][k] * B[k][j]"
                ],
                "pseudocode": "FOR i = 0 TO 1:\n  FOR j = 0 TO 1:\n    C[i][j] = 0\n    FOR k = 0 TO 1:\n      C[i][j] = C[i][j] + A[i][k] * B[k][j]"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int A[2][2] = {{1, 2}, {3, 4}};\n    int B[2][2] = {{5, 6}, {7, 8}};\n    int C[2][2];\n    \n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            C[i][j] = 0;\n            for (int k = 0; k < 2; k++) {\n                C[i][j] += A[i][k] * B[k][j];\n            }\n        }\n    }\n    printf(\"Product Matrix:\\n\");\n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 2; j++) {\n            printf(\"%d \", C[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
},
    "matrix-transpose": {
        "id": "matrix-transpose",
        "title": "Matrix Transpose",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "📐",
        "estimatedTime": "8 min",
        "concept": {
                "summary": "Flip a matrix over its diagonal, switching its row and column indices.",
                "whatIsIt": "Transposing changes rows into columns. For a matrix of size R x C, the transpose matrix has dimensions C x R, and the element at index [i][j] moves to [j][i].",
                "howItWorks": [
                        {
                                "step": 1,
                                "title": "Nested loop rows",
                                "description": "Loop row index i from 0 to rows - 1."
                        },
                        {
                                "step": 2,
                                "title": "Nested loop cols",
                                "description": "Loop col index j from 0 to cols - 1."
                        },
                        {
                                "step": 3,
                                "title": "Copy swapped coordinates",
                                "description": "Set transpose[j][i] = matrix[i][j]."
                        }
                ],
                "keyTerms": [
                        {
                                "term": "Transpose",
                                "definition": "Swapping row index and column index coordinates of all grid elements."
                        }
                ],
                "realWorldExample": "Converting spreadsheet rows to columns (for example, switching dates from columns to rows).",
                "timeComplexity": "O(rows * cols)",
                "spaceComplexity": "O(rows * cols)",
                "whenToUse": "In graphic rendering algorithms, coordinate mapping, or linear algebra equations.",
                "commonMistakes": [
                        "Using square dimensions limits in non-square matrices, leading to crashes",
                        "Trying to transpose in-place on a non-square matrix without resizing memory"
                ],
                "diagramType": null
        },
        "quiz": [
                {
                        "id": 1,
                        "difficulty": "easy",
                        "question": "If matrix A has dimensions 3x5, what are the dimensions of its transpose?",
                        "options": [
                                "A) 3x5",
                                "B) 5x3",
                                "C) 3x3",
                                "D) 5x5"
                        ],
                        "correct": 1,
                        "explanation": "Transposing swaps rows and columns, turning a 3x5 matrix into a 5x3 matrix."
                },
                {
                        "id": 2,
                        "difficulty": "medium",
                        "question": "If element A[1][3] has value 8, which index will hold this value in the transpose matrix?",
                        "options": [
                                "A) [1][3]",
                                "B) [3][1]",
                                "C) [0][3]",
                                "D) [3][3]"
                        ],
                        "correct": 1,
                        "explanation": "The element at [row][col] is placed at [col][row] in the transpose. So [1][3] goes to [3][1]."
                },
                {
                        "id": 3,
                        "difficulty": "easy",
                        "question": "What is the transpose of a symmetric matrix?",
                        "options": [
                                "A) The negative of the matrix",
                                "B) The exact same matrix",
                                "C) An identity matrix",
                                "D) A column vector"
                        ],
                        "correct": 1,
                        "explanation": "A symmetric matrix is equal to its transpose by definition (A == A^T)."
                },
                {
                        "id": 4,
                        "difficulty": "hard",
                        "question": "What is the time complexity of transposing a matrix of size R x C?",
                        "options": [
                                "A) O(1)",
                                "B) O(R)",
                                "C) O(R * C)",
                                "D) O((R * C)^2)"
                        ],
                        "correct": 2,
                        "explanation": "Every element of the grid must be copied to its transposed location, requiring linear time O(R * C)."
                },
                {
                        "id": 5,
                        "difficulty": "medium",
                        "question": "To perform an in-place transpose of a square matrix, how do you adjust the column loop?",
                        "options": [
                                "A) j from 0 to rows-1",
                                "B) j from i+1 to rows-1",
                                "C) j from 0 to i",
                                "D) j from rows-1 down to 0"
                        ],
                        "correct": 1,
                        "explanation": "To transpose in-place, we swap elements on one side of the diagonal (j from i+1 to N-1). Swapping both sides swaps elements back to their original spots."
                }
        ],
        "logicHints": {
                "approach": "Iterate cells and map value at [i][j] to output [j][i].",
                "keySteps": [
                        "Loop i from 0 to 1 (rows)",
                        "Loop j from 0 to 2 (columns)",
                        "Set T[j][i] = A[i][j]"
                ],
                "pseudocode": "FOR i = 0 TO 1:\n  FOR j = 0 TO 2:\n    T[j][i] = A[i][j]"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int A[2][3] = {\n        {1, 2, 3},\n        {4, 5, 6}\n    };\n    int T[3][2];\n    \n    for (int i = 0; i < 2; i++) {\n        for (int j = 0; j < 3; j++) {\n            T[j][i] = A[i][j];\n        }\n    }\n    printf(\"Transposed Matrix:\\n\");\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 2; j++) {\n            printf(\"%d \", T[i][j]);\n        }\n        printf(\"\\n\");\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
},
"strings-operations": {
        "id": "strings-operations",
        "title": "String Operations",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "🔠",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "Strings in C are character arrays terminated by a null character (\\0). String operations use the standard string.h library.",
            "whatIsIt": "Unlike languages with a native \"String\" class, C represents strings as char arrays. The compiler automatically adds a null character `\\0` to mark the end of the string. So the word \"C\" takes 2 bytes: 'C' and '\\0'.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Declare string",
                    "description": "char str[] = \"Hello\"; — size is automatically 6 (5 letters + \\0)."
                },
                {
                    "step": 2,
                    "title": "String functions",
                    "description": "strlen(str) gets length (excluding \\0). strcpy(dest, src) copies. strcat(dest, src) concatenates. strcmp(s1, s2) compares."
                }
            ],
            "keyTerms": [
                {
                    "term": "Null Character (\\0)",
                    "definition": "ASCII value 0. Crucial because it marks the end of a string in memory."
                },
                {
                    "term": "Buffer Overflow",
                    "definition": "Writing more characters to a string than its allocated array size, corrupting memory."
                }
            ],
            "realWorldExample": "A train. The cabins are characters, and the last cabin has a sign saying \"END OF TRAIN\" (\\0).",
            "timeComplexity": "O(n) for length/copy",
            "spaceComplexity": "O(n)",
            "whenToUse": "Working with text, names, commands, and console outputs.",
            "commonMistakes": [
                "Forgetting the null character when declaring character-by-character: char str[3] = {'a', 'b'}; (no \\0)",
                "Using == to compare strings in C — strcmp(s1, s2) == 0 must be used instead"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is the special character used to terminate a string in C?",
                "options": [
                    "A) \\n",
                    "B) \\t",
                    "C) \\0",
                    "D) \\s"
                ],
                "correct": 2,
                "explanation": "\\0 is the null character. It tells functions like printf where the string ends in memory."
            },
            {
                "id": 2,
                "difficulty": "medium",
                "question": "How do you compare if two strings s1 and s2 are equal in C?",
                "options": [
                    "A) if(s1 == s2)",
                    "B) if(strcmp(s1, s2) == 0)",
                    "C) if(s1.equals(s2))",
                    "D) if(strcmp(s1, s2) == 1)"
                ],
                "correct": 1,
                "explanation": "strcmp returns 0 if two strings are identical. Using == compares their memory addresses, which is almost always false."
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": "What happens when you assign a string literal to a char array in C, like 'char str[] = 'hello';'?",
                "options": [
                    "A) The compiler throws an error because of the single quotes.",
                    "B) The compiler automatically adds a null character '\\0' to the end of the string.",
                    "C) The string is stored in a special string register.",
                    "D) The string is not null-terminated."
                ],
                "correct": 1,
                "explanation": "The compiler automatically adds a null character '\\0' to mark the end of the string, so 'hello' takes 6 bytes: 'h', 'e', 'l', 'l', 'o', and '\\0'."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "What is the purpose of the strlen() function in C?",
                "options": [
                    "A) To compare two strings for equality.",
                    "B) To copy the contents of one string to another.",
                    "C) To get the length of a string, excluding the null character.",
                    "D) To concatenate two strings together."
                ],
                "correct": 2,
                "explanation": "The strlen() function returns the number of characters in a string, excluding the null character '\\0'. It is often used to determine the length of a string before performing operations on it."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "Suppose you have a string 'char str[10] = 'hello';' and you want to append ', world!' to it. What would be the correct way to do this, considering the buffer size of 'str'?",
                "options": [
                    "A) Use strcat(str, ', world!'); without checking the buffer size.",
                    "B) Use strncpy(str + 5, ', world!', 5); to avoid buffer overflow.",
                    "C) Check the remaining buffer size and use strncat(str, ', world!', 5); to append the string safely.",
                    "D) Use memcpy to copy the new string over the old one."
                ],
                "correct": 2,
                "explanation": "To avoid a buffer overflow, you should check the remaining buffer size and use strncat() to append the string safely. The correct way would be to calculate the remaining space and use strncat(str, ', world!', 5); to append the string, ensuring that the null character '\\0' is preserved."
            }
        ],
        "logicHints": {
            "approach": "Demonstrate strlen, strcpy, and strcmp on sample strings.",
            "keySteps": [
                "Step 1: Include <string.h>",
                "Step 2: Compare two strings using strcmp",
                "Step 3: Print their lengths using strlen"
            ],
            "pseudocode": "INCLUDE string library\nDECLARE s1 = \"Apple\", s2 = \"Banana\"\nPRINT strlen(s1)\nIF strcmp(s1, s2) == 0: PRINT \"Equal\"\nELSE: PRINT \"Not equal\""
        },
        "referenceSolution": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[] = \"Hello\";\n    char s2[20];\n    \n    /* Copy s1 to s2 */\n    strcpy(s2, s1);\n    printf(\"s2: %s\\n\", s2);\n    \n    /* Length of string */\n    printf(\"Length of s1: %lu\\n\", (unsigned long)strlen(s1));\n    \n    /* Compare strings */\n    if (strcmp(s1, s2) == 0) {\n        printf(\"Strings are equal\\n\");\n    } else {\n        printf(\"Strings are not equal\\n\");\n    }\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "strings-vowel-count": {
        "id": "strings-vowel-count",
        "title": "Vowel Counting",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "🗣️",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Iterate through a string character by character to count the number of vowels (a, e, i, o, u).",
            "whatIsIt": "To find vowels in a string, you look at each character from the beginning. If the character matches a vowel (case-insensitively), you increment a counter. You stop when you hit the null character `\\0`.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Loop through string",
                    "description": "Use while (str[i] != '\\0') or for loop up to strlen."
                },
                {
                    "step": 2,
                    "title": "Check character",
                    "description": "Check if character is a, e, i, o, u or their uppercase versions."
                },
                {
                    "step": 3,
                    "title": "Increment",
                    "description": "If yes, add 1 to a counter."
                }
            ],
            "keyTerms": [
                {
                    "term": "Vowel",
                    "definition": "The characters A, E, I, O, U (case-insensitive)."
                }
            ],
            "realWorldExample": "A spelling checker or text analyzer scanning a document to extract letter distribution metrics.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Basic character manipulation exercises and text parsing applications.",
            "commonMistakes": [
                "Checking only lowercase vowels and missing uppercase vowels",
                "Not checking for the null terminator, leading to reading past string boundary"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Which loop condition correctly iterates through a string str without using strlen?",
                "options": [
                    "A) for(int i=0; i<100; i++)",
                    "B) while(str[i] != '\\0')",
                    "C) while(str[i] != '\\n')",
                    "D) while(str != NULL)"
                ],
                "correct": 1,
                "explanation": "Strings in C terminate with \\0. Reading until str[i] == \\0 is the standard way to iterate through a string."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the purpose of checking for the null character '\\0' when iterating through a string in C?",
                "options": [
                    "A) To check for the end of a line",
                    "B) To check for the end of the string",
                    "C) To check for a space character",
                    "D) To check for a tab character"
                ],
                "correct": 1,
                "explanation": "In C, strings are null-terminated, meaning they end with the null character '\\0'. Checking for this character is necessary to know when to stop iterating through the string."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How would you modify the condition in the following loop to make it case-insensitive when checking for vowels: 'if(str[i] == 'a' || str[i] == 'e' || str[i] == 'i' || str[i] == 'o' || str[i] == 'u')'",
                "options": [
                    "A) Add the 'or' operator to include uppercase vowels",
                    "B) Use the 'tolower()' function from 'ctype.h' to convert the character to lowercase",
                    "C) Use the 'toupper()' function from 'ctype.h' to convert the character to uppercase",
                    "D) Use a 'switch' statement to check for both lowercase and uppercase vowels"
                ],
                "correct": 1,
                "explanation": "Using the 'tolower()' function from 'ctype.h' converts the character to lowercase, allowing for a case-insensitive comparison with the lowercase vowels."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What is the most efficient way to count both lowercase and uppercase vowels in a string without using 'if' or 'switch' statements?",
                "options": [
                    "A) Use a loop to iterate through an array of vowels and check for each one",
                    "B) Use the 'strchr()' function to find each vowel in the string",
                    "C) Use a bitwise operation to check for vowel characters",
                    "D) Use a lookup table to map characters to their corresponding vowel status"
                ],
                "correct": 3,
                "explanation": "A bitwise operation can be used to efficiently check for vowel characters by creating a bitmask of vowel characters and using it to check each character in the string."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the purpose of incrementing a counter variable when a vowel is found in a string?",
                "options": [
                    "A) To keep track of the number of consonants in the string",
                    "B) To keep track of the number of vowels in the string",
                    "C) To keep track of the length of the string",
                    "D) To keep track of the number of spaces in the string"
                ],
                "correct": 1,
                "explanation": "Incrementing a counter variable when a vowel is found allows you to keep track of the total number of vowels in the string."
            }
        ],
        "logicHints": {
            "approach": "Create a loop that visits each character. Test if it matches a, e, i, o, u (both lower and upper). Increment count.",
            "keySteps": [
                "Step 1: Set count = 0, i = 0",
                "Step 2: While str[i] != \\0, inspect str[i]",
                "Step 3: If str[i] matches any vowel, count++",
                "Step 4: Increment i, repeat"
            ],
            "pseudocode": "SET count = 0, i = 0\nWHILE str[i] != '\\0':\n  IF str[i] is vowel: count++\n  i++\nPRINT count"
        },
        "referenceSolution": "#include <stdio.h>\n\nint countVowels(char str[]) {\n    int count = 0;\n    int i = 0;\n    while (str[i] != '\\0') {\n        char ch = str[i];\n        if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u' ||\n            ch == 'A' || ch == 'E' || ch == 'I' || ch == 'O' || ch == 'U') {\n            count++;\n        }\n        i++;\n    }\n    return count;\n}\n\nint main() {\n    char str[] = \"Learn C Programming\";\n    printf(\"Vowels count: %d\\n\", countVowels(str));\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "pointers-basics": {
        "id": "pointers-basics",
        "title": "Pointer Basics",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "👉",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "Pointers are variables that store the memory address of another variable.",
            "whatIsIt": "Every variable is stored in a specific box in your computer's memory, and every box has a number (address). A pointer is a variable that stores that box's address, rather than the value inside. It allows you to read/edit variables indirectly.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Declare pointer",
                    "description": "int *ptr; — the asterisk * says ptr is a pointer to an int."
                },
                {
                    "step": 2,
                    "title": "Get address",
                    "description": "ptr = &x; — the ampersand & returns the address of x."
                },
                {
                    "step": 3,
                    "title": "Dereference",
                    "description": "*ptr retrieves or edits the value at ptr's address."
                }
            ],
            "keyTerms": [
                {
                    "term": "Pointer",
                    "definition": "A variable holding a memory address."
                },
                {
                    "term": "& (Address-of)",
                    "definition": "Operator that returns the memory address of a variable."
                },
                {
                    "term": "* (Dereference)",
                    "definition": "Operator that accesses the value stored at the address pointed to."
                }
            ],
            "realWorldExample": "A URL link (pointer) pointing to a web page (variable value). The link itself is just text (an address), but clicking it (dereferencing) takes you to the actual web page content.",
            "timeComplexity": "O(1)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Dynamic memory allocation, passing arguments by reference (to modify them in functions), building nodes for data structures.",
            "commonMistakes": [
                "Dereferencing an uninitialized pointer (wild pointer), causing crashes (segmentation fault)",
                "Confusing *ptr (value at address) with ptr (the address itself)"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What operator is used to get the memory address of a variable?",
                "options": [
                    "A) *",
                    "B) &",
                    "C) &&",
                    "D) ptr"
                ],
                "correct": 1,
                "explanation": "& is the address-of operator. It retrieves the memory address of its operand."
            },
            {
                "id": 2,
                "difficulty": "medium",
                "question": "What is printing if: int x = 10; int *p = &x; printf(\"%d\", *p);",
                "options": [
                    "A) Memory address of x",
                    "B) 10",
                    "C) Garbage value",
                    "D) Compile error"
                ],
                "correct": 1,
                "explanation": "*p dereferences the pointer, returning the value at the address p points to (which is x, so it prints 10)."
            },
            {
                "id": 3,
                "difficulty": "easy",
                "question": "What is the main purpose of a pointer in C?",
                "options": [
                    "A) To store a value directly",
                    "B) To store the memory address of a variable",
                    "C) To perform arithmetic operations",
                    "D) To control the program flow"
                ],
                "correct": 1,
                "explanation": "A pointer is a variable that stores the memory address of another variable, allowing indirect access to the variable's value."
            },
            {
                "id": 4,
                "difficulty": "medium",
                "question": "Given the code: int x = 20; int *p = &x; *p = 30; What is the value of x after execution?",
                "options": [
                    "A) 20",
                    "B) 30",
                    "C) Garbage value",
                    "D) Compile error"
                ],
                "correct": 1,
                "explanation": "*p = 30 assigns the value 30 to the variable x, because p points to x. So, the value of x becomes 30."
            },
            {
                "id": 5,
                "difficulty": "hard",
                "question": "What will happen if you try to dereference a null pointer in C, like this: int *p = NULL; printf('%d', *p);",
                "options": [
                    "A) It will print a garbage value",
                    "B) It will print 0",
                    "C) It will cause a runtime error or segmentation fault",
                    "D) It will compile but do nothing"
                ],
                "correct": 2,
                "explanation": "Dereferencing a null pointer is undefined behavior and typically results in a runtime error or segmentation fault, because you're trying to access memory at address 0, which is not a valid memory location."
            }
        ],
        "logicHints": {
            "approach": "Declare an int, get its address using &, store in pointer, modify using *ptr, print value.",
            "keySteps": [
                "Step 1: Declare `int x = 5` and pointer `int *p = &x`",
                "Step 2: Print address `p` and value `*p`",
                "Step 3: Modify `*p = 10`",
                "Step 4: Check if `x` changed to 10"
            ],
            "pseudocode": "DECLARE x = 5\nDECLARE p = address of x\nPRINT address p and value *p\nSET *p = 10\nPRINT x (should be 10)"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    int *p = &x; /* p holds address of x */\n    \n    printf(\"x = %d\\n\", x);\n    printf(\"Address of x = %p\\n\", (void*)&x);\n    printf(\"p holds address = %p\\n\", (void*)p);\n    printf(\"Value p points to = %d\\n\", *p);\n    \n    /* Modify x through pointer */\n    *p = 10;\n    printf(\"x after modification = %d\\n\", x);\n    \n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "factorial-iterative": {
        "id": "factorial-iterative",
        "title": "Factorial (Iterative)",
        "category": "Modular & Memory",
        "level": "intermediate",
        "levelNum": 3,
        "icon": "🔄",
        "estimatedTime": "5 min",
        "concept": {
            "summary": "Compute the factorial of a number using a loop.",
            "whatIsIt": "n! = 1 * 2 * 3 * ... * n. For example, 4! = 1 * 2 * 3 * 4 = 24.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Initialize fact = 1",
                    "description": "Must start at 1, not 0."
                },
                {
                    "step": 2,
                    "title": "Loop and multiply",
                    "description": "Loop i from 1 to n, multiply fact by i."
                }
            ],
            "keyTerms": [
                {
                    "term": "Iterative Factorial",
                    "definition": "Multiplying sequential integers using a loop."
                }
            ],
            "realWorldExample": "Calculating the number of ways to arrange objects in a line.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "General factorial calculations (more efficient than recursion).",
            "commonMistakes": [
                "Initializing factorial variable to 0 (multiplication by 0 always results in 0)."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is 0! (factorial of 0)?",
                "options": [
                    "A) 0",
                    "B) 1",
                    "C) Undefined",
                    "D) -1"
                ],
                "correct": 1,
                "explanation": "By mathematical definition, the factorial of 0 is 1."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the value of 1! (factorial of 1)?",
                "options": [
                    "A) 0",
                    "B) 1",
                    "C) 2",
                    "D) 3"
                ],
                "correct": 1,
                "explanation": "By definition, the factorial of 1 is 1, since there is only one number to multiply."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Write an iterative C function to calculate the factorial of a given number 'n'. What should be the initial value of the 'result' variable?",
                "options": [
                    "A) 0",
                    "B) 1",
                    "C) n",
                    "D) -1"
                ],
                "correct": 1,
                "explanation": "The initial value of the 'result' variable should be 1, because the factorial of any number is the product of all positive integers less than or equal to that number, and the multiplicative identity is 1."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider the following C code snippet: 'int factorial(int n) { int result = 1; for (int i = 1; i <= n; i++) { result *= i; } return result; }'. What will be the output of 'factorial(5)'?",
                "options": [
                    "A) 120",
                    "B) 24",
                    "C) 30",
                    "D) 25"
                ],
                "correct": 0,
                "explanation": "The output will be 120, since 5! = 5 * 4 * 3 * 2 * 1 = 120."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What will happen if we try to calculate the factorial of a negative number using an iterative C function?",
                "options": [
                    "A) The function will return the correct result",
                    "B) The function will return 0",
                    "C) The function will enter an infinite loop",
                    "D) The function will not compile"
                ],
                "correct": 2,
                "explanation": "The function will enter an infinite loop, because the loop condition will never be met, since 'i' will never be greater than a negative 'n'."
            }
        ],
        "logicHints": {
            "approach": "Start fact = 1. Loop i from 1 to n, set fact = fact * i.",
            "keySteps": [
                "fact = 1",
                "FOR i = 1 to n: fact = fact * i"
            ],
            "pseudocode": "fact = 1\nFOR i = 1 TO n:\n  fact = fact * i\nRETURN fact"
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    long long fact = 1;\n    for (int i = 1; i <= n; i++) {\n        fact *= i;\n    }\n    printf(\"Factorial of %d is %lld\\n\", n, fact);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "recursion-fibonacci": {
        "id": "recursion-fibonacci",
        "title": "Recursion (Fibonacci)",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "🌿",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "Compute Fibonacci numbers recursively. F(n) = F(n-1) + F(n-2) with base cases F(0)=0 and F(1)=1.",
            "whatIsIt": "The Fibonacci sequence is 0, 1, 1, 2, 3, 5, 8, 13... where each number is the sum of the previous two. A recursive function calculates this by calling itself twice.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Base cases",
                    "description": "If n is 0 return 0. If n is 1 return 1."
                },
                {
                    "step": 2,
                    "title": "Recursive step",
                    "description": "Return fib(n-1) + fib(n-2)."
                }
            ],
            "keyTerms": [
                {
                    "term": "Fibonacci Sequence",
                    "definition": "A sequence where F(n) = F(n-1) + F(n-2)."
                }
            ],
            "realWorldExample": "Branching patterns in plants, petals on flowers, and spiral shells follow Fibonacci numbers.",
            "timeComplexity": "O(2^n)",
            "spaceComplexity": "O(n)",
            "whenToUse": "Excellent for teaching double recursion, though iterative or dynamic programming approaches are much faster for large values.",
            "commonMistakes": [
                "Calculating high values of n, which causes the program to hang due to exponential O(2^n) time complexity"
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the time complexity of the standard recursive Fibonacci algorithm?",
                "options": [
                    "A) O(n)",
                    "B) O(log n)",
                    "C) O(2^n)",
                    "D) O(n²)"
                ],
                "correct": 2,
                "explanation": "Each call branches into two more calls, leading to a binary tree of calls of height n, which takes exponential O(2^n) time."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the base case for the recursive Fibonacci function?",
                "options": [
                    "A) fib(0) = 0 and fib(1) = 0",
                    "B) fib(0) = 0 and fib(1) = 1",
                    "C) fib(0) = 1 and fib(1) = 0",
                    "D) fib(0) = 1 and fib(1) = 1"
                ],
                "correct": 1,
                "explanation": "The base case for the recursive Fibonacci function is when n is 0 or 1, where fib(0) = 0 and fib(1) = 1."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the main issue with the standard recursive Fibonacci algorithm?",
                "options": [
                    "A) It uses too much memory",
                    "B) It does too many repeated calculations",
                    "C) It is not suitable for large inputs",
                    "D) It is not efficient for small inputs"
                ],
                "correct": 1,
                "explanation": "The main issue with the standard recursive Fibonacci algorithm is that it does too many repeated calculations, which leads to exponential time complexity."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "How can memoization be used to optimize the recursive Fibonacci function?",
                "options": [
                    "A) By storing the results of previous calculations in an array",
                    "B) By using a recursive data structure to store the results",
                    "C) By using dynamic programming to calculate the results",
                    "D) By using a loop instead of recursion"
                ],
                "correct": 0,
                "explanation": "Memoization can be used to optimize the recursive Fibonacci function by storing the results of previous calculations in an array, so that if the function is called again with the same input, the result can be returned directly from the array instead of being recalculated."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the purpose of the recursive calls in the Fibonacci function?",
                "options": [
                    "A) To calculate the sum of the previous two numbers",
                    "B) To calculate the product of the previous two numbers",
                    "C) To calculate the Fibonacci number at the current position",
                    "D) To calculate the Fibonacci number at the previous position"
                ],
                "correct": 0,
                "explanation": "The purpose of the recursive calls in the Fibonacci function is to calculate the sum of the previous two numbers, which is the definition of the Fibonacci sequence."
            }
        ],
        "logicHints": {
            "approach": "Create a recursive function with base cases for n=0 and n=1, returning their respective values. Else return the sum of recursive calls for n-1 and n-2.",
            "keySteps": [
                "Step 1: Check n == 0 -> return 0",
                "Step 2: Check n == 1 -> return 1",
                "Step 3: Else return fib(n-1) + fib(n-2)"
            ],
            "pseudocode": "FUNCTION fib(n):\n  IF n == 0: RETURN 0\n  IF n == 1: RETURN 1\n  RETURN fib(n-1) + fib(n-2)"
        },
        "referenceSolution": "#include <stdio.h>\n\nint fib(int n) {\n    if (n == 0) return 0;\n    if (n == 1) return 1;\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    int n = 6;\n    printf(\"Fibonacci number at position %d is %d\\n\", n, fib(n));\n    return 9;\n}\n",
        "flowDiagramType": null
    },
    "factorial-recursive": {
        "id": "factorial-recursive",
        "title": "Factorial (Recursive)",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "🔁",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Compute the factorial of a number recursively.",
            "whatIsIt": "A recursive definition: fact(n) = n * fact(n-1) with base case fact(0) = 1.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Base case",
                    "description": "if n == 0 return 1"
                },
                {
                    "step": 2,
                    "title": "Recursive call",
                    "description": "return n * fact(n-1)"
                }
            ],
            "keyTerms": [
                {
                    "term": "Base Case",
                    "definition": "Stopping condition."
                }
            ],
            "realWorldExample": "Permutations calculations.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(n)",
            "whenToUse": "To demonstrate stack-based recursion.",
            "commonMistakes": [
                "Missing base case, causing stack overflow."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Which is the base case for recursive factorial?",
                "options": [
                    "A) if (n == 0) return 0;",
                    "B) if (n == 0) return 1;",
                    "C) if (n == 1) return 0;",
                    "D) None"
                ],
                "correct": 1,
                "explanation": "For factorial, 0! = 1, so the base case is if (n == 0) return 1;."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the recursive formula for calculating the factorial of a number 'n'?",
                "options": [
                    "A) fact(n) = n * fact(n+1)",
                    "B) fact(n) = n * fact(n-1)",
                    "C) fact(n) = n / fact(n-1)",
                    "D) fact(n) = n + fact(n-1)"
                ],
                "correct": 1,
                "explanation": "The recursive formula for factorial is fact(n) = n * fact(n-1), where fact(0) = 1 is the base case."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What will be the output of the following C code: int fact(int n) { if (n == 0) return 1; return n * fact(n-1); } fact(4);",
                "options": [
                    "A) 12",
                    "B) 24",
                    "C) 20",
                    "D) 16"
                ],
                "correct": 1,
                "explanation": "The output will be 24 because fact(4) = 4 * fact(3) = 4 * 3 * fact(2) = 4 * 3 * 2 * fact(1) = 4 * 3 * 2 * 1 * fact(0) = 4 * 3 * 2 * 1 * 1 = 24."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider the recursive function to calculate the factorial of a number: int fact(int n) { if (n < 0) return -1; if (n == 0 || n == 1) return 1; return n * fact(n-1); }. What will happen if we call fact(-5)?",
                "options": [
                    "A) It will return -1",
                    "B) It will return 0",
                    "C) It will cause a stack overflow",
                    "D) It will return the factorial of 5"
                ],
                "correct": 0,
                "explanation": "The function is designed to return -1 for any negative input, so fact(-5) will return -1."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the main disadvantage of using recursion to calculate the factorial of a large number?",
                "options": [
                    "A) It is less efficient than iteration",
                    "B) It uses more memory due to the system call stack",
                    "C) It is harder to understand and implement",
                    "D) All of the above"
                ],
                "correct": 3,
                "explanation": "All of the above are correct: recursion can be less efficient than iteration, it uses more memory due to the system call stack, and it can be harder to understand and implement, especially for large inputs."
            }
        ],
        "logicHints": {
            "approach": "Create a recursive function. If n is 0, return 1. Otherwise, return n * factorial(n-1).",
            "keySteps": [
                "if n == 0 -> return 1",
                "else return n * factorial(n-1)"
            ],
            "pseudocode": "FUNCTION fact(n):\n  IF n == 0: RETURN 1\n  RETURN n * fact(n - 1)"
        },
        "referenceSolution": "#include <stdio.h>\n\nlong long factorial(int n) {\n    if (n == 0) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf(\"Factorial of 5 is %lld\\n\", factorial(5));\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "towers-of-hanoi": {
        "id": "towers-of-hanoi",
        "title": "Towers of Hanoi",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "🗼",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "A classic mathematical puzzle solved recursively. Move n disks from source peg to destination peg using an auxiliary peg.",
            "whatIsIt": "Move disks one by one. A larger disk can never lie on top of a smaller disk. Move n-1 disks to aux peg, move the nth disk to destination, then move n-1 disks from aux to destination.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Base case",
                    "description": "If n == 1, move disk directly."
                },
                {
                    "step": 2,
                    "title": "Recursive calls",
                    "description": "Hanoi(n-1, source, aux, dest); move remaining disk; Hanoi(n-1, aux, dest, source);"
                }
            ],
            "keyTerms": [
                {
                    "term": "Hanoi Pegs",
                    "definition": "Source, Auxiliary, and Destination poles."
                }
            ],
            "realWorldExample": "Recursion explanation standard, CPU stack execution models.",
            "timeComplexity": "O(2^n)",
            "spaceComplexity": "O(n)",
            "whenToUse": "Excellent for showing recursive call trees and divide-and-conquer strategy.",
            "commonMistakes": [
                "Wrong peg parameter ordering in recursive calls."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "hard",
                "question": "How many moves are required to solve Towers of Hanoi for 3 disks?",
                "options": [
                    "A) 3",
                    "B) 7",
                    "C) 8",
                    "D) 15"
                ],
                "correct": 1,
                "explanation": "Moves = 2^n - 1. For n=3: 2³ - 1 = 7 moves."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the basic rule for moving disks in the Towers of Hanoi problem?",
                "options": [
                    "A) A larger disk can lie on top of a smaller disk",
                    "B) A smaller disk can never lie on top of a larger disk",
                    "C) Disks can be moved in any order",
                    "D) Only one disk can be moved at a time"
                ],
                "correct": 1,
                "explanation": "The basic rule is that a larger disk can never lie on top of a smaller disk, so option B is correct."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "In the Towers of Hanoi problem, what is the purpose of the auxiliary peg?",
                "options": [
                    "A) To store the disks temporarily while moving them from the source to the destination",
                    "B) To hold the largest disk",
                    "C) To hold the smallest disk",
                    "D) To count the number of moves"
                ],
                "correct": 0,
                "explanation": "The auxiliary peg is used to store the disks temporarily while moving them from the source to the destination peg."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Write a recursive function in C to solve the Towers of Hanoi problem for n disks. What is the base case for the recursion?",
                "options": [
                    "A) When there are no more disks to move",
                    "B) When there is only one disk to move",
                    "C) When there are two disks to move",
                    "D) When there are n-1 disks to move"
                ],
                "correct": 1,
                "explanation": "The base case for the recursion is when there is only one disk to move, in which case it can be moved directly from the source to the destination peg."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "How many moves are required to solve the Towers of Hanoi problem for 4 disks?",
                "options": [
                    "A) 7",
                    "B) 15",
                    "C) 23",
                    "D) 31"
                ],
                "correct": 1,
                "explanation": "The number of moves required is given by the formula 2^n - 1, where n is the number of disks. For n=4, the number of moves is 2^4 - 1 = 15."
            }
        ],
        "logicHints": {
            "approach": "Write recursive function with source, destination, aux peg parameters.",
            "keySteps": [
                "If n == 1, print move source -> destination",
                "Call hanoi(n-1, source, aux, dest)",
                "Print move source -> destination",
                "Call hanoi(n-1, aux, dest, source)"
            ],
            "pseudocode": "FUNCTION hanoi(n, source, dest, aux):\n  IF n == 1: PRINT move source to dest\n  ELSE:\n    hanoi(n-1, source, aux, dest)\n    PRINT move source to dest\n    hanoi(n-1, aux, dest, source)"
        },
        "referenceSolution": "#include <stdio.h>\n\nvoid hanoi(int n, char from, char to, char aux) {\n    if (n == 1) {\n        printf(\"Move disk 1 from %c to %c\\n\", from, to);\n        return;\n    }\n    hanoi(n - 1, from, aux, to);\n    printf(\"Move disk %d from %c to %c\\n\", n, from, to);\n    hanoi(n - 1, aux, to, from);\n}\n\nint main() {\n    hanoi(3, 'A', 'C', 'B');\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "search-linear": {
        "id": "search-linear",
        "title": "Linear Search",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "🔍",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Scan all elements sequentially to find the target.",
            "whatIsIt": "Simplest searching method checking index by index.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Sequential search",
                    "description": "if arr[i] == target return i."
                }
            ],
            "keyTerms": [
                {
                    "term": "Linear Search",
                    "definition": "Sequential lookup."
                }
            ],
            "realWorldExample": "Searching for a name on a page.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Unsorted arrays.",
            "commonMistakes": [
                "Exiting loop early."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is linear search complexity?",
                "options": [
                    "A) O(1)",
                    "B) O(n)",
                    "C) O(log n)",
                    "D) O(n²)"
                ],
                "correct": 1,
                "explanation": "Checks n elements in worst case."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary operation performed in a linear search algorithm?",
                "options": [
                    "A) Comparing each element with the target",
                    "B) Swapping adjacent elements",
                    "C) Inserting new elements",
                    "D) Deleting existing elements"
                ],
                "correct": 0,
                "explanation": "Linear search checks each element one by one to find the target."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider the following C code snippet: 'for (i = 0; i < n; i++) { if (arr[i] == target) return i; }'. What is the purpose of this code?",
                "options": [
                    "A) To sort the array in ascending order",
                    "B) To find the maximum element in the array",
                    "C) To perform a linear search on the array",
                    "D) To reverse the array"
                ],
                "correct": 2,
                "explanation": "This code iterates through the array and checks each element to find the target, which is the definition of linear search."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Suppose we have an array of integers and we want to find the first occurrence of a target value using linear search. If the target value is not found, what should the function return?",
                "options": [
                    "A) The index of the last element in the array",
                    "B) A special value like -1 to indicate not found",
                    "C) The index of the first element in the array",
                    "D) The value of the last element in the array"
                ],
                "correct": 1,
                "explanation": "Returning a special value like -1 is a common convention to indicate that the target value was not found in the array."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "Which of the following is an advantage of using linear search?",
                "options": [
                    "A) It is faster than binary search for large datasets",
                    "B) It requires the array to be sorted",
                    "C) It is simple to implement and understand",
                    "D) It has a high time complexity"
                ],
                "correct": 2,
                "explanation": "Linear search is indeed simple to implement and understand, making it a good choice for small datasets or educational purposes."
            }
        ],
        "logicHints": {
            "approach": "Loop and compare.",
            "keySteps": [
                "Loop index",
                "Check target"
            ],
            "pseudocode": "FOR i = 0 TO n-1: IF arr[i] == target: RETURN i"
        },
        "referenceSolution": "#include <stdio.h>\n\nint search(int arr[], int n, int x) {\n    for (int i = 0; i < n; i++)\n        if (arr[i] == x) return i;\n    return -1;\n}\n\nint main() {\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "search-binary": {
        "id": "search-binary",
        "title": "Binary Search",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "🎯",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Search a sorted array by repeatedly dividing the search space in half.",
            "whatIsIt": "Quick logarithmic lookup on sorted elements.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Check mid",
                    "description": "Compare mid to target, adjust bounds."
                }
            ],
            "keyTerms": [
                {
                    "term": "Binary Search",
                    "definition": "Divide and conquer search."
                }
            ],
            "realWorldExample": "Looking up telephone number directory.",
            "timeComplexity": "O(log n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Sorted arrays.",
            "commonMistakes": [
                "Using on unsorted array."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is binary search complexity?",
                "options": [
                    "A) O(n)",
                    "B) O(log n)",
                    "C) O(1)",
                    "D) O(n log n)"
                ],
                "correct": 1,
                "explanation": "Repeatedly halves search space."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary requirement for using binary search on an array?",
                "options": [
                    "A) The array must be unsorted",
                    "B) The array must be sorted",
                    "C) The array must have a fixed size",
                    "D) The array must be dynamically allocated"
                ],
                "correct": 1,
                "explanation": "Binary search requires the array to be sorted to work correctly."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What happens if the target element is not found in the array during a binary search?",
                "options": [
                    "A) The function returns the index of the closest element",
                    "B) The function returns -1 or a special value to indicate failure",
                    "C) The function throws an exception",
                    "D) The function enters an infinite loop"
                ],
                "correct": 1,
                "explanation": "If the target element is not found, the function typically returns -1 or a special value to indicate failure."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "How does the number of comparisons in binary search change when the size of the input array doubles?",
                "options": [
                    "A) The number of comparisons increases by a factor of 2",
                    "B) The number of comparisons increases by a factor of 4",
                    "C) The number of comparisons increases by 1",
                    "D) The number of comparisons increases by approximately 1 bit (i.e., log2(2) = 1)"
                ],
                "correct": 3,
                "explanation": "When the size of the input array doubles, the number of comparisons in binary search increases by approximately 1 bit, since the algorithm divides the search space roughly in half with each comparison."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the main advantage of using binary search over linear search?",
                "options": [
                    "A) Binary search is simpler to implement",
                    "B) Binary search is faster for large datasets",
                    "C) Binary search uses more memory",
                    "D) Binary search only works on linked lists"
                ],
                "correct": 1,
                "explanation": "The main advantage of binary search is that it is significantly faster than linear search for large datasets, with a time complexity of O(log n) compared to O(n) for linear search."
            }
        ],
        "logicHints": {
            "approach": "Adjust low/high indexes.",
            "keySteps": [
                "Find mid",
                "Adjust low/high"
            ],
            "pseudocode": "WHILE low <= high: mid = low + (high-low)/2"
        },
        "referenceSolution": "#include <stdio.h>\n\nint bin(int arr[], int n, int x) {\n    int l = 0, h = n - 1;\n    while (l <= h) {\n        int m = l + (h - l) / 2;\n        if (arr[m] == x) return m;\n        if (arr[m] < x) l = m + 1;\n        else h = m - 1;\n    }\n    return -1;\n}\n\nint main() {\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "sort-bubble": {
        "id": "sort-bubble",
        "title": "Bubble Sort",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "🫧",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "Sorts an array by repeatedly swapping adjacent elements if they are in the wrong order.",
            "whatIsIt": "Bubble sort steps through the array. It compares adjacent items and swaps them. The largest elements bubble up to the end of the array first.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Nested Loops",
                    "description": "Loop through array n times. Compare arr[j] and arr[j+1] and swap if arr[j] > arr[j+1]."
                }
            ],
            "keyTerms": [
                {
                    "term": "Bubble Sort",
                    "definition": "Comparison-based sorting algorithm."
                }
            ],
            "realWorldExample": "Sorting cards by comparing adjacent cards and placing the larger one on the right.",
            "timeComplexity": {
                "best": "O(n)",
                "average": "O(n²)",
                "worst": "O(n²)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "Small datasets or when teaching sorting concepts.",
            "commonMistakes": [
                "Running loops unnecessarily when array is already sorted (can optimize with a swap flag)."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the optimized best-case complexity of Bubble Sort?",
                "options": [
                    "A) O(1)",
                    "B) O(n)",
                    "C) O(n log n)",
                    "D) O(n²)"
                ],
                "correct": 1,
                "explanation": "If optimized with a swapped flag, it exits early on the first pass if no swaps occur, achieving O(n) time."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary operation performed by the Bubble Sort algorithm on adjacent items in an array?",
                "options": [
                    "A) Division",
                    "B) Multiplication",
                    "C) Comparison and swapping",
                    "D) Subtraction"
                ],
                "correct": 2,
                "explanation": "Bubble sort works by repeatedly swapping the adjacent elements if they are in wrong order."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the worst-case and average time complexity of the Bubble Sort algorithm?",
                "options": [
                    "A) O(n) and O(n log n)",
                    "B) O(n log n) and O(n²)",
                    "C) O(n²) and O(n²)",
                    "D) O(1) and O(n)"
                ],
                "correct": 2,
                "explanation": "The worst-case and average time complexity of Bubble sort is O(n²) because in the worst case, it has to compare and potentially swap every element in the array."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "How can the Bubble Sort algorithm be optimized to improve its performance on already sorted or nearly sorted lists?",
                "options": [
                    "A) By using a flag to track if any swaps were made in a pass and exiting early if no swaps occurred",
                    "B) By using a recursive approach to sort the list",
                    "C) By using a divide-and-conquer approach to sort the list",
                    "D) By using a hash table to store the elements"
                ],
                "correct": 0,
                "explanation": "By using a flag to track if any swaps were made in a pass and exiting early if no swaps occurred, Bubble sort can be optimized to have a best-case time complexity of O(n)."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the space complexity of the Bubble Sort algorithm?",
                "options": [
                    "A) O(1)",
                    "B) O(n)",
                    "C) O(n log n)",
                    "D) O(n²)"
                ],
                "correct": 0,
                "explanation": "The space complexity of Bubble sort is O(1) because it only uses a constant amount of additional space to store temporary variables, regardless of the size of the input array."
            }
        ],
        "logicHints": {
            "approach": "Compare adjacent elements and swap them if they are in the incorrect order.",
            "keySteps": [
                "Outer loop for passes",
                "Inner loop for adjacent comparisons"
            ],
            "pseudocode": "FOR i = 0 TO n-1:\n  swapped = False\n  FOR j = 0 TO n-i-2:\n    IF arr[j] > arr[j+1]: swap(arr[j], arr[j+1]), swapped = True\n  IF NOT swapped: BREAK"
        },
        "referenceSolution": "#include <stdio.h>\n\nvoid bubble(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int swapped = 0;\n        for (int j = 0; j < n-i-1; j++) {\n            if (arr[j] > arr[j+1]) {\n                int temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n                swapped = 1;\n            }\n        }\n        if (!swapped) break;\n    }\n}\n\nint main() {\n    int arr[] = {3, 2, 1};\n    bubble(arr, 3);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "sort-selection": {
        "id": "sort-selection",
        "title": "Selection Sort",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "🎯",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "Find the minimum element from the unsorted part and swap it with the first unsorted element.",
            "whatIsIt": "Select the smallest element from the unsorted subarray and swap it with the element at the beginning of the unsorted subarray.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Find min and swap",
                    "description": "Find min index in range [i, n-1] and swap with position i."
                }
            ],
            "keyTerms": [
                {
                    "term": "Selection Sort",
                    "definition": "In-place comparison sort."
                }
            ],
            "realWorldExample": "Selecting the smallest book on a shelf, putting it at the start, then selecting the next smallest.",
            "timeComplexity": "O(n²)",
            "spaceComplexity": "O(1)",
            "whenToUse": "When reducing the number of write operations (swaps) is critical.",
            "commonMistakes": [
                "Swapping elements inside the inner loop rather than at the end of the pass."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Does selection sort preserve the relative order of equal keys (is it stable)?",
                "options": [
                    "A) Yes",
                    "B) No",
                    "C) Depends on implementation",
                    "D) Only for integers"
                ],
                "correct": 1,
                "explanation": "Selection sort is generally unstable as swaps can shift equal elements past each other."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary operation in selection sort that reduces the unsorted portion of the array?",
                "options": [
                    "A) Insertion at the beginning",
                    "B) Deletion from the end",
                    "C) Swap with the smallest element",
                    "D) Shift all elements to the right"
                ],
                "correct": 2,
                "explanation": "Selection sort works by repeatedly finding the minimum element from the unsorted part and swapping it with the first unsorted element."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How does the number of comparisons in selection sort change with the size of the input array?",
                "options": [
                    "A) It decreases as the array size increases",
                    "B) It remains constant regardless of array size",
                    "C) It increases quadratically with the array size",
                    "D) It increases linearly with the array size"
                ],
                "correct": 2,
                "explanation": "The number of comparisons in selection sort is proportional to the square of the number of items being sorted, making it less efficient on large lists."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider an array that is already sorted in ascending order. What is the time complexity of selection sort on this array?",
                "options": [
                    "A) O(n log n)",
                    "B) O(n^2)",
                    "C) O(n)",
                    "D) O(1)"
                ],
                "correct": 1,
                "explanation": "Even if the array is already sorted, selection sort still checks every element in the unsorted portion of the array, resulting in a time complexity of O(n^2)."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the advantage of using selection sort over other sorting algorithms like bubble sort?",
                "options": [
                    "A) It is more stable",
                    "B) It performs more comparisons",
                    "C) It minimizes the number of swaps",
                    "D) It has a higher time complexity"
                ],
                "correct": 2,
                "explanation": "Selection sort has the advantage of minimizing the number of swaps, which can be significant if writes to the array are expensive, such as in flash memory."
            }
        ],
        "logicHints": {
            "approach": "Find the smallest item in the unsorted portion and swap it to its sorted place.",
            "keySteps": [
                "Find min index",
                "Swap min index with outer index"
            ],
            "pseudocode": "FOR i = 0 TO n-2:\n  min_idx = i\n  FOR j = i+1 TO n-1:\n    IF arr[j] < arr[min_idx]: min_idx = j\n  swap(arr[i], arr[min_idx])"
        },
        "referenceSolution": "#include <stdio.h>\n\nvoid selection(int arr[], int n) {\n    for (int i = 0; i < n-1; i++) {\n        int min = i;\n        for (int j = i+1; j < n; j++)\n            if (arr[j] < arr[min]) min = j;\n        int temp = arr[min];\n        arr[min] = arr[i];\n        arr[i] = temp;\n    }\n}\n\nint main() {\n    int arr[] = {3, 1, 2};\n    selection(arr, 3);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "sort-insertion": {
        "id": "sort-insertion",
        "title": "Insertion Sort",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "🃏",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "Build the sorted array one element at a time by inserting each element into its sorted place.",
            "whatIsIt": "Insert the current key in the sorted portion to the left by shifting larger items to the right.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Shift and insert",
                    "description": "Store current element in key, shift left elements > key, and insert key."
                }
            ],
            "keyTerms": [
                {
                    "term": "Insertion Sort",
                    "definition": "Adaptive, stable sorting algorithm."
                }
            ],
            "realWorldExample": "Inserting a new folder alphabetically into an existing stack of folders.",
            "timeComplexity": {
                "best": "O(n)",
                "average": "O(n²)",
                "worst": "O(n²)"
            },
            "spaceComplexity": "O(1)",
            "whenToUse": "Small arrays or mostly sorted inputs.",
            "commonMistakes": [
                "Incorrect bounds check in shifting loop."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Which of the following makes insertion sort highly efficient for small files?",
                "options": [
                    "A) Divide and conquer logic",
                    "B) Low overhead and O(n) best-case complexity",
                    "C) Multi-threading support",
                    "D) None"
                ],
                "correct": 1,
                "explanation": "Insertion sort has very low overhead and runs in O(n) time for already sorted arrays."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary operation used in insertion sort to place an element in its correct position?",
                "options": [
                    "A) Swapping adjacent elements",
                    "B) Shifting larger elements to the right",
                    "C) Recursively dividing the array",
                    "D) Merging sorted subarrays"
                ],
                "correct": 1,
                "explanation": "Insertion sort works by shifting larger elements to the right to make room for the current element to be inserted in its correct position."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the time complexity of insertion sort in the worst-case scenario?",
                "options": [
                    "A) O(n log n)",
                    "B) O(n^2)",
                    "C) O(n)",
                    "D) O(log n)"
                ],
                "correct": 1,
                "explanation": "In the worst-case scenario, insertion sort has a time complexity of O(n^2) because it needs to compare and shift each element in the array."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "How does the adaptive property of insertion sort affect its performance on nearly sorted or already sorted arrays?",
                "options": [
                    "A) It increases the time complexity to O(n^2)",
                    "B) It has no effect on the performance",
                    "C) It reduces the time complexity to O(n)",
                    "D) It changes the algorithm to a divide-and-conquer approach"
                ],
                "correct": 2,
                "explanation": "Insertion sort is an adaptive algorithm, meaning its performance improves when the input array is already sorted or nearly sorted. In such cases, the time complexity reduces to O(n), making it more efficient."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "Which of the following is a characteristic of insertion sort that makes it suitable for real-time data?",
                "options": [
                    "A) It is a non-stable sorting algorithm",
                    "B) It has a high overhead in terms of extra memory",
                    "C) It can sort the array in-place, one element at a time",
                    "D) It requires the entire array to be available before sorting"
                ],
                "correct": 2,
                "explanation": "Insertion sort can sort the array in-place, one element at a time, making it suitable for real-time data where the array is being constantly updated."
            }
        ],
        "logicHints": {
            "approach": "Insert the key into the sorted array to its left by shifting larger elements one index to the right.",
            "keySteps": [
                "Store key",
                "Shift left-hand elements"
            ],
            "pseudocode": "FOR i = 1 TO n-1:\n  key = arr[i]\n  j = i-1\n  WHILE j >= 0 AND arr[j] > key:\n    arr[j+1] = arr[j]\n    j = j-1\n  arr[j+1] = key"
        },
        "referenceSolution": "#include <stdio.h>\n\nvoid insertion(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i - 1;\n        while (j >= 0 && arr[j] > key) {\n            arr[j+1] = arr[j];\n            j--;\n        }\n        arr[j+1] = key;\n    }\n}\n\nint main() {\n    int arr[] = {5, 2, 9};\n    insertion(arr, 3);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "sort-merge": {
        "id": "sort-merge",
        "title": "Merge Sort",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "🥞",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "A divide-and-conquer algorithm that recursively splits the array in half, sorts each half, and merges them.",
            "whatIsIt": "Splits the array into left and right halves, recursively sorts them, then merges the sorted halves using a helper array.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Split",
                    "description": "Find mid index: mid = (low + high) / 2."
                },
                {
                    "step": 2,
                    "title": "Recursively Sort",
                    "description": "Call mergeSort on left half and right half."
                },
                {
                    "step": 3,
                    "title": "Merge",
                    "description": "Merge the two sorted subarrays back together in sorted order."
                }
            ],
            "keyTerms": [
                {
                    "term": "Merge Sort",
                    "definition": "Stable, divide-and-conquer sorting algorithm."
                }
            ],
            "realWorldExample": "Two workers sorting smaller stacks of documents separately, then merging their results into a single sorted pile.",
            "timeComplexity": "O(n log n)",
            "spaceComplexity": "O(n) auxiliary space",
            "whenToUse": "When stable sorting is required on large datasets.",
            "commonMistakes": [
                "Forgetting to allocate auxiliary memory or failing to free it, causing memory leaks."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the space complexity of standard Merge Sort?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n log n)"
                ],
                "correct": 2,
                "explanation": "Merge Sort requires an auxiliary array of size n to merge the sorted subproblems."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary purpose of the 'merge' step in Merge Sort?",
                "options": [
                    "A) To split the array into smaller subproblems",
                    "B) To recursively sort the subproblems",
                    "C) To combine two sorted subarrays into a single sorted subarray",
                    "D) To search for a specific element in the array"
                ],
                "correct": 2,
                "explanation": "The 'merge' step in Merge Sort is used to combine two sorted subarrays into a single sorted subarray, which is a crucial part of the algorithm."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the time complexity of the Merge Sort algorithm?",
                "options": [
                    "A) O(n)",
                    "B) O(n log n)",
                    "C) O(n^2)",
                    "D) O(log n)"
                ],
                "correct": 1,
                "explanation": "The time complexity of Merge Sort is O(n log n) because the algorithm divides the array into two halves recursively (O(log n)) and then merges the sorted halves (O(n))."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "How does Merge Sort handle duplicate elements in the input array?",
                "options": [
                    "A) It removes all duplicate elements",
                    "B) It treats duplicate elements as distinct elements",
                    "C) It throws an error when it encounters a duplicate element",
                    "D) It is unstable and may swap equal elements"
                ],
                "correct": 1,
                "explanation": "Merge Sort is a stable sorting algorithm, which means it preserves the order of equal elements. It treats duplicate elements as distinct elements and sorts them based on their original order."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the main advantage of using Merge Sort over other sorting algorithms like Quick Sort?",
                "options": [
                    "A) It has a faster average-case time complexity",
                    "B) It has a lower space complexity",
                    "C) It is a stable sorting algorithm",
                    "D) It is an in-place sorting algorithm"
                ],
                "correct": 2,
                "explanation": "One of the main advantages of Merge Sort is that it is a stable sorting algorithm, which means it preserves the order of equal elements. This is particularly useful in certain applications where stability is important."
            }
        ],
        "logicHints": {
            "approach": "Divide array into halves, sort recursively, and merge them.",
            "keySteps": [
                "Find mid",
                "Recurse left/right",
                "Merge sorted arrays"
            ],
            "pseudocode": "mergeSort(arr, l, r):\n  IF l < r:\n    mid = l + (r-l)/2\n    mergeSort(arr, l, mid)\n    mergeSort(arr, mid+1, r)\n    merge(arr, l, mid, r)"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n\nvoid merge(int arr[], int l, int m, int r) {\n    int n1 = m - l + 1;\n    int n2 = r - m;\n    int* L = malloc(n1 * sizeof(int));\n    int* R = malloc(n2 * sizeof(int));\n    for (int i = 0; i < n1; i++) L[i] = arr[l + i];\n    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];\n    int i = 0, j = 0, k = l;\n    while (i < n1 && j < n2) {\n        if (L[i] <= R[j]) arr[k++] = L[i++];\n        else arr[k++] = R[j++];\n    }\n    while (i < n1) arr[k++] = L[i++];\n    while (j < n2) arr[k++] = R[j++];\n    free(L); free(R);\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n    if (l < r) {\n        int m = l + (r - l) / 2;\n        mergeSort(arr, l, m);\n        mergeSort(arr, m + 1, r);\n        merge(arr, l, m, r);\n    }\n}\n\nint main() {\n    int arr[] = {38, 27, 43, 3, 9, 82, 10};\n    mergeSort(arr, 0, 6);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "sort-quick": {
        "id": "sort-quick",
        "title": "Quick Sort",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "⚡",
        "estimatedTime": "18 min",
        "concept": {
            "summary": "Pick an element as pivot, partition the array around the pivot, and recursively sort the partitions.",
            "whatIsIt": "In-place sorting algorithm that partitions arrays: elements smaller than pivot are moved before it, and larger elements after it.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Pick Pivot",
                    "description": "Usually the last element."
                },
                {
                    "step": 2,
                    "title": "Partition",
                    "description": "Rearrange array so smaller elements go left, larger go right."
                },
                {
                    "step": 3,
                    "title": "Recurse",
                    "description": "Sort sub-arrays left and right of pivot."
                }
            ],
            "keyTerms": [
                {
                    "term": "Pivot",
                    "definition": "The target element used to split arrays."
                },
                {
                    "term": "Partitioning",
                    "definition": "Rearranging elements relative to pivot."
                }
            ],
            "realWorldExample": "Organizing files by placing all folders starting with letters A-M on the left shelf and N-Z on the right shelf.",
            "timeComplexity": {
                "best": "O(n log n)",
                "average": "O(n log n)",
                "worst": "O(n²)"
            },
            "spaceComplexity": "O(log n) recursion stack",
            "whenToUse": "General purpose sorting (has excellent cache locality).",
            "commonMistakes": [
                "Choosing a bad pivot (e.g. sorted array with last element pivot leads to worst-case O(n²))."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "hard",
                "question": "Under what condition does quicksort exhibit its worst-case O(n²) complexity?",
                "options": [
                    "A) Elements are in random order",
                    "B) Pivot splits the array evenly each time",
                    "C) Pivot is always the smallest or largest element (e.g. already sorted array)",
                    "D) Array size is prime"
                ],
                "correct": 2,
                "explanation": "If the pivot always partitions the array into size 0 and n-1, height of recursion tree is n, leading to quadratic time."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the main idea behind the quicksort algorithm?",
                "options": [
                    "A) To sort elements in descending order",
                    "B) To sort elements in ascending order by repeatedly partitioning the array",
                    "C) To find the maximum element in the array",
                    "D) To reverse the order of elements in the array"
                ],
                "correct": 1,
                "explanation": "Quicksort is an in-place sorting algorithm that works by selecting a 'pivot' element and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the purpose of the pivot in the quicksort algorithm?",
                "options": [
                    "A) To divide the array into two equal parts",
                    "B) To find the middle element of the array",
                    "C) To partition the array into elements smaller and larger than the pivot",
                    "D) To sort the array in-place"
                ],
                "correct": 2,
                "explanation": "The pivot is used to partition the array into two parts: elements smaller than the pivot and elements larger than the pivot. This process is repeated recursively until the entire array is sorted."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "How can the performance of quicksort be improved in the case of nearly sorted or already sorted input?",
                "options": [
                    "A) By using a different sorting algorithm",
                    "B) By using a random pivot",
                    "C) By using the middle element as the pivot",
                    "D) By using the median of three elements as the pivot"
                ],
                "correct": 3,
                "explanation": "Using the median of three elements (e.g. the first, middle, and last elements) as the pivot can help to avoid the worst-case scenario where the pivot is always the smallest or largest element, leading to improved performance for nearly sorted or already sorted input."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the average time complexity of the quicksort algorithm?",
                "options": [
                    "A) O(n)",
                    "B) O(n log n)",
                    "C) O(n²)",
                    "D) O(2^n)"
                ],
                "correct": 1,
                "explanation": "The average time complexity of quicksort is O(n log n), although it can be O(n²) in the worst case if the pivot is chosen poorly."
            }
        ],
        "logicHints": {
            "approach": "Select pivot, partition around it, call quicksort recursively on sub-arrays.",
            "keySteps": [
                "Partition: swap elements based on comparison to pivot",
                "Recurse on left/right partitions"
            ],
            "pseudocode": "quickSort(arr, low, high):\n  IF low < high:\n    p = partition(arr, low, high)\n    quickSort(arr, low, p-1)\n    quickSort(arr, p+1, high)"
        },
        "referenceSolution": "#include <stdio.h>\n\nvoid swap(int* a, int* b) {\n    int t = *a; *a = *b; *b = t;\n}\n\nint partition(int arr[], int low, int high) {\n    int pivot = arr[high];\n    int i = (low - 1);\n    for (int j = low; j < high; j++) {\n        if (arr[j] < pivot) {\n            i++;\n            swap(&arr[i], &arr[j]);\n        }\n    }\n    swap(&arr[i + 1], &arr[high]);\n    return (i + 1);\n}\n\nvoid quickSort(int arr[], int low, int high) {\n    if (low < high) {\n        int pi = partition(arr, low, high);\n        quickSort(arr, low, pi - 1);\n        quickSort(arr, pi + 1, high);\n    }\n}\n\nint main() {\n    int arr[] = {10, 7, 8, 9, 1, 5};\n    quickSort(arr, 0, 5);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "sort-shell": {
        "id": "sort-shell",
        "title": "Shell Sort",
        "category": "Algorithms & Recursion",
        "level": "intermediate",
        "levelNum": 4,
        "icon": "🐚",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "An extension of insertion sort that compares elements separated by a gap that decreases over time.",
            "whatIsIt": "Allows swapping of far-apart elements to resolve large inversions quickly, refining the array using smaller gap sizes.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Gap sequence",
                    "description": "Initialize gap size (usually n/2). Perform gapped insertion sorts."
                },
                {
                    "step": 2,
                    "title": "Reduce gap",
                    "description": "Halve gap size on each iteration until gap becomes 1."
                }
            ],
            "keyTerms": [
                {
                    "term": "Shell Sort",
                    "definition": "In-place comparison sort using gaps."
                }
            ],
            "realWorldExample": "Sorting a line of people by first organizing groups standing far apart, then narrowing group intervals.",
            "timeComplexity": "O(n log² n) to O(n²)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Medium sized datasets where memory stack space is limited.",
            "commonMistakes": [
                "Wrong loop index conditions in insertion steps."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Shell sort is an optimization of which sorting algorithm?",
                "options": [
                    "A) Bubble sort",
                    "B) Selection sort",
                    "C) Insertion sort",
                    "D) Merge sort"
                ],
                "correct": 2,
                "explanation": "Shell sort is an extension of insertion sort that permits comparisons and swaps of far-apart elements."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary advantage of using Shell sort over other sorting algorithms?",
                "options": [
                    "A) It has a time complexity of O(n)",
                    "B) It can sort arrays with duplicate elements",
                    "C) It allows swapping of far-apart elements to resolve large inversions quickly",
                    "D) It uses recursion to sort the array"
                ],
                "correct": 2,
                "explanation": "Shell sort's primary advantage is its ability to resolve large inversions quickly by swapping far-apart elements, making it more efficient than other algorithms for certain types of data."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How does the gap size in Shell sort affect the sorting process?",
                "options": [
                    "A) A larger gap size results in faster sorting, but may not be as efficient",
                    "B) A smaller gap size results in slower sorting, but is more efficient",
                    "C) The gap size does not affect the sorting process",
                    "D) The gap size is fixed and cannot be changed"
                ],
                "correct": 0,
                "explanation": "A larger gap size in Shell sort can result in faster sorting, but may not be as efficient, as it may not be able to resolve smaller inversions. As the gap size decreases, the algorithm becomes more efficient, but may take longer to complete."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What is the worst-case time complexity of Shell sort, and how does it compare to other sorting algorithms?",
                "options": [
                    "A) O(n log n), which is comparable to other sorting algorithms like Quick sort and Merge sort",
                    "B) O(n^2), which is slower than other sorting algorithms like Quick sort and Merge sort",
                    "C) O(n), which is faster than other sorting algorithms like Quick sort and Merge sort",
                    "D) O(n log^2 n), which is slower than other sorting algorithms like Quick sort and Merge sort"
                ],
                "correct": 1,
                "explanation": "The worst-case time complexity of Shell sort is O(n^2), which is slower than other sorting algorithms like Quick sort and Merge sort, which have average-case time complexities of O(n log n). However, Shell sort's best-case time complexity is O(n log n), making it a good choice for certain types of data."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "Which of the following is a key characteristic of Shell sort that distinguishes it from other sorting algorithms?",
                "options": [
                    "A) It uses a divide-and-conquer approach to sort the array",
                    "B) It uses a recursive function to sort the array",
                    "C) It compares and swaps elements that are far apart, using a gap size that decreases over time",
                    "D) It only compares adjacent elements when sorting the array"
                ],
                "correct": 2,
                "explanation": "Shell sort's key characteristic is its ability to compare and swap elements that are far apart, using a gap size that decreases over time. This allows it to resolve large inversions quickly and efficiently, making it a good choice for certain types of data."
            }
        ],
        "logicHints": {
            "approach": "Perform insertion sort on elements separated by gap. Decrement gap by /2.",
            "keySteps": [
                "Loop gap = n/2; gap > 0; gap /= 2",
                "Compare elements separated by gap"
            ],
            "pseudocode": "FOR gap = n/2 DOWNTO 1:\n  FOR i = gap TO n-1:\n    key = arr[i]\n    j = i\n    WHILE j >= gap AND arr[j-gap] > key:\n      arr[j] = arr[j-gap]\n      j = j - gap\n    arr[j] = key"
        },
        "referenceSolution": "#include <stdio.h>\n\nvoid shellSort(int arr[], int n) {\n    for (int gap = n / 2; gap > 0; gap /= 2) {\n        for (int i = gap; i < n; i++) {\n            int temp = arr[i];\n            int j;\n            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {\n                arr[j] = arr[j - gap];\n            }\n            arr[j] = temp;\n        }\n    }\n}\n\nint main() {\n    int arr[] = {12, 34, 54, 2, 3};\n    shellSort(arr, 5);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "infix-to-postfix": {
        "id": "infix-to-postfix",
        "title": "Infix to Postfix",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "📊",
        "estimatedTime": "18 min",
        "concept": {
            "summary": "Convert an infix expression (e.g. A+B) to a postfix expression (e.g. AB+) using a stack.",
            "whatIsIt": "Infix expressions place operator between operands. Postfix (Reverse Polish) places operator after operands, which is easier for computers to evaluate without parentheses rules.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Read tokens",
                    "description": "Iterate infix expression left to right."
                },
                {
                    "step": 2,
                    "title": "Apply rules",
                    "description": "If operand, print it. If (, push to stack. If ), pop until (. If operator, pop operators with higher/equal precedence, then push operator."
                }
            ],
            "keyTerms": [
                {
                    "term": "Infix Notation",
                    "definition": "Operators in between operands (A + B)."
                },
                {
                    "term": "Postfix Notation",
                    "definition": "Operators after operands (A B +)."
                }
            ],
            "realWorldExample": "Compilers convert mathematical statements to postfix format to evaluate expressions using a hardware stack.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(n)",
            "whenToUse": "Building expression evaluators and compilers.",
            "commonMistakes": [
                "Incorrect precedence mapping for operators.",
                "Not popping remaining stack elements at end of input."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "hard",
                "question": "What is the postfix form of A + B * C?",
                "options": [
                    "A) ABC*+",
                    "B) AB+C*",
                    "C) ABC+*",
                    "D) AB*C+"
                ],
                "correct": 0,
                "explanation": "Multiplication * has higher precedence, so B * C becomes BC*. Then A + (BC*) becomes ABC*+."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the postfix form of A + B?",
                "options": [
                    "A) AB+",
                    "B) A+B",
                    "C) +AB",
                    "D) B+A"
                ],
                "correct": 0,
                "explanation": "In postfix notation, the operator (+) is placed after the operands (A and B), so the correct postfix form is AB+."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the postfix form of (A + B) * C?",
                "options": [
                    "A) AB+C*",
                    "B) ABC+*",
                    "C) AB+C*",
                    "D) ABC*+"
                ],
                "correct": 1,
                "explanation": "First, evaluate the expression inside the parentheses: A + B becomes AB+. Then, (AB+) * C becomes (AB+)C*, which simplifies to ABC+*."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What is the postfix form of A * B + C * D?",
                "options": [
                    "A) AB*CD*+",
                    "B) AB*C+D*",
                    "C) AB+CD*",
                    "D) A*B+C*D+"
                ],
                "correct": 0,
                "explanation": "Multiplication has higher precedence than addition. So, A * B becomes AB* and C * D becomes CD*. Then, AB* + CD* becomes AB*CD*+."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the postfix form of A + B - C?",
                "options": [
                    "A) AB+C-",
                    "B) AB-C+",
                    "C) ABC-+",
                    "D) AB+CD-"
                ],
                "correct": 3,
                "explanation": "In postfix notation, the operators are placed after the operands. So, A + B becomes AB+, and then AB+ - C becomes AB+C-, but since subtraction has the same precedence as addition, we need to consider the order of operations, which results in AB+CD- being the correct postfix form, but since we have AB+ and then subtract C, the correct form is AB+C-."
            }
        ],
        "logicHints": {
            "approach": "Create operator stack. Push/pop based on character scanned and precedence rules.",
            "keySteps": [
                "For each char: if operand, append to output",
                "If op, pop stack to output while precedence(stackTop) >= precedence(char); push char"
            ],
            "pseudocode": "FOR each char c in expression:\n  IF c is operand: PRINT c\n  ELSE IF c is '(': PUSH '('\n  ELSE IF c is ')': POP until '('\n  ELSE: POP higher precedence ops, then PUSH c"
        },
        "referenceSolution": "#include <stdio.h>\n#include <string.h>\n\nint precedence(char op) {\n    if (op == '+' || op == '-') return 1;\n    if (op == '*' || op == '/') return 2;\n    return 0;\n}\n\nvoid infixToPostfix(char infix[], char postfix[]) {\n    char stack[100];\n    int top = -1;\n    int k = 0;\n    \n    for (int i = 0; infix[i] != '\\0'; i++) {\n        char c = infix[i];\n        if ((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {\n            postfix[k++] = c;\n        } else if (c == '(') {\n            stack[++top] = c;\n        } else if (c == ')') {\n            while (top != -1 && stack[top] != '(') {\n                postfix[k++] = stack[top--];\n            }\n            if (top != -1) top--; /* Pop '(' */\n        } else {\n            while (top != -1 && precedence(stack[top]) >= precedence(c)) {\n                postfix[k++] = stack[top--];\n            }\n            stack[++top] = c;\n        }\n    }\n    while (top != -1) {\n        postfix[k++] = stack[top--];\n    }\n    postfix[k] = '\\0';\n}\n\nint main() {\n    char infix[] = \"a+b*(c^d-e)\";\n    char postfix[100];\n    infixToPostfix(\"A+B*C\", postfix);\n    printf(\"Postfix: %s\\n\", postfix);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "singly-linked-list": {
        "id": "singly-linked-list",
        "title": "Singly Linked List",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🔗",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "A Singly Linked List is a linear data structure where elements are stored in nodes, and each node points to the next node.",
            "whatIsIt": "Unlike arrays, linked list elements are not stored in contiguous memory. Each node consists of a data field and a pointer to the next node. The list starts with a pointer to the first node, called the Head.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Define Node structure",
                    "description": "struct Node { int data; struct Node* next; };"
                },
                {
                    "step": 2,
                    "title": "Allocate node",
                    "description": "Create nodes dynamically using malloc: struct Node* newNode = malloc(sizeof(struct Node));"
                },
                {
                    "step": 3,
                    "title": "Link nodes",
                    "description": "Set newNode->next = head; head = newNode;"
                }
            ],
            "keyTerms": [
                {
                    "term": "Node",
                    "definition": "The basic building block, holding data and a link to the next node."
                },
                {
                    "term": "Head",
                    "definition": "A pointer to the first node in the linked list."
                }
            ],
            "realWorldExample": "A scavenger hunt where each clue tells you what to do and points you to the location of the next clue.",
            "timeComplexity": {
                "best": "O(1) insertion",
                "average": "O(n) search",
                "worst": "O(n) search"
            },
            "spaceComplexity": "O(n)",
            "whenToUse": "When dynamic size allocation is needed and frequent insertions/deletions are performed at the beginning or end.",
            "commonMistakes": [
                "Memory leaks by not freeing nodes with free() when deleting.",
                "Dereferencing a NULL pointer (e.g. accessing head->next when head is NULL)."
            ],
            "diagramType": "linked-list"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the time complexity of searching an element in a Singly Linked List of size n?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n²)"
                ],
                "correct": 2,
                "explanation": "In the worst case, you must traverse all n nodes to find the element, yielding O(n) search time."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary component of a node in a Singly Linked List?",
                "options": [
                    "A) Only a data field",
                    "B) Only a pointer to the next node",
                    "C) A data field and a pointer to the next node",
                    "D) A data field and a pointer to the previous node"
                ],
                "correct": 2,
                "explanation": "Each node in a Singly Linked List consists of a data field to hold the value and a pointer to the next node in the list."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the purpose of the 'Head' in a Singly Linked List?",
                "options": [
                    "A) To point to the last node in the list",
                    "B) To point to the node with the smallest value",
                    "C) To point to the first node in the list",
                    "D) To point to a random node in the list"
                ],
                "correct": 2,
                "explanation": "The 'Head' is a pointer that points to the first node in the Singly Linked List, serving as the starting point for traversals and other operations."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider a Singly Linked List with nodes containing integers. You want to insert a new node with a value of 5 after the node with a value of 10. If the list is: 1 -> 2 -> 10 -> 15, what will the list look like after the insertion?",
                "options": [
                    "A) 1 -> 2 -> 10 -> 5 -> 15",
                    "B) 1 -> 2 -> 5 -> 10 -> 15",
                    "C) 1 -> 2 -> 10 -> 5 -> 15",
                    "D) 1 -> 2 -> 5 -> 10 -> 15"
                ],
                "correct": 0,
                "explanation": "To insert a new node after the node with a value of 10, you need to update the 'next' pointer of the new node to point to the node with a value of 15, and update the 'next' pointer of the node with a value of 10 to point to the new node."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the primary advantage of using a Singly Linked List over an array?",
                "options": [
                    "A) Faster search times",
                    "B) More efficient use of memory for large datasets with frequent insertions and deletions",
                    "C) Ability to store a fixed number of elements",
                    "D) Ability to access elements by index"
                ],
                "correct": 1,
                "explanation": "Singly Linked Lists can be more memory-efficient than arrays for large datasets that require frequent insertions and deletions, since only the affected nodes need to be updated, rather than shifting all the elements."
            }
        ],
        "logicHints": {
            "approach": "Create a Node struct, allocate memory, initialize data and next pointer.",
            "keySteps": [
                "struct Node with data and struct Node* next",
                "Create nodes with malloc",
                "Link them and print"
            ],
            "pseudocode": "STRUCT Node:\n  data: Integer\n  next: Pointer to Node"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid printList(struct Node* n) {\n    while (n != NULL) {\n        printf(\"%d -> \", n->data);\n        n = n->next;\n    }\n    printf(\"NULL\\n\");\n}\n\nint main() {\n    struct Node* head = malloc(sizeof(struct Node));\n    struct Node* second = malloc(sizeof(struct Node));\n    \n    head->data = 1;\n    head->next = second;\n    \n    second->data = 2;\n    second->next = NULL;\n    \n    printList(head);\n    free(head);\n    free(second);\n    return 0;\n}\n",
        "flowDiagramType": "linked-list"
    },
    "doubly-linked-list": {
        "id": "doubly-linked-list",
        "title": "Doubly Linked List",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🔗",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "A Doubly Linked List is a linked list where each node contains pointers to both the next and the previous nodes.",
            "whatIsIt": "It allows traversal in both forward and backward directions, at the expense of extra memory for a second pointer.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Define structure",
                    "description": "struct Node { int data; struct Node* prev; struct Node* next; };"
                }
            ],
            "keyTerms": [
                {
                    "term": "prev pointer",
                    "definition": "Points to the previous node in the list."
                }
            ],
            "realWorldExample": "Web browser navigation history (forward and back buttons).",
            "timeComplexity": "O(1) insertion/deletion at endpoints",
            "spaceComplexity": "O(n)",
            "whenToUse": "When bidirectional navigation is required.",
            "commonMistakes": [
                "Forgetting to update both next and prev pointers during node insertion/deletion."
            ],
            "diagramType": "linked-list"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What extra overhead does a doubly linked list have over a singly linked list?",
                "options": [
                    "A) Extra data",
                    "B) Extra prev pointer per node",
                    "C) Slower insertions",
                    "D) Larger code size only"
                ],
                "correct": 1,
                "explanation": "Each node must store an extra prev pointer, which consumes more memory."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary advantage of using a doubly linked list over a singly linked list?",
                "options": [
                    "A) Reduced memory usage",
                    "B) Faster insertion and deletion",
                    "C) Ability to traverse in both forward and backward directions",
                    "D) Simplified implementation"
                ],
                "correct": 2,
                "explanation": "The primary advantage of a doubly linked list is that it allows traversal in both forward and backward directions, which can be useful in certain applications."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "In a doubly linked list, what is the purpose of the 'prev' pointer in each node?",
                "options": [
                    "A) To point to the next node in the list",
                    "B) To point to the previous node in the list",
                    "C) To point to the first node in the list",
                    "D) To point to the last node in the list"
                ],
                "correct": 1,
                "explanation": "The 'prev' pointer in each node points to the previous node in the list, allowing for backward traversal."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Suppose we have a doubly linked list with the following nodes: 1 <-> 2 <-> 3 <-> 4. If we want to insert a new node with value 5 between nodes 2 and 3, what are the steps we need to take?",
                "options": [
                    "A) Update the 'next' pointer of node 2 to point to the new node, and update the 'prev' pointer of node 3 to point to the new node",
                    "B) Update the 'prev' pointer of node 2 to point to the new node, and update the 'next' pointer of node 3 to point to the new node",
                    "C) Update the 'next' pointer of node 2 to point to the new node, and update the 'next' pointer of the new node to point to node 3, and update the 'prev' pointer of node 3 to point to the new node, and update the 'prev' pointer of the new node to point to node 2",
                    "D) Update the 'prev' pointer of node 2 to point to the new node, and update the 'next' pointer of the new node to point to node 3, and update the 'prev' pointer of node 3 to point to the new node, and update the 'next' pointer of the new node to point to node 2"
                ],
                "correct": 2,
                "explanation": "To insert a new node between nodes 2 and 3, we need to update the 'next' pointer of node 2 to point to the new node, and update the 'next' pointer of the new node to point to node 3, and update the 'prev' pointer of node 3 to point to the new node, and update the 'prev' pointer of the new node to point to node 2."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the time complexity of deleting a node from a doubly linked list, given a pointer to the node to be deleted?",
                "options": [
                    "A) O(1)",
                    "B) O(n)",
                    "C) O(log n)",
                    "D) O(n^2)"
                ],
                "correct": 0,
                "explanation": "The time complexity of deleting a node from a doubly linked list is O(1), because we can directly update the 'next' and 'prev' pointers of the adjacent nodes to bypass the node to be deleted."
            }
        ],
        "logicHints": {
            "approach": "Add prev pointer to Node struct and set it correctly when linking nodes.",
            "keySteps": [
                "node->prev = previousNode",
                "node->next = nextNode"
            ],
            "pseudocode": "STRUCT Node:\n  data: Integer\n  prev: Pointer to Node\n  next: Pointer to Node"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* prev;\n    struct Node* next;\n};\n\nint main() {\n    struct Node* head = malloc(sizeof(struct Node));\n    struct Node* second = malloc(sizeof(struct Node));\n    \n    head->data = 10;\n    head->prev = NULL;\n    head->next = second;\n    \n    second->data = 20;\n    second->prev = head;\n    second->next = NULL;\n    \n    printf(\"Forward: %d -> %d\\n\", head->data, second->data);\n    printf(\"Backward: %d -> %d\\n\", second->data, second->prev->data);\n    \n    free(head);\n    free(second);\n    return 0;\n}\n",
        "flowDiagramType": "linked-list"
    },
    "circular-linked-list": {
        "id": "circular-linked-list",
        "title": "Circular Linked List",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🔁",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "A circular linked list is one where the last node points back to the first node.",
            "whatIsIt": "There is no NULL at the end of the list. Traversal loops back to the head node.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Point last to head",
                    "description": "lastNode->next = head;"
                }
            ],
            "keyTerms": [
                {
                    "term": "Circular Link",
                    "definition": "Pointer from tail to head node."
                }
            ],
            "realWorldExample": "A multiplayer game where turn cycle goes from player 1 to 2 to 3, then loops back to player 1.",
            "timeComplexity": "O(n) traversal",
            "spaceComplexity": "O(n)",
            "whenToUse": "Resource sharing schedules (Round Robin CPU scheduling).",
            "commonMistakes": [
                "Infinite loops during traversal by not checking when the loop visits the head node a second time."
            ],
            "diagramType": "linked-list"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the end condition for traversing a circular linked list?",
                "options": [
                    "A) current == NULL",
                    "B) current->next == NULL",
                    "C) current == head (after starting)",
                    "D) current == tail"
                ],
                "correct": 2,
                "explanation": "Since there is no NULL, traversal stops when we loop back to the head node."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the main characteristic of a circular linked list?",
                "options": [
                    "A) It has a NULL at the end of the list",
                    "B) It has a fixed number of nodes",
                    "C) The last node points to the first node",
                    "D) It is a doubly linked list"
                ],
                "correct": 2,
                "explanation": "A circular linked list is defined by the fact that the last node points back to the first node, creating a loop."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How do you typically insert a new node at the beginning of a circular linked list?",
                "options": [
                    "A) Update the next pointer of the new node to point to the current head, then update the head to point to the new node",
                    "B) Update the next pointer of the current head to point to the new node, then update the head to point to the new node",
                    "C) Update the next pointer of the new node to point to the current head, then update the next pointer of the last node to point to the new node",
                    "D) Update the next pointer of the last node to point to the new node, then update the head to point to the new node"
                ],
                "correct": 0,
                "explanation": "To insert a new node at the beginning of a circular linked list, you need to update the next pointer of the new node to point to the current head, then update the head to point to the new node. You also need to update the next pointer of the last node to point to the new node."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What are the steps to delete a node from a circular linked list, given a pointer to the node to be deleted?",
                "options": [
                    "A) Update the next pointer of the previous node to point to the node after the node to be deleted, then free the node to be deleted",
                    "B) Update the next pointer of the node to be deleted to point to the node after the node to be deleted, then free the node to be deleted",
                    "C) Update the next pointer of the previous node to point to the node after the node to be deleted, then update the head if the node to be deleted is the head, then free the node to be deleted",
                    "D) Update the next pointer of the last node to point to the node after the node to be deleted, then free the node to be deleted"
                ],
                "correct": 2,
                "explanation": "To delete a node from a circular linked list, you need to update the next pointer of the previous node to point to the node after the node to be deleted. If the node to be deleted is the head, you also need to update the head. Finally, you can free the node to be deleted."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the advantage of using a circular linked list over a singly linked list?",
                "options": [
                    "A) It uses less memory",
                    "B) It is faster for insertion and deletion at the beginning",
                    "C) It allows for efficient traversal in both forward and backward directions",
                    "D) It is more suitable for implementing a queue"
                ],
                "correct": 2,
                "explanation": "One of the advantages of using a circular linked list is that it allows for efficient traversal in both forward and backward directions, since the last node points back to the first node."
            }
        ],
        "logicHints": {
            "approach": "Track head pointer and loop until `curr->next == head`.",
            "keySteps": [
                "Initialize curr = head",
                "Use do-while loop: curr = curr->next; while (curr != head);"
            ],
            "pseudocode": "curr = head\nDO:\n  PRINT curr.data\n  curr = curr.next\nWHILE curr != head"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nvoid printCircular(struct Node* head) {\n    if (head == NULL) return;\n    struct Node* curr = head;\n    do {\n        printf(\"%d -> \", curr->data);\n        curr = curr->next;\n    } while (curr != head);\n    printf(\"(head)\\n\");\n}\n\nint main() {\n    struct Node* head = malloc(sizeof(struct Node));\n    struct Node* tail = malloc(sizeof(struct Node));\n    head->data = 1;\n    head->next = tail;\n    tail->data = 2;\n    tail->next = head; /* Circular link */\n    \n    printCircular(head);\n    free(head);\n    free(tail);\n    return 0;\n}\n",
        "flowDiagramType": "linked-list"
    },
    "reverse-linked-list": {
        "id": "reverse-linked-list",
        "title": "Reverse Linked List",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🔄",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "Reverse the direction of pointers in a singly linked list so the tail becomes the head.",
            "whatIsIt": "Given 1->2->3->NULL, change pointers to NULL<-1<-2<-3. Traversal order is reversed.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Use three pointers",
                    "description": "prev = NULL, curr = head, next = NULL."
                },
                {
                    "step": 2,
                    "title": "Iterate and flip",
                    "description": "Save next node: next = curr->next. Flip link: curr->next = prev. Shift: prev = curr, curr = next. Repeat."
                }
            ],
            "keyTerms": [
                {
                    "term": "Pointer Reversal",
                    "definition": "Redirecting node links to point to their previous nodes."
                }
            ],
            "realWorldExample": "Undoing actions in a sequential queue or reversing history tracks.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "When node order needs to be permanently inverted in-place.",
            "commonMistakes": [
                "Losing references to the rest of the list when flipping pointers: must store next first."
            ],
            "diagramType": "linked-list"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "hard",
                "question": "How many pointers are typically required to reverse a singly linked list iteratively?",
                "options": [
                    "A) 1",
                    "B) 2",
                    "C) 3",
                    "D) 4"
                ],
                "correct": 2,
                "explanation": "Three pointers are needed: prev, curr, and next to prevent losing the remaining nodes during reversal."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary goal when reversing a linked list?",
                "options": [
                    "A) To sort the list in ascending order",
                    "B) To change the traversal order of the list",
                    "C) To insert a new node at the beginning of the list",
                    "D) To delete a node from the list"
                ],
                "correct": 1,
                "explanation": "The primary goal of reversing a linked list is to change the traversal order of the list, so that the last node becomes the first node and vice versa."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the time complexity of reversing a singly linked list using a recursive approach?",
                "options": [
                    "A) O(n^2)",
                    "B) O(n log n)",
                    "C) O(n)",
                    "D) O(log n)"
                ],
                "correct": 2,
                "explanation": "The time complexity of reversing a singly linked list using a recursive approach is O(n), where n is the number of nodes in the list, because each node is visited once."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "How can you handle the case where the input linked list is NULL when reversing a linked list?",
                "options": [
                    "A) Return an error message",
                    "B) Throw an exception",
                    "C) Return NULL",
                    "D) Create a new node with value 0"
                ],
                "correct": 2,
                "explanation": "When reversing a linked list, if the input list is NULL, you should return NULL, as there are no nodes to reverse."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the purpose of the 'next' pointer in the context of reversing a singly linked list?",
                "options": [
                    "A) To keep track of the previous node",
                    "B) To keep track of the current node",
                    "C) To keep track of the next node in the original list",
                    "D) To keep track of the head of the reversed list"
                ],
                "correct": 2,
                "explanation": "The 'next' pointer is used to keep track of the next node in the original list, so that you can reverse the link between the current node and the next node."
            }
        ],
        "logicHints": {
            "approach": "Maintain prev, curr, and next pointers. Flip links in-place.",
            "keySteps": [
                "prev = NULL, curr = head",
                "while curr: next = curr->next; curr->next = prev; prev = curr; curr = next;",
                "head = prev"
            ],
            "pseudocode": "prev = NULL, curr = head\nWHILE curr != NULL:\n  next = curr.next\n  curr.next = prev\n  prev = curr\n  curr = next\nhead = prev"
        },
        "referenceSolution": "#include <stdlib.h>\n#include <stdio.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nstruct Node* reverse(struct Node* head) {\n    struct Node* prev = NULL;\n    struct Node* curr = head;\n    struct Node* next = NULL;\n    while (curr != NULL) {\n        next = curr->next;  /* Save next */\n        curr->next = prev;  /* Reverse */\n        prev = curr;        /* Shift */\n        curr = next;\n    }\n    return prev; /* New head */\n}\n\nint main() {\n    // Simple verification\n    struct Node* head = malloc(sizeof(struct Node));\n    head->data = 1; head->next = NULL;\n    head = reverse(head);\n    printf(\"New Head: %d\\n\", head->data);\n    free(head);\n    return 0;\n}\n",
        "flowDiagramType": "linked-list"
    },
    "linked-list-length": {
        "id": "linked-list-length",
        "title": "Linked List Length",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "📏",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Count the number of nodes in a linked list.",
            "whatIsIt": "Starts at the head node, traverses until reaching NULL, incrementing a counter.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Traverse and count",
                    "description": "Initialize count = 0. Iterate curr = head to NULL, incrementing count."
                }
            ],
            "keyTerms": [
                {
                    "term": "Traversal",
                    "definition": "Visiting each node in a list sequentially."
                }
            ],
            "realWorldExample": "Measuring queue sizes in buffered network packets.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(1)",
            "whenToUse": "General list length inquiries.",
            "commonMistakes": [
                "Infinite loops if next pointer links are corrupted."
            ],
            "diagramType": "linked-list"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is the time complexity of calculating length of linked list recursively?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n²)"
                ],
                "correct": 2,
                "explanation": "Whether iterative or recursive, you must visit every node, so complexity is O(n)."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the purpose of a 'head' pointer in a linked list when calculating its length?",
                "options": [
                    "A) To keep track of the current node being processed",
                    "B) To store the length of the linked list",
                    "C) To point to the last node in the list",
                    "D) To initialize the length counter to 0"
                ],
                "correct": 0,
                "explanation": "The 'head' pointer is used to start the traversal of the linked list from the first node."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider a linked list with 'n' nodes. What is the space complexity of calculating the length of the linked list iteratively?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n²)"
                ],
                "correct": 0,
                "explanation": "The space complexity is O(1) because only a constant amount of space is used to store the current node and the length counter."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Suppose you have a function that calculates the length of a linked list. If the function is called recursively, what could potentially happen if the linked list is very large?",
                "options": [
                    "A) The function will run indefinitely",
                    "B) The function will return an incorrect result",
                    "C) A stack overflow error will occur",
                    "D) The function will skip some nodes"
                ],
                "correct": 2,
                "explanation": "If the linked list is very large, the recursive function calls could exceed the maximum stack size, leading to a stack overflow error."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "How would you handle a NULL 'head' pointer when calculating the length of a linked list?",
                "options": [
                    "A) Return an error message",
                    "B) Return a length of 0",
                    "C) Return a length of 1",
                    "D) Attempt to access the first node"
                ],
                "correct": 1,
                "explanation": "If the 'head' pointer is NULL, it means the linked list is empty, so the length should be 0."
            }
        ],
        "logicHints": {
            "approach": "Loop through the list, incrementing a counter variable until the current pointer becomes NULL.",
            "keySteps": [
                "curr = head, count = 0",
                "while curr: count++; curr = curr->next;"
            ],
            "pseudocode": "count = 0, curr = head\nWHILE curr != NULL:\n  count = count + 1\n  curr = curr.next\nRETURN count"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\n\nint getLength(struct Node* head) {\n    int count = 0;\n    struct Node* curr = head;\n    while (curr != NULL) {\n        count++;\n        curr = curr->next;\n    }\n    return count;\n}\n\nint main() {\n    struct Node* head = malloc(sizeof(struct Node));\n    head->data = 5; head->next = NULL;\n    printf(\"Length: %d\\n\", getLength(head));\n    free(head);\n    return 0;\n}\n",
        "flowDiagramType": "linked-list"
    },
    "stack-array": {
        "id": "stack-array",
        "title": "Stack (Array Implementation)",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "📚",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "A stack is a Last-In-First-Out (LIFO) data structure, implemented using a fixed-size array.",
            "whatIsIt": "Operations occur at one end, called the Top. You can push (add item), pop (remove item), and peek (look at top item).",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Maintain index",
                    "description": "int top = -1; tracking the current top index."
                },
                {
                    "step": 2,
                    "title": "Push",
                    "description": "Check overflow. top++; array[top] = value;"
                },
                {
                    "step": 3,
                    "title": "Pop",
                    "description": "Check underflow. value = array[top]; top--;"
                }
            ],
            "keyTerms": [
                {
                    "term": "LIFO",
                    "definition": "Last In First Out."
                },
                {
                    "term": "Stack Overflow",
                    "definition": "Trying to push onto a full stack."
                },
                {
                    "term": "Stack Underflow",
                    "definition": "Trying to pop from an empty stack."
                }
            ],
            "realWorldExample": "A stack of dinner plates. You add plates to the top, and remove plates from the top.",
            "timeComplexity": "O(1) for push and pop",
            "spaceComplexity": "O(max_size)",
            "whenToUse": "Function call management, undo systems, parsing bracket balances.",
            "commonMistakes": [
                "Not checking for overflow before pushing, or underflow before popping."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Which of the following describes the LIFO property?",
                "options": [
                    "A) First element in is first out",
                    "B) Last element in is first out",
                    "C) Random access",
                    "D) Elements accessed by priority"
                ],
                "correct": 1,
                "explanation": "LIFO stands for Last In First Out — the most recently added element is the first one to be removed."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary location where operations occur in a stack?",
                "options": [
                    "A) At the bottom",
                    "B) At the top",
                    "C) In the middle",
                    "D) Randomly throughout"
                ],
                "correct": 1,
                "explanation": "In a stack, all operations like push, pop, and peek occur at one end, which is referred to as the 'top'."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What happens when you attempt to pop an element from an empty stack?",
                "options": [
                    "A) The stack becomes full",
                    "B) The top element is removed",
                    "C) An error occurs or the program crashes",
                    "D) The stack is initialized"
                ],
                "correct": 2,
                "explanation": "Popping from an empty stack results in an error because there is no element to remove, which can lead to a program crash or an error message depending on the implementation."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider a stack implemented as an array with a fixed size of 10 elements. If the stack is currently full and you attempt to push another element onto it, what should happen?",
                "options": [
                    "A) The new element overwrites the bottom element of the stack",
                    "B) The stack automatically resizes to accommodate the new element",
                    "C) An error occurs or the operation is ignored",
                    "D) The top element is removed to make space for the new one"
                ],
                "correct": 2,
                "explanation": "When a stack is full and you try to add another element, it should either throw an error, ignore the operation, or handle it in a way that prevents data loss or corruption, depending on how the stack is implemented."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the purpose of the 'peek' operation in a stack?",
                "options": [
                    "A) To remove the top element",
                    "B) To add a new element to the top",
                    "C) To look at the top element without removing it",
                    "D) To clear all elements from the stack"
                ],
                "correct": 2,
                "explanation": "The 'peek' operation allows you to view or access the top element of the stack without removing it, which can be useful for checking the stack's state without modifying it."
            }
        ],
        "logicHints": {
            "approach": "Create stack struct containing array and top index indicator.",
            "keySteps": [
                "Push: if top < MAX-1: top++; arr[top] = val",
                "Pop: if top >= 0: val = arr[top]; top--; return val"
            ],
            "pseudocode": "PUSH(val):\n  IF top == MAX - 1: ERROR \"Overflow\"\n  ELSE: top = top + 1, arr[top] = val"
        },
        "referenceSolution": "#include <stdio.h>\n#define MAX 5\n\nint stack[MAX];\nint top = -1;\n\nvoid push(int val) {\n    if (top == MAX - 1) {\n        printf(\"Stack Overflow\\n\");\n        return;\n    }\n    stack[++top] = val;\n}\n\nint pop() {\n    if (top == -1) {\n        printf(\"Stack Underflow\\n\");\n        return -1;\n    }\n    return stack[top--];\n}\n\nint main() {\n    push(10);\n    push(20);\n    printf(\"Popped: %d\\n\", pop());\n    printf(\"Popped: %d\\n\", pop());\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "stack-linked-list": {
        "id": "stack-linked-list",
        "title": "Stack (Linked List)",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "📚",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "A stack implemented using a linked list has no size limit (except memory).",
            "whatIsIt": "Insertions (push) and deletions (pop) occur at the head of the list, which serves as the Top.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Push",
                    "description": "Insert new node at head."
                },
                {
                    "step": 2,
                    "title": "Pop",
                    "description": "Remove head node."
                }
            ],
            "keyTerms": [
                {
                    "term": "Dynamic Stack",
                    "definition": "Stack implementation that grows dynamically."
                }
            ],
            "realWorldExample": "History navigation stack in browser.",
            "timeComplexity": "O(1) push and pop",
            "spaceComplexity": "O(n)",
            "whenToUse": "When the maximum stack size is unknown.",
            "commonMistakes": [
                "Losing references to top node when popping."
            ],
            "diagramType": "linked-list"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the top node of stack in a linked list implementation?",
                "options": [
                    "A) Head node",
                    "B) Tail node",
                    "C) Middle node",
                    "D) Separated pointer"
                ],
                "correct": 0,
                "explanation": "We push/pop at the head of the linked list because head operations are O(1), making it the natural Top."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary operation used to add an element to the top of a stack in a linked list implementation?",
                "options": [
                    "A) Pop",
                    "B) Push",
                    "C) Insert",
                    "D) Delete"
                ],
                "correct": 1,
                "explanation": "The push operation is used to add an element to the top of the stack, which is the head of the linked list."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What is the time complexity of pushing an element onto a stack implemented as a linked list?",
                "options": [
                    "A) O(n)",
                    "B) O(log n)",
                    "C) O(1)",
                    "D) O(n^2)"
                ],
                "correct": 2,
                "explanation": "Since we are adding the element at the head of the linked list, the time complexity of push operation is O(1)."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Consider a stack implemented as a linked list with the following nodes: 1 -> 2 -> 3. If we pop the top element, what will be the new top element of the stack?",
                "options": [
                    "A) 1",
                    "B) 2",
                    "C) 3",
                    "D) The stack will be empty"
                ],
                "correct": 1,
                "explanation": "When we pop the top element (3) from the stack, the new top element will be the next node in the linked list, which is 2."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What happens to the stack when we pop an element from an empty stack implemented as a linked list?",
                "options": [
                    "A) The stack becomes full",
                    "B) The stack remains empty",
                    "C) The program crashes",
                    "D) The top element is updated"
                ],
                "correct": 2,
                "explanation": "When we try to pop an element from an empty stack, the stack remains empty because there is no element to remove."
            }
        ],
        "logicHints": {
            "approach": "Implement push by inserting at head, pop by deleting from head.",
            "keySteps": [
                "Push: new->next = top; top = new;",
                "Pop: temp = top; top = top->next; free(temp);"
            ],
            "pseudocode": "PUSH(val):\n  new = new Node(val)\n  new.next = top\n  top = new"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\nstruct Node* top = NULL;\n\nvoid push(int val) {\n    struct Node* temp = malloc(sizeof(struct Node));\n    temp->data = val;\n    temp->next = top;\n    top = temp;\n}\n\nint pop() {\n    if (top == NULL) return -1;\n    struct Node* temp = top;\n    int data = temp->data;\n    top = top->next;\n    free(temp);\n    return data;\n}\n\nint main() {\n    push(5);\n    push(15);\n    printf(\"Popped: %d\\n\", pop());\n    free(top);\n    return 0;\n}\n",
        "flowDiagramType": "linked-list"
    },
    "stack-push-pop": {
        "id": "stack-push-pop",
        "title": "Push and Pop Logic",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "📚",
        "estimatedTime": "8 min",
        "concept": {
            "summary": "Deep dive into stack pointer boundaries and overflow/underflow checking.",
            "whatIsIt": "Ensures data safety by preventing memory violations.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Checks",
                    "description": "Before write, top < limit. Before read, top >= 0."
                }
            ],
            "keyTerms": [
                {
                    "term": "Pointer Boundary",
                    "definition": "The index limits of stack array."
                }
            ],
            "realWorldExample": "Stack protection mechanisms in runtime engines.",
            "timeComplexity": "O(1)",
            "spaceComplexity": "O(1)",
            "whenToUse": "Basic memory-safety validations.",
            "commonMistakes": [
                "Off-by-one errors when comparing top with MAX size."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "Under what condition does stack overflow occur in an array of size MAX?",
                "options": [
                    "A) top == -1",
                    "B) top == MAX - 1",
                    "C) top == 0",
                    "D) top == MAX"
                ],
                "correct": 1,
                "explanation": "Array indices are 0 to MAX-1. When top reaches MAX-1, the stack is completely full."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary purpose of the 'push' operation in a stack?",
                "options": [
                    "A) to remove an element from the top of the stack",
                    "B) to add an element to the top of the stack",
                    "C) to search for an element in the stack",
                    "D) to sort the elements in the stack"
                ],
                "correct": 1,
                "explanation": "The 'push' operation is used to add a new element to the top of the stack, which is the primary way to insert data into a stack."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "What happens when you try to 'pop' an element from an empty stack?",
                "options": [
                    "A) the program will terminate with an error",
                    "B) the stack will be initialized with a default value",
                    "C) the 'pop' operation will return a null or undefined value",
                    "D) the program will enter an infinite loop"
                ],
                "correct": 0,
                "explanation": "When you try to 'pop' an element from an empty stack, the program will typically terminate with an error, as there is no element to remove."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "How can you implement a stack using a linked list in C, and what are the advantages of this approach?",
                "options": [
                    "A) by using a dynamic array and manually managing memory, which provides faster access times",
                    "B) by using a static array and fixed-size nodes, which provides better memory efficiency",
                    "C) by using a dynamic linked list and pointers to nodes, which provides more flexibility and scalability",
                    "D) by using a stack-based array and recursive functions, which provides simpler code"
                ],
                "correct": 2,
                "explanation": "Implementing a stack using a linked list in C provides more flexibility and scalability, as it allows for dynamic memory allocation and deallocation, and can handle large amounts of data."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the difference between the 'push' and 'pop' operations in terms of memory safety?",
                "options": [
                    "A) 'push' is safer because it adds memory, while 'pop' is riskier because it removes memory",
                    "B) 'pop' is safer because it removes memory, while 'push' is riskier because it adds memory",
                    "C) 'push' and 'pop' are equally safe because they both modify the stack",
                    "D) 'push' and 'pop' are equally risky because they both access the stack"
                ],
                "correct": 1,
                "explanation": "The 'pop' operation is riskier in terms of memory safety because it removes memory from the stack, which can lead to memory violations or dangling pointers if not handled properly."
            }
        ],
        "logicHints": {
            "approach": "Implement strict overflow and underflow tests before operations.",
            "keySteps": [
                "Check full/empty states explicitly"
            ],
            "pseudocode": "IF top == MAX - 1: PRINT \"Full\""
        },
        "referenceSolution": "#include <stdio.h>\n\nint main() {\n    int max_size = 3, top = -1;\n    if (top == -1) printf(\"Stack Empty (Underflow state)\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "stack-balanced-parentheses": {
        "id": "stack-balanced-parentheses",
        "title": "Balanced Parentheses",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "⚖️",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "Check if braces in an expression are balanced using a stack.",
            "whatIsIt": "An expression is balanced if open braces are matched with corresponding closing braces in correct order: e.g. \"{[()]}\" is balanced, but \"{[(])}\" is not.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Process characters",
                    "description": "If open bracket (, {, [, push to stack."
                },
                {
                    "step": 2,
                    "title": "Check matches",
                    "description": "If close bracket, pop from stack. If popped bracket does not match, or stack is empty, return false."
                },
                {
                    "step": 3,
                    "title": "End check",
                    "description": "At the end, if stack is empty, return true."
                }
            ],
            "keyTerms": [
                {
                    "term": "Balance",
                    "definition": "Symmetric enclosing brackets."
                }
            ],
            "realWorldExample": "Compiler syntax parsers checking for missing closing brackets in source files.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(n)",
            "whenToUse": "Expression parsing and compiler design.",
            "commonMistakes": [
                "Not checking if stack is empty before popping."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the stack status at the end of checking a balanced expression?",
                "options": [
                    "A) Full",
                    "B) Empty",
                    "C) Contains only operators",
                    "D) Contains one element"
                ],
                "correct": 1,
                "explanation": "All open brackets should have been matched and popped, leaving the stack empty."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the purpose of using a stack to check for balanced parentheses in an expression?",
                "options": [
                    "A) To store operators",
                    "B) To match opening and closing brackets",
                    "C) To evaluate postfix expressions",
                    "D) To sort elements"
                ],
                "correct": 1,
                "explanation": "A stack is used to keep track of the opening brackets and match them with the corresponding closing brackets, ensuring the expression is balanced."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How would you handle nested parentheses of different types (e.g., '({[]})') using a stack in C?",
                "options": [
                    "A) Use a separate stack for each type of bracket",
                    "B) Push opening brackets onto the stack and pop them when a matching closing bracket is encountered",
                    "C) Use a queue instead of a stack",
                    "D) Only push closing brackets onto the stack"
                ],
                "correct": 1,
                "explanation": "By pushing opening brackets onto the stack and popping them when a matching closing bracket is encountered, you can effectively handle nested parentheses of different types."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Write a C function to check if a given string of parentheses is balanced. What data structure would you use and why?",
                "options": [
                    "A) A queue, because it follows the FIFO principle",
                    "B) A stack, because it follows the LIFO principle",
                    "C) A tree, because it can represent nested structures",
                    "D) A graph, because it can represent complex relationships"
                ],
                "correct": 1,
                "explanation": "A stack is the most suitable data structure for checking balanced parentheses because it follows the LIFO principle, which matches the way parentheses are nested and matched in an expression."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What happens when the stack is empty and the algorithm encounters a closing bracket while checking for balanced parentheses?",
                "options": [
                    "A) The algorithm continues checking the rest of the expression",
                    "B) The algorithm returns an error, indicating unbalanced parentheses",
                    "C) The algorithm pushes the closing bracket onto the stack",
                    "D) The algorithm ignores the closing bracket"
                ],
                "correct": 1,
                "explanation": "If the stack is empty and the algorithm encounters a closing bracket, it means there is no matching opening bracket, so the parentheses are unbalanced and an error should be returned."
            }
        ],
        "logicHints": {
            "approach": "Push open brackets to stack. Pop on close bracket and check matching types.",
            "keySteps": [
                "Loop chars: if open -> push. If close -> pop and match. After loop, check top == -1"
            ],
            "pseudocode": "FOR char c in str:\n  IF c is open: PUSH c\n  ELSE IF c is close:\n    IF stack empty OR top doesn't match c: RETURN False\n    POP\nRETURN stack empty"
        },
        "referenceSolution": "#include <stdio.h>\n\nint isMatchingPair(char char1, char char2) {\n    if (char1 == '(' && char2 == ')') return 1;\n    if (char1 == '{' && char2 == '}') return 1;\n    if (char1 == '[' && char2 == ']') return 1;\n    return 0;\n}\n\nint checkBalanced(char exp[]) {\n    char stack[100];\n    int top = -1;\n    for (int i = 0; exp[i] != '\\0'; i++) {\n        if (exp[i] == '{' || exp[i] == '[' || exp[i] == '(') {\n            stack[++top] = exp[i];\n        }\n        if (exp[i] == '}' || exp[i] == ']' || exp[i] == ')') {\n            if (top == -1) return 0;\n            else if (!isMatchingPair(stack[top--], exp[i])) return 0;\n        }\n    }\n    return top == -1;\n}\n\nint main() {\n    char exp[] = \"{()}[]\";\n    if (checkBalanced(exp)) printf(\"Balanced\\n\");\n    else printf(\"Not Balanced\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "queue-array": {
        "id": "queue-array",
        "title": "Queue (Array Implementation)",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "👥",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "A queue is a First-In-First-Out (FIFO) data structure implemented using an array.",
            "whatIsIt": "Operations occur at both ends. Insertions occur at the Rear (enqueue), deletions at the Front (dequeue).",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Maintain two indices",
                    "description": "int front = 0, rear = -1;"
                },
                {
                    "step": 2,
                    "title": "Enqueue",
                    "description": "rear++; array[rear] = value;"
                },
                {
                    "step": 3,
                    "title": "Dequeue",
                    "description": "value = array[front]; front++;"
                }
            ],
            "keyTerms": [
                {
                    "term": "FIFO",
                    "definition": "First In First Out."
                },
                {
                    "term": "Enqueue",
                    "definition": "Add to rear."
                },
                {
                    "term": "Dequeue",
                    "definition": "Remove from front."
                }
            ],
            "realWorldExample": "A queue of people waiting in line at a ticket counter. First person in line is served first.",
            "timeComplexity": "O(1) enqueue and dequeue",
            "spaceComplexity": "O(max_size)",
            "whenToUse": "Task scheduling, printer queues, handling stream inputs.",
            "commonMistakes": [
                "Wasting space: front index moves rightward, making left positions unreachable unless circular queue logic is used."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Which of the following describes the queue dequeue operation?",
                "options": [
                    "A) Removing element from rear",
                    "B) Removing element from front",
                    "C) Inserting element at front",
                    "D) Inserting element at rear"
                ],
                "correct": 1,
                "explanation": "FIFO dictates we remove elements from the Front, which is the dequeue operation."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the purpose of the rear pointer in a queue implemented using an array?",
                "options": [
                    "A) To keep track of the front of the queue",
                    "B) To keep track of the rear of the queue",
                    "C) To keep track of the size of the queue",
                    "D) To keep track of the maximum capacity of the queue"
                ],
                "correct": 1,
                "explanation": "The rear pointer is used to keep track of the last element in the queue, which is necessary for enqueue operations."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider a queue implemented using an array of size 5. If the queue is currently empty, what is the initial value of the front and rear pointers?",
                "options": [
                    "A) Front = 0, Rear = 0",
                    "B) Front = 0, Rear = -1",
                    "C) Front = -1, Rear = 0",
                    "D) Front = -1, Rear = -1"
                ],
                "correct": 2,
                "explanation": "In a queue implemented using an array, the front and rear pointers are typically initialized to -1 to indicate an empty queue."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Suppose we have a queue implemented using an array of size 10, and the queue is currently full. If we attempt to enqueue an element, what will happen?",
                "options": [
                    "A) The element will be inserted at the rear of the queue",
                    "B) The element will be discarded and an error will be reported",
                    "C) The queue will be resized to accommodate the new element",
                    "D) The program will crash due to an out-of-bounds access"
                ],
                "correct": 0,
                "explanation": "When a queue implemented using an array is full, attempting to enqueue an element will typically result in an error or undefined behavior, rather than resizing the queue or crashing the program."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "Consider a queue implemented using an array of size 5, with the following elements: 1, 2, 3, 4, 5. If we dequeue an element, what will be the new state of the queue?",
                "options": [
                    "A) Front = 0, Rear = 4, Queue = [2, 3, 4]",
                    "B) Front = 1, Rear = 4, Queue = [2, 3, 4]",
                    "C) Front = 0, Rear = 3, Queue = [2, 3, 4]",
                    "D) Front = 0, Rear = 4, Queue = [2, 3, 4, 5]"
                ],
                "correct": 0,
                "explanation": "When an element is dequeued from a queue implemented using an array, the front pointer is incremented, and the element at the front of the queue is removed."
            }
        ],
        "logicHints": {
            "approach": "Maintain front and rear pointers. Adjust them on enqueue and dequeue.",
            "keySteps": [
                "Enqueue: check full, rear++, arr[rear] = val",
                "Dequeue: check empty, val = arr[front], front++"
            ],
            "pseudocode": "ENQUEUE(val):\n  IF rear == MAX-1: ERROR \"Full\"\n  ELSE: rear = rear + 1, arr[rear] = val"
        },
        "referenceSolution": "#include <stdio.h>\n#define MAX 5\n\nint queue[MAX];\nint front = 0;\nint rear = -1;\n\nvoid enqueue(int val) {\n    if (rear == MAX - 1) return;\n    queue[++rear] = val;\n}\n\nint dequeue() {\n    if (front > rear) return -1;\n    return queue[front++];\n}\n\nint main() {\n    enqueue(10);\n    enqueue(20);\n    printf(\"Dequeued: %d\\n\", dequeue());\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "queue-linked-list": {
        "id": "queue-linked-list",
        "title": "Queue (Linked List)",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "👥",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "A dynamic queue with no fixed size limits, implemented using a linked list.",
            "whatIsIt": "Keep pointers to both head (front) and tail (rear) nodes. Enqueue appends to tail. Dequeue deletes head.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Enqueue",
                    "description": "Append node to rear; rear = rear->next;"
                },
                {
                    "step": 2,
                    "title": "Dequeue",
                    "description": "Remove node from front; front = front->next;"
                }
            ],
            "keyTerms": [
                {
                    "term": "front pointer",
                    "definition": "Points to head node."
                },
                {
                    "term": "rear pointer",
                    "definition": "Points to tail node."
                }
            ],
            "realWorldExample": "Network packet buffers.",
            "timeComplexity": "O(1) operations",
            "spaceComplexity": "O(n)",
            "whenToUse": "Dynamic size queues.",
            "commonMistakes": [
                "Forgetting to set front to NULL when the last element is dequeued."
            ],
            "diagramType": "linked-list"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the time complexity of enqueuing in a linked list queue with a rear pointer?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n²)"
                ],
                "correct": 0,
                "explanation": "The rear pointer allows direct insertion at the tail in O(1) time without traversing the list."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What happens when we dequeue from an empty queue?",
                "options": [
                    "A) The program crashes.",
                    "B) The head pointer is set to NULL.",
                    "C) The tail pointer is set to NULL.",
                    "D) The queue remains unchanged."
                ],
                "correct": 3,
                "explanation": "When dequeuing from an empty queue, the queue remains unchanged as there is no node to remove."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider a queue with nodes 'A' and 'B' where 'A' is the head and 'B' is the tail. If we enqueue 'C' at the tail, what is the new order of nodes?",
                "options": [
                    "A) A, B, C",
                    "B) A, C, B",
                    "C) B, A, C",
                    "D) B, C, A"
                ],
                "correct": 0,
                "explanation": "Enqueueing 'C' at the tail results in the new order of nodes being A, B, C."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Suppose we have a queue with a circularly linked list structure. What is the time complexity of dequeuing in this scenario?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n²)"
                ],
                "correct": 3,
                "explanation": "In a circularly linked list, dequeuing requires traversing the list to find the new head, resulting in a time complexity of O(n)."
            },
            {
                "id": 5,
                "difficulty": "easy",
                "question": "What is the purpose of maintaining both head and tail pointers in a queue?",
                "options": [
                    "A) To improve memory usage.",
                    "B) To enhance queue performance.",
                    "C) To simplify queue operations.",
                    "D) To facilitate queue traversal."
                ],
                "correct": 2,
                "explanation": "Maintaining both head and tail pointers simplifies queue operations such as enqueue and dequeue by allowing direct access to the front and rear of the queue."
            }
        ],
        "logicHints": {
            "approach": "Create front and rear Node pointers. Set them to NULL. Modify both during inserts.",
            "keySteps": [
                "Enqueue: tail->next = new; rear = new;",
                "Dequeue: front = front->next"
            ],
            "pseudocode": "ENQUEUE(val):\n  new = new Node(val)\n  IF rear == NULL: front = rear = new\n  ELSE: rear.next = new, rear = new"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* next;\n};\nstruct Node *front = NULL, *rear = NULL;\n\nvoid enqueue(int val) {\n    struct Node* temp = malloc(sizeof(struct Node));\n    temp->data = val;\n    temp->next = NULL;\n    if (rear == NULL) {\n        front = rear = temp;\n        return;\n    }\n    rear->next = temp;\n    rear = temp;\n}\n\nint dequeue() {\n    if (front == NULL) return -1;\n    struct Node* temp = front;\n    int data = temp->data;\n    front = front->next;\n    if (front == NULL) rear = NULL;\n    free(temp);\n    return data;\n}\n\nint main() {\n    enqueue(100);\n    printf(\"Dequeued: %d\\n\", dequeue());\n    return 0;\n}\n",
        "flowDiagramType": "linked-list"
    },
    "circular-queue": {
        "id": "circular-queue",
        "title": "Circular Queue",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🔁",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "A circular queue connects the end back to the start, reusing empty slots left by dequeues.",
            "whatIsIt": "Solves the memory waste of linear queues. Array indices wrap around using modulo math: `rear = (rear + 1) % MAX`.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Wrap index",
                    "description": "rear = (rear + 1) % MAX; front = (front + 1) % MAX;"
                }
            ],
            "keyTerms": [
                {
                    "term": "Modulo Indexing",
                    "definition": "Using index % MAX to wrap around array boundaries."
                }
            ],
            "realWorldExample": "Traffic light timers repeating stages sequentially.",
            "timeComplexity": "O(1) operations",
            "spaceComplexity": "O(MAX)",
            "whenToUse": "When buffer memory size must be static and recycled constantly.",
            "commonMistakes": [
                "Incorrect full condition check: `(rear + 1) % MAX == front`."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "hard",
                "question": "Which equation checks if a circular queue is full?",
                "options": [
                    "A) rear == MAX - 1",
                    "B) (rear + 1) % MAX == front",
                    "C) rear == front",
                    "D) front == rear + 1"
                ],
                "correct": 1,
                "explanation": "When the next logical position of rear wraps around to hit front, the circular queue is full."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the purpose of using a circular queue?",
                "options": [
                    "A) To reduce memory usage in linear queues",
                    "B) To increase the speed of data insertion",
                    "C) To simplify the implementation of a queue",
                    "D) To improve the performance of a queue"
                ],
                "correct": 0,
                "explanation": "Circular queues solve the memory waste issue in linear queues by reusing the front element's memory."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How do you implement the 'is_empty' function for a circular queue?",
                "options": [
                    "A) front == rear",
                    "B) front == MAX - 1",
                    "C) rear == front",
                    "D) front == rear + 1"
                ],
                "correct": 0,
                "explanation": "A circular queue is empty when both front and rear indices are equal."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What is the effect of incrementing the 'rear' index when it reaches the end of the array?",
                "options": [
                    "A) It causes an array out-of-bounds error",
                    "B) It wraps around to the beginning of the array",
                    "C) It leaves the queue in an inconsistent state",
                    "D) It has no effect on the queue's state"
                ],
                "correct": 1,
                "explanation": "When the rear index reaches the end of the array, incrementing it causes it to wrap around to the beginning of the array, which is the defining characteristic of a circular queue."
            },
            {
                "id": 5,
                "difficulty": "easy",
                "question": "How do you implement the 'dequeue' operation in a circular queue?",
                "options": [
                    "A) front = (front + 1) % MAX",
                    "B) rear = (rear + 1) % MAX",
                    "C) front = rear",
                    "D) rear = front"
                ],
                "correct": 0,
                "explanation": "To dequeue an element, you increment the front index, wrapping it around to the beginning of the array if necessary."
            }
        ],
        "logicHints": {
            "approach": "Initialize front = -1, rear = -1. Wrap indices using % MAX.",
            "keySteps": [
                "rear = (rear + 1) % MAX",
                "front = (front + 1) % MAX"
            ],
            "pseudocode": "ENQUEUE(val):\n  IF (rear + 1) % MAX == front: ERROR \"Full\""
        },
        "referenceSolution": "#include <stdio.h>\n#define SIZE 5\n\nint items[SIZE];\nint front = -1, rear = -1;\n\nint isFull() {\n    return (rear + 1) % SIZE == front;\n}\n\nvoid enq(int val) {\n    if (isFull()) return;\n    if (front == -1) front = 0;\n    rear = (rear + 1) % SIZE;\n    items[rear] = val;\n}\n\nint main() {\n    enq(5);\n    printf(\"Queue initialized\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "dequeue": {
        "id": "dequeue",
        "title": "Double-Ended Queue (Deque)",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "👥",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "A Deque allows insertion and deletion at both the front and rear ends.",
            "whatIsIt": "Combines behavior of Stack and Queue. Can insertFront, insertRear, deleteFront, deleteRear.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Manage endpoints",
                    "description": "Manipulate pointers to insert/remove at both sides."
                }
            ],
            "keyTerms": [
                {
                    "term": "Deque",
                    "definition": "Double-Ended Queue."
                }
            ],
            "realWorldExample": "Browser undo stack combined with server scheduling history.",
            "timeComplexity": "O(1) operations",
            "spaceComplexity": "O(n)",
            "whenToUse": "A/B priority task processing.",
            "commonMistakes": [
                "Managing complex pointer boundaries on both ends."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Which operations are supported by a Deque?",
                "options": [
                    "A) Insert front, delete front",
                    "B) Insert rear, delete rear",
                    "C) Insert and delete at both ends",
                    "D) Random insert"
                ],
                "correct": 2,
                "explanation": "Deques support insertions and deletions at both front and rear boundaries."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the time complexity of inserting an element at the front of a Deque?",
                "options": [
                    "A) O(1)",
                    "B) O(n)",
                    "C) O(log n)",
                    "D) O(sqrt(n))"
                ],
                "correct": 0,
                "explanation": "Inserting an element at the front of a Deque typically takes constant time, O(1), unless it's implemented as a linked list in which case it would be O(n) in the worst case."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider a Deque with elements 1, 2, 3. If we delete the front element, what is the new state of the Deque?",
                "options": [
                    "A) 1, 2, 3",
                    "B) 2, 3",
                    "C) 1, 2",
                    "D) 1, 2, 3, 4"
                ],
                "correct": 1,
                "explanation": "After deleting the front element, the new state of the Deque is 2, 3."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Design a Deque implementation using a doubly linked list. What are the time complexities of the insertFront, insertRear, deleteFront, and deleteRear operations in your implementation?",
                "options": [
                    "A) insertFront: O(1), insertRear: O(1), deleteFront: O(1), deleteRear: O(1)",
                    "B) insertFront: O(n), insertRear: O(1), deleteFront: O(1), deleteRear: O(n)",
                    "C) insertFront: O(1), insertRear: O(n), deleteFront: O(n), deleteRear: O(1)",
                    "D) insertFront: O(n), insertRear: O(n), deleteFront: O(n), deleteRear: O(n)"
                ],
                "correct": 0,
                "explanation": "In a doubly linked list implementation, inserting at the front or rear takes constant time, O(1), while deleting from the front or rear also takes constant time, O(1)."
            },
            {
                "id": 5,
                "difficulty": "easy",
                "question": "What is the main advantage of using a Deque over a Stack or Queue?",
                "options": [
                    "A) It's faster",
                    "B) It's more memory-efficient",
                    "C) It supports insertions and deletions at both ends",
                    "D) It's easier to implement"
                ],
                "correct": 2,
                "explanation": "The main advantage of using a Deque is that it supports insertions and deletions at both ends, making it more versatile than a Stack or Queue."
            }
        ],
        "logicHints": {
            "approach": "Track both endpoints and create wrappers for all 4 operations.",
            "keySteps": [
                "Implement insertFront, deleteRear, etc."
            ],
            "pseudocode": "INSERT_FRONT(val):\n  front = (front - 1 + MAX) % MAX"
        },
        "referenceSolution": "#include <stdio.h>\n#define MAX 10\n\nint arr[MAX];\nint front = -1, rear = -1;\n\nvoid insertFront(int val) {\n    if ((front == 0 && rear == MAX-1) || (front == rear+1)) return;\n    if (front == -1) { front = 0; rear = 0; }\n    else if (front == 0) front = MAX - 1;\n    else front = front - 1;\n    arr[front] = val;\n}\n\nint main() {\n    insertFront(42);\n    printf(\"Inserted 42 at front\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "binary-tree": {
        "id": "binary-tree",
        "title": "Binary Tree",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🌳",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "A Binary Tree is a non-linear data structure where each node has at most two children.",
            "whatIsIt": "Nodes contain data, a pointer to left child, and a pointer to right child.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Define Node structure",
                    "description": "struct Node { int data; struct Node* left; struct Node* right; };"
                },
                {
                    "step": 2,
                    "title": "Recursive allocation",
                    "description": "Allocate left and right nodes recursively."
                }
            ],
            "keyTerms": [
                {
                    "term": "Root",
                    "definition": "The top node of the tree."
                },
                {
                    "term": "Leaf Node",
                    "definition": "Node with no children (left and right pointers are NULL)."
                }
            ],
            "realWorldExample": "Organization charts (CEO -> VPs -> Directors) or family tree lineages.",
            "timeComplexity": "O(n) traversal",
            "spaceComplexity": "O(n)",
            "whenToUse": "Representing hierarchical relationships.",
            "commonMistakes": [
                "Losing node pointers during tree manipulations, causing memory leaks."
            ],
            "diagramType": "binary-tree"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the maximum number of children a binary tree node can have?",
                "options": [
                    "A) 1",
                    "B) 2",
                    "C) 3",
                    "D) Unlimited"
                ],
                "correct": 1,
                "explanation": "A binary tree node is restricted to a maximum of 2 children (left and right)."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the basic structure of a binary tree node in C?",
                "options": [
                    "A) int data, char* left, char* right",
                    "B) int data, int left, int right",
                    "C) int data, char left, char right",
                    "D) int data, int left, int right, int middle"
                ],
                "correct": 1,
                "explanation": "A binary tree node typically contains an integer value, a pointer to the left child, and a pointer to the right child."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How do you traverse a binary tree in C?",
                "options": [
                    "A) Using a stack to store nodes to visit",
                    "B) Using a queue to store nodes to visit",
                    "C) Recursively visiting each node",
                    "D) All of the above"
                ],
                "correct": 3,
                "explanation": "There are multiple ways to traverse a binary tree, including using a stack, a queue, or recursion."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What is the time complexity of inserting a node into a binary search tree in C?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n log n)"
                ],
                "correct": 2,
                "explanation": "The time complexity of inserting a node into a binary search tree is O(log n) on average, assuming the tree is balanced."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the purpose of a binary tree in C?",
                "options": [
                    "A) To store a list of items",
                    "B) To represent a file system",
                    "C) To implement a search algorithm",
                    "D) To represent a hierarchical data structure"
                ],
                "correct": 3,
                "explanation": "A binary tree is a data structure that can be used to represent a hierarchical relationship between items, making it useful for implementing search algorithms and other applications."
            }
        ],
        "logicHints": {
            "approach": "Define struct Node with left and right children. Create helper to construct nodes.",
            "keySteps": [
                "struct Node with left and right pointers",
                "Write createNode() returning allocated struct"
            ],
            "pseudocode": "STRUCT Node:\n  data: Integer\n  left: Pointer to Node\n  right: Pointer to Node"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node* left;\n    struct Node* right;\n};\n\nstruct Node* createNode(int val) {\n    struct Node* n = malloc(sizeof(struct Node));\n    n->data = val;\n    n->left = NULL;\n    n->right = NULL;\n    return n;\n}\n\nint main() {\n    struct Node* root = createNode(1);\n    root->left = createNode(2);\n    root->right = createNode(3);\n    printf(\"Root: %d, Left: %d, Right: %d\\n\", root->data, root->left->data, root->right->data);\n    free(root->left);\n    free(root->right);\n    free(root);\n    return 0;\n}\n",
        "flowDiagramType": "binary-tree"
    },
    "bst-operations": {
        "id": "bst-operations",
        "title": "Binary Search Tree (BST)",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🌳",
        "estimatedTime": "18 min",
        "concept": {
            "summary": "A Binary Search Tree orders nodes such that left values are smaller than parent, and right values are larger.",
            "whatIsIt": "This key property enables binary search speeds for dynamic insertions and lookups.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Insert rules",
                    "description": "If val < root->data, recurse left. If val > root->data, recurse right."
                }
            ],
            "keyTerms": [
                {
                    "term": "BST Property",
                    "definition": "Left subtree < Root < Right subtree."
                }
            ],
            "realWorldExample": "Maintaining an ordered list of items that changes frequently (database index directories).",
            "timeComplexity": {
                "best": "O(log n) search",
                "average": "O(log n) search",
                "worst": "O(n) search (skewed tree)"
            },
            "spaceComplexity": "O(n)",
            "whenToUse": "Dynamic sorting and quick searching applications.",
            "commonMistakes": [
                "Not returning the updated node pointer in insertion/deletion recursions."
            ],
            "diagramType": "binary-tree"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "hard",
                "question": "What is the worst-case search time complexity in a skewed Binary Search Tree?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n log n)"
                ],
                "correct": 2,
                "explanation": "If a BST becomes skewed (like a linked list), searching behaves like linear search, resulting in O(n) worst-case time."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary property that enables efficient search in a Binary Search Tree?",
                "options": [
                    "A) All nodes have the same value",
                    "B) Each node has two children",
                    "C) All values in the left subtree are less than the root, and all values in the right subtree are greater",
                    "D) The tree is always balanced"
                ],
                "correct": 2,
                "explanation": "The key property of a BST is that all values in the left subtree are less than the root, and all values in the right subtree are greater, allowing for efficient search."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How would you insert the value 10 into a Binary Search Tree with the following structure: root = 5, left = 2, right = 8?",
                "options": [
                    "A) Create a new node with value 10 and make it the left child of the root",
                    "B) Create a new node with value 10 and make it the right child of the root",
                    "C) Create a new node with value 10 and make it the right child of the node with value 8",
                    "D) Create a new node with value 10 and make it the left child of the node with value 8"
                ],
                "correct": 2,
                "explanation": "To insert 10 into the given BST, we would create a new node with value 10 and make it the right child of the root, since 10 is greater than the root's value."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What is the time complexity of inserting a node into a Binary Search Tree, assuming the tree is self-balancing?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(log n) amortized"
                ],
                "correct": 3,
                "explanation": "When inserting a node into a self-balancing BST, the tree may need to rebalance itself, resulting in a time complexity of O(log n) amortized, since the tree's height remains relatively constant."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the purpose of a tree traversal in a Binary Search Tree?",
                "options": [
                    "A) To insert a new node into the tree",
                    "B) To delete a node from the tree",
                    "C) To search for a specific value in the tree",
                    "D) To visit each node in the tree in a specific order"
                ],
                "correct": 3,
                "explanation": "Tree traversal is used to visit each node in the tree in a specific order, such as inorder, preorder, or postorder, allowing us to perform operations like searching, inserting, or deleting nodes."
            }
        ],
        "logicHints": {
            "approach": "Recursively search the correct side (left or right) to insert or search.",
            "keySteps": [
                "Insert: root->left = insert(root->left, val) if val < root->data"
            ],
            "pseudocode": "FUNCTION insert(root, val):\n  IF root == NULL: RETURN Node(val)\n  IF val < root.data: root.left = insert(root.left, val)\n  ELSE: root.right = insert(root.right, val)\n  RETURN root"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left, *right;\n};\n\nstruct Node* insert(struct Node* node, int data) {\n    if (node == NULL) {\n        struct Node* temp = malloc(sizeof(struct Node));\n        temp->data = data;\n        temp->left = temp->right = NULL;\n        return temp;\n    }\n    if (data < node->data) node->left = insert(node->left, data);\n    else node->right = insert(node->right, data);\n    return node;\n}\n\nint main() {\n    struct Node* root = NULL;\n    root = insert(root, 50);\n    insert(root, 30);\n    printf(\"Root: %d, Left child: %d\\n\", root->data, root->left->data);\n    free(root->left);\n    free(root);\n    return 0;\n}\n",
        "flowDiagramType": "binary-tree"
    },
    "tree-traversals": {
        "id": "tree-traversals",
        "title": "Tree Traversals",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🌀",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "Traverse a binary tree recursively in Pre-order, In-order, or Post-order.",
            "whatIsIt": "Determines the visiting sequence of nodes. In-order traversal of a BST prints elements in sorted order.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "In-order",
                    "description": "Left, Root, Right."
                },
                {
                    "step": 2,
                    "title": "Pre-order",
                    "description": "Root, Left, Right."
                },
                {
                    "step": 3,
                    "title": "Post-order",
                    "description": "Left, Right, Root."
                }
            ],
            "keyTerms": [
                {
                    "term": "In-order",
                    "definition": "Left -> Root -> Right."
                }
            ],
            "realWorldExample": "Converting mathematical ASTs into postfix/infix outputs.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(n) recursion stack",
            "whenToUse": "Evaluating/copying trees and sorting.",
            "commonMistakes": [
                "Missing NULL checks as base cases in recursion."
            ],
            "diagramType": "binary-tree"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Which traversal prints a BST in ascending sorted order?",
                "options": [
                    "A) Pre-order",
                    "B) In-order",
                    "C) Post-order",
                    "D) Level-order"
                ],
                "correct": 1,
                "explanation": "In-order traversal visits nodes in (Left subtree, Root, Right subtree) sequence, which aligns ascending values in a BST."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the order of node visitation in a Pre-order traversal of a Binary Tree?",
                "options": [
                    "A) Left subtree, Root, Right subtree",
                    "B) Root, Left subtree, Right subtree",
                    "C) Right subtree, Root, Left subtree",
                    "D) Root, Right subtree, Left subtree"
                ],
                "correct": 1,
                "explanation": "Pre-order traversal visits the root node first, followed by the left subtree and then the right subtree."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider a Binary Tree with the following structure: \n\n     1\n   /   \\ \n  2     3\n / \\   / \\\n4   5 6   7\n\nWhat is the order of node visitation in an In-order traversal of this tree?",
                "options": [
                    "A) 4, 2, 5, 1, 6, 3, 7",
                    "B) 4, 2, 1, 5, 3, 6, 7",
                    "C) 4, 2, 1, 3, 5, 6, 7",
                    "D) 4, 5, 2, 1, 6, 3, 7"
                ],
                "correct": 2,
                "explanation": "In-order traversal visits the left subtree, the root node, and then the right subtree. In this case, the order is 4, 2, 1, 5, 3, 6, 7."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Design a function to perform a Post-order traversal of a Binary Tree, and explain the time and space complexity of your solution.",
                "options": [
                    "A) Recursive function with O(n) time complexity and O(h) space complexity",
                    "B) Iterative function with O(n) time complexity and O(n) space complexity",
                    "C) Recursive function with O(n) time complexity and O(n) space complexity",
                    "D) Iterative function with O(n) time complexity and O(h) space complexity"
                ],
                "correct": 1,
                "explanation": "A recursive function can be used to perform a Post-order traversal with O(n) time complexity and O(h) space complexity, where h is the height of the tree."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the primary difference between a Pre-order and a Post-order traversal of a Binary Tree?",
                "options": [
                    "A) The order of visitation of the left and right subtrees",
                    "B) The order of visitation of the root node and its subtrees",
                    "C) The use of recursion vs iteration",
                    "D) The time complexity of the traversal"
                ],
                "correct": 1,
                "explanation": "The primary difference between a Pre-order and a Post-order traversal is the order of visitation of the left and right subtrees. In Pre-order, the root is visited first, while in Post-order, the root is visited last."
            }
        ],
        "logicHints": {
            "approach": "Implement recursive functions following traversal orders.",
            "keySteps": [
                "Inorder: print(left); print(root); print(right)"
            ],
            "pseudocode": "FUNCTION inorder(root):\n  IF root == NULL: RETURN\n  inorder(root.left)\n  PRINT root.data\n  inorder(root.right)"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *left, *right;\n};\n\nvoid inorder(struct Node* root) {\n    if (root == NULL) return;\n    inorder(root->left);\n    printf(\"%d \", root->data);\n    inorder(root->right);\n}\n\nint main() {\n    // Traverse dummy tree\n    return 0;\n}\n",
        "flowDiagramType": "binary-tree"
    },
    "tree-height": {
        "id": "tree-height",
        "title": "Tree Height",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🌳",
        "estimatedTime": "10 min",
        "concept": {
            "summary": "Find the height (maximum path length from root to leaf) of a binary tree.",
            "whatIsIt": "Recursively calculates height as 1 + max(leftHeight, rightHeight).",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Recurse",
                    "description": "Get height of left and right subtrees. Return max + 1."
                }
            ],
            "keyTerms": [
                {
                    "term": "Height",
                    "definition": "Max depth of tree."
                }
            ],
            "realWorldExample": "Calculating tree depth for self-balancing AVL indexes.",
            "timeComplexity": "O(n)",
            "spaceComplexity": "O(n)",
            "whenToUse": "Evaluating tree balance.",
            "commonMistakes": [
                "Incorrect base case: returning 0 instead of -1 for empty trees in edge cases depending on definition."
            ],
            "diagramType": "binary-tree"
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "easy",
                "question": "What is the height of a single root node tree (by edge definition)?",
                "options": [
                    "A) 0",
                    "B) 1",
                    "C) 2",
                    "D) -1"
                ],
                "correct": 0,
                "explanation": "By edge definition, height is the number of edges. A single root has 0 edges to any leaf."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the height of a tree with two child nodes, each having no children of their own?",
                "options": [
                    "A) 0",
                    "B) 1",
                    "C) 2",
                    "D) 3"
                ],
                "correct": 1,
                "explanation": "The height is 1 because we count the edge from the root to the child nodes."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider a binary tree with the following structure: root -> left -> left -> right. What is the height of this tree?",
                "options": [
                    "A) 2",
                    "B) 3",
                    "C) 4",
                    "D) 5"
                ],
                "correct": 3,
                "explanation": "We count the edges from the root to the left child, then to the left child's left child, and finally to the right child. This gives us a total of 3 edges."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Write a recursive function to calculate the height of a binary tree. Assume the tree is represented by a struct with left and right child pointers.",
                "options": [
                    "A) int height(struct Node *node) { return 1 + max(height(node->left), height(node->right)); }",
                    "B) int height(struct Node *node) { return 0 + max(height(node->left), height(node->right)); }",
                    "C) int height(struct Node *node) { return 1 + min(height(node->left), height(node->right)); }",
                    "D) int height(struct Node *node) { return 0 + min(height(node->left), height(node->right)); }"
                ],
                "correct": 0,
                "explanation": "This function correctly calculates the height by recursively calling itself on the left and right subtrees and taking the maximum of the two heights plus one."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the height of a tree with a root node and a left child node, but the left child has a left child of its own?",
                "options": [
                    "A) 1",
                    "B) 2",
                    "C) 3",
                    "D) 4"
                ],
                "correct": 2,
                "explanation": "We count the edge from the root to the left child, and then the edge from the left child to its left child. This gives us a total of 2 edges."
            }
        ],
        "logicHints": {
            "approach": "Find max depth recursively.",
            "keySteps": [
                "Height = max(height(left), height(right)) + 1"
            ],
            "pseudocode": "FUNCTION height(root):\n  IF root == NULL: RETURN -1\n  RETURN max(height(root.left), height(root.right)) + 1"
        },
        "referenceSolution": "#include <stdio.h>\n\nstruct Node {\n    int data;\n    struct Node *left, *right;\n};\n\nint height(struct Node* node) {\n    if (node == NULL) return -1;\n    int lh = height(node->left);\n    int rh = height(node->right);\n    return (lh > rh ? lh : rh) + 1;\n}\n\nint main() {\n    return 0;\n}\n",
        "flowDiagramType": "binary-tree"
    },
    "graph-adjacency-matrix": {
        "id": "graph-adjacency-matrix",
        "title": "Adjacency Matrix",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🏁",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "Represent a graph using a 2D array matrix.",
            "whatIsIt": "A 2D array of size V x V (where V is vertices count). mat[i][j] = 1 indicates an edge exists from i to j.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Build matrix",
                    "description": "Declare int adj[V][V] initialized to 0."
                },
                {
                    "step": 2,
                    "title": "Add edges",
                    "description": "Set adj[u][v] = 1; (and adj[v][u] = 1 for undirected graph)."
                }
            ],
            "keyTerms": [
                {
                    "term": "Adjacency Matrix",
                    "definition": "V x V binary matrix representing edge networks."
                }
            ],
            "realWorldExample": "Social network graph showing direct friend pairings.",
            "timeComplexity": "O(1) edge check",
            "spaceComplexity": "O(V²)",
            "whenToUse": "Dense graphs with many edges.",
            "commonMistakes": [
                "Wasting memory on sparse graphs."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the space complexity of an adjacency matrix for V vertices?",
                "options": [
                    "A) O(V)",
                    "B) O(E)",
                    "C) O(V²)",
                    "D) O(V + E)"
                ],
                "correct": 2,
                "explanation": "An adjacency matrix stores a V x V grid, occupying O(V²) space regardless of edge counts."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What does mat[i][j] = 1 indicate in an adjacency matrix?",
                "options": [
                    "A) There are no edges between vertices i and j",
                    "B) There is an edge from i to j",
                    "C) There is an edge from j to i",
                    "D) The edge weight between i and j is 1"
                ],
                "correct": 1,
                "explanation": "An adjacency matrix stores 1 in mat[i][j] to indicate an edge from i to j."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How do you represent an undirected graph using an adjacency matrix?",
                "options": [
                    "A) mat[i][j] = 1 and mat[j][i] = 1 for all edges",
                    "B) mat[i][j] = 1 for all edges, regardless of direction",
                    "C) mat[i][j] = 1 only for edges from i to j",
                    "D) mat[i][j] = 1 only for edges from j to i"
                ],
                "correct": 0,
                "explanation": "For an undirected graph, an adjacency matrix stores 1 in both mat[i][j] and mat[j][i] for each edge."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What is the time complexity of checking if there is an edge between two vertices i and j using an adjacency matrix?",
                "options": [
                    "A) O(V)",
                    "B) O(E)",
                    "C) O(1)",
                    "D) O(V + E)"
                ],
                "correct": 2,
                "explanation": "Since an adjacency matrix stores the adjacency information in a 2D array, checking if there is an edge between two vertices i and j can be done in constant time O(1) by accessing mat[i][j]."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the main disadvantage of using an adjacency matrix for sparse graphs?",
                "options": [
                    "A) High time complexity for edge insertion",
                    "B) High space complexity for large graphs",
                    "C) Low time complexity for edge traversal",
                    "D) High time complexity for edge deletion"
                ],
                "correct": 1,
                "explanation": "An adjacency matrix stores a V x V grid, which can be wasteful for sparse graphs with a small number of edges. This results in high space complexity for large graphs."
            }
        ],
        "logicHints": {
            "approach": "Create a V x V grid initialized to 0, write an addEdge function to set indices to 1.",
            "keySteps": [
                "adj[u][v] = 1"
            ],
            "pseudocode": "FUNCTION addEdge(u, v):\n  adj[u][v] = 1\n  adj[v][u] = 1"
        },
        "referenceSolution": "#include <stdio.h>\n#define V 4\n\nvoid init(int arr[][V]) {\n    for (int i = 0; i < V; i++)\n        for (int j = 0; j < V; j++)\n            arr[i][j] = 0;\n}\n\nint main() {\n    int adj[V][V];\n    init(adj);\n    adj[0][1] = 1;\n    adj[1][0] = 1; /* Undirected */\n    printf(\"Adjacency Matrix Edge [0][1]: %d\\n\", adj[0][1]);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "graph-bfs": {
        "id": "graph-bfs",
        "title": "Breadth First Search (BFS)",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🔍",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "Traverse a graph level by level from a source node using a queue.",
            "whatIsIt": "Explores neighbors first before moving to deeper layers.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Use queue and visited list",
                    "description": "Enqueue source, mark visited."
                },
                {
                    "step": 2,
                    "title": "Loop",
                    "description": "Dequeue node, print, enqueue all its unvisited neighbors, marking them visited."
                }
            ],
            "keyTerms": [
                {
                    "term": "BFS Queue",
                    "definition": "Stores active nodes to expand."
                }
            ],
            "realWorldExample": "GPS maps finding shortest route (hop count) to nearby locations.",
            "timeComplexity": "O(V + E)",
            "spaceComplexity": "O(V)",
            "whenToUse": "Finding shortest paths in unweighted graphs.",
            "commonMistakes": [
                "Not marking nodes visited when enqueuing, causing infinite loops."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Which data structure is essential for BFS traversal?",
                "options": [
                    "A) Stack",
                    "B) Queue",
                    "C) Tree",
                    "D) Heap"
                ],
                "correct": 1,
                "explanation": "BFS uses a Queue to maintain FIFO order, ensuring level-by-level traversal."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary purpose of using a Queue in BFS?",
                "options": [
                    "A) To store visited nodes",
                    "B) To maintain level-by-level traversal",
                    "C) To find the shortest path",
                    "D) To detect cycles"
                ],
                "correct": 1,
                "explanation": "A Queue is used to maintain level-by-level traversal, ensuring that all nodes at a given level are visited before moving to the next level."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider a graph with multiple connected components. How would you modify the BFS algorithm to visit all components?",
                "options": [
                    "A) Use a Stack to traverse each component separately",
                    "B) Use a Queue to traverse each component separately",
                    "C) Use a recursive approach to visit all components",
                    "D) Use a BFS traversal on the entire graph"
                ],
                "correct": 2,
                "explanation": "To visit all components, you would need to use a Queue to traverse each component separately, ensuring that all nodes in a component are visited before moving to the next component."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Suppose you are given a graph with weighted edges and you want to use BFS to find the shortest path between two nodes. What would be the most efficient way to implement this?",
                "options": [
                    "A) Use a standard Queue and update distances as you traverse",
                    "B) Use a priority Queue to prioritize nodes based on their distance",
                    "C) Use a recursive approach with memoization to avoid redundant calculations",
                    "D) Use Dijkstra's algorithm, which is a variant of BFS"
                ],
                "correct": 2,
                "explanation": "To find the shortest path in a weighted graph, you would need to use a priority Queue to prioritize nodes based on their distance, ensuring that the node with the shortest distance is visited first."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What would happen if you used a Stack instead of a Queue for BFS traversal?",
                "options": [
                    "A) The algorithm would still work correctly",
                    "B) The algorithm would visit nodes in a different order, but still correctly",
                    "C) The algorithm would get stuck in an infinite loop",
                    "D) The algorithm would visit nodes in a different order and potentially miss some nodes"
                ],
                "correct": 3,
                "explanation": "If you used a Stack instead of a Queue for BFS traversal, the algorithm would visit nodes in a different order and potentially miss some nodes, as the Stack follows a LIFO order instead of FIFO."
            }
        ],
        "logicHints": {
            "approach": "Enqueue root, mark visited. While queue is not empty, pop and add unvisited neighbors.",
            "keySteps": [
                "Initialize queue and visited array"
            ],
            "pseudocode": "BFS(source):\n  PUSH source to Queue, MARK visited\n  WHILE Queue not empty:\n    curr = DEQUEUE\n    FOR each neighbor n of curr:\n      IF n unvisited: PUSH n to Queue, MARK visited"
        },
        "referenceSolution": "#include <stdio.h>\n#define V 4\n\nvoid bfs(int adj[V][V], int start) {\n    int visited[V] = {0};\n    int q[V], f = 0, r = -1;\n    q[++r] = start;\n    visited[start] = 1;\n    while (f <= r) {\n        int curr = q[f++];\n        printf(\"%d \", curr);\n        for (int i = 0; i < V; i++) {\n            if (adj[curr][i] && !visited[i]) {\n                q[++r] = i;\n                visited[i] = 1;\n            }\n        }\n    }\n    printf(\"\\n\");\n}\n\nint main() {\n    int adj[V][V] = {{0,1,1,0},{1,0,0,1},{1,0,0,0},{0,1,0,0}};\n    bfs(adj, 0);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "graph-dfs": {
        "id": "graph-dfs",
        "title": "Depth First Search (DFS)",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🔍",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "Traverse a graph depth-wise along branches recursively using a stack.",
            "whatIsIt": "Explores as far as possible down each branch before backtracking.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Visit and Recurse",
                    "description": "Mark current node visited. For each unvisited neighbor, call DFS recursively."
                }
            ],
            "keyTerms": [
                {
                    "term": "Backtracking",
                    "definition": "Returning to previous nodes when a branch ends."
                }
            ],
            "realWorldExample": "Solving a maze by walking down paths and backtracking from dead ends.",
            "timeComplexity": "O(V + E)",
            "spaceComplexity": "O(V) recursion stack",
            "whenToUse": "Detecting cycles, finding connected components, solving mazes.",
            "commonMistakes": [
                "Stack overflow on extremely deep graphs if recursion depth exceeds compiler limits."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "Which strategy does DFS use?",
                "options": [
                    "A) FIFO",
                    "B) LIFO (recursion/stack)",
                    "C) Greedy",
                    "D) Random walk"
                ],
                "correct": 1,
                "explanation": "DFS uses LIFO (via call stack recursion) to explore paths to their absolute depth first."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary purpose of using a stack in DFS?",
                "options": [
                    "A) To keep track of visited nodes",
                    "B) To store the current path being explored",
                    "C) To implement a queue data structure",
                    "D) To handle memory allocation"
                ],
                "correct": 1,
                "explanation": "A stack is used in DFS to keep track of visited nodes, preventing infinite loops and ensuring that each node is visited only once."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "How does DFS handle cycles in a graph?",
                "options": [
                    "A) It detects cycles and stops the traversal",
                    "B) It ignores cycles and continues the traversal",
                    "C) It uses a separate data structure to keep track of visited nodes and edges",
                    "D) It uses a recursive approach to handle cycles"
                ],
                "correct": 3,
                "explanation": "DFS uses a separate data structure, such as a set or a stack, to keep track of visited nodes and edges, allowing it to detect and handle cycles in a graph."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What is the time complexity of DFS on a graph with n nodes and m edges, assuming that the graph is represented as an adjacency list?",
                "options": [
                    "A) O(n + m)",
                    "B) O(n * m)",
                    "C) O(n + m * log n)",
                    "D) O(m * log n)"
                ],
                "correct": 0,
                "explanation": "The time complexity of DFS on a graph with n nodes and m edges is O(n + m), since each node and edge is visited once."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the difference between DFS and BFS traversal orders?",
                "options": [
                    "A) DFS explores nodes in a breadth-first manner, while BFS explores nodes in a depth-first manner",
                    "B) DFS explores nodes in a depth-first manner, while BFS explores nodes in a breadth-first manner",
                    "C) DFS explores nodes in a random order, while BFS explores nodes in a sequential order",
                    "D) DFS explores nodes in a sequential order, while BFS explores nodes in a random order"
                ],
                "correct": 1,
                "explanation": "DFS explores nodes in a depth-first manner, while BFS explores nodes in a breadth-first manner, meaning that DFS goes as far as possible along each branch before backtracking, while BFS explores all nodes at a given depth before moving on to the next depth level."
            }
        ],
        "logicHints": {
            "approach": "Visit node, mark visited, loop neighbors and recurse.",
            "keySteps": [
                "DFS recursion function"
            ],
            "pseudocode": "DFS(curr):\n  MARK curr visited\n  PRINT curr\n  FOR each neighbor n of curr:\n    IF n unvisited: DFS(n)"
        },
        "referenceSolution": "#include <stdio.h>\n#define V 4\n\nint visited[V] = {0};\n\nvoid dfs(int adj[V][V], int curr) {\n    visited[curr] = 1;\n    printf(\"%d \", curr);\n    for (int i = 0; i < V; i++) {\n        if (adj[curr][i] && !visited[i]) {\n            dfs(adj, i);\n        }\n    }\n}\n\nint main() {\n    int adj[V][V] = {{0,1,1,0},{1,0,0,1},{1,0,0,0},{0,1,0,0}};\n    dfs(adj, 0);\n    printf(\"\\n\");\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "hash-table-chaining": {
        "id": "hash-table-chaining",
        "title": "Hash Table (Chaining)",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🔑",
        "estimatedTime": "15 min",
        "concept": {
            "summary": "A hash table storing key-value pairs, resolving collisions by linking collided keys into a linked list at each index (chaining).",
            "whatIsIt": "Uses a hash function to map keys to indices. If two keys hash to the same index, they are appended to a singly linked list at that index.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Hash function",
                    "description": "index = key % table_size;"
                },
                {
                    "step": 2,
                    "title": "Chain node",
                    "description": "Insert newNode at head of linked list located at table[index]."
                }
            ],
            "keyTerms": [
                {
                    "term": "Collision",
                    "definition": "When different keys produce the same hash index."
                },
                {
                    "term": "Chaining",
                    "definition": "Resolving collisions by storing elements in a linked list bucket."
                }
            ],
            "realWorldExample": "Sorting files alphabetically into folders. Folder \"A\" contains a list of all files starting with \"A\".",
            "timeComplexity": {
                "best": "O(1) search",
                "average": "O(1) search",
                "worst": "O(n) search (all items in one bucket)"
            },
            "spaceComplexity": "O(V + E)",
            "whenToUse": "Fast dictionary/indexing tables.",
            "commonMistakes": [
                "Bad hash function distributing all elements to a single index."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is the worst-case search complexity in a chained hash table containing n keys?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n²)"
                ],
                "correct": 2,
                "explanation": "If all n elements hash to the same bucket (collision), the table degrades to a linked list of length n, yielding O(n) search."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What is the primary purpose of a hash function in a chained hash table?",
                "options": [
                    "A) To sort the keys in ascending order",
                    "B) To map keys to indices",
                    "C) To find the maximum key in the table",
                    "D) To delete duplicate keys"
                ],
                "correct": 1,
                "explanation": "A hash function maps keys to indices, allowing for efficient key-value lookups."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Consider a chained hash table with 5 buckets. If 3 keys hash to the same index, what is the maximum number of collisions that can occur in the table?",
                "options": [
                    "A) 2",
                    "B) 3",
                    "C) 4",
                    "D) 5"
                ],
                "correct": 3,
                "explanation": "Since there are 5 buckets and 3 keys hash to the same index, the maximum number of collisions is 4 (3 keys in one bucket and 1 key in each of the other 4 buckets)."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "Design a function to insert a new key-value pair into a chained hash table. Assume the table is implemented as an array of linked lists, where each linked list represents a bucket.",
                "options": [
                    "A) void insert(HashTable* table, int key, char* value) { ... }",
                    "B) int insert(HashTable* table, int key, char* value) { ... }",
                    "C) void insert(HashTable* table, int key, char* value) { ... }",
                    "D) char* insert(HashTable* table, int key, char* value) { ... }"
                ],
                "correct": 2,
                "explanation": "The function should return an integer indicating the status of the insertion operation (e.g., 1 for success, 0 for failure)."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "What is the time complexity of inserting a new key-value pair into a chained hash table, assuming the hash function is well-distributed?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(1) amortized"
                ],
                "correct": 3,
                "explanation": "In the worst case, the table may degrade to a linked list, resulting in O(n) time complexity. However, with a well-distributed hash function, the average time complexity is O(1)."
            }
        ],
        "logicHints": {
            "approach": "Create array of Node pointers. Compute index using key % tableSize. Insert node.",
            "keySteps": [
                "array of struct Node* heads",
                "Insert at chain head"
            ],
            "pseudocode": "FUNCTION insert(key):\n  idx = hash(key)\n  insertAtHead(table[idx], key)"
        },
        "referenceSolution": "#include <stdio.h>\n#include <stdlib.h>\n#define SIZE 7\n\nstruct Node {\n    int key;\n    struct Node* next;\n};\nstruct Node* table[SIZE];\n\nvoid insert(int key) {\n    int idx = key % SIZE;\n    struct Node* temp = malloc(sizeof(struct Node));\n    temp->key = key;\n    temp->next = table[idx];\n    table[idx] = temp;\n}\n\nint main() {\n    insert(10);\n    insert(17); /* Collision: 10%7=3, 17%7=3 */\n    printf(\"Indices initialized\\n\");\n    free(table[3]->next);\n    free(table[3]);\n    return 0;\n}\n",
        "flowDiagramType": null
    },
    "hash-linear-probing": {
        "id": "hash-linear-probing",
        "title": "Hash Table (Linear Probing)",
        "category": "Data Structures",
        "level": "advanced",
        "levelNum": 5,
        "icon": "🔑",
        "estimatedTime": "12 min",
        "concept": {
            "summary": "An open-addressing hash table resolving collisions by probing sequential array positions (index + 1) % SIZE.",
            "whatIsIt": "If slot index is taken, check index+1, index+2, and so on until an empty slot is found.",
            "howItWorks": [
                {
                    "step": 1,
                    "title": "Probing",
                    "description": "index = (hash(key) + i) % SIZE until empty slot found."
                }
            ],
            "keyTerms": [
                {
                    "term": "Linear Probing",
                    "definition": "Probing consecutive array indices."
                }
            ],
            "realWorldExample": "Finding a parking space by parking in the first open spot next to your preferred location.",
            "timeComplexity": "O(1) average lookup",
            "spaceComplexity": "O(SIZE)",
            "whenToUse": "Small table sizes without dynamic allocations.",
            "commonMistakes": [
                "Infinite loops when table is full and no empty slot exists."
            ],
            "diagramType": null
        },
        "quiz": [
            {
                "id": 1,
                "difficulty": "medium",
                "question": "What is clustering in linear probing?",
                "options": [
                    "A) Good hash distribution",
                    "B) Consecutive occupied slots slowing down operations",
                    "C) Resizing array",
                    "D) None"
                ],
                "correct": 1,
                "explanation": "Linear probing creates clusters of adjacent occupied slots, which increases search times for subsequent insertions."
            },
            {
                "id": 2,
                "difficulty": "easy",
                "question": "What happens when a hash table uses linear probing and the slot index is taken?",
                "options": [
                    "A) The program crashes",
                    "B) The hash function is recalculated",
                    "C) The next slot is checked",
                    "D) The table is resized"
                ],
                "correct": 2,
                "explanation": "When a slot index is taken, linear probing checks the next slot by incrementing the index."
            },
            {
                "id": 3,
                "difficulty": "medium",
                "question": "Why is linear probing less efficient than other collision resolution techniques?",
                "options": [
                    "A) It uses more memory",
                    "B) It has a higher time complexity",
                    "C) It creates clusters of occupied slots",
                    "D) It is not suitable for large datasets"
                ],
                "correct": 2,
                "explanation": "Linear probing creates clusters of occupied slots, which can slow down search and insertion operations."
            },
            {
                "id": 4,
                "difficulty": "hard",
                "question": "What is the time complexity of searching for an element in a hash table using linear probing, assuming a uniform hash distribution?",
                "options": [
                    "A) O(1)",
                    "B) O(log n)",
                    "C) O(n)",
                    "D) O(n/m) where m is the load factor"
                ],
                "correct": 3,
                "explanation": "The time complexity of searching for an element in a hash table using linear probing is O(n), where n is the number of elements in the table, assuming a uniform hash distribution."
            },
            {
                "id": 5,
                "difficulty": "medium",
                "question": "How does linear probing handle collisions when the load factor is high?",
                "options": [
                    "A) It resizes the table",
                    "B) It uses a different hash function",
                    "C) It checks the next slot in the sequence",
                    "D) It uses a different collision resolution technique"
                ],
                "correct": 2,
                "explanation": "When the load factor is high, linear probing checks the next slot in the sequence to handle collisions."
            }
        ],
        "logicHints": {
            "approach": "Wrap index around using % SIZE during linear probes.",
            "keySteps": [
                "Find empty slot: (idx + i) % SIZE"
            ],
            "pseudocode": "FUNCTION insert(key):\n  i = 0\n  WHILE table[(hash(key) + i) % SIZE] is occupied:\n    i = i + 1\n  table[(hash(key) + i) % SIZE] = key"
        },
        "referenceSolution": "#include <stdio.h>\n#define SIZE 5\n\nint tbl[SIZE] = {-1, -1, -1, -1, -1};\n\nvoid ins(int key) {\n    int idx = key % SIZE;\n    int i = 0;\n    while (tbl[(idx + i) % SIZE] != -1 && i < SIZE) {\n        i++;\n    }\n    if (i < SIZE) tbl[(idx + i) % SIZE] = key;\n}\n\nint main() {\n    ins(5);\n    ins(10);\n    printf(\"Probed array: %d, %d\\n\", tbl[0], tbl[1]);\n    return 0;\n}\n",
        "flowDiagramType": null
    }
};

export const TUTOR_LEVELS = {
    "1": {
        "name": "Basics & Arithmetic",
        "color": "#10b981",
        "tag": "beginner",
        "description": "Core C syntax — variables, operators, simple conditionals"
    },
    "2": {
        "name": "Loops & Math Logic",
        "color": "#0ea5e9",
        "tag": "beginner",
        "description": "Nested loops, triangle patterns, basic math logic"
    },
    "3": {
        "name": "Modular & Memory",
        "color": "#f59e0b",
        "tag": "intermediate",
        "description": "Functions, arrays, strings, and pointer basics"
    },
    "4": {
        "name": "Algorithms & Recursion",
        "color": "#6366f1",
        "tag": "intermediate",
        "description": "Recursion, sorting, and searching algorithms"
    },
    "5": {
        "name": "Data Structures",
        "color": "#8b5cf6",
        "tag": "advanced",
        "description": "Linked lists, stacks, queues, trees, graphs, and hashes"
    }
};

export const TUTOR_CATEGORIES = [
    "Basics & Arithmetic",
    "Loops & Math Logic",
    "Modular & Memory",
    "Algorithms & Recursion",
    "Data Structures"
];
