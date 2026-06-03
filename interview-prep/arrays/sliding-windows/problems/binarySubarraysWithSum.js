/*
930. Binary Subarrays With Sum
Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.
A subarray is a contiguous part of the array.

Example 1:
Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded and underlined below:
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
Example 2:

Input: nums = [0,0,0,0,0], goal = 0
Output: 15

Constraints:
1 <= nums.length <= 3 * 104
nums[i] is either 0 or 1.
0 <= goal <= nums.length
*/
function numSubarraysWithSum(nums, goal) {
  // Helper function to count subarrays with sum <= target
  function atMost(target) {
    if (target < 0) return 0;

    let left = 0;
    let currentSum = 0;
    let count = 0;

    for (let right = 0; right < nums.length; right++) {
      currentSum += nums[right];

      // Shrink window while sum exceeds target
      while (currentSum > target) {
        currentSum -= nums[left];
        left++;
      }

      // All subarrays ending at 'right'  with sum <= target
      // are [left...right], [left+1...right], ..., [right...right]
      // That's (right - left + 1) Subarrays
      count += right - left + 1;
    }

    return count;
  }

  // Exactly(goal) = atMost(goal) - atMost(goal - 1);
  return atMost(goal) - atMost(goal - 1);
}
