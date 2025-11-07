class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent][0] > this.heap[index][0]) {
        [this.heap[parent], this.heap[index]] = [
          this.heap[index],
          this.heap[parent],
        ];
        index = parent;
      } else break;
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyDown() {
    const n = this.heap.length;
    let index = 0;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < n && this.heap[left][0] < this.heap[smallest][0])
        smallest = left;
      if (right < n && this.heap[right][0] < this.heap[smallest][0])
        smallest = right;

      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[index],
        ];
        index = smallest;
      } else break;
    }
  }

  size() {
    return this.heap.length;
  }
}

class Solution {
  mergeKArrays(arr, k) {
    const heap = new MinHeap();
    const result = [];

    // Step 1 push first element of each row
    for (let i = 0; i < k; i++) {
      heap.insert([arr[i], i, 0]); // [value, row, col]
    }

    // Step 2: Extract min and push next element from same row
    while (heap.size() > 0) {
      const [val, row, col] = heap.extractMin();
      result.push(val);

      if (col + 1 < k) {
        heap.insert([arr[row][col + 1], row, col + 1]);
      }
    }
    return result;
  }
}

/*
🔹 Complexity

Time: O(k² log k) (N = k² total elements, each heap operation log k)

Space: O(k) (heap stores at most one element from each array at a time)
*/

class Solution {
  mergeKArrays(arr, k) {
    const flat = [];
    for (let i = 0; i < k; i++) {
      for (let j = 0; j < k; j++) {
        flat.push(arr[i][j]);
      }
    }

    flat.sort((a, b) => a - b);
    return flat;
  }
}
/*
Time: O(k² log (k²))

Space: O(k²)

Good for small k, but not optimal.
*/

/* 🔹 Approach 3: Divide & Conquer (Pairwise Merge)
Idea:

Merge arrays two at a time until only one remains.

Each merge is like merging two sorted lists (O(n1 + n2) time).

We reduce k arrays → k/2 arrays → k/4 arrays → … → 1 array.

*/

class Solution {
  // Merge two sorted arrays
  mergeTwoArrays(a, b) {
    let i = 0,
      j = 0;
    const merged = [];

    while (i < a.length && j < b.length) {
      if (a[i] <= b[j]) {
        merged.push(a[i++]);
      } else {
        merged.push(b[j++]);
      }
    }

    while (i < a.length) merged.push(a[i++]);
    while (j < b.length) merged.push(b[j++]);

    return merged;
  }

  mergeKArrays(arr, k) {
    if (k === 0) return [];
    let result = arr[0];

    for (let i = 1; i < k; i++) {
      result = this.mergeTwoArrays(result, arr[i]);
    }

    return result;
  }
}

/*
🔹 Complexity

Each merge = O(n1 + n2)

Total elements = N = k²

Every element is merged log k times (like merge sort).

Time: O(N log k)

Space: O(N) (result array, but no extra heap)
*/

function mergeKArrays(arr, k) {
  if (k === 0) return [];

  return mergeArrays(arr, 0, k - 1);
}

function mergeArrays(arr, start, end) {
  if (start === end) return arr[start];
  if (start + 1 === end) return mergeTwoArrays(arr[start], arr[end]);

  const mid = Math.floor((start + end) / 2);
  const left = mergeArrays(arr, start, mid);
  const right = mergeArrays(arr, mid + 1, end);
  return mergeTwoArrays(left, right);
}

function mergeTwoArrays(arr1, arr2) {
  let merged = [];
  let i = 0;
  j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i++]);
    } else {
      merged.push(arr2[j++]);
    }
  }

  while (i < arr1.length) merged.push(arr1[i++]);
  while (j < arr2.length) merged.push(arr2[j++]);

  return merged;
}

/*
🔹 Complexity Analysis

At each recursion level, you merge arrays of total length O(k²) (since total number of elements is k * k).

Depth of recursion = O(log k) (splitting k arrays in halves).

Total complexity = O(k² log k).

This is slightly worse than the min-heap approach (O(k² log k)) in practice because:

Min-heap merges everything progressively in one pass.

Divide & conquer does multiple merge passes.

But both are acceptable within constraints (k ≤ 100).
*/
