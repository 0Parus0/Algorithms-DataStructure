/*
Maximum of minimum of every window size in a given array
Last Updated : 26 Aug, 2025

Given an integer array arr[], find the maximum of minimums for every window size from 1 to arr.size(). That is, for each window size k (1 ≤ k ≤ arr.size()), consider all contiguous subarrays of size k and determine the minimum element in each subarray. Among these minimums, return the maximum value for that window size.

Example:

    Input: arr[] = [10, 20, 30]
    Output: [30, 20, 10]
    Explanation:

        Window size 1: Minimums are [10, 20, 30], maximum is 30.
        Window size 2: Minimums are [10, 20], maximum is 20.
        Window size 3: Minimum is [10], maximum is 10.

    Input: arr[] = [10, 20, 30, 50, 10, 70, 30]
    Output: [70, 30, 20, 10, 10, 10, 10]
    Explanation:

        Window size 1: Minimums are [10, 20, 30, 50, 10, 70, 30], maximum is 70.
        Window size 2: Minimums are [10, 20, 30, 10, 10, 30], maximum is 30.
        Window size 3: Minimums are [10, 20, 10, 10, 10], maximum is 20.
        Window size 4–7: Minimums are [10, 10, 10, 10], maximum is 10.
*/

/*
🧠 Step-by-Step Thought Process

Goal recap:
For each window size (1 to n), we want the maximum of minimums.

Key idea:
When an element is popped from the stack, we can determine:

the index range where it is the minimum,

thus the window size in which it is the smallest.

Stack invariant:
The stack maintains increasing order of elements — each element waits until a smaller one appears on the right.

Window size calculation:
When popping index top:

Right boundary → current index i (smaller element found)

Left boundary → next element in stack (after pop)

So, window length = i - stackTopAfterPop - 1

At each pop:

We compute the window size where arr[top] is the minimum.

We update res[len] = max(res[len], arr[top]).

After loop:

We propagate values backward so smaller windows inherit larger ones.

✅ JavaScript Implementation (Single Stack + Explanations)
*/

function maxOfMin(arr) {
  const n = arr.length;
  const res = new Array(n + 1).fill(0); // res[k] = max of min for window size k
  const stack = [];

  for (let i = 0; i <= n; i++) {
    // Use 0 when we've reached the end (acts as sentinel smaller element)
    const current = i === n ? 0 : arr[i];

    // While current element breaks increasing order → process popped ones
    while (stack.length && arr[stack.at(-1)] >= current) {
      const top = stack.pop();

      // If stack empty, left boundary is -1 (means from start)
      const leftBoundary = stack.length ? stack.at(-1) : -1;

      // Window length where arr[top] is the minimum
      const len = i - leftBoundary - 1;

      // For this window size, arr[top] could be the minimum
      res[len] = Math.max(res[len], arr[top]);
    }

    stack.push(i);
  }

  // Fill remaining empty entries:
  // if for some size k, no min was directly set, it inherits the max from k+1
  for (let i = n - 1; i >= 1; i--) {
    res[i] = Math.max(res[i], res[i + 1]);
  }

  // Ignore index 0 (not used)
  return res.slice(1);
}

/**
 * @param {number[]} arr
 * @return {number[]}
 */

/*
#Plan:
1. Problem Understanding:
   - For each window size k (1 to n), find maximum of minimums of all contiguous subarrays of size k
   - Brute force would be O(n^3) - too slow for large arrays
   - Need an efficient O(n) solution using stack and range calculation

2. Key Insight:
   - For each element arr[i], it is the minimum in some range [left[i]+1, right[i]-1]
   - The length of this range is: len = right[i] - left[i] - 1
   - For all window sizes <= len, arr[i] is a candidate for the answer
   - We can use monotonic stack to find left and right boundaries for each element

3. Approach:
   a. Find previous smaller element (PSE) and next smaller element (NSE) for each element
   b. For each element arr[i], it is minimum in window of size: right[i] - left[i] - 1
   c. Initialize answer array, then fill it using the range information
   d. Handle remaining values using suffix maximum

4. Algorithm Steps:
   1. Calculate left boundaries using monotonic stack
   2. Calculate right boundaries using monotonic stack  
   3. For each element, determine maximum window size where it's minimum
   4. Fill answer array and handle gaps using suffix maximum

5. Complexity:
   - Time: O(n) - each element pushed and popped from stack once
   - Space: O(n) - for left, right, stack, and answer arrays
*/

function maxOfMinForEveryWindowSize(arr) {
  const n = arr.length;
  if (n === 0) return [];

  // Arrays to store previous and next smaller elements
  const left = new Array(n).fill(-1); // index of previous smaller element
  const right = new Array(n).fill(n); // index of next smaller element
  const stack = [];

  // Step 1: Find previous smaller elements
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    left[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
    stack.push(i);
  }

  // Clear stack for next pass
  stack.length = 0;

  // Step 2: Find next smaller elements
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    right[i] = stack.length > 0 ? stack[stack.length - 1] : n;
    stack.push(i);
  }

  // Step 3: Initialize answer array
  const answer = new Array(n + 1).fill(0);

  // Step 4: For each element, it's the minimum for window size = len
  for (let i = 0; i < n; i++) {
    const len = right[i] - left[i] - 1;
    // arr[i] is candidate for answer[len]
    answer[len] = Math.max(answer[len], arr[i]);
  }

  // Step 5: Fill remaining positions using suffix maximum
  // Some window sizes might not have direct candidates
  for (let i = n - 1; i >= 1; i--) {
    answer[i] = Math.max(answer[i], answer[i + 1]);
  }

  // Return for window sizes 1 to n
  return answer.slice(1);
}

// Alternative implementation with detailed comments and logging
function maxOfMinForEveryWindowSizeDetailed(arr) {
  const n = arr.length;
  console.log(`Input array: [${arr}]`);
  console.log(`Array length: ${n}`);

  if (n === 0) return [];

  const left = new Array(n).fill(-1);
  const right = new Array(n).fill(n);
  const stack = [];

  console.log("\nStep 1: Finding left boundaries (previous smaller elements)");
  for (let i = 0; i < n; i++) {
    console.log(`  Processing index ${i}, value ${arr[i]}`);
    console.log(`  Stack before: [${stack}]`);

    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      const popped = stack.pop();
      console.log(
        `    Popped index ${popped} (value ${arr[popped]}) because ${arr[popped]} >= ${arr[i]}`
      );
    }

    left[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
    console.log(`  Left boundary for index ${i}: ${left[i]}`);

    stack.push(i);
    console.log(`  Stack after: [${stack}]`);
  }

  stack.length = 0;
  console.log("\nStep 2: Finding right boundaries (next smaller elements)");

  for (let i = n - 1; i >= 0; i--) {
    console.log(`  Processing index ${i}, value ${arr[i]}`);
    console.log(`  Stack before: [${stack}]`);

    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      const popped = stack.pop();
      console.log(
        `    Popped index ${popped} (value ${arr[popped]}) because ${arr[popped]} >= ${arr[i]}`
      );
    }

    right[i] = stack.length > 0 ? stack[stack.length - 1] : n;
    console.log(`  Right boundary for index ${i}: ${right[i]}`);

    stack.push(i);
    console.log(`  Stack after: [${stack}]`);
  }

  console.log(
    "\nStep 3: Calculating window sizes where each element is minimum"
  );
  const answer = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    const len = right[i] - left[i] - 1;
    console.log(`  Element ${arr[i]} at index ${i}:`);
    console.log(`    Left boundary: ${left[i]}, Right boundary: ${right[i]}`);
    console.log(`    Window size: ${len}`);
    console.log(
      `    Current answer[${len}]: ${answer[len]}, New candidate: ${arr[i]}`
    );

    answer[len] = Math.max(answer[len], arr[i]);
    console.log(`    Updated answer[${len}]: ${answer[len]}`);
  }

  console.log("\nStep 4: Filling gaps using suffix maximum");
  console.log(`Answer before filling: [${answer.slice(1)}]`);

  for (let i = n - 1; i >= 1; i--) {
    answer[i] = Math.max(answer[i], answer[i + 1]);
    console.log(
      `  answer[${i}] = max(${answer[i]}, ${answer[i + 1]}) = ${answer[i]}`
    );
  }

  const result = answer.slice(1);
  console.log(`\nFinal result: [${result}]`);
  return result;
}

// Optimized version without logging
function maxOfMinForEveryWindowSizeOptimized(arr) {
  const n = arr.length;
  if (n === 0) return [];

  const left = new Array(n).fill(-1);
  const right = new Array(n).fill(n);
  const stack = [];

  // Find left boundaries
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    left[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
    stack.push(i);
  }

  stack.length = 0;

  // Find right boundaries
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    right[i] = stack.length > 0 ? stack[stack.length - 1] : n;
    stack.push(i);
  }

  const answer = new Array(n + 1).fill(0);

  // Fill answer array
  for (let i = 0; i < n; i++) {
    const len = right[i] - left[i] - 1;
    answer[len] = Math.max(answer[len], arr[i]);
  }

  // Fill gaps
  for (let i = n - 1; i >= 1; i--) {
    answer[i] = Math.max(answer[i], answer[i + 1]);
  }

  return answer.slice(1);
}

// Custom Test Cases
console.log("=== Test Case 1 ===");
console.log("Input: [10, 20, 30]");
console.log("Output:", maxOfMinForEveryWindowSize([10, 20, 30]));
console.log("Expected: [30, 20, 10]");
console.log("---");

console.log("=== Test Case 2 ===");
console.log("Input: [10, 20, 30, 50, 10, 70, 30]");
console.log(
  "Output:",
  maxOfMinForEveryWindowSize([10, 20, 30, 50, 10, 70, 30])
);
console.log("Expected: [70, 30, 20, 10, 10, 10, 10]");
console.log("---");

console.log("=== Test Case 3 ===");
console.log("Input: [1, 2, 3, 4, 5]");
console.log("Output:", maxOfMinForEveryWindowSize([1, 2, 3, 4, 5]));
console.log("Expected: [5, 4, 3, 2, 1]");
console.log("---");

console.log("=== Test Case 4 ===");
console.log("Input: [5, 4, 3, 2, 1]");
console.log("Output:", maxOfMinForEveryWindowSize([5, 4, 3, 2, 1]));
console.log("Expected: [5, 4, 3, 2, 1]");
console.log("---");

console.log("=== Test Case 5: Single Element ===");
console.log("Input: [5]");
console.log("Output:", maxOfMinForEveryWindowSize([5]));
console.log("Expected: [5]");
console.log("---");

console.log("=== Test Case 6: Empty Array ===");
console.log("Input: []");
console.log("Output:", maxOfMinForEveryWindowSize([]));
console.log("Expected: []");
console.log("---");

console.log("=== Test Case 7: All Same Elements ===");
console.log("Input: [3, 3, 3, 3]");
console.log("Output:", maxOfMinForEveryWindowSize([3, 3, 3, 3]));
console.log("Expected: [3, 3, 3, 3]");
console.log("---");

// Run detailed example
console.log("=== Detailed Step-by-Step for [10, 20, 30, 50, 10, 70, 30] ===");
maxOfMinForEveryWindowSizeDetailed([10, 20, 30, 50, 10, 70, 30]);

/*
Commit Message:
Implement maximum of minimums for every window size using stack-based approach
  - Used monotonic stack to find left and right boundaries for each element
  - For each element arr[i], calculated window size where it's the minimum
  - Filled answer array using range information and suffix maximum
  - Added detailed logging version for educational purposes
  - All solutions handle edge cases including empty arrays and single elements
  - Time complexity: O(n), Space complexity: O(n)
  - Comprehensive test cases verify correctness for various input patterns
*/
