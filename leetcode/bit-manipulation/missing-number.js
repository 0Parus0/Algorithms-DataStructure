/*Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.

 

Example 1:

Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
Example 2:

Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 2 is the missing number in the range since it does not appear in nums.
Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.
 

Constraints:

n == nums.length
1 <= n <= 104
0 <= nums[i] <= n
All the numbers of nums are unique.
*/

function missingNumber(numsArr, n = numsArr.length) {
  let allXor = 0;
  for (let i = 0; i <= n; i++) {
    // xor the range of numbers n
    allXor = allXor ^ i;
  }

  for (let num of nums) {
    // xor the numbers in the array with the range
    // because xor is commutative all the numbers in numsArray will become zero
    // except the missing number because x xor x = 0 and x xor 0 = x;
    allXor = allXor ^ num;
  }

  return allXor;

  //   let sum = numsArr.reduce((acc, num) => acc + num);
  //   let rangeSum = (n * (n + 1)) / 2;
  //   let missing = rangeSum - sum;
  //   return missing;
}

let nums = [9, 6, 4, 2, 3, 5, 7, 0, 1];
console.log(missingNumber(nums));
