/*
Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].

The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in O(n) time and without using the division operation.

 

Example 1:

Input: nums = [1,2,3,4]
Output: [24,12,8,6]
Example 2:

Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
 

Constraints:

2 <= nums.length <= 105
-30 <= nums[i] <= 30
The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 

Follow up: Can you solve the problem in O(1) extra space complexity? (The output array does not count as extra space for space complexity analysis.)
*/
function productExceptSelf(arr) {
  /* Optimal Solution */
  let n = arr.length;
  let result = [];
  let start = 1;
  for (let i = 0; i < n; i++) {
    result.push(start);
    start *= arr[i];
  }

  let start2 = 1;

  for (let i = n - 1; i >= 0; i--) {
    result[i] = start2 * result[i];
    start2 = start2 * arr[i];
  }
  return result;
  prefixProducts;
  //   prefixProducts[0] = 1;
  //   for (let i = 1; i < n; i++) {
  //     prefixProducts[i] = prefixProducts[i - 1] * arr[i - 1];
  //   }
  //   suffixProducts[n - 1] = 1;
  //   for (let i = n - 2; i >= 0; i--) {
  //     suffixProducts[i] = suffixProducts[i + 1] * arr[i + 1];
  //   }
  //   for (let i = 0; i < n; i++) {
  //     result[i] = prefixProducts[i] * suffixProducts[i];
  //   }
  //   return result;

  /* Brute Force */

  //   let n = arr.length;
  //   let result = [];
  //   for (let i = 0; i < n; i++) {
  //     let product = 1;
  //     for (let j = 0; j < n; j++) {
  //       if (j === i) {
  //         continue;
  //       } else {
  //         product *= arr[j];
  //         console.log(arr[j], arr[i]);
  //       }
  //     }
  //     if (product === -0) product = 0;
  //     result.push(product);
  //   }
  //   return result;
}
// let arr = [-1, 1, 0, -3, 3];
let arr = [1, 2, 3, 4];
console.log(productExceptSelf(arr));
