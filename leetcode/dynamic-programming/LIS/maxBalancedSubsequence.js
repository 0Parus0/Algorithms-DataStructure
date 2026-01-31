/*
2926. Maximum Balanced Subsequence Sum
Hard
Topics
premium lock icon
Companies
Hint
You are given a 0-indexed integer array nums.

A subsequence of nums having length k and consisting of indices i0 < i1 < ... < ik-1 is balanced if the following holds:

nums[ij] - nums[ij-1] >= ij - ij-1, for every j in the range [1, k - 1].
A subsequence of nums having length 1 is considered balanced.

Return an integer denoting the maximum possible sum of elements in a balanced subsequence of nums.

A subsequence of an array is a new non-empty array that is formed from the original array by deleting some (possibly none) of the elements without disturbing the relative positions of the remaining elements.

 

Example 1:

Input: nums = [3,3,5,6]
Output: 14
Explanation: In this example, the subsequence [3,5,6] consisting of indices 0, 2, and 3 can be selected.
nums[2] - nums[0] >= 2 - 0.
nums[3] - nums[2] >= 3 - 2.
Hence, it is a balanced subsequence, and its sum is the maximum among the balanced subsequences of nums.
The subsequence consisting of indices 1, 2, and 3 is also valid.
It can be shown that it is not possible to get a balanced subsequence with a sum greater than 14.
Example 2:

Input: nums = [5,-1,-3,8]
Output: 13
Explanation: In this example, the subsequence [5,8] consisting of indices 0 and 3 can be selected.
nums[3] - nums[0] >= 3 - 0.
Hence, it is a balanced subsequence, and its sum is the maximum among the balanced subsequences of nums.
It can be shown that it is not possible to get a balanced subsequence with a sum greater than 13.
Example 3:

Input: nums = [-2,-1]
Output: -1
Explanation: In this example, the subsequence [-1] can be selected.
It is a balanced subsequence, and its sum is the maximum among the balanced subsequences of nums.
 

Constraints:

1 <= nums.length <= 105
-109 <= nums[i] <= 109
*/

/* Top down DP still TLE */

function maxBalancedSubsequenceSum(nums) {
  const n = nums.length;
  const maxEl = Math.max(...nums);
  if (maxEl <= 0) return maxEl;

  const dp = new Map();
  function solve(prev, curr) {
    // Base case:
    if (curr >= n) return 0; // No element sum = 0

    let key = `${prev}-${curr}`;
    if (dp.has(key)) return dp.get(key);

    let take = -Infinity;
    let skip = -Infinity;

    if (prev === -1 || nums[curr] - curr >= nums[prev] - prev) {
      take = nums[curr] + solve(curr, curr + 1);
    }

    skip = solve(prev, curr + 1);
    dp.set(key, Math.max(take, skip));
    return dp.get(key);
  }
  return solve(-1, 0);
}

/* Bottom Up DP Still TLE */

function maxBalancedSubsequenceSum(nums) {
  const n = nums.length;
  let maxEl = Math.max(...nums);
  // const dp = Array.from({ length: n }, (_, i) => nums[i]);
  // const dp Array.from(nums, (el) => el)
  const dp = [...nums];

  let maxSum = -Infinity;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] - i >= nums[j] - j) {
        dp[i] = Math.max(dp[i], dp[j] + nums[i]);
        maxSum = Math.max(maxSum, dp[i]);
      }
    }
  }

  return maxSum > maxEl ? maxSum : maxEl;
}

var maxBalancedSubsequenceSum = function (nums) {
  const n = nums.length;

  // dp Map:
  // key = transformed value a[i] = nums[i] - i
  // value = maximum sum achievable ending with this transformed value
  const dp = new Map();

  let result = -Infinity;

  for (let i = 0; i < n; i++) {
    // Transform: a[i] = nums[i] - i
    // This transforms the condition nums[i_j] - nums[i_{j-1}] >= i_j - i_{j-1}
    // into a[i_j] >= a[i_{j-1}]
    const currentA = nums[i] - i;

    // At minimum, we can start a new subsequence with just current element
    let currentMax = nums[i];

    // Check all previous transformed values that can extend to current element
    // We can extend any subsequence where a[j] <= currentA
    for (const [prevA, prevSum] of dp) {
      if (prevA <= currentA) {
        // If we extend the subsequence ending with prevA,
        // the new sum would be prevSum + nums[i]
        currentMax = Math.max(currentMax, prevSum + nums[i]);
      }
    }

    // Update our dp map for current transformed value
    // We only keep the maximum sum for each transformed value
    if (!dp.has(currentA) || currentMax > dp.get(currentA)) {
      dp.set(currentA, currentMax);
    }

    // Update global result
    result = Math.max(result, currentMax);
  }

  return result;
};

var maxBalancedSubsequenceSum = function (nums) {
  const n = nums.length;
  const dp = new Map(); // key: a[i], value: max sum ending with this a[i]
  let result = -Infinity;

  for (let i = 0; i < n; i++) {
    const currentA = nums[i] - i;
    let currentMax = nums[i];

    // Find maximum among all keys <= currentA
    for (const [key, value] of dp) {
      if (key <= currentA) {
        currentMax = Math.max(currentMax, value + nums[i]);
      }
    }

    // Update dp for currentA
    if (!dp.has(currentA) || currentMax > dp.get(currentA)) {
      dp.set(currentA, currentMax);
    }

    result = Math.max(result, currentMax);
  }

  return result;
};

var maxBalancedSubsequenceSum = function (nums) {
  const n = nums.length;

  // Step 1: Create transformed values a[i] = nums[i] - i
  const a = new Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = nums[i] - i;
  }

  // Step 2: Coordinate compression of a[i] values
  const sortedA = [...new Set(a)].sort((x, y) => x - y);
  const indexMap = new Map();
  sortedA.forEach((val, idx) => indexMap.set(val, idx + 1)); // 1-indexed

  // Step 3: BIT for range maximum query
  const m = sortedA.length;
  const bit = new Array(m + 2).fill(-Infinity);

  function update(idx, val) {
    while (idx <= m) {
      bit[idx] = Math.max(bit[idx], val);
      idx += idx & -idx;
    }
  }

  function query(idx) {
    let maxVal = -Infinity;
    while (idx > 0) {
      maxVal = Math.max(maxVal, bit[idx]);
      idx -= idx & -idx;
    }
    return maxVal;
  }

  // Step 4: Process each element
  let result = -Infinity;

  for (let i = 0; i < n; i++) {
    const compressedIdx = indexMap.get(a[i]);

    // Find maximum sum among all j < i where a[j] <= a[i]
    let currentMax = query(compressedIdx);

    // Start new subsequence or extend existing one
    if (currentMax === -Infinity) {
      currentMax = nums[i];
    } else {
      currentMax = Math.max(nums[i], currentMax + nums[i]);
    }

    // Update result
    result = Math.max(result, currentMax);

    // Update BIT with current maximum sum for a[i]
    update(compressedIdx, currentMax);
  }

  return result;
};

/* Alternative with Segment Tree: */
var maxBalancedSubsequenceSum = function (nums) {
  const n = nums.length;

  // Transform: a[i] = nums[i] - i
  const a = new Array(n);
  for (let i = 0; i < n; i++) {
    a[i] = nums[i] - i;
  }

  // Coordinate compression
  const uniqueSorted = [...new Set(a)].sort((x, y) => x - y);
  const comp = new Map();
  uniqueSorted.forEach((val, idx) => comp.set(val, idx));

  const m = uniqueSorted.length;

  // Segment tree for range maximum query
  const segTree = new Array(4 * m).fill(-Infinity);

  function updateSeg(node, left, right, idx, val) {
    if (left === right) {
      segTree[node] = Math.max(segTree[node], val);
      return;
    }

    const mid = Math.floor((left + right) / 2);
    if (idx <= mid) {
      updateSeg(node * 2, left, mid, idx, val);
    } else {
      updateSeg(node * 2 + 1, mid + 1, right, idx, val);
    }

    segTree[node] = Math.max(segTree[node * 2], segTree[node * 2 + 1]);
  }

  function querySeg(node, left, right, ql, qr) {
    if (ql > right || qr < left) return -Infinity;
    if (ql <= left && right <= qr) return segTree[node];

    const mid = Math.floor((left + right) / 2);
    const leftMax = querySeg(node * 2, left, mid, ql, qr);
    const rightMax = querySeg(node * 2 + 1, mid + 1, right, ql, qr);

    return Math.max(leftMax, rightMax);
  }

  let result = -Infinity;

  for (let i = 0; i < n; i++) {
    const idx = comp.get(a[i]);

    // Query maximum sum for a[j] <= a[i]
    let maxSum = querySeg(1, 0, m - 1, 0, idx);

    if (maxSum === -Infinity) {
      maxSum = nums[i];
    } else {
      maxSum = Math.max(nums[i], maxSum + nums[i]);
    }

    result = Math.max(result, maxSum);

    // Update segment tree
    updateSeg(1, 0, m - 1, idx, maxSum);
  }

  return result;
};
