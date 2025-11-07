/*
236. Lowest Common Ancestor of a Binary Tree
Medium
Topics
premium lock icon
Companies
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

 

Example 1:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
Example 2:


Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
Example 3:

Input: root = [1,2], p = 1, q = 2
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [2, 105].
-109 <= Node.val <= 109
All Node.val are unique.
p != q
p and q will exist in the tree.
*/

/**
 * Definition for a binary tree node.
 */
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

/**
 * Solution for Lowest Common Ancestor
 */
class Solution {
  /**
   * APPROACH 1: Recursive DFS
   * Time: O(n), Space: O(h) for recursion stack
   */
  lowestCommonAncestor(root, p, q) {
    // Base cases
    if (root === null) return null;
    if (root === p || root === q) return root;

    // Search in left and right subtrees
    const left = this.lowestCommonAncestor(root.left, p, q);
    const right = this.lowestCommonAncestor(root.right, p, q);

    // If both left and right found something, current node is LCA
    if (left !== null && right !== null) return root;

    // Otherwise return the non-null side
    return left !== null ? left : right;
  }

  /**
   * APPROACH 2: Iterative with Parent Pointers
   * Time: O(n), Space: O(n)
   */
  lowestCommonAncestorIterative(root, p, q) {
    // Stack for DFS and map to store parent pointers
    const stack = [root];
    const parent = new Map();
    parent.set(root, null);

    // Build parent pointers until we find both p and q
    while (!parent.has(p) || !parent.has(q)) {
      const node = stack.pop();

      if (node.left) {
        parent.set(node.left, node);
        stack.push(node.left);
      }
      if (node.right) {
        parent.set(node.right, node);
        stack.push(node.right);
      }
    }

    // Collect ancestors of p
    const ancestors = new Set();
    let current = p;
    while (current !== null) {
      ancestors.add(current);
      current = parent.get(current);
    }

    // Find the first common ancestor of q in p's ancestors
    current = q;
    while (!ancestors.has(current)) {
      current = parent.get(current);
    }

    return current;
  }

  /**
   * APPROACH 3: Path Comparison
   * Time: O(n), Space: O(n)
   */
  lowestCommonAncestorPath(root, p, q) {
    // Find paths to both nodes
    const pathP = this.findPath(root, p);
    const pathQ = this.findPath(root, q);

    // Find the last common node in both paths
    let lca = null;
    let i = 0;

    while (i < pathP.length && i < pathQ.length && pathP[i] === pathQ[i]) {
      lca = pathP[i];
      i++;
    }

    return lca;
  }

  /**
   * Helper to find path from root to target node
   */
  findPath(root, target) {
    const path = [];

    const dfs = (node) => {
      if (node === null) return false;

      path.push(node);

      if (node === target) return true;

      if (dfs(node.left) || dfs(node.right)) {
        return true;
      }

      path.pop();
      return false;
    };

    dfs(root);
    return path;
  }

  /**
   * APPROACH 4: Optimized Recursive with Early Termination
   */
  lowestCommonAncestorOptimized(root, p, q) {
    let result = null;

    const dfs = (node) => {
      if (node === null) return false;

      // Count how many target nodes are in the subtree
      const left = dfs(node.left) ? 1 : 0;
      const right = dfs(node.right) ? 1 : 0;
      const mid = node === p || node === q ? 1 : 0;

      // If any two of left, right, mid are 1, this is LCA
      if (left + right + mid >= 2) {
        result = node;
      }

      // Return true if any target node found in this subtree
      return left + right + mid > 0;
    };

    dfs(root);
    return result;
  }
}

/**
 * Tree Builder and Test Cases
 */
class LCADemo {
  constructor() {
    this.solution = new Solution();
  }

  /**
   * Build Example 1 Tree:
   *        3
   *       / \
   *      5   1
   *     / \ / \
   *    6  2 0  8
   *      / \
   *     7   4
   */
  buildExample1() {
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);
    root.right.left = new TreeNode(0);
    root.right.right = new TreeNode(8);
    root.left.right.left = new TreeNode(7);
    root.left.right.right = new TreeNode(4);

    return root;
  }

  /**
   * Build Example 2 Tree:
   *    1
   *   /
   *  2
   */
  buildExample2() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    return root;
  }

  /**
   * Build Example 3 Tree (same as Example 1 structure)
   */
  buildExample3() {
    return this.buildExample1(); // Same tree as example 1
  }

  /**
   * Test Case 1: p = 5, q = 1, Expected LCA = 3
   */
  testCase1() {
    console.log("=== TEST CASE 1 ===");
    const root = this.buildExample1();
    const p = root.left; // Node 5
    const q = root.right; // Node 1

    const result1 = this.solution.lowestCommonAncestor(root, p, q);
    const result2 = this.solution.lowestCommonAncestorIterative(root, p, q);
    const result3 = this.solution.lowestCommonAncestorPath(root, p, q);
    const result4 = this.solution.lowestCommonAncestorOptimized(root, p, q);

    console.log(`Input: p = ${p.val}, q = ${q.val}`);
    console.log(`Recursive: ${result1.val}`);
    console.log(`Iterative: ${result2.val}`);
    console.log(`Path: ${result3.val}`);
    console.log(`Optimized: ${result4.val}`);
    console.log(`Expected: 3`);
    console.log(
      `All Correct: ${
        result1.val === 3 &&
        result2.val === 3 &&
        result3.val === 3 &&
        result4.val === 3
      }`
    );
    console.log();

    return result1;
  }

  /**
   * Test Case 2: p = 5, q = 4, Expected LCA = 5
   */
  testCase2() {
    console.log("=== TEST CASE 2 ===");
    const root = this.buildExample1();
    const p = root.left; // Node 5
    const q = root.left.right.right; // Node 4

    const result1 = this.solution.lowestCommonAncestor(root, p, q);
    const result2 = this.solution.lowestCommonAncestorIterative(root, p, q);

    console.log(`Input: p = ${p.val}, q = ${q.val}`);
    console.log(`Recursive: ${result1.val}`);
    console.log(`Iterative: ${result2.val}`);
    console.log(`Expected: 5`);
    console.log(`Both Correct: ${result1.val === 5 && result2.val === 5}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 3: p = 1, q = 2, Expected LCA = 1
   */
  testCase3() {
    console.log("=== TEST CASE 3 ===");
    const root = this.buildExample2();
    const p = root; // Node 1
    const q = root.left; // Node 2

    const result1 = this.solution.lowestCommonAncestor(root, p, q);
    const result2 = this.solution.lowestCommonAncestorIterative(root, p, q);

    console.log(`Input: p = ${p.val}, q = ${q.val}`);
    console.log(`Recursive: ${result1.val}`);
    console.log(`Iterative: ${result2.val}`);
    console.log(`Expected: 1`);
    console.log(`Both Correct: ${result1.val === 1 && result2.val === 1}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 4: Complex case with deeper nodes
   */
  testCase4() {
    console.log("=== TEST CASE 4 ===");
    const root = this.buildExample1();
    const p = root.left.right.left; // Node 7
    const q = root.left.right.right; // Node 4

    const result1 = this.solution.lowestCommonAncestor(root, p, q);
    const result2 = this.solution.lowestCommonAncestorIterative(root, p, q);

    console.log(`Input: p = ${p.val}, q = ${q.val}`);
    console.log(`Recursive: ${result1.val}`);
    console.log(`Iterative: ${result2.val}`);
    console.log(`Expected: 2`);
    console.log(`Both Correct: ${result1.val === 2 && result2.val === 2}`);
    console.log();

    return result1;
  }

  /**
   * Visualize the recursive approach step by step
   */
  visualizeRecursiveApproach() {
    console.log("=== VISUALIZING RECURSIVE APPROACH ===");

    const root = this.buildExample1();
    const p = root.left; // Node 5
    const q = root.left.right.right; // Node 4

    console.log("Tree Structure:");
    console.log("        3");
    console.log("       / \\");
    console.log("      5   1");
    console.log("     / \\ / \\");
    console.log("    6  2 0  8");
    console.log("      / \\");
    console.log("     7   4");
    console.log(`\nFinding LCA of ${p.val} and ${q.val}`);

    const stepByStepLCA = (node, depth = 0) => {
      const indent = "  ".repeat(depth);

      if (node === null) {
        console.log(`${indent}Node: null → return null`);
        return null;
      }

      console.log(`${indent}Visiting node: ${node.val}`);

      if (node === p) {
        console.log(`${indent}Found p (${node.val}), returning node`);
        return node;
      }
      if (node === q) {
        console.log(`${indent}Found q (${node.val}), returning node`);
        return node;
      }

      console.log(`${indent}Searching left subtree...`);
      const left = stepByStepLCA(node.left, depth + 1);
      console.log(`${indent}Left result: ${left ? left.val : "null"}`);

      console.log(`${indent}Searching right subtree...`);
      const right = stepByStepLCA(node.right, depth + 1);
      console.log(`${indent}Right result: ${right ? right.val : "null"}`);

      if (left && right) {
        console.log(`${indent}Both subtrees found targets → LCA = ${node.val}`);
        return node;
      }

      const result = left || right;
      console.log(`${indent}Returning: ${result ? result.val : "null"}`);
      return result;
    };

    const result = stepByStepLCA(root);
    console.log(`\nFinal LCA: ${result.val}`);
  }

  /**
   * Performance comparison
   */
  performanceComparison() {
    console.log("=== PERFORMANCE COMPARISON ===");

    // Create a larger tree for testing
    const createLargeTree = (depth) => {
      if (depth === 0) return null;
      const node = new TreeNode(depth);
      node.left = createLargeTree(depth - 1);
      node.right = createLargeTree(depth - 1);
      return node;
    };

    const largeRoot = createLargeTree(18); // ~260,000 nodes
    const p = largeRoot.left.left;
    const q = largeRoot.right.right;

    console.log("Large tree created (~260k nodes)");

    // Test recursive approach
    let start = performance.now();
    const result1 = this.solution.lowestCommonAncestor(largeRoot, p, q);
    let end = performance.now();
    console.log(`Recursive: ${(end - start).toFixed(2)}ms`);

    // Test iterative approach
    start = performance.now();
    const result2 = this.solution.lowestCommonAncestorIterative(
      largeRoot,
      p,
      q
    );
    end = performance.now();
    console.log(`Iterative: ${(end - start).toFixed(2)}ms`);

    console.log(`Results match: ${result1 === result2}`);
  }

  runAllTests() {
    console.log("LOWEST COMMON ANCESTOR OF BINARY TREE");
    console.log("=====================================\n");

    this.testCase1();
    this.testCase2();
    this.testCase3();
    this.testCase4();
    this.visualizeRecursiveApproach();
    this.performanceComparison();
  }
}

/**
 * ALGORITHM EXPLANATIONS:
 *
 * APPROACH 1: Recursive DFS (Optimal)
 * - Traverse the tree recursively
 * - If current node is p or q, return it
 * - Recursively search left and right subtrees
 * - If both left and right return non-null, current node is LCA
 * - Otherwise return whichever side is non-null
 *
 * TIME: O(n) - Visit each node once
 * SPACE: O(h) - Recursion stack height
 *
 * APPROACH 2: Iterative with Parent Pointers
 * - Use DFS to build parent pointers map
 * - Collect all ancestors of p in a set
 * - Traverse from q upwards to find first common ancestor
 *
 * TIME: O(n) - Visit each node once
 * SPACE: O(n) - Store parent pointers and ancestors
 *
 * APPROACH 3: Path Comparison
 * - Find paths from root to p and q
 * - Compare paths to find last common node
 *
 * TIME: O(n) - Find paths and compare
 * SPACE: O(n) - Store paths
 *
 * APPROACH 4: Optimized Recursive
 * - Count target nodes in subtrees
 * - When count reaches 2, that's the LCA
 * - Early termination possible
 */

// Run the demonstration
const demo = new LCADemo();
demo.runAllTests();

/**
 * KEY INSIGHTS:
 *
 * 1. The recursive approach is the most elegant and efficient
 * 2. A node can be its own descendant in LCA definition
 * 3. If one node is ancestor of another, that node is the LCA
 * 4. The LCA is the node where paths to p and q diverge
 *
 * EDGE CASES HANDLED:
 * - p is ancestor of q (or vice versa)
 * - p and q are in different subtrees
 * - p and q are the same node (handled by definition)
 * - Tree with only two nodes
 */

class Solution {
  lowestCommonAncestor(root, p, q) {
    // Base case: if root is null or matches one of the targets
    if (!root || root === p || root === q) return root;

    // Search both left and right subtrees
    const left = this.lowestCommonAncestor(root.left, p, q);
    const right = this.lowestCommonAncestor(root.right, p, q);

    // Case 1: both found in different subtrees → current node is LCA
    if (left && right) return root;

    // Case 2: one side is null → return the non-null one
    return left ? left : right;
  }
}
