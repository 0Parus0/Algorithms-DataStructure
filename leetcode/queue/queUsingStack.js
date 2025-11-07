/*
232. Implement Queue using Stacks
Easy
Topics
premium lock iconCompanies

Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).

Implement the MyQueue class:

    void push(int x) Pushes element x to the back of the queue.
    int pop() Removes the element from the front of the queue and returns it.
    int peek() Returns the element at the front of the queue.
    boolean empty() Returns true if the queue is empty, false otherwise.

Notes:

    You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
    Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.

 

Example 1:

Input
["MyQueue", "push", "push", "peek", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 1, 1, false]

Explanation
MyQueue myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
myQueue.peek(); // return 1
myQueue.pop(); // return 1, queue is [2]
myQueue.empty(); // return false

 

Constraints:

    1 <= x <= 9
    At most 100 calls will be made to push, pop, peek, and empty.
    All the calls to pop and peek are valid.

 

Follow-up: Can you implement the queue such that each operation is amortized O(1) time complexity? In other words, performing n operations will take overall O(n) time even if one of those operations may take longer.
*/

class MyQueue {
  constructor() {
    this.stack1 = []; // Used for pushing elements
    this.stack2 = []; // Used for popping/peeking elements
  }

  push(x) {
    this.stack1.push(x);
  }

  pop() {
    if (this.stack2.length === 0) {
      // Move all elements from stack1 to stack2 to reverse the order
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop();
  }

  peek() {
    if (this.stack2.length === 0) {
      // Move all elements from stack1 to stack2 to reverse the order
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }

  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}

const myQueue = new MyQueue();
myQueue.push(1); // queue: [1]
myQueue.push(2); // queue: [1, 2]
console.log(myQueue.peek()); // 1
console.log(myQueue.pop()); // 1, queue: [2]
console.log(myQueue.empty()); // false

/*
225. Implement Stack using Queues
Easy
Topics
premium lock iconCompanies

Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).

Implement the MyStack class:

    void push(int x) Pushes element x to the top of the stack.
    int pop() Removes the element on the top of the stack and returns it.
    int top() Returns the element on the top of the stack.
    boolean empty() Returns true if the stack is empty, false otherwise.

Notes:

    You must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid.
    Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.

 

Example 1:

Input
["MyStack", "push", "push", "top", "pop", "empty"]
[[], [1], [2], [], [], []]
Output
[null, null, null, 2, 2, false]

Explanation
MyStack myStack = new MyStack();
myStack.push(1);
myStack.push(2);
myStack.top(); // return 2
myStack.pop(); // return 2
myStack.empty(); // return False
*/

class MyStack {
  constructor() {
    this.q1 = []; // Main queue
    this.q2 = []; // Temporary queue
  }

  push(x) {
    this.q1.push(x);
  }

  pop() {
    // Move all elements except last from q1 to q2
    while (this.q1.length > 1) {
      this.q2.push(this.q1.shift());
    }

    // Get the last element (top of stack)
    const topElement = this.q1.shift();

    // Swap the queues
    [this.q1, this.q2] = [this.q2, this.q1];

    return topElement;
  }

  top() {
    // Move all elements except last from q1 to q2
    while (this.q1.length > 1) {
      this.q2.push(this.q1.shift());
    }

    // Get the last element
    const topElement = this.q1[0];

    // Move it to q2 and swap queues
    this.q2.push(this.q1.shift());
    [this.q1, this.q2] = [this.q2, this.q1];

    return topElement;
  }

  empty() {
    return this.q1.length === 0;
  }
}

class MyStackWithSingleQue {
  constructor() {
    this.queue = [];
  }

  push(x) {
    const size = this.queue.length;
    this.queue.push(x);

    // Rotate the queue: move all previous elements after the new one
    for (let i = 0; i < size; i++) {
      this.queue.push(this.queue.shift());
    }
  }

  pop() {
    return this.queue.shift();
  }

  top() {
    return this.queue[0];
  }

  empty() {
    return this.queue.length === 0;
  }
}
