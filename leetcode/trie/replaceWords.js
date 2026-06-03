/*
648. Replace Words
Solved
Medium
Topics
premium lock icon
Companies
In English, we have a concept called root, which can be followed by some other word to form another longer word - let's call this word derivative. For example, when the root "help" is followed by the word "ful", we can form a derivative "helpful".

Given a dictionary consisting of many roots and a sentence consisting of words separated by spaces, replace all the derivatives in the sentence with the root forming it. If a derivative can be replaced by more than one root, replace it with the root that has the shortest length.

Return the sentence after the replacement.

 

Example 1:

Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"
Example 2:

Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
Output: "a a b c"
 

Constraints:

1 <= dictionary.length <= 1000
1 <= dictionary[i].length <= 100
dictionary[i] consists of only lower-case letters.
1 <= sentence.length <= 106
sentence consists of only lower-case letters and spaces.
The number of words in sentence is in the range [1, 1000]
The length of each word in sentence is in the range [1, 1000]
Every two consecutive words in sentence will be separated by exactly one space.
sentence does not have leading or trailing spaces.
*/
class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEnd = true;
  }

  // This method finds the shortest root for a given word
  findShortestRoot(word) {
    let node = this.root;
    let prefix = "";

    for (const char of word) {
      // If the current character isn't in the Trie, no root exists
      if (!node.children.has(char)) break;

      node = node.children.get(char);
      prefix += char;

      // Because we check isEnd as we go, the first one we
      // hit is guaranteed to be the shortest root.
      if (node.isEnd) return prefix;
    }

    // If we finish the loop without returning, return the original word
    return word;
  }
}

/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
  const trie = new Trie();

  // 1. Build the Trie from the dictionary
  for (const root of dictionary) {
    trie.insert(root);
  }

  // 2. Process the sentence
  const words = sentence.split(" ");
  const result = words.map((word) => trie.findShortestRoot(word));

  // 3. Join words back into a sentence
  return result.join(" ");
};

class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
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
    }

    node.isEnd = true;
  }

  findRoot(word) {
    let node = this.root;
    let prefix = "";

    for (const ch of word) {
      // No path → no root exists
      if (!node.children[ch]) {
        return word;
      }

      prefix += ch;
      node = node.children[ch];

      // Shortest root found
      if (node.isEnd) {
        return prefix;
      }
    }

    return word;
  }
}

/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
  const trie = new Trie();

  // Build trie
  for (const root of dictionary) {
    trie.insert(root);
  }

  // Process sentence
  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = trie.findRoot(words[i]);
  }

  return words.join(" ");
};
