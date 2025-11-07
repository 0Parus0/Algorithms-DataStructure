/*
BFS of graph
Difficulty: EasyAccuracy: 44.09%Submissions: 518K+Points: 2Average Time: 10m
Given a connected undirected graph containing V vertices, represented by a 2-d adjacency list adj[][], where each adj[i] represents the list of vertices connected to vertex i. Perform a Breadth First Search (BFS) traversal starting from vertex 0, visiting vertices from left to right according to the given adjacency list, and return a list containing the BFS traversal of the graph.

Note: Do traverse in the same order as they are in the given adjacency list.

Examples:

Input: adj[][] = [[2, 3, 1], [0], [0, 4], [0], [2]]

Output: [0, 2, 3, 1, 4]
Explanation: Starting from 0, the BFS traversal will follow these steps: 
Visit 0 → Output: 0 
Visit 2 (first neighbor of 0) → Output: 0, 2 
Visit 3 (next neighbor of 0) → Output: 0, 2, 3 
Visit 1 (next neighbor of 0) → Output: 0, 2, 3, 
Visit 4 (neighbor of 2) → Final Output: 0, 2, 3, 1, 4
Input: adj[][] = [[1, 2], [0, 2], [0, 1, 3, 4], [2], [2]]

Output: [0, 1, 2, 3, 4]
Explanation: Starting from 0, the BFS traversal proceeds as follows: 
Visit 0 → Output: 0 
Visit 1 (the first neighbor of 0) → Output: 0, 1 
Visit 2 (the next neighbor of 0) → Output: 0, 1, 2 
Visit 3 (the first neighbor of 2 that hasn't been visited yet) → Output: 0, 1, 2, 3 
Visit 4 (the next neighbor of 2) → Final Output: 0, 1, 2, 3, 4
Constraints:
1 ≤ V = adj.size() ≤ 104
1 ≤ adj[i][j] ≤ 104
*/
function bfsOfGraph(adj) {
  const v = adj.length;
  let visited = new Array(v).fill(false);
  let queue = [];
  let result = [];

  // Start from vertex 0
  visited[0] = true;
  queue.push(0);

  while (queue.length > 0) {
    let current = queue.shift(); // Dequeue the front node
    result.push(current);

    // Traverse all neighbors of the current node in the order given in the adjacency list
    for (let neighbor of adj[current]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }

  return result;
}

// Example 1
let adj1 = [[2, 3, 1], [0], [0, 4], [0], [2]];
console.log(bfsOfGraph(adj1)); // Output: [0, 2, 3, 1, 4]

// Example 2
let adj2 = [[1, 2], [0, 2], [0, 1, 3, 4], [2], [2]];
console.log(bfsOfGraph(adj2)); // Output: [0, 1, 2, 3, 4]
