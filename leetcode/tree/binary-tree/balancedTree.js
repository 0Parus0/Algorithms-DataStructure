/*
110. Balanced Binary Tree
Easy
Topics
premium lock iconCompanies

Given a binary tree, determine if it is

.

 

Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: true

Example 2:

Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

Example 3:

Input: root = []
Output: true

 

Constraints:

    The number of nodes in the tree is in the range [0, 5000].
    -104 <= Node.val <= 104
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  let balanced = true;

  function height(node) {
    if (!node) return 0;
    if (!balanced) return 0; // Early exit if already unbalanced

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      balanced = false;
    }

    return 1 + Math.max(leftHeight, rightHeight);
  }

  height(root);
  return balanced;
};

// ======================================================
// 🌳 IS BALANCED BINARY TREE
// ======================================================

/*
Step 1: Understand the Problem
We need to determine if a binary tree is "height-balanced".
A binary tree is height-balanced if for every node:
  | height(left subtree) - height(right subtree) | ≤ 1

Step 2: Break down input data & transformations
Input: root node of a binary tree
Output: boolean (true if balanced, false if not)

Step 3: Edge cases
- Empty tree → true (by definition)
- Single node → true
- Unbalanced example: 
        1
       /
      2
     /
    3
  → false

Step 4: Plan / Approach
We can compute the height of each subtree recursively while checking balance.
At each node:
  - Recursively get height of left subtree
  - Recursively get height of right subtree
  - If their difference > 1 → mark tree as unbalanced
  - Return height = 1 + max(leftHeight, rightHeight)

Optimization:
  - Use a shared boolean flag `balanced`
  - If at any point it's false, stop further recursion (early exit)

Step 5: Dry run
Example tree:
       1
      / \
     2   3
    / \
   4   5

→ Balanced, because each node’s left/right heights differ by ≤ 1.

Let's dry run step by step:

height(4) = 1  
height(5) = 1  
height(2) = 1 + max(1,1) = 2  
height(3) = 1  
height(1) = 1 + max(2,1) = 3  
No difference exceeds 1 → balanced = true → return true

Now, if we had:
       1
      /
     2
    /
   3

height(3)=1  
height(2)=1+max(1,0)=2  
height(1)=1+max(2,0)=3  
At node 1 → |2-0| = 2 → unbalanced → balanced=false → early exit

Step 6: Code Implementation
Step 7: Time & Space complexity
  - Time: O(n) → each node visited once
  - Space: O(h) → recursion stack (h = height of tree)
*/

var isBalanced = function (root) {
  let balanced = true; // global flag to track imbalance

  function height(node) {
    if (!node) return 0;
    if (!balanced) return 0; // Early exit if already unbalanced

    const leftHeight = height(node.left);
    const rightHeight = height(node.right);

    // Check current node balance
    if (Math.abs(leftHeight - rightHeight) > 1) {
      balanced = false;
    }

    // Return height for parent's use
    return 1 + Math.max(leftHeight, rightHeight);
  }

  height(root);
  return balanced;
};

var isBalancedOpt = function (root) {
  function getHeight(node) {
    if (!node) return 0;

    const leftHeight = getHeight(node.left);
    if (leftHeight === -1) return -1; // Propagate imbalance

    const rightHeight = getHeight(node.right);
    if (rightHeight === -1) return -1; // Propagate imbalance

    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    return 1 + Math.max(leftHeight, rightHeight);
  }

  return getHeight(root) !== -1;
};
