function reverseMatrixRow(matrix) {
  let nRows = matrix.length,
    nCols = matrix[0].length;
  for (let row = 0; row < nRows; row++) {
    let start = 0,
      end = nCols - 1;
    while (start < end) {
      swap(matrix[row], start, end);
      //   console.log({ start, end });
      start++, end--;
    }
  }
  return matrix;
}

function swap(arr, start, end) {
  //   let temp = arr[start];
  //   arr[start] = arr[end];
  //   arr[end] = temp;
  [arr[start], arr[end]] = [arr[end], arr[start]];
}
let matrix = [
  [3, 4, 5, 1],
  [9, 7, 1, 2],
  [6, 9, 5, 3],
  [5, 11, 8, 1],
];

console.log(reverseMatrixRow(matrix));

// swapping two elements in a matrix
// [matrix[2][0], matrix[0][2]] = [matrix[0][2], matrix[2][0]];
// console.log(matrix);
