/*
N Stacks in Single Array

Design a data structure that implements NN stacks using a single array of size SS. The structure should support push and pop operations for any of the NN stacks.

The data structure should support two operations:

    push(X, M): Push element XX into stack MM
    pop(M): Pop top element from stack MM

Input Format

    First line contains three integers NN, SS, and QQ
        NN: number of stacks
        SS: size of array
        QQ: number of queries

    Next QQ lines contain queries of two types:
        Type1Type1: push XX into stack MM
        Type2Type2: pop from stack MM

Output Format

    For each query:
        Type1Type1: Print "TrueTrue" if push successful, "FalseFalse" otherwise
        Type2Type2: Print popped element, or -1 if stack empty

Constraints

    1≤N≤S≤10001≤N≤S≤1000
    1≤Q≤1051≤Q≤105
    1≤X≤1051≤X≤105

Sample 1:
Input
Output

3 6 5
1 10 1
1 20 1
1 30 2
2 1
2 2

True
True
True
20
30

Explanation:

    Push 10 to stack 1: [10]
    Push 20 to stack 1: [10, 20]
    Push 30 to stack 2: [30]
    Pop from stack 1: returns 20
    Pop from stack 2: returns 30
*/

class Node {
  constructor(index) {
    this.index = index;
    this.next = null;
  }
}

class NStack {
  constructor(numStacks, capacity) {
    this.arr = new Array(capacity); // Shared storage for all stacks
    this.top = new Array(numStacks).fill(null); // Track top Node of each stack
    this.freeIndexes = Array.from({ length: capacity }, (_, i) => i); // Free index pool
  }

  push(value, stackNum) {
    if (this.freeIndexes.length === 0) return false; // No space left

    // Take a free index
    const index = this.freeIndexes.pop();

    // Store value in shared array
    this.arr[index] = value;

    // Create node that points to previous top
    const newNode = new Node(index);
    newNode.next = this.top[stackNum - 1];

    // Update top pointer
    this.top[stackNum - 1] = newNode;

    return true;
  }

  pop(stackNum) {
    const topNode = this.top[stackNum - 1];
    if (!topNode) return -1; // Stack empty

    const index = topNode.index;
    const value = this.arr[index];

    // Move top pointer down
    this.top[stackNum - 1] = topNode.next;

    // Reclaim index
    this.freeIndexes.push(index);

    return value;
  }
}

class Node {
  constructor(index) {
    this.index = index;
    this.next = null;
  }
}

class NStack1 {
  constructor(n, s) {
    this.arr = new Array(s); // where s is the size of array which will contain the stacks elements
    this.top = new Array(n).fill(null); // Where n is the number of stacks and type of the elements are Node types
    this.stack = Array.from({ length: s }, (el, index) => index); // stack will keep pointing to the empty space available
    // for (let i = 0; i < n; i++) {
    // this.stack.push(i); // Initially all the spaces are empty in the array arr.
    // }
  }

  push(x, m) {
    if (this.stack.length === 0) return false; // no space left

    // get a free index
    const index = this.stack.pop();

    // store element
    this.arr[index] = x;

    // create node
    const node = new Node(index);

    // link to current top of stack m
    node.next = this.top[m - 1];

    // update stack top
    this.top[m - 1] = node;

    return true;
  }

  pop(m) {
    if (this.top[m - 1] === null) return -1; // stack empty

    // get index of the top element
    const index = this.top[m - 1].index;
    const element = this.arr[index];

    // move top pointer down
    this.top[m - 1] = this.top[m - 1].next;

    // free this index for future use
    this.stack.push(index);

    return element;
  }
}

// class Node {
//   constructor(index) {
//     this.index = index; // Index in the main array
//     this.next = null; // Next node in the stack
//   }
// }

class NStack {
  constructor(n, s) {
    this.arr = new Array(s); // Main storage array
    this.top = new Array(n).fill(null); // Heads of linked lists for each stack
    this.freeStack = Array.from({ length: s }, (_, i) => i); // Free indices stack
  }

  push(x, m) {
    const stackIndex = m - 1; // Convert to 0-indexed

    if (this.freeStack.length === 0) {
      return false; // Array is full
    }

    // Get free index from the top of free stack
    const freeIndex = this.freeStack.pop();

    // Store the value in the main array
    this.arr[freeIndex] = x;

    // Create new node and add to the linked list
    const newNode = new Node(freeIndex);
    newNode.next = this.top[stackIndex];
    this.top[stackIndex] = newNode;

    return true;
  }

  pop(m) {
    const stackIndex = m - 1; // Convert to 0-indexed

    if (this.top[stackIndex] === null) {
      return -1; // Stack is empty
    }

    // Get the top node
    const topNode = this.top[stackIndex];
    const elementIndex = topNode.index;
    const element = this.arr[elementIndex];

    // Move top to next node
    this.top[stackIndex] = topNode.next;

    // Add the freed index back to free stack
    this.freeStack.push(elementIndex);

    return element;
  }
}

const stacks = new NStack(3, 6);

console.log(stacks.push(10, 1)); // True
console.log(stacks.push(20, 1)); // True
console.log(stacks.push(30, 2)); // True
console.log(stacks.pop(1)); // 20
console.log(stacks.pop(2)); // 30

// Expected output:
// True
// True
// True
// 20
// 30
