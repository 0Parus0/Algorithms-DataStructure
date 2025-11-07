/*
783. Minimum Distance Between BST Nodes
Easy
Topics
premium lock icon
Companies
Given the root of a Binary Search Tree (BST), return the minimum difference between the values of any two different nodes in the tree.

 

Example 1:


Input: root = [4,2,6,1,3]
Output: 1
Example 2:


Input: root = [1,0,48,null,null,12,49]
Output: 1
 

Constraints:

The number of nodes in the tree is in the range [2, 100].
0 <= Node.val <= 105
*/

function minDiffInBST(root) {
  let minDiff = Infinity;
  let prev = null;

  function inorder(node) {
    if (!node) return;
    inorder(node.left);

    if (prev !== null) {
      minDiff = Math.min(minDiff, node.val - prev);
    }
    prev = node.val;
    inorder(node.right);
  }

  inorder(root);
  return minDiff;
}
/**
 * Definition for a binary tree node.
 */
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Solution for Minimum Distance Between BST Nodes
 */
class Solution {
  /**
   * APPROACH 1: Inorder Traversal (Recursive) with Array
   * Time: O(n), Space: O(n)
   */
  minDiffInBST(root) {
    const values = [];

    // Inorder traversal to get sorted values
    const inorder = (node) => {
      if (!node) return;
      inorder(node.left);
      values.push(node.val);
      inorder(node.right);
    };

    inorder(root);

    // Find minimum difference between consecutive values
    let minDiff = Infinity;
    for (let i = 1; i < values.length; i++) {
      minDiff = Math.min(minDiff, values[i] - values[i - 1]);
    }

    return minDiff;
  }

  /**
   * APPROACH 2: Inorder Traversal with Previous Value (Optimal)
   * Time: O(n), Space: O(h) for recursion
   */
  minDiffInBSTOptimal(root) {
    let minDiff = Infinity;
    let prev = null;

    const inorder = (node) => {
      if (!node) return;

      inorder(node.left);

      // Process current node
      if (prev !== null) {
        minDiff = Math.min(minDiff, node.val - prev);
      }
      prev = node.val;

      inorder(node.right);
    };

    inorder(root);
    return minDiff;
  }

  /**
   * APPROACH 3: Iterative Inorder Traversal
   * Time: O(n), Space: O(h)
   */
  minDiffInBSTIterative(root) {
    let minDiff = Infinity;
    let prev = null;
    const stack = [];
    let current = root;

    while (current !== null || stack.length > 0) {
      // Go to the leftmost node
      while (current !== null) {
        stack.push(current);
        current = current.left;
      }

      // Process node
      current = stack.pop();

      if (prev !== null) {
        minDiff = Math.min(minDiff, current.val - prev);
      }
      prev = current.val;

      // Move to right subtree
      current = current.right;
    }

    return minDiff;
  }

  /**
   * APPROACH 4: Morris Traversal (O(1) space)
   * Time: O(n), Space: O(1)
   */
  minDiffInBSTMorris(root) {
    let minDiff = Infinity;
    let prev = null;
    let current = root;

    while (current !== null) {
      if (current.left === null) {
        // Process current node
        if (prev !== null) {
          minDiff = Math.min(minDiff, current.val - prev);
        }
        prev = current.val;
        current = current.right;
      } else {
        // Find inorder predecessor
        let predecessor = current.left;
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
        }

        if (predecessor.right === null) {
          // Create temporary link
          predecessor.right = current;
          current = current.left;
        } else {
          // Remove temporary link and process current
          predecessor.right = null;
          if (prev !== null) {
            minDiff = Math.min(minDiff, current.val - prev);
          }
          prev = current.val;
          current = current.right;
        }
      }
    }

    return minDiff;
  }

  /**
   * APPROACH 5: DFS with Range (Alternative approach)
   * Time: O(n), Space: O(h)
   */
  minDiffInBSTDFS(root) {
    let minDiff = Infinity;

    const dfs = (node, lower, upper) => {
      if (!node) return;

      if (lower !== null) {
        minDiff = Math.min(minDiff, node.val - lower);
      }
      if (upper !== null) {
        minDiff = Math.min(minDiff, upper - node.val);
      }

      dfs(node.left, lower, node.val);
      dfs(node.right, node.val, upper);
    };

    dfs(root, null, null);
    return minDiff;
  }
}

/**
 * Tree Builder and Test Cases
 */
class MinDistanceDemo {
  constructor() {
    this.solution = new Solution();
  }

  /**
   * Build Example 1 Tree: [4,2,6,1,3]
   *        4
   *       / \
   *      2   6
   *     / \
   *    1   3
   */
  buildExample1() {
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    return root;
  }

  /**
   * Build Example 2 Tree: [1,0,48,null,null,12,49]
   *        1
   *       / \
   *      0   48
   *          / \
   *         12  49
   */
  buildExample2() {
    const root = new TreeNode(1);
    root.left = new TreeNode(0);
    root.right = new TreeNode(48);
    root.right.left = new TreeNode(12);
    root.right.right = new TreeNode(49);
    return root;
  }

  /**
   * Build custom test case: [90,69,null,49,89,null,52]
   *        90
   *       /
   *      69
   *     / \
   *    49  89
   *     \
   *      52
   */
  buildExample3() {
    const root = new TreeNode(90);
    root.left = new TreeNode(69);
    root.left.left = new TreeNode(49);
    root.left.right = new TreeNode(89);
    root.left.left.right = new TreeNode(52);
    return root;
  }

  /**
   * Test Case 1: [4,2,6,1,3] -> Expected: 1
   */
  testCase1() {
    console.log("=== TEST CASE 1 ===");
    const root = this.buildExample1();

    const result1 = this.solution.minDiffInBST(root);
    const result2 = this.solution.minDiffInBSTOptimal(root);
    const result3 = this.solution.minDiffInBSTIterative(root);
    const result4 = this.solution.minDiffInBSTMorris(root);
    const result5 = this.solution.minDiffInBSTDFS(root);

    console.log("Tree: [4,2,6,1,3]");
    console.log(`Array Approach: ${result1}`);
    console.log(`Optimal Recursive: ${result2}`);
    console.log(`Iterative: ${result3}`);
    console.log(`Morris: ${result4}`);
    console.log(`DFS with Range: ${result5}`);
    console.log(`Expected: 1`);
    console.log(
      `All Correct: ${
        result1 === 1 &&
        result2 === 1 &&
        result3 === 1 &&
        result4 === 1 &&
        result5 === 1
      }`
    );
    console.log();

    return result1;
  }

  /**
   * Test Case 2: [1,0,48,null,null,12,49] -> Expected: 1
   */
  testCase2() {
    console.log("=== TEST CASE 2 ===");
    const root = this.buildExample2();

    const result1 = this.solution.minDiffInBST(root);
    const result2 = this.solution.minDiffInBSTOptimal(root);

    console.log("Tree: [1,0,48,null,null,12,49]");
    console.log(`Array Approach: ${result1}`);
    console.log(`Optimal Recursive: ${result2}`);
    console.log(`Expected: 1`);
    console.log(`Both Correct: ${result1 === 1 && result2 === 1}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 3: [90,69,null,49,89,null,52] -> Expected: 1
   */
  testCase3() {
    console.log("=== TEST CASE 3 ===");
    const root = this.buildExample3();

    const result1 = this.solution.minDiffInBST(root);
    const result2 = this.solution.minDiffInBSTOptimal(root);

    console.log("Tree: [90,69,null,49,89,null,52]");
    console.log(`Array Approach: ${result1}`);
    console.log(`Optimal Recursive: ${result2}`);
    console.log(`Expected: 1`);
    console.log(`Both Correct: ${result1 === 1 && result2 === 1}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 4: Simple two-node tree [2,1,3] -> Expected: 1
   */
  testCase4() {
    console.log("=== TEST CASE 4 ===");
    const root = new TreeNode(2);
    root.left = new TreeNode(1);
    root.right = new TreeNode(3);

    const result = this.solution.minDiffInBSTOptimal(root);

    console.log("Tree: [2,1,3]");
    console.log(`Result: ${result}`);
    console.log(`Expected: 1`);
    console.log(`Correct: ${result === 1}`);
    console.log();

    return result;
  }

  /**
   * Visualize the optimal approach step by step
   */
  visualizeOptimalApproach() {
    console.log("=== VISUALIZING OPTIMAL APPROACH ===");

    const root = this.buildExample1();
    console.log("Tree: [4,2,6,1,3]");
    console.log("Inorder traversal gives: [1,2,3,4,6]");
    console.log("Consecutive differences: [1,1,1,2]");
    console.log("Minimum difference: 1\n");

    let minDiff = Infinity;
    let prev = null;
    let step = 1;

    const inorder = (node, depth = 0) => {
      if (!node) return;

      const indent = "  ".repeat(depth);
      console.log(`${indent}Step ${step}: Visiting node ${node.val}`);

      // Process left subtree
      console.log(`${indent}Going left...`);
      inorder(node.left, depth + 1);

      // Process current node
      if (prev !== null) {
        const diff = node.val - prev;
        console.log(`${indent}Comparing ${node.val} - ${prev} = ${diff}`);
        minDiff = Math.min(minDiff, diff);
        console.log(`${indent}Current minDiff: ${minDiff}`);
      } else {
        console.log(`${indent}First node, setting prev to ${node.val}`);
      }
      prev = node.val;
      step++;

      // Process right subtree
      console.log(`${indent}Going right...`);
      inorder(node.right, depth + 1);
    };

    inorder(root);
    console.log(`\nFinal minDiff: ${minDiff}`);
  }

  /**
   * Performance comparison
   */
  performanceComparison() {
    console.log("=== PERFORMANCE COMPARISON ===");

    // Create a larger BST
    const createBST = (start, end) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new TreeNode(mid);
      node.left = createBST(start, mid - 1);
      node.right = createBST(mid + 1, end);
      return node;
    };

    const largeRoot = createBST(1, 10000); // 10,000 nodes
    console.log("Large BST created (10,000 nodes)");

    // Test different approaches
    const approaches = [
      { name: "Array Approach", method: this.solution.minDiffInBST },
      { name: "Optimal Recursive", method: this.solution.minDiffInBSTOptimal },
      { name: "Iterative", method: this.solution.minDiffInBSTIterative },
      { name: "Morris", method: this.solution.minDiffInBSTMorris },
      { name: "DFS Range", method: this.solution.minDiffInBSTDFS },
    ];

    approaches.forEach(({ name, method }) => {
      // Create a fresh tree for each test
      const testRoot = createBST(1, 10000);

      const start = performance.now();
      const result = method.call(this.solution, testRoot);
      const end = performance.now();

      console.log(`${name}: ${(end - start).toFixed(2)}ms, Result: ${result}`);
    });
  }

  /**
   * Edge case: All nodes have same value (not possible due to BST property)
   * But test with very close values
   */
  testEdgeCase() {
    console.log("=== EDGE CASE: Very Close Values ===");

    // Create BST with values very close to each other
    const root = new TreeNode(1000);
    root.left = new TreeNode(999);
    root.right = new TreeNode(1001);
    root.left.left = new TreeNode(998);
    root.right.right = new TreeNode(1002);

    const result = this.solution.minDiffInBSTOptimal(root);

    console.log("Tree with values: [998, 999, 1000, 1001, 1002]");
    console.log(`Minimum difference: ${result}`);
    console.log(`Expected: 1`);
    console.log();

    return result;
  }

  runAllTests() {
    console.log("MINIMUM DISTANCE BETWEEN BST NODES");
    console.log("==================================\n");

    this.testCase1();
    this.testCase2();
    this.testCase3();
    this.testCase4();
    this.testEdgeCase();
    this.visualizeOptimalApproach();
    this.performanceComparison();
  }
}

/**
 * ALGORITHM EXPLANATIONS:
 *
 * APPROACH 1: Inorder Traversal with Array
 * - Perform inorder traversal to get sorted values
 * - Store all values in array
 * - Find min difference between consecutive elements
 *
 * TIME: O(n), SPACE: O(n)
 *
 * APPROACH 2: Inorder with Previous Pointer (Optimal)
 * - Perform inorder traversal
 * - Track previous node value
 * - Update minDiff when visiting each node
 * - Most efficient in practice
 *
 * TIME: O(n), SPACE: O(h) for recursion
 *
 * APPROACH 3: Iterative Inorder
 * - Use stack for iterative inorder traversal
 * - Track previous value and update minDiff
 * - Avoids recursion stack overflow
 *
 * TIME: O(n), SPACE: O(h)
 *
 * APPROACH 4: Morris Traversal
 * - Inorder traversal with O(1) space
 * - Uses temporary links to navigate tree
 * - Most space efficient
 *
 * TIME: O(n), SPACE: O(1)
 *
 * APPROACH 5: DFS with Range
 * - Track lower and upper bounds for each node
 * - Calculate differences with bounds
 * - Alternative approach, less intuitive
 *
 * TIME: O(n), SPACE: O(h)
 */

// Run the demonstration
const demo = new MinDistanceDemo();
demo.runAllTests();

/**
 * KEY INSIGHTS:
 *
 * 1. BST property ensures inorder traversal gives sorted order
 * 2. Minimum difference must be between consecutive nodes in inorder
 * 3. No need to compare non-consecutive nodes
 * 4. Optimal approach uses O(h) space, Morris uses O(1) space
 * 5. All approaches have O(n) time complexity
 *
 * WHY IT WORKS:
 * - In BST: left < root < right
 * - Inorder: left → root → right gives sorted order
 * - Minimum gap in sorted array is between consecutive elements
 * - Therefore, we only need to compare consecutive nodes in inorder
 */
