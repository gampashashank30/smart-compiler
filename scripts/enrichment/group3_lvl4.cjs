// Group 3: Level 4 topics enrichment (Algorithms & Recursion)
module.exports = {
  "recursion-fibonacci": {
    whatIsIt: "Recursive Fibonacci computes the n-th Fibonacci number where `F(n) = F(n-1) + F(n-2)`. Each recursive call splits into two child subproblems, forming a binary recursion tree that illustrates divide-and-conquer logic and call stack mechanics.",
    howItWorks: [
      { step: 1, title: "Define base conditions", description: "If `n <= 0` return 0; if `n == 1` return 1, stopping infinite recursion." },
      { step: 2, title: "Divide into subproblems", description: "In the recursive step, invoke `fib(n - 1)` and `fib(n - 2)`." },
      { step: 3, title: "Push stack frames", description: "The CPU pushes separate activation records on the call stack for each branch." },
      { step: 4, title: "Unwind and combine", description: "Once base cases return, the stack unwinds, adding the two sub-results together." }
    ],
    keyTerms: [
      { term: "Base Case", definition: "The condition under which a recursive function returns directly without making further recursive calls." },
      { term: "Recursive Tree", definition: "A branching visualization of recursive sub-calls demonstrating tree-like expansion." },
      { term: "Overlapping Subproblems", definition: "Naive recursion computes identical values (like `fib(3)`) repeatedly, causing O(2^n) exponential blowup." },
      { term: "Call Stack Overflow", definition: "Exhausting system stack memory when recursive depth exceeds stack limits." }
    ],
    commonMistakes: [
      "Missing or incomplete base case causing infinite recursion and segmentation fault (stack overflow).",
      "Calling with large values of n (e.g. n > 40): naive recursion takes minutes/hours due to O(2^n) complexity.",
      "Negative argument inputs causing infinite downward recursion.",
      "Forgetting to return the result of the recursive calls (`return fib(n-1) + fib(n-2);`)."
    ],
    realWorldExample: "Branching tree limbs: a parent branch splits into two smaller branches, each of which splits again.",
    logicKeySteps: [
      "Define function fib(n)",
      "If n <= 0, return 0; if n == 1, return 1",
      "Return fib(n-1) + fib(n-2)",
      "In main(), read n and print fib(n)"
    ]
  },
  "factorial-recursive": {
    whatIsIt: "Recursive factorial calculates `n!` using the recurrence relation `n! = n * (n - 1)!` with base condition `0! = 1`. Each function invocation suspends its execution on the system call stack until the subproblem is fully evaluated.",
    howItWorks: [
      { step: 1, title: "Check base case", description: "If `n <= 1`, return 1 immediately without further recursive calls." },
      { step: 2, title: "Recursive call", description: "Invoke `factorial(n - 1)` to evaluate the subproblem of size `n - 1`." },
      { step: 3, title: "Stack frame accumulation", description: "Each paused call frame retains its local `n` value on the call stack." },
      { step: 4, title: "Unwind and multiply", description: "As base returns, multiply `n * subresult` and return to the previous caller." }
    ],
    keyTerms: [
      { term: "Recursive Invariant", definition: "Reducing the problem instance toward the base condition with every recursive step." },
      { term: "Activation Record / Frame", definition: "A block of stack memory storing local parameters and the return instruction address." },
      { term: "Stack Unwinding", definition: "The phase when base cases resolve and pending operations execute in reverse call order." },
      { term: "Linear Recursion", definition: "A recursive pattern where each function invocation makes at most one recursive call." }
    ],
    commonMistakes: [
      "Omitting base case `n <= 1`, causing infinite downward recursion into negative numbers.",
      "Integer overflow: `long long` overflows around `n = 20`, while standard `int` overflows at `n = 13`.",
      "Passing `n` instead of `n - 1` to recursive call, freezing execution in an infinite loop.",
      "Negative number inputs causing stack overflow unless guarded by an initial validation check."
    ],
    realWorldExample: "Russian Matryoshka nesting dolls: opening doll n reveals doll n-1 until you reach the solid baby doll at the core.",
    logicKeySteps: [
      "Define function factorial(n)",
      "If n <= 1, return 1",
      "Return n * factorial(n - 1)",
      "In main(), read n, validate non-negative, and display result"
    ]
  },
  "towers-of-hanoi": {
    whatIsIt: "Towers of Hanoi is a classic mathematical puzzle where n disks must be transferred from a source peg to a destination peg using an auxiliary peg. Only one disk can move at a time, and a larger disk can never be placed atop a smaller disk.",
    howItWorks: [
      { step: 1, title: "Base case (n = 1)", description: "If `n == 1`, move disk 1 directly from source to destination peg." },
      { step: 2, title: "Move n - 1 disks to auxiliary", description: "Recursively move `n - 1` disks from source to auxiliary peg using destination as helper." },
      { step: 3, title: "Move n-th disk", description: "Directly move the largest n-th disk from source to destination peg." },
      { step: 4, title: "Move n - 1 disks to destination", description: "Recursively move `n - 1` disks from auxiliary to destination peg using source as helper." }
    ],
    keyTerms: [
      { term: "Auxiliary Peg", definition: "The intermediate holding peg used temporarily during disk transfers." },
      { term: "Divide and Conquer", definition: "Breaking an n-disk problem into two smaller (n-1)-disk problems and one single-disk move." },
      { term: "Optimal Move Count (2^n - 1)", definition: "The exact minimum number of individual moves required to solve an n-disk puzzle." },
      { term: "Peg Role Rotation", definition: "Alternating source, auxiliary, and destination parameters between recursive call levels." }
    ],
    commonMistakes: [
      "Swapping peg parameters in recursive calls, causing disks to be moved to the wrong pegs.",
      "Missing the base condition `if (n == 0) return;` or `if (n == 1) ...`.",
      "Placing a larger disk on a smaller disk by violating the recursive decomposition rules.",
      "Trying to solve iteratively with loops, which is far more complex than the 3-line recursive solution."
    ],
    realWorldExample: "Backing cars out of a narrow one-lane driveway using a temporary side garage to let the innermost car leave.",
    logicKeySteps: [
      "Define hanoi(n, source, destination, auxiliary)",
      "If n == 0, return",
      "hanoi(n-1, source, auxiliary, destination)",
      "Print move: source -> destination",
      "hanoi(n-1, auxiliary, destination, source)"
    ]
  },
  "search-linear": {
    whatIsIt: "Linear search sequentially checks each element of an array from start to finish until the target key is found or the end of the array is reached. It requires no sorting, works on any data collection, and runs in O(n) time and O(1) space.",
    howItWorks: [
      { step: 1, title: "Start at index 0", description: "Set loop counter `i = 0` to begin at the array's first position." },
      { step: 2, title: "Compare with target key", description: "Check if `arr[i] == key` on each iteration." },
      { step: 3, title: "Early termination on match", description: "If match is found, return the current index `i` immediately without checking further." },
      { step: 4, title: "Return sentinel on failure", description: "If the loop finishes without finding the key, return `-1` to indicate not found." }
    ],
    keyTerms: [
      { term: "Sequential Scan", definition: "Visiting elements one by one in chronological order from beginning to end." },
      { term: "Target Key", definition: "The specific search value being queried within the dataset." },
      { term: "Sentinel Value (-1)", definition: "A conventional return value indicating that the search key was absent from the array." },
      { term: "Worst-Case Complexity O(n)", definition: "When the key is in the last slot or not present at all, requiring n comparisons." }
    ],
    commonMistakes: [
      "Returning `-1` inside the loop body on the first mismatch instead of after the loop completes.",
      "Running loop condition `i <= n` causing an out-of-bounds read past the array end.",
      "Assuming the array must be sorted (linear search works on both unsorted and sorted data).",
      "Not handling duplicate keys when only the first or all occurrences are required."
    ],
    realWorldExample: "Looking for a specific book on an unsorted shelf by reading titles one-by-one from left to right.",
    logicKeySteps: [
      "Input array and search key",
      "For i from 0 to N-1:",
      "  If arr[i] == key: return i",
      "If loop completes without match: return -1"
    ]
  },
  "search-binary": {
    whatIsIt: "Binary search finds a target key in a sorted array by repeatedly dividing the search space in half. Comparing the target with the middle element eliminates 50% of the remaining search space in each step, achieving O(log n) efficiency.",
    howItWorks: [
      { step: 1, title: "Set search boundaries", description: "Initialize `low = 0` and `high = n - 1` marking the active search window." },
      { step: 2, title: "Compute middle index", description: "Calculate `mid = low + (high - low) / 2` to safely avoid integer overflow." },
      { step: 3, title: "Compare target with middle", description: "If `arr[mid] == key`, return `mid`. If `key < arr[mid]`, search left `high = mid - 1`. If `key > arr[mid]`, search right `low = mid + 1`." },
      { step: 4, title: "Loop until exhausted", description: "Repeat while `low <= high`; if `low > high`, key is not present, return `-1`." }
    ],
    keyTerms: [
      { term: "Search Space Halving", definition: "Discarding half of the remaining items with each comparison, yielding O(log n) time." },
      { term: "Sorted Precondition", definition: "Binary search strictly requires data to be sorted in advance; it fails on unsorted arrays." },
      { term: "Midpoint Calculation Overflow", definition: "Using `(low + high) / 2` can overflow `INT_MAX`; `low + (high - low) / 2` is safe." },
      { term: "Logarithmic Time O(log n)", definition: "Searching 1,000,000 elements requires at most 20 comparisons (2^20 > 1,000,000)." }
    ],
    commonMistakes: [
      "Running binary search on an unsorted array, producing unpredictable, incorrect results.",
      "Integer overflow bug: `(low + high) / 2` overflows when `low + high > 2,147,483,647`.",
      "Loop boundary bug: using `mid` instead of `mid - 1` or `mid + 1`, causing infinite loops when key is missing.",
      "Using `low < high` instead of `low <= high`, missing targets located at boundary elements."
    ],
    realWorldExample: "Opening a printed dictionary to the middle: if you see 'M' and need 'T', you ignore the entire front half.",
    logicKeySteps: [
      "Sort array if not already sorted",
      "Initialize low = 0, high = N - 1",
      "While low <= high:",
      "  mid = low + (high - low) / 2",
      "  If arr[mid] == key: return mid",
      "  Else if key < arr[mid]: high = mid - 1",
      "  Else: low = mid + 1",
      "Return -1"
    ]
  },
  "sort-bubble": {
    whatIsIt: "Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. With each complete pass, the largest unsorted element 'bubbles up' to its correct final position at the end of the array.",
    howItWorks: [
      { step: 1, title: "Outer pass loop", description: "Run outer loop `i` from 0 to `n - 2` across `n - 1` passes." },
      { step: 2, title: "Inner adjacent comparisons", description: "Run inner loop `j` from 0 to `n - i - 2`, comparing `arr[j]` with `arr[j + 1]`." },
      { step: 3, title: "Swap on inversion", description: "If `arr[j] > arr[j + 1]`, swap them using a temporary variable." },
      { step: 4, title: "Optimized early exit", description: "Track swaps with a boolean flag; if no swaps occurred during a pass, array is sorted, break early." }
    ],
    keyTerms: [
      { term: "Adjacent Swapping", definition: "Comparing and exchanging consecutive pairs `(arr[j], arr[j+1])` throughout the array." },
      { term: "Stable Sort", definition: "Preserves the relative original order of elements that have equal comparison keys." },
      { term: "Adaptive Optimization", definition: "Using a `swapped` flag to achieve O(n) best-case runtime on already-sorted arrays." },
      { term: "In-Place Sorting", definition: "Rearranges elements within the original array using O(1) auxiliary memory." }
    ],
    commonMistakes: [
      "Inner loop limit `j < n - 1` without `- i`, redundantly re-comparing already sorted elements at the tail.",
      "Forgetting the `swapped` optimization flag, forcing O(n^2) runtime even on already sorted arrays.",
      "Comparing with out-of-bounds index `arr[j+1]` when inner loop runs up to `n - 1`.",
      "Inverting comparison operator `<` causing unintentional descending sort order."
    ],
    realWorldExample: "Bubbles rising in a carbonated soda: larger bubbles rise quickly to the surface, followed by smaller ones.",
    logicKeySteps: [
      "For i from 0 to N-2:",
      "  swapped = 0",
      "  For j from 0 to N-i-2:",
      "    If arr[j] > arr[j+1]: swap(arr[j], arr[j+1]); swapped = 1",
      "  If swapped == 0: break",
      "Array is sorted"
    ]
  },
  "sort-selection": {
    whatIsIt: "Selection sort divides the array into a sorted prefix and an unsorted suffix. In each pass, it finds the smallest element in the unsorted suffix and swaps it with the first unsorted element, growing the sorted prefix by one.",
    howItWorks: [
      { step: 1, title: "Track unsorted boundary", description: "Outer loop index `i` runs from 0 to `n - 2`, marking the start of the unsorted portion." },
      { step: 2, title: "Find minimum element", description: "Assume `min_idx = i`, then scan `j` from `i + 1` to `n - 1` to find the smallest value." },
      { step: 3, title: "Single swap per pass", description: "If `min_idx != i`, swap `arr[i]` with `arr[min_idx]`." },
      { step: 4, title: "Repeat until sorted", description: "Each pass places exactly one element in its final sorted position with minimal memory writes (at most n swaps)." }
    ],
    keyTerms: [
      { term: "Minimum Selection", definition: "Scanning the unsorted subarray to locate the minimum value." },
      { term: "Minimal Memory Writes (O(n))", definition: "Makes at most n swaps, ideal when writing to EEPROM or flash memory is expensive." },
      { term: "Unstable Sort", definition: "Long-range swaps can alter the relative order of duplicate elements." },
      { term: "Quadratic Comparisons (O(n^2))", definition: "Always performs n*(n-1)/2 comparisons regardless of initial array ordering." }
    ],
    commonMistakes: [
      "Swapping immediately inside the inner loop whenever a smaller value is found, degenerating into bubble sort.",
      "Inner loop starting at 0 instead of `i + 1`, re-checking already sorted items.",
      "Outer loop running to `n` instead of `n - 1`, doing an unnecessary pass for a 1-element subarray.",
      "Assuming selection sort is adaptive (it always takes O(n^2) comparisons even if sorted)."
    ],
    realWorldExample: "Selecting the shortest student in a group to stand first in line, then selecting the next shortest, and repeating.",
    logicKeySteps: [
      "For i from 0 to N-2:",
      "  min_idx = i",
      "  For j from i+1 to N-1:",
      "    If arr[j] < arr[min_idx]: min_idx = j",
      "  If min_idx != i: swap(arr[i], arr[min_idx])",
      "Display sorted array"
    ]
  },
  "sort-insertion": {
    whatIsIt: "Insertion sort builds the final sorted array one item at a time by picking the next element and shifting larger preceding elements rightward to insert it into its correct relative position. It mirrors how people naturally sort playing cards in hand.",
    howItWorks: [
      { step: 1, title: "Assume first element sorted", description: "Start loop at index `i = 1`, treating `arr[0]` as a trivial 1-element sorted subarray." },
      { step: 2, title: "Extract key element", description: "Store `key = arr[i]` into a temporary variable to vacate slot `i`." },
      { step: 3, title: "Shift larger elements right", description: "Scan backwards `j = i - 1`; while `j >= 0` and `arr[j] > key`, shift `arr[j + 1] = arr[j]`." },
      { step: 4, title: "Insert key into slot", description: "Place `key` into the cleared position `arr[j + 1] = key`." }
    ],
    keyTerms: [
      { term: "Online Algorithm", definition: "Can sort data incrementally as it receives new elements in real time without having entire dataset upfront." },
      { term: "Rightward Shifting", definition: "Moving sorted elements one position right to create space for the key element." },
      { term: "Adaptive O(n) Best Case", definition: "Runs in linear O(n) time with zero shifts if the input array is already sorted." },
      { term: "Stable In-Place Sort", definition: "Maintains relative order of equal keys without allocating auxiliary array buffers." }
    ],
    commonMistakes: [
      "Using swaps instead of shifts, performing 3x more memory write operations than necessary.",
      "Not decrementing `j--` inside the while loop, triggering an infinite loop.",
      "Overwriting `arr[j+1]` before saving `key = arr[i]` in temporary storage.",
      "Loop condition index underflow: missing `j >= 0` check leading to negative index access `arr[-1]`."
    ],
    realWorldExample: "Sorting a hand of playing cards: as each card is dealt, you slide it between the cards where it belongs.",
    logicKeySteps: [
      "For i from 1 to N-1:",
      "  key = arr[i]",
      "  j = i - 1",
      "  While j >= 0 and arr[j] > key:",
      "    arr[j + 1] = arr[j]",
      "    j = j - 1",
      "  arr[j + 1] = key"
    ]
  },
  "sort-merge": {
    whatIsIt: "Merge sort is a divide-and-conquer algorithm that recursively splits an array into two equal halves until single-element subarrays remain, then merges the sorted halves back together in order. It guarantees O(n log n) runtime in all cases.",
    howItWorks: [
      { step: 1, title: "Divide step", description: "Compute midpoint `mid = left + (right - left) / 2` to split array into two equal halves." },
      { step: 2, title: "Conquer recursively", description: "Call `mergeSort(arr, left, mid)` and `mergeSort(arr, mid + 1, right)`." },
      { step: 3, title: "Merge two sorted halves", description: "Use two pointers `i` and `j` to compare elements from left and right halves, placing smaller into temp array." },
      { step: 4, title: "Copy back to original", description: "Copy merged elements from temporary array back into `arr[left...right]`." }
    ],
    keyTerms: [
      { term: "Divide and Conquer", definition: "Breaking a problem into smaller identical subproblems, solving recursively, and combining solutions." },
      { term: "Guaranteed O(n log n)", definition: "Performs O(n log n) comparisons in best, average, and worst cases with no degenerate inputs." },
      { term: "Auxiliary Memory O(n)", definition: "Requires temporary buffer memory of size n to merge subarrays." },
      { term: "Stable Sorting", definition: "Never swaps non-adjacent elements across equal keys, preserving original input order." }
    ],
    commonMistakes: [
      "Failing to copy remaining elements from either the left or right subarray after the main merge loop finishes.",
      "Memory leak: dynamically allocating temp buffers inside merge without freeing them.",
      "Base case omission: missing `if (left >= right) return;` causing infinite recursive stack overflow.",
      "Midpoint overflow: using `(left + right) / 2` instead of `left + (right - left) / 2`."
    ],
    realWorldExample: "Sorting two pre-sorted stacks of exam papers into a single alphabetical pile by comparing top papers.",
    logicKeySteps: [
      "mergeSort(arr, left, right):",
      "  If left < right:",
      "    mid = left + (right - left) / 2",
      "    mergeSort(arr, left, mid)",
      "    mergeSort(arr, mid + 1, right)",
      "    merge(arr, left, mid, right)"
    ]
  },
  "sort-quick": {
    whatIsIt: "Quick sort is a high-speed divide-and-conquer algorithm that selects a pivot element and partitions the array so all elements smaller than pivot go left and larger go right. It then sorts partitions recursively with low memory overhead.",
    howItWorks: [
      { step: 1, title: "Choose pivot", description: "Select pivot element (e.g., last element `arr[high]`, first, or random)." },
      { step: 2, title: "Partition array", description: "Scan array and swap elements so all values `<= pivot` are placed left of a boundary pointer `i`." },
      { step: 3, title: "Place pivot in position", description: "Swap pivot into its final sorted position at `i + 1`, returning partition index `pi`." },
      { step: 4, title: "Recurse on partitions", description: "Recursively call `quickSort(arr, low, pi - 1)` and `quickSort(arr, pi + 1, high)`." }
    ],
    keyTerms: [
      { term: "Pivot Element", definition: "The reference value used to partition array into smaller and larger subarrays." },
      { term: "Lomuto Partitioning", definition: "Standard partitioning scheme using two pointers moving in the same direction." },
      { term: "In-Place Partition", definition: "Rearranges elements with O(1) auxiliary space and O(log n) call stack space." },
      { term: "Worst-Case O(n^2)", definition: "Degrades to quadratic time when pivot consistently produces unbalanced partitions (e.g. sorted input with last element pivot)." }
    ],
    commonMistakes: [
      "Including the pivot index `pi` in recursive calls (`quickSort(arr, low, pi)`), creating infinite recursion.",
      "Choosing poor pivots on sorted inputs causing worst-case O(n^2) degradation.",
      "Partition pointer off-by-one errors when elements match the pivot value.",
      "Unstable sorting: quicksort can swap non-adjacent identical keys across the pivot."
    ],
    realWorldExample: "Organizing students by height: pick student X as reference; everyone shorter moves left, everyone taller moves right.",
    logicKeySteps: [
      "quickSort(arr, low, high):",
      "  If low < high:",
      "    pi = partition(arr, low, high)",
      "    quickSort(arr, low, pi - 1)",
      "    quickSort(arr, pi + 1, high)"
    ]
  },
  "sort-shell": {
    whatIsIt: "Shell sort is an optimization of insertion sort that allows exchanges of elements separated by diminishing gap intervals. By comparing widely spaced items first, elements move long distances rapidly, making the final gap=1 insertion pass blisteringly fast.",
    howItWorks: [
      { step: 1, title: "Initialize gap sequence", description: "Start with a large gap interval `gap = n / 2` (or Knuth sequence)." },
      { step: 2, title: "Gapped insertion sort", description: "Perform insertion sort on elements spaced `gap` positions apart." },
      { step: 3, title: "Diminish gap", description: "Reduce the gap interval on each outer pass using `gap = gap / 2`." },
      { step: 4, title: "Final insertion pass", description: "When `gap == 1`, perform a standard insertion sort on the nearly-sorted array, which runs in near O(n) time." }
    ],
    keyTerms: [
      { term: "Gap Interval", definition: "The stride or spacing between elements compared and swapped during a pass." },
      { term: "Diminishing Increment Sort", definition: "Successively shrinking the gap until it reaches 1." },
      { term: "Subarray Interleaving", definition: "Sorting multiple interleaved subarrays simultaneously defined by the gap stride." },
      { term: "Nearly-Sorted Efficiency", definition: "Insertion sort achieves linear O(n) performance on pre-sorted data, which Shell sort exploits." }
    ],
    commonMistakes: [
      "Failing to reduce gap down to 1, leaving the array incompletely sorted.",
      "Using wrong stride increment inside inner loops (`j++` instead of `j -= gap`).",
      "Setting initial gap larger than array size.",
      "Assuming Shell sort is stable (long-distance gap swaps break stability)."
    ],
    realWorldExample: "Rough sorting construction materials into broad zones before finely arranging individual bricks on shelves.",
    logicKeySteps: [
      "For gap = N / 2; gap > 0; gap /= 2:",
      "  For i from gap to N-1:",
      "    temp = arr[i]",
      "    j = i",
      "    While j >= gap and arr[j - gap] > temp:",
      "      arr[j] = arr[j - gap]",
      "      j -= gap",
      "    arr[j] = temp"
    ]
  }
};
