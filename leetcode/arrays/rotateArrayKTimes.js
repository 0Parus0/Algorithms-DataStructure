/*
Given an integer array nums, rotate the array to the right by k steps, where k is non-negative.

 

Example 1:

Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]
Example 2:

Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]
 

Constraints:

1 <= nums.length <= 105
-231 <= nums[i] <= 231 - 1
0 <= k <= 105
 

Follow up:

Try to come up with as many solutions as you can. There are at least three different ways to solve this problem.
Could you do it in-place with O(1) extra space?
*/
function rotate(arr, k) {
  let n = arr.length;

  /* In Place */
  for (let i = 0; i < k; i++) {
    rotateOnce(arr);
  }

  /* Using Auxiliary Space */
  //   let result = [];
  //   for (let i = 0; i < n; i++) {
  //     result[(i + k )% n] = arr[i];
  //   }
  //   arr = result;
  return arr;
}

function rotateOnce(arr) {
  let n = arr.length;
  let last = arr[n - 1];
  for (let i = n - 2; i >= 0; i--);
  arr[i + 1] = arr[i];
  // for (let i = n - 1; i > 0; i--) {
  //   arr[i] = arr[i - 1];
  // console.log(arr);
  // }
  arr[0] = last;
  return arr;
}
let arr = [-1, -100, 3, 99];
console.log(rotate(arr, 2));
