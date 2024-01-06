function diagonalSum(matrix) {
  let n = matrix.length,
    m = matrix[0].length,
    first = 0;
  second = 0;
  for (let row = 0; row < m; row++) {
    first += matrix[row][row];
  }

  let row = 0,
    col = m - 1;
  while (row < n && col >= 0) {
    second += matrix[row][col];
    row++;
    col--;
  }

  return { first, second };
}
let matrix = [
  [3, 4, 5, 6],
  [9, 7, 1, 2],
  [6, 9, 5, 3],
  [5, 11, 8, 1],
];
console.log(diagonalSum(matrix));
