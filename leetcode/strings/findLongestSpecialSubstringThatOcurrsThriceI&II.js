/*
2982. Find Longest Special Substring That Occurs Thrice II
You are given a string s that consists of lowercase English letters.
A string is called special if it is made up of only a single character. For example, the string "abc" is not special, whereas the strings "ddd", "zz", and "f" are special.
Return the length of the longest special substring of s which occurs at least thrice, or -1 if no special substring occurs at least thrice.
A substring is a contiguous non-empty sequence of characters within a string.

Example 1:
Input: s = "aaaa"
Output: 2
Explanation: The longest special substring which occurs thrice is "aa": substrings "aaaa", "aaaa", and "aaaa".
It can be shown that the maximum length achievable is 2.
Example 2:
Input: s = "abcdef"
Output: -1
Explanation: There exists no special substring which occurs at least thrice. Hence return -1.
Example 3:
Input: s = "abcaba"
Output: 1
Explanation: The longest special substring which occurs thrice is "a": substrings "abcaba", "abcaba", and "abcaba".
It can be shown that the maximum length achievable is 1.

Constraints:
3 <= s.length <= 5 * 105
s consists of only lowercase English letters.
*/

// ========================================================================
//                         Best
// ========================================================================

/**
 * @param {string} s
 * @return {number}
 */
function maximumLength(s) {
  // 1. Group consecutive identical characters into streaks.
  // Example: "aaabbba" -> { 'a': [3, 1], 'b': [3] }
  const charStreaksMap = new Map();

  let i = 0;
  while (i < s.length) {
    const char = s[i];
    let streakLength = 0;

    // Count how long the current streak of identical characters lasts
    while (i < s.length && s[i] === char) {
      streakLength++;
      i++;
    }

    if (!charStreaksMap.has(char)) {
      charStreaksMap.set(char, []);
    }
    charStreaksMap.get(char).push(streakLength);
  }

  let globalMaxSpecialLength = -1;

  // 2. For each character, find the longest substring length that appears at least 3 times.
  for (const [char, streaks] of charStreaksMap) {
    let minPossibleLen = 1;
    let maxPossibleLen = Math.max(...streaks);

    // Use Binary Search to find the optimal length for this specific character
    while (minPossibleLen <= maxPossibleLen) {
      const targetLength = Math.floor((minPossibleLen + maxPossibleLen) / 2);

      /* 
               Calculate how many substrings of 'targetLength' exist within our streaks.
               Math Rule: A streak of length 'L' contains (L - targetLength + 1) 
               substrings of length 'targetLength'.
               Example: A streak "aaaa" (length 4) has TWO substrings of length 3 ("aaa").
               (4 - 3 + 1) = 2.
            */
      let totalOccurrences = 0;
      for (const streak of streaks) {
        if (streak >= targetLength) {
          totalOccurrences += streak - targetLength + 1;
        }
      }

      if (totalOccurrences >= 3) {
        // This length works! Save it and try to find a longer one.
        globalMaxSpecialLength = Math.max(globalMaxSpecialLength, targetLength);
        minPossibleLen = targetLength + 1;
      } else {
        // This length is too long to appear 3 times, try shorter.
        maxPossibleLen = targetLength - 1;
      }
    }
  }

  return globalMaxSpecialLength;
}

console.log(maximumLength("aaabaaaabbbcceffffff"));
// ========================================================================
// 1.  Optimal
// ========================================================================
function maximumLength1(s) {
  const n = s.length;
  const dp = Array.from({ length: 26 }, () => new Array(n + 1).fill(0));
  let max = -1;

  let len = 0;
  let prevChar = s[0];
  for (let i = 0; i < n; i++) {
    let currChar = s[i];
    let code = currChar.charCodeAt() - 97;

    if (prevChar === currChar) {
      len += 1;
    } else {
      len = 1;
      prevChar = currChar;
    }

    dp[code][len]++;
  }

  for (let row = 0; row < 26; row++) {
    let cumSum = 0;
    for (let col = n; col > 0; col--) {
      cumSum += dp[row][col];
      if (cumSum >= 3) {
        max = Math.max(max, col);
        break;
      }
    }
  }
  return max;
}

// ========================================================================
// 2. Better
// ========================================================================

function maximumLength1(s) {
  const n = s.length;
  let max = -1;
  const mp = new Map();

  for (let i = 0; i < n; i++) {
    let temp = "";
    for (let j = i; j < n; j++) {
      if (!temp.length > 0 || temp[temp.length - 1] === s[j]) {
        temp += s[j];
        const key = `${temp[0]}-${temp.length}`;
        mp.set(key, (mp.get(key) || 0) + 1);
      } else break;
    }
  }
  console.log(mp);
  for (let key of mp.keys()) {
    if (mp.get(key) >= 3) max = Math.max(max, key.slice(2));
  }
  return max;
}

// ========================================================================
// 3. Brute Force
// ========================================================================

/**
 * @param {string} s
 * @return {number}
 */
var maximumLength1 = function (s) {
  const n = s.length;
  let max = -1;
  const mp = new Map();

  for (let i = 0; i < n; i++) {
    let temp = "";
    for (let j = i; j < n; j++) {
      if (!temp.length > 0 || temp[temp.length - 1] === s[j]) {
        temp += s[j];
        mp.set(temp, (mp.get(temp) || 0) + 1);
      } else break;
    }
  }
  for (let key of mp.keys()) {
    if (key.length > max && mp.get(key) >= 3) max = key.length;
  }
  return max;
};
