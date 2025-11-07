/*
1008. Construct Binary Search Tree from Preorder Traversal
Medium
Topics
premium lock icon
Companies
Given an array of integers preorder, which represents the preorder traversal of a BST (i.e., binary search tree), construct the tree and return its root.

It is guaranteed that there is always possible to find a binary search tree with the given requirements for the given test cases.

A binary search tree is a binary tree where for every node, any descendant of Node.left has a value strictly less than Node.val, and any descendant of Node.right has a value strictly greater than Node.val.

A preorder traversal of a binary tree displays the value of the node first, then traverses Node.left, then traverses Node.right.

 

Example 1:


Input: preorder = [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]
Example 2:

Input: preorder = [1,3]
Output: [1,null,3]
 

Constraints:

1 <= preorder.length <= 100
1 <= preorder[i] <= 1000
All the values of preorder are unique.
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
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function (preorder) {
  let index = 0;
  function BST(lower, upper) {
    // Base case
    if (
      index >= preorder.length ||
      preorder[index] < lower ||
      preorder[index] > upper
    )
      return null;
    let root = new TreeNode(preorder[index++]);
    root.left = BST(lower, root.val);
    root.right = BST(root.val, upper);
    return root;
  }
  return BST(-Infinity, Infinity);
};

function bstFromPreorder(preorder) {
  let index = 0;

  function build(bound = Infinity) {
    if (index >= preorder.length || preorder[index] > bound) {
      return null;
    }

    let rootVal = preorder[index++];
    let root = new TreeNode(rootVal);

    // Left subtree: values < rootVal
    root.left = build(rootVal);

    // Right subtree: values < bound but > rootVal
    root.right = build(bound);

    return root;
  }

  return build();
}

function bstFromPreorderIterative(preorder) {
  if (preorder.length === 0) return null;

  let root = new TreeNode(preorder[0]);
  let stack = [root];

  for (let i = 1; i < preorder.length; i++) {
    let node = new TreeNode(preorder[i]);

    // Case 1: smaller than stack top → left child
    if (node.val < stack[stack.length - 1].val) {
      stack[stack.length - 1].left = node;
    }
    // Case 2: greater than stack top → find parent
    else {
      let parent = null;
      while (stack.length > 0 && stack[stack.length - 1].val < node.val) {
        parent = stack.pop();
      }
      parent.right = node;
    }

    stack.push(node);
  }

  return root;
}
