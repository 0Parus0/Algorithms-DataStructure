/*
Check if two nodes are cousins in a Binary Tree
Last Updated : 23 Jul, 2025

Given a binary tree (having distinct node values) root and two node values. The task is to check whether the two nodes with values a and b are cousins.
Note: Two nodes of a binary tree are cousins if they have the same depth with different parents.

Example: 

    Input: a = 5, b = 4
    12-example
     

    Output: True
    Explanation: Node with the values 5 and 4 are on the same level with different parents.

    Input: a = 4, b = 5
    11-example
     

    Output: False
    Explanation: Node with the values 5 and 4 are on the same level with same parent.
*/

function isCousins(root, a, b) {
  // Edge cases
  if (!root || a === b) return false;
  if (!root.left && !root.right) return false; // Single node tree

  // Helper function to check if nodes are siblings
  function parent(root, a, b) {
    if (!root) return false;

    // Check if current node is parent of both a and b
    if (root.left && root.right) {
      if (root.left.data === a && root.right.data === b) return true;
      if (root.left.data === b && root.right.data === a) return true;
    }

    // Recursively check left and right subtrees
    return parent(root.left, a, b) || parent(root.right, a, b);
  }

  // BFS for level order traversal
  const que = [];
  que.push(root);
  let l1 = -1; // Level for node a
  let l2 = -1; // Level for node b
  let level = 0; // Current level

  while (que.length > 0) {
    let n = que.length; // Number of nodes at current level

    // Process all nodes at current level
    while (n--) {
      let temp = que.shift();

      // Check if current node matches target nodes
      if (temp.data === a) l1 = level;
      if (temp.data === b) l2 = level;

      // Add children to queue
      if (temp.left) que.push(temp.left);
      if (temp.right) que.push(temp.right);
    }

    level++; // Move to next level

    // If levels are different, nodes can't be cousins
    if (l1 !== l2) return false;

    // If both nodes found, break early
    if (l1 !== -1 && l2 !== -1) break;
  }

  // Return true if same level and not siblings
  return !parent(root, a, b);
}

function areCousins(root, a, b) {
  if (!root || a === b) return false;
  if (!root.right && !root.left) return false;

  let parentA = null,
    parentB = null;
  let levelA = -1,
    levelB = -1;

  // BFS to find level and parent for both nodes
  const queue = [[root, null, 0]]; // [node, parent, level]

  while (queue.length > 0) {
    const [node, parent, level] = queue.shift();

    if (node.val === a) {
      parentA = parent;
      levelA = level;
    }

    if (node.val === b) {
      parentB = parent;
      levelB = level;
    }

    // If both nodes found, break early
    if (parentA !== null && parentB !== null) {
      break;
    }

    if (node.left) {
      queue.push([node.left, node, level + 1]);
    }
    if (node.right) {
      queue.push([node.right, node, level + 1]);
    }
  }

  // Check if same level and different parents
  return levelA === levelB && parentA !== parentB;
}

function areCousins(root, a, b) {
  let parentA = null,
    parentB = null;
  let levelA = -1,
    levelB = -1;

  function dfs(node, parent, level) {
    if (!node) return;

    if (node.data === a) {
      parentA = parent;
      levelA = level;
    }

    if (node.data === b) {
      parentB = parent;
      levelB = level;
    }

    if (parentA && parentB) return; // Early exit

    dfs(node.left, node, level + 1);
    dfs(node.right, node, level + 1);
  }

  dfs(root, null, 0);
  return levelA === levelB && parentA !== parentB;
}
