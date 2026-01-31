/*
Printing Longest Common Subsequence
Last Updated : 23 Jul, 2025
Given two sequences, print the longest subsequence present in both of them.

Examples: 

LCS for input Sequences “ABCDGH” and “AEDFHR” is “ADH” of length 3. 
LCS for input Sequences “AGGTAB” and “GXTXAYB” is “GTAB” of length 4.
We have discussed Longest Common Subsequence (LCS) problem in a previous post. The function discussed there was mainly to find the length of LCS. To find length of LCS, a 2D table L[][] was constructed. In this post, the function to construct and print LCS is discussed.

Following is detailed algorithm to print the LCS. It uses the same 2D table L[][].

Construct L[m+1][n+1] using the steps discussed in previous post.
The value L[m][n] contains length of LCS. Create a character array lcs[] of length equal to the length of lcs plus 1 (one extra to store \0).
Traverse the 2D array starting from L[m][n]. Do following for every cell L[i][j] 
If characters (in X and Y) corresponding to L[i][j] are same (Or X[i-1] == Y[j-1]), then include this character as part of LCS. 
Else compare values of L[i-1][j] and L[i][j-1] and go in direction of greater value.
The following table (taken from Wiki) shows steps (highlighted) followed by the above algorithm.

 	  0	1	2	3	4	5	6	7
    Ø	M	Z	J	A	W	X	U
0	Ø	0	0	0	0	0	0	0	0
1	X	0	0	0	0	0	0	1	1
2	M	0	1	1	1	1	1	1	1
3	J	0	1	1	2	2	2	2	2
4	Y	0	1	1	2	2	2	2	2
5	A	0	1	1	2	3	3	3	3
6	U	0	1	1	2	3	3	3	4
7	Z	0	1	2	2	3	3	3	4
*/

function longestCommonSubsequence(s1, s2) {
  const n = s1.length;
  const m = s2.length;

  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  let lcs = "";
  let i = n,
    j = m;

  while (i > 0 && j > 0) {
    if (s1[i - 1] === s2[j - 1]) {
      lcs += s1[i - 1];
      i--;
      j--;
    } else {
      if (dp[i - 1][j] > dp[i][j - 1]) {
        i--;
      } else {
        j--;
      }
    }
  }

  console.log(lcs.split("").reverse().join(""));
  return dp[n][m];
}

console.log(longestCommonSubsequence("abcde", "ace"));
