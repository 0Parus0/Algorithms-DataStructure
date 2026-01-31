/*
1048. Longest String Chain
Medium
Topics
premium lock icon
Companies
Hint
You are given an array of words where each word consists of lowercase English letters.

wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing the order of the other characters to make it equal to wordB.

For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.

Return the length of the longest possible word chain with words chosen from the given list of words.

 

Example 1:

Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chains is ["a","ba","bda","bdca"].
Example 2:

Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].
Example 3:

Input: words = ["abcd","dbqca"]
Output: 1
Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.
 

Constraints:

1 <= words.length <= 1000
1 <= words[i].length <= 16
words[i] only consists of lowercase English letters.
*/
function isPred(w1, w2) {
  // w1 is predecessor of w2 if:
  // 1. w2 is exactly one character longer than w1
  // 2. w1 is a subsequence of w2 (can get w2 by inserting one char in w1)

  if (w2.length - w1.length !== 1) return false;

  let i = 0,
    j = 0;
  while (j < w2.length) {
    if (i < w1.length && w1[i] === w2[j]) {
      i++;
    }
    j++;
  }
  return i === w1.length;
}
var longestStrChain = function (words) {
  const n = words.length;
  // Sort by length to ensure we only check words that could be predecessors
  words.sort((a, b) => a.length - b.length);

  // Memoization: dp[i][j] where i = prevIdx+1, j = currIdx
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(-1));

  function isPred(w1, w2) {
    // w1 is predecessor of w2 if:
    // 1. w2 is exactly one character longer than w1
    // 2. w1 is a subsequence of w2 (can get w2 by inserting one char in w1)

    if (w2.length - w1.length !== 1) return false;

    let i = 0,
      j = 0;
    while (j < w2.length) {
      if (i < w1.length && w1[i] === w2[j]) {
        i++;
      }
      j++;
    }
    return i === w1.length;
  }

  function solve(prevIdx, currIdx) {
    if (currIdx === n) return 0;

    // Adjust prevIdx for memoization (since -1 can't be used as array index)
    const memoPrevIdx = prevIdx + 1; // Convert -1 to 0, 0 to 1, etc.

    if (dp[memoPrevIdx][currIdx] !== -1) {
      return dp[memoPrevIdx][currIdx];
    }

    // Option 1: Skip current word
    const skip = solve(prevIdx, currIdx + 1);

    // Option 2: Take current word if it can follow the previous word
    let take = 0;
    if (prevIdx === -1 || isPred(words[prevIdx], words[currIdx])) {
      take = 1 + solve(currIdx, currIdx + 1);
    }

    dp[memoPrevIdx][currIdx] = Math.max(skip, take);
    return dp[memoPrevIdx][currIdx];
  }

  return solve(-1, 0);
};

function longestStrChain(words) {
  const n = words.length;
  words.sort((a, b) => a.length - b.length);
  const dp = new Array(n).fill(1);

  function isPred(w1, w2) {
    if (w2.length - w1.length !== 1) return false;
    let i = 0,
      j = 0;
    while (j < w2.length) {
      if (w1[j] === w2[i]) {
        i++;
      }

      j++;
    }

    return i === w1.length;
  }

  let maxL = 1;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (isPred(words[j], words[i])) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        maxL = Math.max(maxL, dp[i]);
      }
    }
  }
  return maxL;
}

var longestStrChain = function (words) {
  const n = words.length;
  // Sort by length
  words.sort((a, b) => a.length - b.length);

  // dp[i] = longest chain ending at word i
  const dp = new Array(n).fill(1);
  let maxChain = 1;

  function isPred(word1, word2) {
    if (word2.length - word1.length !== 1) return false;

    let i = 0,
      j = 0;
    while (j < word2.length) {
      if (i < word1.length && word1[i] === word2[j]) {
        i++;
      }
      j++;
    }
    return i === word1.length;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (isPred(words[j], words[i])) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    maxChain = Math.max(maxChain, dp[i]);
  }

  return maxChain;
};

/* Optimized O(n * L²) Approach: */

var longestStrChain = function (words) {
  // Sort by length
  words.sort((a, b) => a.length - b.length);

  // Map: word -> longest chain ending at this word
  const dp = new Map();
  let maxChain = 1;

  for (const word of words) {
    dp.set(word, 1);

    // Try removing each character to find predecessor
    for (let i = 0; i < word.length; i++) {
      const pred = word.slice(0, i) + word.slice(i + 1);
      if (dp.has(pred)) {
        dp.set(word, Math.max(dp.get(word), dp.get(pred) + 1));
      }
    }

    maxChain = Math.max(maxChain, dp.get(word));
  }

  return maxChain;
};
