/*
BST Keys in a Range
Difficulty: EasyAccuracy: 60.01%Submissions: 62K+Points: 2Average Time: 20m
Given a Binary Search Tree and a range [low, high]. Find all the numbers in the BST that lie in the given range.
Note: Element greater than or equal to root go to the right side.

Example 1:

Input:
       17
     /    \
    4     18
  /   \
 2     9 
l = 4, h = 24
Output: 
4 9 17 18 
Example 2:

Input:
       16
     /    \
    7     20
  /   \
 1    10
l = 13, h = 23
Output: 
16 20 
Your Task:
You don't need to read input or print anything. Your task is to complete the function printNearNodes() which takes the root Node of the BST and the range elements low and high as inputs and returns an array that contains the BST elements in the given range low to high (inclusive) in non-decreasing order.

Constraints:
1 ≤ Number of nodes ≤ 105
1 ≤ l ≤ h ≤ 106
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
 * Solution for BST Keys in Range
 */
class Solution {
  /**
   * APPROACH 1: Inorder Traversal with Range Check
   * Time: O(n), Space: O(h)
   * Simple and intuitive approach
   */
  printNearNodes(root, low, high) {
    const result = [];

    const inorder = (node) => {
      if (!node) return;

      inorder(node.left);

      // Check if node value is within range
      if (node.val >= low && node.val <= high) {
        result.push(node.val);
      }

      inorder(node.right);
    };

    inorder(root);
    return result;
  }

  /**
   * APPROACH 2: Optimized Inorder (Skip unnecessary subtrees)
   * Time: O(k) where k is number of nodes in range, Space: O(h)
   * More efficient for large trees with small ranges
   */
  printNearNodesOptimized(root, low, high) {
    const result = [];

    const inorder = (node) => {
      if (!node) return;

      // Only go left if current node value > low
      // If current node <= low, all left nodes will be < low
      if (node.val > low) {
        inorder(node.left);
      }

      // Check if node value is within range
      if (node.val >= low && node.val <= high) {
        result.push(node.val);
      }

      // Only go right if current node value < high
      // If current node >= high, all right nodes will be > high
      if (node.val < high) {
        inorder(node.right);
      }
    };

    inorder(root);
    return result;
  }

  /**
   * APPROACH 3: Iterative Inorder Traversal
   * Time: O(n), Space: O(h)
   * Avoids recursion stack overflow for deep trees
   */
  printNearNodesIterative(root, low, high) {
    const result = [];
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

      // Check range
      if (current.val >= low && current.val <= high) {
        result.push(current.val);
      }

      // If current value > high, we can stop (all remaining will be larger)
      if (current.val > high) {
        break;
      }

      // Move to right subtree
      current = current.right;
    }

    return result;
  }

  /**
   * APPROACH 4: Morris Traversal (O(1) space)
   * Time: O(n), Space: O(1)
   * Most space efficient
   */
  printNearNodesMorris(root, low, high) {
    const result = [];
    let current = root;

    while (current !== null) {
      if (current.left === null) {
        // Process current node
        if (current.val >= low && current.val <= high) {
          result.push(current.val);
        }

        // If current > high, we can stop
        if (current.val > high) break;

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

          if (current.val >= low && current.val <= high) {
            result.push(current.val);
          }

          // If current > high, we can stop
          if (current.val > high) break;

          current = current.right;
        }
      }
    }

    return result;
  }

  /**
   * APPROACH 5: Optimized Iterative with Range-based Navigation
   * Time: O(k) where k is number of nodes in range
   * Most efficient for practical use
   */
  printNearNodesBest(root, low, high) {
    const result = [];
    const stack = [];
    let current = root;

    while (current !== null || stack.length > 0) {
      // Go left while current exists and might have values in range
      while (current !== null) {
        stack.push(current);
        // If current <= low, no need to go left (all left nodes will be smaller)
        current = current.val > low ? current.left : null;
      }

      current = stack.pop();

      // Check if current is within range
      if (current.val >= low && current.val <= high) {
        result.push(current.val);
      }

      // If current > high, we can stop
      if (current.val > high) break;

      // Go right if current < high
      current = current.val < high ? current.right : null;
    }

    return result;
  }
}

/**
 * Tree Builder and Test Cases
 */
class BSTRangeDemo {
  constructor() {
    this.solution = new Solution();
  }

  /**
   * Build Example 1 Tree:
   *       17
   *      /  \
   *     4    18
   *    / \
   *   2   9
   */
  buildExample1() {
    const root = new TreeNode(17);
    root.left = new TreeNode(4);
    root.right = new TreeNode(18);
    root.left.left = new TreeNode(2);
    root.left.right = new TreeNode(9);
    return root;
  }

  /**
   * Build Example 2 Tree:
   *       16
   *      /  \
   *     7    20
   *    / \
   *   1   10
   */
  buildExample2() {
    const root = new TreeNode(16);
    root.left = new TreeNode(7);
    root.right = new TreeNode(20);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(10);
    return root;
  }

  /**
   * Build larger test tree:
   *           50
   *        /      \
   *       30       70
   *      /  \     /  \
   *     20  40   60   80
   *    /       \     /  \
   *   10       45   75  90
   */
  buildExample3() {
    const root = new TreeNode(50);
    root.left = new TreeNode(30);
    root.right = new TreeNode(70);
    root.left.left = new TreeNode(20);
    root.left.right = new TreeNode(40);
    root.right.left = new TreeNode(60);
    root.right.right = new TreeNode(80);
    root.left.left.left = new TreeNode(10);
    root.left.right.right = new TreeNode(45);
    root.right.right.left = new TreeNode(75);
    root.right.right.right = new TreeNode(90);
    return root;
  }

  /**
   * Test Case 1: low = 4, high = 24, Expected: [4, 9, 17, 18]
   */
  testCase1() {
    console.log("=== TEST CASE 1 ===");
    const root = this.buildExample1();
    const low = 4,
      high = 24;

    console.log("Tree: [17, 4, 18, 2, 9]");
    console.log(`Range: [${low}, ${high}]`);

    const result1 = this.solution.printNearNodes(root, low, high);
    const result2 = this.solution.printNearNodesOptimized(root, low, high);
    const result3 = this.solution.printNearNodesIterative(root, low, high);
    const result4 = this.solution.printNearNodesMorris(root, low, high);
    const result5 = this.solution.printNearNodesBest(root, low, high);

    console.log(`Simple Inorder: [${result1}]`);
    console.log(`Optimized:      [${result2}]`);
    console.log(`Iterative:      [${result3}]`);
    console.log(`Morris:         [${result4}]`);
    console.log(`Best Approach:  [${result5}]`);
    console.log(`Expected:       [4, 9, 17, 18]`);

    const expected = [4, 9, 17, 18];
    const allCorrect =
      JSON.stringify(result1) === JSON.stringify(expected) &&
      JSON.stringify(result2) === JSON.stringify(expected) &&
      JSON.stringify(result3) === JSON.stringify(expected) &&
      JSON.stringify(result4) === JSON.stringify(expected) &&
      JSON.stringify(result5) === JSON.stringify(expected);

    console.log(`All Correct: ${allCorrect}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 2: low = 13, high = 23, Expected: [16, 20]
   */
  testCase2() {
    console.log("=== TEST CASE 2 ===");
    const root = this.buildExample2();
    const low = 13,
      high = 23;

    console.log("Tree: [16, 7, 20, 1, 10]");
    console.log(`Range: [${low}, ${high}]`);

    const result1 = this.solution.printNearNodes(root, low, high);
    const result2 = this.solution.printNearNodesOptimized(root, low, high);

    console.log(`Simple Inorder: [${result1}]`);
    console.log(`Optimized:      [${result2}]`);
    console.log(`Expected:       [16, 20]`);

    const expected = [16, 20];
    const bothCorrect =
      JSON.stringify(result1) === JSON.stringify(expected) &&
      JSON.stringify(result2) === JSON.stringify(expected);

    console.log(`Both Correct: ${bothCorrect}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 3: Range covers entire tree
   */
  testCase3() {
    console.log("=== TEST CASE 3: Entire Tree Range ===");
    const root = this.buildExample3();
    const low = 10,
      high = 90;

    console.log("Tree: [50, 30, 70, 20, 40, 60, 80, 10, 45, 75, 90]");
    console.log(`Range: [${low}, ${high}]`);

    const result = this.solution.printNearNodesBest(root, low, high);

    console.log(`Result: [${result}]`);
    console.log(`Expected: [10, 20, 30, 40, 45, 50, 60, 70, 75, 80, 90]`);
    console.log(`Count: ${result.length} nodes`);
    console.log();

    return result;
  }

  /**
   * Test Case 4: Very narrow range
   */
  testCase4() {
    console.log("=== TEST CASE 4: Narrow Range ===");
    const root = this.buildExample3();
    const low = 42,
      high = 48;

    console.log("Tree: [50, 30, 70, 20, 40, 60, 80, 10, 45, 75, 90]");
    console.log(`Range: [${low}, ${high}]`);

    const result1 = this.solution.printNearNodes(root, low, high);
    const result2 = this.solution.printNearNodesOptimized(root, low, high);

    console.log(`Simple Inorder: [${result1}]`);
    console.log(`Optimized:      [${result2}]`);
    console.log(`Expected:       [45]`);

    const expected = [45];
    const bothCorrect =
      JSON.stringify(result1) === JSON.stringify(expected) &&
      JSON.stringify(result2) === JSON.stringify(expected);

    console.log(`Both Correct: ${bothCorrect}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 5: Range outside tree values
   */
  testCase5() {
    console.log("=== TEST CASE 5: Range Outside Tree ===");
    const root = this.buildExample3();
    const low = 100,
      high = 200;

    console.log("Tree: [50, 30, 70, 20, 40, 60, 80, 10, 45, 75, 90]");
    console.log(`Range: [${low}, ${high}]`);

    const result = this.solution.printNearNodesBest(root, low, high);

    console.log(`Result: [${result}]`);
    console.log(`Expected: [] (empty array)`);
    console.log(`Empty: ${result.length === 0}`);
    console.log();

    return result;
  }

  /**
   * Visualize the optimized approach step by step
   */
  visualizeOptimizedApproach() {
    console.log("=== VISUALIZING OPTIMIZED APPROACH ===");

    const root = this.buildExample1();
    const low = 4,
      high = 24;

    console.log("Tree:");
    console.log("       17");
    console.log("      /  \\");
    console.log("     4    18");
    console.log("    / \\");
    console.log("   2   9");
    console.log(`\nRange: [${low}, ${high}]`);

    const result = [];
    let step = 1;

    const inorder = (node, depth = 0) => {
      if (!node) return;

      const indent = "  ".repeat(depth);
      console.log(`\n${indent}Step ${step}: Visiting node ${node.val}`);

      // Check if we should go left
      if (node.val > low) {
        console.log(`${indent}${node.val} > ${low} → Going left`);
        inorder(node.left, depth + 1);
      } else {
        console.log(
          `${indent}${node.val} <= ${low} → Skipping left (all values <= ${low})`
        );
      }

      // Check if node is in range
      if (node.val >= low && node.val <= high) {
        result.push(node.val);
        console.log(
          `${indent}${node.val} in range [${low}, ${high}] → Added to result`
        );
        console.log(`${indent}Current result: [${result}]`);
      } else {
        console.log(
          `${indent}${node.val} not in range [${low}, ${high}] → Skipped`
        );
      }

      // Check if we should go right
      if (node.val < high) {
        console.log(`${indent}${node.val} < ${high} → Going right`);
        inorder(node.right, depth + 1);
      } else {
        console.log(
          `${indent}${node.val} >= ${high} → Skipping right (all values >= ${high})`
        );
      }

      step++;
    };

    inorder(root);
    console.log(`\nFinal Result: [${result}]`);
  }

  /**
   * Performance comparison
   */
  performanceComparison() {
    console.log("=== PERFORMANCE COMPARISON ===");

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
    const low = 25000,
      high = 75000;

    console.log("Large BST created (100,000 nodes)");
    console.log(`Range: [${low}, ${high}]`);

    const approaches = [
      { name: "Simple Inorder", method: this.solution.printNearNodes },
      { name: "Optimized", method: this.solution.printNearNodesOptimized },
      { name: "Iterative", method: this.solution.printNearNodesIterative },
      { name: "Morris", method: this.solution.printNearNodesMorris },
      { name: "Best Approach", method: this.solution.printNearNodesBest },
    ];

    approaches.forEach(({ name, method }) => {
      const start = performance.now();
      const result = method.call(this.solution, largeRoot, low, high);
      const end = performance.now();

      console.log(
        `${name}: ${(end - start).toFixed(2)}ms, Found: ${result.length} nodes`
      );
    });
  }

  /**
   * Edge case: Single node tree
   */
  testEdgeCaseSingleNode() {
    console.log("=== EDGE CASE: Single Node Tree ===");

    const root = new TreeNode(5);
    const low = 3,
      high = 7;

    const result = this.solution.printNearNodesBest(root, low, high);

    console.log(`Tree: [5]`);
    console.log(`Range: [${low}, ${high}]`);
    console.log(`Result: [${result}]`);
    console.log(`Expected: [5]`);
    console.log(`Correct: ${JSON.stringify(result) === JSON.stringify([5])}`);
    console.log();

    return result;
  }

  runAllTests() {
    console.log("BST KEYS IN RANGE");
    console.log("=================\n");

    this.testCase1();
    this.testCase2();
    this.testCase3();
    this.testCase4();
    this.testCase5();
    this.testEdgeCaseSingleNode();
    this.visualizeOptimizedApproach();
    this.performanceComparison();
  }
}

/**
 * ALGORITHM EXPLANATIONS:
 *
 * APPROACH 1: Simple Inorder
 * - Perform complete inorder traversal
 * - Check each node if it's in range
 * - Simple but visits all nodes
 *
 * TIME: O(n), SPACE: O(h)
 *
 * APPROACH 2: Optimized Inorder
 * - Skip left subtree if current <= low
 * - Skip right subtree if current >= high
 * - Only visits relevant nodes
 *
 * TIME: O(k) where k is nodes in range, SPACE: O(h)
 *
 * APPROACH 3: Iterative Inorder
 * - Uses stack instead of recursion
 * - Can break early when current > high
 * - Better for deep trees
 *
 * TIME: O(n), SPACE: O(h)
 *
 * APPROACH 4: Morris Traversal
 * - O(1) space complexity
 * - Modifies tree temporarily
 * - Most space efficient
 *
 * TIME: O(n), SPACE: O(1)
 *
 * APPROACH 5: Best Approach
 * - Combines iterative with smart navigation
 * - Only explores relevant parts of tree
 * - Most efficient in practice
 *
 * TIME: O(k), SPACE: O(h)
 */

// Run the demonstration
const demo = new BSTRangeDemo();
demo.runAllTests();

/**
 * KEY INSIGHTS:
 *
 * 1. BST PROPERTY: Inorder gives sorted order, perfect for range queries
 * 2. EARLY TERMINATION: Can stop when current > high (all remaining will be larger)
 * 3. SUBTREE ELIMINATION: Skip left if current <= low, skip right if current >= high
 * 4. PRACTICAL CHOICE: Optimized iterative approach is usually best
 *
 * OPTIMIZATION STRATEGIES:
 * - Don't traverse subtrees that cannot contain values in range
 * - Stop early when you know all remaining values are outside range
 * - Use iterative approach for memory efficiency
 * - Morris traversal for O(1) space
 */
