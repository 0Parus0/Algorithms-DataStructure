/*
10. Regular Expression Matching
Hard
Topics
premium lock icon
Companies
Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

'.' Matches any single character.​​​​
'*' Matches zero or more of the preceding element.
The matching should cover the entire input string (not partial).

 

Example 1:

Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".
Example 2:

Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
Example 3:

Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
 

Constraints:

1 <= s.length <= 20
1 <= p.length <= 20
s contains only lowercase English letters.
p contains only lowercase English letters, '.', and '*'.
It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.
*/

/* Optimized */
function isMatch(s, p) {
  const dp = Array.from({ length: 21 }, () => new Array(21).fill(-1));
  function solve(s, p, i, j) {
    if (j === p.length) {
      return i === s.length;
    }

    if (dp[i][j] !== -1) return dp[i][j];

    let fistCharMatched = false;

    if (i < s.length && (p[j] === s[i] || p[j] === ".")) {
      fistCharMatched = true;
    }

    if (j < p.length && p[j + 1] === "*") {
      let take = fistCharMatched && solve(s, p, i + 1, j);
      let notTake = solve(s, p, i, j + 2);

      return (dp[i][j] = take || notTake);
    }

    return (dp[i][j] = fistCharMatched && solve(s, p, i + 1, j + 1));
  }
  return solve(s, p, 0, 0);
}

/*
  Time Complexity: O(M*N) Where M is length of s and N is length of p
  Space Complexity: O(M*N) for dp array
*/

/* Naive - Brute force */

function isMatch(s, p) {
  if (p.length === 0) {
    return s.length === 0;
  }

  let fistCharMatched = false;

  if (s.length > 0 && (p[0] === s[0] || p[0] === ".")) {
    fistCharMatched = true;
  }

  if (p[1] === "*") {
    let take = fistCharMatched && isMatch(s.slice(1), p);
    let notTake = isMatch(s, p.slice(2));

    return take || notTake;
  }

  return fistCharMatched && isMatch(s.slice(1), p.slice(1));
}

/*
  Time Complexity: 2^N * N  (where N is Max(s.length || p.length)) and multiply N is for slicing
  Space Complexity: Max depth of recursion tree which is N (Where N is Max(s.length or p.length))
*/
