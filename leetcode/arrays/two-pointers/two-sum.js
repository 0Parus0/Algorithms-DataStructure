// Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// You can return the answer in any order.

// Example 1:

// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
// Example 2:

// Input: nums = [3,2,4], target = 6
// Output: [1,2]
// Example 3:

// Input: nums = [3,3], target = 6
// Output: [0,1]

// Constraints:

// 2 <= nums.length <= 104
// -109 <= nums[i] <= 109
// -109 <= target <= 109
// Only one valid answer exists.
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const numsMap = {};
  for (let i = 0; i < nums.length; i++) {
    const numToFind = target - nums[i];
    if (numsMap[numToFind] >= 0) return [numsMap[numToFind], i];
    numsMap[nums[i]] = i;
  }

  // const numsMap = {};
  // for (let i = 0; i < nums.length; i++) {
  //   const currentMapVal = numsMap[nums[i]];
  //   if (currentMapVal >= 0) return [currentMapVal, i];
  //   else {
  //     const numberToFind = target - nums[i];
  //     numsMap[numberToFind] = i;
  //   }
  // }

  // for (let i = 0; i < nums.length; i++) {
  //   for (let j = i + 1; j < nums.length; j++) {
  //     if (nums[i] + nums[j] === target) return [i, j];
  //   }
  // }

  // const newMap = new Map();
  // for (let index in nums) {
  //   const numberToFind = target - nums[index];
  //   if (newMap.has(numberToFind)) return [newMap.get(numberToFind), index];
  //   newMap.set(nums[index], index);
  // }

  const newMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    const numToFind = target - nums[i];
    if (newMap.has(numToFind)) return [newMap.get(numToFind), i];
    newMap.set(nums[i], i);
  }

  return null;
};

let nums = [9, 3, 7, 1, 2];
target = 11;
console.log(twoSum(nums, target));
