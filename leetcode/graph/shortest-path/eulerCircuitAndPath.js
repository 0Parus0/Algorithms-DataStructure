/*
Euler circuit and Path
Difficulty: MediumAccuracy: 50.89%Submissions: 42K+Points: 4Average Time: 25m
An Eulerian Path is a path in graph that visits every edge exactly once. An Eulerian Circuit is an Eulerian Path which starts and ends on the same vertex. Given an undirected graph with V nodes, and E edges, with adjacency list adj, return 2 if the graph contains an eulerian circuit, else if the graph contains an eulerian path, return 1, otherwise, return 0.

Examples

Input: 

Output: 2
Explanation: 
Following is an eulerian circuit in the mentioned graph
1 -> 2 -> 0 -> 1
Input: 

Output: 1
Explanation: 
Following is an eulerian path in the mentioned graph
1 -> 0 -> 2
Your Task:
You don't need to read or print anything. Your task is to complete the function isEulerCircuilt() which takes number of vertices in the graph denoted as V and an adjacency list of graph denoted as adj and returns 2 if the graph contains an eulerian circuit, else if the graph contains an eulerian path, it returns 1, otherwise, it will return 0.

Expected Time Complexity: O(V+E) where E is the number of edges in graph.
Expected Space Complexity: O(V)

Constraints:
1 ≤ V, E ≤ 104
1 ≤ adj[i][j] ≤ V-1

Time & Space Complexity:

    Time Complexity: O(V + E)

        Degree counting: O(V)

        Connectivity check: O(V + E)

    Space Complexity: O(V) for visited array

Key Points:

    Eulerian Circuit: All vertices have even degree + graph is connected

    Eulerian Path: Exactly 0 or 2 vertices have odd degree + graph is connected

    Connectivity: Only need to check the component that has edges

    Isolated vertices (degree 0) don't affect Eulerian properties

The solution efficiently checks both degree conditions and connectivity to determine the Eulerian property of the graph.
*/
function isEulerCircuit(V, adj) {
  let oddDegree = 0;

  // Count odd degree vertices
  for (let i = 0; i < V; i++) {
    if (adj[i].length % 2 !== 0) oddDegree++;
  }

  // Check connectivity recursively
  const visited = new Array(V).fill(false);

  // Find first vertex with edges
  let startNode = -1;
  for (let i = 0; i < V; i++) {
    if (adj[i].length > 0) startNode = i;
    break;
  }

  // If no edges, it's technically connected
  if (startNode === -1) return 2; // Empty graph has Eulerian circuit

  // Recursive DFS
  function dfs(node) {
    visited[node] = true;
    for (let neighbor of adj[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }

  dfs(startNode);

  // Verify all non-isolated vertices are connected
  for (let i = 0; i < V; i++) {
    if (adj[i].length > 0 && !visited[i]) return 0;
  }

  // Return based on odd degree count
  return oddDegree === 0 ? 2 : oddDegree === 2 ? 1 : 0;
}

function isEulerCircuit1(V, adj) {
  let oddDegree = 0;

  // Count vertices with odd degree
  for (let i = 0; i < V; i++) {
    if (adj[i].length % 2 !== 0) oddDegree++;
  }

  // Check if graph is connected (for the component with edges)
  if (!isConnectedGraph(V, adj)) {
    return 0;
  }

  // Euler's conditions
  if (oddDegree === 0) return 2; // Euler circuit
  else if (oddDegree === 2) return 1; // Euler path
  else return 0; // Neither

  function isConnectedGraph(V, adj) {
    const visited = new Array(V).fill(false);

    // Find first vertex that has edges
    let startNode = 0;
    for (let i = 0; i < V; i++) {
      if (adj[i] > 0) {
        startNode = i;
        break;
      }
    }

    // If no vertex has edges, it's considered connected
    if (adj[startNode].length === 0) {
      return true;
    }

    // DFS to mark connected component
    const stack = [startNode];
    visited[startNode] = true;

    while (stack.length > 0) {
      const node = stack.pop();

      for (let neighbor of adj[node]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      }
    }

    // Check if all vertices with edges are in the same component
    for (let i = 0; i < V; i++) {
      if (adj[i].length > 0 && !visited[i]) return false;
    }

    return true;
  }
}

function isEulerCircuitRecursiveDFS(V, adj) {
  // Step 1: Count vertices with odd edges
  let oddDegree = 0;
  for (let i = 0; i < V; i++) {
    if (adj[i].length % 2 !== 0) oddDegree++;
  }

  // Step 2: Check connectivity
  if (!isConnectedRecursive(V, adj)) return 0;

  // Step 3: Apply Euler's theorems
  if (oddDegree === 0) return 2; // Euler Circuit
  else if (oddDegree === 2) return 1; // Euler path
  return 0; // Neither

  function isConnectedRecursive(V, adj) {
    // Create a visited array
    const visited = new Array(V).fill(false);

    // find the first non-isolated vertex
    let startNode = -1;
    for (let i = 0; i < V; i++) {
      if (adj[i].length > 0) {
        startNode = i;
        break;
      }
    }

    // If no edges at all, consider connected
    if (startNode === -1) {
      return true;
    }

    // perform DFS recursively
    dfsRecursive(startNode, adj, visited);

    // Check if all non-isolated vertices are visited
    for (let i = 0; i < V; i++) {
      if (adj[i].length > 0 && !visited[i]) return false;
    }
    return true;
  }
  function dfsRecursive(node, adj, visited) {
    visited[node] = true;

    // Recursively visit all unvisited neighbors
    for (let neighbor of adj[node]) {
      if (!visited[neighbor]) {
        dfsRecursive(neighbor, adj, visited);
      }
    }
  }
}

// Test Case 1: Eulerian Circuit
const V1 = 3;
const adj1 = [
  [1, 2],
  [0, 2],
  [0, 1],
]; // Triangle - all even degrees
console.log(isEulerCircuitRecursiveDFS(V1, adj1)); // Output: 2

// Test Case 2: Eulerian Path
const V2 = 3;
const adj2 = [[1], [0, 2], [1]]; // Path - 2 odd degrees
console.log(isEulerCircuitRecursiveDFS(V2, adj2)); // Output: 1

// Test Case 3: Neither (disconnected)
const V3 = 4;
const adj3 = [[1], [0], [3], [2]]; // Two separate edges
console.log(isEulerCircuitRecursiveDFS(V3, adj3)); // Output: 0

// Test Case 4: Empty graph
const V4 = 3;
const adj4 = [[], [], []]; // No edges
console.log(isEulerCircuitRecursiveDFS(V4, adj4)); // Output: 2

// Test Case 5: Single edge
const V5 = 2;
const adj5 = [[1], [0]]; // Single edge - Eulerian path
console.log(isEulerCircuitRecursiveDFS(V5, adj5)); // Output: 1
