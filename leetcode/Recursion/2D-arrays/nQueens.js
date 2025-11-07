/*
51. N-Queens
Hard
Topics
premium lock iconCompanies

The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

 

Example 1:

Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

Example 2:

Input: n = 1
Output: [["Q"]]

 

Constraints:

    1 <= n <= 9

*/

function nQueens(n) {
  const board = Array.from({ length: n }, () => new Array(n).fill("."));
  const result = [];
  const column = new Array(n).fill(0);

  function check(i, j) {
    // Upper Left Diagonal
    let row = i,
      col = j;
    while (row > -1 && col > -1) {
      if (board[row][col] === "Q") {
        return false;
      }
      row--, col--;
    }

    // Upper Right Diagonal

    (row = i), (col = j);

    while (row > -1 && col < n) {
      if (board[row][col] === "Q") {
        return false;
      }
      row--, col++;
    }

    return true;
  }

  function find(row) {
    // Base Condition
    if (row === n) {
      const solution = board.map((rowArr) => rowArr.join(""));
      result.push(solution);
    }

    // Put queen at any nth position
    for (let j = 0; j < n; j++) {
      if (column[j] === 0 && check(row, j)) {
        column[j] = 1;
        board[row][j] = "Q";
        find(row + 1);
        column[j] = 0;
        board[row][j] = ".";
      }
    }
  }

  find(0);
  return result;
}

function nQueensOpt(n) {
  const board = Array.from({ length: n }, () => new Array(n).fill("."));
  const result = [];
  const columnAttack = new Array(n).fill(0);
  const leftDiagonalAttack = new Array(2 * n - 1).fill(0);
  const rightDiagonalAttack = new Array(2 * n - 1).fill(0);

  function backtrack(row) {
    // Base Case:
    if (row === n) {
      const solution = board.map((rowArr) => rowArr.join(""));
      result.push(solution);
    }
    // Right Diagonal = row + col
    // Left Diagonal = (n - 1) + col - row
    for (let j = 0; j < n; j++) {
      if (
        columnAttack[j] === 0 &&
        leftDiagonalAttack[n - 1 + j - row] === 0 &&
        rightDiagonalAttack[row + j] === 0
      ) {
        columnAttack[j] = 1;
        board[row][j] = "Q";
        leftDiagonalAttack[n - 1 + j - row] = 1;
        rightDiagonalAttack[row + j] = 1;
        backtrack(row + 1);
        columnAttack[j] = 0;
        board[row][j] = ".";
        leftDiagonalAttack[n - 1 + j - row] = 0;
        rightDiagonalAttack[j + row] = 0;
      }
    }
  }
  backtrack(0);
  return result;
  // console.log({ board, columnAttack, leftDiagonalAttack, rightDiagonalAttack });
}
function nQueensOptimized(n) {
  const board = Array.from({ length: n }, () => new Array(n).fill("."));
  const result = [];
  const columnAttack = new Array(n).fill(false);
  const leftDiagonalAttack = new Array(2 * n - 1).fill(false); // ↗↙ diagonals
  const rightDiagonalAttack = new Array(2 * n - 1).fill(false); // ↖↘ diagonals

  function backtrack(row) {
    // Base Case: All queens placed
    if (row === n) {
      const solution = board.map((rowArr) => rowArr.join(""));
      result.push(solution);
      return;
    }

    for (let col = 0; col < n; col++) {
      // leftDiagonal = col - row to make it an index from 0 add n(number of rows/cols) - 1;
      const leftDiagIndex = n - 1 + col - row; // ↗↙ diagonal
      const rightDiagIndex = row + col; // ↖↘ diagonal

      if (
        !columnAttack[col] &&
        !leftDiagonalAttack[leftDiagIndex] &&
        !rightDiagonalAttack[rightDiagIndex]
      ) {
        // Place queen
        board[row][col] = "Q";
        columnAttack[col] = true;
        leftDiagonalAttack[leftDiagIndex] = true;
        rightDiagonalAttack[rightDiagIndex] = true;

        // Recurse
        backtrack(row + 1);

        // Backtrack
        board[row][col] = ".";
        columnAttack[col] = false;
        leftDiagonalAttack[leftDiagIndex] = false;
        rightDiagonalAttack[rightDiagIndex] = false;
      }
    }
  }

  backtrack(0);
  return result;
}

console.log(JSON.stringify(nQueensOpt(4), null, 2));
