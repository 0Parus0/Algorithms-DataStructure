/**
 * TREE TRAVERSAL IMPLEMENTATION
 * Following Turing.com Coding Challenge Guidelines
 *
 * IMPLEMENTATION PLAN:
 * 1. Define TreeNode class with value, left, and right properties
 * 2. Implement recursive traversals (pre-order, in-order, post-order)
 * 3. Implement iterative traversals for comparison
 * 4. Implement level-order traversal using queue
 * 5. Create comprehensive test cases and demonstration
 * 6. Include edge case handling and performance analysis
 */

/**
 * STEP 1: TREE NODE CLASS DEFINITION
 * Basic building block for binary tree structure
 */
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

/**
 * STEP 2-4: TREE TRAVERSAL IMPLEMENTATION
 * All traversal methods with both recursive and iterative approaches
 */
class TreeTraversal {
  /**
   * STEP 2.1: PRE-ORDER TRAVERSAL (Root → Left → Right)
   * STRATEGY: Visit root first, then left subtree, then right subtree
   * USE CASE: Copying tree structure, prefix notation
   */

  // Recursive approach - natural for tree structures
  preOrderRecursive(root) {
    const result = [];

    // Helper function for recursion
    const traverse = (node) => {
      // Base case: if node is null, return
      if (!node) return;

      result.push(node.value); // STEP 1: Visit root node
      traverse(node.left); // STEP 2: Traverse left subtree
      traverse(node.right); // STEP 3: Traverse right subtree
    };

    traverse(root);
    return result;
  }

  // Iterative approach - explicit stack management
  preOrderIterative(root) {
    // Edge case: empty tree
    if (!root) return [];

    const result = [];
    const stack = [root]; // Initialize stack with root node

    // Process until stack is empty
    while (stack.length > 0) {
      const node = stack.pop();
      result.push(node.value); // Visit node

      // STEP: Push right first, then left (LIFO - Last In First Out)
      // This ensures left is processed before right
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
    }

    return result;
  }

  /**
   * STEP 2.2: IN-ORDER TRAVERSAL (Left → Root → Right)
   * STRATEGY: Visit left subtree, then root, then right subtree
   * USE CASE: Binary Search Tree sorting, infix notation
   */

  // Recursive approach
  inOrderRecursive(root) {
    const result = [];

    const traverse = (node) => {
      if (!node) return;

      traverse(node.left); // STEP 1: Traverse left subtree
      result.push(node.value); // STEP 2: Visit root node
      traverse(node.right); // STEP 3: Traverse right subtree
    };

    traverse(root);
    return result;
  }

  // Iterative approach with explicit stack
  inOrderIterative(root) {
    const result = [];
    const stack = [];
    let current = root; // Start from root node

    // Continue until all nodes processed
    while (current || stack.length > 0) {
      // STEP 1: Go to the leftmost node (push all left nodes to stack)
      while (current) {
        stack.push(current);
        current = current.left;
      }

      // STEP 2: Visit the node (most recent left node)
      current = stack.pop();
      result.push(current.value);

      // STEP 3: Move to right subtree
      current = current.right;
    }

    return result;
  }

  // 🧩 Step-by-Step Intuition: Inorder Using Two Stacks
  inorderTwoStacks(root) {
    if (!root) return [];

    const stack1 = [root];
    const stack2 = [];
    const result = [];

    // Step 1: Traverse and fill stack2 in reverse inorder
    while (stack1.length > 0) {
      const node = stack1.pop();
      stack2.push(node);

      // Push right first, then left
      if (node.left) stack1.push(node.left);
      if (node.right) stack1.push(node.right);
    }

    // Step 2: Pop from stack2 to get inorder (Left → Node → Right)
    while (stack2.length > 0) {
      const node = stack2.pop();
      result.push(node.value);
    }

    // Step 3: Reverse to fix order (optional based on push order)
    return result.reverse();
  }

  /**
   * STEP 2.3: POST-ORDER TRAVERSAL (Left → Right → Root)
   * STRATEGY: Visit left subtree, then right subtree, then root
   * USE CASE: Tree deletion, postfix notation
   */

  // Recursive approach
  postOrderRecursive(root) {
    const result = [];

    const traverse = (node) => {
      if (!node) return;

      traverse(node.left); // STEP 1: Traverse left subtree
      traverse(node.right); // STEP 2: Traverse right subtree
      result.push(node.value); // STEP 3: Visit root node
    };

    traverse(root);
    return result;
  }

  // Iterative approach using two stacks
  postOrderIterative(root) {
    // STEP 0: Handle empty tree
    if (!root) return [];

    const result = []; // Stores final postorder traversal
    const stack1 = [root]; // Used for processing nodes
    const stack2 = []; // Used to reverse the processing order

    // STEP 1: Process all nodes using stack1
    // The order of pushing is designed to reverse the traversal flow
    while (stack1.length > 0) {
      const node = stack1.pop();
      stack2.push(node); // Store node for later reversal

      // Push left first, then right — so that right is processed before left
      if (node.left) stack1.push(node.left);
      if (node.right) stack1.push(node.right);
    }

    // STEP 2: Pop everything from stack2
    // Now the order becomes Left → Right → Node (postorder)
    while (stack2.length > 0) {
      result.push(stack2.pop().value);
    }

    // STEP 3: Return final result
    return result;
  }

  // Another way to write because post-order is Left -> Right -> Node if we do Node -> Right -> left and at the end reverse it it will be same

  nodeRightLeftIterative(root) {
    const result = [];
    if (!root) return result;

    const stack = [root];

    while (stack.length > 0) {
      const node = stack.pop();
      result.push(node.value); // Visit node first (Node → Right → Left)

      // Push left first so that right is processed before left
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }

    // Reverse to get Left → Right → Node
    return result.reverse();
  }

  /**
   * STEP 3: LEVEL-ORDER TRAVERSAL (Breadth-First)
   * STRATEGY: Visit nodes level by level using queue
   * USE CASE: Finding shortest path, level-based operations
   */
  levelOrder(root) {
    // Edge case: empty tree
    if (!root) return [];

    const result = [];
    const queue = [root]; // Initialize queue with root node

    // Process until queue is empty
    while (queue.length > 0) {
      const levelSize = queue.length; // Number of nodes at current level
      const currentLevel = [];

      // STEP: Process all nodes at current level
      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift(); // Dequeue front node
        currentLevel.push(node.value);

        // Enqueue child nodes for next level
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      result.push(currentLevel); // Add current level to result
    }

    return result;
  }

  /**
   * LEVEL-ORDER (Single array output - alternative format)
   * Same BFS strategy but flattened output
   */
  levelOrderFlat(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node.value);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return result;
  }
}

/**
 * STEP 5: TEST CASES AND DEMONSTRATION
 * Comprehensive testing with sample tree and edge cases
 */
class TreeDemo {
  constructor() {
    this.traversal = new TreeTraversal();
    this.tree = this.buildSampleTree();
  }

  /**
   * STEP 5.1: BUILD SAMPLE TREE FOR TESTING
   * Tree Structure:
   *       1
   *      / \
   *     2   3
   *    / \   \
   *   4   5   6
   */
  buildSampleTree() {
    // STEP: Create nodes and build tree structure
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);

    return root;
  }

  /**
   * STEP 5.2: RUN ALL TRAVERSAL DEMONSTRATIONS
   * Compare recursive vs iterative approaches
   */
  runAllTraversals() {
    console.log("=== TREE TRAVERSALS DEMONSTRATION ===");
    console.log("Tree Structure:");
    console.log("       1");
    console.log("      / \\");
    console.log("     2   3");
    console.log("    / \\   \\");
    console.log("   4   5   6");
    console.log("\n");

    // STEP: Test Pre-order Traversal
    console.log("PRE-ORDER Traversal (Root → Left → Right):");
    console.log("Recursive:", this.traversal.preOrderRecursive(this.tree));
    console.log("Iterative:", this.traversal.preOrderIterative(this.tree));
    console.log("\n");

    // STEP: Test In-order Traversal
    console.log("IN-ORDER Traversal (Left → Root → Right):");
    console.log("Recursive:", this.traversal.inOrderRecursive(this.tree));
    console.log("Iterative:", this.traversal.inOrderIterative(this.tree));
    console.log("\n");

    // STEP: Test Post-order Traversal
    console.log("POST-ORDER Traversal (Left → Right → Root):");
    console.log("Recursive:", this.traversal.postOrderRecursive(this.tree));
    console.log("Iterative:", this.traversal.postOrderIterative(this.tree));
    console.log("\n");

    // STEP: Test Level-order Traversal
    console.log("LEVEL-ORDER Traversal (Breadth-First):");
    console.log("By Levels:", this.traversal.levelOrder(this.tree));
    console.log("Flat:", this.traversal.levelOrderFlat(this.tree));
  }

  /**
   * STEP 5.3: EDGE CASE TESTING
   * Test empty tree, single node, and skewed trees
   */
  testEdgeCases() {
    console.log("\n=== EDGE CASE TESTING ===");

    // STEP: Test empty tree
    console.log("Empty Tree:");
    console.log("Pre-order:", this.traversal.preOrderRecursive(null));
    console.log("Level-order:", this.traversal.levelOrder(null));

    // STEP: Test single node tree
    const singleNode = new TreeNode(42);
    console.log("\nSingle Node Tree:");
    console.log("Pre-order:", this.traversal.preOrderRecursive(singleNode));
    console.log("In-order:", this.traversal.inOrderRecursive(singleNode));

    // STEP: Test left-skewed tree
    const leftSkewed = new TreeNode(1);
    leftSkewed.left = new TreeNode(2);
    leftSkewed.left.left = new TreeNode(3);
    console.log("\nLeft-skewed Tree:");
    console.log("Pre-order:", this.traversal.preOrderRecursive(leftSkewed));
    console.log("In-order:", this.traversal.inOrderRecursive(leftSkewed));

    // STEP: Test right-skewed tree
    const rightSkewed = new TreeNode(1);
    rightSkewed.right = new TreeNode(2);
    rightSkewed.right.right = new TreeNode(3);
    console.log("\nRight-skewed Tree:");
    console.log("Pre-order:", this.traversal.preOrderRecursive(rightSkewed));
    console.log("In-order:", this.traversal.inOrderRecursive(rightSkewed));
  }
}

/**
 * STEP 6: PERFORMANCE ANALYSIS HELPER
 * Compare execution time of different approaches
 */
function comparePerformance(traversal, tree, iterations = 10000) {
  console.log("\n=== PERFORMANCE COMPARISON ===");

  // STEP: Define methods to test
  const methods = [
    "preOrderRecursive",
    "preOrderIterative",
    "inOrderRecursive",
    "inOrderIterative",
    "postOrderRecursive",
    "postOrderIterative",
  ];

  // STEP: Test each method with multiple iterations
  methods.forEach((method) => {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      traversal[method](tree);
    }
    const end = performance.now();
    console.log(
      `${method}: ${(end - start).toFixed(2)}ms for ${iterations} iterations`
    );
  });
}

/**
 * COMPREHENSIVE TESTING AND ANALYSIS
 * Time & Space Complexity Summary:
 *
 * | Traversal     | Time Complexity | Space (Recursive) | Space (Iterative) | Use Cases |
 * |---------------|-----------------|-------------------|-------------------|-----------|
 * | Pre-order     | O(n)            | O(h)              | O(h)              | Copying trees, prefix notation |
 * | In-order      | O(n)            | O(h)              | O(h)              | BST sorting, infix notation |
 * | Post-order    | O(n)            | O(h)              | O(h)              | Tree deletion, postfix notation |
 * | Level-order   | O(n)            | O(w)              | O(w)              | Shortest path, level operations |
 *
 * Where:
 * - n = number of nodes
 * - h = height of tree (O(log n) for balanced, O(n) for skewed)
 * - w = maximum width of tree (number of nodes at any level)
 */

// STEP: Execute the complete demonstration
console.log("TREE TRAVERSAL IMPLEMENTATION - TURING.COM CODING CHALLENGE");
console.log("============================================================\n");

const demo = new TreeDemo();
demo.runAllTraversals();
demo.testEdgeCases();

// Uncomment to run performance analysis
// comparePerformance(demo.traversal, demo.tree);

console.log("\n=== IMPLEMENTATION COMPLETE ===");
