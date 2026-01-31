/*
662. Maximum Width of Binary Tree
Medium
Topics
premium lock icon
Companies
Given the root of a binary tree, return the maximum width of the given tree.

The maximum width of a tree is the maximum width among all levels.

The width of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

It is guaranteed that the answer will in the range of a 32-bit signed integer.

 

Example 1:


Input: root = [1,3,2,5,3,null,9]
Output: 4
Explanation: The maximum width exists in the third level with length 4 (5,3,null,9).
Example 2:


Input: root = [1,3,2,5,null,null,9,6,null,7]
Output: 7
Explanation: The maximum width exists in the fourth level with length 7 (6,null,null,null,null,null,7).
Example 3:


Input: root = [1,3,2,5]
Output: 2
Explanation: The maximum width exists in the second level with length 2 (3,2).
 

Constraints:

The number of nodes in the tree is in the range [1, 3000].
-100 <= Node.val <= 100
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

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
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  if (!root) return 0;

  let maxWidth = 0;
  const queue = [[root, 0]]; // [node, index]

  while (queue.length > 0) {
    const levelSize = queue.length;
    let firstIndex = queue[0][1];
    let lastIndex = queue[levelSize - 1][1];

    // Calculate width for current level
    const levelWidth = lastIndex - firstIndex + 1;
    maxWidth = Math.max(maxWidth, levelWidth);

    // Process all nodes at current level
    for (let i = 0; i < levelSize; i++) {
      const [node, index] = queue.shift();
      const normalizedIndex = index - firstIndex; // Prevent overflow

      if (node.left) {
        queue.push([node.left, 2 * normalizedIndex + 1]);
      }
      if (node.right) {
        queue.push([node.right, 2 * normalizedIndex + 2]);
      }
    }
  }

  return maxWidth;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function (root) {
  const q = [];
  let maxWidth = 0;
  q.push([root, 0]);

  while (q.length) {
    let n = q.length;
    let l = q[0][1];
    let r = q[n - 1][1];
    maxWidth = Math.max(maxWidth, r - l + 1);

    while (n--) {
      let [node, idx] = q.shift();
      const nIdx = idx - l; // Normalized index to prevent overflow
      if (node.left) {
        q.push([node.left, nIdx * 2 + 1]);
      }
      if (node.right) {
        q.push([node.right, nIdx * 2 + 2]);
      }
    }
  }
  return maxWidth;
};

/*
Plan
1. Rephrase the Problem
We need to find the maximum width of a binary tree, where width at each level is calculated by considering the positions of nodes as if the tree were complete (including null positions between non-null nodes). The width is the distance between the leftmost and rightmost non-null nodes at that level.

2. Inputs and Outputs
Input:

root: Root node of a binary tree

Output:

Integer representing the maximum width across all levels

3. Data Structures
Queue/BFS: For level-order traversal

Pair/Tuple: To store (node, position_index)

Variables: To track start and end positions at each level

4. Approach
Intuition:
If we assign an index to each node as if it's in a complete binary tree:

Root gets index 0

Left child gets index: 2 * parent_index + 1

Right child gets index: 2 * parent_index + 2

Then at each level:

Width = (last_index - first_index + 1)

Where first_index is index of first node at that level

Where last_index is index of last node at that level

Solution Steps:

Use BFS (level-order traversal) with a queue

Store (node, index) pairs in queue

For each level:

Track first_index (index of first node in level)

Track last_index (index of last node in level)

Process all nodes at current level

Width = last_index - first_index + 1

Update max_width

For children, enqueue with calculated indices

Return max_width

5. Edge Cases
Single node tree → width = 1

Skewed tree (all left or all right)

Tree with only right children

Tree where max width is not at deepest level

Large indices (use BigInt or mod to avoid overflow)

6. Time and Space Complexity
Time Complexity: O(n) where n is number of nodes

Space Complexity: O(w) where w is maximum width (queue size)

7. Commit Message
Will be added at the end of solution.
*/

var widthOfBinaryTree = function (root) {
  if (!root) return 0;

  let maxWidth = 0;
  let queue = [[root, 0]]; // [node, index]

  while (queue.length > 0) {
    const levelSize = queue.length;
    const baseIndex = queue[0][1]; // normalize
    let first = 0,
      last = 0;

    for (let i = 0; i < levelSize; i++) {
      const [node, idx] = queue.shift();
      const normalizedIdx = idx - baseIndex;

      if (i === 0) first = normalizedIdx;
      if (i === levelSize - 1) last = normalizedIdx;

      if (node.left) {
        queue.push([node.left, 2 * normalizedIdx]);
      }
      if (node.right) {
        queue.push([node.right, 2 * normalizedIdx + 1]);
      }
    }

    maxWidth = Math.max(maxWidth, last - first + 1);
  }

  return maxWidth;
};
