/*
416. Partition Equal Subset Sum
Medium
Topics
premium lock icon
Companies
Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.

 

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 

Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100
*/

// ========================================================================
// 1. Recursion + Memoization (left to right )
// ========================================================================

function canPartition(nums) {
  const totalSum = nums.reduce((a, b) => a + b, 0);

  // If total sum is odd, can't partition equally
  if (totalSum % 2 !== 0) return false;

  const target = totalSum / 2;
  const n = nums.length;

  // Memoization table: memo[index][remainingSum]
  const memo = Array(n)
    .fill()
    .map(() => Array(target + 1).fill(-1));

  function solve(index, remainingSum) {
    // Base cases
    if (remainingSum === 0) return true;
    if (index >= n || remainingSum < 0) return false;

    // Check memo
    if (memo[index][remainingSum] !== -1) {
      return memo[index][remainingSum] === 1;
    }

    // Option 1: Skip current element
    let skip = solve(index + 1, remainingSum);

    // Option 2: Take current element if it fits
    let take = false;
    if (nums[index] <= remainingSum) {
      take = solve(index + 1, remainingSum - nums[index]);
    }

    const result = skip || take;
    memo[index][remainingSum] = result ? 1 : 0;
    return result;
  }

  return solve(0, target);
}

// ========================================================================
// 2. Recursion + Memoization (right to left)
// ========================================================================

function canPartitionRTL(nums) {
  const totalSum = nums.reduce((a, b) => a + b, 0);
  if (totalSum % 2 !== 0) return false;

  const target = totalSum / 2;
  const n = nums.length;
  const memo = Array(n)
    .fill()
    .map(() => Array(target + 1).fill(-1));

  function solve(index, remainingSum) {
    if (remainingSum === 0) return true;
    if (index < 0 || remainingSum < 0) return false;
    if (memo[index][remainingSum] !== -1) {
      return memo[index][remainingSum] === 1;
    }

    const result =
      solve(index - 1, remainingSum) ||
      (nums[index] <= remainingSum &&
        solve(index - 1, remainingSum - nums[index]));

    memo[index][remainingSum] = result ? 1 : 0;
    return result;
  }

  return solve(n - 1, target);
}

// ========================================================================
// 3. Bottom-Up (Tabulation)
// ========================================================================

function canPartitionBottomUp2D(nums) {
  const totalSum = nums.reduce((a, b) => a + b, 0);
  if (totalSum % 2 !== 0) return false;

  const target = totalSum / 2;
  const n = nums.length;

  // dp[i][s] = can we achieve sum s using first i elements?
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(target + 1).fill(false));

  // Base case: sum 0 is always achievable (by taking no elements)
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }

  for (let i = 1; i <= n; i++) {
    for (let s = 1; s <= target; s++) {
      // Skip current element
      dp[i][s] = dp[i - 1][s];

      // Take current element if it fits
      if (nums[i - 1] <= s) {
        dp[i][s] = dp[i][s] || dp[i - 1][s - nums[i - 1]];
      }
    }
  }

  return dp[n][target];
}

// ========================================================================
// 4. Space Optimized Bottom-Up (Tabulation)
// ========================================================================

function canPartition(nums) {
  const totalSum = nums.reduce((a, b) => a + b, 0);
  if (totalSum % 2 !== 0) return false;

  const target = totalSum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // Sum 0 is always achievable

  for (let i = 0; i < nums.length; i++) {
    // Traverse backwards to avoid reusing the same element
    for (let s = target; s >= nums[i]; s--) {
      dp[s] = dp[s] || dp[s - nums[i]];
    }
  }

  return dp[target];
}
