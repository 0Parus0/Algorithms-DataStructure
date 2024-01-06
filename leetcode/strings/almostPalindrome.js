/*
Given a string s, return true if the s can be palindrome after deleting at most one character from it.

 

Example 1:

Input: s = "aba"
Output: true
Example 2:

Input: s = "abca"
Output: true
Explanation: You could delete the character 'c'.
Example 3:

Input: s = "abc"
Output: false
 

Constraints:

1 <= s.length <= 105
s consists of lowercase English letters.
*/

// Valid Sub Palindrome
function isValidSubPalindrome(str, left, right) {
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

function isAlmostPalindrome(str) {
  if (str.length <= 2) return true;
  let left = 0,
    right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) {
      return (
        isValidSubPalindrome(str, left + 1, right) ||
        isValidSubPalindrome(str, left, right - 1)
      );
    }
    left++;
    right--;
  }

  return true;
}
let str = "afdca";
console.log(isAlmostPalindrome(str));
