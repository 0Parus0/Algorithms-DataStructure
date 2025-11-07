/*
Iterative Inorder
Difficulty: MediumAccuracy: 80.5%Submissions: 41K+Points: 4
Given a binary tree. Find the inorder traversal of the tree without using recursion.

Examples

Input:  

Output: 4 2 5 1 3
Explanation:
Inorder traversal (Left->Root->Right) of 
the tree is 4 2 5 1 3.
Input:

Output: 1 7 10 8 6 10 5 6
Explanation:
Inorder traversal (Left->Root->Right) 
of the tree is 1 7 10 8 6 10 5 6.
 

Your task:
You don't need to read input or print anything. Your task is to complete the function inOrder() which takes the root of the tree as input and returns a list containing the inorder traversal of the tree, calculated without using recursion.

Expected time complexity: O(N)
Expected auxiliary space: O(N)


Constraints:
1 <= Number of nodes <= 105
1 <= Data of a node <= 105

Explanation

    Preorder Traversal: The root node is visited first, followed by a recursive traversal of the left subtree and then the right subtree. The structure is node, left, right.

    Inorder Traversal: The left subtree is visited first, then the root node, and finally the right subtree. The structure is left, node, right. This traversal visits nodes in non-decreasing order for a binary search tree.

    Postorder Traversal: The left subtree is visited first, then the right subtree, and finally the root node. The structure is left, right, node. This traversal is useful for deleting a tree from the bottom up.
*/

class Solution {
  inOrder(root) {
    const result = [];
    let current = root;

    while (current !== null) {
      if (current.left === null) {
        // If no left child, visit current and move right
        result.push(current.data);
        current = current.right;
      } else {
        // Find inorder predecessor
        let predecessor = current.left;
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
        }

        if (predecessor.right === null) {
          // Create temporary link to current
          predecessor.right = current;
          current = current.left;
        } else {
          // Revert the temporary link
          predecessor.right = null;
          result.push(current.data);
          current = current.right;
        }
      }
    }

    return result;
  }
}
