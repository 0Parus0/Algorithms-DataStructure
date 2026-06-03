/*
1481. Least Number of Unique Integers after K Removals
Medium
Topics
premium lock icon
Companies
Hint
Given an array of integers arr and an integer k. Find the least number of unique integers after removing exactly k elements.

 

Example 1:

Input: arr = [5,5,4], k = 1
Output: 1
Explanation: Remove the single 4, only 5 is left.
Example 2:
Input: arr = [4,3,1,1,3,3,2], k = 3
Output: 2
Explanation: Remove 4, 2 and either one of the two 1s or three 3s. 1 and 3 will be left.
 

Constraints:

1 <= arr.length <= 10^5
1 <= arr[i] <= 10^9
0 <= k <= arr.length
*/

var findLeastNumOfUniqueInts = function (arr, k) {
  const freqMap = new Map();
  for (const num of arr) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const frequencies = Array.from(freqMap.values()).sort((a, b) => a - b);

  let uniqueCount = frequencies.length;
  let removed = 0;

  for (const freq of frequencies) {
    if (removed + freq <= k) {
      removed += freq;
      uniqueCount--;
    } else {
      break;
    }
  }

  return uniqueCount;
};

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (arr, k) {
  // Count frequencies
  const freqMap = new Map();

  for (let num of arr) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Extract frequencies
  const freqs = [...freqMap.values()];

  // Sort ascending
  freqs.sort((a, b) => a - b);

  let unique = freqs.length;

  // Remove cheapest groups first
  for (let freq of freqs) {
    if (k >= freq) {
      k -= freq;
      unique--;
    } else {
      break;
    }
  }

  return unique;
};

/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (arr, k) {
  const freq = new Map();
  for (const num of arr) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const frequencies = [...freq.values()];
  frequencies.sort((a, b) => a - b);

  let removed = 0;
  for (let i = 0; i < frequencies.length; i++) {
    if (frequencies[i] <= k) {
      k -= frequencies[i];
      removed++;
    } else {
      break;
    }
  }

  return frequencies.length - removed;
};

// ========================================================================
// 1. Using Count Sort
// ========================================================================
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (arr, k) {
  const freqMap = new Map();

  // Step 1: Count frequencies
  for (let num of arr) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  const n = arr.length;

  // bucket[f] = how many numbers appear f times
  const bucket = new Array(n + 1).fill(0);

  for (let freq of freqMap.values()) {
    bucket[freq]++;
  }

  let unique = freqMap.size;

  // Step 3: Remove smallest frequencies first
  for (let freq = 1; freq <= n; freq++) {
    if (bucket[freq] === 0) continue;

    // How many groups can we fully remove?
    const removable = Math.min(bucket[freq], Math.floor(k / freq));

    k -= removable * freq;

    unique -= removable;

    // Cannot remove more groups
    if (k < freq) {
      break;
    }
  }

  return unique;
};
