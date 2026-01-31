/*
Iterative Inorder
Difficulty: MediumAccuracy: 80.5%Submissions: 41K+Points: 4
Given a binary tree. Find the inorder traversal of the tree without using recursion.

Examples

Input:  

Output: 4 2 5 1 3
Explanation:
Inorder traversal (Left->Root->Right) of 
the tree is 4 2 5 1 3.
Input:

Output: 1 7 10 8 6 10 5 6
Explanation:
Inorder traversal (Left->Root->Right) 
of the tree is 1 7 10 8 6 10 5 6.
 

Your task:
You don't need to read input or print anything. Your task is to complete the function inOrder() which takes the root of the tree as input and returns a list containing the inorder traversal of the tree, calculated without using recursion.

Expected time complexity: O(N)
Expected auxiliary space: O(N)


Constraints:
1 <= Number of nodes <= 105
1 <= Data of a node <= 105

Explanation

    Preorder Traversal: The root node is visited first, followed by a recursive traversal of the left subtree and then the right subtree. The structure is node, left, right.

    Inorder Traversal: The left subtree is visited first, then the root node, and finally the right subtree. The structure is left, node, right. This traversal visits nodes in non-decreasing order for a binary search tree.

    Postorder Traversal: The left subtree is visited first, then the right subtree, and finally the root node. The structure is left, right, node. This traversal is useful for deleting a tree from the bottom up.
*/

/**
 * Node class for binary tree
 */
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

/**
 * Morris Traversal for Inorder Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
class MorrisTraversal {
  /**
   * INORDER TRAVERSAL using Morris Traversal
   * @param {TreeNode} root - Root of the binary tree
   * @return {number[]} - Inorder traversal result
   */
  inorderMorris(root) {
    const result = [];
    let current = root;

    while (current !== null) {
      if (current.left === null) {
        // STEP 1: If no left child, visit current node and move to right
        result.push(current.val);
        current = current.right;
      } else {
        // STEP 2: Find the inorder predecessor (rightmost node in left subtree)
        let predecessor = current.left;

        // Move to the rightmost node of left subtree
        // But make sure we don't create a cycle
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
        }

        if (predecessor.right === null) {
          // STEP 3: Create temporary link from predecessor to current
          predecessor.right = current;
          current = current.left;
        } else {
          // STEP 4: Remove the temporary link and visit current node
          predecessor.right = null;
          result.push(current.val);
          current = current.right;
        }
      }
    }

    return result;
  }

  /**
   * VERBOSE VERSION with detailed explanations at each step
   */
  inorderMorrisVerbose(root) {
    const result = [];
    let current = root;
    let step = 1;

    console.log("=== MORRIS INORDER TRAVERSAL (Step by Step) ===");

    while (current !== null) {
      console.log(`\nStep ${step}: Current node = ${current.val}`);

      if (current.left === null) {
        // Case 1: No left child
        console.log("  → No left child, so visit current node and move right");
        result.push(current.val);
        console.log(`  → Visited: ${current.val}, Result so far: [${result}]`);
        current = current.right;
      } else {
        // Case 2: Has left child, find inorder predecessor
        let predecessor = current.left;
        console.log(
          `  → Has left child (${current.left.val}), finding inorder predecessor`
        );

        // Find the rightmost node in left subtree
        let predecessorSteps = 0;
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
          predecessorSteps++;
        }
        console.log(
          `  → Found predecessor: ${predecessor.val} (after ${predecessorSteps} right moves)`
        );

        if (predecessor.right === null) {
          // Create temporary link
          console.log(
            `  → Predecessor's right is null, creating link: ${predecessor.val} → ${current.val}`
          );
          predecessor.right = current;
          current = current.left;
          console.log(`  → Moved to left child: ${current.val}`);
        } else {
          // Remove temporary link
          console.log(
            `  → Predecessor's right points to current (cycle detected)`
          );
          console.log(`  → Removing link: ${predecessor.val} → null`);
          predecessor.right = null;
          result.push(current.val);
          console.log(
            `  → Visited: ${current.val}, Result so far: [${result}]`
          );
          current = current.right;
          console.log(
            `  → Moved to right child: ${current ? current.val : "null"}`
          );
        }
      }
      step++;
    }

    console.log("\n=== TRAVERSAL COMPLETE ===");
    return result;
  }

  /**
   * PREORDER TRAVERSAL using Morris Traversal
   */
  preorderMorris(root) {
    const result = [];
    let current = root;

    while (current !== null) {
      if (current.left === null) {
        // Visit current and move to right
        result.push(current.val);
        current = current.right;
      } else {
        // Find inorder predecessor
        let predecessor = current.left;
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
        }

        if (predecessor.right === null) {
          // Create link and visit current (preorder visit)
          result.push(current.val);
          predecessor.right = current;
          current = current.left;
        } else {
          // Remove link
          predecessor.right = null;
          current = current.right;
        }
      }
    }

    return result;
  }
}

/**
 * Tree Builder and Test Cases
 */
class TreeDemo {
  constructor() {
    this.morris = new MorrisTraversal();
  }

  /**
   * Build sample tree for testing:
   *       1
   *      / \
   *     2   3
   *    / \   \
   *   4   5   6
   */
  buildSampleTree() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    return root;
  }

  /**
   * Build another test tree:
   *       1
   *      / \
   *     2   3
   *    /   / \
   *   4   5   6
   */
  buildTestTree2() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.right.left = new TreeNode(5);
    root.right.right = new TreeNode(6);
    return root;
  }

  /**
   * Build left-skewed tree
   */
  buildLeftSkewedTree() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.left.left = new TreeNode(4);
    return root;
  }

  /**
   * Build right-skewed tree
   */
  buildRightSkewedTree() {
    const root = new TreeNode(1);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(3);
    root.right.right.right = new TreeNode(4);
    return root;
  }

  /**
   * Regular recursive inorder for verification
   */
  inorderRecursive(root) {
    const result = [];

    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.val);
      traverse(node.right);
    };

    traverse(root);
    return result;
  }

  /**
   * Test Morris traversal vs recursive
   */
  testMorrisVsRecursive() {
    console.log("=== MORRIS vs RECURSIVE INORDER COMPARISON ===");

    const trees = [
      { name: "Sample Tree", root: this.buildSampleTree() },
      { name: "Test Tree 2", root: this.buildTestTree2() },
      { name: "Left Skewed", root: this.buildLeftSkewedTree() },
      { name: "Right Skewed", root: this.buildRightSkewedTree() },
    ];

    trees.forEach(({ name, root }) => {
      console.log(`\n${name}:`);

      const recursiveResult = this.inorderRecursive(root);
      const morrisResult = this.morris.inorderMorris(root);

      console.log(`Recursive: [${recursiveResult}]`);
      console.log(`Morris:    [${morrisResult}]`);
      console.log(
        `Match: ${
          JSON.stringify(recursiveResult) === JSON.stringify(morrisResult)
        }`
      );
    });
  }

  /**
   * Step-by-step demonstration
   */
  demonstrateStepByStep() {
    console.log("\n=== STEP-BY-STEP MORRIS TRAVERSAL ===");

    const root = this.buildSampleTree();
    console.log("Tree structure:");
    console.log("       1");
    console.log("      / \\");
    console.log("     2   3");
    console.log("    / \\   \\");
    console.log("   4   5   6");
    console.log("\nExpected Inorder: [4, 2, 5, 1, 3, 6]");

    const result = this.morris.inorderMorrisVerbose(root);
    console.log(`\nFinal Result: [${result}]`);
  }

  /**
   * Visualize the tree structure with Morris links
   */
  visualizeWithMorrisLinks(root) {
    console.log("\n=== TREE STRUCTURE WITH MORRIS LINKS ===");

    const result = [];
    let current = root;
    const links = new Map(); // Track Morris links

    while (current !== null) {
      if (current.left === null) {
        result.push(current.val);
        current = current.right;
      } else {
        let predecessor = current.left;
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
        }

        if (predecessor.right === null) {
          // Store the Morris link
          links.set(predecessor.val, current.val);
          console.log(
            `Created Morris link: ${predecessor.val} → ${current.val}`
          );
          predecessor.right = current;
          current = current.left;
        } else {
          console.log(
            `Removed Morris link: ${predecessor.val} → ${current.val}`
          );
          predecessor.right = null;
          result.push(current.val);
          current = current.right;
        }
      }
    }

    console.log(`Final traversal: [${result}]`);
    return result;
  }

  /**
   * Test preorder Morris traversal
   */
  testPreorderMorris() {
    console.log("\n=== MORRIS PREORDER TRAVERSAL ===");

    const root = this.buildSampleTree();
    console.log("Tree structure:");
    console.log("       1");
    console.log("      / \\");
    console.log("     2   3");
    console.log("    / \\   \\");
    console.log("   4   5   6");

    const preorderResult = this.morris.preorderMorris(root);
    console.log(`Preorder Morris: [${preorderResult}]`);
    console.log("Expected: [1, 2, 4, 5, 3, 6]");
  }

  runAllTests() {
    console.log("MORRIS TRAVERSAL FOR BINARY TREES");
    console.log("=================================\n");

    this.testMorrisVsRecursive();
    this.demonstrateStepByStep();
    this.testPreorderMorris();

    // Additional visualization
    console.log("\n=== ADDITIONAL VISUALIZATION ===");
    const root = this.buildTestTree2();
    this.visualizeWithMorrisLinks(root);
  }
}

/**
 * ALGORITHM EXPLANATION:
 *
 * Morris Traversal cleverly uses the tree itself to simulate the recursion stack.
 *
 * KEY STEPS:
 *
 * 1. START at root
 * 2. If current node has NO LEFT CHILD:
 *    - Visit current node
 *    - Move to right child
 *
 * 3. If current node HAS LEFT CHILD:
 *    - Find inorder predecessor (rightmost node in left subtree)
 *    - If predecessor's right is NULL:
 *        * Create temporary link: predecessor.right = current
 *        * Move to left child
 *    - If predecessor's right is CURRENT (cycle detected):
 *        * Remove temporary link: predecessor.right = null
 *        * Visit current node
 *        * Move to right child
 *
 * WHY IT WORKS:
 * - The temporary links help us navigate back to parent nodes
 * - We modify the tree structure temporarily but restore it
 * - No extra space needed beyond a few pointers
 *
 * TIME COMPLEXITY: O(n)
 * - Each node is visited at least once
 * - Finding predecessors might seem O(n²) but amortized O(n)
 *
 * SPACE COMPLEXITY: O(1)
 * - Only uses a constant amount of extra space
 */

// Run the demonstration
const demo = new TreeDemo();
demo.runAllTests();

/**
 * ADVANTAGES OF MORRIS TRAVERSAL:
 *
 * 1. O(1) extra space - no recursion stack or explicit stack
 * 2. Modifies tree temporarily but restores it
 * 3. Useful in memory-constrained environments
 * 4. Elegant mathematical approach
 *
 * DISADVANTAGES:
 *
 * 1. Modifies tree during traversal (not thread-safe)
 * 2. More complex to understand
 * 3. Slightly slower constant factors due to link operations
 * 4. Not suitable if tree cannot be modified
 */
