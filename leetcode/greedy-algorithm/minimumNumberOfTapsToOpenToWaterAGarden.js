/*
1326. Minimum Number of Taps to Open to Water a Garden
Hard
Topics
premium lock icon
Companies
Hint
There is a one-dimensional garden on the x-axis. The garden starts at the point 0 and ends at the point n. (i.e., the length of the garden is n).

There are n + 1 taps located at points [0, 1, ..., n] in the garden.

Given an integer n and an integer array ranges of length n + 1 where ranges[i] (0-indexed) means the i-th tap can water the area [i - ranges[i], i + ranges[i]] if it was open.

Return the minimum number of taps that should be open to water the whole garden, If the garden cannot be watered return -1.

 

Example 1:


Input: n = 5, ranges = [3,4,1,1,0,0]
Output: 1
Explanation: The tap at point 0 can cover the interval [-3,3]
The tap at point 1 can cover the interval [-3,5]
The tap at point 2 can cover the interval [1,3]
The tap at point 3 can cover the interval [2,4]
The tap at point 4 can cover the interval [4,4]
The tap at point 5 can cover the interval [5,5]
Opening Only the second tap will water the whole garden [0,5]
Example 2:

Input: n = 3, ranges = [0,0,0,0]
Output: -1
Explanation: Even if you activate all the four taps you cannot water the whole garden.
 

Constraints:

1 <= n <= 104
ranges.length == n + 1
0 <= ranges[i] <= 100
*/

/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
  let maxReach = Array(n + 1).fill(0);

  for (let i = 0; i <= n; i++) {
    let left = Math.max(0, i - ranges[i]);
    let right = Math.min(n, i + ranges[i]);
    maxReach[left] = Math.max(maxReach[left], right);
  }

  let taps = 0;
  let currEnd = 0;
  let farthest = 0;

  for (let i = 0; i <= n; i++) {
    if (i > farthest) return -1;

    farthest = Math.max(farthest, maxReach[i]);

    if (i === currEnd) {
      if (currEnd !== n) {
        taps++;
        currEnd = farthest;
      }
    }
  }

  return taps;
};

/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function (n, ranges) {
  // Create an array to store the farthest right we can water starting from left
  const maxReach = new Array(n + 1).fill(0);

  // For each tap, calculate the leftmost point it covers (clipped to [0,n])
  // and update maxReach[left] = max(maxReach[left], right)
  for (let i = 0; i < ranges.length; i++) {
    const left = Math.max(0, i - ranges[i]);
    const right = Math.min(n, i + ranges[i]);
    maxReach[left] = Math.max(maxReach[left], right);
  }

  let taps = 0;
  let currentEnd = 0; // The farthest point we can reach so far
  let nextEnd = 0; // The farthest point we can reach in the next step
  let i = 0; // Current position in the garden

  // Greedy covering
  while (i < n) {
    // Expand nextEnd to the farthest we can reach from any point <= currentEnd
    while (i <= currentEnd && i <= n) {
      nextEnd = Math.max(nextEnd, maxReach[i]);
      i++;
    }

    // If we couldn't extend coverage, return -1
    if (currentEnd === nextEnd) {
      return -1;
    }

    // Move to the next segment
    currentEnd = nextEnd;
    taps++;

    // Reset i to continue scanning from next position
    i = currentEnd;
  }

  return taps;
};
