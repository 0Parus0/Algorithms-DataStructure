function maxRowSum(arr) {
  let n = arr.length,
    m = arr[0].length,
    sum = -Infinity,
    index = -1;
  for (let row = 0; row < n; row++) {
    let total = 0;
    for (let col = 0; col < m; col++) {
      total += arr[row][col];
    }
    if (sum < total) {
      sum = total;
      index = row;
    }
  }
  return { sum, index };
}
let arr = [
  [3, 4, 5, 1],
  [9, 7, 1, 2],
  [6, 9, 5, 3],
  [5, 11, 8, 1],
];
console.log(maxRowSum(arr));
