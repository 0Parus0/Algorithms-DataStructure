// ========================================================================
// 3. Longest Repeating Character Replacement (LeetCode 424)
// ========================================================================

/* 
 The Problem: Given a string s and an integer k, you can change any character to any other uppercase letter at most k times. Return the length of the longest substring containing the same letter after performing the operations.You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

Example 1:
Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.

Example 2:
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.

Constraints:
1 <= s.length <= 105
s consists of only uppercase English letters.
0 <= k <= s.length

*/
function characterReplacement(s, k) {
  let left = 0;
  let maxFreq = 0;
  let maxLen = 0;
  const freq = new Array(26).fill(0); // For uppercase letters

  for (let right = 0; right < s.length; right++) {
    // Add current character to window
    const currChar = s[right];
    const currCharIdx = currChar.charCodeAt() - "A".charCodeAt();
    freq[currCharIdx]++;

    // Update max frequency in current window
    maxFreq = Math.max(maxFreq, freq[currCharIdx]);

    // Current window length
    const windowLength = right - left + 1;

    // If changes need > k, shrink window
    if (windowLength - maxFreq > k) {
      // Remove left character from window
      const leftChar = s[left];
      const leftCharIdx = leftChar.charCodeAt() - "A".charCodeAt();
      freq[leftCharIdx]--;
      left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
