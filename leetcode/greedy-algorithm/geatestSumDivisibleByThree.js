/*
1262. Greatest Sum Divisible by Three
Given an integer array nums, return the maximum possible sum of elements of the array such that it is divisible by three.

Example 1:
Input: nums = [3,6,5,1,8]
Output: 18
Explanation: Pick numbers 3, 6, 1 and 8 their sum is 18 (maximum sum divisible by 3).

Example 2:
Input: nums = [4]
Output: 0
Explanation: Since 4 is not divisible by 3, do not pick any number.

Example 3:
Input: nums = [1,2,3,4,4]
Output: 12
Explanation: Pick numbers 1, 3, 4 and 4 their sum is 12 (maximum sum divisible by 3).

Constraints:
1 <= nums.length <= 4 * 104
1 <= nums[i] <= 104
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
  let sum = 0;
  let smallestOne = Infinity;
  let smallestTwo = Infinity;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (nums[i] % 3 === 1) {
      smallestTwo = Math.min(smallestTwo, nums[i] + smallestOne);
      smallestOne = Math.min(smallestOne, nums[i]);
    }
    if (nums[i] % 3 === 2) {
      smallestOne = Math.min(smallestOne, nums[i] + smallestTwo);
      smallestTwo = Math.min(smallestTwo, nums[i]);
    }
  }

  if (sum % 3 === 0) {
    return sum;
  }
  if (sum % 3 === 1) {
    return sum - smallestOne;
  }
  if (sum % 3 === 2) {
    return sum - smallestTwo;
  }
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
  let total = 0;

  // smallest and second smallest remainder-1 numbers
  let r1a = Infinity,
    r1b = Infinity;

  // smallest and second smallest remainder-2 numbers
  let r2a = Infinity,
    r2b = Infinity;

  for (const num of nums) {
    total += num;

    if (num % 3 === 1) {
      if (num < r1a) {
        r1b = r1a;
        r1a = num;
      } else if (num < r1b) {
        r1b = num;
      }
    } else if (num % 3 === 2) {
      if (num < r2a) {
        r2b = r2a;
        r2a = num;
      } else if (num < r2b) {
        r2b = num;
      }
    }
  }

  // Already divisible
  if (total % 3 === 0) {
    return total;
  }

  // Need remainder 1 removed
  if (total % 3 === 1) {
    return Math.max(total - r1a, total - (r2a + r2b));
  }

  // Need remainder 2 removed
  return Math.max(total - r2a, total - (r1a + r1b));
};

// ========================================================================
// 2. Bottom-up DP
// ========================================================================
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
  // dp[i] stores the maximum sum such that sum % 3 == i
  let dp = [0, -Infinity, -Infinity];

  for (let num of nums) {
    // Create a copy of the current state to perform updates
    let nextDp = [...dp];

    for (let currentSum of dp) {
      // Only proceed if the currentSum is valid (not -Infinity)
      if (currentSum !== -Infinity) {
        let newSum = currentSum + num;
        let remainder = newSum % 3;

        // Update the state for the calculated remainder
        if (newSum > nextDp[remainder]) {
          nextDp[remainder] = newSum;
        }
      }
    }

    dp = nextDp;
  }

  return dp[0];
};
// ========================================================================
// 3. Recursion + Memoization (slowest)
// ========================================================================

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
  let dp = [0, -Infinity, -Infinity];

  for (const num of nums) {
    const next = [...dp];

    for (let r = 0; r < 3; r++) {
      const newSum = dp[r] + num;
      const newRem = newSum % 3;

      next[newRem] = Math.max(next[newRem], newSum);
    }

    dp = next;
  }

  return dp[0];
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
  const n = nums.length;

  // Create a memoization table: n rows (indices) by 3 columns (remainders 0, 1, 2)
  // Initialized with -1 to indicate the state hasn't been computed.
  const memo = Array.from({ length: n }, () => new Float64Array(3).fill(-1));

  function dfs(i, remainder) {
    // Base Case: If we've processed all numbers
    if (i === n) {
      // If the final remainder is 0, we found a valid sum
      return remainder === 0 ? 0 : -Infinity;
    }

    // Return cached result if available
    if (memo[i][remainder] !== -1) {
      return memo[i][remainder];
    }

    // Choice 1: Skip the current number
    const skip = dfs(i + 1, remainder);

    // Choice 2: Include the current number
    const newRemainder = (remainder + nums[i]) % 3;
    const pick = nums[i] + dfs(i + 1, newRemainder);

    // Store and return the maximum of both choices
    return (memo[i][remainder] = Math.max(skip, pick));
  }

  // Start recursion from the first element with a remainder of 0
  const result = dfs(0, 0);

  // If result is -Infinity, it means no valid sum was found (though 0 is always possible)
  return result < 0 ? 0 : result;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
  const n = nums.length;

  // memo[i][rem]
  const memo = Array.from({ length: n }, () => Array(3).fill(undefined));

  function dfs(i, rem) {
    // Base case
    if (i === n) {
      return rem === 0 ? 0 : -Infinity;
    }

    // Memoized
    if (memo[i][rem] !== undefined) {
      return memo[i][rem];
    }

    // Option 1: skip current number
    const skip = dfs(i + 1, rem);

    // Option 2: take current number
    const newRem = (rem + nums[i]) % 3;
    const take = nums[i] + dfs(i + 1, newRem);

    return (memo[i][rem] = Math.max(skip, take));
  }

  return dfs(0, 0);
};
