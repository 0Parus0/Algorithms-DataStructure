/*
Top View of Binary Tree
Difficulty: MediumAccuracy: 38.43%Submissions: 407K+Points: 4Average Time: 45m

You are given a binary tree, and your task is to return its top view. The top view of a binary tree is the set of nodes visible when the tree is viewed from the top.

Note: 

    Return the nodes from the leftmost node to the rightmost node.
    If two nodes are at the same position (horizontal distance) and are outside the shadow of the tree, consider the leftmost node only. 

Examples:

Input: root[] = [1, 2, 3] 
 
Output: [2, 1, 3]

Input: root[] = [10, 20, 30, 40, 60, 90, 100]
 
Output: [40, 20, 10, 30, 100]
Explanation: The root 10 is visible.
On the left, 40 is the leftmost node and visible, followed by 20.
On the right, 30 and 100 are visible. Thus, the top view is 40 20 10 30 100.

Input: root[] = [1, 2, 3, N, 4, N, N, N, 5, N, 6]
       1
     /   \
    2     3
     \   
      4
       \
        5
         \
          6
Output: [2, 1, 3, 6]
Explanation: Node 1 is the root and visible.
Node 2 is the left child and visible from the left side.
Node 3 is the right child and visible from the right side.
Nodes 4, 5, and 6 are vertically aligned, but only the lowest node 6 is visible from the top view. Thus, the top view is 2 1 3 6.

Constraints:
1 ≤ number of nodes ≤ 105
1 ≤ node->data ≤ 105
Expected Complexities
Time Complexity: O(n)
Auxiliary Space: O(n)
*/

// function findRange(node, pos) {
//     if (!node) return { min: Infinity, max: -Infinity };

//     const leftRange = findRange(node.left, pos - 1);
//     const rightRange = findRange(node.right, pos + 1);

//     return {
//         min: Math.min(pos, leftRange.min, rightRange.min),
//         max: Math.max(pos, leftRange.max, rightRange.max)
//     };
// }

// const { min: l, max: r } = findRange(root, 0);

function topView(root) {
  let l = 0;
  let r = 0;
  function find(root, pos) {
    if (!root) return;

    l = Math.min(l, pos);
    r = Math.max(r, pos);

    find(root.left, pos - 1);
    find(root.right, pos + 1);
  }

  find(root, 0);
  const ans = new Array(r - l + 1);
  const filled = new Array(r - l + 1).fill(false);
  const q = [];
  const indexQ = [];

  q.push(root);
  indexQ.push(-1 * l);
  while (q.length) {
    let temp = q.shift();
    let position = indexQ.shift();

    if (!filled[position]) {
      filled[position] = true;
      ans[position] = temp.data;
    }
    if (temp.left) {
      q.push(temp.left);
      indexQ.push(position - 1);
    }
    if (temp.right) {
      q.push(temp.right);
      indexQ.push(position + 1);
    }
  }
  return ans;
}

function topView1(root) {
  if (!root) return [];

  const map = new Map();
  const queue = [{ node: root, hd: 0 }];
  let minHd = 0;
  let maxHd = 0;

  while (queue.length) {
    const { node, hd } = queue.shift();

    if (!map.has(hd)) {
      map.set(hd, node.data);
    }

    minHd = Math.min(minHd, hd);
    maxHd = Math.max(maxHd, hd);

    if (node.left) {
      queue.push({ node: node.left, hd: hd - 1 });
    }
    if (node.right) {
      queue.push({ node: node.right, hd: hd + 1 });
    }
  }

  const result = [];
  for (let i = minHd; i <= maxHd; i++) {
    result.push(map.get(i));
  }

  return result;
}

function topViewRecursive(root) {
  let l = 0; // Left most of the array index/ range
  let r = 0; // right most of the array index/ range

  // Find the range , l and r
  function find(root, pos) {
    // base case when root/node becomes null
    if (!root) return;

    l = Math.min(pos, l); // modify the outer left most's range
    r = Math.max(pos, r); // modify the outer right most's range

    find(root.left, pos - 1);
    find(root.right, pos + 1);
  }

  // Recursive function to populate ans and levels arrays
  function tView(root, index, level) {
    // base case
    if (!root) return;

    //
    if (levelsArr[index] > level) {
      ans[index] = root.data;
      levelsArr[index] = level;
    }

    tView(root.left, index - 1, level + 1);
    tView(root.right, index + 1, level + 1);
  }

  find(root, 0);
  const width = r - l + 1; // width- length of the ans and levels array.
  const ans = new Array(width);
  const levelsArr = new Array(width).fill(Infinity); // what level we have filled the ans array with at the moment
  let level = 0; // level of the current call
  let index = -l; // -1 * l because l is going to be negative to make it positive to use as index (-1(-3)) => 3 index at which the number will go in asn array
  tView(root, index, level);

  return ans;
}

function topViewRecursive1(root) {
  if (!root) return [];

  let l = 0; // leftmost horizontal distance
  let r = 0; // rightmost horizontal distance

  // Step 1: Find the horizontal range [l, r] of the tree
  function find(node, pos) {
    if (!node) return; // base case

    l = Math.min(pos, l); // update leftmost boundary
    r = Math.max(pos, r); // update rightmost boundary

    find(node.left, pos - 1); // go left, decrease horizontal distance
    find(node.right, pos + 1); // go right, increase horizontal distance
  }

  find(root, 0); // compute l and r
  const width = r - l + 1; // total width of top view array

  const ans = new Array(width); // stores final top view nodes
  const levelsArr = new Array(width).fill(Infinity); // stores min level seen for each index

  // Step 2: Recursive DFS traversal to populate ans
  function tView(node, index, level) {
    if (!node) return; // base case

    // If this position is empty OR current node is at a smaller level
    if (levelsArr[index] > level) {
      ans[index] = node.data; // put this node in the answer
      levelsArr[index] = level; // mark its level
    }

    // Go left → horizontal index - 1, level + 1
    tView(node.left, index - 1, level + 1);

    // Go right → horizontal index + 1, level + 1
    tView(node.right, index + 1, level + 1);
  }

  // Start recursion from root
  // Offset index by -l so the leftmost node aligns at index 0
  tView(root, -l, 0);

  return ans;
}
