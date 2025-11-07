/*
Kth Smallest
Difficulty: MediumAccuracy: 35.17%Submissions: 715K+Points: 4Average Time: 25m
Given an array arr[] and an integer k where k is smaller than the size of the array, your task is to find the kth smallest element in the given array.

Follow up: Don't solve it using the inbuilt sort function.

Examples :

Input: arr[] = [7, 10, 4, 3, 20, 15], k = 3
Output: 7
Explanation: 3rd smallest element in the given array is 7.
Input: arr[] = [2, 3, 1, 20, 15], k = 4 
Output: 15
Explanation: 4th smallest element in the given array is 15.
Constraints:
1 <= arr.size <= 106
1<= arr[i] <= 106
1 <= k <= n
*/

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }
  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }
  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }
  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }
  parent(index) {
    return this.heap[this.getParentIndex(index)];
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.parent(index) < this.heap[index]) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return max;
  }

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let largerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index) > this.leftChild(index)
      ) {
        largerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] >= this.heap[largerChildIndex]) {
        break;
      } else {
        this.swap(index, largerChildIndex);
      }
      index = largerChildIndex;
    }
  }

  size() {
    return this.heap.length;
  }
}

/* n * log(k) good => worst case k = n */
function kthSmallest1(arr, k) {
  const heap = new MaxHeap();

  for (let i = 0; i < k; i++) {
    heap.insert(arr[i]);
  }

  for (let i = k; i <= arr.length - 1; i++) {
    if (arr[i] < heap.peek()) {
      heap.extractMax();
      heap.insert(arr[i]);
    }
  }
  return heap.peek();
}

/* k * log(N)  Not good enough worst case k = n */

function kthSmallest(arr, k) {
  const heap = new MaxHeap();

  for (let num of arr) {
    heap.insert(num);
    if (heap.size() > k) {
      heap.extractMax();
    }
  }

  return heap.peek();
}

// Test cases
console.log(kthSmallest([7, 10, 4, 3, 20, 15], 3)); // Output: 7
console.log(kthSmallest([2, 3, 1, 20, 15], 4)); // Output: 15

// Quick Select Method Recursive
function kthSmallestRecursive(arr, k) {
  // Input validation
  if (!arr || arr.length === 0) {
    throw new Error("Array cannot be empty");
  }
  if (k < 1 || k > arr.length) {
    throw new Error("k must be between 1 and array length");
  }

  /**
   * Partition function - rearranges array so that:
   * - All elements <= pivot are on the left
   * - All elements > pivot are on the right
   * - Returns the final index of the pivot element
   */
  function partition(left, right) {
    // Choose random pivot to avoid worst-case O(n²) on sorted arrays
    const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;

    // Move chosen pivot to the end (partition function expects pivot at right)
    [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
    const pivot = arr[right];

    let i = left; // Pointer for the position where next smaller element should go

    // Iterate through the array from left to right-1
    for (let j = left; j < right; j++) {
      // If current element is <= pivot, move it to the left partition
      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        i++; // Move the partition boundary
      }
    }

    // Move the pivot to its correct sorted position
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i; // Return the final index of the pivot
  }

  /**
   * QuickSelect recursive helper function
   * Finds the kth smallest element in the subarray arr[left..right]
   */
  function quickSelect(left, right, kSmallest) {
    // Base case: subarray has only one element
    if (left === right) {
      return arr[left];
    }

    // Partition the array and get the pivot's final position
    const pivotIndex = partition(left, right);

    // Three cases:
    if (kSmallest === pivotIndex) {
      // Case 1: Pivot is exactly the kth smallest element
      return arr[pivotIndex];
    } else if (kSmallest < pivotIndex) {
      // Case 2: kth smallest is in the left partition
      return quickSelect(left, pivotIndex - 1, kSmallest);
    } else {
      // Case 3: kth smallest is in the right partition
      return quickSelect(pivotIndex + 1, right, kSmallest);
    }
  }

  // Start the recursive process (k-1 because arrays are 0-indexed)
  return quickSelect(0, arr.length - 1, k - 1);
}

// Quick Select iterative
function kthSmallestIterative(arr, k) {
  // Input validation
  if (!arr || arr.length === 0) {
    throw new Error("Array cannot be empty");
  }
  if (k < 1 || k > arr.length) {
    throw new Error("k must be between 1 and array length");
  }

  /**
   * Partition function (same as recursive version)
   * Rearranges array around a pivot and returns its final position
   */
  function partition(left, right) {
    // Choose random pivot and move it to the end
    const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;
    [arr[randomIndex], arr[right]] = [arr[right], arr[randomIndex]];
    const pivot = arr[right];

    let i = left; // Partition boundary pointer

    for (let j = left; j < right; j++) {
      if (arr[j] <= pivot) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
      }
    }

    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
  }

  let left = 0;
  let right = arr.length - 1;
  const kSmallest = k - 1; // Convert to 0-based index

  // Continue searching until we find the kth smallest element
  while (left <= right) {
    // Partition the current subarray
    const pivotIndex = partition(left, right);

    // Check if we found the kth smallest element
    if (pivotIndex === kSmallest) {
      return arr[pivotIndex];
    } else if (pivotIndex > kSmallest) {
      // kth smallest is in the left partition - adjust right boundary
      right = pivotIndex - 1;
    } else {
      // kth smallest is in the right partition - adjust left boundary
      left = pivotIndex + 1;
    }
  }

  // This line should never be reached with valid input
  return arr[kSmallest];
}
