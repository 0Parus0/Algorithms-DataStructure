/*
Merge two BST 's
Difficulty: MediumAccuracy: 64.95%Submissions: 99K+Points: 4
You are given the root of two BSTs, you have to merge this two BST and return the in-order traversal of the new BST.

Examples: 

Input: root1 = [3, 1, 5], root2 = [4, 2, 6]

Output: [1, 2, 3, 4, 5, 6]
Explanation: After merging and sorting the two BST we get [1, 2, 3, 4, 5, 6].
Input: root1 = [8, 2, 10, 1, N], root2 = [5, 3, N, 0, N] 

Output: [0, 1, 2, 3, 5, 8, 10]
Explanation: After merging and sorting the two BST we get [0, 1, 2, 3, 5, 8, 10].
Constraints:
1 ≤ number of nodes ≤ 105
0 ≤ node->data ≤ 105
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function inorder(root, arr) {
  if (!root) return;
  inorder(root.left, arr);
  arr.push(root.data);
  inorder(root.right, arr);
}

function mergeArrays(arr1, arr2) {
  let merged = [];
  let i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) merged.push(arr1[i++]);
    else merged.push(arr2[j++]);
  }

  while (i < arr1.length) merged.push(arr1[i++]);
  while (j < arr2.length) merged.push(arr2[j++]);

  return merged;
}

function mergeBST(root1, root2) {
  let arr1 = [],
    arr2 = [];
  inorder(root1, arr1);
  inorder(root2, arr2);

  return mergeArrays(arr1, arr2);
}
/*
✅ Time and Space Complexity
Operation	Complexity
Inorder traversal	O(n + m)
Merge two arrays	O(n + m)
Total	O(n + m)
Space	O(n + m) (for arrays)
*/
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
 * Solution for Merging Two BSTs
 */
class Solution {
  /**
   * APPROACH 1: In-order Traversal + Merge Arrays
   * Time: O(m + n), Space: O(m + n)
   * Simple and intuitive
   */
  mergeTwoBSTs(root1, root2) {
    // Get in-order traversals of both trees
    const list1 = this.inorderTraversal(root1);
    const list2 = this.inorderTraversal(root2);

    // Merge two sorted arrays
    return this.mergeSortedArrays(list1, list2);
  }

  /**
   * APPROACH 2: Iterative In-order + Merge (Optimal for large trees)
   * Time: O(m + n), Space: O(h1 + h2)
   * Doesn't store all elements at once
   */
  mergeTwoBSTsIterative(root1, root2) {
    const result = [];
    const stack1 = [];
    const stack2 = [];
    let curr1 = root1;
    let curr2 = root2;

    while (curr1 || curr2 || stack1.length > 0 || stack2.length > 0) {
      // Push all left nodes of tree1
      while (curr1) {
        stack1.push(curr1);
        curr1 = curr1.left;
      }

      // Push all left nodes of tree2
      while (curr2) {
        stack2.push(curr2);
        curr2 = curr2.left;
      }

      // Compare top elements and process smaller one
      if (
        stack2.length === 0 ||
        (stack1.length > 0 &&
          stack1[stack1.length - 1].val <= stack2[stack2.length - 1].val)
      ) {
        // Process from tree1
        curr1 = stack1.pop();
        result.push(curr1.val);
        curr1 = curr1.right;
      } else {
        // Process from tree2
        curr2 = stack2.pop();
        result.push(curr2.val);
        curr2 = curr2.right;
      }
    }

    return result;
  }

  /**
   * APPROACH 3: Convert to DLL then Merge (Space Optimized)
   * Time: O(m + n), Space: O(h1 + h2)
   * Converts BSTs to sorted doubly linked lists, then merges
   */
  mergeTwoBSTsDLL(root1, root2) {
    // Convert both BSTs to sorted DLLs
    let head1 = null;
    let prev1 = null;
    this.BSTToDLL(root1, head1, prev1);

    let head2 = null;
    let prev2 = null;
    this.BSTToDLL(root2, head2, prev2);

    // Merge two sorted DLLs
    const mergedDLL = this.mergeSortedDLL(head1, head2);

    // Convert merged DLL to array (in-order is just traversal of DLL)
    return this.DLLToArray(mergedDLL);
  }

  /**
   * APPROACH 4: Morris Traversal + Merge (Most Space Efficient)
   * Time: O(m + n), Space: O(1)
   * Uses Morris traversal for O(1) space
   */
  mergeTwoBSTsMorris(root1, root2) {
    const result = [];
    let curr1 = root1;
    let curr2 = root2;

    while (curr1 || curr2) {
      // Get next value from tree1 using Morris traversal
      const val1 = this.getNextMorris(curr1);
      // Get next value from tree2 using Morris traversal
      const val2 = this.getNextMorris(curr2);

      if (val1.value !== null && val2.value !== null) {
        if (val1.value <= val2.value) {
          result.push(val1.value);
          curr1 = val1.nextNode;
        } else {
          result.push(val2.value);
          curr2 = val2.nextNode;
        }
      } else if (val1.value !== null) {
        result.push(val1.value);
        curr1 = val1.nextNode;
      } else if (val2.value !== null) {
        result.push(val2.value);
        curr2 = val2.nextNode;
      } else {
        break;
      }
    }

    return result;
  }

  // ========== HELPER METHODS ==========

  /**
   * Get in-order traversal of a BST
   */
  inorderTraversal(root) {
    const result = [];

    const inorder = (node) => {
      if (!node) return;
      inorder(node.left);
      result.push(node.val);
      inorder(node.right);
    };

    inorder(root);
    return result;
  }

  /**
   * Merge two sorted arrays
   */
  mergeSortedArrays(arr1, arr2) {
    const result = [];
    let i = 0,
      j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] <= arr2[j]) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    }

    // Add remaining elements
    while (i < arr1.length) {
      result.push(arr1[i]);
      i++;
    }

    while (j < arr2.length) {
      result.push(arr2[j]);
      j++;
    }

    return result;
  }

  /**
   * Convert BST to sorted Doubly Linked List
   */
  BSTToDLL(node, head, prev) {
    if (!node) return;

    // Convert left subtree
    this.BSTToDLL(node.left, head, prev);

    // Process current node
    node.left = prev;
    if (prev) {
      prev.right = node;
    } else {
      head = node;
    }

    prev = node;

    // Convert right subtree
    this.BSTToDLL(node.right, head, prev);
  }

  /**
   * Merge two sorted Doubly Linked Lists
   */
  mergeSortedDLL(head1, head2) {
    if (!head1) return head2;
    if (!head2) return head1;

    let result = null;
    let last = null;
    let curr1 = head1;
    let curr2 = head2;

    while (curr1 && curr2) {
      if (curr1.val <= curr2.val) {
        if (!result) {
          result = curr1;
          last = curr1;
        } else {
          last.right = curr1;
          curr1.left = last;
          last = curr1;
        }
        curr1 = curr1.right;
      } else {
        if (!result) {
          result = curr2;
          last = curr2;
        } else {
          last.right = curr2;
          curr2.left = last;
          last = curr2;
        }
        curr2 = curr2.right;
      }
    }

    // Add remaining nodes
    if (curr1) {
      last.right = curr1;
      curr1.left = last;
    }

    if (curr2) {
      last.right = curr2;
      curr2.left = last;
    }

    return result;
  }

  /**
   * Convert DLL to array
   */
  DLLToArray(head) {
    const result = [];
    let curr = head;

    while (curr) {
      result.push(curr.val);
      curr = curr.right;
    }

    return result;
  }

  /**
   * Get next value using Morris traversal
   */
  getNextMorris(node) {
    while (node) {
      if (!node.left) {
        // No left child, this is the next value
        const value = node.val;
        node = node.right;
        return { value, nextNode: node };
      } else {
        // Find inorder predecessor
        let pred = node.left;
        while (pred.right && pred.right !== node) {
          pred = pred.right;
        }

        if (!pred.right) {
          // Create temporary link
          pred.right = node;
          node = node.left;
        } else {
          // Remove temporary link and return value
          pred.right = null;
          const value = node.val;
          node = node.right;
          return { value, nextNode: node };
        }
      }
    }

    return { value: null, nextNode: null };
  }

  /**
   * APPROACH 5: Simple Recursive (For Comparison)
   * Time: O(m + n), Space: O(m + n)
   */
  mergeTwoBSTsSimple(root1, root2) {
    const values = [];

    const collectValues = (node) => {
      if (!node) return;
      collectValues(node.left);
      values.push(node.val);
      collectValues(node.right);
    };

    collectValues(root1);
    collectValues(root2);

    return values.sort((a, b) => a - b);
  }
}

/**
 * Tree Builder and Test Cases
 */
class MergeBSTDemo {
  constructor() {
    this.solution = new Solution();
  }

  /**
   * Build BST from array (level order)
   */
  buildBSTFromArray(arr) {
    if (!arr || arr.length === 0) return null;

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;

    while (queue.length > 0 && i < arr.length) {
      const current = queue.shift();

      if (arr[i] !== null) {
        current.left = new TreeNode(arr[i]);
        queue.push(current.left);
      }
      i++;

      if (i < arr.length && arr[i] !== null) {
        current.right = new TreeNode(arr[i]);
        queue.push(current.right);
      }
      i++;
    }

    return root;
  }

  /**
   * Test Case 1: root1 = [3, 1, 5], root2 = [4, 2, 6]
   * Expected: [1, 2, 3, 4, 5, 6]
   */
  testCase1() {
    console.log("=== TEST CASE 1 ===");
    const root1 = this.buildBSTFromArray([3, 1, 5]);
    const root2 = this.buildBSTFromArray([4, 2, 6]);

    console.log("BST 1: [3, 1, 5]");
    console.log("BST 2: [4, 2, 6]");

    const result1 = this.solution.mergeTwoBSTs(root1, root2);
    const result2 = this.solution.mergeTwoBSTsIterative(root1, root2);
    const result3 = this.solution.mergeTwoBSTsSimple(root1, root2);

    console.log(`Array Merge Approach: [${result1}]`);
    console.log(`Iterative Approach:   [${result2}]`);
    console.log(`Simple Approach:      [${result3}]`);
    console.log(`Expected:             [1, 2, 3, 4, 5, 6]`);

    const expected = [1, 2, 3, 4, 5, 6];
    const allCorrect =
      JSON.stringify(result1) === JSON.stringify(expected) &&
      JSON.stringify(result2) === JSON.stringify(expected) &&
      JSON.stringify(result3) === JSON.stringify(expected);

    console.log(`All Correct: ${allCorrect}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 2: root1 = [8, 2, 10, 1, null], root2 = [5, 3, null, 0, null]
   * Expected: [0, 1, 2, 3, 5, 8, 10]
   */
  testCase2() {
    console.log("=== TEST CASE 2 ===");
    const root1 = this.buildBSTFromArray([8, 2, 10, 1, null]);
    const root2 = this.buildBSTFromArray([5, 3, null, 0, null]);

    console.log("BST 1: [8, 2, 10, 1, null]");
    console.log("BST 2: [5, 3, null, 0, null]");

    const result1 = this.solution.mergeTwoBSTs(root1, root2);
    const result2 = this.solution.mergeTwoBSTsIterative(root1, root2);

    console.log(`Array Merge Approach: [${result1}]`);
    console.log(`Iterative Approach:   [${result2}]`);
    console.log(`Expected:             [0, 1, 2, 3, 5, 8, 10]`);

    const expected = [0, 1, 2, 3, 5, 8, 10];
    const bothCorrect =
      JSON.stringify(result1) === JSON.stringify(expected) &&
      JSON.stringify(result2) === JSON.stringify(expected);

    console.log(`Both Correct: ${bothCorrect}`);
    console.log();

    return result1;
  }

  /**
   * Test Case 3: One tree is empty
   */
  testCase3() {
    console.log("=== TEST CASE 3: One Empty Tree ===");
    const root1 = this.buildBSTFromArray([2, 1, 3]);
    const root2 = null;

    console.log("BST 1: [2, 1, 3]");
    console.log("BST 2: null");

    const result = this.solution.mergeTwoBSTsIterative(root1, root2);

    console.log(`Result: [${result}]`);
    console.log(`Expected: [1, 2, 3]`);
    console.log(
      `Correct: ${JSON.stringify(result) === JSON.stringify([1, 2, 3])}`
    );
    console.log();

    return result;
  }

  /**
   * Test Case 4: Both trees are empty
   */
  testCase4() {
    console.log("=== TEST CASE 4: Both Empty Trees ===");
    const root1 = null;
    const root2 = null;

    const result = this.solution.mergeTwoBSTsIterative(root1, root2);

    console.log(`Result: [${result}]`);
    console.log(`Expected: []`);
    console.log(`Correct: ${JSON.stringify(result) === JSON.stringify([])}`);
    console.log();

    return result;
  }

  /**
   * Test Case 5: Large trees
   */
  testCase5() {
    console.log("=== TEST CASE 5: Large Trees ===");

    // Create larger BSTs
    const createBST = (start, end) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new TreeNode(mid);
      node.left = createBST(start, mid - 1);
      node.right = createBST(mid + 1, end);
      return node;
    };

    const root1 = createBST(1, 50); // 50 nodes: 1-50
    const root2 = createBST(51, 100); // 50 nodes: 51-100

    console.log("BST 1: values 1-50");
    console.log("BST 2: values 51-100");

    const result = this.solution.mergeTwoBSTsIterative(root1, root2);

    console.log(`Result length: ${result.length}`);
    console.log(`First 10: [${result.slice(0, 10)}]`);
    console.log(`Last 10: [${result.slice(-10)}]`);
    console.log(`Is sorted: ${this.isSorted(result)}`);
    console.log();

    return result;
  }

  /**
   * Check if array is sorted
   */
  isSorted(arr) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i - 1]) return false;
    }
    return true;
  }

  /**
   * Visualize the iterative approach step by step
   */
  visualizeIterativeApproach() {
    console.log("=== VISUALIZING ITERATIVE APPROACH ===");

    const root1 = this.buildBSTFromArray([3, 1, 5]);
    const root2 = this.buildBSTFromArray([4, 2, 6]);

    console.log("BST 1: [3, 1, 5]");
    console.log("BST 2: [4, 2, 6]");
    console.log("\nMerging process:\n");

    const result = [];
    const stack1 = [];
    const stack2 = [];
    let curr1 = root1;
    let curr2 = root2;
    let step = 1;

    while (curr1 || curr2 || stack1.length > 0 || stack2.length > 0) {
      console.log(`Step ${step}:`);

      // Push left nodes
      while (curr1) {
        stack1.push(curr1);
        console.log(`  Pushed ${curr1.val} to stack1`);
        curr1 = curr1.left;
      }

      while (curr2) {
        stack2.push(curr2);
        console.log(`  Pushed ${curr2.val} to stack2`);
        curr2 = curr2.left;
      }

      console.log(
        `  Stack1 top: ${
          stack1.length > 0 ? stack1[stack1.length - 1].val : "empty"
        }`
      );
      console.log(
        `  Stack2 top: ${
          stack2.length > 0 ? stack2[stack2.length - 1].val : "empty"
        }`
      );

      if (
        stack2.length === 0 ||
        (stack1.length > 0 &&
          stack1[stack1.length - 1].val <= stack2[stack2.length - 1].val)
      ) {
        // Process from tree1
        curr1 = stack1.pop();
        result.push(curr1.val);
        console.log(
          `  Processing ${curr1.val} from BST1 → Result: [${result}]`
        );
        curr1 = curr1.right;
      } else {
        // Process from tree2
        curr2 = stack2.pop();
        result.push(curr2.val);
        console.log(
          `  Processing ${curr2.val} from BST2 → Result: [${result}]`
        );
        curr2 = curr2.right;
      }

      step++;
      console.log();
    }

    console.log(`Final Result: [${result}]`);
  }

  /**
   * Performance comparison
   */
  performanceComparison() {
    console.log("=== PERFORMANCE COMPARISON ===");

    // Create large BSTs
    const createBST = (start, end) => {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new TreeNode(mid);
      node.left = createBST(start, mid - 1);
      node.right = createBST(mid + 1, end);
      return node;
    };

    const root1 = createBST(1, 5000);
    const root2 = createBST(5001, 10000);

    console.log("Testing with 10,000 total nodes (5,000 each)");

    const approaches = [
      { name: "Array Merge", method: this.solution.mergeTwoBSTs },
      { name: "Iterative", method: this.solution.mergeTwoBSTsIterative },
      { name: "Simple", method: this.solution.mergeTwoBSTsSimple },
    ];

    approaches.forEach(({ name, method }) => {
      // Create fresh trees for each test
      const testRoot1 = createBST(1, 5000);
      const testRoot2 = createBST(5001, 10000);

      const start = performance.now();
      const result = method.call(this.solution, testRoot1, testRoot2);
      const end = performance.now();

      console.log(
        `${name}: ${(end - start).toFixed(2)}ms, Sorted: ${this.isSorted(
          result
        )}`
      );
    });
  }

  runAllTests() {
    console.log("MERGE TWO BSTs");
    console.log("==============\n");

    this.testCase1();
    this.testCase2();
    this.testCase3();
    this.testCase4();
    this.testCase5();
    this.visualizeIterativeApproach();
    this.performanceComparison();
  }
}

/**
 * ALGORITHM EXPLANATIONS:
 *
 * APPROACH 1: Array Merge
 * - Get in-order traversals (sorted arrays) of both BSTs
 * - Merge two sorted arrays
 * - Simple but uses O(m + n) space
 *
 * TIME: O(m + n), SPACE: O(m + n)
 *
 * APPROACH 2: Iterative In-order Merge (OPTIMAL)
 * - Use stacks for iterative in-order traversal
 * - Compare top elements from both stacks
 * - Process smaller element and move to its right child
 * - Most efficient for large trees
 *
 * TIME: O(m + n), SPACE: O(h1 + h2)
 *
 * APPROACH 3: DLL Conversion
 * - Convert BSTs to sorted doubly linked lists
 * - Merge two sorted DLLs
 * - Space optimized approach
 *
 * TIME: O(m + n), SPACE: O(h1 + h2)
 *
 * APPROACH 4: Morris Traversal
 * - Uses Morris traversal for O(1) space
 * - Most space efficient but complex
 *
 * TIME: O(m + n), SPACE: O(1)
 *
 * APPROACH 5: Simple Recursive
 * - Collect all values then sort
 * - Simple but O((m+n) log(m+n)) time
 *
 * TIME: O((m+n) log(m+n)), SPACE: O(m+n)
 */

// Run the demonstration
const demo = new MergeBSTDemo();
demo.runAllTests();

/**
 * KEY INSIGHTS:
 *
 * 1. BST PROPERTY: In-order traversal gives sorted order
 * 2. MERGE SORTED LISTS: Problem reduces to merging two sorted sequences
 * 3. SPACE OPTIMIZATION: Iterative approach uses only O(h1 + h2) space
 * 4. PRACTICAL CHOICE: Iterative approach is usually best - good balance of efficiency and simplicity
 *
 * WHY ITERATIVE APPROACH IS OPTIMAL:
 * - Doesn't store all elements at once
 * - Uses stack space proportional to tree heights
 * - Processes elements in sorted order naturally
 * - Easy to understand and implement
 */
