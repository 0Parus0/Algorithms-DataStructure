/*
3478. Choose K Elements With Maximum Sum
Medium
Topics
premium lock icon
Companies
Hint
You are given two integer arrays, nums1 and nums2, both of length n, along with a positive integer k.

For each index i from 0 to n - 1, perform the following:

Find all indices j where nums1[j] is less than nums1[i].
Choose at most k values of nums2[j] at these indices to maximize the total sum.
Return an array answer of size n, where answer[i] represents the result for the corresponding index i.

 

Example 1:

Input: nums1 = [4,2,1,5,3], nums2 = [10,20,30,40,50], k = 2

Output: [80,30,0,80,50]

Explanation:

For i = 0: Select the 2 largest values from nums2 at indices [1, 2, 4] where nums1[j] < nums1[0], resulting in 50 + 30 = 80.
For i = 1: Select the 2 largest values from nums2 at index [2] where nums1[j] < nums1[1], resulting in 30.
For i = 2: No indices satisfy nums1[j] < nums1[2], resulting in 0.
For i = 3: Select the 2 largest values from nums2 at indices [0, 1, 2, 4] where nums1[j] < nums1[3], resulting in 50 + 30 = 80.
For i = 4: Select the 2 largest values from nums2 at indices [1, 2] where nums1[j] < nums1[4], resulting in 30 + 20 = 50.
Example 2:

Input: nums1 = [2,2,2,2], nums2 = [3,1,2,3], k = 1

Output: [0,0,0,0]

Explanation:

Since all elements in nums1 are equal, no indices satisfy the condition nums1[j] < nums1[i] for any i, resulting in 0 for all positions.

 

Constraints:

n == nums1.length == nums2.length
1 <= n <= 105
1 <= nums1[i], nums2[i] <= 106
1 <= k <= n
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
    if (this.size() === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    return top;
  }
  size() {
    return this.heap.length;
  }
  _bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = (idx - 1) >> 1;
      if (this.heap[parent] <= this.heap[idx]) break;
      this._swap(parent, idx);
      idx = parent;
    }
  }
  _bubbleDown() {
    let idx = 0;
    const n = this.heap.length;
    while (true) {
      let left = (idx << 1) + 1;
      let right = (idx << 1) + 2;
      let smallest = idx;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === idx) break;
      this._swap(smallest, idx);
      idx = smallest;
    }
  }
  _swap(i, j) {
    let temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
var findMaxSum = function (nums1, nums2, k) {
  const n = nums1.length;
  const items = new Array(n);
  for (let i = 0; i < n; i++) {
    items[i] = { v1: nums1[i], v2: nums2[i], id: i };
  }

  // Sort items based on nums1 values
  items.sort((a, b) => a.v1 - b.v1);

  const result = new Array(n).fill(0);
  const pq = new MinHeap();
  let runningSum = 0;
  let i = 0;

  while (i < n) {
    let j = i;
    // Find the range of elements with the same nums1 value
    while (j < n && items[j].v1 === items[i].v1) {
      // These elements only see values from elements with strictly smaller v1
      result[items[j].id] = runningSum;
      j++;
    }

    // After processing the block, add their v2 values to the heap
    for (let idx = i; idx < j; idx++) {
      pq.push(items[idx].v2);
      runningSum += items[idx].v2;

      // Maintain heap size at k
      if (pq.size() > k) {
        runningSum -= pq.pop();
      }
    }
    i = j;
  }

  return result;
};

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return top;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);

      if (this.heap[parent] <= this.heap[idx]) break;

      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];

      idx = parent;
    }
  }

  bubbleDown() {
    let idx = 0;
    const n = this.heap.length;

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;

      if (left < n && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < n && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];

      idx = smallest;
    }
  }
}
