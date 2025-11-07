/*
70. Climbing Stairs
Easy
Topics
premium lock icon
Companies
Hint
You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

 

Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
 

Constraints:

1 <= n <= 45
*/
function climbStairsRec(n) {
  const dp = new Array(n + 1).fill(-1);

  function helper(steps) {
    if (steps <= 2) return steps;
    if (dp[steps] !== -1) return dp[steps];

    dp[steps] = helper(steps - 1) + helper(steps - 2);
    return dp[steps];
  }

  return helper(n);
}

function climbStairsIter(n) {
  if (n <= 2) return n;

  let prev = 1; // ways for n - 1
  let curr = 2; // ways for n - 2

  for (let i = 3; i <= n; i++) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

function climbStairsRevRec(n) {
  const dp = new Array(n + 2).fill(-1);

  function helper(i, target) {
    if (i === target) return 1;
    if (i > target) return 0;

    if (dp[i] !== -1) return dp[i];
    dp[i] = helper(i + 1, target) + helper(i + 2, target);
    return dp[i];
  }

  return helper(0, n);
}

function climbStairs(n) {
  const memo = new Array(n + 1).fill(-1);

  const dfs = (step) => {
    if (step > n) return 0;
    if (step === n) return 1;
    if (memo[step] !== -1) return memo[step];

    return (memo[step] = dfs(step + 1) + dfs(step + 2));
  };

  return dfs(0);
}

console.log(climbStairsIter(1)); // 1
console.log(climbStairsRec(2)); // 2
console.log(climbStairsIter(3)); // 3
console.log(climbStairsRec(4)); // 5 (1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2)
console.log(climbStairsIter(5)); // 8
console.log(climbStairsRevRec(1)); // 1
console.log(climbStairsRevRec(2)); // 2
console.log(climbStairsRevRec(3)); // 3
console.log(climbStairsRevRec(4)); // 5
console.log(climbStairsRevRec(5)); // 8
