// Group 4: Level 5 topics enrichment (Data Structures)
module.exports = {
  "infix-to-postfix": {
    whatIsIt: "Infix to postfix conversion translates human-readable mathematical formulas (like `A + B * C`) into Reverse Polish Notation (`A B C * +`). This eliminates parentheses and operator ambiguity, allowing computers to evaluate complex expressions in a single linear pass using a stack.",
    howItWorks: [
      { step: 1, title: "Scan tokens left-to-right", description: "Read operands and operators sequentially from the input infix string." },
      { step: 2, title: "Output operands directly", description: "Append alphanumeric operands (numbers/variables) directly to the postfix output." },
      { step: 3, title: "Stack operators by precedence", description: "Pop operators from stack to output while they have higher or equal precedence than incoming operator, then push incoming operator." },
      { step: 4, title: "Handle parentheses and flush", description: "Push '(' to stack; upon ')', pop to output until '(' is reached. Flush remaining stack at end." }
    ],
    keyTerms: [
      { term: "Reverse Polish Notation (RPN)", definition: "Postfix notation where operators follow their operands, requiring no parentheses for precedence." },
      { term: "Operator Precedence", definition: "Hierarchy determining operation order: `^` (highest) > `*`, `/` > `+`, `-` (lowest)." },
      { term: "Operator Associativity", definition: "Left-to-right evaluation for `+`, `-`, `*`, `/` vs right-to-left for power `^`." },
      { term: "Stack Unwinding on Closure", definition: "Popping operators until matching open parenthesis is encountered." }
    ],
    commonMistakes: [
      "Forgetting to pop and output remaining stack operators after scanning the entire infix string.",
      "Appending parenthesis characters '(' or ')' to the postfix output string.",
      "Incorrect precedence logic: popping on `<` instead of `<=` for left-associative operators.",
      "Stack underflow when encountering unmatched closing parentheses."
    ],
    realWorldExample: "HP scientific calculators, compiler syntax parsers, and PostScript printing engines.",
    logicKeySteps: [
      "Initialize operator stack",
      "Scan each character of infix expression:",
      "  If operand: append to output",
      "  If '(': push to stack",
      "  If ')': pop stack to output until '('",
      "  If operator: pop higher/equal precedence to output, push current",
      "Pop remaining operators to output"
    ]
  },
  "singly-linked-list": {
    whatIsIt: "A singly linked list is a linear collection of data nodes where each node contains a value and a pointer (`next`) pointing to the following node. Nodes are dynamically allocated in heap memory, allowing the list to grow and shrink without contiguous memory limitations.",
    howItWorks: [
      { step: 1, title: "Define node structure", description: "Declare `struct Node { int data; struct Node *next; };`." },
      { step: 2, title: "Allocate head node", description: "Create new nodes using `malloc(sizeof(struct Node))` and set `head` pointer." },
      { step: 3, title: "Link consecutive nodes", description: "Set each node's `next` pointer to point to the address of the succeeding node." },
      { step: 4, title: "Terminate with NULL", description: "Set the `next` pointer of the final node to `NULL` to mark the end of the list." }
    ],
    keyTerms: [
      { term: "Head Pointer", definition: "A pointer referencing the first node in the list; losing head orphans the entire list in memory." },
      { term: "Dynamic Node Allocation (`malloc`)", definition: "Allocating individual node memory from the system heap at runtime." },
      { term: "Next Pointer", definition: "A pointer field holding the address of the subsequent node in memory." },
      { term: "Null Termination", definition: "The last node's `next` pointer holds `NULL` indicating the boundary of the list." }
    ],
    commonMistakes: [
      "Losing the head pointer by reassigning `head = head->next` during traversal, causing memory leaks.",
      "Dereferencing `NULL` pointers when attempting to read `temp->next` on an empty list.",
      "Failing to check if `malloc()` returned `NULL` when memory is exhausted.",
      "Forgetting to call `free()` on removed nodes, creating persistent memory leaks."
    ],
    realWorldExample: "A scavenger hunt: each clue written on a piece of paper gives you the location of the next clue.",
    logicKeySteps: [
      "Define struct Node",
      "Create new node with malloc(), set data and next = NULL",
      "Insert at head: new_node->next = head; head = new_node",
      "Traverse: curr = head; while curr != NULL: process curr->data; curr = curr->next"
    ]
  },
  "doubly-linked-list": {
    whatIsIt: "A doubly linked list is a linked data structure where each node contains two pointers: `next` referencing the successor and `prev` referencing the predecessor. This allows bidirectional traversal and O(1) node deletion when a node reference is given.",
    howItWorks: [
      { step: 1, title: "Define bidirectional node", description: "Declare `struct Node { int data; struct Node *prev; struct Node *next; };`." },
      { step: 2, title: "Connect forward link", description: "Assign `newNode->next = current->next` to establish the forward path." },
      { step: 3, title: "Connect backward link", description: "Assign `newNode->prev = current` and update neighbor's `prev` pointer." },
      { step: 4, title: "Handle boundary ends", description: "Head's `prev` and tail's `next` must point to `NULL` to signify list terminations." }
    ],
    keyTerms: [
      { term: "Predecessor Pointer (`prev`)", definition: "A pointer referencing the preceding node in the list sequence." },
      { term: "Successor Pointer (`next`)", definition: "A pointer referencing the subsequent node in the list sequence." },
      { term: "Bidirectional Traversal", definition: "The capability to traverse elements forward from head or backward from tail." },
      { term: "O(1) Local Deletion", definition: "A node can remove itself in constant time by linking its `prev` and `next` neighbors directly." }
    ],
    commonMistakes: [
      "Updating `next` but forgetting to update `prev`, breaking backward traversal links.",
      "Dereferencing `NULL` pointer when modifying `temp->prev` on the first node or `temp->next` on the last node.",
      "Memory leak by deleting a node without freeing its allocated heap memory.",
      "Overwriting pointers in the wrong sequence, severing the link to the rest of the list."
    ],
    realWorldExample: "Browser Back and Forward navigation buttons, or an interactive music playlist where you can skip to next or previous song.",
    logicKeySteps: [
      "Define struct Node with prev, data, next",
      "Create node with malloc()",
      "Link newNode->next = head; if head != NULL: head->prev = newNode; head = newNode",
      "Traverse forward via next, or backward via prev"
    ]
  },
  "circular-linked-list": {
    whatIsIt: "A circular linked list is a sequence of nodes where the last node points back to the first node (head) instead of `NULL`. This circular structure makes it ideal for round-robin scheduling, cyclical buffers, and continuous playlist loops.",
    howItWorks: [
      { step: 1, title: "Circular head link", description: "A single-node circular list points to itself: `head->next = head`." },
      { step: 2, title: "Insert new node", description: "Find the last node and update its `next` pointer to point to the new node." },
      { step: 3, title: "Maintain loop invariant", description: "Set the new node's `next` pointer to point back to `head`." },
      { step: 4, title: "Traverse with do-while", description: "Use `do { ... } while (curr != head);` to visit every node and terminate upon returning to the start." }
    ],
    keyTerms: [
      { term: "Circular Reference", definition: "The tail node connects directly to the head node with no `NULL` terminator." },
      { term: "Do-While Traversal", definition: "Essential traversal loop ensuring the body runs before checking if pointer returned to head." },
      { term: "Tail Pointer Optimization", definition: "Maintaining a pointer to the tail provides O(1) access to both tail and head (`tail->next`)." },
      { term: "Round-Robin Cycle", definition: "Continuous cyclical rotation through a set of resources or scheduled processes." }
    ],
    commonMistakes: [
      "Using `while (curr != NULL)` which creates an infinite loop because a circular list has no `NULL`.",
      "Failing to update the last node's `next` pointer when inserting a new head node.",
      "Deleting the only remaining node without resetting `head = NULL`.",
      "Losing list reference by advancing head without maintaining circularity."
    ],
    realWorldExample: "CPU Round-Robin process scheduling or multiplayer games rotating turns in a circle endlessly.",
    logicKeySteps: [
      "Create node; if list empty: head = node; node->next = head",
      "If not empty: traverse to tail where tail->next == head",
      "tail->next = newNode; newNode->next = head",
      "Traverse: curr = head; do { print curr->data; curr = curr->next; } while(curr != head);"
    ]
  },
  "reverse-linked-list": {
    whatIsIt: "Reversing a singly linked list inverts the direction of all `next` pointers so the tail becomes the new head and head points to `NULL`. This is done iteratively in O(n) time and O(1) auxiliary space using three tracking pointers: prev, curr, and next.",
    howItWorks: [
      { step: 1, title: "Initialize tracking pointers", description: "Set `prev = NULL`, `curr = head`, and `next = NULL`." },
      { step: 2, title: "Save successor node", description: "Before reversing the link, save `next = curr->next` to avoid losing the rest of the list." },
      { step: 3, title: "Reverse pointer direction", description: "Redirect `curr->next = prev` to point backward." },
      { step: 4, title: "Advance and reassign head", description: "Move `prev = curr` and `curr = next`; repeat until `curr == NULL`, then set `head = prev`." }
    ],
    keyTerms: [
      { term: "Three-Pointer Technique", definition: "Using `prev`, `curr`, and `next` pointers to safely manipulate references without data loss." },
      { term: "In-Place Reversal", definition: "Reversing pointers directly in memory without allocating new nodes or auxiliary memory." },
      { term: "Link Redirection", definition: "Changing `curr->next` to point to predecessor `prev`." },
      { term: "New Head Assignment", definition: "When `curr` reaches `NULL`, `prev` points to the new head of the reversed list." }
    ],
    commonMistakes: [
      "Severing the list: changing `curr->next = prev` before saving `curr->next`, losing access to subsequent nodes.",
      "Returning `curr` instead of `prev` (`curr` is always `NULL` upon loop termination).",
      "Forgetting to terminate the old head node with `NULL`, creating cycles in the list.",
      "Not handling empty or single-node lists gracefully."
    ],
    realWorldExample: "Reversing an 'Undo' history stack into a 'Redo' chain in text editors.",
    logicKeySteps: [
      "prev = NULL, curr = head",
      "While curr != NULL:",
      "  next = curr->next",
      "  curr->next = prev",
      "  prev = curr",
      "  curr = next",
      "head = prev"
    ]
  },
  "linked-list-length": {
    whatIsIt: "Calculating the length of a linked list counts the total number of nodes by traversing from the head pointer until a `NULL` pointer is encountered. Unlike arrays, linked lists do not store pre-allocated capacity, requiring O(n) traversal to count elements.",
    howItWorks: [
      { step: 1, title: "Initialize counter", description: "Set `count = 0` to track the node tally." },
      { step: 2, title: "Set traversal pointer", description: "Initialize temporary pointer `curr = head` to preserve the original head reference." },
      { step: 3, title: "Iterate and count", description: "While `curr != NULL`, increment `count++` and advance `curr = curr->next`." },
      { step: 4, title: "Return total count", description: "When `curr` becomes `NULL`, return `count` as the length of the list." }
    ],
    keyTerms: [
      { term: "Linear Traversal", definition: "Visiting each node in sequence from start to finish in O(n) time." },
      { term: "Temporary Traversal Pointer", definition: "A pointer used to walk the list without modifying the permanent `head` pointer." },
      { term: "Null Termination Check", definition: "Testing `curr != NULL` to ensure all valid nodes are counted before stopping." },
      { term: "Dynamic Size", definition: "Linked lists grow and shrink dynamically; length must be counted or cached." }
    ],
    commonMistakes: [
      "Modifying `head` directly (`head = head->next`) which permanently destroys the list.",
      "Off-by-one error using `curr->next != NULL`, which stops one node too early and misses the tail node.",
      "Infinite loop if the linked list contains a cycle/loop (requires Floyd's cycle detection).",
      "Crash on empty list if not checking for `head == NULL`."
    ],
    realWorldExample: "Counting train carriages by walking from the engine to the final caboose.",
    logicKeySteps: [
      "count = 0, curr = head",
      "While curr != NULL:",
      "  count++",
      "  curr = curr->next",
      "Return count"
    ]
  },
  "stack-array": {
    whatIsIt: "A stack is a Last-In, First-Out (LIFO) linear data structure where elements are added and removed exclusively from one end, called the top. An array implementation tracks the top element using an integer index, providing O(1) push and pop operations within fixed bounds.",
    howItWorks: [
      { step: 1, title: "Initialize top pointer", description: "Set `top = -1` indicating an empty stack." },
      { step: 2, title: "Push operation", description: "Check if `top == MAX - 1` (overflow); if not, increment `top++` and store `stack[top] = val`." },
      { step: 3, title: "Pop operation", description: "Check if `top == -1` (underflow); if not, retrieve `val = stack[top]` and decrement `top--`." },
      { step: 4, title: "Peek operation", description: "Inspect `stack[top]` without modifying the top pointer." }
    ],
    keyTerms: [
      { term: "LIFO (Last-In First-Out)", definition: "The most recently inserted element is always the first one to be removed." },
      { term: "Stack Overflow", definition: "Attempting to push an element onto a stack that has reached its maximum array capacity." },
      { term: "Stack Underflow", definition: "Attempting to pop or peek from an empty stack (`top == -1`)." },
      { term: "Top Index Tracker", definition: "An integer variable indexing the current topmost active element in the array." }
    ],
    commonMistakes: [
      "Pushing to a full stack without checking `top == MAX - 1`, causing buffer overflow.",
      "Popping from an empty stack without checking `top == -1`, causing negative index memory access `stack[-1]`.",
      "Incrementing `top` after assigning value instead of before in a 0-indexed array stack.",
      "Confusing peek (read top) with pop (read and remove top)."
    ],
    realWorldExample: "A stack of dinner plates in a cafeteria: plates are placed on top and removed from the top.",
    logicKeySteps: [
      "Initialize top = -1, stack array of size MAX",
      "push(x): if top == MAX-1: error overflow; else top++; stack[top] = x",
      "pop(): if top == -1: error underflow; else val = stack[top]; top--; return val",
      "peek(): return stack[top] if top != -1"
    ]
  },
  "stack-linked-list": {
    whatIsIt: "A linked list stack implements LIFO operations dynamically using heap-allocated nodes, allowing the stack to grow and shrink without a fixed capacity ceiling. Push and pop operations are performed exclusively at the head of the list in O(1) time.",
    howItWorks: [
      { step: 1, title: "Initialize stack top", description: "Set `struct Node *top = NULL;` representing an empty stack." },
      { step: 2, title: "Push at head", description: "Allocate node, set `newNode->data = val`, point `newNode->next = top`, and update `top = newNode`." },
      { step: 3, title: "Pop from head", description: "Save `top->data`, advance `temp = top; top = top->next;`, and `free(temp)`." },
      { step: 4, title: "Check empty status", description: "Stack is empty if `top == NULL`; dynamic stacks never experience overflow unless system RAM is exhausted." }
    ],
    keyTerms: [
      { term: "Dynamic Stack", definition: "A stack that allocates nodes on demand from the heap, removing fixed array size limits." },
      { term: "Head Push/Pop", definition: "Operating exclusively at the head node ensures O(1) constant time for all stack operations." },
      { term: "Node Deallocation (`free`)", definition: "Releasing popped node memory back to the heap to prevent memory leaks." },
      { term: "Heap Exhaustion", definition: "The only scenario where push fails: when `malloc()` returns `NULL`." }
    ],
    commonMistakes: [
      "Memory leak: popping a node by reassigning `top = top->next` without calling `free()` on the removed node.",
      "Dereferencing `NULL` pointer when calling pop on an empty stack without checking `top == NULL`.",
      "Pushing to the tail of the linked list, which requires O(n) traversal instead of O(1) head insertion.",
      "Not checking if `malloc()` returns `NULL` during push."
    ],
    realWorldExample: "Call stack in operating systems and runtimes: each function call pushes a stack frame to heap/stack memory dynamically.",
    logicKeySteps: [
      "top = NULL",
      "push(val): node = malloc(); node->data = val; node->next = top; top = node",
      "pop(): if top == NULL: error underflow; temp = top; val = temp->data; top = top->next; free(temp); return val",
      "isEmpty(): return top == NULL"
    ]
  },
  "stack-push-pop": {
    whatIsIt: "Push and Pop are the two fundamental mutator operations governing stack data structures. Push places a new element onto the top of the stack, while Pop removes and returns the topmost element, strictly enforcing LIFO ordering.",
    howItWorks: [
      { step: 1, title: "Verify push precondition", description: "Check whether stack is full before pushing to prevent overflow." },
      { step: 2, title: "Execute push mutation", description: "Adjust top index/pointer and assign the incoming data element." },
      { step: 3, title: "Verify pop precondition", description: "Check whether stack is empty before popping to prevent underflow." },
      { step: 4, title: "Execute pop mutation", description: "Extract the top value, adjust top index/pointer, and return the extracted value." }
    ],
    keyTerms: [
      { term: "Push Operation", definition: "Inserting an element onto the top of the stack." },
      { term: "Pop Operation", definition: "Removing and returning the most recently pushed element from the top." },
      { term: "Precondition Verification", definition: "Guarding against boundary violations (overflow on push, underflow on pop)." },
      { term: "LIFO Invariant", definition: "The fundamental ordering guarantee that last inserted is first removed." }
    ],
    commonMistakes: [
      "Popping from an empty stack causing crashes or returning garbage memory.",
      "Decrementing the top pointer before reading the value during pop, discarding the wrong element.",
      "Incrementing the top pointer after writing data in a 0-indexed array stack.",
      "Forgetting to return the popped value to the calling function."
    ],
    realWorldExample: "A spring-loaded PEZ candy dispenser: inserting candy pushes it down; opening the top pops the latest candy out.",
    logicKeySteps: [
      "Ensure stack data structure initialized",
      "Implement push(x) with overflow guard",
      "Implement pop() with underflow guard",
      "Demonstrate sequence of push and pop calls"
    ]
  },
  "stack-balanced-parentheses": {
    whatIsIt: "Balanced parentheses validation uses a stack to verify that every opening bracket `(`, `{`, `[` has a corresponding, correctly nested closing bracket `)`, `}`, `]`. It is the foundational parsing mechanism used in compilers, text editors, and mathematical evaluators.",
    howItWorks: [
      { step: 1, title: "Scan expression characters", description: "Iterate through string characters from left to right." },
      { step: 2, title: "Push opening brackets", description: "Whenever an opening bracket `(`, `{`, `[` is encountered, push it onto the stack." },
      { step: 3, title: "Match closing brackets", description: "Upon meeting a closing bracket, check for underflow (unmatched closing) and verify popped bracket matches type." },
      { step: 4, title: "Inspect final stack", description: "Expression is balanced if and only if the stack is completely empty after scanning." }
    ],
    keyTerms: [
      { term: "Bracket Matching", definition: "Verifying corresponding pairs of opening and closing delimiters: `()`, `{}`, `[]`." },
      { term: "Nesting Invariant", definition: "The most recently opened bracket must be the first one closed." },
      { term: "Premature Underflow", definition: "Encountering a closing bracket when the stack is empty indicates an extra closing bracket." },
      { term: "Dangling Opening Brackets", definition: "A non-empty stack at the end of the string indicates unclosed opening brackets." }
    ],
    commonMistakes: [
      "Declaring the string valid when the stack still has unclosed brackets at the end (e.g. `((()` leaves 2 brackets on stack).",
      "Crashing on underflow when string starts with a closing bracket like `)` without checking `isEmpty()`.",
      "Mismatched bracket types: allowing `[)` to pass without checking if popped type matches closing type.",
      "Failing to handle non-bracket characters like numbers or arithmetic operators."
    ],
    realWorldExample: "C compiler checking code syntax: missing a closing brace `}` causes a syntax error at EOF.",
    logicKeySteps: [
      "Initialize char stack",
      "For each char c in string:",
      "  If c in '(', '{', '[': push(c)",
      "  Else if c in ')', '}', ']':",
      "    If stack is empty: return false",
      "    top = pop(); if not matching(top, c): return false",
      "Return stack.isEmpty()"
    ]
  },
  "queue-array": {
    whatIsIt: "A queue is a First-In, First-Out (FIFO) linear data structure where elements are inserted at the rear and removed from the front. An array implementation tracks `front` and `rear` indices to manage enqueue and dequeue in O(1) time.",
    howItWorks: [
      { step: 1, title: "Initialize front and rear", description: "Set `front = 0` and `rear = -1` (or both -1) to signify an empty queue." },
      { step: 2, title: "Enqueue at rear", description: "Check if `rear == MAX - 1` (overflow); if not, increment `rear++` and assign `queue[rear] = val`." },
      { step: 3, title: "Dequeue from front", description: "Check if `front > rear` (underflow); if not, retrieve `queue[front]` and increment `front++`." },
      { step: 4, title: "Empty condition", description: "Queue is empty when `front > rear` (or `front == -1`)." }
    ],
    keyTerms: [
      { term: "FIFO (First-In First-Out)", definition: "The earliest inserted element is always the first one to be removed." },
      { term: "Front Index", definition: "Pointer/index tracking the departure point where elements are dequeued." },
      { term: "Rear Index", definition: "Pointer/index tracking the arrival point where new elements are enqueued." },
      { term: "Linear False Overflow", definition: "When `rear == MAX - 1` even though earlier slots vacated by dequeue are empty." }
    ],
    commonMistakes: [
      "False overflow: a linear array queue fills up and rejects enqueues even if front slots are empty.",
      "Dequeuing from an empty queue causing negative or out-of-bounds index access.",
      "Forgetting to reset `front` and `rear` to -1 when the queue becomes empty.",
      "Off-by-one error: checking `rear == MAX` instead of `rear == MAX - 1`."
    ],
    realWorldExample: "A queue of people at a ticket counter: the first person in line gets served and departs first.",
    logicKeySteps: [
      "Initialize front = 0, rear = -1, array of size MAX",
      "enqueue(x): if rear == MAX-1: error overflow; else rear++; queue[rear] = x",
      "dequeue(): if front > rear: error underflow; else val = queue[front]; front++; return val",
      "isEmpty(): return front > rear"
    ]
  },
  "queue-linked-list": {
    whatIsIt: "A linked list queue provides a dynamic FIFO data structure with unlimited capacity by maintaining two pointers: `front` referencing the head node and `rear` referencing the tail node. Enqueue adds at rear and dequeue removes from front in O(1) time.",
    howItWorks: [
      { step: 1, title: "Initialize dual pointers", description: "Set `front = NULL` and `rear = NULL` representing an empty queue." },
      { step: 2, title: "Enqueue at tail", description: "Allocate node; if empty, set `front = rear = node`; otherwise link `rear->next = node` and update `rear = node`." },
      { step: 3, title: "Dequeue from head", description: "Save `front->data`, advance `front = front->next`, and `free()` old front node." },
      { step: 4, title: "Reset on empty", description: "If `front` becomes `NULL`, set `rear = NULL` as well to prevent dangling pointers." }
    ],
    keyTerms: [
      { term: "Dual-Ended Pointers", definition: "Maintaining separate pointers to both head (`front`) and tail (`rear`) enables O(1) operations at both ends." },
      { term: "Dynamic FIFO Queue", definition: "Allocates nodes as needed with no capacity ceiling." },
      { term: "Dangling Rear Pointer", definition: "Failing to set `rear = NULL` when the last node is dequeued leaves `rear` pointing to freed memory." },
      { term: "O(1) Enqueue and Dequeue", definition: "Constant-time insertions at rear and removals from front." }
    ],
    commonMistakes: [
      "Forgetting to set `rear = NULL` when dequeuing the final node, creating a dangling pointer.",
      "Memory leak by advancing `front` without freeing the dequeued node.",
      "Dereferencing `NULL` front pointer when dequeuing from an empty queue.",
      "Inverting operations: dequeuing from rear requires O(n) traversal in singly linked lists; always dequeue from front."
    ],
    realWorldExample: "Print job spooler: documents submitted for printing queue up dynamically and print in submission order.",
    logicKeySteps: [
      "front = NULL, rear = NULL",
      "enqueue(val): node = malloc(); node->data = val; node->next = NULL;",
      "  if rear == NULL: front = rear = node; else rear->next = node; rear = node",
      "dequeue(): if front == NULL: error underflow; temp = front; val = temp->data; front = front->next; if front == NULL: rear = NULL; free(temp); return val"
    ]
  },
  "circular-queue": {
    whatIsIt: "A circular queue connects the last position of an array back to the first position like a ring using modulo arithmetic `(index + 1) % SIZE`. This eliminates the 'false overflow' problem of linear queues by reusing empty slots vacated by dequeue operations.",
    howItWorks: [
      { step: 1, title: "Initialize indices", description: "Set `front = -1` and `rear = -1` to represent an empty circular queue." },
      { step: 2, title: "Check full condition", description: "Queue is full when `(rear + 1) % SIZE == front`." },
      { step: 3, title: "Enqueue with wrap-around", description: "Advance `rear = (rear + 1) % SIZE`, insert data; if first element, also set `front = 0`." },
      { step: 4, title: "Dequeue with wrap-around", description: "Extract item; if `front == rear`, queue becomes empty (reset both to -1); else `front = (front + 1) % SIZE`." }
    ],
    keyTerms: [
      { term: "Ring Buffer", definition: "A circular memory structure that wraps around seamlessly using modular arithmetic." },
      { term: "Modulo Arithmetic ((i + 1) % SIZE)", definition: "Ensures array indices wrap back to index 0 after reaching index `SIZE - 1`." },
      { term: "Full Condition ((rear + 1) % SIZE == front)", definition: "Identifies when the rear has caught up to the front pointer in the ring." },
      { term: "False Overflow Elimination", definition: "Reusing vacated slots at the front of the array." }
    ],
    commonMistakes: [
      "Confusing the full condition `(rear + 1) % SIZE == front` with the empty condition `front == -1`.",
      "Forgetting to reset both `front = -1` and `rear = -1` when the last remaining element is dequeued.",
      "Using linear increment `rear++` instead of modulo arithmetic `(rear + 1) % SIZE`.",
      "Off-by-one error in ring size calculation."
    ],
    realWorldExample: "Audio ring buffers in music players and streaming services, continuously buffering playback data.",
    logicKeySteps: [
      "front = -1, rear = -1, array of size SIZE",
      "enqueue(x): if (rear + 1) % SIZE == front: error full",
      "  if front == -1: front = 0",
      "  rear = (rear + 1) % SIZE; queue[rear] = x",
      "dequeue(): if front == -1: error empty; val = queue[front]",
      "  if front == rear: front = rear = -1; else front = (front + 1) % SIZE; return val"
    ]
  },
  "dequeue": {
    whatIsIt: "A double-ended queue (deque) is a generalized queue where insertion and deletion of elements can be performed at both the front and rear ends. It can function as both a FIFO queue and a LIFO stack, or a hybrid of both.",
    howItWorks: [
      { step: 1, title: "Insert at front", description: "Decrement front circularly `front = (front - 1 + SIZE) % SIZE` and insert data." },
      { step: 2, title: "Insert at rear", description: "Increment rear circularly `rear = (rear + 1) % SIZE` and insert data." },
      { step: 3, title: "Delete from front", description: "Extract data and increment front circularly `front = (front + 1) % SIZE`." },
      { step: 4, title: "Delete from rear", description: "Extract data and decrement rear circularly `rear = (rear - 1 + SIZE) % SIZE`." }
    ],
    keyTerms: [
      { term: "Double-Ended Queue (Deque)", definition: "A sequence allowing insertion and removal at both extremities in O(1) time." },
      { term: "Circular Wrap-around", definition: "Using modulo arithmetic with `+ SIZE` to safely handle negative pointer decrements in C." },
      { term: "Input-Restricted Deque", definition: "A deque variation allowing insertion at only one end, but deletion at both ends." },
      { term: "Output-Restricted Deque", definition: "A deque variation allowing deletion at only one end, but insertion at both ends." }
    ],
    commonMistakes: [
      "Negative modulo bug: in C, `(-1) % SIZE` evaluates to `-1`; you must write `(front - 1 + SIZE) % SIZE`.",
      "Failing to check full condition before inserting at either end.",
      "Forgetting to handle single-element reset (`front = rear = -1`) upon deleting the last item.",
      "Inconsistent front and rear pointer boundaries."
    ],
    realWorldExample: "Web browser undo/redo history where items are added/removed from both ends, or sliding window maximum algorithms.",
    logicKeySteps: [
      "Initialize front = -1, rear = -1",
      "insertFront(x): check full; front = (front - 1 + SIZE) % SIZE; arr[front] = x",
      "insertRear(x): check full; rear = (rear + 1) % SIZE; arr[rear] = x",
      "deleteFront(): check empty; val = arr[front]; update front; return val",
      "deleteRear(): check empty; val = arr[rear]; update rear; return val"
    ]
  },
  "binary-tree": {
    whatIsIt: "A binary tree is a hierarchical non-linear data structure where each node has at most two children, referred to as the left child and right child. The topmost node is the root, and nodes with no children are leaf nodes.",
    howItWorks: [
      { step: 1, title: "Define binary node struct", description: "Declare `struct Node { int data; struct Node *left; struct Node *right; };`." },
      { step: 2, title: "Create root node", description: "Allocate memory with `malloc()` and initialize child pointers `left = right = NULL`." },
      { step: 3, title: "Attach child nodes", description: "Link child node addresses to parent node's `left` and `right` pointer fields." },
      { step: 4, title: "Hierarchical recursion", description: "Traverse or operate on subtrees recursively using the root reference." }
    ],
    keyTerms: [
      { term: "Root Node", definition: "The single ancestor node at the top of the tree with no parent." },
      { term: "Leaf Node", definition: "A terminal node with both `left == NULL` and `right == NULL`." },
      { term: "Left & Right Subtrees", definition: "The binary child trees rooted at a node's left and right pointers." },
      { term: "Tree Depth & Height", definition: "Depth is distance from root; height is number of edges on the longest path down to a leaf." }
    ],
    commonMistakes: [
      "Not initializing child pointers to `NULL`, creating wild pointers that cause segmentation faults.",
      "Confusing a general binary tree with a binary search tree (general binary trees do not enforce sorted order).",
      "Losing subtree references when modifying parent links.",
      "Stack overflow when processing deeply unbalanced trees using naive recursion."
    ],
    realWorldExample: "An organizational hierarchy chart or family ancestry tree branching into paternal and maternal lineages.",
    logicKeySteps: [
      "Define struct Node with data, left, right",
      "createNode(val): node = malloc(); node->data = val; node->left = node->right = NULL; return node",
      "Build tree by linking root->left and root->right",
      "Traverse recursively"
    ]
  },
  "bst-operations": {
    whatIsIt: "A Binary Search Tree (BST) is a binary tree with the ordering invariant: every node in the left subtree has a value less than the root, and every node in the right subtree has a value greater than the root. This allows O(log n) search, insert, and delete.",
    howItWorks: [
      { step: 1, title: "Search operation", description: "Compare key with current node: if equal found; if smaller go `curr->left`; if larger go `curr->right`." },
      { step: 2, title: "Insert operation", description: "Traverse down comparing key until reaching `NULL`, then attach new node in the empty slot." },
      { step: 3, title: "Inorder sorted property", description: "Inorder traversal (Left, Root, Right) of any valid BST always yields sorted ascending values." },
      { step: 4, title: "Delete cases", description: "Handle 3 deletion cases: leaf node (free directly), 1 child (bypass to child), or 2 children (replace with inorder successor)." }
    ],
    keyTerms: [
      { term: "BST Invariant", definition: "For every node X: `all keys in left subtree < X < all keys in right subtree`." },
      { term: "Inorder Successor", definition: "The smallest node in the right subtree, used to replace a deleted node with two children." },
      { term: "O(log n) Average Search", definition: "Balanced BST halves the search space at each level, similar to binary search." },
      { term: "Skewed Tree Degradation", definition: "Inserting pre-sorted keys degrades BST into a linear linked list of O(n) height." }
    ],
    commonMistakes: [
      "Inserting into a sorted sequence resulting in a degenerate tree of height n (worst case O(n)).",
      "Deleting a node with two children without properly replacing it with its inorder successor.",
      "Allowing duplicate keys without a consistent policy (e.g. all duplicates placed in right subtree).",
      "Forgetting to update parent pointers when deleting child nodes."
    ],
    realWorldExample: "Database indexing engines (B-Trees) and fast auto-complete dictionary lookups.",
    logicKeySteps: [
      "insert(root, val): if root == NULL: return createNode(val)",
      "  if val < root->data: root->left = insert(root->left, val)",
      "  else if val > root->data: root->right = insert(root->right, val); return root",
      "search(root, key): if root == NULL or root->data == key: return root",
      "  return key < root->data ? search(root->left, key) : search(root->right, key)"
    ]
  },
  "tree-traversals": {
    whatIsIt: "Tree traversal visits every node in a binary tree exactly once. Depth-first traversals include Inorder (Left-Root-Right), Preorder (Root-Left-Right), and Postorder (Left-Right-Root), each serving distinct compiler, serialization, and evaluation purposes.",
    howItWorks: [
      { step: 1, title: "Inorder (Left-Root-Right)", description: "Traverse left subtree, visit root, traverse right subtree (yields sorted output in a BST)." },
      { step: 2, title: "Preorder (Root-Left-Right)", description: "Visit root first, traverse left, traverse right (used to serialize or duplicate tree structures)." },
      { step: 3, title: "Postorder (Left-Right-Root)", description: "Traverse left, traverse right, visit root last (essential for bottom-up tasks like deleting/freeing tree nodes)." },
      { step: 4, title: "Base termination", description: "Base case for all traversals: `if (root == NULL) return;`." }
    ],
    keyTerms: [
      { term: "Inorder Traversal", definition: "Left -> Root -> Right traversal producing sorted keys in a Binary Search Tree." },
      { term: "Preorder Traversal", definition: "Root -> Left -> Right traversal commonly used to clone or serialize tree hierarchies." },
      { term: "Postorder Traversal", definition: "Left -> Right -> Root traversal used for bottom-up evaluation and freeing allocated memory." },
      { term: "Depth-First Traversal", definition: "Exploring deeply down branches before backtracking to sibling subtrees." }
    ],
    commonMistakes: [
      "Omitting base condition `if (root == NULL) return;`, causing instant crash on leaf children.",
      "Attempting to free tree nodes with preorder instead of postorder (freeing parent before visiting children).",
      "Confusing traversal print order (e.g. printing root before left subtree in inorder).",
      "Printing newlines inside recursive traversal steps, scattering traversal output vertically."
    ],
    realWorldExample: "Evaluating mathematical expression trees: inorder gives standard formula, postorder gives postfix calculator input.",
    logicKeySteps: [
      "inorder(root): if root == NULL: return; inorder(root->left); print root->data; inorder(root->right)",
      "preorder(root): if root == NULL: return; print root->data; preorder(root->left); preorder(root->right)",
      "postorder(root): if root == NULL: return; postorder(root->left); postorder(root->right); print root->data"
    ]
  },
  "tree-height": {
    whatIsIt: "The height of a binary tree is the number of edges (or levels) on the longest path from the root down to the deepest leaf node. Calculating height is a fundamental recursive divide-and-conquer problem used to evaluate tree balance.",
    howItWorks: [
      { step: 1, title: "Base case for empty tree", description: "If `root == NULL`, return 0 (or -1 depending on whether height counts nodes or edges)." },
      { step: 2, title: "Compute left subtree height", description: "Recursively call `leftHeight = height(root->left)`." },
      { step: 3, title: "Compute right subtree height", description: "Recursively call `rightHeight = height(root->right)`." },
      { step: 4, title: "Combine with current root", description: "Return `1 + max(leftHeight, rightHeight)`." }
    ],
    keyTerms: [
      { term: "Tree Height", definition: "Length of the longest downward path from root to leaf node." },
      { term: "Divide and Conquer Recursion", definition: "Calculating subtree heights independently and combining with `1 + max(left, right)`." },
      { term: "Balance Factor", definition: "Difference between left and right subtree heights (`leftH - rightH`), used in AVL trees." },
      { term: "Tree Depth vs Height", definition: "Depth is distance from root to a node; height is distance from node to deepest leaf." }
    ],
    commonMistakes: [
      "Calling `height()` multiple times inside `max()` instead of storing in variables, causing exponential O(2^n) slowdown.",
      "Base case returning 1 instead of 0 for `NULL` node, skewing total height by +1.",
      "Confusing node count height (root has height 1) with edge count height (root has height 0).",
      "Stack overflow on completely unbalanced degenerate trees."
    ],
    realWorldExample: "Measuring tree balance in database indexes: a shallow tree requires fewer disk lookups than a tall skinny tree.",
    logicKeySteps: [
      "height(root):",
      "  If root == NULL: return 0",
      "  leftH = height(root->left)",
      "  rightH = height(root->right)",
      "  return 1 + (leftH > rightH ? leftH : rightH)"
    ]
  },
  "graph-adjacency-matrix": {
    whatIsIt: "An adjacency matrix represents a graph with V vertices using a 2D array `adj[V][V]`. An entry `adj[u][v] = 1` indicates an edge exists from vertex `u` to vertex `v`, providing instant O(1) edge lookups at the cost of O(V^2) memory.",
    howItWorks: [
      { step: 1, title: "Initialize matrix to zero", description: "Declare `int adj[V][V]` and initialize all entries to 0 (no edges)." },
      { step: 2, title: "Add directed edge", description: "For directed edge from `u` to `v`, set `adj[u][v] = 1`." },
      { step: 3, title: "Add undirected edge", description: "For undirected graph, set both `adj[u][v] = 1` and `adj[v][u] = 1` symmetrically." },
      { step: 4, title: "Check edge existence", description: "Query if vertices `u` and `v` are connected by checking `adj[u][v] == 1` in O(1) time." }
    ],
    keyTerms: [
      { term: "Adjacency Matrix", definition: "A V x V square matrix where entry (u, v) indicates the presence or weight of an edge." },
      { term: "Symmetric Matrix", definition: "In undirected graphs, `adj[u][v] == adj[v][u]`, making the matrix symmetric across the diagonal." },
      { term: "O(1) Edge Lookup", definition: "Determining whether an edge exists between any two vertices in constant time." },
      { term: "Dense vs Sparse Graph", definition: "Adjacency matrix is optimal for dense graphs (many edges) but wastes space on sparse graphs." }
    ],
    commonMistakes: [
      "Setting only `adj[u][v] = 1` for undirected graphs instead of both `(u, v)` and `(v, u)`.",
      "Forgetting to initialize the matrix to 0, leaving garbage values that masquerade as edges.",
      "Index out of bounds: accessing vertex indices >= V.",
      "Using an adjacency matrix for graphs with millions of vertices, exceeding available system RAM."
    ],
    realWorldExample: "Airline flight network matrix: rows and columns represent airport cities; 1 indicates a direct non-stop flight exists.",
    logicKeySteps: [
      "Initialize adj[V][V] = 0",
      "addEdge(u, v, isDirected):",
      "  adj[u][v] = 1",
      "  if not isDirected: adj[v][u] = 1",
      "Print matrix with row/col headers"
    ]
  },
  "graph-bfs": {
    whatIsIt: "Breadth-First Search (BFS) explores a graph level-by-level starting from a source vertex. It visits all immediate neighbors first before advancing to neighbors at distance 2, 3, and so on, using a queue and visited array to find shortest paths in unweighted graphs.",
    howItWorks: [
      { step: 1, title: "Initialize visited and queue", description: "Declare `visited[V] = {0}` and create a FIFO queue." },
      { step: 2, title: "Enqueue start vertex", description: "Mark `visited[start] = 1` and enqueue `start`." },
      { step: 3, title: "Process queue", description: "While queue is not empty, dequeue `curr` and process/print it." },
      { step: 4, title: "Enqueue unvisited neighbors", description: "For each neighbor `v` of `curr`: if `!visited[v]`, mark `visited[v] = 1` and enqueue `v`." }
    ],
    keyTerms: [
      { term: "Level-Order Exploration", definition: "Visiting vertices strictly in increasing order of their distance from the source vertex." },
      { term: "FIFO Queue Traversal", definition: "Using a queue ensures vertices discovered first are expanded first." },
      { term: "Visited Array", definition: "A boolean tracking array preventing infinite loops in cyclic graphs." },
      { term: "Shortest Path Guarantee", definition: "In unweighted graphs, BFS is guaranteed to discover the shortest path in minimum edges." }
    ],
    commonMistakes: [
      "Marking a vertex as visited when dequeuing instead of when enqueuing, causing duplicate enqueues and memory blowup.",
      "Omitting the visited array check, causing infinite loops in cyclic graphs.",
      "Not handling disconnected graph components where some vertices are unreachable from start.",
      "Using a stack instead of a queue, which turns the search into DFS."
    ],
    realWorldExample: "GPS navigation finding the fewest metro stops between two stations, or LinkedIn finding 1st, 2nd, and 3rd-degree connections.",
    logicKeySteps: [
      "Initialize visited[V] = {0}, create queue",
      "visited[start] = 1, enqueue(start)",
      "While queue not empty:",
      "  curr = dequeue(); print curr",
      "  For each neighbor v of curr:",
      "    If !visited[v]: visited[v] = 1; enqueue(v)"
    ]
  },
  "graph-dfs": {
    whatIsIt: "Depth-First Search (DFS) explores a graph by traversing as deep as possible along each branch before backtracking. It uses recursion (or an explicit stack) and a visited array, serving as the core algorithm for cycle detection, topological sorting, and pathfinding.",
    howItWorks: [
      { step: 1, title: "Mark current vertex visited", description: "Set `visited[u] = 1` and print/process vertex `u`." },
      { step: 2, title: "Iterate adjacent neighbors", description: "Examine all neighbors `v` connected to `u` via graph edges." },
      { step: 3, title: "Recurse on unvisited", description: "If `!visited[v]`, immediately make recursive call `DFS(v)`." },
      { step: 4, title: "Automatic backtracking", description: "When a vertex has no unvisited neighbors, the call stack unwinds back to previous branch points." }
    ],
    keyTerms: [
      { term: "Backtracking Exploration", definition: "Exploring down a path until a dead end is reached, then reversing to the latest branch point." },
      { term: "System Call Stack (LIFO)", definition: "Using recursion relies on the call stack to remember the traversal trail." },
      { term: "Cycle Detection", definition: "Encountering a neighbor currently on the recursion stack indicates a cycle in the graph." },
      { term: "Connected Component", definition: "A subgraph in which every vertex is reachable from any other vertex via edges." }
    ],
    commonMistakes: [
      "Missing visited check causing infinite recursive loops in graphs containing cycles.",
      "Stack overflow on large or deep graphs due to recursive function limits.",
      "Not traversing all vertices when the graph has multiple disconnected components.",
      "Forgetting to pass the visited array by pointer/reference across recursive calls."
    ],
    realWorldExample: "Solving a maze: walk forward as far as possible down each passage; if blocked, turn around and try the next hallway.",
    logicKeySteps: [
      "DFS(u, visited):",
      "  visited[u] = 1",
      "  print u",
      "  For each neighbor v of u:",
      "    If !visited[v]: DFS(v, visited)"
    ]
  },
  "hash-table-chaining": {
    whatIsIt: "A hash table with separate chaining handles hash collisions by storing multiple key-value pairs that hash to the same bucket index in a linked list. If two keys produce identical hash indices, the new entry is appended to that bucket's list in O(1) time.",
    howItWorks: [
      { step: 1, title: "Hash function calculation", description: "Compute bucket index using `index = key % TABLE_SIZE`." },
      { step: 2, title: "Inspect target bucket", description: "Access the linked list head pointer at `hashTable[index]`." },
      { step: 3, title: "Insert node into chain", description: "Allocate node, set `node->data = key`, and link at head: `node->next = hashTable[index]; hashTable[index] = node`." },
      { step: 4, title: "Search via chain traversal", description: "To search, compute index and traverse linked list comparing keys." }
    ],
    keyTerms: [
      { term: "Hash Collision", definition: "When two distinct keys produce the identical hash index via the hash function." },
      { term: "Separate Chaining", definition: "Resolving collisions by attaching a linked list of collided items to each array bucket." },
      { term: "Bucket Array", definition: "An array of pointers where each entry points to the head of a collision chain." },
      { term: "Load Factor (α = n / m)", definition: "Ratio of total elements n to table size m; lower load factor maintains O(1) average lookup." }
    ],
    commonMistakes: [
      "Not allocating node memory dynamically causing overwrites of previous entries.",
      "Forgetting to traverse the chain to check for existing duplicate keys.",
      "Memory leaks when deleting items from a chained bucket list without freeing nodes.",
      "Using a poor hash function that clusters all elements into a single bucket, degrading performance to O(n)."
    ],
    realWorldExample: "Filing folders in a cabinet by first letter of last name: folder 'S' contains all files for Smith, Scott, and Singh.",
    logicKeySteps: [
      "Initialize array of Node pointers to NULL",
      "hash(key): return key % TABLE_SIZE",
      "insert(key): idx = hash(key); node = malloc(); node->data = key; node->next = table[idx]; table[idx] = node",
      "search(key): idx = hash(key); curr = table[idx]; while curr: if curr->data == key: return 1; curr = curr->next; return 0"
    ]
  },
  "hash-linear-probing": {
    whatIsIt: "Linear probing is an open-addressing collision resolution strategy where colliding keys search sequentially for the next available empty slot in the array using `(hash + i) % TABLE_SIZE`. All entries are stored directly in the primary array without linked lists.",
    howItWorks: [
      { step: 1, title: "Compute initial hash index", description: "Calculate primary index `idx = key % TABLE_SIZE`." },
      { step: 2, title: "Check slot availability", description: "If `table[idx]` is empty (-1), store key immediately." },
      { step: 3, title: "Probe sequentially on collision", description: "If occupied, increment probe `i = 1, 2, 3...` and test `(idx + i) % TABLE_SIZE`." },
      { step: 4, title: "Wrap around and stop", description: "Insert at first empty slot; stop search when key is found or an empty slot confirms absence." }
    ],
    keyTerms: [
      { term: "Open Addressing", definition: "Storing all keys directly within the hash table array without auxiliary pointer nodes." },
      { term: "Linear Probing", definition: "Searching consecutive slots `(h(k) + i) % m` when a collision occurs." },
      { term: "Primary Clustering", definition: "Tendency for occupied slots to form long contiguous blocks, increasing average search times." },
      { term: "Tombstone Marker", definition: "A special deleted flag (-2) allowing search probes to continue past deleted entries." }
    ],
    commonMistakes: [
      "Infinite loop when probing in a completely full table without an empty slot sentinel.",
      "Breaking search prematurely: deleting an item by setting it to empty (-1) breaks search paths for later keys; must use a tombstone.",
      "Missing modulo wrap: index overflow without `(idx + i) % TABLE_SIZE`.",
      "Load factor > 0.7 causing severe primary clustering and performance degradation."
    ],
    realWorldExample: "Parking a car in an assigned lot: if your assigned space is taken, you park in the very next open space down the row.",
    logicKeySteps: [
      "Initialize table with -1 (empty)",
      "insert(key): idx = key % SIZE; i = 0",
      "  While table[(idx + i) % SIZE] != -1: i++; if i == SIZE: error full",
      "  table[(idx + i) % SIZE] = key",
      "search(key): idx = key % SIZE; i = 0",
      "  While table[(idx + i) % SIZE] != -1: if table[(idx + i) % SIZE] == key: return true; i++; if i == SIZE: break; return false"
    ]
  }
};
