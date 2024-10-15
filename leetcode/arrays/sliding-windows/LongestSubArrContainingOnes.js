/*
Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

 

Example 1:

Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
Example 2:

Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
 

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
0 <= k <= nums.length
*/
function longestSubArrContOnes(arr, k) {
  let n = arr.length;
  let start = 0,
    long = 0,
    curr = 0,
    count = 0;

  for (let end = 0; end < n; end++) {
    if (arr[end] === 0) {
      count++;
    }

    while (count > k) {
      if (arr[start] === 0) {
        count--;
      }
      start++;
    }

    curr = end - start + 1;
    long = Math.max(long, curr);
  }

  return long;
}

console.log(longestSubArrContOnes([0, 1, 1, 0, 0, 1, 1], 2));
