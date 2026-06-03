/*
2182. Construct String With Repeat Limit
Medium
Topics
premium lock icon
Companies
Hint
You are given a string s and an integer repeatLimit. Construct a new string repeatLimitedString using the characters of s such that no letter appears more than repeatLimit times in a row. You do not have to use all characters from s.

Return the lexicographically largest repeatLimitedString possible.

A string a is lexicographically larger than a string b if in the first position where a and b differ, string a has a letter that appears later in the alphabet than the corresponding letter in b. If the first min(a.length, b.length) characters do not differ, then the longer string is the lexicographically larger one.

 

Example 1:

Input: s = "cczazcc", repeatLimit = 3
Output: "zzcccac"
Explanation: We use all of the characters from s to construct the repeatLimitedString "zzcccac".
The letter 'a' appears at most 1 time in a row.
The letter 'c' appears at most 3 times in a row.
The letter 'z' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times in a row, so it is not a valid repeatLimitedString.
Example 2:

Input: s = "aababab", repeatLimit = 2
Output: "bbabaa"
Explanation: We use only some of the characters from s to construct the repeatLimitedString "bbabaa". 
The letter 'a' appears at most 2 times in a row.
The letter 'b' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times in a row, so it is not a valid repeatLimitedString.
 

Constraints:

1 <= repeatLimit <= s.length <= 105
s consists of lowercase English letters.
*/

function repeatLimitedString(s, repeatLimit) {
  const freq = new Array(26).fill(0);
  for (let ch of s) {
    freq[ch.charCodeAt(0) - 97]++;
  }

  let result = "";
  let i = 25; // Start from z the lexicographically largest character

  while (i >= 0) {
    if (freq[i] === 0) {
      i--;
      continue;
    }

    // Step 1. Use the current largest character
    let count = Math.min(freq[i], repeatLimit);
    result += String.fromCharCode(i + 97).repeat(count);
    freq[i] -= count;

    // Step 2. if freq[i] is still greater than 0
    // We need a separator (a single smaller character)
    if (freq[i] > 0) {
      let j = i - 1;

      // Find the next largest character to act as a separator
      while (j >= 0 && freq[j] === 0) {
        j--;
      }

      // We must stop because we can't satisfy the repeatLimit
      if (j < 0) break;

      // Use exactly one of the separator character
      result += String.fromCharCode(j + 97);
      freq[j]--;
    }
  }
  return result;
}

// ========================================================================
// 2. Approach Two
// ========================================================================

console.log(repeatLimitedString("cczazcc", 3));
