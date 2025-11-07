/*
72. Edit Distance
Medium
Topics
premium lock icon
Companies
Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

Insert a character
Delete a character
Replace a character
 

Example 1:

Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
Example 2:

Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
 

Constraints:

0 <= word1.length, word2.length <= 500
word1 and word2 consist of lowercase English letters.
*/
function minDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;

  // dp[i][j] = min operations to convert s1[i..] → s2[j..]
  const dp = Array.from({ length: m }, () => new Array(n).fill(-1));

  function solve(i, j) {
    // 🧱 Base cases
    // If we've reached the end of s1, we need to insert all remaining chars of s2
    if (i === m) return n - j;

    // If we've reached the end of s2, we need to delete all remaining chars of s1
    if (j === n) return m - i;

    // 🧠 Memoization check
    if (dp[i][j] !== -1) return dp[i][j];

    // ✅ If current characters match, move both pointers
    if (s1[i] === s2[j]) {
      dp[i][j] = solve(i + 1, j + 1);
    } else {
      // 🔁 Otherwise, we have three possible operations:
      const insertC = 1 + solve(i, j + 1); // insert s2[j] into s1
      const deleteC = 1 + solve(i + 1, j); // delete s1[i]
      const replaceC = 1 + solve(i + 1, j + 1); // replace s1[i] with s2[j]

      // ✅ Choose the minimal-cost operation
      dp[i][j] = Math.min(insertC, deleteC, replaceC);
    }

    return dp[i][j];
  }

  return solve(0, 0);
}

function minDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(-1));

  function solve(m, n) {
    if (m === 0 || n === 0) return m + n;
    if (dp[m][n] !== -1) return dp[m][n];

    if (s1[m - 1] === s2[n - 1]) {
      dp[m][n] = solve(m - 1, n - 1);
    } else {
      const insertC = 1 + solve(m, n - 1);
      const deleteC = 1 + solve(m - 1, n);
      const replaceC = 1 + solve(m - 1, n - 1);
      dp[m][n] = Math.min(insertC, deleteC, replaceC);
    }

    return dp[m][n];
  }

  return solve(m, n);
}

function minDistance(s1, s2) {
  const m = s1.length;
  const n = s2.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = i + j; // insert or delete all
      } else if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // same char, no cost
      } else {
        dp[i][j] =
          1 +
          Math.min(
            dp[i][j - 1], // insert
            dp[i - 1][j], // delete
            dp[i - 1][j - 1] // replace
          );
      }
    }
  }

  return dp[m][n];
}

/*
| Measure   | Complexity                                |
| --------- | ----------------------------------------- |
| **Time**  | `O(m × n)` — each (i, j) solved once      |
| **Space** | `O(m × n)` for dp table + recursion stack |
*/

console.log(minDistance("horse", "ros")); // 3
console.log(minDistance("intention", "execution")); // 5
console.log(minDistance("", "abc")); // 3
console.log(minDistance("abc", "")); // 3
console.log(minDistance("a", "a")); // 0
console.log(minDistance("sea", "eat")); // 2
