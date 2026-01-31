/*
646. Maximum Length of Pair Chain
Medium
Topics
premium lock icon
Companies
You are given an array of n pairs pairs where pairs[i] = [lefti, righti] and lefti < righti.

A pair p2 = [c, d] follows a pair p1 = [a, b] if b < c. A chain of pairs can be formed in this fashion.

Return the length longest chain which can be formed.

You do not need to use up all the given intervals. You can select pairs in any order.

 

Example 1:

Input: pairs = [[1,2],[2,3],[3,4]]
Output: 2
Explanation: The longest chain is [1,2] -> [3,4].
Example 2:

Input: pairs = [[1,2],[7,8],[4,5]]
Output: 3
Explanation: The longest chain is [1,2] -> [4,5] -> [7,8].
 

Constraints:

n == pairs.length
1 <= n <= 1000
-1000 <= lefti < righti <= 1000
*/

/* Approach 1: Top-down Recursion + Memoization */

function findLongestChain(pairs) {
  const n = pairs.length;
  pairs.sort((a, b) => a[0] - b[0]); // sort by start value

  //dp[i][p + 1] ---> stores best answer starting at i, with prev index p
  const dp = Array.from({ length: n }, () => new Array(n + 1).fill(-1));

  function dfs(i, p) {
    if (i === n) return 0;
    if (dp[i][p + 1] !== -1) {
      return dp[i][p + 1];
    }

    // Option 1: skip current pair
    const skip = dfs(i + 1, p);

    // Option 2: take current pair if it follows previous one
    let take = 0;
    if (p === -1 || pairs[i][0] > pairs[p][1]) {
      take = 1 + dfs(i + 1, i);
    }

    dp[i][p + 1] = Math.max(take, skip);
    return dp[i][p + 1];
  }

  return dfs(0, -1);
}

/*Approach 2: Bottom-Up DP with Array */

function findLongestChain(pairs) {
  const n = pairs.length;
  // Sort pairs by first element
  pairs.sort((a, b) => a[0] - b[0]);

  // dp[i] = length of longest chain ending with pairs[i]
  const dp = new Array(n).fill(1);
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (pairs[i][0] > pairs[j][1]) {
        // pairs[i] follows pairs[j]
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}

/* Approach 3: Greedy approach (Optimal) */
function findLongestChain(pairs) {
  // Sort by ending time (greedy approach)
  pairs.sort((a, b) => a[1] - b[1]);

  let count = 1;
  let currentEnd = pairs[0][1];

  for (let i = 1; i < pairs.length; i++) {
    if (pairs[i][0] > currentEnd) {
      count++;
      currentEnd = pairs[i][1];
    }
  }

  return count;
}

console.log(
  findLongestChain([
    [1, 2],
    [2, 3],
    [3, 4],
  ])
); // 2
console.log(
  findLongestChain([
    [1, 2],
    [7, 8],
    [4, 5],
  ])
); // 3
console.log(
  findLongestChain([
    [1, 10],
    [2, 3],
    [4, 5],
    [6, 7],
    [8, 9],
  ])
); // 4
console.log(
  findLongestChain([
    [9, 10],
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
  ])
); // 5
