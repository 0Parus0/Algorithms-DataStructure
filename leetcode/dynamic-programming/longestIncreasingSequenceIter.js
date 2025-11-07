/*
300. Longest Increasing Subsequence
Medium
Topics
premium lock icon
Companies
Given an integer array nums, return the length of the longest strictly increasing subsequence.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104

🧠 Step 2: Approach 1 — Dynamic Programming (O(n²))

We’ll use bottom-up DP:

Let dp[i] = length of the longest increasing subsequence ending at index i.

To compute dp[i], look at all previous indices j < i:

if nums[i] > nums[j], then nums[i] can extend the subsequence ending at j.

So, we take the best among all such possible j.

Recurrence:
dp[i] = 1 + max(dp[j]) for all j < i and nums[i] > nums[j]
If no such j → dp[i] = 1

*/

function lengthOfLIS(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1); // Each element is LIS of length 1 by itself

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log(lengthOfLIS([0, 1, 0, 3, 2, 3])); // 4
console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7])); // 1
console.log(lengthOfLIS([1, 3, 6, 7, 9, 4, 10, 5, 6])); // 6
console.log(lengthOfLIS([4, 10, 4, 3, 8, 9])); // 3
