/*
Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's.

You must do it in place.

 

Example 1:


Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]
Output: [[1,0,1],[0,0,0],[1,0,1]]
Example 2:


Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
Output: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]
 

Constraints:

m == matrix.length
n == matrix[0].length
1 <= m, n <= 200
-231 <= matrix[i][j] <= 231 - 1
 

Follow up:

A straightforward solution using O(mn) space is probably a bad idea.
A simple improvement uses O(m + n) space, but still not the best solution.
Could you devise a constant space solution?
*/

/* Optimal */

function setMatrixZero(matrix) {
  let nRows = matrix.length,
    nCols = matrix[0].length,
    col0 = 1;
  for (let row = 0; row < nRows; row++) {
    for (let col = 0; col < nCols; col++) {
      if (matrix[row][col] === 0) {
        // mark the i-th row
        matrix[row][0] = 0;
        // mark the j-th col
        if (col !== 0) {
          matrix[0][col] = 0;
        } else col0 = 0;
      }
    }
  }

  for (let row = 1; row < nRows; row++) {
    for (let col = 1; col < nCols; col++) {
      // check for col & row
      if (matrix[0][col] === 0 || matrix[row][0] === 0) {
        matrix[row][col] = 0;
      }
    }
  }
  if (matrix[0][0] === 0) {
    for (let col = 0; col < nCols; col++) {
      matrix[0][col] = 0;
    }
  }
  if (col0 === 0) {
    for (let row = 0; row < nRows; row++) {
      matrix[row][0] = 0;
    }
  }
  return matrix;
}

/* Using Extra Space */

// function setMatrixZeroExArrs(matrix) {
//   let nRows = matrix.length,
//     nCols = matrix[0].length,
//     rowArr = Array.from({ length: nRows }, (el) => (el = true)),
//     colArr = Array.from({ length: nCols }, (el) => (el = true));
//   for (let row = 0; row < nRows; row++) {
//     for (let col = 0; col < nCols; col++) {
//       if (matrix[row][col] === 0) {
//         rowArr[row] = false;
//         colArr[col] = false;
//       }
//     }
//   }
//   for (let row = 0; row < nRows; row++) {
//     for (let col = 0; col < nCols; col++) {
//       if (!rowArr[row] || !colArr[col]) {
//         matrix[row][col] = 0;
//       }
//     }
//   }
//   return matrix;
// }

/* Brute Force */

// function setMatrixZeroBF(matrix) {
//   let nRows = matrix.length,
//     nCols = matrix[0].length;
//   for (let row = 0; row < nRows; row++) {
//     for (let col = 0; col < nCols; col++) {
//       if (matrix[row][col] === 0) {
//         markRow(row, nCols, matrix);
//         markCol(col, nRows, matrix);
//       }
//     }
//   }

//   for (let row = 0; row < nRows; row++) {
//     for (let col = 0; col < nCols; col++) {
//       if (matrix[row][col] === -Infinity) {
//         matrix[row][col] = 0;
//       }
//     }
//   }
//   return matrix;
// }

// function markCol(col, nRows, matrix) {
//   for (let row = 0; row < nRows; row++) {
//     if (matrix[row][col] !== 0) matrix[row][col] = -Infinity;
//   }
//   return matrix;
// }

// function markRow(row, nCols, matrix) {
//   for (let col = 0; col < nCols; col++) {
//     if (matrix[row][col] !== 0) matrix[row][col] = -Infinity;
//   }
//   return matrix;
// }
let matrix = [
  [9, 1, 2, 0],
  [0, 4, 5, 2],
  [1, 3, 1, 5],
];
console.log(setMatrixZero(matrix));
