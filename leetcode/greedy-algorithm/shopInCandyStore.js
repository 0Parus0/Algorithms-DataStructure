/*
Shop in Candy Store
Difficulty: EasyAccuracy: 45.43%Submissions: 101K+Points: 2
In a candy store, there are different types of candies available and prices[i] represent the price of  ith types of candies. You are now provided with an attractive offer.
For every candy you buy from the store, you can get up to k other different candies for free. Find the minimum and maximum amount of money needed to buy all the candies.
Note: In both cases, you must take the maximum number of free candies possible during each purchase.

Examples :

Input: prices[] = [3, 2, 1, 4], k = 2
Output: [3, 7]
Explanation: As according to the offer if you buy one candy you can take at most k more for free. So in the first case, you buy the candy worth 1 and takes candies worth 3 and 4 for free, also you need to buy candy worth 2. So min cost: 1+2 = 3. In the second case, you can buy the candy worth 4 and takes candies worth 1 and 2 for free, also you need to buy candy worth 3. So max cost: 3+4 = 7.
Input: prices[] = [3, 2, 1, 4, 5], k = 4
Output: [1, 5]
Explanation: For minimimum cost buy the candy with the cost 1 and get all the other candies for free. For maximum cost buy the candy with the cost 5 and get all other candies for free.
Constraints:
1 ≤ prices.size() ≤ 105
0 ≤ k ≤ prices.size()
1 ≤ prices[i] ≤ 104
*/
function candyStore(prices, k) {
  // Sort the prices
  prices.sort((a, b) => a - b);

  let minCost = 0;
  let maxCost = 0;
  const n = prices.length;

  // Calculate minimum cost
  let i = 0;
  let j = n - 1;

  while (i <= j) {
    minCost += prices[i];
    i++;
    j -= k; // Skip k candies (get them for free)
  }

  // Calculate maximum cost

  i = 0;
  j = n - 1;

  while (i <= j) {
    maxCost += prices[j];
    j--;
    i += k; // Skip k candies (get them for free)
  }

  return [minCost, maxCost];
}

/*
⏱️ Step 6: Complexity

Time: O(n log n) — because of sorting

Space: O(1)
*/

// Example runs
console.log(candyStore([3, 2, 1, 4], 2)); // [3, 7]
console.log(candyStore([3, 2, 1, 4, 5], 4)); // [1, 5]
