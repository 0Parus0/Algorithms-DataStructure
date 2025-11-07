/*
Fixing Two nodes of a BST
Difficulty: HardAccuracy: 53.68%Submissions: 69K+Points: 8Average Time: 45m
Given the root of a Binary search tree(BST), where exactly two nodes were swapped by mistake. Your task is to fix (or correct) the BST by swapping them back. Do not change the structure of the tree.
Note: It is guaranteed that the given input will form BST, except for 2 nodes that will be wrong. All changes must be reflected in the original Binary search tree(BST).
 
Examples :
Input: root = [10, 5, 8, 2, 20]
     
Output: 1
       

Explanation: The nodes 20 and 8 were swapped. 
Input: root = [5, 10, 20, 2, 8]
     
Output: 1 
     
Explanation: The nodes 10 and 5 were swapped.
Constraints:
1 ≤ Number of nodes ≤ 103
*/

/*  Using Inorder Traversal which means O(N) space */

class Solution {
  correctBST(root) {
    // Initialize pointers to track the two misplaced nodes;
    let first = null; // First wrong node
    let second = null; // Second wrong node
    let prev = null; // Track previous node in inorder traversal

    // Helper function: inorder traversal (L -> Node -> R)
    function inorder(node) {
      // Base case
      if (node === null) return;

      // 1. Traverse left subtree
      inorder(node.left);

      // 2. Detect a violation of BST property
      // Inorder traversal should always be sorted in ascending
      if (prev !== null && node.data < prev.data) {
        // First time we see a violation -> prev is misplaced
        if (first === null) {
          first = prev;
        }

        // Whether it's first or second violation,
        // We assign second to the current node
        second = node;
      }

      // Move prev pointer to current node

      prev = node;

      // 3. Traverse right subtree
      inorder(node.right);
    }

    inorder(root);

    // Swap the values of the two misplaced nodes
    if (first !== null && second !== null) {
      let temp = first.data;
      first.data = second.data;
      second.data = temp;
    }
  }
}

/*  Using Morris Inorder Traversal which means O(1) space */
class Solution {
  correctBST(root) {
    // Pointers to store the two misplaced nodes
    let first = null,
      second = null;
    // Pointer to store the previously visited node during inorder traversal
    let prev = null;
    // Start traversal from the root
    let curr = root;

    // Loop until all nodes are processed
    while (curr !== null) {
      // Case 1: If there is no left subtree
      if (curr.left === null) {
        // Check for BST violation (current < previous)
        if (prev !== null && curr.data < prev.data) {
          // First violation: store the previous node
          if (first === null) first = prev;
          // Always update second to current node (could be first or second violation)
          second = curr;
        }
        // Update previous to current
        prev = curr;
        // Move to the right subtree
        curr = curr.right;
      } else {
        // Case 2: If there is a left subtree → find inorder predecessor
        let pred = curr.left;
        // The inorder predecessor is the rightmost node in the left subtree
        while (pred.right !== null && pred.right !== curr) {
          pred = pred.right;
        }

        // Case 2a: If predecessor’s right is null → create a thread to current
        if (pred.right === null) {
          pred.right = curr; // Make a temporary link back to current
          curr = curr.left; // Move to left child to continue traversal
        } else {
          // Case 2b: Thread already exists → remove it and visit current
          pred.right = null; // Break the thread

          // Check for BST violation
          if (prev !== null && curr.data < prev.data) {
            if (first === null) first = prev;
            second = curr;
          }
          // Update previous to current
          prev = curr;
          // Move to right subtree
          curr = curr.right;
        }
      }
    }

    // After traversal, swap the values of the two misplaced nodes
    if (first !== null && second !== null) {
      [first.data, second.data] = [second.data, first.data];
    }
  }
}
