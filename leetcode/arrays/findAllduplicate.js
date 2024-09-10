/*
Given an integer array nums of length n where all the integers of nums are in the range [1, n] and each integer appears once or twice, return an array of all the integers that appears twice.

You must write an algorithm that runs in O(n) time and uses only constant extra space.

 

Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [2,3]
Example 2:

Input: nums = [1,1,2]
Output: [1]
Example 3:

Input: nums = [1]
Output: []
 

Constraints:

n == nums.length
1 <= n <= 105
1 <= nums[i] <= n
Each element in nums appears once or twice.

*/
/* Without hashmap */
/* Using the input array as hashmap just by iterating over it and making the ith element -;*/
function findDuplicates(nums) {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    let value = Math.abs(nums[i]);
    let index = value - 1;
    // console.log(nums[index]);
    if (nums[index] < 0) {
      result.push(nums[value]);
    } else {
      nums[index] *= -1;
    }
  }
  return result;
}

console.log(findDuplicates([1, 2, 3, 3, 4, 5, 6, 7, 7, 9]));
