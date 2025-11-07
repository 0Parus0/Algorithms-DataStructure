/**
#Plan:

1. **Understand the problem:**
  - The goal is to find the maximum area that can be trapped between two lines from given list of heights.

2. **Break down input data & transformations:**
  - Input: Array of integers, where each integer represents the height of a vertical line.
  - Transformation: Use two pointers to find the maximum area between any two lines in the array.

3. **Edge cases:**
  - If the array has only two elements: return the area formed between them.
  - If all elements are the same: maximum area will be between the farthest points.
  - If the array is strictly increasing or decreasing, the approach will still find the correct area.

4. **Data structures:**
  - Array of heights.
  - Two pointers (left and right) to traverse the array.

5. **Approach:**
  - Initialize left at the start and right at the end of the array.
  - Calculate the area for each pair of pointers, track the maximum area.
  - Move the pointer pointing to shorter line to increase potential area. 
  - Stop when the two pointers meet.
6. **Time & Space Complexity:**
  - Time Complexity: O(N) since we iterate through the array only once.
  - Space Complexity: O(1) as we use a constant amount of extra space.

*/

function mostWater(heights) {
  let left = 0;
  let right = heights.length - 1;

  let maxWater = 0;

  while (left < right) {
    let width = right - left;
    let height = Math.min(heights[left], heights[right]);
    let area = width * height;
    maxWater = Math.max(maxWater, area);
    if (heights[left] < heights[right]) left++;
    else right--;
  }
  return maxWater;
}

/* 
# Custom Test Cases
*/
// console.log(mostWater([1, 8, 6, 2, 5, 4, 8, 3, 7])); // Expected output: 49
// console.log(mostWater([1, 1])); // Expected output: 1
// console.log(mostWater([2, 3, 4, 5, 18, 17, 6])); // Expected output: 17

/**
Commit:
  Implemented max area finding using Two Pointers:
   - Used two pointers from both ends of the array to calculate the maximum area
   - Moved the pointer pointing to the shorter line to maximize potential area
   - Achieved O(N) time complexity and O(1) space complexity
   - Added test cases for varying heights, including edge cases with only two elements
*/

function minimizeMaxSum(arr) {
  let sorted = arr.sort((a, b) => a - b);
  console.log(`Sorted: ${sorted}`);
  let left = 0;
  let right = sorted.length - 1;
  let result = 0;
  while (left < right) {
    let sum = sorted[left] + sorted[right];
    result = Math.max(result, sum);
    left++;
    right--;
  }

  return result;
}

console.log(minimizeMaxSum([9, 2, 10, 1, 10, 4, 8, 9, 7, 6, 5, 4, 3, 2, 10]));
