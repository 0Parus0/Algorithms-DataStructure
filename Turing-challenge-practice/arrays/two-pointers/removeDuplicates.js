/**
#Plan: 
1. Understand The Problem:
  - The function should return the new length of the array after removing duplicates in place.
  - The input array is sorted in ascending non-decreasing order

  
2. Break down input data & transformation:
  - Input: A sorted array of integers.
  - Transformation: Remove duplicates and shift the unique elements to the beginning of the array.
  - Output: The new length of the array with duplicates removed, and the array modified in place.
3. Edge Cases:
  - Empty array: [] return 0.
  - Array with one element: [5] return 1.
  - Array with all duplicates: [1, 1, 1] return 1
  - Array with no duplicates: [1, 2, 3] return 3 
4. Data Structure:
  - Array (modified in place).
  - We will use two pointers technique.
5. The Approach: 
  -**Brute-force**: 
  -**Optimal**: 
    - Initialize two pointers: left at the beginning (index 0), right at index 1;
    - Traverse through the array:
     - if nums[left] != nums[right], increment left and assign nums[right] to nums[left] 
     - if nums[left] == nums[right], just increment right.
    - continue this until right pointer reaches the end of the array.
    - The new length is left + 1. Since left represents the index of the last unique element.

6. Time & Space Complexity:
  - Time Complexity: O(N) 
  - Space Complexity: O(1)
*/

function removeDuplicates(nums) {
  let left = 0;
  let right = 1;
  if (!nums.length) return 0;

  while (right < nums.length) {
    if (nums[left] !== nums[right]) {
      left++;
      nums[left] = nums[right];
    }
    right++;
  }

  return left + 1;
}
/* 
# Custom Test Cases
*/
console.log(removeDuplicates([1, 1, 2])); // Expected output: 2
console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])); // Expected output: 5
console.log(removeDuplicates([])); // Expected output: 0
console.log(removeDuplicates([5])); // Expected output: 1
