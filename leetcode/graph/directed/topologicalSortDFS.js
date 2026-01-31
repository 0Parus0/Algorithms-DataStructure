/*
Topological sort
Difficulty: MediumAccuracy: 56.52%Submissions: 319K+Points: 4Average Time: 15m
Given a Directed Acyclic Graph (DAG) of V (0 to V-1) vertices and E edges represented as a 2D list of edges[][], where each entry edges[i] = [u, v] denotes a directed edge u -> v. Return the topological sort for the given graph.

Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u -> v, vertex u comes before v in the ordering.
Note: As there are multiple Topological orders possible, you may return any of them. If your returned Topological sort is correct then the output will be true else false.

Examples:

Input: V = 4, E = 3, edges[][] = [[3, 0], [1, 0], [2, 0]]

Output: true
Explanation: The output true denotes that the order is valid. Few valid Topological orders for the given graph are:
[3, 2, 1, 0]
[1, 2, 3, 0]
[2, 3, 1, 0]
Input: V = 6, E = 6, edges[][] = [[1, 3], [2, 3], [4, 1], [4, 0], [5, 0], [5,2]]

Output: true
Explanation: The output true denotes that the order is valid. Few valid Topological orders for the graph are:
[4, 5, 0, 1, 2, 3]
[5, 2, 4, 0, 1, 3]
Constraints:
2  ≤  V  ≤  5 x 103
1  ≤  E = edges.size()  ≤  min[105, (V * (V - 1)) / 2]
*/

function topologicalSort(V, edges) {
  // Step 1: Build adjacency list (directed graph)
  const adj = Array.from({ length: V }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v); // ✅ only one direction
  }

  const visited = new Array(V).fill(false);
  const stack = [];

  function DFS(node) {
    visited[node] = true;

    for (let neighbor of adj[node]) {
      if (!visited[neighbor]) {
        DFS(neighbor);
      }
    }

    stack.push(node); // push after visiting all neighbors
  }

  // Step 2: Call DFS on all unvisited nodes
  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      DFS(i);
    }
  }

  // Step 3: Reverse the stack for topological order
  return stack.reverse();
}

function topologicalSortWithCycleDetection(v, edges) {
  // Create adjacency list
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v); // only push the vertex that has an edge to the other
  }

  const visited = new Array(v).fill(false);
  const stack = new Array(v).fill(false);
  const result = [];
  let hasCycle = false;

  function dfs(node) {
    if (hasCycle) return; // Early exit if cycle found
    if (stack[node]) {
      hasCycle = true;
      return; // Cycle detected
    }
    if (visited[node]) return;
    visited[node] = true;
    stack[node] = true;

    for (let neighbor of adj[node]) {
      dfs(neighbor);
    }

    stack[node] = false;
    result.push(node);
  }

  for (let i = 0; i < v; i++) {
    if (!visited[i]) dfs(i);
    if (hasCycle) break;
  }

  return hasCycle ? [] : result.reverse();
}

function topologicalSortDFS(V, edges) {
  // Create adjacency list
  const adj = Array.from({ length: V }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
  }

  const visited = new Array(V).fill(false);
  const stack = new Array(V).fill(false); // For cycle detection
  const result = [];

  function dfs(node) {
    if (stack[node]) return false; // Cycle detected
    if (visited[node]) return true;

    visited[node] = true;
    stack[node] = true;

    for (let neighbor of adj[node]) {
      if (!dfs(neighbor)) return false;
    }

    stack[node] = false;
    result.push(node);
    return true;
  }

  for (let i = 0; i < V; i++) {
    if (!visited[i]) {
      if (!dfs(i)) return []; // Cycle exists
    }
  }

  return result.reverse(); // Reverse to get correct order
}

// Example 1
console.log(
  topologicalSortDFS(4, [
    [3, 0],
    [1, 0],
    [2, 0],
  ])
);
// Possible output: [2,1,3,0] or [3,2,1,0]

// Example 2
console.log(
  topologicalSortWithCycleDetection(6, [
    [1, 3],
    [2, 3],
    [4, 1],
    [4, 0],
    [5, 0],
    [5, 2],
  ])
);
// Possible output: [5,4,2,1,3,0]
// Test Case 1 (Your example)
console.log(
  topologicalSortWithCycleDetection(4, [
    [3, 0],
    [1, 0],
    [2, 0],
  ])
);
// Valid outputs: [3, 2, 1, 0], [1, 2, 3, 0], [2, 3, 1, 0], etc.

// Test Case 2 (Your example)
console.log(
  topologicalSortWithCycleDetection(6, [
    [1, 3],
    [2, 3],
    [4, 1],
    [4, 0],
    [5, 0],
    [5, 2],
  ])
);
// Valid outputs: [5, 4, 2, 1, 3, 0], [4, 5, 0, 1, 2, 3], etc.

// Test Case 3: Cycle detection
console.log(
  topologicalSortDFS(3, [
    [0, 1],
    [1, 2],
    [2, 0],
  ])
);
// With cycle detection: [] (empty array)
// Without cycle detection: Incorrect result or stack overflow// Test Case 1 (Your example)
console.log(
  topologicalSortWithCycleDetection(4, [
    [3, 0],
    [1, 0],
    [2, 0],
  ])
);
// // Valid outputs: [3, 2, 1, 0], [1, 2, 3, 0], [2, 3, 1, 0], etc.

// // Test Case 2 (Your example)
// console.log(
//   topologicalSortWithCycleDetection(6, [
//     [1, 3],
//     [2, 3],
//     [4, 1],
//     [4, 0],
//     [5, 0],
//     [5, 2],
//   ])
// );
// // Valid outputs: [5, 4, 2, 1, 3, 0], [4, 5, 0, 1, 2, 3], etc.

// // Test Case 3: Cycle detection
// console.log(
//   topologicalSortWithCycleDetection(3, [
//     [0, 1],
//     [1, 2],
//     [2, 0],
//   ])
// );
// // With cycle detection: [] (empty array)
// // Without cycle detection: Incorrect result or stack overflow
function topologicalSort(V, edges) {
  const adj = Array.from({ length: V }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
  }

  const state = new Array(V).fill(0); // 0=unvisited, 1=visiting, 2=visited
  const stack = [];
  let hasCycle = false;

  function DFS(node) {
    if (state[node] === 1) return true; // cycle detected
    if (state[node] === 2) return false;

    state[node] = 1; // mark as visiting

    for (let neighbor of adj[node]) {
      if (DFS(neighbor)) return true;
    }

    state[node] = 2; // mark as fully visited
    stack.push(node);
    return false;
  }

  for (let i = 0; i < V; i++) {
    if (state[i] === 0) {
      if (DFS(i)) {
        hasCycle = true;
        break;
      }
    }
  }

  if (hasCycle) {
    return "Graph has a cycle → Topological sort not possible";
  }

  return stack.reverse();
}

// Example with cycle
console.log(
  topologicalSort(3, [
    [0, 1],
    [1, 2],
    [2, 0],
  ])
);
// "Graph has a cycle → Topological sort not possible"
