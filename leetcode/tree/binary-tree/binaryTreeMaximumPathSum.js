/*
124. Binary Tree Maximum Path Sum
Hard
Topics
premium lock icon
Companies
A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.

The path sum of a path is the sum of the node's values in the path.

Given the root of a binary tree, return the maximum path sum of any non-empty path.

 

Example 1:


Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.
Example 2:


Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
 

Constraints:

The number of nodes in the tree is in the range [1, 3 * 104].
-1000 <= Node.val <= 1000
*/

/**
 * 124. Binary Tree Maximum Path Sum
 *
 * =========================
 * PLAN (Interview-style)
 * =========================
 *
 * 1. Rephrase the problem in my own words:
 *    We are given a binary tree where each node has an integer value.
 *    A path can start and end at any node in the tree, but it must go
 *    downwards through parent-child connections and cannot revisit nodes.
 *    The path does NOT have to pass through the root.
 *    We need to find the maximum possible sum of values along any such path.
 *
 * 2. Inputs and Outputs:
 *    - Input:
 *        root: TreeNode → root of the binary tree (at least one node exists)
 *    - Output:
 *        number → maximum path sum among all possible non-empty paths
 *
 * 3. Data Structures:
 *    - Recursion (DFS): to traverse the tree
 *    - Global / outer variable: to track the maximum path sum found so far
 *
 * 4. Approach:
 *    Intuition:
 *    - At every node, there are two different concepts of "path":
 *        A) A path that can be extended upwards to the parent
 *        B) A path that is fully contained in the subtree with this node
 *           as the highest (turning) point
 *
 *    Key Insight:
 *    - When returning to the parent, we can only choose ONE side
 *      (left OR right), because a path cannot branch upwards.
 *    - However, when computing the global maximum, we are allowed
 *      to use BOTH left and right children through the current node.
 *
 *    How to solve:
 *    - Use post-order DFS.
 *    - For each node:
 *        1. Compute max path sum from left subtree (ignore if negative)
 *        2. Compute max path sum from right subtree (ignore if negative)
 *        3. Possible max path THROUGH this node:
 *           node.val + leftGain + rightGain
 *        4. Update global maximum with this value
 *        5. Return to parent:
 *           node.val + max(leftGain, rightGain)
 *
 * 5. Edge Cases:
 *    - Tree with all negative values → return the maximum single node value
 *    - Skewed tree (like a linked list)
 *    - Single-node tree
 *
 * 6. Time and Space Complexity:
 *    - Time Complexity: O(N)
 *        Each node is visited exactly once.
 *    - Space Complexity: O(H)
 *        Recursion stack, where H is the height of the tree (O(N) worst case).
 *
 * 7. Commit Message:
 *    "Solve Binary Tree Maximum Path Sum using post-order DFS"
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
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  // Initialize maxSum to smallest possible value
  let maxSum = -Infinity;

  /**
   * DFS helper function
   * Returns: maximum sum of a path that starts at 'node' and goes downward
   * (i.e., path that can be extended upward to parent)
   */
  const dfs = (node) => {
    if (!node) return 0;

    // Calculate max gain from left and right subtrees
    // If gain is negative, we take 0 (ignore that subtree)
    const leftGain = Math.max(dfs(node.left), 0);
    const rightGain = Math.max(dfs(node.right), 0);

    // Current path sum if we take node as the "root" of the path
    // This forms a "V" shape: left → node → right
    const currentPathSum = node.val + leftGain + rightGain;

    // Update global maxSum
    maxSum = Math.max(maxSum, currentPathSum);

    // Return the maximum gain if we continue the path upward
    // We can only take one side going upward (left or right, not both)
    return node.val + Math.max(leftGain, rightGain);
  };

  // Start DFS
  dfs(root);

  return maxSum;
};
