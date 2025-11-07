/*
Strongly connected component (Tarjans's Algo)
Difficulty: HardAccuracy: 36.78%Submissions: 31K+Points: 8Average Time: 30m
Given a Directed Graph with V vertices and E edges, Find the members of strongly connected components in the graph.

Note - Sort both the individual components and array of the components.

Example 1:

Input:

Output: 0 1 2 3 4
Explanation:

We can clearly see that there are 3 Strongly
Connected Components in the Graph as mentioned
in the Output.
Input:

Output: 0 1 2
Explanation:
All of the nodes are connected to each other.
So, there's only one SCC as shown.

Your Task:
You don't need to read input or print anything. Your task is to complete the function tarjans() which takes the number of vertices V and adjacency list of the graph as input parameters and returns a list of list of integers denoting the members of strongly connected components in the given graph.
Note: A single strongly connected component must be represented in the form of a list if integers sorted in the ascending order. The resulting list should consist of a list of all SCCs which must be sorted in a way such that a lexicographically smaller list of integers appears first.


Expected Time Complexity: O(V + E).
Expected Auxiliary Space: O(V).


Constraints:
1 ≤ V  ≤ 105
1 ≤ E  ≤ 105
0 ≤ u, v ≤ N-1
*/
function tarjansSCC(adj) {
  const V = adj.length;
  const disc = new Array(V).fill(-1);
  const low = new Array(V).fill(-1);
  const stack = [];
  const inStack = new Array(V).fill(false);
  let time = 0;
  let sccs = [];

  function dfs(node) {
    disc[node] = low[node] = time++;
    stack.push(node);
    inStack[node] = true;

    for (let neighbor of adj[node]) {
      if (disc[neighbor] === -1) {
        // Not visited yet
        dfs(neighbor);
        low[node] = Math.min(low[node], low[neighbor]);
      } else if (inStack[neighbor]) {
        low[node] = Math.min(low[node], disc[neighbor]);
      }
    }

    // Root node of SCC found
    if (low[node] === disc[node]) {
      const component = [];
      while (true) {
        const v = stack.pop();
        inStack[v] = false;
        component.push(v);
        if (v === node) break;
      }
      component.sort((a, b) => a - b);

      sccs.push(component);
    }
  }

  for (let i = 0; i < V; i++) {
    if (disc[i] === -1) dfs(i);
  }

  sccs.sort((a, b) => {
    const minLen = Math.min(a.length, b.length);
    for (let i = 0; i < minLen; i++) {
      if (a[i] !== b[i]) {
        return a[i] - b[i];
      }
    }

    return a.length - b.length;
  });

  return sccs;
}

// Example 1
console.log(tarjansSCC([[2, 3], [0], [1], [4], []]));
// Output: [[0,1,2], [3], [4]]

// Example 2
console.log(tarjansSCC([[1], [2], [0]]));
// Output: [[0,1,2]]

// Example 3
console.log(tarjansSCC([[1], []]));
// Output: [[0], [1]]

// Example 4
console.log(tarjansSCC([[1], [2], [0, 3], []]));
// Output: [[0,1,2], [3]]
