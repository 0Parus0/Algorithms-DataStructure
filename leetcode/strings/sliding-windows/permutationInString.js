/*
567. Permutation in String
Medium
Topics
Companies
Hint
Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.

In other words, return true if one of s1's permutations is the substring of s2.

 

Example 1:

Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").
Example 2:

Input: s1 = "ab", s2 = "eidboaoo"
Output: false
 

Constraints:

1 <= s1.length, s2.length <= 104
s1 and s2 consist of lowercase English letters.
*/
/* Sliding windows with 26 chars array */
function checkEqual(arr1, arr2) {
  for (let i = 0; i < 26; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function checkInclusion(s1, s2) {
  let n = s2.length,
    m = s1.length;
  if (m > n) return false;
  // create a count array to store count of chars of s1
  let count1 = Array.from({ length: 26 }, () => 0);

  // traverse over s1 to store its char count in count array
  for (let i = 0; i < m; i++) {
    let index = s1.charCodeAt(i) - 97;
    count1[index]++;
  }

  // traverse over s2 string in window size of s1 string and compare
  let i = 0;
  let windowSize = m;
  let count2 = Array.from({ length: 26 }, () => 0);

  // running for first window
  while (i < windowSize) {
    let index = s2.charCodeAt(i) - 97;
    count2[index]++;
    i++;
  }

  // compare the count stored in 2 count arrays
  if (checkEqual(count1, count2)) return true;

  // checking for remaining s2 or moving sliding windows forward
  while (i < n) {
    console.log(i);
    let newCharIndex = s2.charCodeAt(i) - 97;
    count2[newCharIndex]++;
    let oldCharIndex = s2.charCodeAt(i - windowSize) - 97;
    count2[oldCharIndex]--;
    if (checkEqual(count1, count2)) return true;
    i++;
  }

  return false;

  //   console.log(count2);
}

let s1 = "aob",
  s2 = "eidbaooo";
console.log(checkInclusion(s1, s2));

/* Using Array.prototype.some */

// var checkInclusion = function (s1, s2) {
//   const len1 = s1.length,
//     len2 = s2.length;
//   if (len1 > len2) return false;

//   // const count = Array(26).fill(0);
//   const count = Array.from({ length: 26 }, () => 0);
//   for (let i = 0; i < len1; i++) {
//     count[s1.charCodeAt(i) - 97]++;
//     count[s2.charCodeAt(i) - 97]--;
//   }
//   if (!count.some((e) => e !== 0)) return true;

//   for (let i = len1; i < len2; i++) {
//     count[s2.charCodeAt(i) - 97]--;
//     count[s2.charCodeAt(i - len1) - 97]++;
//     if (!count.some((e) => e !== 0)) return true;
//   }
//   return false;
// };

/* Sliding Window with mapping Object */
// var checkInclusion = function (s1, s2) {
//   // If s1 is larger than s2 then match is not possible
//   // i.e (s1 cannot be substring of s2)
//   if (s1.length > s2.length) return false;
//   let neededChar = {}; //To Store the frequency/count of required string s1
//   for (let i = 0; i < s1.length; i++) {
//     // Initially neededChar[s1[i]] will be undefined and
//     // undefined || 0 will return 0. So we increment it by 1
//     neededChar[s1[i]] = (neededChar[s1[i]] || 0) + 1;
//   }
//   /*
// 	Now we have neededChar
// 	i.e neededChar={
// 		a:1,
// 		b:1
// 	}
// 	*/
//   let left = 0, //left pointer/index of the sliding window
//     right = 0, //right pointer/index of the sliding window
//     requiredLength = s1.length; //length of the substring required in s2

//   // Now iterate until the right index of window is lesser than length of s2
//   while (right < s2.length) {
//     // If we found s2 character in s1 i.e in neededChar then we decrease requiredLength
//     if (neededChar[s2[right]] > 0) requiredLength--;
//     // Since we have encountered new char i.e s2[right] we decrease it's
//     // count in neededChar even if it is not present in neededChar because we only care about neededChars
//     neededChar[s2[right]]--;
//     right++; //window is incremented by 1 step

//     // Now if our requiredLength becomes 0 it means we have found a match of the s2 substring
//     // So we return true
//     if (requiredLength === 0) return true;

//     // If our window length is equal to s1 length (length of string to search in s2)
//     // then we have to remove left element of window i.e left++ and add new element from right
//     // will be added in next iteration
//     if (right - left === s1.length) {
//       // if the left element we are removing was a required character then we increase requiredLength
//       // because that element will no longer be the part of sliding window
//       if (neededChar[s2[left]] >= 0) requiredLength++;
//       // We will also increase the count of left element removed from window
//       neededChar[s2[left]]++;
//       // And finally we will decrease the window size by 1 from left i.e left++
//       left++;
//     }
//   }
//   // If match was not found we return false
//   return false;
// };
