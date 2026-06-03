/*
1074. Number of Submatrices That Sum to Target
Hard
Topics
Companies
Hint
Given a matrix and a target, return the number of non-empty submatrices that sum to target.

A submatrix x1, y1, x2, y2 is the set of all cells matrix[x][y] with x1 <= x <= x2 and y1 <= y <= y2.

Two submatrices (x1, y1, x2, y2) and (x1', y1', x2', y2') are different if they have some coordinate that is different: for example, if x1 != x1'.

 

Example 1:


Input: matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
Output: 4
Explanation: The four 1x1 submatrices that only contain 0.
Example 2:

Input: matrix = [[1,-1],[-1,1]], target = 0
Output: 5
Explanation: The two 1x2 submatrices, plus the two 2x1 submatrices, plus the 2x2 submatrix.
Example 3:

Input: matrix = [[904]], target = 0
Output: 0
 

Constraints:

1 <= matrix.length <= 100
1 <= matrix[0].length <= 100
-1000 <= matrix[i] <= 1000
-10^8 <= target <= 10^8
*/

// ========================================================================
// 1. Best and Optimal
// ========================================================================

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function (matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let count = 0;

  for (let r1 = 0; r1 < rows; r1++) {
    // Int32Array is faster and automatically initialized to 0
    const colSums = new Int32Array(cols);

    for (let r2 = r1; r2 < rows; r2++) {
      // Update the vertical "squashed" sums
      for (let c = 0; c < cols; c++) {
        colSums[c] += matrix[r2][c];
      }

      // 1D Subarray sum logic using a Map
      const map = new Map();
      map.set(0, 1);

      let currentPrefixSum = 0;
      for (let c = 0; c < cols; c++) {
        currentPrefixSum += colSums[c];

        const complement = currentPrefixSum - target;
        if (map.has(complement)) {
          count += map.get(complement);
        }

        map.set(currentPrefixSum, (map.get(currentPrefixSum) || 0) + 1);
      }
    }
  }

  return count;
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function (matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let count = 0;

  // r1 is the starting (top) row of our submatrix range
  for (let r1 = 0; r1 < rows; r1++) {
    // This array stores the sum of elements for each column
    // between the current row r1 and row r2
    const colSums = new Array(cols).fill(0);

    // r2 is the ending (bottom) row of our submatrix range
    for (let r2 = r1; r2 < rows; r2++) {
      // Step 1: Update colSums for the current row r2
      // We add the values of the new row into our "squashed" 1D array
      for (let c = 0; c < cols; c++) {
        colSums[c] += matrix[r2][c];
      }

      // Step 2: Find how many subarrays in colSums equal the target
      // This is the standard 1D Prefix Sum + Hash Map logic
      const map = new Map();
      map.set(0, 1); // Base case: a prefix sum of 0 seen once

      let currentPrefixSum = 0;
      for (let c = 0; c < cols; c++) {
        currentPrefixSum += colSums[c];

        // If (currentPrefixSum - target) exists in map,
        // it means a sub-segment sums to the target
        const complement = currentPrefixSum - target;
        if (map.has(complement)) {
          count += map.get(complement);
        }

        // Update the frequency of the current prefix sum
        map.set(currentPrefixSum, (map.get(currentPrefixSum) || 0) + 1);
      }
    }
  }

  return count;
};

var numSubmatrixSumTarget = function (matrix, target) {
  const m = matrix.length;
  const n = matrix[0].length;
  let result = 0;

  for (let top = 0; top < m; top++) {
    const colSum = new Array(n).fill(0);
    for (let bottom = top; bottom < m; bottom++) {
      for (let j = 0; j < n; j++) {
        colSum[j] += matrix[bottom][j];
      }

      const map = new Map();
      map.set(0, 1);
      let prefixSum = 0;
      for (let j = 0; j < n; j++) {
        prefixSum += colSum[j];
        const need = prefixSum - target;
        if (map.has(need)) {
          result += map.get(need);
        }
        map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
      }
    }
  }

  return result;
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function (matrix, target) {
  let R = matrix.length;
  let C = matrix[0].length;
  let count = 0;

  // OPTIMIZATION 1: Dimension Swapping
  // If rows > columns, we swap the logic to iterate C^2 * R
  // This reduces the number of Map creations and outer loop iterations.
  const swap = R > C;
  const outerLimit = swap ? C : R;
  const innerLimit = swap ? R : C;

  // OPTIMIZATION 2: Map Reuse
  // Create one map and clear it to avoid GC (Garbage Collection) pressure
  const map = new Map();

  for (let i = 0; i < outerLimit; i++) {
    const sums = new Int32Array(innerLimit);

    for (let j = i; j < outerLimit; j++) {
      let currentPrefixSum = 0;

      // Reuse the same map object
      map.clear();
      map.set(0, 1);

      for (let k = 0; k < innerLimit; k++) {
        // Update sums based on whether we swapped dimensions
        sums[k] += swap ? matrix[k][j] : matrix[j][k];

        currentPrefixSum += sums[k];

        const complement = currentPrefixSum - target;
        if (map.has(complement)) {
          count += map.get(complement);
        }

        map.set(currentPrefixSum, (map.get(currentPrefixSum) || 0) + 1);
      }
    }
  }

  return count;
};

// ========================================================================
// 1. SECTION NAME
// ========================================================================

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function (matrix, target) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  // Step 1: Precompute prefix sums for each column
  // matrix[r][c] will now store the sum of all elements in column c from row 0 to r
  for (let r = 1; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      matrix[r][c] += matrix[r - 1][c];
    }
  }

  let count = 0;

  // Step 2: Iterate through all pairs of rows (r1, r2)
  for (let r1 = 0; r1 < rows; r1++) {
    for (let r2 = r1; r2 < rows; r2++) {
      // Map to store (prefix sum -> frequency)
      const map = new Map();
      // Base case: a prefix sum of 0 has occurred once
      map.set(0, 1);

      let currentSum = 0;

      // Step 3: Iterate through columns and treat this as a 1D subarray sum problem
      for (let c = 0; c < cols; c++) {
        // Get the sum of elements in column 'c' between row r1 and r2
        let colSum = matrix[r2][c] - (r1 > 0 ? matrix[r1 - 1][c] : 0);

        currentSum += colSum;

        // If (currentSum - target) exists in map, it means we found submatrices
        if (map.has(currentSum - target)) {
          count += map.get(currentSum - target);
        }

        // Update the map with the current prefix sum
        map.set(currentSum, (map.get(currentSum) || 0) + 1);
      }
    }
  }

  return count;
};

// ========================================================================
// 3. Brute Force
// ========================================================================

function submatricesSum(matrix, k) {
  let n = matrix.length,
    m = matrix[0].length;
  let result = 0;
  // sr => starting row, sc => starting col, er = ending row ec = ending col
  for (let sr = 0; sr < n; sr++) {
    for (let sc = 0; sc < m; sc++) {
      for (let er = sr; er < n; er++) {
        for (let ec = sc; ec < m; ec++) {
          let sum = 0;
          for (let i = sr; i <= er; i++) {
            for (let j = sc; j <= ec; j++) {
              sum += matrix[i][j];
            }
          }
          if (sum === k) result++;
        }
      }
    }
  }
  return result;
}
let matrix = [
  [1, -1],
  [-1, 1],
];
console.log(submatricesSum(matrix, 0));
