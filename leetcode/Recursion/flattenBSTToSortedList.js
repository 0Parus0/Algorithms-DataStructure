/*
Flatten BST to sorted list
Difficulty: MediumAccuracy: 68.49%Submissions: 35K+Points: 4
You are given the root of a Binary Search Tree (BST), your task is to flatten the tree such that the left child of every node points to NULL, and the right child points to the next node in the sorted order of the BST.

Examples:

Input: root = [5, 3, 7, 2, 4, 6, 8]

Output: [2, N, 3, N, 4, N, 5, N, 6, N, 7, N, 8] 
Explanation: After flattening, the tree looks like this:
     
Input: root = [1, N, 2, N, 3, N, 4, N, 5]

Output: [1, N, 2, N, 3, N, 4, N, 5] 
Explanation: After flattening, the tree looks like this:

Constraints:
1 ≤ number of nodes ≤ 103
1 ≤ nodes -> data ≤ 105
*/
/*
* #Plan:

* Understand the problem:

Given a Binary Search Tree (BST)

Need to flatten it into a sorted linked list (in-order traversal order)

Left pointers should become NULL

Right pointers should point to next node in sorted order

Must be done in-place without creating new nodes

Break down input data & transformations:

Input: Root node of BST

Output: Root of flattened linked list (smallest element first)

Transformation: Perform in-order traversal and rearrange pointers

* Approach:

Use in-order traversal (gives sorted order for BST)

Maintain a prev pointer to build the linked list

During traversal, set prev.right = current and current.left = null

* Edge cases:

Empty tree (null root)

Single node tree

Already flattened tree

Skewed trees (left-skewed, right-skewed)

* Algorithm steps:

Initialize prev = null

Perform in-order traversal

For each node:

Process left subtree recursively

Set current node's left to null

If prev exists, set prev's right to current

Update prev to current

Process right subtree recursively

Time & Space Complexity:

Time: O(n) - Visit each node once

Space: O(h) - Recursion stack height, O(n) worst case for skewed tree

* Commit Message:
Flatten BST to sorted linked list using in-order traversal

Implemented recursive in-order traversal to flatten BST

Maintained prev pointer to build linked list in sorted order

Set left pointers to null and right pointers to next node

Handled edge cases: empty tree, single node, skewed trees

Provided alternative iterative solution

Time: O(n), Space: O(h) where h is tree height


*/

function flattenBST(root) {
  if (!root) return null;
  let head = flattenBST(root.left);
  root.left = null;
  root.right = flattenBST(root.right);

  if (head !== null) {
    let temp = head;
    while (temp && temp.right) {
      temp = temp.right;
    }
    temp.right = root;
  } else {
    head = root;
  }

  return head;
}

/**
 * Definition for a binary tree node.
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  /**
   * Flattens BST to sorted linked list
   * @param {TreeNode} root - Root of BST
   * @return {TreeNode} - Root of flattened list
   */
  flatten(root) {
    let prev = null;

    const inOrder = (node) => {
      if (!node) return;

      // Traverse left subtree
      inOrder(node.left);

      // Process current node
      node.left = null; // Set left to null

      if (prev) {
        prev.right = node; // Link previous node to current
      }
      prev = node; // Update previous to current

      // Traverse right subtree
      inOrder(node.right);
    };

    inOrder(root);
    return root;
  }
}

class Solution {
  /**
   * Flattens BST using iterative in-order traversal
   * @param {TreeNode} root - Root of BST
   * @return {TreeNode} - Root of flattened list
   */
  flatten(root) {
    if (!root) return null;

    let prev = null;
    const stack = [];
    let current = root;

    while (current || stack.length > 0) {
      // Go to leftmost node
      while (current) {
        stack.push(current);
        current = current.left;
      }

      // Process node
      current = stack.pop();

      // Rearrange pointers
      current.left = null;
      if (prev) {
        prev.right = current;
      }
      prev = current;

      // Move to right subtree
      current = current.right;
    }

    return root;
  }
}

// Helper function to create BST from array (for testing)
function createBST(arr, i = 0) {
  if (i >= arr.length || arr[i] === null) return null;

  const root = new TreeNode(arr[i]);
  root.left = createBST(arr, 2 * i + 1);
  root.right = createBST(arr, 2 * i + 2);

  return root;
}

// Helper function to print flattened list
function printList(root) {
  const result = [];
  let current = root;
  while (current) {
    result.push(current.val);
    result.push("N"); // Represent null left pointers
    current = current.right;
  }
  return result.slice(0, -1); // Remove last 'N'
}

// Test case 1: Normal BST
const sol = new Solution();
let root1 = createBST([5, 3, 7, 2, 4, 6, 8]);
let result1 = sol.flatten(root1);
console.log(printList(result1));
// Expected: [2, 'N', 3, 'N', 4, 'N', 5, 'N', 6, 'N', 7, 'N', 8]

// Test case 2: Already right-skewed tree
let root2 = createBST([1, null, 2, null, 3, null, 4, null, 5]);
let result2 = sol.flatten(root2);
console.log(printList(result2));
// Expected: [1, 'N', 2, 'N', 3, 'N', 4, 'N', 5]

// Test case 3: Single node
let root3 = new TreeNode(10);
let result3 = sol.flatten(root3);
console.log(printList(result3)); // Expected: [10, 'N']

// Test case 4: Empty tree
let root4 = null;
let result4 = sol.flatten(root4);
console.log(printList(result4)); // Expected: []

// Test case 5: Left-skewed tree
let root5 = createBST([3, 2, null, 1]);
let result5 = sol.flatten(root5);
console.log(printList(result5));
// Expected: [1, 'N', 2, 'N', 3, 'N']
