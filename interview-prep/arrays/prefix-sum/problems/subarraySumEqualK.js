/*
560. Subarray Sum Equals K
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:

Input: nums = [1,1,1], k = 2
Output: 2
Example 2:

Input: nums = [1,2,3], k = 3
Output: 2

Constraints:

1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107
*/

function subarraySum(nums, k) {
  // Map stores prefix sum -> frequency of occurrences
  const freq = new Map();
  freq.set(0, 1); // Empty subarray has sum 0

  let count = 0;
  let currentSum = 0;

  for (let i = 0; i < nums.length; i++) {
    currentSum += nums[i];

    // If currentSum - k exists in map, we found subarray ending at i
    if (freq.has(currentSum - k)) {
      count += freq.get(currentSum - k);
    }

    // Update frequency of currentSum
    freq.set(currentSum, (freq.get(currentSum) || 0) + 1);
  }
  return count;
}
