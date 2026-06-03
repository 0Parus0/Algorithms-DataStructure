/*
459. Repeated Substring Pattern
Given a string s, check if it can be constructed by taking a substring of it and appending multiple copies of the substring together.

Example 1:
Input: s = "abab"
Output: true
Explanation: It is the substring "ab" twice.

Example 2:
Input: s = "aba"
Output: false

Example 3:
Input: s = "abcabcabcabc"
Output: true
Explanation: It is the substring "abc" four times or the substring "abcabc" twice.

Constraints:
1 <= s.length <= 104
s consists of lowercase English letters.
*/
function repeatedSubstringPattern(s) {
  const n = s.length;
  let l = Math.floor(n / 2); // Half of the length could be the biggest substr which can be repeated to form the Pattern
  for (let i = l; i >= 1; i--) {
    if (n % i === 0) {
      let times = Math.floor(n / i);
      let str = s.slice(0, i);
      str = str.repeat(times);
      if (str === s) return true;
    }
  }
  return false;
}

function repeatedSubstringPattern(s) {
  return (s + s).slice(1, s.length * 2 - 1).includes(s);
}
