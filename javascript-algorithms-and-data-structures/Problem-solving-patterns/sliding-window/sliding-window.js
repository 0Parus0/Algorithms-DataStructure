/**
|--------------------------------------------------
| Write a function called maxSubarraySum which accepts an array of integers and a number called n. The function should calculate the maximum sum of n consecutive elements in the array

maxSubarraySum([1,2,5,2,8,1,5], 2) // 10
maxSubarraySum([1,2,5,2,8,1,5], 4) // 17
maxSubarraySum([4,2,1,6], 6) // 6
maxSubarraySum([4,2,1,6,2], 4) // 13
maxSubarraySum([], 2) // null
|--------------------------------------------------
*/

/**
|--------------------------------------------------
| ------------NAIVE SOLUTION----------------------
|--------------------------------------------------
*/

function maxSubarraySumNaive(arr, num) {
  if(num > arr.length) return null;

  let max = -Infinity;
  for (let i = 0; i < arr.length - num + 1; i++) {
    let temp = 0; 
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if(temp > max) {
      max = temp;
    }
    console.log(temp, max);
  }
  return max;
}

// console.log(maxSubarraySum([1,2,5,2,8,1,5], 2) )
// console.log(maxSubarraySum([1,2,5,2,8,1,5], 4) )
// console.log(maxSubarraySum([], 4) )



/**
|--------------------------------------------------
| ------------REFACTOR-----------------------------
|--------------------------------------------------
*/

function maxSubarraySum(arr, num) {
  if(num > arr.length) return null;
  let maxSum = 0;
  let tempSum = 0;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }

  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}


console.log(maxSubarraySum([1,2,5,2,8,1,5], 2) )
console.log(maxSubarraySum([1,2,5,2,8,1,5], 4) )
console.log(maxSubarraySum([], 4) )

