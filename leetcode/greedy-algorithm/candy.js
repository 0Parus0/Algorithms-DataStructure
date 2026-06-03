/*
135. Candy
Hard
Topics
premium lock icon
Companies
There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings.

You are giving candies to these children subjected to the following requirements:

Each child must have at least one candy.
Children with a higher rating get more candies than their neighbors.
Return the minimum number of candies you need to have to distribute the candies to the children.

 

Example 1:

Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
Example 2:

Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
The third child gets 1 candy because it satisfies the above two conditions.
 

Constraints:

n == ratings.length
1 <= n <= 2 * 104
0 <= ratings[i] <= 2 * 104
*/

// ========================================================================
// 1. Best and Optimal
// ========================================================================

/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  let n = ratings.length;
  let sum = 1;
  let i = 1;
  while (i < n) {
    while (i < n && ratings[i] === ratings[i - 1]) {
      sum += 1;
      i++;
    }
    let peak = 1;
    while (i < n && ratings[i] > ratings[i - 1]) {
      peak++;
      sum += peak;
      i++;
    }
    let down = 1;
    while (i < n && ratings[i] < ratings[i - 1]) {
      sum += down;
      down++;
      i++;
    }
    if (down > peak) {
      sum += down - peak;
    }
  }
  return sum;
};

// ========================================================================
// 2.  Intuitive but slow
// ========================================================================

/**
 * @param {number[]} ratings
 * @return {number}
 */
var candy = function (ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);

  // Left to right pass: ensure higher rating than left neighbor
  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // Right to left pass: ensure higher rating than right neighbor
  for (let i = n - 2; i >= 0; i--) {
    if (ratings[i] > ratings[i + 1]) {
      candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
  }

  // Sum all candies
  let total = 0;
  for (const candy of candies) {
    total += candy;
  }

  return total;
};

// ========================================================================
// 3.  Optimal
// ========================================================================

var candy = function (ratings) {
  const n = ratings.length;
  let total = 1; // First child gets 1 candy
  let up = 1; // Length of current increasing sequence
  let down = 0; // Length of current decreasing sequence
  let peak = 1; // Length of the peak in the current pattern

  for (let i = 1; i < n; i++) {
    if (ratings[i] > ratings[i - 1]) {
      // Increasing sequence
      up++;
      peak = up;
      down = 0;
      total += up;
    } else if (ratings[i] < ratings[i - 1]) {
      // Decreasing sequence
      down++;
      up = 1;
      total += down;
      if (down >= peak) {
        total++;
      }
    } else {
      // Equal ratings
      up = 1;
      down = 0;
      peak = 1;
      total += 1;
    }
  }

  return total;
};
