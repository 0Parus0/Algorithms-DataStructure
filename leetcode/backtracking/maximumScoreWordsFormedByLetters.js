/*
1255. Maximum Score Words Formed by Letters
Hard
Topics
premium lock icon
Companies
Hint
Given a list of words, list of  single letters (might be repeating) and score of every character.

Return the maximum score of any valid set of words formed by using the given letters (words[i] cannot be used two or more times).

It is not necessary to use all characters in letters and each letter can only be used once. Score of letters 'a', 'b', 'c', ... ,'z' is given by score[0], score[1], ... , score[25] respectively.

 

Example 1:

Input: words = ["dog","cat","dad","good"], letters = ["a","a","c","d","d","d","g","o","o"], score = [1,0,9,5,0,0,3,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0]
Output: 23
Explanation:
Score  a=1, c=9, d=5, g=3, o=2
Given letters, we can form the words "dad" (5+1+5) and "good" (3+2+2+5) with a score of 23.
Words "dad" and "dog" only get a score of 21.
Example 2:

Input: words = ["xxxz","ax","bx","cx"], letters = ["z","a","b","c","x","x","x"], score = [4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,10]
Output: 27
Explanation:
Score  a=4, b=4, c=4, x=5, z=10
Given letters, we can form the words "ax" (4+5), "bx" (4+5) and "cx" (4+5) with a score of 27.
Word "xxxz" only get a score of 25.
Example 3:

Input: words = ["leetcode"], letters = ["l","e","t","c","o","d"], score = [0,0,1,1,1,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0]
Output: 0
Explanation:
Letter "e" can only be used once.
 

Constraints:

1 <= words.length <= 14
1 <= words[i].length <= 15
1 <= letters.length <= 100
letters[i].length == 1
score.length == 26
0 <= score[i] <= 10
words[i], letters[i] contains only lower case English letters.
*/

function maxScoreWords(words, letters, score) {
  const n = words.length;
  const freq = new Array(26).fill(0);
  let maxScore = -Infinity;

  for (let ch of letters) {
    const idx = ch.charCodeAt() - 97;
    freq[idx]++;
  }

  function solve(currScore, idx, freq) {
    maxScore = Math.max(maxScore, currScore);
    if (idx >= n) return;

    // Can we even take this words[idx]
    let j = 0;
    const tempFreq = [...freq];
    let tempScore = 0;
    while (j < words[idx].length) {
      let ch = words[idx][j];

      const index = ch.charCodeAt() - 97;
      if (tempFreq[index] > 0) {
        tempFreq[index]--;
        tempScore += score[index];
      } else break;
      j++;
    }
    if (j === words[idx].length) {
      // We were able to form the word
      // Take
      solve(currScore + tempScore, idx + 1, tempFreq);
    }

    // Skip
    solve(currScore, idx + 1, freq);
  }
  solve(0, 0, freq);
  return maxScore;
}

/*
Plan
Rephrase the Problem
We have:

A list of words.

Available letters (each letter can be used at most once).

Score for each letter.
We want to choose a subset of words (each word used at most once) that can be formed using the available letters (letters can't be reused across words).
Goal: Maximize total score of letters used in chosen words.

Inputs and Outputs

Input:

words (array of strings, length ≤ 14)

letters (array of single chars, length ≤ 100)

score (array of length 26, integers 0-10)

Output: Integer maximum score.

Data Structures

Frequency count of available letters (size 26 array).

Precompute:

Letter frequency for each word (size 26 array per word).

Score for each word (sum of scores of its letters).

Use bitmask to represent subsets of words (since words.length ≤ 14, 2^14 = 16384 states).

DP or backtracking to explore subsets.

Approach
Intuition:
This is a subset selection problem with resource constraints (letter counts).
Since words.length ≤ 14, we can:

Option 1: Backtracking/DFS — try including/excluding each word, pruning when letters insufficient.

Option 2: DP with bitmask — dp[mask] = max score for using subset mask (but we also need to track remaining letters).

Simpler: Backtracking with pruning:

Count available letters (letterCount[26]).

For each word, precompute its letter frequency and total score.

DFS:

At index i, try:

Skip word i.

Include word i if letters suffice:

Subtract word's letters from available.

Add word's score.

Recurse to next word.

Backtrack (restore letters).

Keep track of max score found.

Optimization: Sort words by something? Not needed; pruning works.

Edge Cases

No words can be formed → score 0.

All letters used exactly.

Words with same letters competing.

Very long words vs few letters.

Time and Space Complexity

Time: O(2^n * L) where n = words.length ≤ 14, L = word length (for letter checks). Worst ~16384 * 15 = ~245k ops.

Space: O(n + 26) for recursion depth and frequency arrays.

Commit Message
"Solve Maximum Score Words Formed by Letters using backtracking"

*/
/**
 * @param {string[]} words
 * @param {character[]} letters
 * @param {number[]} score
 * @return {number}
 */
var maxScoreWords = function (words, letters, score) {
  const n = words.length;

  // 1. Count available letters
  const letterCount = new Array(26).fill(0);
  for (const ch of letters) {
    letterCount[ch.charCodeAt(0) - 97]++;
  }

  // 2. Precompute word frequency and score
  const wordFreq = new Array(n);
  const wordScore = new Array(n);

  for (let i = 0; i < n; i++) {
    const freq = new Array(26).fill(0);
    let total = 0;
    for (const ch of words[i]) {
      const idx = ch.charCodeAt(0) - 97;
      freq[idx]++;
      total += score[idx];
    }
    wordFreq[i] = freq;
    wordScore[i] = total;
  }

  let maxScore = 0;

  // 3. Backtracking DFS
  const dfs = (index, currentScore, available) => {
    if (index === n) {
      maxScore = Math.max(maxScore, currentScore);
      return;
    }

    // Option 1: Skip current word
    dfs(index + 1, currentScore, available);

    // Option 2: Take current word if possible
    const freq = wordFreq[index];
    let canTake = true;

    // Check if enough letters
    for (let i = 0; i < 26; i++) {
      if (available[i] < freq[i]) {
        canTake = false;
        break;
      }
    }

    if (canTake) {
      // Use letters
      for (let i = 0; i < 26; i++) {
        available[i] -= freq[i];
      }

      dfs(index + 1, currentScore + wordScore[index], available);

      // Restore letters (backtrack)
      for (let i = 0; i < 26; i++) {
        available[i] += freq[i];
      }
    }
  };

  dfs(0, 0, letterCount.slice()); // Pass copy of letterCount
  return maxScore;
};

/**
 * 1255. Maximum Score Words Formed by Letters
 *
 * =========================
 * PLAN (Interview-ready)
 * =========================
 *
 * 1. Rephrase the problem in my own words
 * -------------------------------------
 * We are given:
 * - a list of words (each word can be used at most once)
 * - a multiset of letters (each letter can be used only once total)
 * - a score for each character from 'a' to 'z'
 *
 * We need to choose a subset of words such that:
 * - all letters required by chosen words are available
 * - total score (sum of character scores of chosen words) is maximized
 *
 * We are NOT required to use all letters or all words.
 *
 *
 * 2. Inputs and Outputs
 * ---------------------
 * Input:
 *   - words: string[]
 *   - letters: string[]
 *   - score: number[26]
 *
 * Output:
 *   - number (maximum achievable score)
 *
 *
 * 3. Data Structures
 * ------------------
 * - Frequency array of size 26 for available letters
 * - For each word:
 *     - frequency array (size 26)
 *     - precomputed word score
 * - Backtracking (DFS) over words
 *
 *
 * 4. Approach
 * -----------
 * Intuition:
 * This is a classic "pick or skip" backtracking problem.
 * For each word, we have two choices:
 *   1) Skip the word
 *   2) Take the word (only if enough letters are available)
 *
 * Since words.length ≤ 14, brute-force backtracking over subsets is feasible.
 * The key optimization is:
 * - Precompute letter counts and score for each word
 * - While backtracking, maintain a mutable letter frequency array
 *
 * At each step:
 * - Try skipping the word
 * - Try taking the word:
 *     - check feasibility
 *     - subtract letters
 *     - recurse
 *     - backtrack (restore letters)
 *
 * We track the maximum score seen.
 *
 *
 * 5. Edge Cases
 * -------------
 * - No word can be formed → return 0
 * - Letters are insufficient for any word
 * - Single word input
 *
 *
 * 6. Time and Space Complexity
 * ----------------------------
 * Time Complexity:
 *   - O(2^n * 26), where n = words.length (≤ 14)
 *
 * Space Complexity:
 *   - O(26 + n) for frequency arrays and recursion stack
 *
 *
 * 7. Commit Message
 * -----------------
 * "Maximize word score using backtracking with letter frequency pruning"
 */

var maxScoreWords = function (words, letters, score) {
  const n = words.length;

  // Frequency of available letters
  const letterCount = new Array(26).fill(0);
  for (let ch of letters) {
    letterCount[ch.charCodeAt(0) - 97]++;
  }

  // Precompute word letter counts and word scores
  const wordCounts = [];
  const wordScores = [];

  for (let word of words) {
    const freq = new Array(26).fill(0);
    let totalScore = 0;

    for (let ch of word) {
      const idx = ch.charCodeAt(0) - 97;
      freq[idx]++;
      totalScore += score[idx];
    }

    wordCounts.push(freq);
    wordScores.push(totalScore);
  }

  let maxScore = 0;

  function backtrack(index, currentScore) {
    // If all words considered
    if (index === n) {
      maxScore = Math.max(maxScore, currentScore);
      return;
    }

    // Option 1: Skip current word
    backtrack(index + 1, currentScore);

    // Option 2: Take current word (if possible)
    const freq = wordCounts[index];
    let canTake = true;

    for (let i = 0; i < 26; i++) {
      if (freq[i] > letterCount[i]) {
        canTake = false;
        break;
      }
    }

    if (canTake) {
      // Use letters
      for (let i = 0; i < 26; i++) {
        letterCount[i] -= freq[i];
      }

      backtrack(index + 1, currentScore + wordScores[index]);

      // Backtrack (restore letters)
      for (let i = 0; i < 26; i++) {
        letterCount[i] += freq[i];
      }
    }
  }

  backtrack(0, 0);
  return maxScore;
};
