/**
Question: 3Sum
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.

Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.

Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.

Constraints:

    3 <= nums.length <= 3000
    -105 <= nums[i] <= 105

#Plan:

1. **Understand the problem:**
  - The goal is to return all unique triplets in the array that sum to zero.
  - Avoid duplicate triplets in the result.

2. **Break down input data & transformations:**
  - Input: Array of integers.
  - Transformation: Sort the array, then use a two pointers technique to find triplets that sum to 0.
3. **Edge cases:**
  - If the array has less than 3 elements, return an empty array.
  - Handle arrays with duplicates by skipping duplicate numbers during the loop.

4. **Data structures:**
  - Use an array to store the triplets.
  - Sorting the array ensures we can use two pointers to find pairs efficiently.

5. **Approach:**
  - Sort the array.
  - iterate through the array, using the current number as the first element of the triplet.
  - Use two pointers (left and right) to find the other two elements that sum to zero with the first element.
  - Skip duplicates during iteration to avoid duplicate triplets.

6. **Time & Space Complexity:**
  - Time Complexity: O(N ** 2), due to an outer loop for first element and an inner loop for two pointers
  - Space Complexity: O(1), due to two pointers solution, excluding the result array. 

*/

function triplets(nums) {
  let result = [];
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i++) {
    if (i !== 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // Move both pointers and skip duplicates
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else right--;
    }
  }
  return result;
}

/* 
# Custom Test Cases
*/
console.log(triplets([-1, 0, 1, 2, -1, -4])); // Expected output: [[-1, -1, 2], [-1, 0, 1]]
console.log(triplets([0, 0, 0])); // Expected output: [[0, 0, 0]]
console.log(triplets([1, 2, -2, -1])); // Expected output: []
console.log(triplets([])); // Expected output: []

/**
Commit Message:
  Implemented solution for 3Sum using Two Pointers:
    - Sorted the array to use Two Pointers effectively.
    - Found triplets that sum to zero, ensuring no duplicates in the result.
    - Achieved O(N ** 2) time complexity with O(1) extra space
    - Added test cases for different edge cases and scenarios
 */
