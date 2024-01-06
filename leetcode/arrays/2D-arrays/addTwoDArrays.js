function addTwoArr(arr1, arr2) {
  let n = arr1.length;
  let m = arr1[0].length;
  let result = Array.from({ length: n }, (el) => []);
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < m; col++) {
      let el = arr1[row][col] + arr2[row][col];
      result[row][col] = el;
    }
  }
  return result;
}

let arr1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
let arr2 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
];
console.log(addTwoArr(arr1, arr2));
