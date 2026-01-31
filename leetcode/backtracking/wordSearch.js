/*
79. Word Search
Medium
Topics
premium lock icon
Companies
Given an m x n grid of characters board and a string word, return true if word exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

 

Example 1:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
Example 2:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
Example 3:


Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
 

Constraints:

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board and word consists of only lowercase and uppercase English letters.
*/
function exist(board, word) {
  const n = board.length;
  const m = board[0].length;
  const wLen = word.length;
  const row = [1, -1, 0, 0];
  const col = [0, 0, 1, -1];

  function dfs(i, j, idx) {
    if (idx === wLen) return true;
    if (i < 0 || i >= n || j < 0 || j >= m || board[i][j] === "$") return false;
    if (word[idx] !== board[i][j]) return false;

    let temp = board[i][j];
    board[i][j] = "$";
    for (let k = 0; k < 4; k++) {
      if (dfs(i + row[k], j + col[k], idx + 1)) return true;
    }

    board[i][j] = temp;
    return false;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === word[0] && dfs(i, j, 0)) return true;
    }
  }
  return false;
}

/*
* Plan
Rephrase the Problem
We are given a 2D grid of characters and a target word. We need to determine if the word exists in the grid by moving to adjacent (up, down, left, right) cells without reusing the same cell. The word must be constructed from sequentially adjacent letters.

Inputs and Outputs

Input: board (2D array of characters, m × n, 1 ≤ m, n ≤ 6), word (string, 1 ≤ length ≤ 15).

Output: Boolean true if word exists, false otherwise.

Data Structures

The grid itself.

Visited tracking (can modify board in place or use separate boolean matrix).

Recursive DFS for exploration.

Approach
Intuition:
This is a classic backtracking problem: we need to find a path in the grid that spells the word.
Steps:

Loop through every cell as a potential starting point.

For each cell, perform DFS:

If the cell’s letter matches the current character of word:

Mark it as visited.

Recurse to four neighboring cells for the next character.

If we reach the end of the word → return true.

Backtrack (unmark visited).

If any starting cell leads to a valid path, return true; else false.

Edge Cases

Word longer than total cells → early false.

Multiple same letters adjacent causing ambiguity.

Starting letter appears multiple times.

Single-cell board.

Word is a single letter.

Time and Space Complexity

Time: In worst case, we explore up to 4 directions per step, depth L (word length) → O(m*n * 4^L). However, constraints are small (m*n ≤ 36, L ≤ 15), so it’s acceptable.

Space: O(L) for recursion depth, plus O(m*n) if using separate visited matrix (or O(1) extra if modifying in place).

Commit Message
"Solve Word Search using DFS backtracking"
*/

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const m = board.length;
  const n = board[0].length;
  const wordLength = word.length;

  // Early exit if word is longer than total cells
  if (wordLength > m * n) return false;

  // Directions: up, down, left, right
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // Helper DFS function
  const dfs = (row, col, index) => {
    // If index reaches word length, we found the word
    if (index === wordLength) return true;

    // Check boundaries and character match
    if (
      row < 0 ||
      row >= m ||
      col < 0 ||
      col >= n ||
      board[row][col] !== word[index]
    ) {
      return false;
    }

    // Temporarily mark cell as visited by changing its value
    const originalChar = board[row][col];
    board[row][col] = "#"; // Mark visited

    // Explore all four directions
    for (const [dx, dy] of dirs) {
      if (dfs(row + dx, col + dy, index + 1)) {
        // Restore the cell before returning true
        board[row][col] = originalChar;
        return true;
      }
    }

    // Backtrack: restore the cell
    board[row][col] = originalChar;
    return false;
  };

  // Try every cell as starting point
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0]) {
        if (dfs(i, j, 0)) {
          return true;
        }
      }
    }
  }

  return false;
};

/**
 * 79. Word Search
 *
 * =========================
 * PLAN (Interview-ready)
 * =========================
 *
 * 1. Rephrase the problem in my own words
 * -------------------------------------
 * We are given a 2D grid of characters and a word.
 * We need to check if the word can be formed by starting from any cell
 * and moving step-by-step to adjacent cells (up, down, left, right),
 * such that:
 * - each character matches the corresponding character of the word
 * - a cell is used at most once in the current path
 *
 *
 * 2. Inputs and Outputs
 * ---------------------
 * Input:
 *   - board: 2D array of characters (m x n)
 *   - word: string
 *
 * Output:
 *   - boolean (true if word exists, otherwise false)
 *
 *
 * 3. Data Structures
 * ------------------
 * - 2D array (board)
 * - Recursion (DFS / Backtracking)
 * - In-place visited marking on the board
 *
 *
 * 4. Approach
 * -----------
 * Intuition:
 * This is a classic backtracking problem.
 * We try to start matching the word from every cell in the grid.
 * From a starting cell, we recursively try to match the next character
 * by moving in 4 directions.
 *
 * If at any point:
 * - the character does not match, or
 * - we go out of bounds, or
 * - we revisit a cell
 * then this path is invalid and we backtrack.
 *
 * If we successfully match all characters of the word, we return true.
 *
 * Implementation Steps:
 * 1. Loop through every cell in the board.
 * 2. If the cell matches word[0], start DFS from there.
 * 3. In DFS:
 *    - if index === word.length, return true
 *    - check bounds and character match
 *    - mark current cell as visited
 *    - explore all 4 directions
 *    - restore the cell (backtrack)
 *
 *
 * 5. Edge Cases
 * -------------
 * - Word length > total cells → impossible
 * - Board is small (1x1)
 * - Same character appears many times
 *
 *
 * 6. Time and Space Complexity
 * ----------------------------
 * Time Complexity:
 *   - O(m * n * 4^L)
 *     where L = length of the word
 *
 * Space Complexity:
 *   - O(L) recursion stack (depth of DFS)
 *
 *
 * 7. Commit Message
 * -----------------
 * "Solve Word Search using DFS backtracking with in-place visited marking"
 */

var exist = function (board, word) {
  const rows = board.length;
  const cols = board[0].length;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function dfs(r, c, index) {
    // If all characters are matched
    if (index === word.length) return true;

    // Out of bounds or character mismatch
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      board[r][c] !== word[index]
    ) {
      return false;
    }

    // Mark current cell as visited
    const temp = board[r][c];
    board[r][c] = "#";

    // Explore neighbors
    for (const [dr, dc] of directions) {
      if (dfs(r + dr, c + dc, index + 1)) {
        board[r][c] = temp; // restore before returning
        return true;
      }
    }

    // Backtrack
    board[r][c] = temp;
    return false;
  }

  // Try starting DFS from every cell
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) {
        return true;
      }
    }
  }

  return false;
};
