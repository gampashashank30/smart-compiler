// Group 1: Level 1 and Level 2 topics enrichment
module.exports = {
  "even-odd": {
    whatIsIt: "The even-odd check determines whether an integer is divisible by 2 without any remainder. In C, we use the modulus operator `%` to inspect the remainder: if `n % 2 == 0`, the number is even; otherwise, it is odd.",
    howItWorks: [
      { step: 1, title: "Read integer input", description: "Prompt the user and read an integer into variable `n` using `scanf(\"%d\", &n)`." },
      { step: 2, title: "Evaluate remainder", description: "Compute `n % 2` to calculate the remainder after division by 2." },
      { step: 3, title: "Branch condition", description: "Use `if (n % 2 == 0)` to check if the remainder is exactly zero." },
      { step: 4, title: "Output result", description: "Print that the number is Even if true, or Odd in the `else` branch." }
    ],
    keyTerms: [
      { term: "Modulus Operator (%)", definition: "Returns the integer remainder of a division operation (e.g., 7 % 2 is 1)." },
      { term: "Even Number", definition: "Any integer divisible by 2 with zero remainder, ending in 0, 2, 4, 6, or 8." },
      { term: "Odd Number", definition: "Any integer that leaves a remainder of 1 (or -1) when divided by 2." },
      { term: "Parity Check", definition: "Testing whether a binary or integer value is odd or even." }
    ],
    commonMistakes: [
      "Using division `/` instead of modulus `%` (e.g., `n / 2 == 0` is false for non-zero numbers).",
      "Using single equals `=` instead of comparison `==` in `if (n % 2 = 0)`.",
      "Forgetting about negative odd numbers where `n % 2` yields `-1` in C; using `n % 2 != 0` is safer than `== 1`.",
      "Forgetting the ampersand `&` in `scanf(\"%d\", &n)` causing a segmentation fault."
    ],
    realWorldExample: "Dividing a deck of cards or bill equally between two people without any leftovers.",
    logicKeySteps: [
      "Read integer n from user input",
      "Compute remainder using n % 2",
      "Check if remainder equals 0",
      "Display 'Even' if true, else display 'Odd'"
    ]
  },
  "positive-negative-zero": {
    whatIsIt: "Determining the sign of a number checks whether a numeric value lies above, below, or exactly at zero on the real number line. It teaches multi-way branching in C using `if`, `else if`, and `else` constructs.",
    howItWorks: [
      { step: 1, title: "Read the number", description: "Accept an integer or floating-point value from standard input." },
      { step: 2, title: "Check positive condition", description: "Evaluate `if (n > 0)` to identify numbers strictly greater than zero." },
      { step: 3, title: "Check negative condition", description: "Evaluate `else if (n < 0)` for numbers strictly less than zero." },
      { step: 4, title: "Fallback to zero", description: "Use the final `else` clause when the number is neither positive nor negative, confirming it is zero." }
    ],
    keyTerms: [
      { term: "Signum / Sign", definition: "The mathematical property indicating whether a real number is positive, negative, or zero." },
      { term: "Multi-way Branching", definition: "Chaining `if ... else if ... else` statements to test mutually exclusive conditions." },
      { term: "Strict Inequality", definition: "Relational comparisons `>` and `<` that exclude equality." },
      { term: "Neutral Element", definition: "Zero is neither positive nor negative; it is the origin on the number line." }
    ],
    commonMistakes: [
      "Using `>= 0` for positive, which mistakenly classifies zero as a positive number.",
      "Writing separate disconnected `if` statements instead of `else if`, causing redundant evaluations.",
      "Forgetting to handle large negative inputs that may approach signed integer limits.",
      "Comparing uninitialized variables containing garbage values."
    ],
    realWorldExample: "A bank account balance: positive means savings, negative means overdraft debt, zero means empty.",
    logicKeySteps: [
      "Input value n",
      "If n > 0, output 'Positive'",
      "Else if n < 0, output 'Negative'",
      "Else output 'Zero'"
    ]
  },
  "leap-year": {
    whatIsIt: "A leap year has 366 days instead of 365, adding February 29 to synchronize the calendar year with the astronomical solar cycle. The Gregorian rule requires: divisible by 4, except century years must also be divisible by 400.",
    howItWorks: [
      { step: 1, title: "Accept year input", description: "Read a 4-digit positive integer representing the calendar year." },
      { step: 2, title: "Check century rule", description: "If `year % 400 == 0`, it is definitively a leap year (e.g., 2000)." },
      { step: 3, title: "Check 100 exception", description: "If `year % 100 == 0`, it is NOT a leap year (e.g., 1900, 2100)." },
      { step: 4, title: "Check 4-year rule", description: "If `year % 4 == 0`, it is a leap year; combine with `(year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)`." }
    ],
    keyTerms: [
      { term: "Gregorian Calendar Rule", definition: "Divisible by 4 and not 100, unless also divisible by 400." },
      { term: "Century Year", definition: "Years ending in 00 (e.g., 1800, 1900, 2000)." },
      { term: "Logical Operators", definition: "Using `&&` (AND) and `||` (OR) to express compound boolean conditions." },
      { term: "Short-circuit Evaluation", definition: "C stops evaluating boolean expressions as soon as the final truth value is determined." }
    ],
    commonMistakes: [
      "Only checking `year % 4 == 0`, which incorrectly flags century years like 1900 and 2100 as leap years.",
      "Using bitwise `&` or `|` instead of logical `&&` or `||`.",
      "Incorrect operator precedence: forgetting parentheses around `(year % 4 == 0 && year % 100 != 0)`.",
      "Assuming every 4th year is automatically a leap year without applying the century exception."
    ],
    realWorldExample: "Adding an extra day to February every 4 years so seasonal solstices do not drift across months.",
    logicKeySteps: [
      "Read year integer",
      "Check condition: (year % 400 == 0) OR (year % 4 == 0 AND year % 100 != 0)",
      "If condition is true, print 'Leap Year'",
      "Else print 'Not a Leap Year'"
    ]
  },
  "swap-numbers": {
    whatIsIt: "Swapping exchanges the values of two variables so each holds the value previously held by the other. It is the fundamental primitive operation in sorting algorithms, queue reordering, and data structure rotations.",
    howItWorks: [
      { step: 1, title: "Declare temporary storage", description: "Create a temporary variable `temp` of the same data type as the variables to swap." },
      { step: 2, title: "Save first variable", description: "Store variable `a` into `temp` (`temp = a`) so its value is preserved." },
      { step: 3, title: "Overwrite first variable", description: "Assign `b` into `a` (`a = b`), transferring the second value." },
      { step: 4, title: "Restore second variable", description: "Assign saved `temp` into `b` (`b = temp`), completing the two-way exchange." }
    ],
    keyTerms: [
      { term: "Temporary Variable", definition: "A placeholder variable used to prevent data loss during overwriting." },
      { term: "In-place Swap", definition: "Swapping using arithmetic `a = a + b; b = a - b; a = a - b` or XOR `^` without extra variables." },
      { term: "Data Overwrite", definition: "Writing into a variable before saving its original value causes irreversible data loss." },
      { term: "Pass by Reference", definition: "Using pointers `swap(&a, &b)` to modify variables outside the caller function." }
    ],
    commonMistakes: [
      "Overwriting `a = b` without saving `a` in `temp`, causing both variables to hold `b`'s value.",
      "Arithmetic swap `a = a + b` can cause integer overflow when working with large numbers.",
      "XOR swap fails when swapping a variable with itself at the same memory location, zeroing it out.",
      "Passing values instead of pointers when trying to swap variables inside a separate function."
    ],
    realWorldExample: "Pouring coffee from cup A to cup B using a third empty glass C to hold the liquid temporarily.",
    logicKeySteps: [
      "Read two integers a and b",
      "Set temp = a",
      "Set a = b",
      "Set b = temp",
      "Display new values of a and b"
    ]
  },
  "calculator-switch": {
    whatIsIt: "A menu-driven calculator performs basic arithmetic (+, -, *, /) based on an operator character chosen by the user. It showcases the `switch-case` statement in C as a clean, performant alternative to nested if-else ladders.",
    howItWorks: [
      { step: 1, title: "Read operator and operands", description: "Read two numbers and an operator character (`+`, `-`, `*`, `/`)." },
      { step: 2, title: "Pass operator to switch", description: "Evaluate `switch (operator)` matching against discrete `case` constants." },
      { step: 3, title: "Execute matching case", description: "Perform operation and include `break;` to prevent fall-through to the next case." },
      { step: 4, title: "Default error branch", description: "Use `default:` to catch invalid operators and check for division by zero." }
    ],
    keyTerms: [
      { term: "Switch-Case", definition: "A multi-branch statement that jumps directly to matching integer or character labels." },
      { term: "Break Statement", definition: "Terminates the switch block immediately, preventing unintentional case fall-through." },
      { term: "Case Fall-through", definition: "When code execution flows sequentially into the next case due to a missing break." },
      { term: "Divide by Zero", definition: "An undefined mathematical operation that causes runtime hardware exception crashes in C." }
    ],
    commonMistakes: [
      "Forgetting `break;` after a case, causing subsequent cases to execute unintentionally.",
      "Not checking for division by zero before executing `a / b` when `b == 0`.",
      "Buffer leftover newline issue: `scanf(\" %c\", &op)` requires a leading space to skip preceding whitespace.",
      "Using strings or floats in `switch()`, which only accepts integral types (`int`, `char`, `enum`)."
    ],
    realWorldExample: "A vending machine button: pressing 'B4' triggers the specific motor for that item and stops.",
    logicKeySteps: [
      "Input operator char and operands a, b",
      "Switch on operator (+, -, *, /)",
      "In each case, compute and display result, then break",
      "If operator is '/' and b == 0, print error",
      "In default case, handle invalid operator"
    ]
  },
  "do-while-loop": {
    whatIsIt: "A `do-while` loop is an exit-controlled loop that executes its code block at least once before testing the condition at the end. It is commonly used for input validation and interactive, menu-driven programs where an action must happen first.",
    howItWorks: [
      { step: 1, title: "Enter loop unconditionally", description: "Execution enters the `do { ... }` block directly on the first pass without checking the condition." },
      { step: 2, title: "Execute body statements", description: "Run interactive prompts, read user input, or perform calculations." },
      { step: 3, title: "Evaluate loop condition", description: "Test `while (condition);` at the closing brace." },
      { step: 4, title: "Repeat or exit", description: "If condition is true, loop jumps back to the `do` block; if false, loop terminates." }
    ],
    keyTerms: [
      { term: "Exit-Controlled Loop", definition: "A loop whose termination condition is tested after each iteration body executes." },
      { term: "Guaranteed Single Execution", definition: "The body always runs at least once, even if the condition is false initially." },
      { term: "Input Validation Loop", definition: "Repeatedly prompting a user until they provide valid data within acceptable bounds." },
      { term: "Trailing Semicolon", definition: "The `while (condition);` line in a do-while loop MUST conclude with a semicolon." }
    ],
    commonMistakes: [
      "Forgetting the required semicolon `;` after `while (condition)` causing a compile error.",
      "Assuming a do-while loop checks the condition before the first run like a while loop does.",
      "Not updating the loop control variable inside the body, causing an infinite loop.",
      "Variable scoping errors: declaring variables inside `do { }` and trying to use them in the `while()` condition."
    ],
    realWorldExample: "Entering your ATM PIN: the keypad prompts you at least once, and only loops if the PIN was incorrect.",
    logicKeySteps: [
      "Enter do block",
      "Prompt user or perform task",
      "Read input or update control variables",
      "Evaluate while(condition);",
      "Repeat if condition is true"
    ]
  },
  "multiplication-table": {
    whatIsIt: "Generating a multiplication table displays the sequential products of a given number `n` multiplied by integers from 1 up to 10 (or a custom limit). It is the premier introductory problem for understanding loop counters and formatted output in C.",
    howItWorks: [
      { step: 1, title: "Read base number", description: "Accept the number `n` whose table needs to be generated." },
      { step: 2, title: "Initialize counter loop", description: "Set up a `for` loop starting at `i = 1` running up to `i <= 10`." },
      { step: 3, title: "Compute product", description: "Calculate `product = n * i` for each iteration." },
      { step: 4, title: "Format console output", description: "Use `printf(\"%d x %d = %d\\n\", n, i, n * i);` to display clean tabular rows." }
    ],
    keyTerms: [
      { term: "Loop Counter", definition: "A loop variable (e.g. `i`) that increments monotonically with each repetition." },
      { term: "Formatted Printing", definition: "Using `%d` placeholders and newline `\\n` to produce organized text columns." },
      { term: "Linear Iteration", definition: "Executing a block of code a predetermined, fixed number of times." },
      { term: "Arithmetic Multiplication", definition: "The `*` operator in C computing products between integer types." }
    ],
    commonMistakes: [
      "Starting loop at `i = 0` instead of `i = 1`, printing `n x 0 = 0` unexpectedly.",
      "Using loop condition `i < 10` instead of `i <= 10`, stopping at 9.",
      "Overwriting `n` inside the loop instead of multiplying with counter `i`.",
      "Missing `\\n` newline in `printf()`, causing all lines to print on a single unreadable line."
    ],
    realWorldExample: "Reading times tables from a printed math chart to quickly calculate batch prices in a store.",
    logicKeySteps: [
      "Input integer n",
      "Loop i from 1 to 10",
      "Print n * i with formatted text",
      "Terminate when i exceeds 10"
    ]
  },
  "pattern-right-triangle": {
    whatIsIt: "A right-angled triangle pattern prints rows of stars or numbers where row `i` contains exactly `i` items. It introduces nested loops: an outer loop controlling the row number and an inner loop controlling the items printed per row.",
    howItWorks: [
      { step: 1, title: "Outer row loop", description: "Iterate row counter `i` from 1 to `rows` to manage vertical lines." },
      { step: 2, title: "Inner column loop", description: "Iterate column counter `j` from 1 to `i` on each row." },
      { step: 3, title: "Print symbol", description: "Print an asterisk `printf(\"* \")` or number without a newline inside the inner loop." },
      { step: 4, title: "Row newline", description: "Print `printf(\"\\n\")` immediately after the inner loop finishes to start the next row." }
    ],
    keyTerms: [
      { term: "Nested Loops", definition: "A loop placed inside the body of another loop; inner loop executes completely for each outer step." },
      { term: "Row-Dependent Bound", definition: "The inner loop's termination condition depends directly on outer counter `i` (`j <= i`)." },
      { term: "Grid Generation", definition: "Mapping two-dimensional coordinates `(row, col)` onto sequential console output." },
      { term: "Row Line-Feed", definition: "Emitting `\\n` after completing a row of characters." }
    ],
    commonMistakes: [
      "Placing `printf(\"\\n\")` inside the inner loop instead of after it, printing all stars vertically.",
      "Using `j <= rows` instead of `j <= i` in the inner loop, printing a full square instead of a triangle.",
      "Mixing up counter variables `i` and `j` inside inner loop conditions.",
      "Forgetting to reset or initialize `j = 1` on each outer loop pass."
    ],
    realWorldExample: "A staircase seen from the side: each step down is one unit wider than the step above it.",
    logicKeySteps: [
      "Read number of rows N",
      "Outer loop i from 1 to N",
      "Inner loop j from 1 to i: print '* '",
      "Print newline after inner loop completes"
    ]
  },
  "pattern-inverted-triangle": {
    whatIsIt: "An inverted right-angled triangle pattern starts with `n` stars on the first row and decreases by one star per row down to 1 star. It teaches decreasing loop bounds and inverse linear relationships `(n - i + 1)` in nested loops.",
    howItWorks: [
      { step: 1, title: "Outer row loop", description: "Run `i` from `n` down to 1 (or `i` from 1 to `n`)." },
      { step: 2, title: "Calculate stars per row", description: "Inner loop runs `j` from 1 to `i` (when outer decreases), printing stars." },
      { step: 3, title: "Print star symbol", description: "Print `* ` without moving to a new line." },
      { step: 4, title: "Advance line", description: "Emit `printf(\"\\n\")` when the inner row is finished." }
    ],
    keyTerms: [
      { term: "Decreasing Loop", definition: "A loop where counter variable decrements `i--` on each pass toward a lower bound." },
      { term: "Inverse Scaling", definition: "The quantity of items printed is inversely proportional to the row index." },
      { term: "Nested Grid", definition: "Controlling column iteration limits using dynamically decreasing thresholds." },
      { term: "Triangle Geometry", definition: "A 2D ASCII shape with a horizontal top base tapering down to a single point." }
    ],
    commonMistakes: [
      "Wrong decrement condition: using `i++` with `i >= 1` creating an infinite loop.",
      "Setting inner loop boundary to `j <= n` printing a square box.",
      "Missing `\\n` newline after inner loop.",
      "Off-by-one error printing 0 stars on the final row."
    ],
    realWorldExample: "A funneled ramp or diminishing stack of wooden blocks arranged widest on top.",
    logicKeySteps: [
      "Read number of rows N",
      "Outer loop i from N down to 1",
      "Inner loop j from 1 to i: print '* '",
      "Print newline after each row"
    ]
  },
  "pattern-pyramid": {
    whatIsIt: "A pyramid pattern prints a centered, symmetrical triangle of stars. To achieve symmetry on a standard console grid, each row requires two consecutive inner loops: one to print leading spaces and one to print odd numbers of stars `(2*i - 1)`.",
    howItWorks: [
      { step: 1, title: "Outer row loop", description: "Loop `i` from 1 to `n` to traverse each row of the pyramid." },
      { step: 2, title: "Leading spaces loop", description: "First inner loop prints `n - i` spaces to push the stars into the center." },
      { step: 3, title: "Star printing loop", description: "Second inner loop prints `2*i - 1` stars (or `i` stars with trailing space)." },
      { step: 4, title: "End of row", description: "Print `\\n` to start the next horizontal level." }
    ],
    keyTerms: [
      { term: "Leading Spaces", definition: "Blank characters printed before text to horizontally center content in fixed-width fonts." },
      { term: "Sequential Inner Loops", definition: "Running two separate inner loops sequentially within the same outer row loop." },
      { term: "Odd Number Arithmetic", definition: "Generating odd sequence `1, 3, 5, 7...` using `2*i - 1` for pyramid width." },
      { term: "Symmetrical Alignment", definition: "Ensuring left and right margins balance around a vertical center axis." }
    ],
    commonMistakes: [
      "Printing leading spaces and stars in the wrong order, throwing off alignment.",
      "Using `2*i` instead of `2*i - 1`, resulting in even-width flat tops.",
      "Forgetting spaces between characters in certain styles, compressing the pyramid.",
      "Missing the `n - i` space calculation, leaving stars left-aligned."
    ],
    realWorldExample: "The Great Pyramid of Giza: widest at the base and tapering evenly to a peak in the center.",
    logicKeySteps: [
      "Read total rows N",
      "For each row i from 1 to N:",
      "  Print (N - i) spaces",
      "  Print (2*i - 1) stars",
      "  Print newline"
    ]
  },
  "pattern-diamond": {
    whatIsIt: "A diamond pattern combines an upright pyramid and an inverted pyramid to form a four-sided symmetrical geometric diamond. It requires splitting the pattern into two distinct nested-loop phases: upper half and lower half.",
    howItWorks: [
      { step: 1, title: "Upper pyramid phase", description: "Loop `i` from 1 to `n` printing spaces and expanding stars up to the widest midline." },
      { step: 2, title: "Lower inverted phase", description: "Loop `i` from `n - 1` down to 1 printing increasing spaces and shrinking stars." },
      { step: 3, title: "Space and star loops", description: "Within each phase, use separate inner loops for leading indentation and star counts." },
      { step: 4, title: "Row completion", description: "Emit `\\n` after completing each row to maintain vertical geometry." }
    ],
    keyTerms: [
      { term: "Two-Phase Generation", definition: "Dividing a complex shape into symmetrical ascending and descending phases." },
      { term: "Midline / Equator", definition: "The widest row in the diamond separating upper and lower halves." },
      { term: "Horizontal Inversion", definition: "Mirroring an indentation sequence from decreasing to increasing." },
      { term: "ASCII Artistry", definition: "Using character symbols and whitespace to render structured 2D geometric shapes." }
    ],
    commonMistakes: [
      "Duplicating the midline row twice, distorting the diamond's symmetry.",
      "Incorrect lower half loop start: starting at `n` instead of `n - 1`.",
      "Inconsistent spacing between stars in the top half versus bottom half.",
      "Using odd row counts without properly computing half-height `n = total / 2 + 1`."
    ],
    realWorldExample: "A playing card diamond suit (♦) or a cut gemstone viewed from the front.",
    logicKeySteps: [
      "Read half-height N",
      "Loop i from 1 to N: print (N-i) spaces, then (2*i-1) stars",
      "Loop i from N-1 down to 1: print (N-i) spaces, then (2*i-1) stars",
      "Ensure proper newlines after each row"
    ]
  },
  "pattern-floyds-triangle": {
    whatIsIt: "Floyd's Triangle is a right-angled triangle filled with consecutive natural numbers starting from 1. Unlike patterns that print row indices, Floyd's triangle maintains a continuous running counter that increments with every single number printed.",
    howItWorks: [
      { step: 1, title: "Initialize global counter", description: "Set running integer `num = 1` before entering any loop." },
      { step: 2, title: "Outer row loop", description: "Iterate row counter `i` from 1 to `rows`." },
      { step: 3, title: "Inner column loop", description: "Iterate `j` from 1 to `i`, printing `num` and immediately incrementing `num++`." },
      { step: 4, title: "Row linebreak", description: "Print `\\n` at the end of each row." }
    ],
    keyTerms: [
      { term: "Continuous Counter", definition: "A variable that preserves its state across loop iterations rather than resetting." },
      { term: "Natural Numbers", definition: "Positive sequential integers starting from 1, 2, 3, 4..." },
      { term: "Triangular Number", definition: "The last number of row `n` is always the n-th triangular number `n*(n+1)/2`." },
      { term: "Post-increment (`num++`)", definition: "Uses the current value in output and immediately increments it by 1." }
    ],
    commonMistakes: [
      "Resetting `num = 1` inside the outer loop, printing `1 / 1 2 / 1 2 3` instead of Floyd's triangle.",
      "Printing `i` or `j` instead of the continuous counter `num`.",
      "Using unformatted spacing: numbers > 9 take 2 characters and misalign columns if not spaced with `%2d`.",
      "Missing `\\n` causing numbers to run together into a single line."
    ],
    realWorldExample: "Arranging bowling pins sequentially numbered 1 at the head, 2-3 in the second row, 4-5-6 in the third row.",
    logicKeySteps: [
      "Initialize count = 1",
      "For i from 1 to N rows:",
      "  For j from 1 to i:",
      "    Print count, then increment count by 1",
      "  Print newline"
    ]
  },
  "pattern-pascals-triangle": {
    whatIsIt: "Pascal's Triangle is a triangular array of binomial coefficients where each number is the sum of the two directly above it. In C, it can be generated using combinatorics `C(n, k) = n! / (k! * (n-k)!)` or dynamically using `val = val * (i - j) / j`.",
    howItWorks: [
      { step: 1, title: "Outer row loop", description: "Loop row index `i` from 0 to `rows - 1`." },
      { step: 2, title: "Leading indentation", description: "Print `rows - i` spaces to center the triangular pyramid." },
      { step: 3, title: "Inner term computation", description: "Initialize `coef = 1` for first column; for subsequent columns, update `coef = coef * (i - j + 1) / j`." },
      { step: 4, title: "Display and advance", description: "Print `coef` with space, and print `\\n` after completing the row." }
    ],
    keyTerms: [
      { term: "Binomial Coefficient", definition: "The coefficient `nCr` of the x^k term in the polynomial expansion of `(1 + x)^n`." },
      { term: "Additive Property", definition: "Each number is the sum of the two numbers immediately above it in the preceding row." },
      { term: "Combinatoric Formula", definition: "Calculating `n! / (r! * (n-r)!)` or using recursive addition." },
      { term: "0-Indexed Triangle", definition: "Pascal's triangle rows and columns are conventionally indexed starting from 0." }
    ],
    commonMistakes: [
      "Calculating factorials directly for each term causing integer overflow beyond row 12 in standard 32-bit `int`.",
      "Integer division truncation: multiplying before dividing `coef * (i - j) / j` to prevent zeroing out.",
      "Starting row index at 1 instead of 0, complicating binomial coefficient indexing.",
      "Neglecting centering spaces, turning the equilateral triangle into a skewed right triangle."
    ],
    realWorldExample: "Calculating coin toss probabilities: row 4 (1, 4, 6, 4, 1) gives combinations for 0, 1, 2, 3, 4 heads.",
    logicKeySteps: [
      "Read number of rows N",
      "For row i from 0 to N-1:",
      "  Print (N - i) spaces for alignment",
      "  Set coef = 1",
      "  For j from 0 to i: print coef, then update coef = coef * (i - j) / (j + 1)",
      "  Print newline"
    ]
  },
  "sum-of-digits": {
    whatIsIt: "Sum of digits extracts every single digit of an integer using modulo arithmetic and computes their cumulative sum. It is the core algorithm behind checksums, digital root calculations, and ISBN/credit-card validation formulas.",
    howItWorks: [
      { step: 1, title: "Initialize accumulator", description: "Declare `sum = 0` to store the running total." },
      { step: 2, title: "Extract last digit", description: "Use `digit = n % 10` to peel off the units digit." },
      { step: 3, title: "Accumulate digit", description: "Add the extracted digit to the accumulator `sum += digit`." },
      { step: 4, title: "Discard last digit and repeat", description: "Perform integer division `n = n / 10` to shift right, repeating until `n == 0`." }
    ],
    keyTerms: [
      { term: "Modulo 10 (% 10)", definition: "Extracts the rightmost (units) digit of any base-10 number." },
      { term: "Integer Division (/ 10)", definition: "Trims the rightmost digit off a number by truncating the decimal remainder." },
      { term: "Digit Extraction Loop", definition: "The standard `while (n > 0)` pattern used to process numbers digit-by-digit." },
      { term: "Accumulator Variable", definition: "A variable initialized to 0 that gathers additive contributions over time." }
    ],
    commonMistakes: [
      "Forgetting to initialize `sum = 0`, causing garbage values to corrupt the calculation.",
      "Using `if` instead of `while`, resulting in summing only the first extracted digit.",
      "Failing to handle negative numbers: `n = abs(n)` ensures extracted digits are positive.",
      "Loop condition `n >= 0` instead of `n > 0`, causing an infinite loop because `0 / 10 == 0`."
    ],
    realWorldExample: "A digital root check or Luhn algorithm verifying credit card numbers by summing account digits.",
    logicKeySteps: [
      "Input integer n (use abs(n) for negatives)",
      "Set sum = 0",
      "While n > 0: add (n % 10) to sum, then set n = n / 10",
      "Output sum"
    ]
  },
  "reverse-number": {
    whatIsIt: "Reversing an integer inverts the order of its decimal digits (e.g., 1234 becomes 4321). It repeatedly extracts the last digit with `% 10` and builds the reversed value by multiplying the existing result by 10 and adding the new digit.",
    howItWorks: [
      { step: 1, title: "Initialize reversed variable", description: "Set `rev = 0` to hold the newly constructed number." },
      { step: 2, title: "Extract units digit", description: "Extract the last digit using `rem = n % 10`." },
      { step: 3, title: "Shift and append", description: "Multiply existing `rev` by 10 to shift digits left, then add `rem`: `rev = rev * 10 + rem`." },
      { step: 4, title: "Shrink input number", description: "Divide `n = n / 10`, repeating the loop until `n` becomes 0." }
    ],
    keyTerms: [
      { term: "Base-10 Shifting", definition: "Multiplying by 10 shifts decimal digits one position left (e.g., 4 becomes 40)." },
      { term: "Reverse Construction", definition: "Building a number backwards using `rev = rev * 10 + digit`." },
      { term: "Remainder Extraction", definition: "Peeling off the least significant digit with `% 10`." },
      { term: "Integer Overflow", definition: "Reversing a number close to `INT_MAX` can exceed 32-bit capacity." }
    ],
    commonMistakes: [
      "Printing digits individually instead of mathematically constructing the reversed integer variable.",
      "Forgetting to initialize `rev = 0` resulting in undefined garbage output.",
      "Losing trailing zeros: reversing 1200 yields 21 because leading zeros in integers are not stored.",
      "Not accounting for negative numbers: the minus sign must be preserved separately."
    ],
    realWorldExample: "Reading a car odometer or digital clock in a rearview mirror where digits appear inverted.",
    logicKeySteps: [
      "Input integer n",
      "Set rev = 0",
      "While n != 0:",
      "  rev = rev * 10 + (n % 10)",
      "  n = n / 10",
      "Print rev"
    ]
  },
  "palindrome-number": {
    whatIsIt: "A palindrome number reads identically forwards and backwards (e.g., 121, 1331, 7). To check if an integer is a palindrome, we reverse its digits mathematically and compare the reversed value to a preserved copy of the original number.",
    howItWorks: [
      { step: 1, title: "Store original number", description: "Save `original = n` in a temporary variable before mutating `n`." },
      { step: 2, title: "Reverse the number", description: "Extract digits and build `rev = rev * 10 + (n % 10)` while `n > 0`." },
      { step: 3, title: "Compare original with reversed", description: "Check if `original == rev` using an equality comparison." },
      { step: 4, title: "Display verdict", description: "Output 'Palindrome' if equal; otherwise output 'Not a Palindrome'." }
    ],
    keyTerms: [
      { term: "Palindrome", definition: "A value that remains unchanged when its sequence of components is reversed." },
      { term: "Preserved Copy", definition: "Storing an unmodified backup of input data before destructive loop operations." },
      { term: "Reversal Comparison", definition: "Comparing `original == reversed` to determine symmetry." },
      { term: "Single-Digit Palindrome", definition: "All single digit integers (0 through 9) are palindromes by definition." }
    ],
    commonMistakes: [
      "Comparing `rev == n` after the loop: `n` has been reduced to 0 by division, so the test always fails.",
      "Assuming negative numbers can be palindromes: -121 reversed is 121-, so negative numbers are not palindromes.",
      "Integer overflow when reversing very large 9 or 10-digit integers.",
      "Overwriting the original variable without making a backup copy before the while loop."
    ],
    realWorldExample: "Symmetrical odometer readings like 74247 km, or radar and palindrome words like 'radar' and 'level'.",
    logicKeySteps: [
      "Input integer n",
      "If n < 0, print 'Not Palindrome' (negative numbers cannot be palindromes)",
      "Copy original = n, set rev = 0",
      "While n > 0: rev = rev * 10 + (n % 10); n = n / 10",
      "If original == rev, print 'Palindrome', else 'Not Palindrome'"
    ]
  },
  "armstrong-number": {
    whatIsIt: "An Armstrong number (narcissistic number) of k digits equals the sum of its own digits each raised to the k-th power (e.g., 153 = 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153). It teaches digit counting, power computation, and number preservation.",
    howItWorks: [
      { step: 1, title: "Count number of digits", description: "Count the total number of digits `k` by dividing a copy of `n` by 10 until 0." },
      { step: 2, title: "Initialize sum", description: "Set `sum = 0` and restore `temp = n` to prepare for digit processing." },
      { step: 3, title: "Extract and raise power", description: "Extract `d = temp % 10`, compute `d^k` (using loop or `pow()`), and add to `sum`." },
      { step: 4, title: "Compare with original", description: "If `sum == n`, output 'Armstrong Number'; otherwise output 'Not Armstrong'." }
    ],
    keyTerms: [
      { term: "Armstrong / Narcissistic Number", definition: "A number equal to the sum of its digits raised to the power of the number of digits." },
      { term: "Digit Count (k)", definition: "The total number of decimal digits composing the integer." },
      { term: "Power Function (`pow`)", definition: "Standard math library function `<math.h>` computing base raised to exponent." },
      { term: "Floating-Point Rounding", definition: "Casting `(int)(pow(d, k) + 0.5)` prevents floating point truncation bugs." }
    ],
    commonMistakes: [
      "Assuming k is always 3: numbers like 1634 have 4 digits (`1^4 + 6^4 + 3^4 + 4^4 = 1634`), so k must be dynamic.",
      "Floating point truncation bug: `(int)pow(5, 2)` can evaluate to 24 due to `24.999999` representation.",
      "Modifying `n` in place during digit count without preserving copies for the power sum and final comparison.",
      "Forgetting to `#include <math.h>` and link `-lm` when using `pow()` in C."
    ],
    realWorldExample: "Recreational number theory puzzles and mathematical verification algorithms.",
    logicKeySteps: [
      "Read integer n",
      "Count digits k of n",
      "Set sum = 0, temp = n",
      "While temp > 0: digit = temp % 10; sum += digit^k; temp /= 10",
      "If sum == n, print 'Armstrong', else 'Not Armstrong'"
    ]
  },
  "prime-check": {
    whatIsIt: "A prime number is a natural number strictly greater than 1 that has no positive divisors other than 1 and itself (e.g., 2, 3, 5, 7, 11). Checking for primality tests whether any integer from 2 up to sqrt(n) divides n evenly.",
    howItWorks: [
      { step: 1, title: "Filter base cases", description: "If `n <= 1`, it is NOT prime. If `n == 2`, it IS prime (the only even prime)." },
      { step: 2, title: "Eliminate even numbers", description: "If `n % 2 == 0`, it is not prime, eliminating 50% of candidates immediately." },
      { step: 3, title: "Test factors up to sqrt(n)", description: "Loop odd numbers `i = 3` while `i * i <= n`; if `n % i == 0`, a factor exists." },
      { step: 4, title: "Confirm primality", description: "If no divisor divides `n`, conclude that `n` is prime." }
    ],
    keyTerms: [
      { term: "Prime Number", definition: "An integer greater than 1 with exactly two distinct positive divisors: 1 and itself." },
      { term: "Composite Number", definition: "A positive integer that can be formed by multiplying two smaller positive integers." },
      { term: "Square Root Optimization (`i * i <= n`)", definition: "If n has a divisor, at least one divisor must be <= sqrt(n), reducing work from O(n) to O(sqrt(n))." },
      { term: "Trial Division", definition: "Testing sequential integers to discover whether any divide n without remainder." }
    ],
    commonMistakes: [
      "Checking factors all the way up to `n - 1`, wasting CPU cycles when `sqrt(n)` is sufficient.",
      "Considering 1 or negative numbers as prime: 1 is neither prime nor composite by definition.",
      "Overlooking 2: the number 2 is prime, but can be accidentally rejected by even-number checks.",
      "Using `i <= sqrt(n)` calling the slow `sqrt()` function every loop pass instead of `i * i <= n`."
    ],
    realWorldExample: "RSA Public Key Cryptography encrypts online banking and HTTPS traffic using products of massive prime numbers.",
    logicKeySteps: [
      "Read integer n",
      "If n <= 1, print 'Not Prime'",
      "Loop i from 2 while i*i <= n:",
      "  If n % i == 0, print 'Not Prime' and exit",
      "Print 'Prime Number'"
    ]
  },
  "gcd-lcm": {
    whatIsIt: "The Greatest Common Divisor (GCD) is the largest positive integer that divides two numbers without remainder. The Least Common Multiple (LCM) is the smallest positive integer divisible by both. They are connected by: `GCD(a, b) * LCM(a, b) = a * b`.",
    howItWorks: [
      { step: 1, title: "Read two positive integers", description: "Accept integers `a` and `b`, preserving original copies for LCM computation." },
      { step: 2, title: "Apply Euclidean algorithm", description: "While `b != 0`, compute remainder `temp = a % b`, set `a = b`, and set `b = temp`." },
      { step: 3, title: "Identify GCD", description: "When `b == 0`, the current value of `a` is the GCD." },
      { step: 4, title: "Calculate LCM", description: "Compute `lcm = (original_a * original_b) / gcd`." }
    ],
    keyTerms: [
      { term: "Euclidean Algorithm", definition: "An ancient, highly efficient O(log(min(a,b))) method for computing GCD via repeated modulo." },
      { term: "GCD / HCF", definition: "Greatest Common Divisor (or Highest Common Factor) shared between two integers." },
      { term: "LCM", definition: "The smallest non-zero common multiple of two integers." },
      { term: "Product Identity", definition: "Mathematical law stating `a * b = GCD(a, b) * LCM(a, b)`." }
    ],
    commonMistakes: [
      "Using naive linear decrement `i = min(a,b)` down to 1 which runs in O(n) instead of Euclidean O(log n).",
      "Integer overflow in LCM calculation: `(a * b) / gcd` can overflow; write `(a / gcd) * b` instead.",
      "Division by zero if one input is 0; `gcd(a, 0)` is `a`.",
      "Mutating `a` and `b` during Euclidean algorithm without saving them to compute LCM afterwards."
    ],
    realWorldExample: "Synchronizing traffic lights: if light A cycles in 12s and B in 15s, both turn green together at LCM(12,15) = 60s.",
    logicKeySteps: [
      "Input a, b; save origA = a, origB = b",
      "While b != 0: temp = a % b; a = b; b = temp",
      "gcd = a",
      "lcm = (origA / gcd) * origB",
      "Print gcd and lcm"
    ]
  },
  "power-number": {
    whatIsIt: "Computing the power of a number evaluates `base^exp` (multiplying the base by itself `exp` times). While iterative loops compute this in O(n) time, binary exponentiation optimizes it to O(log n) time by squaring the base.",
    howItWorks: [
      { step: 1, title: "Read base and exponent", description: "Read numeric `base` and integer `exponent`." },
      { step: 2, title: "Handle exponent zero", description: "Any non-zero number raised to the power of 0 equals 1 (`result = 1`)." },
      { step: 3, title: "Iterative multiplication", description: "Loop `i` from 1 to `exp`, multiplying `result *= base` on each step." },
      { step: 4, title: "Negative exponent handling", description: "If exponent is negative, compute positive power and return `1.0 / result`." }
    ],
    keyTerms: [
      { term: "Base and Exponent", definition: "In b^e, b is the factor repeatedly multiplied and e is the count of repetitions." },
      { term: "Multiplicative Identity", definition: "Result variable must be initialized to 1 (not 0) because 1 is the neutral element for multiplication." },
      { term: "Exponentiation by Squaring", definition: "An O(log n) divide-and-conquer optimization squaring base when exponent is even." },
      { term: "Negative Powers", definition: "A negative exponent represents division: b^(-e) = 1 / (b^e)." }
    ],
    commonMistakes: [
      "Initializing result to 0: `0 * base` will always remain 0.",
      "Using the bitwise XOR operator `^` in C thinking it calculates powers (`2 ^ 3` is 1, not 8).",
      "Not handling negative exponents resulting in 0 due to integer truncation.",
      "Rapid integer overflow: powers grow exponentially, easily exceeding 32-bit limits."
    ],
    realWorldExample: "Compound interest calculations: $A = P(1 + r)^t$ where money compounds exponentially over time.",
    logicKeySteps: [
      "Read base and exponent exp",
      "Set result = 1.0",
      "For i from 1 to abs(exp): result *= base",
      "If exp < 0: result = 1.0 / result",
      "Output result"
    ]
  },
  "fibonacci-series": {
    whatIsIt: "The Fibonacci sequence is an integer series where each term is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13... Iterative generation uses two tracking variables with O(n) time and O(1) space, avoiding exponential recursion costs.",
    howItWorks: [
      { step: 1, title: "Initialize seeds", description: "Set the first two Fibonacci numbers `a = 0` and `b = 1`." },
      { step: 2, title: "Print first two terms", description: "Display `a` and `b` directly for the initial sequence positions." },
      { step: 3, title: "Calculate next term", description: "In a loop from 3 to `n`, calculate `next = a + b` and display it." },
      { step: 4, title: "Slide the window", description: "Update pointers `a = b` and `b = next` to prepare for the subsequent term." }
    ],
    keyTerms: [
      { term: "Fibonacci Recurrence", definition: "The mathematical rule F(n) = F(n-1) + F(n-2) with F(0)=0 and F(1)=1." },
      { term: "Sliding Window", definition: "Keeping only the two most recent values in memory (a and b) for O(1) space efficiency." },
      { term: "Seed Values", definition: "The initial boundary numbers (0 and 1) that bootstrap the sequence." },
      { term: "Golden Ratio (φ)", definition: "The ratio between consecutive Fibonacci numbers converges to 1.618033..." }
    ],
    commonMistakes: [
      "Using naive recursion `fib(n-1) + fib(n-2)` without memoization, running in devastating O(2^n) time.",
      "Swapping assignment order: setting `b = next` before `a = b`, which overwrites `b` prematurely.",
      "Off-by-one errors when generating n terms vs printing numbers up to value n.",
      "Integer overflow: Fibonacci numbers grow rapidly, overflowing standard 32-bit signed ints by the 47th term."
    ],
    realWorldExample: "Spiral patterns of sunflower seeds, pinecone scales, and nautilus shell growth in nature.",
    logicKeySteps: [
      "Read N (number of terms)",
      "Set a = 0, b = 1",
      "Print a and b (if N >= 2)",
      "Loop i from 3 to N: next = a + b; print next; a = b; b = next"
    ]
  }
};
