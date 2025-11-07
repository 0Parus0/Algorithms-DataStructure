/*
Replace O's with X's
Difficulty: MediumAccuracy: 34.0%Submissions: 124K+Points: 4Average Time: 20m
Given a matrix mat where every element is either 'O' or 'X'. Replace all 'O' or a group of 'O' with 'X' that are surrounded by 'X'.

A 'O' (or a set of 'O') is considered to be surrounded by 'X' if there are 'X' at locations just below, just above, just left and just right of it.

Examples:

Input: mat = 
[['X', 'X', 'X', 'X'], 
['X', 'O', 'X', 'X'], 
['X', 'O', 'O', 'X'], 
['X', 'O', 'X', 'X'], 
['X', 'X', 'O', 'O']]
Output: 
[['X', 'X', 'X', 'X'], 
['X', 'X', 'X', 'X'], 
['X', 'X', 'X', 'X'], 
['X', 'X', 'X', 'X'], 
['X', 'X', 'O', 'O']]
Explanation: We only changed those 'O' that are surrounded by 'X'
Input: mat = 
[['X', 'O', 'X', 'X'], 
['X', 'O', 'X', 'X'], 
['X', 'O', 'O', 'X'], 
['X', 'O', 'X', 'X'], 
['X', 'X', 'O', 'O']]
Output: 
[['X', 'O', 'X', 'X'], 
['X', 'O', 'X', 'X'], 
['X', 'O', 'O', 'X'], 
['X', 'O', 'X', 'X'], 
['X', 'X', 'O', 'O']]
Explanation: There's no 'O' that's surround by 'X'.
Input: mat = 
[['X', 'X', 'X'], 
['X', 'O', 'X'], 
['X', 'X', 'X']]
Output: 
[['X', 'X', 'X'], 
['X', 'X', 'X'], 
['X', 'X', 'X']]
Explanation: There's only one 'O' that's surround by 'X'.
Constraints:
1 ≤ mat.size() ≤ 100
1 ≤ mat[0].size() ≤ 100
*/

function replaceSurrounded(mat) {
  if (!mat.length) return mat;
  const r = mat.length;
  const c = mat[0].length;

  const queue = [];
  const row = [1, -1, 0, 0];
  const column = [0, 0, 1, -1];

  function valid(i, j) {
    return i >= 0 && i < r && j >= 0 && j < c;
  }

  // First row
  for (let j = 0; j < c; j++) {
    if (mat[0][j] === "O") {
      queue.push([0, j]);
      mat[0][j] = "T";
    }
  }

  // First column

  for (let i = 1; i < r; i++) {
    if (mat[i][0] === "O") {
      queue.push([i, 0]);
      mat[i][0] = "T";
    }
  }

  // Last row
  for (let j = 1; j < c; j++) {
    if (mat[r - 1][j] === "O") {
      queue.push([r - 1, j]);
      mat[r - 1][j] = "T";
    }
  }

  for (let i = 1; i < r - 1; i++) {
    if (mat[i][c - 1] === "O") {
      queue.push([i, c - 1]);
      mat[i][c - 1] = "T";
    }
  }

  while (queue.length > 0) {
    let [i, j] = queue.shift();

    for (let k = 0; k < 4; k++) {
      if (
        valid(i + row[k], j + column[k]) &&
        mat[i + row[k]][j + column[k]] === "O"
      ) {
        mat[i + row[k]][j + column[k]] = "T";
        queue.push([i + row[k], j + column[k]]);
      }
    }
  }

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (mat[i][j] === "O") {
        mat[i][j] = "X";
      }
      if (mat[i][j] === "T") {
        mat[i][j] = "O";
      }
    }
  }

  return mat;
}

function replaceSurrounded(mat) {
  if (!mat.length) return mat;
  const r = mat.length;
  const c = mat[0].length;

  const queue = [];
  const row = [1, -1, 0, 0];
  const column = [0, 0, 1, -1];

  function valid(i, j) {
    return i >= 0 && i < r && j >= 0 && j < c;
  }

  // Step 1: Collect boundary O's
  for (let i = 0; i < r; i++) {
    for (let j of [0, c - 1]) {
      if (mat[i][j] === "O") {
        mat[i][j] = "T";
        queue.push([i, j]);
      }
    }
  }
  for (let j = 0; j < c; j++) {
    for (let i of [0, r - 1]) {
      if (mat[i][j] === "O") {
        mat[i][j] = "T";
        queue.push([i, j]);
      }
    }
  }

  // Step 2: BFS from boundary O's
  while (queue.length > 0) {
    let [i, j] = queue.shift();
    for (let k = 0; k < 4; k++) {
      let ni = i + row[k],
        nj = j + column[k];
      if (valid(ni, nj) && mat[ni][nj] === "O") {
        mat[ni][nj] = "T";
        queue.push([ni, nj]);
      }
    }
  }

  // Step 3: Convert O → X, T → O
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (mat[i][j] === "O") mat[i][j] = "X";
      if (mat[i][j] === "T") mat[i][j] = "O";
    }
  }

  return mat;
}

function printMatrix(mat) {
  console.log(mat.map((row) => row.join(" ")).join("\n"));
  console.log("---------------");
}

let mat1 = [
  ["X", "X", "X", "X"],
  ["X", "O", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "O", "X", "X"],
  ["X", "X", "O", "O"],
];
console.log("Test 1:");
printMatrix(replaceSurrounded(mat1));
// Expected:
// X X X X
// X X X X
// X X X X
// X X X X
// X X O O

let mat2 = [
  ["X", "O", "X", "X"],
  ["X", "O", "X", "X"],
  ["X", "O", "O", "X"],
  ["X", "O", "X", "X"],
  ["X", "X", "O", "O"],
];
console.log("Test 2:");
printMatrix(replaceSurrounded(mat2));
// Expected (no surrounded O's):
// X O X X
// X O X X
// X O O X
// X O X X
// X X O O

let mat3 = [
  ["X", "X", "X"],
  ["X", "O", "X"],
  ["X", "X", "X"],
];
console.log("Test 3:");
printMatrix(replaceSurrounded(mat3));
// Expected:
// X X X
// X X X
// X X X

let mat4 = [
  ["O", "O", "O"],
  ["O", "O", "O"],
  ["O", "O", "O"],
];
console.log("Test 4:");
printMatrix(replaceSurrounded(mat4));
// Expected (all connected to border so none get replaced):
// O O O
// O O O
// O O O

let mat5 = [
  ["X", "X", "X", "X", "X"],
  ["X", "O", "O", "O", "X"],
  ["X", "O", "X", "O", "X"],
  ["X", "O", "O", "O", "X"],
  ["X", "X", "X", "X", "X"],
];
console.log("Test 5:");
printMatrix(replaceSurrounded(mat5));
// Expected (all inner O’s surrounded, should turn to X):
// X X X X X
// X X X X X
// X X X X X
// X X X X X
// X X X X X
