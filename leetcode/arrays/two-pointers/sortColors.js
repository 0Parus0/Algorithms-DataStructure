/* 
75. Sort Colors
Medium
Topics
premium lock icon
Companies
Hint
Given an array nums with n objects colored red, white, or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.

 

Example 1:

Input: nums = [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Example 2:

Input: nums = [2,0,1]
Output: [0,1,2]
 

Constraints:

n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.


Follow up: Could you come up with a one-pass algorithm using only constant extra space?
*/

function sortColorsBF(nums) {
  let count0 = 0,
    count1 = 0,
    count2 = 0;
  let n = nums.length;
  // Count the frequencies of 0, 1, and 2
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) count0++;
    else if (nums[i] === 1) count1++;
    else count2++;
  }

  // Overwrite the array based on counts
  for (let i = 0; i < n; i++) {
    if (i < count0) nums[i] = 0;
    else if (i >= count0 && i < count0 + count1) nums[i] = 1;
    else nums[i] = 2;
  }
  return nums;
}

function sortColors(nums) {
  let n = nums.length;
  let low = 0,
    mid = 0,
    high = n - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      // Swap nums[low] and nums[mid]
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      mid++;
      low++;
    } else if (nums[mid] === 1)
      mid++; // just move the mid pointer forward
    else {
      // Swap nums[mid] with nums[high]
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
    }
  }
  return nums;
}

// console.log(sortColors([2, 0, 2, 2,0, 1]));
