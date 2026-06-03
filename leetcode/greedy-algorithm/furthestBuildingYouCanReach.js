/*
1642. Furthest Building You Can Reach
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer array heights representing the heights of buildings, some bricks, and some ladders.

You start your journey from building 0 and move to the next building by possibly using bricks or ladders.

While moving from building i to building i+1 (0-indexed),

If the current building's height is greater than or equal to the next building's height, you do not need a ladder or bricks.
If the current building's height is less than the next building's height, you can either use one ladder or (h[i+1] - h[i]) bricks.
Return the furthest building index (0-indexed) you can reach if you use the given ladders and bricks optimally.

 

Example 1:


Input: heights = [4,2,7,6,9,14,12], bricks = 5, ladders = 1
Output: 4
Explanation: Starting at building 0, you can follow these steps:
- Go to building 1 without using ladders nor bricks since 4 >= 2.
- Go to building 2 using 5 bricks. You must use either bricks or ladders because 2 < 7.
- Go to building 3 without using ladders nor bricks since 7 >= 6.
- Go to building 4 using your only ladder. You must use either bricks or ladders because 6 < 9.
It is impossible to go beyond building 4 because you do not have any more bricks or ladders.
Example 2:

Input: heights = [4,12,2,7,3,18,20,3,19], bricks = 10, ladders = 2
Output: 7
Example 3:

Input: heights = [14,3,19,3], bricks = 17, ladders = 0
Output: 3
 

Constraints:

1 <= heights.length <= 105
1 <= heights[i] <= 106
0 <= bricks <= 109
0 <= ladders <= heights.length
*/

// ========================================================================
// 1. Using (lazy greedy with heap )  swap (Optimal and best)
// ========================================================================
/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
var furthestBuilding = function (heights, bricks, ladders) {
  const heap = [];

  const swap = (i, j) => {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  };

  const push = (val) => {
    heap.push(val);

    let i = heap.length - 1;

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);

      if (heap[parent] <= heap[i]) break;

      swap(parent, i);
      i = parent;
    }
  };

  const pop = () => {
    const top = heap[0];

    const last = heap.pop();

    if (heap.length === 0) return top;

    heap[0] = last;

    let i = 0;

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < heap.length && heap[left] < heap[smallest]) {
        smallest = left;
      }

      if (right < heap.length && heap[right] < heap[smallest]) {
        smallest = right;
      }

      if (smallest === i) break;

      swap(i, smallest);
      i = smallest;
    }

    return top;
  };

  for (let i = 0; i < heights.length - 1; i++) {
    const diff = heights[i + 1] - heights[i];

    if (diff <= 0) continue;

    // assume we use ladder
    push(diff);

    // if we used more ladders than available
    if (heap.length > ladders) {
      bricks -= pop();

      if (bricks < 0) {
        return i;
      }
    }
  }

  return heights.length - 1;
};

// ========================================================================
// 1. Using heap with destructuring (slow)
// ========================================================================

/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
var furthestBuilding = function (heights, bricks, ladders) {
  // Min Heap
  const heap = [];

  function push(val) {
    heap.push(val);

    let i = heap.length - 1;

    while (i > 0) {
      let p = Math.floor((i - 1) / 2);

      if (heap[p] <= heap[i]) break;

      [heap[p], heap[i]] = [heap[i], heap[p]];

      i = p;
    }
  }

  function pop() {
    if (heap.length === 1) {
      return heap.pop();
    }

    const top = heap[0];

    heap[0] = heap.pop();

    let i = 0;

    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < heap.length && heap[left] < heap[smallest]) {
        smallest = left;
      }

      if (right < heap.length && heap[right] < heap[smallest]) {
        smallest = right;
      }

      if (smallest === i) break;

      [heap[i], heap[smallest]] = [heap[smallest], heap[i]];

      i = smallest;
    }

    return top;
  }

  for (let i = 0; i < heights.length - 1; i++) {
    const diff = heights[i + 1] - heights[i];

    if (diff <= 0) continue;

    // assume ladder used
    push(diff);

    // too many ladder usages
    if (heap.length > ladders) {
      bricks -= pop();

      if (bricks < 0) {
        return i;
      }
    }
  }

  return heights.length - 1;
};

// ========================================================================
// 1. Recursion and Memoization (TLE)
// ========================================================================
/**
 * @param {number[]} heights
 * @param {number} bricks
 * @param {number} ladders
 * @return {number}
 */
var furthestBuilding = function (heights, bricks, ladders) {
  const n = heights.length;

  const memo = new Map();

  function dfs(i, bricksLeft, laddersLeft) {
    if (i === n - 1) {
      return i;
    }

    const key = `${i}-${bricksLeft}-${laddersLeft}`;

    if (memo.has(key)) {
      return memo.get(key);
    }

    const diff = heights[i + 1] - heights[i];

    // no resources needed
    if (diff <= 0) {
      return dfs(i + 1, bricksLeft, laddersLeft);
    }

    let ans = i;

    // use bricks
    if (bricksLeft >= diff) {
      ans = Math.max(ans, dfs(i + 1, bricksLeft - diff, laddersLeft));
    }

    // use ladder
    if (laddersLeft > 0) {
      ans = Math.max(ans, dfs(i + 1, bricksLeft, laddersLeft - 1));
    }

    memo.set(key, ans);

    return ans;
  }

  return dfs(0, bricks, ladders);
};
