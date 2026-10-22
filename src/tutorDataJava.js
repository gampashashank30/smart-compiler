/**
 * Java AI Tutor Curriculum Data
 *
 * Comprehensive curriculum across 5 levels strictly ordered by levelNum.
 * Each topic includes rich conceptual explanations, executable Main class solutions,
 * interactive multi-choice quizzes, and coding tasks.
 */

export const JAVA_LEVELS = {
  "1": {
    "name": "Java Fundamentals",
    "color": "#10b981",
    "tag": "beginner",
    "description": "Core syntax, main() method, JVM basics, primitive data types, and operators"
  },
  "2": {
    "name": "Control Flow & Methods",
    "color": "#0ea5e9",
    "tag": "beginner",
    "description": "Switch statements, for/while loops, loop control, and static methods"
  },
  "3": {
    "name": "Arrays & Strings",
    "color": "#f59e0b",
    "tag": "intermediate",
    "description": "1D and 2D arrays, string immutability, methods, and StringBuilder"
  },
  "4": {
    "name": "Object-Oriented Java",
    "color": "#6366f1",
    "tag": "intermediate",
    "description": "Classes, constructors, encapsulation, inheritance, polymorphism, and interfaces"
  },
  "5": {
    "name": "Collections & Robustness",
    "color": "#8b5cf6",
    "tag": "advanced",
    "description": "Exceptions (try-catch), ArrayList, HashMap collections, and recursion"
  }
};

export const JAVA_CATEGORIES = [
  "Basics & JVM",
  "Variables & Types",
  "Operations",
  "Control Flow",
  "Iteration",
  "Methods & Modularity",
  "Data Structures",
  "Strings",
  "Object-Oriented Programming",
  "Robustness & Error Handling",
  "Collections Framework",
  "Algorithms"
];

export const JAVA_CURRICULUM = {
  "java-hello-world": {
    "id": "java-hello-world",
    "title": "Hello World & main() Method",
    "category": "Basics & JVM",
    "level": "beginner",
    "levelNum": 1,
    "estimatedTime": "5 min",
    "icon": "☕",
    "concept": {
      "summary": "Your first Java program. Java programs are class-based, statically typed, and compiled to JVM bytecode.",
      "whatIsIt": "Java is an object-oriented programming language designed for platform independence. All code must reside within a class, and execution begins at the public static void main method.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Class Declaration",
          "description": "public class Main defines the container for your program logic."
        },
        {
          "step": 2,
          "title": "Entry Point",
          "description": "public static void main(String[] args) is discovered and invoked directly by the Java Virtual Machine."
        },
        {
          "step": 3,
          "title": "Console Output",
          "description": "System.out.println() sends the string to standard output with an automatic trailing newline."
        }
      ],
      "keyTerms": [
        {
          "term": "JVM",
          "definition": "Java Virtual Machine that executes compiled bytecode across any operating system."
        },
        {
          "term": "public static void main",
          "definition": "The standard signature required by the JVM to launch execution."
        },
        {
          "term": "System.out.println",
          "definition": "Built-in stream method used to output text to the console."
        }
      ],
      "realWorldExample": "A Java program is like a legal deed: it must be wrapped inside a sealed envelope (class) and stamped by an authorized notary officer (public static void main).",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "whenToUse": "The fundamental starting skeleton for all standalone Java console applications.",
      "commonMistakes": [
        "Forgetting semicolons after System.out.println(...);",
        "Writing String with lowercase 's' (it is a class name, so uppercase 'S' is mandatory)",
        "Forgetting 'static' in main signature, causing JVM run error"
      ],
      "diagramType": "java-hello-world"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Why must the main method in Java be declared as static?",
        "options": [
          "So the JVM can call it directly without allocating an instance of the class",
          "Because static methods run faster",
          "Because Java does not allow methods inside classes",
          "To hide it from other packages"
        ],
        "correct": 0,
        "explanation": "The JVM calls Main.main(args) directly on class loading before any objects exist, requiring static."
      },
      {
        "id": 2,
        "difficulty": "easy",
        "question": "What does 'void' denote in the main method signature?",
        "options": [
          "The method accepts no parameters",
          "The method returns no value to the caller",
          "The method is an abstract stub",
          "The method is private"
        ],
        "correct": 1,
        "explanation": "'void' indicates the return type is empty; it exits without returning a value."
      }
    ],
    "logicHints": {
      "approach": "Wrap the logic inside class Main and call System.out.println with your message.",
      "keySteps": [
        "Step 1: Declare public class Main",
        "Step 2: Add public static void main(String[] args)",
        "Step 3: Call System.out.println(\"Hello, Java Master!\");"
      ],
      "pseudocode": "CLASS Main BEGIN METHOD main() PRINT 'Hello, Java Master!' END METHOD END CLASS"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java Master!\");\n        System.out.println(\"Welcome to the JVM World.\");\n    }\n}"
  },
  "java-variables-types": {
    "id": "java-variables-types",
    "title": "Primitive Data Types & Literals",
    "category": "Variables & Types",
    "level": "beginner",
    "levelNum": 1,
    "estimatedTime": "10 min",
    "icon": "📦",
    "concept": {
      "summary": "Java primitives store raw numeric, character, or boolean values directly on the stack frame.",
      "whatIsIt": "Java is strictly and statically typed. Every variable must have a declared type before compilation. Java provides 8 primitive types: byte, short, int, long, float, double, char, and boolean.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Declaration",
          "description": "Specifies the fixed memory size and type name (e.g., int count; allocates 32 bits)."
        },
        {
          "step": 2,
          "title": "Initialization",
          "description": "Stores literal values directly into stack memory."
        },
        {
          "step": 3,
          "title": "Type Safety",
          "description": "The compiler rejects incompatible type assignments at compile time."
        }
      ],
      "keyTerms": [
        {
          "term": "int",
          "definition": "32-bit signed two's complement integer (-2^31 to 2^31-1)."
        },
        {
          "term": "double",
          "definition": "64-bit IEEE 754 floating-point decimal precision number."
        },
        {
          "term": "boolean",
          "definition": "Represents one bit of information: either true or false."
        }
      ],
      "realWorldExample": "Java primitives are standardized measuring cups: an int cup holds exactly 32 bits of liquid, while a double holds 64 bits.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Use primitive types for high performance, arithmetic, counters, and boolean flags.",
      "commonMistakes": [
        "Assigning a decimal value to an int without explicit casting: int x = 3.14 (compiler error)",
        "Forgetting 'f' suffix on float literals: float f = 3.14f",
        "Treating 0 or 1 as boolean in if conditions (Java requires strict boolean)"
      ],
      "diagramType": "java-variables-types"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What is the bit-width of an int in Java?",
        "options": [
          "16-bit",
          "32-bit",
          "64-bit",
          "Varies by operating system"
        ],
        "correct": 1,
        "explanation": "Java primitives have strictly guaranteed bit-widths across all OS platforms: int is always 32 bits."
      }
    ],
    "logicHints": {
      "approach": "Declare an int for count and a double for price, calculate total, and print.",
      "keySteps": [
        "Declare int",
        "Declare double",
        "Compute product and print"
      ],
      "pseudocode": "int age = 21; double gpa = 3.85; PRINT age, gpa;"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        int studentAge = 21;\n        double gpa = 3.85;\n        char gradeLetter = 'A';\n        boolean isEnrolled = true;\n\n        System.out.println(\"Student Age: \" + studentAge);\n        System.out.println(\"GPA: \" + gpa);\n        System.out.println(\"Grade: \" + gradeLetter);\n        System.out.println(\"Enrolled: \" + isEnrolled);\n    }\n}"
  },
  "java-operators-math": {
    "id": "java-operators-math",
    "title": "Operators & Math Methods",
    "category": "Operations",
    "level": "beginner",
    "levelNum": 1,
    "estimatedTime": "10 min",
    "icon": "🔢",
    "concept": {
      "summary": "Arithmetic, relational, and Math utility methods in Java.",
      "whatIsIt": "Java provides standard mathematical operators (+, -, *, /, %) and the java.lang.Math class containing static methods like Math.sqrt, Math.pow, and Math.max.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Integer Truncation",
          "description": "Dividing two integers truncates decimals (7 / 2 evaluates to 3)."
        },
        {
          "step": 2,
          "title": "Floating Casting",
          "description": "Casting one operand to (double) produces accurate fractional division: (double) 7 / 2 = 3.5."
        },
        {
          "step": 3,
          "title": "Modulo Remainder",
          "description": "Operator % yields the integer remainder after division."
        }
      ],
      "keyTerms": [
        {
          "term": "Modulo (%)",
          "definition": "Returns division remainder (e.g. 17 % 5 = 2)."
        },
        {
          "term": "Type Casting",
          "definition": "Explicitly converting a smaller/larger type: (double) x."
        },
        {
          "term": "Math.sqrt()",
          "definition": "Returns the positive square root of a double value."
        }
      ],
      "realWorldExample": "Think of modulo % like a clock face: 13 hours % 12 hours brings you back to 1 o'clock.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Essential for financial calculations, geometry, physics, and even/odd parity checks.",
      "commonMistakes": [
        "Expecting 5 / 2 to yield 2.5 without casting (it yields 2)",
        "Confusing = (assignment) with == (equality comparison)",
        "Overlooking integer overflow on large multiplications"
      ],
      "diagramType": "java-operators"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What is the result of expression (5 / 2) in Java?",
        "options": [
          "2.5",
          "2",
          "3",
          "Compilation Error"
        ],
        "correct": 1,
        "explanation": "Integer division truncates the fraction, yielding 2."
      }
    ],
    "logicHints": {
      "approach": "Calculate division and square root and print the outputs.",
      "keySteps": [
        "Compute quotient with /",
        "Compute remainder with %",
        "Use Math.sqrt()"
      ],
      "pseudocode": "a = 17, b = 5; exact = (double) a / b; PRINT exact"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        int a = 17;\n        int b = 5;\n\n        int quotient = a / b;\n        int remainder = a % b;\n        double exact = (double) a / b;\n\n        System.out.println(\"Quotient: \" + quotient);\n        System.out.println(\"Remainder: \" + remainder);\n        System.out.println(\"Exact division: \" + exact);\n        System.out.println(\"Square root of 25: \" + Math.sqrt(25));\n    }\n}"
  },
  "java-conditionals": {
    "id": "java-conditionals",
    "title": "Conditionals (if-else & relational)",
    "category": "Control Flow",
    "level": "beginner",
    "levelNum": 1,
    "estimatedTime": "10 min",
    "icon": "⚖️",
    "concept": {
      "summary": "Decision making using boolean expressions and if-else branches.",
      "whatIsIt": "Conditionals allow your Java programs to branch into alternative execution pathways based on whether a boolean condition evaluates to true or false.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Condition Evaluation",
          "description": "Evaluates the parenthesized expression to boolean true or false."
        },
        {
          "step": 2,
          "title": "Branch Execution",
          "description": "Executes the matching block and skips alternative else/else-if branches."
        },
        {
          "step": 3,
          "title": "Default Fallback",
          "description": "The optional 'else' block executes if none of the preceding conditions were satisfied."
        }
      ],
      "keyTerms": [
        {
          "term": "if statement",
          "definition": "Executes a block of statements only if its condition is true."
        },
        {
          "term": "else if",
          "definition": "Tests another condition if the previous condition evaluated to false."
        },
        {
          "term": "Logical Operators",
          "definition": "&& (AND), || (OR), and ! (NOT) combining conditions."
        }
      ],
      "realWorldExample": "A conditional is like a traffic signal: green opens traffic flow down road A, yellow prepares for caution, and red halts traffic completely.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Use conditionals for validation, grading scales, menu options, and permission checks.",
      "commonMistakes": [
        "Using single '=' inside condition: if (x = 5) causes compiler error",
        "Omitting curly braces {} on multi-line conditional bodies",
        "Using numbers instead of booleans: if (1) is illegal in Java"
      ],
      "diagramType": "java-conditionals"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Can an integer variable 'int x = 1' be used directly in 'if (x)' in Java?",
        "options": [
          "Yes, non-zero is treated as true",
          "No, Java requires an explicit boolean expression such as (x != 0)",
          "Yes, only 0 is false",
          "Only in static methods"
        ],
        "correct": 1,
        "explanation": "Java enforces strict type safety: 'if' requires an expression evaluating to type boolean."
      }
    ],
    "logicHints": {
      "approach": "Test the score with if-else-if conditions descending from 90 to 70.",
      "keySteps": [
        "Check score >= 90",
        "Check score >= 80",
        "Check score >= 70",
        "Fallback else"
      ],
      "pseudocode": "IF score >= 90 THEN 'A' ELSE IF score >= 80 THEN 'B' ELSE 'C'"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        int score = 88;\n\n        if (score >= 90) {\n            System.out.println(\"Grade: A - Outstanding\");\n        } else if (score >= 80) {\n            System.out.println(\"Grade: B - Excellent\");\n        } else if (score >= 70) {\n            System.out.println(\"Grade: C - Satisfactory\");\n        } else {\n            System.out.println(\"Grade: F - Needs Improvement\");\n        }\n    }\n}"
  },
  "java-switch-statement": {
    "id": "java-switch-statement",
    "title": "Switch Statements & Multi-way Branching",
    "category": "Control Flow",
    "level": "beginner",
    "levelNum": 2,
    "estimatedTime": "10 min",
    "icon": "🔀",
    "concept": {
      "summary": "Efficient multi-branch dispatch for integers, characters, and Strings.",
      "whatIsIt": "The switch statement evaluates an expression against multiple constant case values, jumping directly to the matching branch.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Expression Match",
          "description": "Jumps directly to the case label matching the selector value."
        },
        {
          "step": 2,
          "title": "Break Statement",
          "description": "Exits the switch block immediately to avoid fall-through."
        },
        {
          "step": 3,
          "title": "Default Case",
          "description": "Executes if no case constant matches the selector."
        }
      ],
      "keyTerms": [
        {
          "term": "switch",
          "definition": "Control statement selecting from multiple discrete branch targets."
        },
        {
          "term": "break",
          "definition": "Terminates the switch block and continues program flow after the closing brace."
        },
        {
          "term": "fall-through",
          "definition": "Execution continuing into subsequent cases when break is omitted."
        }
      ],
      "realWorldExample": "A switch statement is like an elevator floor selector: press 4 and the lift travels directly to Floor 4 without inspecting Floors 1, 2, or 3.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "whenToUse": "When choosing between multiple fixed discrete options (days of week, menu commands, HTTP status codes).",
      "commonMistakes": [
        "Omitting break statements, leading to unintentional fall-through",
        "Using non-constant expressions in case labels",
        "Forgetting the default fallback branch"
      ],
      "diagramType": "java-conditionals"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What happens if a case in a classic Java switch block omits the 'break' statement?",
        "options": [
          "A compiler error is thrown",
          "Execution falls through into the next case regardless of whether its condition matches",
          "The switch block restarts from the beginning",
          "The program terminates immediately"
        ],
        "correct": 1,
        "explanation": "Without a break, execution falls through sequentially into subsequent cases until a break or the closing brace is reached."
      }
    ],
    "logicHints": {
      "approach": "Switch on an integer day (1-5) and assign the day name.",
      "keySteps": [
        "switch (dayOfWeek)",
        "case 1: ... break;",
        "default: ... break;"
      ],
      "pseudocode": "SWITCH day CASE 1: 'Mon' CASE 2: 'Tue' DEFAULT: 'Weekend'"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        int dayOfWeek = 3;\n        String dayName;\n\n        switch (dayOfWeek) {\n            case 1:\n                dayName = \"Monday\";\n                break;\n            case 2:\n                dayName = \"Tuesday\";\n                break;\n            case 3:\n                dayName = \"Wednesday\";\n                break;\n            case 4:\n                dayName = \"Thursday\";\n                break;\n            case 5:\n                dayName = \"Friday\";\n                break;\n            default:\n                dayName = \"Weekend\";\n                break;\n        }\n\n        System.out.println(\"Day \" + dayOfWeek + \" is \" + dayName);\n    }\n}"
  },
  "java-loops": {
    "id": "java-loops",
    "title": "Loops (for, while, do-while)",
    "category": "Iteration",
    "level": "beginner",
    "levelNum": 2,
    "estimatedTime": "10 min",
    "icon": "🔄",
    "concept": {
      "summary": "Repetition constructs: definite count loops and indefinite condition loops.",
      "whatIsIt": "Loops repeat execution of a block of statements while a boolean condition remains true.",
      "howItWorks": [
        {
          "step": 1,
          "title": "For Loop",
          "description": "for (init; condition; update) controls loop counter iterations with fixed boundaries."
        },
        {
          "step": 2,
          "title": "While Loop",
          "description": "Tests the condition before every iteration pass."
        },
        {
          "step": 3,
          "title": "Do-While Loop",
          "description": "Guarantees at least one execution because the condition check is at the bottom."
        }
      ],
      "keyTerms": [
        {
          "term": "for-loop",
          "definition": "Iteration construct with initializer, termination condition, and step increment."
        },
        {
          "term": "while-loop",
          "definition": "Loops indefinitely until condition flips to false."
        },
        {
          "term": "do-while",
          "definition": "Loop evaluated at the exit point, guaranteeing minimum 1 run."
        }
      ],
      "realWorldExample": "A loop is like laps on a track: you jog lap after lap, checking if you reached your lap target after each pass.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Use for-loops when iteration count is known; use while-loops when termination depends on runtime state.",
      "commonMistakes": [
        "Off-by-one errors: using '<' instead of '<='",
        "Forgetting counter increments, creating infinite loops",
        "Accidental semicolon after for header: for(int i=0; i<10; i++);"
      ],
      "diagramType": "java-loops"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "How many times does a 'do-while' loop execute if its condition starts as false?",
        "options": [
          "0 times",
          "At least 1 time",
          "Infinite times",
          "Throws exception"
        ],
        "correct": 1,
        "explanation": "Because do-while checks its condition after the body executes, it always runs at least once."
      }
    ],
    "logicHints": {
      "approach": "Iterate from 1 to 5 with a for loop and double a number with while.",
      "keySteps": [
        "Run for (int i = 1; i <= 5; i++)",
        "Run while (val <= 16) val *= 2"
      ],
      "pseudocode": "FOR i=1 TO 5 PRINT i; WHILE v <= 16 v = v * 2;"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Counting with standard for-loop:\");\n        for (int i = 1; i <= 5; i++) {\n            System.out.println(\"Count: \" + i);\n        }\n\n        System.out.println(\"\\nDoubling with while-loop:\");\n        int val = 1;\n        while (val <= 16) {\n            System.out.println(\"Val: \" + val);\n            val *= 2;\n        }\n    }\n}"
  },
  "java-break-continue": {
    "id": "java-break-continue",
    "title": "Loop Control (break & continue)",
    "category": "Iteration",
    "level": "beginner",
    "levelNum": 2,
    "estimatedTime": "10 min",
    "icon": "🛑",
    "concept": {
      "summary": "Altering normal loop flow using break, continue, and labeled statements.",
      "whatIsIt": "break immediately terminates the current loop; continue skips the rest of the current iteration and advances to the update/condition step.",
      "howItWorks": [
        {
          "step": 1,
          "title": "break",
          "description": "Jumps directly to the first line following the loop's closing brace."
        },
        {
          "step": 2,
          "title": "continue",
          "description": "Immediately bypasses subsequent code in the current iteration, triggering counter increment."
        },
        {
          "step": 3,
          "title": "Labeled Loops",
          "description": "Java supports labels (e.g. outerLoop:) to break out of multiple nested loops."
        }
      ],
      "keyTerms": [
        {
          "term": "break",
          "definition": "Unconditionally exits the innermost enclosing loop or switch."
        },
        {
          "term": "continue",
          "definition": "Skips remaining statements in the current iteration pass."
        }
      ],
      "realWorldExample": "break is pulling the emergency brake on the train; continue is skipping a closed station and continuing to the next.",
      "timeComplexity": "O(N)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Use break to stop searching once a target is found; use continue to skip invalid or filtered items.",
      "commonMistakes": [
        "Confusing break with return (break leaves the loop, return leaves the method)",
        "Placing continue after all statements in a loop where it has no effect",
        "Infinite loops when continue skips counter increment in while loops"
      ],
      "diagramType": "java-loops"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What does 'continue' do in a Java for-loop?",
        "options": [
          "Exits the entire program",
          "Skips the rest of current pass and advances to the loop increment step",
          "Restarts the loop with counter 0",
          "Breaks the outer loop"
        ],
        "correct": 1,
        "explanation": "'continue' immediately ends the current pass and advances directly to the update expression (e.g. i++)."
      }
    ],
    "logicHints": {
      "approach": "Iterate 1 to 10; skip evens with continue and stop at 8 with break.",
      "keySteps": [
        "if (i % 2 == 0) continue;",
        "if (i > 7) break;"
      ],
      "pseudocode": "FOR i=1 TO 10 IF i is even CONTINUE IF i > 7 BREAK PRINT i"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Printing odd numbers up to 10, skipping 5:\");\n        for (int i = 1; i <= 10; i++) {\n            if (i % 2 == 0) continue; // Skip evens\n            if (i == 5) continue;      // Skip 5\n            if (i > 7) break;          // Stop early\n            System.out.println(\"Number: \" + i);\n        }\n    }\n}"
  },
  "java-methods-static": {
    "id": "java-methods-static",
    "title": "Static Methods, Parameters & Return Values",
    "category": "Methods & Modularity",
    "level": "beginner",
    "levelNum": 2,
    "estimatedTime": "12 min",
    "icon": "⚡",
    "concept": {
      "summary": "Decomposing problems into reusable, callable static subroutines.",
      "whatIsIt": "Methods encapsulate a block of statements that perform a specific task, accept input arguments, and optionally return a calculated result.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Method Signature",
          "description": "Defines return type, method name, and typed parameter list."
        },
        {
          "step": 2,
          "title": "Stack Frame",
          "description": "Invoking a method creates an isolated stack frame holding local variables."
        },
        {
          "step": 3,
          "title": "Return Value",
          "description": "Passes the calculated result back to the caller and destroys the stack frame."
        }
      ],
      "keyTerms": [
        {
          "term": "static method",
          "definition": "A method associated with the class itself rather than any specific instance."
        },
        {
          "term": "Pass-by-value",
          "definition": "Java always copies argument values (primitives copy bits; references copy pointers)."
        },
        {
          "term": "Method Overloading",
          "definition": "Defining multiple methods with the same name but different parameter signatures."
        }
      ],
      "realWorldExample": "A method is like a coffee grinder: pour whole beans into the input chute, press start, and collect fine ground coffee from the dispenser.",
      "timeComplexity": "O(1) to O(N)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Whenever code is repeated or when breaking a complex procedure into modular, testable steps.",
      "commonMistakes": [
        "Trying to call a non-static method directly from static main without creating an instance",
        "Missing a return statement on one execution path in a non-void method",
        "Expecting method modifications on primitive arguments to alter the caller's variable"
      ],
      "diagramType": "java-methods"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Does Java support pass-by-reference?",
        "options": [
          "Yes, for all objects and arrays",
          "No, Java is strictly pass-by-value for everything (references are copied by value)",
          "Yes, when using the 'ref' keyword",
          "Only in static methods"
        ],
        "correct": 1,
        "explanation": "Java is strictly pass-by-value. When an object is passed, its reference memory address is copied by value."
      }
    ],
    "logicHints": {
      "approach": "Implement a static method for Euclidean GCD and a primality test method.",
      "keySteps": [
        "while (b != 0) { temp = b; b = a % b; a = temp; }",
        "return a;"
      ],
      "pseudocode": "FUNCTION gcd(a, b) WHILE b != 0: temp = b, b = a % b, a = temp RETURN a"
    },
    "referenceSolution": "public class Main {\n    public static int calculateGCD(int a, int b) {\n        while (b != 0) {\n            int temp = b;\n            b = a % b;\n            a = temp;\n        }\n        return a;\n    }\n\n    public static boolean isPrime(int n) {\n        if (n <= 1) return false;\n        for (int i = 2; i * i <= n; i++) {\n            if (n % i == 0) return false;\n        }\n        return true;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"GCD(48, 18) = \" + calculateGCD(48, 18));\n        System.out.println(\"Is 29 prime? \" + isPrime(29));\n    }\n}"
  },
  "java-arrays": {
    "id": "java-arrays",
    "title": "1D Arrays & Enhanced For-Each",
    "category": "Data Structures",
    "level": "intermediate",
    "levelNum": 3,
    "estimatedTime": "12 min",
    "icon": "📊",
    "concept": {
      "summary": "Fixed-size, typed collections stored contiguously in heap memory.",
      "whatIsIt": "In Java, an array is an object holding a fixed number of values of a single type. Indexing is zero-based (0 to length - 1).",
      "howItWorks": [
        {
          "step": 1,
          "title": "Heap Allocation",
          "description": "new int[size] creates the array on the heap, initializing elements to 0."
        },
        {
          "step": 2,
          "title": "O(1) Index Access",
          "description": "Computes direct memory offsets via array[index]."
        },
        {
          "step": 3,
          "title": "Enhanced For-Each",
          "description": "for (int item : array) iterates elements cleanly without managing index bounds."
        }
      ],
      "keyTerms": [
        {
          "term": "array.length",
          "definition": "A final property returning the total allocated capacity of the array."
        },
        {
          "term": "ArrayIndexOutOfBoundsException",
          "definition": "Runtime exception thrown when accessing negative index or >= length."
        }
      ],
      "realWorldExample": "An array is like a row of numbered mailboxes in an apartment lobby: box 0, box 1, box 2, each holding identical envelopes.",
      "timeComplexity": "O(1) access, O(N) traversal",
      "spaceComplexity": "O(N)",
      "whenToUse": "When you have a known, fixed number of items requiring fast, index-based access.",
      "commonMistakes": [
        "Calling array.length() with parentheses (it is a property, not a method)",
        "Trying to change the size of an array after creation (Java arrays have fixed sizes)",
        "Accessing index equal to array.length (throws ArrayIndexOutOfBoundsException)"
      ],
      "diagramType": "java-loops"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What happens if code accesses an index equal to 'arr.length'?",
        "options": [
          "It returns null",
          "It returns 0",
          "It throws ArrayIndexOutOfBoundsException at runtime",
          "The array automatically expands"
        ],
        "correct": 2,
        "explanation": "Valid indices range from 0 to length - 1. Accessing index length throws ArrayIndexOutOfBoundsException."
      }
    ],
    "logicHints": {
      "approach": "Iterate through an integer array, track the maximum and accumulate sum.",
      "keySteps": [
        "for (int s : scores)",
        "if (s > max) max = s;",
        "average = (double) sum / scores.length;"
      ],
      "pseudocode": "max = arr[0], sum = 0; FOR item IN arr: IF item > max: max = item; sum += item; PRINT max, sum/len"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        int[] scores = {85, 92, 78, 96, 89};\n\n        int max = scores[0];\n        int sum = 0;\n\n        for (int s : scores) {\n            if (s > max) max = s;\n            sum += s;\n        }\n\n        double average = (double) sum / scores.length;\n        System.out.println(\"Highest Score: \" + max);\n        System.out.println(\"Average Score: \" + average);\n    }\n}"
  },
  "java-2d-arrays": {
    "id": "java-2d-arrays",
    "title": "2D Matrices & Nested Iteration",
    "category": "Data Structures",
    "level": "intermediate",
    "levelNum": 3,
    "estimatedTime": "12 min",
    "icon": "🗄️",
    "concept": {
      "summary": "Multi-dimensional arrays structured as arrays of array references.",
      "whatIsIt": "Java does not allocate contiguous 2D grid blocks; it implements 2D arrays as an array of row references, allowing rectangular grids as well as jagged (ragged) arrays.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Row Array",
          "description": "The primary reference array stores pointers to individual row arrays."
        },
        {
          "step": 2,
          "title": "Nested Traversal",
          "description": "Outer loop visits each row r; inner loop visits each column c in row[r]."
        },
        {
          "step": 3,
          "title": "Matrix Coordinate",
          "description": "matrix[r][c] accesses the item at row r, column c."
        }
      ],
      "keyTerms": [
        {
          "term": "Ragged Array",
          "definition": "A 2D array where different rows have varying lengths."
        },
        {
          "term": "matrix.length",
          "definition": "Number of rows in the matrix."
        },
        {
          "term": "matrix[r].length",
          "definition": "Number of columns in row r."
        }
      ],
      "realWorldExample": "A 2D array is like a spreadsheet with rows and columns, or a chessboard with 8 ranks and 8 files.",
      "timeComplexity": "O(R * C)",
      "spaceComplexity": "O(R * C)",
      "whenToUse": "Image processing, game boards (chess, tic-tac-toe), coordinate planes, and tabular datasets.",
      "commonMistakes": [
        "Inverting indices: matrix[c][r] instead of matrix[r][c]",
        "Assuming all rows have identical length without verifying matrix[r].length",
        "Index out of bounds on square vs non-square matrices"
      ],
      "diagramType": "java-loops"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Can rows in a Java 2D array have different numbers of elements?",
        "options": [
          "No, all dimensions must be identical rectangular sizes",
          "Yes, because Java 2D arrays are arrays of references to independent row arrays",
          "Only if the matrix is declared with float",
          "Only in static methods"
        ],
        "correct": 1,
        "explanation": "Java creates arrays of arrays, so each row can have an independent size, forming a ragged array."
      }
    ],
    "logicHints": {
      "approach": "Iterate nested rows and columns, printing the grid and computing main diagonal sum (where r == c).",
      "keySteps": [
        "for (int r = 0; r < matrix.length; r++)",
        "for (int c = 0; c < matrix[r].length; c++)",
        "if (r == c) diag += matrix[r][c]"
      ],
      "pseudocode": "FOR r IN rows: FOR c IN cols: IF r == c: sum += m[r][c]"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        int[][] matrix = {\n            {1, 2, 3},\n            {4, 5, 6},\n            {7, 8, 9}\n        };\n\n        int mainDiagonalSum = 0;\n        for (int r = 0; r < matrix.length; r++) {\n            for (int c = 0; c < matrix[r].length; c++) {\n                if (r == c) mainDiagonalSum += matrix[r][c];\n                System.out.print(matrix[r][c] + \" \");\n            }\n            System.out.println();\n        }\n\n        System.out.println(\"Diagonal Sum: \" + mainDiagonalSum);\n    }\n}"
  },
  "java-strings": {
    "id": "java-strings",
    "title": "String Immutability & Methods",
    "category": "Strings",
    "level": "intermediate",
    "levelNum": 3,
    "estimatedTime": "12 min",
    "icon": "🔤",
    "concept": {
      "summary": "String objects, String Constant Pool, and string manipulation methods.",
      "whatIsIt": "In Java, String is an immutable object. Any operation that appears to modify a String actually creates and returns an entirely new String object.",
      "howItWorks": [
        {
          "step": 1,
          "title": "String Constant Pool",
          "description": "Literal strings like \"Java\" are stored in an intern pool on the heap to save memory."
        },
        {
          "step": 2,
          "title": "Value Equality",
          "description": "Use .equals() to compare character contents. The == operator only checks if memory reference pointers match!"
        },
        {
          "step": 3,
          "title": "Transformation Methods",
          "description": ".toUpperCase(), .trim(), and .substring() return newly allocated String instances."
        }
      ],
      "keyTerms": [
        {
          "term": "Immutability",
          "definition": "An object whose state cannot be modified after construction."
        },
        {
          "term": ".equals()",
          "definition": "Compares the actual character contents of two strings for equality."
        },
        {
          "term": "String Pool",
          "definition": "A dedicated memory area in the heap where literal strings are cached and deduplicated."
        }
      ],
      "realWorldExample": "A Java String is like a monument carved in stone: you cannot edit the inscription; to make a change, you must carve an entirely new monument.",
      "timeComplexity": "O(N) for transformations",
      "spaceComplexity": "O(N)",
      "whenToUse": "Text storage, IDs, messages, file paths, and wherever safe, thread-safe values are needed.",
      "commonMistakes": [
        "Using == instead of .equals() to compare string values",
        "Expecting s.toUpperCase() to change s in-place (must assign: s = s.toUpperCase())",
        "Concatenating strings inside large loops with + operator (creates O(N^2) temporary objects)"
      ],
      "diagramType": "java-variables-types"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Why does 'new String(\"test\") == \"test\"' evaluate to false in Java?",
        "options": [
          "The strings have different lengths",
          "The '==' operator checks if both references point to the exact same memory address on the heap",
          "Java strings cannot be compared",
          "The String constructor modifies casing"
        ],
        "correct": 1,
        "explanation": "'==' checks memory identity. Use .equals() to compare the actual character contents."
      }
    ],
    "logicHints": {
      "approach": "Demonstrate == reference comparison vs .equals() content comparison, then use trim and upper.",
      "keySteps": [
        "Compare s1 == s2 vs s1.equals(s2)",
        "Clean phrase with trim()",
        "Inspect uppercase"
      ],
      "pseudocode": "PRINT (s1 == s2), PRINT s1.equals(s2), PRINT phrase.trim().toUpperCase()"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"Java\";\n        String s2 = new String(\"Java\");\n\n        System.out.println(\"Reference equality (==): \" + (s1 == s2));\n        System.out.println(\"Value equality (.equals): \" + s1.equals(s2));\n\n        String phrase = \"  Hello OpenJDK Platform  \";\n        System.out.println(\"Cleaned: [\" + phrase.trim() + \"]\");\n        System.out.println(\"Upper: \" + phrase.toUpperCase().trim());\n        System.out.println(\"Contains 'Platform': \" + phrase.contains(\"Platform\"));\n    }\n}"
  },
  "java-stringbuilder": {
    "id": "java-stringbuilder",
    "title": "StringBuilder & Efficient Manipulation",
    "category": "Strings",
    "level": "intermediate",
    "levelNum": 3,
    "estimatedTime": "12 min",
    "icon": "🔨",
    "concept": {
      "summary": "High-performance mutable character sequence for dynamic string construction.",
      "whatIsIt": "StringBuilder provides a mutable buffer of characters that can be modified, appended, inserted, and reversed in-place without creating intermediate String objects.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Dynamic Buffer",
          "description": "Maintains an internal char[] array that doubles capacity when filled."
        },
        {
          "step": 2,
          "title": "In-Place Modification",
          "description": "Appends or modifies characters in O(1) amortized time."
        },
        {
          "step": 3,
          "title": "Final Export",
          "description": "Calling sb.toString() packages the final character array into an immutable String."
        }
      ],
      "keyTerms": [
        {
          "term": "StringBuilder",
          "definition": "A non-thread-safe, high-performance mutable string builder."
        },
        {
          "term": ".append()",
          "definition": "Appends the string representation of any type to the buffer end."
        },
        {
          "term": ".reverse()",
          "definition": "Reverses the sequence of characters directly in-place."
        }
      ],
      "realWorldExample": "If String is a carved stone tablet, StringBuilder is a whiteboard: you can write, erase, and append notes rapidly before photographing the final result.",
      "timeComplexity": "O(1) amortized append, O(N) reverse",
      "spaceComplexity": "O(N)",
      "whenToUse": "Whenever building strings inside loops, formatting CSVs, or constructing SQL/JSON dynamically.",
      "commonMistakes": [
        "Using StringBuilder for trivial two-word literals where \"a\" + \"b\" is optimized at compile-time",
        "Forgetting to call .toString() when passing the result to methods expecting String",
        "Using slower StringBuffer when single-threaded execution is sufficient"
      ],
      "diagramType": "java-variables-types"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "When should you prefer StringBuilder over String concatenation with '+'?",
        "options": [
          "Always, even for 2 simple literal words",
          "When appending characters or strings repeatedly inside loops to avoid O(N^2) heap allocations",
          "Only when multi-threading is required",
          "Never, StringBuilder is deprecated"
        ],
        "correct": 1,
        "explanation": "StringBuilder prevents allocating thousands of short-lived immutable String objects inside loops."
      }
    ],
    "logicHints": {
      "approach": "Instantiate StringBuilder, append parts, print, then reverse in-place.",
      "keySteps": [
        "StringBuilder sb = new StringBuilder();",
        "sb.append(...);",
        "sb.reverse();"
      ],
      "pseudocode": "sb = NEW StringBuilder(); sb.append('Java'); sb.append(' Platform'); PRINT sb.reverse();"
    },
    "referenceSolution": "public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder();\n        sb.append(\"Java\");\n        sb.append(\" Virtual \");\n        sb.append(\"Machine\");\n\n        System.out.println(\"Built: \" + sb.toString());\n\n        sb.reverse();\n        System.out.println(\"Reversed: \" + sb.toString());\n    }\n}"
  },
  "java-classes-objects": {
    "id": "java-classes-objects",
    "title": "Classes, Objects & Constructors",
    "category": "Object-Oriented Programming",
    "level": "advanced",
    "levelNum": 4,
    "estimatedTime": "15 min",
    "icon": "🏛️",
    "concept": {
      "summary": "Blueprints, heap object instantiation, constructors, and instance fields.",
      "whatIsIt": "A class defines a new reference type specifying fields (data/state) and methods (behavior). An object is a concrete instance allocated on the heap.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Constructor Invocation",
          "description": "new BankAccount(...) allocates heap memory and runs the constructor initialization."
        },
        {
          "step": 2,
          "title": "this Reference",
          "description": "The 'this' keyword refers to the current executing instance object."
        },
        {
          "step": 3,
          "title": "Encapsulated State",
          "description": "Instance fields store independent values per object instance."
        }
      ],
      "keyTerms": [
        {
          "term": "Constructor",
          "definition": "A special method matching the class name invoked upon new instantiation."
        },
        {
          "term": "this",
          "definition": "Reference to the current object executing the method."
        },
        {
          "term": "Instance Variable",
          "definition": "A variable declared inside a class but outside methods, owned by each object."
        }
      ],
      "realWorldExample": "A Class is an architectural blueprint for a house; an Object is the physical brick-and-mortar home built on an address in town.",
      "timeComplexity": "O(1) instantiation",
      "spaceComplexity": "O(1) per instance",
      "whenToUse": "Modeling real-world entities (users, accounts, orders, game entities, data models).",
      "commonMistakes": [
        "Adding a return type to a constructor (turning it into a regular method: void BankAccount() is not a constructor!)",
        "Confusing class static fields with instance fields",
        "Calling methods on a reference that is null (NullPointerException)"
      ],
      "diagramType": "java-classes-objects"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What is the role of the 'this' keyword in Java?",
        "options": [
          "It refers to the parent superclass",
          "It refers to the current instance of the class",
          "It imports packages",
          "It allocates new heap memory"
        ],
        "correct": 1,
        "explanation": "'this' refers to the calling object instance, resolving ambiguities between fields and parameter names."
      }
    ],
    "logicHints": {
      "approach": "Define BankAccount with owner and balance, constructor, deposit and withdraw methods.",
      "keySteps": [
        "Define fields owner & balance",
        "Add constructor with this.owner = owner",
        "Add deposit and withdraw methods"
      ],
      "pseudocode": "CLASS BankAccount: constructor(owner, balance): this.owner=owner; this.balance=balance"
    },
    "referenceSolution": "public class Main {\n    static class BankAccount {\n        private String owner;\n        private double balance;\n\n        public BankAccount(String owner, double initialDeposit) {\n            this.owner = owner;\n            this.balance = initialDeposit;\n        }\n\n        public void deposit(double amount) {\n            if (amount > 0) balance += amount;\n        }\n\n        public boolean withdraw(double amount) {\n            if (amount <= balance) {\n                balance -= amount;\n                return true;\n            }\n            return false;\n        }\n\n        public void printSummary() {\n            System.out.println(\"Account: \" + owner + \" | Balance: $\" + balance);\n        }\n    }\n\n    public static void main(String[] args) {\n        BankAccount acc = new BankAccount(\"Alice\", 500.0);\n        acc.deposit(250.0);\n        acc.withdraw(100.0);\n        acc.printSummary();\n    }\n}"
  },
  "java-encapsulation": {
    "id": "java-encapsulation",
    "title": "Encapsulation & Access Modifiers",
    "category": "Object-Oriented Programming",
    "level": "advanced",
    "levelNum": 4,
    "estimatedTime": "15 min",
    "icon": "🛡️",
    "concept": {
      "summary": "Data hiding with private fields and controlled getters/setters.",
      "whatIsIt": "Encapsulation bundles data and methods operating on that data within a class while restricting direct access to internal state from outside the class.",
      "howItWorks": [
        {
          "step": 1,
          "title": "private Fields",
          "description": "Hides fields so external code cannot corrupt values directly."
        },
        {
          "step": 2,
          "title": "Public Getters",
          "description": "Provides controlled read access to private variables."
        },
        {
          "step": 3,
          "title": "Public Setters with Validation",
          "description": "Validates incoming values before updating internal state."
        }
      ],
      "keyTerms": [
        {
          "term": "private",
          "definition": "Access modifier restricting visibility strictly to the enclosing class."
        },
        {
          "term": "public",
          "definition": "Access modifier granting universal visibility across all classes."
        },
        {
          "term": "Setter validation",
          "definition": "Business logic ensuring invalid values are rejected before altering fields."
        }
      ],
      "realWorldExample": "Encapsulation is like an ATM machine: cash drawers are secured inside an armored vault; customers interact only via keypad and screen.",
      "timeComplexity": "O(1)",
      "spaceComplexity": "O(1)",
      "whenToUse": "Always practice encapsulation for class fields to maintain object integrity.",
      "commonMistakes": [
        "Making fields public for convenience (violating encapsulation)",
        "Writing setters that do no validation when business rules exist",
        "Returning direct references to mutable internal arrays or collections in getters"
      ],
      "diagramType": "java-classes-objects"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Why should instance fields usually be declared as 'private'?",
        "options": [
          "Because Java requires all fields to be private",
          "To enforce encapsulation, hiding internal state and preventing corrupt direct modifications",
          "To make them run faster in memory",
          "To automatically generate database tables"
        ],
        "correct": 1,
        "explanation": "Private fields protect internal state, allowing setters to enforce validation rules."
      }
    ],
    "logicHints": {
      "approach": "Create Employee with private id & salary, add getter and validated setter.",
      "keySteps": [
        "private double salary;",
        "public void setSalary(double s) { if (s >= 30000) salary = s; }"
      ],
      "pseudocode": "CLASS Employee: PRIVATE salary; SET_SALARY(val): IF val >= 30000: salary = val"
    },
    "referenceSolution": "public class Main {\n    static class Employee {\n        private String id;\n        private double salary;\n\n        public Employee(String id, double salary) {\n            this.id = id;\n            setSalary(salary);\n        }\n\n        public String getId() { return id; }\n\n        public double getSalary() { return salary; }\n\n        public void setSalary(double salary) {\n            if (salary >= 30000.0) {\n                this.salary = salary;\n            } else {\n                System.out.println(\"Salary must meet minimum threshold ($30,000)\");\n            }\n        }\n    }\n\n    public static void main(String[] args) {\n        Employee emp = new Employee(\"EMP-402\", 65000.0);\n        System.out.println(\"Emp ID: \" + emp.getId() + \" | Salary: $\" + emp.getSalary());\n        emp.setSalary(20000.0); // Rejected\n    }\n}"
  },
  "java-inheritance": {
    "id": "java-inheritance",
    "title": "Inheritance & Polymorphism",
    "category": "Object-Oriented Programming",
    "level": "advanced",
    "levelNum": 4,
    "estimatedTime": "15 min",
    "icon": "🧬",
    "concept": {
      "summary": "Class hierarchy, super keyword, method overriding, and polymorphic dispatch.",
      "whatIsIt": "Inheritance allows a subclass to inherit fields and methods from a superclass using extends. Polymorphism allows a superclass variable to refer to any subclass instance.",
      "howItWorks": [
        {
          "step": 1,
          "title": "extends Keyword",
          "description": "Declares that the child class inherits capabilities from the parent."
        },
        {
          "step": 2,
          "title": "super() Call",
          "description": "Invokes the parent constructor to initialize inherited fields."
        },
        {
          "step": 3,
          "title": "@Override & Dynamic Dispatch",
          "description": "Subclass overrides parent methods; JVM calls the actual runtime object's method."
        }
      ],
      "keyTerms": [
        {
          "term": "extends",
          "definition": "Java keyword establishing single inheritance between classes."
        },
        {
          "term": "super",
          "definition": "Keyword referring to the immediate superclass members or constructor."
        },
        {
          "term": "Dynamic Polymorphism",
          "definition": "Resolving method calls at runtime based on the actual object type on the heap."
        }
      ],
      "realWorldExample": "A Vehicle is a general concept; a Car is a specific Vehicle. A Car inherits wheels and engine, but adds air conditioning and headlights.",
      "timeComplexity": "O(1) method dispatch",
      "spaceComplexity": "O(1)",
      "whenToUse": "Modeling 'is-a' relationships and designing extensible frameworks.",
      "commonMistakes": [
        "Trying to extend multiple classes with extends A, B (Java only allows single class inheritance)",
        "Forgetting to call super() when parent constructor has parameters",
        "Changing method parameter types when attempting to override (which creates an overload instead of an override)"
      ],
      "diagramType": "java-classes-objects"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Can a Java class inherit from multiple superclasses simultaneously using 'extends'?",
        "options": [
          "Yes, using comma separation: extends ClassA, ClassB",
          "No, Java only allows single class inheritance to avoid the diamond problem",
          "Yes, if both classes are abstract",
          "Only in static nested classes"
        ],
        "correct": 1,
        "explanation": "Java restricts class inheritance to a single parent to prevent ambiguities (the diamond problem)."
      }
    ],
    "logicHints": {
      "approach": "Define base Vehicle and subclass ElectricCar that overrides startEngine.",
      "keySteps": [
        "class Vehicle { ... }",
        "class ElectricCar extends Vehicle { super(brand); @Override startEngine() }"
      ],
      "pseudocode": "CLASS Vehicle: method startEngine(); CLASS ElectricCar EXTENDS Vehicle: OVERRIDE startEngine()"
    },
    "referenceSolution": "public class Main {\n    static class Vehicle {\n        protected String brand;\n\n        public Vehicle(String brand) { this.brand = brand; }\n\n        public void startEngine() {\n            System.out.println(brand + \" engine starts humming.\");\n        }\n    }\n\n    static class ElectricCar extends Vehicle {\n        private int batteryPercent;\n\n        public ElectricCar(String brand, int batteryPercent) {\n            super(brand);\n            this.batteryPercent = batteryPercent;\n        }\n\n        @Override\n        public void startEngine() {\n            System.out.println(brand + \" silently powers on with \" + batteryPercent + \"% battery.\");\n        }\n    }\n\n    public static void main(String[] args) {\n        Vehicle myVehicle = new ElectricCar(\"Tesla\", 88);\n        myVehicle.startEngine(); // Polymorphic method dispatch\n    }\n}"
  },
  "java-interfaces": {
    "id": "java-interfaces",
    "title": "Interfaces & Abstract Classes",
    "category": "Object-Oriented Programming",
    "level": "advanced",
    "levelNum": 4,
    "estimatedTime": "15 min",
    "icon": "📜",
    "concept": {
      "summary": "Contractual programming and multiple interface implementation.",
      "whatIsIt": "An interface defines a contract of method signatures that implementing classes must fulfill. Unlike classes, a Java class can implement multiple interfaces.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Interface Contract",
          "description": "Declares public abstract method signatures without implementation bodies."
        },
        {
          "step": 2,
          "title": "implements Keyword",
          "description": "Class pledges to supply concrete code for all declared interface methods."
        },
        {
          "step": 3,
          "title": "Multiple Contracts",
          "description": "class Duck implements Flyable, Swimmable satisfies multiple distinct capabilities."
        }
      ],
      "keyTerms": [
        {
          "term": "interface",
          "definition": "A 100% abstract contract specifying method signatures."
        },
        {
          "term": "implements",
          "definition": "Keyword connecting a concrete class to one or more interfaces."
        },
        {
          "term": "Default method",
          "definition": "Interface method providing a default body using the 'default' keyword."
        }
      ],
      "realWorldExample": "An electrical wall socket is an interface: anything with a standard two-prong plug (lamp, laptop charger, toaster) can connect and receive power.",
      "timeComplexity": "O(1) dispatch",
      "spaceComplexity": "O(1)",
      "whenToUse": "Decoupling systems, designing APIs, and defining common behaviors across unrelated classes.",
      "commonMistakes": [
        "Trying to instantiate an interface directly: new Flyable() (compiler error)",
        "Forgetting public modifier when implementing interface methods",
        "Confusing abstract class (which can have instance state) with interface"
      ],
      "diagramType": "java-classes-objects"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Can a single Java class implement more than one interface?",
        "options": [
          "No, only one interface is allowed",
          "Yes, Java supports multiple interface implementation via comma separation",
          "Only if the interfaces have the same method signatures",
          "Only when using abstract classes"
        ],
        "correct": 1,
        "explanation": "Java permits implementing multiple interfaces ('implements A, B'), achieving multiple inheritance of specifications."
      }
    ],
    "logicHints": {
      "approach": "Define Flyable and Swimmable interfaces and implement both in Duck.",
      "keySteps": [
        "interface Flyable { void fly(); }",
        "class Duck implements Flyable, Swimmable"
      ],
      "pseudocode": "INTERFACE Flyable; INTERFACE Swimmable; CLASS Duck IMPLEMENTS Flyable, Swimmable"
    },
    "referenceSolution": "public class Main {\n    interface Flyable {\n        void fly();\n    }\n\n    interface Swimmable {\n        void swim();\n    }\n\n    static class Duck implements Flyable, Swimmable {\n        @Override\n        public void fly() {\n            System.out.println(\"Duck is soaring over the lake.\");\n        }\n\n        @Override\n        public void swim() {\n            System.out.println(\"Duck is paddling on water.\");\n        }\n    }\n\n    public static void main(String[] args) {\n        Duck donald = new Duck();\n        donald.fly();\n        donald.swim();\n    }\n}"
  },
  "java-exceptions-try-catch": {
    "id": "java-exceptions-try-catch",
    "title": "Exception Handling (try-catch-finally)",
    "category": "Robustness & Error Handling",
    "level": "advanced",
    "levelNum": 5,
    "estimatedTime": "15 min",
    "icon": "🛡️",
    "concept": {
      "summary": "Handling runtime errors safely using try, catch, finally, and custom exceptions.",
      "whatIsIt": "Java uses exception objects derived from Throwable to signal errors. Checked exceptions must be handled or declared; unchecked exceptions represent runtime bugs.",
      "howItWorks": [
        {
          "step": 1,
          "title": "try Block",
          "description": "Encloses statements that may throw an exception during execution."
        },
        {
          "step": 2,
          "title": "catch Block",
          "description": "Catches matching exception types and executes recovery logic."
        },
        {
          "step": 3,
          "title": "finally Block",
          "description": "Always executes regardless of whether an exception occurred, ensuring resource cleanup."
        }
      ],
      "keyTerms": [
        {
          "term": "ArithmeticException",
          "definition": "Unchecked exception thrown on illegal math like division by zero."
        },
        {
          "term": "finally",
          "definition": "Guaranteed cleanup block executed after try/catch exits."
        },
        {
          "term": "throw vs throws",
          "definition": "throw triggers an exception object; throws declares potential exceptions in a method signature."
        }
      ],
      "realWorldExample": "A try-catch block is like a trapeze safety net: you attempt the aerial maneuver in 'try'; if you slip, the net catches you before hitting the floor.",
      "timeComplexity": "O(1) regular, O(stack depth) on throw",
      "spaceComplexity": "O(1)",
      "whenToUse": "File I/O, network requests, user input parsing, and arithmetic division guards.",
      "commonMistakes": [
        "Catching generic Exception or Throwable and leaving the catch block empty (swallowing errors)",
        "Expecting code after an unhandled exception to execute",
        "Putting catch(Exception) before more specific subclass catches"
      ],
      "diagramType": "java-default"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "When does the 'finally' block execute in Java?",
        "options": [
          "Only when an exception is thrown",
          "Only when no exception is thrown",
          "Always, whether an exception is caught or not thrown at all",
          "Only if System.exit is called"
        ],
        "correct": 2,
        "explanation": "'finally' is guaranteed to execute following try/catch completion."
      }
    ],
    "logicHints": {
      "approach": "Wrap division a / b in try block and catch ArithmeticException.",
      "keySteps": [
        "try { return a / b; }",
        "catch (ArithmeticException e) { ... return 0; }",
        "finally { System.out.println(...); }"
      ],
      "pseudocode": "TRY result = a / b CATCH ArithmeticException RETURN 0 FINALLY cleanup()"
    },
    "referenceSolution": "public class Main {\n    public static int safeDivide(int a, int b) {\n        try {\n            return a / b;\n        } catch (ArithmeticException e) {\n            System.out.println(\"Caught division error: \" + e.getMessage());\n            return 0;\n        } finally {\n            System.out.println(\"Execution cleanup completed.\");\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"10 / 2 = \" + safeDivide(10, 2));\n        System.out.println(\"10 / 0 = \" + safeDivide(10, 0));\n    }\n}"
  },
  "java-arraylist-collections": {
    "id": "java-arraylist-collections",
    "title": "ArrayList & Dynamic Collections",
    "category": "Collections Framework",
    "level": "advanced",
    "levelNum": 5,
    "estimatedTime": "15 min",
    "icon": "📚",
    "concept": {
      "summary": "Dynamic-size arrays from the Java Collections Framework.",
      "whatIsIt": "ArrayList<E> is a resizable array implementation of the List interface. It grows dynamically as elements are added, eliminating fixed array size limits.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Generics",
          "description": "ArrayList<String> restricts elements to String at compile time."
        },
        {
          "step": 2,
          "title": "Dynamic Growth",
          "description": "When the internal buffer reaches capacity, it allocates a 50% larger array and copies elements."
        },
        {
          "step": 3,
          "title": "Rich Methods",
          "description": "Provides .add(), .remove(), .contains(), .size(), and Collections.sort()."
        }
      ],
      "keyTerms": [
        {
          "term": "ArrayList",
          "definition": "Resizable array implementation of the List interface."
        },
        {
          "term": "Autoboxing",
          "definition": "Automatic conversion between primitive types (int) and their wrapper classes (Integer)."
        },
        {
          "term": "Collections.sort()",
          "definition": "Static method sorting elements in natural ascending order."
        }
      ],
      "realWorldExample": "An ArrayList is like an expanding accordion folder: whenever you acquire a new document, the folder expands without needing to replace it.",
      "timeComplexity": "O(1) amortized add/get, O(N) remove/contains",
      "spaceComplexity": "O(N)",
      "whenToUse": "Whenever you need a list of objects whose count changes dynamically during program execution.",
      "commonMistakes": [
        "Declaring ArrayList<int> (generics require reference wrapper types like ArrayList<Integer>)",
        "Using .length instead of .size() to get list size",
        "Removing elements during index loops without adjusting loop counters"
      ],
      "diagramType": "java-default"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "Why cannot an ArrayList be declared as 'ArrayList<int>' directly?",
        "options": [
          "Because int is too slow",
          "Java Generics only support Reference Objects, requiring the boxed wrapper class 'Integer'",
          "ArrayList only holds strings",
          "Because Java arrays are faster"
        ],
        "correct": 1,
        "explanation": "Generics require reference objects extending Object; primitives must use wrapper types like Integer."
      }
    ],
    "logicHints": {
      "approach": "Create an ArrayList<String>, add items, sort with Collections.sort, and remove one.",
      "keySteps": [
        "ArrayList<String> list = new ArrayList<>();",
        "Collections.sort(list);",
        "list.remove(\"...\");"
      ],
      "pseudocode": "list = NEW ArrayList(); list.add('Java'); list.add('Python'); SORT list; REMOVE item;"
    },
    "referenceSolution": "import java.util.ArrayList;\nimport java.util.Collections;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> languages = new ArrayList<>();\n        languages.add(\"Java\");\n        languages.add(\"Python\");\n        languages.add(\"C++\");\n        languages.add(\"Rust\");\n\n        System.out.println(\"Initial list size: \" + languages.size());\n        Collections.sort(languages);\n\n        for (String lang : languages) {\n            System.out.println(\"- \" + lang);\n        }\n\n        languages.remove(\"C++\");\n        System.out.println(\"After removal: \" + languages);\n    }\n}"
  },
  "java-hashmap": {
    "id": "java-hashmap",
    "title": "HashMap & Key-Value Lookup",
    "category": "Collections Framework",
    "level": "advanced",
    "levelNum": 5,
    "estimatedTime": "15 min",
    "icon": "🗺️",
    "concept": {
      "summary": "Hash table-based key-value mapping with O(1) average lookup time.",
      "whatIsIt": "HashMap<K, V> implements the Map interface. It uses hash codes to store and retrieve associations between unique keys and their corresponding values in constant time.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Hash Computation",
          "description": "Calls key.hashCode() to determine which bucket index stores the entry."
        },
        {
          "step": 2,
          "title": "Key Uniqueness",
          "description": "Uses .equals() to detect duplicate keys; existing keys have their values overwritten."
        },
        {
          "step": 3,
          "title": "O(1) Retrieval",
          "description": "map.get(key) jumps directly to the bucket for instantaneous lookup."
        }
      ],
      "keyTerms": [
        {
          "term": "HashMap",
          "definition": "Hash table based implementation of the Map interface."
        },
        {
          "term": ".getOrDefault()",
          "definition": "Retrieves value for key, or fallback default if key is absent."
        },
        {
          "term": "Map.Entry",
          "definition": "A key-value pair entry stored inside the map."
        }
      ],
      "realWorldExample": "A HashMap is like a digital phone directory: instead of reading through 10,000 pages, you enter a friend's name and see their phone number immediately.",
      "timeComplexity": "O(1) average get/put",
      "spaceComplexity": "O(N)",
      "whenToUse": "Word frequency counting, caches, user registries, lookups by unique ID or username.",
      "commonMistakes": [
        "Using mutable objects as keys and then altering their properties (corrupts hash lookup)",
        "Overriding .equals() without also overriding .hashCode() on custom key classes",
        "Confusing .get(key) returning null with a key that maps to null"
      ],
      "diagramType": "java-default"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What is the average time complexity for retrieving a value from a HashMap by its key?",
        "options": [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N^2)"
        ],
        "correct": 0,
        "explanation": "HashMaps use hashing to jump directly to the target bucket, providing O(1) average lookup."
      }
    ],
    "logicHints": {
      "approach": "Count word frequency in a sentence using getOrDefault(w, 0) + 1.",
      "keySteps": [
        "Map<String, Integer> map = new HashMap<>();",
        "map.put(w, map.getOrDefault(w, 0) + 1);",
        "Iterate map.entrySet()"
      ],
      "pseudocode": "FOR word IN words: map.put(word, map.getOrDefault(word, 0) + 1); PRINT map"
    },
    "referenceSolution": "import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        String sentence = \"apple banana apple orange banana apple\";\n        String[] words = sentence.split(\" \");\n\n        Map<String, Integer> frequencyMap = new HashMap<>();\n\n        for (String w : words) {\n            frequencyMap.put(w, frequencyMap.getOrDefault(w, 0) + 1);\n        }\n\n        for (Map.Entry<String, Integer> entry : frequencyMap.entrySet()) {\n            System.out.println(entry.getKey() + \": \" + entry.getValue());\n        }\n    }\n}"
  },
  "java-recursion": {
    "id": "java-recursion",
    "title": "Recursion & Stack Frames",
    "category": "Algorithms",
    "level": "advanced",
    "levelNum": 5,
    "estimatedTime": "15 min",
    "icon": "🌀",
    "concept": {
      "summary": "Self-calling methods, base stopping cases, and call stack frames.",
      "whatIsIt": "Recursion is a programming technique where a method solves a problem by calling a smaller instance of itself until reaching a terminating base case.",
      "howItWorks": [
        {
          "step": 1,
          "title": "Base Case",
          "description": "The non-recursive stopping condition that returns immediately."
        },
        {
          "step": 2,
          "title": "Recursive Step",
          "description": "Calls the same method with a smaller argument, pushing a new frame to the call stack."
        },
        {
          "step": 3,
          "title": "Stack Unwinding",
          "description": "Once the base case returns, values bubble up through previous stack frames."
        }
      ],
      "keyTerms": [
        {
          "term": "Base Case",
          "definition": "The essential condition terminating recursion to prevent stack overflow."
        },
        {
          "term": "Call Stack",
          "definition": "Thread memory tracking active method invocations and local variables."
        },
        {
          "term": "StackOverflowError",
          "definition": "Error thrown when call stack space is exhausted by infinite recursion."
        }
      ],
      "realWorldExample": "Recursion is like Russian Matryoshka nesting dolls: open one doll to reveal a smaller doll, until you reach the solid tiny base doll.",
      "timeComplexity": "O(2^N) naive Fibonacci, O(N) linear",
      "spaceComplexity": "O(N) stack frames",
      "whenToUse": "Tree traversals, divide-and-conquer algorithms (Merge Sort), graph DFS, and combinatorial search.",
      "commonMistakes": [
        "Omitting the base case or making it unreachable (causes StackOverflowError)",
        "Not reducing parameters toward the base case",
        "Using naive recursion for Fibonacci on large numbers without memoization"
      ],
      "diagramType": "java-default"
    },
    "quiz": [
      {
        "id": 1,
        "difficulty": "easy",
        "question": "What fatal error occurs if a recursive Java method lacks a terminating base case?",
        "options": [
          "NullPointerException",
          "StackOverflowError",
          "OutOfMemoryError",
          "ClassCastException"
        ],
        "correct": 1,
        "explanation": "Each call allocates a stack frame; infinite recursion exhausts thread stack memory, triggering StackOverflowError."
      }
    ],
    "logicHints": {
      "approach": "Implement fibonacci(n) with base cases n <= 0 -> 0, n == 1 -> 1, else fib(n-1) + fib(n-2).",
      "keySteps": [
        "if (n <= 0) return 0;",
        "if (n == 1) return 1;",
        "return fibonacci(n - 1) + fibonacci(n - 2);"
      ],
      "pseudocode": "FUNCTION fib(n): IF n <= 0 RETURN 0; IF n == 1 RETURN 1; RETURN fib(n-1) + fib(n-2)"
    },
    "referenceSolution": "public class Main {\n    public static int fibonacci(int n) {\n        if (n <= 0) return 0;\n        if (n == 1) return 1;\n        return fibonacci(n - 1) + fibonacci(n - 2);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(\"Fibonacci Sequence (first 8 terms):\");\n        for (int i = 0; i < 8; i++) {\n            System.out.print(fibonacci(i) + \" \");\n        }\n        System.out.println();\n    }\n}"
  }
};
