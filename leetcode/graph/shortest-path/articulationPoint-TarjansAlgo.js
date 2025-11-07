/*
Articulation Point - I
Difficulty: HardAccuracy: 39.26%Submissions: 86K+Points: 8Average Time: 20m
Given an undirected connected graph with V vertices and adjacency list adj. You are required to find all the vertices removing which (and edges through it) disconnects the graph into 2 or more components and return it in sorted manner.
Note: Indexing is zero-based i.e nodes numbering from (0 to V-1). There might be loops present in the graph.

Example 1:

Input:

Output:{1,4}
Explanation: Removing the vertex 1 will
discconect the graph as-

Removing the vertex 4 will disconnect the
graph as-

 

Your Task:
You don't need to read or print anything. Your task is to complete the function articulationPoints() which takes V and adj as input parameters and returns a list containing all the vertices removing which turn the graph into two or more disconnected components in sorted order. If there are no such vertices then returns a list containing -1.
 

Expected Time Complexity: O(V + E)
Expected Auxiliary Space: O(V)
 

Constraints:
1 ≤ V ≤ 105
*/
function articulationPoints(V, adj) {
  // Discovery time of each node (When it was first visited)
  const disc = new Array(V).fill(-1);
  // Lowest discovery time reachable from this node
  const low = new Array(V).fill(-1);
  // Parent in DFS tree
  const parent = new Array(V).fill(-1);
  // Articulation point markers
  const ap = new Array(V).fill(false);
  let time = 0; // Global timer to assign discovery times

  // DFS traversal
  function dfs(node) {
    disc[node] = low[node] = time++; // Initialize discovery and low
    let children = 0; // Count children of u in DFS tree

    for (let neighbor of adj[node]) {
      if (disc[neighbor] === -1) {
        // neighbor is unvisited -> tree edge
        children++;
        parent[neighbor] = node;
        dfs(neighbor);

        // On return from neighbor, update low[node]
        low[node] = Math.min(low[node], low[neighbor]);

        // ---- Articulation Point Conditions ---

        // Case 1: node is root of DFS tree and has 2+ children
        if (parent[node] === -1 && children > 1) {
          ap[node] = true;
        }

        // Case 2: node is not root and child's low >= node's discovery
        if (parent[node] !== -1 && low[neighbor] >= disc[node]) {
          ap[node] = true;
        }
      } else if (neighbor !== parent[node]) {
        // Back edge (ignore edge to parent)
        low[node] = Math.min(low[node], disc[neighbor]);
      }
    }
  }

  // Run DFS for all components (though graph is connect, this is safe)
  for (let i = 0; i < V; i++) {
    if (disc[i] === -1) {
      dfs(i);
    }
  }

  // Collect articulation points in sorted order
  const res = [];
  for (let i = 0; i < V; i++) {
    if (ap[i]) res.push(i);
  }

  return res.length > 0 ? res : [-1];
}

/*
Conditions for Articulation Point:

    Root of DFS tree: If it has 2 or more children

    Non-root vertex: If it has a child v such that no vertex in the subtree rooted at v has a back edge to an ancestor of u

        Mathematically: low[v] >= disc[u]

Key Differences from Bridges:

    Bridges: low[v] > disc[u]

    Articulation Points: low[v] >= disc[u] (includes equality)

    Root node needs special handling for articulation points

Time & Space Complexity:

    Time Complexity: O(V + E) - single DFS traversal

    Space Complexity: O(V) for auxiliary arrays
*/

// Example 1
console.log(
  articulationPoints(5, [
    [1, 2, 3], // adj[0]
    [0, 2], // adj[1]
    [0, 1], // adj[2]
    [0, 4], // adj[3]
    [3], // adj[4]
  ])
);
// Expected: [0, 3]

// Example 2 - No articulation points (cycle)
console.log(
  articulationPoints(3, [
    [1, 2],
    [0, 2],
    [0, 1],
  ])
);
// Expected: [-1]

// Example 3 - Tree (all internal nodes are articulation points)
console.log(articulationPoints(4, [[1], [0, 2], [1, 3], [2]]));
// Expected: [1, 2]

// Example 4 - Single articulation point
console.log(articulationPoints(4, [[1, 2, 3], [0], [0], [0]]));
// Expected: [0]
