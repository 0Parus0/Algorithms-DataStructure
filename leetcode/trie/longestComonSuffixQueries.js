/*
3093. Longest Common Suffix Queries
Hard
Topics
premium lock icon
Companies
Hint
You are given two arrays of strings wordsContainer and wordsQuery.

For each wordsQuery[i], you need to find a string from wordsContainer that has the longest common suffix with wordsQuery[i]. If there are two or more strings in wordsContainer that share the longest common suffix, find the string that is the smallest in length. If there are two or more such strings that have the same smallest length, find the one that occurred earlier in wordsContainer.

Return an array of integers ans, where ans[i] is the index of the string in wordsContainer that has the longest common suffix with wordsQuery[i].

 

Example 1:

Input: wordsContainer = ["abcd","bcd","xbcd"], wordsQuery = ["cd","bcd","xyz"]

Output: [1,1,1]

Explanation:

Let's look at each wordsQuery[i] separately:

For wordsQuery[0] = "cd", strings from wordsContainer that share the longest common suffix "cd" are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
For wordsQuery[1] = "bcd", strings from wordsContainer that share the longest common suffix "bcd" are at indices 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
For wordsQuery[2] = "xyz", there is no string from wordsContainer that shares a common suffix. Hence the longest common suffix is "", that is shared with strings at index 0, 1, and 2. Among these, the answer is the string at index 1 because it has the shortest length of 3.
Example 2:

Input: wordsContainer = ["abcdefgh","poiuygh","ghghgh"], wordsQuery = ["gh","acbfgh","acbfegh"]

Output: [2,0,2]

Explanation:

Let's look at each wordsQuery[i] separately:

For wordsQuery[0] = "gh", strings from wordsContainer that share the longest common suffix "gh" are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.
For wordsQuery[1] = "acbfgh", only the string at index 0 shares the longest common suffix "fgh". Hence it is the answer, even though the string at index 2 is shorter.
For wordsQuery[2] = "acbfegh", strings from wordsContainer that share the longest common suffix "gh" are at indices 0, 1, and 2. Among these, the answer is the string at index 2 because it has the shortest length of 6.
 

Constraints:

1 <= wordsContainer.length, wordsQuery.length <= 104
1 <= wordsContainer[i].length <= 5 * 103
1 <= wordsQuery[i].length <= 5 * 103
wordsContainer[i] consists only of lowercase English letters.
wordsQuery[i] consists only of lowercase English letters.
Sum of wordsContainer[i].length is at most 5 * 105.
Sum of wordsQuery[i].length is at most 5 * 105.
*/
class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null);
    this.bestIndex = -1; // best container index at this node
    this.bestLength = Infinity; // smallest length among candidates
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, index) {
    const len = word.length;
    let node = this.root;

    for (let char of word) {
      let idx = char.charCodeAt(0) - 97;

      if (!node.children[idx]) {
        node.children[idx] = new TrieNode();
      }

      node = node.children[idx];

      // Tie-breaking update:
      // 1) shortest length
      // 2) earliest index
      if (
        len < node.bestLength ||
        (len === node.bestLength && index < node.bestIndex)
      ) {
        node.bestLength = len;
        node.bestIndex = index;
      }
    }
  }

  query(word) {
    let node = this.root;
    let answerIndex = -1;

    for (let char of word) {
      let idx = char.charCodeAt(0) - 97;

      if (!node.children[idx]) break;

      node = node.children[idx];
      answerIndex = node.bestIndex;
    }

    // If no match, answerIndex stays -1
    return answerIndex === -1 ? this.root.bestIndex : answerIndex;
  }
}

var stringReverse = (s) => s.split("").reverse().join("");

var stringToReversed = (arr) => arr.map(stringReverse);

var stringLengths = (arr) => arr.map((w) => w.length);

var longestCommonSuffixQueries = function (wordsContainer, wordsQuery) {
  const trie = new Trie();

  // Insert reversed container words
  for (let i = 0; i < wordsContainer.length; i++) {
    const rev = stringReverse(wordsContainer[i]);
    trie.insert(rev, i);
  }

  // Root bestIndex should represent empty-suffix candidates
  trie.root.bestIndex = wordsContainer
    .map((w, i) => [i, w.length])
    .sort((a, b) => a[1] - b[1] || a[0] - b[0])[0][0];

  // Answer queries
  const res = [];
  for (const word of wordsQuery) {
    const rev = stringReverse(word);
    res.push(trie.query(rev));
  }

  return res;
};

/**
 * @param {string[]} wordsContainer
 * @param {string[]} wordsQuery
 * @return {number[]}
 */
var stringIndices = function (wordsContainer, wordsQuery) {
  // Create Trie node for reverse strings
  class TrieNode {
    constructor() {
      this.children = new Map(); // character -> TrieNode
      this.bestIndex = -1; // Index of best word meeting criteria
      this.minLength = Infinity; // Minimum length for this suffix
    }
  }

  // Build reverse Trie (suffix trie)
  const root = new TrieNode();

  // Insert words into reverse Trie
  for (let i = 0; i < wordsContainer.length; i++) {
    const word = wordsContainer[i];
    let node = root;

    // Update root node with current word if it's better
    if (word.length < node.minLength) {
      node.minLength = word.length;
      node.bestIndex = i;
    }

    // Insert characters in reverse order (for suffixes)
    for (let j = word.length - 1; j >= 0; j--) {
      const char = word[j];
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);

      // Update current node with best word
      if (word.length < node.minLength) {
        node.minLength = word.length;
        node.bestIndex = i;
      }
    }
  }

  // Process queries
  const result = [];

  for (const query of wordsQuery) {
    let node = root;
    let answer = node.bestIndex; // Default to shortest word at root

    // Traverse reverse Trie with query
    for (let j = query.length - 1; j >= 0; j--) {
      const char = query[j];
      if (!node.children.has(char)) {
        break; // No more common suffix
      }
      node = node.children.get(char);
      answer = node.bestIndex;
    }

    result.push(answer);
  }

  return result;
};

// Optimized version with early termination
var stringIndicesOptimized = function (wordsContainer, wordsQuery) {
  class TrieNode {
    constructor() {
      this.children = new Array(26).fill(null);
      this.bestIndex = -1;
      this.minLength = Infinity;
    }
  }

  const root = new TrieNode();

  // Insert each word into reverse Trie
  for (let i = 0; i < wordsContainer.length; i++) {
    const word = wordsContainer[i];
    const wordLen = word.length;
    let node = root;

    // Update root if current word is shorter
    if (wordLen < node.minLength) {
      node.minLength = wordLen;
      node.bestIndex = i;
    }

    // Insert characters from end to beginning
    for (let j = wordLen - 1; j >= 0; j--) {
      const charIndex = word.charCodeAt(j) - 97;

      if (!node.children[charIndex]) {
        node.children[charIndex] = new TrieNode();
      }
      node = node.children[charIndex];

      // Update node with better word (shorter length or same length but earlier index)
      if (
        wordLen < node.minLength ||
        (wordLen === node.minLength && i < node.bestIndex)
      ) {
        node.minLength = wordLen;
        node.bestIndex = i;
      }
    }
  }

  const result = new Array(wordsQuery.length);

  // Process each query
  for (let i = 0; i < wordsQuery.length; i++) {
    const query = wordsQuery[i];
    let node = root;
    let bestMatch = node.bestIndex; // Start with root's best

    // Traverse the reverse trie with query
    for (let j = query.length - 1; j >= 0; j--) {
      const charIndex = query.charCodeAt(j) - 97;

      if (!node.children[charIndex]) {
        break;
      }

      node = node.children[charIndex];
      bestMatch = node.bestIndex;
    }

    result[i] = bestMatch;
  }

  return result;
};

// Alternative approach: HashMap of suffixes (less memory efficient)
var stringIndicesHashMap = function (wordsContainer, wordsQuery) {
  // Map suffix to best word index
  const suffixMap = new Map();

  // Preprocess container words
  for (let i = 0; i < wordsContainer.length; i++) {
    const word = wordsContainer[i];
    const wordLen = word.length;

    // For all possible suffixes of this word
    for (let j = 0; j <= wordLen; j++) {
      const suffix = word.slice(j); // suffix starting at position j

      if (!suffixMap.has(suffix)) {
        suffixMap.set(suffix, { index: i, length: wordLen });
      } else {
        const current = suffixMap.get(suffix);
        // Update if current word is better (shorter or same length but earlier)
        if (
          wordLen < current.length ||
          (wordLen === current.length && i < current.index)
        ) {
          suffixMap.set(suffix, { index: i, length: wordLen });
        }
      }
    }
  }

  // Process queries
  const result = [];

  for (const query of wordsQuery) {
    let bestIndex = -1;
    let bestLength = Infinity;

    // Check all suffixes of the query
    for (let i = 0; i <= query.length; i++) {
      const suffix = query.slice(i);

      if (suffixMap.has(suffix)) {
        const match = suffixMap.get(suffix);

        // Update best match based on:
        // 1. Longer suffix (i is smaller means suffix is longer)
        // 2. Shorter word length
        // 3. Earlier index
        if (
          i < bestLength ||
          (i === bestLength && match.length < bestLength) ||
          (i === bestLength &&
            match.length === bestLength &&
            match.index < bestIndex)
        ) {
          bestLength = i;
          bestIndex = match.index;
        }
      }
    }

    result.push(bestIndex);
  }

  return result;
};

// Test cases
console.log("Test Case 1:");
const container1 = ["abcd", "bcd", "xbcd"];
const query1 = ["cd", "bcd", "xyz"];
console.log("Container:", container1);
console.log("Queries:", query1);
console.log("Output:", stringIndices(container1, query1));
console.log("Expected: [1, 1, 1]");

console.log("\nTest Case 2:");
const container2 = ["abcdefgh", "poiuygh", "ghghgh"];
const query2 = ["gh", "acbfgh", "acbfegh"];
console.log("Container:", container2);
console.log("Queries:", query2);
console.log("Output:", stringIndices(container2, query2));
console.log("Expected: [2, 0, 2]");

console.log("\nTest Case 3:");
const container3 = ["abc", "bc", "c"];
const query3 = ["abc", "bc", "c", "xyz"];
console.log("Container:", container3);
console.log("Queries:", query3);
console.log("Output:", stringIndices(container3, query3));
console.log("Expected: [0, 1, 2, 2] (last one: 'c' is shortest)");

console.log("\nTest Case 4:");
const container4 = ["apple", "people", "ple", "le"];
const query4 = ["ple", "apple", "grapes"];
console.log("Container:", container4);
console.log("Queries:", query4);
console.log("Output:", stringIndices(container4, query4));
console.log(
  "Expected: [2, 0, 3] (for 'grapes': longest suffix is 'es' -> match 'le'?)"
);

// Edge case: ties in length, choose earlier index
console.log("\nTest Case 5 (Tie-breaking):");
const container5 = ["cat", "bat", "rat", "mat"];
const query5 = ["at"];
console.log("Container:", container5);
console.log("Queries:", query5);
console.log("Output:", stringIndices(container5, query5));
console.log("Expected: [0] (all have same length, choose earliest index 0)");

// Performance test
console.log("\nPerformance Test:");
const largeContainer = ["abc"]; // Simple case
const largeQuery = Array(10000).fill("abc");
console.time("Trie Solution");
const result = stringIndices(largeContainer, largeQuery);
console.timeEnd("Trie Solution");
console.log("First few results:", result.slice(0, 5));
