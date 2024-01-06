/* 
    Index = row-index * number-of-columns + column-index
    Row Major
    if an index of a matrix is given we can find out the row-number by dividing the index with the total number column
    row-index = index / col 
    Column Major
    if an index of a matrix is given and number of columns are given we can find out column-number by modulus index with total numbers of column
    col-index = index % col
*/

function binarySearch(matrix, target) {
  let nRows = matrix.length,
    nCols = matrix[0].length,
    totalIndices = nCols * nRows - 1,
    start = 0,
    end = totalIndices;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    let rowIndex = parseInt(mid / nCols);
    let colIndex = mid % nCols;
    if (matrix[rowIndex][colIndex] === target) return true;
    if (matrix[rowIndex][colIndex] < target) start = mid + 1;
    else end = mid - 1;
  }
  return false;
}

let matrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];
let target = 26;
console.log(binarySearch(matrix, target));

/* Search row wise using binary search */

// function binarySearchRowWise(matrix, target) {
//   let nRows = matrix.length,
//     nCols = matrix[0].length;
//   for (let row = 0; row < nRows; row++) {
//     if (matrix[row][0] <= target && target <= matrix[row][nCols - 1]) {
//       let start = 0,
//         end = nCols - 1;
//       while (start <= end) {
//         let mid = parseInt((start + end) / 2);
//         console.log({ row, start, end, mid });
//         if (matrix[row][mid] === target) return true;
//         if (matrix[row][mid] < target) start = mid + 1;
//         else end = mid - 1;
//       }
//     }
//   }
//   return false;
// }
