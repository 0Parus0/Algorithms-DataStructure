/*
1367. Linked List in Binary Tree
Medium
Topics
premium lock icon
Companies
Hint
Given a binary tree root and a linked list with head as the first node. 

Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.

In this context downward path means a path that starts at some node and goes downwards.

 

Example 1:



Input: head = [4,2,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Explanation: Nodes in blue form a subpath in the binary Tree.  
Example 2:



Input: head = [1,4,2,6], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: true
Example 3:

Input: head = [1,4,2,6,8], root = [1,4,4,null,2,2,null,1,null,6,8,null,null,null,null,1,3]
Output: false
Explanation: There is no path in the binary tree that contains all the elements of the linked list from head.
 

Constraints:

The number of nodes in the tree will be in the range [1, 2500].
The number of nodes in the list will be in the range [1, 100].
1 <= Node.val <= 100 for each node in the linked list and binary tree.
*/

function isSubPath(head, root) {
  if (!root) return false;

  function check(head, node) {
    if (head === null) return true;
    if (node === null) return false;
    if (node.val !== head.val) return false;

    return check(head.next, node.left) || check(head.next, node.right);
  }

  return (
    check(head, root) ||
    isSubPath(head, root.left) ||
    isSubPath(head, root.right)
  );
}

/* 
  Time Complexity: O(n * m) 
  where n = number of nodes in binary tree and
  m is number of nodes in linked list
  Space Complexity: O(n + m)
*/
/*
Plan
1. Rephrase the Problem
We need to check if there exists a downward path in a binary tree that matches the entire linked list sequence. The path must start at some tree node and go strictly downward (parent to child).

2. Inputs and Outputs
Input:

head: Head of linked list

root: Root of binary tree

Output:

Boolean: true if linked list exists as downward path in tree

3. Data Structures
DFS/Recursion: To traverse tree

Linked List Traversal: To match sequence

Double DFS: Outer DFS to try each tree node as start, inner DFS to match list

4. Approach
Intuition:
We need to check for two scenarios at each tree node:

Start matching linked list from this tree node

OR continue matching if we're already in the middle of matching

Key Insight:

Try every tree node as potential starting point for the linked list

At each tree node, attempt to match the entire linked list downward

If mismatch, backtrack and try other starting points

Solution Steps:

Outer DFS: Traverse tree, at each node try to match linked list

Inner matching function: Recursively check if linked list matches tree path

If match fails at any point, try left/right children as new starts

Return true if any complete match found

5. Edge Cases
Empty list (always true)

Single node list

List longer than tree depth

Multiple possible starting points

Tree node values match but structure doesn't

Duplicate values in tree

6. Time and Space Complexity
Time: O(n × m) where n=tree nodes, m=list length (worst case)

Space: O(h + m) for recursion stacks

7. Commit Message
Will be added at end.
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
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
 * @param {ListNode} head
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSubPath = function (head, root) {
  if (!head) return true; // Empty list always matches
  if (!root) return false; // Empty tree, non-empty list

  // Try to match starting from current tree node
  function matchList(tree, list) {
    if (!list) return true; // Reached end of list
    if (!tree) return false; // Tree ended before list

    // Values must match
    if (tree.val !== list.val) return false;

    // Continue matching with next list node in left OR right subtree
    return matchList(tree.left, list.next) || matchList(tree.right, list.next);
  }

  // Try to start matching from current tree node
  // OR search in left/right subtrees for starting point
  if (matchList(root, head)) {
    return true;
  }

  // If not starting here, try left or right subtree
  return isSubPath(head, root.left) || isSubPath(head, root.right);
};

/* Optimized Solution (KMP-like): */

var isSubPath = function (head, root) {
  const list = [];
  let curr = head;
  while (curr) {
    list.push(curr.val);
    curr = curr.next;
  }
  const n = list.length;

  // Build prefix function for KMP
  const lps = new Array(n).fill(0);
  for (let i = 1, len = 0; i < n; ) {
    if (list[i] === list[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  // DFS with KMP state
  function dfs(node, kmpIndex) {
    if (kmpIndex === n) return true;
    if (!node) return false;

    // KMP matching
    let j = kmpIndex;
    while (j > 0 && node.val !== list[j]) {
      j = lps[j - 1];
    }
    if (node.val === list[j]) {
      j++;
    }

    // Continue matching
    return dfs(node.left, j) || dfs(node.right, j);
  }

  // Try starting from each tree node
  function searchStart(node) {
    if (!node) return false;

    // Try to start matching from this node
    if (dfs(node, 0)) {
      return true;
    }

    // Or try left/right as new start
    return searchStart(node.left) || searchStart(node.right);
  }

  return searchStart(root);
};

/* Alternative Clean Solution: */

var isSubPath = function (head, root) {
  // Helper to check if linked list matches starting at tree node
  const match = (treeNode, listNode) => {
    if (!listNode) return true; // List fully matched
    if (!treeNode) return false; // Tree ended before list

    if (treeNode.val !== listNode.val) return false;

    // Continue matching downward
    return (
      match(treeNode.left, listNode.next) ||
      match(treeNode.right, listNode.next)
    );
  };

  // DFS through tree to find starting point
  const dfs = (treeNode) => {
    if (!treeNode) return false;

    // Try to start matching from this node
    if (match(treeNode, head)) {
      return true;
    }

    // Or search in subtrees
    return dfs(treeNode.left) || dfs(treeNode.right);
  };

  return dfs(root);
};
