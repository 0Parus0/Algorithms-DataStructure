/*
Sum of elements between k1'th and k2'th smallest elements
Difficulty: EasyAccuracy: 32.02%Submissions: 50K+Points: 2
Given an array A[] of N positive integers and two positive integers K1 and K2. Find the sum of all elements between K1th and K2th smallest elements of the array. It may be assumed that (1 <= k1 < k2 <= n).

 

Example 1:

Input:
N  = 7
A[] = {20, 8, 22, 4, 12, 10, 14}
K1 = 3, K2 = 6
Output:
26
Explanation:
3rd smallest element is 10
6th smallest element is 20
Element between 10 and 20 
12,14. Their sum = 26.
 

Example 2:

Input
N = 6
A[] = {10, 2, 50, 12, 48, 13}
K1= 2, K2 = 6
Output:
73
 

Your Task:  
You don't need to read input or print anything. Your task is to complete the function sumBetweenTwoKth() which takes the array A[], its size N and two integers K1 and K2 as inputs and returns the sum of all the elements between K1th and K2th smallest elements.
 

Expected Time Complexity: O(N. log(N))
Expected Auxiliary Space: O(N)

 

Constraints:
1 ≤ N ≤ 105
1 ≤ K1, K2 ≤ 105
*/
function sumBetweenTwoKth(arr, k1, k2) {
  // Sort the array
  const sorted = [...arr].sort((a, b) => a - b);

  // K1'th smallest is at index k1-1, K2'th smallest is at index k2-1
  const k1th = sorted[k1 - 1];
  const k2th = sorted[k2 - 1];

  let sum = 0;

  // Sum all elements between k1th and k2th (exclusive)
  for (let num of arr) {
    if (num > k1th && num < k2th) {
      sum += num;
    }
  }

  return sum;
}

class MaxHeap {
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
      if (this.heap[parent] < this.heap[i]) {
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
      let largest = i;

      if (left < n && this.heap[left] > this.heap[largest]) largest = left;
      if (right < n && this.heap[right] > this.heap[largest]) largest = right;

      if (largest !== i) {
        [this.heap[largest], this.heap[i]] = [this.heap[i], this.heap[largest]];
        i = largest;
      } else break;
    }
  }

  size() {
    return this.heap.length;
  }
}

function sumBetweenTwoKthHeap(arr, k1, k2) {
  const heap = new MinHeap();

  // Build heap - O(n) using heapify
  for (let num of arr) {
    heap.insert(num);
  }

  // Extract first k1-1 elements
  for (let i = 0; i < k1 - 1; i++) {
    heap.extractMin();
  }

  // The next element is k1'th smallest
  const k1th = heap.extractMin();

  // Extract elements between k1 and k2-1
  let sum = 0;
  for (let i = 0; i < k2 - k1 - 1; i++) {
    sum += heap.extractMin();
  }

  return sum;
}

function sumBetweenTwoKthOptimized(arr, k1, k2) {
  // Find k1'th and k2'th smallest using quickselect
  const k1th = quickSelect([...arr], k1);
  const k2th = quickSelect([...arr], k2);

  let sum = 0;

  // Sum elements strictly between k1th and k2th
  for (let num of arr) {
    if (num > k1th && num < k2th) {
      sum += num;
    }
  }

  return sum;
}

function quickSelect(arr, k) {
  return quickSelectHelper(arr, 0, arr.length - 1, k - 1);
}

function quickSelectHelper(arr, left, right, k) {
  if (left === right) return arr[left];

  const pivotIndex = partition(arr, left, right);

  if (k === pivotIndex) {
    return arr[k];
  } else if (k < pivotIndex) {
    return quickSelectHelper(arr, left, pivotIndex - 1, k);
  } else {
    return quickSelectHelper(arr, pivotIndex + 1, right, k);
  }
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}
class Solution {
  sumBetweenTwoKth(arr, n, k1, k2) {
    // Method 1: Using sorting (simplest and most readable)
    const sorted = [...arr].sort((a, b) => a - b);

    const k1th = sorted[k1 - 1];
    const k2th = sorted[k2 - 1];

    let sum = 0;

    for (let num of arr) {
      if (num > k1th && num < k2th) {
        sum += num;
      }
    }

    return sum;
  }
}

// Alternative implementation using the heap approach
class SolutionWithHeap {
  sumBetweenTwoKth(arr, n, k1, k2) {
    const heap = new MinHeap();

    // Add all elements to heap
    for (let num of arr) {
      heap.insert(num);
    }

    // Remove first k1-1 elements
    for (let i = 0; i < k1 - 1; i++) {
      heap.extractMin();
    }

    // k1'th smallest
    const k1th = heap.extractMin();

    // Sum elements between k1 and k2 (excluding both)
    let sum = 0;
    // We need to extract (k2 - k1 - 1) elements
    for (let i = 0; i < k2 - k1 - 1; i++) {
      sum += heap.extractMin();
    }

    return sum;
  }
}

// Test cases
function testSumBetweenTwoKth() {
  const solution = new Solution();

  // Test case 1
  const arr1 = [20, 8, 22, 4, 12, 10, 14];
  console.log("Test 1:");
  console.log("Array:", arr1);
  console.log("K1=3, K2=6");
  console.log("Result:", solution.sumBetweenTwoKth(arr1, 7, 3, 6));
  console.log("Expected: 26");
  console.log("Pass:", solution.sumBetweenTwoKth(arr1, 7, 3, 6) === 26);
  console.log();

  // Test case 2
  const arr2 = [10, 2, 50, 12, 48, 13];
  console.log("Test 2:");
  console.log("Array:", arr2);
  console.log("K1=2, K2=6");
  console.log("Result:", solution.sumBetweenTwoKth(arr2, 6, 2, 6));
  console.log("Expected: 73");
  console.log("Pass:", solution.sumBetweenTwoKth(arr2, 6, 2, 6) === 73);
  console.log();

  // Test case 3: Edge case with consecutive numbers
  const arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log("Test 3:");
  console.log("Array:", arr3);
  console.log("K1=3, K2=8");
  console.log("Result:", solution.sumBetweenTwoKth(arr3, 10, 3, 8));
  console.log("Expected: 22"); // 4+5+6+7 = 22
  console.log("Pass:", solution.sumBetweenTwoKth(arr3, 10, 3, 8) === 22);
  console.log();

  // Test case 4: With duplicates
  const arr4 = [1, 3, 2, 3, 4, 3, 5];
  console.log("Test 4:");
  console.log("Array:", arr4);
  console.log("K1=2, K2=5");
  console.log("Result:", solution.sumBetweenTwoKth(arr4, 7, 2, 5));
  console.log(
    "Sorted:",
    [...arr4].sort((a, b) => a - b)
  );
  console.log();
}

// Performance comparison
function comparePerformance() {
  const solution1 = new Solution(); // Sorting approach
  const solution2 = new SolutionWithHeap(); // Heap approach

  // Large test case
  const largeArray = Array.from({ length: 100000 }, () =>
    Math.floor(Math.random() * 1000000)
  );
  const k1 = 100,
    k2 = 500;

  console.log("Performance Comparison (Large array: 100,000 elements)");

  // Test sorting approach
  console.time("Sorting Approach");
  const result1 = solution1.sumBetweenTwoKth(
    largeArray,
    largeArray.length,
    k1,
    k2
  );
  console.timeEnd("Sorting Approach");

  // Test heap approach
  console.time("Heap Approach");
  const result2 = solution2.sumBetweenTwoKth(
    largeArray,
    largeArray.length,
    k1,
    k2
  );
  console.timeEnd("Heap Approach");

  console.log("Results match:", result1 === result2);
}

// Run tests
testSumBetweenTwoKth();
comparePerformance();

/*
Complexity Analysis
Method 1 (Sorting):
Time Complexity: O(N log N) for sorting

Space Complexity: O(N) for the sorted array

Best for: General purpose, most readable

Method 2 (Heap):
Time Complexity: O(N + K2 log N) - building heap + extraction

Space Complexity: O(N)

Best for: When K2 is much smaller than N

Method 3 (QuickSelect):
Time Complexity: O(N) average case for finding both K1 and K2

Space Complexity: O(log N) for recursion stack

Best for: Large arrays where we only need specific order statistics

Recommendation
For the coding challenge, I'd recommend Method 1 (Sorting approach) because:

It's the simplest to implement and understand

Meets the expected time complexity O(N log N)

Easy to verify correctness

Works reliably for all cases

The sorting approach is clean, efficient enough for the constraints (N ≤ 10^5), and clearly demonstrates the problem-solving approach.

*/
