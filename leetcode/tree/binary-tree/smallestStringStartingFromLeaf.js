/*
988. Smallest String Starting From Leaf
Medium
Topics
premium lock icon
Companies
You are given the root of a binary tree where each node has a value in the range [0, 25] representing the letters 'a' to 'z'.

Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.

As a reminder, any shorter prefix of a string is lexicographically smaller.

For example, "ab" is lexicographically smaller than "aba".
A leaf of a node is a node that has no children.

 

Example 1:


Input: root = [0,1,2,3,4,3,4]
Output: "dba"
Example 2:


Input: root = [25,1,3,1,3,0,2]
Output: "adz"
Example 3:


Input: root = [2,2,1,null,1,0,null,0]
Output: "abc"
 

Constraints:

The number of nodes in the tree is in the range [1, 8500].
0 <= Node.val <= 25
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string}
 */

var smallestFromLeaf = function (root) {
  let result = null;

  function dfs(node, curr) {
    if (!node) return;

    // Add current node's value at beginning
    curr = String.fromCharCode(node.val + 97) + curr;

    if (!node.left && !node.right) {
      if (result === null || curr < result) {
        result = curr;
      }
      return;
    }

    dfs(node.left, curr);
    dfs(node.right, curr);
  }

  dfs(root, "");
  return result;
};

var smallestFromLeaf = function (root) {
  let result = null;
  function dfs(node, curr) {
    if (!node) return;
    curr = String.fromCharCode(97 + node.val) + curr;
    if (!node.left && !node.right) {
      result = result === null ? curr : result > curr ? curr : result;
      return;
    }
    dfs(node.left, curr);
    dfs(node.right, curr);
  }

  dfs(root, "");
  return result;
};

/*
Plan
1. Rephrase the Problem
We need to find the lexicographically smallest string that goes from a leaf node up to the root. Each node value (0-25) corresponds to a letter ('a' to 'z'). We compare strings from leaf to root (reverse path).

2. Inputs and Outputs
Input:

root: Root of binary tree where node.val ∈ [0,25] (a-z)

Output:

Smallest lexicographic string from leaf to root

3. Data Structures
DFS with backtracking: To explore all root-to-leaf paths

String builder: To construct current path

Variable: To track smallest string found

4. Approach
Intuition:

We need to compare strings from leaf to root (bottom-up)

But we traverse top-down (root to leaf)

Solution: When we reach leaf, reverse the path and compare

Or: Build string from leaf upward during backtracking

Key Insight:

Compare strings lexicographically: shorter prefix is smaller

We can build strings as we backtrack from leaf to root

At each leaf, we have a complete string to compare

Solution Steps:

Use DFS to traverse all root-to-leaf paths

Build current path as we go down

When at leaf:

Convert current path (node values) to string

Compare with current smallest, update if smaller

Backtrack after exploring each path

Return smallest string

5. Edge Cases
Single node tree → string of that node's letter

Tree where multiple leaves produce same smallest string

Tree with deep paths

Strings of different lengths (shorter prefix is smaller)

All same values

Values at boundary (0='a', 25='z')

6. Time and Space Complexity
Time: O(n * h) where h is height (string comparison at each leaf)

Space: O(h) for recursion stack + path storage
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string}
 */
var smallestFromLeaf = function (root) {
  if (!root) return "";

  let smallest = null;

  const dfs = (node, currentPath) => {
    if (!node) return;

    // Add current node's character to path (at beginning since we go leaf→root)
    currentPath = String.fromCharCode(97 + node.val) + currentPath;

    // Check if leaf
    if (!node.left && !node.right) {
      // Compare with current smallest
      if (smallest === null || currentPath < smallest) {
        smallest = currentPath;
      }
      return;
    }

    // Recurse on children
    if (node.left) dfs(node.left, currentPath);
    if (node.right) dfs(node.right, currentPath);
  };

  dfs(root, "");
  return smallest;
};

/* Optimized Solution (Early Pruning): */

var smallestFromLeaf = function (root) {
  let smallest = null;

  const dfs = (node, path) => {
    if (!node) return;

    // Build path from leaf to root by adding at beginning
    path = String.fromCharCode(97 + node.val) + path;

    // Leaf node
    if (!node.left && !node.right) {
      // Update smallest
      if (smallest === null || path < smallest) {
        smallest = path;
      }
      return;
    }

    // Early pruning: if current path is already larger than smallest
    if (smallest !== null) {
      // Compare prefixes - if path is already lexicographically larger, prune
      const minLength = Math.min(path.length, smallest.length);
      for (let i = 0; i < minLength; i++) {
        if (path[i] > smallest[i]) return; // Prune this branch
        if (path[i] < smallest[i]) break; // Continue, might become smaller
      }
      // If same prefix but path is longer, it's larger ("ab" < "aba")
      if (
        path.length > smallest.length &&
        path.slice(0, smallest.length) === smallest
      ) {
        return;
      }
    }

    // Recursively explore children
    dfs(node.left, path);
    dfs(node.right, path);
  };

  dfs(root, "");
  return smallest;
};

/* Alternative: Build Array and Reverse */
var smallestFromLeaf = function (root) {
  let smallest = null;

  const dfs = (node, path) => {
    if (!node) return;

    // Add current node to path
    path.push(String.fromCharCode(97 + node.val));

    // Leaf node
    if (!node.left && !node.right) {
      // Reverse path (leaf→root) and join
      const str = path.slice().reverse().join("");

      // Update smallest
      if (smallest === null || str < smallest) {
        smallest = str;
      }
      path.pop(); // Backtrack
      return;
    }

    // Explore children
    dfs(node.left, path);
    dfs(node.right, path);

    // Backtrack
    path.pop();
  };

  dfs(root, []);
  return smallest;
};

var smallestFromLeaf = function (root) {
  let answer = null;

  function dfs(node, path) {
    if (!node) return;

    // Convert value to character
    path.push(String.fromCharCode(97 + node.val));

    // If leaf node
    if (!node.left && !node.right) {
      const candidate = path.slice().reverse().join("");
      if (answer === null || candidate < answer) {
        answer = candidate;
      }
    }

    dfs(node.left, path);
    dfs(node.right, path);

    // Backtrack
    path.pop();
  }

  dfs(root, []);
  return answer;
};
