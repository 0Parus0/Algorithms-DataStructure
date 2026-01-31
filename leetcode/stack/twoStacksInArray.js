/*
Implement two Stacks in an Array
Last Updated : 26 Apr, 2025

Create a data structure twoStacks that represent two stacks. Implementation of twoStacks should use only one array, i.e., both stacks should use the same array for storing elements. 

    Following functions must be supported by twoStacks.

        push1(int x) --> pushes x to first stack 
        push2(int x) --> pushes x to second stack
        pop1() --> pops an element from first stack and return the popped element 
        pop2() --> pops an element from second stack and return the popped element
*/
class TwoStacks {
  constructor(size) {
    this.arr = new Array(size);
    this.size = size;
    this.top1 = -1; // Top pointer for stack 1
    this.top2 = size; // Top pointer for stack 2
  }

  // Push element to stack 1
  push1(x) {
    // Check if there's space available
    if (this.top1 < this.top2 - 1) {
      this.top1++;
      this.arr[this.top1] = x;
    } else {
      throw new Error("Stack Overflow");
    }
  }

  // Push element to stack 2
  push2(x) {
    // Check if there's space available
    if (this.top1 < this.top2 - 1) {
      this.top2--;
      this.arr[this.top2] = x;
    } else {
      throw new Error("Stack Overflow");
    }
  }

  // Pop element from stack 1
  pop1() {
    if (this.top1 >= 0) {
      const element = this.arr[this.top1];
      this.top1--;
      return element;
    } else {
      throw new Error("Stack 1 Underflow");
    }
  }

  // Pop element from stack 2
  pop2() {
    if (this.top2 < this.size) {
      const element = this.arr[this.top2];
      this.top2++;
      return element;
    } else {
      throw new Error("Stack 2 Underflow");
    }
  }

  // Check if stack 1 is empty
  isEmpty1() {
    return this.top1 === -1;
  }

  // Check if stack 2 is empty
  isEmpty2() {
    return this.top2 === this.size;
  }

  // Get current size of stack 1
  size1() {
    return this.top1 + 1;
  }

  // Get current size of stack 2
  size2() {
    return this.size - this.top2;
  }
}
