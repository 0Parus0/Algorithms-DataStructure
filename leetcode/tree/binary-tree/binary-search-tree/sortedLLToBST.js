/*
Sorted Linked List to BST
Difficulty: HardAccuracy: 53.24%Submissions: 29K+Points: 8
Given a Singly Linked List which has data members sorted in ascending order. Construct a Balanced Binary Search Tree which has same data members as the given Linked List.
Note: There might be nodes with the same value.

Examples:

Input: Linked List: 1->2->3->4->5->6->7

Output: 4 2 1 3 6 5 7
Explanation : The BST formed using elements of the linked list is -
        4
      /   \
     2     6
   /  \   / \
  1   3  5   7  
Hence, preorder traversal of this tree is 4 2 1 3 6 5 7
Input: Linked List : 1->2->3->4
 
Ouput: 3 2 1 4
Explanation: The BST formed using elements of the linked list is -

Hence, the preorder traversal of this tree is 3 2 1 4
Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
 
Constraints:
1 ≤ Number of Nodes ≤ 106
1 ≤ Value of each node ≤ 106
*/

class ListNode {
  constructor(val) {
    this.data = val;
    this.next = null;
  }
}

class TreeNode {
  constructor(val) {
    this.data = val;
    this.left = null;
    this.right = null;
  }
}

function sortedListToBST(head) {
  // Step 1: Count the number of nodes
  let n = 0;
  let temp = head;
  while (temp) {
    n++;
    temp = temp.next;
  }

  // Step 2: Use closure to move `head` pointer as recursion unfolds
  let current = head;

  function convertToBST(start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);

    // Step 3: Recursively build the left subtree
    const leftChild = convertToBST(start, mid - 1);

    // Step 4: Current node becomes root
    const root = new TreeNode(current.data);

    // Step 5: Move head forward
    current = current.next;

    // Step 6: Build right subtree
    root.left = leftChild;
    root.right = convertToBST(mid + 1, end);

    return root;
  }

  return convertToBST(0, n - 1);
}

/**
 * Definition for singly-linked list.
 */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
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
 * Solution for Sorted Linked List to Balanced BST
 */
class Solution {
  /**
   * APPROACH 1: Convert to Array then Build BST
   * Time: O(n), Space: O(n)
   * Simple and intuitive
   */
  sortedListToBSTArray(head) {
    if (!head) return null;

    // Convert linked list to array
    const arr = [];
    let current = head;
    while (current) {
      arr.push(current.val);
      current = current.next;
    }

    // Build balanced BST from sorted array
    const buildBST = (left, right) => {
      if (left > right) return null;

      const mid = Math.floor((left + right) / 2);
      const node = new TreeNode(arr[mid]);

      node.left = buildBST(left, mid - 1);
      node.right = buildBST(mid + 1, right);

      return node;
    };

    return buildBST(0, arr.length - 1);
  }

  /**
   * APPROACH 2: Two Pointers to Find Middle (Top-Down)
   * Time: O(n log n), Space: O(log n)
   * Uses slow/fast pointer technique
   */
  sortedListToBSTTwoPointers(head) {
    if (!head) return null;

    const findMiddle = (head) => {
      let prev = null;
      let slow = head;
      let fast = head;

      while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
      }

      // Disconnect left half from middle
      if (prev) {
        prev.next = null;
      }

      return slow;
    };

    const mid = findMiddle(head);
    const root = new TreeNode(mid.val);

    // Base case: if only one element
    if (head === mid) {
      return root;
    }

    // Recursively build left and right subtrees
    root.left = this.sortedListToBSTTwoPointers(head);
    root.right = this.sortedListToBSTTwoPointers(mid.next);

    return root;
  }

  /**
   * APPROACH 3: Inorder Simulation (Most Optimal)
   * Time: O(n), Space: O(log n)
   * Simulates inorder traversal to build tree
   */
  sortedListToBSTOptimal(head) {
    if (!head) return null;

    // Find the length of linked list
    let length = 0;
    let current = head;
    while (current) {
      length++;
      current = current.next;
    }

    // Global pointer to traverse linked list
    this.currentNode = head;

    const buildTree = (start, end) => {
      if (start > end) return null;

      const mid = Math.floor((start + end) / 2);

      // Build left subtree first
      const left = buildTree(start, mid - 1);

      // Create root node
      const root = new TreeNode(this.currentNode.val);
      this.currentNode = this.currentNode.next;

      // Build right subtree
      root.left = left;
      root.right = buildTree(mid + 1, end);

      return root;
    };

    return buildTree(0, length - 1);
  }

  /**
   * APPROACH 4: Iterative Approach
   * Time: O(n), Space: O(n)
   * Uses level order traversal simulation
   */
  sortedListToBSTIterative(head) {
    if (!head) return null;

    // Convert to array for easier access
    const nodes = [];
    let current = head;
    while (current) {
      nodes.push(current.val);
      current = current.next;
    }

    const queue = [];
    const root = new TreeNode();
    queue.push({ node: root, left: 0, right: nodes.length - 1 });

    while (queue.length > 0) {
      const { node, left, right } = queue.shift();

      const mid = Math.floor((left + right) / 2);
      node.val = nodes[mid];

      if (left <= mid - 1) {
        node.left = new TreeNode();
        queue.push({ node: node.left, left: left, right: mid - 1 });
      }

      if (mid + 1 <= right) {
        node.right = new TreeNode();
        queue.push({ node: node.right, left: mid + 1, right: right });
      }
    }

    return root;
  }

  /**
   * Utility function to print preorder traversal (for verification)
   */
  preorder(root) {
    const result = [];

    const traverse = (node) => {
      if (!node) return;
      result.push(node.val);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(root);
    return result;
  }

  /**
   * Utility function to print inorder traversal (should be sorted)
   */
  inorder(root) {
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
   * Utility to check if tree is balanced
   */
  isBalanced(root) {
    const checkHeight = (node) => {
      if (!node) return 0;

      const leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return checkHeight(root) !== -1;
  }
}

/**
 * Linked List and Tree Utilities
 */
class LinkedListTreeDemo {
  constructor() {
    this.solution = new Solution();
  }

  /**
   * Create a sorted linked list from array
   */
  createLinkedList(arr) {
    if (!arr || arr.length === 0) return null;

    const head = new ListNode(arr[0]);
    let current = head;

    for (let i = 1; i < arr.length; i++) {
      current.next = new ListNode(arr[i]);
      current = current.next;
    }

    return head;
  }

  /**
   * Print linked list
   */
  printLinkedList(head) {
    const result = [];
    let current = head;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result.join("->");
  }

  /**
   * Test Case 1: 1->2->3->4->5->6->7
   * Expected Preorder: [4, 2, 1, 3, 6, 5, 7]
   */
  testCase1() {
    console.log("=== TEST CASE 1 ===");
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const head = this.createLinkedList(arr);

    console.log(`Linked List: ${this.printLinkedList(head)}`);

    const result1 = this.solution.sortedListToBSTArray(head);
    const result2 = this.solution.sortedListToBSTTwoPointers(head);
    const result3 = this.solution.sortedListToBSTOptimal(
      this.createLinkedList(arr)
    ); // Create fresh list
    const result4 = this.solution.sortedListToBSTIterative(head);

    console.log(
      `Array Approach Preorder:    [${this.solution.preorder(result1)}]`
    );
    console.log(
      `Two Pointers Preorder:      [${this.solution.preorder(result2)}]`
    );
    console.log(
      `Optimal Approach Preorder:  [${this.solution.preorder(result3)}]`
    );
    console.log(
      `Iterative Approach Preorder:[${this.solution.preorder(result4)}]`
    );
    console.log(`Expected Preorder:          [4, 2, 1, 3, 6, 5, 7]`);

    // Verify inorder is sorted
    console.log(
      `Optimal Inorder (should be sorted): [${this.solution.inorder(result3)}]`
    );

    // Check if balanced
    console.log(`Is Balanced: ${this.solution.isBalanced(result3)}`);
    console.log();

    return result3;
  }

  /**
   * Test Case 2: 1->2->3->4
   * Expected Preorder: [3, 2, 1, 4] or [2, 1, 3, 4]
   */
  testCase2() {
    console.log("=== TEST CASE 2 ===");
    const arr = [1, 2, 3, 4];
    const head = this.createLinkedList(arr);

    console.log(`Linked List: ${this.printLinkedList(head)}`);

    const result1 = this.solution.sortedListToBSTArray(head);
    const result2 = this.solution.sortedListToBSTOptimal(
      this.createLinkedList(arr)
    );

    console.log(
      `Array Approach Preorder:   [${this.solution.preorder(result1)}]`
    );
    console.log(
      `Optimal Approach Preorder: [${this.solution.preorder(result2)}]`
    );
    console.log(`Expected Preorder:         [3, 2, 1, 4]`);

    console.log(
      `Optimal Inorder (should be sorted): [${this.solution.inorder(result2)}]`
    );
    console.log(`Is Balanced: ${this.solution.isBalanced(result2)}`);
    console.log();

    return result2;
  }

  /**
   * Test Case 3: Single node
   */
  testCase3() {
    console.log("=== TEST CASE 3: Single Node ===");
    const head = new ListNode(5);

    console.log(`Linked List: ${this.printLinkedList(head)}`);

    const result = this.solution.sortedListToBSTOptimal(head);

    console.log(`Preorder: [${this.solution.preorder(result)}]`);
    console.log(`Expected: [5]`);
    console.log(`Is Balanced: ${this.solution.isBalanced(result)}`);
    console.log();

    return result;
  }

  /**
   * Test Case 4: Two nodes
   */
  testCase4() {
    console.log("=== TEST CASE 4: Two Nodes ===");
    const head = this.createLinkedList([1, 2]);

    console.log(`Linked List: ${this.printLinkedList(head)}`);

    const result = this.solution.sortedListToBSTOptimal(head);

    console.log(`Preorder: [${this.solution.preorder(result)}]`);
    console.log(`Expected: [2, 1] or [1, 2]`);
    console.log(`Is Balanced: ${this.solution.isBalanced(result)}`);
    console.log();

    return result;
  }

  /**
   * Test Case 5: Large linked list
   */
  testCase5() {
    console.log("=== TEST CASE 5: Large List (15 nodes) ===");
    const arr = Array.from({ length: 15 }, (_, i) => i + 1);
    const head = this.createLinkedList(arr);

    console.log(`Linked List: 1->2->3->...->15`);

    const result = this.solution.sortedListToBSTOptimal(head);

    console.log(
      `Preorder (first 10): [${this.solution.preorder(result).slice(0, 10)}...]`
    );
    console.log(
      `Inorder (first 10):  [${this.solution.inorder(result).slice(0, 10)}...]`
    );
    console.log(`Tree Height: ${this.getHeight(result)}`);
    console.log(`Is Balanced: ${this.solution.isBalanced(result)}`);
    console.log();

    return result;
  }

  /**
   * Get tree height
   */
  getHeight(root) {
    if (!root) return 0;
    return Math.max(this.getHeight(root.left), this.getHeight(root.right)) + 1;
  }

  /**
   * Visualize the optimal approach step by step
   */
  visualizeOptimalApproach() {
    console.log("=== VISUALIZING OPTIMAL APPROACH ===");

    const arr = [1, 2, 3, 4, 5];
    const head = this.createLinkedList(arr);

    console.log(`Linked List: ${this.printLinkedList(head)}`);
    console.log("Building BST using inorder simulation...\n");

    let step = 0;
    let currentNode = head;

    const buildTreeVisual = (start, end, depth = 0) => {
      if (start > end) {
        console.log(
          `${"  ".repeat(
            depth
          )}Base case: start=${start}, end=${end} → return null`
        );
        return null;
      }

      const mid = Math.floor((start + end) / 2);
      const indent = "  ".repeat(depth);

      console.log(
        `${indent}Step ${++step}: Building subtree [${start}, ${end}]`
      );
      console.log(`${indent}Mid index: ${mid}`);

      // Build left subtree
      console.log(`${indent}Building left subtree [${start}, ${mid - 1}]`);
      const left = buildTreeVisual(start, mid - 1, depth + 1);

      // Create root
      console.log(`${indent}Creating root with value: ${currentNode.val}`);
      const root = new TreeNode(currentNode.val);
      currentNode = currentNode.next;

      root.left = left;

      // Build right subtree
      console.log(`${indent}Building right subtree [${mid + 1}, ${end}]`);
      root.right = buildTreeVisual(mid + 1, end, depth + 1);

      console.log(`${indent}Returning subtree root: ${root.val}`);
      return root;
    };

    const length = arr.length;
    const root = buildTreeVisual(0, length - 1);

    console.log(`\nFinal Preorder: [${this.solution.preorder(root)}]`);
    console.log(`Final Inorder:  [${this.solution.inorder(root)}]`);
  }

  /**
   * Performance comparison
   */
  performanceComparison() {
    console.log("=== PERFORMANCE COMPARISON ===");

    // Create large linked list
    const size = 10000;
    const arr = Array.from({ length: size }, (_, i) => i + 1);

    console.log(`Testing with ${size} nodes`);

    const approaches = [
      { name: "Array Approach", method: this.solution.sortedListToBSTArray },
      {
        name: "Two Pointers",
        method: this.solution.sortedListToBSTTwoPointers,
      },
      {
        name: "Optimal Approach",
        method: this.solution.sortedListToBSTOptimal,
      },
      { name: "Iterative", method: this.solution.sortedListToBSTIterative },
    ];

    approaches.forEach(({ name, method }) => {
      const head = this.createLinkedList(arr);

      const start = performance.now();
      const result = method.call(this.solution, head);
      const end = performance.now();

      console.log(
        `${name}: ${(end - start).toFixed(
          2
        )}ms, Balanced: ${this.solution.isBalanced(result)}`
      );
    });
  }

  runAllTests() {
    console.log("SORTED LINKED LIST TO BALANCED BST");
    console.log("==================================\n");

    this.testCase1();
    this.testCase2();
    this.testCase3();
    this.testCase4();
    this.testCase5();
    this.visualizeOptimalApproach();
    this.performanceComparison();
  }
}

/**
 * ALGORITHM EXPLANATIONS:
 *
 * APPROACH 1: Array Conversion
 * - Convert linked list to array for random access
 * - Build BST using binary search on array
 * - Simple but uses O(n) extra space
 *
 * TIME: O(n), SPACE: O(n)
 *
 * APPROACH 2: Two Pointers (Slow/Fast)
 * - Use slow/fast pointer to find middle element
 * - Recursively build left and right subtrees
 * - Modifies the linked list (disconnects parts)
 *
 * TIME: O(n log n), SPACE: O(log n)
 *
 * APPROACH 3: Inorder Simulation (OPTIMAL)
 * - First find length of linked list
 * - Simulate inorder traversal using indices
 * - Build tree in the same order as inorder traversal
 * - Most efficient: O(n) time, O(log n) space
 *
 * TIME: O(n), SPACE: O(log n)
 *
 * APPROACH 4: Iterative
 * - Convert to array, then build tree level by level
 * - Uses queue to manage construction
 * - Alternative iterative approach
 *
 * TIME: O(n), SPACE: O(n)
 */

// Run the demonstration
const demo = new LinkedListTreeDemo();
demo.runAllTests();

/**
 * KEY INSIGHTS:
 *
 * 1. SORTED PROPERTY: Inorder traversal of BST gives sorted order
 * 2. BALANCED TREE: Middle element becomes root for balance
 * 3. OPTIMAL APPROACH: Inorder simulation matches linked list traversal with tree construction
 * 4. SPACE TRADEOFF: Array approach uses more space but simpler
 *
 * WHY INORDER SIMULATION WORKS:
 * - Inorder traversal of BST visits nodes in sorted order
 * - Linked list is already sorted
 * - By building tree in inorder sequence, we naturally match the linked list order
 * - The global pointer ensures we consume linked list nodes in correct order
 */
