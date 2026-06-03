/*
1328. Break a Palindrome
Medium
Topics
premium lock icon
Companies
Hint
Given a palindromic string of lowercase English letters palindrome, replace exactly one character with any lowercase English letter so that the resulting string is not a palindrome and that it is the lexicographically smallest one possible.

Return the resulting string. If there is no way to replace a character to make it not a palindrome, return an empty string.

A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, a has a character strictly smaller than the corresponding character in b. For example, "abcc" is lexicographically smaller than "abcd" because the first position they differ is at the fourth character, and 'c' is smaller than 'd'.

 

Example 1:

Input: palindrome = "abccba"
Output: "aaccba"
Explanation: There are many ways to make "abccba" not a palindrome, such as "zbccba", "aaccba", and "abacba".
Of all the ways, "aaccba" is the lexicographically smallest.
Example 2:

Input: palindrome = "a"
Output: ""
Explanation: There is no way to replace a single character to make "a" not a palindrome, so return an empty string.
 

Constraints:

1 <= palindrome.length <= 1000
palindrome consists of only lowercase English letters.
*/
/**
 * @param {string} palindrome
 * @return {string}
 */
var breakPalindrome = function (palindrome) {
  const n = palindrome.length;

  // Base case: single character palindrome cannot be broken
  if (n === 1) {
    return "";
  }

  // Convert string to array for easy manipulation
  let arr = palindrome.split("");

  // Try to change the first non-'a' character to 'a'
  for (let i = 0; i < Math.floor(n / 2); i++) {
    if (arr[i] !== "a") {
      arr[i] = "a";
      return arr.join("");
    }
  }

  // If all characters are 'a', change the last character to 'b'
  arr[n - 1] = "b";
  return arr.join("");
};
// Example 1
console.log(breakPalindrome("abccba")); // Output: "aaccba"
// Explanation: Change first non-'a' character ('b' at index 1) to 'a'

// Example 2
console.log(breakPalindrome("a")); // Output: ""
// Explanation: Single character, can't break

// Additional test cases
console.log(breakPalindrome("aa")); // Output: "ab"
// Explanation: All 'a's, change last to 'b'

console.log(breakPalindrome("aba")); // Output: "abb"
// Explanation: First non-'a' at index 1? Actually 'b' at index 1? Wait, let's trace:
// "aba": index 0 is 'a', index 1 is 'b' (but we only go to floor(3/2)=1)
// So we change index 1 to 'a' = "aaa" which is STILL a palindrome!
// That's why we need to be careful...

console.log(breakPalindrome("aba")); // Let me recalc carefully
// n=3, check indices 0 to 0 (since floor(3/2)=1)
// index 0: 'a' is 'a' → continue
// Loop ends, so all first half are 'a' → change last char to 'b'
// Result: "abb" ✓

console.log(breakPalindrome("aabaa"));
// n=5, check indices 0 to 1
// index 0: 'a' → continue
// index 1: 'a' → continue
// Loop ends, all are 'a' in first half? Actually first half: indices 0-1: "aa"
// So change last char to 'b' → "aabab" (not palindrome)
