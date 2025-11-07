/*
Undirected Graph Cycle
Difficulty: MediumAccuracy: 30.13%Submissions: 642K+Points: 4Average Time: 20m
Given an undirected graph with V vertices and E edges, represented as a 2D vector edges[][], where each entry edges[i] = [u, v] denotes an edge between vertices u and v, determine whether the graph contains a cycle or not. The graph can have multiple component.

Examples:

Input: V = 4, E = 4, edges[][] = [[0, 1], [0, 2], [1, 2], [2, 3]]
Output: true
Explanation: 
 
1 -> 2 -> 0 -> 1 is a cycle.
Input: V = 4, E = 3, edges[][] = [[0, 1], [1, 2], [2, 3]]
Output: false
Explanation: 
 
No cycle in the graph.
Constraints:
1 ≤ V ≤ 105
1 ≤ E = edges.size() ≤ 105
*/

/**
 * @param {number} V - number of vertices
 * @param {number[][]} edges - edge list
 * @return {boolean}
 */

function isCycle(v, edges) {
  // Build adjacency list
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = new Array(v).fill(false);
  // console.log({ visited, adj });

  function dfs(node, parent) {
    visited[node] = true;

    for (let neighbor of adj[node]) {
      if (!visited[neighbor]) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true; // node already visited and it's not parent
      }
    }

    return false;
  }

  // check all components ==> connected and non-connected
  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      if (dfs(i, -1)) return true;
    }
  }

  return false;
}

function isCycleIterative(v, edges) {
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = new Array(v).fill(false);

  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      const stack = [[i, -1]]; // [node, parent];
      visited[i] = true;

      while (stack.length > 0) {
        const [node, parent] = stack.pop();

        for (let neighbor of adj[node]) {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            stack.push([neighbor, node]);
          } else if (neighbor !== parent) return true;
        }
      }
    }
  }

  return false;
}

function isCycleBFS(v, edges) {
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const visited = new Array(v).fill(false);

  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      if (bfsHasCycle(i, visited, adj)) {
        return true;
      }
    }
  }

  return false;

  function bfsHasCycle(start, visited, adj) {
    const queue = [[start, -1]]; // [current, parent]
    visited[start] = true;

    while (queue.length > 0) {
      const [node, parent] = queue.shift();

      for (let neighbor of adj[node]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push([neighbor, node]);
        } else if (neighbor !== parent) {
          return true;
        }
      }
    }
  }
}

// Example tests
console.log(
  isCycleBFS(4, [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 3],
  ])
);
// true

console.log(
  isCycleBFS(4, [
    [0, 1],
    [1, 2],
    [2, 3],
  ])
);
// false
