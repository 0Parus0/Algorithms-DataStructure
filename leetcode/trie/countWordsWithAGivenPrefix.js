/*
2185. Counting Words With a Given Prefix
Easy
Topics
premium lock icon
Companies
Hint
You are given an array of strings words and a string pref.

Return the number of strings in words that contain pref as a prefix.

A prefix of a string s is any leading contiguous substring of s.

 

Example 1:

Input: words = ["pay","attention","practice","attend"], pref = "at"
Output: 2
Explanation: The 2 strings that contain "at" as a prefix are: "attention" and "attend".
Example 2:

Input: words = ["leetcode","win","loops","success"], pref = "code"
Output: 0
Explanation: There are no strings that contain "code" as a prefix.
 

Constraints:

1 <= words.length <= 100
1 <= words[i].length, pref.length <= 100
words[i] and pref consist of lowercase English letters.
*/

// ========================================================================
// 1. Brute Force
// ========================================================================

/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
var prefixCount = function (words, pref) {
  let count = 0;

  for (const word of words) {
    if (word.startsWith(pref)) {
      count++;
    }
  }

  return count;
};

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;

    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }

      node = node.children[ch];

      // Count words passing through
      node.count++;
    }
  }

  getPrefixCount(pref) {
    let node = this.root;

    for (const ch of pref) {
      if (!node.children[ch]) {
        return 0;
      }

      node = node.children[ch];
    }

    return node.count;
  }
}

/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
var prefixCount = function (words, pref) {
  const trie = new Trie();

  for (const word of words) {
    trie.insert(word);
  }

  return trie.getPrefixCount(pref);
};

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0; // Stores how many words pass through this node
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // Insert a word and increment count at each node
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
      node.count++;
    }
  }

  // Traverse the prefix and return the count at the last node
  getCount(pref) {
    let node = this.root;
    for (const char of pref) {
      if (!node.children[char]) return 0; // Prefix doesn't exist
      node = node.children[char];
    }
    return node.count;
  }
}

/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
var prefixCount = function (words, pref) {
  const trie = new Trie();

  // 1. Build the Trie
  for (const word of words) {
    trie.insert(word);
  }

  // 2. Query the prefix
  return trie.getCount(pref);
};
