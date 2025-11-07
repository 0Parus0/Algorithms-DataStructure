/*
1970. Last Day Where You Can Still Cross
Hard
Topics
premium lock icon
Companies
Hint
There is a 1-based binary matrix where 0 represents land and 1 represents water. You are given integers row and col representing the number of rows and columns in the matrix, respectively.

Initially on day 0, the entire matrix is land. However, each day a new cell becomes flooded with water. You are given a 1-based 2D array cells, where cells[i] = [ri, ci] represents that on the ith day, the cell on the rith row and cith column (1-based coordinates) will be covered with water (i.e., changed to 1).

You want to find the last day that it is possible to walk from the top to the bottom by only walking on land cells. You can start from any cell in the top row and end at any cell in the bottom row. You can only travel in the four cardinal directions (left, right, up, and down).

Return the last day where it is possible to walk from the top to the bottom by only walking on land cells.

 

Example 1:


Input: row = 2, col = 2, cells = [[1,1],[2,1],[1,2],[2,2]]
Output: 2
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 2.
Example 2:


Input: row = 2, col = 2, cells = [[1,1],[1,2],[2,1],[2,2]]
Output: 1
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 1.
Example 3:


Input: row = 3, col = 3, cells = [[1,2],[2,1],[3,3],[2,2],[1,1],[1,3],[2,3],[3,2],[3,1]]
Output: 3
Explanation: The above image depicts how the matrix changes each day starting from day 0.
The last day where it is possible to cross from top to bottom is on day 3.
 

Constraints:

2 <= row, col <= 2 * 104
4 <= row * col <= 2 * 104
cells.length == row * col
1 <= ri <= row
1 <= ci <= col
All the values of cells are unique.
*/

function canCross(day) {
  const grid = Array.from({ length: row }, () => Array(col).fill(0));
  for (let i = 0; i < day; i++) {
    const [r, c] = cells[i];
    grid[r - 1][c - 1] = 1; // mark water
  }

  const queue = [];
  for (let c = 0; c < col; c++) {
    if (grid[0][c] === 0) {
      queue.push([0, c]);
      grid[0][c] = 1; // mark visited as water
    }
  }

  while (queue.length) {
    const [r, c] = queue.shift();
    if (r === row - 1) return true; // reached bottom

    for (const [dr, dc] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nr = r + dr,
        nc = c + dc;
      if (nr >= 0 && nr < row && nc >= 0 && nc < col && grid[nr][nc] === 0) {
        grid[nr][nc] = 1; // mark as water/visited
        queue.push([nr, nc]);
      }
    }
  }

  return false;
}

function latestDayToCross(row, col, cells) {
  let left = 1,
    right = row * col,
    ans = 0;

  // Directions: up, down, left, right
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function canCross(day) {
    const grid = Array.from({ length: row }, () => Array(col).fill(0));
    for (let i = 0; i < day; i++) {
      const [r, c] = cells[i];
      grid[r - 1][c - 1] = 1; // mark flooded
    }

    function dfs(r, c) {
      if (r < 0 || r >= row || c < 0 || c >= col || grid[r][c] === 1)
        return false;

      if (r === row - 1) return true; // reached bottom
      grid[r][c] = 1; // mark visited (as water)

      for (const [dr, dc] of dirs) {
        if (dfs(r + dr, c + dc)) return true;
      }

      return false;
    }

    for (let c = 0; c < col; c++) {
      if (grid[0][c] === 0 && dfs(0, c)) {
        return true; // found path
      }
    }
    return false;
  }

  // Binary search
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canCross(mid)) {
      ans = mid;
      left = mid + 1; // try later day
    } else {
      right = mid - 1; // try earlier day
    }
  }

  return ans;
}
