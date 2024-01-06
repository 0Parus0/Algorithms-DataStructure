function transpose(matrix) {
  let nRows = matrix.length,
    nCols = matrix[0].length;
  //   for (let row = 0; row < nRows - 1; row++) {
  //     for (let col = row + 1; col < nCols; col++) {
  //       [matrix[row][col], matrix[col][row]] = [
  //         matrix[col][row],
  //         matrix[row][col],
  //       ];
  //       //   console.log(matrix);
  //     }
  //   }
  for (let row = 1; row < nRows; row++) {
    for (let col = 0; col <= row; col++) {
      [matrix[row][col], matrix[col][row]] = [
        matrix[col][row],
        matrix[row][col],
      ];
    }
  }
  return matrix;
}
let matrix = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
  [21, 22, 23, 24, 25],
];
try {
  console.log(transpose(matrix));
} catch (error) {
  console.log(error);
}
