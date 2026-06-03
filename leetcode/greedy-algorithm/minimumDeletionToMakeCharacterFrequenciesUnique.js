/*
1647. Minimum Deletions to Make Character Frequencies Unique
Medium
Topics
premium lock icon
Companies
Hint
A string s is called good if there are no two different characters in s that have the same frequency.

Given a string s, return the minimum number of characters you need to delete to make s good.

The frequency of a character in a string is the number of times it appears in the string. For example, in the string "aab", the frequency of 'a' is 2, while the frequency of 'b' is 1.

 

Example 1:

Input: s = "aab"
Output: 0
Explanation: s is already good.
Example 2:

Input: s = "aaabbbcc"
Output: 2
Explanation: You can delete two 'b's resulting in the good string "aaabcc".
Another way it to delete one 'b' and one 'c' resulting in the good string "aaabbc".
Example 3:

Input: s = "ceabaacb"
Output: 2
Explanation: You can delete both 'c's resulting in the good string "eabaab".
Note that we only care about characters that are still in the string at the end (i.e. frequency of 0 is ignored).
 

Constraints:

1 <= s.length <= 105
s contains only lowercase English letters.
*/
function minDeletions(s) {
  const freq = new Array(26).fill(0);

  for (let ch of s) {
    const idx = ch.charCodeAt() - 97;
    freq[idx]++;
  }

  freq.sort((a, b) => b - a);
  let result = 0;

  for (let i = 24; i >= 0 && freq[i] > 0; i--) {
    if (freq[i] >= freq[i + 1]) {
      let prev = freq[i];
      freq[i] = Math.max(0, freq[i + 1] - 1);
      result += prev - freq[i];
    }
  }
  return result;
}
function minDeletions(s) {
  const freq = new Array(26).fill(0);
  const used = new Set();

  for (let ch of s) {
    const idx = ch.charCodeAt() - 97;
    freq[idx]++;
  }

  let result = 0;

  for (let i = 0; i < 26; i++) {
    while (freq[i] > 0 && used.has(freq[i])) {
      freq[i]--;
      result++;
    }

    used.add(freq[i]);
  }

  return result;
}

/**
 * @param {string} s
 * @return {number}
 */
var minDeletions = function (s) {
  // Count frequency of each character
  const freq = new Array(26).fill(0);
  for (const char of s) {
    freq[char.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  // Sort frequencies in descending order
  freq.sort((a, b) => b - a);

  let deletions = 0;
  let expectedFreq = freq[0]; // Start with the highest frequency

  for (let i = 0; i < 26 && freq[i] > 0; i++) {
    if (freq[i] > expectedFreq) {
      // Need to reduce this frequency
      deletions += freq[i] - expectedFreq;
    } else {
      expectedFreq = freq[i];
    }

    // Next expected frequency is one less
    if (expectedFreq > 0) {
      expectedFreq--;
    }
  }

  return deletions;
};

var minDeletions = function (s) {
  // Count frequencies
  const freq = new Array(26).fill(0);
  for (const char of s) {
    freq[char.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  // Keep only non-zero frequencies
  const frequencies = freq.filter((f) => f > 0);
  frequencies.sort((a, b) => b - a);

  const usedFreqs = new Set();
  let deletions = 0;

  for (let f of frequencies) {
    // While this frequency is already used and > 0
    while (f > 0 && usedFreqs.has(f)) {
      f--;
      deletions++;
    }

    if (f > 0) {
      usedFreqs.add(f);
    }
  }

  return deletions;
};
