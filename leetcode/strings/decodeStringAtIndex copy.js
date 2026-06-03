/*
880. Decoded String at Index
You are given an encoded string s. To decode the string to a tape, the encoded string is read one character at a time and the following steps are taken:

If the character read is a letter, that letter is written onto the tape.
If the character read is a digit d, the entire current tape is repeatedly written d - 1 more times in total.
Given an integer k, return the kth letter (1-indexed) in the decoded string.

Example 1:
Input: s = "leet2code3", k = 10
Output: "o"
Explanation: The decoded string is "leetleetcodeleetleetcodeleetleetcode".
The 10th letter in the string is "o".

Example 2:
Input: s = "ha22", k = 5
Output: "h"
Explanation: The decoded string is "hahahaha".
The 5th letter is "h".

Example 3:
Input: s = "a2345678999999999999999", k = 1
Output: "a"
Explanation: The decoded string is "a" repeated 8301530446056247680 times.
The 1st letter is "a".

Constraints:
2 <= s.length <= 100
s consists of lowercase English letters and digits 2 through 9.
s starts with a letter.
1 <= k <= 109
It is guaranteed that k is less than or equal to the length of the decoded string.
The decoded string is guaranteed to have less than 263 letters.
*/

// ========================================================================
// 1. Using BigInt for large inputs
// ========================================================================
function decodeAtIndex(s, k) {
  let size = 0n; // BigInt
  let bigK = BigInt(k); // convert k to BigInt

  //  const isDigit = (ch) => /^[0-9]$/.test(ch);
  const isDigit = (ch) => ch >= "0" && ch <= "9";

  // Step 1. Calculate the total size of s
  for (let ch of s) {
    if (isDigit(ch)) {
      size *= BigInt(ch);
    } else {
      size++;
    }
  }

  // Step 2. Work backwards to find the character
  for (let i = s.length - 1; i >= 0; i--) {
    let ch = s[i];
    bigK %= size; // Update k to be within the current size

    if (bigK === 0n && !isDigit(ch)) {
      return ch;
    }

    if (isDigit(ch)) {
      size /= BigInt(ch);
    } else {
      size--;
    }
  }
}

var decodeAtIndex = function (s, k) {
  let size = BigInt(0);

  for (let index = 0; index < s.length; index++) {
    const str = s[index];

    size = isNaN(str) ? size + BigInt(1) : size * BigInt(str);
  }

  for (let index = s.length - 1; index >= 0; index--) {
    const str = s[index];
    const isNumber = !isNaN(str);

    k = BigInt(k) % size;
    if (k === 0n && !isNumber) return str;

    size = isNumber ? size / BigInt(str) : size - BigInt(1);
  }
  return "";
};

// ========================================================================
// 2. Using normal numbers for small inputs
// ========================================================================

function decodeAtIndex1(s, k) {
  const n = s.length;
  let size = 0;

  const isDigit = (ch) => /^[0-9]$/.test(ch);
  const isAlpha = (ch) => /^[a-zA-Z]$/.test(ch);

  for (let ch of s) {
    if (isAlpha(ch)) {
      size++;
    } else {
      size *= Number(ch);
    }
  }

  for (let i = n - 1; i >= 0; i--) {
    k = k % size;
    if (k === 0 && isAlpha(s[i])) return s[i];
    if (isDigit(s[i])) {
      size = size / Number(s[i]);
    } else {
      size--;
    }
  }
}

console.log(decodeAtIndex("ha22", 5));
