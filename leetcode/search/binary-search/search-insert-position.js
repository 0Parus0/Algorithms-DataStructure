// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

// You must write an algorithm with O(log n) runtime complexity.

// Example 1:

// Input: nums = [1,3,5,6], target = 5
// Output: 2
// Example 2:

// Input: nums = [1,3,5,6], target = 2
// Output: 1
// Example 3:

// Input: nums = [1,3,5,6], target = 7
// Output: 4

// Constraints:

// 1 <= nums.length <= 104
// -104 <= nums[i] <= 104
// nums contains distinct values sorted in ascending order.
// -104 <= target <= 104

/**
#Plan:
1. Understand the problem:
  - Given a sorted array of distinct integers and a target value, return the index if the target is found.
  - If not found, return the index where it would be inserted in order.
  - Must be done in O(log n) runtime complexity.

2. Break down input data & transformations:
  - Input: Sorted array nums (distinct integers), integer target.
  - Transformation:
    - Use binary search to find the target.
    - if found -> return it's index.
    - If not found -> return the position where target should be inserted.

3. Edge cases:
  - Target smaller than all elements -> insertion at index 0.
  - Target greater than all elements -> insertion at index nums.length.
  - Target exactly matches an element.
  - Array length = 1.
  - Array is empty -> return 0

4. Data Structures:
  -Variables for left, right, and mid pointers.

5. Approach: 
  - Initialize left = 0, right = nums.length - 1.
  - while left <= right:
    - Calculate mid = Math.floor((left + right) / 2).
    - If nums[mid] === target -> return mid.
    - If nums[mid] < target -> search right half (left = mid + 1).
    - Else search left half (right = mid - 1).
  - Return left (insertion position).

6. Time & Space Complexity:
  - Time: O(log n) (binary search halves the range each iteration).
  - Space: O(1) (only a few pointers used).
*/

function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid; // Target found

    if (nums[mid] < target) left = mid + 1; // Search right
    else right = mid - 1; // search left
  }

  return left; // Insertion position if target not found.
}

// Custom Test Cases
console.log(searchInsert([1, 3, 5, 6], 5)); // Expected: 2 (target found)
console.log(searchInsert([1, 3, 5, 6], 2)); // Expected: 1 (insert before 3)
console.log(searchInsert([1, 3, 5, 6], 7)); // Expected: 4 (insert at end)
console.log(searchInsert([1, 3, 5, 6], 0)); // Expected: 0 (insert at start)
console.log(searchInsert([1], 0)); // Expected: 0 (single element, insert at start)
console.log(searchInsert([1], 2)); // Expected: 1 (single element, insert at end)
console.log(searchInsert([], 2)); // Expected: 0 (insert at start/0th index)
console.log(searchInsert([-5, -2, 0, 3, 8], -3)); // Expected: 1 (between -5 and -2)

/**
Commit Message:
Implement binary search insert position function
  - Added searchInsert function to find the index of target in a sorted array or the position where it should be inserted.
  - Uses O(log n) binary search for efficiency.
  - Added multiple custom test cases including:
  - Target found
  - Target less than smallest
  - Single element arrays
  - Target greater than largest
  - Negative numbers.
*/
