/*
Shortest Path in Undirected Graph
Difficulty: MediumAccuracy: 49.98%Submissions: 164K+Points: 4Average Time: 20m
You are given an adjacency list, adj of Undirected Graph having unit weight of the edges, find the shortest path from src to all the vertex and if it is unreachable to reach any vertex, then return -1 for that vertex.

Examples :

Input: adj[][] = [[1, 3], [0, 2], [1, 6], [0, 4], [3, 5], [4, 6], [2, 5, 7, 8], [6, 8], [7, 6]], src=0
Output: [0, 1, 2, 1, 2, 3, 3, 4, 4]

Input: adj[][]= [[3], [3], [], [0, 1]], src=3
Output: [1, 1, -1, 0]

Input: adj[][]= [[], [], [], [4], [3], [], []], src=1
Output: [-1, 0, -1, -1, -1, -1, -1] 
Constraint:
1<=adj.size()<=104
0<=edges<=adj.size()-1
*/

function shortestPath(adj, src) {
  const n = adj.length;
  const dist = new Array(n).fill(-1);

  // BFS with index-based queue for  better performance
  const queue = [];
  let front = 0;
  dist[src] = 0;
  queue.push(src);

  while (front < queue.length) {
    const node = queue[front];
    front++;

    for (let neighbor of adj[node]) {
      if (dist[neighbor] === -1) {
        dist[neighbor] = dist[node] + 1;
        queue.push(neighbor);
      }
    }
  }
  return dist;
}

function shortestPath1(adj, src) {
  const n = adj.length;
  const dist = new Array(n).fill(-1);
  const queue = [];

  dist[src] = 0;
  queue.push(src);

  while (queue.length > 0) {
    const node = queue.shift();

    for (let neighbor of adj[node]) {
      if (dist[neighbor] === -1) {
        dist[neighbor] = dist[node] + 1;
        queue.push(neighbor);
      }
    }
  }

  return dist;
}

/*
Time & Space Complexity:

    Time Complexity: O(V + E) where V is vertices, E is edges

    Space Complexity: O(V) for queue and distance array

The second implementation using index-based queue is more efficient since shift() operation in JavaScript arrays has O(n) time complexity, while index-based access is O(1).
*/

function shortestPathDFS(adj, src) {
  const n = adj.length;
  const dist = new Array(n).fill(Number.MAX_SAFE_INTEGER);

  function dfs(node, currentDist) {
    // Prune: if current path is not better, stop
    if (currentDist >= dist[node]) {
      return;
    }

    dist[node] = currentDist;

    for (let neighbor of adj[node]) {
      dfs(neighbor, currentDist + 1);
    }
  }

  dfs(src, 0);

  // Convert unreachable nodes to -1;
  return dist.map((d) => (d === Number.MAX_SAFE_INTEGER ? -1 : d));
}

class Solution {
  shortestPath(adj, src) {
    const n = adj.length;
    const dist = new Array(n).fill(Number.MAX_SAFE_INTEGER);
    const stack = [];

    dist[src] = 0;
    stack.push([src, 0]);

    while (stack.length > 0) {
      const [current, currentDist] = stack.pop();

      // Only process if we found a better path
      if (currentDist >= dist[current]) {
        continue;
      }

      dist[current] = currentDist;

      // Push neighbors in reverse order for DFS-like behavior
      for (let i = adj[current].length - 1; i >= 0; i--) {
        const neighbor = adj[current][i];
        stack.push([neighbor, currentDist + 1]);
      }
    }

    return dist.map((d) => (d === Number.MAX_SAFE_INTEGER ? -1 : d));
  }
}

// Example
console.log(
  shortestPathDFS(
    [
      [1, 3],
      [0, 2],
      [1, 6],
      [0, 4],
      [3, 5],
      [4, 6],
      [2, 5, 7, 8],
      [6, 8],
      [7, 6],
    ],
    0
  )
);
// Output: [0,1,2,1,2,3,3,4,4]
