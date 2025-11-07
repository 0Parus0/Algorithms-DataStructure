/*
632. Smallest Range Covering Elements from K Lists
Hard
Topics
premium lock icon
Companies
You have k lists of sorted integers in non-decreasing order. Find the smallest range that includes at least one number from each of the k lists.

We define the range [a, b] is smaller than range [c, d] if b - a < d - c or a < c if b - a == d - c.

 

Example 1:

Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation: 
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
Example 2:

Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]
 

Constraints:

nums.length == k
1 <= k <= 3500
1 <= nums[i].length <= 50
-105 <= nums[i][j] <= 105
nums[i] is sorted in non-decreasing order.
*/

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp();
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].val <= this.heap[index].val) break;
      [this.heap[index], this.heap[parent]] = [
        this.heap[parent],
        this.heap[index],
      ];
      index = parent;
    }
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (
        left < this.heap.length &&
        this.heap[left].val < this.heap[smallest].val
      )
        smallest = left;
      if (
        right < this.heap.length &&
        this.heap[right].val < this.heap[smallest].val
      )
        smallest = right;

      if (index === smallest) break;
      [this.heap[smallest], this.heap[index]] = [
        this.heap[index],
        this.heap[smallest],
      ];

      index = smallest;
    }
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  size() {
    return this.heap.length;
  }
}

function smallestRange(nums) {
  const k = nums.length;
  const heap = new MinHeap();
  let currentMax = -Infinity;
  let rangeStart = 0;
  let rangeEnd = Infinity;

  // Initialize the heap with first element of each list
  for (let i = 0; i < k; i++) {
    const val = nums[i][0];
    heap.insert({ val, listIndex: i, elementIndex: 0 });
    currentMax = Math.max(currentMax, val);
  }

  while (true) {
    const node = heap.extractMin();
    if (!node) break;
    const { val, listIndex, elementIndex } = node;
    const currentRange = currentMax - val;
    const bestRange = rangeEnd - rangeStart;

    if (
      currentRange < bestRange ||
      (currentRange === bestRange && val < rangeStart)
    ) {
      rangeStart = val;
      rangeEnd = currentMax;
    }

    // If there is a next element in the same list insert it
    if (elementIndex + 1 < nums[listIndex].length) {
      const nextVal = nums[listIndex][elementIndex + 1];
      heap.insert({ val: nextVal, listIndex, elementIndex: elementIndex + 1 });
      currentMax = Math.max(currentMax, nextVal);
    } else {
      // If one list is exhausted, break out of the loop
      break;
    }
  }

  return [rangeStart, rangeEnd];
}

/*
📊 Complexity

Heap size = k.

Each insert/extract = O(log k).

Each list contributes at most n elements → total operations O(N log k) (where N = total number of elements across lists).
*/

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].val <= this.heap[index].val) break;
      [this.heap[index], this.heap[parent]] = [
        this.heap[parent],
        this.heap[index],
      ];
      index = parent;
    }
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (
        left < this.heap.length &&
        this.heap[left].val < this.heap[smallest].val
      ) {
        smallest = left;
      }
      if (
        right < this.heap.length &&
        this.heap[right].val < this.heap[smallest].val
      ) {
        smallest = right;
      }

      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }
}

function smallestRange(nums) {
  const k = nums.length;
  const heap = new MinHeap();
  let currentMax = -Infinity;

  // Initialize the heap with the first element from each list
  for (let i = 0; i < k; i++) {
    const val = nums[i][0];
    heap.insert({ val, listIndex: i, elementIndex: 0 });
    currentMax = Math.max(currentMax, val);
  }

  let bestRangeStart = 0;
  let bestRangeEnd = Infinity;

  // Continue while heap has one element from each list
  while (heap.size() === k) {
    const { val: currentMin, listIndex, elementIndex } = heap.extractMin();
    const currentRangeStart = currentMin;
    const currentRangeEnd = currentMax;
    const currentRangeSize = currentRangeEnd - currentRangeStart;
    const bestRangeSize = bestRangeEnd - bestRangeStart;

    // Update best range if smaller
    if (
      currentRangeSize < bestRangeSize ||
      (currentRangeSize === bestRangeSize && currentRangeStart < bestRangeStart)
    ) {
      bestRangeStart = currentRangeStart;
      bestRangeEnd = currentRangeEnd;
    }

    // Move forward in the list that gave the minimum
    if (elementIndex + 1 < nums[listIndex].length) {
      const nextVal = nums[listIndex][elementIndex + 1];
      heap.insert({ val: nextVal, listIndex, elementIndex: elementIndex + 1 });
      currentMax = Math.max(currentMax, nextVal);
    }
  }

  return [bestRangeStart, bestRangeEnd];
}
