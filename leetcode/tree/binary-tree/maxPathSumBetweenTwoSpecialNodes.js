/*
Max Path Sum 2 Special Nodes
Difficulty: HardAccuracy: 18.39%Submissions: 200K+Points: 8
Given a binary tree in which each node element contains a number. Find the maximum possible path sum from one special node to another special node.

Note: Here special node is a node that is connected to exactly one different node.

Examples:

Input: root = [3, 4, 5, -10, 4, N, N]
                         
Output: 16
Explanation: Maximum Sum lies between special node 4 and 5. 4 + 4 + 3 + 5 = 16.
Input: root = [-15, 5, 6, -8, 1, 3, 9, 2, -3, 0, 4, -1, 10]


Output:  27
Explanation: The maximum possible sum from one special node to another is (3 + 6 + 9 + 0 + -1 + 10 = 27)
Input: root = [3, 4, 1, -10, 4] 

                         
Output: 12
Explanation: Maximum Sum lies between special node 4 and 5. 4 + 4 + 3 + 1 = 12.
Constraints:
2  ≤  number of nodes  ≤  104
-103  ≤ node->data ≤ 103
*/
/*
class Node
{
    constructor(x){
        this.key=x;
        this.left=null;
        this.right=null;
    }
}
*/

/**
 * @param {Node} root
 * @return {number}
 */
class Solution {
  maxPathSum(root) {
    let sum = -Infinity;

    function pathSum(root) {
      if (!root) {
        return 0;
      }
      // leaf node
      if (!root.left && !root.right) {
        return root.key;
      }

      let left = pathSum(root.left);
      let right = pathSum(root.right);

      // left and right both exist
      if (root.left && root.right) {
        sum = Math.max(sum, root.key + left + right);
        return root.key + Math.max(left, right);
      }
      // only left exist
      if (root.left) {
        return root.key + left;
      }

      // only right exist
      if (root.right) {
        return root.key + right;
      }
    }

    const val = pathSum(root);
    if (root.left && root.right) {
      return sum;
    }
    return Math.max(sum, val);
  }
}

class SolutionDFS {
  maxPathSum(root) {
    let maxSum = -Infinity;

    const dfs = (node) => {
      if (!node) return 0;

      // Base case: leaf node
      if (!node.left && !node.right) {
        return node.key;
      }

      const left = dfs(node.left);
      const right = dfs(node.right);

      // Update maxSum if both children exist (path through root)
      if (node.left && node.right) {
        maxSum = Math.max(maxSum, node.key + left + right);
      }

      // Return maximum path sum from this node to a leaf
      if (!node.left) {
        return node.key + right;
      }
      if (!node.right) {
        return node.key + left;
      }

      return node.key + Math.max(left, right);
    };

    const result = dfs(root);

    // Handle case where tree has no branching (only one path)
    return maxSum === -Infinity ? result : maxSum;
  }
}
