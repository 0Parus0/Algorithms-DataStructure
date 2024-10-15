/*
The problem is " 3. Smallest Subarray with a Greater Sum
Problem: Given an array of positive integers, find the length of the smallest contiguous subarray whose sum is greater than or equal to S.
Input: arr = [2, 1, 5, 2, 3, 2], S = 7
Output: 2
Optimal Approach: Sliding Window to expand the window until the sum is greater than or equal to S, then shrink it to find the smallest subarray."
*/
function smallestSubArrBF(arr, k) {
  let n = arr.length;
  let minLength = Infinity;
  for (let i = 0; i < n; i++) {
    let currentSum = 0;
    for (let j = i; j < n; j++) {
      currentSum += arr[j];
      if (currentSum >= k) {
        minLength = Math.min(minLength, j - i + 1);
        break;
      }
    }
  }
  return minLength === Infinity ? -1 : minLength;
}

function smallestSubArrSum(arr, k) {
  let n = arr.length;
  let start = 0,
    minLength = Infinity,
    currentSum = 0;
  for (let end = 0; end < n; end++) {
    currentSum += arr[end]; // Expand the window by adding arr[end]

    // Shrink the window as long as currentSum is greater or equal to k
    while (currentSum >= k) {
      minLength = Math.min(minLength, end - start + 1); // Update minLength

      currentSum -= arr[start]; // Shrink the window by subtracting arr[start]
      start++; // Move start pointer
      
    }
  }
  return minLength === Infinity ? -1 : minLength;
}

console.log(smallestSubArrSum([2, 1, 5, 2, 3, 2], 7));
console.log(smallestSubArrSum([1, 2], 7));
