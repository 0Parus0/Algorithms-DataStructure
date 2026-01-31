/*
377. Combination Sum IV
Medium
Topics
premium lock icon
Companies
Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.

The test cases are generated so that the answer can fit in a 32-bit integer.

 

Example 1:

Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.
Example 2:

Input: nums = [9], target = 3
Output: 0
 

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 1000
All the elements of nums are unique.
1 <= target <= 1000
 

Follow up: What if negative numbers are allowed in the given array? How does it change the problem? What limitation we need to add to the question to allow negative numbers?
*/

function combinationSum4(nums, target) {
  const n = nums.length;
  const t = Array.from({ length: 201 }, () => new Array(1001).fill(-1));

  function solve(idx, target) {
    if (target === 0) return 1;
    if (idx >= n || target < 0) return 0;

    if (t[idx][target] !== -1) return t[idx][target];

    // Take
    const takeIdx = solve(0, target - nums[idx]);
    // Not-take
    const notTakeIdx = solve(idx + 1, target);

    t[idx][target] = takeIdx + notTakeIdx;
    return t[idx][target];
  }

  return solve(0, target);
}

function combinationSum4(nums, target) {
  const n = nums.length;
  const t = Array.from({ length: 201 }, () => new Array(1001).fill(-1));

  function solve(idx, target) {
    if (target === 0) return 1;
    if (idx >= n || target < 0) return 0;

    if (t[idx][target] !== -1) return t[idx][target];

    let result = 0;
    for (let i = idx; i < n; i++) {
      const takeIdx = solve(0, target - nums[i]);
      result += takeIdx;
    }

    t[idx][target] = result;
    return t[idx][target];
  }

  return solve(0, target);
}
