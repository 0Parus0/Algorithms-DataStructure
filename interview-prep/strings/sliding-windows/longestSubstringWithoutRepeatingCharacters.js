/*
Platform: LeetCode
Problem Number: 3
Title: Longest Substring Without Repeating Characters
The Scenario:
You are building a feature for a text editor or a search bar. You need to find the length of the longest sequence of unique characters in a string to help with a specific text-highlighting algorithm.
The Challenge:
Given a string s, find the length of the longest substring without repeating characters.
Example:
code
JavaScript
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
Note that "pwke" is a subsequence and not a substring.
Constraints:
Expected Time Complexity: 
O ( n) 
Expected Space Complexity: 
O ( m i n ( m , n))
O(min(m,n))
where m n is the size of the character set.
*/

function longest(s) {
  const n = s.length;
  const seen = new Map();
  let i = 0;
  let max = 0;

  for (let j = 0; j < n; j++) {
    let char = s[j];

    if (seen.has(char) && seen.get(char) >= i) {
      i = seen.get(char) + 1;
    }

    seen.set(char, j);
    max = Math.max(max, j - i + 1);
  }
  return max;
}

function longest(s) {
  let result = 0;
  let n = s.length;
  const strings = [];

  for (let i = 0; i < n; i++) {
    let substr = "";
    for (let j = i; j < n; j++) {
      substr += s[j];
      strings.push(substr);
      if (hasAllUniqueChars(s, i, j)) {
        result = Math.max(result, j - i + 1);
      }
    }
  }
  console.log(strings);
  return result;
}

function hasAllUniqueChars(s, start, end) {
  let seen = new Set();

  for (let i = start; i <= end; i++) {
    if (seen.has(s[i])) return false;
    seen.add(s[i]);
  }
  return true;
}

function longest(s) {
  const n = s.length;
  const freq = new Uint8Array(256);
  let i = 0;
  let max = 0;
  for (let j = 0; j < n; j++) {
    let charCode = s.charCodeAt(j);
    freq[charCode]++;

    // Shrink window until no duplicates
    while (freq[charCode] > 1) {
      let leftCharCode = s.charCodeAt(i);
      freq[leftCharCode]--;
      i++;
    }

    max = Math.max(max, j - i + 1);
  }

  return max;
}

console.log(longest("pwwkew"));
