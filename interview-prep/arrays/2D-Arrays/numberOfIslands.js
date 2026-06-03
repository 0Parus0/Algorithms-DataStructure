/*
200. Number of Islands
Medium
Topics
premium lock icon
Companies
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

Example 1:
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1

Example 2:
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Constraints:
m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/

function numIslands(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let islands = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        dfs(i, j);
        islands++;
      }
    }
  }

  function dfs(i, j) {
    if (i >= m || i < 0 || j >= n || j < 0 || grid[i][j] !== "1") return;

    grid[i][j] = "$";
    for (let [row, col] of dirs) {
      dfs(i + row, j + col);
    }
  }

  return islands;
}

function numIslands(grid) {
  const m = grid.length;
  const n = grid[0].length;
  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let islands = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        bfs(i, j);
        islands++;
      }
    }
  }

  function bfs(startI, startJ) {
    const queue = [[startI, startJ]];
    grid[startI][startJ] = "$"; // Mark as visited when enqueuing

    while (queue.length) {
      const [i, j] = queue.shift(); // O(n) - use index for better performance

      for (const [di, dj] of dirs) {
        const newI = i + di;
        const newJ = j + dj;

        if (
          newI >= 0 &&
          newI < m &&
          newJ >= 0 &&
          newJ < n &&
          grid[newI][newJ] === "1"
        ) {
          grid[newI][newJ] = "$"; // Mark immediately to prevent duplicate enqueues
          queue.push([newI, newJ]);
        }
      }
    }
  }

  return islands;
}

function numIslands(grid) {
  const m = grid.length;
  const n = grid[0].length;

  const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];
  let islands = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        bfs(i, j);
        islands++;
      }
    }
  }

  function bfs(i, j) {
    const que = [[i, j]];
    grid[i][j] = "$";

    while (que.length) {
      let node = que.shift();

      for (let [row, col] of dirs) {
        i_ = node[0] + row;
        j_ = node[1] + col;

        if (i_ < 0 || i_ >= m || j < 0 || j >= n || grid[i_][j_] !== "1")
          continue;
        else {
          que.push([i_, j_]);
          grid[_i][j_] = "$";
        }
      }
    }
  }

  return islands;
}
