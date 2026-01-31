/*
Preorder traversal (Iterative)
Difficulty: MediumAccuracy: 81.12%Submissions: 41K+Points: 4
Given a Binary tree. Find the preorder traversal of the tree without using recursion.


Example 1:

Input:
           1
         /   \
        2     3
      /  \
     4    5
Output: 1 2 4 5 3
Explanation:
Preorder traversal (Root->Left->Right) of 
the tree is 1 2 4 5 3.
Example 2

Input:
            8
          /   \
         1      5
          \    /  \
           7  10   6
            \  /
            10 6
Output: 8 1 7 10 5 10 6 6 
Explanation:
Preorder traversal (Root->Left->Right) 
of the tree is 8 1 7 10 5 10 6 6.
 

Your task:

You don't need to read input or print anything. Your task is to complete the function preOrder() which takes the root of the tree as input and returns a list containing the preorder traversal of the tree, calculated without using recursion.


Expected time complexity: O(N)
Expected auxiliary space: O(N)


Constraints:
1 ≤ Number of nodes ≤ 105
1 ≤ Data of a node ≤ 105

Explanation

    Preorder Traversal: The root node is visited first, followed by a recursive traversal of the left subtree and then the right subtree. The structure is node, left, right.

    Inorder Traversal: The left subtree is visited first, then the root node, and finally the right subtree. The structure is left, node, right. This traversal visits nodes in non-decreasing order for a binary search tree.

    Postorder Traversal: The left subtree is visited first, then the right subtree, and finally the root node. The structure is left, right, node. This traversal is useful for deleting a tree from the bottom up.
*/
class Solution {
  preOrder(root) {
    const result = [];
    let current = root;

    while (current !== null) {
      if (current.left === null) {
        result.push(current.data);
        current = current.right;
      } else {
        // Find inorder predecessor
        let predecessor = current.left;
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
        }

        if (predecessor.right === null) {
          predecessor.right = current; // Create temporary link
          result.push(current.data); // Visit before going left (preorder)
          current = current.left;
        } else {
          predecessor.right = null; // Revert temporary link
          current = current.right;
        }
      }
    }

    return result;
  }
}
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
 * Morris Traversal for Preorder Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
class MorrisPreorderTraversal {
  /**
   * PREORDER TRAVERSAL using Morris Traversal
   * @param {TreeNode} root - Root of the binary tree
   * @return {number[]} - Preorder traversal result
   */
  preorderMorris(root) {
    const result = [];
    let current = root;

    while (current !== null) {
      if (current.left === null) {
        // CASE 1: No left child
        // Visit current node and move to right
        result.push(current.val);
        current = current.right;
      } else {
        // CASE 2: Has left child, find inorder predecessor
        let predecessor = current.left;

        // Find the rightmost node in left subtree
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
        }

        if (predecessor.right === null) {
          // CASE 2a: Create temporary link and VISIT CURRENT NODE (preorder visit)
          result.push(current.val); // Preorder: visit before going to left
          predecessor.right = current; // Create Morris link
          current = current.left;
        } else {
          // CASE 2b: Remove temporary link
          predecessor.right = null;
          current = current.right;
        }
      }
    }

    return result;
  }

  /**
   * VERBOSE VERSION with detailed explanations
   */
  preorderMorrisVerbose(root) {
    const result = [];
    let current = root;
    let step = 1;

    console.log("=== MORRIS PREORDER TRAVERSAL (Step by Step) ===");

    while (current !== null) {
      console.log(
        `\nStep ${step}: Current node = ${current ? current.val : "null"}`
      );

      if (current.left === null) {
        // Case 1: No left child
        console.log("  → No left child");
        result.push(current.val);
        console.log(`  → VISITED: ${current.val} (preorder visit)`);
        console.log(`  → Result so far: [${result}]`);
        console.log(
          `  → Moving to right child: ${
            current.right ? current.right.val : "null"
          }`
        );
        current = current.right;
      } else {
        // Case 2: Has left child
        console.log(`  → Has left child: ${current.left.val}`);

        let predecessor = current.left;
        let steps = 0;

        // Find inorder predecessor (rightmost in left subtree)
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
          steps++;
        }
        console.log(
          `  → Found predecessor: ${predecessor.val} (after ${steps} right moves)`
        );

        if (predecessor.right === null) {
          // Case 2a: Create link and visit current
          console.log(`  → Predecessor's right is null`);
          result.push(current.val);
          console.log(`  → VISITED: ${current.val} (preorder visit)`);
          console.log(`  → Result so far: [${result}]`);
          console.log(
            `  → Creating Morris link: ${predecessor.val} → ${current.val}`
          );
          predecessor.right = current;
          console.log(`  → Moving to left child: ${current.left.val}`);
          current = current.left;
        } else {
          // Case 2b: Remove link
          console.log(
            `  → Predecessor's right points to current (cycle detected)`
          );
          console.log(`  → Removing Morris link: ${predecessor.val} → null`);
          predecessor.right = null;
          console.log(
            `  → Moving to right child: ${
              current.right ? current.right.val : "null"
            }`
          );
          current = current.right;
        }
      }
      step++;
    }

    console.log("\n=== TRAVERSAL COMPLETE ===");
    return result;
  }

  /**
   * INORDER Morris for comparison
   */
  inorderMorris(root) {
    const result = [];
    let current = root;

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
          predecessor.right = current;
          current = current.left;
        } else {
          predecessor.right = null;
          result.push(current.val);
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
class PreorderTreeDemo {
  constructor() {
    this.morris = new MorrisPreorderTraversal();
  }

  /**
   * Build sample tree 1:
   *       1
   *      / \
   *     2   3
   *    / \   \
   *   4   5   6
   */
  buildSampleTree1() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);
    return root;
  }

  /**
   * Build sample tree 2:
   *       1
   *      / \
   *     2   3
   *    /   / \
   *   4   5   6
   */
  buildSampleTree2() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.right.left = new TreeNode(5);
    root.right.right = new TreeNode(6);
    return root;
  }

  /**
   * Build complete binary tree:
   *       1
   *      / \
   *     2   3
   *    / \ / \
   *   4  5 6 7
   */
  buildCompleteTree() {
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
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
   * Regular recursive preorder for verification
   */
  preorderRecursive(root) {
    const result = [];

    const traverse = (node) => {
      if (!node) return;
      result.push(node.val); // Preorder: visit root first
      traverse(node.left);
      traverse(node.right);
    };

    traverse(root);
    return result;
  }

  /**
   * Compare Morris preorder with recursive preorder
   */
  testPreorderComparison() {
    console.log("=== MORRIS PREORDER vs RECURSIVE PREORDER ===");

    const testCases = [
      { name: "Sample Tree 1", root: this.buildSampleTree1() },
      { name: "Sample Tree 2", root: this.buildSampleTree2() },
      { name: "Complete Tree", root: this.buildCompleteTree() },
      { name: "Left Skewed", root: this.buildLeftSkewedTree() },
      { name: "Right Skewed", root: this.buildRightSkewedTree() },
    ];

    testCases.forEach(({ name, root }) => {
      console.log(`\n${name}:`);

      const recursiveResult = this.preorderRecursive(root);
      const morrisResult = this.morris.preorderMorris(root);

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
   * Compare Preorder vs Inorder Morris
   */
  comparePreorderInorder() {
    console.log("\n=== PREORDER vs INORDER MORRIS ===");

    const root = this.buildSampleTree1();
    console.log("Tree structure:");
    console.log("       1");
    console.log("      / \\");
    console.log("     2   3");
    console.log("    / \\   \\");
    console.log("   4   5   6");

    const preorder = this.morris.preorderMorris(root);
    const inorder = this.morris.inorderMorris(root);

    console.log(`Preorder: [${preorder}]`);
    console.log(`Inorder:  [${inorder}]`);
    console.log("Expected Preorder: [1, 2, 4, 5, 3, 6]");
    console.log("Expected Inorder:  [4, 2, 5, 1, 3, 6]");
  }

  /**
   * Step-by-step demonstration
   */
  demonstrateStepByStep() {
    console.log("\n=== STEP-BY-STEP MORRIS PREORDER ===");

    const root = this.buildSampleTree1();
    console.log("Tree structure:");
    console.log("       1");
    console.log("      / \\");
    console.log("     2   3");
    console.log("    / \\   \\");
    console.log("   4   5   6");
    console.log("\nExpected Preorder: [1, 2, 4, 5, 3, 6]");

    const result = this.morris.preorderMorrisVerbose(root);
    console.log(`\nFinal Result: [${result}]`);
  }

  /**
   * Visualize Morris links creation and removal
   */
  visualizeMorrisLinks() {
    console.log("\n=== MORRIS LINKS VISUALIZATION ===");

    const root = this.buildSampleTree1();
    console.log("Initial Tree:");
    console.log("       1");
    console.log("      / \\");
    console.log("     2   3");
    console.log("    / \\   \\");
    console.log("   4   5   6");

    const result = [];
    let current = root;
    let step = 1;

    while (current !== null) {
      console.log(`\n--- Step ${step} ---`);
      console.log(`Current: ${current.val}`);

      if (current.left === null) {
        console.log(`Action: Visit ${current.val} (no left child)`);
        result.push(current.val);
        current = current.right;
      } else {
        let predecessor = current.left;
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
        }

        if (predecessor.right === null) {
          console.log(
            `Action: Visit ${current.val}, Create link ${predecessor.val} → ${current.val}`
          );
          result.push(current.val);
          predecessor.right = current;
          current = current.left;
        } else {
          console.log(
            `Action: Remove link ${predecessor.val} → ${current.val}`
          );
          predecessor.right = null;
          current = current.right;
        }
      }

      console.log(`Result so far: [${result}]`);
      step++;
    }

    console.log(`\nFinal Preorder: [${result}]`);
  }

  /**
   * Key differences explanation
   */
  explainKeyDifferences() {
    console.log("\n=== KEY DIFFERENCES: PREORDER vs INORDER MORRIS ===");

    console.log("\nINORDER Morris Traversal:");
    console.log("1. Visit node WHEN returning from left subtree");
    console.log("2. Visit order: Left → Root → Right");
    console.log("3. Code: result.push(current) in the ELSE branch");

    console.log("\nPREORDER Morris Traversal:");
    console.log("1. Visit node BEFORE going to left subtree");
    console.log("2. Visit order: Root → Left → Right");
    console.log(
      "3. Code: result.push(current) in the IF branch (when creating link)"
    );

    console.log("\nThe ONLY difference:");
    console.log("Inorder:  result.push(current) when REMOVING the Morris link");
    console.log("Preorder: result.push(current) when CREATING the Morris link");
  }

  runAllTests() {
    console.log("MORRIS PREORDER TRAVERSAL");
    console.log("=========================\n");

    this.testPreorderComparison();
    this.comparePreorderInorder();
    this.demonstrateStepByStep();
    this.visualizeMorrisLinks();
    this.explainKeyDifferences();
  }
}

/**
 * ALGORITHM EXPLANATION:
 *
 * Morris Preorder Traversal follows the same pattern as Morris Inorder,
 * but with one crucial difference: when to visit the current node.
 *
 * KEY DIFFERENCE FROM INORDER:
 *
 * INORDER: Visit node when REMOVING the Morris link
 * PREORDER: Visit node when CREATING the Morris link
 *
 * STEP-BY-STEP LOGIC:
 *
 * 1. Start at root
 * 2. If current has NO left child:
 *    - Visit current (preorder visit)
 *    - Move to right child
 *
 * 3. If current HAS left child:
 *    - Find inorder predecessor (rightmost in left subtree)
 *    - If predecessor.right is NULL:
 *        * VISIT CURRENT (preorder visit happens here)
 *        * Create Morris link: predecessor.right = current
 *        * Move to left child
 *    - If predecessor.right is CURRENT:
 *        * Remove Morris link: predecessor.right = null
 *        * Move to right child
 *
 * WHY PREORDER WORKS:
 * - We visit the node immediately when we first encounter it
 * - The Morris links help us return to parent nodes later
 * - We maintain the preorder sequence: Root → Left → Right
 *
 * TIME COMPLEXITY: O(n)
 * SPACE COMPLEXITY: O(1)
 */

// Run the demonstration
const demo = new PreorderTreeDemo();
demo.runAllTests();

/**
 * ADVANTAGES OF MORRIS PREORDER:
 *
 * 1. O(1) extra space - no stack or recursion
 * 2. Visits nodes in correct preorder sequence
 * 3. Temporarily modifies tree but restores it
 * 4. Useful for memory-constrained environments
 *
 * DISADVANTAGES:
 *
 * 1. Modifies tree during traversal
 * 2. More complex than recursive approach
 * 3. Not thread-safe
 * 4. Slightly slower due to link operations
 */
