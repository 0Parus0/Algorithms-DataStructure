/*
1420. Build Array Where You Can Find The Maximum Exactly K Comparisons
Hard
Topics
premium lock icon
Companies
Hint
You are given three integers n, m and k. Consider the following algorithm to find the maximum element of an array of positive integers:


You should build the array arr which has the following properties:

arr has exactly n integers.
1 <= arr[i] <= m where (0 <= i < n).
After applying the mentioned algorithm to arr, the value search_cost is equal to k.
Return the number of ways to build the array arr under the mentioned conditions. As the answer may grow large, the answer must be computed modulo 109 + 7.

 

Example 1:

Input: n = 2, m = 3, k = 1
Output: 6
Explanation: The possible arrays are [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] [3, 3]
Example 2:

Input: n = 5, m = 2, k = 3
Output: 0
Explanation: There are no possible arrays that satisfy the mentioned conditions.
Example 3:

Input: n = 9, m = 1, k = 1
Output: 1
Explanation: The only possible array is [1, 1, 1, 1, 1, 1, 1, 1, 1]
 

Constraints:

1 <= n <= 50
1 <= m <= 100
0 <= k <= n
*/

function numOfArrays(n, m, k) {
  const mod = 1e9 + 7;

  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: k + 1 }, () => new Array(m + 1).fill(-1)),
  );
  function solve(idx, searchCost, maxSoFar) {
    if (idx === n) {
      if (searchCost === k) return 1;
      return 0;
    }

    if (dp[idx][searchCost][maxSoFar] !== -1)
      return dp[idx][searchCost][maxSoFar];
    let result = 0;

    for (let i = 1; i <= m; i++) {
      if (i > maxSoFar) {
        result = (result + solve(idx + 1, searchCost + 1, i)) % mod;
      } else {
        result = (result + solve(idx + 1, searchCost, maxSoFar)) % mod;
      }
    }

    return (dp[idx][searchCost][maxSoFar] = result % mod);
  }

  return solve(0, 0, 0);
}

/* Optimized with 3 for loops */
function numOfArrays(n, m, k) {
  const mod = 1e9 + 7;

  // dp[i][j][l] = number of ways to build array of length i,
  // with exactly j comparisons, and maximum value l
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: k + 1 }, () => new Array(m + 1).fill(0)),
  );

  // Base case: array of length 0, 0 comparisons, maximum 0
  dp[0][0][0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= Math.min(k, i); j++) {
      for (let l = 1; l <= m; l++) {
        // Case 1: The current element is the new maximum
        // Previous maximum could be anything < l
        let sum = 0;
        for (let prevMax = 0; prevMax < l; prevMax++) {
          sum = (sum + dp[i - 1][j - 1][prevMax]) % mod;
        }

        // Case 2: The current element is not the new maximum
        // Previous maximum must be exactly l
        // We can choose any value <= l (l choices)
        const notNewMax = (dp[i - 1][j][l] * l) % mod;

        dp[i][j][l] = (sum + notNewMax) % mod;
      }
    }
  }

  // Sum all ways with length n, exactly k comparisons, any maximum value
  let result = 0;
  for (let l = 1; l <= m; l++) {
    result = (result + dp[n][k][l]) % mod;
  }

  return result;
}

/* Best With prefix sums */
function numOfArrays(n, m, k) {
  const mod = 1e9 + 7;

  // dp[i][j][l] as before
  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: k + 1 }, () => new Array(m + 1).fill(0)),
  );

  // prefix[i][j][l] = sum of dp[i][j][1..l]
  const prefix = Array.from({ length: n + 1 }, () =>
    Array.from({ length: k + 1 }, () => new Array(m + 1).fill(0)),
  );

  // Initialize for arrays of length 1
  for (let l = 1; l <= m; l++) {
    dp[1][1][l] = 1;
    prefix[1][1][l] = l; // sum of 1..l
  }

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j <= Math.min(k, i); j++) {
      for (let l = 1; l <= m; l++) {
        // Case 1: New maximum at position i
        // Sum of all ways with previous maximum < l
        const newMax = prefix[i - 1][j - 1][l - 1] || 0;

        // Case 2: Not new maximum
        // Can choose any of l values that are <= current max
        const notNewMax = (dp[i - 1][j][l] * l) % mod;

        dp[i][j][l] = (newMax + notNewMax) % mod;

        // Update prefix sum
        prefix[i][j][l] = (prefix[i][j][l - 1] + dp[i][j][l]) % mod;
      }
    }
  }

  // Sum all ways with maximum value from 1 to m
  let result = 0;
  for (let l = 1; l <= m; l++) {
    result = (result + dp[n][k][l]) % mod;
  }

  return result;
}
