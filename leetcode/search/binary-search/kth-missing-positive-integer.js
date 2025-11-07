/**
1539. Kth Missing Positive Number
Given an array arr of positive integers sorted in a strictly increasing order, and an integer k.
Return the kth positive integer that is missing from this array.

Example 1:
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.

Example 2:
Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.

Constraints:
    1 <= arr.length <= 1000
    1 <= arr[i] <= 1000
    1 <= k <= 1000
    arr[i] < arr[j] for 1 <= i < j <= arr.length
 
Follow up:
Could you solve this problem in less than O(n) complexity?

#Plan
1. Understand the problem:
  - Given a sorted array nums of positive integers (strictly increasing) and an integer k, return the kth missing positive integer from the array.
  - Missing positive integers are those not present in the array, starting from 1.

2. Break down input data & transformation:
  - Example 1: arr = [2, 3, 4, 7, 11], k = 5
    Missing [1, 5, 6, 8, 9, ...] -> 5th missing is 9.
  - Example 2: arr = [1, 2, 3, 4], k = 2
    Missing: [5, 6, ...] -> 2nd missing is 6.
  - Key insight: 
    Missing count at position i = arr[i] - (i + 1).
    This tells us how many numbers are missing before arr[i].

3. Edge cases:
  - k-th missing number is before the first element.
  - k-th missing number is after the last element.
  - Array length is 1.
  - k is exactly the number of missing elements before/after a position.

4. Data structures:
  - Just variables for binary search boundaries.

5. Approach (Binary Search):
  - If k < arr[0] -> return k (all missing before first element).
  - Use binary search to find the smallest index idx where missing numbers before arr[idx] >= k.
  - If no such index, answer is after last element: arr[right] + (k - missingCountLat).
  - Else answer = arr[idx - 1] + (k - missingCountBeforeIdxMinus1).

6. Time & Space Complexity:
  - Time: O(log n) (binary search over array positions).
  - Space O(1) (no extra data structures used).
*/

/**
 *
 * @param {*} nums
 * @param {*} k
 * @returns
 */
function kthMissingBF(nums, k) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= k) k++;
    else break;
  }

  return k;
}

function findKthPositive(nums, k) {
  // If kth missing number is before the first element
  if (k < nums[0]) return k;

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const missingCount = nums[mid] - (mid + 1);

    if (missingCount < k) {
      left = mid + 1; // kth missing is after mid
    } else {
      right = mid - 1; // kth missing is before or at mid
    }
  }

  // At this point:
  // left is the index of the first element with missingCount >= k
  // right is the index where missingCount < k

  const missingCountBefore = nums[right] - (right + 1);
  return nums[right] + (k - missingCountBefore);
  // as right + 1 = left
  // as well as missingCountBefore is nums[right] - (right + 1)
  // nums[right] + k - (nums[right] - right -1)
  // nums[right] + k - nums[right] + right + 1
  // return right + k + 1; => right + 1 = left
  // return left + k;
}

// Custom Test Cases
console.log(findKthPositive([2, 3, 4, 7, 11], 5)); // Expected: 9
console.log(findKthPositive([1, 2, 3, 4], 2)); // Expected: 6
console.log(findKthPositive([5, 6, 7], 1)); // Expected: 1
console.log(findKthPositive([5, 6, 7], 4)); // Expected: 4
console.log(findKthPositive([4, 7, 9], 3)); // Expected: 3
console.log(findKthPositive([1], 1)); // Expected: 2
console.log(findKthPositive([1], 5)); // Expected: 6
console.log(findKthPositive([2, 3, 4], 5)); // Expected: 8

/**
Commit Message:
Implement binary search solution for kth Missing Positive Integer (LeetCode 1539)
 - Added O(log n) approach using binary search to find the kth missing positive integer.
 - Handled edge cases where kth missing number is before the first element or after the last element in the array.
 - Include multiple custom test cases for verification.
 - Added inline comments.
*/
