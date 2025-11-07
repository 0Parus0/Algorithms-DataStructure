/*
Bipartite Graph
Difficulty: MediumAccuracy: 31.25%Submissions: 204K+Points: 4Average Time: 15m
Given a Graph with V vertices (Numbered from 0 to V-1) and E edges. Check whether the graph is bipartite or not.

A bipartite graph can be colored with two colors such that no two adjacent vertices share the same color. This means we can divide the graph’s vertices into two distinct sets where:

All edges connect vertices from one set to vertices in the other set.
No edges exist between vertices within the same set.
Examples:

Input: V = 3, edges[][] = [[0, 1], [1,2]]
Bipartite-Graph
Output: true
Explanation: The given graph can be colored in two colors so, it is a bipartite graph.
Input: V = 4, edges[][] = [[0, 3], [1, 2], [3, 2], [0, 2]]




Output: false 
Explanation: The given graph cannot be colored in two colors such that color of adjacent vertices differs. 
Constraints:
1 ≤ V ≤ 2 * 105
1 ≤ edges.size() ≤ 105
1 ≤ edges[i][j] ≤ 105
*/
/**
 * @param {number} V - number of vertices
 * @param {number[][]} edges - undirected edges
 * @return {boolean} - true if graph is bipartite
 */

function isBipartite(v, edges) {
  // Build adjacency list
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const color = new Array(v).fill(-1); // -1 = uncolored, 0/1 = two colors
  for (let i = 0; i < v; i++) {
    if (color[i] === -1) {
      // Start BFS from unvisited node
      const queue = [i];
      color[i] = 0;

      while (queue.length > 0) {
        const node = queue.shift();

        for (let neighbor of adj[node]) {
          if (color[neighbor] === -1) {
            // Assign opposite color
            color[neighbor] = 1 - color[node];
            queue.push(neighbor);
          } else if (color[neighbor] === color[node]) {
            return false; // same color on both ends -> not bipartite
          }
        }
      }
    }
  }
  return true;
}

// Example 1
console.log(
  isBipartite(3, [
    [0, 1],
    [1, 2],
  ])
); // true

// Example 2
console.log(
  isBipartite(4, [
    [0, 3],
    [1, 2],
    [3, 2],
    [0, 2],
  ])
); // false

function isBipartiteDFS(v, edges) {
  // Build the adjacency list
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const color = new Array(v).fill(-1);

  function dfs(node, c) {
    color[node] = c;
    for (let neighbor of adj[node]) {
      if (color[neighbor] === -1) {
        if (!dfs(neighbor, 1 - c)) return false;
      } else if (color[neighbor] === color[node]) return false;
    }

    return true;
  }

  for (let i = 0; i < v; i++) {
    if (color[i] === -1) {
      if (!dfs(i, 0)) return false;
    }
  }

  return true;
}
// Example usage:
console.log(
  isBipartiteDFS(3, [
    [0, 1],
    [1, 2],
  ])
); // true
console.log(
  isBipartiteDFS(4, [
    [0, 3],
    [1, 2],
    [3, 2],
    [0, 2],
  ])
); // false
