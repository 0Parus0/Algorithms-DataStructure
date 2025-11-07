/*
Kth smallest element in a Matrix
Difficulty: MediumAccuracy: 61.42%Submissions: 76K+Points: 4Average Time: 35m
Given a matrix mat[][] of size n*n, where each row and column is sorted in non-decreasing order. Find the kth smallest element in the matrix.

Examples:
Input: mat[][] = [[16, 28, 60, 64], k = 3
                [22, 41, 63, 91],
                [27, 50, 87, 93],
                [36, 78, 87, 94]]
Output: 27
Explanation: 27 is the 3rd smallest element.
Input: mat[][] = [[10, 20, 30, 40], k = 7
                [15, 25, 35, 45],
                [24, 29, 37, 48],
                [32, 33, 39, 50]] 
Output: 30
Explanation: 30 is the 7th smallest element.
Constraints:
1 ≤ n ≤ 500
1 ≤ mat[i][j] ≤ 104
1 ≤ k ≤ n*n
*/
/**
 * @param {number[][]} mat
 * @param {number} k
 * @returns {number}
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 1) return this.heap.pop();
    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return root;
  }

  heapifyUp(i) {
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.heap[parent][0] > this.heap[i][0]) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      } else break;
    }
  }

  heapifyDown(i) {
    let n = this.heap.length;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < n && this.heap[left][0] < this.heap[smallest][0])
        smallest = left;
      if (right < n && this.heap[right][0] < this.heap[smallest][0])
        smallest = right;

      if (smallest !== i) {
        [this.heap[smallest], this.heap[i]] = [
          this.heap[i],
          this.heap[smallest],
        ];
        i = smallest;
      } else break;
    }
  }
}

class SolutionHeap {
  kthSmallest(mat, k) {
    const n = mat.length;
    const heap = new MinHeap();

    // Step 1: Push the first element of each row into the heap
    // Each heap entry = [value, rowIndex, colIndex]
    for (let i = 0; i < n; i++) {
      heap.insert([mat[i][0], i, 0]);
    }

    // Step 2: Extract the min k times
    let num;
    for (let count = 0; count < k; count++) {
      num = heap.extractMin(); // get smallest element
      const [val, row, col] = num;

      // If next element exists in the same row, push it
      if (col + 1 < n) {
        heap.insert([mat[row][col + 1], row, col + 1]);
      }
    }
    return num[0]; // kth smallest value
  }
}

/*
  ⏱️ Complexity Analysis
  Complexity	Explanation
  Time: O(k log n)	Each heap operation costs log(n), and we do it k times
  Space: O(n)	Heap holds at most one element per row

  ✅ Efficient for medium n (≤ 500)
  ✅ Works well when k is small relative to n²
*/

class SolutionBinarySearch {
  kthSmallest(mat, k) {
    const n = mat.length;
    // Smallest possible value in the matrix
    let low = mat[0][0];
    // Largest possible value in the matrix
    let high = mat[n - 1][n - 1];

    // Binary search over the range of values
    while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      // Count how many numbers are <= mid
      let count = this.countLessEqual(mat, mid);

      if (count < k) {
        // Not enough numbers <= mid, so move right
        low = mid + 1;
      } else {
        // Enough numbers <= mid, shrink the range
        high = mid - 1;
      }
    }
    return low; // At the end, 'low' will be the kth smallest
  }

  countLessEqual(mat, target) {
    const n = mat.length;
    let count = 0;

    // Start from top-right corner
    let i = 0;
    let j = n - 1;

    // Each row is sorted, so we can "walk" intelligently
    while (i < n && j >= 0) {
      if (mat[i][j] <= target) {
        // If mat[i][j] <= target, all elements in this row
        // up to column 'j' are also <= target
        count += j + 1;
        i++; // move down to next row
      } else {
        j--; // move left if value too large
      }
    }
    return count;
  }
}
