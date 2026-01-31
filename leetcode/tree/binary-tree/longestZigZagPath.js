/*
1372. Longest ZigZag Path in a Binary Tree
Medium
Topics
premium lock icon
Companies
Hint
You are given the root of a binary tree.

A ZigZag path for a binary tree is defined as follow:

Choose any node in the binary tree and a direction (right or left).
If the current direction is right, move to the right child of the current node; otherwise, move to the left child.
Change the direction from right to left or from left to right.
Repeat the second and third steps until you can't move in the tree.
Zigzag length is defined as the number of nodes visited - 1. (A single node has a length of 0).

Return the longest ZigZag path contained in that tree.

 

Example 1:


Input: root = [1,null,1,1,1,null,null,1,1,null,1,null,null,null,1]
Output: 3
Explanation: Longest ZigZag path in blue nodes (right -> left -> right).
Example 2:


Input: root = [1,1,1,null,1,null,null,1,1,null,1]
Output: 4
Explanation: Longest ZigZag path in blue nodes (left -> right -> left -> right).
Example 3:

Input: root = [1]
Output: 0
 

Constraints:

The number of nodes in the tree is in the range [1, 5 * 104].
1 <= Node.val <= 100
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
var longestZigZagNaive = function (root) {
  let longest = 0;

  function solve(node, steps, goLeft) {
    if (!node) return;
    longest = Math.max(longest, steps);
    if (goLeft) {
      solve(node.left, steps + 1, false);
      solve(node.right, 1, true);
    } else {
      solve(node.right, steps + 1, true);
      solve(node.left, 1, false);
    }
  }

  solve(root, 0, false);
  solve(root, 0, true);
  return longest;
};

/**
 * 1372. Longest ZigZag Path in a Binary Tree
 *
 * =========================
 * PLAN (Interview-style)
 * =========================
 *
 * 1. Rephrase the problem in my own words:
 *    We are given a binary tree. A ZigZag path is a path where we alternate
 *    between going left and right at each step.
 *    The path can start at ANY node, and it does not have to reach a leaf.
 *    The ZigZag length is defined as (number of nodes visited - 1).
 *    We need to find the maximum ZigZag length anywhere in the tree.
 *
 * 2. Inputs and Outputs:
 *    - Input:
 *        root: TreeNode → root of the binary tree
 *    - Output:
 *        number → length of the longest ZigZag path
 *
 * 3. Data Structures:
 *    - Recursion (DFS)
 *    - Global variable to track the maximum ZigZag length
 *
 * 4. Approach:
 *    Intuition:
 *    - At every node, the ZigZag path depends on the direction we came from.
 *    - If we previously went LEFT, the next move must be RIGHT.
 *    - If we previously went RIGHT, the next move must be LEFT.
 *
 *    Key Insight:
 *    - For each node, we track two values:
 *        1) The longest ZigZag path ending at this node if the last move was LEFT
 *        2) The longest ZigZag path ending at this node if the last move was RIGHT
 *
 *    How to solve:
 *    - Use DFS.
 *    - The recursive function returns an array:
 *        [leftZig, rightZig]
 *      where:
 *        - leftZig  = longest ZigZag if last move was LEFT
 *        - rightZig = longest ZigZag if last move was RIGHT
 *
 *    - For current node:
 *        leftZig  = rightChild.rightZig + 1
 *        rightZig = leftChild.leftZig + 1
 *
 *    - Update global maximum with both values.
 *
 * 5. Edge Cases:
 *    - Single node → answer is 0
 *    - Completely skewed tree
 *    - Tree with only left or only right children
 *
 * 6. Time and Space Complexity:
 *    - Time Complexity: O(N)
 *        Each node is visited exactly once.
 *    - Space Complexity: O(H)
 *        Recursion stack, where H is the height of the tree
 *
 * 7. Commit Message:
 *    "Add DFS solution for Longest ZigZag Path in Binary Tree"
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
var longestZigZag = function (root) {
  let maxLen = 0;

  function dfs(node) {
    if (!node) return [-1, -1];
    // [-1, -1] ensures leaf child contributes 0 after +1

    const [leftLeft, leftRight] = dfs(node.left);
    const [rightLeft, rightRight] = dfs(node.right);

    // If we go LEFT from current node,
    // the previous move must have been RIGHT
    const leftZig = leftRight + 1;

    // If we go RIGHT from current node,
    // the previous move must have been LEFT
    const rightZig = rightLeft + 1;

    maxLen = Math.max(maxLen, leftZig, rightZig);

    return [leftZig, rightZig];
  }

  dfs(root);
  return maxLen;
};

/*
Plan
1. Rephrase the Problem
We need to find the longest zigzag path in a binary tree. A zigzag path alternates direction at each step (left → right → left... or right → left → right...). The length is number of nodes minus 1. We can start at any node and go in any initial direction.

2. Inputs and Outputs
Input:

root: Root node of a binary tree

Output:

Integer representing the longest zigzag path length (nodes visited - 1)

3. Data Structures
Recursive DFS: To traverse the tree

Global variable: To track maximum zigzag length found

Binary Tree Nodes: The tree structure itself

4. Approach
Intuition:
At each node, we can either:

Start a new zigzag path from this node

Continue an existing zigzag path coming from parent

For each node, we need to track two possibilities:

Length of zigzag path if we came from parent going LEFT

Length of zigzag path if we came from parent going RIGHT

Key Insight:

If parent tells us to go LEFT, we must go to left child

If we successfully go LEFT, then next move should be RIGHT

So we pass "next expected direction" to children

Solution Steps:

Initialize global maxLength to 0

DFS function takes: node, direction (true for "next should go left", false for "next should go right"), current length

For each node:

Update maxLength with current length

If direction says "go left":

If left child exists: continue zigzag with opposite direction, length+1

If left child doesn't exist: can't continue, but can start new zigzag from current node

If direction says "go right":

If right child exists: continue zigzag with opposite direction, length+1

If right child doesn't exist: can't continue, but can start new zigzag from current node

Also try starting fresh zigzag from each node (length 0)

Return maxLength

5. Edge Cases
Single node tree → return 0

Skewed tree (all left or all right children)

Tree where longest zigzag doesn't start at root

Tree where we need to reset and start new zigzag mid-path

Empty tree (not possible per constraints)

6. Time and Space Complexity
Time Complexity: O(n) where n is number of nodes (we visit each node)

Space Complexity: O(h) for recursion stack, where h is height of tree
*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var longestZigZag = function (root) {
  let longest = 0;

  function solve(node, left, right) {
    if (!node) return;
    longest = Math.max(longest, left, right);
    solve(node.left, right + 1, 0);
    solve(node.right, 0, left + 1);
  }

  solve(root, 0, 0);

  return longest;
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestZigZag = function (root) {
  let maxLength = 0;

  /**
   * DFS traversal
   * @param {TreeNode} node - Current node
   * @param {boolean} goLeft - true if next should go left, false if next should go right
   * @param {number} steps - Current zigzag length
   */
  const dfs = (node, goLeft, steps) => {
    if (!node) return;

    // Update max length
    maxLength = Math.max(maxLength, steps);

    if (goLeft) {
      // If we're supposed to go left next
      if (node.left) {
        // Continue zigzag: left then next should go right
        dfs(node.left, false, steps + 1);
      }
      // Start new zigzag from current node going right
      if (node.right) {
        dfs(node.right, true, 1);
      }
    } else {
      // If we're supposed to go right next
      if (node.right) {
        // Continue zigzag: right then next should go left
        dfs(node.right, true, steps + 1);
      }
      // Start new zigzag from current node going left
      if (node.left) {
        dfs(node.left, false, 1);
      }
    }
  };

  // Start DFS from root, trying both directions
  dfs(root, true, 0); // Start going left
  dfs(root, false, 0); // Start going right

  return maxLength;
};
