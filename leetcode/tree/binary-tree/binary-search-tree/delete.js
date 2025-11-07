/*
Delete a node from BST
Difficulty: MediumAccuracy: 40.7%Submissions: 136K+Points: 4Average Time: 30m
Given a root binary search tree and a node value x. Delete the node with the given value x from the tree. If no node with value x exists, then do not make any change. Return the root of the tree after deleting the node with value x.

Note: The generated output will be the inorder traversal of the modified tree.

Examples :

Input: root = [2, 1, 3], x = 12

Output: [1, 2, 3]
Explanation: In the given input there is no node with value 12 , so the tree will remain same.
Input: root = [1, N, 2, N, 8, 5, 11, 4, 7, 9, 12], x = 11

Output: [1, 2, 4, 5, 7, 8, 9, 12]
Explanation: In the given input, tree after deleting 11 will be

Input: root = [2, 1, 3], x = 3

Output: [1, 2]
Explanation: In the given input, tree after deleting 3 will be

Constraints:
1 <= number of nodes <= 105
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function deleteNode(root, x) {
  if (root === null) return null;

  // Search for the node to be deleted
  if (x < root.data) {
    root.left = deleteNode(root.left, x);
  } else if (x > root.data) {
    root.right = deleteNode(root.right, x);
  } else {
    // Node to be deleted found

    // Case 1: No child
    if (root.left === null && root.right === null) {
      return null;
    }
    // Case 2: One child
    else if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }
    // Case 3: Two children
    else {
      // Find the inorder successor (smallest in the right subtree)
      let successor = findMin(root.right);
      root.data = successor.data;
      root.right = deleteNode(root.right, successor.data);
    }
  }
  return root;
}

function findMin(node) {
  let current = node;
  while (current.left !== null) {
    current = current.left;
  }
  return current;
}

// Helper function for inorder traversal
function inorder(root) {
  if (root === null) return;
  inorder(root.left);
  process.stdout.write(root.data + " ");
  inorder(root.right);
}

// Test cases
function main() {
  console.log("Example 1: root = [2, 1, 3], x = 12");
  let root1 = new Node(2);
  root1.left = new Node(1);
  root1.right = new Node(3);
  root1 = deleteNode(root1, 12);
  inorder(root1);
  console.log(); // Expected: 1 2 3

  console.log("Example 2: root = [1, N, 2, N, 8, 5, 11, 4, 7, 9, 12], x = 11");
  // Building the tree: [1, N, 2, N, 8, 5, 11, 4, 7, 9, 12]
  let root2 = new Node(1);
  root2.right = new Node(2);
  root2.right.right = new Node(8);
  root2.right.right.left = new Node(5);
  root2.right.right.left.left = new Node(4);
  root2.right.right.left.right = new Node(7);
  root2.right.right.right = new Node(11);
  root2.right.right.right.left = new Node(9);
  root2.right.right.right.right = new Node(12);
  root2 = deleteNode(root2, 11);
  inorder(root2);
  console.log(); // Expected: 1 2 4 5 7 8 9 12

  console.log("Example 3: root = [2, 1, 3], x = 3");
  let root3 = new Node(2);
  root3.left = new Node(1);
  root3.right = new Node(3);
  root3 = deleteNode(root3, 3);
  inorder(root3);
  console.log(); // Expected: 1 2
}

main();

function deleteNode(root, x) {
  if (root === null) return null;

  if (x < root.data) {
    root.left = deleteNode(root.left, x);
  } else if (x > root.data) {
    root.right = deleteNode(root.right, x);
  } else {
    // Found the node to delete

    // Case 1: No children (leaf node)
    if (root.left === null && root.right === null) {
      return null;
    }

    // Case 2: One child
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;

    // Case 3: Two children
    let predecessor = maxValue(root.left);
    root.data = predecessor;
    root.left = deleteNode(root.left, predecessor);
  }

  return root;
}

function maxValue(node) {
  let current = node;
  while (current.right !== null) {
    current = current.right;
  }
  return current.data;
}
