/*
Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

 

Example 1:


Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.
Example 2:

Input: matrix = [["0"]]
Output: 0
Example 3:

Input: matrix = [["1"]]
Output: 1
 

Constraints:

rows == matrix.length
cols == matrix[i].length
1 <= row, cols <= 200
matrix[i][j] is '0' or '1'.
*/

function maximalRectangle(matrix) {
  if (matrix.length === 0 || matrix[0].length === 0) return 0;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxArea = 0;

  // Create a heights array for histogram
  const heights = new Array(cols).fill(0);

  for (let i = 0; i < rows; i++) {
    // Update heights for current row
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] === "1") {
        heights[j] += 1;
      } else {
        heights[j] = 0;
      }
    }

    // Calculate largest rectangle in current histogram
    maxArea = Math.max(maxArea, largestRectangleInHistogram(heights));
  }

  return maxArea;
}

function largestRectangleOpt(heights) {
  const stack = [];
  const n = heights.length;
  let largest = 0;

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      largest = Math.max(largest, height * width);
    }
    stack.push(i);
  }

  while (stack.length > 0) {
    const height = heights[stack.pop()];
    const width = stack.length === 0 ? n : n - stack[stack.length - 1] - 1;
    largest = Math.max(largest, height * width);
  }

  return largest;
}

// Helper function to calculate largest rectangle in histogram
function largestRectangleInHistogram(heights) {
  const stack = [];
  let maxArea = 0;
  const n = heights.length;

  for (let i = 0; i <= n; i++) {
    const currentHeight = i === n ? 0 : heights[i];

    while (
      stack.length > 0 &&
      currentHeight < heights[stack[stack.length - 1]]
    ) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }

    stack.push(i);
  }

  return maxArea;
}
