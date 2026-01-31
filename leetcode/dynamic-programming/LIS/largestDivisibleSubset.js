/*
368. Largest Divisible Subset
Medium
Topics
premium lock icon
Companies
Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:

answer[i] % answer[j] == 0, or
answer[j] % answer[i] == 0
If there are multiple solutions, return any of them.

 

Example 1:

Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.
Example 2:

Input: nums = [1,2,4,8]
Output: [1,2,4,8]
 

Constraints:

1 <= nums.length <= 1000
1 <= nums[i] <= 2 * 109
All the integers in nums are unique.
*/

/* Bottom Up best */
function largestDivisibleSubset(nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);

  const dp = new Array(n).fill(1);
  const prev = new Array(n).fill(-1);
  let lastChosenIdx = 0;
  let maxL = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] % nums[j] === 0) {
        if (dp[i] < dp[j] + 1) {
          dp[i] = dp[j] + 1;
          prev[i] = j;
        }

        if (dp[i] > maxL) {
          maxL = dp[i];
          lastChosenIdx = i;
        }
      }
    }
  }

  const result = [];

  while (lastChosenIdx !== -1) {
    result.push(nums[lastChosenIdx]);
    lastChosenIdx = prev[lastChosenIdx];
  }
  return result;
}

/* Top down Memoization  just indices  better */
function largestDivisibleSubset(nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);
  // Memoization table: dp[idx][prevIdx];
  // Since prev can be -1, we offset by 1: prevIdx + 1;
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(null));

  function solve(idx, prevIdx) {
    if (idx >= n) return [];

    // Use offset for prevIdx (-1 becomes 0, 0 becomes 1 etc)
    const memoKey = prevIdx + 1;
    if (dp[idx][memoKey] !== null) {
      return dp[idx][memoKey];
    }

    // Option 1: Skip current element
    const skip = solve(idx + 1, prevIdx);

    // Option 2: Take current element if divisible
    let take = [];
    if (prevIdx === -1 || nums[idx] % nums[prevIdx] === 0) {
      const next = solve(idx + 1, idx);
      take = [nums[idx], ...next];
    }

    // Store the longer subset
    dp[idx][memoKey] = take.length > skip.length ? take : skip;
    return dp[idx][memoKey];
  }

  return solve(0, -1);
}

/* Top down with Memoization (whole arrays not good) */
function largestDivisibleSubset(nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);

  // 1. Create a memoiztion map
  const dp = new Map();

  function solve(idx, prevIdx) {
    // Base case
    if (idx >= n) return [];

    // 2. Check cache (using a string key of current index and previous index)
    const key = `${idx}-${prevIdx}`;
    if (dp.has(key)) return dp.get(ket);

    // 3. Choice 1: Skip the current number
    let res = solve(idx + 1, prevIdx);

    // 4. Choice 2: Take the current number (only if it's valid)
    if (prevIdx === -1 || nums[idx] % nums[prevIdx] === 0) {
      const take = [nums[idx], ...solve(idx + 1, idx)];
      // Kepp the longer of the two paths
      if (take.length > res.length) res = take;
    }

    dp.set(key, res);
    return res;
  }

  return solve(0, -1);
}

/* Not Memoized */
function largestDivisibleSubset(nums) {
  const n = nums.length;
  nums.sort((a, b) => a - b);

  const result = [];
  const temp = [];

  let prev = -1;

  function solve(idx, prev, temp) {
    // Base case
    if (idx >= n) {
      if (temp.length > result.length) {
        result = [...temp];
      }

      return;
    }

    // Take
    if (prev === -1 || nums[idx] % prev === 0) {
      temp.push(nums[idx]);
      solve(idx + 1, nums[idx], temp);
      temp.pop();
    }

    // Skip
    solve(idx + 1, prev, temp);
  }

  solve(0, prev, temp);
  return result;
}
