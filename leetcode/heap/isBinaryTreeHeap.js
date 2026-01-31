/*
Is Binary Tree Heap
Difficulty: MediumAccuracy: 34.41%Submissions: 138K+Points: 4
You are given a binary tree, and the task is to determine whether it satisfies the properties of a max-heap.

A binary tree is considered a max-heap if it satisfies the following conditions:

Completeness: Every level of the tree, except possibly the last, is completely filled, and all nodes are as far left as possible.
Max-Heap Property: The value of each node is greater than or equal to the values of its children.
Examples:

Input: root[] = [97, 46, 37, 12, 3, 7, 31, 6, 9]
 
Output: true
Explanation: The tree is complete and satisfies the max-heap property.
Input: root[] = [97, 46, 37, 12, 3, 7, 31, N, 2, 4] 
 
Output: false
Explanation: The tree is not complete and does not follow the Max-Heap Property, hence it is not a max-heap.
Constraints:
1 ≤ number of nodes ≤ 103
1 ≤ node->data ≤ 103
*/

function isHeap(root) {
  // Step 1.
  // Count the total nodes in the tree
  // If at any given index i :- i >= total nodes it's not complete binary tree
  function countNodes(root) {
    if (!root) return 0;
    return 1 + countNodes(root.left) + countNodes(root.right);
  }

  const totalNodes = countNodes(root);

  //Step 2.  Check if the tree is a complete binary tree (CBT)
  // If at any given index i :- i >= total nodes it's not complete binary tree
  function isCBT(root, index, nodes) {
    if (!root) return true;
    if (index >= nodes) return false;
    return (
      isCBT(root.left, 2 * index + 1, nodes) &&
      isCBT(root.right, 2 * index + 2, nodes)
    );
  }

  if (!isCBT(root, 0, totalNodes)) {
    return false;
  }

  //Step 3. Check the max-heap property
  function isMaxHeap(root) {
    // Base case: if node is null or is a leaf node
    if (!root || (!root.left && !root.right)) {
      return true;
    }

    // If left child exists, check if it violates the heap property
    if (root.left && root.data < root.left.data) {
      return false;
    }

    // If right child exists, check if it violates the heap property
    if (root.right && root.data < root.right.data) {
      return false;
    }

    // Recursively check left and right subtrees
    return isMaxHeap(root.left) && isMaxHeap(root.right);
  }

  return isMaxHeap(root);
}

function isHeap(root) {
  if (!root) return true;

  let queue = [root];
  let seenNull = false;

  while (queue.length > 0) {
    let node = queue.shift();

    // Check for completeness: if we've seen a null, all subsequent should be null
    if (node === null) {
      seenNull = true;
    } else {
      // If we've already seen a null, but current node is non-null -> not complete
      if (seenNull) {
        return false;
      }

      // Check max-heap property: node should be >= both children
      if (node.left) {
        if (node.data < node.left.data) {
          return false;
        }
        queue.push(node.left);
      } else {
        queue.push(null); // Push null to mark missing left child
      }

      if (node.right) {
        if (node.data < node.right.data) {
          return false;
        }
        queue.push(node.right);
      } else {
        queue.push(null); // Push null to mark missing right child
      }
    }
  }

  return true;
}
