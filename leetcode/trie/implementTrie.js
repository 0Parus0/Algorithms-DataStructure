/*
208. Implement Trie (Prefix Tree)
Medium
Topics
premium lock icon
Companies
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

Trie() Initializes the trie object.
void insert(String word) Inserts the string word into the trie.
boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 

Example 1:

Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
 

Constraints:

1 <= word.length, prefix.length <= 2000
word and prefix consist only of lowercase English letters.
At most 3 * 104 calls in total will be made to insert, search, and startsWith.
*/

class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null);
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let idx = word[i].charCodeAt() - 97;
      if (!node.children[idx]) {
        node.children[idx] = new TrieNode();
      }
      node = node.children[idx];
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let idx = word[i].charCodeAt() - 97;
      if (!node.children[idx]) return false;
      node = node.children[idx];
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      let idx = prefix[i].charCodeAt() - 97;
      if (!node.children[idx]) return false;
      node = node.children[idx];
    }

    return true;
  }
}

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
    for (let ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }

      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  search(word) {
    let node = this.root;
    for (let ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch);
    }
    return node.isEnd;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch);
    }

    return true;
  }
}

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
    this.prefixCount = 0;
    this.wordCount = 0;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch);
      node.prefixCount++;
    }
    node.isEnd = true;
    node.wordCount++;
  }

  search(word) {
    let node = this.root;
    for (let ch of word) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch);
    }
    return node.isEnd && node.wordCount > 0;
  }

  startsWith(prefix) {
    let node = this.root;
    for (let ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch);
    }
    return true;
  }

  countWordsStartingWith(prefix) {
    let node = this.root;
    for (let ch of prefix) {
      if (!node.children.has(ch)) return 0;
      node = node.children.get(ch);
    }
    return node.prefixCount;
  }

  delete(word) {
    if (!this.search(word)) return false; // word not found

    let node = this.root;
    const stack = [];

    for (let ch of word) {
      stack.push([node, ch]);
      node = node.children.get(ch);
      node.prefixCount--;
    }

    node.wordCount--;
    if (node.wordCount === 0) node.isEnd = false;

    // Clean-up unnecessary nodes
    for (let i = word.length - 1; i >= 0; i--) {
      let [parent, ch] = stack[i];
      let child = parent.children.get(ch);

      if (child.prefixCount === 0 && child.wordCount === 0) {
        parent.children.delete(ch);
      }
    }

    return true;
  }

  getWordsWithPrefix(prefix) {
    let node = this.root;
    for (let ch of prefix) {
      if (!node.children.has(ch)) return [];
      node = node.children.get(ch);
    }

    const result = [];

    const dfs = (currNode, path) => {
      if (currNode.isEnd) {
        result.push(path);
      }
      for (let [ch, nextNode] of currNode.children) {
        dfs(nextNode, path + ch);
      }
    };

    dfs(node, prefix);
    return result;
  }
}

/*
| Operation          | Time     | Space                   |
| ------------------ | -------- | ----------------------- |
| Insert(word)       | **O(n)** | O(total chars inserted) |
| Search(word)       | **O(n)** | —                       |
| startsWith(prefix) | **O(n)** | —                       |
*/

class TrieNode {
  constructor() {
    this.children = new Map(); // Map of character to TrieNode
    this.isEndOfWord = false; // Marks the end of a complete word
    this.wordCount = 0; // Number of words that pass through or end at this node
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.totalWords = 0;
  }

  /**
   * Insert a word into the trie
   * @param {string} word - The word to insert
   * @returns {boolean} - True if insertion was successful
   */
  insert(word) {
    if (!word || typeof word !== "string") return false;

    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode());
      }

      currentNode = currentNode.children.get(char);
      currentNode.wordCount++;
    }

    // Mark the end of the word
    if (!currentNode.isEndOfWord) {
      currentNode.isEndOfWord = true;
      this.totalWords++;
      return true;
    }

    return false; // Word already exists
  }

  /**
   * Search for a word in the trie
   * @param {string} word - The word to search for
   * @returns {boolean} - True if the word exists
   */
  search(word) {
    if (!word || typeof word !== "string") return false;

    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!currentNode.children.has(char)) {
        return false;
      }

      currentNode = currentNode.children.get(char);
    }

    return currentNode.isEndOfWord;
  }

  /**
   * Check if any word in the trie starts with the given prefix
   * @param {string} prefix - The prefix to check
   * @returns {boolean} - True if prefix exists
   */
  startsWith(prefix) {
    if (!prefix || typeof prefix !== "string") return false;

    let currentNode = this.root;

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];

      if (!currentNode.children.has(char)) {
        return false;
      }

      currentNode = currentNode.children.get(char);
    }

    return true;
  }

  /**
   * Delete a word from the trie
   * @param {string} word - The word to delete
   * @returns {boolean} - True if deletion was successful
   */
  delete(word) {
    if (!word || typeof word !== "string" || !this.search(word)) return false;

    let currentNode = this.root;
    let nodes = []; // Store nodes to potentially clean up

    // Traverse to the end of the word, collecting nodes
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      currentNode = currentNode.children.get(char);
      nodes.push({ char, node: currentNode });
    }

    // If it's not the end of a word, nothing to delete
    if (!currentNode.isEndOfWord) return false;

    // Mark as not end of word
    currentNode.isEndOfWord = false;
    this.totalWords--;

    // Decrease word count for all nodes in the path
    for (const node of nodes) {
      node.node.wordCount--;
    }

    // Clean up nodes with no children (optional optimization)
    this._cleanupPath(word);

    return true;
  }

  /**
   * Helper method to clean up unused nodes after deletion
   * @private
   */
  _cleanupPath(word) {
    let currentNode = this.root;
    let parentNode = null;
    let lastChar = null;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      parentNode = currentNode;
      currentNode = currentNode.children.get(char);
      lastChar = char;

      // If current node has no children and is not end of another word
      if (currentNode.children.size === 0 && !currentNode.isEndOfWord) {
        parentNode.children.delete(lastChar);
      } else {
        // Stop cleanup if node is still being used
        break;
      }
    }
  }

  /**
   * Get all words with a given prefix
   * @param {string} prefix - The prefix to search for
   * @returns {string[]} - Array of words with the given prefix
   */
  getWordsWithPrefix(prefix = "") {
    if (typeof prefix !== "string") return [];

    const results = [];

    // Find the node for the prefix
    let currentNode = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!currentNode.children.has(char)) {
        return results; // No words with this prefix
      }
      currentNode = currentNode.children.get(char);
    }

    // Collect all words from this node
    this._collectWords(currentNode, prefix, results);

    return results;
  }

  /**
   * Helper method to collect all words from a node
   * @private
   */
  _collectWords(node, currentWord, results) {
    if (node.isEndOfWord) {
      results.push(currentWord);
    }

    for (const [char, childNode] of node.children) {
      this._collectWords(childNode, currentWord + char, results);
    }
  }

  /**
   * Get the number of words in the trie
   * @returns {number} - Total word count
   */
  count() {
    return this.totalWords;
  }

  /**
   * Check if the trie is empty
   * @returns {boolean} - True if the trie is empty
   */
  isEmpty() {
    return this.totalWords === 0;
  }

  /**
   * Clear all words from the trie
   */
  clear() {
    this.root = new TrieNode();
    this.totalWords = 0;
  }

  /**
   * Get all words in the trie
   * @returns {string[]} - Array of all words
   */
  getAllWords() {
    return this.getWordsWithPrefix("");
  }

  /**
   * Check if a word exists or if it's a prefix of existing words
   * @param {string} word - The word to check
   * @returns {object} - Object with existence and prefix info
   */
  checkWord(word) {
    if (!word || typeof word !== "string") {
      return { exists: false, isPrefix: false };
    }

    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];

      if (!currentNode.children.has(char)) {
        return { exists: false, isPrefix: false };
      }

      currentNode = currentNode.children.get(char);
    }

    return {
      exists: currentNode.isEndOfWord,
      isPrefix: currentNode.children.size > 0,
    };
  }

  /**
   * Visualize the trie structure (for debugging/educational purposes)
   * @returns {string} - String representation of the trie
   */
  visualize() {
    const lines = [];

    const traverse = (node, prefix = "", isLast = true, depth = 0) => {
      const indent =
        depth === 0 ? "" : "  ".repeat(depth - 1) + (isLast ? "└─ " : "├─ ");
      const nodeLabel = depth === 0 ? "ROOT" : prefix.slice(-1);
      const endMarker = node.isEndOfWord ? " (*)" : "";

      lines.push(`${indent}${nodeLabel}${endMarker} [${node.wordCount}]`);

      const children = Array.from(node.children.entries());

      children.forEach(([char, childNode], index) => {
        const isLastChild = index === children.length - 1;
        traverse(childNode, prefix + char, isLastChild, depth + 1);
      });
    };

    traverse(this.root);
    return lines.join("\n");
  }
}

// Example usage and demonstration
function demonstrateTrie() {
  console.log("=== Trie Data Structure Demo ===\n");

  const trie = new Trie();

  // Insert words
  console.log("1. Inserting words into the trie:");
  const words = [
    "apple",
    "app",
    "application",
    "banana",
    "bat",
    "ball",
    "batman",
  ];
  words.forEach((word) => {
    trie.insert(word);
    console.log(`   Inserted: "${word}"`);
  });

  console.log(`\n   Total words in trie: ${trie.count()}`);

  // Search for words
  console.log("\n2. Searching for words:");
  const searchTests = ["apple", "app", "ap", "banana", "bat", "batmobile"];
  searchTests.forEach((word) => {
    console.log(`   "${word}": ${trie.search(word) ? "Found" : "Not found"}`);
  });

  // Check prefixes
  console.log("\n3. Checking prefixes:");
  const prefixTests = ["app", "ba", "bat", "cat"];
  prefixTests.forEach((prefix) => {
    console.log(`   Starts with "${prefix}": ${trie.startsWith(prefix)}`);
  });

  // Get words with prefix
  console.log('\n4. Getting words with prefix "ba":');
  const wordsWithPrefix = trie.getWordsWithPrefix("ba");
  console.log(`   ${wordsWithPrefix.join(", ")}`);

  // Get all words
  console.log("\n5. All words in trie:");
  console.log(`   ${trie.getAllWords().join(", ")}`);

  // Check word existence and prefix status
  console.log("\n6. Detailed word checks:");
  const detailedChecks = ["app", "apple", "applications"];
  detailedChecks.forEach((word) => {
    const result = trie.checkWord(word);
    console.log(
      `   "${word}": exists=${result.exists}, isPrefix=${result.isPrefix}`
    );
  });

  // Delete a word
  console.log('\n7. Deleting "app":');
  const deleted = trie.delete("app");
  console.log(`   Deletion successful: ${deleted}`);
  console.log(`   Search for "app" after deletion: ${trie.search("app")}`);
  console.log(`   Search for "apple" after deletion: ${trie.search("apple")}`);
  console.log(`   Total words after deletion: ${trie.count()}`);

  // Visualize trie
  console.log("\n8. Trie structure visualization:");
  console.log(trie.visualize());

  // Advanced usage example
  console.log("\n9. Advanced example - Autocomplete system:");

  const autocompleteTrie = new Trie();
  const dictionary = [
    "hello",
    "help",
    "helper",
    "helping",
    "helpless",
    "world",
    "word",
    "work",
    "worker",
    "working",
  ];

  dictionary.forEach((word) => autocompleteTrie.insert(word));

  console.log('   Type "hel" to see suggestions:');
  const suggestions = autocompleteTrie.getWordsWithPrefix("hel");
  console.log(`   Suggestions: ${suggestions.join(", ")}`);

  console.log('\n   Type "wor" to see suggestions:');
  const suggestions2 = autocompleteTrie.getWordsWithPrefix("wor");
  console.log(`   Suggestions: ${suggestions2.join(", ")}`);
}

// Run the demonstration
demonstrateTrie();

// Export the Trie class for use in other modules
// module.exports = { Trie, TrieNode };
