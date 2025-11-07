/*
54. Spiral Matrix
Medium
Topics
premium lock icon
Companies
Hint
Given an m x n matrix, return all elements of the matrix in spiral order.

 

Example 1:


Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
Example 2:


Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
 

Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 10
-100 <= matrix[i][j] <= 100
*/

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
  // Step 1: Initialize boundaries
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  const result = [];

  // Step 2: Traverse while boundaries are valid
  while (top <= bottom && left <= right) {
    // Traverse from left → right
    for (let col = left; col <= right; col++) {
      result.push(matrix[top][col]);
    }
    top++; // move top boundary inward

    // Traverse from top → bottom
    for (let row = top; row <= bottom; row++) {
      result.push(matrix[row][right]);
    }
    right--; // move right boundary inward

    // Traverse from right → left (check boundaries)
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        result.push(matrix[bottom][col]);
      }
      bottom--; // move bottom boundary inward
    }

    // Traverse from bottom → top (check boundaries)
    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        result.push(matrix[row][left]);
      }
      left++; // move left boundary inward
    }
  }

  return result;
}

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

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

/*
#Plan:
1. Problem Understanding:
   - We need to traverse a 2D matrix in spiral order: right → down → left → up
   - The spiral starts from the top-left corner and moves inward layer by layer
   - We need to return all elements in the order they are visited

2. Approach:
   - Use four boundaries: top, bottom, left, right
   - Traverse in four directions repeatedly until all elements are visited
   - After each complete cycle (right→down→left→up), move boundaries inward

3. Algorithm Steps:
   a. Initialize boundaries: top = 0, bottom = m-1, left = 0, right = n-1
   b. While top <= bottom and left <= right:
        i. Traverse from left to right along top row
        ii. Traverse from top+1 to bottom along right column  
        iii. If top < bottom, traverse from right-1 to left along bottom row
        iv. If left < right, traverse from bottom-1 to top+1 along left column
   c. Move boundaries inward: top++, bottom--, left++, right--

4. Directions:
   - Right: left → right (top row)
   - Down: top+1 → bottom (right column)
   - Left: right-1 → left (bottom row) 
   - Up: bottom-1 → top+1 (left column)

5. Edge Cases:
   - Single row matrix
   - Single column matrix
   - 1x1 matrix
   - Rectangular matrices (m != n)

6. Complexity:
   - Time: O(m * n) - we visit each element exactly once
   - Space: O(1) excluding output array, O(m*n) for output
*/

var spiralOrder = function (matrix) {
  const result = [];
  if (!matrix.length || !matrix[0].length) return result;

  const m = matrix.length;
  const n = matrix[0].length;

  let top = 0,
    bottom = m - 1;
  let left = 0,
    right = n - 1;

  while (top <= bottom && left <= right) {
    // Traverse from left to right along top row
    for (let i = left; i <= right; i++) {
      result.push(matrix[top][i]);
    }
    top++;

    // Traverse from top to bottom along right column
    for (let i = top; i <= bottom; i++) {
      result.push(matrix[i][right]);
    }
    right--;

    // Traverse from right to left along bottom row (if still within bounds)
    if (top <= bottom) {
      for (let i = right; i >= left; i--) {
        result.push(matrix[bottom][i]);
      }
      bottom--;
    }

    // Traverse from bottom to top along left column (if still within bounds)
    if (left <= right) {
      for (let i = bottom; i >= top; i--) {
        result.push(matrix[i][left]);
      }
      left++;
    }
  }

  return result;
};

// Alternative implementation with direction tracking
var spiralOrderDirection = function (matrix) {
  const result = [];
  if (!matrix.length || !matrix[0].length) return result;

  const m = matrix.length;
  const n = matrix[0].length;
  const visited = new Array(m).fill(0).map(() => new Array(n).fill(false));

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ]; // right, down, left, up
  let dir = 0; // start with right direction

  let row = 0,
    col = 0;

  for (let i = 0; i < m * n; i++) {
    result.push(matrix[row][col]);
    visited[row][col] = true;

    // Calculate next position
    let nextRow = row + directions[dir][0];
    let nextCol = col + directions[dir][1];

    // If next position is out of bounds or already visited, change direction
    if (
      nextRow < 0 ||
      nextRow >= m ||
      nextCol < 0 ||
      nextCol >= n ||
      visited[nextRow][nextCol]
    ) {
      dir = (dir + 1) % 4;
      nextRow = row + directions[dir][0];
      nextCol = col + directions[dir][1];
    }

    row = nextRow;
    col = nextCol;
  }

  return result;
};

// Custom Test Cases
console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);
// Expected: [1,2,3,6,9,8,7,4,5]

console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ])
);
// Expected: [1,2,3,4,8,12,11,10,9,5,6,7]

console.log(spiralOrder([[1]]));
// Expected: [1]

console.log(spiralOrder([[1, 2, 3]]));
// Expected: [1,2,3]

console.log(spiralOrder([[1], [2], [3]]));
// Expected: [1,2,3]

console.log(
  spiralOrder([
    [1, 2],
    [3, 4],
    [5, 6],
  ])
);
// Expected: [1,2,4,6,5,3]

console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
  ])
);
// Expected: [1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]

/*
Commit Message:
Implement spiral matrix traversal using boundary tracking
  - Used four boundaries (top, bottom, left, right) to track current spiral layer
  - Traversed in four directions: right, down, left, up in sequence
  - Moved boundaries inward after each complete cycle
  - Handled edge cases including single row, single column, and square matrices
  - Added comprehensive test cases to verify correctness
  - Solution efficiently visits each element exactly once with O(m*n) time complexity
*/

let matrix = [
  [3, 4, 5, 6],
  [9, 7, 1, 2],
  [6, 9, 5, 3],
  [5, 11, 8, 1],
];
console.log(spiralPrint(matrix));
