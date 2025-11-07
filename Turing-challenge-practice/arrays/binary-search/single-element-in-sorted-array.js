/*
540. Single Element in a Sorted Array
Medium
Topics
premium lock iconCompanies

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

*/

function singleNonDuplicate2(nums) {
  let l = 0;
  let r = nums.length - 1;

  while (l < r) {
    let mid = Math.floor((l + r) / 2);

    // check if the numbers of element on the right side are even or odd;

    let isEven;

    if ((r - mid) % 2 === 0) {
      isEven = true;
    } else {
      isEven = false;
    }

    if (nums[mid] === nums[mid + 1]) {
      if (isEven) {
        l = mid + 2;
      } else {
        r = mid - 1;
      }
    } else {
      if (isEven) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
  }
  return nums[r];
}
function singleNonDuplicate(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // Ensure mid is even to check the pair correctly
    if (mid % 2 === 1) {
      mid--; // make mid even to check the next pair
    }

    if (nums[mid] === nums[mid + 1]) {
      // The single element is after mid
      left = mid + 2;
    } else {
      // The single element is at mid or before
      right = mid;
    }
  }

  return nums[left];
}
console.log(singleNonDuplicate([1, 1, 2, 3, 3, 4, 4, 8, 8])); // 2
console.log(singleNonDuplicate([3, 3, 7, 7, 10, 11, 11])); // 10
console.log(singleNonDuplicate([1])); // 1
console.log(singleNonDuplicate([1, 1, 2])); // 2
console.log(singleNonDuplicate2([1, 2, 2])); // 1
