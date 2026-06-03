/*
1381. Design a Stack With Increment Operation
Medium
Topics
premium lock icon
Companies
Hint
Design a stack that supports increment operations on its elements.

Implement the CustomStack class:

CustomStack(int maxSize) Initializes the object with maxSize which is the maximum number of elements in the stack.
void push(int x) Adds x to the top of the stack if the stack has not reached the maxSize.
int pop() Pops and returns the top of the stack or -1 if the stack is empty.
void inc(int k, int val) Increments the bottom k elements of the stack by val. If there are less than k elements in the stack, increment all the elements in the stack.
 

Example 1:

Input
["CustomStack","push","push","pop","push","push","push","increment","increment","pop","pop","pop","pop"]
[[3],[1],[2],[],[2],[3],[4],[5,100],[2,100],[],[],[],[]]
Output
[null,null,null,2,null,null,null,null,null,103,202,201,-1]
Explanation
CustomStack stk = new CustomStack(3); // Stack is Empty []
stk.push(1);                          // stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.pop();                            // return 2 --> Return top of the stack 2, stack becomes [1]
stk.push(2);                          // stack becomes [1, 2]
stk.push(3);                          // stack becomes [1, 2, 3]
stk.push(4);                          // stack still [1, 2, 3], Do not add another elements as size is 4
stk.increment(5, 100);                // stack becomes [101, 102, 103]
stk.increment(2, 100);                // stack becomes [201, 202, 103]
stk.pop();                            // return 103 --> Return top of the stack 103, stack becomes [201, 202]
stk.pop();                            // return 202 --> Return top of the stack 202, stack becomes [201]
stk.pop();                            // return 201 --> Return top of the stack 201, stack becomes []
stk.pop();                            // return -1 --> Stack is empty return -1.
 

Constraints:

1 <= maxSize, x, k <= 1000
0 <= val <= 100
At most 1000 calls will be made to each method of increment, push and pop each separately.
*/
class CustomStack {
  /**
   * @param {number} maxSize
   */
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.stack = [];
    this.incArr = []; // Auxiliary array for lazy increments
  }

  /**
   * @param {number} x
   * @return {void}
   */
  push(x) {
    if (this.stack.length < this.maxSize) {
      this.stack.push(x);
      // Every element starts with a lazy increment of 0
      this.incArr.push(0);
    }
  }

  /**
   * @return {number}
   */
  pop() {
    const i = this.stack.length - 1;
    if (i < 0) return -1;

    // Retrieve the top value and its corresponding lazy increment
    const val = this.stack.pop();
    const lazyVal = this.incArr.pop();

    // Propagate the increment to the element below
    if (i > 0) {
      this.incArr[i - 1] += lazyVal;
    }

    return val + lazyVal;
  }

  /**
   * @param {number} k
   * @param {number} val
   * @return {void}
   */
  inc(k, val) {
    // Find the index of the k-th element from the bottom (or the top element)
    const i = Math.min(k, this.stack.length) - 1;

    // Add the increment value only to the highest index it affects
    if (i >= 0) {
      this.incArr[i] += val;
    }
  }
}

// ========================================================================
// 2. Approach Two (increment with O(N))
// ========================================================================

class CustomStack {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.stack = [];
  }

  push(val) {
    if (this.stack.length < this.maxSize) {
      this.stack.push(val);
    }
  }

  pop() {
    return this.stack.pop() || -1;
  }

  increment(k, val) {
    let count = Math.min(k, this.stack.length);
    for (let i = 0; i < count; i++) {
      this.stack[i] += val;
    }
  }
}
