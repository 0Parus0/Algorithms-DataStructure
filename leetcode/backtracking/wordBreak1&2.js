/*
140. Word Break II
Hard
Topics
premium lock icon
Companies
Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

 

Example 1:

Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]
Example 2:

Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
Explanation: Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []
 

Constraints:

1 <= s.length <= 20
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 10
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
*/

function wordBreakII(s, wordDict) {
  const n = s.length;
  const st = new Set(wordDict);
  const mp = new Map();
  function solve(str) {
    if (mp.has(str)) return mp.get(str);

    if (str.length === 0) {
      return [""];
    }

    const result = [];
    for (let l = 1; l <= str.length; l++) {
      const currWord = str.slice(0, l);
      if (st.has(currWord)) {
        const remainingWord = str.slice(l);
        const remainResult = solve(remainingWord);
        for (let word of remainResult) {
          const toAdd = currWord + (word.length ? " " : "") + word;
          result.push(toAdd);
        }
      }
    }
    mp.set(str, result);
    return result;
  }
  return solve(s);
}

function wordBreakII(s, wordDict) {
  const n = s.length;
  const st = new Set(wordDict);
  const result = [];

  let currSentence = "";

  function solve(start, currSentence) {
    if (start >= s.length) {
      result.push(currSentence);
      return;
    }

    for (let end = start + 1; end <= n; end++) {
      let tempWord = s.slice(start, end);
      if (st.has(tempWord)) {
        let tempSentence = currSentence;
        if (currSentence.length !== 0) {
          currSentence += " ";
        }
        currSentence += tempWord;
        solve(end, currSentence);
        currSentence = tempSentence;
      }
    }
  }

  solve(0, currSentence);
  return result;
}

/**
 * 140. Word Break II
 *
 * =========================
 * PLAN (Interview-ready)
 * =========================
 *
 * 1. Rephrase the problem in my own words
 * -------------------------------------
 * We are given a string `s` and a dictionary of words `wordDict`.
 * Our task is to break the string `s` into a sequence of dictionary words,
 * inserting spaces between them, such that:
 * - every segment is a valid word from the dictionary
 * - words can be reused multiple times
 *
 * We must return ALL possible valid sentences.
 *
 *
 * 2. Inputs and Outputs
 * ---------------------
 * Input:
 *   - s: string
 *   - wordDict: string[]
 *
 * Output:
 *   - string[] (all valid sentences)
 *
 *
 * 3. Data Structures
 * ------------------
 * - Set for fast dictionary lookup
 * - Memoization map: index → list of sentences
 * - Recursion (DFS)
 *
 *
 * 4. Approach
 * -----------
 * Intuition:
 * This is a classic DFS + memoization (top-down DP) problem.
 *
 * Naive recursion would try to break the string at every index,
 * but that leads to exponential recomputation of the same substrings.
 *
 * Key idea:
 * - Define a function dfs(startIndex) that returns all valid sentences
 *   that can be formed from s[startIndex ... end]
 *
 * For each startIndex:
 * - Try every possible word that starts at startIndex
 * - If the prefix is in the dictionary:
 *     - recursively solve for the remaining suffix
 *     - combine current word with each returned sentence
 *
 * Memoization:
 * - Store results for each startIndex so we never recompute it
 *
 *
 * 5. Edge Cases
 * -------------
 * - No valid segmentation → return []
 * - Entire string is a single valid word
 * - Overlapping subproblems (handled by memoization)
 *
 *
 * 6. Time and Space Complexity
 * ----------------------------
 * Time Complexity:
 *   - Exponential in worst case (number of valid sentences)
 *   - But memoization avoids repeated work
 *
 * Space Complexity:
 *   - O(n * k) where k is number of sentences stored in memo
 *
 *
 * 7. Commit Message
 * -----------------
 * "Generate all word break sentences using DFS with memoization"
 */

var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const memo = new Map(); // index -> list of sentences

  function dfs(start) {
    // If already computed, return cached result
    if (memo.has(start)) {
      return memo.get(start);
    }

    const result = [];

    // If we've reached the end of the string
    if (start === s.length) {
      result.push("");
      return result;
    }

    // Try every possible end index
    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);

      if (wordSet.has(word)) {
        const subSentences = dfs(end);

        for (let sub of subSentences) {
          // If sub is empty, avoid trailing space
          if (sub === "") {
            result.push(word);
          } else {
            result.push(word + " " + sub);
          }
        }
      }
    }

    memo.set(start, result);
    return result;
  }

  return dfs(0);
};

/*
Plan
Rephrase the Problem
Given a string s and a dictionary wordDict, we need to find all ways to insert spaces into s so that each resulting word exists in the dictionary. Words can be reused. Return all possible sentences.

Inputs and Outputs

Input: s (string, length 1-20), wordDict (array of unique strings, length ≤ 1000, each word length ≤ 10).

Output: Array of strings (sentences with spaces).

Data Structures

Set for dictionary for O(1) lookups.

Memoization map: memo[startIndex] → list of possible sentences from s[startIndex:].

Recursion with backtracking.

Approach
Intuition:
This is a backtracking problem with overlapping subproblems.
Steps:

Convert wordDict to a Set for fast lookups.

Define recursive function dfs(start):

If start is end of string → return [""] (list with empty sentence).

If start in memo → return cached result.

Iterate end from start+1 to n:

Take substring s[start:end].

If substring is in dictionary:

Recursively get sentences for dfs(end).

For each sentence in that result, combine:

If sentence is empty → just use word.

Else → word + " " + sentence.

Add to current results.

Store results in memo for start.

Return results.

Call dfs(0).

Optimization:

Early pruning: if no substring of s[start:] is a prefix of any dict word, we can stop (but with s.length ≤ 20, simple backtracking is fine).

Memoization avoids recomputation.

Edge Cases

No valid segmentation → empty array.

Entire string is a word → single sentence.

Overlapping words (e.g., "a", "aa", "aaa").

Dictionary words longer than string.

Time and Space Complexity

Time: Exponential in worst case, but memoization helps. Roughly O(2^n * n) but with constraints it's acceptable.

Space: O(2^n * n) for storing all sentences and memo.

Commit Message
"Solve Word Break II using backtracking with memoization"
*/
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const n = s.length;
  const memo = new Map();

  const dfs = (start) => {
    // Return cached result if exists
    if (memo.has(start)) {
      return memo.get(start);
    }

    const results = [];

    // Reached end of string
    if (start === n) {
      results.push("");
      return results;
    }

    // Try all possible end positions
    for (let end = start + 1; end <= n; end++) {
      const word = s.substring(start, end);
      if (wordSet.has(word)) {
        // Get sentences for the remaining part
        const subSentences = dfs(end);
        for (const sub of subSentences) {
          if (sub === "") {
            results.push(word);
          } else {
            results.push(word + " " + sub);
          }
        }
      }
    }

    memo.set(start, results);
    return results;
  };

  return dfs(0);
};
