/*
995. Minimum Number of K Consecutive Bit Flips
Hard
Topics
premium lock iconCompanies

You are given a binary array nums and an integer k.

A k-bit flip is choosing a subarray of length k from nums and simultaneously changing every 0 in the subarray to 1, and every 1 in the subarray to 0.

Return the minimum number of k-bit flips required so that there is no 0 in the array. If it is not possible, return -1.

A subarray is a contiguous part of an array.

 

Example 1:

Input: nums = [0,1,0], k = 1
Output: 2
Explanation: Flip nums[0], then flip nums[2].

Example 2:

Input: nums = [1,1,0], k = 2
Output: -1
Explanation: No matter how we flip subarrays of size 2, we cannot make the array become [1,1,1].

Example 3:

Input: nums = [0,0,0,1,0,1,1,0], k = 3
Output: 3
Explanation: 
Flip nums[0],nums[1],nums[2]: nums becomes [1,1,1,1,0,1,1,0]
Flip nums[4],nums[5],nums[6]: nums becomes [1,1,1,1,1,0,0,0]
Flip nums[5],nums[6],nums[7]: nums becomes [1,1,1,1,1,1,1,1]

 

Constraints:

    1 <= nums.length <= 105
    1 <= k <= nums.length
*/

function minKBitFlipsBF(nums, k) {
  const n = nums.length;
  let flips = 0;

  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      if (i + k > n) return -1;

      for (let j = i; j <= i + k - 1; j++) {
        // nums[j] = !nums[j]; // this will not work
        // Any of these will work correctly:
        nums[j] = 1 - nums[j]; // Option 1
        // arr[j] = arr[j] ^ 1; // Option 2
        // arr[j] = Number(!arr[j]); // Option 3
      }
      flips++;
    }
  }
  return flips;
}

function minKBitFlips(nums, k) {
  const n = nums.length;
  const queue = [];
  let flips = 0;

  for (let i = 0; i < n; i++) {
    // Remove indices that are no longer in the current window
    if (queue.length > 0 && queue[0] < i) {
      queue.shift();
    }

    // Check if the current bit needs to be flipped
    // The number of flips (queue length) modulo 2 determines the effective flip count
    // if nums[i] is 0 and q.len % 2 === 1 (odd) or if nums[i]  is 1 and q.len % 2 === 0 (even) then we need to flip this window once again
    if (queue.length % 2 === nums[i]) {
      // If we need to flip and the subarray goes beyond the array, return -1
      if (i + k > n) {
        return -1;
      }
      // Record the end index of the flip
      queue.push(i + k - 1);
      flips++;
    }
  }

  return flips;
}

console.log(minKBitFlipsBF([1, 1, 0], 2)); // -1
console.log(minKBitFlipsBF([0, 0, 0, 1, 0, 1, 1, 0], 3)); // -1
let num = 0;
num = !num;
console.log(num); // true (not 1)
console.log(typeof num); // "boolean"
