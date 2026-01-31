/*
980. Unique Paths III
Hard
Topics
premium lock icon
Companies
You are given an m x n integer array grid where grid[i][j] could be:

1 representing the starting square. There is exactly one starting square.
2 representing the ending square. There is exactly one ending square.
0 representing empty squares we can walk over.
-1 representing obstacles that we cannot walk over.
Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.

 

Example 1:


Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
Output: 2
Explanation: We have the following two paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)
Example 2:


Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
Output: 4
Explanation: We have the following four paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)
Example 3:


Input: grid = [[0,1],[2,0]]
Output: 0
Explanation: There is no path that walks over every empty square exactly once.
Note that the starting and ending square can be anywhere in the grid.
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 20
1 <= m * n <= 20
-1 <= grid[i][j] <= 2
There is exactly one starting cell and one ending cell.
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  const row = [1, -1, 0, 0];
  const col = [0, 0, 1, -1];

  let result = 0,
    count = 0,
    nObs = 0;
  let startX = -1,
    startY = -1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        startX = i;
        startY = j;
        nObs++;
      }
      if (grid[i][j] === 0) {
        nObs++;
      }
    }
  }

  function backtrack(i, j, count) {
    if (i < 0 || i >= n || j < 0 || j >= m || grid[i][j] === -1) return;
    if (grid[i][j] === 2) {
      if (count === nObs) {
        result++;
      }
      return;
    }
    grid[i][j] = -1;
    for (let k = 0; k < 4; k++) {
      backtrack(i + row[k], j + col[k], count + 1);
    }
    grid[i][j] = 0;
  }

  backtrack(startX, startY, count);
  return result;
};

/*
Plan
Rephrase the Problem
We are given a 2D grid with:

1 → starting cell (exactly one).

2 → ending cell (exactly one).

0 → empty cells we must walk over.

-1 → obstacles we cannot walk over.
We need to count the number of paths from the start to the end that visit every non‑obstacle cell exactly once. Moves are up, down, left, right.

Inputs and Outputs

Input: grid (2D array of integers, m × n, 1 ≤ m, n ≤ 20, m*n ≤ 20).

Output: Integer count of valid paths.

Data Structures

The grid itself for traversal.

Variables to track:

Start coordinates (sx, sy).

Count of non‑obstacle cells (including start and end) — totalEmpty.

Visited set or boolean matrix (or modify grid in‑place for marking).

Recursive DFS for path exploration.

Approach
Intuition:
This is a Hamiltonian path problem on a grid: we must visit every non‑obstacle cell exactly once, starting and ending at fixed cells.
Since m*n ≤ 20, brute‑force DFS/backtracking is feasible.
Steps:

Find the start position and count total non‑obstacle cells (1, 2, 0).

Use DFS from start:

If out‑of‑bounds or cell is -1 or already visited → return.

If cell is 2 (end):

If we have visited all totalEmpty cells → increment answer.

Return.

Otherwise (cell is 0 or 1):

Mark visited.

Recurse to four neighbors.

Backtrack (unmark visited).

Return total count.

Edge Cases

Grid size 1×1 with start and end same cell (if 1 and 2 in same cell? — constraints say exactly one start and one end, so this can't happen unless 1 and 2 overlap, but they are distinct values).

No possible path → answer 0.

All cells are non‑obstacle → must visit all.

Obstacles blocking the path.

Time and Space Complexity

Time: In worst case, we try all possible paths. Upper bound O(4^{m*n}) but pruning reduces drastically due to constraints.
Since m*n ≤ 20, it’s acceptable.

Space: O(m*n) for recursion depth and visited tracking.

Commit Message
"Solve Unique Paths III using DFS backtracking"
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  let startX,
    startY,
    totalEmpty = 0;

  // 1. Find start and count non-obstacle cells
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        startX = i;
        startY = j;
      }
      if (grid[i][j] !== -1) {
        totalEmpty++;
      }
    }
  }

  let result = 0;

  // Directions: up, down, left, right
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // DFS function
  const dfs = (x, y, steps) => {
    // Out of bounds or obstacle or already visited
    if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === -1) {
      return;
    }

    // Reached the end cell
    if (grid[x][y] === 2) {
      if (steps === totalEmpty) {
        result++;
      }
      return;
    }

    // Mark as visited (obstacle)
    const original = grid[x][y];
    grid[x][y] = -1;

    // Explore neighbors
    for (const [dx, dy] of dirs) {
      dfs(x + dx, y + dy, steps + 1);
    }

    // Backtrack
    grid[x][y] = original;
  };

  // Start DFS with 1 step (counting the start cell)
  dfs(startX, startY, 1);

  return result;
};

/**
 * 980. Unique Paths III
 *
 * =========================
 * PLAN (Interview-ready)
 * =========================
 *
 * 1. Rephrase the problem in my own words
 * -------------------------------------
 * We are given a grid that has:
 * - exactly one start cell (1)
 * - exactly one end cell (2)
 * - empty cells (0) we can walk on
 * - obstacles (-1) we cannot walk on
 *
 * We need to count how many different paths exist from start to end such that:
 * - movement is only up, down, left, right
 * - we visit *every non-obstacle cell exactly once*
 *
 *
 * 2. Inputs and Outputs
 * ---------------------
 * Input:
 *   - grid: 2D array of integers (m x n)
 *
 * Output:
 *   - number (integer) representing valid paths
 *
 *
 * 3. Data Structures
 * ------------------
 * - 2D array (grid) for the board
 * - Recursion (DFS / Backtracking)
 * - A visited marking strategy (we will temporarily modify grid values)
 *
 *
 * 4. Approach
 * -----------
 * Intuition:
 * This is a classic backtracking / DFS problem.
 * Since the grid is very small (max 20 cells), we can try all possible paths.
 *
 * The key idea:
 * - Count how many non-obstacle cells must be visited in total
 * - Start DFS from the start cell
 * - At each step, mark the current cell as visited
 * - Move in 4 directions
 * - When we reach the end cell:
 *     - check if we have visited all required cells
 *     - if yes, count this as 1 valid path
 *
 * Important detail:
 * We must walk on every empty + start + end cell exactly once.
 *
 * Implementation Steps:
 * 1. Scan the grid:
 *    - find start position
 *    - count total non-obstacle cells
 * 2. Run DFS from start
 * 3. Use backtracking:
 *    - mark current cell as visited
 *    - explore neighbors
 *    - unmark after returning
 *
 *
 * 5. Edge Cases
 * -------------
 * - No possible path → return 0
 * - Grid with only start and end but blocked path
 * - Start is surrounded by obstacles
 *
 *
 * 6. Time and Space Complexity
 * ----------------------------
 * Time Complexity:
 *   - O(4^(m*n)) in the worst case (trying all paths)
 *   - Acceptable since m*n ≤ 20
 *
 * Space Complexity:
 *   - O(m*n) for recursion stack and grid modification
 *
 *
 * 7. Commit Message
 * -----------------
 * "Solve Unique Paths III using DFS backtracking with full cell coverage check"
 */

var uniquePathsIII = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  let startRow = 0;
  let startCol = 0;
  let totalWalkableCells = 0;
  let result = 0;

  // Step 1: Scan grid to find start and count non-obstacle cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== -1) {
        totalWalkableCells++;
      }
      if (grid[r][c] === 1) {
        startRow = r;
        startCol = c;
      }
    }
  }

  // Directions: up, down, left, right
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // Step 2: DFS with backtracking
  function dfs(r, c, remaining) {
    // Out of bounds or obstacle or already visited
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === -1) {
      return;
    }

    // If we reached the end
    if (grid[r][c] === 2) {
      if (remaining === 1) {
        result++;
      }
      return;
    }

    // Mark current cell as visited
    const temp = grid[r][c];
    grid[r][c] = -1;

    // Explore all 4 directions
    for (const [dr, dc] of directions) {
      dfs(r + dr, c + dc, remaining - 1);
    }

    // Backtrack (restore cell)
    grid[r][c] = temp;
  }

  // Step 3: Start DFS from the start cell
  dfs(startRow, startCol, totalWalkableCells);

  return result;
};
