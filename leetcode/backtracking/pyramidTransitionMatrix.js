/*
756. Pyramid Transition Matrix
Medium
Topics
premium lock icon
Companies
You are stacking blocks to form a pyramid. Each block has a color, which is represented by a single letter. Each row of blocks contains one less block than the row beneath it and is centered on top.

To make the pyramid aesthetically pleasing, there are only specific triangular patterns that are allowed. A triangular pattern consists of a single block stacked on top of two blocks. The patterns are given as a list of three-letter strings allowed, where the first two characters of a pattern represent the left and right bottom blocks respectively, and the third character is the top block.

For example, "ABC" represents a triangular pattern with a 'C' block stacked on top of an 'A' (left) and 'B' (right) block. Note that this is different from "BAC" where 'B' is on the left bottom and 'A' is on the right bottom.
You start with a bottom row of blocks bottom, given as a single string, that you must use as the base of the pyramid.

Given bottom and allowed, return true if you can build the pyramid all the way to the top such that every triangular pattern in the pyramid is in allowed, or false otherwise.

 

Example 1:


Input: bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"]
Output: true
Explanation: The allowed triangular patterns are shown on the right.
Starting from the bottom (level 3), we can build "CE" on level 2 and then build "A" on level 1.
There are three triangular patterns in the pyramid, which are "BCC", "CDE", and "CEA". All are allowed.
Example 2:


Input: bottom = "AAAA", allowed = ["AAB","AAC","BCD","BBE","DEF"]
Output: false
Explanation: The allowed triangular patterns are shown on the right.
Starting from the bottom (level 4), there are multiple ways to build level 3, but trying all the possibilites, you will get always stuck before building level 1.
 

Constraints:

2 <= bottom.length <= 6
0 <= allowed.length <= 216
allowed[i].length == 3
The letters in all input strings are from the set {'A', 'B', 'C', 'D', 'E', 'F'}.
All the values of allowed are unique.
*/
/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
var pyramidTransition = function (bottom, allowed) {
  const map = new Map();
  for (const str of allowed) {
    const key = str[0] + str[1];
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str[2]);
  }

  const memo = new Set();

  function backtrack(currRow, nextRow, idx) {
    if (currRow.length === 1) {
      return true;
    }

    if (nextRow.length === currRow.length - 1) {
      if (memo.has(nextRow)) return false;

      const result = backtrack(nextRow, "", 0);
      if (!result) memo.add(nextRow);
      return result;
    }

    const pair = currRow[idx] + currRow[idx + 1];

    if (!map.has(pair)) return false;

    for (const char of map.get(pair)) {
      if (backtrack(currRow, nextRow + char, idx + 1)) {
        return true;
      }
    }

    return false;
  }

  return backtrack(bottom, "", 0);
};

/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
var pyramidTransition = function (bottom, allowed) {
  // 1. Build a map for fast lookup of allowed 'Top' blocks
  const map = new Map();
  for (const str of allowed) {
    const key = str[0] + str[1];
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str[2]);
  }

  const memo = new Set();

  /**
   * @param {string} currRow - The row we are currently standing on
   * @param {string} nextRow - The row we are currently building above it
   * @param {number} idx - The index of the pair in currRow we are evaluating
   */
  function backtrack(currRow, nextRow, idx) {
    // BASE CASE: We reached the very top of the pyramid
    if (currRow.length === 1) {
      return true;
    }

    // LEVEL TRANSITION: We finished building a full row, now move to the next level
    if (nextRow.length === currRow.length - 1) {
      // Optimization: If we've already failed to build from this row, don't try again
      if (memo.has(nextRow)) return false;

      const result = backtrack(nextRow, "", 0);
      if (!result) memo.add(nextRow);
      return result;
    }

    // PAIR SELECTION: Get the two blocks below the one we want to place
    const pair = currRow[idx] + currRow[idx + 1];

    // If no blocks are allowed to be placed on this pair, this path is dead
    if (!map.has(pair)) return false;

    // TRY ALL OPTIONS: For every allowed block that can sit on this pair
    for (const char of map.get(pair)) {
      // Standard Backtracking:
      // Choose: nextRow + char
      // Explore: index + 1
      if (backtrack(currRow, nextRow + char, idx + 1)) {
        return true;
      }
      // (The "Un-choose" step is implicit because we pass a new string 'nextRow + char')
    }

    return false;
  }

  return backtrack(bottom, "", 0);
};

/**
 * @param {string} bottom
 * @param {string[]} allowed
 * @return {boolean}
 */
var pyramidTransition = function (bottom, allowed) {
  const adj = {};
  const memo = new Set();

  // 1. Pre-process allowed patterns for O(1) lookup
  // key: "AB", value: ["C", "D"]
  for (const pattern of allowed) {
    const base = pattern.substring(0, 2);
    const top = pattern[2];
    if (!adj[base]) adj[base] = [];
    adj[base].push(top);
  }

  /**
   * solve: Tries to build a pyramid from a completed row
   */
  function solve(currentRow) {
    if (currentRow.length === 1) return true;
    if (memo.has(currentRow)) return false;

    // Try to build the next row block by block
    const canFinish = buildRow(currentRow, "", 0);

    if (!canFinish) {
      memo.add(currentRow);
    }
    return canFinish;
  }

  /**
   * buildRow: Backtracks to create a possible next row
   * @param {string} curr: The current row we are standing on
   * @param {string} next: The next row we are building
   * @param {number} i: The index of the pair we are looking at in 'curr'
   */
  function buildRow(curr, next, i) {
    // If we've built a full next row (length is curr.length - 1)
    if (i === curr.length - 1) {
      return solve(next);
    }

    const pair = curr[i] + curr[i + 1];
    const options = adj[pair];

    // If no blocks can be placed on this pair, this branch fails
    if (!options) return false;

    // Try every possible block that can sit on top of this pair
    for (const top of options) {
      if (buildRow(curr, next + top, i + 1)) {
        return true;
      }
    }

    return false;
  }

  return solve(bottom);
};
