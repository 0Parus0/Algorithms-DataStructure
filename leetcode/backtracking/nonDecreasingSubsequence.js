/*
491. Non-decreasing Subsequences
Medium
Topics
premium lock icon
Companies
Given an integer array nums, return all the different possible non-decreasing subsequences of the given array with at least two elements. You may return the answer in any order.

 

Example 1:

Input: nums = [4,6,7,7]
Output: [[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]
Example 2:

Input: nums = [4,4,3,2,1]
Output: [[4,4]]
 

Constraints:

1 <= nums.length <= 15
-100 <= nums[i] <= 100
*/
function findSubsequences(nums) {
  const n = nums.length;
  const result = [];
  const curr = [];

  function backtrack(idx, curr) {
    if (curr.length >= 2) result.push([...curr]);

    const set = new Set();
    for (let i = idx; i < n; i++) {
      if (
        (curr.length === 0 || nums[i] >= curr[curr.length - 1]) &&
        !set.has(nums[i])
      ) {
        curr.push(nums[i]);
        backtrack(i + 1, curr);
        curr.pop();
        set.add(nums[i]);
      }
    }
  }

  backtrack(0, curr);
  return result;
}
