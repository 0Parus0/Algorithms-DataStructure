/*
2349. Design a Number Container System
Medium
Topics
premium lock icon
Companies
Hint
Design a number container system that can do the following:

Insert or Replace a number at the given index in the system.
Return the smallest index for the given number in the system.
Implement the NumberContainers class:

NumberContainers() Initializes the number container system.
void change(int index, int number) Fills the container at index with the number. If there is already a number at that index, replace it.
int find(int number) Returns the smallest index for the given number, or -1 if there is no index that is filled by number in the system.
 

Example 1:

Input
["NumberContainers", "find", "change", "change", "change", "change", "find", "change", "find"]
[[], [10], [2, 10], [1, 10], [3, 10], [5, 10], [10], [1, 20], [10]]
Output
[null, -1, null, null, null, null, 1, null, 2]

Explanation
NumberContainers nc = new NumberContainers();
nc.find(10); // There is no index that is filled with number 10. Therefore, we return -1.
nc.change(2, 10); // Your container at index 2 will be filled with number 10.
nc.change(1, 10); // Your container at index 1 will be filled with number 10.
nc.change(3, 10); // Your container at index 3 will be filled with number 10.
nc.change(5, 10); // Your container at index 5 will be filled with number 10.
nc.find(10); // Number 10 is at the indices 1, 2, 3, and 5. Since the smallest index that is filled with 10 is 1, we return 1.
nc.change(1, 20); // Your container at index 1 will be filled with number 20. Note that index 1 was filled with 10 and then replaced with 20. 
nc.find(10); // Number 10 is at the indices 2, 3, and 5. The smallest index that is filled with 10 is 2. Therefore, we return 2.
 

Constraints:

1 <= index, number <= 109
At most 105 calls will be made in total to change and find.
*/
class MinHeap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this._bubbleUp();
  }
  pop() {
    if (this.size() === 0) return null;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this._bubbleDown();
    }
    return top;
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
  _bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = (idx - 1) >> 1;
      if (this.heap[idx] >= this.heap[parent]) break;
      [this.heap[idx], this.heap[parent]] = [this.heap[parent], this.heap[idx]];
      idx = parent;
    }
  }
  _bubbleDown() {
    let idx = 0;
    while (true) {
      let left = 2 * idx + 1,
        right = 2 * idx + 2,
        smallest = idx;
      if (left < this.heap.length && this.heap[left] < this.heap[smallest])
        smallest = left;
      if (right < this.heap.length && this.heap[right] < this.heap[smallest])
        smallest = right;
      if (smallest === idx) break;
      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
  }
}

class NumberContainers {
  constructor() {
    this.indexToNum = new Map(); // index -> number
    this.numToIndices = new Map(); // number -> MinHeap of indices
  }

  /**
   * @param {number} index
   * @param {number} number
   * @return {void}
   */
  change(index, number) {
    this.indexToNum.set(index, number);

    if (!this.numToIndices.has(number)) {
      this.numToIndices.set(number, new MinHeap());
    }
    this.numToIndices.get(number).push(index);
  }

  /**
   * @param {number} number
   * @return {number}
   */
  find(number) {
    if (!this.numToIndices.has(number)) return -1;

    const heap = this.numToIndices.get(number);

    // Clean up stale indices from the top of the heap
    while (heap.size() > 0) {
      const smallestIdx = heap.peek();
      // If the index currently points to this number, it's the valid minimum
      if (this.indexToNum.get(smallestIdx) === number) {
        return smallestIdx;
      }
      // Otherwise, the index was updated to another number; remove it
      heap.pop();
    }

    return -1;
  }
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================
class NumberContainers {
  constructor() {
    this.indexMap = new Map(); // index -> number
    this.numberMap = new Map(); // number -> MinHeap (array)
  }

  change(index, number) {
    this.indexMap.set(index, number);

    if (!this.numberMap.has(number)) {
      this.numberMap.set(number, []);
    }

    // push into heap
    let heap = this.numberMap.get(number);
    heap.push(index);

    // maintain min-heap
    this._heapifyUp(heap);
  }

  find(number) {
    if (!this.numberMap.has(number)) return -1;

    let heap = this.numberMap.get(number);

    while (heap.length > 0) {
      let top = heap[0];

      // check if valid
      if (this.indexMap.get(top) === number) {
        return top;
      }

      // invalid → remove
      this._heapPop(heap);
    }

    return -1;
  }

  // ---------- Heap Helpers ----------
  _heapifyUp(heap) {
    let i = heap.length - 1;

    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (heap[p] <= heap[i]) break;

      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  }

  _heapPop(heap) {
    let last = heap.pop();
    if (heap.length === 0) return;

    heap[0] = last;
    this._heapifyDown(heap);
  }

  _heapifyDown(heap) {
    let i = 0;
    let n = heap.length;

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < n && heap[left] < heap[smallest]) smallest = left;
      if (right < n && heap[right] < heap[smallest]) smallest = right;

      if (smallest === i) break;

      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
      i = smallest;
    }
  }
}
