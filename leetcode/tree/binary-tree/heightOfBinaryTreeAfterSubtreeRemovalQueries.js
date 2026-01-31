/*
2458. Height of Binary Tree After Subtree Removal Queries
Hard
Topics
premium lock icon
Companies
Hint
You are given the root of a binary tree with n nodes. Each node is assigned a unique value from 1 to n. You are also given an array queries of size m.

You have to perform m independent queries on the tree where in the ith query you do the following:

Remove the subtree rooted at the node with the value queries[i] from the tree. It is guaranteed that queries[i] will not be equal to the value of the root.
Return an array answer of size m where answer[i] is the height of the tree after performing the ith query.

Note:

The queries are independent, so the tree returns to its initial state after each query.
The height of a tree is the number of edges in the longest simple path from the root to some node in the tree.
 

Example 1:


Input: root = [1,3,4,2,null,6,5,null,null,null,null,null,7], queries = [4]
Output: [2]
Explanation: The diagram above shows the tree after removing the subtree rooted at node with value 4.
The height of the tree is 2 (The path 1 -> 3 -> 2).
Example 2:


Input: root = [5,8,9,2,1,3,7,4,6], queries = [3,2,4,8]
Output: [3,2,3,2]
Explanation: We have the following queries:
- Removing the subtree rooted at node with value 3. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 4).
- Removing the subtree rooted at node with value 2. The height of the tree becomes 2 (The path 5 -> 8 -> 1).
- Removing the subtree rooted at node with value 4. The height of the tree becomes 3 (The path 5 -> 8 -> 2 -> 6).
- Removing the subtree rooted at node with value 8. The height of the tree becomes 2 (The path 5 -> 9 -> 3).
 

Constraints:

The number of nodes in the tree is n.
2 <= n <= 105
1 <= Node.val <= n
All the values in the tree are unique.
m == queries.length
1 <= m <= min(n, 104)
1 <= queries[i] <= n
queries[i] != root.val
*/
/*
Plan
1. Rephrase the Problem
We need to answer multiple independent queries where for each query, we remove a subtree rooted at a given node, and want to know the new height of the remaining tree (height of longest path from root to any node not in removed subtree).

2. Inputs and Outputs
Input:

root: Binary tree with unique node values 1 to n

queries: Array of node values to remove

Output:

Array where each element is height after removing corresponding subtree

3. Data Structures
DFS: To compute heights and depths

Maps/Dictionaries: Store node info by value

Preprocessing: Compute for each node:

Height of its subtree

Depth from root

Best alternative path if this subtree is removed

4. Approach
Intuition:
When we remove a subtree, the height of the tree is:

Max of:

Height through parent's other child (if exists)

Height through ancestors that don't go through removed node

Key Insight:
For each node, we need to know: "If I remove this node's subtree, what's the longest path from root that doesn't go through this node?"

This is the maximum of:

Path through sibling's subtree (depth + sibling's height)

Path through parent's alternative routes (if parent's subtree is removed)

Solution Steps:

First DFS: Compute for each node:

height[node]: Height of subtree rooted at node

depth[node]: Depth from root (edges from root)

Second DFS: Compute for each node:

best[node]: Best path length from root that avoids this node

This = max of:
a. Sibling's path: depth[parent] + 1 + height[sibling]
b. Parent's best alternative: best[parent]

For query removing node q:

Answer = max(best[q], remaining tree height if q is on deepest path)

Actually simpler: height after removing q = best[q]

5. Edge Cases
Removing leaf node

Removing node with only one child

Removing node that's on the longest path

Multiple queries on same node

Tree is a chain (skewed)

Root cannot be removed (per constraints)

6. Time and Space Complexity
Time: O(n) preprocessing + O(m) queries

Space: O(n) for storing node info
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
 * @param {number[]} queries
 * @return {number[]}
 */
var treeQueries = function (root, queries) {
  // Maps to store node info by value
  const height = new Map(); // height[node.val] = height of subtree
  const depth = new Map(); // depth[node.val] = depth from root
  const best = new Map(); // best[node.val] = best height avoiding this node

  // First DFS: compute heights and depths
  function dfs1(node, d) {
    if (!node) return 0;

    depth.set(node.val, d);

    const leftHeight = dfs1(node.left, d + 1);
    const rightHeight = dfs1(node.right, d + 1);
    const h = 1 + Math.max(leftHeight, rightHeight);

    height.set(node.val, h - 1); // Store height (edges count)
    return h;
  }

  // Second DFS: compute best alternative heights
  function dfs2(node, parentBest) {
    if (!node) return;

    // For this node, best alternative is max of:
    // 1. Parent's best (paths avoiding parent)
    // 2. Path through sibling

    const leftHeight = node.left ? height.get(node.left.val) : -1;
    const rightHeight = node.right ? height.get(node.right.val) : -1;

    // Store best for this node
    best.set(node.val, parentBest);

    // Compute best for children
    // For left child: best alternative is max of:
    // - parentBest (paths avoiding this node)
    // - path through right sibling: depth + 1 + rightHeight
    const leftBest = Math.max(
      parentBest,
      depth.get(node.val) + 1 + rightHeight
    );

    // For right child
    const rightBest = Math.max(
      parentBest,
      depth.get(node.val) + 1 + leftHeight
    );

    dfs2(node.left, leftBest);
    dfs2(node.right, rightBest);
  }

  dfs1(root, 0);
  dfs2(root, 0);

  // Answer queries
  const answer = [];
  for (const q of queries) {
    answer.push(best.get(q));
  }

  return answer;
};

// Optimized Solution (Store nodes by value):

var treeQueries = function (root, queries) {
  const height = new Array(100001).fill(0);
  const depth = new Array(100001).fill(0);
  const best = new Array(100001).fill(0);

  // First pass: compute heights and depths
  function dfs1(node, d) {
    if (!node) return -1; // Height of empty tree is -1 (edges)

    depth[node.val] = d;

    const leftH = dfs1(node.left, d + 1);
    const rightH = dfs1(node.right, d + 1);
    const h = 1 + Math.max(leftH, rightH);

    height[node.val] = h;
    return h;
  }

  // Second pass: compute best alternative heights
  function dfs2(node, parentBest, siblingHeight) {
    if (!node) return;

    // Current node's best is max of parent's best and path through sibling
    best[node.val] = Math.max(parentBest, depth[node.val] + siblingHeight);

    // For children:
    const leftH = node.left ? height[node.left.val] : -1;
    const rightH = node.right ? height[node.right.val] : -1;

    // Left child's sibling is right subtree
    dfs2(node.left, best[node.val], rightH);
    // Right child's sibling is left subtree
    dfs2(node.right, best[node.val], leftH);
  }

  dfs1(root, 0);
  dfs2(root, 0, -1); // Root has no sibling, use -1

  return queries.map((q) => best[q]);
};

// Alternative: Two-pass with Node Map

var treeQueries = function (root, queries) {
  // Since node values are 1 to n, we can use arrays
  const n = 100001; // Max possible based on constraints
  const height = new Array(n).fill(0);
  const depth = new Array(n).fill(0);
  const maxHeight = new Array(n).fill(0); // max height avoiding this node

  // Build node map
  const nodes = new Map();
  function buildMap(node) {
    if (!node) return;
    nodes.set(node.val, node);
    buildMap(node.left);
    buildMap(node.right);
  }
  buildMap(root);

  // Compute height for each node
  function getHeight(node) {
    if (!node) return -1;
    if (height[node.val]) return height[node.val];

    const leftH = getHeight(node.left);
    const rightH = getHeight(node.right);
    height[node.val] = 1 + Math.max(leftH, rightH);
    return height[node.val];
  }

  // Compute depth for each node
  function computeDepth(node, d) {
    if (!node) return;
    depth[node.val] = d;
    computeDepth(node.left, d + 1);
    computeDepth(node.right, d + 1);
  }

  // Compute max height avoiding each node
  function computeMaxHeight(node, parentMax, siblingH) {
    if (!node) return;

    // Maximum height avoiding current node
    maxHeight[node.val] = Math.max(parentMax, depth[node.val] + siblingH);

    const leftH = node.left ? height[node.left.val] : -1;
    const rightH = node.right ? height[node.right.val] : -1;

    // For children
    computeMaxHeight(node.left, maxHeight[node.val], rightH);
    computeMaxHeight(node.right, maxHeight[node.val], leftH);
  }

  // Execute
  getHeight(root);
  computeDepth(root, 0);
  computeMaxHeight(root, 0, -1);

  return queries.map((q) => maxHeight[q]);
};
