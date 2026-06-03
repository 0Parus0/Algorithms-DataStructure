/*
3346. Maximum Frequency of an Element After Performing Operations I

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
// 1. Difference Array Technique T.C: O(N + V) V is maximum value, S.C: O(N)
// ========================================================================

var maxFrequency = function (nums, k, numOperations) {
  let maxNum = 0;
  for (const num of nums) {
    if (num > maxNum) maxNum = num;
  }

  // 1. Use Uint32Array for freq - size only needs to be maxNum + 1
  const freq = new Uint32Array(maxNum + 1);
  for (const num of nums) {
    freq[num]++;
  }

  // 2. Diff array needs to handle targets up to maxNum + k
  const diff = new Int32Array(maxNum + k + 2);
  for (const num of nums) {
    const start = Math.max(0, num - k);
    const end = num + k;
    diff[start]++;
    diff[end + 1]--;
  }

  let maxFreq = 0;
  let currentTotalInRange = 0;

  for (let x = 0; x < diff.length - 1; x++) {
    currentTotalInRange += diff[x];

    // Array access is much faster than Map.get()
    // We handle the case where x is larger than maxNum with a simple check
    const actualCount = x <= maxNum ? freq[x] : 0;

    const potentialOthers = currentTotalInRange - actualCount;
    const total = actualCount + Math.min(numOperations, potentialOthers);

    if (total > maxFreq) {
      maxFreq = total;
    }
  }

  return maxFreq;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
  let maxNum = 0;
  const freq = new Map();

  for (const num of nums) {
    if (num > maxNum) maxNum = num;
    freq.set(num, (freq.get(num) || 0) + 1);
  }

  const diff = new Int32Array(maxNum + k + 2);

  for (const num of nums) {
    const start = Math.max(0, num - k);
    const end = num + k;
    diff[start]++;
    diff[end + 1]--;
  }

  let maxFreq = 0;
  let currentTotalInRange = 0;

  for (let x = 0; x < diff.length - 1; x++) {
    currentTotalInRange += diff[x];

    const actualCount = freq.get(x) || 0;
    const potentialOthers = currentTotalInRange - actualCount;

    const total = actualCount + Math.min(numOperations, potentialOthers);

    if (total > maxFreq) {
      maxFreq = total;
    }
  }

  return maxFreq;
};

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

/******************************************************************************************************** */

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

// ========================================================================
// 2. Using Sliding Window T.C: O(NLogN) , S.C: O(1)
// ========================================================================

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let maxFreq = 0;

  let left = 0;
  for (let right = 0; right < n; right++) {
    while (nums[right] - nums[left] > 2 * k) {
      left++;
    }

    let totalInRange = right - left + 1;
    maxFreq = Math.max(maxFreq, Math.min(numOperations, totalInRange));
  }

  let l = 0;
  let r = 0;

  for (let i = 0; i < n; ) {
    let target = nums[i];

    let firstOccurrence = i;
    while (i < n && nums[i] === target) {
      i++;
    }
    let countX = i - firstOccurrence;

    while (l < n && nums[l] < target - k) {
      l++;
    }

    while (r < n && nums[r] <= target + k) {
      r++;
    }

    let totalInRange = r - l;
    let othersInRange = totalInRange - countX;
    let currentFreq = countX + Math.min(numOperations, othersInRange);

    maxFreq = Math.max(maxFreq, currentFreq);
  }

  return maxFreq;
};

/**
 * 3346. Maximum Frequency of an Element After Performing Operations I
 *
 * #Plan:
 * 1. **Understand the problem:**
 *    - Each nums[i] can move in range [nums[i] - k, nums[i] + k].
 *    - We want to find where most of these ranges overlap (that’s the max frequency).
 *    - We can only use `numOperations` operations (so we can change at most numOperations elements).
 *
 * 2. **Approach using Difference Array:**
 *    - For each nums[i]:
 *       -> Increment diff[start] by 1
 *       -> Decrement diff[end + 1] by 1
 *    - Then take prefix sum across diff.
 *    - The max prefix value = max possible overlap (max frequency if unlimited operations).
 *    - But since we can only perform `numOperations` operations,
 *      the real answer = min(maxOverlap, numOperations + 1)
 *
 * 3. **Complexity:**
 *    - Time: O(n + max(nums)) (after compression)
 *    - Space: O(max(nums))  (for difference array)
 */

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

/**
 * #Test Cases
 */
console.log(maxFrequency([1, 4, 5], 1, 2)); // Expected 2
console.log(maxFrequency([5, 11, 20, 20], 5, 1)); // Expected 2
console.log(maxFrequency([3, 3, 9, 10], 2, 2)); // Expected 2
console.log(maxFrequency([1, 1, 1], 0, 0)); // Expected 3
console.log(maxFrequency([10, 100, 200], 90, 2)); // Expected 2

/**
 * #Commit Message:
 * feat: implement difference array + prefix sum for maximum frequency
 * - used range updates for all nums[i] -> [nums[i]-k, nums[i]+k]
 * - prefix sum to compute overlap frequency
 * - returned min(maxOverlap, numOperations + 1)
 * - O(n + max(nums)) time, O(max(nums)) space
 */

// ========================================================================
//  2. Using Sliding Windows with sorting slow but uses less space
// ========================================================================

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} numOperations
 * @return {number}
 */
var maxFrequency = function (nums, k, numOperations) {
  // Sort is O(log N) to O(N) space depending on implementation,
  // but we consider this "in-place" for the logic.
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let maxFreq = 0;

  // --- Scenario B: Target x is NOT necessarily in nums ---
  // We look for the densest cluster of numbers within a 2*k range.
  let left = 0;
  for (let right = 0; right < n; right++) {
    while (nums[right] - nums[left] > 2 * k) {
      left++;
    }
    // Total numbers that can reach the midpoint of this window
    let totalInRange = right - left + 1;
    maxFreq = Math.max(maxFreq, Math.min(numOperations, totalInRange));
  }

  // --- Scenario A: Target x IS one of the numbers in nums ---
  // We iterate through the sorted array and treat each unique number as a target.
  let l = 0; // Pointer for x - k
  let r = 0; // Pointer for x + k

  for (let i = 0; i < n; ) {
    let target = nums[i];

    // 1. Count occurrences of the current target 'on the fly'
    let firstOccurrence = i;
    while (i < n && nums[i] === target) {
      i++;
    }
    let countX = i - firstOccurrence;

    // 2. Expand window [target - k, target + k] using two pointers
    // l: first index where nums[l] >= target - k
    while (l < n && nums[l] < target - k) {
      l++;
    }
    // r: first index where nums[r] > target + k
    while (r < n && nums[r] <= target + k) {
      r++;
    }

    // 3. Apply the formula
    let totalInRange = r - l;
    let othersInRange = totalInRange - countX;
    let currentFreq = countX + Math.min(numOperations, othersInRange);

    maxFreq = Math.max(maxFreq, currentFreq);

    // The loop continues from the next unique number (i is already updated)
  }

  return maxFreq;
};

/**
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
