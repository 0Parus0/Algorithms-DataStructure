/*
3149. Find the Minimum Cost Array Permutation
Solved
Hard
Topics
premium lock icon
Companies
Hint
You are given an array nums which is a permutation of [0, 1, 2, ..., n - 1]. The score of any permutation of [0, 1, 2, ..., n - 1] named perm is defined as:

score(perm) = |perm[0] - nums[perm[1]]| + |perm[1] - nums[perm[2]]| + ... + |perm[n - 1] - nums[perm[0]]|

Return the permutation perm which has the minimum possible score. If multiple permutations exist with this score, return the one that is lexicographically smallest among them.

 

Example 1:

Input: nums = [1,0,2]

Output: [0,1,2]

Explanation:



The lexicographically smallest permutation with minimum cost is [0,1,2]. The cost of this permutation is |0 - 0| + |1 - 2| + |2 - 1| = 2.

Example 2:

Input: nums = [0,2,1]

Output: [0,2,1]

Explanation:



The lexicographically smallest permutation with minimum cost is [0,2,1]. The cost of this permutation is |0 - 1| + |2 - 2| + |1 - 0| = 2.

 

Constraints:

2 <= n == nums.length <= 14
nums is a permutation of [0, 1, 2, ..., n - 1].
*/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findPermutation = function (nums) {
  const n = nums.length;
  let minScore = Infinity;
  let bestPerm = [];

  const visited = new Array(n).fill(false);
  const currentPerm = [0];
  visited[0] = true;

  function backtrack(lastVal, currentScore) {
    // Pruning: If current score is already worse than the best we've found, stop.
    // This is the only way backtracking survives N=14.
    if (currentScore >= minScore) return;

    // Base case: all numbers used
    if (currentPerm.length === n) {
      // Add the final cost to return to perm[0] (which is 0)
      const finalScore = currentScore + Math.abs(lastVal - nums[0]);

      if (finalScore < minScore) {
        minScore = finalScore;
        bestPerm = [...currentPerm];
      }
      return;
    }

    // Try numbers in increasing order to maintain lexicographical requirement
    for (let i = 1; i < n; i++) {
      if (!visited[i]) {
        visited[i] = true;
        currentPerm.push(i);

        // Calculate incremental cost: |perm[i-1] - nums[perm[i]]|
        const nextScore = currentScore + Math.abs(lastVal - nums[i]);

        backtrack(i, nextScore);

        // Backtrack
        currentPerm.pop();
        visited[i] = false;
      }
    }
  }

  backtrack(0, 0);
  return bestPerm;
};
