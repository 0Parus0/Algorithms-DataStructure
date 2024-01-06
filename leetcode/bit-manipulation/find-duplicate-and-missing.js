/*
Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive.

There is only one repeated number in nums, return this repeated number.

You must solve the problem without modifying the array nums and uses only constant extra space.

 

Example 1:

Input: nums = [1,3,4,2,2]
Output: 2
Example 2:

Input: nums = [3,1,3,4,2]
Output: 3
 

Constraints:

1 <= n <= 105
nums.length == n + 1
1 <= nums[i] <= n
All the integers in nums appear only once except for precisely one integer which appears two or more times.
 

Follow up:

How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?
*/

function findDuplicateAndMissing(numsArr, n = numsArr.length - 1) {
  let allXor = 0;
  for (let i = 0; i <= n; i++) {
    // xor of range 0 to n inclusive
    allXor = allXor ^ i;
  }

  for (let num of numsArr) {
    // xor of range plus numbers of numsArr
    allXor = allXor ^ num;
  }

  let rsbm = allXor & -allXor;
  let x = 0;
  let y = 0;

  for (let num of numsArr) {
    if (num & (rsbm > 0)) {
      x = x ^ num;
    } else {
      y = y ^ num;
    }
  }

  for (let i = 0; i <= n; i++) {
    if (i & (rsbm > 0)) {
      x = x ^ i;
    } else {
      y = y ^ i;
    }
  }
  let missing = 0;
  let duplicate = 0;

  for (let num of numsArr) {
    if (num === x) {
      duplicate = num;
      missing = y;
    } else {
      duplicate = y;
      missing = x;
    }
  }
  console.log({ missing }, { duplicate });
}
let numArr = [3, 1, 3, 4, 3];
// console.log(findDuplicateAndMissing(numArr));

function findDuplicate(numsArr) {
  // start a fast and slow pointer
  // until they meet
  let slow = 0,
    fast = 0;
  do {
    slow = numsArr[slow];
    fast = numsArr[numsArr[fast]];
    console.log({ slow }, { fast });
  } while (slow !== fast);

  // As soon as they meet, move both pointer at same speed
  // until they meet again
  slow = 0;
  while (slow !== fast) {
    slow = numsArr[slow];
    fast = numsArr[fast];
  }

  return slow;
}

console.log(findDuplicate(numArr));
