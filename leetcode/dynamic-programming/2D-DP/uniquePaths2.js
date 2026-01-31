/*
63. Unique Paths II
Medium
Topics
premium lock icon
Companies
Hint
You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The testcases are generated so that the answer will be less than or equal to 2 * 109.

 

Example 1:


Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
Example 2:


Input: obstacleGrid = [[0,1],[0,0]]
Output: 1
 

Constraints:

m == obstacleGrid.length
n == obstacleGrid[i].length
1 <= m, n <= 100
obstacleGrid[i][j] is 0 or 1.
*/

/* Top down (Recursion + Memoization) */

function uniquePaths(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(-1));

  function solve(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 1) return 0;
    if (i === m - 1 && j === n - 1) return 1;

    if (dp[i][j] !== -1) return dp[i][j];
    else {
      const right = solve(i, j + 1);
      const down = solve(i + 1, j);
      dp[i][j] = right + down;
    }

    return dp[i][j];
  }

  return solve(0, 0);
}

/* Bottom up (Tabulation) */

function uniquePaths(grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  // Fill the first row
  for (let col = 0; col < n; col++) {
    if (col >= 1 && grid[0][col - 1] === 1) {
      dp[0][col] = 0;
      grid[0][col] = 1;
    } else if (grid[0][col] === 1) {
      dp[0][col] = 0;
    } else {
      dp[0][col] = 1;
    }
  }

  // Fill the first column
  for (let row = 0; row < m; row++) {
    if (row >= 1 && grid[row - 1][0] === 1) {
      dp[row][0] = 0;
      grid[row][0] = 1;
    } else if (grid[row][0] === 1) {
      dp[row][0] = 0;
    } else {
      dp[row][0] = 1;
    }
  }

  for (let row = 1; row < m; row++) {
    for (let col = 1; col < n; col++) {
      if (grid[row][col] === 1) {
        dp[row][col] = 0;
      } else {
        dp[row][col] = dp[row - 1][col] + dp[row][col - 1];
      }
    }
  }

  return dp[m - 1][n - 1];
}
