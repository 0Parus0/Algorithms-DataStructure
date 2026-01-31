/*
Solve the following problem as recomended by the turing.com coding challenge guidelines, but before that , rephrase the problem in a story 
Reverse a Stack
Difficulty: MediumAccuracy: 80.5%Submissions: 122K+Points: 4Average Time: 20m
You are given a stack st[]. You have to reverse the stack.

Examples:

Input: st[] = [1, 2, 3, 4]
Output: [1, 2, 3, 4]
Explanation: After reversing, the elements of stack are in opposite order.

Input: st[] = [3, 2, 1]
Output: [3, 2, 1]
Explanation: After reversing, the elements of stack are in opposite order.

Constraints:
1 ≤ st.size() ≤ 100
0 ≤ stack element ≤ 100
*/

/* Time O(N^2) & Space O(1) */
function insertAtBottom(st, v) {
  // Base case:
  if (!st.length) {
    st.push(v);
    return;
  }
  // Recursive case:
  const top = st.pop();
  insertAtBottom(st, v);
  st.push(top);
}
function reverse(s) {
  // Base case:
  if (!s.length) return;

  // Recursive case:
  const top = s.pop();
  reverse(s);
  insertAtBottom(s, top);
}

/* With O(N) Auxiliary space & O(N^2) Time */

function reverse1(s) {
  // Base Case:
  if (!s.length) return;

  // Recursive case:
  const top = s.pop();
  reverse(s);

  const temp = [];

  while (s.length) {
    temp.push(s.pop());
  }

  s.push(top);

  while (temp.length) {
    s.push(temp.pop());
  }
}

// let st = [1, 2, 3, 4];
// reverse(st);
// console.log(st); // [1, 2, 3, 4] reversed

class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.items.length === 0) return null;
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items);
  }
}

// The Magical Reversal Spell
function reverseStack(st) {
  if (st.isEmpty()) return;

  const tempStack = new Stack();

  // Transfer all elements to temporary stack
  while (!st.isEmpty()) {
    tempStack.push(st.pop());
  }

  // The tempStack now contains reversed order
  // Copy back to original stack
  const resultStack = new Stack();
  while (!tempStack.isEmpty()) {
    resultStack.push(tempStack.pop());
  }

  // Copy from resultStack back to original stack
  while (!resultStack.isEmpty()) {
    st.push(resultStack.pop());
  }
}

// Alternative magical spell using recursion
function reverseStackRecursive(st) {
  if (st.isEmpty()) return;

  // Remove top element
  const temp = st.pop();

  // Reverse remaining stack
  reverseStackRecursive(st);

  // Insert the element at bottom
  insertAtBottom(st, temp);
}

function insertAtBottom(st, element) {
  if (st.isEmpty()) {
    st.push(element);
    return;
  }

  // Remove all elements temporarily
  const temp = st.pop();

  // Recursively insert at bottom
  insertAtBottom(st, element);

  // Push back the temporarily removed element
  st.push(temp);
}

// Test Case 1: [1, 2, 3, 4]
console.log("Test Case 1:");
let stack1 = new Stack();
[1, 2, 3, 4].forEach((num) => stack1.push(num));
console.log("Original stack:");
stack1.print();
reverseStack(stack1);
console.log("Reversed stack:");
stack1.print();

// Test Case 2: [3, 2, 1]
console.log("\nTest Case 2:");
let stack2 = new Stack();
[3, 2, 1].forEach((num) => stack2.push(num));
console.log("Original stack:");
stack2.print();
reverseStackRecursive(stack2);
console.log("Reversed stack (using recursion):");
stack2.print();

// Test Case 3: Single element
console.log("\nTest Case 3:");
let stack3 = new Stack();
stack3.push(42);
console.log("Original stack:");
stack3.print();
reverseStack(stack3);
console.log("Reversed stack:");
stack3.print();

/*
The Magic Behind the Spell 🔮
Method 1 (Iterative using temporary stack):

Time Complexity: O(n)

Space Complexity: O(n)

We use an additional stack to reverse the elements

Method 2 (Recursive):

Time Complexity: O(n²)

Space Complexity: O(n) for recursion stack

More elegant but less efficient for large stacks

Both spells successfully reverse the magical bookshelf while respecting the library's rules of only accessing books from the top! The books are now perfectly arranged in reverse order, ready for the next scholar to study. 📚✨
*/
