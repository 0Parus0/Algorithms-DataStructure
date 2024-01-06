/*
Given an array arr[] of size N, find the prefix sum of the array. A prefix sum array is another array prefixSum[] of the same size, such that the value of prefixSum[i] is arr[0] + arr[1] + arr[2] . . . arr[i].

Examples: 

Input: arr[] = {10, 20, 10, 5, 15}
Output: prefixSum[] = {10, 30, 40, 45, 60}
Explanation: While traversing the array, update the element by adding it with its previous element.
prefixSum[0] = 10, 
prefixSum[1] = prefixSum[0] + arr[1] = 30, 
prefixSum[2] = prefixSum[1] + arr[2] = 40 and so on.

Declare a new array prefixSum[] of the same size as the input array
Run a for loop to traverse the input array
For each index add the value of the current element and the previous value of the prefix sum array
*/
function prefixSumArr(arr) {
  let prefixSumArray = [];
  prefixSumArray[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    prefixSumArray[i] = prefixSumArray[i - 1] + arr[i];
    // console.log(prefixSumArray
  }
  return prefixSumArray;
}
let arr = [10, 20, 10, 5, 15];
console.log(prefixSumArr(arr));

// Suffix Sum Array

function suffixSumArr(arr) {
  let n = arr.length;
  //   let suffixSumArray = Array.from({ length: n }, (el) => 0);
  let suffixSumArray = [];
  suffixSumArray[n - 1] = arr[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    suffixSumArray[i] = suffixSumArray[i + 1] + arr[i];
    // console.log(suffixSumArray);
  }
  return suffixSumArray;
}

console.log(suffixSumArr(arr));
