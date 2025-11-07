/*
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

 

Example 1:


Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
Example 2:


Input: heights = [2,4]
Output: 4
 

Constraints:

1 <= heights.length <= 105
0 <= heights[i] <= 104
*/

function largestRectangle1(heights) {
  let stack = [];
  const left = new Array(heights.length).fill(-1);
  const right = new Array(heights.length).fill(heights.length);

  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      right[stack[stack.length - 1]] = i;
      stack.pop();
    }
    stack.push(i);
  }

  stack = [];

  for (let i = heights.length - 1; i >= 0; i--) {
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      left[stack[stack.length - 1]] = i;
      stack.pop();
    }
    stack.push(i);
  }

  let ans = 0;
  for (let i = 0; i < heights.length; i++) {
    let area = heights[i] * (right[i] - left[i] - 1);
    ans = Math.max(ans, area);
  }
  console.log({ right, left });
  return ans;
}

function largestRectangle(heights) {
  const stack = [];
  const n = heights.length;
  let largest = 0;
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
      let index = stack[stack.length - 1];
      stack.pop();
      if (stack.length > 0) {
        largest = Math.max(
          largest,
          heights[index] * (i - stack[stack.length - 1] - 1)
        );
      } else {
        largest = Math.max(largest, heights[index] * i);
      }
    }
    stack.push(i);
  }
  while (stack.length > 0) {
    let index = stack[stack.length - 1];
    stack.pop();
    if (stack.length > 0) {
      largest = Math.max(
        largest,
        heights[index] * (n - stack[stack.length - 1] - 1)
      );
    } else {
      largest = Math.max(largest, heights[index] * n);
    }
  }
  return largest;
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

function largestRectangleBetter(heights) {
  const stack = [];
  let maxArea = 0;
  const n = heights.length;

  // Add sentinel value at the end to force cleanup
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
// console.log(largestRectangle([2, 3, 4, 2, 6, 5, 4, 5, 3]));
// console.log(largestRectangle1([2, 1, 5, 6, 2, 3]));
console.log(largestRectangleOpt([2, 1, 5, 6, 2, 3]));
