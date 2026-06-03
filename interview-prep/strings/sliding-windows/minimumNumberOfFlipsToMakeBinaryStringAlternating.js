/*
1888. Minimum Number of Flips to Make the Binary String Alternating
You are given a binary string s. You are allowed to perform two types of operations on the string in any sequence:
Type-1: Remove the character at the start of the string s and append it to the end of the string.
Type-2: Pick any character in s and flip its value, i.e., if its value is '0' it becomes '1' and vice-versa.
Return the minimum number of type-2 operations you need to perform such that s becomes alternating.
The string is called alternating if no two adjacent characters are equal.
For example, the strings "010" and "1010" are alternating, while the string "0100" is not.

Example 1:
Input: s = "111000"
Output: 2
Explanation: Use the first operation two times to make s = "100011".
Then, use the second operation on the third and sixth elements to make s = "101010".

Example 2:
Input: s = "010"
Output: 0
Explanation: The string is already alternating.

Example 3:
Input: s = "1110"
Output: 1
Explanation: Use the second operation on the second element to make s = "1010".

Constraints:
1 <= s.length <= 105
s[i] is either '0' or '1'.
*/
function minFlips(s) {
  const n = s.length;

  s = s + s; // Instead of rotating the string one char at a time just added the same string

  //Two types of alternating string
  // s1 = "01010101"
  // s2 = "10101010"

  let s1 = "",
    s2 = "";

  for (let i = 0; i < 2 * n; i++) {
    s1 += i % 2 ? "1" : "0";
    s2 += i % 2 ? "0" : "1";
  }

  let result = Infinity;
  let flip1 = 0;
  let flip2 = 0;
  let left = 0;

  for (let right = 0; right < 2 * n; right++) {
    if (s[right] !== s1[right]) flip1++;
    if (s[right] !== s2[right]) flip2++;

    if (right - left + 1 > n) {
      if (s[left] !== s1[left]) flip1--;
      if (s[left] !== s2[left]) flip2--;
      left++;
    }

    if (right - left + 1 === n) {
      result = Math.min(result, flip1, flip2);
    }
  }
  return result;
}

// ========================================================================
//                  Optimized
// ========================================================================
/**
 * @param {string} s
 * @return {number}
 */
var minFlips = function (s) {
  const n = s.length;

  //  s = s + s; // Instead of rotating the string one char at a time just added the same string

  //Two types of alternating string
  // s1 = "01010101"
  // s2 = "10101010"

  let s1 = "",
    s2 = "";

  //   for (let i = 0; i < 2 * n; i++) {
  //     s1 += i % 2 ? "1" : "0";
  //     s2 += i % 2 ? "0" : "1";
  //   }

  let result = Infinity;
  let flip1 = 0;
  let flip2 = 0;
  let left = 0;

  for (let right = 0; right < 2 * n; right++) {
    let expectedCharS1 = right % 2 ? "1" : "0";
    let expectedCharS2 = right % 2 ? "0" : "1";
    if (s[right % n] !== expectedCharS1) flip1++;
    if (s[right % n] !== expectedCharS2) flip2++;

    if (right - left + 1 > n) {
      expectedCharS1 = left % 2 ? "1" : "0";
      expectedCharS2 = left % 2 ? "0" : "1";
      if (s[left % n] !== expectedCharS1) flip1--;
      if (s[left % n] !== expectedCharS2) flip2--;
      left++;
    }

    if (right - left + 1 === n) {
      result = Math.min(result, flip1, flip2);
    }
  }
  return result;
};
console.log(minFlips("101001001101"));
