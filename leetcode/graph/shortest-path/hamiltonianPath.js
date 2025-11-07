/*
Hamiltonian Path
Difficulty: MediumAccuracy: 40.8%Submissions: 46K+Points: 4
Given an undirected graph with n vertices and m edges, your task is to determine if a Hamiltonian path exists in the graph.

A Hamiltonian path is a path in an undirected graph that visits each vertex exactly once.

You are provided the following:


n: The number of vertices in the graph.
m: The number of edges in the graph.
edges[][]: A 2D list where each element edges[i] represents an edge between two vertices edges[i][0] and edges[i][1]. 
Examples:

Input: n = 4, m = 4
edges[][]= { {1,2}, {2,3}, {3,4}, {2,4} }
Output: 1 
Explanation: There is a hamiltonian path: 1 -> 2 -> 3 -> 4 
Input: n = 4, m = 3 
edges[][] = { {1,2}, {2,3}, {2,4} } 
Output: 0 
Explanation: It can be proved that there is no hamiltonian path in the given graph.
Constraints:
1 ≤ n ≤ 10
1 ≤ m ≤ 15
Size of edges[i] is 2
1 ≤ edges[i][0],edges[i][1] ≤ n
*/
function hamiltonian(N, M, edges) {
  // Build adjacency list
  const adj = Array.from({ length: N }, () => []);
  for (let [u, v] of edges) {
    u--;
    v--;
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = new Array(N).fill(false);
  let count = 0;

  function dfs(node) {
    visited[node] = 1;
    count++;
    if (count === N) {
      return true;
    }

    for (let neighbor of adj[node]) {
      if (!visited[neighbor] && dfs(neighbor)) return true;
    }
    visited[node] = false;
    count--;
    return false;
  }

  for (let i = 0; i < N; i++) {
    if (dfs(i)) return true;
  }

  return false;
}

function checkHamiltonianPath(N, M, edges) {
  // Build adjacency list
  const adj = Array.from({ length: N }, () => []);
  for (let [u, v] of edges) {
    u--;
    v--;
    adj[u].push(v);
    adj[v].push(u);
  }

  function dfs(node, visitedCount, visited) {
    if (visitedCount === N) return true; // visited all nodes

    for (let neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        if (dfs(neighbor, visitedCount + 1, visited)) return true;
        visited[neighbor] = false; // backtrack
      }
    }
    return false;
  }

  // Try every node as starting point
  for (let i = 0; i < N; i++) {
    const visited = new Array(N).fill(false); // Fresh array
    visited[i] = true;
    if (dfs(i, 1, visited)) return true;
  }
  return false;
}

// (n = 4), (m = 4);
// edges = [
//   [1, 2],
//   [2, 3],
//   [3, 4],
//   [2, 4],
// ];
// //  Output: 1 (True) - Path: 1→2→3→4

// console.log(checkHamiltonianPath(n, m, edges));
const n = 4,
  m = 4;
const edges = [
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 4],
];

console.log(hamiltonian(n, m, edges)); // Output: 1 (True)
// console.log(hamiltonianPathBitmask(n, m, edges)); // Output: 1 (True)
// Graph where starting from node 0 fails, but node 1 works
const n2 = 4,
  m2 = 3;
const edges2 = [
  [1, 2],
  [2, 3],
  [3, 4],
]; // Path: 1-2-3-4

console.log("Test 2:", hamiltonian(n2, m2, edges2)); // Should be true
