/*
641. Design Circular Deque
Medium
Topics
premium lock icon
Companies
Design your implementation of the circular double-ended queue (deque).

Implement the MyCircularDeque class:

MyCircularDeque(int k) Initializes the deque with a maximum size of k.
boolean insertFront() Adds an item at the front of Deque. Returns true if the operation is successful, or false otherwise.
boolean insertLast() Adds an item at the rear of Deque. Returns true if the operation is successful, or false otherwise.
boolean deleteFront() Deletes an item from the front of Deque. Returns true if the operation is successful, or false otherwise.
boolean deleteLast() Deletes an item from the rear of Deque. Returns true if the operation is successful, or false otherwise.
int getFront() Returns the front item from the Deque. Returns -1 if the deque is empty.
int getRear() Returns the last item from Deque. Returns -1 if the deque is empty.
boolean isEmpty() Returns true if the deque is empty, or false otherwise.
boolean isFull() Returns true if the deque is full, or false otherwise.
 

Example 1:

Input
["MyCircularDeque", "insertLast", "insertLast", "insertFront", "insertFront", "getRear", "isFull", "deleteLast", "insertFront", "getFront"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output
[null, true, true, true, false, 2, true, true, true, 4]

Explanation
MyCircularDeque myCircularDeque = new MyCircularDeque(3);
myCircularDeque.insertLast(1);  // return True
myCircularDeque.insertLast(2);  // return True
myCircularDeque.insertFront(3); // return True
myCircularDeque.insertFront(4); // return False, the queue is full.
myCircularDeque.getRear();      // return 2
myCircularDeque.isFull();       // return True
myCircularDeque.deleteLast();   // return True
myCircularDeque.insertFront(4); // return True
myCircularDeque.getFront();     // return 4
 

Constraints:

1 <= k <= 1000
0 <= value <= 1000
At most 2000 calls will be made to insertFront, insertLast, deleteFront, deleteLast, getFront, getRear, isEmpty, isFull.
*/

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class MyCircularDeque {
  /**
   * @param {number} k
   */
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  /**
   * @param {number} value
   * @return {boolean}
   */
  insertFront(value) {
    if (this.isFull()) return false;

    if (this.isEmpty()) {
      // First element: both pointers stay at 0
      this.queue[this.front] = value;
    } else {
      // Move front counter-clockwise
      this.front = (this.front - 1 + this.capacity) % this.capacity;
      this.queue[this.front] = value;
    }

    this.size++;
    return true;
  }

  /**
   * @param {number} value
   * @return {boolean}
   */
  insertLast(value) {
    if (this.isFull()) return false;

    if (this.isEmpty()) {
      // First element: both pointers stay at 0
      this.queue[this.rear] = value;
    } else {
      // Move rear clockwise
      this.rear = (this.rear + 1) % this.capacity;
      this.queue[this.rear] = value;
    }

    this.size++;
    return true;
  }

  /**
   * @return {boolean}
   */
  deleteFront() {
    if (this.isEmpty()) return false;

    // If not the last element, move front clockwise
    if (this.size > 1) {
      this.front = (this.front + 1) % this.capacity;
    }

    this.size--;
    return true;
  }

  /**
   * @return {boolean}
   */
  deleteLast() {
    if (this.isEmpty()) return false;

    // If not the last element, move rear counter-clockwise
    if (this.size > 1) {
      this.rear = (this.rear - 1 + this.capacity) % this.capacity;
    }

    this.size--;
    return true;
  }

  /**
   * @return {number}
   */
  getFront() {
    if (this.isEmpty()) return -1;
    return this.queue[this.front];
  }

  /**
   * @return {number}
   */
  getRear() {
    if (this.isEmpty()) return -1;
    return this.queue[this.rear];
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }

  /**
   * @return {boolean}
   */
  isFull() {
    return this.size === this.capacity;
  }
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class MyCircularDeque {
  constructor(k) {
    this.k = k;
    this.q = [];
  }

  insertFront(value) {
    if (this.q.length < this.k) {
      this.q.unshift(value);
      return true;
    }
    return false;
  }

  insertLast(value) {
    if (this.q.length < this.k) {
      this.q.push(value);
      return true;
    }
    return false;
  }

  deleteFront() {
    if (this.q.length > 0) {
      this.q.shift();
      return true;
    }
    return false;
  }

  deleteLast() {
    if (this.q.length > 0) {
      this.q.pop();
      return true;
    }
    return false;
  }

  getFront() {
    return this.q.length ? this.q[0] : -1;
  }

  getRear() {
    return this.q.length ? this.q[this.q.length - 1] : -1;
  }

  isEmpty() {
    return this.q.length === 0;
  }

  isFull() {
    return this.q.length === this.k;
  }
}
