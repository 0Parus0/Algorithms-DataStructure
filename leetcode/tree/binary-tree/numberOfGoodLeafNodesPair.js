/*
1530. Number of Good Leaf Nodes Pairs
Medium
Topics
premium lock icon
Companies
Hint
You are given the root of a binary tree and an integer distance. A pair of two different leaf nodes of a binary tree is said to be good if the length of the shortest path between them is less than or equal to distance.

Return the number of good leaf node pairs in the tree.

 

Example 1:


Input: root = [1,2,3,null,4], distance = 3
Output: 1
Explanation: The leaf nodes of the tree are 3 and 4 and the length of the shortest path between them is 3. This is the only good pair.
Example 2:


Input: root = [1,2,3,4,5,6,7], distance = 3
Output: 2
Explanation: The good pairs are [4,5] and [6,7] with shortest path = 2. The pair [4,6] is not good because the length of ther shortest path between them is 4.
Example 3:

Input: root = [7,1,4,6,null,5,3,null,null,null,null,null,2], distance = 3
Output: 1
Explanation: The only good pair is [2,5].
 

Constraints:

The number of nodes in the tree is in the range [1, 210].
1 <= Node.val <= 100
1 <= distance <= 10
*/
function countPairs(root, distance) {
  const adj = new Map();
  const st = new Set();

  function makeGraph(node, prev) {
    if (!node) return;
    if (!node.left && !node.right) st.add(node);

    if (prev !== null) {
      if (!adj.has(prev)) adj.set(prev, []);
      adj.get(prev).push(node);
      if (!adj.has(node)) adj.set(node, []);
      adj.get(node).push(prev);
    }
    makeGraph(node.left, node);
    makeGraph(node.right, node);
  }
  makeGraph(root, null);
  let count = 0;
  for (let leaf of st) {
    const q = [];
    const visited = new Set();
    q.push(leaf);
    visited.add(leaf);

    for (let level = 0; level <= distance; level++) {
      let n = q.length;
      while (n--) {
        let curr = q.shift();
        if (curr !== leaf && st.has(curr)) {
          count++;
        }

        for (let neighbor of adj[curr]) {
          if (!visited.has(neighbor)) {
            q.push(neighbor);
            visited.add(neighbor);
          }
        }
      }
    }
  }
  return count / 2;
}

/* DFS */
function countPairs(root, distance) {
  let count = 0;
  function solve(node) {
    if (!node) return [0];
    if (!node.left && !node.right) return [1];

    const leftD = solve(node.left);
    const rightD = solve(node.right);

    for (let l of leftD) {
      for (let r of rightD) {
        if (l !== 0 && r !== 0 && l + r <= distance) {
          count++;
        }
      }
    }

    const currD = [];
    for (let l of leftD) {
      if (l !== 0 && l <= distance) currD.push(l + 1);
    }

    for (let r of rightD) {
      if (r !== 0 && r <= distance) currD.push(r + 1);
    }

    return currD;
  }

  solve(root);
  return count;
}

/*
| Aspect             | DFS (this) | BFS + Graph               |
| ------------------ | ---------- | ------------------------- |
| Time               | **O(n)**   | O(n) (due to constraints) |
| Space              | **O(h)**   | O(n)                      |
| Extra graph        | ❌ No       | ✅ Yes                     |
| Elegance           | ⭐⭐⭐⭐⭐      | ⭐⭐⭐                       |
| Interview-friendly | ✅ Best     | ⚠️ Acceptable             |
*/

// Plan
// 1. Rephrase the Problem
// Count all pairs of leaf nodes in a binary tree whose shortest path distance (number of edges) is ≤ given distance.

// 2. Inputs and Outputs
// Input:

// root: Root of binary tree

// distance: Integer maximum allowed distance

// Output:

// Integer count of good leaf pairs

// 3. Data Structures
// Post-order DFS: Process children first

// Array/List: Store counts of leaves at each distance from current node

// Global counter: Track total good pairs

// 4. Approach
// Intuition:
// For each node, we need to know about leaves in its left and right subtrees. Leaves can pair in two ways:

// Both leaves in same subtree (handled by recursion)

// One leaf in left, one in right, with current node as LCA

// Distance between leaves through LCA = (dist from left leaf to LCA) + (dist from right leaf to LCA)

// Algorithm:

// DFS returns array dist where dist[i] = number of leaves at distance i from current node

// For leaf: dist[0] = 1 (one leaf at distance 0)

// At each internal node:

// Get leftDist and rightDist from children

// Count cross pairs: sum over all i,j where i + j + 2 ≤ distance of leftDist[i] * rightDist[j]

// Merge: dist[i+1] = leftDist[i] + rightDist[i] for parent

// Track total count

// 5. Edge Cases
// Single leaf: 0 pairs

// distance = 0: 0 pairs (need at least distance 1 for different leaves)

// All leaves very close/far

// Skewed trees

// distance > tree height

// 6. Time and Space Complexity
// Time: O(n × distance²) - but distance ≤ 10, so efficient

// Space: O(distance × h) for distance arrays

// 7. Commit Message
// Will be added at end.

// Solution
// javascript
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
 * @param {number} distance
 * @return {number}
 */
var countPairs = function (root, distance) {
  let count = 0;

  // DFS returns array where index i = count of leaves at distance i
  const dfs = (node) => {
    if (!node) return new Array(distance + 1).fill(0);

    // Leaf node
    if (!node.left && !node.right) {
      const dist = new Array(distance + 1).fill(0);
      dist[0] = 1;
      return dist;
    }

    // Get distance arrays from children
    const leftDist = dfs(node.left);
    const rightDist = dfs(node.right);

    // Count cross pairs between left and right subtrees
    // Distance = dist from left leaf to node + dist from right leaf to node + 2
    for (let i = 0; i <= distance; i++) {
      for (let j = 0; j <= distance; j++) {
        if (i + j + 2 <= distance) {
          count += leftDist[i] * rightDist[j];
        }
      }
    }

    // Merge distances for parent (add 1 to each distance)
    const merged = new Array(distance + 1).fill(0);
    for (let i = 0; i < distance; i++) {
      merged[i + 1] = leftDist[i] + rightDist[i];
    }

    return merged;
  };

  dfs(root);
  return count;
};
// Optimized Solution (Early termination):
javascript;
var countPairs = function (root, distance) {
  let result = 0;

  const dfs = (node) => {
    if (!node) return [];

    // Leaf node
    if (!node.left && !node.right) {
      return [1]; // One leaf at distance 0
    }

    const left = dfs(node.left);
    const right = dfs(node.right);

    // Count pairs across subtrees
    // Only need to check up to distance
    const maxLen = Math.max(left.length, right.length);
    for (let i = 0; i < left.length && i <= distance; i++) {
      if (left[i] === 0) continue;
      for (let j = 0; j < right.length && i + j + 2 <= distance; j++) {
        if (right[j] === 0) continue;
        result += left[i] * right[j];
      }
    }

    // Merge for parent: increment all distances by 1
    const merged = new Array(maxLen + 1).fill(0);
    for (let i = 0; i < left.length && i + 1 <= distance; i++) {
      merged[i + 1] += left[i];
    }
    for (let i = 0; i < right.length && i + 1 <= distance; i++) {
      merged[i + 1] += right[i];
    }

    // Trim if longer than needed
    if (merged.length > distance + 1) {
      merged.length = distance + 1;
    }

    return merged;
  };

  dfs(root);
  return result;
};
