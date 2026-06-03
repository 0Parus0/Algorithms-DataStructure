/*
2366. Minimum Replacements to Sort the Array
Hard
You are given a 0-indexed integer array nums. In one operation you can replace any element of the array with any two elements that sum to it.

For example, consider nums = [5,6,7]. In one operation, we can replace nums[1] with 2 and 4 and convert nums to [5,2,4,7].
Return the minimum number of operations to make an array that is sorted in non-decreasing order.

Example 1:
Input: nums = [3,9,3]
Output: 2
Explanation: Here are the steps to sort the array in non-decreasing order:
- From [3,9,3], replace the 9 with 3 and 6 so the array becomes [3,3,6,3]
- From [3,3,6,3], replace the 6 with 3 and 3 so the array becomes [3,3,3,3,3]
There are 2 steps to sort the array in non-decreasing order. Therefore, we return 2.

Example 2:
Input: nums = [1,2,3,4,5]
Output: 0
Explanation: The array is already in non-decreasing order. Therefore, we return 0. 

Constraints:
1 <= nums.length <= 105
1 <= nums[i] <= 109
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumReplacement = function (nums) {
  const n = nums.length;
  let operations = 0;
  let maxAllowed = nums[n - 1];

  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] <= maxAllowed) {
      maxAllowed = nums[i];
    } else {
      const parts = Math.ceil(nums[i] / maxAllowed);
      operations += parts - 1;
      maxAllowed = Math.floor(nums[i] / parts);
    }
  }

  return operations;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumReplacement = function (nums) {
  const n = nums.length;
  let operations = 0;
  let maxAllowed = nums[n - 1]; // Start from the last element

  // Work backwards from second-last element to first
  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] <= maxAllowed) {
      // Current number is already ≤ allowed, no split needed
      maxAllowed = nums[i];
    } else {
      // Need to split nums[i] into parts where each part ≤ maxAllowed
      // Number of parts needed = ceil(nums[i] / maxAllowed)
      const parts = Math.ceil(nums[i] / maxAllowed);
      operations += parts - 1; // Each split creates (parts - 1) new elements

      // After splitting, the smallest part will be floor(nums[i] / parts)
      // This becomes the new max allowed for the previous elements
      maxAllowed = Math.floor(nums[i] / parts);
    }
  }

  return operations;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumReplacement = function (nums) {
  let n = nums.length;
  let last = nums[n - 1];
  let res = 0;

  for (let i = n - 2; i >= 0; i--) {
    if (nums[i] > last) {
      let t = Math.floor(nums[i] / last);
      if (nums[i] % last !== 0) t++;

      last = Math.floor(nums[i] / t);
      res += t - 1;
    } else last = nums[i];
  }

  return res;
};
