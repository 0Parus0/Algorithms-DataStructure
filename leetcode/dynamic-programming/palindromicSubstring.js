/*
647. Palindromic Substrings
Medium
Topics
premium lock icon
Companies
Hint
Given a string s, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward.

A substring is a contiguous sequence of characters within the string.

 

Example 1:

Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".
Example 2:

Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
 

Constraints:

1 <= s.length <= 1000
s consists of lowercase English letters.
*/
function countSubstrings(s) {
  const n = s.length;

  // State: dp[i][j] = true : s[i:j] is a palindromic substring where i and j are inclusive indices
  const dp = Array.from({ length: n }, () => new Array(n).fill(false));

  let count = 0;

  for (let l = 1; l <= n; l++) {
    for (let i = 0; i + l - 1 < n; i++) {
      // valid j = i + l - 1 < n
      let j = i + l - 1;
      if (i === j) {
        dp[i][j] = true;
      } else if (i + 1 === j) {
        dp[i][j] = s[i] === s[j];
      } else {
        dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
      }
      if (dp[i][j] === true) count++;
    }
  }
  console.log(dp);
  return count;
}

function countSubstrings1(s) {
  const n = s.length;
  let count = 0;

  function expand(l, r) {
    while (l >= 0 && r < n && s[l] === s[r]) {
      count++;
      l--;
      r++;
    }
  }

  for (let i = 0; i < n; i++) {
    expand(i, i); // odd-length center
    expand(i, i + 1); // even-length center
  }

  return count;
}

function countSubstrings1(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(null));
  let count = 0;

  function check(string, i, j) {
    // Base case:
    if (i >= j) return true;
    if (dp[i][j] !== null) return dp[i][j];
    if (string[i] === string[j]) {
      dp[i][j] = check(string, i + 1, j - 1);
    } else {
      dp[i][j] = false;
    }
    return dp[i][j];
  }

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      if (check(s, i, j)) count++;
    }
  }
  return count;
}

/*
⚙️ Complexity
Type	Complexity
Time	O(n²) — every substring checked once
Space	O(n²) — full dp table
*/

// console.log(countSubstrings("aaa"));
// console.log(countSubstrings("m"));
// console.log(countSubstrings("abc"));
console.log(countSubstrings("aab"));
