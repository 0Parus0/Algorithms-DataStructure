/*
2131. Longest Palindrome by Concatenating Two Letter Words
Medium
Topics
premium lock icon
Companies
Hint
You are given an array of strings words. Each element of words consists of two lowercase English letters.

Create the longest possible palindrome by selecting some elements from words and concatenating them in any order. Each element can be selected at most once.

Return the length of the longest palindrome that you can create. If it is impossible to create any palindrome, return 0.

A palindrome is a string that reads the same forward and backward.

 

Example 1:

Input: words = ["lc","cl","gg"]
Output: 6
Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
Note that "clgglc" is another longest palindrome that can be created.
Example 2:

Input: words = ["ab","ty","yt","lc","cl","ab"]
Output: 8
Explanation: One longest palindrome is "ty" + "lc" + "cl" + "yt" = "tylcclyt", of length 8.
Note that "lcyttycl" is another longest palindrome that can be created.
Example 3:

Input: words = ["cc","ll","xx"]
Output: 2
Explanation: One longest palindrome is "cc", of length 2.
Note that "ll" is another longest palindrome that can be created, and so is "xx".
 

Constraints:

1 <= words.length <= 105
words[i].length == 2
words[i] consists of lowercase English letters.
*/
/**
 * @param {string[]} words
 * @return {number}
 */
var longestPalindrome = function (words) {
  const freq = new Map();
  let length = 0;

  // Count frequency of each word
  for (const word of words) {
    freq.set(word, (freq.get(word) || 0) + 1);
  }

  // Track if we can place a palindrome word in the center
  let hasCenter = false;

  for (const [word, count] of freq) {
    const reverse = word[1] + word[0];

    // Skip if we've already processed this word or its reverse
    if (reverse === word) {
      // Word is a palindrome itself (e.g., "aa", "bb")
      // Use pairs of this word on the sides
      const pairs = Math.floor(count / 2);
      length += pairs * 4; // Each pair contributes 4 to length

      // If there's an odd count, we can potentially use one in the center
      if (count % 2 === 1) {
        hasCenter = true;
      }
    } else if (freq.has(reverse) && word < reverse) {
      // Different words that are reverses of each other
      // Process only when word < reverse to avoid double counting
      const pairs = Math.min(count, freq.get(reverse));
      length += pairs * 4; // Each pair contributes 4 to length
    }
  }

  // Add 2 to length if we can place a palindrome word in the center
  if (hasCenter) {
    length += 2;
  }

  return length;
};
