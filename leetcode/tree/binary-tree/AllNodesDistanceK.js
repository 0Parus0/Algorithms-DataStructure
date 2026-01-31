/*

863. All Nodes Distance K in Binary Tree
Medium
Topics
premium lock icon
Companies
Given the root of a binary tree, the value of a target node target, and an integer k, return an array of the values of all nodes that have a distance k from the target node.

You can return the answer in any order.

 

Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
Output: [7,4,1]
Explanation: The nodes that are a distance 2 from the target node (with value 5) have values 7, 4, and 1.
Example 2:

Input: root = [1], target = 1, k = 3
Output: []
 

Constraints:

The number of nodes in the tree is in the range [1, 500].
0 <= Node.val <= 500
All the values Node.val are unique.
target is the value of one of the nodes in the tree.
0 <= k <= 1000
 
*/

var distanceK = function (root, target, k) {
  const result = [];
  const parent = new Map();

  // DFS to build parent map
  const dfs = (node, par) => {
    if (!node) return;
    parent.set(node, par);
    dfs(node.left, node);
    dfs(node.right, node);
  };

  dfs(root, null);

  // BFS from target
  const queue = [[target, 0]];
  const visited = new Set([target]);

  while (queue.length) {
    const [node, distance] = queue.shift();

    if (distance === k) {
      result.push(node.val);
      // Don't process further if we've reached distance k
      continue;
    }

    // Explore neighbors: left, right, parent
    const neighbors = [node.left, node.right, parent.get(node)];

    for (const neighbor of neighbors) {
      if (neighbor && !visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }

  return result;
};

function distanceK(root, target, k) {
  const parent = new Map();

  // Build parent pointers
  function dfs(node, par = null) {
    if (!node) return;
    if (par) parent.set(node, par);
    dfs(node.left, node);
    dfs(node.right, node);
  }

  dfs(root);

  // BFS from target node
  const queue = [target];
  const visited = new Set();
  visited.add(target);

  let distance = 0;

  while (queue.length) {
    const size = queue.length;

    if (distance === k) {
      return queue.map((node) => node.val);
    }

    for (let i = 0; i < size; i++) {
      const curr = queue.shift();

      const neighbors = [curr.left, curr.right, parent.get(curr)];

      for (const next of neighbors) {
        if (next && !visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }

    distance++;
  }

  return [];
}
function distanceK(root, target, k) {
  const parent = new Map();
  let targetNode = null;

  // Step 1: DFS to build parent map & find target node
  function dfs(node, par = null) {
    if (!node) return;

    if (node.val === target) {
      targetNode = node;
    }

    if (par) parent.set(node, par);

    dfs(node.left, node);
    dfs(node.right, node);
  }

  dfs(root);

  // Step 2: BFS from target
  const queue = [targetNode];
  const visited = new Set();
  visited.add(targetNode);

  let distance = 0;

  while (queue.length > 0) {
    const size = queue.length;

    if (distance === k) {
      return queue.map((node) => node.val);
    }

    for (let i = 0; i < size; i++) {
      const curr = queue.shift();

      for (const next of [curr.left, curr.right, parent.get(curr)]) {
        if (next && !visited.has(next)) {
          visited.add(next);
          queue.push(next);
        }
      }
    }

    distance++;
  }

  return [];
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  const result = [];
  const parent = new Map();

  // Step 1: Build parent map using DFS
  function buildParentMap(node, par) {
    if (!node) return;
    parent.set(node, par);
    buildParentMap(node.left, node);
    buildParentMap(node.right, node);
  }

  // Step 2: BFS from target to find nodes at distance k
  function bfsFromTarget(startNode, k) {
    if (!startNode) return;

    const queue = [startNode];
    const visited = new Set();
    visited.add(startNode);

    let distance = 0;

    while (queue.length > 0) {
      // If we've reached the desired distance
      if (distance === k) {
        // Collect all nodes at this level
        for (let node of queue) {
          result.push(node.val);
        }
        return;
      }

      // Process current level
      const levelSize = queue.length;
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift();

        // Check left child
        if (node.left && !visited.has(node.left)) {
          visited.add(node.left);
          queue.push(node.left);
        }

        // Check right child
        if (node.right && !visited.has(node.right)) {
          visited.add(node.right);
          queue.push(node.right);
        }

        // Check parent
        const par = parent.get(node);
        if (par && !visited.has(par)) {
          visited.add(par);
          queue.push(par);
        }
      }

      distance++;
    }
  }

  // Build parent map
  buildParentMap(root, null);

  // Start BFS from target
  bfsFromTarget(target, k);

  return result;
};
