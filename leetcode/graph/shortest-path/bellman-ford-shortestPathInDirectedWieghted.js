/*
Bellman-Ford
Difficulty: MediumAccuracy: 48.11%Submissions: 235K+Points: 4Average Time: 25m
Given an weighted graph with V vertices numbered from 0 to V-1 and E edges, represented by a 2d array edges[][], where edges[i] = [u, v, w] represents a direct edge from node u to v having w edge weight. You are also given a source vertex src.

Your task is to compute the shortest distances from the source to all other vertices. If a vertex is unreachable from the source, its distance should be marked as 1e8. Additionally, if the graph contains a negative weight cycle, return [-1] to indicate that shortest paths cannot be reliably computed.

Examples:

Input: V = 5, edges[][] = [[1, 3, 2], [4, 3, -1], [2, 4, 1], [1, 2, 1], [0, 1, 5]], src = 0

Output: [0, 5, 6, 6, 7]
Explanation: Shortest Paths:
For 0 to 1 minimum distance will be 5. By following path 0 → 1
For 0 to 2 minimum distance will be 6. By following path 0 → 1  → 2
For 0 to 3 minimum distance will be 6. By following path 0 → 1  → 2 → 4 → 3 
For 0 to 4 minimum distance will be 7. By following path 0 → 1  → 2 → 4
Input: V = 4, edges[][] = [[0, 1, 4], [1, 2, -6], [2, 3, 5], [3, 1, -2]], src = 0

Output: [-1]
Explanation: The graph contains a negative weight cycle formed by the path 1 → 2 → 3 → 1, where the total weight of the cycle is negative.
Constraints:
1 ≤ V ≤ 100
1 ≤ E = edges.size() ≤ V*(V-1)
-1000 ≤ w ≤ 1000
0 ≤ src < V



🔹 Step-by-step plan

Initialization

dist[] = distance array, initialized with ∞ (or 1e8 in this problem).

dist[src] = 0.

Relax all edges (V-1 times)

For each edge (u, v, w):
if dist[u] + w < dist[v], update dist[v].

Do this exactly V-1 times, because in the worst case, the shortest path in a graph with V nodes has V-1 edges.

Check for negative cycle

Run one more iteration over all edges.

If any distance improves → there’s a negative cycle → return [-1].

Handle unreachable nodes

Any node that still has ∞ → replace with 1e8 (per problem statement).
*/
function bellmanFord(v, edges, src) {
  const INF = 108;
  const dist = new Array(v).fill(INF);
  dist[src] = 0;

  // Phase 1: Find shortest paths(v - 1 iterations)
  for (let i = 0; i < v - 1; i++) {
    let flag = false;
    for (let [u, v, wt] of edges) {
      if (dist[u] !== INF && dist[u] + wt < dist[v]) {
        dist[v] = dist[u] + wt;
        flag = true;
      }
    }
    if (!flag) break;
    // if (!flag) return dist;
  }

  // Phase 2: Detect negative cycles
  for (let [u, v, wt] of edges) {
    if (dist[u] !== INF && dist[u] + wt < dist[v]) {
      return [-1];
    }
  }
  // Phase 3: Replace unreachable distances with 1e8
  for (let i = 0; i < v; i++) {
    if (dist[i] === INF) dist[i] = 108;
  }

  return dist;
}

/*
🔹 Complexity

Time: O(V * E)

Space: O(V)

This is fine here because V ≤ 100 and E ≤ V*(V-1) ≈ 10,000.
*/

// Example 1: No negative cycle
const V1 = 5;
const edges1 = [
  [1, 3, 2],
  [4, 3, -1],
  [2, 4, 1],
  [1, 2, 1],
  [0, 1, 5],
];
const src1 = 0;
console.log(bellmanFord(V1, edges1, src1));
// Expected: [0, 5, 6, 6, 7]

// Example 2: Negative cycle detected
const V2 = 4;
const edges2 = [
  [0, 1, 4],
  [1, 2, -6],
  [2, 3, 5],
  [3, 1, -2],
];
const src2 = 0;
console.log(bellmanFord(V2, edges2, src2));
// Expected: [-1]

// Example 3: Unreachable nodes
const V3 = 3;
const edges3 = [[0, 1, 5]];
const src3 = 0;
console.log(bellmanFord(V3, edges3, src3));
// Expected: [0, 5, 100000000]
