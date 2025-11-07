/*
First negative in every window of size k
Difficulty: MediumAccuracy: 48.61%Submissions: 210K+Points: 4Average Time: 15m
Given an array arr[]  and a positive integer k, find the first negative integer for each and every window(contiguous subarray) of size k.

Note: If a window does not contain a negative integer, then return 0 for that window.

Examples:

Input: arr[] = [-8, 2, 3, -6, 10] , k = 2
Output: [-8, 0, -6, -6]
Explanation:
Window [-8, 2] First negative integer is -8.
Window [2, 3] No negative integers, output is 0.
Window [3, -6] First negative integer is -6.
Window [-6, 10] First negative integer is -6.
Input: arr[] = [12, -1, -7, 8, -15, 30, 16, 28] , k = 3
Output: [-1, -1, -7, -15, -15, 0] 
Explanation:
Window [12, -1, -7] First negative integer is -1.
Window [-1, -7, 8] First negative integer is -1.
Window [-7, 8, -15] First negative integer is -7.
Window [8, -15, 30] First negative integer is -15.
Window [-15, 30, 16] First negative integer is -15.
Window [30, 16, 28] No negative integers, output is 0.
Input: arr[] = [12, 1, 3, 5] , k = 3
Output: [0, 0] 
Explanation:
Window [12, 1, 3] No negative integers, output is 0.
Window [1, 3, 5] No negative integers, output is 0.

Constraints:
1 <= arr.size() <= 106
-105 <= arr[i] <= 105
1 <= k <= arr.size()
*/

/*
🧠 Step-by-Step Thinking

Goal:
For each subarray (window) of size k, we want to find the first negative number.

Step 1: Sliding Window Setup

We’ll use two pointers (or indices):

i → window start

j → window end (expands)

We’ll slide this window from left to right, keeping track of the negatives within the window.

Step 2: Maintain a Queue of Negatives

We can use a queue (or array) to store negative numbers currently inside the window.

When we move j forward:

If arr[j] is negative → push it into the queue.

When the window size (j - i + 1) reaches k:

The front of the queue (if it exists) is the first negative number for that window.

If queue is empty → output 0.

Before moving i forward (shrinking window):

If arr[i] equals the front of the queue → remove it from the queue (since it’s no longer in the window).

Step 3: Slide the Window

Repeat until j reaches the end of the array.
*/

function firstNegativeInWindow(arr, k) {
  const n = arr.length;

  const queue = []; // will store negative numbers in current window
  const result = [];

  let i = 0,
    j = 0;

  while (j < n) {
    // Step 1: include current element
    if (arr[j] < 0) queue.push(arr[j]);

    // Step 2: check if window size reached
    if (j - i + 1 < k) {
      j++;
    } else if (j - i + 1 === k) {
      // Step 3: record result
      result.push(queue.length > 0 ? queue[0] : 0);

      // Step 4: before sliding, remove element going out
      if (queue.length > 0 && arr[i] === queue[0]) {
        queue.shift();
      }

      // Slide window
      i++;
      j++;
    }
  }

  return result;
}

// Example:
console.log(firstNegativeInWindow([-8, 2, 3, -6, 10], 2));
// Output: [-8, 0, -6, -6]

console.log(firstNegativeInWindow([12, -1, -7, 8, -15, 30, 16, 28], 3));
// Output: [-1, -1, -7, -15, -15, 0]

/*
🧩 Complexity

Time: O(n) → each element is added/removed from queue at most once

Space: O(k) → at most k negatives stored
*/

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number[]}
 */

/*
#Plan:
1. Problem Understanding:
   - Find first negative integer in every contiguous subarray of size k
   - If no negative integer in window, return 0
   - Need efficient solution for large arrays (up to 10^6 elements)

2. Approaches:
   a. Brute Force: Check each window separately - O(n*k) time
   b. Sliding Window with Deque: O(n) time, O(k) space

3. Deque Approach:
   - Use deque to store indices of negative numbers in current window
   - Maintain deque such that front always has first negative in current window
   - Remove indices that are out of current window from front
   - Remove indices from back if current element is negative and we can replace older negatives

4. Algorithm Steps:
   a. Initialize deque and result array
   b. Process first k elements to build initial window
   c. For each subsequent window:
        - Remove out-of-window indices from front
        - Add current negative element to deque
        - Front of deque has first negative for current window

5. Complexity:
   - Time: O(n) - each element processed once
   - Space: O(k) - for deque storage
*/

function firstNegativeInWindow(arr, k) {
  const n = arr.length;
  const result = [];
  const deque = []; // store indices of negative numbers

  // Process first window
  for (let i = 0; i < k; i++) {
    // If current element is negative, add its index to deque
    if (arr[i] < 0) {
      deque.push(i);
    }
  }

  // First window result
  if (deque.length > 0) {
    result.push(arr[deque[0]]);
  } else {
    result.push(0);
  }

  // Process remaining windows
  for (let i = k; i < n; i++) {
    // Remove indices that are out of current window
    if (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // Add current element if negative
    if (arr[i] < 0) {
      deque.push(i);
    }

    // Get first negative for current window
    if (deque.length > 0) {
      result.push(arr[deque[0]]);
    } else {
      result.push(0);
    }
  }

  return result;
}

// Alternative implementation using two pointers
function firstNegativeInWindowTwoPointers(arr, k) {
  const n = arr.length;
  const result = [];
  let left = 0;

  for (let right = 0; right < n; right++) {
    // When window size reaches k
    if (right - left + 1 === k) {
      let found = false;

      // Find first negative in current window
      for (let i = left; i <= right; i++) {
        if (arr[i] < 0) {
          result.push(arr[i]);
          found = true;
          break;
        }
      }

      if (!found) {
        result.push(0);
      }

      left++; // Move window forward
    }
  }

  return result;
}

// Optimized deque implementation with detailed comments
function firstNegativeInWindowOptimized(arr, k) {
  const n = arr.length;
  const result = [];
  const negIndices = []; // Deque to store indices of negative numbers

  let left = 0;

  for (let right = 0; right < n; right++) {
    // Add current element to deque if it's negative
    if (arr[right] < 0) {
      negIndices.push(right);
    }

    // When window size becomes k
    if (right - left + 1 === k) {
      // Remove indices that are out of current window from front
      while (negIndices.length > 0 && negIndices[0] < left) {
        negIndices.shift();
      }

      // Front of deque has first negative in current window
      if (negIndices.length > 0) {
        result.push(arr[negIndices[0]]);
      } else {
        result.push(0);
      }

      left++; // Slide window
    }
  }

  return result;
}

// Implementation with logging for understanding
function firstNegativeInWindowDetailed(arr, k) {
  const n = arr.length;
  const result = [];
  const deque = [];

  console.log(`Input: arr = [${arr}], k = ${k}`);
  console.log("Processing windows:\n");

  for (let i = 0; i < n; i++) {
    console.log(`\nStep ${i}: Current element = ${arr[i]}`);
    console.log(
      `Deque before processing: [${deque.map((idx) => `${idx}:${arr[idx]}`)}]`
    );

    // Remove indices that are out of current window
    if (deque.length > 0 && deque[0] <= i - k) {
      const removed = deque.shift();
      console.log(`Removed index ${removed} (out of window)`);
    }

    // Add current element if negative
    if (arr[i] < 0) {
      deque.push(i);
      console.log(`Added index ${i} to deque (negative value: ${arr[i]})`);
    }

    // Check if we have a complete window
    if (i >= k - 1) {
      const windowStart = i - k + 1;
      if (deque.length > 0) {
        result.push(arr[deque[0]]);
        console.log(
          `Window [${windowStart}, ${i}]: First negative = ${
            arr[deque[0]]
          } at index ${deque[0]}`
        );
      } else {
        result.push(0);
        console.log(`Window [${windowStart}, ${i}]: No negative, result = 0`);
      }
    }

    console.log(
      `Deque after processing: [${deque.map((idx) => `${idx}:${arr[idx]}`)}]`
    );
  }

  console.log(`\nFinal result: [${result}]`);
  return result;
}

// Custom Test Cases
console.log("=== Test Case 1 ===");
console.log("Input: arr = [-8, 2, 3, -6, 10], k = 2");
console.log("Output:", firstNegativeInWindow([-8, 2, 3, -6, 10], 2));
console.log("Expected: [-8, 0, -6, -6]");
console.log("---");

console.log("=== Test Case 2 ===");
console.log("Input: arr = [12, -1, -7, 8, -15, 30, 16, 28], k = 3");
console.log(
  "Output:",
  firstNegativeInWindow([12, -1, -7, 8, -15, 30, 16, 28], 3)
);
console.log("Expected: [-1, -1, -7, -15, -15, 0]");
console.log("---");

console.log("=== Test Case 3 ===");
console.log("Input: arr = [12, 1, 3, 5], k = 3");
console.log("Output:", firstNegativeInWindow([12, 1, 3, 5], 3));
console.log("Expected: [0, 0]");
console.log("---");

console.log("=== Test Case 4 ===");
console.log("Input: arr = [-1, -2, -3, -4], k = 2");
console.log("Output:", firstNegativeInWindow([-1, -2, -3, -4], 2));
console.log("Expected: [-1, -2, -3]");
console.log("---");

console.log("=== Test Case 5 ===");
console.log("Input: arr = [1, 2, 3, 4, 5], k = 3");
console.log("Output:", firstNegativeInWindow([1, 2, 3, 4, 5], 3));
console.log("Expected: [0, 0]");
console.log("---");

console.log("=== Test Case 6: Single Element ===");
console.log("Input: arr = [-5], k = 1");
console.log("Output:", firstNegativeInWindow([-5], 1));
console.log("Expected: [-5]");
console.log("---");

// Compare all implementations
function compareImplementations(arr, k) {
  console.log(`\n=== Comparing Implementations for arr=[${arr}], k=${k} ===`);

  const result1 = firstNegativeInWindow(arr, k);
  const result2 = firstNegativeInWindowTwoPointers(arr, k);
  const result3 = firstNegativeInWindowOptimized(arr, k);

  console.log("Deque approach:  ", result1);
  console.log("Two pointers:    ", result2);
  console.log("Optimized deque: ", result3);
  console.log(
    "All match:",
    JSON.stringify(result1) === JSON.stringify(result2) &&
      JSON.stringify(result2) === JSON.stringify(result3)
  );
}

// Run comparisons
compareImplementations([-8, 2, 3, -6, 10], 2);
compareImplementations([12, -1, -7, 8, -15, 30, 16, 28], 3);

// Run detailed example
console.log("\n=== Detailed Step-by-Step Execution ===");
firstNegativeInWindowDetailed([-8, 2, 3, -6, 10], 2);

// Performance test for large input
console.log("\n=== Performance Test ===");
const largeArr = Array(100000)
  .fill()
  .map((_, i) => {
    // Mix of positive and negative numbers
    return i % 7 === 0
      ? -Math.floor(Math.random() * 100)
      : Math.floor(Math.random() * 100);
  });
const largeK = 1000;

console.time("Deque Approach");
const result1 = firstNegativeInWindow(largeArr, largeK);
console.timeEnd("Deque Approach");

console.time("Two Pointers Approach");
const result2 = firstNegativeInWindowTwoPointers(largeArr, largeK);
console.timeEnd("Two Pointers Approach");

console.log(
  `Results length: ${result1.length}, First 5: [${result1.slice(0, 5)}]`
);

/*
Commit Message:
Implement first negative integer in every window of size k using deque
  - Used sliding window with deque to efficiently track negative numbers
  - Deque maintains indices of negative numbers in current window
  - Front of deque always contains first negative in current window
  - Added brute force two-pointer approach for comparison
  - All solutions handle edge cases including all positives and single elements
  - Deque approach provides O(n) time complexity vs O(n*k) for brute force
  - Comprehensive test cases verify correctness and performance
*/
