/*
Binary Tree to DLL
Difficulty: HardAccuracy: 53.36%Submissions: 164K+Points: 8Average Time: 60m
Given a root of binary tree (BT), convert it to a Doubly Linked List (DLL) in place using the same node structure. The left and right pointers in the binary tree nodes should be used as prev and next pointers respectively in the resulting DLL .The DLL should be formed by performing an inorder traversal of the binary tree (i.e., Left → Root → Right).The first node in the inorder traversal (i.e., the leftmost node) should become the head of the DLL. Return the head of the resulting DLL.
Note: h is the tree's height, and this space is used implicitly for the recursion stack.

TreeToList

Examples:

Input: root = [1, 2, 3]
Output: [3, 1, 2] 

Explanation: DLL would be 3<=>1<=>2
Input:  root = [10, 20, 30, 40, 60]
Output: [40, 20, 60, 10, 30] 

Explanation: DLL would be 40<=>20<=>60<=>10<=>30.
Constraints:
1 ≤ Number of nodes ≤ 105
0 ≤ Data of a node ≤ 105
*/
class Solution {
  binaryTreeToDLL(root) {
    if (!root) return null;

    let head = null;
    let prev = null;

    const inorder = (node) => {
      if (!node) return;

      // Traverse left subtree
      inorder(node.left);

      // Process current node
      if (prev === null) {
        // This is the first node (leftmost)
        head = node;
      } else {
        // Adjust pointers
        node.left = prev;
        prev.right = node;
      }
      prev = node;

      // Traverse right subtree
      inorder(node.right);
    };

    inorder(root);
    return head;
  }
}
