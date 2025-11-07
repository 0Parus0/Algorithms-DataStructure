/*
Largest BST
Difficulty: MediumAccuracy: 29.73%Submissions: 185K+Points: 4
You're given a binary tree. Your task is to find the size of the largest subtree within this binary tree that also satisfies the properties of a Binary Search Tree (BST). The size of a subtree is defined as the number of nodes it contains.

Note: A subtree of the binary tree is considered a BST if for every node in that subtree, the left child is less than the node, and the right child is greater than the node, without any duplicate values in the subtree.

Examples :

Input: root = [5, 2, 4, 1, 3]
Root-to-leaf-path-sum-equal-to-a-given-number-copy
Output: 3
Explanation:The following sub-tree is a BST of size 3
Balance-a-Binary-Search-Tree-3-copy
Input: root = [6, 7, 3, N, 2, 2, 4]

Output: 3
Explanation: The following sub-tree is a BST of size 3:

Constraints:
1 ≤ number of nodes ≤ 105
1 ≤ node->data ≤ 105
*/

class Solution {
  largestBst(root) {
    // Variable to track the largest BST size found so far
    let maxSize = 0;

    // Recursive DFS function (postorder: left → right → root)
    function dfs(node) {
      // Base case: null node represents an empty tree
      if (!node) {
        return {
          min: Infinity, // Empty subtree has "infinite" min (so any value is smaller)
          max: -Infinity, // Empty subtree has "-infinite" max (so any value is larger)
          size: 0, // Size of empty subtree is 0
          isBST: true, // Empty subtree is always a valid BST
        };
      }

      // Get BST info from the left subtree
      let left = dfs(node.left);
      // Get BST info from the right subtree
      let right = dfs(node.right);

      // Check if the current subtree can form a valid BST
      if (
        left.isBST && // Left subtree must be BST
        right.isBST && // Right subtree must be BST
        node.data > left.max && // Current node must be greater than all values in left
        node.data < right.min // Current node must be smaller than all values in right
      ) {
        // Current subtree is a valid BST

        // Calculate new min value (either from left or current node)
        let minVal = Math.min(node.data, left.min);
        // Calculate new max value (either from right or current node)
        let maxVal = Math.max(node.data, right.max);
        // Calculate current BST size (sum of left + right + root)
        let size = left.size + right.size + 1;

        // Update global maximum size if needed
        maxSize = Math.max(maxSize, size);

        // Return info for this valid BST subtree
        return {
          min: minVal,
          max: maxVal,
          size: size,
          isBST: true,
        };
      } else {
        // Current subtree is not a BST
        return {
          min: 0,
          max: 0,
          size: 0,
          isBST: false,
        };
      }
    }

    // Start DFS traversal from root
    dfs(root);

    // Return the size of the largest BST found
    return maxSize;
  }
}

class Solution {
  // Function to return size of largest BST in a binary tree
  largestBst(root) {
    // Global variable to keep track of the largest BST size
    let maxSize = 0;

    // Helper function that returns info about subtree
    // Returns: [isBST, size, minVal, maxVal]
    function helper(node) {
      // Base case: null node is a BST of size 0
      if (!node) return [true, 0, Infinity, -Infinity];

      // Recursively get info for left and right subtrees
      const [isLeftBST, leftSize, leftMin, leftMax] = helper(node.left);
      const [isRightBST, rightSize, rightMin, rightMax] = helper(node.right);

      // Check if current subtree is a BST
      if (
        isLeftBST &&
        isRightBST &&
        leftMax < node.data &&
        node.data < rightMin
      ) {
        // Current subtree is a BST
        const size = leftSize + rightSize + 1;
        maxSize = Math.max(maxSize, size);
        // Return true with updated size, min, max
        return [
          true,
          size,
          Math.min(leftMin, node.data),
          Math.max(rightMax, node.data),
        ];
      }

      // Otherwise, not a BST — return false with dummy values
      return [false, 0, 0, 0];
    }

    // Start recursion
    helper(root);

    // Return the largest size found
    return maxSize;
  }
}
