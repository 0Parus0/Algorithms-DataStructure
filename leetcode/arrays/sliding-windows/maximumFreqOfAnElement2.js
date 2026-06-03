/*
3347. Maximum Frequency of an Element After Performing Operations II
Hard
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

Adding 0 to nums[1], after which nums becomes [1, 4, 5].
Adding -1 to nums[2], after which nums becomes [1, 4, 4].
Example 2:

Input: nums = [5,11,20,20], k = 5, numOperations = 1

Output: 2

Explanation:

We can achieve a maximum frequency of two by:

Adding 0 to nums[1].
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 109
0 <= k <= 109
0 <= numOperations <= nums.length
*/

var maxFrequency = function (nums, k, numOperations) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let maxFreq = 0;

  let l = 0;
  for (let r = 0; r < n; r++) {
    while (nums[r] - nums[l] > 2 * k) {
      l++;
    }

    maxFreq = Math.max(maxFreq, Math.min(numOperations, r - l + 1));
  }

  let left = 0;
  let right = 0;
  for (let i = 0; i < n; ) {
    let target = nums[i];
    let startIdx = i;
    while (i < n && nums[i] === target) i++;
    let countX = i - startIdx;

    while (left < n && nums[left] < target - k) left++;
    while (right < n && nums[right] <= target + k) right++;

    let totalInRange = right - left;
    let othersInRange = totalInRange - countX;

    maxFreq = Math.max(
      maxFreq,
      countX + Math.min(numOperations, othersInRange),
    );
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
  const n = nums.length;
  nums.sort((a, b) => a - b);

  // 1. Pre-calculate frequencies of existing numbers
  const counts = new Map();
  for (const num of nums) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  // 2. Identify all Critical Points
  // These are the only values that could be the optimal target 'x'
  const pointSet = new Set();
  for (const num of nums) {
    pointSet.add(num);
    pointSet.add(num - k);
    pointSet.add(num + k);
  }

  // Sort unique points to use the two-pointer/sweep approach
  const sortedPoints = Array.from(pointSet).sort((a, b) => a - b);

  let maxFreq = 0;
  let left = 0;
  let right = 0;

  // 3. Sweep through the critical points
  for (const p of sortedPoints) {
    // Find the window of nums that fall within [p - k, p + k]
    // Move 'left' to the first index where nums[left] >= p - k
    while (left < n && nums[left] < p - k) {
      left++;
    }
    // Move 'right' to the first index where nums[right] > p + k
    while (right < n && nums[right] <= p + k) {
      right++;
    }

    // Total elements that can potentially reach target 'p'
    const totalInRange = right - left;

    // Elements already equal to 'p' (free operations)
    const targetCount = counts.get(p) || 0;

    // Elements that need 1 operation to reach 'p'
    const othersInRange = totalInRange - targetCount;

    // Result for this specific p
    const currentFreq = targetCount + Math.min(numOperations, othersInRange);

    if (currentFreq > maxFreq) {
      maxFreq = currentFreq;
    }

    // Optimization: cannot exceed total number of elements
    if (maxFreq === n) return n;
  }

  return maxFreq;
};
