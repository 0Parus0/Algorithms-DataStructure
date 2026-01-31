/*
2415. Reverse Odd Levels of Binary Tree
Medium
Topics
premium lock icon
Companies
Hint
Given the root of a perfect binary tree, reverse the node values at each odd level of the tree.

For example, suppose the node values at level 3 are [2,1,3,4,7,11,29,18], then it should become [18,29,11,7,4,3,1,2].
Return the root of the reversed tree.

A binary tree is perfect if all parent nodes have two children and all leaves are on the same level.

The level of a node is the number of edges along the path between it and the root node.

 

Example 1:


Input: root = [2,3,5,8,13,21,34]
Output: [2,5,3,8,13,21,34]
Explanation: 
The tree has only one odd level.
The nodes at level 1 are 3, 5 respectively, which are reversed and become 5, 3.
Example 2:


Input: root = [7,13,11]
Output: [7,11,13]
Explanation: 
The nodes at level 1 are 13, 11, which are reversed and become 11, 13.
Example 3:

Input: root = [0,1,2,0,0,0,0,1,1,1,1,2,2,2,2]
Output: [0,2,1,0,0,0,0,2,2,2,2,1,1,1,1]
Explanation: 
The odd levels have non-zero values.
The nodes at level 1 were 1, 2, and are 2, 1 after the reversal.
The nodes at level 3 were 1, 1, 1, 1, 2, 2, 2, 2, and are 2, 2, 2, 2, 1, 1, 1, 1 after the reversal.
 

Constraints:

The number of nodes in the tree is in the range [1, 214].
0 <= Node.val <= 105
root is a perfect binary tree.
*/

/*
Plan
1. Rephrase the Problem
We have a perfect binary tree. We need to reverse the order of node values at odd levels (where root is level 0). Level numbers: 0 (root), 1 (children), 2 (grandchildren), etc. Only odd levels (1, 3, 5...) get reversed.

2. Inputs and Outputs
Input:

root: Root of a perfect binary tree

Output:

Root of tree with odd levels reversed

3. Data Structures
BFS/Level-order traversal: To process level by level

Queue: For BFS traversal

Array: To collect nodes at each level

4. Approach
Intuition:

Traverse tree level by level

Keep track of current level

For odd levels: collect nodes, reverse their values

Since it's a perfect binary tree, each level has 2^level nodes

Solution Approaches:

BFS with level tracking: Process nodes level by level, reverse values at odd levels

DFS with pairing: For odd levels, swap values between symmetric positions

Two-pointer approach: For each odd level, use two pointers to swap values from ends

Key Insight:
For a perfect binary tree at odd level L, the first and last nodes are symmetric. We can swap values without needing to collect all nodes.

5. Edge Cases
Single node (only root, level 0 - no reversal)

Tree with only 3 nodes (level 1 gets reversed)

Tree with 7 nodes (level 1 reversed, level 2 not)

All nodes have same value (reversal still happens)

Large tree (2^14 nodes max)

6. Time and Space Complexity
Time: O(n) - visit each node once

Space: O(width) for BFS queue, or O(1) for optimized approach

7. Commit Message
Will be added at end.
*/

/* Approach 1: BFS with Level Collection */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var reverseOddLevels = function (root) {
  if (!root) return null;

  const queue = [root];
  let level = 0;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelNodes = [];

    // Collect all nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelNodes.push(node);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Reverse values at odd levels
    if (level % 2 === 1) {
      // Two-pointer swap
      let left = 0,
        right = levelNodes.length - 1;
      while (left < right) {
        const temp = levelNodes[left].val;
        levelNodes[left].val = levelNodes[right].val;
        levelNodes[right].val = temp;
        left++;
        right--;
      }
    }

    level++;
  }

  return root;
};

/* Approach 2: DFS with Symmetric Swapping (Optimized) */
var reverseOddLevels = function (root) {
  if (!root) return null;

  const dfs = (leftNode, rightNode, level) => {
    if (!leftNode || !rightNode) return;

    // If current level is odd, swap values
    if (level % 2 === 1) {
      const temp = leftNode.val;
      leftNode.val = rightNode.val;
      rightNode.val = temp;
    }

    // Recurse on children pairs
    dfs(leftNode.left, rightNode.right, level + 1);
    dfs(leftNode.right, rightNode.left, level + 1);
  };

  // Start with left and right children of root (level 1)
  if (root.left && root.right) {
    dfs(root.left, root.right, 1);
  }

  return root;
};

/* Approach 3: BFS with Two-pointer In-place */

var reverseOddLevels = function (root) {
  if (!root) return null;

  let currentLevel = [root];
  let level = 0;

  while (currentLevel.length > 0) {
    const nextLevel = [];

    // If current level is odd, reverse it
    if (level % 2 === 1) {
      let left = 0,
        right = currentLevel.length - 1;
      while (left < right) {
        const temp = currentLevel[left].val;
        currentLevel[left].val = currentLevel[right].val;
        currentLevel[right].val = temp;
        left++;
        right--;
      }
    }

    // Build next level
    for (const node of currentLevel) {
      if (node.left) {
        nextLevel.push(node.left);
        nextLevel.push(node.right); // Perfect tree, right exists if left exists
      }
    }

    currentLevel = nextLevel;
    level++;
  }

  return root;
};
