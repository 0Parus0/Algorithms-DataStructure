/*
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.

 

Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.
 

Constraints:

1 <= s.length <= 2 * 105
s consists only of printable ASCII characters.

*/
function validPalindrome(str) {
  if (str.length <= 1) return true;
  str = str.replace(/[^a-z,A-Z,0-9]/g, "").toLowerCase();
  //   console.log(str);

  /* Approach One */

  let left = 0,
    right = str.length - 1;

  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  //   let left = Math.floor(str.length >> 1);

  /* Approach Two */

  //   let left = Math.floor(str.length / 2);
  //   let right;
  //   if ((str.length & 1) === 1) {
  //     // if the string length is an odd number left and right should both start at floored of  length divided by 2;
  //     right = left;
  //   } else {
  //     // if string length is even then left should be one less then middle and right should be at middle
  //     left = left - 1;
  //     right = left + 1;
  //   }
  //   console.log({ left }, { right });
  //   while (left >= 0 && right < str.length) {
  //     console.log(str[left], str[right]);
  //     if (str[left] !== str[right]) return false;
  //     left--;
  //     right++;
  //   }

  /* Approach Three */

  //   let strReversed = str.split("").reverse().join("");
  //   if (str.length !== strReversed.length) return false;

  //   for (let left = 0; left < str.length; left++) {
  //     if (str[left] !== strReversed[left]) return false;
  //   }

  //   console.log(strReversed);
  return true;
}

function valid(str) {
  let validStr = str.replace(/[^a-z,A-Z,0-9]/g, "").toLowerCase();
  console.log(validStr)
  // let reversedStr = validStr.split("").reverse().join('');
  // return validStr === reversedStr;

  let left = 0, right = validStr.length - 1;
  while(left < right){
    if(validStr[left] !== validStr[right]) return false;
    left ++;
    right --;
  }
  return true;
}
// let str = "A man, a plan, a canal: Panama";
let str = "ab-ba";
console.log(valid(str));
