/*
1347. Minimum Number of Steps to Make Two Strings Anagram
Medium
You are given two strings of the same length s and t. In one step you can choose any character of t and replace it with another character.

Return the minimum number of steps to make t an anagram of s.

An Anagram of a string is a string that contains the same characters with a different (or the same) ordering.

 

Example 1:

Input: s = "bab", t = "aba"
Output: 1
Explanation: Replace the first 'a' in t with b, t = "bba" which is anagram of s.
Example 2:

Input: s = "leetcode", t = "practice"
Output: 5
Explanation: Replace 'p', 'r', 'a', 'i' and 'c' from t with proper characters to make t anagram of s.
Example 3:

Input: s = "anagram", t = "mangaar"
Output: 0
Explanation: "anagram" and "mangaar" are anagrams. 
 

Constraints:

1 <= s.length <= 5 * 104
s.length == t.length
s and t consist of lowercase English letters only.
*/
function minSteps(s, t) {
  const n = s.length;
  let result = 0;
  const freqS = new Array(26).fill(0);
  const freqT = new Array(26).fill(0);

  for (let i = 0; i < n; i++) {
    let sChar = s[i];
    let tChar = t[i];

    let sIdx = sChar.charCodeAt(0) - 97;
    let tIdx = tChar.charCodeAt(0) - 97;

    freqS[sIdx]++;
    freqT[tIdx]++;
  }

  for (let i = 0; i < 26; i++) {
    if (freqS[i] > freqT[i]) result += freqS[i] - freqT[i];
  }

  return result;
}

/* Second approach Only single map/freq */

function minSteps(s, t) {
  const n = s.length;
  const freq = new Array(26).fill(0);

  for (let i = 0; i < n; i++) {
    freq[s[i].charCodeAt(0) - 97]++;
    freq[t[i].charCodeAt(0) - 97]--;
  }

  let result = 0;
  for (let i = 0; i < 26; i++) {
    if (freq[i] > 0) result += freq[i];
  }
  return result;
}
