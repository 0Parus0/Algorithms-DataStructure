/*
1192. Critical Connections in a Network
Hard
Topics
premium lock icon
Companies
Hint
There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents a connection between servers ai and bi. Any server can reach other servers directly or indirectly through the network.

A critical connection is a connection that, if removed, will make some servers unable to reach some other server.

Return all critical connections in the network in any order.

 

Example 1:


Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]
Explanation: [[3,1]] is also accepted.
Example 2:

Input: n = 2, connections = [[0,1]]
Output: [[0,1]]
 

Constraints:

2 <= n <= 105
n - 1 <= connections.length <= 105
0 <= ai, bi <= n - 1
ai != bi
There are no repeated connections.
*/
function criticalConnections(n, connections) {
  // Build graph
  const adj = Array.from({ length: n }, () => []);
  for (let [a, b] of connections) {
    adj[a].push(b);
    adj[b].push(a);
  }

  const disc = new Array(n).fill(-1); // Discovery times
  const low = new Array(n).fill(-1); // Lowest discovery reachable
  const bridges = [];
  let time = 0;

  function dfs(node, parent) {
    disc[node] = time;
    low[node] = time;
    time++;

    for (let neighbor of adj[node]) {
      if (neighbor === parent) continue; // Skip the parent

      if (disc[neighbor] === -1) {
        // Unvisited node
        dfs(neighbor, node);
        low[node] = Math.min(low[node], low[neighbor]);

        // Check if the edge node-neighbor is a bridge
        if (low[neighbor] > disc[node]) {
          bridges.push([node, neighbor]);
        }
      } else {
        // Back edge: update low value
        low[node] = Math.min(low[node], disc[neighbor]);
      }
    }
  }
  // Since graph is connect, we start from any node
  dfs(0, -1);
  return bridges;
}

function criticalConnectionsIter(n, connections) {
  // Build adjacency list
  const adj = Array.from({ length: n }, () => []);
  for (let [a, b] of connections) {
    adj[a].push(b);
    adj[b].push(a);
  }

  const disc = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  const parent = new Array(n).fill(-1);
  const visited = new Array(n).fill(false);
  const bridges = [];
  let time = 0;

  const stack = [0];
  disc[0] = low[0] = time++;
  visited[0] = true;

  while (stack.length > 0) {
    const node = stack[stack.length - 1];
    let foundUnvisited = false;

    for (let neighbor of adj[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        parent[neighbor] = node;
        disc[neighbor] = low[neighbor] = time++;
        stack.push(neighbor);
        foundUnvisited = true;
        break;
      } else if (neighbor !== parent[node]) {
        // Back edge found
        low[node] = Math.min(low[node], disc[neighbor]);
      }
    }

    if (!foundUnvisited) {
      stack.pop();
      const p = parent[node];

      if (p !== -1) {
        low[p] = Math.min(low[p], low[node]);

        // Check for bridge
        if (low[node] > disc[p]) {
          bridges.push([p, node]);
        }
      }
    }
  }

  return bridges;
}
/*
⏱ Complexity

Building adjacency: O(n + m)

DFS traversal: O(n + m)

Total: O(n + m)

Space: adjacency list + recursion stack → O(n + m)
*/
// Example 1
console.log(
  criticalConnectionsIter(4, [
    [0, 1],
    [1, 2],
    [2, 0],
    [1, 3],
  ])
);
// Output: [[1,3]] or [[3,1]]

// Example 2
console.log(criticalConnectionsIter(2, [[0, 1]]));
// Output: [[0,1]]

// Example 3: Cycle (no bridges)
console.log(
  criticalConnectionsIter(3, [
    [0, 1],
    [1, 2],
    [2, 0],
  ])
);
// Output: []

// Example 4: Tree (all edges are bridges)
console.log(
  criticalConnectionsIter(4, [
    [0, 1],
    [1, 2],
    [2, 3],
  ])
);
// Output: [[0,1],[1,2],[2,3]]
