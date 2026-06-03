/*
3776. Minimum Moves to Balance Circular Array
Medium
Topics
premium lock icon
Companies
Hint
You are given a circular array balance of length n, where balance[i] is the net balance of person i.

In one move, a person can transfer exactly 1 unit of balance to either their left or right neighbor.

Return the minimum number of moves required so that every person has a non-negative balance. If it is impossible, return -1.

Note: You are guaranteed that at most 1 index has a negative balance initially.

 

Example 1:

Input: balance = [5,1,-4]

Output: 4

Explanation:

One optimal sequence of moves is:

Move 1 unit from i = 1 to i = 2, resulting in balance = [5, 0, -3]
Move 1 unit from i = 0 to i = 2, resulting in balance = [4, 0, -2]
Move 1 unit from i = 0 to i = 2, resulting in balance = [3, 0, -1]
Move 1 unit from i = 0 to i = 2, resulting in balance = [2, 0, 0]
Thus, the minimum number of moves required is 4.

Example 2:

Input: balance = [1,2,-5,2]

Output: 6

Explanation:

One optimal sequence of moves is:

Move 1 unit from i = 1 to i = 2, resulting in balance = [1, 1, -4, 2]
Move 1 unit from i = 1 to i = 2, resulting in balance = [1, 0, -3, 2]
Move 1 unit from i = 3 to i = 2, resulting in balance = [1, 0, -2, 1]
Move 1 unit from i = 3 to i = 2, resulting in balance = [1, 0, -1, 0]
Move 1 unit from i = 0 to i = 1, resulting in balance = [0, 1, -1, 0]
Move 1 unit from i = 1 to i = 2, resulting in balance = [0, 0, 0, 0]
Thus, the minimum number of moves required is 6.​​​

Example 3:

Input: balance = [-3,2]

Output: -1

Explanation:

​​​​​​​It is impossible to make all balances non-negative for balance = [-3, 2], so the answer is -1.

 

Constraints:

1 <= n == balance.length <= 105
-109 <= balance[i] <= 109
There is at most one negative value in balance initially.
*/
/**
 * @param {number[]} balance
 * @return {number}
 */
var minMoves = function (balance) {
  const n = balance.length;
  let totalSum = 0n;
  let holeIdx = -1;

  for (let i = 0; i < n; i++) {
    totalSum += BigInt(balance[i]);
    if (balance[i] < 0) {
      holeIdx = i;
    }
  }

  if (totalSum < 0n) return -1;

  if (holeIdx === -1) return 0;

  let deficit = BigInt(-balance[holeIdx]);
  let moves = 0n;

  for (let d = 1; d <= Math.floor(n / 2); d++) {
    let rightIdx = (holeIdx + d) % n;
    let leftIdx = (holeIdx - d + n) % n;

    let takeRight =
      deficit < BigInt(balance[rightIdx]) ? deficit : BigInt(balance[rightIdx]);
    moves += takeRight * BigInt(d);
    deficit -= takeRight;
    if (deficit === 0n) break;

    if (leftIdx !== rightIdx) {
      let takeLeft =
        deficit < BigInt(balance[leftIdx]) ? deficit : BigInt(balance[leftIdx]);
      moves += takeLeft * BigInt(d);
      deficit -= takeLeft;
      if (deficit === 0n) break;
    }
  }

  return Number(moves);
};

/**
 * @param {number[]} balance
 * @return {number}
 */
var minMoves = function (balance) {
  const n = balance.length;

  let total = 0;
  let negIndex = -1;

  for (let i = 0; i < n; i++) {
    total += balance[i];

    if (balance[i] < 0) {
      negIndex = i;
    }
  }

  // Impossible
  if (total < 0) {
    return -1;
  }

  // Already valid
  if (negIndex === -1) {
    return 0;
  }

  let need = -balance[negIndex];

  const donors = [];

  // Collect positive donors
  for (let i = 0; i < n; i++) {
    if (balance[i] > 0) {
      const d = Math.abs(i - negIndex);
      const dist = Math.min(d, n - d);

      donors.push([dist, balance[i]]);
    }
  }

  // Nearest donors first
  donors.sort((a, b) => a[0] - b[0]);

  let moves = 0;

  for (const [dist, amount] of donors) {
    if (need === 0) break;

    const take = Math.min(need, amount);

    moves += take * dist;
    need -= take;
  }

  return need === 0 ? moves : -1;
};

// ========================================================================
// 1. SECTION NAME
// ========================================================================

/**
 * @param {number[]} balance
 * @return {number}
 */
var minMovesToBalance = function (balance) {
  const n = balance.length;
  let totalSum = 0n;
  let holeIdx = -1;

  // Identify the person with the negative balance and check total capacity
  for (let i = 0; i < n; i++) {
    totalSum += BigInt(balance[i]);
    if (balance[i] < 0) {
      holeIdx = i;
    }
  }

  // If total sum is negative, we can't make everyone non-negative
  if (totalSum < 0n) return -1;

  // If no one has a negative balance, return 0 moves
  if (holeIdx === -1) return 0;

  let deficit = BigInt(-balance[holeIdx]);
  let moves = 0n;

  // Greedily pull balance from the nearest neighbors
  for (let d = 1; d <= Math.floor(n / 2); d++) {
    // Calculate the two possible neighbors at distance 'd'
    let rightIdx = (holeIdx + d) % n;
    let leftIdx = (holeIdx - d + n) % n;

    // Try to take from the right neighbor
    let takeRight =
      deficit < BigInt(balance[rightIdx]) ? deficit : BigInt(balance[rightIdx]);
    moves += takeRight * BigInt(d);
    deficit -= takeRight;
    if (deficit === 0n) break;

    // Try to take from the left neighbor (if it's a different person)
    if (leftIdx !== rightIdx) {
      let takeLeft =
        deficit < BigInt(balance[leftIdx]) ? deficit : BigInt(balance[leftIdx]);
      moves += takeLeft * BigInt(d);
      deficit -= takeLeft;
      if (deficit === 0n) break;
    }
  }

  return Number(moves);
};
