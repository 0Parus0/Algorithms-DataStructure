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
/**
 * @param {number} V - number of vertices
 * @param {number[][]} edges - edge list
 * @return {number[]} - topological ordering
 */

function topologicalSort(v, edges) {
  // Build adjacency list
  const adj = Array.from({ length: v }, () => []);
  const indegree = new Array(v).fill(0);
  for (let [u, v] of edges) {
    adj[u].push(v);
    indegree[v]++;
  }

  // Queue for vertices with indegree 0
  const queue = [];
  for (let i = 0; i < v; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  const result = [];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);

    for (let neighbor of adj[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  return result.length === v ? result : [];
}

// Example tests
console.log(
  topologicalSort(4, [
    [3, 0],
    [1, 0],
    [2, 0],
  ])
);
// Possible outputs: [3,2,1,0] or [1,2,3,0] etc.

console.log(
  topologicalSort(6, [
    [1, 3],
    [2, 3],
    [4, 1],
    [4, 0],
    [5, 0],
    [5, 2],
  ])
);
// Possible outputs: [4,5,1,2,0,3] or similar
console.log(
  topologicalSort(3, [
    [0, 1],
    [1, 2],
    [2, 0],
  ])
);
// Returns: [] (empty array indicates cycle)
