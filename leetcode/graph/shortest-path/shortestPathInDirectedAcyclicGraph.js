/*
Shortest path in Directed Acyclic Graph
Difficulty: MediumAccuracy: 48.48%Submissions: 201K+Points: 4Average Time: 20m
Given a Directed Acyclic Graph of V vertices from 0 to n-1 and a 2D Integer array(or vector) edges[ ][ ] of length E, where there is a directed edge from edge[i][0] to edge[i][1] with a distance of edge[i][2] for all i.

Find the shortest path from src(0) vertex to all the vertices and if it is impossible to reach any vertex, then return -1 for that vertex.

Examples :

Input: V = 4, E = 2, edges = [[0,1,2], [0,2,1]]
Output: [0, 2, 1, -1]
Explanation: Shortest path from 0 to 1 is 0->1 with edge weight 2. Shortest path from 0 to 2 is 0->2 with edge weight 1. There is no way we can reach 3, so it's -1 for 3.
Input: V = 6, E = 7, edges = [[0,1,2], [0,4,1], [4,5,4], [4,2,2], [1,2,3], [2,3,6], [5,3,1]]
Output: [0, 2, 3, 6, 1, 5]
Explanation: Shortest path from 0 to 1 is 0->1 with edge weight 2. Shortest path from 0 to 2 is 0->4->2 with edge weight 1+2=3. Shortest path from 0 to 3 is 0->4->5->3 with edge weight 1+4+1=6. Shortest path from 0 to 4 is 0->4 with edge weight 1.Shortest path from 0 to 5 is 0->4->5 with edge weight 1+4=5.
Constraint:
1 <= V <= 100
1 <= E <= min((N*(N-1))/2,4000)
0 <= edgesi,0, edgesi,1 < n
0 <= edgei,2 <=105
*/
function shortestPathInDAGKahns(v, edges, src) {
  // Step 1: Create adjacency list and indegree array
  const adj = Array.from({ length: v }, () => []);
  const indegree = new Array(v).fill(0);

  for (let [u, v, wt] of edges) {
    adj[u].push([v, wt]);
    indegree[v]++;
  }

  // Step 2: Topological sort using kahn's algorithm(BFS)
  const queue = [];
  const topoOrder = [];

  // Add all nodes with indegree 0 to queue
  for (let i = 0; i < v; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  while (queue.length > 0) {
    const node = queue.shift();
    topoOrder.push(node);

    for (let [neighbor, weight] of adj[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  // Step 3: Initialize distances
  const dist = new Array(v).fill(Number.MAX_SAFE_INTEGER);
  dist[src] = 0;

  // Step 4: Process vertices in topological order
  for (let node of topoOrder) {
    // Only process if this node is reachable
    if (dist[node] !== Number.MAX_SAFE_INTEGER) {
      for (let [neighbor, weight] of adj[node]) {
        if (dist[node] + weight < dist[neighbor]) {
          dist[neighbor] = dist[node] + weight;
        }
      }
    }
  }

  // Convert unreachable nodes to -1
  return dist.map((x) => (x === Number.MAX_SAFE_INTEGER ? -1 : x));
}

function shortestPathInDAGDFSREC(v, e, edges) {
  // Step 1: Build adjacency list
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v, wt] of edges) {
    adj[u].push([v, wt]);
  }

  // Step 2: Topological sort(DFS-based)
  const visited = new Array(v).fill(false);
  const topo = [];

  function dfs(node) {
    visited[node] = true;
    for (let [neighbor] of adj[node]) {
      if (!visited[neighbor]) dfs(neighbor);
    }

    topo.push(node);
  }

  for (let i = 0; i < v; i++) {
    if (!visited[i]) dfs(i);
  }

  topo.reverse(); // Now topo order ready

  // Step 3: Relax edges in topo order
  const dist = new Array(v).fill(Number.MAX_SAFE_INTEGER);
  dist[0] = 0;

  for (let u of topo) {
    if (dist[u] !== Number.MAX_SAFE_INTEGER) {
      for (let [v, wt] of adj[u]) {
        if (dist[u] + wt < dist[v]) {
          dist[v] = dist[u] + wt;
        }
      }
    }
  }

  // Step 4: Convert max_int to -1
  return dist.map((x) => (x === Number.MAX_SAFE_INTEGER ? -1 : x));
}

function shortestPathDFSIter(v, edges, src) {
  // Step 1: Create adjacency list
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v, weight] of edges) {
    adj[u].push([v, weight]);
  }

  // Step 2: Topological sort using iterative DFS with stack
  const visited = new Array(v).fill(false);
  const topoStack = [];

  // Iterative DFS for topological sort
  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      const stack = [[i, false]]; // [node, isReturning]
      const recursionStack = new Set();

      while (stack.length > 0) {
        const [node, isReturning] = stack.pop();

        if (isReturning) {
          // Finished process all neighbors, add to topological order
          topoStack.push(node);
          recursionStack.delete(node);
          continue;
        }

        // If already visited in this DFS path, skip (cycle detection)
        if (recursionStack.has(node)) continue;

        // If already fully visited, skip
        if (visited[node]) continue;

        visited[node] = true;
        recursionStack.add(node);

        // Push the node back to mark returning point
        stack.push([node, true]);

        // Push all unvisited neighbors
        for (let j = adj[node].length - 1; j >= 0; j--) {
          const [neighbor, weight] = adj[node][j];
          if (!visited[neighbor]) {
            stack.push([neighbor, false]);
          }
        }
      }
    }
  }

  // Reverse to get topological order
  const topoOrder = topoStack.reverse();

  // Step 3: Initialize distances
  const dist = new Array(v).fill(Number.MAX_SAFE_INTEGER);
  dist[src] = 0;

  // Step 4: Process vertices in topological order
  for (let node of topoOrder) {
    // Only process if this node is reachable
    if (dist[node] !== Number.MAX_SAFE_INTEGER) {
      for (let [neighbor, weight] of adj[node]) {
        if (dist[node] + weight < dist[neighbor]) {
          dist[neighbor] = dist[node] + weight;
        }
      }
    }
  }

  // Convert unreachable nodes to -1
  return dist.map((x) => (x === Number.MAX_SAFE_INTEGER ? -1 : x));
}

// Example test
console.log(
  shortestPathInDAGDFSREC(6, 7, [
    [0, 1, 2],
    [0, 4, 1],
    [4, 5, 4],
    [4, 2, 2],
    [1, 2, 3],
    [2, 3, 6],
    [5, 3, 1],
  ])
);
// Output: [0,2,3,6,1,5]
// Example 1
const V1 = 4;
const edges1 = [
  [0, 1, 2],
  [0, 2, 1],
];
console.log(shortestPathDFSIter(V1, edges1, 0));
// Output: [0, 2, 1, -1]

// Example 2
const V2 = 6;
const edges2 = [
  [0, 1, 2],
  [0, 4, 1],
  [4, 5, 4],
  [4, 2, 2],
  [1, 2, 3],
  [2, 3, 6],
  [5, 3, 1],
];
console.log(shortestPathDFSIter(V2, edges2, 0));
// Output: [0, 2, 3, 6, 1, 5]
