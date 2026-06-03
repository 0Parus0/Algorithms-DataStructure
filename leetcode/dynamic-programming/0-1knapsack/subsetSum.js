/*
Subset Sum Problem
Difficulty: MediumAccuracy: 32.0%Submissions: 455K+Points: 4
Given an array of positive integers arr[] and a value sum, determine if there is a subset of arr[] with sum equal to given sum. 

Examples:

Input: arr[] = [3, 34, 4, 12, 5, 2], sum = 9
Output: true 
Explanation: Here there exists a subset with target sum = 9, 4+3+2 = 9.
Input: arr[] = [3, 34, 4, 12, 5, 2], sum = 30
Output: false
Explanation: There is no subset with target sum 30.
Input: arr[] = [1, 2, 3], sum = 6
Output: true
Explanation: The entire array can be taken as a subset, giving 1 + 2 + 3 = 6.
Constraints:
1 <= arr.size() <= 200
1<= arr[i] <= 200
1<= sum <= 104
*/
class SubsetSum {
  // Approach: Recursion + Memoization from Right to Left
  static isSubsetSumRTL(arr, sum) {
    const n = arr.length;
    // Memoization table: memo[index][remainingSum]
    // index goes from 0 to n-1 (or -1 base case)
    const memo = Array(n)
      .fill()
      .map(() => Array(sum + 1).fill(-1));

    function solve(index, remainingSum) {
      // Base cases
      if (remainingSum === 0) return true;
      if (index < 0 || remainingSum < 0) return false;

      // Check memo
      if (memo[index][remainingSum] !== -1) {
        return memo[index][remainingSum] === 1;
      }

      // Option 1: Skip current element (move left)
      let skip = solve(index - 1, remainingSum);

      // Option 2: Take current element if it fits
      let take = false;
      if (arr[index] <= remainingSum) {
        take = solve(index - 1, remainingSum - arr[index]);
      }

      // Store result in memo (1 for true, 0 for false)
      const result = skip || take;
      memo[index][remainingSum] = result ? 1 : 0;
      return result;
    }

    // Start from the last index (n-1)
    return solve(n - 1, sum);
  }
  // Approach 1: Recursion + Memoization
  static isSubsetSumMemo(arr, sum) {
    const n = arr.length;
    // Create memoization table: memo[index][remainingSum]
    const memo = Array(n)
      .fill()
      .map(() => Array(sum + 1).fill(-1));

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

      // Option 2: Take current element
      let take = false;
      if (arr[index] <= remainingSum) {
        take = solve(index + 1, remainingSum - arr[index]);
      }

      // Store result in memo
      memo[index][remainingSum] = skip || take ? 1 : 0;
      return skip || take;
    }

    return solve(0, sum);
  }

  // Approach 2: Bottom-Up (Tabulation) - 2D DP
  static isSubsetSumTabulation2D(arr, sum) {
    const n = arr.length;
    // Create DP table: dp[i][s] = can we make sum s using first i elements?
    const dp = Array(n + 1)
      .fill()
      .map(() => Array(sum + 1).fill(false));

    // Base case: sum 0 is always achievable (by taking no elements)
    for (let i = 0; i <= n; i++) {
      dp[i][0] = true;
    }

    // Fill the DP table
    for (let i = 1; i <= n; i++) {
      for (let s = 1; s <= sum; s++) {
        // Skip current element
        let skip = dp[i - 1][s];

        // Take current element if it fits
        let take = false;
        if (arr[i - 1] <= s) {
          take = dp[i - 1][s - arr[i - 1]];
        }

        dp[i][s] = take || skip;
      }
    }

    return dp[n][sum];
  }

  // Approach 3: Bottom-Up (Tabulation) - Space Optimized (1D DP)
  static isSubsetSumOptimized(arr, sum) {
    const n = arr.length;
    // Use 1D boolean array
    const dp = new Array(sum + 1).fill(false);

    // Base case: sum 0 is always achievable
    dp[0] = true;

    // Process each element
    for (let i = 0; i < n; i++) {
      // IMPORTANT: Traverse backwards to avoid reusing the same element
      for (let s = sum; s >= arr[i]; s--) {
        if (dp[s - arr[i]]) {
          dp[s] = true;
        }
      }
    }

    return dp[sum];
  }

  // Bonus: Get the actual subset (using optimized approach)
  static findSubset(arr, sum) {
    const n = arr.length;
    const dp = new Array(sum + 1).fill(false);
    const selected = new Array(sum + 1).fill().map(() => []);

    dp[0] = true;
    selected[0] = [];

    for (let i = 0; i < n; i++) {
      for (let s = sum; s >= arr[i]; s--) {
        if (!dp[s] && dp[s - arr[i]]) {
          dp[s] = true;
          selected[s] = [...selected[s - arr[i]], arr[i]];
        }
      }
    }

    return {
      exists: dp[sum],
      subset: selected[sum],
    };
  }
}

// Test all approaches
console.log("=== SUBSET SUM PROBLEM SOLUTIONS ===\n");

const testCases = [
  { arr: [3, 34, 4, 12, 5, 2], sum: 9, expected: true },
  { arr: [3, 34, 4, 12, 5, 2], sum: 30, expected: false },
  { arr: [1, 2, 3], sum: 6, expected: true },
  { arr: [1, 2, 3], sum: 7, expected: false },
  { arr: [2, 3, 7, 8, 10], sum: 11, expected: true },
];

testCases.forEach((test, idx) => {
  console.log(`Test Case ${idx + 1}:`);
  console.log(`  Array: [${test.arr}]`);
  console.log(`  Target Sum: ${test.sum}`);
  console.log(`  Expected: ${test.expected}\n`);

  const results = {
    "Recursion + Memoization": SubsetSum.isSubsetSumMemo(test.arr, test.sum),
    "Tabulation 2D": SubsetSum.isSubsetSumTabulation2D(test.arr, test.sum),
    "Tabulation Optimized": SubsetSum.isSubsetSumOptimized(test.arr, test.sum),
  };

  for (const [method, result] of Object.entries(results)) {
    const status = result === test.expected ? "✓" : "✗";
    console.log(`  ${status} ${method}: ${result}`);
  }

  // Show actual subset for optimized approach (bonus)
  const { exists, subset } = SubsetSum.findSubset(test.arr, test.sum);
  if (exists && subset.length > 0) {
    console.log(
      `  Actual Subset Found: [${subset}] (sum = ${subset.reduce((a, b) => a + b, 0)})`,
    );
  }
  console.log("");
});
