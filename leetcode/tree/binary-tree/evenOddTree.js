/*
1609. Even Odd Tree
Medium
Topics
premium lock icon
Companies
Hint
A binary tree is named Even-Odd if it meets the following conditions:

The root of the binary tree is at level index 0, its children are at level index 1, their children are at level index 2, etc.
For every even-indexed level, all nodes at the level have odd integer values in strictly increasing order (from left to right).
For every odd-indexed level, all nodes at the level have even integer values in strictly decreasing order (from left to right).
Given the root of a binary tree, return true if the binary tree is Even-Odd, otherwise return false.

 

Example 1:


Input: root = [1,10,4,3,null,7,9,12,8,6,null,null,2]
Output: true
Explanation: The node values on each level are:
Level 0: [1]
Level 1: [10,4]
Level 2: [3,7,9]
Level 3: [12,8,6,2]
Since levels 0 and 2 are all odd and increasing and levels 1 and 3 are all even and decreasing, the tree is Even-Odd.
Example 2:


Input: root = [5,4,2,3,3,7]
Output: false
Explanation: The node values on each level are:
Level 0: [5]
Level 1: [4,2]
Level 2: [3,3,7]
Node values in level 2 must be in strictly increasing order, so the tree is not Even-Odd.
Example 3:


Input: root = [5,9,1,3,5,7]
Output: false
Explanation: Node values in the level 1 should be even integers.
 

Constraints:

The number of nodes in the tree is in the range [1, 105].
1 <= Node.val <= 106
*/
var isEvenOddTree = function (root) {
  const q = [root];
  let isEven = true;

  while (q.length > 0) {
    let n = q.length;
    let prev = isEven ? -Infinity : Infinity;

    while (n--) {
      const node = q.shift(); // ✅ get node per iteration
      const val = node.val;

      if (isEven) {
        if (val % 2 === 0 || val <= prev) return false;
      } else {
        if (val % 2 !== 0 || val >= prev) return false;
      }

      prev = val;

      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }

    isEven = !isEven;
  }

  return true;
};

var isEvenOddTree = function (root) {
  if (!root) return true;

  const queue = [root];
  let level = 0; // 0 for even, 1 for odd

  while (queue.length > 0) {
    const levelSize = queue.length;
    let prevVal = level % 2 === 0 ? -Infinity : Infinity;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // Use shift() for FIFO

      // Check conditions based on level parity
      if (level % 2 === 0) {
        // Even level
        // Values must be odd and strictly increasing
        if (node.val % 2 === 0 || node.val <= prevVal) {
          return false;
        }
      } else {
        // Odd level
        // Values must be even and strictly decreasing
        if (node.val % 2 !== 0 || node.val >= prevVal) {
          return false;
        }
      }

      prevVal = node.val;

      // Add children to queue for next level
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    level++;
  }

  return true;
};

var isEvenOddTree = function (root) {
  if (!root) return true;

  const queue = [root];
  let isEvenLevel = true;

  while (queue.length) {
    const size = queue.length;
    let prev = isEvenLevel ? -Infinity : Infinity;

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      const val = node.val;

      // Check even level conditions
      if (isEvenLevel && (val % 2 === 0 || val <= prev)) {
        return false;
      }

      // Check odd level conditions
      if (!isEvenLevel && (val % 2 === 1 || val >= prev)) {
        return false;
      }

      prev = val;

      // Add children
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    isEvenLevel = !isEvenLevel;
  }

  return true;
};

var isEvenOddTree = function (root) {
  const prevMap = new Map();

  function dfs(node, level) {
    if (!node) return true;

    const val = node.val;

    // Parity check
    if (level % 2 === 0) {
      if (val % 2 === 0) return false; // even level → odd values
    } else {
      if (val % 2 !== 0) return false; // odd level → even values
    }

    // Ordering check
    if (prevMap.has(level)) {
      const prev = prevMap.get(level);
      if (level % 2 === 0 && val <= prev) return false;
      if (level % 2 !== 0 && val >= prev) return false;
    }

    // Update previous value
    prevMap.set(level, val);

    return dfs(node.left, level + 1) && dfs(node.right, level + 1);
  }

  return dfs(root, 0);
};
