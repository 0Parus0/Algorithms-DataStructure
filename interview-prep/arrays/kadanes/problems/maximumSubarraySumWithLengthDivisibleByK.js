/*
3381. Maximum Subarray Sum With Length Divisible by K
You are given an array of integers nums and an integer k.
Return the maximum sum of a subarray of nums, such that the size of the subarray is divisible by k.

Example 1:
Input: nums = [1,2], k = 1
Output: 3
Explanation:
The subarray [1, 2] with sum 3 has length equal to 2 which is divisible by 1.

Example 2:
Input: nums = [-1,-2,-3,-4,-5], k = 4
Output: -10
Explanation:
The maximum sum subarray is [-1, -2, -3, -4] which has length equal to 4 which is divisible by 4.

Example 3:
Input: nums = [-5,1,2,-3,4], k = 2
Output: 4
Explanation:
The maximum sum subarray is [1, 2, -3, 4] which has length equal to 4 which is divisible by 2.

Constraints:
1 <= k <= nums.length <= 2 * 105
-109 <= nums[i] <= 109
*/
function maxSubarraySum(nums, k) {
  const n = nums.length;

  const prefixSum = new Array(n).fill(0);
  prefixSum[0] = nums[0];

  for (let i = 1; i < n; i++) {
    prefixSum[i] = prefixSum[i - 1] + nums[i];
  }

  let result = -Infinity;
  for (let start = 0; start < k; start++) {
    let currSum = 0;

    let i = start;

    while (i < n && i + k - 1 < n) {
      let j = i + k - 1;
      if (j >= n) break;
      let subSum = prefixSum[j] - (i > 0 ? prefixSum[i - 1] : 0);
      currSum = Math.max(subSum, currSum + subSum);
      result = Math.max(result, currSum);
      i += k;
    }
  }
  return result;
}
