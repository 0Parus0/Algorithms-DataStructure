/*
3346. Maximum Frequency of an Element After Performing Operations I
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer array nums and two integers k and numOperations.

You must perform an operation numOperations times on nums, where in each operation you:

Select an index i that was not selected in any previous operations.
Add an integer in the range [-k, k] to nums[i].
Return the maximum possible frequency of any element in nums after performing the operations.

 

Example 1:

Input: nums = [1,4,5], k = 1, numOperations = 2

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1]. nums becomes [1, 4, 5].
Adding -1 to nums[2]. nums becomes [1, 4, 4].
Example 2:

Input: nums = [5,11,20,20], k = 5, numOperations = 1

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1].
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
0 <= k <= 105

0 <= numOperations <= nums.length
*/
/**
 * 3346. Maximum Frequency of an Element After Performing Operations I
 *
 * #Plan:
 * 1. **Understand the problem:**
 *    - Each nums[i] can move in range [nums[i] - k, nums[i] + k].
 *    - We want to find where most of these ranges overlap (that’s the max frequency).
 *    - We can only use `numOperations` operations (so we can change at most numOperations elements).
 *
 * 2. **Approach using Difference Array:**
 *    - For each nums[i]:
 *       -> Increment diff[start] by 1
 *       -> Decrement diff[end + 1] by 1
 *    - Then take prefix sum across diff.
 *    - The max prefix value = max possible overlap (max frequency if unlimited operations).
 *    - But since we can only perform `numOperations` operations,
 *      the real answer = min(maxOverlap, numOperations + 1)
 *
 * 3. **Complexity:**
 *    - Time: O(n + max(nums)) (after compression)
 *    - Space: O(max(nums))  (for difference array)
 */

function maxFrequency(nums, k, numOperations) {
  // Step 1: Find the max number for array range
  const maxNum = Math.max(...nums);

  // Step 2: Initialize difference array of size (maxNum + k + 2)
  const diff = new Array(maxNum + k + 2).fill(0);

  // Step 3: Mark the range updates for each number
  for (let num of nums) {
    const left = Math.max(0, num - k);
    const right = num + k;

    diff[left] += 1;
    diff[right + 1] -= 1;
  }

  // Step 4: Compute prefix sum to get active overlaps
  let curr = 0;
  let maxOverlap = 0;

  for (let i = 0; i < diff.length; i++) {
    curr += diff[i];
    maxOverlap = Math.max(maxOverlap, curr);
  }

  // Step 5: Limit overlap by numOperations (since each operation affects one element)
  return Math.min(maxOverlap, numOperations + 1);
}

/**
 * #Test Cases
 */
console.log(maxFrequency([1, 4, 5], 1, 2)); // Expected 2
console.log(maxFrequency([5, 11, 20, 20], 5, 1)); // Expected 2
console.log(maxFrequency([3, 3, 9, 10], 2, 2)); // Expected 2
console.log(maxFrequency([1, 1, 1], 0, 0)); // Expected 3
console.log(maxFrequency([10, 100, 200], 90, 2)); // Expected 2

/**
 * #Commit Message:
 * feat: implement difference array + prefix sum for maximum frequency
 * - used range updates for all nums[i] -> [nums[i]-k, nums[i]+k]
 * - prefix sum to compute overlap frequency
 * - returned min(maxOverlap, numOperations + 1)
 * - O(n + max(nums)) time, O(max(nums)) space
 */
