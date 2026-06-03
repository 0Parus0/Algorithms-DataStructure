/*
53. Maximum Subarray
Given an integer array nums, find the subarray with the largest sum, and return its sum.

Example 1:
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.

Example 2:
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.

Example 3:
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.

Constraints:
1 <= nums.length <= 105
-104 <= nums[i] <= 104

Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
*/

function maxSubarray(nums) {
  if (nums.length === 0) return 0;

  let max = nums[0];
  let currSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // Either extend existing subarray or start new one
    currSum = Math.max(nums[i], currSum + nums[i]);

    // Update global max
    max = Math.max(max, currSum);
  }
  return max;
}

// ========================================================================
// 2. Track the Subarray itself
// ========================================================================

function maxSubarrayWithIndices(nums) {
  const n = nums.length;
  if (n === 0) return [];

  let max = nums[0];
  let currSum = nums[0];
  let start = 0;
  let end = 0;
  let tempStart = 0;

  for (let i = 1; i < n; i++) {
    // Check : start new subarray or extend
    if (nums[i] > currSum + nums[i]) {
      // Starting new is better
      currSum = nums[i];
      tempStart = i;
    } else {
      // Extending is better
      currSum = currSum + nums[i];
    }

    // Update max and indices
    if (currSum > max) {
      max = currSum;
      start = tempStart;
      end = i;
    }
  }
  return nums.slice(start, end + 1);
}

// Example
console.log(maxSubarrayWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// Output: [4, -1, 2, 1]
