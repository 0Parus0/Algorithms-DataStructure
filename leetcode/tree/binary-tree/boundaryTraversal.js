/*
Tree Boundary Traversal
Difficulty: MediumAccuracy: 23.33%Submissions: 501K+Points: 4Average Time: 35m
Given a Binary Tree, find its Boundary Traversal. The traversal should be in the following order: 

Left Boundary: This includes all the nodes on the path from the root to the leftmost leaf node. You must prefer the left child over the right child when traversing. Do not include leaf nodes in this section.

Leaf Nodes: All leaf nodes, in left-to-right order, that are not part of the left or right boundary.

Reverse Right Boundary: This includes all the nodes on the path from the rightmost leaf node to the root, traversed in reverse order. You must prefer the right child over the left child when traversing. Do not include the root in this section if it was already included in the left boundary.

Note: If the root doesn't have a left subtree or right subtree, then the root itself is the left or right boundary. 

Examples:

Input: root[] = [1, 2, 3, 4, 5, 6, 7, N, N, 8, 9, N, N, N, N]
Output: [1, 2, 4, 8, 9, 6, 7, 3]
Explanation:
 
Input: root[] = [1, N, 2, N, 3, N, 4, N, N] 
Output: [1, 4, 3, 2]
Explanation:

Left boundary: [1] (as there is no left subtree)
Leaf nodes: [4]
Right boundary: [3, 2] (in reverse order)
Final traversal: [1, 4, 3, 2]
Constraints:
1 ≤ number of nodes ≤ 105
1 ≤ node->data ≤ 105
*/
// Tree Node definition
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// --------------------- Recursive Solution -----------
function boundaryTraversal(root) {
  if (!root) return [];

  const result = [];

  // Add root if it is not a leaf
  if (!isLeaf(root)) {
    result.push(root.data);
  }

  // Add left boundary (excluding leaves and root)
  addLeftBoundaryRecursive(root.left, result);

  // Add leaves
  addLeavesRecursive(root, result);

  // Add right boundary in reverse (excluding leaves and root)
  addRightBoundaryRecursive(root.right, result);

  return result;
}

function isLeaf(node) {
  return !node.left && !node.right;
}

function addLeftBoundaryRecursive(node, result) {
  if (!node || isLeaf(node)) return;

  result.push(node.data);

  if (node.left) {
    addLeftBoundaryRecursive(node.left, result);
  } else {
    addLeftBoundaryRecursive(node.right, result);
  }
}

function addLeavesRecursive(node, result) {
  if (!node) return;

  if (isLeaf(node)) {
    result.push(node.data);
    return;
  }

  addLeavesRecursive(node.left, result);
  addLeavesRecursive(node.right, result);
}

function addRightBoundaryRecursive(node, result) {
  if (!node || isLeaf(node)) return;

  if (node.right) {
    addRightBoundaryRecursive(node.right, result);
  } else {
    addRightBoundaryRecursive(node.left, result);
  }

  result.push(node.data); // Add after recursion for reverse order
}

// ---------- Helper Functions ----------

// 1. Left Boundary (excluding leaves)
function getLeftBoundary(root, boundary) {
  let curr = root.left;
  while (curr) {
    if (!(curr.left === null && curr.right === null)) {
      boundary.push(curr.data); // exclude leaves
    }
    if (curr.left) curr = curr.left;
    else curr = curr.right;
  }
}

// 2. Leaf Nodes
function getLeaves(root, boundary) {
  if (!root) return;
  if (root.left === null && root.right === null) {
    boundary.push(root.data);
    return;
  }
  getLeaves(root.left, boundary);
  getLeaves(root.right, boundary);
}

// 3. Right Boundary (excluding leaves)
// Tree Node definition
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// ---------- Helper Functions ----------

// 1. Left Boundary (excluding leaves)
function getLeftBoundary(root, boundary) {
  let curr = root.left;
  while (curr) {
    if (!(curr.left === null && curr.right === null)) {
      boundary.push(curr.data); // exclude leaves
    }
    if (curr.left) curr = curr.left;
    else curr = curr.right;
  }
}

// 2. Leaf Nodes
function getLeaves(root, boundary) {
  if (!root) return;
  if (root.left === null && root.right === null) {
    boundary.push(root.data);
    return;
  }
  getLeaves(root.left, boundary);
  getLeaves(root.right, boundary);
}

// 3. Right Boundary (excluding leaves)
function getRightBoundary(root, boundary) {
  let curr = root.right;
  let temp = [];
  while (curr) {
    if (!(curr.left === null && curr.right === null)) {
      temp.push(curr.data); // exclude leaves
    }
    if (curr.right) curr = curr.right;
    else curr = curr.left;
  }
  // reverse before adding
  for (let i = temp.length - 1; i >= 0; i--) {
    boundary.push(temp[i]);
  }
}

// ---------- Main Function ----------
function boundaryTraversalChatGPT(root) {
  if (!root) return [];

  let boundary = [];

  // Step 1: Root
  if (!(root.left === null && root.right === null)) {
    boundary.push(root.data);
  }

  // Step 2: Left Boundary
  getLeftBoundary(root, boundary);

  // Step 3: Leaf Nodes
  getLeaves(root, boundary);

  // Step 4: Right Boundary
  getRightBoundary(root, boundary);

  return boundary;
}

function boundaryTraversalDeepSeek(root) {
  if (!root) return [];

  const result = [];

  // Add root if it is not a leaf
  if (!isLeaf(root)) {
    result.push(root.data);
  }

  // Add left boundary (excluding leaves)
  addLeftBoundary(root, result);

  // Add leaves
  addLeaves(root, result);

  // Add right boundary in reverse (excluding leaves and root)
  addRightBoundary(root, result);

  return result;
}

function isLeaf(node) {
  return !node.left && !node.right;
}

function addLeftBoundary(root, result) {
  let node = root.left;
  while (node) {
    if (!isLeaf(node)) {
      result.push(node.data);
    }
    if (node.left) {
      node = node.left;
    } else {
      node = node.right;
    }
  }
}

function addLeaves(root, result) {
  if (!root) return;
  if (isLeaf(root)) {
    result.push(root.data);
    return;
  }
  addLeaves(root.left, result);
  addLeaves(root.right, result);
}

function addRightBoundary(root, result) {
  const stack = [];
  let node = root.right;
  while (node) {
    if (!isLeaf(node)) {
      stack.push(node.data);
    }
    if (node.right) {
      node = node.right;
    } else {
      node = node.left;
    }
  }
  while (stack.length) {
    result.push(stack.pop());
  }
}
