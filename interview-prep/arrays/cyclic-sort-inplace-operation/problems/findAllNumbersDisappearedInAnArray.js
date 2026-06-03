/*
448. Find All Numbers Disappeared in an Array
Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]

Example 2:
Input: nums = [1,1]
Output: [2]

Constraints:
n == nums.length
1 <= n <= 105
1 <= nums[i] <= n

Follow up: Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.
*/

function findDisappearedNumbers(nums) {
  const n = nums.length;
  let i = 0;

  // Phase 1: Cyclic Sort
  while (i < n) {
    const correctIdx = nums[i] - 1; // For value x, correct index is x - 1

    // If current number is not in its correct position and
    // the target position doesn't already have the correct number
    if (nums[i] !== nums[correctIdx]) {
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
    } else {
      i++;
    }
  }

  // Phase 2: Find all missing numbers
  const missing = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      missing.push(i + 1);
    }
  }
  return missing;
}
