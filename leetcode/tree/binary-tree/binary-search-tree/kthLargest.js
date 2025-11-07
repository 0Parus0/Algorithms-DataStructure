/*
Kth largest element in BST
Difficulty: EasyAccuracy: 49.31%Submissions: 174K+Points: 2
Given a Binary Search Tree. Your task is to complete the function which will return the kth largest element without doing any modification in the Binary Search Tree.

Examples:

Input:
      4
    /   \
   2     9
k = 2 
Output: 4
Explanation: 2nd Largest element in BST is 4
Input:
       9
        \ 
          10
k = 1
Output: 10
Explanation: 1st Largest element in BST is 10
Input:
      4
    /   \
   2     9
k = 3 
Output: 2
Explanation: 3rd Largest element in BST is 2
Constraints:
1 <= number of nodes <= 105
1 <= node->data <= 105
1 <= k <= number of nodes
*/
/*
class Node
{
    constructor(x){
        this.data=x;
        this.left=null;
        this.right=null;
    }
}
*/

/**
 * @param {Node} root
 * @param {number} k
 * @return {number}
 */
class Solution {
  // return the Kth largest element in the given BST rooted at 'root'
  kthLargest(root, k) {
    let count = 0;
    let ans = null;
    function reverseInorder(node) {
      if (!node || count >= k) return;

      // Traverse the right subtree first
      reverseInorder(node.right);

      // Process the current node
      count++;
      if (count === k) {
        ans = node.data;
        return;
      }

      // Traverse the left subtree only if we haven't found the kth largest yet
      if (count < k) reverseInorder(node.left);
    }
    reverseInorder(root);
    return ans;
  }
}
