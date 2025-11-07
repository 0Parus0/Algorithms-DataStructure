/*
Given a set of m distinct positive integers and a value ‘N’. The problem is to count the total number of ways we can form ‘N’ by doing sum of the array subsets. Repetitions is allowed but rearrangements of elements is not allowed.

Examples : 

Input: arr = {1, 5, 6}, N = 7
Output: 3
Explanation: The different ways are:
1+1+1+1+1+1+1
1+1+5
1+6

Input: arr = {12, 3, 1, 9}, N = 14
Output: 8

*/
function countWaysRec(arr, N) {
  const memo = new Map();

  function dfs(i, target) {
    const key = `${i}-${target}`;
    if (memo.has(key)) return memo.get(key);

    // base cases
    if (target === 0) return 1;
    if (i === arr.length) return 0;

    // choice 1: include arr[i] (repetition allowed)
    let include = 0;
    if (arr[i] <= target) include = dfs(i, target - arr[i]);

    // choice 2: exclude arr[i]
    let exclude = dfs(i + 1, target);

    const result = include + exclude;
    memo.set(key, result);
    return result;
  }

  return dfs(0, N);
}

function countWays(arr, N) {
  const dp = new Array(N + 1).fill(0);
  dp[0] = 1;

  for (let num of arr) {
    for (let sum = num; sum <= N; sum++) {
      dp[sum] += dp[sum - num];
    }
  }

  return dp[N];
}

// Example usage:
console.log(countWays([1, 5, 6], 7)); // 3
console.log(countWays([12, 3, 1, 9], 14)); // 8

// Example usage:
console.log(countWaysRec([1, 5, 6], 7)); // 3
console.log(countWaysRec([12, 3, 1, 9], 14)); // 8

function subSumRepeating(arr, sum, index = 0, n = arr.length) {
  if (sum === 0) return 1;
  if (index === n || sum < 0) return 0;

  return (
    subSumRepeating(arr, sum, index + 1, n) +
    subSumRepeating(arr, sum - arr[index], index, n)
  );
}
let arr = [1, 5, 6],
  sum = 7;

console.log(subSumRepeating(arr, sum));
