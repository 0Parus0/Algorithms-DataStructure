/*
Preorder traversal (Iterative)
Difficulty: MediumAccuracy: 81.12%Submissions: 41K+Points: 4
Given a Binary tree. Find the preorder traversal of the tree without using recursion.


Example 1:

Input:
           1
         /   \
        2     3
      /  \
     4    5
Output: 1 2 4 5 3
Explanation:
Preorder traversal (Root->Left->Right) of 
the tree is 1 2 4 5 3.
Example 2

Input:
            8
          /   \
         1      5
          \    /  \
           7  10   6
            \  /
            10 6
Output: 8 1 7 10 5 10 6 6 
Explanation:
Preorder traversal (Root->Left->Right) 
of the tree is 8 1 7 10 5 10 6 6.
 

Your task:

You don't need to read input or print anything. Your task is to complete the function preOrder() which takes the root of the tree as input and returns a list containing the preorder traversal of the tree, calculated without using recursion.


Expected time complexity: O(N)
Expected auxiliary space: O(N)


Constraints:
1 ≤ Number of nodes ≤ 105
1 ≤ Data of a node ≤ 105

Explanation

    Preorder Traversal: The root node is visited first, followed by a recursive traversal of the left subtree and then the right subtree. The structure is node, left, right.

    Inorder Traversal: The left subtree is visited first, then the root node, and finally the right subtree. The structure is left, node, right. This traversal visits nodes in non-decreasing order for a binary search tree.

    Postorder Traversal: The left subtree is visited first, then the right subtree, and finally the root node. The structure is left, right, node. This traversal is useful for deleting a tree from the bottom up.
*/
class Solution {
  preOrder(root) {
    const result = [];
    let current = root;

    while (current !== null) {
      if (current.left === null) {
        result.push(current.data);
        current = current.right;
      } else {
        // Find inorder predecessor
        let predecessor = current.left;
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
        }

        if (predecessor.right === null) {
          predecessor.right = current; // Create temporary link
          result.push(current.data); // Visit before going left (preorder)
          current = current.left;
        } else {
          predecessor.right = null; // Revert temporary link
          current = current.right;
        }
      }
    }

    return result;
  }
}
