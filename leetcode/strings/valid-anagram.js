// Given two strings s and t, return true if t is an anagram of s, and false otherwise.

// An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

// Example 1:

// Input: s = "anagram", t = "nagaram"
// Output: true
// Example 2:

// Input: s = "rat", t = "car"
// Output: false

// Constraints:

// 1 <= s.length, t.length <= 5 * 104
// s and t consist of lowercase English letters.

// Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?

// Accepted
// 2.6M
// Submissions
// 4.1M
// Acceptance Rate
// 63.3%

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  /*  Solution 1 */
  //   const sArray = s.split("");
  //   const tArray = t.split("");
  //   const anagram = [];
  //   for (let i = 0; i < sArray.length; i++) {
  //     for (j = 0; j < tArray.length; j++) {
  //       if (sArray[i] === tArray[j]) {
  //         anagram.push(tArray[j]);
  //         tArray.splice(tArray[j], 1);
  //       }
  //     }
  //   }
  //   if (s.length === anagram.length && t.length === anagram.length) return true;
  //   return false;

  /* Solution 2 */

  //   return s.split("").sort().join("") === t.split("").sort().join("");

  /* Solution 3 */
  const map = new Map();
  for (const c of s) {
    if (map.has(c)) map.set(c, map.get(c) + 1);
    else map.set(c, 1);
  }
  for (const c of t) {
    if (!map.has(c)) return false;
    map.set(c, map.get(c) - 1);
    if (map.get(c) === 0) map.delete(c);
  }
  if (map.size > 0) return false;
  return true;
};

console.log(isAnagram("anagram", "nagaram"));
