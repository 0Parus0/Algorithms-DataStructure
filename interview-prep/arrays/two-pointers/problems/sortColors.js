// ========================================================================
// 2. Sort Colors LeetCode 75
// ========================================================================
/*
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.
We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

Example 1:
Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]

Example 2:
Input: nums = [2,0,1]
Output: [0,1,2]

Constraints:

n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.

Follow up: Could you come up with a one-pass algorithm using only constant extra space?
*/
function sortColors(nums) {
  let n = nums.length;
  let low = 0;
  let mid = 0;
  let high = n - 1;

  while (mid <= high) {
    // From 0 -> low - 1 should be all 0s
    if (nums[mid] === 0) {
      [nums[mid], nums[low]] = [nums[low], nums[mid]];
      mid++;
      low++;
    } else if (nums[mid] === 1) {
      // From low -> mid - 1 should be all 1s
      mid++;
    } else {
      // From high + 1 -> n - 1 should be all 2s
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }

  return nums;
}
