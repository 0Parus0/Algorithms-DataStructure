/*
131. Palindrome Partitioning
Medium
Topics
premium lock icon
Companies
Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

 

Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]
 

Constraints:

1 <= s.length <= 16
s contains only lowercase English letters.
*/

function partition(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(false));

  // Step 1: Precompute palindrome substrings
  for (let l = 1; l <= n; l++) {
    for (let i = 0; i + l - 1 < n; i++) {
      const j = i + l - 1;

      if (i === j) {
        dp[i][j] = true; // single char
      } else if (i + 1 === j) {
        dp[i][j] = s[i] === s[j]; // two chars
      } else {
        dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
      }
    }
  }

  const res = [];
  const path = [];

  // Step 2: Backtracking with precomputed dp
  function Backtrack(start) {
    if (start === n) {
      res.push([...path]);
      return;
    }

    for (let end = start; end < n; end++) {
      if (dp[start][end]) {
        // use precomputed palindrome info
        path.push(s.slice(start, end + 1));
        Backtrack(end + 1);
        path.pop(); // backtrack
      }
    }
  }

  Backtrack(0);
  return res;
}

function partition1(s) {
  const res = [];

  function backtrack(start, path) {
    if (start === s.length) {
      res.push([...path]);
      return;
    }

    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        path.push(s.slice(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  }

  backtrack(0, []);
  return res;
}

function isPalindrome(s, i, j) {
  while (i < j) {
    if (s[i] !== s[j]) return false;
    i++;
    j--;
  }
  return true;
}
console.log(partition("aab"));
// [["a","a","b"],["aa","b"]]

console.log(partition("a"));
// [["a"]]

console.log(partition("aaa"));
// [["a","a","a"],["a","aa"],["aa","a"],["aaa"]]
