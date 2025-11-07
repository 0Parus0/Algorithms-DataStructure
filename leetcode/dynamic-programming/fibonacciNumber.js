/*
509. Fibonacci Number
Easy
Topics
premium lock icon
Companies
The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
Given n, calculate F(n).

 

Example 1:

Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
Example 2:

Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
Example 3:

Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.
 

Constraints:

0 <= n <= 30
*/

/* Top-Down approach => recursion + memoization */

function fibTopDown(n) {
  const dp = new Array(n + 1).fill(-1);
  function helper(n) {
    if (dp[n] !== -1) return dp[n];
    if (n <= 1) return n;

    dp[n] = helper(n - 1) + helper(n - 2);
    return dp[n];
  }

  return helper(n);
}

/* Bottom-Up approach => Iterative + memoization */

function fibBottomUp(n) {
  if (n <= 1) return n;
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  console.log(dp);
  return dp[n];
}

/*
⏱️ Step 6: Complexity
Metric	Complexity
Time	O(n)
Space	O(n) (for dp array)
*/

/* Space Optimization with Tabulation or Bottom-Up approach */
function fibSaveSpace(n) {
  if (n <= 1) return n;

  let prev = 0;
  let current = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + current;
    prev = current;
    current = next;
  }

  return current;
}

// Test cases
console.log(fibSaveSpace(0)); // 0
console.log(fibSaveSpace(1)); // 1
console.log(fibSaveSpace(2)); // 1
console.log(fibTopDown(3)); // 2
console.log(fibBottomUp(4)); // 3
console.log(fibTopDown(5)); // 5
console.log(fibSaveSpace(10)); // 55
