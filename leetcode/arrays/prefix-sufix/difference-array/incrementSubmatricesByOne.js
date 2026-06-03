/*
2536. Increment Submatrices by One
Medium
Topics
premium lock icon
Companies
Hint
You are given a positive integer n, indicating that we initially have an n x n 0-indexed integer matrix mat filled with zeroes.

You are also given a 2D integer array query. For each query[i] = [row1i, col1i, row2i, col2i], you should do the following operation:

Add 1 to every element in the submatrix with the top left corner (row1i, col1i) and the bottom right corner (row2i, col2i). That is, add 1 to mat[x][y] for all row1i <= x <= row2i and col1i <= y <= col2i.
Return the matrix mat after performing every query.

 

Example 1:


Input: n = 3, queries = [[1,1,2,2],[0,0,1,1]]
Output: [[1,1,0],[1,2,1],[0,1,1]]
Explanation: The diagram above shows the initial matrix, the matrix after the first query, and the matrix after the second query.
- In the first query, we add 1 to every element in the submatrix with the top left corner (1, 1) and bottom right corner (2, 2).
- In the second query, we add 1 to every element in the submatrix with the top left corner (0, 0) and bottom right corner (1, 1).
Example 2:


Input: n = 2, queries = [[0,0,1,1]]
Output: [[1,1],[1,1]]
Explanation: The diagram above shows the initial matrix and the matrix after the first query.
- In the first query we add 1 to every element in the matrix.
 

Constraints:

1 <= n <= 500
1 <= queries.length <= 104
0 <= row1i <= row2i < n
0 <= col1i <= col2i < n
*/

var rangeAddQueries = function (n, queries) {
  const mat = Array.from({ length: n }, () => new Int32Array(n));

  for (const [r1, c1, r2, c2] of queries) {
    mat[r1][c1]++;

    // We must check if the "cancellation" index exists
    if (c2 + 1 < n) {
      mat[r1][c2 + 1]--;
    }

    if (r2 + 1 < n) {
      mat[r2 + 1][c1]--;
    }

    if (r2 + 1 < n && c2 + 1 < n) {
      mat[r2 + 1][c2 + 1]++;
    }
  }

  // Standard 2D Prefix Sum (Single Pass)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const top = i > 0 ? mat[i - 1][j] : 0;
      const left = j > 0 ? mat[i][j - 1] : 0;
      const diagonal = i > 0 && j > 0 ? mat[i - 1][j - 1] : 0;
      mat[i][j] += top + left - diagonal;
    }
  }

  return mat;
};

// ========================================================================
// 2. Using Difference Array Technique on Matrix (Normal 2D Array slow)
// ========================================================================
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function (n, queries) {
  // Difference matrix
  const mat = Array.from({ length: n }, () => new Array(n).fill(0));

  // Apply updates
  for (const [row1, col1, row2, col2] of queries) {
    for (let row = row1; row <= row2; row++) {
      mat[row][col1] += 1;

      if (col2 + 1 < n) {
        mat[row][col2 + 1] -= 1;
      }
    }
  }

  // Prefix sum on each row
  for (let row = 0; row < n; row++) {
    for (let col = 1; col < n; col++) {
      mat[row][col] += mat[row][col - 1];
    }
  }

  return mat;
};

// ========================================================================
// 1.  Brute Force (TLE)
// ========================================================================

/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function (n, queries) {
  // Create n x n matrix filled with 0
  const mat = Array.from({ length: n }, () => new Array(n).fill(0));

  // Process each query
  for (const [row1, col1, row2, col2] of queries) {
    // Visit every cell inside submatrix
    for (let row = row1; row <= row2; row++) {
      for (let col = col1; col <= col2; col++) {
        mat[row][col] += 1;
      }
    }
  }

  return mat;
};

// ========================================================================
// 3. Optimal and Best (using typed arrays)
// ========================================================================
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function (n, queries) {
  // 1. Create a difference matrix of size (n+1) x (n+1)
  // We use n+1 to avoid boundary checks for r2+1 and c2+1
  const diff = Array.from({ length: n + 1 }, () => new Int32Array(n + 1));

  // 2. Apply each query to the difference matrix in O(1)
  for (const [r1, c1, r2, c2] of queries) {
    diff[r1][c1]++;
    diff[r1][c2 + 1]--;
    diff[r2 + 1][c1]--;
    diff[r2 + 1][c2 + 1]++;
  }

  // 3. Compute the 2D Prefix Sum to get the final matrix
  // mat[i][j] = diff[i][j] + mat[i-1][j] + mat[i][j-1] - mat[i-1][j-1]
  const mat = Array.from({ length: n }, () => new Int32Array(n));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // Get values from the top, left, and diagonal (handling boundaries)
      const top = i > 0 ? mat[i - 1][j] : 0;
      const left = j > 0 ? mat[i][j - 1] : 0;
      const diagonal = i > 0 && j > 0 ? mat[i - 1][j - 1] : 0;

      // The value at mat[i][j] is the current diff + prefix sum logic
      mat[i][j] = diff[i][j] + top + left - diagonal;
    }
  }

  return mat;
};

var rangeAddQueries = function (n, queries) {
  const mat = Array.from({ length: n }, () => new Int32Array(n));

  for (const [r1, c1, r2, c2] of queries) {
    mat[r1][c1]++;

    if (c2 + 1 < n) {
      mat[r1][c2 + 1]--;
    }

    if (r2 + 1 < n) {
      mat[r2 + 1][c1]--;
    }

    if (r2 + 1 < n && c2 + 1 < n) {
      mat[r2 + 1][c2 + 1]++;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const top = i > 0 ? mat[i - 1][j] : 0;
      const left = j > 0 ? mat[i][j - 1] : 0;
      const diagonal = i > 0 && j > 0 ? mat[i - 1][j - 1] : 0;
      mat[i][j] += top + left - diagonal;
    }
  }

  return mat;
}; /**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function (n, queries) {
  // 1. Create the diff matrix (n+1 x n+1)
  const mat = Array.from({ length: n }, () => new Int32Array(n));

  // 2. Mark boundaries O(1)
  for (const [r1, c1, r2, c2] of queries) {
    mat[r1][c1]++;
    if (c2 + 1 < n) mat[r1][c2 + 1]--;
    if (r2 + 1 < n) mat[r2 + 1][c1]--;
    if (r2 + 1 < n && c2 + 1 < n) mat[r2 + 1][c2 + 1]++;
  }

  // 3. Compute Prefix Sum In-Place

  // Pass 1: Horizontal Prefix Sum (Row by Row)
  for (let i = 0; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      mat[i][j] += mat[i][j - 1];
    }
  }

  // Pass 2: Vertical Prefix Sum (Column by Column)
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= n; j++) {
      mat[i][j] += mat[i - 1][j];
    }
  }

  return mat;
};
