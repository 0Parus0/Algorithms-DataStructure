/*
Count the nodes at distance K from leaf
Difficulty: MediumAccuracy: 34.27%Submissions: 78K+Points: 4Average Time: 45m
Given a binary tree with n nodes and a non-negative integer k, the task is to count the number of special nodes. A node is considered special if there exists at least one leaf in its subtree such that the distance between the node and leaf is exactly k.
Note: Any such node should be counted only once. For example, if a node is at a distance k from 2 or more leaf nodes, then it would add only 1 to our count.

Examples:

Input: root[] = [1, 2, 3, 4, 5, 6, 7, N, N, N, N, N, 8] , k = 2 
              
Output: 2
Explanation: There are only two unique nodes that are at a distance of 2 units from the leaf node. (node 3 for leaf with value 8 and node 1 for leaves with values 4, 5 and 7) Note that node 2 isn't considered for leaf with value 8 because it isn't a direct ancestor of node 8.
Constraints:
1 ≤ n ≤ 105   
1 ≤ k ≤ n
1 ≤ root->val ≤ 105
*/

/*
PLAN:

1) Rephrase the problem:
   We need to count how many UNIQUE nodes exist such that there is at least one
   leaf node in their subtree exactly k edges below them.

2) Inputs & Outputs:
   Input:
     - root: root of a binary tree
     - k: non-negative integer distance
   Output:
     - integer count of special nodes

3) Data Structures:
   - Array `path` to store the current root-to-node path
   - Set `special` to store unique qualifying nodes

4) Approach:
   Intuition:
   Every leaf has a path from root → leaf.
   If we store this path, then for a leaf at depth `d`,
   the ancestor at distance `k` is at index `d - k`.

   Steps:
   - Do DFS traversal
   - Maintain current path
   - When a leaf is found:
       - If path length > k
       - Mark path[path.length - k - 1] as special
   - Use Set to avoid duplicates

5) Edge Cases:
   - k > height of tree → answer = 0
   - Single node tree
   - Multiple leaves pointing to same ancestor

6) Time & Space Complexity:
   Time: O(n)
   Space: O(h + s)
     - h = height of tree (recursion stack)
     - s = number of special nodes

7) Commit Message:
   "Count nodes at distance K from leaf using DFS path tracking"
*/

function countNodesAtDistanceKFromLeaf(root, k) {
  const special = new Set();
  const path = [];

  function dfs(node) {
    if (!node) return;

    // Add current node to path
    path.push(node);

    // If leaf node
    if (!node.left && !node.right) {
      const index = path.length - k - 1;
      if (index >= 0) {
        special.add(path[index]);
      }
    }

    dfs(node.left);
    dfs(node.right);

    // Backtrack
    path.pop();
  }

  dfs(root);
  return special.size;
}

class Solution {
  // Function to return count of nodes at a given distance from leaf nodes.
  printKDistantfromLeaf(root, k) {
    if (!root) return 0;

    const specialNodes = new Set();
    const currentPath = [];

    const dfs = (node) => {
      if (!node) return;

      // Add current node to path
      currentPath.push(node);

      // Check if leaf node
      if (!node.left && !node.right) {
        // If we have enough nodes in path to go back k steps
        if (currentPath.length > k) {
          const ancestor = currentPath[currentPath.length - k - 1];
          specialNodes.add(ancestor);
        } else if (currentPath.length === k + 1) {
          // Special case: when path length exactly equals k+1
          // The first node in path (root) is k distance away
          const ancestor = currentPath[0];
          specialNodes.add(ancestor);
        }
        // Note: if currentPath.length < k+1, no ancestor at distance k
      }

      // Recurse for children
      dfs(node.left);
      dfs(node.right);

      // Backtrack: remove current node from path
      currentPath.pop();
    };

    dfs(root);
    return specialNodes.size;
  }
}

class Solution {
  printKDistantfromLeaf(root, k) {
    if (!root) return 0;

    const specialNodes = new Set();
    // Array to store current path (acts as circular buffer)
    const ancestors = new Array(k + 1).fill(null);

    const dfs = (node, depth) => {
      if (!node) return;

      // Store current node in ancestors array (circular buffer)
      ancestors[depth % (k + 1)] = node;

      // Check if leaf
      if (!node.left && !node.right) {
        // The ancestor at distance k from this leaf
        // If leaf at depth d, ancestor at depth d-k
        if (depth >= k) {
          const ancestorDepth = depth - k;
          const ancestor = ancestors[ancestorDepth % (k + 1)];
          if (ancestor) {
            specialNodes.add(ancestor);
          }
        }
      }

      // Recurse
      dfs(node.left, depth + 1);
      dfs(node.right, depth + 1);
    };

    dfs(root, 0);
    return specialNodes.size;
  }
}
