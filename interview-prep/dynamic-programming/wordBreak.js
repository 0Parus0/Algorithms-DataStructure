/*
139. Word Break
Medium
Topics
premium lock icon
Companies
Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

Example 1:

Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
 

Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
*/

// ========================================================================
// 1. Recursion + Memoization
// ========================================================================

function wordBreak(s, wordDict) {
  const st = new Set(wordDict);
  const memo = new Int8Array(s.length).fill(-1);

  function solve(start) {
    // Base case
    if (start === s.length) return 1;

    // Return memoized result if exists
    if (memo[start] !== -1) {
      return memo[start];
    }

    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);
      if (st.has(word) && solve(end)) {
        memo[start] = 1;
        return 1;
      }
    }

    memo[start] = 0;
    return 0;
  }

  return solve(0);
}

// ========================================================================
// 1. Bottom Up
// ========================================================================

function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Int8Array(s.length + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] === 1 && wordSet.has(s.slice(j, i))) {
        dp[i] = 1;
        break;
      }
    }
  }

  return dp[s.length];
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  let maxLen = 0;
  const st = new Set(wordDict);
  for (let i = 0; i < wordDict.length; i++) {
    maxLen = Math.max(maxLen, wordDict[i].length);
  }
  let dp = new Int8Array(s.length + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= s.length; i++) {
    for (let j = i - 1; j >= Math.max(0, i - maxLen); j--) {
      let str = s.slice(j, i);
      if (dp[j] === 1 && st.has(str)) {
        dp[i] = 1;
        break;
      }
    }
  }
  return dp[s.length];
};
// ========================================================================
// 1. Brute Force (TLE)
// ========================================================================

function wordBreak(s, wordDict) {
  const st = new Set(wordDict);
  const n = s.length;

  function solve(start) {
    if (start >= n) return 1;

    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);
      if (st.has(word) && solve(end)) return 1;
    }
    return 0;
  }

  return solve(0);
}

console.log(wordBreak("applepenapple", ["apple", "pen"]));
