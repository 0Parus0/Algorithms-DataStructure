/*
Floyd Warshall
Difficulty: MediumAccuracy: 32.89%Submissions: 227K+Points: 4Average Time: 15m
You are given an weighted directed graph, represented by an adjacency matrix, dist[][] of size n x n, where dist[i][j] represents the weight of the edge from node i to node j. If there is no direct edge, dist[i][j] is set to a large value (i.e., 108) to represent infinity.
The graph may contain negative edge weights, but it does not contain any negative weight cycles.

Your task is to find the shortest distance between every pair of nodes i and j in the graph.

Note: Modify the distances for every pair in place.

Examples :

Input: dist[][] = [[0, 4, 108, 5, 108], [108, 0, 1, 108, 6], [2, 108, 0, 3, 108], [108, 108, 1, 0, 2], [1, 108, 108, 4, 0]]

Output: [[0, 4, 5, 5, 7], [3, 0, 1, 4, 6], [2, 6, 0, 3, 5], [3, 7, 1, 0, 2], [1, 5, 5, 4, 0]]

Explanation: Each cell dist[i][j] in the output shows the shortest distance from node i to node j, computed by considering all possible intermediate nodes. 
Input: dist[][] = [[0, -1, 2], [1, 0, 108], [3, 1, 0]]

Output: [[0, -1, 2], [1, 0, 3], [2, 1, 0]]

Explanation: Each cell dist[i][j] in the output shows the shortest distance from node i to node j, computed by considering all possible intermediate nodes.
From 2 to 0 shortest distance should be 2 by following path 2 -> 1 -> 0
From 1 to 2 shortest distance should be 3 by following path 1 -> 0 -> 2
Constraints:
1 ≤ dist.size() ≤ 100
-1000 ≤ dist[i][j] ≤ 1000
dist[i][j] can be 108 to represent infinity.
*/
function floydWarshall(dist) {
  const n = dist.length;

  // Standard Floyd-Warshall
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] !== 108 && dist[k][j] !== 108) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  // Detect negative cycles
  for (let i = 0; i < n; i++) {
    if (dist[i][i] < 0) {
      return [-1]; // negative cycle detected
    }
  }

  return dist;
}

function floydWarshall(dist) {
  const n = dist.length;
  const INF = 108;

  // Floyd-Warshall algorithm
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] !== INF && dist[k][j] !== INF) {
          dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
        }
      }
    }
  }

  // Optional: Negative cycle detection (comment out if not needed)
  for (let i = 0; i < n; i++) {
    if (dist[i][i] < 0) {
      return [-1];
    }
  }

  return dist;
}

/*
✅ Final Summary
Aspect	Complexity	Explanation
Time Complexity	O(n³)	Triple nested loop (all-pairs shortest path)
Space Complexity	O(n²)	Distance matrix storage
Negative Cycle Detection	O(n)	Check diagonal entries
In-place updates	Yes	No extra matrix used
*/

/* Example: Multi-source Dijkstra (set of sources) */
/* 
🔹 When to use multi-source Dijkstra?

When all weights are non-negative.

When the graph is sparse (E ≈ V) and large (Dijkstra + heap beats Floyd–Warshall).

When you need:

All-pairs shortest paths → run Dijkstra V times.

Multi-source single-destination → run one Dijkstra with all sources initialized.
*/
function multiSourceDijkstra(n, edges, sources) {
  const adj = Array.from({ length: n }, () => []);
  for (let [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]); // undirected
  }

  const dist = new Array(n).fill(Infinity);
  const pq = new MinHeap(); // [distance, node]

  for (let src of sources) {
    dist[src] = 0;
    pq.insert([0, src]);
  }

  while (!pq.isEmpty()) {
    const [d, u] = pq.extractMin();
    if (d > dist[u]) continue;

    for (let [v, w] of adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.insert([dist[v], v]);
      }
    }
  }
  return dist;
}

function multiSourceDijkstra(v, edges, sources) {
  // Step 1: Build adjacency list
  const adj = Array.from({ length: v }, () => []);
  for (let [u, vtx, wt] of edges) {
    adj[u].push([vtx, wt]); // directed edge u -> vtx
    // if undirected, also do: adj[vtx].push([u, wt]);
  }

  // Step 2: Initialize distances
  const dist = new Array(v).fill(Number.MAX_SAFE_INTEGER);

  // Step 3: Priority queue (min-heap)
  const pq = [];
  function push(node, d) {
    pq.push([d, node]);
    pq.sort((a, b) => a[0] - b[0]); // simple O(n log n), use real heap in prod
  }

  // Step 4: Initialize with all sources at distance 0
  for (let s of sources) {
    dist[s] = 0;
    push(s, 0);
  }

  // Step 5: Dijkstra loop
  while (pq.length) {
    const [d, node] = pq.shift();
    if (d > dist[node]) continue;

    for (let [nei, w] of adj[node]) {
      if (dist[node] + w < dist[nei]) {
        dist[nei] = dist[node] + w;
        push(nei, dist[nei]);
      }
    }
  }

  return dist;
}

// // Example 1
// const dist1 = [
//   [0, 4, 108, 5, 108],
//   [108, 0, 1, 108, 6],
//   [2, 108, 0, 3, 108],
//   [108, 108, 1, 0, 2],
//   [1, 108, 108, 4, 0],
// ];

// console.log(floydWarshall(dist1));
// /* Expected Output:
// [
//     [0, 4, 5, 5, 7],
//     [3, 0, 1, 4, 6],
//     [2, 6, 0, 3, 5],
//     [3, 7, 1, 0, 2],
//     [1, 5, 5, 4, 0]
// ]
// */

// // Example 2
// const dist2 = [
//   [0, -1, 2],
//   [1, 0, 108],
//   [3, 1, 0],
// ];

// console.log(floydWarshall(dist2));
// /* Expected Output:
// [
//     [0, -1, 2],
//     [1, 0, 3],
//     [2, 1, 0]
// ]
// */

// // Example 3: Small graph
// const dist3 = [
//   [0, 108],
//   [108, 0],
// ];

// console.log(floydWarshall(dist3));
// /* Expected Output:
// [
//     [0, 108],
//     [108, 0]
// ]
// */
// Example with negative cycle
const distWithCycle = [
  [0, 1, 108],
  [108, 0, -1],
  [-1, 108, 0],
];
// Cycle: 0→1→2→0 with total weight 1 + (-1) + (-1) = -1

console.log(floydWarshall(distWithCycle));
