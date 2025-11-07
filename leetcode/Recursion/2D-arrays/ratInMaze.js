/*
Consider a rat placed at position (0, 0) in an n x n square matrix mat[][]. The rat's goal is to reach the destination at position (n-1, n-1). The rat can move in four possible directions: 'U'(up), 'D'(down), 'L' (left), 'R' (right).

The matrix contains only two possible values:

0: A blocked cell through which the rat cannot travel.
1: A free cell that the rat can pass through.
Your task is to find all possible paths the rat can take to reach the destination, starting from (0, 0) and ending at (n-1, n-1), under the condition that the rat cannot revisit any cell along the same path. Furthermore, the rat can only move to adjacent cells that are within the bounds of the matrix and not blocked.
If no path exists, return an empty list.

Note: Return the final result vector in lexicographically smallest order.

Examples:

Input: mat[][] = [[1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1]]
Output: ["DDRDRR", "DRDDRR"]
Explanation: The rat can reach the destination at (3, 3) from (0, 0) by two paths - DRDDRR and DDRDRR, when printed in sorted order we get DDRDRR DRDDRR.
Input: mat[][] = [[1, 0], [1, 0]]
Output: []
Explanation: No path exists as the destination cell is blocked.
Input: mat = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
Output: ["DDRR", "RRDD"]
Explanation: The rat has two possible paths to reach the destination: 1. "DDRR" 2. "RRDD", These are returned in lexicographically sorted order.
Constraints:
2 ≤ mat.size() ≤ 5
0 ≤ mat[i][j] ≤ 1
*/
function ratInMaze(matrix) {
  let n = matrix.length;
  let row = 0;
  let column = 0;
  let result = [];
  let visited = Array.from({ length: n }, () => new Array(n).fill(0));

  function valid(row, column, n) {
    return row >= 0 && column >= 0 && row <= n - 1 && column <= n - 1;
  }

  function total(matrix, row, column, result, visited, path = []) {
    // base case
    if (row === n - 1 && column === n - 1) {
      // result.push([...path].join(""));
      result.push(path.join("")); // same as above
      return;
    }

    // recursive case
    visited[row][column] = 1;

    // Going Up
    if (
      valid(row - 1, column, n) &&
      matrix[row - 1][column] &&
      !visited[row - 1][column]
    ) {
      path.push("U");
      total(matrix, row - 1, column, result, visited, path);
      path.pop("U");
    }
    // Going Down

    if (
      valid(row + 1, column, n) &&
      matrix[row + 1][column] &&
      !visited[row + 1][column]
    ) {
      path.push("D");
      total(matrix, row + 1, column, result, visited, path);

      path.pop("D");
    }
    // Going Left

    if (
      valid(row, column - 1, n) &&
      matrix[row][column - 1] &&
      !visited[row][column - 1]
    ) {
      path.push("L");
      total(matrix, row, column - 1, result, visited, path);
      path.pop("L");
    }
    // Going Right

    if (
      valid(row, column + 1, n) &&
      matrix[row][column + 1] &&
      !visited[row][column + 1]
    ) {
      path.push("R");
      total(matrix, row, column + 1, result, visited, path);

      path.pop("R");
    }

    visited[row][column] = 0;
  }
  total(matrix, row, column, result, visited);
  return result;
}

function ratInMazeWithLexicographicOrder(matrix) {
  let n = matrix.length;
  let row = 0;
  let column = 0;
  let result = [];
  let visited = Array.from({ length: n }, () => new Array(n).fill(0));

  function valid(row, column, n) {
    return row >= 0 && column >= 0 && row <= n - 1 && column <= n - 1;
  }

  function total(matrix, row, column, result, visited, path = []) {
    // Check if current cell is valid and not blocked
    if (
      !valid(row, column, n) ||
      matrix[row][column] === 0 ||
      visited[row][column] === 1
    ) {
      return;
    }

    // base case - reached destination
    if (row === n - 1 && column === n - 1) {
      result.push(path.join("")); // Join the path array to form string
      return;
    }

    // recursive case
    visited[row][column] = 1; // Mark current cell as visited

    // Try all directions in specific order for lexicographical result

    // 1. Down - 'D' comes first lexicographically
    path.push("D");
    total(matrix, row + 1, column, result, visited, path);
    path.pop();

    // 2. Left - 'L' comes next
    path.push("L");
    total(matrix, row, column - 1, result, visited, path);
    path.pop();

    // 3. Right - 'R' comes next
    path.push("R");
    total(matrix, row, column + 1, result, visited, path);
    path.pop();

    // 4. Up - 'U' comes last lexicographically
    path.push("U");
    total(matrix, row - 1, column, result, visited, path);
    path.pop();

    visited[row][column] = 0; // Backtrack - unmark current cell
  }

  // Check if start or end is blocked
  if (matrix[0][0] === 1 && matrix[n - 1][n - 1] === 1) {
    total(matrix, row, column, result, visited);
  }

  return result.sort(); // Return sorted for lexicographical order
}

function ratInMazeRefactored(matrix) {
  const n = matrix.length;
  const visited = Array.from({ length: n }, () => new Array(n).fill(0));
  let i = 0;
  let j = 0;
  const row = [-1, 1, 0, 0]; // U, D, L, R row movements
  const column = [0, 0, -1, 1]; // U, D, L, R column movements
  const dir = "UDLR"; // Corresponding directions
  const result = [];

  function valid(row, column, n) {
    return row >= 0 && column >= 0 && row <= n - 1 && column <= n - 1;
  }

  function total(i, j, path = []) {
    if (i === n - 1 && j === n - 1) {
      result.push(path.join(""));
      return;
    }

    visited[i][j] = 1;

    for (let k = 0; k < 4; k++) {
      if (
        valid(i + row[k], j + column[k], n) &&
        matrix[i + row[k]][j + column[k]] &&
        !visited[i + row[k]][j + column[k]]
      ) {
        path.push(dir[k]);
        total(i + row[k], j + column[k], path);
        path.pop(dir[k]);
      }
    }
    visited[i][j] = 0;
  }
  total(i, j, []);
  return result.sort();
}

console.log(
  ratInMazeRefactored([
    [1, 0, 0, 0],
    [1, 1, 0, 1],
    [1, 1, 0, 0],
    [0, 1, 1, 1],
  ])
);
