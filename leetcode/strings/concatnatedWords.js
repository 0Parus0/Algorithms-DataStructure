/*
472. Concatenated Words
Hard
Topics
premium lock icon
Companies
Given an array of strings words (without duplicates), return all the concatenated words in the given list of words.

A concatenated word is defined as a string that is comprised entirely of at least two shorter words (not necessarily distinct) in the given array.

 

Example 1:

Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats"; 
"dogcatsdog" can be concatenated by "dog", "cats" and "dog"; 
"ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".
Example 2:

Input: words = ["cat","dog","catdog"]
Output: ["catdog"]
 

Constraints:

1 <= words.length <= 104
1 <= words[i].length <= 30
words[i] consists of only lowercase English letters.
All the strings of words are unique.
1 <= sum(words[i].length) <= 105
*/

function findAllConcatenatedWordsInADict(words) {
  let result = [];
  if (words.length < 2) return [];
  const set = new Set(words);
  const memo = new Map();
  for (let word of words) {
    // set.delete(word); // will perform better without
    if (isConcatenated(word)) result.push(word);
    // set.add(word);
  }
  function isConcatenated(word) {
    if (memo.has(word)) return memo.get(word);
    let l = word.length;
    for (let i = 1; i < l; i++) {
      let prefix = word.substring(0, i);
      let suffix = word.substring(i);

      if (set.has(prefix)) {
        if (set.has(suffix) || isConcatenated(suffix)) {
          memo.set(word, true);
          return true;
        }
      }
    }
    memo.set(word, false);
    return false;
  }
  return result;
}
/*
"""
#Plan
Approach: DFS with Memoization

1. Sort words by length to process shorter words first
2. Use a set for O(1) word lookups
3. For each word, use DFS to check if it can be formed by other words
4. A word is concatenated if it can be split into 2+ existing words

Key Insight: When checking a word, we cannot use the word itself as a segment
"""
*/

function findAllConcatenatedWords(words) {
  if (words.length < 2) return [];

  // Sort by length to process shorter words first
  words.sort((a, b) => a.length - b.length);

  const wordSet = new Set();
  const result = [];

  /**
   * Checks if word can be formed by concatenating other words from wordSet
   * @param {string} word - Word to check
   * @param {boolean} isOriginal - If this is the original word being checked
   */
  function isConcatenated(word, isOriginal = true) {
    // Base case: empty string is not a valid word
    if (word.length === 0) return false;

    // Try all possible splits
    for (let i = 1; i <= word.length; i++) {
      const prefix = word.substring(0, i);
      const suffix = word.substring(i);

      // Check if prefix exists in dictionary
      if (wordSet.has(prefix)) {
        // If suffix is also a word OR suffix can be concatenated
        if (wordSet.has(suffix) || isConcatenated(suffix, false)) {
          // For original word, we need at least 2 segments
          if (!isOriginal || suffix.length > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Process each word
  for (const word of words) {
    if (word.length > 0 && isConcatenated(word)) {
      result.push(word);
    }
    // Add to set AFTER checking (so it can't use itself)
    wordSet.add(word);
  }

  return result;
}

// More efficient version with memoization
function findAllConcatenatedWordsOptimized(words) {
  if (words.length < 2) return [];

  words.sort((a, b) => a.length - b.length);
  const wordSet = new Set();
  const result = [];
  const memo = new Map();

  function isConcatenated(word, isOriginal = true) {
    if (memo.has(word + isOriginal)) {
      return memo.get(word + isOriginal);
    }

    if (word.length === 0) return false;

    for (let i = 1; i <= word.length; i++) {
      const prefix = word.substring(0, i);
      const suffix = word.substring(i);

      if (wordSet.has(prefix)) {
        // Case 1: suffix is directly in dictionary
        if (wordSet.has(suffix)) {
          if (!isOriginal || suffix.length > 0) {
            memo.set(word + isOriginal, true);
            return true;
          }
        }
        // Case 2: suffix can be concatenated
        if (isConcatenated(suffix, false)) {
          memo.set(word + isOriginal, true);
          return true;
        }
      }
    }

    memo.set(word + isOriginal, false);
    return false;
  }

  for (const word of words) {
    if (word.length > 0 && isConcatenated(word, true)) {
      result.push(word);
    }
    wordSet.add(word);
  }

  return result;
}

// Test cases
console.log(
  findAllConcatenatedWords([
    "cat",
    "cats",
    "catsdogcats",
    "dog",
    "dogcatsdog",
    "hippopotamuses",
    "rat",
    "ratcatdogcat",
  ])
);
// Expected: ["catsdogcats","dogcatsdog","ratcatdogcat"]

console.log(findAllConcatenatedWords(["cat", "dog", "catdog"]));
// Expected: ["catdog"]
/*
"""
#Plan
Approach: Dynamic Programming with Word Break Technique

Since we need to find words that can be formed by concatenating other words from the same list:

1. Sort words by length so we process shorter words first
2. Use a set for O(1) word lookups
3. For each word, use word break algorithm to check if it can be formed by other words
4. A word is compound if:
   - It can be segmented into other dictionary words
   - Uses at least 2 words in the segmentation

Optimization:
- Skip words that are too long to be formed by others
- Use memoization to avoid recomputation
- Process shorter words first to build the foundation

Time Complexity: O(n * L^3) where n = number of words, L = max word length
Space Complexity: O(n) for the word set and DP array
"""
*/

/**
 * Finds all compound words in the dictionary
 * @param {string[]} words - Array of unique words
 * @return {string[]} - All compound words
 */
function findCompoundWords(words) {
  if (words.length < 2) return [];

  // Sort by length to process shorter words first
  words.sort((a, b) => a.length - b.length);

  const wordSet = new Set();
  const result = [];

  /**
   * Checks if a word can be formed by concatenating other words from the set
   * @param {string} word - The word to check
   * @return {boolean} - True if it's a compound word
   */
  function isCompoundWord(word) {
    if (word.length === 0) return false;

    // dp[i] represents whether substring word[0:i] can be segmented
    const dp = new Array(word.length + 1).fill(false);
    dp[0] = true; // empty string is valid

    for (let end = 1; end <= word.length; end++) {
      for (let start = 0; start < end; start++) {
        // Skip if the prefix isn't valid
        if (!dp[start]) continue;

        const segment = word.substring(start, end);

        // Check if segment exists in dictionary
        // Important: the segment cannot be the entire word when start=0
        if (wordSet.has(segment)) {
          // If this is not the entire word being checked as its own segment
          if (!(start === 0 && end === word.length)) {
            dp[end] = true;
            break; // No need to check other splits for this end position
          }
        }
      }
    }

    return dp[word.length];
  }

  // Check each word to see if it's compound
  for (const word of words) {
    if (word.length > 0 && isCompoundWord(word)) {
      result.push(word);
    }
    // Add current word to set AFTER checking (so it can't use itself)
    wordSet.add(word);
  }

  return result;
}

// Alternative approach using DFS with memoization
function findCompoundWordsDFS(words) {
  if (words.length < 2) return [];

  words.sort((a, b) => a.length - b.length);
  const wordSet = new Set(words);
  const result = [];
  const memo = new Map();

  function canFormWord(word, checkEntireWord = true) {
    if (memo.has(word)) return memo.get(word);

    // If we're checking a prefix and it exists in dictionary, it's valid
    if (!checkEntireWord && wordSet.has(word)) {
      memo.set(word, true);
      return true;
    }

    for (let i = 1; i < word.length; i++) {
      const prefix = word.substring(0, i);
      const suffix = word.substring(i);

      // Check if prefix exists and suffix can be formed
      if (wordSet.has(prefix) && canFormWord(suffix, false)) {
        memo.set(word, true);
        return true;
      }
    }

    memo.set(word, false);
    return false;
  }

  for (const word of words) {
    if (canFormWord(word)) {
      result.push(word);
    }
  }

  return result;
}

// Custom Test Cases
console.log(
  "Test 1:",
  findCompoundWords([
    "cat",
    "cats",
    "catsdogcats",
    "dog",
    "dogcatsdog",
    "hippopotamuses",
    "rat",
    "ratcatdogcat",
  ])
);
// Expected: ["catsdogcats","dogcatsdog","ratcatdogcat"]

console.log("Test 2:", findCompoundWords(["cat", "dog", "catdog"]));
// Expected: ["catdog"]

console.log("Test 3:", findCompoundWords(["a", "b", "ab", "abc"]));
// Expected: ["ab", "abc"]

console.log(
  "Test 4:",
  findCompoundWords(["word", "words", "sword", "wordsword"])
);
// Expected: ["wordsword"]

// Edge cases
console.log("Edge 1 - Empty array:", findCompoundWords([])); // []
console.log("Edge 2 - Single word:", findCompoundWords(["hello"])); // []
console.log("Edge 3 - No compounds:", findCompoundWords(["a", "b", "c"])); // []
console.log("Edge 4 - Empty string:", findCompoundWords(["", "a", "b"])); // []

// Let's trace through a simple example
console.log("\n--- Tracing ['cat','dog','catdog'] ---");
console.log(
  "Processing 'cat': wordSet = {} → not compound (set empty) → add to set"
);
console.log("Processing 'dog': wordSet = {'cat'} → not compound → add to set");
console.log("Processing 'catdog': wordSet = {'cat','dog'}");
console.log("  Check splits: 'c' + 'atdog' → 'c' not in set");
console.log("  Check splits: 'ca' + 'tdog' → 'ca' not in set");
console.log("  Check splits: 'cat' + 'dog' → BOTH in set! → COMPOUND WORD");
console.log("Result: ['catdog']");
