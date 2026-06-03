/*
1594. Maximum Non Negative Product in a Matrix
Medium
Topics
premium lock icon
Companies
Hint
You are given a m x n matrix grid. Initially, you are located at the top-left corner (0, 0), and in each step, you can only move right or down in the matrix.

Among all possible paths starting from the top-left corner (0, 0) and ending in the bottom-right corner (m - 1, n - 1), find the path with the maximum non-negative product. The product of a path is the product of all integers in the grid cells visited along the path.

Return the maximum non-negative product modulo 109 + 7. If the maximum product is negative, return -1.

Notice that the modulo is performed after getting the maximum product.

 

Example 1:


Input: grid = [[-1,-2,-3],[-2,-3,-3],[-3,-3,-2]]
Output: -1
Explanation: It is not possible to get non-negative product in the path from (0, 0) to (2, 2), so return -1.
Example 2:


Input: grid = [[1,-2,1],[1,-2,1],[3,-4,1]]
Output: 8
Explanation: Maximum non-negative product is shown (1 * 1 * -2 * -4 * 1 = 8).
Example 3:


Input: grid = [[1,3],[0,-4]]
Output: 0
Explanation: Maximum non-negative product is shown (1 * 0 * -4 = 0).
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 15
-4 <= grid[i][j] <= 4
*/

// ========================================================================
// 1. Best and Optimal
// ========================================================================
var maxProductPath = function (grid) {
  const MOD = 1e9 + 7;
  const n = grid.length;
  const m = grid[0].length;
  const dpMax = Array.from({ length: n }, () => Array(m).fill(0));
  const dpMin = Array.from({ length: n }, () => Array(m).fill(0));
  dpMax[0][0] = dpMin[0][0] = grid[0][0];

  for (let j = 1; j < m; j++) {
    dpMax[0][j] = dpMin[0][j] = dpMax[0][j - 1] * grid[0][j];
  }

  for (let i = 1; i < n; i++) {
    dpMax[i][0] = dpMin[i][0] = dpMax[i - 1][0] * grid[i][0];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      const curr = grid[i][j];

      const candidates = [
        dpMax[i - 1][j] * curr,
        dpMin[i - 1][j] * curr,
        dpMax[i][j - 1] * curr,
        dpMin[i][j - 1] * curr,
      ];

      dpMax[i][j] = Math.max(...candidates);
      dpMin[i][j] = Math.min(...candidates);
    }
  }
  const result = dpMax[n - 1][m - 1];
  return result < 0 ? -1 : result % MOD;
};

/* Top down (Recursion + Memoization) */

// ========================================================================
// 1. Two different dp arrays(2D)
// ========================================================================

function maxProductPath(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const mod = 1e9 + 7;

  // Two separate DP arrays instead of one 3D array
  const dpMax = Array.from({ length: m }, () => Array(n).fill(-Infinity));
  const dpMin = Array.from({ length: m }, () => Array(n).fill(Infinity));

  function solve(i, j) {
    // Base case
    if (i === m - 1 && j === n - 1) {
      dpMax[i][j] = grid[i][j];
      dpMin[i][j] = grid[i][j];
      return [dpMax[i][j], dpMin[i][j]];
    }

    // Check memoization
    if (dpMax[i][j] !== -Infinity && dpMin[i][j] !== Infinity) {
      return [dpMax[i][j], dpMin[i][j]];
    }

    let maxVal = -Infinity;
    let minVal = Infinity;

    // Move Down
    if (i + 1 < m) {
      const [downMax, downMin] = solve(i + 1, j);
      const candidates = [grid[i][j] * downMax, grid[i][j] * downMin];
      maxVal = Math.max(maxVal, ...candidates);
      minVal = Math.min(minVal, ...candidates);
    }

    // Move Right
    if (j + 1 < n) {
      const [rightMax, rightMin] = solve(i, j + 1);
      const candidates = [grid[i][j] * rightMax, grid[i][j] * rightMin];
      maxVal = Math.max(maxVal, ...candidates);
      minVal = Math.min(minVal, ...candidates);
    }

    // Store results in separate arrays
    dpMax[i][j] = maxVal;
    dpMin[i][j] = minVal;
    return [dpMax[i][j], dpMin[i][j]];
  }

  const [maxProd] = solve(0, 0);
  return maxProd >= 0 ? maxProd % mod : -1;
}

function maxProductPath(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const mod = 1e9 + 7;
  const dp = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => [-Infinity, Infinity]),
  );
  function solve(i, j) {
    // Base case
    if (i === m - 1 && j === n - 1) return [grid[i][j], grid[i][j]];

    let maxVal = -Infinity;
    let minVal = Infinity;

    if (dp[i][j][0] !== -Infinity && dp[i][j][1] !== Infinity) return dp[i][j];

    // Down
    if (i + 1 < m) {
      const [downMax, downMin] = solve(i + 1, j);
      maxVal = Math.max(maxVal, grid[i][j] * downMax, grid[i][j] * downMin);
      minVal = Math.min(minVal, grid[i][j] * downMax, grid[i][j] * downMin);
    }

    // Right
    if (j + 1 < n) {
      const [rightMax, rightMin] = solve(i, j + 1);
      maxVal = Math.max(maxVal, grid[i][j] * rightMax, grid[i][j] * rightMin);
      minVal = Math.min(minVal, grid[i][j] * rightMax, grid[i][j] * rightMin);
    }

    dp[i][j][0] = maxVal;
    dp[i][j][1] = minVal;
    return dp[i][j];
  }
  const [maxProd, minProd] = solve(0, 0);
  return maxProd >= 0 ? maxProd % mod : -1;
}

/* Bottom up (Tabulation) */
function maxProductPath(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const mod = 1e9 + 7;

  const dp = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => [0, 0]),
  );

  dp[0][0] = [grid[0][0], grid[0][0]];

  // Filling first row
  for (let j = 1; j < n; j++) {
    dp[0][j][0] = dp[0][j - 1][0] * grid[0][j]; // maxVal
    dp[0][j][1] = dp[0][j - 1][1] * grid[0][j]; // minVal
  }

  // Filling first column
  for (let i = 1; i < m; i++) {
    dp[i][0][0] = dp[i - 1][0][0] * grid[i][0]; // maxVal
    dp[i][0][1] = dp[i - 1][0][1] * grid[i][0]; // minVal
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      const upMax = dp[i - 1][j][0];
      const upMin = dp[i - 1][j][1];

      const leftMax = dp[i][j - 1][0];
      const leftMin = dp[i][j - 1][1];

      dp[i][j][0] = Math.max(
        upMax * grid[i][j],
        upMin * grid[i][j],
        leftMax * grid[i][j],
        leftMin * grid[i][j],
      );

      dp[i][j][1] = Math.min(
        upMax * grid[i][j],
        upMin * grid[i][j],
        leftMax * grid[i][j],
        leftMin * grid[i][j],
      );
    }
  }

  const [maxProd, minProd] = dp[m - 1][n - 1];
  return maxProd >= 0 ? maxProd % mod : -1;
}

function maxProductPath(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const mod = 1e9 + 7;

  // dp[i][j][0] = minimum product to reach (i,j)
  // dp[i][j][1] = maximum product to reach (i,j)
  const dp = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => [0, 0]),
  );

  // Starting point
  dp[0][0] = [grid[0][0], grid[0][0]];

  // Fill DP table
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue;

      const val = grid[i][j];
      let minProd = Infinity;
      let maxProd = -Infinity;

      // Check if coming from top
      if (i > 0) {
        const topMin = dp[i - 1][j][0];
        const topMax = dp[i - 1][j][1];
        minProd = Math.min(minProd, val * topMin, val * topMax);
        maxProd = Math.max(maxProd, val * topMin, val * topMax);
      }

      // Check if coming from left
      if (j > 0) {
        const leftMin = dp[i][j - 1][0];
        const leftMax = dp[i][j - 1][1];
        minProd = Math.min(minProd, val * leftMin, val * leftMax);
        maxProd = Math.max(maxProd, val * leftMin, val * leftMax);
      }

      dp[i][j] = [minProd, maxProd];
    }
  }

  const maxProd = dp[m - 1][n - 1][1];
  return maxProd >= 0 ? maxProd % mod : -1;
}
