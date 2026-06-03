/*
37. Sudoku Solver
Hard
Topics
premium lock icon
Companies
Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells.

 

Example 1:


Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
Explanation: The input board is shown above and the only valid solution is shown below:


 

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit or '.'.
It is guaranteed that the input board has only one solution.
*/

function sudokuSolver(board) {
  function isValid(row, col, num) {
    const numStr = num.toString();

    for (let i = 0; i < 9; i++) {
      if (board[row][i] === numStr) return false;
      if (board[i][col] === numStr) return false;
    }

    const startI = Math.floor(row / 3) * 3;
    const startJ = Math.floor(col / 3) * 3;

    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        if (board[startI + j][startJ + k] === numStr) return false;
      }
    }
    return true;
  }
  function solve(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === ".") {
          for (let k = 1; k <= 9; k++) {
            if (isValid(i, j, k)) {
              board[i][j] = k.toString();
              if (solve(board) === true) return true;
              board[i][j] = ".";
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  return solve(board);
}

function sudokuSolver(board) {
  function check(num, i, j) {
    num = num.toString();
    // Check in same row
    for (let col = 0; col < 9; col++) {
      if (board[i][col] === num) return false;
    }
    // Check in same col

    for (let row = 0; row < 9; row++) {
      if (board[row][j] === num) return false;
    }
    // Check in same box
    let row = Math.floor(i / 3) * 3;
    let col = Math.floor(j / 3) * 3;
    for (let a = 0; a < 3; a++) {
      for (let b = 0; b < 3; b++) {
        if (board[a + row][b + col] === num) return false;
      }
    }
    return true;
  }
  function find(i, j) {
    // Base Condition
    if (i === 9) return true;

    if (j === 9) return find(i + 1, 0);

    if (board[i][j] !== ".") return find(i, j + 1);

    for (let num = 1; num < 10; num++) {
      if (check(num, i, j)) {
        board[i][j] = num.toString();
        if (find(i, j + 1)) return true;
        board[i][j] = ".";
      }
    }
    return false;
  }
  find(0, 0);
  return board;
}

function sudokuSolver(board) {
  function isValid(num, row, col) {
    const numStr = num.toString();

    // Check row
    for (let c = 0; c < 9; c++) {
      if (board[row][c] === numStr) return false;
    }

    // Check column
    for (let r = 0; r < 9; r++) {
      if (board[r][col] === numStr) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (board[boxRow + r][boxCol + c] === numStr) return false;
      }
    }

    return true;
  }

  function solve(row, col) {
    if (row === 9) return true;
    if (col === 9) return solve(row + 1, 0);
    if (board[row][col] !== ".") return solve(row, col + 1);

    for (let num = 1; num <= 9; num++) {
      if (isValid(num, row, col)) {
        board[row][col] = num.toString();
        if (solve(row, col + 1)) return true;
        board[row][col] = ".";
      }
    }

    return false;
  }

  return solve(0, 0);
}

const board = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
const board2 = [
  ["5", "3", ".", ".", "7", ".", ".", ".", "."],
  ["6", ".", ".", "1", "9", "5", ".", ".", "."],
  [".", "9", "8", ".", ".", ".", ".", "6", "."],
  ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
  ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
  ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
  [".", "6", ".", ".", ".", ".", "2", "8", "."],
  [".", ".", ".", "4", "1", "9", ".", ".", "5"],
  [".", ".", ".", ".", "8", ".", ".", "7", "9"],
];
console.log(sodukuSolver(board2));
javascript;
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function (board) {
  // 1. Use Int32Arrays for ultra-fast bitwise tracking instead of JS Sets
  const rows = new Int32Array(9);
  const cols = new Int32Array(9);
  const boxes = new Int32Array(9);
  const emptyCells = [];

  // Initialize the bitmasks with the starting board
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] === ".") {
        emptyCells.push({ r, c });
      } else {
        const val = parseInt(board[r][c], 10);
        const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);
        const mask = 1 << val; // e.g., 5 becomes 100000 in binary

        rows[r] |= mask;
        cols[c] |= mask;
        boxes[boxIdx] |= mask;
      }
    }
  }

  function backtrack() {
    if (emptyCells.length === 0) return true;

    let minCandidates = 10;
    let bestIdx = -1;
    let bestMask = 0;

    // 2. O(N) Scan instead of sorting: Find the cell with the fewest candidates (MRV)
    for (let i = 0; i < emptyCells.length; i++) {
      const { r, c } = emptyCells[i];
      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

      // Bitwise OR combines all used numbers for this cell into one integer
      const used = rows[r] | cols[c] | boxes[boxIdx];

      // Count how many numbers (1-9) are available (bits that are still 0)
      let candidatesCount = 0;
      for (let num = 1; num <= 9; num++) {
        if ((used & (1 << num)) === 0) candidatesCount++;
      }

      if (candidatesCount < minCandidates) {
        minCandidates = candidatesCount;
        bestIdx = i;
        bestMask = used; // Save the state so we don't have to recalculate it
      }

      // 3. Ultimate Pruning:
      if (minCandidates === 0) return false; // Dead end detected instantly
      if (minCandidates === 1) break; // Naked Single! No need to look further
    }

    const { r, c } = emptyCells[bestIdx];
    const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

    // 4. O(1) Array Removal: Swap the best cell with the last one and pop
    emptyCells[bestIdx] = emptyCells[emptyCells.length - 1];
    emptyCells.pop();

    // 5. Try all valid numbers
    for (let num = 1; num <= 9; num++) {
      const mask = 1 << num;

      if ((bestMask & mask) === 0) {
        // If the number is available
        // Apply the move
        board[r][c] = num.toString();
        rows[r] |= mask;
        cols[c] |= mask;
        boxes[boxIdx] |= mask;

        // Recurse
        if (backtrack()) return true;

        // Undo the move
        board[r][c] = ".";
        rows[r] &= ~mask;
        cols[c] &= ~mask;
        boxes[boxIdx] &= ~mask;
      }
    }

    // Put the cell back into the pool (order doesn't matter because we scan every time)
    emptyCells.push({ r, c });
    return false;
  }

  backtrack();
};
