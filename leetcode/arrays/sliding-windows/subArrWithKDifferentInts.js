/*
Given an integer array nums and an integer k, return the number of good subarrays of nums.

A good array is an array where the number of different integers in that array is exactly k.

For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
A subarray is a contiguous part of an array.

 

Example 1:

Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
Example 2:

Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
 

Constraints:

1 <= nums.length <= 2 * 104
1 <= nums[i], k <= nums.length
*/

// Count subarrays with at least K distinct integers
function countAtLeastKDistinct(arr, k) {
  const n = arr.length;
  let start = 0,
    end = 0;
  let distinctCount = 0,
    total = 0;
  const freq = new Map();

  while (end < n) {
    // expand the window
    freq.set(arr[end], (freq.get(arr[end]) || 0) + 1);
    if (freq.get(arr[end]) === 1) distinctCount++;

    // if we have exactly K distinct, count all subarrays starting from 'start'
    while (distinctCount === k) {
      total += n - end; // all subarrays starting at start and ending >= end
      freq.set(arr[start], freq.get(arr[start]) - 1);
      if (freq.get(arr[start]) === 0) distinctCount--;
      start++;
    }

    end++;
  }

  return total;
}

function subarraysWithKDistinct(arr, k) {
  return countAtLeastKDistinct(arr, k) - countAtLeastKDistinct(arr, k + 1);
}

console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)); // ✅ 7
console.log(subarraysWithKDistinct([1, 2, 1, 3, 4], 3)); // ✅ 3

function countSubArr(arr, k) {
  let n = arr.length;
  let start = 0,
    end = 0,
    count = 0,
    total = 0;
  let map = new Map();

  while (end < n) {
    if (!map.has(arr[end])) {
      map.set(arr[end], 0);
    }
    map.set(arr[end], map.get(arr[end]) + 1);
    if (map.get(arr[end]) === 1) count++;
    // Window's size decrease
    while (count === k) {
      total += n - end;
      map.set(arr[start], map.get(arr[start]) - 1);
      if (map.get(arr[start]) === 0) count--;

      start++;
    }

    // Increase the window size
    end++;
  }
  return total;
}

console.log(countSubArr([1, 2, 1, 2, 3], 2));

function subArrWithKDiffInt(arr, k) {
  let atLeastK = countSubArr(arr, k);
  let atleastKPlusOne = countSubArr(arr, k + 1);
  return atLeastK - atleastKPlusOne;
}

// Helper to count subarrays with at most K distinct integers
function atMost(nums, k) {
  let left = 0,
    count = 0;
  const freq = new Map();

  for (let right = 0; right < nums.length; right++) {
    // add nums[right] to window
    freq.set(nums[right], (freq.get(nums[right]) || 0) + 1);

    // if we have more than k distinct, shrink window
    while (freq.size > k) {
      freq.set(nums[left], freq.get(nums[left]) - 1);
      if (freq.get(nums[left]) === 0) freq.delete(nums[left]);
      left++;
    }

    // all subarrays ending at right with valid window
    count += right - left + 1;
  }

  return count;
}

function subarraysWithKDistinct(nums, k) {
  // result = atMost(k) - atMost(k - 1)
  return atMost(nums, k) - atMost(nums, k - 1);
}

console.log(subArrWithKDiffInt([1, 2, 1, 2, 3], 2));
