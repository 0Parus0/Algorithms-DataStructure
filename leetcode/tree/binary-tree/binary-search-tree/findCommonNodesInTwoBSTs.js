/*
Find Common Nodes in two BSTs
Difficulty: MediumAccuracy: 51.7%Submissions: 72K+Points: 4Average Time: 20m
Given two Binary Search Trees. Find the nodes that are common in both of them, ie- find the intersection of the two BSTs.

Note: Return the common nodes in sorted order.

Examples:

Input:
BST1:
                  5
               /     \
             1        10
           /   \      /
          0     4    7
                      \
                       9
BST2:
                10 
              /    \
             7     20
           /   \ 
          4     9

Output: 4 7 9 10

Input:
BST1:
     10
    /  \
   2   11
  /  \
 1   3
BST2:
       2
     /  \
    1    3
Output: 1 2 3
Constraints:
1 <= Number of Nodes <= 105
1 <= Node data <= 109
*/

/**
 * @param {Node} root1
 * @param {Node} root2
 * @returns {number[]}
 */

class Solution {
  // Function to find the nodes that are common in both BST.
  findCommon(r1, r2) {
    // your code here
    let stack1 = [];
    let stack2 = [];
    let result = [];

    let current1 = r1;
    let current2 = r2;

    while (
      (current1 !== null || stack1.length > 0) &&
      (current2 !== null || stack2.length > 0)
    ) {
      // Traverse to the leftmost node of first tree
      while (current1 !== null) {
        stack1.push(current1);
        current1 = current1.left;
      }

      // Traverse to the leftmost node of 2nd tree
      while (current2 !== null) {
        stack2.push(current2);
        current2 = current2.left;
      }

      // Get the top nodes from both stacks

      let node1 = stack1[stack1.length - 1];
      let node2 = stack2[stack2.length - 1];

      if (node1.data === node2.data) {
        result.push(node1.data);
        stack1.pop();
        stack2.pop();
        current1 = current1.right;
        current2 = current2.right;
      } else if (node1.data < node2.data) {
        stack1.pop();
        current1 = node1.right;
      } else {
        stack2.pop();
        current2 = node2.right;
      }
    }

    return result;
  }
}

class Solution {
  findCommon(r1, r2) {
    // Recursive function for inorder traversal
    const inorder = (root, arr) => {
      if (root === null) return;
      inorder(root.left, arr);
      arr.push(root.data);
      inorder(root.right, arr);
    };

    let arr1 = [];
    inorder(r1, arr1);
    let arr2 = [];
    inorder(r2, arr2);

    let i = 0,
      j = 0;
    let result = [];

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] === arr2[j]) {
        result.push(arr1[i]);
        i++;
        j++;
      } else if (arr1[i] < arr2[j]) {
        i++;
      } else {
        j++;
      }
    }

    return result;
  }
}

class Solution {
  findCommon(r1, r2) {
    // Function to perform inorder traversal and return sorted array
    const inorder = (root) => {
      let result = [];
      let stack = [];
      let current = root;
      while (current !== null || stack.length > 0) {
        while (current !== null) {
          stack.push(current);
          current = current.left;
        }
        current = stack.pop();
        result.push(current.data);
        current = current.right;
      }
      return result;
    };

    // Get sorted arrays for both trees
    let arr1 = inorder(r1);
    let arr2 = inorder(r2);

    let i = 0,
      j = 0;
    let result = [];

    // Use two pointers to find common elements
    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] === arr2[j]) {
        result.push(arr1[i]);
        i++;
        j++;
      } else if (arr1[i] < arr2[j]) {
        i++;
      } else {
        j++;
      }
    }

    return result;
  }
}
