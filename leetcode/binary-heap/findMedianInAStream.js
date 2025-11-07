/*
Find median in a stream
Difficulty: HardAccuracy: 30.34%Submissions: 154K+Points: 8Average Time: 45m
Given a data stream arr[] where integers are read sequentially, the task is to determine the median of the elements encountered so far after each new integer is read.

There are two cases for median on the basis of data set size.

1. If the data set has an odd number then the middle one will be consider as median.
2. If the data set has an even number then there is no distinct middle value and the median will be the arithmetic mean of the two middle values.

Examples:

Input:  arr[] = [5, 15, 1, 3, 2, 8]
Output: [5.0, 10.0, 5.0, 4.0, 3.0, 4.0] 
Explanation: 
After reading 1st element of stream – 5 -> median = 5.0
After reading 2nd element of stream – 5, 15 -> median = (5+15)/2 = 10.0 
After reading 3rd element of stream – 5, 15, 1 -> median = 5.0
After reading 4th element of stream – 5, 15, 1, 3 ->  median = (3+5)/2 = 4.0
After reading 5th element of stream – 5, 15, 1, 3, 2 -> median = 3.0
After reading 6th element of stream – 5, 15, 1, 3, 2, 8 ->  median = (3+5)/2 = 4.0
Input: arr[] = [2, 2, 2, 2]
Output: [2.0, 2.0, 2.0, 2.0]
Explanation: 
After reading 1st element of stream – 2 -> median = 2.0
After reading 2nd element of stream – 2, 2 -> median = (2+2)/2 = 2.0
After reading 3rd element of stream – 2, 2, 2 -> median = 2.0
After reading 4th element of stream – 2, 2, 2, 2 ->  median = (2+2)/2 = 2.0
Constraints:
1 <= arr.size() <= 105
1 <= x <= 106

Approach

    Data Structures: Use two heaps:

        A max-heap to store the lower half of the numbers.

        A min-heap to store the upper half of the numbers.

    Balancing Heaps: Ensure that the size of the max-heap is either equal to or one more than the size of the min-heap. This allows us to quickly access the median.

    Insertion:

        If the max-heap is empty or the new number is less than the root of the max-heap, insert it into the max-heap.

        Otherwise, insert it into the min-heap.

        Balance the heaps:

            If the size of the max-heap is more than one greater than the min-heap, move the root of the max-heap to the min-heap.

            If the size of the min-heap is greater than the max-heap, move the root of the min-heap to the max-heap.

    Finding Median:

        If the sizes of both heaps are equal, the median is the average of the roots of both heaps.

        Otherwise, the median is the root of the max-heap.
*/
/* Max Heap */

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

    const max = this.heap[0];
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
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (left < this.heap.length && this.heap[left] > this.heap[largest])
        largest = left;
      if (right < this.heap.length && this.heap[right] > this.heap[largest])
        largest = right;

      if (largest !== index) {
        [this.heap[index], this.heap[largest]] = [
          this.heap[largest],
          this.heap[index],
        ];

        index = largest;
      } else break;
    }
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }
}

/* Min Heap */

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
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let smallest = index;

      if (
        leftChildIndex < this.heap.length &&
        this.heap[leftChildIndex] < this.heap[smallest]
      ) {
        smallest = leftChildIndex;
      }
      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex] < this.heap[smallest]
      ) {
        smallest = rightChildIndex;
      }
      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }
}

/**
 * @param {number[]} arr
 * @returns {number[]}
 */

class Solution {
  getMedian(arr) {
    const maxHeap = new MaxHeap(); // left half of numbers (contains smaller elements)
    const minHeap = new MinHeap(); // right half of numbers (contains larger elements)
    const medians = []; // stores running medians

    for (let num of arr) {
      // --- Step 1: Insert number into the correct heap ---
      // If the number is smaller than or equal to max of left side, it belongs to maxHeap
      if (maxHeap.size() === 0 || num < maxHeap.peek()) {
        maxHeap.insert(num);
      } else {
        // otherwise, it belongs to right side (minHeap)
        minHeap.insert(num);
      }

      // --- Step 2: Balance the heaps ---
      // Heaps must stay balanced (size difference <= 1)
      if (maxHeap.size() > minHeap.size() + 1) {
        // Left heap too large → move one element to right heap
        minHeap.insert(maxHeap.extractMax());
      } else if (minHeap.size() > maxHeap.size()) {
        // Right heap too large → move one element to left heap
        maxHeap.insert(minHeap.extractMin());
      }

      // --- Step 3: Calculate median ---
      if (maxHeap.size() === minHeap.size()) {
        // Even number of elements → median = average of both roots
        medians.push((maxHeap.peek() + minHeap.peek()) / 2);
      } else {
        // Odd number of elements → median = root of maxHeap (left side)
        medians.push(maxHeap.peek());
      }
    }

    return medians;
  }
}
/*
✅ Key Points Recap

MaxHeap keeps the smaller half — allows O(1) access to the largest of the smaller numbers.

MinHeap keeps the larger half — allows O(1) access to the smallest of the larger numbers.

Balancing ensures the median always lies at the top(s).

Time complexity: O(N log N) (since each insert/extract is O(log N)).

Space complexity: O(N)
*/

class Solution {
  getMedian(arr) {
    const maxHeap = new MaxHeap(); // for the left part
    const minHeap = new MinHeap(); // for right part
    const medians = [];

    for (let num of arr) {
      // Insert into appropriate heap
      if (maxHeap.size() === 0 || num < maxHeap.peek()) {
        maxHeap.insert(num);
      } else {
        minHeap.insert(num);
      }

      // Balance the heaps
      if (maxHeap.size() > minHeap.size() + 1) {
        minHeap.insert(maxHeap.extractMax());
      } else if (minHeap.size() > maxHeap.size()) {
        maxHeap.insert(minHeap.extractMin());
      }

      // Calculate median
      if (maxHeap.size() === minHeap.size()) {
        medians.push((maxHeap.peek() + minHeap.peek()) / 2);
      } else {
        medians.push(maxHeap.peek());
      }
    }
    return medians;
  }
}
