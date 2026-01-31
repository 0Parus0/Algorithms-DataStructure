/*
1026. Maximum Difference Between Node and Ancestor
Medium
Topics
premium lock icon
Companies
Hint
Given the root of a binary tree, find the maximum value v for which there exist different nodes a and b where v = |a.val - b.val| and a is an ancestor of b.

A node a is an ancestor of b if either: any child of a is equal to b or any child of a is an ancestor of b.

 

Example 1:


Input: root = [8,3,10,1,6,null,14,null,null,4,7,13]
Output: 7
Explanation: We have various ancestor-node differences, some of which are given below :
|8 - 3| = 5
|3 - 7| = 4
|8 - 1| = 7
|10 - 13| = 3
Among all possible differences, the maximum value of 7 is obtained by |8 - 1| = 7.
Example 2:


Input: root = [1,null,2,null,0,3]
Output: 3
 

Constraints:

The number of nodes in the tree is in the range [2, 5000].
0 <= Node.val <= 105
*/
function maxAncestorDiff(root) {
  function findMaxDiff(node, maxV, minV) {
    if (!node) {
      return Math.abs(maxV - minV);
    }
    maxV = Math.max(maxV, node.val);
    minV = Math.min(minV, node.val);

    const lS = findMaxDiff(node.left, maxV, minV);
    const rS = findMaxDiff(node.right, maxV, minV);
    return Math.max(lS, rS);
  }

  return findMaxDiff(root, root.val, root.val);
}
var maxAncestorDiffBF = function (root) {
  let maxDifference = -1;

  function maxDiffUtil(node, child) {
    if (!node || !child) return;
    maxDifference = Math.max(maxDifference, Math.abs(node.val - child.val));
    maxDiffUtil(node, child.left);
    maxDiffUtil(node, child.right);
  }

  function maxDiff(node) {
    if (!node) return;
    maxDiffUtil(node, node.left);
    maxDiffUtil(node, node.right);

    maxDiff(node.left);
    maxDiff(node.right);
  }

  maxDiff(root);
  return maxDifference;
};
