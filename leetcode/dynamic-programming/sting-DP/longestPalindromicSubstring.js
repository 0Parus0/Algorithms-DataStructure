/*
5. Longest Palindromic Substring
Medium
Topics
premium lock icon
Companies
Hint
Given a string s, return the longest palindromic substring in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.
*/

// ========================================================================
// 2. Best and Optimal
// ========================================================================

var longestPalindrome = function (s) {
  let start = 0;
  let maxLength = 1;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }

    // palindrome length
    return right - left - 1;
  }

  for (let i = 0; i < s.length; i++) {
    // Odd length palindrome
    const oddLength = expand(i, i);

    // Even length palindrome
    const evenLength = expand(i, i + 1);

    const currentMax = Math.max(oddLength, evenLength);

    if (currentMax > maxLength) {
      maxLength = currentMax;

      start = i - Math.floor((currentMax - 1) / 2);
    }
  }

  return s.substring(start, start + maxLength);
};

var longestPalindrome = function (s) {
  if (!s || s.length < 1) return "";

  let start = 0,
    end = 0;

  const expandAroundCenter = (left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1; // length of the palindrome
  };

  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(i, i); // odd length palindrome
    let len2 = expandAroundCenter(i, i + 1); // even length palindrome
    let maxLen = Math.max(len1, len2);

    if (maxLen > end - start) {
      start = i - Math.floor((maxLen - 1) / 2);
      end = i + Math.floor(maxLen / 2);
    }
  }

  return s.substring(start, end + 1);
};

// ========================================================================
// 1. Brute Force with Bottom Up
// ========================================================================
var longestPalindrome = function (s) {
  const n = s.length;
  if (n === 0) return "";

  const dp = Array(n)
    .fill()
    .map(() => Array(n).fill(false));

  let maxLen = 1;
  let start = 0;

  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLen = 2;
    }
  }

  for (let length = 3; length <= n; length++) {
    for (let i = 0; i <= n - length; i++) {
      const j = i + length - 1;

      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;

        if (length > maxLen) {
          maxLen = length;
          start = i;
        }
      }
    }
  }

  return s.substring(start, start + maxLen);
};

// ========================================================================
// 3. Brute Force with Recursion and memoization will pass
// ========================================================================
var longestPalindrome = function (s) {
  const n = s.length;
  if (n === 0) return "";

  // Create a 2D DP table: dp[i][j] = true if s[i..j] is palindrome
  const dp = Array(n)
    .fill()
    .map(() => Array(n).fill(false));

  let maxLen = 1;
  let start = 0;

  // All single characters are palindromes
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // Check for palindromes of length 2
  for (let i = 0; i < n - 1; i++) {
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLen = 2;
    }
  }

  // Check for palindromes of length 3 and more
  // length is the substring length (3 to n)
  for (let length = 3; length <= n; length++) {
    for (let i = 0; i <= n - length; i++) {
      const j = i + length - 1; // ending index

      // Check if s[i..j] is palindrome:
      // First and last chars must match AND inner substring s[i+1..j-1] must be palindrome
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;

        if (length > maxLen) {
          maxLen = length;
          start = i;
        }
      }
    }
  }

  return s.substring(start, start + maxLen);
};

// Brute-force version with 2D DP and recursion (as requested)
var longestPalindromeRecursive = function (s) {
  const n = s.length;
  if (n === 0) return "";

  // Initialize DP table with null (unknown)
  const dp = Array(n)
    .fill()
    .map(() => Array(n).fill(null));

  // Recursive function with memoization using 2D DP
  const isPalindrome = (i, j) => {
    // Base cases
    if (i >= j) return true;

    // Return memoized result if available
    if (dp[i][j] !== null) return dp[i][j];

    // Check and memoize result
    const result = s[i] === s[j] && isPalindrome(i + 1, j - 1);
    dp[i][j] = result;
    return result;
  };

  let maxLen = 0;
  let start = 0;

  // Two for loops to try all possible substrings
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (isPalindrome(i, j)) {
        const currentLen = j - i + 1;
        if (currentLen > maxLen) {
          maxLen = currentLen;
          start = i;
        }
      }
    }
  }

  return s.substring(start, start + maxLen);
};

// Test cases
console.log("Iterative 2D DP approach:");
console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(longestPalindrome("cbbd")); // "bb"
console.log(longestPalindrome("a")); // "a"
console.log(longestPalindrome("ac")); // "a" or "c"
console.log(longestPalindrome("racecar")); // "racecar"

console.log("\nRecursive with 2D DP memoization:");
console.log(longestPalindromeRecursive("babad")); // "bab" or "aba"
console.log(longestPalindromeRecursive("cbbd")); // "bb"
console.log(longestPalindromeRecursive("a")); // "a"
console.log(longestPalindromeRecursive("ac")); // "a" or "c"
console.log(longestPalindromeRecursive("racecar")); // "racecar"

var longestPalindrome = function (s) {
  const n = s.length;
  if (n === 0) return "";

  // Memoization cache: key = "i,j" -> true/false if s[i..j] is palindrome
  const memo = new Map();

  // Recursive function to check if substring from i to j is palindrome
  const isPalindrome = (i, j) => {
    // Base cases
    if (i >= j) return true; // Single char or empty substring

    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);

    // Check if first and last chars match, and substring between is palindrome
    const result = s[i] === s[j] && isPalindrome(i + 1, j - 1);
    memo.set(key, result);
    return result;
  };

  let maxLen = 0;
  let start = 0;

  // Two for loops to try all possible substrings
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (isPalindrome(i, j)) {
        const currentLen = j - i + 1;
        if (currentLen > maxLen) {
          maxLen = currentLen;
          start = i;
        }
      }
    }
  }

  return s.substring(start, start + maxLen);
};

// Test cases
console.log(longestPalindrome("babad")); // "bab" or "aba"
console.log(longestPalindrome("cbbd")); // "bb"
console.log(longestPalindrome("a")); // "a"
console.log(longestPalindrome("ac")); // "a" or "c"
console.log(longestPalindrome("racecar")); // "racecar"
