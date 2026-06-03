/*
211. Design Add and Search Words Data Structure
Medium
Topics
premium lock icon
Companies
Hint
Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the WordDictionary class:

WordDictionary() Initializes the object.
void addWord(word) Adds word to the data structure, it can be matched later.
bool search(word) Returns true if there is any string in the data structure that matches word or false otherwise. word may contain dots '.' where dots can be matched with any letter.
 

Example:

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
WordDictionary wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
 

Constraints:

1 <= word.length <= 25
word in addWord consists of lowercase English letters.
word in search consist of '.' or lowercase English letters.
There will be at most 2 dots in word for search queries.
At most 104 calls will be made to addWord and search.
*/
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * @param {string} word
   * @return {void}
   */
  addWord(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  /**
   * @param {string} word
   * @return {boolean}
   */
  search(word) {
    // Helper function for DFS search
    const dfs = (index, node) => {
      // Base case: we've reached the end of the search word
      if (index === word.length) {
        return node.isEndOfWord;
      }

      const char = word[index];

      if (char === ".") {
        // Wildcard: try every possible child at this level
        for (let key in node.children) {
          if (dfs(index + 1, node.children[key])) {
            return true;
          }
        }
        return false;
      } else {
        // Standard character: check if child exists and move forward
        if (!node.children[char]) {
          return false;
        }
        return dfs(index + 1, node.children[char]);
      }
    };

    return dfs(0, this.root);
  }
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================

var WordDictionary = function () {
  this.root = {};
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  let node = this.root;

  for (let ch of word) {
    if (!(ch in node)) {
      node[ch] = {};
    }
    node = node[ch];
  }

  node.isEnd = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  const dfs = (i, node) => {
    if (word.length === i) return !!node.isEnd;

    const ch = word[i];

    if (ch === ".") {
      for (let key of Object.keys(node)) {
        if (key === "isEnd") continue;
        if (dfs(i + 1, node[key])) return true;
      }

      return false;
    }

    if (!(ch in node)) return false;

    return dfs(i + 1, node[ch]);
  };

  return dfs(0, this.root);
};
