/*
1110. Delete Nodes And Return Forest
Medium
Topics
premium lock icon
Companies
Given the root of a binary tree, each node in the tree has a distinct value.

After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).

Return the roots of the trees in the remaining forest. You may return the result in any order.

 

Example 1:


Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
Output: [[1,2,null,4],[6],[7]]
Example 2:

Input: root = [1,2,4,null,3], to_delete = [3]
Output: [[1,2,4]]
 

Constraints:

The number of nodes in the given tree is at most 1000.
Each node has a distinct value between 1 and 1000.
to_delete.length <= 1000
to_delete contains distinct values between 1 and 1000.
*/
function delNodes(root, to_delete) {
  const st = new Set(to_delete);
  const result = [];
  if (!st.has(root.val)) {
    result.push(root);
  }

  function deleteHelper(root) {
    if (!root) return null;
    root.left = deleteHelper(root.left);
    root.right = deleteHelper(root.right);
    if (st.has(root.val)) {
      if (root.left) {
        result.push(root.left);
      }
      if (root.right) {
        result.push(root.right);
      }
      return null;
    } else {
      return root;
    }
  }

  deleteHelper(root);
  return result;
}
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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function (root, to_delete) {
  const st = new Set(to_delete);
  const result = [];

  function deleteHelper(root) {
    if (!root) return null;
    root.left = deleteHelper(root.left);
    root.right = deleteHelper(root.right);
    if (st.has(root.val)) {
      if (root.left) {
        result.push(root.left);
      }
      if (root.right) {
        result.push(root.right);
      }
      return null;
    } else {
      return root;
    }
  }

  deleteHelper(root);
  if (!st.has(root.val)) {
    result.push(root);
  }
  return result;
};

/**
 * 1110. Delete Nodes And Return Forest
 *
 * =========================
 * PLAN (Interview-style)
 * =========================
 *
 * 1. Rephrase the problem in my own words:
 *    We are given a binary tree and a list of node values to delete.
 *    When a node is deleted, its children (if not deleted themselves)
 *    become new roots in a resulting forest.
 *    Our task is to return all the roots of the trees that remain after
 *    performing these deletions.
 *
 * 2. Inputs and Outputs:
 *    - Input:
 *        root: TreeNode | null  → root of the binary tree
 *        to_delete: number[]    → values of nodes to be deleted
 *    - Output:
 *        TreeNode[] → array of roots of the remaining trees (forest)
 *
 * 3. Data Structures:
 *    - Set: to store values in `to_delete` for O(1) lookup
 *    - Array: to collect roots of the resulting forest
 *    - Recursion (DFS): to traverse and modify the tree
 *
 * 4. Approach:
 *    Intuition:
 *    - Deleting a node affects its parent-child relationship.
 *    - If a node is deleted, its children should be treated as potential
 *      new roots (if they themselves are not deleted).
 *    - This suggests a post-order traversal so that we decide what to do
 *      with children before handling the current node.
 *
 *    Steps to solve:
 *    - Convert `to_delete` into a Set for fast lookups.
 *    - Perform a DFS that:
 *        - Recursively processes left and right children.
 *        - Checks if the current node needs to be deleted.
 *        - If deleted:
 *            - Add its non-null children to the forest.
 *            - Return null to the parent (disconnecting it).
 *        - If not deleted:
 *            - Return the node with possibly updated children.
 *    - After DFS, if the original root is not deleted, add it to the forest.
 *
 * 5. Edge Cases:
 *    - root is null → return empty array
 *    - All nodes are deleted → return empty array
 *    - to_delete is empty → return the original root as the only tree
 *    - Deleting the root node
 *
 * 6. Time and Space Complexity:
 *    - Time Complexity: O(N)
 *        Each node is visited exactly once.
 *    - Space Complexity: O(N)
 *        - Recursion stack in worst case (skewed tree)
 *        - Set for deleted values
 *        - Output forest storage
 *
 * 7. Commit Message:
 *    "Implement DFS-based solution to delete nodes and return forest"
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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function (root, to_delete) {
  const deleteSet = new Set(to_delete);
  const forest = [];

  function dfs(node) {
    if (!node) return null;

    node.left = dfs(node.left);
    node.right = dfs(node.right);

    if (deleteSet.has(node.val)) {
      if (node.left) forest.push(node.left);
      if (node.right) forest.push(node.right);
      return null; // delete this node
    }

    return node;
  }

  const remainingRoot = dfs(root);
  if (remainingRoot) {
    forest.push(remainingRoot);
  }

  return forest;
};

/*
Plan
1. Rephrase the Problem
We have a binary tree where each node has a unique value. We need to delete nodes whose values are in a given list to_delete. After deletion, we'll have a "forest" - a collection of disjoint trees (some original subtrees that weren't deleted, plus possibly new trees formed when parent nodes are deleted but children remain). We need to return the root nodes of all resulting trees.

2. Inputs and Outputs
Inputs:

root: Root node of a binary tree

to_delete: Array of integers representing values to delete

Output:

Array of tree root nodes that remain after deletion

3. Data Structures
Hash Set: For O(1) lookup of values to delete

Array/List: To store the resulting forest roots

Binary Tree Nodes: The tree structure itself

4. Approach
Intuition:

We need to traverse the tree (post-order works well) because we need to check children before deciding about current node

When we delete a node, its children (if they exist and aren't deleted) become new trees in our forest

We need a way to track whether a node becomes a root of a new tree:

If current node is being deleted, its children become new roots

If current node is NOT being deleted AND has no parent (or parent was deleted), it's a root

Solution Steps:

Convert to_delete array to a Set for O(1) lookups

Create result array to store forest roots

Perform DFS (post-order traversal):

If node is null, return null

Recursively process left and right children

If current node's value is in to_delete Set:

If left child exists and wasn't deleted, add to result

If right child exists and wasn't deleted, add to result

Return null (indicating this node was deleted)

Else (node not deleted):

Return the node itself

After DFS, if original root wasn't deleted, add it to result

Return result array

5. Edge Cases
Empty tree (root is null)

All nodes are deleted (result is empty array)

No nodes are deleted (result is just [root])

Deleting root node

Deleting leaf nodes

Deleting nodes with one or two children

to_delete is empty array

6. Time and Space Complexity
Time Complexity: O(n) where n is number of nodes (we visit each node once)

Space Complexity: O(h + m) where h is height of tree (recursion stack) and m is size of to_delete Set

7. Commit Message
Will be added at the end of solution.
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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function (root, to_delete) {
  // 1. Convert to_delete to Set for O(1) lookups
  const toDeleteSet = new Set(to_delete);
  const forest = [];

  // 2. Helper function for DFS traversal
  const dfs = (node, isRoot) => {
    if (!node) return null;

    // Check if current node should be deleted
    const shouldDelete = toDeleteSet.has(node.val);

    // If node is a root and not deleted, add to forest
    if (isRoot && !shouldDelete) {
      forest.push(node);
    }

    // Recursively process children
    // Children become roots if current node is deleted
    node.left = dfs(node.left, shouldDelete);
    node.right = dfs(node.right, shouldDelete);

    // Return null if node is deleted, otherwise return the node
    return shouldDelete ? null : node;
  };

  // 3. Start traversal from root (root is considered a root initially)
  dfs(root, true);

  // 4. Return the forest
  return forest;
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
 * @param {TreeNode} root
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function (root, to_delete) {
  // 1. Convert to_delete to Set for O(1) lookups
  const toDeleteSet = new Set(to_delete);
  const forest = [];

  // 2. Helper function for DFS traversal
  const dfs = (node, isRoot) => {
    if (!node) return null;

    // Check if current node should be deleted
    const shouldDelete = toDeleteSet.has(node.val);

    // If node is a root and not deleted, add to forest
    if (isRoot && !shouldDelete) {
      forest.push(node);
    }

    // Recursively process children
    // Children become roots if current node is deleted
    node.left = dfs(node.left, shouldDelete);
    node.right = dfs(node.right, shouldDelete);

    // Return null if node is deleted, otherwise return the node
    return shouldDelete ? null : node;
  };

  // 3. Start traversal from root (root is considered a root initially)
  dfs(root, true);

  // 4. Return the forest
  return forest;
};
