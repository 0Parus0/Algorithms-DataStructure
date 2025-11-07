/*
1911. Maximum Alternating Subsequence Sum
Medium
Topics
premium lock icon
Companies
Hint
The alternating sum of a 0-indexed array is defined as the sum of the elements at even indices minus the sum of the elements at odd indices.

For example, the alternating sum of [4,2,5,3] is (4 + 5) - (2 + 3) = 4.
Given an array nums, return the maximum alternating sum of any subsequence of nums (after reindexing the elements of the subsequence).

A subsequence of an array is a new array generated from the original array by deleting some elements (possibly none) without changing the remaining elements' relative order. For example, [2,7,4] is a subsequence of [4,2,3,7,2,1,4] (the underlined elements), while [2,4,2] is not.

 

Example 1:

Input: nums = [4,2,5,3]
Output: 7
Explanation: It is optimal to choose the subsequence [4,2,5] with alternating sum (4 + 5) - 2 = 7.
Example 2:

Input: nums = [5,6,7,8]
Output: 8
Explanation: It is optimal to choose the subsequence [8] with alternating sum 8.
Example 3:

Input: nums = [6,2,1,2,4,5]
Output: 10
Explanation: It is optimal to choose the subsequence [6,1,5] with alternating sum (6 + 5) - 1 = 10.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 105
*/
function maxAlternatingSum(nums) {
  let even = 0; // Initializing max sum ending with even index
  let odd = 0; // Initializing max sum ending with odd index

  for (let i = 0; i < nums.length; i++) {
    // We can either skip current, or add it to odd sequence (making it even)
    const newEven = Math.max(even, odd + nums[i]);
    // We can either skip current, or subtract it from even sequence (making it odd)
    const newOdd = Math.max(odd, even - nums[i]);

    even = newEven;
    odd = newOdd;
  }

  return Math.max(even, odd);
}

/* Greedy Approach */
function maxAlternatingSum(nums) {
  let sum = nums[0];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) sum += nums[i] - nums[i - 1];
  }

  return sum;
}

var maxAlternatingSum1 = function (nums) {
  let even = 0; // Maximum alternating sum where last taken element is at even position
  let odd = 0; // Maximum alternating sum where last taken element is at odd position

  for (let i = 0; i < nums.length; i++) {
    // Option 1: Start new subsequence with current as even
    // Option 2: Add current as even to existing odd sequence
    even = Math.max(even, odd + nums[i]);

    // Option 1: Keep previous odd
    // Option 2: Add current as odd to existing even sequence
    odd = Math.max(odd, even - nums[i]);
  }

  return even; // Even will always be >= odd
};

function maxAlternatingSum(nums) {
  const n = nums.length;
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = { even: -1, odd: -1 };
  }

  function dfs(i, isEven) {
    if (i >= n) return 0;

    if (isEven && dp[i].even !== -1) return dp[i].even;
    if (!isEven && dp[i].odd !== -1) return dp[i].odd;

    // Skip current element
    const skip = dfs(i + 1, isEven);

    // Take current element
    const value = isEven ? nums[i] : -nums[i];
    const take = value + dfs(i + 1, !isEven);

    const result = Math.max(skip, take);

    if (isEven) {
      dp[i].even = result;
    } else {
      dp[i].odd = result;
    }
    return result;
  }
  return dfs(0, true);
}

/*
✅ In short:

Approach	Concept	Time	Space
DP (even/odd)	Tracks all add/subtract possibilities	O(n)	O(1)
Greedy	Adds up all positive differences	O(n)	O(1)
*/

function maxAlternatingSum1(nums) {
  const n = nums.length;
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(2).fill(-1);
  }

  function dfs(i, isEven) {
    if (i >= n) return 0;
    if (dp[i][isEven ? 1 : 0] !== -1) return dp[i][isEven ? 1 : 0];

    // Option 1: Skip current element
    const skip = dfs(i + 1, isEven);

    // Option 2: Take current element
    let take;
    if (isEven) {
      take = nums[i] + dfs(i + 1, false); // Add at even position
    } else {
      take = -nums[i] + dfs(i + 1, true); // Subtract at odd position
    }

    dp[i][isEven ? 1 : 0] = Math.max(skip, take);
    return dp[i][isEven ? 1 : 0];
  }

  return dfs(0, true);
}

var maxAlternatingSum1 = function (nums) {
  const n = nums.length;

  // dp[i][0] = max alternating sum up to index i, ending with even position
  // dp[i][1] = max alternating sum up to index i, ending with odd position
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(2).fill(0);
  }

  // Base cases
  dp[0][0] = nums[0]; // Take first element as even
  dp[0][1] = 0; // Can't have odd position with only one element

  for (let i = 1; i < n; i++) {
    // For even position: either skip current, or add it to odd sequence
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + nums[i]);

    // For odd position: either skip current, or subtract it from even sequence
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - nums[i]);
  }

  return Math.max(dp[n - 1][0], dp[n - 1][1]);
};

var maxAlternatingSum1 = function (nums) {
  const n = nums.length;
  const memo = new Array(n);
  for (let i = 0; i < n; i++) {
    memo[i] = new Array(2).fill(-1);
  }

  function dfs(i, isEven) {
    if (i >= n) return 0;
    if (memo[i][isEven ? 1 : 0] !== -1) return memo[i][isEven ? 1 : 0];

    // Option 1: Skip current element
    const skip = dfs(i + 1, isEven);

    // Option 2: Take current element
    let take;
    if (isEven) {
      take = nums[i] + dfs(i + 1, false); // Add at even position
    } else {
      take = -nums[i] + dfs(i + 1, true); // Subtract at odd position
    }

    memo[i][isEven ? 1 : 0] = Math.max(skip, take);
    return memo[i][isEven ? 1 : 0];
  }

  return dfs(0, true); // Start with even position
};

var maxAlternatingSum = function (nums) {
  const n = nums.length;
  const memo = new Array(n);
  for (let i = 0; i < n; i++) {
    memo[i] = new Array(2).fill(-1);
  }

  function dfs(i, isEven) {
    if (i >= n) return 0;
    if (memo[i][isEven] !== -1) return memo[i][isEven];

    // Option 1: Skip current element
    const skip = dfs(i + 1, isEven);

    // Option 2: Take current element
    let take;
    if (isEven) {
      take = nums[i] + dfs(i + 1, 0); // Add at even position
    } else {
      take = -nums[i] + dfs(i + 1, 1); // Subtract at odd position
    }

    memo[i][isEven] = Math.max(skip, take);
    return memo[i][isEven];
  }

  return dfs(0, 1); // Start with even position
};

console.log(maxAlternatingSum([4, 2, 5, 3])); // 7
console.log(maxAlternatingSum([5, 6, 7, 8])); // 8
console.log(maxAlternatingSum([6, 2, 1, 2, 4, 5])); // 10
console.log(maxAlternatingSum([1])); // 1
console.log(maxAlternatingSum([1, 2])); // 2
