/*
Array to BST
Difficulty: EasyAccuracy: 46.02%Submissions: 85K+Points: 2Average Time: 15m
Given a sorted array. Convert it into a Height Balanced Binary Search Tree (BST). Return the root of the BST.

Height-balanced BST means a binary tree in which the depth of the left subtree and the right subtree of every node never differ by more than 1.

Note: The driver code will check the BST, if it is a Height-balanced BST, the output will be true otherwise the output will be false.

Examples :

Input: nums = [1, 2, 3, 4]
Output: true
Explanation: The preorder traversal of the following BST formed is [2, 1, 3, 4]:
           2
         /   \
        1     3
               \
                4
Input: nums = [1, 2, 3, 4, 5, 6, 7]
Ouput: true
Explanation: The preorder traversal of the following BST formed is [4, 2, 1, 3, 6, 5, 7]:
        4
       / \
      2   6
     / \   / \
    1 3  5 7
Expected Time Complexity: O(n)
Expected Auxillary Space: O(n)

Constraints:
1 ≤ nums.size() ≤ 105
1 ≤ nums[i] ≤ 105
*/
// User function Template for javascript

/**
 * @param {number[]} nums
 * @return {number[]}
 */

// Return built BST
class Solution {
  sortedArrayToBST(nums) {
    function buildBST(left, right) {
      // Base condition
      if (left > right) return null;

      // Choose middle element
      let mid = Math.floor((left + right) / 2);
      let node = new Node(nums[mid]);

      // Recursively build left and right subtrees
      node.left = buildBST(left, mid - 1);
      node.right = buildBST(mid + 1, right);

      return node;
    }

    return buildBST(0, nums.length - 1);
  }
}

// Return the preorder of the built BST
class Solution {
  sortedArrayToBST(nums) {
    const ans = [];

    function preOrder(left = 0, right = nums.length - 1) {
      if (left > right) return;

      let mid = Math.floor((left + right) / 2);
      ans.push(nums[mid]);

      preOrder(left, mid - 1);
      preOrder(mid + 1, right);
    }
    preOrder(0, nums.length - 1);
    return ans;
  }
}
