/**
 * Find Leaves of Binary Tree
 *
 * =========================
 * PLAN (Interview-style)
 * =========================
 *
 * 1. Rephrase the problem in my own words:
 *    Given a binary tree, we repeatedly remove all leaf nodes.
 *    Each round of removed leaves should be collected together.
 *    We keep doing this until the tree becomes empty, and finally
 *    return a list of lists where each inner list contains the
 *    leaves removed at the same round.
 *
 * 2. Inputs and Outputs:
 *    - Input:
 *        root: TreeNode | null → root of the binary tree
 *    - Output:
 *        number[][] → array of arrays, where each array contains
 *                     node values removed in the same round
 *
 * 3. Data Structures:
 *    - Array of Arrays: to store leaves grouped by "removal round"
 *    - Recursion (DFS): to compute height of each node
 *
 * 4. Approach:
 *    Intuition:
 *    - If we think in reverse, leaves are nodes with height = 0.
 *    - Their parents (after leaves are removed) become new leaves,
 *      which corresponds to height = 1, and so on.
 *    - So instead of physically removing nodes, we can compute
 *      the "height from the bottom" for each node.
 *
 *    Key Insight:
 *    - Nodes with the same height are removed in the same round.
 *
 *    Steps to solve:
 *    - Perform a post-order DFS.
 *    - For each node:
 *        - Compute leftHeight and rightHeight.
 *        - Current node height = max(leftHeight, rightHeight) + 1
 *        - Use this height as an index in result array.
 *        - Push node.val into result[height].
 *    - Return result after DFS completes.
 *
 * 5. Edge Cases:
 *    - Empty tree → return []
 *    - Single node tree → [[root.val]]
 *    - Skewed tree (linked list-like)
 *
 * 6. Time and Space Complexity:
 *    - Time Complexity: O(N)
 *        Each node is visited once.
 *    - Space Complexity: O(N)
 *        - Recursion stack in worst case
 *        - Result array storage
 *
 * 7. Commit Message:
 *    "Solve Find Leaves of Binary Tree using DFS height grouping"
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
 * @return {number[][]}
 */
var findLeaves = function (root) {
  const result = [];

  function dfs(node) {
    if (!node) return -1;

    const leftHeight = dfs(node.left);
    const rightHeight = dfs(node.right);

    const height = Math.max(leftHeight, rightHeight) + 1;

    if (!result[height]) {
      result[height] = [];
    }

    result[height].push(node.val);
    return height;
  }

  dfs(root);
  return result;
};

/*
Plan
1. Rephrase the Problem
We need to collect all leaf nodes from a binary tree, remove them, then repeat the process on the remaining tree until the tree is empty. We return a 2D array where each inner array contains the values of leaves removed at each stage/height.

2. Inputs and Outputs
Input:

root: Root node of a binary tree

Output:

2D array where:

First array contains values of leaves from original tree

Second array contains values of leaves after removing first set

Third array contains next set, etc.

Last array contains the root value (when it becomes a leaf)

3. Data Structures
Array: To store the result (2D array)

Recursive DFS: To traverse the tree and determine heights

Binary Tree Nodes: The tree structure itself

4. Approach
Intuition:

A node's "height" in this context is the distance from the farthest leaf in its subtree

Leaves have height 0

Parent's height = 1 + max(height of left child, height of right child)

We can group nodes by their height - all nodes with same height get removed at same stage

The result array index corresponds to the height

Solution Steps:

Create result array

Perform DFS to calculate height for each node:

Base case: null node has height -1 (or use 0 for leaves)

For each node: height = 1 + max(height(left), height(right))

Add node's value to result[height] array

Return height

Initialize result arrays as needed (dynamically based on height)

Return result

5. Edge Cases
Empty tree (root is null) → return empty array

Single node tree → return [[root.val]]

Skewed tree (linked list shape)

Balanced tree

Tree with duplicate values (not an issue since we're collecting values)

6. Time and Space Complexity
Time Complexity: O(n) where n is number of nodes (we visit each node once)

Space Complexity: O(h) for recursion stack + O(n) for result array, where h is height of tree

7. Commit Message
"Add solution for Find Leaves of Binary Tree problem using DFS height calculation to group nodes by removal stage, with O(n) time complexity."
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
 * @return {number[][]}
 */
var findLeaves = function (root) {
  const result = [];

  // DFS function that returns the height of the node
  // Height here is defined as distance from farthest leaf
  // Leaves have height 0
  const dfs = (node) => {
    if (!node) return -1; // Base case: null nodes have height -1

    // Calculate height of left and right subtrees
    const leftHeight = dfs(node.left);
    const rightHeight = dfs(node.right);

    // Current node's height is 1 + max of children's heights
    const currentHeight = Math.max(leftHeight, rightHeight) + 1;

    // Ensure we have an array for this height
    if (!result[currentHeight]) {
      result[currentHeight] = [];
    }

    // Add current node's value to the appropriate height bucket
    result[currentHeight].push(node.val);

    return currentHeight;
  };

  // Start DFS from root
  dfs(root);

  return result;
};

/* Alternative approach */
var findLeaves = function (root) {
  const result = [];

  // Helper function that removes leaves and returns if node became leaf
  const removeLeaves = (node) => {
    if (!node) return true; // Null is "removable"

    // Check if children are leaves
    const isLeftLeaf = removeLeaves(node.left);
    const isRightLeaf = removeLeaves(node.right);

    // If both children are leaves (or null), current node is a leaf
    if (isLeftLeaf && isRightLeaf) {
      // This is the actual implementation that collects leaves
      if (isLeftLeaf && node.left) node.left = null;
      if (isRightLeaf && node.right) node.right = null;
      return true;
    }

    return false;
  };

  // Keep removing leaves until tree is empty
  while (root && (root.left || root.right)) {
    const currentLeaves = [];

    const collectLeaves = (node, parent, isLeft) => {
      if (!node) return;

      // If node is a leaf
      if (!node.left && !node.right) {
        currentLeaves.push(node.val);
        // Remove from parent
        if (parent) {
          if (isLeft) parent.left = null;
          else parent.right = null;
        }
        return;
      }

      collectLeaves(node.left, node, true);
      collectLeaves(node.right, node, false);
    };

    collectLeaves(root, null, false);
    result.push(currentLeaves);
  }

  // Add the final root (which is now a leaf)
  if (root) {
    result.push([root.val]);
  }

  return result;
};
