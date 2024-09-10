/*
Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

 

Example 1:

Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.
Example 2:

Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length is 1.
 

Constraints:

1 <= s.length <= 2000
s consists of lowercase and/or uppercase English letters only.
*/
function longest(str) {
  let n = str.length;
  let count = 0;
  let odd = 0;
  let alphaLower = Array.from({ length: 26 }, () => 0);
  let alphaUpper = Array.from({ length: 26 }, () => 0);
  for (let i = 0; i < n; i++) {
    if (checkLowerCase(str[i])) {
      let char = str[i].charCodeAt() - "a".charCodeAt();
      alphaLower[char]++;
    } else {
      let char = str[i].charCodeAt() - "A".charCodeAt();
      alphaUpper[char]++;
    }
  }
  for (let i = 0; i < 26; i++) {
    if (alphaLower[i] % 2 === 0) {
      count += alphaLower[i];
    } else {
      count += alphaLower[i] - 1;
      odd = 1;
    }
    // upper case letters
    if (alphaUpper[i] % 2 === 0) {
      count += alphaUpper[i];
    } else {
      count += alphaUpper[i] - 1;
      odd = 1;
    }
  }
  return count + odd;
  //   console.log(alphaLower, alphaUpper);
}
function checkLowerCase(char) {
  return char.charCodeAt() >= 97;
}

console.log(longest("aAAbbA"));
