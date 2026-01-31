/*
300. Longest Increasing Subsequence
Medium
Topics
premium lock icon
Companies
Given an integer array nums, return the length of the longest strictly increasing subsequence.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
*/

function lengthOfLIS(nums) {
  const n = nums.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(-1));

  function solve(i, p) {
    if (i >= n) return 0;

    if (p !== -1 && dp[i][p] !== -1) return dp[i][p];

    let take = 0;
    if (p === -1 || nums[i] > nums[p]) {
      take = 1 + solve(i + 1, i);
    }

    let skip = solve(i + 1, p);

    if (p !== -1) dp[i][p] = Math.max(take, skip);
    return Math.max(take, skip);
  }
  return solve(0, -1);
}

/**
 * @param {number[]} nums
 * @return {number}
 *
 * dp[i][p + 1] Here we are using p + 1 because p starts at -1
 */
var lengthOfLIS1 = function (nums) {
  const n = nums.length;

  // dp[i][prevIndex+1] -> stores LIS length from i onward with prevIndex
  const dp = Array.from({ length: n }, () => Array(n + 1).fill(-1));

  function f(i, prevIndex) {
    if (i === n) return 0; // base case

    if (dp[i][prevIndex + 1] !== -1) return dp[i][prevIndex + 1];

    // Option 1: skip current
    let notTake = f(i + 1, prevIndex);
    let take = 0;

    // Option 2: take current if valid
    if (prevIndex === -1 || nums[i] > nums[prevIndex]) {
      take = 1 + f(i + 1, i);
    }

    return (dp[i][prevIndex + 1] = Math.max(take, notTake));
  }

  return f(0, -1);
};

/* Where dp[p + 1][i] */

function lengthOfLIS1(nums) {
  const n = nums.length;

  // dp[p + 1][i] = LIS length starting from index i, with last picked index = p
  const dp = Array.from({ length: n + 1 }, () => Array(n).fill(-1));

  function dfs(p, i) {
    // Base case: reached end
    if (i === n) return 0;

    // Already computed
    if (dp[p + 1][i] !== -1) return dp[p + 1][i];

    // Option 1: skip current element
    const skip = dfs(p, i + 1);

    // Options 2: take current element (only if valid increasing)
    let take = 0;
    if (p === -1 || nums[i] > nums[p]) {
      take = 1 + dfs(i, i + 1);
    }

    // Store and return the best of both choices
    dp[p + 1][i] = Math.max(take, skip);
    return dp[p + 1][i];
  }

  return dfs(-1, 0);
}
console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); // 4
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])); // 1
console.log(lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6])); // 6
console.log(lengthOfLIS([4, 10, 4, 3, 8, 9])); // 3
