/*
199. Binary Tree Right Side View
Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

Example 1:
Input: root = [1,2,3,null,5,null,4]
Output: [1,3,4]
Explanation:

Example 2:
Input: root = [1,2,3,4,null,null,null,5]
Output: [1,3,4,5]
Explanation:

Example 3:
Input: root = [1,null,3]
Output: [1,3]

Example 4:
Input: root = []
Output: []
 
Constraints:
The number of nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100
*/

function rightSideViewIter(root) {
  if (!root) return [];
  const result = [];
  const que = [root];
  while (que.length) {
    const n = que.length;
    let node = null;
    while (n--) {
      node = que.shift();
      if (node.left) que.push(node.left);
      if (node.right) que.push(node.right);
    }

    result.push(node.val);
  }

  return result;
}

function rightSideViewRecur(root) {
  if (!root) return [];

  function preorder(node, level) {
    if (!node) return;

    if (result.length < level) {
      result.push(node.val);
    }

    preorder(node.right, level + 1);
    preorder(node.left, level + 1);
  }
  const result = [];

  preorder(root, 1);

  return result;
}
