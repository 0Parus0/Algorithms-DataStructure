/*
Left View of Binary Tree
Given the root of a binary tree. Your task is to return the left view of the binary tree. The left view of a binary tree is the set of nodes visible when the tree is viewed from the left side.

If the tree is empty, return an empty list.

Examples :

Input: root[] = [1, 2, 3, 4, 5, N, N]

Output: [1, 2, 4]
Explanation: From the left side of the tree, only the nodes 1, 2, and 4 are visible.

Input: root[] = [1, 2, 3, N, N, 4, N, N, 5, N, N]

Output: [1, 2, 4, 5]
Explanation: From the left side of the tree, the nodes 1, 2, 4, and 5 are visible.

Constraints:
0 <= number of nodes <= 106
0 <= node -> data <= 105
*/
function leftView(root) {
  const ans = [];
  if (!root) return ans;
  function lView(root, level, ans) {
    if (!root) return;

    if (level === ans.length) ans.push(root.data);
    lView(root.left, level + 1, ans);
    lView(root.right, level + 1, ans);
  }
  lView(root, 0, ans);
  return ans;
}

function leftViewBFS(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // First node in current level
      if (i === 0) {
        result.push(node.data);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}
