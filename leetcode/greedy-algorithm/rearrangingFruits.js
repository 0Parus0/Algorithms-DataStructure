/*
2561. Rearranging Fruits
Hard
Topics
premium lock icon
Companies
Hint
You have two fruit baskets containing n fruits each. You are given two 0-indexed integer arrays basket1 and basket2 representing the cost of fruit in each basket. You want to make both baskets equal. To do so, you can use the following operation as many times as you want:

Choose two indices i and j, and swap the ith fruit of basket1 with the jth fruit of basket2.
The cost of the swap is min(basket1[i], basket2[j]).
Two baskets are considered equal if sorting them according to the fruit cost makes them exactly the same baskets.

Return the minimum cost to make both the baskets equal or -1 if impossible.

 

Example 1:

Input: basket1 = [4,2,2,2], basket2 = [1,4,1,2]
Output: 1
Explanation: Swap index 1 of basket1 with index 0 of basket2, which has cost 1. Now basket1 = [4,1,2,2] and basket2 = [2,4,1,2]. Rearranging both the arrays makes them equal.
Example 2:

Input: basket1 = [2,3,4,1], basket2 = [3,2,5,1]
Output: -1
Explanation: It can be shown that it is impossible to make both the baskets equal.
 

Constraints:

basket1.length == basket2.length
1 <= basket1.length <= 105
1 <= basket1[i], basket2[i] <= 109
*/
/**
 * @param {number[]} basket1
 * @param {number[]} basket2
 * @return {number}
 */
var minCost = function (basket1, basket2) {
  const freq = new Map();
  let globalMin = Infinity;

  // Count frequency difference
  for (const x of basket1) {
    freq.set(x, (freq.get(x) || 0) + 1);
    globalMin = Math.min(globalMin, x);
  }

  for (const x of basket2) {
    freq.set(x, (freq.get(x) || 0) - 1);
    globalMin = Math.min(globalMin, x);
  }

  const extra = [];

  // Check feasibility and collect surplus
  for (const [fruit, diff] of freq.entries()) {
    if (diff % 2 !== 0) {
      return -1;
    }

    // Add surplus fruits
    for (let i = 0; i < Math.abs(diff) / 2; i++) {
      extra.push(fruit);
    }
  }

  // Sort extras
  extra.sort((a, b) => a - b);

  let cost = 0;
  const half = extra.length / 2;

  // Only process smaller half
  for (let i = 0; i < half; i++) {
    cost += Math.min(extra[i], globalMin * 2);
  }

  return cost;
};

/**
 * @param {number[]} basket1
 * @param {number[]} basket2
 * @return {number}
 */
var minCost = function (basket1, basket2) {
  const counts = new Map();
  let minAll = Infinity;

  // Count frequencies across both baskets
  // basket1 increments, basket2 decrements
  for (const x of basket1) {
    counts.set(x, (counts.get(x) || 0) + 1);
    if (x < minAll) minAll = x;
  }
  for (const x of basket2) {
    counts.set(x, (counts.get(x) || 0) - 1);
    if (x < minAll) minAll = x;
  }

  const toSwap = [];
  for (let [val, diff] of counts.entries()) {
    // If the difference is odd, we can't split this fruit evenly
    if (diff % 2 !== 0) return -1;

    // The number of fruits of this type that need to be moved
    let numToMove = Math.abs(diff) / 2;
    for (let i = 0; i < numToMove; i++) {
      toSwap.push(val);
    }
  }

  // If no fruits need swapping, cost is 0
  if (toSwap.length === 0) return 0;

  // Sort to identify the smallest elements available for swapping
  toSwap.sort((a, b) => a - b);

  let totalCost = 0;
  // Each swap operation involves 2 elements from the toSwap list
  const numSwaps = toSwap.length / 2;

  for (let i = 0; i < numSwaps; i++) {
    // Minimum of swapping directly or using the smallest fruit as an intermediary
    totalCost += Math.min(toSwap[i], 2 * minAll);
  }

  return totalCost;
};
