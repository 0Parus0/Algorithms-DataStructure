/*
3346. Maximum Frequency of an Element After Performing Operations I
Solved
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer array nums and two integers k and numOperations.

You must perform an operation numOperations times on nums, where in each operation you:

Select an index i that was not selected in any previous operations.
Add an integer in the range [-k, k] to nums[i].
Return the maximum possible frequency of any element in nums after performing the operations.

 

Example 1:

Input: nums = [1,4,5], k = 1, numOperations = 2

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1]. nums becomes [1, 4, 5].
Adding -1 to nums[2]. nums becomes [1, 4, 4].
Example 2:

Input: nums = [5,11,20,20], k = 5, numOperations = 1

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1].
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
0 <= k <= 105
0 <= numOperations <= nums.length
*/

// ========================================================================
// 1. Fastest and most Optimal
// ========================================================================

function maxFrequency(nums, k, numOperations) {
  const maxInNums = Math.max(...nums);
  const limit = maxInNums + k + 1;
  const arr = new Uint32Array(limit);

  for (let num of nums) arr[num]++;

  let result = 0;

  // To use only one array, we must realize that:
  // Original frequency of 'target' = arr[target] - arr[target-1]
  // BUT, we have to finish the whole prefix sum first.

  // Build prefix sum in-place
  for (let i = 1; i < limit; i++) {
    arr[i] += arr[i - 1];
  }

  for (let target = 0; target <= maxInNums; target++) {
    let leftNum = Math.max(0, target - k);
    let rightNum = target + k;

    // Total count in range [target-k, target+k]
    let totalInRange = arr[rightNum] - (leftNum > 0 ? arr[leftNum - 1] : 0);

    // Recover original frequency of target
    let targetCount = arr[target] - (target > 0 ? arr[target - 1] : 0);

    let othersInRange = totalInRange - targetCount;
    let currentMax = targetCount + Math.min(othersInRange, numOperations);

    if (currentMax > result) result = currentMax;
  }

  return result;
}

/********************************************************************8 */

function maxFrequency(nums, k, numOperations) {
  const maxInNums = Math.max(...nums);
  // We size the array to handle target + k safely
  const limit = maxInNums + k + 1;

  // 1. Use Uint32Array to avoid overflow (10^5 is too big for Uint8)
  const freq = new Uint32Array(limit);
  const prefixSum = new Uint32Array(limit);

  for (let num of nums) {
    freq[num]++;
  }

  // 2. Build Prefix Sum
  let running = 0;
  for (let i = 0; i < limit; i++) {
    running += freq[i];
    prefixSum[i] = running;
  }

  let result = 0;
  // 3. We only need to check targets up to maxInNums
  for (let target = 0; target <= maxInNums; target++) {
    let leftNum = Math.max(0, target - k);
    let rightNum = target + k; // This is safe because limit = maxInNums + k + 1

    // Count how many numbers in nums fall in [target-k, target+k]
    let totalCountInRange =
      prefixSum[rightNum] - (leftNum > 0 ? prefixSum[leftNum - 1] : 0);

    // Count how many are already the target
    let targetCount = freq[target];

    let othersInRange = totalCountInRange - targetCount;

    let maxPossibleFreq = targetCount + Math.min(othersInRange, numOperations);

    result = Math.max(result, maxPossibleFreq);

    if (result === nums.length) break;
  }

  return result;
}

/*
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
  nums.sort((a, b) => a - b);
  const n = nums.length;

  // Step 1: Pre-calculate frequencies of existing numbers
  const counts = new Map();
  for (const num of nums) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  const uniqueNums = Array.from(counts.keys()).sort((a, b) => a - b);
  let maxFreq = 0;

  // Step 2: Scenario B - Target x is NOT necessarily in nums
  // Find max elements in any window of size 2k
  let left = 0;
  for (let right = 0; right < n; right++) {
    while (nums[right] - nums[left] > 2 * k) {
      left++;
    }
    // Every element in this window takes 1 operation to reach the midpoint
    let totalInRange = right - left + 1;
    maxFreq = Math.max(maxFreq, Math.min(numOperations, totalInRange));
  }

  // Step 3: Scenario A - Target x IS one of the numbers in nums
  // We use two pointers to find the window [x-k, x+k] for each unique x
  let l = 0;
  let r = 0;
  for (const x of uniqueNums) {
    // Move 'l' to the first element >= x - k
    while (l < n && nums[l] < x - k) {
      l++;
    }
    // Move 'r' to the last element <= x + k
    while (r < n && nums[r] <= x + k) {
      r++;
    }

    // Window size is r - l
    const totalInRange = r - l;
    const countX = counts.get(x);
    const othersInRange = totalInRange - countX;

    // Formula: free hits (countX) + limited shifts (numOperations)
    const currentFreq = countX + Math.min(numOperations, othersInRange);
    maxFreq = Math.max(maxFreq, currentFreq);
  }

  return maxFreq;
};

// ========================================================================
// 2. Approach Two (Using Difference Array (Line sweep ) Technique) fastest but uses more Space
// ========================================================================

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
  let maxNum = 0;
  const freq = new Map();

  // Find the max value to determine the size of our difference array
  // nums[i] is up to 10^5, k is up to 10^5, so max target could be 200,000
  for (const num of nums) {
    if (num > maxNum) maxNum = num;
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  // Difference array to track how many nums[i] cover each target value x
  // Range is [num - k, num + k]
  const diff = new Int32Array(maxNum + k + 2);

  for (const num of nums) {
    const start = Math.max(0, num - k);
    const end = num + k;
    diff[start]++;
    diff[end + 1]--;
  }

  let maxFreq = 0;
  let currentTotalInRange = 0;

  // Sweep through all possible target values x
  for (let x = 0; x < diff.length - 1; x++) {
    currentTotalInRange += diff[x];

    const actualCount = freq.get(x) || 0;
    const potentialOthers = currentTotalInRange - actualCount;

    // Formula: existing x's + (others in range limited by numOperations)
    const total = actualCount + Math.min(numOperations, potentialOthers);

    if (total > maxFreq) {
      maxFreq = total;
    }
  }

  return maxFreq;
};
