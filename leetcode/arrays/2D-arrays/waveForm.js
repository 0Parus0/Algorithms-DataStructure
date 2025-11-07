/*
Given a matrix mat[][], print it in Wave Form. 

Input: mat[][] = {{  1,   2,   3,   4}
                           {  5,   6,   7,   8}
                           {  9, 10, 11, 12}
                           {13, 14, 15, 16}
                           {17, 18, 19, 20}}
Output: 1 5 9 13 17 18 14 10 6 2 3 7 11 15 19 20 16 12 8 4 
Explanation: Output is printed in wave form. 

Input: mat[][] = {{1, 9,  4, 10}
                  {3, 6, 90, 11}
                  {2, 30, 85, 72}
                  {6, 31, 99, 15}} 
Output: 1 3 2 6 31 30 6 9 4 90 85 99 15 72 11 10

 
Approach: This problem is implementation-based and has a similar approach as discussed in this article. To get the desired waveform for a given matrix, first, print the elements of the first column of the matrix in the downward direction and then print the elements of the 2nd column in the upward direction, then print the elements in the third column in the downward direction and so on. 
*/

function wave(matrix) {
  let nRows = matrix.length,
    nCols = matrix[0].length;
  let result = Array.from({ length: nRows }, (el) => []);
  for (let col = 0; col < nCols; col++) {
    if (col % 2 === 0) {
      for (let row = 0; row < nRows; row++) {
        result[row][col] = matrix[col][row];
      }
    } else {
      for (let row = nRows - 1; row >= 0; row--) {
        result[row][col] = matrix[col][row];
      }
    }
  }
  return result;
}
let matrix = [
  [3, 4, 5, 1],
  [9, 7, 1, 2],
  [6, 9, 5, 3],
  [5, 11, 8, 1],
];
console.log(wave(matrix));
