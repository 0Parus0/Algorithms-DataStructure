/*
1354. Construct Target Array With Multiple Sums
Hard
Topics
premium lock icon
Companies
Hint
You are given an array target of n integers. From a starting array arr consisting of n 1's, you may perform the following procedure :

let x be the sum of all elements currently in your array.
choose index i, such that 0 <= i < n and set the value of arr at index i to x.
You may repeat this procedure as many times as needed.
Return true if it is possible to construct the target array from arr, otherwise, return false.

 

Example 1:

Input: target = [9,3,5]
Output: true
Explanation: Start with arr = [1, 1, 1] 
[1, 1, 1], sum = 3 choose index 1
[1, 3, 1], sum = 5 choose index 2
[1, 3, 5], sum = 9 choose index 0
[9, 3, 5] Done
Example 2:

Input: target = [1,1,1,2]
Output: false
Explanation: Impossible to create target array from [1,1,1,1].
Example 3:

Input: target = [8,5]
Output: true
 

Constraints:

n == target.length
1 <= n <= 5 * 104
1 <= target[i] <= 109
*/

class MaxHeap {
  constructor(arr) {
    this.heap = arr;
    this.buildHeap();
  }

  buildHeap() {
    const n = this.heap.length;
    for (let i = Math.floor((n - 2) / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  extractMax() {
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return max;
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  peek() {
    return this.heap[0];
  }

  heapifyUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] < this.heap[i]) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      } else break;
    }
  }

  heapifyDown(i) {
    const n = this.heap.length;
    while (true) {
      let largest = i;
      const left = 2 * i + 1,
        right = 2 * i + 2;

      if (left < n && this.heap[left] > this.heap[largest]) largest = left;
      if (right < n && this.heap[right] > this.heap[largest]) largest = right;

      if (largest !== i) {
        [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
        i = largest;
      } else break;
    }
  }
}

function isPossible(target) {
  const heap = new MaxHeap([...target]);
  let total = target.reduce((a, b) => a + b, 0);

  while (heap.peek() > 1) {
    const maxVal = heap.extractMax();
    const rest = total - maxVal;

    // Base cases
    if (rest === 1) return true;
    if (rest === 0 || maxVal <= rest) return false;

    // Simulate reverse operation
    const prev = maxVal % rest;
    if (prev === 0) return false; // can't go back to 0

    total = rest + prev;
    heap.insert(prev);
  }

  return true;
}

/*
🏁 Summary
Concept	Description
Approach	Reverse simulation using max heap
Time	O(N log N)
Space	O(N)
Key trick	Use maxVal % rest instead of subtracting repeatedly
Base cases	rest === 1 → true, rest === 0 or maxVal <= rest → false
*/

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp();
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    let max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return max;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] >= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      let left = index * 2 + 1;
      let right = index * 2 + 2;
      let largest = index;

      if (left < this.heap.length && this.heap[largest] < this.heap[left])
        largest = left;
      if (right < this.heap.length && this.heap[largest] < this.heap[right])
        largest = right;

      if (largest === index) break;
      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];
      index = largest;
    }
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

function canConstruct(target) {
  const heap = new MaxHeap();
  let totalSum = 0;

  for (let num of target) {
    heap.insert(num);
    totalSum += num;
  }

  while (true) {
    const maxVal = heap.extractMax();
    if (maxVal === 1) return true; // all ones now in the heap

    let remainingSum = totalSum - maxVal;

    if (remainingSum === 1) return true; // special case
    if (remainingSum <= 0 || maxVal <= remainingSum) return false;

    let prevVal = maxVal % remainingSum; // prevVal = maxVal - remainingSum
    if (prevVal === 0) prevVal = remainingSum; // important fix!

    if (prevVal < 1) return false;

    heap.insert(prevVal);
    totalSum = remainingSum + prevVal;
  }
}

function canConstruct(target) {
  const heap = new MaxHeap();
  let totalSum = 0;
  for (let num of target) {
    heap.insert(num);
    totalSum += num;
  }

  while (true) {
    const maxVal = heap.extractMax();
    if (maxVal === 1) return true; // All elements are 1
    // totalSum -= maxVal;
    // if(maxVal <= totalSum || totalSum < 1) return false;
    let remainingSum = totalSum - maxVal;
    if (maxVal <= remainingSum || remainingSum <= 0) return false;
    const prevVal = maxVal % remainingSum; // preVal = maxVal - remainingSum
    if (prevVal === 0) prevVal = remainingSum;
    if (prevVal < 1) return false;
    heap.insert(prevVal);
    totalSum = remainingSum + prevVal;
  }
}

/*
Complexity

Each loop iteration we pop and push once → O(log n) heap ops.

In the worst case, number of iterations is bounded by the number of times elements are reduced; modulo drastically reduces the number of iterations compared to repeated subtraction.

Time (amortized): O(m log n) where m is the number of iterations (typically small because of modulo jumps). Worst-case practical behavior is good for constraints.

Space: O(n) for heap.
*/
