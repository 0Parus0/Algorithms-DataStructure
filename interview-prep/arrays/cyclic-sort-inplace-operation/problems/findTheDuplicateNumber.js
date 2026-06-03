/*
287. Find the Duplicate Number
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.
There is only one repeated number in nums, return this repeated number.
You must solve the problem without modifying the array nums and using only constant extra space.

Example 1:
Input: nums = [1,3,4,2,2]
Output: 2

Example 2:
Input: nums = [3,1,3,4,2]
Output: 3

Example 3:
Input: nums = [3,3,3,3,3]
Output: 3

Constraints:
1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.

Follow up:
How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?
*/

function findDuplicate(nums) {
  /**
   * @param {number[]} nums
   * @return {number}
   */
  var findDuplicate = function (nums) {
    let slow = nums[0];
    let fast = nums[0];

    // We will move the slow one step and fast two steps then start the loop otherwise both will be same and the loop will be skipped
    slow = nums[slow];
    fast = nums[nums[fast]];

    // Detect cycle
    while (slow !== fast) {
      slow = nums[slow];
      fast = nums[nums[fast]];
    }

    slow = nums[0];
    // find the duplicate where both fast and slow will meet (where the cycle starts)
    while (slow !== fast) {
      slow = nums[slow];
      fast = nums[fast];
    }

    return fast; // slow
  };
}

/**
 * @param {number[]} nums
 * @return {number}
 */
function findDuplicate(nums) {
  // Phase 1: Find the intersection point of the two runners
  let tortoise = nums[0];
  let hare = nums[0];

  do {
    tortoise = nums[tortoise];
    hare = nums[nums[hare]];
  } while (tortoise !== hare);

  // Phase 2: Find the entrance to the cycle
  tortoise = nums[0];
  while (tortoise !== hare) {
    tortoise = nums[tortoise];
    hare = nums[hare];
  }

  return hare;
}
