/*
3480. Maximize Subarrays After Removing One Conflicting Pair
Hard
Topics
premium lock icon
Companies
Hint
You are given an integer n which represents an array nums containing the numbers from 1 to n in order. Additionally, you are given a 2D array conflictingPairs, where conflictingPairs[i] = [a, b] indicates that a and b form a conflicting pair.

Remove exactly one element from conflictingPairs. Afterward, count the number of non-empty subarrays of nums which do not contain both a and b for any remaining conflicting pair [a, b].

Return the maximum number of subarrays possible after removing exactly one conflicting pair.

 

Example 1:

Input: n = 4, conflictingPairs = [[2,3],[1,4]]

Output: 9

Explanation:

Remove [2, 3] from conflictingPairs. Now, conflictingPairs = [[1, 4]].
There are 9 subarrays in nums where [1, 4] do not appear together. They are [1], [2], [3], [4], [1, 2], [2, 3], [3, 4], [1, 2, 3] and [2, 3, 4].
The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 9.
Example 2:

Input: n = 5, conflictingPairs = [[1,2],[2,5],[3,5]]

Output: 12

Explanation:

Remove [1, 2] from conflictingPairs. Now, conflictingPairs = [[2, 5], [3, 5]].
There are 12 subarrays in nums where [2, 5] and [3, 5] do not appear together.
The maximum number of subarrays we can achieve after removing one element from conflictingPairs is 12.
 

Constraints:

2 <= n <= 105
1 <= conflictingPairs.length <= 2 * n
conflictingPairs[i].length == 2
1 <= conflictingPairs[i][j] <= n
conflictingPairs[i][0] != conflictingPairs[i][1]
*/

// ========================================================================
// 1. Optimal and Intuitive
// ========================================================================
var maxSubarrays = function (n, conflictingPairs) {
  // Group pairs by their right endpoint
  const groups = Array.from({ length: n + 1 }, () => []);

  for (const [a, b] of conflictingPairs) {
    const l = Math.min(a, b);
    const r = Math.max(a, b);
    groups[r].push(l);
  }

  let max1 = 0; // largest left endpoint seen
  let max2 = 0; // second largest left endpoint seen
  let totalValid = 0;
  const gain = new Array(n + 1).fill(0);

  for (let right = 1; right <= n; right++) {
    // Update max1 and max2 with pairs ending at current right
    for (const l of groups[right]) {
      if (l > max1) {
        max2 = max1;
        max1 = l;
      } else if (l > max2) {
        max2 = l;
      }
    }

    // Valid subarrays ending at 'right' start after max1
    totalValid += right - max1;

    // If removing the pair that gave us max1 shows us how many more we'd get
    if (max1 > max2) {
      gain[max1] += max1 - max2;
    }
  }

  let bestGain = Math.max(...gain);
  return totalValid + bestGain;
};

// ========================================================================
// 2. With indices
// ========================================================================
function maxSubarrays(n, conflictingPairs) {
  const conflictMap = Array.from({ length: n + 1 }, () => []);
  let leftIndex = 0;
  let rightIndex = 0;
  let totalSubarrays = 0;
  const profit = new Array(n + 1).fill(0);
  for (const pair of conflictingPairs) {
    const a = pair[0];
    const b = pair[1];
    const maxVal = Math.max(a, b);
    const minVal = Math.min(a, b);
    conflictMap[maxVal].push(minVal);
  }

  for (let i = 1; i <= n; i++) {
    for (const leftConflict of conflictMap[i]) {
      if (leftConflict > leftIndex) {
        rightIndex = leftIndex;
        leftIndex = leftConflict;
      } else if (leftConflict > rightIndex) {
        rightIndex = leftConflict;
      }
    }
    totalSubarrays += i - leftIndex;
    if (leftIndex > 0) {
      profit[leftIndex] += leftIndex - rightIndex;
    }
  }
  const maxProfit = Math.max(...profit);
  return totalSubarrays + maxProfit;
}

// ========================================================================
// 1.  Optimal and best but not Intuitive
// ========================================================================

/**
 * @param {number} n
 * @param {number[][]} conflictingPairs
 * @return {number}
 */
var maximizeSubarrays = function (n, conflictingPairs) {
  const m = conflictingPairs.length;

  // Normalize pairs and store them
  const pairsMin = new Int32Array(m);
  const pairsMax = new Int32Array(m);
  for (let i = 0; i < m; i++) {
    const a = conflictingPairs[i][0];
    const b = conflictingPairs[i][1];
    if (a < b) {
      pairsMin[i] = a;
      pairsMax[i] = b;
    } else {
      pairsMin[i] = b;
      pairsMax[i] = a;
    }
  }

  // Group pair indices by their max value for O(N + M) traversal
  const head = new Int32Array(n + 1).fill(-1);
  const next = new Int32Array(m);
  for (let i = 0; i < m; i++) {
    const r = pairsMax[i];
    next[i] = head[r];
    head[r] = i;
  }

  let L1 = 0; // Largest min-value seen so far
  let L2 = 0; // Second largest min-value seen so far
  let ID = -2; // Index of the pair providing L1 (-2: none, -1: multiple)

  let baseCount = 0;
  const gain = new Float64Array(m);

  for (let r = 1; r <= n; r++) {
    // Update L1, L2, and ID with pairs that have max value equal to r
    for (let i = head[r]; i !== -1; i = next[i]) {
      const minVal = pairsMin[i];
      if (minVal > L1) {
        L2 = L1;
        L1 = minVal;
        ID = i;
      } else if (minVal === L1) {
        ID = -1; // Bottleneck is no longer unique
      } else if (minVal > L2) {
        L2 = minVal;
      }
    }

    // Subarrays ending at r: valid if left endpoint l > L1
    baseCount += r - L1;

    // If pair ID is the unique reason the limit is L1 instead of L2
    if (ID >= 0) {
      gain[ID] += L1 - L2;
    }
  }

  let maxGain = 0;
  for (let i = 0; i < m; i++) {
    if (gain[i] > maxGain) maxGain = gain[i];
  }

  return baseCount + maxGain;
};

/**
 * @param {number} n
 * @param {number[][]} conflictingPairs
 * @return {number}
 */
var maxSubarrays = function (n, conflictingPairs) {
  // groups[r] = all l where pair is (l, r)
  const groups = Array.from({ length: n + 1 }, () => []);

  for (const [a, b] of conflictingPairs) {
    const l = Math.min(a, b);
    const r = Math.max(a, b);

    groups[r].push(l);
  }

  let max1 = 0; // largest active restriction
  let max2 = 0; // second largest active restriction

  let totalValid = 0;

  // gain[x] = benefit if removing pair producing restriction x
  const gain = new Array(n + 1).fill(0);

  for (let right = 1; right <= n; right++) {
    for (const l of groups[right]) {
      if (l > max1) {
        max2 = max1;
        max1 = l;
      } else if (l > max2) {
        max2 = l;
      }
    }

    // valid subarrays ending at right
    totalValid += right - max1;

    // removing strongest restriction adds:
    gain[max1] += max1 - max2;
  }

  let bestGain = 0;

  for (const g of gain) {
    bestGain = Math.max(bestGain, g);
  }

  return totalValid + bestGain;
};

// ========================================================================
// 2. Approach two (slow)
// ========================================================================

/**
 * @param {number} n
 * @param {number[][]} conflictingPairs
 * @return {number}
 */
var maxSubarrays = function (n, conflictingPairs) {
  // groups[r] = all l where pair is (l, r)
  const groups = Array.from({ length: n + 1 }, () => []);

  for (const [a, b] of conflictingPairs) {
    const l = Math.min(a, b);
    const r = Math.max(a, b);

    groups[r].push(l);
  }

  let max1 = 0; // largest active restriction
  let max2 = 0; // second largest active restriction

  let totalValid = 0;

  // gain[x] = benefit if removing pair producing restriction x
  const gain = new Array(n + 1).fill(0);

  for (let right = 1; right <= n; right++) {
    for (const l of groups[right]) {
      if (l > max1) {
        max2 = max1;
        max1 = l;
      } else if (l > max2) {
        max2 = l;
      }
    }

    // valid subarrays ending at right
    totalValid += right - max1;

    // removing strongest restriction adds:
    gain[max1] += max1 - max2;
  }

  let bestGain = 0;

  for (const g of gain) {
    bestGain = Math.max(bestGain, g);
  }

  return totalValid + bestGain;
};
