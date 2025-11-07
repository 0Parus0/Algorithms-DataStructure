/*
Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

 

Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]

Example 2:

Input: root = [1]
Output: [[1]]

Example 3:

Input: root = []
Output: []

 

Constraints:

    The number of nodes in the tree is in the range [0, 2000].
    -100 <= Node.val <= 100
*/

var zigzagLevelOrderLC = function (root) {
  if (!root) return [];

  const result = [];
  const stack1 = [root]; // Right to Left (starts with root)
  const stack2 = []; // Left to Right

  while (stack1.length > 0 || stack2.length > 0) {
    const level = [];

    if (stack1.length > 0) {
      // Process Right to Left level
      while (stack1.length > 0) {
        const node = stack1.pop();
        level.push(node.val);

        // Push children in reverse order for next level
        if (node.left) stack2.push(node.left);
        if (node.right) stack2.push(node.right);
      }
    } else {
      // Process Left to Right level
      while (stack2.length > 0) {
        const node = stack2.pop();
        level.push(node.val);

        // Push children in reverse order for next level
        if (node.right) stack1.push(node.right);
        if (node.left) stack1.push(node.left);
      }
    }

    result.push(level);
  }

  return result;
};

var zigzagLevelOrderOpt = function (root) {
  if (!root) return [];

  const result = [];
  let queue = [root];
  let leftToRight = true;
  let idx = 0;

  while (idx < queue.length) {
    const levelSize = queue.length - idx;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue[idx++];

      if (leftToRight) {
        level.push(node.val);
      } else {
        level.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
    leftToRight = !leftToRight;
  }

  return result;
};

/*
Level order traversal in spiral form
Last Updated : 15 May, 2025

Given a binary tree and the task is to find the spiral order traversal of the tree and return the list containing the elements.
Spiral order Traversal: Starting from level 0 for root node, for all the even levels we print the node's value from right to left and for all the odd levels we print the node's value from left to right.

Example:

    Input: root = [1, 2, 3, 7, 6, 5, 4]

    Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    Explanation: Start with root (1), print level 0 (right to left), level 1 (left to right), and continue alternating.

    Input: root = [1, 3, 2]
    example-2
     

    Output: [1, 3, 2]
    Explanation: Start with root (1), print level 0 (right to left), then level 1 (left to right)

    Input: root = [10, 20, 30, 40, 60]
    Example-3
     

    Output: [10, 20, 30, 60, 40]
    Explanation: Start with root (10), print level 0 (right to left), level 1 (left to right), and continue alternating.
    */

function levelOrderGFG(root) {
  const s1 = []; // Stack for Right to Left
  const s2 = []; // Stack for Left to Right

  s1.push(root);
  const ans = [];

  while (s1.length > 0 || s2.length > 0) {
    if (s1.length > 0) {
      while (s1.length > 0) {
        // R to L
        let temp = s1.pop();
        ans.push(temp.val);
        if (temp.right) {
          // R to L
          s2.push(temp.right);
        }
        if (temp.left) {
          s2.push(temp.left);
        }
      }
    } else {
      while (s2.length > 0) {
        let temp = s2.pop();
        ans.push(temp.val);
        if (temp.left) {
          // L to R
          s1.push(temp.left);
        }
        if (temp.right) {
          s1.push(temp.right);
        }
      }
    }
  }
  return ans;
}
function levelOrderGFG1(root) {
  if (!root) return [];

  const s1 = []; // Stack for Right to Left (even levels: 0, 2, 4...)
  const s2 = []; // Stack for Left to Right (odd levels: 1, 3, 5...)
  const ans = [];

  s1.push(root);

  while (s1.length > 0 || s2.length > 0) {
    // Process Right to Left level (even levels: 0, 2, 4...)
    while (s1.length > 0) {
      const node = s1.pop();
      ans.push(node.val);

      // Push right first, then left (for next level to be L→R)
      if (node.right) s2.push(node.right);
      if (node.left) s2.push(node.left);
    }

    // Process Left to Right level (odd levels: 1, 3, 5...)
    while (s2.length > 0) {
      const node = s2.pop();
      ans.push(node.val);

      // Push left first, then right (for next level to be R→L)
      if (node.left) s1.push(node.left);
      if (node.right) s1.push(node.right);
    }
  }

  return ans;
}
