/*
Lowest Common Ancestor in a BST
Difficulty: MediumAccuracy: 65.2%Submissions: 180K+Points: 4Average Time: 20m
Given the root of a Binary Search Tree (with all values unique) and two nodes n1 and n2 (n1 != n2). You may assume that both nodes exist in the tree. Find the Lowest Common Ancestor (LCA) of the given two nodes in the BST.

Note: LCA between two nodes n1 and n2 is defined as the deepest node that has both n1 and n2 as descendants (where we allow a node to be a descendant of itself).

Examples:

Input: root = [5, 4, 6, 3, N, N, 7, N, N, N, 8], n1->data = 7, n2->data = 8
      
Output: 7
Explanation: 7 is the lowest node that has both 7 and 8 as descendants.
Input: root = [20, 8, 22, 4, 12, N, N, N, N, 10, 14], n1->data = 8, n2->data = 14
           
Output: 8
Explanation: 8 is the lowest node that has both 8 and 14 as descendants.
Input: root = [2, 1, 3], n1->data = 1, n2->data = 3
        
Output: 2
Explanation: 2 is the lowest node that has both 1 and 3 as descendants.
Constraints:
1 ≤ number of nodes ≤ 105
1 ≤ node->data ≤ 105
1 ≤ n1->data, n2->data ≤ 105
*/

class Solution {
  LCA(root, n1, n2) {
    let current = root;

    while (current) {
      if (n1 < current.data && n2 < current.data) {
        // Both on left
        current = current.left;
      } else if (n1 > current.data && n2 > current.data) {
        // Both on right
        current = current.right;
      } else {
        // Split point (LCA found)
        return current;
      }
    }

    return null; // Should not happen if both nodes exist
  }
}
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
 * Solution for Lowest Common Ancestor in BST
 */
class Solution {
  /**
   * APPROACH 1: Iterative using BST Property (Optimal for BST)
   * Time: O(h), Space: O(1)
   *
   * Key Insight: In BST, LCA is the node where n1 and n2 split into different subtrees
   * If both n1 and n2 are smaller than root, LCA is in left subtree
   * If both n1 and n2 are larger than root, LCA is in right subtree
   * Otherwise, current root is LCA
   */
  LCAinBST(root, n1, n2) {
    let current = root;

    while (current !== null) {
      // If both values are smaller, LCA is in left subtree
      if (n1.val < current.val && n2.val < current.val) {
        current = current.left;
      }
      // If both values are larger, LCA is in right subtree
      else if (n1.val > current.val && n2.val > current.val) {
        current = current.right;
      }
      // Otherwise, we found the split point (LCA)
      else {
        return current;
      }
    }

    return null; // Should never reach here as nodes exist
  }

  /**
   * APPROACH 2: Recursive using BST Property
   * Time: O(h), Space: O(h) for recursion stack
   */
  LCAinBSTRecursive(root, n1, n2) {
    // Base case
    if (root === null) return null;

    // If both n1 and n2 are smaller than root, LCA lies in left subtree
    if (n1.val < root.val && n2.val < root.val) {
      return this.LCAinBSTRecursive(root.left, n1, n2);
    }

    // If both n1 and n2 are greater than root, LCA lies in right subtree
    if (n1.val > root.val && n2.val > root.val) {
      return this.LCAinBSTRecursive(root.right, n1, n2);
    }

    // We have found the split point, this is LCA
    return root;
  }

  /**
   * APPROACH 3: General Binary Tree Approach (works for any binary tree)
   * Time: O(n), Space: O(h)
   */
  LCAinBSTGeneral(root, n1, n2) {
    // Base cases
    if (root === null) return null;
    if (root === n1 || root === n2) return root;

    // Search in left and right subtrees
    const left = this.LCAinBSTGeneral(root.left, n1, n2);
    const right = this.LCAinBSTGeneral(root.right, n1, n2);

    // If both subtrees return non-null, current node is LCA
    if (left !== null && right !== null) return root;

    // Otherwise return the non-null side
    return left !== null ? left : right;
  }

  /**
   * APPROACH 4: Path Comparison
   * Time: O(n), Space: O(n)
   */
  LCAinBSTPath(root, n1, n2) {
    // Find paths from root to n1 and n2
    const path1 = this.findPath(root, n1);
    const path2 = this.findPath(root, n2);

    // Find the last common node in both paths
    let lca = null;
    let i = 0;

    while (i < path1.length && i < path2.length && path1[i] === path2[i]) {
      lca = path1[i];
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

      // Use BST property to search efficiently
      if (target.val < node.val) {
        if (dfs(node.left)) return true;
      } else {
        if (dfs(node.right)) return true;
      }

      path.pop();
      return false;
    };

    dfs(root);
    return path;
  }
}

/**
 * Tree Builder and Test Cases
 */
class LCABSTDemo {
  constructor() {
    this.solution = new Solution();
  }

  /**
   * Build Example 1 Tree: [5, 4, 6, 3, null, null, 7, null, null, null, 8]
   * Tree structure:
   *        5
   *       / \
   *      4   6
   *     /     \
   *    3       7
   *             \
   *              8
   */
  buildExample1() {
    const root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(3);
    root.right.right = new TreeNode(7);
    root.right.right.right = new TreeNode(8);
    return root;
  }

  /**
   * Build Example 2 Tree: [20, 8, 22, 4, 12, null, null, null, null, 10, 14]
   * Tree structure:
   *        20
   *       /  \
   *      8    22
   *     / \
   *    4   12
   *       /  \
   *      10   14
   */
  buildExample2() {
    const root = new TreeNode(20);
    root.left = new TreeNode(8);
    root.right = new TreeNode(22);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(12);
    root.left.right.left = new TreeNode(10);
    root.left.right.right = new TreeNode(14);
    return root;
  }

  /**
   * Build Example 3 Tree: [2, 1, 3]
   * Tree structure:
   *       2
   *      / \
   *     1   3
   */
  buildExample3() {
    const root = new TreeNode(2);
    root.left = new TreeNode(1);
    root.right = new TreeNode(3);
    return root;
  }

  /**
   * Test Case 1: n1 = 7, n2 = 8, Expected LCA = 7
   */
  testCase1() {
    console.log("=== TEST CASE 1 ===");
    const root = this.buildExample1();
    const n1 = root.right.right; // Node 7
    const n2 = root.right.right.right; // Node 8

    console.log("Tree: [5, 4, 6, 3, null, null, 7, null, null, null, 8]");
    console.log(`Finding LCA of ${n1.val} and ${n2.val}`);

    const result1 = this.solution.LCAinBST(root, n1, n2);
    const result2 = this.solution.LCAinBSTRecursive(root, n1, n2);
    const result3 = this.solution.LCAinBSTGeneral(root, n1, n2);
    const result4 = this.solution.LCAinBSTPath(root, n1, n2);

    console.log(`Iterative BST: ${result1.val}`);
    console.log(`Recursive BST: ${result2.val}`);
    console.log(`General Approach: ${result3.val}`);
    console.log(`Path Approach: ${result4.val}`);
    console.log(`Expected: 7`);
    console.log(
      `All Correct: ${
        result1.val === 7 &&
        result2.val === 7 &&
        result3.val === 7 &&
        result4.val === 7
      }`
    );
    console.log();

    return result1;
  }

  /**
   * Test Case 2: n1 = 8, n2 = 14, Expected LCA = 8
   */
  testCase2() {
    console.log("=== TEST CASE 2 ===");
    const root = this.buildExample2();
    const n1 = root.left; // Node 8
    const n2 = root.left.right.right; // Node 14

    console.log("Tree: [20, 8, 22, 4, 12, null, null, null, null, 10, 14]");
    console.log(`Finding LCA of ${n1.val} and ${n2.val}`);

    const result1 = this.solution.LCAinBST(root, n1, n2);
    const result2 = this.solution.LCAinBSTRecursive(root, n1, n2);

    console.log(`Iterative BST: ${result1.val}`);
    console.log(`Recursive BST: ${result2.val}`);
    console.log(`Expected: 8`);
    console.log(`Both Correct: ${result1.val === 8 && result2.val === 8}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 3: n1 = 1, n2 = 3, Expected LCA = 2
   */
  testCase3() {
    console.log("=== TEST CASE 3 ===");
    const root = this.buildExample3();
    const n1 = root.left; // Node 1
    const n2 = root.right; // Node 3

    console.log("Tree: [2, 1, 3]");
    console.log(`Finding LCA of ${n1.val} and ${n2.val}`);

    const result1 = this.solution.LCAinBST(root, n1, n2);
    const result2 = this.solution.LCAinBSTRecursive(root, n1, n2);

    console.log(`Iterative BST: ${result1.val}`);
    console.log(`Recursive BST: ${result2.val}`);
    console.log(`Expected: 2`);
    console.log(`Both Correct: ${result1.val === 2 && result2.val === 2}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 4: Both nodes in left subtree
   */
  testCase4() {
    console.log("=== TEST CASE 4 ===");
    const root = this.buildExample2();
    const n1 = root.left.left; // Node 4
    const n2 = root.left.right.left; // Node 10

    console.log("Tree: [20, 8, 22, 4, 12, null, null, null, null, 10, 14]");
    console.log(`Finding LCA of ${n1.val} and ${n2.val}`);

    const result1 = this.solution.LCAinBST(root, n1, n2);
    const result2 = this.solution.LCAinBSTRecursive(root, n1, n2);

    console.log(`Iterative BST: ${result1.val}`);
    console.log(`Recursive BST: ${result2.val}`);
    console.log(`Expected: 8`);
    console.log(`Both Correct: ${result1.val === 8 && result2.val === 8}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 5: One node is ancestor of another
   */
  testCase5() {
    console.log("=== TEST CASE 5 ===");
    const root = this.buildExample2();
    const n1 = root.left.right; // Node 12
    const n2 = root.left.right.right; // Node 14

    console.log("Tree: [20, 8, 22, 4, 12, null, null, null, null, 10, 14]");
    console.log(`Finding LCA of ${n1.val} and ${n2.val}`);

    const result1 = this.solution.LCAinBST(root, n1, n2);
    const result2 = this.solution.LCAinBSTRecursive(root, n1, n2);

    console.log(`Iterative BST: ${result1.val}`);
    console.log(`Recursive BST: ${result2.val}`);
    console.log(`Expected: 12`);
    console.log(`Both Correct: ${result1.val === 12 && result2.val === 12}`);
    console.log();

    return result1;
  }

  /**
   * Visualize the iterative BST approach step by step
   */
  visualizeIterativeApproach() {
    console.log("=== VISUALIZING ITERATIVE BST APPROACH ===");

    const root = this.buildExample2();
    const n1 = root.left; // Node 8
    const n2 = root.left.right.right; // Node 14

    console.log("Tree:");
    console.log("        20");
    console.log("       /  \\");
    console.log("      8    22");
    console.log("     / \\");
    console.log("    4   12");
    console.log("       /  \\");
    console.log("      10   14");
    console.log(`\nFinding LCA of ${n1.val} and ${n2.val}`);

    let current = root;
    let step = 1;

    while (current !== null) {
      console.log(`\nStep ${step}: Current node = ${current.val}`);

      if (n1.val < current.val && n2.val < current.val) {
        console.log(
          `  Both ${n1.val} and ${n2.val} are smaller than ${current.val}`
        );
        console.log(`  → Moving to left child: ${current.left.val}`);
        current = current.left;
      } else if (n1.val > current.val && n2.val > current.val) {
        console.log(
          `  Both ${n1.val} and ${n2.val} are larger than ${current.val}`
        );
        console.log(
          `  → Moving to right child: ${
            current.right ? current.right.val : "null"
          }`
        );
        current = current.right;
      } else {
        console.log(`  ${n1.val} and ${n2.val} split at ${current.val}`);
        console.log(`  → Found LCA: ${current.val}`);
        break;
      }

      step++;
    }
  }

  /**
   * Performance comparison
   */
  performanceComparison() {
    console.log("\n=== PERFORMANCE COMPARISON ===");

    // Create a large BST
    const createBST = (start, end) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new TreeNode(mid);
      node.left = createBST(start, mid - 1);
      node.right = createBST(mid + 1, end);
      return node;
    };

    const largeRoot = createBST(1, 100000); // 100,000 nodes
    const n1 = this.findNode(largeRoot, 25000);
    const n2 = this.findNode(largeRoot, 75000);

    console.log("Large BST created (100,000 nodes)");

    const approaches = [
      { name: "Iterative BST", method: this.solution.LCAinBST },
      { name: "Recursive BST", method: this.solution.LCAinBSTRecursive },
      { name: "General Approach", method: this.solution.LCAinBSTGeneral },
      { name: "Path Approach", method: this.solution.LCAinBSTPath },
    ];

    approaches.forEach(({ name, method }) => {
      const start = performance.now();
      const result = method.call(this.solution, largeRoot, n1, n2);
      const end = performance.now();

      console.log(`${name}: ${(end - start).toFixed(2)}ms, LCA: ${result.val}`);
    });
  }

  /**
   * Helper to find node by value in BST
   */
  findNode(root, value) {
    let current = root;
    while (current !== null) {
      if (value === current.val) return current;
      if (value < current.val) current = current.left;
      else current = current.right;
    }
    return null;
  }

  /**
   * Edge case: Same node (shouldn't happen per constraints)
   */
  testEdgeCaseSameNode() {
    console.log("=== EDGE CASE: Same Node (Testing Robustness) ===");

    const root = this.buildExample3();
    const n1 = root.left; // Node 1

    try {
      const result = this.solution.LCAinBST(root, n1, n1);
      console.log(`LCA of same node ${n1.val}: ${result.val}`);
      console.log("Expected: The node itself");
    } catch (error) {
      console.log("Error:", error.message);
    }
    console.log();
  }

  runAllTests() {
    console.log("LOWEST COMMON ANCESTOR IN BST");
    console.log("=============================\n");

    this.testCase1();
    this.testCase2();
    this.testCase3();
    this.testCase4();
    this.testCase5();
    this.testEdgeCaseSameNode();
    this.visualizeIterativeApproach();
    this.performanceComparison();
  }
}

/**
 * ALGORITHM EXPLANATIONS:
 *
 * APPROACH 1: Iterative BST Property (OPTIMAL)
 * - Use BST property: left < root < right
 * - If both nodes are smaller than current, go left
 * - If both nodes are larger than current, go right
 * - Otherwise, current is LCA (split point)
 *
 * TIME: O(h) where h is tree height
 * SPACE: O(1)
 *
 * APPROACH 2: Recursive BST Property
 * - Same logic as iterative but recursive
 * - Cleaner code but uses recursion stack
 *
 * TIME: O(h), SPACE: O(h)
 *
 * APPROACH 3: General Binary Tree
 * - Works for any binary tree (not just BST)
 * - Search both subtrees recursively
 * - Less efficient for BST but more general
 *
 * TIME: O(n), SPACE: O(h)
 *
 * APPROACH 4: Path Comparison
 * - Find paths from root to both nodes
 * - Compare paths to find last common node
 * - Useful when you need the actual paths
 *
 * TIME: O(n), SPACE: O(n)
 */

// Run the demonstration
const demo = new LCABSTDemo();
demo.runAllTests();

/**
 * KEY INSIGHTS FOR BST LCA:
 *
 * 1. BST PROPERTY IS KEY: We can use value comparisons to navigate efficiently
 * 2. SPLIT POINT: LCA is where the paths to n1 and n2 diverge
 * 3. EFFICIENCY: BST-specific approaches are O(h) vs O(n) for general approaches
 * 4. PRACTICAL CHOICE: Iterative BST approach is usually best - O(h) time, O(1) space
 *
 * WHY BST APPROACH IS BETTER:
 * - Doesn't need to search entire tree
 * - Uses binary search property
 * - Much faster for balanced trees (O(log n) vs O(n))
 * - Constant space for iterative version
 */
