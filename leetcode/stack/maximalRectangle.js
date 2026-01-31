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
/*
🧩 The Problem Recap
In the Largest Rectangle in Histogram problem, for every bar, we want to know:

“What’s the largest rectangle we can form using this bar as the smallest height in the rectangle?”

To compute this efficiently in O(n) using a monotonic increasing stack, we push indices of bars such that heights are in increasing order.
Whenever we find a height smaller than the top of the stack, we pop from the stack and calculate area.

🔍 So Why i <= n ?
1. We loop one step beyond the array


Because, at the end of the histogram,
there might still be bars left in the stack that haven’t been processed yet.


Those remaining bars never saw a “smaller bar to the right” —
so the loop would end without popping them.


By going one step further (i === n),
we force the condition currentHeight < heights[stack[top]] to become true (since currentHeight = 0),
which causes us to pop everything left in the stack and compute areas.

2. The line:
const currentHeight = i === n ? 0 : heights[i];

ensures:


when i < n, we process the actual bar height.


when i === n, we process a fake bar of height 0,
triggering all remaining pops and area calculations.



🧮 Example Walkthrough
Say heights = [2, 1, 5, 6, 2, 3]
If we only looped i < n, after finishing:


The stack would still have some indices (e.g., for bars 5, 6, etc.)


We’d miss computing their rectangle areas.


By looping with i <= n and setting currentHeight = 0 at the end:


That final iteration triggers all pending pops


And ensures no potential area is missed



✅ Summary
Reason Explanation i <= nOne extra iteration ensures stack empties completelyi === n ? 0 : heights[i]Adds a dummy height 0 to flush remaining barsEffectGuarantees that all possible rectangles are consideredWithout itYou’d have to manually pop remaining bars after the loop

🧠 In short:
This “i <= n + dummy 0” trick
is a clean way to process all heights (including leftover ones)
without needing a separate post-loop cleanup step.

Would you like me to show how the algorithm’s stack evolves step-by-step on [2, 1, 5, 6, 2, 3] so you can see exactly how the i === n iteration flushes it out?
*/

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
