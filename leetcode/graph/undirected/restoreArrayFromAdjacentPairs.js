/*
1743. Restore the Array From Adjacent Pairs
Medium
Topics
premium lock icon
Companies
Hint
There is an integer array nums that consists of n unique elements, but you have forgotten it. However, you do remember every pair of adjacent elements in nums.

You are given a 2D integer array adjacentPairs of size n - 1 where each adjacentPairs[i] = [ui, vi] indicates that the elements ui and vi are adjacent in nums.

It is guaranteed that every adjacent pair of elements nums[i] and nums[i+1] will exist in adjacentPairs, either as [nums[i], nums[i+1]] or [nums[i+1], nums[i]]. The pairs can appear in any order.

Return the original array nums. If there are multiple solutions, return any of them.

 

Example 1:

Input: adjacentPairs = [[2,1],[3,4],[3,2]]
Output: [1,2,3,4]
Explanation: This array has all its adjacent pairs in adjacentPairs.
Notice that adjacentPairs[i] may not be in left-to-right order.
Example 2:

Input: adjacentPairs = [[4,-2],[1,4],[-3,1]]
Output: [-2,4,1,-3]
Explanation: There can be negative numbers.
Another solution is [-3,1,4,-2], which would also be accepted.
Example 3:

Input: adjacentPairs = [[100000,-100000]]
Output: [100000,-100000]
 

Constraints:

nums.length == n
adjacentPairs.length == n - 1
adjacentPairs[i].length == 2
2 <= n <= 105
-105 <= nums[i], ui, vi <= 105
There exists some nums that has adjacentPairs as its pairs.
*/

function restoreArray(adjacentPairs) {
  // Build adjacency list
  const adj = {};
  const result = [];
  for (let [u, v] of adjacentPairs) {
    if (!adj[u]) adj[u] = [];
    if (!adj[v]) adj[v] = [];

    adj[u].push(v);
    adj[v].push(u);
  }

  // Find starting point (node's degree === 1)
  let start = null;
  for (let [node, neighbors] of Object.entries(adj)) {
    if (neighbors.length === 1) {
      start = node;
      break;
    }
  }

  function dfs(u, prev) {
    result.push(u);

    for (let v of adj[u]) {
      if (v !== prev) {
        dfs(v, u);
      }
    }
  }

  dfs(start, -Infinity);
  return result;
}

/**
#Plan:

1. **Understand the problem:**
   - We need to reconstruct an array given pairs of adjacent elements
   - Each element in the original array is unique
   - Each adjacent pair appears exactly once in the input (in either order)
   - The array has exactly 2 endpoints with 1 neighbor each
   - All other elements have exactly 2 neighbors
   - Need to return any valid reconstruction

2. **Break down input data & transformations:**
  - Input: 2D array of adjacent pairs [u, v]
  - Transformation: Build adjacency list/graph, find endpoints, traverse to reconstruct array
  - Output: Reconstructed array in correct order

3. **Edge cases:**
  - Array of length 2 (only one pair)
  - Array with negative numbers
  - Large n (up to 10^5)
  - Starting from either endpoint should work
  - All numbers within [-10^5, 10^5]

4. **Data structures:**
  - Graph/Adjacency list (Map of number -> Set/List of neighbors)
  - Set/Array to track visited nodes
  - Array to build result

5. **Approach:**
  1. Build adjacency list from all pairs
  2. Find an endpoint (node with exactly 1 neighbor)
  3. Start DFS/BFS from endpoint
  4. Traverse using visited set to avoid cycles
  5. Build result array in traversal order

6. **Time & Space Complexity:**
  - Time: O(n) where n = length of original array
  - Space: O(n) for adjacency list and result
*/

// Function
function restoreArray(adjacentPairs) {
  // Step 1: Build adjacency list
  const graph = new Map();

  for (const [u, v] of adjacentPairs) {
    // Add edge u -> v
    if (!graph.has(u)) graph.set(u, []);
    graph.get(u).push(v);

    // Add edge v -> u
    if (!graph.has(v)) graph.set(v, []);
    graph.get(v).push(u);
  }

  // Step 2: Find starting point (endpoint with exactly 1 neighbor)
  let start;
  for (const [node, neighbors] of graph) {
    if (neighbors.length === 1) {
      start = node;
      break;
    }
  }

  // Step 3: Traverse to reconstruct array
  const result = [];
  const visited = new Set();
  let current = start;

  // Traverse until we've visited all nodes
  while (current !== undefined) {
    result.push(current);
    visited.add(current);

    // Find next unvisited neighbor
    const neighbors = graph.get(current);
    let next;
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        next = neighbor;
        break;
      }
    }

    current = next;
  }

  return result;
}

/*

# Custom Test Cases

Test 1: adjacentPairs = [[2,1],[3,4],[3,2]]
Expected: [1,2,3,4] or [4,3,2,1] (any valid order)

Test 2: adjacentPairs = [[4,-2],[1,4],[-3,1]]
Expected: [-2,4,1,-3] or [-3,1,4,-2]

Test 3: adjacentPairs = [[100000,-100000]]
Expected: [100000,-100000] or [-100000,100000]

Test 4: adjacentPairs = [[1,2],[2,3],[3,4],[4,5]]
Expected: [1,2,3,4,5] or reverse

Test 5: adjacentPairs = [[1,2],[2,3],[3,1]] (cycle - not possible per constraints, but good test)
Expected: Would cause infinite loop

# Commit Message
"feat: Solve Restore the Array From Adjacent Pairs problem using graph traversal

- Build adjacency list from pairs to represent the graph
- Find starting endpoint (node with degree 1)
- Perform linear traversal without recursion to handle large inputs
- Track visited nodes to avoid cycles
- Return reconstructed array in O(n) time and space
- Handles negative numbers and large input sizes up to 10^5"
*/

// Test the function
console.log(
  restoreArray([
    [2, 1],
    [3, 4],
    [3, 2],
  ])
); // Expected: [1,2,3,4] or similar
console.log(
  restoreArray([
    [4, -2],
    [1, 4],
    [-3, 1],
  ])
); // Expected: [-2,4,1,-3] or similar
console.log(restoreArray([[100000, -100000]])); // Expected: [100000,-100000] or reverse

// Alternative implementation with BFS-like approach
function restoreArrayBFS(adjacentPairs) {
  // Edge case: single pair
  if (adjacentPairs.length === 1) {
    return adjacentPairs[0];
  }

  // Build adjacency list
  const adj = new Map();

  for (const [a, b] of adjacentPairs) {
    if (!adj.has(a)) adj.set(a, []);
    if (!adj.has(b)) adj.set(b, []);

    adj.get(a).push(b);
    adj.get(b).push(a);
  }

  // Find starting node (degree 1)
  let start;
  for (const [node, neighbors] of adj) {
    if (neighbors.length === 1) {
      start = node;
      break;
    }
  }

  // Reconstruct array
  const n = adjacentPairs.length + 1; // original array length
  const result = new Array(n);
  result[0] = start;

  // We need to track previous to know which direction to go
  let prev = null;
  let current = start;

  for (let i = 1; i < n; i++) {
    const neighbors = adj.get(current);

    // Find the neighbor that's not the previous one
    for (const neighbor of neighbors) {
      if (neighbor !== prev) {
        result[i] = neighbor;
        prev = current;
        current = neighbor;
        break;
      }
    }
  }

  return result;
}

// More efficient implementation without visited set
function restoreArrayOptimized(adjacentPairs) {
  // Step 1: Build adjacency list
  const graph = new Map();

  for (const [u, v] of adjacentPairs) {
    // Initialize if needed
    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);

    // Add bidirectional edges
    graph.get(u).push(v);
    graph.get(v).push(u);
  }

  // Step 2: Find an endpoint
  let start;
  for (const [node, neighbors] of graph) {
    if (neighbors.length === 1) {
      start = node;
      break;
    }
  }

  // Step 3: Reconstruct linearly
  const n = adjacentPairs.length + 1; // Original array length
  const result = new Array(n);
  result[0] = start;

  // Track previous to avoid going back
  let prev = null;
  let current = start;

  for (let i = 1; i < n; i++) {
    const neighbors = graph.get(current);

    // The next node is the neighbor that's not the previous one
    // Since endpoints have 1 neighbor and middle nodes have 2,
    // we always have exactly 1 unvisited neighbor (except at start)
    const next = neighbors[0] === prev ? neighbors[1] : neighbors[0];

    result[i] = next;
    prev = current;
    current = next;
  }

  return result;
}

// Test with explanation
console.log("\nDetailed walkthrough for [[2,1],[3,4],[3,2]]:");
console.log("1. Build graph:");
console.log("   1 -> [2]");
console.log("   2 -> [1, 3]");
console.log("   3 -> [4, 2]");
console.log("   4 -> [3]");
console.log("2. Find endpoint: Nodes 1 and 4 have degree 1");
console.log("3. Start from 1: result = [1]");
console.log("4. From 1 -> 2 (only neighbor): result = [1, 2]");
console.log("5. From 2 -> 3 (not going back to 1): result = [1, 2, 3]");
console.log("6. From 3 -> 4 (not going back to 2): result = [1, 2, 3, 4]");
console.log(
  "Result:",
  restoreArrayOptimized([
    [2, 1],
    [3, 4],
    [3, 2],
  ])
);
