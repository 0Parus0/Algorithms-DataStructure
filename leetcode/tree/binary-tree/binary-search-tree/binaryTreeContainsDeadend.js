/*
BST with Dead End
Difficulty: MediumAccuracy: 35.99%Submissions: 97K+Points: 4
You are given a Binary Search Tree (BST) containing unique positive integers greater than 0.

Your task is to determine whether the BST contains a dead end.

Note: A dead end is a leaf node in the BST such that no new node can be inserted in the BST at or below this node while maintaining the BST property and the constraint that all node values must be > 0.

Examples:

Input: root[] = [8, 5, 9, 2, 7, N, N, 1]

Output: true
Explanation: Node 1 is a Dead End in the given BST.
Input: root[] = [8, 7, 10, 2, N, 9, 13]

Output: true
Explanation: Node 9 is a Dead End in the given BST.
Constraints:
1 ≤ number of nodes ≤ 3000
1 ≤ node->data ≤ 105
*/

class Solution {
  isDeadEnd(root) {
    function deadEnd(node, lower, upper) {
      if (!node) return false;

      // leaf node
      if (!node.left && !node.right) {
        if (node.data - lower === 1 && upper - node.data === 1) return true;
      }
      return (
        deadEnd(node.left, lower, node.data) ||
        deadEnd(node.right, node.data, upper)
      );
    }

    return deadEnd(root, 0, Infinity);
  }
}

class Solution {
  isDeadEnd(root) {
    function dfs(node, min, max) {
      if (!node) return false;
      if (min === max) return true;

      return (
        dfs(node.left, min, node.data - 1) ||
        dfs(node.right, node.data + 1, max)
      );
    }
    return dfs(root, 1, Infinity);
  }
}

class Solution {
  isDeadEnd(root) {
    let values = new Set();
    let leaves = [];

    // Helper function for inorder traversal to collect values and identify leaves
    const traverse = (node) => {
      if (node === null) return;
      values.add(node.data);
      if (node.left === null && node.right === null) {
        leaves.push(node.data);
      }
      traverse(node.left);
      traverse(node.right);
    };

    traverse(root);

    for (let x of leaves) {
      if (x === 1) {
        if (values.has(2)) {
          return true;
        }
      } else {
        if (values.has(x - 1) && values.has(x + 1)) {
          return true;
        }
      }
    }

    return false;
  }
}
