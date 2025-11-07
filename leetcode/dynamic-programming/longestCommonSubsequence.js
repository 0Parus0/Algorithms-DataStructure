/*
1143. Longest Common Subsequence
Medium
Topics
premium lock icon
Companies
Hint
Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

 

Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
 

Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.
*/
function longestCommonSubsequence(text1, text2) {
  const n = text1.length;
  const m = text2.length;

  const dp = Array.from({ length: n }, () => new Array(m).fill(-1));

  function dfs(i, j) {
    if (i === n || j === m) return 0;
    if (dp[i][j] !== -1) return dp[i][j];

    if (text1[i] === text2[j]) {
      dp[i][j] = 1 + dfs(i + 1, j + 1);
    } else {
      dp[i][j] = Math.max(dfs(i + 1, j), dfs(i, j + 1));
    }
    return dp[i][j];
  }

  return dfs(0, 0);
}

function longestCommonSubsequence(text1, text2) {
  const n = text1.length;
  const m = text2.length;

  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(-1));

  function dfs(i, j) {
    // Base case: if we've exhausted either string (before index 0)
    if (i < 0 || j < 0) return 0;

    if (dp[i][j] !== -1) return dp[i][j];

    if (text1[i] === text2[j]) {
      dp[i][j] = 1 + dfs(i - 1, j - 1);
    } else {
      dp[i][j] = Math.max(dfs(i - 1, j), dfs(i, j - 1));
    }

    return dp[i][j];
  }

  // start from last indices (n - 1, m -1)
  return dfs(n - 1, m - 1);
}

/* Bottom-Up Tabulation */
function longestCommonSubsequence(text1, text2) {
  const n = text1.length;
  const m = text2.length;

  // dp[i][j] = LCS length for text1[i:] and text2[j:]
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (text1[i] === text2[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }
  console.log(dp);
  return dp[0][0];
}

/* Alternative approach:  Bottom-Up DP with 2D Array */
var longestCommonSubsequence1 = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;

  // dp[i][j] = LCS length of text1[0..i-1] and text2[0..j-1]
  const dp = new Array(m + 1);
  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(0);
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
};
console.log(longestCommonSubsequence("abcde", "ace")); // 3
// console.log(longestCommonSubsequence("abc", "abc")); // 3
// console.log(longestCommonSubsequence("abc", "def")); // 0
// console.log(longestCommonSubsequence("bsbininm", "jmjkbkjkv")); // 1
