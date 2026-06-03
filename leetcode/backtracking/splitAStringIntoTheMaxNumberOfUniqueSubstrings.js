/*
1593. Split a String Into the Max Number of Unique Substrings
Medium
Topics
premium lock icon
Companies
Hint
Given a string s, return the maximum number of unique substrings that the given string can be split into.

You can split string s into any list of non-empty substrings, where the concatenation of the substrings forms the original string. However, you must split the substrings such that all of them are unique.

A substring is a contiguous sequence of characters within a string.

 

Example 1:

Input: s = "ababccc"
Output: 5
Explanation: One way to split maximally is ['a', 'b', 'ab', 'c', 'cc']. Splitting like ['a', 'b', 'a', 'b', 'c', 'cc'] is not valid as you have 'a' and 'b' multiple times.
Example 2:

Input: s = "aba"
Output: 2
Explanation: One way to split maximally is ['a', 'ba'].
Example 3:

Input: s = "aa"
Output: 1
Explanation: It is impossible to split the string any further.
 

Constraints:

1 <= s.length <= 16

s contains only lower case English letters.
*/
/**
 * @param {string} s
 * @return {number}
 */
var maxUniqueSplit = function (s) {
  let maxCount = 0;
  const seen = new Set();

  function backtrack(start) {
    // Base case: We've processed the entire string
    if (start === s.length) {
      maxCount = Math.max(maxCount, seen.size);
      return;
    }

    // Optimization: Pruning
    // If (current unique count + remaining characters) <= maxCount,
    // we can't possibly find a better solution in this branch.
    if (seen.size + (s.length - start) <= maxCount) {
      return;
    }

    // Try every possible substring starting from 'start'
    for (let end = start + 1; end <= s.length; end++) {
      const sub = s.substring(start, end);

      // If the substring is unique
      if (!seen.has(sub)) {
        seen.add(sub); // Choose
        backtrack(end); // Explore
        seen.delete(sub); // Un-choose (Backtrack)
      }
    }
  }

  backtrack(0);
  return maxCount;
};
