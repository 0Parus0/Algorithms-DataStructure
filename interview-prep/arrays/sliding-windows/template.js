/**
* Example Walkthrough: LeetCode 209 (Minimum Size Subarray Sum)
  * Problem: Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray whose sum is greater than or equal to target. If none, return 0.

* Recognition: "Contiguous subarray" and "minimum length" are key. This suggests a dynamic sliding window.

* Type: Dynamic-size window. The size changes as we try to find the smallest valid window.

* Data Structure: Just a sum variable to track the total of the current window.

* Algorithm:

  * Initialize left = 0, minLen = Infinity, sum = 0.
  * Iterate right from 0 to the end of the array.
  * Add nums[right] to sum.
  * While sum >= target:
  * Update minLen with the current window size (right - left + 1).
  * Shrink the window from the left: subtract nums[left] from sum and increment left.
  * After the loop, if minLen is still Infinity, return 0; otherwise, return minLen.

*/
function minSubArrayLen(nums, target) {
  let left = 0;
  let sum = 0;
  let minLen = Infinity;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    // While the window is valid (sum >= target), try to shrink it
    while (sum >= target) {
      // Update the minimum length;
      minLen = Math.min(minLen, right - left + 1);
      // Shrink from the left
      sum -= nums[left];
      left++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
}
