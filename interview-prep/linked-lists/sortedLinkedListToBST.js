/*
Sorted Linked List to BST
Difficulty: HardAccuracy: 53.24%Submissions: 29K+Points: 8
Given a Singly Linked List which has data members sorted in ascending order. Construct a Balanced Binary Search Tree which has same data members as the given Linked List.
Note: There might be nodes with the same value.

Examples:

Input: Linked List: 1->2->3->4->5->6->7

Output: 4 2 1 3 6 5 7
Explanation : The BST formed using elements of the linked list is -
        4
      /   \
     2     6
   /  \   / \
  1   3  5   7  
Hence, preorder traversal of this tree is 4 2 1 3 6 5 7
Input: Linked List : 1->2->3->4
 
Ouput: 3 2 1 4
Explanation: The BST formed using elements of the linked list is -

Hence, the preorder traversal of this tree is 3 2 1 4
Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
 
Constraints:
1 ≤ Number of Nodes ≤ 106
1 ≤ Value of each node ≤ 106
*/
/**
 * APPROACH 3: Inorder Simulation (Most Optimal)
 * Time: O(n), Space: O(log n)
 * Simulates inorder traversal to build tree
 */

class Solution {
  sortedListToBSTOptimal(head) {
    if (!head) return null;

    // Find the length of linked list
    let length = 0;
    let current = head;
    while (current) {
      length++;
      current = current.next;
    }

    // Global pointer to traverse linked list
    this.currentNode = head;

    const buildTree = (start, end) => {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);

      // Build left subtree first
      const left = buildTree(start, mid - 1);

      // Create root node
      const root = new TreeNode(this.currentNode.val);
      this.currentNode = this.currentNode.next;

      // Build right subtree
      root.left = left;
      root.right = buildTree(mid + 1, end);

      return root;
    };

    return buildTree(0, length - 1);
  }
}
