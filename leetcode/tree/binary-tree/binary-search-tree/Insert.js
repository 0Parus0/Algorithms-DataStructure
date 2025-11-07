/*
Insert a node in a BST
Difficulty: EasyAccuracy: 47.15%Submissions: 175K+Points: 2Average Time: 15m
Given a root binary search tree and a key. If the key is not present in the tree, Insert a new node with a value equal to the key into the tree. If the key is already present in the tree, don't modify the tree. Return the root of the modified tree after inserting the key. 

Note: The generated output contains the in-order traversal of the modified tree.

Examples :

Input: root = [2, 1, 3], key = 4

Output: [1, 2, 3, 4]
Explanation: After inserting the node 4 Inorder traversal will be 1 2 3 4.
Input: root = [2, 1, 3, N, N, N, 6], key = 4
 
Output: [1, 2, 3, 4, 6]
Explanation: After inserting the node 4 Inorder traversal of the above tree will be 1 2 3 4 6.
Input: root = [2, 1, 3], key = 2

Output: [1, 2, 3] 
Explanation: Node with key=2 already present in BST, Inorder traversal will be 1 2 3.
Constraints:
1 ≤ number of nodes ≤ 105
1 ≤ node->data ≤ 109
1 ≤ key ≤ 109
*/

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Function to insert a key into the BST
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
function insertIterative(root, key) {
  const newNode = new TreeNode(key);
  if (root === null) {
    return newNode;
  }

  let current = root;
  while (true) {
    if (key < current.val) {
      if (current.left === null) {
        current.left = newNode;
        break;
      } else {
        current = current.left;
      }
    } else if (key > current.val) {
      if (current.right === null) {
        current.right = newNode;
        break;
      } else {
        current = current.right;
      }
    } else {
      // Key already exists, so we break without inserting.
      break;
    }
  }
  return root;
}

/**
 * Helper function to perform inorder traversal (for testing)
 * @param {TreeNode} root
 */
function inorder(root) {
  if (root === null) return;
  inorder(root.left);
  process.stdout.write(root.val + " ");
  inorder(root.right);
}

// Test the code
function main() {
  // Example 1: root = [2,1,3], key = 4
  let root1 = new TreeNode(2);
  root1.left = new TreeNode(1);
  root1.right = new TreeNode(3);
  let result1 = insertIntoBST(root1, 4);
  inorder(result1);
  console.log(); // Expected output: 1 2 3 4

  // Example 2: root = [2,1,3,null,null,null,6], key = 4
  let root2 = new TreeNode(2);
  root2.left = new TreeNode(1);
  root2.right = new TreeNode(3);
  root2.right.right = new TreeNode(6);
  let result2 = insertIntoBST(root2, 4);
  inorder(result2);
  console.log(); // Expected output: 1 2 3 4 6

  // Example 3: root = [2,1,3], key = 2
  let root3 = new TreeNode(2);
  root3.left = new TreeNode(1);
  root3.right = new TreeNode(3);
  let result3 = insertIntoBST(root3, 2);
  inorder(result3);
  console.log(); // Expected output: 1 2 3
}

main();

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function insertRecursive(root, key) {
  // If tree is empty, create new node
  if (root === null) return new Node(key);

  if (key < root.data) {
    root.left = insert(root.left, key);
  } else if (key > root.data) {
    root.right = insert(root.right, key);
  }
  // if key == root.data, do nothing

  return root;
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
  console.log("Example 1: root = [2, 1, 3], key = 4");
  let root1 = new Node(2);
  root1.left = new Node(1);
  root1.right = new Node(3);
  root1 = insert(root1, 4);
  inorder(root1);
  console.log(); // Expected: 1 2 3 4

  console.log("Example 2: root = [2, 1, 3, null, null, null, 6], key = 4");
  let root2 = new Node(2);
  root2.left = new Node(1);
  root2.right = new Node(3);
  root2.right.right = new Node(6);
  root2 = insert(root2, 4);
  inorder(root2);
  console.log(); // Expected: 1 2 3 4 6

  console.log("Example 3: root = [2, 1, 3], key = 2");
  let root3 = new Node(2);
  root3.left = new Node(1);
  root3.right = new Node(3);
  root3 = insert(root3, 2);
  inorder(root3);
  console.log(); // Expected: 1 2 3
}

main();
