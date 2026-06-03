/*
1793. Maximum Score of a Good Subarray
Hard
Topics
premium lock icon
Companies
Hint
You are given an array of integers nums (0-indexed) and an integer k.

The score of a subarray (i, j) is defined as min(nums[i], nums[i+1], ..., nums[j]) * (j - i + 1). A good subarray is a subarray where i <= k <= j.

Return the maximum possible score of a good subarray.

 

Example 1:

Input: nums = [1,4,3,7,4,5], k = 3
Output: 15
Explanation: The optimal subarray is (1, 5) with a score of min(4,3,7,4,5) * (5-1+1) = 3 * 5 = 15. 
Example 2:

Input: nums = [5,5,4,5,4,1,1,1], k = 0
Output: 20
Explanation: The optimal subarray is (0, 4) with a score of min(5,5,4,5,4) * (4-0+1) = 4 * 5 = 20.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 2 * 104
0 <= k < nums.length
*/

function maximumScore(nums, k) {
  const n = nums.length;

  let i = k;
  let j = k;
  let currMin = nums[k];
  let result = nums[k];

  while (i > 0 || j < n - 1) {
    let leftVal = i > 0 ? nums[i - 1] : 0;
    let rightVal = j < n - 1 ? nums[j + 1] : 0;

    if (leftVal < rightVal) {
      j++;
      currMin = Math.min(currMin, nums[j]);
    } else {
      i--;
      currMin = Math.min(currMin, nums[i]);
    }

    result = Math.max(result, currMin * (j - i + 1));
  }
  return result;
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumScore = function (nums, k) {
  let left = k;
  let right = k;
  let minVal = nums[k];
  let result = nums[k];
  const n = nums.length;

  while (left > 0 || right < n - 1) {
    // Choose direction with larger next value
    if (left === 0) {
      right++;
    } else if (right === n - 1) {
      left--;
    } else if (nums[left - 1] > nums[right + 1]) {
      left--;
    } else {
      right++;
    }

    // Update minVal for new window
    if (left < k) minVal = Math.min(minVal, nums[left]);
    if (right > k) minVal = Math.min(minVal, nums[right]);

    // Update result
    result = Math.max(result, minVal * (right - left + 1));
  }

  return result;
};
