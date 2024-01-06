/*
2016. Maximum Difference Between Increasing Elements
Easy
941
29
Companies
Given a 0-indexed integer array nums of size n, find the maximum difference between nums[i] and nums[j] (i.e., nums[j] - nums[i]), such that 0 <= i < j < n and nums[i] < nums[j].

Return the maximum difference. If no such i and j exists, return -1.

 

Example 1:

Input: nums = [7,1,5,4]
Output: 4
Explanation:
The maximum difference occurs with i = 1 and j = 2, nums[j] - nums[i] = 5 - 1 = 4.
Note that with i = 1 and j = 0, the difference nums[j] - nums[i] = 7 - 1 = 6, but i > j, so it is not valid.
Example 2:

Input: nums = [9,4,3,2]
Output: -1
Explanation:
There is no i and j such that i < j and nums[i] < nums[j].
Example 3:

Input: nums = [1,5,2,10]
Output: 9
Explanation:
The maximum difference occurs with i = 0 and j = 3, nums[j] - nums[i] = 10 - 1 = 9.
 

Constraints:

n == nums.length
2 <= n <= 1000
1 <= nums[i] <= 109
*/
function maxDiffBetEles(arr) {
  let n = arr.length;
  let maxDiff = 0;
  let suffix = arr[n - 1];
  for (let i = n - 1; i > 0; i--) {
    suffix = Math.max(suffix, arr[i]);
    maxDiff = Math.max(maxDiff, suffix - arr[i - 1]);
    console.log({ suffix, maxDiff });
  }
  /* Brute Force */
  //   for (let i = 0; i < n - 1; i++) {
  //     let diff = 0;
  //     for (let j = i + 1; j < n; j++) {
  //       diff = arr[j] - arr[i];
  //       maxDiff = Math.max(maxDiff, diff);
  //     }
  //   }
  return maxDiff;
}
// let arr = [7, 1, 5, 4];
// let arr = [1, 5, 2, 10];
let arr = [9, 5, 8, 12, 2, 3, 7, 4];
console.log(maxDiffBetEles(arr));
