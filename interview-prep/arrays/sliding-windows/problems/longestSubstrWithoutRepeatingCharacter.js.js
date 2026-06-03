/*
LeetCode 3. Longest Substring Without Repeating Characters ( Medium )
Given a string s, find the length of the longest substring without duplicate characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3. Note that "bca" and "cab" are also correct answers.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:
0 <= s.length <= 5 * 104
s consists of English letters, digits, symbols and spaces.
*/

function longestSubString(s) {
  let left = 0;
  let maxLen = 0;
  const charMap = new Map(); // Stores character -> most recent index

  for (let right = 0; right < s.length; right++) {
    const currChar = s[right];

    // If character exists in map and is within current window
    if (charMap.has(currChar) && charMap.get(currChar) >= left) {
      // Move left pointer to just after the previous occurrence
      left = charMap.get(currChar) + 1;
    }

    // Update character's latest index
    charMap.set(currChar, right);
    // Calculate current window length and update max
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
