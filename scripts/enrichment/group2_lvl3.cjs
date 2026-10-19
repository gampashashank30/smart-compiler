// Group 2: Level 3 topics enrichment (Modular & Memory)
module.exports = {
  "functions-basics": {
    whatIsIt: "Functions are self-contained modular blocks of reusable code designed to perform a specific task. Instead of repeating logic, functions allow you to write code once, pass arguments, and return values, making code maintainable, debuggable, and testable.",
    howItWorks: [
      { step: 1, title: "Function declaration (prototype)", description: "Declare the function signature `returnType name(params);` before `main()` so the compiler knows its interface." },
      { step: 2, title: "Function call", description: "Call the function from `main()` by passing actual parameters (arguments) matching the parameter types." },
      { step: 3, title: "Execution in call frame", description: "The CPU pushes a new stack frame for local variables, executes function logic, and prepares the return value." },
      { step: 4, title: "Return to caller", description: "The function terminates at `return value;`, the stack frame is popped, and execution resumes at the calling point." }
    ],
    keyTerms: [
      { term: "Function Prototype", definition: "A declaration specifying function name, return type, and parameter list before its actual definition." },
      { term: "Formal vs Actual Parameters", definition: "Formal parameters are variables in the function header; actual parameters are the values passed at call time." },
      { term: "Pass-by-Value", definition: "C copies argument values into function parameters by default; changes inside do not affect the original caller variables." },
      { term: "Call Stack Frame", definition: "Memory allocated automatically on the stack to store function arguments, local variables, and return addresses." }
    ],
    commonMistakes: [
      "Forgetting the function prototype when defining a function below `main()`, causing implicit declaration warnings.",
      "Mismatched return types: declaring `int` but not returning a value, causing garbage return values.",
      "Expecting pass-by-value changes to persist in caller variables without passing pointers.",
      "Redeclaring variable names with different types inside function parameter lists."
    ],
    realWorldExample: "A microwave oven: you press a button (function call), pass the time in seconds (argument), and it beeps with cooked food (return value).",
    logicKeySteps: [
      "Declare prototype above main()",
      "Define function with parameters and return type",
      "Call function inside main() passing arguments",
      "Capture and display return value"
    ]
  },
  "arrays-basics": {
    whatIsIt: "An array is a fixed-size, contiguous sequence of memory cells holding elements of the exact same data type. By using a single variable name and zero-based index numbers `arr[0], arr[1]...`, you can store and access hundreds of values in O(1) time.",
    howItWorks: [
      { step: 1, title: "Declare array size", description: "Allocate contiguous memory using `type name[SIZE];` (e.g., `int arr[5];` allocates 5 consecutive 4-byte integers)." },
      { step: 2, title: "Initialize elements", description: "Assign values using an initializer list `int arr[5] = {10, 20, 30, 40, 50};` or read via `scanf`." },
      { step: 3, title: "Access via index", description: "Use subscript operator `arr[i]` where `i` ranges strictly from 0 to `SIZE - 1`." },
      { step: 4, title: "Traverse with loop", description: "Use a `for (int i = 0; i < SIZE; i++)` loop to process or print each element." }
    ],
    keyTerms: [
      { term: "Contiguous Memory", definition: "Elements stored back-to-back in RAM with no gaps between consecutive indices." },
      { term: "Zero-based Indexing", definition: "Array positions begin at index 0 and conclude at index `size - 1`." },
      { term: "Base Address", definition: "The memory address of the first element `&arr[0]`; array name decays to this pointer." },
      { term: "Subscript Operator ([])", definition: "Calculates memory offset `base + (index * sizeof(type))` to achieve O(1) random access." }
    ],
    commonMistakes: [
      "Out of bounds access: accessing `arr[size]` which reads or corrupts adjacent memory outside the array.",
      "Assuming array size can grow dynamically in C: standard arrays have a fixed compile-time size.",
      "Forgetting to initialize local arrays: uninitialized arrays contain unpredictable garbage values.",
      "Trying to print the whole array with `printf(\"%d\", arr)` which prints a memory address instead of values."
    ],
    realWorldExample: "An egg carton with 12 slots numbered 0 to 11: each slot holds one egg of the same type.",
    logicKeySteps: [
      "Declare array of size N",
      "Read N elements using for loop and scanf",
      "Process or display elements using arr[i]",
      "Ensure loop boundary stays within 0 to N-1"
    ]
  },
  "arrays-max-min": {
    whatIsIt: "Finding the maximum and minimum elements in an array scans through elements in a single pass to track the extreme values. It teaches conditional updates and the essential pattern of seeding running trackers with the first element `arr[0]`.",
    howItWorks: [
      { step: 1, title: "Seed with first element", description: "Set `max = arr[0]` and `min = arr[0]` to establish valid baseline candidates." },
      { step: 2, title: "Linear scan from index 1", description: "Loop index `i` from 1 to `n - 1`, inspecting each element in turn." },
      { step: 3, title: "Update extremes", description: "If `arr[i] > max`, update `max = arr[i]`. If `arr[i] < min`, update `min = arr[i]`." },
      { step: 4, title: "Output results", description: "After one full pass (O(n) time), print the recorded maximum and minimum values." }
    ],
    keyTerms: [
      { term: "Linear Scan", definition: "Examining every element in sequential order from beginning to end." },
      { term: "Candidate Extreme", definition: "The running champion value that holds the record until a larger/smaller value appears." },
      { term: "Single-Pass Efficiency", definition: "Finding both min and max simultaneously in O(n) time without multiple traversals." },
      { term: "Valid Baseline Initialization", definition: "Initializing with `arr[0]` guarantees the candidate belongs to the actual dataset." }
    ],
    commonMistakes: [
      "Initializing `max = 0`: if all array elements are negative (e.g. -10, -5, -2), `max` remains 0, which is incorrect.",
      "Initializing `min = 0`: if all elements are positive, `min` erroneously stays 0.",
      "Starting loop at index 0 instead of 1 (redundantly comparing `arr[0]` with itself).",
      "Not checking for empty array input before dereferencing `arr[0]`."
    ],
    realWorldExample: "Checking temperatures throughout the year: you record highest summer heat and coldest winter freeze.",
    logicKeySteps: [
      "Read N and array elements",
      "Set max = arr[0] and min = arr[0]",
      "Loop i from 1 to N-1:",
      "  If arr[i] > max: max = arr[i]",
      "  If arr[i] < min: min = arr[i]",
      "Display max and min"
    ]
  },
  "arrays-sum": {
    whatIsIt: "Sum of array elements accumulates the numeric value of every item into a running total. It forms the computational foundation of statistical averages, variance, dot products, and signal processing filters.",
    howItWorks: [
      { step: 1, title: "Initialize accumulator", description: "Declare `sum = 0` before starting the loop." },
      { step: 2, title: "Iterate through elements", description: "Traverse array indices `i` from 0 to `n - 1`." },
      { step: 3, title: "Accumulate values", description: "Add each item to the accumulator using `sum += arr[i]`." },
      { step: 4, title: "Compute metrics", description: "Print total sum and optional average `(float)sum / n`." }
    ],
    keyTerms: [
      { term: "Accumulator Variable", definition: "A variable initialized to 0 that sums numeric values over successive iterations." },
      { term: "Array Reduction", definition: "Collapsing an array of multiple elements into a single aggregate scalar value." },
      { term: "Integer Division Truncation", definition: "Dividing two integers in C drops decimal fractions unless explicitly cast to float." },
      { term: "Running Total", definition: "The progressive sum maintained throughout sequential element traversal." }
    ],
    commonMistakes: [
      "Forgetting `sum = 0` initialization: uninitialized local variables contain garbage values that corrupt the total.",
      "Writing `i <= n` instead of `i < n` in loop condition, adding random memory beyond array bounds.",
      "Integer truncation when calculating average: `sum / n` yields an integer; write `(float)sum / n` instead.",
      "Adding index `i` instead of element value `arr[i]` (`sum += i`)."
    ],
    realWorldExample: "A supermarket cash register scanning items one by one and accumulating the total receipt bill.",
    logicKeySteps: [
      "Read N and array elements",
      "Set sum = 0",
      "For i from 0 to N-1: sum += arr[i]",
      "Display sum and average ((float)sum / N)"
    ]
  },
  "arrays-reverse": {
    whatIsIt: "Reversing an array inverts the sequence of elements so the first element becomes the last and vice-versa. Using the two-pointer technique, elements are swapped symmetrically in-place with O(1) auxiliary space.",
    howItWorks: [
      { step: 1, title: "Set two pointers", description: "Initialize `left = 0` at the start and `right = n - 1` at the end." },
      { step: 2, title: "Symmetrical swap", description: "Swap elements at `arr[left]` and `arr[right]` using a temporary variable." },
      { step: 3, title: "Advance pointers", description: "Increment `left++` and decrement `right--` to move inward toward the center." },
      { step: 4, title: "Termination condition", description: "Repeat while `left < right`; stop when pointers meet or cross." }
    ],
    keyTerms: [
      { term: "Two-Pointer Technique", definition: "Using two index variables starting at opposite boundaries converging toward the center." },
      { term: "In-Place Algorithm", definition: "An algorithm that transforms input without allocating additional array buffers (O(1) memory)." },
      { term: "Symmetrical Swapping", definition: "Exchanging element at index `i` with element at index `n - 1 - i`." },
      { term: "Convergence Boundary", definition: "The midpoint where left and right pointers meet (`left >= right`)." }
    ],
    commonMistakes: [
      "Looping from 0 to `n`: this swaps elements twice, restoring the array back to its original order.",
      "Setting initial right index to `n` instead of `n - 1`, swapping with out-of-bounds memory.",
      "Swapping indices `left` and `right` instead of array values `arr[left]` and `arr[right]`.",
      "Allocating an unnecessary second array when an in-place swap achieves the same result in O(1) space."
    ],
    realWorldExample: "Flipping a row of playing cards: card 1 swaps with card 10, card 2 with card 9, until the whole row is inverted.",
    logicKeySteps: [
      "Initialize left = 0, right = N - 1",
      "While left < right:",
      "  temp = arr[left]; arr[left] = arr[right]; arr[right] = temp",
      "  left++; right--",
      "Print reversed array"
    ]
  },
  "arrays-insert": {
    whatIsIt: "Inserting an element at an arbitrary position in an array requires shifting all subsequent elements one slot to the right to make room. Because arrays have fixed contiguous storage, elements must be physically relocated to maintain order.",
    howItWorks: [
      { step: 1, title: "Verify capacity", description: "Ensure the array has spare allocated capacity before inserting." },
      { step: 2, title: "Shift elements rightward", description: "Loop index `i` backwards from `n - 1` down to `pos`: copy `arr[i + 1] = arr[i]`." },
      { step: 3, title: "Insert target element", description: "Place the new value into the newly vacated position `arr[pos] = value`." },
      { step: 4, title: "Increment logical size", description: "Increment the count of elements `n = n + 1`." }
    ],
    keyTerms: [
      { term: "Rightward Shifting", definition: "Moving array elements towards higher indices to vacate an insertion slot." },
      { term: "Logical Size vs Capacity", definition: "Logical size is the number of active elements; capacity is the total allocated memory." },
      { term: "Insertion Index (pos)", definition: "The zero-based position where the new value will reside." },
      { term: "Contiguous Invariant", definition: "Arrays cannot have holes; all active elements must remain adjacent in memory." }
    ],
    commonMistakes: [
      "Shifting forward from `pos` to `n - 1`, which immediately overwrites and erases subsequent elements.",
      "Inserting into a full array without verifying capacity, causing memory buffer overflow.",
      "Off-by-one errors confusing 1-based human positions with 0-based array indices.",
      "Forgetting to increment the array length variable `n++` after insertion."
    ],
    realWorldExample: "People standing in a queue stepping back one pace to let an elderly person merge into the line.",
    logicKeySteps: [
      "Input position pos and new value",
      "For i from N-1 down to pos: arr[i+1] = arr[i]",
      "arr[pos] = value",
      "N = N + 1",
      "Display updated array"
    ]
  },
  "arrays-delete": {
    whatIsIt: "Deleting an element from an array removes the target item and shifts all subsequent elements one slot to the left to close the gap. The array's logical size is decremented by 1 while preserving the contiguous sequence.",
    howItWorks: [
      { step: 1, title: "Validate target position", description: "Confirm `pos >= 0` and `pos < n` to prevent invalid memory operations." },
      { step: 2, title: "Shift elements leftward", description: "Loop index `i` forward from `pos` up to `n - 2`: copy `arr[i] = arr[i + 1]`." },
      { step: 3, title: "Decrement logical size", description: "Decrease the count of active elements `n = n - 1`." },
      { step: 4, title: "Ignore abandoned tail", description: "The old last element at index `n` is now inactive and ignored by loops." }
    ],
    keyTerms: [
      { term: "Leftward Shifting", definition: "Copying subsequent elements to lower indices to collapse an empty slot." },
      { term: "Logical Deletion", definition: "Decreasing element count so the removed item is excluded from all future operations." },
      { term: "O(n) Deletion Time", definition: "Worst-case deletion at index 0 requires shifting all remaining `n - 1` elements." },
      { term: "Boundary Validation", definition: "Guarding against negative indices or indices beyond active array length." }
    ],
    commonMistakes: [
      "Shifting backwards, which clones elements rather than deleting the target.",
      "Loop condition running up to `n - 1` accessing `arr[i + 1]` out of bounds when `i = n - 1`.",
      "Forgetting to decrement `n--`, which leaves duplicate values visible at the end of the array.",
      "Failing to check for empty array before attempting deletion."
    ],
    realWorldExample: "A person leaving a queue at the bank: everyone behind them steps forward one step to close the space.",
    logicKeySteps: [
      "Input deletion position pos",
      "For i from pos to N-2: arr[i] = arr[i+1]",
      "N = N - 1",
      "Display updated array"
    ]
  },
  "arrays-add-two": {
    whatIsIt: "Element-wise addition combines two arrays of equal length by adding elements at matching indices: `C[i] = A[i] + B[i]`. It represents the 1-dimensional foundation of vector addition in graphics, physics, and machine learning.",
    howItWorks: [
      { step: 1, title: "Confirm dimensions", description: "Ensure both input arrays `A` and `B` have identical length `n`." },
      { step: 2, title: "Allocate result array", description: "Declare array `C` with capacity of at least `n` elements." },
      { step: 3, title: "Loop and sum", description: "Iterate `i` from 0 to `n - 1`, computing `C[i] = A[i] + B[i]` on each step." },
      { step: 4, title: "Display resultant array", description: "Print elements of `C` representing the combined vector." }
    ],
    keyTerms: [
      { term: "Element-Wise Operation", definition: "Applying a mathematical operator independently between corresponding index pairs of arrays." },
      { term: "Vector Addition", definition: "Summing matching coordinate components `(x1+x2, y1+y2, z1+z2)`." },
      { term: "Resultant Array", definition: "A separate destination array holding the computed sums." },
      { term: "Parallel Traversal", definition: "Advancing through multiple arrays using a single unified loop counter `i`." }
    ],
    commonMistakes: [
      "Mismatched array sizes: accessing indices beyond the shorter array's allocated length.",
      "Overwriting array `A` when original input data needs to be preserved.",
      "Integer overflow when adding large values near `INT_MAX`.",
      "Forgetting to allocate memory for result array `C` before writing to it."
    ],
    realWorldExample: "Adding monthly salary and bonus arrays together to calculate the total pay slip for each employee.",
    logicKeySteps: [
      "Read size N and elements of array A and B",
      "Declare array C of size N",
      "For i from 0 to N-1: C[i] = A[i] + B[i]",
      "Print elements of array C"
    ]
  },
  "arrays-subtract-two": {
    whatIsIt: "Element-wise subtraction computes the difference between corresponding items in two arrays: `C[i] = A[i] - B[i]`. Because subtraction is non-commutative (`A - B != B - A`), the operand order must be strictly preserved.",
    howItWorks: [
      { step: 1, title: "Verify array sizes", description: "Confirm both input arrays `A` and `B` share matching element counts." },
      { step: 2, title: "Iterate across indices", description: "Loop index `i` from 0 to `n - 1`." },
      { step: 3, title: "Compute difference", description: "Calculate `C[i] = A[i] - B[i]` and store into the result array." },
      { step: 4, title: "Output results", description: "Display the resulting array of difference values." }
    ],
    keyTerms: [
      { term: "Non-Commutative Operation", definition: "An operation where changing the order of operands alters the result (`A - B != B - A`)." },
      { term: "Component-Wise Difference", definition: "Subtracting corresponding scalar components between two vector sets." },
      { term: "Signed Integer Output", definition: "Differences can be negative; formatting must accommodate minus signs." },
      { term: "Parallel Processing", definition: "Operating on multiple sequences simultaneously within a single loop." }
    ],
    commonMistakes: [
      "Reversing the subtraction order `B[i] - A[i]`, inverting the signs of all answers.",
      "Out-of-bounds loop boundary reading uninitialized memory past the array end.",
      "Printing unsigned integers `%u` when differences are negative.",
      "Forgetting to initialize loop counter `i = 0`."
    ],
    realWorldExample: "Subtracting monthly expenses from monthly revenues to compute net profit for each month of the year.",
    logicKeySteps: [
      "Read size N and elements of arrays A and B",
      "For i from 0 to N-1: C[i] = A[i] - B[i]",
      "Display array C"
    ]
  },
  "arrays-2d-matrix": {
    whatIsIt: "A 2D array is a matrix structured into rows and columns, stored in memory in row-major order. In C, `arr[i][j]` accesses the element at row `i` and column `j` using nested loops to process tabular data.",
    howItWorks: [
      { step: 1, title: "Declare dimensions", description: "Define dimensions with `int matrix[ROWS][COLS];` allocating `ROWS * COLS` contiguous cells." },
      { step: 2, title: "Outer row loop", description: "Outer loop iterates row index `i` from 0 to `ROWS - 1`." },
      { step: 3, title: "Inner column loop", description: "Inner loop iterates column index `j` from 0 to `COLS - 1`." },
      { step: 4, title: "Row linebreak", description: "Print `\\n` after each completed row to display the matrix in a clean 2D grid." }
    ],
    keyTerms: [
      { term: "Row-Major Order", definition: "C stores 2D arrays row-by-row in linear contiguous RAM: `row 0` followed by `row 1`." },
      { term: "Nested Iteration", definition: "Using an outer loop for rows and an inner loop for columns." },
      { term: "Matrix Coordinates", definition: "Identifying elements via pair `(i, j)` where `i` is row index and `j` is column index." },
      { term: "Base Offset Calculation", definition: "Address formula `base + (i * COLS + j) * sizeof(type)` used by compiler." }
    ],
    commonMistakes: [
      "Swapping row and column indices `matrix[j][i]` causing out-of-bounds crashes on non-square matrices.",
      "Omission of column dimension in function parameters (must write `void func(int mat[][COLS])`).",
      "Missing `\\n` newline after completing each row, printing the entire 2D grid on a single horizontal line.",
      "Confusing total array elements (`ROWS * COLS`) with individual loop boundary limits."
    ],
    realWorldExample: "A spreadsheet table or chessboard with 8 rows and 8 columns of squares.",
    logicKeySteps: [
      "Read row count R and col count C",
      "For i from 0 to R-1:",
      "  For j from 0 to C-1: read matrix[i][j]",
      "For i from 0 to R-1:",
      "  For j from 0 to C-1: print matrix[i][j]",
      "  Print newline"
    ]
  },
  "matrix-addition": {
    whatIsIt: "Matrix addition adds two matrices of identical row and column counts by summing corresponding elements: `C[i][j] = A[i][j] + B[i][j]`. It teaches nested-loop matrix manipulation and dimensional compatibility rules.",
    howItWorks: [
      { step: 1, title: "Validate dimensions", description: "Verify both matrices have matching dimensions `m x n`." },
      { step: 2, title: "Row traversal", description: "Outer loop runs `i` from 0 to `rows - 1`." },
      { step: 3, title: "Column traversal & sum", description: "Inner loop runs `j` from 0 to `cols - 1`, assigning `C[i][j] = A[i][j] + B[i][j]`." },
      { step: 4, title: "Format matrix output", description: "Display rows with clean tabular spacing and newlines." }
    ],
    keyTerms: [
      { term: "Conformal Matrices", definition: "Matrices having the exact same number of rows and columns, required for addition." },
      { term: "Matrix Element Sum", definition: "Adding scalar values at matching row and column coordinates." },
      { term: "Double Nested Loop", definition: "Two nested loops traversing `rows` and `cols`." },
      { term: "Tabular Output Formatting", definition: "Using `%4d` to ensure matrix columns line up evenly in console output." }
    ],
    commonMistakes: [
      "Attempting to add matrices with differing row or column dimensions.",
      "Inverting loop limits: running row loop to `cols` and column loop to `rows`.",
      "Missing `\\n` after completing each row when printing the sum matrix.",
      "Writing `C[i][j] = A[i] + B[j]` instead of `A[i][j] + B[i][j]`."
    ],
    realWorldExample: "Combining pixel brightness values of two video frames for image blending and transparency effects.",
    logicKeySteps: [
      "Verify both matrices have dimensions R x C",
      "For i from 0 to R-1:",
      "  For j from 0 to C-1:",
      "    C[i][j] = A[i][j] + B[i][j]",
      "Display matrix C with row newlines"
    ]
  },
  "matrix-subtraction": {
    whatIsIt: "Matrix subtraction subtracts the second matrix from the first matrix element by element: `C[i][j] = A[i][j] - B[i][j]`. Both matrices must have identical dimensions for the subtraction to be defined.",
    howItWorks: [
      { step: 1, title: "Dimension check", description: "Ensure both matrices have identical row count `m` and column count `n`." },
      { step: 2, title: "Outer loop across rows", description: "Iterate row counter `i` from 0 to `m - 1`." },
      { step: 3, title: "Inner loop across columns", description: "Iterate column counter `j` from 0 to `n - 1`, computing `C[i][j] = A[i][j] - B[i][j]`." },
      { step: 4, title: "Print difference grid", description: "Print each row of differences separated by tabs or spaces with a newline." }
    ],
    keyTerms: [
      { term: "Component Difference", definition: "Subtracting corresponding entries across equal-sized grids." },
      { term: "Operand Order Sensitivity", definition: "Matrix subtraction is non-commutative: `A - B != B - A`." },
      { term: "Matrix Dimensions (m x n)", definition: "The number of rows `m` and columns `n` defining matrix shape." },
      { term: "Tabular Display", definition: "Formatting negative and positive numbers in aligned columns." }
    ],
    commonMistakes: [
      "Swapping matrices `B[i][j] - A[i][j]`, flipping the signs of all resulting elements.",
      "Confusing row and column loop boundaries in nested loops.",
      "Forgetting newline `\\n` between rows.",
      "Using single loops for 2D matrix traversal without mapping linear indices."
    ],
    realWorldExample: "Subtracting a background reference image from a live security camera frame to detect moving objects.",
    logicKeySteps: [
      "Input rows R, cols C and elements of A and B",
      "For i from 0 to R-1:",
      "  For j from 0 to C-1: C[i][j] = A[i][j] - B[i][j]",
      "Print matrix C"
    ]
  },
  "matrix-multiplication": {
    whatIsIt: "Matrix multiplication calculates the dot product of rows from the first matrix `A(m x k)` with columns from the second matrix `B(k x n)` to yield `C(m x n)`. The number of columns in `A` must strictly equal the number of rows in `B`.",
    howItWorks: [
      { step: 1, title: "Validate inner dimensions", description: "Confirm `colsA == rowsB`; if not, matrix multiplication is mathematically impossible." },
      { step: 2, title: "Outer loops for row and column", description: "Loop `i` from 0 to `rowsA - 1` and `j` from 0 to `colsB - 1`." },
      { step: 3, title: "Innermost dot-product loop", description: "Initialize `sum = 0`, then loop `k` from 0 to `colsA - 1`: accumulate `sum += A[i][k] * B[k][j]`." },
      { step: 4, title: "Store and format output", description: "Assign `C[i][j] = sum`, and display the resulting `m x n` matrix." }
    ],
    keyTerms: [
      { term: "Dot Product", definition: "Sum of element-wise products between a row vector and a column vector." },
      { term: "Dimension Compatibility", definition: "Multiplication requires `cols(A) == rows(B)`; resultant matrix has shape `rows(A) x cols(B)`." },
      { term: "Triple Nested Loop", definition: "Three nested loops (i, j, k) yielding standard O(n^3) matrix multiplication complexity." },
      { term: "Accumulator Initialization", definition: "Setting `sum = 0` before the innermost `k` loop for each `C[i][j]` cell." }
    ],
    commonMistakes: [
      "Multiplying element-wise `A[i][j] * B[i][j]` instead of row-by-column dot products.",
      "Forgetting to reset `sum = 0` inside the `j` loop before the `k` loop runs.",
      "Using wrong loop boundary limits in the `k` loop (must run to `colsA` or `rowsB`).",
      "Attempting multiplication when `colsA != rowsB` without validation."
    ],
    realWorldExample: "3D computer graphics transformations: multiplying rotation, scale, and translation matrices to position 3D models.",
    logicKeySteps: [
      "Check if colsA == rowsB; abort if false",
      "For i from 0 to rowsA-1:",
      "  For j from 0 to colsB-1:",
      "    sum = 0",
      "    For k from 0 to colsA-1: sum += A[i][k] * B[k][j]",
      "    C[i][j] = sum",
      "Display matrix C"
    ]
  },
  "matrix-transpose": {
    whatIsIt: "Transposing a matrix flips it over its main diagonal, switching its row and column indices: `T[j][i] = A[i][j]`. An `m x n` matrix becomes an `n x m` transposed matrix.",
    howItWorks: [
      { step: 1, title: "Determine transposed size", description: "If original matrix is `m x n`, transpose `T` has dimensions `n x m`." },
      { step: 2, title: "Traverse original matrix", description: "Loop `i` from 0 to `m - 1` and `j` from 0 to `n - 1`." },
      { step: 3, title: "Map inverted coordinates", description: "Assign `T[j][i] = A[i][j]`." },
      { step: 4, title: "Print transposed matrix", description: "Display `T` using `n` rows and `m` columns." }
    ],
    keyTerms: [
      { term: "Main Diagonal", definition: "The line of cells from top-left to bottom-right where row index equals column index `i == j`." },
      { term: "Inverted Dimensions", definition: "Rows become columns and columns become rows (`m x n` -> `n x m`)." },
      { term: "Symmetric Matrix", definition: "A square matrix equal to its own transpose (`A[i][j] == A[j][i]`)." },
      { term: "Index Inversion", definition: "Swapping subscript positions from `(i, j)` to `(j, i)`." }
    ],
    commonMistakes: [
      "In-place transpose on non-square matrices causing memory corruption and out-of-bounds writes.",
      "Swapping elements twice when doing in-place square transpose, returning back to the original matrix.",
      "Printing transpose using original row/column dimensions instead of inverted bounds.",
      "Allocating `m x n` for transpose when it requires `n x m` memory."
    ],
    realWorldExample: "Rotating a spreadsheet table so horizontal rows of dates become vertical columns.",
    logicKeySteps: [
      "Read matrix A with rows R and cols C",
      "For i from 0 to R-1:",
      "  For j from 0 to C-1:",
      "    T[j][i] = A[i][j]",
      "Print matrix T with C rows and R cols"
    ]
  },
  "strings-operations": {
    whatIsIt: "In C, strings are null-terminated character arrays ending with the null byte `\\0`. Standard operations include computing length (`strlen`), copying (`strcpy`), concatenating (`strcat`), and lexicographical comparison (`strcmp`) from `<string.h>`.",
    howItWorks: [
      { step: 1, title: "Allocate buffer with null room", description: "Declare character array with size at least `length + 1` to accommodate `\\0`." },
      { step: 2, title: "Read string safely", description: "Read using `fgets(str, sizeof(str), stdin)` to prevent buffer overflows." },
      { step: 3, title: "Perform string operation", description: "Use `<string.h>` functions or manual loops terminating at `str[i] == '\\0'`." },
      { step: 4, title: "Ensure null termination", description: "Always guarantee the destination string concludes with `\\0`." }
    ],
    keyTerms: [
      { term: "Null Terminator ('\\0')", definition: "ASCII value 0 marking the end of a string in C; without it, functions read into garbage memory." },
      { term: "Buffer Overflow", definition: "Writing characters beyond allocated array capacity, causing crashes and security exploits." },
      { term: "String Length vs Array Size", definition: "Length is count of characters before `\\0`; size is total allocated bytes in memory." },
      { term: "Lexicographical Comparison", definition: "Comparing strings character-by-character based on ASCII values using `strcmp()`." }
    ],
    commonMistakes: [
      "Using `==` to compare strings (`str1 == str2` compares memory addresses, not string contents; use `strcmp`).",
      "Using dangerous `gets()`, which allows buffer overflow attacks; use `fgets()` instead.",
      "Forgetting `+ 1` space for the null terminator when allocating string arrays.",
      "Missing null terminator after manual character array manipulation, causing `printf(\"%s\")` to print garbage."
    ],
    realWorldExample: "A train with a special caboose at the end: the caboose (`\\0`) tells everyone the train is finished.",
    logicKeySteps: [
      "Declare char array with size N + 1",
      "Read string using fgets",
      "Demonstrate strlen, strcpy, strcat, or strcmp",
      "Display results"
    ]
  },
  "strings-vowel-count": {
    whatIsIt: "Counting vowels in a string scans each character to detect 'a', 'e', 'i', 'o', 'u' (both lowercase and uppercase). It teaches character traversal, conditional filtering, and the use of `<ctype.h>` functions like `tolower()`.",
    howItWorks: [
      { step: 1, title: "Initialize vowel counter", description: "Set `vowelCount = 0`." },
      { step: 2, title: "Iterate to null terminator", description: "Loop index `i` through string while `str[i] != '\\0'`." },
      { step: 3, title: "Case-insensitive check", description: "Convert `c = tolower(str[i])` and check if `c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'`." },
      { step: 4, title: "Increment and display", description: "Increment `vowelCount++` on match, and print total count when loop finishes." }
    ],
    keyTerms: [
      { term: "Character Traversal", definition: "Visiting each character sequentially until reaching the null terminator `\\0`." },
      { term: "Case Normalization", definition: "Using `tolower()` or `toupper()` from `<ctype.h>` to simplify conditional checks." },
      { term: "Vowel Set", definition: "The letters A, E, I, O, U in the Latin alphabet." },
      { term: "Compound Disjunction", definition: "Using `||` (logical OR) to test against multiple character matches." }
    ],
    commonMistakes: [
      "Checking only lowercase vowels and missing uppercase vowels like 'A' or 'E'.",
      "Comparing characters using double quotes `\"a\"` (string pointer) instead of single quotes `'a'` (char literal).",
      "Reading strings with `scanf(\"%s\")` which stops at the first space; use `fgets()` to read full sentences.",
      "Looping beyond the null terminator into unallocated memory."
    ],
    realWorldExample: "A text readability analyzer or word game counting vowels to determine syllable counts.",
    logicKeySteps: [
      "Read string input using fgets",
      "Set count = 0",
      "For each character until '\\0':",
      "  Convert to lowercase using tolower()",
      "  If char is 'a','e','i','o','u': count++",
      "Print count"
    ]
  },
  "pointers-basics": {
    whatIsIt: "A pointer is a variable that stores the direct memory address of another variable. Pointers are C's most powerful feature, enabling dynamic memory allocation (`malloc`), pass-by-reference function mutation, and efficient linked data structures.",
    howItWorks: [
      { step: 1, title: "Declare pointer variable", description: "Write `type *ptr;` where asterisk denotes that `ptr` stores a memory address of that type." },
      { step: 2, title: "Address-of operator (&)", description: "Assign a variable's address using `ptr = &var;`." },
      { step: 3, title: "Dereference operator (*)", description: "Access or modify the value at that address using `*ptr` (e.g., `*ptr = 50;` changes `var`)." },
      { step: 4, title: "Pass-by-reference", description: "Pass `&var` to functions to allow the function to directly alter the caller's variable." }
    ],
    keyTerms: [
      { term: "Memory Address (&)", definition: "The hexadecimal byte location in RAM where a variable is stored." },
      { term: "Dereference Operator (*)", definition: "Follows a pointer to read or write the actual value stored at the referenced memory address." },
      { term: "Null Pointer (NULL)", definition: "A pointer assigned to address 0, signifying it points to nothing valid." },
      { term: "Wild / Dangling Pointer", definition: "An uninitialized pointer or pointer referencing deallocated memory, causing segmentation faults." }
    ],
    commonMistakes: [
      "Dereferencing uninitialized pointers (`int *p; *p = 10;`) causing instant segmentation faults.",
      "Confusing `*` in declarations (`int *p`) with `*` in dereferencing expressions (`*p = 5`).",
      "Assigning variable value instead of address (`p = var` instead of `p = &var`).",
      "Returning a pointer to a local stack variable from a function, which becomes invalid upon return."
    ],
    realWorldExample: "A house address written on a piece of paper: the paper isn't the house, but it tells you exactly where the house is located.",
    logicKeySteps: [
      "Declare int var = 10 and int *ptr",
      "Assign ptr = &var",
      "Print var value and ptr address",
      "Modify *ptr = 20 and show var updated",
      "Demonstrate pointer arithmetic"
    ]
  },
  "factorial-iterative": {
    whatIsIt: "Iterative factorial computes `n! = 1 * 2 * 3 * ... * n` using an explicit loop and accumulator variable. It runs in O(n) time and O(1) space, avoiding the call-stack memory overhead and stack-overflow risks of recursion.",
    howItWorks: [
      { step: 1, title: "Handle base cases", description: "If `n == 0` or `n == 1`, return 1 immediately by mathematical definition." },
      { step: 2, title: "Initialize accumulator", description: "Declare `long long fact = 1;` (must start at 1, not 0)." },
      { step: 3, title: "Loop and multiply", description: "Iterate `i` from 2 up to `n`, multiplying `fact *= i` on each pass." },
      { step: 4, title: "Return computed product", description: "Print or return `fact`." }
    ],
    keyTerms: [
      { term: "Factorial (n!)", definition: "The product of all positive integers less than or equal to n, with 0! defined as 1." },
      { term: "Iterative Loop", definition: "Repeating calculations using explicit loop constructs (`for`, `while`) with O(1) auxiliary space." },
      { term: "Integer Overflow", definition: "Factorials grow extremely rapidly; 13! overflows 32-bit `int`, requiring `long long`." },
      { term: "Base Case (0! = 1)", definition: "The mathematical identity where the empty product equals 1." }
    ],
    commonMistakes: [
      "Initializing `fact = 0`, which makes every subsequent multiplication zero.",
      "Using standard 32-bit `int` which overflows at `n = 13` (use `long long` or `unsigned long long`).",
      "Negative number inputs: factorial of negative numbers is undefined in basic arithmetic.",
      "Off-by-one loop limit `i < n` instead of `i <= n` missing the final factor."
    ],
    realWorldExample: "Calculating the number of ways to arrange books on a shelf: 5 books have 5! = 120 possible arrangements.",
    logicKeySteps: [
      "Read integer n",
      "If n < 0, print error (undefined for negative)",
      "Set fact = 1",
      "For i from 1 to n: fact *= i",
      "Print fact"
    ]
  }
};
