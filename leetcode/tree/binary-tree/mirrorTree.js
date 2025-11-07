/*
226. Invert Binary Tree
Easy
Topics
premium lock iconCompanies

Given the root of a binary tree, invert the tree, and return its root.

 

Example 1:

Input: root = [4,2,7,1,3,6,9]
Output: [4,7,2,9,6,3,1]

Example 2:

Input: root = [2,1,3]
Output: [2,3,1]

Example 3:

Input: root = []
Output: []

 

Constraints:

    The number of nodes in the tree is in the range [0, 100].
    -100 <= Node.val <= 100

*/

var invertTree = function (root) {
  if (!root) return null;

  // Swap left and right children
  let temp = root.left;
  root.left = root.right;
  root.right = temp;

  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
};

/*
Alternative Concise Implementation

Here's a more concise version using destructuring assignment:
*/
var invertTree = function (root) {
  if (!root) return null;

  // Swap left and right using destructuring
  [root.left, root.right] = [root.right, root.left];

  // Recursively invert subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
};
