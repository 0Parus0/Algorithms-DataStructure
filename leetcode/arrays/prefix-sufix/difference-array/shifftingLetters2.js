/*
2381. Shifting Letters II
Medium
Topics
premium lock icon
Companies
Hint
You are given a string s of lowercase English letters and a 2D integer array shifts where shifts[i] = [starti, endi, directioni]. For every i, shift the characters in s from the index starti to the index endi (inclusive) forward if directioni = 1, or shift the characters backward if directioni = 0.

Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that 'a' becomes 'z').

Return the final string after all such shifts to s are applied.

 

Example 1:

Input: s = "abc", shifts = [[0,1,0],[1,2,1],[0,2,1]]
Output: "ace"
Explanation: Firstly, shift the characters from index 0 to index 1 backward. Now s = "zac".
Secondly, shift the characters from index 1 to index 2 forward. Now s = "zbd".
Finally, shift the characters from index 0 to index 2 forward. Now s = "ace".
Example 2:

Input: s = "dztz", shifts = [[0,0,0],[1,1,1]]
Output: "catz"
Explanation: Firstly, shift the characters from index 0 to index 0 backward. Now s = "cztz".
Finally, shift the characters from index 1 to index 1 forward. Now s = "catz".
 

Constraints:

1 <= s.length, shifts.length <= 5 * 104
shifts[i].length == 3
0 <= starti <= endi < s.length
0 <= directioni <= 1
s consists of lowercase English letters.
*/
/**
 * @param {string} s
 * @param {number[][]} shifts
 * @return {string}
 */
var shiftingLetters = function (s, shifts) {
  const n = s.length;
  // Step 1: Create a difference array of size n + 1
  const diff = new Int32Array(n + 1);

  // Step 2: Mark the boundaries for each shift
  for (const [start, end, direction] of shifts) {
    const val = direction === 1 ? 1 : -1;
    diff[start] += val;
    diff[end + 1] -= val;
  }

  // Step 3: Compute prefix sums and update characters
  const result = s.split("");
  let currentShift = 0;

  for (let i = 0; i < n; i++) {
    // The net shift for the current index is the cumulative sum of the diff array
    currentShift += diff[i];

    // Convert char to 0-25 range
    let charCode = s.charCodeAt(i) - 97;

    // Apply shift and handle wrap-around (modulo 26)
    // We add 26 before the final modulo to handle negative results from backward shifts
    let newCharCode = (charCode + (currentShift % 26) + 26) % 26;

    // Convert back to character
    result[i] = String.fromCharCode(newCharCode + 97);
  }

  return result.join("");
};

/**
 * @param {string} s
 * @param {number[][]} shifts
 * @return {string}
 */
var shiftingLetters = function (s, shifts) {
  const n = s.length;

  // Difference array
  const diff = new Array(n + 1).fill(0);

  // Apply range updates
  for (const [start, end, direction] of shifts) {
    const val = direction === 1 ? 1 : -1;

    diff[start] += val;

    if (end + 1 < diff.length) {
      diff[end + 1] -= val;
    }
  }

  let shift = 0;
  const result = [];

  // Build prefix sum and create answer
  for (let i = 0; i < n; i++) {
    shift += diff[i];

    // Normalize shift to [0,25]
    const normalizedShift = ((shift % 26) + 26) % 26;

    const originalPos = s.charCodeAt(i) - 97;

    const newPos = (originalPos + normalizedShift) % 26;

    result.push(String.fromCharCode(newPos + 97));
  }

  return result.join("");
};
