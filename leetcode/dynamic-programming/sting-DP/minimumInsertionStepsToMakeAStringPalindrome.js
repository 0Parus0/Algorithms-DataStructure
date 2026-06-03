/*
1312. Minimum Insertion Steps to Make a String Palindrome

Hard
Topics
premium lock icon
Companies
Hint
Given a string s. In one step you can insert any character at any index of the string.

Return the minimum number of steps to make s palindrome.

A Palindrome String is one that reads the same backward as well as forward.

 

Example 1:

Input: s = "zzazz"
Output: 0
Explanation: The string "zzazz" is already palindrome we do not need any insertions.
Example 2:

Input: s = "mbadm"
Output: 2
Explanation: String can be "mbdadbm" or "mdbabdm".
Example 3:

Input: s = "leetcode"
Output: 5
Explanation: Inserting 5 characters the string becomes "leetcodocteel".
 

Constraints:

1 <= s.length <= 500
s consists of lowercase English letters.
*/

// ========================================================================
// 1. Best and Optimal
// ========================================================================
/**
 * @param {string} s
 * @return {number}
 */
var minInsertions = function (s) {
  const n = s.length;
  const dp = new Array(n).fill(0);
  for (let i = n - 2; i >= 0; i--) {
    let prev = 0;
    for (let j = i + 1; j < n; j++) {
      const temp = dp[j];
      if (s[i] === s[j]) {
        dp[j] = prev;
      } else {
        dp[j] = Math.min(dp[j], dp[j - 1]) + 1;
      }
      prev = temp;
    }
  }
  return dp[n - 1];
};

// ========================================================================
// 1. Recursion + Memoization
// ========================================================================
var minInsertions = function (s) {
  const n = s.length;
  const memo = Array(n)
    .fill()
    .map(() => Array(n).fill(-1));

  const dfs = (i, j) => {
    // Base cases
    if (i >= j) return 0;
    if (memo[i][j] !== -1) return memo[i][j];

    if (s[i] === s[j]) {
      // Characters match, no insertion needed for ends
      memo[i][j] = dfs(i + 1, j - 1);
    } else {
      // Characters don't match, insert either s[i] or s[j]
      memo[i][j] = 1 + Math.min(dfs(i + 1, j), dfs(i, j - 1));
    }

    return memo[i][j];
  };

  return dfs(0, n - 1);
};

// ========================================================================
// 2. Using Longest Palindromic Subsequence (Most Intuitive)
// ========================================================================
var minInsertions = function (s) {
  const n = s.length;

  // Find longest palindromic subsequence length
  const longestPalindromicSubseq = (str) => {
    const m = str.length;
    const dp = Array(m)
      .fill()
      .map(() => Array(m).fill(0));

    // All single characters are palindromes of length 1
    for (let i = 0; i < m; i++) {
      dp[i][i] = 1;
    }

    // Build for longer lengths
    for (let length = 2; length <= m; length++) {
      for (let i = 0; i <= m - length; i++) {
        const j = i + length - 1;

        if (str[i] === str[j]) {
          dp[i][j] = 2 + (length === 2 ? 0 : dp[i + 1][j - 1]);
        } else {
          dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
        }
      }
    }

    return dp[0][m - 1];
  };

  const lps = longestPalindromicSubseq(s);
  return n - lps;
};

// ========================================================================
// 1. Direct DP Approach (Bottom-Up)
// ========================================================================
var minInsertions = function (s) {
  const n = s.length;

  // dp[i][j] = minimum insertions needed to make s[i..j] palindrome
  const dp = Array(n)
    .fill()
    .map(() => Array(n).fill(0));

  // Build from smaller substrings to larger ones
  for (let length = 2; length <= n; length++) {
    for (let i = 0; i <= n - length; i++) {
      const j = i + length - 1;

      if (s[i] === s[j]) {
        // Characters match, no extra insertion needed for these ends
        dp[i][j] = dp[i + 1][j - 1];
      } else {
        // Characters don't match, we need to insert either:
        // 1. Insert s[j] at position i, then solve for i..j-1
        // 2. Insert s[i] at position j, then solve for i+1..j
        // Take the minimum of both options + 1 insertion
        dp[i][j] = 1 + Math.min(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][n - 1];
};

// ========================================================================
// 3. Space-Optimized DP (O(n) space)
// ========================================================================
var minInsertions = function (s) {
  const n = s.length;

  // dp[j] represents the minimum insertions for substring starting at i+1, ending at j
  let nextRow = Array(n).fill(0);

  // i goes from end to start
  for (let i = n - 1; i >= 0; i--) {
    let currRow = Array(n).fill(0);

    for (let j = i + 1; j < n; j++) {
      if (s[i] === s[j]) {
        // Characters match: dp[i][j] = dp[i+1][j-1]
        currRow[j] = nextRow[j - 1];
      } else {
        // Characters don't match: dp[i][j] = 1 + min(dp[i+1][j], dp[i][j-1])
        currRow[j] = 1 + Math.min(nextRow[j], currRow[j - 1]);
      }
    }
    nextRow = currRow;
  }

  return nextRow[n - 1];
};
