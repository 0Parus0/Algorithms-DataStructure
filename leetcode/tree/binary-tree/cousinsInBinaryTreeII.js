/*
2641. Cousins in Binary Tree II
Medium
Topics
premium lock icon
Companies
Hint
Given the root of a binary tree, replace the value of each node in the tree with the sum of all its cousins' values.

Two nodes of a binary tree are cousins if they have the same depth with different parents.

Return the root of the modified tree.

Note that the depth of a node is the number of edges in the path from the root node to it.

 

Example 1:


Input: root = [5,4,9,1,10,null,7]
Output: [0,0,0,7,7,null,11]
Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
- Node with value 5 does not have any cousins so its sum is 0.
- Node with value 4 does not have any cousins so its sum is 0.
- Node with value 9 does not have any cousins so its sum is 0.
- Node with value 1 has a cousin with value 7 so its sum is 7.
- Node with value 10 has a cousin with value 7 so its sum is 7.
- Node with value 7 has cousins with values 1 and 10 so its sum is 11.
Example 2:


Input: root = [3,1,2]
Output: [0,0,0]
Explanation: The diagram above shows the initial binary tree and the binary tree after changing the value of each node.
- Node with value 3 does not have any cousins so its sum is 0.
- Node with value 1 does not have any cousins so its sum is 0.
- Node with value 2 does not have any cousins so its sum is 0.
 

Constraints:

The number of nodes in the tree is in the range [1, 105].
1 <= Node.val <= 104
*/

/* Two Pass BFS */
function replaceValueInTree(root) {
  if (!root) return root;
  const levelSums = [];
  const q = [root];

  // Step 1: Accumulate all level sums
  while (q.length) {
    let n = q.length;
    let currSum = 0;
    while (n--) {
      const curr = q.shift();
      currSum += curr.val;
      if (curr.left) {
        q.push(curr.left);
      }
      if (curr.right) {
        q.push(curr.right);
      }
    }
    levelSums.push(currSum);
  }

  // Step 2: Replace cousins values
  q.push(root);
  root.val = 0; // Root doesn't have any siblings so it's sibling sum = 0

  let levelIndex = 1; // We have to start from level 1 because level 0 is root;
  while (q.length) {
    let n = q.length;
    while (n--) {
      const curr = q.shift();

      // Level sum of current level - Siblings sum
      let siblingsSum = 0;
      if (curr.left) siblingsSum += curr.left.val;
      if (curr.right) siblingsSum += curr.right.val;

      if (curr.left) {
        curr.left.val = levelSums[levelIndex] - siblingsSum;
        q.push(curr.left);
      }

      if (curr.right) {
        curr.right.val = levelSums[levelIndex] - siblingsSum;
        q.push(curr.right);
      }
    }
    levelIndex++;
  }

  return root;
}

/* Single Pass BFS*/

function replaceValueInTree(root) {
  if (!root) return root;

  const q = [root];
  let levelSum = root.val;

  while (q.length) {
    let n = q.length;
    let nextLevelSum = 0;

    while (n--) {
      let curr = q.shift();

      curr.val = levelSum - curr.val;

      let siblingSum = 0;
      if (curr.left) siblingSum += curr.left.val;
      if (curr.right) siblingSum += curr.right.val;

      if (curr.left) {
        nextLevelSum += curr.left.val;
        curr.left.val = siblingSum;
        q.push(curr.left);
      }

      if (curr.right) {
        nextLevelSum += curr.right.val;
        curr.right.val = siblingSum;
        q.push(curr.right);
      }
    }
    levelSum = nextLevelSum;
  }
  return root;
}
