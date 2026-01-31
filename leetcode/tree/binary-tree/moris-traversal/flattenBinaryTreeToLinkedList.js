/*
Flatten binary tree to linked list
Difficulty: MediumAccuracy: 75.82%Submissions: 46K+Points: 4
Given the root of a binary tree, flatten the tree into a "Linked list":

The "linked list" should use the same Node class where the right child pointer points to the next node in the list and the left child pointer is always null.
The "linked list" should be in the same order as a pre-order traversal of the binary tree.
Examples:

Input: 
          1
        /   \
       2     5
      / \     \
     3   4     6
Output : 1 2 3 4 5 6 
 
Explanation: After flattening, the tree looks like this - 
     1
      \
       2
        \
         3
          \
           4
            \ 
             5 
              \
               6
Here, left of each node points to NULL and right contains the next node in preorder.The inorder traversal of this flattened tree is 1 2 3 4 5 6.

Input :
        1
       / \
      3   4
         /
        2
         \
          5 
Output : 
1 3 4 2 5 
Explanation : After flattening, the tree looks like this -
     1
      \
       3
        \
         4
          \
           2
            \ 
             5 
Here, left of each node points to NULL and right contains the next node in preorder.The inorder traversal of this flattened tree is 1 3 4 2 5.
Expected Time Complexity: O(n)
Expected Space Complexity: O(1)
 
Constraints :
1<= number of nodes in binary tree <= 105
1<= data of nodes <= 105
*/

class Solution {
  flatten(root) {
    let current = root;
    while (current !== null) {
      if (current.left !== null) {
        // Find the rightmost node in the left subtree
        let predecessor = current.left;
        while (predecessor.right !== null) {
          predecessor = predecessor.right;
        }
        // Attach the right subtree to the right of the predecessor
        predecessor.right = current.right;
        // Move the left subtree to the right
        current.right = current.left;
        current.left = null;
      }
      current = current.right;
    }
    return root;
  }
}
