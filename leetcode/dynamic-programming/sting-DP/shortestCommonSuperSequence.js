/*
Shortest Common Supersequence
Difficulty: MediumAccuracy: 55.62%Submissions: 143K+Points: 4
Given two strings s1 and s2, find the length of the smallest string which has both s1 and s2 as its sub-sequences.
Note: s1 and s2 can have both uppercase and lowercase English letters.

Examples:

Input: s1 = "geek", s2 = "eke"
Output: 5
Explanation: String "geeke" has both string "geek" and "eke" as subsequences.
Input: s1 = "AGGTAB", s2 = "GXTXAYB"
Output: 9
Explanation: String "AGXGTXAYB" has both string "AGGTAB" and "GXTXAYB" as subsequences.
Input: s1 = "geek", s2 = "ek"
Output: 4
Explanation: String "geek" has both string "geek" and "ek" as subsequences.
Constraints:
1 ≤ s1.size(), s2.size() ≤ 500
*/

function shortestCommonSuperSequence(s1, s2) {
  const m = s1.length;
  const n = s2.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(-1));

  function solve(i, j) {
    // Base cases
    if (i === 0) return j;
    if (j === 0) return i;
    // if (i === 0 || j === 0) return i + j;

    if (dp[i][j] !== -1) return dp[i][j];

    if (s1[i - 1] === s2[j - 1]) {
      dp[i][j] = 1 + solve(i - 1, j - 1);
    } else {
      dp[i][j] = 1 + Math.min(solve(i - 1, j), solve(i, j - 1));
    }

    return dp[i][j];
  }

  return solve(m, n);
}

/* Bottom up */
function shortestCommonSuperSequence(s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0) {
        dp[i][j] = j;
        continue;
      }
      if (j === 0) {
        dp[i][j] = i;
        continue;
      }

      if (s1[i - 1] === s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

console.log(shortestCommonSuperSequence("abcdcd", "efcd"));
