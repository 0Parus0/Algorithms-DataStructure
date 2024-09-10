/*
Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

 

Example 1:

Input: nums = [3,2,3]
Output: 3
Example 2:

Input: nums = [2,2,1,1,1,2,2]
Output: 2
 

Constraints:

n == nums.length
1 <= n <= 5 * 104
-109 <= nums[i] <= 109
 

Follow-up: Could you solve the problem in linear time and in O(1) space?
*/
function findMajorityElement(arr) {
  let n = arr.length,
    candidate,
    count = 0;
  for (let i = 0; i < n; i++) {
    if (count === 0) {
      count++;
      candidate = arr[i];
    } else {
      if (candidate === arr[i]) {
        count++;
      } else {
        count--;
      }
    }
  }

  // verify the candidate
  count = 0;
  for (let i = 0; i < n; i++) {
    if (arr[i] === candidate) count++;
  }
  if (count > parseInt(n / 2)) return candidate;
  return -1;
}
let arr = [3, 3, 2, 3, 1, 3, 2, 2, 1, 3, 3];
console.log(findMajorityElement(arr));
