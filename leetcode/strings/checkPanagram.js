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
function checkPangram(str) {
  let n = str.length;
  let alpha = new Array(26).fill(0);
  let count = 0;
  for (let i = 0; i < n; i++) {
    let char = str[i].charCodeAt() - "a".charCodeAt();
    if(alpha[char] === 0){


    alpha[char] = 1;
    count++;
    }
  }
  return count === 26;
  
  // for (let i = 0; i < alpha.length; i++) {
  //   if (alpha[i] === 0) return false;
  // }
  // return true;
}

function pangram(str){
  let n = str.length;
  let map = new Array(26).fill(false);

  for(let i = 0; i < n; i++){
    let idx = str[i].charCodeAt() - 97;
    map[idx] = true;
  }

  for(let i = 0; i < 26; i++){
    if(!map[i]) return false;
  }
  return true;
}
let str = "thequickbrownfoxjumpsoverthelazydog";

console.log(pangram(str));

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
