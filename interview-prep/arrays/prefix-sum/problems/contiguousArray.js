/*
525. Contiguous Array
Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

Example 1:

Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
Example 2:

Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
Example 3:

Input: nums = [0,1,1,1,1,1,0,0,0]
Output: 6
Explanation: [1,1,1,0,0,0] is the longest contiguous subarray with equal number of 0 and 1.
 
Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
*/

function findMaxLength(nums) {
  // Treat 0 as -1 to transform problem to "find longest subarray with sum 0"
  const firstOccurrence = new Map();
  firstOccurrence.set(0, -1); // Sum 0 before index 0

  let maxLength = 0;
  let currentSum = 0;

  for (let i = 0; i < nums.length; i++) {
    // Transform add 1 for 1, subtract 1 for 0
    currentSum += nums[i] === 1 ? 1 : -1;

    if (firstOccurrence.has(currentSum)) {
      // If we have seen this sum before, subarray between then and now has sum 0
      const firstIndex = firstOccurrence.get(currentSum);
      maxLength = Math.max(maxLength, i - firstIndex);
    } else {
      // Store first occurrence of each sum
      firstOccurrence.set(currentSum, i);
    }
  }
  return maxLength;
}
