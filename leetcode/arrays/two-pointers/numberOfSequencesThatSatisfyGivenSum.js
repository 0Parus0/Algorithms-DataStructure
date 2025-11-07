/*
1498. Number of Subsequences That Satisfy the Given Sum Condition
Medium
Topics
premium lock icon
Companies
Hint
You are given an array of integers nums and an integer target.

Return the number of non-empty subsequences of nums such that the sum of the minimum and maximum element on it is less or equal to target. Since the answer may be too large, return it modulo 109 + 7.

 

Example 1:

Input: nums = [3,5,6,7], target = 9
Output: 4
Explanation: There are 4 subsequences that satisfy the condition.
[3] -> Min value + max value <= target (3 + 3 <= 9)
[3,5] -> (3 + 5 <= 9)
[3,5,6] -> (3 + 6 <= 9)
[3,6] -> (3 + 6 <= 9)
Example 2:

Input: nums = [3,3,6,8], target = 10
Output: 6
Explanation: There are 6 subsequences that satisfy the condition. (nums can have repeated numbers).
[3] , [3] , [3,3], [3,6] , [3,6] , [3,3,6]
Example 3:

Input: nums = [2,3,3,4,6,7], target = 12
Output: 61
Explanation: There are 63 non-empty subsequences, two of them do not satisfy the condition ([6,7], [7]).
Number of valid subsequences (63 - 2 = 61).
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 106
1 <= target <= 106
*/

/**
#Plan:
1. Understand the problem:
   - Given an integer array `nums` and a target `target`.
   - We must count all *non-empty subsequences* where:
        (min(subseq) + max(subseq)) <= target.
   - The result should be modulo (10^9 + 7).
   - Subsequences mean any combination of elements (not necessarily contiguous).

2. Break down input data & transformations:
   - Input: nums[] (integers), target (integer).
   - Output: integer (count of valid subsequences).
   - Key insight: The number of subsequences grows exponentially, 
     so we cannot generate all subsequences explicitly.

3. Approach & Thought Process:
   - Sort the array → this makes it easier to pair min and max.
   - Use **two pointers** (`left` at start, `right` at end):
        - If nums[left] + nums[right] <= target:
             → All subsequences that start with nums[left] 
               and end with any subset of elements between them are valid.
             → Count = 2^(right - left)
             → Move left++ to include next possible smaller element.
        - Else:
             → The current pair is invalid (too large), so move right--.
   - Precompute powers of 2 modulo (10^9 + 7) for fast calculation.

4. Edge cases:
   - Single element arrays → [x] is valid if 2*x <= target.
   - All elements > target/2 → only single-element subsequences may qualify.
   - Large arrays (up to 1e5), so efficient O(n log n) required.

5. Data Structures:
   - Sorted nums array
   - Precomputed powers of 2 array
   - Two pointers (left, right)
   - Modular arithmetic for counting

6. Time & Space Complexity:
   - Time: O(n log n) due to sorting
   - Space: O(n) for powers of 2 array
*/

function numSubseq(nums, target) {
  const MOD = 1e9 + 7;
  nums.sort((a, b) => a - b);

  const n = nums.length;
  const pow2 = new Array(n).fill(1);

  // Precompute powers of 2 modulo MOD
  for (let i = 1; i < n; i++) {
    pow2[i] = (pow2[i - 1] * 2) % MOD;
  }

  let left = 0;
  let right = n - 1;
  let count = 0;

  while (left <= right) {
    if (nums[left] + nums[right] <= target) {
      // All combinations between left and right are valid subsequences
      count = (count + pow2[right - left]) % MOD;
      left++;
    } else {
      // Too large, try a smaller max value
      right--;
    }
  }

  return count;
}

// Custom Test Cases
console.log(numSubseq([3, 5, 6, 7], 9)); // Expected: 4
console.log(numSubseq([3, 3, 6, 8], 10)); // Expected: 6
console.log(numSubseq([2, 3, 3, 4, 6, 7], 12)); // Expected: 61
console.log(numSubseq([1, 2, 3, 4], 5)); // Expected: 11 (many small subsequences)
console.log(numSubseq([10, 20, 30], 15)); // Expected: 0 (none valid)
console.log(numSubseq([1], 2)); // Expected: 1 (single element valid)
console.log(numSubseq([5], 8)); // Expected: 1 (5+5 <= 8)
console.log(numSubseq([5], 6)); // Expected: 0 (5+5 > 6)

/**
Commit Message:
Implement efficient two-pointer solution for "Number of Subsequences That Satisfy the Given Sum Condition"
  - Used sorting + two pointers to count valid subsequences where min + max <= target.
  - Precomputed powers of 2 for efficient combinatorial counting.
  - Achieves O(n log n) time and O(n) space.
  - Added custom test cases for edge scenarios (single elements, all invalid, mixed values).
*/
