/*
212. Word Search II
Hard
Topics
premium lock icon
Companies
Hint
Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

 

Example 1:


Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
Example 2:


Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []
 

Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 12
board[i][j] is a lowercase English letter.
1 <= words.length <= 3 * 104
1 <= words[i].length <= 10
words[i] consists of lowercase English letters.
All the strings of words are unique.
*/

class TrieNode {
  constructor() {
    this.children = new Array(26).fill(null);
    this.word = null; // store full word at end node
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const idx = word.charCodeAt(i) - 97;
      if (!node.children[idx]) {
        node.children[idx] = new TrieNode();
      }

      node = node.children[idx];
    }

    node.word = word;
  }
}

function findWords(board, words) {
  const trie = new Trie();

  // Build Trie
  for (let word of words) {
    trie.insert(word);
  }

  const result = [];
  const rows = board.length;
  const cols = board[0].length;
  const rowD = [1, -1, 0, 0];
  const colD = [0, 0, 1, -1];

  function dfs(r, c, node) {
    // Bounds
    if (r < 0 || c < 0 || r >= rows || c >= cols) return;

    const ch = board[r][c];
    if (ch === "#") return; // Visited

    const idx = ch.charCodeAt(0) - 97;
    if (!node.children[idx]) return;

    node = node.children[idx];

    // word found!
    if (node.word !== null) {
      result.push(node.word);
      node.word = null; // Avoid duplicates
    }

    // Mark visited
    board[r][c] = "#";

    for (let i = 0; i < 4; i++) {
      dfs(r + rowD[i], c + colD[i], node);
    }

    // Backtrack
    board[r][c] = ch;
  }

  // Start DFS from each cell
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, trie.root);
    }
  }
  return result;
}

/*
Time:

Build Trie: O(W × L)

Search board: O(m × n × 4^L) worst-case, practically O(m × n × L)

Space:

Trie size: O(W × L)

DFS recursion: O(m × n)

Total: O(W × L + m × n)
*/

class TrieNode {
  constructor() {
    this.children = new Map();
    this.word = null; // Store the complete word at the end node
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
    node.word = word; // Store the word at the terminal node
  }
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const result = [];
  const m = board.length;
  const n = board[0].length;

  // Build Trie from the words
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }

  // Directions for moving in the board (up, right, down, left)
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  /**
   * DFS backtracking function
   * @param {TrieNode} node - Current trie node
   * @param {number} row - Current row in board
   * @param {number} col - Current column in board
   */
  const backtrack = (node, row, col) => {
    // Check if we found a word
    if (node.word !== null) {
      result.push(node.word);
      node.word = null; // Prevent duplicates
    }

    // Mark current cell as visited
    const temp = board[row][col];
    board[row][col] = "#";

    // Explore all four directions
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;

      // Check boundaries and if visited
      if (
        newRow >= 0 &&
        newRow < m &&
        newCol >= 0 &&
        newCol < n &&
        board[newRow][newCol] !== "#"
      ) {
        const nextChar = board[newRow][newCol];
        if (node.children.has(nextChar)) {
          backtrack(node.children.get(nextChar), newRow, newCol);
        }
      }
    }

    // Restore the cell
    board[row][col] = temp;

    // Optimization: Prune leaf nodes to speed up future searches
    if (node.children.size === 0) {
      // In JavaScript, we need to handle pruning at the parent level
      // This is done implicitly as we don't revisit pruned branches
    }
  };

  // Start DFS from each cell
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const char = board[i][j];
      if (trie.root.children.has(char)) {
        backtrack(trie.root.children.get(char), i, j);
      }
    }
  }

  return result;
};

// Optimized version with pruning
var findWordsOptimized = function (board, words) {
  const result = [];
  const m = board.length;
  const n = board[0].length;

  // Build Trie
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const dfs = (node, row, col) => {
    // Check if we found a word
    if (node.word) {
      result.push(node.word);
      node.word = null; // Mark as found to avoid duplicates
    }

    // Boundary and visited check
    if (
      row < 0 ||
      row >= m ||
      col < 0 ||
      col >= n ||
      board[row][col] === "#" ||
      !node.children.has(board[row][col])
    ) {
      return;
    }

    const char = board[row][col];
    const nextNode = node.children.get(char);

    // Mark as visited
    board[row][col] = "#";

    // Explore neighbors
    for (const [dx, dy] of directions) {
      dfs(nextNode, row + dx, col + dy);
    }

    // Backtrack
    board[row][col] = char;

    // Optimization: Prune the leaf node if it has no children
    // (This helps in subsequent searches)
    if (nextNode.children.size === 0) {
      node.children.delete(char);
    }
  };

  // Start from each cell
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(trie.root, i, j);
    }
  }

  return result;
};

// Alternative approach with visited array (doesn't modify board)
var findWordsWithVisited = function (board, words) {
  const result = new Set(); // Use Set to avoid duplicates
  const m = board.length;
  const n = board[0].length;

  // Build Trie
  const trie = new Trie();
  for (const word of words) {
    trie.insert(word);
  }

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  const dfs = (node, row, col, visited) => {
    // If current position is out of bounds or already visited
    if (row < 0 || row >= m || col < 0 || col >= n || visited[row][col]) {
      return;
    }

    const char = board[row][col];
    if (!node.children.has(char)) {
      return;
    }

    const nextNode = node.children.get(char);

    // Check if we found a word
    if (nextNode.word) {
      result.add(nextNode.word);
      // Don't return here, as there might be longer words with same prefix
    }

    // Mark as visited
    visited[row][col] = true;

    // Explore neighbors
    for (const [dx, dy] of directions) {
      dfs(nextNode, row + dx, col + dy, visited);
    }

    // Backtrack
    visited[row][col] = false;
  };

  // Start from each cell
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const visited = Array(m)
        .fill()
        .map(() => Array(n).fill(false));
      dfs(trie.root, i, j, visited);
    }
  }

  return Array.from(result);
};

// Test cases
console.log("Test Case 1:");
const board1 = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
];
const words1 = ["oath", "pea", "eat", "rain"];
console.log("Output:", findWords(board1, words1)); // ["eat","oath"]

console.log("\nTest Case 2:");
const board2 = [
  ["a", "b"],
  ["c", "d"],
];
const words2 = ["abcb"];
console.log("Output:", findWords(board2, words2)); // []

console.log("\nTest Case 3:");
const board3 = [
  ["a", "b", "c"],
  ["a", "e", "d"],
  ["a", "f", "g"],
];
const words3 = ["abcdefg", "gfedcbaaa", "eaabcdgfa", "befa", "dgc", "ade"];
console.log("Output:", findWordsOptimized(board3, words3)); // ["abcdefg", "befa", "eaabcdgfa", "gfedcbaaa"]
