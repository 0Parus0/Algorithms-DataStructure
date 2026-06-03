/*
Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears at most twice, return an array of all the integers that appears twice.
You must write an algorithm that runs in O(n) time and uses only constant auxiliary space, excluding the space needed to store the output

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]

Example 2:
Input: nums = [1,1,2]
Output: [1]

Example 3:
Input: nums = [1]
Output: []

Constraints:
n == nums.length
1 <= n <= 105
1 <= nums[i] <= n
Each element in nums appears once or twice.
*/

function findDuplicates(nums) {
  const n = nums.length;
  let i = 0;
  const result = [];

  // Step 1: Cyclic sort
  while (i < n) {
    let correctIdx = nums[i] - 1;
    if (nums[i] !== nums[correctIdx]) {
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
    } else {
      i++;
    }
  }

  // Step 2: Find duplicate
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) result.push(nums[i]);
  }
  return result;
}

// ========================================================================
//                        Second Technique
// ========================================================================

function findDuplicates(nums) {
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Get the index this number points to
    const index = Math.abs(nums[i]) - 1;

    // If the number at this index is already negative, we've seen it before
    if (nums[index] < 0) {
      result.push(Math.abs(nums[i]));
    } else {
      // Mark this number as seen by making it negative
      nums[index] = -nums[index];
    }
  }

  /**     Optional: Restore the array (good practice) */
  for (let i = 0; i < nums.length; i++) {
    nums[i] = Math.abs(nums[i]);
  }

  return result;
}

console.log(findDuplicates([1, 3, 2, 8, 8, 2, 3, 1]));
