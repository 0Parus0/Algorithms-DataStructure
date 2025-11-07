/*
Count number of hops
Difficulty: EasyAccuracy: 43.93%Submissions: 158K+Points: 2
A frog jumps either 1, 2, or 3 steps to go to the top. In how many ways can it reach the top of nth step.

Examples:

Input: n = 4
Output: 7
Explanation: Below are the 7 ways to reach 4th step:
1 step + 1 step + 1 step + 1 step
1 step + 2 step + 1 step
2 step + 1 step + 1 step
1 step + 1 step + 2 step
2 step + 2 step
3 step + 1 step
1 step + 3 step
Input: n = 2
Output: 2
Explanation: Below are the 2 ways to reach 2nd step:
1 step + 1 step 
2 step 
Input: n = 1
Output: 1
Constraints:
1 ≤ n ≤ 30
*/

function countWaysOpt(n) {
  if (n === 0) return 1;
  if (n === 1) return 1;
  if (n === 2) return 2;

  let a = 1,
    b = 1,
    c = 2;
  for (let i = 3; i <= n; i++) {
    const next = a + b + c;
    a = b;
    b = c;
    c = next;
  }

  return c;
}
function countWays(n) {
  const dp = new Array(n + 1).fill(-1);

  function helper(steps) {
    if (steps === 0) return 1;
    if (steps < 0) return 0;
    if (dp[steps] !== -1) return dp[steps];

    dp[steps] = helper(steps - 1) + helper(steps - 2) + helper(steps - 3);
    return dp[steps];
  }

  return helper(n);
}

function countWays(n) {
  const dp = new Array(n + 1).fill(-1);
  function helper(i, target) {
    if (i === target) return 1;
    if (i > target) return 0;

    if (dp[i] !== -1) return dp[i];

    dp[i] =
      helper(i + 1, target) + helper(i + 2, target) + helper(i + 3, target);
    return dp[i];
  }

  return helper(0, n);
}

function countWays(n) {
  if (n === 0) return 1;
  if (n === 1) return 1;
  if (n === 2) return 2;

  const dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }

  return dp[n];
}

console.log(countWays(0)); // 1
console.log(countWaysOpt(1)); // 1
console.log(countWays(2)); // 2
console.log(countWaysOpt(3)); // 4
console.log(countWays(4)); // 7
console.log(countWaysOpt(5)); // 13 (1+2+4+7)
