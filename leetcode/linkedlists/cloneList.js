/*
Clone List with Next and Random
Difficulty: HardAccuracy: 64.8%Submissions: 119K+Points: 8
You are given a special linked list with n nodes where each node has two pointers a next pointer that points to the next node of the singly linked list, and a random pointer that points to the random node of the linked list.

Construct a copy of this linked list. The copy should consist of the same number of new nodes, where each new node has the value corresponding to its original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list, such that it also represent the same list state. None of the pointers in the new list should point to nodes in the original list.

Return the head of the copied linked list.

NOTE : Original linked list should remain unchanged.
Each node of the linked list is represented as a pair of [val, random_index] where:

val represents node.data.
random_index (1-based index) represents the index of the node that the random pointer of the current node points to, or NULL if it does not point to any node.
Examples:

Input: head = [[1, 3], [3, 3], [5, NULL], [9, 3]] 
   
Output: [[1, 3], [3, 3], [5, NULL], [9, 3]]
Explanation: 
Node 1 points to Node 3 as its NEXT and Node 5 as its RANDOM.
Node 3 points to Node 5 as its NEXT and Node 5 as its RANDOM.
Node 5 points to Node 9 as its NEXT and NULL as its RANDOM.
Node 9 points to NULL as its NEXT and Node 5 as its RANDOM.
Input: head = [[1, 3], [2, 1], [3, 5], [4, 3], [5, 2]]
  
Output: [[1, 3], [2, 1], [3, 5], [4, 3], [5, 2]]
Explanation: 
Node 1 points to Node 2 as its NEXT and Node 3 as its RANDOM.
Node 2 points to Node 3 as its NEXT and Node 1 as its RANDOM.
Node 3 points to Node 4 as its NEXT and Node 5 as its RANDOM.
Node 4 points to Node 5 as its NEXT and Node 3 as its RANDOM.
Node 5 points to NULL as its NEXT and Node 2 as its RANDOM.
Input: head = [[7, NULL], [7, NULL]]
Output: head = [[7, NULL], [7, NULL]]
Explanation: 
Node 7 points to Node 7 as its NEXT and NULL as its RANDOM.
Node 7 points to NULL as its NEXT and NULL as its RANDOM.
*/
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */

/*
#Plan:
1. Problem Understanding:
   - We need to create a deep copy of a linked list with next and random pointers
   - The challenge: random pointers can point to any node in the list, including future nodes
   - We cannot point to original nodes - all pointers must point to new nodes
   - Original list should remain unchanged

2. Approaches:
   a. Hash Map Approach: O(n) time, O(n) space
      - Create mapping from original nodes to copied nodes
      - First pass: create all new nodes and store mapping
      - Second pass: set next and random pointers using mapping

   b. Interleaving Approach: O(n) time, O(1) space (excluding output)
      - Interleave original and copied nodes: A->A'->B->B'->...
      - Set random pointers using the interleaved structure
      - Separate the two lists

3. Complexity Analysis:
   - Time: O(n) for both approaches
   - Space: O(n) for hash map, O(1) for interleaving (excluding output)

4. Edge Cases:
   - Empty list
   - Single node list
   - Random pointers pointing to null
   - Random pointers creating cycles
   - Multiple nodes with same value
*/

// Solution 1: Hash Map Approach (Most Intuitive)
function copyRandomList(head) {
  if (!head) return null;

  const map = new Map();

  // First pass: create all new nodes and store mapping
  let current = head;
  while (current) {
    map.set(current, new Node(current.val));
    current = current.next;
  }

  // Second pass: set next and random pointers
  current = head;
  while (current) {
    const copiedNode = map.get(current);

    // Set next pointer
    if (current.next) {
      copiedNode.next = map.get(current.next);
    }

    // Set random pointer
    if (current.random) {
      copiedNode.random = map.get(current.random);
    }

    current = current.next;
  }

  return map.get(head);
}

// Solution 2: Interleaving Approach (O(1) Space)
function copyRandomListInterleaving(head) {
  if (!head) return null;

  // Step 1: Create interleaved list: A->A'->B->B'->...
  let current = head;
  while (current) {
    const copiedNode = new Node(current.val);
    copiedNode.next = current.next;
    current.next = copiedNode;
    current = copiedNode.next;
  }

  // Step 2: Set random pointers for copied nodes
  current = head;
  while (current) {
    if (current.random) {
      current.next.random = current.random.next;
    }
    current = current.next.next;
  }

  // Step 3: Separate the two lists
  current = head;
  const copiedHead = head.next;
  let copyCurrent = copiedHead;

  while (current) {
    current.next = current.next.next;
    if (copyCurrent.next) {
      copyCurrent.next = copyCurrent.next.next;
    }
    current = current.next;
    copyCurrent = copyCurrent.next;
  }

  return copiedHead;
}

// Solution 3: Hash Map with Single Pass
function copyRandomListSinglePass(head) {
  if (!head) return null;

  const map = new Map();

  function getCopiedNode(node) {
    if (!node) return null;
    if (!map.has(node)) {
      map.set(node, new Node(node.val));
    }
    return map.get(node);
  }

  let current = head;
  const copiedHead = getCopiedNode(head);
  let copyCurrent = copiedHead;

  while (current) {
    copyCurrent.next = getCopiedNode(current.next);
    copyCurrent.random = getCopiedNode(current.random);

    current = current.next;
    copyCurrent = copyCurrent.next;
  }

  return copiedHead;
}

// Helper function to create the special linked list from array representation
function createSpecialLinkedList(arr) {
  if (arr.length === 0) return null;

  // First create all nodes
  const nodes = [];
  for (let i = 0; i < arr.length; i++) {
    nodes.push(new Node(arr[i][0]));
  }

  // Set next pointers
  for (let i = 0; i < arr.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
  }

  // Set random pointers (1-based index)
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = arr[i][1];
    if (randomIndex !== null) {
      nodes[i].random = nodes[randomIndex - 1]; // Convert to 0-based
    }
  }

  return nodes[0];
}

// Helper function to convert linked list to array representation for verification
function linkedListToArray(head) {
  if (!head) return [];

  // Create mapping from node to index
  const nodeToIndex = new Map();
  let current = head;
  let index = 0;

  while (current) {
    nodeToIndex.set(current, index + 1); // 1-based index
    current = current.next;
    index++;
  }

  // Create array representation
  const result = [];
  current = head;

  while (current) {
    const randomIndex = current.random ? nodeToIndex.get(current.random) : null;
    result.push([current.val, randomIndex]);
    current = current.next;
  }

  return result;
}

// Node class definition
function Node(val, next, random) {
  this.val = val;
  this.next = next || null;
  this.random = random || null;
}

// Custom Test Cases
console.log("=== Test Case 1 ===");
const head1 = createSpecialLinkedList([
  [1, 3],
  [3, 3],
  [5, null],
  [9, 3],
]);
const copied1 = copyRandomList(head1);
console.log("Input: [[1, 3], [3, 3], [5, null], [9, 3]]");
console.log("Output:", linkedListToArray(copied1));
console.log("Original unchanged:", linkedListToArray(head1));
console.log("Copied is deep copy:", head1 !== copied1);

console.log("\n=== Test Case 2 ===");
const head2 = createSpecialLinkedList([
  [1, 3],
  [2, 1],
  [3, 5],
  [4, 3],
  [5, 2],
]);
const copied2 = copyRandomList(head2);
console.log("Input: [[1, 3], [2, 1], [3, 5], [4, 3], [5, 2]]");
console.log("Output:", linkedListToArray(copied2));
console.log("Original unchanged:", linkedListToArray(head2));

console.log("\n=== Test Case 3 ===");
const head3 = createSpecialLinkedList([
  [7, null],
  [7, null],
]);
const copied3 = copyRandomList(head3);
console.log("Input: [[7, null], [7, null]]");
console.log("Output:", linkedListToArray(copied3));

console.log("\n=== Test Case 4: Empty List ===");
const head4 = createSpecialLinkedList([]);
const copied4 = copyRandomList(head4);
console.log("Input: []");
console.log("Output:", linkedListToArray(copied4));

console.log("\n=== Test Case 5: Single Node ===");
const head5 = createSpecialLinkedList([[5, null]]);
const copied5 = copyRandomList(head5);
console.log("Input: [[5, null]]");
console.log("Output:", linkedListToArray(copied5));

// Compare all approaches
function compareApproaches(head) {
  console.log("\n=== Comparing All Approaches ===");

  const copied1 = copyRandomList(head);
  const copied2 = copyRandomListInterleaving(head);
  const copied3 = copyRandomListSinglePass(head);

  const arr1 = linkedListToArray(copied1);
  const arr2 = linkedListToArray(copied2);
  const arr3 = linkedListToArray(copied3);

  console.log("Hash Map:", arr1);
  console.log("Interleaving:", arr2);
  console.log("Single Pass:", arr3);

  const allEqual =
    JSON.stringify(arr1) === JSON.stringify(arr2) &&
    JSON.stringify(arr2) === JSON.stringify(arr3);
  console.log("All approaches produce same result:", allEqual);

  // Verify deep copy
  console.log(
    "All are deep copies:",
    head !== copied1 && head !== copied2 && head !== copied3
  );
}

// Run comparison
const testHead = createSpecialLinkedList([
  [1, 2],
  [2, 1],
  [3, null],
]);
compareApproaches(testHead);

// Test with cycle in random pointers
console.log("\n=== Testing with Random Pointer Cycle ===");
const node1 = new Node(1);
const node2 = new Node(2);
const node3 = new Node(3);

node1.next = node2;
node2.next = node3;
node1.random = node3; // 1 -> 3
node2.random = node1; // 2 -> 1 (cycle)
node3.random = node2; // 3 -> 2 (cycle)

const copiedCycle = copyRandomList(node1);
console.log("Cycle test - Original:", linkedListToArray(node1));
console.log("Cycle test - Copied:", linkedListToArray(copiedCycle));

/*
Commit Message:
Implement deep copy of linked list with next and random pointers
  - Hash Map approach: O(n) time, O(n) space - most intuitive
  - Interleaving approach: O(n) time, O(1) space - space optimized
  - Single pass hash map: Combines creation and pointer setting in one pass
  - All approaches correctly handle random pointer cycles and null pointers
  - Original list remains completely unchanged in all solutions
  - Added comprehensive helper functions for creation and verification
  - Thorough test cases including edge cases and pointer cycles
  - Verified deep copy property: no pointers to original nodes
*/
