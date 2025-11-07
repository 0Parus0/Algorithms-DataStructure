/*
Strongly Connected
Difficulty: MediumAccuracy: 50.61%Submissions: 120K+Points: 4Average Time: 20m
Given an adjacency list, adj of Directed Graph, Find the number of strongly connected components in the graph.
 

Examples :

Input: adj[][] = [[2, 3], [0], [1], [4], []]

Output: 3
Explanation: We can clearly see that there are 3 Strongly Connected Components in the Graph.
 
Input: adj[][] = [[1], [2], [0]]

Output: 1
Explanation: All of the nodes are connected to each other. So, there's only one SCC.
Input: adj[][] = [[1], []]
Output: 2
Constraints:
2<=adj.size()<=106
0<=edges<=adj.size()-1
*/
function kosaraju(adj) {
  // Step 1: Topological sort
  const V = adj.length;
  const stack = [];
  const visited = new Array(V).fill(false);

  function topological(node) {
    visited[node] = true;

    // look at it's all neighbors
    for (let neighbor of adj[node]) {
      if (!visited[neighbor]) topological(neighbor);
    }

    stack.push(node);
  }

  for (let i = 0; i < V; i++) {
    if (!visited[i]) topological(i);
  }

  // Step 2: Transpose the graph
  const transpose = Array.from({ length: V }, () => []);
  for (let u = 0; u < V; u++) {
    for (let v of adj[u]) {
      transpose[v].push(u); // reverse the edge
    }
  }

  // Step 3: DFS on transposed graph / 2nd adjacency list with reversed edges
  let sccCount = 0; // Strongly connect component
  visited.fill(false);

  function dfs(node) {
    visited[node] = true;

    for (let neighbor of transpose[node]) {
      if (!visited[neighbor]) dfs(neighbor);
    }
  }

  while (stack.length > 0) {
    let node = stack.pop();
    if (!visited[node]) {
      dfs(node);
      sccCount++;
    }
  }
  return sccCount;
}

/*
✅ Time Complexity:

DFS pass = O(V + E)

Transpose building = O(V + E)

DFS on transpose = O(V + E)

Total = O(V + E)

✅ Space Complexity:

Adjacency list + transpose = O(V + E)

Stack + visited = O(V)
*/

console.log(kosaraju([[2, 3], [0], [1], [4], []])); // 3
console.log(kosaraju([[1], [2], [0]])); // 1
console.log(kosaraju([[1], []])); // 2
