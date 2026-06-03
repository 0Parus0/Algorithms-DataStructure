/*
2405. Optimal Partition of String
Given a string s, partition the string into one or more substrings such that the characters in each substring are unique. That is, no letter appears in a single substring more than once.
Return the minimum number of substrings in such a partition.
Note that each character should belong to exactly one substring in a partition.
 
Example 1:
Input: s = "abacaba"
Output: 4
Explanation:
Two possible partitions are ("a","ba","cab","a") and ("ab","a","ca","ba").
It can be shown that 4 is the minimum number of substrings needed.

Example 2:
Input: s = "ssssss"
Output: 6
Explanation:
The only valid partition is ("s","s","s","s","s","s").
 
Constraints:
1 <= s.length <= 105
s consists of only English lowercase letters.
*/

// ========================================================================
// 1.  Optimal
// ========================================================================

var partitionString = function (s) {
  let count = 1;
  // Use array of 26 for lowercase letters (faster than Set)
  const seen = new Array(26).fill(false);

  for (const char of s) {
    const idx = char.charCodeAt(0) - "a".charCodeAt(0);

    if (seen[idx]) {
      // Character repeats, start new substring
      count++;
      seen.fill(false);
      seen[idx] = true;
    } else {
      seen[idx] = true;
    }
  }

  return count;
};

// ========================================================================
//  Approach Two (little slower)
// ========================================================================

/**
 * @param {string} s
 * @return {number}
 */
var partitionString = function (s) {
  let count = 1; // Start with at least 1 substring
  const seen = new Set();

  for (const char of s) {
    if (seen.has(char)) {
      // Character repeats, start new substring
      count++;
      seen.clear();
      seen.add(char);
    } else {
      seen.add(char);
    }
  }

  return count;
};
