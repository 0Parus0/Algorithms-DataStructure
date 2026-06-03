/*
2416. Sum of Prefix Scores of Strings
Hard
Topics
premium lock icon
Companies
Hint
You are given an array words of size n consisting of non-empty strings.

We define the score of a string term as the number of strings words[i] such that term is a prefix of words[i].

For example, if words = ["a", "ab", "abc", "cab"], then the score of "ab" is 2, since "ab" is a prefix of both "ab" and "abc".
Return an array answer of size n where answer[i] is the sum of scores of every non-empty prefix of words[i].

Note that a string is considered as a prefix of itself.

 

Example 1:

Input: words = ["abc","ab","bc","b"]
Output: [5,4,3,2]
Explanation: The answer for each string is the following:
- "abc" has 3 prefixes: "a", "ab", and "abc".
- There are 2 strings with the prefix "a", 2 strings with the prefix "ab", and 1 string with the prefix "abc".
The total is answer[0] = 2 + 2 + 1 = 5.
- "ab" has 2 prefixes: "a" and "ab".
- There are 2 strings with the prefix "a", and 2 strings with the prefix "ab".
The total is answer[1] = 2 + 2 = 4.
- "bc" has 2 prefixes: "b" and "bc".
- There are 2 strings with the prefix "b", and 1 string with the prefix "bc".
The total is answer[2] = 2 + 1 = 3.
- "b" has 1 prefix: "b".
- There are 2 strings with the prefix "b".
The total is answer[3] = 2.
Example 2:

Input: words = ["abcd"]
Output: [4]
Explanation:
"abcd" has 4 prefixes: "a", "ab", "abc", and "abcd".
Each prefix has a score of one, so the total is answer[0] = 1 + 1 + 1 + 1 = 4.
 

Constraints:

1 <= words.length <= 1000
1 <= words[i].length <= 1000
words[i] consists of lowercase English letters.
*/

class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0; // Tracks how many words pass through this node
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
      node.count++; // Increment count for this prefix
    }
  }

  getScore(word) {
    let node = this.root;
    let totalScore = 0;
    for (const char of word) {
      node = node.children[char];
      totalScore += node.count; // Add the score of the current prefix
    }
    return totalScore;
  }
}

/**
 * @param {string[]} words
 * @return {number[]}
 */
var sumPrefixScores = function (words) {
  const trie = new Trie();

  // 1. Build the Trie and calculate prefix frequencies
  for (const word of words) {
    trie.insert(word);
  }

  // 2. Calculate the sum of scores for each word
  const result = [];
  for (const word of words) {
    result.push(trie.getScore(word));
  }

  return result;
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

      // Count how many words share this prefix
      node.count++;
    }
  }

  getPrefixScore(word) {
    let node = this.root;
    let score = 0;

    for (const ch of word) {
      node = node.children[ch];

      score += node.count;
    }

    return score;
  }
}

/**
 * @param {string[]} words
 * @return {number[]}
 */
var sumPrefixScores = function (words) {
  const trie = new Trie();

  // Build trie
  for (const word of words) {
    trie.insert(word);
  }

  const answer = [];

  // Compute scores
  for (const word of words) {
    answer.push(trie.getPrefixScore(word));
  }

  return answer;
};
// ========================================================================
// 1. best and optimal
// ========================================================================

var sumPrefixScores = function (words) {
  const n = words.length;
  const trie = { _count: 0 };
  const result = [];

  // Create our own custom trie with _count property.
  // We are storing how many time we passed current node.
  for (let i = 0; i < n; i++) {
    const word = words[i];

    let node = trie;
    for (let j = 0; j < word.length; j++) {
      if (!node[word[j]]) node[word[j]] = {};
      node = node[word[j]];
      node._count = (node._count || 0) + 1;
    }
  }

  // Collect all _count values together as a result
  for (let i = 0; i < n; i++) {
    const word = words[i];
    let count = 0;

    let node = trie;
    for (let j = 0; j < word.length; j++) {
      node = node[word[j]];
      count += node._count || 0;
    }

    result[i] = count;
  }

  return result;
};
