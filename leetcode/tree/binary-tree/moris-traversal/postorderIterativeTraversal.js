/*
Iterative Postorder
Difficulty: MediumAccuracy: 80.67%Submissions: 48K+Points: 4
Given a binary tree. Find the postorder traversal of the tree without using recursion. Return a list containing the postorder traversal of the tree, calculated without using recursion.

Examples :

Input:
           1
         /   \
        2     3
      /  \
     4    5

Output: 4 5 2 3 1
Explanation: Postorder traversal (Left->Right->Root) of the tree is 4 5 2 3 1.
Input:
             8
          /      \
        1          5
         \       /   \
          7     10    6
           \   /
            10 6

Output: 10 7 1 6 10 6 5 8 
Explanation: Postorder traversal (Left->Right->Root) of the tree is 10 7 1 6 10 6 5 8 .
 
Expected time complexity: O(n)
Expected auxiliary space: O(n)
 
Constraints:
1 <= Number of nodes <= 105
1 <= Data of a node <= 105

Explanation

    Preorder Traversal: The root node is visited first, followed by a recursive traversal of the left subtree and then the right subtree. The structure is node, left, right.

    Inorder Traversal: The left subtree is visited first, then the root node, and finally the right subtree. The structure is left, node, right. This traversal visits nodes in non-decreasing order for a binary search tree.

    Postorder Traversal: The left subtree is visited first, then the right subtree, and finally the root node. The structure is left, right, node. This traversal is useful for deleting a tree from the bottom up.
*/
function postorderMorrisAlternative(root) {
  if (!root) return [];

  const result = [];
  let current = root;

  while (current !== null) {
    if (current.right === null) {
      // No right child, visit current and move left
      result.push(current.val);
      current = current.left;
    } else {
      // Find predecessor in right subtree
      let predecessor = current.right;
      while (predecessor.left !== null && predecessor.left !== current) {
        predecessor = predecessor.left;
      }

      if (predecessor.left === null) {
        // Create temporary link and visit current
        result.push(current.val); // Visit in reverse preorder
        predecessor.left = current;
        current = current.right;
      } else {
        // Remove temporary link
        predecessor.left = null;
        current = current.left;
      }
    }
  }

  // Reverse the result to get postorder
  return result.reverse();
}

class Solution {
  postOrder(root) {
    const result = [];
    const reverseAdd = (start, end) => {
      let current = start;
      const temp = [];
      while (current !== end) {
        temp.push(current.data);
        current = current.right;
      }
      temp.push(end.data);
      result.push(...temp.reverse());
    };

    const dummy = new Node(0);
    dummy.left = root;
    let current = dummy;

    while (current !== null) {
      if (current.left === null) {
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
          reverseAdd(current.left, predecessor);
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
 * Morris Traversal for Postorder Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
class MorrisPostorderTraversal {
  /**
   * POSTORDER TRAVERSAL using Morris Traversal
   * @param {TreeNode} root - Root of the binary tree
   * @return {number[]} - Postorder traversal result
   */
  postorderMorris(root) {
    if (!root) return [];

    const result = [];
    // Create a dummy node and make root its left child
    const dummy = new TreeNode(0);
    dummy.left = root;
    let current = dummy;

    while (current !== null) {
      if (current.left === null) {
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
          // Remove temporary link and process nodes in reverse order
          this.processReverse(current.left, predecessor, result);
          predecessor.right = null;
          current = current.right;
        }
      }
    }

    return result;
  }

  /**
   * Helper function to process nodes in reverse order from current to predecessor
   */
  processReverse(fromNode, toNode, result) {
    // Reverse the nodes from fromNode to toNode
    this.reverse(fromNode, toNode);

    // Add nodes to result in the reversed order
    let current = toNode;
    while (current !== fromNode) {
      result.push(current.val);
      current = current.right;
    }
    result.push(fromNode.val); // Add the starting node

    // Reverse back to restore original structure
    this.reverse(toNode, fromNode);
  }

  /**
   * Reverse the right pointers from fromNode to toNode
   */
  reverse(fromNode, toNode) {
    if (fromNode === toNode) return;

    let prev = fromNode;
    let current = fromNode.right;

    while (prev !== toNode) {
      const next = current.right;
      current.right = prev;
      prev = current;
      current = next;
    }
  }

  /**
   * ALTERNATIVE APPROACH: More intuitive Morris postorder
   * This approach uses the concept of reverse preorder (Root → Right → Left)
   * and then reverses the result
   */
  postorderMorrisAlternative(root) {
    if (!root) return [];

    const result = [];
    let current = root;

    while (current !== null) {
      if (current.right === null) {
        // No right child, visit current and move left
        result.push(current.val);
        current = current.left;
      } else {
        // Find predecessor in right subtree
        let predecessor = current.right;
        while (predecessor.left !== null && predecessor.left !== current) {
          predecessor = predecessor.left;
        }

        if (predecessor.left === null) {
          // Create temporary link and visit current
          result.push(current.val); // Visit in reverse preorder
          predecessor.left = current;
          current = current.right;
        } else {
          // Remove temporary link
          predecessor.left = null;
          current = current.left;
        }
      }
    }

    // Reverse the result to get postorder
    return result.reverse();
  }

  /**
   * VERBOSE VERSION with detailed explanations
   */
  postorderMorrisVerbose(root) {
    if (!root) return [];

    const result = [];
    const dummy = new TreeNode(0);
    dummy.left = root;
    let current = dummy;
    let step = 1;

    console.log("=== MORRIS POSTORDER TRAVERSAL (Step by Step) ===");
    console.log("Created dummy node with root as left child");

    while (current !== null) {
      console.log(
        `\nStep ${step}: Current = ${current === dummy ? "dummy" : current.val}`
      );

      if (current.left === null) {
        console.log("  → No left child, moving right");
        current = current.right;
      } else {
        let predecessor = current.left;
        let steps = 0;

        // Find inorder predecessor
        while (predecessor.right !== null && predecessor.right !== current) {
          predecessor = predecessor.right;
          steps++;
        }
        console.log(
          `  → Found predecessor: ${predecessor.val} (after ${steps} right moves)`
        );

        if (predecessor.right === null) {
          console.log(
            `  → Creating Morris link: ${predecessor.val} → ${
              current === dummy ? "dummy" : current.val
            }`
          );
          predecessor.right = current;
          console.log(`  → Moving to left child: ${current.left.val}`);
          current = current.left;
        } else {
          console.log(
            `  → Cycle detected, processing nodes from ${current.left.val} to ${predecessor.val}`
          );

          // Process nodes in reverse
          this.processReverseVerbose(current.left, predecessor, result);

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
   * Verbose version of processReverse
   */
  processReverseVerbose(fromNode, toNode, result) {
    console.log(`    Processing reverse from ${fromNode.val} to ${toNode.val}`);

    // Reverse the nodes
    this.reverse(fromNode, toNode);

    // Add nodes to result
    const temp = [];
    let current = toNode;
    while (current !== fromNode) {
      temp.push(current.val);
      current = current.right;
    }
    temp.push(fromNode.val);

    console.log(`    Adding to result: [${temp.join(", ")}]`);
    result.push(...temp);

    // Reverse back
    this.reverse(toNode, fromNode);
  }

  /**
   * SIMPLIFIED APPROACH: Using reverse preorder
   */
  postorderMorrisSimplified(root) {
    if (!root) return [];

    const result = [];
    let current = root;

    // Modified Morris for reverse preorder (Root → Right → Left)
    while (current !== null) {
      if (current.right === null) {
        result.push(current.val);
        current = current.left;
      } else {
        let predecessor = current.right;
        while (predecessor.left !== null && predecessor.left !== current) {
          predecessor = predecessor.left;
        }

        if (predecessor.left === null) {
          result.push(current.val);
          predecessor.left = current;
          current = current.right;
        } else {
          predecessor.left = null;
          current = current.left;
        }
      }
    }

    // Reverse to get postorder (Left → Right → Root)
    return result.reverse();
  }
}

/**
 * Tree Builder and Test Cases
 */
class PostorderTreeDemo {
  constructor() {
    this.morris = new MorrisPostorderTraversal();
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
   * Regular recursive postorder for verification
   */
  postorderRecursive(root) {
    const result = [];

    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      result.push(node.val); // Postorder: visit after children
    };

    traverse(root);
    return result;
  }

  /**
   * Compare Morris postorder with recursive postorder
   */
  testPostorderComparison() {
    console.log("=== MORRIS POSTORDER vs RECURSIVE POSTORDER ===");

    const testCases = [
      { name: "Sample Tree 1", root: this.buildSampleTree1() },
      { name: "Sample Tree 2", root: this.buildSampleTree2() },
      { name: "Complete Tree", root: this.buildCompleteTree() },
      { name: "Left Skewed", root: this.buildLeftSkewedTree() },
      { name: "Right Skewed", root: this.buildRightSkewedTree() },
    ];

    testCases.forEach(({ name, root }) => {
      console.log(`\n${name}:`);

      const recursiveResult = this.postorderRecursive(root);
      const morrisResult1 = this.morris.postorderMorris(root);
      const morrisResult2 = this.morris.postorderMorrisAlternative(root);
      const morrisResult3 = this.morris.postorderMorrisSimplified(root);

      console.log(`Recursive: [${recursiveResult}]`);
      console.log(`Morris 1:  [${morrisResult1}]`);
      console.log(`Morris 2:  [${morrisResult2}]`);
      console.log(`Morris 3:  [${morrisResult3}]`);

      const allMatch =
        JSON.stringify(recursiveResult) === JSON.stringify(morrisResult1) &&
        JSON.stringify(recursiveResult) === JSON.stringify(morrisResult2) &&
        JSON.stringify(recursiveResult) === JSON.stringify(morrisResult3);

      console.log(`All Match: ${allMatch}`);
    });
  }

  /**
   * Compare all three Morris traversals
   */
  compareAllMorrisTraversals() {
    console.log("\n=== COMPARING ALL MORRIS TRAVERSALS ===");

    const root = this.buildSampleTree1();
    console.log("Tree structure:");
    console.log("       1");
    console.log("      / \\");
    console.log("     2   3");
    console.log("    / \\   \\");
    console.log("   4   5   6");

    // We would need to implement inorder and preorder in the same class
    // For now, let's focus on postorder demonstration
    const postorder = this.morris.postorderMorris(root);
    const postorderAlt = this.morris.postorderMorrisAlternative(root);
    const postorderSimple = this.morris.postorderMorrisSimplified(root);

    console.log(`Postorder (Main):    [${postorder}]`);
    console.log(`Postorder (Alt):     [${postorderAlt}]`);
    console.log(`Postorder (Simple):  [${postorderSimple}]`);
    console.log("Expected Postorder: [4, 5, 2, 6, 3, 1]");
  }

  /**
   * Step-by-step demonstration
   */
  demonstrateStepByStep() {
    console.log("\n=== STEP-BY-STEP MORRIS POSTORDER ===");

    const root = this.buildSampleTree1();
    console.log("Tree structure:");
    console.log("       1");
    console.log("      / \\");
    console.log("     2   3");
    console.log("    / \\   \\");
    console.log("   4   5   6");
    console.log("\nExpected Postorder: [4, 5, 2, 6, 3, 1]");

    const result = this.morris.postorderMorrisVerbose(root);
    console.log(`\nFinal Result: [${result}]`);
  }

  /**
   * Explain the algorithm in detail
   */
  explainAlgorithm() {
    console.log("\n=== MORRIS POSTORDER ALGORITHM EXPLANATION ===");

    console.log("\nMAIN APPROACH (with dummy node):");
    console.log("1. Create a dummy node with root as left child");
    console.log("2. Use standard Morris traversal on the dummy node");
    console.log(
      "3. When we detect a cycle (predecessor.right points to current):"
    );
    console.log("   - Reverse the nodes from current.left to predecessor");
    console.log(
      "   - Add these reversed nodes to result (this gives us postorder)"
    );
    console.log("   - Reverse back to restore the tree structure");
    console.log("4. The dummy node ensures we process the root last");

    console.log("\nALTERNATIVE APPROACH (reverse preorder):");
    console.log("1. Do Morris traversal but process right subtree first");
    console.log("2. This gives us reverse postorder: Root → Right → Left");
    console.log(
      "3. Reverse the result to get proper postorder: Left → Right → Root"
    );

    console.log("\nWHY IT WORKS:");
    console.log("- Postorder = Left → Right → Root");
    console.log(
      "- When we reverse a path and add nodes, we get them in reverse order"
    );
    console.log("- This reverse order is exactly what we need for postorder");
    console.log("- The dummy node ensures the root is processed last");
  }

  /**
   * Visualize the reverse process
   */
  visualizeReverseProcess() {
    console.log("\n=== VISUALIZING THE REVERSE PROCESS ===");

    // Create a simple linked list: 2 → 3 → 4 → 5
    const node2 = new TreeNode(2);
    const node3 = new TreeNode(3);
    const node4 = new TreeNode(4);
    const node5 = new TreeNode(5);

    node2.right = node3;
    node3.right = node4;
    node4.right = node5;

    console.log("Original linked list: 2 → 3 → 4 → 5");

    const morris = new MorrisPostorderTraversal();
    const result = [];
    morris.processReverse(node2, node5, result);

    console.log("After processReverse(2, 5):");
    console.log("Result:", result);
    console.log("Expected: [5, 4, 3, 2] (reverse of original)");
  }

  runAllTests() {
    console.log("MORRIS POSTORDER TRAVERSAL");
    console.log("==========================\n");

    this.testPostorderComparison();
    this.compareAllMorrisTraversals();
    this.demonstrateStepByStep();
    this.visualizeReverseProcess();
    this.explainAlgorithm();
  }
}

/**
 * ALGORITHM EXPLANATION:
 *
 * Morris Postorder is the most complex of the three Morris traversals because
 * postorder requires visiting children before parents, which conflicts with
 * the natural Morris traversal order.
 *
 * MAIN APPROACH (with dummy node):
 *
 * 1. Create a dummy node with root as left child
 * 2. Perform standard Morris traversal starting from dummy
 * 3. When we find a cycle (predecessor.right points to current):
 *    - Reverse the right pointers from current.left to predecessor
 *    - Traverse this reversed chain and add nodes to result
 *    - Reverse back to restore original structure
 * 4. The dummy node ensures the root is processed last
 *
 * ALTERNATIVE APPROACH (reverse preorder):
 *
 * 1. Perform Morris traversal but process right subtree first
 * 2. This gives us: Root → Right → Left (reverse postorder)
 * 3. Reverse the result to get: Left → Right → Root (postorder)
 *
 * TIME COMPLEXITY: O(n) - Each node is processed a constant number of times
 * SPACE COMPLEXITY: O(1) - Only uses a few pointers
 *
 * The algorithm is complex but elegant, maintaining O(1) space while
 * handling the challenging postorder sequence.
 */

// Run the demonstration
const demo = new PostorderTreeDemo();
demo.runAllTests();

/**
 * COMPARISON OF MORRIS TRAVERSALS:
 *
 * | Traversal | When to Visit | Key Technique | Complexity |
 * |-----------|---------------|---------------|------------|
 * | Inorder   | Remove link   | Standard Morris | O(n) O(1) |
 * | Preorder  | Create link   | Visit before left | O(n) O(1) |
 * | Postorder | Reverse paths | Dummy node + reversal | O(n) O(1) |
 *
 * Postorder is the most complex because it requires:
 * - Temporary reversal of node sequences
 * - Careful restoration of tree structure
 * - Special handling of the root node
 */
