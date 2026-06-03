/*
132. Palindrome Partitioning II
Hard
Topics
premium lock icon
Companies
Given a string s, partition s such that every substring of the partition is a palindrome.

Return the minimum cuts needed for a palindrome partitioning of s.

 

Example 1:

Input: s = "aab"
Output: 1
Explanation: The palindrome partitioning ["aa","b"] could be produced using 1 cut.
Example 2:

Input: s = "a"
Output: 0
Example 3:

Input: s = "ab"
Output: 1
 

Constraints:

1 <= s.length <= 2000
s consists of lowercase English letters only.
*/
// ========================================================================
// 1. Best and Optimal
// ========================================================================
var minCut = function (s) {
  const n = s.length;
  const dp = Array.from({ length: n }, (_, i) => i);

  for (let mid = 0; mid < n; mid++) {
    expand(s, mid, mid, dp);
    expand(s, mid, mid + 1, dp);
  }

  return dp[n - 1];
};

function expand(s, left, right, dp) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    if (left === 0) {
      dp[right] = 0;
    } else {
      dp[right] = Math.min(dp[right], dp[left - 1] + 1);
    }

    left--;
    right++;
  }
}

var minCut = function (s) {
  const n = s.length;

  // cuts[i] = minimum cuts needed for s[0..i]
  const cuts = new Array(n);

  // Initialize cuts array with worst case (cut every character)
  for (let i = 0; i < n; i++) {
    cuts[i] = i; // maximum cuts needed for s[0..i] is i
  }

  // Expand around center and update cuts
  for (let center = 0; center < n; center++) {
    // Odd length palindromes
    let left = center,
      right = center;
    while (left >= 0 && right < n && s[left] === s[right]) {
      // If substring s[left..right] is palindrome
      if (left === 0) {
        cuts[right] = 0;
      } else {
        cuts[right] = Math.min(cuts[right], cuts[left - 1] + 1);
      }
      left--;
      right++;
    }

    // Even length palindromes
    left = center;
    right = center + 1;
    while (left >= 0 && right < n && s[left] === s[right]) {
      // If substring s[left..right] is palindrome
      if (left === 0) {
        cuts[right] = 0;
      } else {
        cuts[right] = Math.min(cuts[right], cuts[left - 1] + 1);
      }
      left--;
      right++;
    }
  }

  return cuts[n - 1];
};

// ========================================================================
// 2. Recursion + Memoization TLE
// ========================================================================

function minCut(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(-1));
  function solve(i, j) {
    if (i >= j) return 0;

    if (dp[i][j] !== -1) return dp[i][j];
    if (isPalindrome(i, j)) return (dp[i][j] = 0);

    let cuts = Infinity;
    for (let k = i; k <= j - 1; k++) {
      let temp = 1 + solve(i, k) + solve(k + 1, j);

      cuts = Math.min(cuts, temp);
    }

    return (dp[i][j] = cuts);
  }

  function isPalindrome(i, j) {
    while (i <= j) {
      if (s[i] !== s[j]) return false;
      i++;
      j--;
    }

    return true;
  }

  return solve(0, n - 1);
}

// ========================================================================
// 3. Recursion + Memoization Passing all tests
// ========================================================================
var minCut = function (s) {
  const n = s.length;

  // Precompute palindromes to avoid O(n) checks
  const palindrome = Array(n)
    .fill()
    .map(() => Array(n).fill(false));

  // Precompute all palindromic substrings
  for (let i = 0; i < n; i++) {
    palindrome[i][i] = true;
  }

  for (let length = 2; length <= n; length++) {
    for (let i = 0; i <= n - length; i++) {
      const j = i + length - 1;
      if (s[i] === s[j]) {
        if (length === 2) {
          palindrome[i][j] = true;
        } else {
          palindrome[i][j] = palindrome[i + 1][j - 1];
        }
      }
    }
  }

  // Memoization for minimum cuts
  const memo = new Array(n);
  for (let i = 0; i < n; i++) {
    memo[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      memo[i][j] = -1;
    }
  }

  function solve(i, j) {
    if (i >= j) return 0;
    if (palindrome[i][j]) return 0;
    if (memo[i][j] !== -1) return memo[i][j];

    let cuts = Infinity;

    // Only try cuts where the left part itself is a palindrome
    // This optimization reduces the number of partitions we try
    for (let k = i; k < j; k++) {
      if (palindrome[i][k]) {
        cuts = Math.min(cuts, 1 + solve(k + 1, j));
      }
    }

    memo[i][j] = cuts;
    return cuts;
  }

  return solve(0, n - 1);
};

// ========================================================================
// 3. Bottom-Up DP Passes all the tests
// ========================================================================

function minCut(s) {
  const n = s.length;

  // Step 1: Precompute all palindromic substrings using DP
  // dp[i][j] = true if substring s[i..j] is a palindrome
  const dp = Array.from({ length: n }, () => new Array(n).fill(false));

  // Fill the palindrome DP table using length-based iteration
  for (let l = 1; l <= n; l++) {
    // l = length of substring
    for (let i = 0; i < n - l + 1; i++) {
      // i = start index
      let j = i + l - 1; // j = end index

      // Base cases:
      if (i === j) {
        // Single character is always a palindrome
        dp[i][j] = true;
      } else if (i + 1 === j) {
        // Two characters: check if they are equal
        dp[i][j] = s[i] === s[j];
      } else {
        // Longer substring: check ends and inner substring
        dp[i][j] = s[i] === s[j] && dp[i + 1][j - 1];
      }
    }
  }

  // Step 2: Compute minimum cuts using another DP array
  // t[i] = minimum cuts needed for substring s[0..i]
  const t = new Array(n).fill(Infinity);

  for (let i = 0; i < n; i++) {
    if (dp[0][i] === true) {
      // Entire substring s[0..i] is a palindrome, no cuts needed
      t[i] = 0;
    } else {
      // Try all possible partitions: s[0..k] + s[k+1..i]
      for (let k = 0; k < i; k++) {
        // If s[k+1..i] is a palindrome, we can cut after position k
        if (dp[k + 1][i] === true) {
          t[i] = Math.min(t[i], 1 + t[k]);
        }
      }
    }
  }

  return t[n - 1];
}

/*
🟢 Time complexity of this step: O(n²)
🟢 Space complexity: O(n²)
*/

console.log(minCut("aab")); // 1
console.log(minCut("a")); // 0
console.log(minCut("ab")); // 1
console.log(minCut("aba")); // 0
console.log(minCut("abcba")); // 0
console.log(minCut("abcbd")); // 2
