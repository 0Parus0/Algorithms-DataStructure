/*
You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

 

Example 1:


Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
Example 2:


Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
 

Constraints:

n == matrix.length == matrix[i].length
1 <= n <= 20
-1000 <= matrix[i][j] <= 1000
*/
function rotateImage(matrix) {
  transpose(matrix);
  rowReverse(matrix);
  return matrix;
}

function transpose(matrix) {
  let nRows = matrix.length,
    nCols = matrix[0].length;
  for (let row = 0; row < nRows - 1; row++) {
    for (let col = row + 1; col < nCols; col++) {
      [matrix[row][col], matrix[col][row]] = [
        matrix[col][row],
        matrix[row][col],
      ];
    }
  }
  return matrix;
}

function rowReverse(matrix) {
  let nRows = matrix.length,
    nCols = matrix[0].length;
  for (let row = 0; row < nRows; row++) {
    let start = 0,
      end = nCols - 1;
    while (start < end) {
      [matrix[row][start], matrix[row][end]] = [
        matrix[row][end],
        matrix[row][start],
      ];
      start++, end--;
    }
  }
  return matrix;
}

function colReverse(matrix) {
  let nRows = matrix.length,
    nCols = matrix[0].length;
  for (let col = 0; col < nCols; col++) {
    let start = 0,
      end = nRows - 1;
    while (start < end) {
      [matrix[start][col], matrix[end][col]] = [
        matrix[end][col],
        matrix[start][col],
      ];
      start++, end--;
    }
  }
  return matrix;
}

function rotateAntiClockWise90Degree(matrix) {
  transpose(matrix);
  colReverse(matrix);
  return matrix;
}
let matrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];
// console.log(rotateImage(matrix));
console.log(rotateAntiClockWise90Degree(matrix));
