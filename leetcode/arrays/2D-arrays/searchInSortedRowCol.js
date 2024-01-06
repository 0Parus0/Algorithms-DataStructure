function binarySearchSortedRowsCols(matrix, target) {
  let nRows = matrix.length,
    nCols = matrix[0].length,
    row = 0,
    col = nCols - 1;
  while (row < nRows && col >= 0) {
    if (matrix[row][col] === target) return true;
    if (matrix[row][col] < target) row++;
    else col--;
  }

  return false;
}
let matrix = [
  [4, 8, 15, 25, 60],
  [18, 22, 26, 42, 80],
  [36, 40, 45, 68, 104],
  [48, 50, 72, 83, 130],
  [70, 99, 114, 128, 170],
];
target = 50;
console.log(binarySearchSortedRowsCols(matrix, target));
