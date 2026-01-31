/*
2316. Count Unreachable Pairs of Nodes in an Undirected Graph
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer n. There is an undirected graph with n nodes, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting nodes ai and bi.

Return the number of pairs of different nodes that are unreachable from each other.

 

Example 1:


Input: n = 3, edges = [[0,1],[0,2],[1,2]]
Output: 0
Explanation: There are no pairs of nodes that are unreachable from each other. Therefore, we return 0.
Example 2:


Input: n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]
Output: 14
Explanation: There are 14 pairs of nodes that are unreachable from each other:
[[0,1],[0,3],[0,6],[1,2],[1,3],[1,4],[1,5],[2,3],[2,6],[3,4],[3,5],[3,6],[4,6],[5,6]].
Therefore, we return 14.
 

Constraints:

1 <= n <= 105
0 <= edges.length <= 2 * 105
edges[i].length == 2
0 <= ai, bi < n
ai != bi
There are no repeated edges.
*/

function countPairs(n, edges) {
  // Initialize DSU
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  const mp = new Map();

  // Find with path compression
  function find(x) {
    if (x !== parent[x]) {
      parent[x] = find(parent[x]);
    }

    return parent[x];
  }

  // Union by rank with size tracking
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) return;

    // Union by rank
    if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else if (rank[rootY] > rank[rootX]) {
      parent[rootX] = rootY;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
  }

  // Union all the edges
  for (let [u, v] of edges) {
    union(u, v);
  }

  // Calculate the sizes of all the roots/parents
  for (let i = 0; i < n; i++) {
    const root = find(i);
    mp.set(root, (mp.get(parent) || 0) + 1);
  }

  let result = 0;
  let remaining = n;

  for (let s of mp.values()) {
    result += s * (remaining - s);
    remaining -= s;
  }

  return result;
}

function countPairs(n, edges) {
  // Initialize DSU
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  const size = new Array(n).fill(1);

  // Find with path compression
  function find(x) {
    if (x !== parent[x]) {
      parent[x] = find(parent[x]);
    }

    return parent[x];
  }

  // Union by rank with size tracking
  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) return;

    // Union by rank
    if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
      size[rootX] += size[rootY];
    } else if (rank[rootY] > rank[rootX]) {
      parent[rootX] = rootY;
      size[rootY] += size[rootX];
    } else {
      parent[rootY] = rootX;
      size[rootX] += size[rootY];
      rank[rootX]++;
    }
  }

  // Union all edges
  for (let [u, v] of edges) {
    union(u, v);
  }

  // Collect component sizes
  const componentSizes = new Map();
  for (let i = 0; i < n; i++) {
    const root = find(i);
    componentSizes.set(root, size[root]);
  }

  const sizes = Array.from(componentSizes.values());

  // Calculate unreachable pairs
  let unreachable = 0;
  let remaining = n;

  for (let s of sizes) {
    remaining -= s;
    unreachable += s * remaining;
  }

  return unreachable;
}

/* Most Efficient Union Find */

var countPairs = function (n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const size = new Array(n).fill(1);

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) return;

    // Always attach smaller tree to larger tree
    if (size[rootX] < size[rootY]) {
      parent[rootX] = rootY;
      size[rootY] += size[rootX];
    } else {
      parent[rootY] = rootX;
      size[rootX] += size[rootY];
    }
  };

  for (const [u, v] of edges) {
    union(u, v);
  }

  // Calculate result
  let unreachable = 0;
  let totalNodes = n;

  // We can accumulate as we find roots
  for (let i = 0; i < n; i++) {
    if (parent[i] === i) {
      // It's a root
      const componentSize = size[i];
      totalNodes -= componentSize;
      unreachable += componentSize * totalNodes;
    }
  }

  return unreachable;
};

/* Optimized Union Find (without Map) */
var countPairs = function (n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const rank = new Array(n).fill(0);
  const size = new Array(n).fill(1);

  const find = (x) => {
    if (parent[x] !== x) {
      parent[x] = find(parent[x]);
    }
    return parent[x];
  };

  const union = (x, y) => {
    const rootX = find(x);
    const rootY = find(y);

    if (rootX === rootY) return;

    if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
      size[rootX] += size[rootY];
    } else if (rank[rootY] > rank[rootX]) {
      parent[rootX] = rootY;
      size[rootY] += size[rootX];
    } else {
      parent[rootY] = rootX;
      size[rootX] += size[rootY];
      rank[rootX]++;
    }
  };

  for (const [u, v] of edges) {
    union(u, v);
  }

  // Direct calculation without Map
  let unreachable = 0;
  let remaining = n;

  // We need to ensure we only count each root once
  const rootSizes = new Set();
  for (let i = 0; i < n; i++) {
    if (parent[i] === i) {
      // Only process roots
      rootSizes.add(size[i]);
    }
  }

  for (const s of rootSizes) {
    remaining -= s;
    unreachable += s * remaining;
  }

  return unreachable;
};

/* Alternative: DFS/BFS Solution */

var countPairs = function (n, edges) {
  // Build adjacency list
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = new Array(n).fill(false);
  const componentSizes = [];

  // DFS to find component sizes
  const dfs = (node) => {
    const stack = [node];
    visited[node] = true;
    let count = 0;

    while (stack.length > 0) {
      const curr = stack.pop();
      count++;

      for (const neighbor of graph[curr]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      }
    }

    return count;
  };

  // Find all component sizes
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      const size = dfs(i);
      componentSizes.push(size);
    }
  }

  // Calculate unreachable pairs
  let unreachable = 0;
  let remaining = n;

  for (const s of componentSizes) {
    remaining -= s;
    unreachable += s * remaining;
  }

  return unreachable;
};
