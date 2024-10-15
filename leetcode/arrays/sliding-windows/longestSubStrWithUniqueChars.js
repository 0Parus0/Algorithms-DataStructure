/*
Given a string s, find the length of the longest 
substring
 without repeating characters.

 

Example 1:

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
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

function longestSubstrWithoutRepeat(str) {
  if (str.length <= 1) return str.length;
  let start = 0,
    longest = 0,
    charMap = {};
  for (let end = 0; end < str.length; end++) {
    let currentChar = str[end];
    let seenChar = charMap[currentChar];
    if (start <= seenChar) {
      start = seenChar + 1;
    }

    charMap[currentChar] = end;
    console.log(charMap);
    longest = Math.max(longest, end - start + 1);
  }

  return longest;
}


console.log(longestSubstrWithoutRepeat("pwwkew"));

// function longestSubstrWithoutRepeat(str) {
//   const len = str.length;
//   const charMap = {};
//   let start = 0,
//     max = 0;
//   for (let end = 0; end < len; end++) {
//     let char = str[end];
//     if (!charMap[char]) {
//       charMap[char] = true;
//       max = Math.max(max, end - start + 1);
//     } else {
//       while (charMap[char]) {
//         delete charMap[str[start]];
//         start++;
//       }
//       charMap[char] = true;
//       console.log(charMap);
//     }
//   }
//   return max;
// }
