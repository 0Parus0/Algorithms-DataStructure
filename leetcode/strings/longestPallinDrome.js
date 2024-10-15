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

function longestPalindrome(str) {
  let n = str.length;
  let longest = 0;
  let odd = false;
  let lower = new Array(26).fill(0);
  let upper = new Array(26).fill(0);

  for (let i = 0; i < n; i++) {
    let char = str[i].charCodeAt();
    if (char < 97) {
      let idx = char - 65;
      upper[idx]++;
    } else {
      let idx = char - 97;
      lower[idx]++;
    }
  }

  for (let i = 0; i < 26; i++) {
    if (lower[i] % 2 === 0) {
      longest += lower[i];
    } else {
      odd = true;
      longest + lower[i] - 1;
    }
    if (upper[i] % 2 === 0) {
      longest += upper[i];
    } else {
      odd = true;
      longest += upper[i] - 1;
    }
  }
  if (odd) longest++;
  return longest;
}

console.log(longestPalindrome("aNNbccccdd"));
