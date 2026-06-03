/*
757. Set Intersection Size At Least Two
Hard
Topics
premium lock icon
Companies
You are given a 2D integer array intervals where intervals[i] = [starti, endi] represents all the integers from starti to endi inclusively.

A containing set is an array nums where each interval from intervals has at least two integers in nums.

For example, if intervals = [[1,3], [3,7], [8,9]], then [1,2,4,7,8,9] and [2,3,4,8,9] are containing sets.
Return the minimum possible size of a containing set.

 

Example 1:

Input: intervals = [[1,3],[3,7],[8,9]]
Output: 5
Explanation: let nums = [2, 3, 4, 8, 9].
It can be shown that there cannot be any containing array of size 4.
Example 2:

Input: intervals = [[1,3],[1,4],[2,5],[3,5]]
Output: 3
Explanation: let nums = [2, 3, 4].
It can be shown that there cannot be any containing array of size 2.
Example 3:

Input: intervals = [[1,2],[2,3],[2,4],[4,5]]
Output: 5
Explanation: let nums = [1, 2, 3, 4, 5].
It can be shown that there cannot be any containing array of size 4.
 

Constraints:

1 <= intervals.length <= 3000
intervals[i].length == 2
0 <= starti < endi <= 108
*/
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var intersectionSizeTwo = function (intervals) {
  // Sort by end ascending
  // If tie -> start descending
  intervals.sort((a, b) => {
    if (a[1] === b[1]) {
      return b[0] - a[0];
    }
    return a[1] - b[1];
  });

  let a = -1; // second largest selected
  let b = -1; // largest selected
  let ans = 0;

  for (const [l, r] of intervals) {
    // Case 1: already has 2 points
    if (l <= a) {
      continue;
    }

    // Case 2: has exactly 1 point
    if (l <= b) {
      ans += 1;

      a = b;
      b = r;
    }

    // Case 3: has 0 points
    else {
      ans += 2;

      a = r - 1;
      b = r;
    }
  }

  return ans;
};

// ========================================================================
// 2. Approach
// ========================================================================

/**
 * @param {number[][]} intervals
 * @return {number}
 */
var intersectionSizeTwo = function (intervals) {
  // 1. Sort by end ascending, then by start descending
  intervals.sort((a, b) => {
    if (a[1] !== b[1]) return a[1] - b[1];
    return b[0] - a[0];
  });

  let count = 0;
  // p1 and p2 track the two largest numbers added to our set so far
  let p1 = -1;
  let p2 = -1;

  for (const [start, end] of intervals) {
    // Case 1: Zero points currently inside this interval
    if (p2 < start) {
      count += 2;
      p1 = end - 1;
      p2 = end;
    }
    // Case 2: Only one point (p2) is inside this interval
    else if (p1 < start) {
      count += 1;
      // The old p2 is now the "smaller" of our two points
      p1 = p2;
      // The new "largest" point is the end of the current interval
      p2 = end;
    }
    // Case 3: Both p1 and p2 are >= start, so interval is already covered
  }

  return count;
};
