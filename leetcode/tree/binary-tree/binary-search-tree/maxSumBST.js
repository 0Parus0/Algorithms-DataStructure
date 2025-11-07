/*
1373. Maximum Sum BST in Binary Tree
Hard
Topics
premium lock icon
Companies
Hint
Given a binary tree root, return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST).

Assume a BST is defined as follows:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.
 

Example 1:



Input: root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]
Output: 20
Explanation: Maximum sum in a valid Binary search tree is obtained in root node with key equal to 3.
Example 2:



Input: root = [4,3,null,1,2]
Output: 2
Explanation: Maximum sum in a valid Binary search tree is obtained in a single root node with key equal to 2.
Example 3:

Input: root = [-4,-2,-5]
Output: 0
Explanation: All values are negatives. Return an empty BST.
 

Constraints:

The number of nodes in the tree is in the range [1, 4 * 104].
-4 * 104 <= Node.val <= 4 * 104

*/
class Solution {
  maxSumBST(root) {
    // Track the maximum sum of any BST subtree found so far
    let maxSum = 0;

    // Postorder DFS: returns info about each subtree
    function dfs(node) {
      // Base case: null node represents an empty subtree
      if (!node) {
        return {
          isBST: true, // Empty subtree is a valid BST
          min: Infinity, // No real min, so set to Infinity
          max: -Infinity, // No real max, so set to -Infinity
          sum: 0, // Empty subtree has sum = 0
        };
      }

      // Get info from left and right subtrees
      let left = dfs(node.left);
      let right = dfs(node.right);

      // Check if the current node's subtree is a valid BST
      if (
        left.isBST &&
        right.isBST &&
        node.val > left.max &&
        node.val < right.min
      ) {
        // Compute the sum of this BST
        let currSum = left.sum + right.sum + node.val;

        // Update the global maximum sum
        maxSum = Math.max(maxSum, currSum);

        // Return info for this valid BST
        return {
          isBST: true,
          min: Math.min(node.val, left.min), // Update min
          max: Math.max(node.val, right.max), // Update max
          sum: currSum, // Store subtree sum
        };
      }

      // If not a BST, return invalid info
      return {
        isBST: false,
        min: 0,
        max: 0,
        sum: 0,
      };
    }

    // Start DFS from the root
    dfs(root);

    // Return the maximum sum found
    return maxSum;
  }
}

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
var maxSumBST = function (root) {
  let maxSum = 0;

  function dfs(node) {
    if (!node) {
      return { min: Infinity, max: -Infinity, sum: 0, isBST: true };
    }

    let left = dfs(node.left);
    let right = dfs(node.right);

    if (
      left.isBST &&
      right.isBST &&
      node.val > left.max &&
      node.val < right.min
    ) {
      let sum = left.sum + right.sum + node.val;
      maxSum = Math.max(maxSum, sum);
      return {
        min: Math.min(node.val, left.min),
        max: Math.max(node.val, right.max),
        sum: sum,
        isBST: true,
      };
    } else {
      return {
        min: 0,
        max: 0,
        sum: 0,
        isBST: false,
      };
    }
  }

  dfs(root);
  return maxSum;
};
