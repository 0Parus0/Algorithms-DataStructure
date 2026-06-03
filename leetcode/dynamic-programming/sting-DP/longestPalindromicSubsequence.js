/*
516. Longest Palindromic Subsequence
Medium
Topics
premium lock icon
Companies
Given a string s, find the longest palindromic subsequence's length in s.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

 

Example 1:

Input: s = "bbbab"
Output: 4
Explanation: One possible longest palindromic subsequence is "bbbb".
Example 2:

Input: s = "cbbd"
Output: 2
Explanation: One possible longest palindromic subsequence is "bb".
 

Constraints:

1 <= s.length <= 1000
s consists only of lowercase English letters.
*/

// ========================================================================
// 1. Recursion + Memoization (Top-Down)
// ========================================================================
var longestPalindromeSubseq = function (s) {
  const n = s.length;
  const memo = Array(n)
    .fill()
    .map(() => Array(n).fill(-1));

  const dfs = (i, j) => {
    // Base cases
    if (i > j) return 0;
    if (i === j) return 1;

    // Return memoized result
    if (memo[i][j] !== -1) return memo[i][j];

    // If characters match, include both ends
    if (s[i] === s[j]) {
      memo[i][j] = 2 + dfs(i + 1, j - 1);
    } else {
      // If not match, try skipping either left or right character
      memo[i][j] = Math.max(dfs(i + 1, j), dfs(i, j - 1));
    }

    return memo[i][j];
  };

  return dfs(0, n - 1);
};

// Test
console.log(longestPalindromeSubseq("bbbab")); // 4
console.log(longestPalindromeSubseq("cbbd")); // 2

// ========================================================================
// 2. Bottom-Up DP (Tabulation)
// ========================================================================
var longestPalindromeSubseq = function (s) {
  const n = s.length;
  const dp = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  // All single characters are palindromes of length 1
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  // Build from smaller lengths to larger lengths
  for (let length = 2; length <= n; length++) {
    for (let i = 0; i <= n - length; i++) {
      const j = i + length - 1;

      if (s[i] === s[j]) {
        // If ends match, add 2 to the inner result
        dp[i][j] = 2 + (length === 2 ? 0 : dp[i + 1][j - 1]);
      } else {
        // If ends don't match, take max of skipping left or right
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][n - 1];
};

// Test
console.log(longestPalindromeSubseq("bbbab")); // 4
console.log(longestPalindromeSubseq("cbbd")); // 2

// ========================================================================
// 3. Space-Optimized Bottom-Up (O(n) space))
// ========================================================================
var longestPalindromeSubseq = function (s) {
  const n = s.length;
  // Only keep current and previous rows
  let dp = Array(n).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    // New row for current i
    let newDp = Array(n).fill(0);
    newDp[i] = 1; // Single character palindrome

    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        // Characters match, add 2 to the diagonal value
        newDp[j] = 2 + (j - i === 1 ? 0 : dp[j - 1]);
      } else {
        // Characters don't match, take max of adjacent cells
        newDp[j] = Math.max(newDp[j - 1], dp[j]);
      }
    }
    dp = newDp;
  }

  return dp[n - 1];
};

// Test
console.log(longestPalindromeSubseq("bbbab")); // 4
console.log(longestPalindromeSubseq("cbbd")); // 2

// ========================================================================
// 4.Alternative Space-Optimized (2-row approach)
// ========================================================================
var longestPalindromeSubseq = function (s) {
  const n = s.length;
  if (n === 0) return 0;

  // Use two rows: current and previous
  let prev = Array(n).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    let curr = Array(n).fill(0);
    curr[i] = 1; // Single character

    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        curr[j] = 2 + (j - i === 1 ? 0 : prev[j - 1]);
      } else {
        curr[j] = Math.max(curr[j - 1], prev[j]);
      }
    }
    prev = curr;
  }

  return prev[n - 1];
};

// Test
console.log(longestPalindromeSubseq("bbbab")); // 4
console.log(longestPalindromeSubseq("cbbd")); // 2

// ========================================================================
// 5. Using Expand
// ========================================================================
var longestPalindromeSubseq = function (s) {
  const n = s.length;
  const memo = Array(n)
    .fill()
    .map(() => Array(n).fill(-1));

  // This is like expanding from both ends
  const expand = (left, right) => {
    if (left > right) return 0;
    if (left === right) return 1;
    if (memo[left][right] !== -1) return memo[left][right];

    // If characters match, we can take both ends
    if (s[left] === s[right]) {
      memo[left][right] = 2 + expand(left + 1, right - 1);
    } else {
      // Try skipping either left or right character
      memo[left][right] = Math.max(
        expand(left + 1, right),
        expand(left, right - 1),
      );
    }

    return memo[left][right];
  };

  return expand(0, n - 1);
};
