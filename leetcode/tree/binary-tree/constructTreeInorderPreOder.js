/*
Construct Tree from Inorder & Preorder
Difficulty: MediumAccuracy: 34.59%Submissions: 207K+Points: 4Average Time: 20m
Given two arrays representing the inorder and preorder traversals of a binary tree, construct the tree and return the root node of the constructed tree.

Note: The output is written in postorder traversal.

Examples:

Input: inorder[] = [1, 6, 8, 7], preorder[] = [1, 6, 7, 8]
Output: [8, 7, 6, 1]
Explanation: The tree will look like

Input: inorder[] = [3, 1, 4, 0, 2, 5], preorder[] = [0, 1, 3, 4, 2, 5]
Output: [3, 4, 1, 5, 2, 0]
Explanation: The tree will look like

Input: inorder[] = [2, 5, 4, 1, 3], preorder[] = [1, 4, 5, 2, 3]
Output: [2, 5, 4, 3, 1]
Explanation: The tree will look like

Constraints:
1 ≤ number of nodes ≤ 103
0 ≤ nodes -> data ≤ 103
Both the inorder and preorder arrays contain unique values.
*/
/*
class Node
{
    constructor(x){
        this.key = x;
        this.left = null;
        this.right = null;
    }
}
*/

/**
 * @param {number[]} inorder
 * @param {number[]} preorder
 * @return {Node}
 */
class Solution {
  buildTree(inorder, preorder) {
    let preIndex = 0;

    const build = (inStart, inEnd) => {
      if (inStart > inEnd) return null;

      // Get current node from preorder
      const currentNode = new Node(preorder[preIndex++]);

      // Find position in inorder
      const inIndex = inorder.indexOf(currentNode.key);

      // Recursively build left and right subtrees
      currentNode.left = build(inStart, inIndex - 1);
      currentNode.right = build(inIndex + 1, inEnd);

      return currentNode;
    };

    return build(0, inorder.length - 1);
  }
}

class solution1 {
  buildTree(inorder, preorder) {
    // Create a map for O(1) inorder index lookup
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
      inorderMap.set(inorder[i], i);
    }

    let preIndex = 0;
    function build(inStart, inEnd) {
      if (inStart > inEnd) return null;
      const currentNode = new Node(preorder[preIndex++]);
      const inIndex = inorderMap.get(currentNode.key);

      currentNode.left = build(inStart, inIndex - 1);
      currentNode.right = build(inIndex + 1, inEnd);

      return currentNode;
    }

    return build(0, inorder.length - 1);
  }
}
/**
 * Node class for binary tree
 */
class Node {
  constructor(x) {
    this.data = x;
    this.left = null;
    this.right = null;
  }
}

/**
 * Solution to construct binary tree from inorder and preorder traversals
 */
class Solution {
  /**
   * MAIN FUNCTION: Construct tree from inorder and preorder
   * @param {number[]} inorder - Inorder traversal array
   * @param {number[]} preorder - Preorder traversal array
   * @return {Node} - Root of constructed binary tree
   */
  buildTree(inorder, preorder) {
    // Create a map for O(1) lookup of inorder indices
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
      inorderMap.set(inorder[i], i);
    }

    // Initialize preorder index (will be shared across recursive calls)
    let preIndex = 0;

    /**
     * RECURSIVE HELPER FUNCTION to build tree
     * @param {number} inStart - Start index in inorder array
     * @param {number} inEnd - End index in inorder array
     * @return {Node} - Root of current subtree
     */
    const build = (inStart, inEnd) => {
      // Base case: no elements to process
      if (inStart > inEnd) {
        return null;
      }

      // STEP 1: Get current root from preorder (preIndex is the root)
      const rootValue = preorder[preIndex];
      const root = new Node(rootValue);
      preIndex++; // Move to next element in preorder

      // STEP 2: Find root position in inorder array
      const inIndex = inorderMap.get(rootValue);

      // STEP 3: Recursively build left and right subtrees
      // Left subtree: elements before root in inorder
      root.left = build(inStart, inIndex - 1);
      // Right subtree: elements after root in inorder
      root.right = build(inIndex + 1, inEnd);

      return root;
    };

    // Build tree from entire arrays
    return build(0, inorder.length - 1);
  }

  /**
   * UTILITY FUNCTION: Get postorder traversal (for output verification)
   * @param {Node} root - Root of the binary tree
   * @return {number[]} - Postorder traversal array
   */
  postOrder(root) {
    const result = [];

    const traverse = (node) => {
      if (!node) return;

      traverse(node.left); // Left subtree
      traverse(node.right); // Right subtree
      result.push(node.data); // Root
    };

    traverse(root);
    return result;
  }
}

/**
 * TESTING AND DEMONSTRATION
 */
class TreeConstructionDemo {
  constructor() {
    this.solution = new Solution();
  }

  /**
   * TEST CASE 1: Example from problem statement
   * inorder[] = [1, 6, 8, 7], preorder[] = [1, 6, 7, 8]
   * Expected output: [8, 7, 6, 1]
   */
  testCase1() {
    console.log("=== TEST CASE 1 ===");
    const inorder = [1, 6, 8, 7];
    const preorder = [1, 6, 7, 8];

    console.log("Input:");
    console.log("Inorder:", inorder);
    console.log("Preorder:", preorder);

    const root = this.solution.buildTree(inorder, preorder);
    const output = this.solution.postOrder(root);

    console.log("Output (Postorder):", output);
    console.log("Expected: [8, 7, 6, 1]");
    console.log(
      "Test Passed:",
      JSON.stringify(output) === JSON.stringify([8, 7, 6, 1])
    );
    console.log("\n");
  }

  /**
   * TEST CASE 2: Example from problem statement
   * inorder[] = [3, 1, 4, 0, 2, 5], preorder[] = [0, 1, 3, 4, 2, 5]
   * Expected output: [3, 4, 1, 5, 2, 0]
   */
  testCase2() {
    console.log("=== TEST CASE 2 ===");
    const inorder = [3, 1, 4, 0, 2, 5];
    const preorder = [0, 1, 3, 4, 2, 5];

    console.log("Input:");
    console.log("Inorder:", inorder);
    console.log("Preorder:", preorder);

    const root = this.solution.buildTree(inorder, preorder);
    const output = this.solution.postOrder(root);

    console.log("Output (Postorder):", output);
    console.log("Expected: [3, 4, 1, 5, 2, 0]");
    console.log(
      "Test Passed:",
      JSON.stringify(output) === JSON.stringify([3, 4, 1, 5, 2, 0])
    );
    console.log("\n");
  }

  /**
   * TEST CASE 3: Example from problem statement
   * inorder[] = [2, 5, 4, 1, 3], preorder[] = [1, 4, 5, 2, 3]
   * Expected output: [2, 5, 4, 3, 1]
   */
  testCase3() {
    console.log("=== TEST CASE 3 ===");
    const inorder = [2, 5, 4, 1, 3];
    const preorder = [1, 4, 5, 2, 3];

    console.log("Input:");
    console.log("Inorder:", inorder);
    console.log("Preorder:", preorder);

    const root = this.solution.buildTree(inorder, preorder);
    const output = this.solution.postOrder(root);

    console.log("Output (Postorder):", output);
    console.log("Expected: [2, 5, 4, 3, 1]");
    console.log(
      "Test Passed:",
      JSON.stringify(output) === JSON.stringify([2, 5, 4, 3, 1])
    );
    console.log("\n");
  }

  /**
   * EDGE CASE: Single node tree
   */
  testEdgeCaseSingleNode() {
    console.log("=== EDGE CASE: Single Node ===");
    const inorder = [5];
    const preorder = [5];

    console.log("Input:");
    console.log("Inorder:", inorder);
    console.log("Preorder:", preorder);

    const root = this.solution.buildTree(inorder, preorder);
    const output = this.solution.postOrder(root);

    console.log("Output (Postorder):", output);
    console.log("Expected: [5]");
    console.log("Test Passed:", JSON.stringify(output) === JSON.stringify([5]));
    console.log("\n");
  }

  /**
   * EDGE CASE: Left skewed tree
   */
  testEdgeCaseLeftSkewed() {
    console.log("=== EDGE CASE: Left Skewed Tree ===");
    const inorder = [4, 3, 2, 1];
    const preorder = [1, 2, 3, 4];

    console.log("Input:");
    console.log("Inorder:", inorder);
    console.log("Preorder:", preorder);

    const root = this.solution.buildTree(inorder, preorder);
    const output = this.solution.postOrder(root);

    console.log("Output (Postorder):", output);
    console.log("Expected: [4, 3, 2, 1]");
    console.log(
      "Test Passed:",
      JSON.stringify(output) === JSON.stringify([4, 3, 2, 1])
    );
    console.log("\n");
  }

  /**
   * VISUALIZATION HELPER: Print tree structure (simplified)
   */
  printTreeStructure(root, prefix = "", isLeft = true) {
    if (root === null) {
      return;
    }

    console.log(prefix + (isLeft ? "├── " : "└── ") + root.data);

    if (root.left !== null || root.right !== null) {
      this.printTreeStructure(
        root.left,
        prefix + (isLeft ? "│   " : "    "),
        true
      );
      this.printTreeStructure(
        root.right,
        prefix + (isLeft ? "│   " : "    "),
        false
      );
    }
  }

  /**
   * Run all tests
   */
  runAllTests() {
    console.log("CONSTRUCT BINARY TREE FROM INORDER & PREORDER");
    console.log("=============================================\n");

    this.testCase1();
    this.testCase2();
    this.testCase3();
    this.testEdgeCaseSingleNode();
    this.testEdgeCaseLeftSkewed();

    console.log("=== TREE VISUALIZATION (Test Case 1) ===");
    const inorder1 = [1, 6, 8, 7];
    const preorder1 = [1, 6, 7, 8];
    const root1 = this.solution.buildTree(inorder1, preorder1);
    this.printTreeStructure(root1);
  }
}

/**
 * ALGORITHM EXPLANATION:
 *
 * STEP 1: The first element in preorder is always the root
 * STEP 2: Find this root in inorder array
 * STEP 3: Elements left of root in inorder form left subtree
 * STEP 4: Elements right of root in inorder form right subtree
 * STEP 5: Recursively apply same process to left and right subtrees
 *
 * TIME COMPLEXITY: O(n) - We process each node exactly once
 * SPACE COMPLEXITY: O(n) - For the hashmap and recursion stack
 *
 * The key insight is using preorder to determine the root and
 * inorder to determine the left/right subtree boundaries.
 */

// Run the demonstration
const demo = new TreeConstructionDemo();
demo.runAllTests();
