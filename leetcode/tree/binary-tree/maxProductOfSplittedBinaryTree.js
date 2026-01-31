/*
1339. Maximum Product of Splitted Binary Tree
Medium
Topics
premium lock icon
Companies
Hint
Given the root of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized.

Return the maximum product of the sums of the two subtrees. Since the answer may be too large, return it modulo 109 + 7.

Note that you need to maximize the answer before taking the mod and not after taking it.

 

Example 1:


Input: root = [1,2,3,4,5,6]
Output: 110
Explanation: Remove the red edge and get 2 binary trees with sum 11 and 10. Their product is 110 (11*10)
Example 2:


Input: root = [1,null,2,3,4,null,null,5,6]
Output: 90
Explanation: Remove the red edge and get 2 binary trees with sum 15 and 6.Their product is 90 (15*6)
 

Constraints:

The number of nodes in the tree is in the range [2, 5 * 104].
1 <= Node.val <= 104
*/

function maxProduct(root) {
  const mod = 1e9 + 7;
  let totalSum = 0;
  let maxProduct = 0;

  function sum(node) {
    if (!node) {
      return 0;
    }

    const leftSubTreeSum = sum(node.left);
    const rightSubTreeSum = sum(node.right);
    const subTreeSum = node.val + leftSubTreeSum + rightSubTreeSum;

    const remainingSubtreeSum = totalSum - subTreeSum;
    maxProduct = Math.max(maxProduct, subTreeSum * remainingSubtreeSum);

    return subTreeSum;
  }

  totalSum = sum(root);
  sum(root);
  return maxProduct % mod;
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
var maxProduct = function (root) {
  const mod = 1e9 + 7;
  let totalSum = 0;
  let maxProduct = 0;
  function findTotal(node) {
    if (!node) return 0;
    return node.val + findTotal(node.left) + findTotal(node.right);
  }

  totalSum = findTotal(root);
  function findProduct(node) {
    if (!node) {
      return 0;
    }

    const leftSum = findProduct(node.left);
    const rightSum = findProduct(node.right);
    const subTreeSum = node.val + leftSum + rightSum;
    const remainingSum = totalSum - subTreeSum;
    maxProduct = Math.max(maxProduct, subTreeSum * remainingSum);
    return subTreeSum;
  }

  findProduct(root);
  return maxProduct % mod;
};
