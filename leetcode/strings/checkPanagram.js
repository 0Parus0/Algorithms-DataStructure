/*
A pangram is a sentence where every letter of the English alphabet appears at least once.

Given a string sentence containing only lowercase English letters, return true if sentence is a pangram, or false otherwise.

 

Example 1:

Input: sentence = "thequickbrownfoxjumpsoverthelazydog"
Output: true
Explanation: sentence contains at least one of every letter of the English alphabet.
Example 2:

Input: sentence = "leetcode"
Output: false
 

Constraints:

1 <= sentence.length <= 1000
sentence consists of lowercase English letters.
*/
function checkPanagram(str) {
  let n = str.length;
  let alpha = Array.from({ length: 26 }, (el) => (el = 0));
  for (let i = 0; i < n; i++) {
    let char = str[i].charCodeAt() - "a".charCodeAt();
    alpha[char] = 1;
  }
  //   console.log(alpha);
  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] === 0) return false;
  }
  return true;
}
let str = "thequickbrownfoxjumpsoverthelazydog";

console.log(checkPanagram(str));

function sortAString(str) {
  let n = str.length;
  let sorted = "";
  let alpha = Array.from({ length: 26 }, () => 0);
  for (let i = 0; i < n; i++) {
    let char = str[i].charCodeAt() - "a".charCodeAt();
    alpha[char] += 1;
  }
  for (let i = 0; i < alpha.length; i++) {
    if (alpha[i] > 0) {
      let index = 0;
      while (index < alpha[i]) {
        let char = String.fromCharCode(i + "a".charCodeAt());
        sorted += char;
        index++;
      }
    }
  }
  return sorted;
}

console.log(sortAString(str));
