/*
Given two strings s and t of lengths m and n respectively, return the minimum window 
substring
 of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 

Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.
*/

function minSubstr(s, t) {
  let n = s.length,
    m = t.length;
  let start = 0,
    end = 0,
    result = Infinity,
    index = -1;
  let total = m;
  let map = new Map();

  for (let i = 0; i < m; i++) {
    map.set(t[i], (map.get(t[i]) || 0) + 1);
  }

  while (end < n) {
    let endChar = s[end];
    // If the character is in t, decrease its frequency
    if (map.has(endChar)) {
      map.set(endChar, map.get(endChar) - 1);

      if (map.get(endChar) >= 0) total--; // Valid match
    }

    // Try to shrink the window when all chars are matched
    while (total === 0) {
      if (result > end - start + 1) {
        result = end - start + 1;
        index = start;
      }

      let startChar = s[start];

      // Restore the frequency of the starting char if it's in t
      if(map.has(startChar)){
          map.set(startChar, map.get(startChar) + 1);
          if (map.get(startChar) > 0) total++;

      }
      start++;
    }

    // increase window
    end++;
  }
  // console.log(map);
  if (index === -1) return "";

  return s.slice(index, index + result);
}

console.log(minSubstr("ADOBECODEBANC", "ABC"));
