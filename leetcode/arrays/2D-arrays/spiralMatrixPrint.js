function spiralPrint(matrix) {
  let nRows = matrix.length,
    nCols = matrix[0].length,
    top = 0,
    right = nCols - 1,
    bottom = nRows - 1,
    left = 0,
    result = [];
  console.log({ top, bottom, left, right });
  while (top <= bottom && left <= right) {
    // print top
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col]);
    }
    top++;
    // print right;
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
    }
    right--;
    // print bottom
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        result.push(matrix[bottom][col]);
      }
      bottom--;
    }
    // print left
    if (left <= right) {
      for (let col = bottom; col >= top; col--) {
        result.push(matrix[col][left]);
      }
      left++;
    }
  }
  return result;
}

let matrix = [
  [3, 4, 5, 6],
  [9, 7, 1, 2],
  [6, 9, 5, 3],
  [5, 11, 8, 1],
];
console.log(spiralPrint(matrix));
