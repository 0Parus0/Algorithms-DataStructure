/*
225. Implement Stack using Queues
Easy
Topics
premium lock icon
Companies
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
 

Constraints:

1 <= x <= 9
At most 100 calls will be made to push, pop, top, and empty.
All the calls to pop and top are valid.
 

Follow-up: Can you implement the stack using only one queue?
*/
class MyStack {
  constructor() {
    this.queue = [];
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    // 1. Add the new element to the back (standard queue push)
    this.queue.push(x);

    // 2. Rotate the queue:
    // Move all elements that were already there to the back of the new element.
    let size = this.queue.length;
    while (size > 1) {
      // Standard queue operations: shift (pop from front), push (add to back)
      this.queue.push(this.queue.shift());
      size--;
    }
  }

  /**
   * @return {number}
   */
  pop() {
    // Since we rotated on push, the "top" is at the front of the queue
    return this.queue.shift();
  }

  /**
   * @return {number}
   */
  top() {
    // Peek the front of the queue
    return this.queue[0];
  }

  /**
   * @return {boolean}
   */
  empty() {
    return this.queue.length === 0;
  }
}
