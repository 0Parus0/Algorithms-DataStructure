/*
2279. Maximum Bags With Full Capacity of Rocks
Medium
Topics
premium lock icon
Companies
Hint
You have n bags numbered from 0 to n - 1. You are given two 0-indexed integer arrays capacity and rocks. The ith bag can hold a maximum of capacity[i] rocks and currently contains rocks[i] rocks. You are also given an integer additionalRocks, the number of additional rocks you can place in any of the bags.

Return the maximum number of bags that could have full capacity after placing the additional rocks in some bags.

 

Example 1:

Input: capacity = [2,3,4,5], rocks = [1,2,4,4], additionalRocks = 2
Output: 3
Explanation:
Place 1 rock in bag 0 and 1 rock in bag 1.
The number of rocks in each bag are now [2,3,4,4].
Bags 0, 1, and 2 have full capacity.
There are 3 bags at full capacity, so we return 3.
It can be shown that it is not possible to have more than 3 bags at full capacity.
Note that there may be other ways of placing the rocks that result in an answer of 3.
Example 2:

Input: capacity = [10,2,2], rocks = [2,2,0], additionalRocks = 100
Output: 3
Explanation:
Place 8 rocks in bag 0 and 2 rocks in bag 2.
The number of rocks in each bag are now [10,2,2].
Bags 0, 1, and 2 have full capacity.
There are 3 bags at full capacity, so we return 3.
It can be shown that it is not possible to have more than 3 bags at full capacity.
Note that we did not use all of the additional rocks.
 

Constraints:

n == capacity.length == rocks.length
1 <= n <= 5 * 104
1 <= capacity[i] <= 109
0 <= rocks[i] <= capacity[i]
1 <= additionalRocks <= 109
*/
/**
 * @param {number[]} capacity
 * @param {number[]} rocks
 * @param {number} additionalRocks
 * @return {number}
 */
var maximumBags = function (capacity, rocks, additionalRocks) {
  const n = capacity.length;
  const needed = new Array(n);

  // Calculate how many rocks each bag needs to be full
  for (let i = 0; i < n; i++) {
    needed[i] = capacity[i] - rocks[i];
  }

  // Sort in ascending order to fill bags with smallest need first
  needed.sort((a, b) => a - b);

  let fullBags = 0;
  let remainingRocks = additionalRocks;

  // Greedily fill bags
  for (let i = 0; i < n; i++) {
    if (needed[i] === 0) {
      // Already full
      fullBags++;
    } else if (remainingRocks >= needed[i]) {
      // Can fill this bag completely
      remainingRocks -= needed[i];
      fullBags++;
    } else {
      // Cannot fill this bag or any remaining bags (since needed is sorted)
      break;
    }
  }

  return fullBags;
};

var maximumBags = function (capacity, rocks, additionalRocks) {
  const needed = capacity.map((cap, i) => cap - rocks[i]);
  needed.sort((a, b) => a - b);

  let remaining = additionalRocks;
  let count = 0;

  for (const need of needed) {
    if (remaining >= need) {
      remaining -= need;
      count++;
    } else {
      break;
    }
  }

  return count;
};

/**
 * @param {number[]} capacity
 * @param {number[]} rocks
 * @param {number} additionalRocks
 * @return {number}
 */
const maximumBags = (capacity, rocks, additionalRocks) => {
  const n = capacity.length;
  const diffs = new Uint32Array(n);

  for (let i = 0; i < n; i++) {
    diffs[i] = capacity[i] - rocks[i];
  }

  diffs.sort();
  let res = 0;
  let count = additionalRocks;

  for (let i = 0; i < n; i++) {
    const diff = diffs[i];

    if (count >= diff) {
      count -= diff;
      res++;
    }
  }

  return res;
};
