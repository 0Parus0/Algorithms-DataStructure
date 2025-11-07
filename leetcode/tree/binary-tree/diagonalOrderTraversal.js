/*
Diagonal Tree Traversal
Difficulty: MediumAccuracy: 60.63%Submissions: 96K+Points: 4Average Time: 40m
Given a Binary Tree, return the diagonal traversal of the binary tree.

Consider lines of slope -1 passing between nodes. Given a Binary Tree, return a single list containing all diagonal elements in a binary tree belonging to same line.
If the diagonal element are present in two different subtrees then left subtree diagonal element should be taken first and then right subtree. 

Examples :

Input : root = [8, 3, 10, 1, 6, N, 14, N, N, 4, 7, 13]

Output : [8, 10, 14, 3, 6, 7, 13, 1, 4]
Explanation:

Diagonal Traversal of binary tree : 8 10 14 3 6 7 13 1 4
Input: root = [1, 2, N, 3, N]

Output: [1, 2, 3]
Constraints:
1 <= number of nodes<= 105
1 <= node->data <= 105
*/

/*
       1
    /     \

    2      3
     \     /
       4  6
        \
         5
*/

function diagonalTraversal(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    let node = queue.shift();

    // Process all nodes in this diagonal
    while (node) {
      result.push(node.data);

      // If left child exists, push it for the next diagonal
      if (node.left) queue.push(node.left);

      // Move right (stay in the same diagonal)
      node = node.right;
    }
  }

  return result;
}
