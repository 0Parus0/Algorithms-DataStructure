/*
1028. Recover a Tree From Preorder Traversal
Hard
Topics
premium lock icon
Companies
Hint
We run a preorder depth-first search (DFS) on the root of a binary tree.

At each node in this traversal, we output D dashes (where D is the depth of this node), then we output the value of this node.  If the depth of a node is D, the depth of its immediate child is D + 1.  The depth of the root node is 0.

If a node has only one child, that child is guaranteed to be the left child.

Given the output traversal of this traversal, recover the tree and return its root.

 

Example 1:


Input: traversal = "1-2--3--4-5--6--7"
Output: [1,2,5,3,4,6,7]
Example 2:


Input: traversal = "1-2--3---4-5--6---7"
Output: [1,2,5,3,null,6,null,4,null,7]
Example 3:


Input: traversal = "1-401--349---90--88"
Output: [1,401,null,349,88,90]
 

Constraints:

The number of nodes in the original tree is in the range [1, 1000].
1 <= Node.val <= 109
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
 * @param {string} traversal
 * @return {TreeNode}
 */
var recoverFromPreorder = function (traversal) {
  const n = traversal.length;
  let i = 0;

  function solve(depth) {
    if (i >= n) return null;

    let j = i;
    while (j < n && traversal[j] === "-") {
      j++;
    }

    let dashes = j - i;
    if (dashes !== depth) return null;

    i += dashes;
    let num = 0;

    while (i < n && !isNaN(traversal[i])) {
      num = num * 10 + parseInt(traversal[i]);
      i++;
    }

    let node = new TreeNode(num);
    node.left = solve(depth + 1);
    node.right = solve(depth + 1);

    return node;
  }

  return solve(0);
};
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {string} traversal
 * @return {TreeNode}
 */
var recoverFromPreorder = function (traversal) {
  let index = 0; // Global index to track position in string

  const solve = (expectedDepth) => {
    if (index >= traversal.length) return null;

    // Count dashes at current position
    let dashCount = 0;
    const start = index;
    while (index < traversal.length && traversal[index] === "-") {
      dashCount++;
      index++;
    }

    // If dashes don't match expected depth, this isn't a child
    // Reset index and return null
    if (dashCount !== expectedDepth) {
      index = start; // Reset to original position
      return null;
    }

    // Parse number
    let num = 0;
    while (index < traversal.length && !isNaN(parseInt(traversal[index]))) {
      num = num * 10 + parseInt(traversal[index]);
      index++;
    }

    const node = new TreeNode(num);
    node.left = solve(expectedDepth + 1);
    node.right = solve(expectedDepth + 1);

    return node;
  };

  return solve(0);
};

var recoverFromPreorder = function (traversal) {
  let i = 0;
  const n = traversal.length;

  // Helper to parse next node's depth and value
  const parseNextNode = () => {
    if (i >= n) return { depth: -1, value: 0 }; // Sentinel

    // Parse depth
    let depth = 0;
    while (i < n && traversal[i] === "-") {
      depth++;
      i++;
    }

    // Parse value
    let value = 0;
    while (i < n && traversal[i] !== "-") {
      value = value * 10 + parseInt(traversal[i]);
      i++;
    }

    return { depth, value };
  };

  // Recursive function with lookahead
  const buildTree = (expectedDepth) => {
    // Peek at next node without consuming it
    const savedPos = i;
    const { depth, value } = parseNextNode();
    i = savedPos; // Reset position

    // If depth doesn't match, not a child at this level
    if (depth !== expectedDepth) {
      return null;
    }

    // Actually consume the node now
    parseNextNode(); // This updates i
    const node = new TreeNode(value);

    // Build children (depth + 1)
    node.left = buildTree(expectedDepth + 1);
    node.right = buildTree(expectedDepth + 1);

    return node;
  };

  return buildTree(0);
};
