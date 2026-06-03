/*
1007. Minimum Domino Rotations For Equal Row
Medium
Topics
premium lock icon
Companies
In a row of dominoes, tops[i] and bottoms[i] represent the top and bottom halves of the ith domino. (A domino is a tile with two numbers from 1 to 6 - one on each half of the tile.)

We may rotate the ith domino, so that tops[i] and bottoms[i] swap values.

Return the minimum number of rotations so that all the values in tops are the same, or all the values in bottoms are the same.

If it cannot be done, return -1.

 

Example 1:


Input: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2]
Output: 2
Explanation: 
The first figure represents the dominoes as given by tops and bottoms: before we do any rotations.
If we rotate the second and fourth dominoes, we can make every value in the top row equal to 2, as indicated by the second figure.
Example 2:

Input: tops = [3,5,1,2,3], bottoms = [3,6,3,3,4]
Output: -1
Explanation: 
In this case, it is not possible to rotate the dominoes to make one row of values equal.
 

Constraints:

2 <= tops.length <= 2 * 104
bottoms.length == tops.length
1 <= tops[i], bottoms[i] <= 6
*/

function minDominoRotations(tops, bottoms) {
  const n = tops.length;

  function minRotationsForTarget(v) {
    let topRotations = 0;
    let bottomRotations = 0;

    for (let i = 0; i < n; i++) {
      if (tops[i] !== v && bottoms[i] !== v) {
        return Infinity; // impossible
      }
      if (tops[i] !== v) topRotations++;
      if (bottoms[i] !== v) bottomRotations++;
    }

    return Math.min(topRotations, bottomRotations);
  }

  let minRotations = Infinity;
  for (let v = 1; v <= 6; v++) {
    minRotations = Math.min(minRotations, minRotationsForTarget(v));
  }

  return minRotations === Infinity ? -1 : minRotations;
}

// ========================================================================
// 2. Approach Two Optimal and best
// ========================================================================
/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
var minDominoRotations = function (tops, bottoms) {
  function check(target) {
    let rotateTop = 0;
    let rotateBottom = 0;

    for (let i = 0; i < tops.length; i++) {
      // impossible
      if (tops[i] !== target && bottoms[i] !== target) {
        return Infinity;
      }

      // rotation needed to make top = target
      if (tops[i] !== target) {
        rotateTop++;
      }

      // rotation needed to make bottom = target
      if (bottoms[i] !== target) {
        rotateBottom++;
      }
    }

    return Math.min(rotateTop, rotateBottom);
  }

  const ans = Math.min(check(tops[0]), check(bottoms[0]));

  return ans === Infinity ? -1 : ans;
};
