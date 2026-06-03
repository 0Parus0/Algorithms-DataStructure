/*
3714. Longest Balanced Substring II
Medium
Topics
premium lock icon
Companies
Hint
You are given a string s consisting only of the characters 'a', 'b', and 'c'.

A substring of s is called balanced if all distinct characters in the substring appear the same number of times.

Return the length of the longest balanced substring of s.

 

Example 1:

Input: s = "abbac"

Output: 4

Explanation:

The longest balanced substring is "abba" because both distinct characters 'a' and 'b' each appear exactly 2 times.

Example 2:

Input: s = "aabcc"

Output: 3

Explanation:

The longest balanced substring is "abc" because all distinct characters 'a', 'b' and 'c' each appear exactly 1 time.

Example 3:

Input: s = "aba"

Output: 2

Explanation:

One of the longest balanced substrings is "ab" because both distinct characters 'a' and 'b' each appear exactly 1 time. Another longest balanced substring is "ba".

 

Constraints:

1 <= s.length <= 105
s contains only the characters 'a', 'b', and 'c'.
*/
// ========================================================================
// 1. Using Maps
// ========================================================================
/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function (s) {
  const n = s.length;
  if (n === 0 || n === 1) return n;
  let maxLen = 0;

  // Case 1: Single character substrings
  // Any substring with all same characters is balanced
  let count = 1;
  for (let i = 1; i < n; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      count = 1;
    }
    maxLen = Math.max(maxLen, count);
  }

  // Helper function for two-character case
  function findTwoCharBalanced(a, b) {
    const diffMap = new Map();
    diffMap.set(0, -1); // Initialize with diff 0 at index -1

    let countA = 0;
    let countB = 0;

    for (let i = 0; i < n; i++) {
      if (s[i] === a) countA++;
      if (s[i] === b) countB++;

      // If current character is neither a nor b, we can't use it in balanced substring
      // So we reset the counts and diff map
      if (s[i] !== a && s[i] !== b) {
        countA = 0;
        countB = 0;
        diffMap.clear();
        diffMap.set(0, i);
        continue;
      }

      const diff = countA - countB;

      if (diffMap.has(diff)) {
        maxLen = Math.max(maxLen, i - diffMap.get(diff));
      } else {
        diffMap.set(diff, i);
      }
    }
  }

  // Case 2: Two-character balanced substrings
  findTwoCharBalanced("a", "b");
  findTwoCharBalanced("a", "c");
  findTwoCharBalanced("b", "c");

  // Case 3: Three-character balanced substrings
  const diffMap3 = new Map();
  diffMap3.set("0_0", -1); // Initialize with (0,0) diff at index -1

  let countA = 0,
    countB = 0,
    countC = 0;

  for (let i = 0; i < n; i++) {
    if (s[i] === "a") countA++;
    if (s[i] === "b") countB++;
    if (s[i] === "c") countC++;

    // We need two differences: (countA - countB) and (countA - countC)
    const diffAB = countA - countB;
    const diffAC = countA - countC;

    const key = diffAB + "_" + diffAC;

    if (diffMap3.has(key)) {
      maxLen = Math.max(maxLen, i - diffMap3.get(key));
    } else {
      diffMap3.set(key, i);
    }
  }

  return maxLen;
};

// ========================================================================
//  Using POJOs
// ========================================================================

/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function (s) {
  const n = s.length;
  let maxL = 0;

  // Case 1: single character
  let count = 1;
  for (let i = 1; i < n; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      count = 1;
    }
    maxL = Math.max(maxL, count);
  }

  // Case 2: Two characters
  function helper(a, b) {
    let diffMap = {};
    diffMap[0] = -1; // IMPORTANT: Initialize
    let count1 = 0;
    let count2 = 0;

    for (let i = 0; i < n; i++) {
      if (s[i] !== a && s[i] !== b) {
        diffMap = {}; // Create new object
        diffMap[0] = i; // Reset with current index
        count1 = 0;
        count2 = 0;
        continue;
      }

      if (s[i] === a) count1++;
      if (s[i] === b) count2++;

      if (count1 === count2) {
        maxL = Math.max(maxL, count1 + count2);
      }

      let diff = count1 - count2;
      if (diffMap[diff] !== undefined) {
        maxL = Math.max(maxL, i - diffMap[diff]); // FIXED
      } else {
        diffMap[diff] = i;
      }
    }
    return maxL;
  }

  maxL = Math.max(maxL, helper("a", "b"));
  maxL = Math.max(maxL, helper("a", "c"));
  maxL = Math.max(maxL, helper("c", "b")); // Note: you wrote "c", "b" but should be consistent

  // Case 3: Three characters
  let countA = 0;
  let countB = 0;
  let countC = 0;
  const diffMap = {};
  diffMap["0_0"] = -1; // IMPORTANT: Initialize

  for (let i = 0; i < n; i++) {
    if (s[i] === "a") countA++;
    if (s[i] === "b") countB++;
    if (s[i] === "c") countC++;

    if (countA === countB && countA === countC) {
      maxL = Math.max(maxL, countA + countB + countC);
    }

    let diffAB = countA - countB;
    let diffAC = countA - countC;

    let key = diffAB + "_" + diffAC;

    if (diffMap[key] !== undefined) {
      maxL = Math.max(maxL, i - diffMap[key]);
    } else {
      diffMap[key] = i;
    }
  }

  return maxL;
};

// ========================================================================
// 2nd implementation using POJOs
// ========================================================================
/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function (s) {
  const n = s.length;
  let maxLen = 0;

  // Case 1: Single character substrings
  // Any substring with all same characters is balanced
  let count = 1;
  for (let i = 1; i < n; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      count = 1;
    }
    maxLen = Math.max(maxLen, count);
  }

  // Helper function for two-character case
  function findTwoCharBalanced(a, b) {
    const diffMap = {};
    diffMap[0] = -1; // Initialize with diff 0 at index -1

    let countA = 0;
    let countB = 0;

    for (let i = 0; i < n; i++) {
      if (s[i] === a) countA++;
      if (s[i] === b) countB++;

      // If current character is neither a nor b, we can't use it in balanced substring
      // So we reset the counts and diff map
      if (s[i] !== a && s[i] !== b) {
        countA = 0;
        countB = 0;
        // Reset diffMap
        for (let key in diffMap) {
          delete diffMap[key];
        }
        diffMap[0] = i;
        continue;
      }

      const diff = countA - countB;

      if (diffMap[diff] !== undefined) {
        maxLen = Math.max(maxLen, i - diffMap[diff]);
      } else {
        diffMap[diff] = i;
      }
    }
  }

  // Case 2: Two-character balanced substrings
  findTwoCharBalanced("a", "b");
  findTwoCharBalanced("a", "c");
  findTwoCharBalanced("b", "c");

  // Case 3: Three-character balanced substrings
  const diffMap3 = {};
  diffMap3["0_0"] = -1; // Initialize with (0,0) diff at index -1

  let countA = 0,
    countB = 0,
    countC = 0;

  for (let i = 0; i < n; i++) {
    if (s[i] === "a") countA++;
    if (s[i] === "b") countB++;
    if (s[i] === "c") countC++;

    // We need two differences: (countA - countB) and (countA - countC)
    const diffAB = countA - countB;
    const diffAC = countA - countC;

    const key = diffAB + "_" + diffAC;

    if (diffMap3[key] !== undefined) {
      maxLen = Math.max(maxLen, i - diffMap3[key]);
    } else {
      diffMap3[key] = i;
    }
  }

  return maxLen;
};

// ========================================================================
//  Using Maps
// ========================================================================

/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function (s) {
  const n = s.length;
  if (n === 0) return 0;

  let maxL = 0;

  // --- Case 1: 1 distinct character ---
  // Longest contiguous run of identical characters
  let currentRun = 1;
  maxL = 1;
  for (let i = 1; i < n; i++) {
    if (s[i] === s[i - 1]) {
      currentRun++;
    } else {
      currentRun = 1;
    }
    if (currentRun > maxL) maxL = currentRun;
  }

  // --- Case 2: Exactly 2 distinct characters ---
  const checkTwo = (c1, c2, exclude) => {
    let map = new Map();
    map.set(0, -1); // Initialize for substrings starting at the segment beginning
    let diff = 0;
    for (let i = 0; i < n; i++) {
      if (s[i] === exclude) {
        // Reset when the forbidden third character is encountered
        map = new Map();
        map.set(0, i);
        diff = 0;
      } else {
        if (s[i] === c1) diff++;
        else if (s[i] === c2) diff--;

        if (map.has(diff)) {
          maxL = Math.max(maxL, i - map.get(diff));
        } else {
          map.set(diff, i);
        }
      }
    }
  };

  checkTwo("a", "b", "c");
  checkTwo("a", "c", "b");
  checkTwo("b", "c", "a");

  // --- Case 3: Exactly 3 distinct characters ---
  let map3 = new Map();
  map3.set("0,0", -1);
  let ca = 0,
    cb = 0,
    cc = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === "a") ca++;
    else if (s[i] === "b") cb++;
    else if (s[i] === "c") cc++;

    // A substring has equal counts of A, B, and C if
    // (ca - cb) and (ca - cc) remain the same as a previous index.
    let key = ca - cb + "," + (ca - cc);
    if (map3.has(key)) {
      maxL = Math.max(maxL, i - map3.get(key));
    } else {
      map3.set(key, i);
    }
  }

  return maxL;
};
