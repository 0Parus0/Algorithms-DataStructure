/*
213. House Robber II
Medium
Topics
premium lock icon
Companies
Hint
You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.

 

Example 1:

Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
Example 2:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 3:

Input: nums = [1,2,3]
Output: 3
 

Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 1000
*/
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  // Case 1: Rob houses from 0 to n - 2 (exclude last house)
  const case1 = robLinear(nums, 0, nums.length - 2);

  // Case 2: Rob houses from 1 to n - 1 (exclude first house)
  const case2 = robLinear(nums, 1, nums.length - 1);

  function robLinear(nums, start, end) {
    if (start > end) return 0;
    if (start === end) return nums[start];

    let prev = 0;
    let curr = 0;

    for (let i = start; i <= end; i++) {
      const next = Math.max(curr, nums[i] + prev);
      prev = curr;
      curr = next;
    }
    return curr;
  }
  return Math.max(case1, case2);
}

function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  function robLinear(start, end) {
    const dp = new Array(end - start + 1);
    dp[0] = nums[start];
    dp[1] = Math.max(nums[start], nums[start + 1]);

    for (let i = 2; i < dp.length; i++) {
      // dp[i] = Math.max(dp[i - 1], nums[start + i] + dp[i - 2]);
      const steal = nums[start + i] + dp[i - 2];
      const skip = dp[i - 1];
      dp[i] = Math.max(skip, steal);
    }

    return dp[dp.length - 1];
  }

  return Math.max(robLinear(0, nums.length - 2), robLinear(1, nums.length - 1));
}

function rob1(nums) {
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

console.log(rob([2, 3, 2])); // 3
console.log(rob([1, 2, 3, 1])); // 4
console.log(rob([1, 2, 3])); // 3
console.log(rob([1])); // 1
console.log(rob([1, 2])); // 2
