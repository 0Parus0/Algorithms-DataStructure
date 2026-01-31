// ======================================================
// 1️⃣ PRE-ORDER TRAVERSAL (Root → Left → Right)
// ======================================================

/*
Step 1: Understand the Problem
We must visit each node in a binary tree in this order:
  - Visit root node
  - Traverse left subtree
  - Traverse right subtree

Step 2: Break down input data & transformations
Input: root node of a binary tree
Output: array of node values in pre-order sequence

Step 3: Edge cases
- If tree is empty → return []
- If only root exists → return [root.val]

Step 4: Plan / Approach
Recursive:
  - Base: if node is null → return
  - Visit node (push its value)
  - Recur for left subtree
  - Recur for right subtree

Step 5: Dry run (for tree [1,2,3,4,5,null,6])
Output → [1, 2, 4, 5, 3, 6]

Step 6: Code implementation
Step 7: Time & Space complexity
  - Time: O(n)
  - Space: O(h) recursion stack (worst O(n))
*/

function preorderTraversal(root) {
  const result = [];

  function dfs(node) {
    if (!node) return;
    result.push(node.val); // visit root
    dfs(node.left); // left
    dfs(node.right); // right
  }

  dfs(root);
  return result;
}

// ======================================================
// 2️⃣ IN-ORDER TRAVERSAL (Left → Root → Right)
// ======================================================

/*
Step 1: Understand the Problem
We must visit nodes in this order:
  - Traverse left subtree
  - Visit root node
  - Traverse right subtree

Step 2: Input / Output
Input: root node of binary tree
Output: array of node values in in-order sequence

Step 3: Edge cases
- Empty tree → []
- Single node → [root.val]

Step 4: Plan / Approach
Recursive:
  - Base: if node is null → return
  - Recur for left subtree
  - Visit node
  - Recur for right subtree

Step 5: Dry run (tree [1,2,3,4,5,null,6])
Output → [4, 2, 5, 1, 3, 6]

Step 6: Code implementation
Step 7: Time: O(n), Space: O(h)
*/

function inorderTraversal(root) {
  const result = [];

  function dfs(node) {
    if (!node) return;
    dfs(node.left); // left
    result.push(node.val); // root
    dfs(node.right); // right
  }

  dfs(root);
  return result;
}

// ======================================================
// 3️⃣ POST-ORDER TRAVERSAL (Left → Right → Root)
// ======================================================

/*
Step 1: Understand the Problem
We must visit nodes in this order:
  - Traverse left subtree
  - Traverse right subtree
  - Visit root node

Step 2: Input / Output
Input: root node of binary tree
Output: array of node values in post-order sequence

Step 3: Edge cases
- Empty tree → []
- Single node → [root.val]

Step 4: Plan / Approach
Recursive:
  - Base: if node is null → return
  - Recur for left subtree
  - Recur for right subtree
  - Visit node

Step 5: Dry run (tree [1,2,3,4,5,null,6])
Output → [4, 5, 2, 6, 3, 1]

Step 6: Code implementation
Step 7: Time: O(n), Space: O(h)
*/

function postorderTraversal(root) {
  const result = [];

  function dfs(node) {
    if (!node) return;
    dfs(node.left); // left
    dfs(node.right); // right
    result.push(node.val); // root
  }

  dfs(root);
  return result;
}

// ======================================================
// 4️⃣ LEVEL-ORDER TRAVERSAL (Breadth-First Search)
// ======================================================

/*
Step 1: Understand the Problem
We must traverse level by level from top to bottom (left to right).

Step 2: Input / Output
Input: root node of binary tree
Output: array of node values in level order

Step 3: Edge cases
- Empty tree → []
- Single node → [root.val]

Step 4: Plan / Approach
Use a queue:
  - Push root into queue
  - While queue not empty:
      - Dequeue front node
      - Visit node
      - Enqueue its left & right children (if exist)

Step 5: Dry run (tree [1,2,3,4,5,null,6])
Queue process:
  → [1] → visit 1 → enqueue [2,3]
  → visit 2 → enqueue [4,5]
  → visit 3 → enqueue [6]
Result → [1, 2, 3, 4, 5, 6]

Step 6: Code implementation
Step 7: Time: O(n), Space: O(n)
*/

function levelOrderTraversal(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length) {
    const node = queue.shift();
    result.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}
