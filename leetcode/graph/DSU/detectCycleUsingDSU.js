/*
Detect Cycle using DSU
Difficulty: MediumAccuracy: 48.37%Submissions: 68K+Points: 4Average Time: 15m
Given an undirected graph with no self loops with V (from 0 to V-1) nodes and E edges, the task is to check if there is any cycle in the undirected graph.

Note: Solve the problem using disjoint set union (DSU).

Examples

Input: 

Output: 1
Explanation: There is a cycle between 0->2->4->0
Input: 

Output: 0
Explanation: The graph doesn't contain any cycle
Your Task:
You don't need to read or print anyhting. Your task is to complete the function detectCycle() which takes number of vertices in the graph denoting as V and adjacency list adj and returns 1 if graph contains any cycle otherwise returns 0.

Expected Time Complexity: O(V + E)
Expected Space Complexity: O(V)

Constraints:
2 ≤ V ≤ 104
1 ≤ E ≤ 104
*/

/* Best and simple */
class Solution {
  detectCycle(n, adj) {
    const parent = Array.from({ length: n }, (_, i) => i);
    const rank = new Array(n).fill(0);

    const find = (x) => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]);
      }
      return parent[x];
    };

    const union = (x, y) => {
      const rootX = find(x);
      const rootY = find(y);

      if (rootX === rootY) return false;

      if (rank[rootX] > rank[rootY]) {
        parent[rootY] = rootX;
      } else if (rank[rootY] > rank[rootX]) {
        parent[rootX] = rootY;
      } else {
        parent[rootY] = rootX;
        rank[rootX]++;
      }
      return true;
    };

    // Only this loop, no visited set needed!
    for (let u = 0; u < n; u++) {
      for (const v of adj[u]) {
        // Process edge only when u > v (or u < v)
        if (u > v) continue; // Magic line!

        // Now each edge is processed only once
        if (find(u) === find(v)) {
          return 1; // Cycle detected
        }

        union(u, v);
      }
    }

    return 0;
  }
}

class Solution {
  detectCycle(n, adj) {
    // Create DSU using closures instead of class
    const createDSU = (size) => {
      const parent = Array.from({ length: size }, (_, i) => i);
      const rank = new Array(size).fill(0);

      const find = (x) => {
        if (parent[x] !== x) {
          parent[x] = find(parent[x]);
        }
        return parent[x];
      };

      const unionByRank = (x, y) => {
        const rootX = find(x);
        const rootY = find(y);

        if (rootX === rootY) return false;

        if (rank[rootX] > rank[rootY]) {
          parent[rootY] = rootX;
        } else if (rank[rootY] > rank[rootX]) {
          parent[rootX] = rootY;
        } else {
          parent[rootY] = rootX;
          rank[rootX]++;
        }

        return true;
      };

      const connected = (x, y) => {
        return find(x) === find(y);
      };

      return { find, unionByRank, connected };
    };

    const { find, unionByRank, connected } = createDSU(n);
    const visitedEdges = new Set();

    for (let u = 0; u < n; u++) {
      for (const v of adj[u]) {
        if (u === v) continue;

        const edgeKey = u < v ? `${u}-${v}` : `${v}-${u}`;
        if (visitedEdges.has(edgeKey)) continue;
        visitedEdges.add(edgeKey);

        if (connected(u, v)) {
          return 1;
        }

        unionByRank(u, v);
      }
    }

    return 0;
  }
}

class UnionFind {
  constructor(size) {
    // FIX: Use Array.from or for loop to initialize
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = new Array(size).fill(0);
  }

  find(x) {
    // FIX: Added missing 'this' keyword
    if (x !== this.parent[x]) {
      this.parent[x] = this.find(this.parent[x]); // Fixed: this.parent[x]
    }
    return this.parent[x];
  }

  unionByRank(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    // FIX: Added missing 'this' keyword for rank
    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootY] > this.rank[rootX]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++; // FIX: Must increment rank when equal
    }
    return true;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

class Solution {
  detectCycle(n, adj) {
    const uf = new UnionFind(n);

    // FIX: You can't destructure like this because methods lose 'this' binding
    // Use bind or arrow functions in UnionFind class
    const find = uf.find.bind(uf);
    const unionByRank = uf.unionByRank.bind(uf);
    const connected = uf.connected.bind(uf);

    // Alternative: Use arrow functions in UnionFind class (see below)
    // const { find, unionByRank, connected } = uf;

    const visitedEdges = new Set(); // Track processed edges

    for (let u = 0; u < n; u++) {
      for (let v of adj[u]) {
        // Skip self-loops
        if (u === v) continue;

        // For undirected graph, process each edge only once
        // Create a canonical representation
        const edgeKey = u < v ? `${u}-${v}` : `${v}-${u}`;
        if (visitedEdges.has(edgeKey)) continue;
        visitedEdges.add(edgeKey);

        // Check if u and v are already connected (cycle found)
        if (connected(u, v)) {
          return 1; // FIX: Should return 1 (not true)
        }

        // Union them
        unionByRank(u, v);
      }
    }

    return 0; // No cycle found
  }
}

class UnionFind {
  constructor(size) {
    this.parent = new Array(size);
    this.rank = new Array(size);
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
  }

  // Arrow functions auto-bind 'this'
  find = (x) => {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  };

  unionByRank = (x, y) => {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false;

    if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else if (this.rank[rootY] > this.rank[rootX]) {
      this.parent[rootX] = rootY;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    return true;
  };

  connected = (x, y) => {
    return this.find(x) === this.find(y);
  };
}

class Solution {
  detectCycle(n, adj) {
    const uf = new UnionFind(n);

    // Now you can directly extract methods
    const { find, unionByRank, connected } = uf;
    // These will work without binding!

    const visitedEdges = new Set();

    for (let u = 0; u < n; u++) {
      for (const v of adj[u]) {
        if (u === v) continue;

        const edgeKey = u < v ? `${u}-${v}` : `${v}-${u}`;
        if (visitedEdges.has(edgeKey)) continue;
        visitedEdges.add(edgeKey);

        if (connected(u, v)) {
          return 1;
        }

        unionByRank(u, v);
      }
    }

    return 0;
  }
}
