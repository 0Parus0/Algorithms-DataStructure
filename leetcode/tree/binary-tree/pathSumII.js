/*
113. Path Sum II
Medium
Topics
premium lock icon
Companies
Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where the sum of the node values in the path equals targetSum. Each path should be returned as a list of the node values, not node references.

A root-to-leaf path is a path starting from the root and ending at any leaf node. A leaf is a node with no children.

 

Example 1:


Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
Explanation: There are two paths whose sum equals targetSum:
5 + 4 + 11 + 2 = 22
5 + 8 + 4 + 5 = 22
Example 2:


Input: root = [1,2,3], targetSum = 5
Output: []
Example 3:

Input: root = [1,2], targetSum = 0
Output: []
 

Constraints:

The number of nodes in the tree is in the range [0, 5000].
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const result = [];
  function preOrder(node, sum = 0, temp = []) {
    if (!node) return;
    sum += node.val;
    temp.push(node.val);
    if (sum === targetSum) {
      if (!node.left && !node.right) {
        result.push([...temp]);
      }
    }
    preOrder(node.left, sum, temp);
    preOrder(node.right, sum, temp);
    temp.pop();
  }
  preOrder(root);
  return result;
};

var pathSum = function (root, targetSum) {
  const result = [];

  function dfs(node, sum, path) {
    if (!node) return;

    const newPath = [...path]; // ← simulate pass-by-value
    const newSum = sum + node.val;

    newPath.push(node.val);

    if (!node.left && !node.right && newSum === targetSum) {
      result.push(newPath);
      return;
    }

    dfs(node.left, newSum, newPath);
    dfs(node.right, newSum, newPath);
  }

  dfs(root, 0, []);
  return result;
};

/**
 * 113. Path Sum II
 *
 * =========================
 * PLAN (Interview-style)
 * =========================
 *
 * 1. Rephrase the problem in my own words:
 *    We are given a binary tree and a target sum.
 *    We need to find all paths that start at the root and end at a leaf
 *    such that the sum of node values along the path equals targetSum.
 *    Each valid path should be returned as an array of values.
 *
 * 2. Inputs and Outputs:
 *    - Input:
 *        root: TreeNode | null  → root of the binary tree
 *        targetSum: number     → required sum of a root-to-leaf path
 *    - Output:
 *        number[][] → list of all valid root-to-leaf paths
 *
 * 3. Data Structures:
 *    - Array (path): to keep track of the current root-to-node path
 *    - Array of Arrays (result): to store all valid paths
 *    - Recursion (DFS): to traverse the tree
 *
 * 4. Approach:
 *    Intuition:
 *    - This is a classic root-to-leaf DFS problem.
 *    - While traversing, we keep adding node values to a running path
 *      and subtracting them from the remaining sum.
 *    - When we reach a leaf:
 *        - If the remaining sum equals the leaf’s value,
 *          we have found a valid path.
 *
 *    How to solve:
 *    - Use DFS (pre-order traversal).
 *    - Maintain:
 *        - `path`: current path from root to current node
 *        - `remainingSum`: how much sum is left to reach target
 *    - At each node:
 *        - Add node.val to path
 *        - Subtract node.val from remainingSum
 *    - If node is a leaf and remainingSum === 0:
 *        - Push a copy of path into result
 *    - After exploring children:
 *        - Backtrack by removing the last value from path
 *
 * 5. Edge Cases:
 *    - Empty tree → return []
 *    - Tree exists but no valid path → return []
 *    - Negative values in nodes or targetSum
 *
 * 6. Time and Space Complexity:
 *    - Time Complexity: O(N)
 *        Each node is visited once.
 *    - Space Complexity: O(N)
 *        - Recursion stack in worst case
 *        - Path storage
 *
 * 7. Commit Message:
 *    "Add DFS backtracking solution for Path Sum II"
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const result = [];
  const path = [];

  function dfs(node, remainingSum) {
    if (!node) return;

    // Choose
    path.push(node.val);
    remainingSum -= node.val;

    // Check if leaf node and sum matches
    if (!node.left && !node.right && remainingSum === 0) {
      result.push([...path]); // copy path
    }

    // Explore
    dfs(node.left, remainingSum);
    dfs(node.right, remainingSum);

    // Un-choose (backtrack)
    path.pop();
  }

  dfs(root, targetSum);
  return result;
};

/*

Plan
1. Rephrase the Problem
We need to find all paths from the root to leaves in a binary tree where the sum of node values along the path equals a given target sum. Return these paths as arrays of values.

2. Inputs and Outputs
Inputs:

root: Root node of a binary tree

targetSum: Integer target sum

Output:

Array of arrays, where each inner array contains node values from root to leaf that sum to targetSum

3. Data Structures
Array: To store the result paths

Array (as stack): To track current path during DFS

Recursive DFS: To traverse all root-to-leaf paths

4. Approach
Intuition:

We need to explore every root-to-leaf path

While traversing, we keep track of:

Current path (nodes visited so far)

Current sum (sum of values in current path)

When we reach a leaf node, check if current sum equals targetSum

If yes, add a copy of current path to results

Backtrack: remove current node from path when going back up the tree

Solution Steps:

Initialize result array and current path array

Perform DFS from root:

Add current node value to path and update current sum

If at leaf node (no children), check if sum equals targetSum

If yes, add copy of path to results

Recursively process left child (if exists)

Recursively process right child (if exists)

Backtrack: remove current node from path before returning

Return result array

5. Edge Cases
Empty tree (root is null) → return []

Single node tree that matches target → return [[value]]

Single node tree that doesn't match → return []

All negative numbers

Target sum is 0

Multiple paths with same sum

Large tree (5000 nodes)

6. Time and Space Complexity
Time Complexity: O(n) where n is number of nodes (we visit each node once)

Space Complexity: O(h) for recursion stack + O(h) for current path, where h is height of tree. In worst case (skewed tree), O(n). Result storage is additional O(n*k) where k is number of valid paths.

7. Commit Message
Will be added at the end of solution.
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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const result = [];

  // Helper function for DFS traversal
  const dfs = (node, currentSum, path) => {
    if (!node) return;

    // Add current node to path and update sum
    path.push(node.val);
    currentSum += node.val;

    // Check if leaf node
    if (!node.left && !node.right) {
      // If leaf and sum matches target, add to results
      if (currentSum === targetSum) {
        // IMPORTANT: Make a copy of the path
        result.push([...path]);
      }
    } else {
      // Continue DFS on children
      dfs(node.left, currentSum, path);
      dfs(node.right, currentSum, path);
    }

    // Backtrack: remove current node from path
    path.pop();
  };

  // Start DFS from root
  dfs(root, 0, []);

  return result;
};
/* Alternative cleaner version without passing currentSum as parameter:*/

var pathSum = function (root, targetSum) {
  const result = [];
  const currentPath = [];

  const dfs = (node, currentSum) => {
    if (!node) return;

    currentPath.push(node.val);
    currentSum += node.val;

    // Check if leaf node
    if (!node.left && !node.right) {
      if (currentSum === targetSum) {
        result.push([...currentPath]);
      }
    } else {
      dfs(node.left, currentSum);
      dfs(node.right, currentSum);
    }

    // Backtrack
    currentPath.pop();
  };

  dfs(root, 0);
  return result;
};
/* Optimized version (less parameters):*/

var pathSum = function (root, targetSum) {
  const result = [];
  const path = [];

  const dfs = (node, sum) => {
    if (!node) return;

    path.push(node.val);
    sum += node.val;

    // If leaf and sum matches
    if (!node.left && !node.right && sum === targetSum) {
      result.push([...path]);
    }

    dfs(node.left, sum);
    dfs(node.right, sum);

    path.pop(); // Backtrack
  };

  dfs(root, 0);
  return result;
};
/*
Commit Message:
"Add solution for Path Sum II using DFS with backtracking to find all root-to-leaf paths with target sum, handling path copying and backtracking properly."
*/
