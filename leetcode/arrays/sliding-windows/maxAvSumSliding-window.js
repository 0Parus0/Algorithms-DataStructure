/*
You are given an integer array nums consisting of n elements, and an integer k.

Find a contiguous subarray whose length is equal to k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.

 

Example 1:

Input: nums = [1,12,-5,-6,50,3], k = 4
Output: 12.75000
Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75
Example 2:

Input: nums = [5], k = 1
Output: 5.00000
 

Constraints:

n == nums.length
1 <= k <= n <= 105
-104 <= nums[i] <= 104
*/


function maxAvSumSlidingWindow(arr, k) {
  let max = -Infinity,
    windowSum = 0,
    start = 0;
  for (let end = 0; end < arr.length; end++) {
    console.log(`ran ${end} times`);
    windowSum += arr[end];

    if (end - start + 1 === k) {
      max = Math.max(max, parseFloat(windowSum / k));
      windowSum -= arr[start];
      start++;
    }
  }
  return max;
}
let nums = [1, 12, -5, -6, 50, 3];
// console.log(maxAvSumSlidingWindow(nums, 4));
