/*
1319. Number of Operations to Make Network Connected
Medium
Topics
premium lock icon
Companies
Hint
There are n computers numbered from 0 to n - 1 connected by ethernet cables connections forming a network where connections[i] = [ai, bi] represents a connection between computers ai and bi. Any computer can reach any other computer directly or indirectly through the network.
You are given an initial computer network connections. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.

Return the minimum number of times you need to do this in order to make all the computers connected. If it is not possible, return -1.
Example 1:
Input: n = 4, connections = [[0,1],[0,2],[1,2]]
Output: 1
Explanation: Remove cable between computer 1 and 2 and place between computers 1 and 3.
Example 2:

Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
Output: 2
Example 3:

Input: n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
Output: -1
Explanation: There are not enough cables.
Constraints:

1 <= n <= 105
1 <= connections.length <= min(n * (n - 1) / 2, 105)
connections[i].length == 2
0 <= ai, bi < n
ai != bi
There are no repeated connections.
No two computers are connected by more than one cable.
*/

function makeConnected(n, connections) {
  // Not enough edges to connect all components;
  if (connections.length < n - 1) return -1;

  // Initialize DSU
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  let components = n;

  // Find with path compression
  function find(x) {
    if (x !== parent[x]) {
      parent[x] = find(parent[x]);
    }

    return parent[x];
  }

  // Union by rank
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) return false; // Already connected (this is an extra edge);
    if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else if (rank[rootY] > rank[rootX]) {
      parent[rootX] = rootY;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }

    components--; // Two components merged into one
    return true;
  }

  // Process all connections
  for (let [u, v] of connections) {
    union(u, v);
  }

  // We need (component - 1) edges to connect all components
  return components - 1;
}

var makeConnected = function (n, connections) {
  if (connections.length < n - 1) return -1;

  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  let extraCables = 0;
  let components = n;

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) {
      extraCables++; // This connection is redundant
      return false;
    }

    if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else if (rank[rootY] > rank[rootX]) {
      parent[rootX] = rootY;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }

    components--;
    return true;
  };

  // Process all connections
  for (const [u, v] of connections) {
    union(u, v);
  }

  // We need (components - 1) cables
  const needed = components - 1;

  // If we have enough extra cables, return needed
  // Else return -1 (but we already checked at beginning)
  return extraCables >= needed ? needed : -1;
};

// With DFS

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */
var makeConnected = function (n, connections) {
  // Not enough cables to connect all computers
  if (connections.length < n - 1) {
    return -1;
  }

  // Build adjacency list
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = new Array(n).fill(false);
  let components = 0;

  // DFS function
  const dfs = (node) => {
    visited[node] = true;
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        dfs(neighbor);
      }
    }
  };

  // Count connected components
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      components++;
      dfs(i);
    }
  }

  // Need (components - 1) cables to connect all components
  return components - 1;
};

// With BFS

var makeConnected = function (n, connections) {
  if (connections.length < n - 1) return -1;

  const graph = new Array(n).fill().map(() => []);
  for (const [u, v] of connections) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = new Array(n).fill(false);
  let components = 0;

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      components++;

      // BFS for this component
      const queue = [i];
      visited[i] = true;

      while (queue.length > 0) {
        const node = queue.shift(); // Use pop() for stack-like DFS
        for (const neighbor of graph[node]) {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.push(neighbor);
          }
        }
      }
    }
  }

  return components - 1;
};

// Iterative DFS (using stack)

var makeConnected = function (n, connections) {
  if (connections.length < n - 1) return -1;

  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of connections) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = new Array(n).fill(false);
  let components = 0;

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      components++;

      // Iterative DFS using stack
      const stack = [i];
      visited[i] = true;

      while (stack.length > 0) {
        const node = stack.pop();
        for (const neighbor of graph[node]) {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            stack.push(neighbor);
          }
        }
      }
    }
  }

  return components - 1;
};
