/*
Problem: Find Two Numbers that Add Up to a Target (Unique Pairs)
Given an array of sorted integers nums, and a target integer target, return all unique pairs [nums[i], nums[j]] where i != j and nums[i] + nums[j] == target. The solution must not contain duplicate pairs.

You should solve this in O(n) time complexity using the two-pointer technique.

Example:
text
Copy code
Input: nums = [1, 2, 3, 4, 4, 5, 6, 7], target = 8
Output: [[1, 7], [2, 6], [3, 5], [4, 4]]

Input: nums = [1, 1, 2, 3, 3, 4], target = 6
Output: [[2, 4], [3, 3]]

Input: nums = [-1, 0, 1, 2], target = 1
Output: [[-1, 2], [0, 1]]
Constraints:
Solve this using two pointers with a time complexity of O(n).
The pairs should be unique (no duplicate pairs).
*/

function pairSum(nums, target) {
  let n = nums.length;
  let result = [];
  let left = 0;
  let right = n - 1;
  while (left < right) {
    let sum = nums[left] + nums[right];

    if (sum === target) {
      result.push([nums[left], nums[right]]);

      // Move both pointers and skip duplicates;
      while (left < right && nums[left] === nums[left + 1]) left++;
      while (left < right && nums[right] === nums[right - 1]) right--;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return result;
}


// console.log(pairSum([1, 2, 3, 4, 4, 5, 6, 7], 8));