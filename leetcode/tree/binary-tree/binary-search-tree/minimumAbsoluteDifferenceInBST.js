/*
530. Minimum Absolute Difference in BST
Easy
Topics
premium lock icon
Companies
Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

 

Example 1:


Input: root = [4,2,6,1,3]
Output: 1
Example 2:


Input: root = [1,0,48,null,null,12,49]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [2, 104].
0 <= Node.val <= 105
*/
function getMinimumDifference(root) {
  let minDiff = Infinity;
  let prev = null;

  // Inorder traversal (left -> node -> right)
  function inorder(node) {
    if (!node) return;

    // Traverse left subtree
    inorder(node.left);

    // Process current node
    if (prev !== null) {
      minDiff = Math.min(minDiff, Math.abs(node.val - prev));
    }
    prev = node.val;
    // Traverse right subtree
    inorder(node.right);
  }

  inorder(root);
  return minDiff;
}

var getMinimumDifference = function (root) {
  let minDiff = Infinity;

  const inorder = (node, prevObj) => {
    if (!node) return prevObj;

    prevObj = inorder(node.left, prevObj);

    if (prevObj.value !== null) {
      minDiff = Math.min(minDiff, node.val - prevObj.value);
    }
    prevObj.value = node.val;

    return inorder(node.right, prevObj);
  };

  inorder(root, { value: null });
  return minDiff;
};

var getMinimumDifference = function (root) {
  let minDiff = Infinity;

  const inorder = (node, prevVal) => {
    if (!node) return prevVal;

    // Process left subtree
    let leftPrev = inorder(node.left, prevVal);

    // Process current node
    if (leftPrev !== null) {
      minDiff = Math.min(minDiff, node.val - leftPrev);
    }

    // Process right subtree with updated prev
    return inorder(node.right, node.val);
  };

  inorder(root, null);
  return minDiff;
};
