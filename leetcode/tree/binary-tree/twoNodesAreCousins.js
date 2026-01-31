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
