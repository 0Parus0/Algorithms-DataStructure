/*
2014. Longest Subsequence Repeated k Times
Hard
Topics
premium lock icon
Companies
Hint
You are given a string s of length n, and an integer k. You are tasked to find the longest subsequence repeated k times in string s.

A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

A subsequence seq is repeated k times in the string s if seq * k is a subsequence of s, where seq * k represents a string constructed by concatenating seq k times.

For example, "bba" is repeated 2 times in the string "bababcba", because the string "bbabba", constructed by concatenating "bba" 2 times, is a subsequence of the string "bababcba".
Return the longest subsequence repeated k times in string s. If multiple such subsequences are found, return the lexicographically largest one. If there is no such subsequence, return an empty string.

 

Example 1:

example 1
Input: s = "letsleetcode", k = 2
Output: "let"
Explanation: There are two longest subsequences repeated 2 times: "let" and "ete".
"let" is the lexicographically largest one.
Example 2:

Input: s = "bb", k = 2
Output: "b"
Explanation: The longest subsequence repeated 2 times is "b".
Example 3:

Input: s = "ab", k = 2
Output: ""
Explanation: There is no subsequence repeated 2 times. Empty string is returned.
 

Constraints:

n == s.length
2 <= k <= 2000
2 <= n < min(2001, k * 8)
s consists of lowercase English letters.
*/

/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var longestSubsequenceRepeatedK = function (s, k) {
  const n = s.length;
  // Count frequency
  const freq = new Array(26).fill(0);
  for (const ch of s) {
    freq[ch.charCodeAt(0) - 97]++;
  }

  // Candidate letters (appear at least k times)
  const candidates = [];
  for (let i = 0; i < 26; i++) {
    if (freq[i] >= k) {
      candidates.push(String.fromCharCode(97 + i));
    }
  }
  if (candidates.length === 0) return "";

  // Helper: check if seq * k is subsequence of s
  const isSubseq = (seq) => {
    const m = seq.length;
    let j = 0; // pointer in seq
    let count = 0; // how many copies matched
    for (let i = 0; i < n; i++) {
      if (s[i] === seq[j]) {
        j++;
        if (j === m) {
          count++;
          j = 0;
          if (count === k) return true;
        }
      }
    }
    return false;
  };

  let answer = "";
  // BFS queue (start with empty string)
  let queue = [""];

  while (queue.length > 0) {
    const nextQueue = [];
    for (const curr of queue) {
      for (const ch of candidates) {
        const next = curr + ch;
        if (isSubseq(next)) {
          nextQueue.push(next);
          // Update answer if longer or same length but lex larger
          if (
            next.length > answer.length ||
            (next.length === answer.length && next > answer)
          ) {
            answer = next;
          }
        }
      }
    }
    queue = nextQueue;
  }

  return answer;
};

function longestSubsequenceRepeatedK(s, k) {
  const n = s.length;
  const freq = new Array(26).fill(0);
  const canUse = new Array(26).fill(false);
  const requiredFreq = new Array(26).fill(0);
  const maxLen = Math.floor(n / k);
  let result = "";

  for (let ch of s) {
    const idx = ch.charCodeAt() - 97;
    freq[idx]++;
    if (freq[idx] >= k) {
      canUse[idx] = true;
      requiredFreq[idx] = Math.floor(freq[idx] / k);
    }
  }

  function isSubsequence(sub) {
    let i = 0,
      j = 0;
    let l = sub.length;
    while (i < n && j < k * l) {
      if (s[i] === sub[j % l]) {
        j++;
      }
      i++;
    }
    return j === k * l;
  }

  function solve(curr, required, len) {
    if (curr.length === len) {
      const curStr = curr.join("");
      if (isSubsequence(curStr)) {
        result = curStr;
        return true;
      }
      return false;
    }
    for (let i = 25; i >= 0; i--) {
      if (canUse[i] === false || required[i] === 0) continue;

      // Do
      const ch = String.fromCharCode(i + 97);
      curr.push(ch);
      required[i]--;

      // Explore
      if (solve(curr, required, len)) return true;

      // Undo
      curr.pop();
      required[i]++;
    }
    return false;
  }

  for (let len = maxLen; len >= 0; len--) {
    let tempRequired = [...requiredFreq];
    if (solve([], tempRequired, len) === true) return result;
  }

  return result;
}

console.log(longestSubsequenceRepeatedK("letsleetcode", 2));

/**
 * 2014. Longest Subsequence Repeated k Times
 *
 * =========================
 * PLAN (Interview-ready)
 * =========================
 *
 * 1. Rephrase the problem in my own words
 * -------------------------------------
 * We are given a string `s` and an integer `k`.
 * We need to find the longest string `seq` such that:
 *   - `seq` is a subsequence of `s`
 *   - `seq` repeated `k` times (seq + seq + ... + seq) is also a subsequence of `s`
 *
 * If multiple valid sequences have the same maximum length,
 * we must return the **lexicographically largest** one.
 * If no such sequence exists, return an empty string.
 *
 *
 * 2. Inputs and Outputs
 * ---------------------
 * Input:
 *   - s: string
 *   - k: number
 *
 * Output:
 *   - string (longest subsequence repeated k times)
 *
 *
 * 3. Data Structures
 * ------------------
 * - Frequency array (size 26) for pruning
 * - Queue / array for BFS over candidate strings
 * - Helper function to check if (candidate * k) is a subsequence of s
 *
 *
 * 4. Approach
 * -----------
 * Intuition:
 * Directly trying all subsequences is impossible.
 *
 * Key observations:
 * - If a character appears `freq[c]` times in `s`,
 *   then it can appear at most `Math.floor(freq[c] / k)` times in `seq`.
 * - This heavily limits the maximum possible length of `seq`
 *   (in fact, it will be ≤ 7 due to constraints).
 *
 * Strategy:
 * - First, count character frequencies in `s`
 * - Build a list of valid characters that can appear in `seq`
 *   (those with freq >= k)
 * - Use BFS (or level-by-level DFS) to generate candidate strings
 *   in increasing length order
 * - For lexicographically largest result:
 *     - try characters from 'z' → 'a'
 *
 * For each candidate:
 * - Check if candidate repeated k times is a subsequence of `s`
 * - If yes, it is a valid answer; keep the best one
 *
 * BFS guarantees:
 * - We explore shorter sequences first
 * - We can safely update the answer whenever we find a longer valid one
 *
 *
 * 5. Edge Cases
 * -------------
 * - No character appears k times → return ""
 * - Multiple answers with same length → pick lexicographically largest
 * - s is short relative to k
 *
 *
 * 6. Time and Space Complexity
 * ----------------------------
 * Time Complexity:
 *   - BFS candidates are limited (≤ 26^7 worst-case but pruned heavily)
 *   - Each validation check is O(n)
 *   - Practically feasible due to strong pruning
 *
 * Space Complexity:
 *   - O(number of candidates * candidate length)
 *
 *
 * 7. Commit Message
 * -----------------
 * "Find longest k-repeated subsequence using BFS with frequency pruning"
 */

var longestSubsequenceRepeatedK = function (s, k) {
  const n = s.length;

  // Frequency count of characters in s
  const freq = new Array(26).fill(0);
  for (let ch of s) {
    freq[ch.charCodeAt(0) - 97]++;
  }

  // Characters that can possibly appear in seq
  const candidates = [];
  for (let i = 25; i >= 0; i--) {
    if (freq[i] >= k) {
      candidates.push(String.fromCharCode(97 + i));
    }
  }

  // Helper: check if (seq repeated k times) is a subsequence of s
  function isValid(seq) {
    let idx = 0;
    let repeat = 0;

    for (let ch of s) {
      if (ch === seq[idx]) {
        idx++;
        if (idx === seq.length) {
          idx = 0;
          repeat++;
          if (repeat === k) return true;
        }
      }
    }
    return false;
  }

  let answer = "";
  let queue = [""];

  // BFS over possible sequences
  while (queue.length > 0) {
    const nextQueue = [];

    for (let cur of queue) {
      for (let ch of candidates) {
        const next = cur + ch;

        if (isValid(next)) {
          // Update answer: longer or same length but lexicographically larger
          if (
            next.length > answer.length ||
            (next.length === answer.length && next > answer)
          ) {
            answer = next;
          }
          nextQueue.push(next);
        }
      }
    }

    queue = nextQueue;
  }

  return answer;
};

/*
Plan
Rephrase the Problem
We need to find the longest subsequence seq such that seq repeated k times (concatenated) is itself a subsequence of s. If multiple have same max length, return lexicographically largest.

Inputs and Outputs

Input: s (string length n, 2 ≤ n < min(2001, k*8)), k (2 ≤ k ≤ 2000).

Output: Longest (lex largest) subsequence repeated k times.

Data Structures

Frequency count of characters in s to filter candidates.

BFS queue to generate candidate sequences in order of length + lexicographic.

Function to check if seq * k is subsequence of s.

Approach
Intuition:
Key constraint: n < k * 8 means max possible length of seq ≤ 7 (since length L satisfies L * k ≤ n < k*8 → L ≤ 7).
So we can brute force over all possible sequences of length 1 to 7 made from letters that appear at least k times in s.

Steps:

Count freq of each char in s.

Collect candidate chars (appear ≥ k times).

BFS:

Start with empty string.

For each candidate string curr, try appending each candidate char c to get next.

Check if next * k is subsequence of s.

If yes, keep next for further extension.

BFS ensures we explore longer lengths first at each level.

Keep track of best answer (longest, lex largest).

Since max length is small (≤7), BFS explores limited states.

Subsequence check:

For seq * k, we can check k copies sequentially.

Use two-pointer: traverse s once, match characters of seq repeatedly k times.

Edge Cases

No char appears k times → "".

Multiple answers same length: pick lex largest.

s length small.

Time and Space Complexity

Time: BFS width ≤ (candidate letters)^7, but candidates ≤ 26. Subsequence check O(n) each. In worst ~26^7 huge, but pruning by freq and k reduces drastically. Acceptable given L ≤ 7.

Space: O(number of states) manageable.

Commit Message
"Solve Longest Subsequence Repeated k Times using BFS with pruning"

*/
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var longestSubsequenceRepeatedK = function (s, k) {
  const n = s.length;
  // Count frequency
  const freq = new Array(26).fill(0);
  for (const ch of s) {
    freq[ch.charCodeAt(0) - 97]++;
  }

  // Candidate letters (appear at least k times)
  const candidates = [];
  for (let i = 0; i < 26; i++) {
    if (freq[i] >= k) {
      candidates.push(String.fromCharCode(97 + i));
    }
  }
  if (candidates.length === 0) return "";

  // Helper: check if seq * k is subsequence of s
  const isSubseq = (seq) => {
    const m = seq.length;
    let j = 0; // pointer in seq
    let count = 0; // how many copies matched
    for (let i = 0; i < n; i++) {
      if (s[i] === seq[j]) {
        j++;
        if (j === m) {
          count++;
          j = 0;
          if (count === k) return true;
        }
      }
    }
    return false;
  };

  let answer = "";
  // BFS queue (start with empty string)
  let queue = [""];

  while (queue.length > 0) {
    const nextQueue = [];
    for (const curr of queue) {
      for (const ch of candidates) {
        const next = curr + ch;
        if (isSubseq(next)) {
          nextQueue.push(next);
          // Update answer if longer or same length but lex larger
          if (
            next.length > answer.length ||
            (next.length === answer.length && next > answer)
          ) {
            answer = next;
          }
        }
      }
    }
    queue = nextQueue;
  }

  return answer;
};
