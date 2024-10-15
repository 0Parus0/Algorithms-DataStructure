/*
1. Maximum Sum Subarray of Size K
Problem: Given an array of integers, find the maximum sum of any contiguous subarray of size K.
Input: arr = [2, 1, 5, 1, 3, 2], K = 3
Output: 9
Optimal Approach: Sliding Window to maintain the sum of the window of size K and slide the window over the array while updating the maximum sum.
*/

function maxSumSubArrBF(arr, k) {
  let n = arr.length;
  let maxSum = -Infinity;

  for (let i = 0; i < n - k; i++) {
    let currentSum = 0;
    for (let j = i; j < k + i; j++) {
      currentSum += arr[j];
    }
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}

function maxSumSubarray(arr, k) {
  let n = arr.length;
  let maxSum = 0;
  let windowSum = 0;

  // Calculate the sum of the first window (first K elements)
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }

  // Set the initial window sum as the maxSum
  maxSum = windowSum;

  // Slide the window over the array
  for (let i = k; i < n; i++) {
    // Slide the window by subtracting the element going out of the window and add the element comming in
    windowSum += arr[i] - arr[i - k];
    // update maxSum

    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

console.log(maxSumSubArrBF([2, 1, 5, 1, 3, 2], 3));
