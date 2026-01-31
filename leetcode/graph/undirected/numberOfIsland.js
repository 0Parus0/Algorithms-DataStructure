/*
Find the number of islands
Difficulty: MediumAccuracy: 42.12%Submissions: 252K+Points: 4Average Time: 20m
Given a grid of size n*m (n is the number of rows and m is the number of columns in the grid) consisting of 'W's (Water) and 'L's (Land). Find the number of islands.

Note: An island is either surrounded by water or the boundary of a grid and is formed by connecting adjacent lands horizontally or vertically or diagonally i.e., in all 8 directions.

Examples:

Input: grid[][] = [['L', 'L', 'W', 'W', 'W'], ['W', 'L', 'W', 'W', 'L'], ['L', 'W', 'W', 'L', 'L'], ['W', 'W', 'W', 'W', 'W'], ['L', 'W', 'L', 'L', 'W']]
Output: 4
Explanation:
The image below shows all the 4 islands in the grid.
 
Input: grid[][] = [['W', 'L', 'L', 'L', 'W', 'W', 'W'], ['W', 'W', 'L', 'L', 'W', 'L', 'W']]
Output: 2
Expanation:
The image below shows 2 islands in the grid.
 
Constraints:
1 ≤ n, m ≤ 500
grid[i][j] = {'L', 'W'}
*/

function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const r = grid.length;
  const c = grid[0].length;

  function valid(i, j) {
    return i >= 0 && i < r && j >= 0 && j < c;
  }
  const row = [-1, -1, -1, 1, 1, 1, 0, 0];
  const column = [-1, 0, 1, -1, 0, 1, -1, 1];

  let count = 0;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (grid[i][j] === "L") {
        count++;
        const queue = [];
        queue.push([i, j]);
        // Mark it as visited
        grid[i][j] = "W";

        while (queue.length > 0) {
          let [newI, newJ] = queue.shift();

          // 8 directions
          for (let k = 0; k < 8; k++) {
            if (
              valid(newI + row[k], newJ + column[k]) &&
              grid[newI + row[k]][newJ + column[k]] === "L"
            ) {
              grid[newI + row[k]][newJ + column[k]] = "W";
              queue.push([newI + row[k], newJ + column[k]]);
            }
          }
        }
      }
    }
  }
  return count;
}

/*
🧩 Time and Space Complexity

Time: O(R × C) — each cell is visited once.

Space: O(R × C) — worst-case queue size if the island covers the whole grid.
*/

function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const R = grid.length;
  const C = grid[0].length;
  let count = 0;

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  function bfs(startR, startC) {
    const queue = [[startR, startC]];
    grid[startR][startC] = "W";

    while (queue.length > 0) {
      const [r, c] = queue.shift();

      for (let [dr, dc] of directions) {
        const nr = r + dr,
          nc = c + dc;

        if (nr >= 0 && nr < R && nc >= 0 && nc < C && grid[nr][nc] === "L") {
          grid[nr][nc] = "W";
          queue.push([nr, nc]);
        }
      }
    }
  }

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (grid[i][j] === "L") {
        count++;
        bfs(i, j);
      }
    }
  }

  return count;
}

function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  const n = grid.length;
  const m = grid[0].length;
  let count = 0;

  // All 8 directions: up, down, left, right, and 4 diagonals
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  function dfs(i, j) {
    // Check boundaries and if it's land
    if (i < 0 || i >= n || j < 0 || j >= m || grid[i][j] !== "L") {
      return;
    }

    // Mark as visited by changing to water
    grid[i][j] = "W";

    // Explore all 8 directions
    for (let [dx, dy] of directions) {
      dfs(i + dx, j + dy);
    }
  }

  // Iterate through each cell
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === "L") {
        count++;
        dfs(i, j);
      }
    }
  }

  return count;
}

// Test Case 1
console.log(
  numIslands([
    ["L", "L", "W", "W", "W"],
    ["W", "L", "W", "W", "L"],
    ["L", "W", "W", "L", "L"],
    ["W", "W", "W", "W", "W"],
    ["L", "W", "L", "L", "W"],
  ])
); // Output: 4

// Test Case 2
console.log(
  numIslands([
    ["W", "L", "L", "L", "W", "W", "W"],
    ["W", "W", "L", "L", "W", "L", "W"],
  ])
); // Output: 2

// Test Case 3: No islands
console.log(
  numIslands([
    ["W", "W"],
    ["W", "W"],
  ])
); // Output: 0

// Test Case 4: Single island
console.log(
  numIslands([
    ["L", "L"],
    ["L", "L"],
  ])
); // Output: 1
