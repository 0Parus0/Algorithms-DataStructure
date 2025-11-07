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

function sodukuSolver(board) {
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
