/*
198. House Robber
Medium
Topics
premium lock icon
Companies
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

 

Example 1:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 2:

Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
Total amount you can rob = 2 + 9 + 1 = 12.
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 400
*/

function rob(nums) {
  const dp = new Array(nums.length).fill(-1);

  function helper(i) {
    if (i < 0) return 0;
    if (dp[i] !== -1) return dp[i];

    dp[i] = Math.max(helper(i - 1), nums[i] + helper(i - 2));
    return dp[i];
  }

  return helper(nums.length - 1);
}

function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev = 0; // dp[i - 2]
  let curr = 0; // dp[i - 1]

  for (let num of nums) {
    const temp = curr;
    curr = Math.max(curr, num + prev);
    prev = temp;
  }

  return curr;
}

function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev = nums[0]; // dp[i -2]
  let curr = Math.max(nums[0], nums[1]); // dp[i - 1]

  for (let i = 2; i < nums.length; i++) {
    const next = Math.max(curr, nums[i] + prev);
    prev = curr;
    curr = next;
  }
  return curr;
}

function rob(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(-1);
  function solve(i) {
    if (i >= n) {
      return 0;
    }

    if (dp[i] !== -1) return dp[i];

    const steal = nums[i] + solve(i + 2);
    const skip = solve(i + 1);

    dp[i] = Math.max(steal, skip);
    return dp[i];
  }

  return solve(0);
}

function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  const dp = new Array(nums.length); // dp[i] = max stolen money till ith house
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    // dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
    const steal = nums[i] + dp[i - 2];
    const skip = dp[i - 1];
    dp[i] = Math.max(skip, steal);
  }

  return dp[nums.length - 1];
}

console.log(rob([1, 2, 3, 1])); // 4
console.log(rob([2, 7, 9, 3, 1])); // 12
console.log(rob([2, 1, 1, 2])); // 4
console.log(rob([1])); // 1
console.log(rob([])); // 0
