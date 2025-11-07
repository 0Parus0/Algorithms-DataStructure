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
*/

// Count permutations (order matters)
function countWaysPermutation(arr, N) {
  const dp = new Array(N + 1).fill(-1);
  dp[0] = 1;
  function dfs(target) {
    if (dp[target] !== -1) return dp[target];
    let ways = 0;
    for (let num of arr) {
      if (target - num >= 0) ways += dfs(target - num);
    }
    dp[target] = ways;
    return ways;
  }
  return dfs(N);
}

// Count combinations (order does NOT matter)
function countWaysCombination(arr, N) {
  const m = arr.length;
  // memo[i][target] = number of ways to make 'target' using arr[i..m-1]
  const memo = Array.from({ length: m }, () => new Array(N + 1).fill(-1));

  function dfs(i, target) {
    if (target === 0) return 1;
    if (target < 0) return 0;
    if (i === m) return 0;

    if (memo[i][target] !== -1) return memo[i][target];

    // two choices: include arr[i] (stay at i), or exclude arr[i] (move to i+1)
    const include = dfs(i, target - arr[i]); // repetition allowed
    const exclude = dfs(i + 1, target); // move to next distinct element

    memo[i][target] = include + exclude;
    return memo[i][target];
  }

  return dfs(0, N);
}

function countWaysCombination(arr, N) {
  const dp = new Array(N + 1).fill(0);
  dp[0] = 1;

  // Outer loop → over each number (to prevent reorderings)
  for (let num of arr) {
    for (let sum = num; sum <= N; sum++) {
      dp[sum] += dp[sum - num];
    }
  }

  return dp[N];
}

function countWaysPermutation(arr, N) {
  const dp = new Array(N + 1).fill(0);
  dp[0] = 1;

  // Outer loop → over sums (to allow all orderings)
  for (let sum = 1; sum <= N; sum++) {
    for (let num of arr) {
      if (sum - num >= 0) {
        dp[sum] += dp[sum - num];
      }
    }
  }

  return dp[N];
}

console.log("Combinations:");
console.log(countWaysCombination([1, 5, 6], 7)); // 3
console.log(countWaysCombination([1, 2, 3], 4)); // 4
console.log(countWaysCombination([12, 3, 1, 9], 14)); // 8

console.log("Permutations:");
console.log(countWaysPermutation([1, 5, 6], 7)); // 3
console.log(countWaysPermutation([1, 2, 3], 4)); // 7
console.log(countWaysPermutation([12, 3, 1, 9], 14)); // 150
