/*
3397. Maximum Number of Distinct Elements After Operations
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer array nums and an integer k.

You are allowed to perform the following operation on each element of the array at most once:

Add an integer in the range [-k, k] to the element.
Return the maximum possible number of distinct elements in nums after performing the operations.

 

Example 1:

Input: nums = [1,2,2,3,3,4], k = 2

Output: 6

Explanation:

nums changes to [-1, 0, 1, 2, 3, 4] after performing operations on the first four elements.

Example 2:

Input: nums = [4,4,4,4], k = 1

Output: 3

Explanation:

By adding -1 to nums[0] and 1 to nums[1], nums changes to [3, 5, 4, 4].

 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
0 <= k <= 109
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxDistinctElements = function (nums, k) {
  nums.sort((a, b) => a - b);

  let lastValue = -Infinity;
  let distinctCount = 0;

  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    let minPossible = x - k;
    let maxPossible = x + k;

    let v = Math.max(minPossible, lastValue + 1);

    if (v <= maxPossible) {
      distinctCount++;
      lastValue = v;
    }
  }

  return distinctCount;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxDistinctElements = function (nums, k) {
  const intervals = [];

  for (const x of nums) {
    intervals.push([x - k, x + k]);
  }

  // Sort by right endpoint
  intervals.sort((a, b) => a[1] - b[1]);

  let used = new Set(); // track assigned values
  let current = -1e18;
  let count = 0;

  for (const [l, r] of intervals) {
    // move current into range
    if (current < l) {
      current = l;
    }

    // if we can assign a new unique value
    if (!used.has(current) && current <= r) {
      used.add(current);
      count++;
      current++;
    }
  }

  return count;
};

var maxDistinctElements = function (nums, k) {
  if (nums.length === 0) return 0;
  nums.sort((a, b) => a - b);
  let count = 0;
  let prev = -2147483648 >> 1;
  for (let a of nums) {
    let low = a - k;
    let high = a + k;
    let x = prev + 1;
    if (x < low) x = low;
    if (x <= high) {
      count++;
      prev = x;
    }
  }
  return count;
};
