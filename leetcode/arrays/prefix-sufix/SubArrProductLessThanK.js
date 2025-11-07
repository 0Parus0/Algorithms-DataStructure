/*
Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.

 

Example 1:

Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
Example 2:

Input: nums = [1,2,3], k = 0
Output: 0
 

Constraints:

1 <= nums.length <= 3 * 104
1 <= nums[i] <= 1000
0 <= k <= 106
*/

function subArrProductLessThankBF(arr, k) {
  let count = 0;
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    let product = 1;
    for (let j = i; j < n; j++) {
      product *= arr[j];
      if (product < k) count++;
      else break;
    }
  }
  return count;
}

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */

/*
#Plan:
1. Problem Understanding:
   - Count all contiguous subarrays where product of elements < k
   - Array contains positive integers (based on division operation)
   - k > 1 (as per your check)

2. Sliding Window Approach:
   - Maintain a window [start, end] where product < k
   - Expand window by moving end pointer
   - Shrink window from left if product >= k
   - Count subarrays ending at current end position

3. Why It Works:
   - For window [start, end], all subarrays ending at end are valid
   - Number of such subarrays = end - start + 1
   - This counts: [end], [end-1, end], ..., [start, end]

4. Algorithm Steps:
   a. Handle edge case: k <= 1 → return 0 (since positive integers product >= 1)
   b. Initialize start = 0, product = 1, count = 0
   c. For each end from 0 to n-1:
        - Multiply product by arr[end]
        - While product >= k and start <= end: divide by arr[start] and start++
        - Add (end - start + 1) to count

5. Complexity:
   - Time: O(n) - each element visited at most twice
   - Space: O(1) - only a few variables
*/

function subarrayProductLessThanK(arr, k) {
  if (k <= 1) return 0;

  let n = arr.length;
  let count = 0;
  let product = 1;
  let start = 0;

  for (let end = 0; end < n; end++) {
    product *= arr[end];

    while (product >= k && start <= end) {
      product /= arr[start];
      start++;
    }

    count += end - start + 1;
  }

  return count;
}

// Alternative implementation with detailed comments and logging
function subarrayProductLessThanKDetailed(arr, k) {
  if (k <= 1) {
    console.log(`k=${k} <= 1, returning 0`);
    return 0;
  }

  let n = arr.length;
  let count = 0;
  let product = 1;
  let start = 0;

  console.log(`Input: arr = [${arr}], k = ${k}`);
  console.log("Processing subarrays:\n");

  for (let end = 0; end < n; end++) {
    console.log(`\nStep ${end}: Processing element arr[${end}] = ${arr[end]}`);
    console.log(`Current window: [${start}, ${end}], product = ${product}`);

    // Multiply current element to product
    product *= arr[end];
    console.log(`After multiplying ${arr[end]}: product = ${product}`);

    // Shrink window from left if product >= k
    while (product >= k && start <= end) {
      console.log(`Product ${product} >= ${k}, shrinking window from left`);
      product /= arr[start];
      start++;
      console.log(
        `Divided by arr[${start - 1}]=${
          arr[start - 1]
        }, new product = ${product}, start = ${start}`
      );
    }

    // Count all subarrays ending at current position
    const subarraysCount = end - start + 1;
    console.log(`Valid subarrays ending at position ${end}: ${subarraysCount}`);
    console.log(
      `These are: ${Array.from(
        { length: subarraysCount },
        (_, i) => `[${end - i}, ${end}]`
      ).reverse()}`
    );

    count += subarraysCount;
    console.log(`Total count so far: ${count}`);
  }

  console.log(`\nFinal count: ${count}`);
  return count;
}

// Brute force approach for verification (O(n²))
function subarrayProductLessThanKBruteForce(arr, k) {
  let count = 0;
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    let product = 1;
    for (let j = i; j < n; j++) {
      product *= arr[j];
      if (product < k) {
        count++;
      } else {
        break; // Since array has positive numbers, product will only increase
      }
    }
  }

  return count;
}

// Handle arrays with 1s and 0s (if needed)
function subarrayProductLessThanKWithZeros(arr, k) {
  if (k <= 1) return 0;

  let count = 0;
  let product = 1;
  let start = 0;

  for (let end = 0; end < arr.length; end++) {
    if (arr[end] === 0) {
      // Reset when encountering 0
      product = 1;
      start = end + 1;
      continue;
    }

    product *= arr[end];

    while (product >= k && start <= end) {
      product /= arr[start];
      start++;
    }

    count += end - start + 1;
  }

  return count;
}

// Custom Test Cases
console.log("=== Test Case 1 ===");
console.log("Input: arr = [10, 5, 2, 6], k = 100");
console.log("Output:", subarrayProductLessThanK([10, 5, 2, 6], 100));
console.log("Expected: 8");
console.log(
  "Brute force:",
  subarrayProductLessThanKBruteForce([10, 5, 2, 6], 100)
);
console.log("---");

console.log("=== Test Case 2 ===");
console.log("Input: arr = [1, 2, 3], k = 0");
console.log("Output:", subarrayProductLessThanK([1, 2, 3], 0));
console.log("Expected: 0 (k <= 1)");
console.log("---");

console.log("=== Test Case 3 ===");
console.log("Input: arr = [1, 1, 1], k = 2");
console.log("Output:", subarrayProductLessThanK([1, 1, 1], 2));
console.log("Expected: 6");
console.log("Brute force:", subarrayProductLessThanKBruteForce([1, 1, 1], 2));
console.log("---");

console.log("=== Test Case 4 ===");
console.log("Input: arr = [5, 2, 3, 4], k = 50");
console.log("Output:", subarrayProductLessThanK([5, 2, 3, 4], 50));
console.log("Expected: 9");
console.log(
  "Brute force:",
  subarrayProductLessThanKBruteForce([5, 2, 3, 4], 50)
);
console.log("---");

console.log("=== Test Case 5: Single Element ===");
console.log("Input: arr = [5], k = 10");
console.log("Output:", subarrayProductLessThanK([5], 10));
console.log("Expected: 1");
console.log("---");

console.log("=== Test Case 6: All elements > k ===");
console.log("Input: arr = [10, 20, 30], k = 5");
console.log("Output:", subarrayProductLessThanK([10, 20, 30], 5));
console.log("Expected: 0");
console.log("---");

// Compare all implementations
function compareImplementations(arr, k) {
  console.log(`\n=== Comparing Implementations for arr=[${arr}], k=${k} ===`);

  const result1 = subarrayProductLessThanK(arr, k);
  const result2 = subarrayProductLessThanKBruteForce(arr, k);

  console.log("Sliding Window:", result1);
  console.log("Brute Force:   ", result2);
  console.log("Results match:", result1 === result2);
}

// Run comparisons
compareImplementations([10, 5, 2, 6], 100);
compareImplementations([1, 2, 3, 4, 5], 10);

// Run detailed example
console.log("\n=== Detailed Step-by-Step Execution ===");
subarrayProductLessThanKDetailed([10, 5, 2, 6], 100);

// Performance test
console.log("\n=== Performance Test ===");
const largeArr = Array(10000)
  .fill(1)
  .map((_, i) => (i % 10) + 1);
const largeK = 1000;

console.time("Sliding Window");
const slidingResult = subarrayProductLessThanK(largeArr, largeK);
console.timeEnd("Sliding Window");

console.time("Brute Force");
const bruteResult = subarrayProductLessThanKBruteForce(largeArr, largeK);
console.timeEnd("Brute Force");

console.log(
  `Results: Sliding=${slidingResult}, Brute=${bruteResult}, Match=${
    slidingResult === bruteResult
  }`
);

/*
Commit Message:
Implement count of subarrays with product less than K using sliding window
  - Used sliding window approach to efficiently count valid subarrays in O(n) time
  - Maintain window where product < k, shrink from left when product >= k
  - Count = sum of (end - start + 1) for each end position
  - Added brute force implementation for verification
  - Handles edge cases including k <= 1 and single element arrays
  - All subarrays ending at current position are counted when window is valid
  - Comprehensive test cases verify correctness and performance
*/

console.log(subArrProductLessThanK([10, 5, 2, 6], 100));
