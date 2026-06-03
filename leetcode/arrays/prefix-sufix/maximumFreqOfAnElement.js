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

function maxFrequency(nums, k, numOperations) {
  const maxInNums = Math.max(...nums);

  const limit = maxInNums + k + 1;

  const freq = new Uint32Array(limit);
  const prefixSum = new Uint32Array(limit);

  for (let num of nums) {
    freq[num]++;
  }

  let running = 0;
  for (let i = 0; i < limit; i++) {
    running += freq[i];
    prefixSum[i] = running;
  }

  let result = 0;

  for (let target = 0; target <= maxInNums; target++) {
    let leftNum = Math.max(0, target - k);
    let rightNum = target + k;

    let totalCountInRange =
      prefixSum[rightNum] - (leftNum > 0 ? prefixSum[leftNum - 1] : 0);

    let targetCount = freq[target];

    let othersInRange = totalCountInRange - targetCount;

    let maxPossibleFreq = targetCount + Math.min(othersInRange, numOperations);

    result = Math.max(result, maxPossibleFreq);

    if (result === nums.length) break;
  }

  return result;
}
function maxFrequency(nums, k, numOperations) {
  const maxInNums = Math.max(...nums);

  const limit = maxInNums + k + 1;

  const freq = new Uint32Array(limit);
  const prefixSum = new Uint32Array(limit);

  for (let num of nums) {
    freq[num]++;
  }

  let running = 0;
  for (let i = 0; i < limit; i++) {
    running += freq[i];
    prefixSum[i] = running;
  }

  let result = 0;

  for (let target = 0; target <= maxInNums; target++) {
    let leftNum = Math.max(0, target - k);
    let rightNum = target + k;

    let totalCountInRange =
      prefixSum[rightNum] - (leftNum > 0 ? prefixSum[leftNum - 1] : 0);

    let targetCount = freq[target];

    let othersInRange = totalCountInRange - targetCount;

    let maxPossibleFreq = targetCount + Math.min(othersInRange, numOperations);

    result = Math.max(result, maxPossibleFreq);

    if (result === nums.length) break;
  }

  return result;
}

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
