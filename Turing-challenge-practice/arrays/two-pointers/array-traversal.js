/**
#Plan:
1. Understand what the function must return. Clarify the inputs and expected outputs.
  - Return an array of squared integers in ascending (non-decreasing) order.
2. Break down the input data and identify required transformations.
  - Input: array of integers (may contain positive, negative, and zero)
  - Transformation: square each number, then sort the results.
3. Think of edge cases (empty inputs, case sensitivity, invalid data, etc).
  - Empty array -> return []
  - Single element array
  - All numbers negative or all positive
4. Choose data structures: Arrays? Objects? Maps?
  - Array for sorting squared numbers.
5. Outline approach:
   - Brute-force?
   - Loop over the array, square each number, push to the array to be returned
   - Sort the array to be returned
   - Optimized version?
6. Time & Space Complexity.
n(log(n))

Example:
[-2, -4, 3, 5] => [4, 9, 16, 5]
Input: ...
Output: ...
Explanation: ...
*/

// Function
function squareAndSort(numbers) {
  // Step 1: Parse or transform input if needed
  // create a result array
  let result = [];

  // Step 2: Set up data structures
  // loop over the input numbers array and square each number and push them to result array
  for (let i = 0; i < numbers.length; i++) {
    result.push(numbers[i] * numbers[i]);
  }

  // Step 3: Apply main logic (loop, condition, etc.)
  result.sort((a, b) => a - b);

  // Step 4: Return result
  return result;
}

/* 
# Custom Test Cases
*/
// console.log(squareAndSort([-2, -4, 3, 5])); // Expected output [4, 9, 16, 25]

/**
#Plan: 
1. Understand what the function must return:
  - Return an array of squared integers in ascending (non-decreasing) order.

2. Break down input data & transformations:
  - Input: sorted array of integers (may contain positive, negative, zero and duplicates).
  - Transformation: square each number, then sort the results.

3. Edge cases: 
  - Empty array -> return [].
  - Single element array.
  - All numbers negative or all positive.

4. Data structures:
  - Array for storing squared numbers.

5. Approach: 
  Optimized:
  - Use two pointers from both ends to fill result array from the back.
  - Compare squared values of the two pointers, place the larger value at the end of the result array.

6. Time & Space Complexity:
  - Traversal: O(N)
  - Space: O(N)
*/

function sortedAndSquared(numbers) {
  let left = 0;
  let right = numbers.length - 1;
  let result = new Array(numbers.length);

  // Step 1: Two pointers, fill result from back
  let position = numbers.length - 1;
  while (left <= right) {
    let leftSquare = numbers[left] * numbers[left];
    let rightSquare = numbers[right] * numbers[right];

    if (leftSquare > rightSquare) {
      result[position] = leftSquare;
      left++;
    } else {
      result[position] = rightSquare;
      right--;
    }
    position--;
  }
  return result;
}

/**
 * Custom Test Cases
 */

console.log(sortedAndSquared([-3, -2, 4, 5]));
console.log(sortedAndSquared([]));
console.log(sortedAndSquared([0]));
console.log(sortedAndSquared([-7, -3]));

/**
Commit Message:
  - Used two pointers to fill result array from back without extra sorting step
  - Achieved O(N) time complexity and O(N) space complexity
  - Added custom test cases for empty array, single element, and all negative numbers
*/
