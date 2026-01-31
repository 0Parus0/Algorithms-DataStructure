/*
2096. Step-By-Step Directions From a Binary Tree Node to Another
Medium
Topics
premium lock icon
Companies
Hint
You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.

Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:

'L' means to go from a node to its left child node.
'R' means to go from a node to its right child node.
'U' means to go from a node to its parent node.
Return the step-by-step directions of the shortest path from node s to node t.

 

Example 1:


Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
Output: "UURL"
Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.
Example 2:


Input: root = [2,1], startValue = 2, destValue = 1
Output: "L"
Explanation: The shortest path is: 2 → 1.
 

Constraints:

The number of nodes in the tree is n.
2 <= n <= 105
1 <= Node.val <= n
All the values in the tree are unique.
1 <= startValue, destValue <= n
startValue != destValue
*/
function getDirections(root, start, dest) {
  let pathToStart = [];
  let pathToDest = [];

  // DFS to find path from root to a target
  function dfs(node, target, path) {
    if (!node) return false;
    if (node.val === target) return true;

    path.push("L");
    if (dfs(node.left, target, path)) return true;
    path.pop();

    path.push("R");
    if (dfs(node.right, target, path)) return true;
    path.pop();

    return false;
  }

  dfs(root, start, pathToStart);
  dfs(root, dest, pathToDest);

  // Find LCA by removing common prefix
  let i = 0;
  while (
    i < pathToStart.length &&
    i < pathToDest.length &&
    pathToDest[i] === pathToStart[i]
  )
    i++;

  // From start to LCA = go up
  const upMoves = "U".repeat(pathToStart.length - i);
  const downMoves = pathToDest.slice(i).join("");
  return upMoves + downMoves;
}

/*
Plan
1. Rephrase the Problem
We need to find the shortest path between two nodes in a binary tree and output it as directions: 'L' (left child), 'R' (right child), or 'U' (up to parent). Nodes have unique values.

2. Inputs and Outputs
Input:

root: Root of binary tree

startValue: Value of starting node

destValue: Value of destination node

Output:

String of 'L', 'R', 'U' characters representing the path

3. Data Structures
DFS: To find paths from root to both nodes

String/Array: To store paths

LCA (Lowest Common Ancestor): To find meeting point

4. Approach
Intuition:

Find paths from root to start node and root to dest node

Find the Lowest Common Ancestor (LCA) - the point where paths diverge

From start to LCA: go "U" (up) for each step

From LCA to dest: follow the path (L/R) from LCA to dest

Combine: "U" * (path from start to LCA) + (path from LCA to dest)

Key Insight:

Path from start to dest = (start → LCA) + (LCA → dest)

start → LCA: all "U" (go up to parent)

LCA → dest: use L/R directions

Solution Steps:

DFS to find paths from root to start and dest nodes

Compare paths to find LCA (first point where paths differ)

Build result: "U" repeated (start path length from LCA) + dest path from LCA

5. Edge Cases
Start is ancestor of dest (or vice versa)

LCA is root

LCA is one of the nodes

Deep tree

Tree where start and dest are in different subtrees

6. Time and Space Complexity
Time: O(n) - traverse tree to find both paths

Space: O(h) for recursion + path storage

7. Commit Message
Will be added at end.

Solution
javascript
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
 * @param {number} startValue
 * @param {number} destValue
 * @return {string}
 */
var getDirections = function (root, startValue, destValue) {
  // Find path from root to target node
  function findPath(node, target, path) {
    if (!node) return false;

    if (node.val === target) {
      return true;
    }

    // Try left subtree
    path.push("L");
    if (findPath(node.left, target, path)) {
      return true;
    }
    path.pop();

    // Try right subtree
    path.push("R");
    if (findPath(node.right, target, path)) {
      return true;
    }
    path.pop();

    return false;
  }

  // Find paths from root to start and dest
  const startPath = [];
  const destPath = [];

  findPath(root, startValue, startPath);
  findPath(root, destValue, destPath);

  // Find Lowest Common Ancestor (LCA)
  // LCA is where paths start to differ
  let i = 0;
  while (
    i < startPath.length &&
    i < destPath.length &&
    startPath[i] === destPath[i]
  ) {
    i++;
  }

  // Build result:
  // 1. From start to LCA: all "U" (go up)
  // 2. From LCA to dest: follow destPath from position i
  const upSteps = startPath.length - i; // Number of steps up from start to LCA
  const result = "U".repeat(upSteps) + destPath.slice(i).join("");

  return result;
};

// More Efficient Solution (One Pass):

javascript;
var getDirections = function (root, startValue, destValue) {
  let startPath = "";
  let destPath = "";

  // Find LCA and paths in one DFS
  function dfs(node) {
    if (!node) return { hasStart: false, hasDest: false };

    const left = dfs(node.left);
    const right = dfs(node.right);

    // Check current node
    let hasStart = left.hasStart || right.hasStart || node.val === startValue;
    let hasDest = left.hasDest || right.hasDest || node.val === destValue;

    // Build paths
    if (hasStart && !hasDest) {
      // On path from LCA to start (going up)
      startPath = "U" + startPath;
    }

    if (hasDest && !hasStart) {
      // On path from LCA to dest (going down)
      if (left.hasDest) {
        destPath = "L" + destPath;
      } else if (right.hasDest) {
        destPath = "R" + destPath;
      }
    }

    return { hasStart, hasDest };
  }

  dfs(root);
  return startPath + destPath;
};
// Optimized Solution with LCA:
javascript;
var getDirections = function (root, startValue, destValue) {
  // Helper to find LCA
  function findLCA(node) {
    if (!node) return null;
    if (node.val === startValue || node.val === destValue) return node;

    const left = findLCA(node.left);
    const right = findLCA(node.right);

    if (left && right) return node; // Current node is LCA
    return left || right;
  }

  // Find path from LCA to target
  function findPathFromLCA(lca, target, path) {
    if (!lca) return false;
    if (lca.val === target) return true;

    // Try left
    path.push("L");
    if (findPathFromLCA(lca.left, target, path)) return true;
    path.pop();

    // Try right
    path.push("R");
    if (findPathFromLCA(lca.right, target, path)) return true;
    path.pop();

    return false;
  }

  const lca = findLCA(root);

  // Find path from start to LCA (all "U")
  // We can find path from LCA to start, then convert to "U"
  const startToLca = [];
  findPathFromLCA(lca, startValue, startToLca);

  // Find path from LCA to dest
  const lcaToDest = [];
  findPathFromLCA(lca, destValue, lcaToDest);

  // Convert start->LCA path to "U"s
  const upPath = "U".repeat(startToLca.length);

  return upPath + lcaToDest.join("");
};
