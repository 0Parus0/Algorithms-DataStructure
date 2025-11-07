/*
540. Single Element in a Sorted Array
Medium
Topics
premium lock icon
Companies
You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

Return the single element that appears only once.

Your solution must run in O(log n) time and O(1) space.

 

Example 1:

Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2
Example 2:

Input: nums = [3,3,7,7,10,11,11]
Output: 10
 

Constraints:

1 <= nums.length <= 105

0 <= nums[i] <= 105

👉 Before the single element, pairs start at even indices.
👉 After the single element, pairs start at odd indices.
*/

function singleNonDuplicate(nums) {
  let low = 0,
    high = nums.length - 1;

  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (mid % 2 === 1) mid--; // ensure mid is even

    if (nums[mid] === nums[mid + 1]) {
      low = mid + 2; // move to right half
    } else {
      high = mid; // move to left half (including mid)
    }
  }

  return nums[low];
}
