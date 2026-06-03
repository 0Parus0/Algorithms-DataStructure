// ========================================================================
// 2.Minimum Size Subarray Sum (LeetCode 209)
// ========================================================================

/* The Problem: Given an array of positive integers nums and a positive integer target, find the minimal length of a           contiguous subarray whose sum is greater than or equal to target.
 */

function minSubArrayLen(target, nums) {
  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    // While window is valid, try to shrink it
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}
