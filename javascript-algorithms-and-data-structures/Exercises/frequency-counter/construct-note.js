/**
|--------------------------------------------------
* Frequency Counter --- ConstructNote
Write a function called constructNote, which accepts two strings, a message and some letters.
The function should return true if the message can be built with the letters
that you are given, or it should return false.
Assume that there are only lowercase letters and no space or
special characters in both the message and the letters.

Bonus Constraints:
If M is the length of message and N is the length of letters:
Time Complexity: O(M+N)
Space Complexity: O(N)
|--------------------------------------------------
*/

function constructNote(message, letters) {
  if(message.length > letters.length) return false;
  const result = {};

  for(let char of letters) {
    result[char] = ++result[char] || 1;
  }

  for(let char of message) {
    if(result[char]) result[char] --;
    else return false;
  }
  return true;
}


function constructNote2(message, letters) {
  if(message.length > letters.length) return false;
  const obj = {};
  
  for(let char of letters) {
    obj[char] = (obj[char] || 0) + 1;
  }

  for(let char of message) {
    if(!obj[char]) return false;
    obj[char] --;
  }
  return true;
}

console.log(constructNote2('aabbcc', 'bcabcaddfff')); // true
console.log(constructNote2('aabce', 'abc')); // false
console.log(constructNote2('abc', 'dcba')); // true
console.log(constructNote2('aabbcc', 'bc')); // false

