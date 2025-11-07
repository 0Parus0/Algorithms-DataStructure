/*
Minimum number of Coins
Difficulty: EasyAccuracy: 51.25%Submissions: 103K+Points: 2
Given an infinite supply of each denomination of Indian currency { 1, 2, 5, 10 } and a target value n. Find the minimum number of coins and/or notes needed to make the change for Rs n. 

Examples:

Input: n = 39
Output: 6
Explaination: 39 can be formed using 3 coins of 10 rupees, 1 coin of 5 rupees and 2 coins of 2 rupees so minimum coins required are 6.
Input: n = 121
Output: 13
Explaination: 121 can be formed using 12 coins of 10 rupees and 1 coin of 1 rupees.
Constraints:
1 ≤ n ≤ 106
*/

function minCoins(n) {
  const coins = [10, 5, 2, 1];
  let count = 0;

  for (let coin of coins) {
    if (n === 0) break;
    count += Math.floor(n / coin);
    n %= coin;
  }

  return count;
}

function minCoinsCount(n) {
  const coins = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  let count = 0;
  for (let coin of coins) {
    if (n >= coin) {
      count += Math.floor(n / coin);
      n %= coin;
    }
  }
  return count;
}

function minCoins1(n) {
  const coins = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  let notes = 0;
  i = 0;
  const ans = [];
  while (n) {
    notes = Math.floor(n / coins[i]); // how many notes of this denomination?
    while (notes--) {
      ans.push(coins[i]); // push each note to result
    }
    n %= coins[i]; // reduce remaining amount
    i++; // move to smaller denomination
  }
  return ans;
}

function minCoins1(n) {
  const coins = [2000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
  const ans = [];
  let i = 0;

  while (n > 0) {
    const notes = Math.floor(n / coins[i]); // number of notes of this denomination
    for (let j = 0; j < notes; j++) ans.push(coins[i]); // push them into array
    n %= coins[i]; // reduce amount
    i++;
  }

  return {
    count: ans.length,
    denominations: ans,
  };
}

// Example runs
console.log(minCoins(39)); // 6
console.log(minCoins(121)); // 13
console.log(minCoins1(0)); // 0  ✓
console.log(minCoins1(1)); // 1  ✓
console.log(minCoins1(17)); // 4  (10+5+2) ✓
