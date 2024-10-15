/*
Given an integer array nums, find the 
subarray
 with the largest sum, and return its sum.

 

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
 

Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
 

Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

*/
function maxSumSubArr(arr) {
  let n = arr.length;

  let maxSum = 0;
  let prefix = 0;
  for (let i = 0; i < n; i++) {
    prefix += arr[i];
    // Kadane's Algorithm.
    if (prefix < 0) prefix = 0;
    console.log({ prefix, maxSum });
    maxSum = Math.max(maxSum, prefix);
  }

  /* Brute Force */
  //   let maxSum = 0;
  //   for (let i = 0; i < n; i++) {
  //     let sum = 0;
  //     for (let j = i; j < n; j++) {
  //       sum += arr[j];
  //       maxSum = Math.max(maxSum, sum);
  //     }
  //   }
  return maxSum;
}

/* For all negative numbers */

function maxSum(arr) {
  let n = arr.length;
  let maxSum = arr[0];
  let prefixSum = arr[0];
  for (let i = 1; i < n; i++){
    // Decide whether to add the current element to the existing subarray or start a new subarray
    prefixSum = Math.max(arr[i], prefixSum + arr[i]);
    // Update the maximum subarray sum found so far
    maxSum = Math.max(prefixSum, maxSum);
  }
  return maxSum;
}

// let arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
let arr = [-5, -4, -10, -8, -7];

console.log(maxSum(arr));
