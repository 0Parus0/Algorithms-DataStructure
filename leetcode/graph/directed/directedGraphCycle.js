/*
Directed Graph Cycle
Difficulty: MediumAccuracy: 27.88%Submissions: 530K+Points: 4
Given a Directed Graph with V vertices (Numbered from 0 to V-1) and E edges, check whether it contains any cycle or not.
The graph is represented as a 2D vector edges[][], where each entry edges[i] = [u, v] denotes an edge from verticex u to v.

Examples:

Input: V = 4, edges[][] = [[0, 1], [1, 2], [2, 3], [3, 3]]



Output: true
Explanation: 3 -> 3 is a cycle
Input: V = 3, edges[][] = [[0, 1], [1, 2]]



Output: false
Explanation: no cycle in the graph
Constraints:
1 ≤ V, E ≤ 105
*/
function isCycle(v, edges) {
  // Build adjacency list
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
  }

  const path = new Array(v).fill(false);
  const visited = new Array(v).fill(false);

  function detectCycle(node) {
    visited[node] = true;
    path[node] = true;

    for (let neighbor of adj[node]) {
      // if neighbor node is already present in my path cycle is present
      if (path[neighbor]) return true;
      // if we have already visited the neighbor continue
      if (visited[neighbor]) continue;
      if (detectCycle(neighbor)) return true;
    }

    path[node] = false;
    return false;
  }

  for (let i = 0; i < v; i++) {
    if (!visited[i] && detectCycle(i)) return true;
  }

  return false;
}

function isCycle(v, edges) {
  // Build adjacency list
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
  }

  const path = new Array(v).fill(false);
  const visited = new Array(v).fill(false);

  function detectCycle(node) {
    if (path[node]) return true; // Early exit if already in path
    if (visited[node]) return false; // Already processed, no cycle

    visited[node] = true;
    path[node] = true;

    for (let neighbor of adj[node]) {
      if (detectCycle(neighbor)) return true;
    }

    path[node] = false;
    return false;
  }

  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      if (detectCycle(i)) return true;
    }
  }

  return false;
}

function isCycle(v, edges) {
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
  }

  const state = new Array(v).fill(0); // 0 = unvisited, 1 = visiting, 2 = visited

  function detectCycle(node) {
    if (state[node] === 1) return true; // Cycle detected
    if (state[node] === 2) return false; // Already processed

    state[node] = 1; // Mark as visiting

    for (let neighbor of adj[node]) {
      if (detectCycle(neighbor)) return true;
    }

    state[node] = 2; // Mark as visited
    return false;
  }

  for (let i = 0; i < v; i++) {
    if (state[i] === 0 && detectCycle(i)) return true;
  }

  return false;
}

function isCycleKhans(v, edges) {
  // Build adjacency list
  const adj = Array.from({ length: v }, () => []);
  const indegree = new Array(v).fill(0);

  for (let [u, v] of edges) {
    adj[u].push(v);
    indegree[v]++;
  }

  // Queue for nodes with 0 indegree
  const queue = [];
  for (let i = 0; i < v; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let count = 0; // Count of processed nodes
  while (queue.length > 0) {
    const node = queue.shift();
    count++;

    for (let neighbor of adj[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  // If count !== v, cycle exists
  return count !== v;
}

function isCycleIterative(v, edges) {
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v] of edges) {
    adj[u].push(v);
  }

  const path = new Array(v).fill(false);
  const visited = new Array(v).fill(false);

  for (let i = 0; i < v; i++) {
    if (!visited[i]) {
      const stack = [[i, false]]; // [node, backtrack]
      visited[i] = true;
      path[i] = true;

      while (stack.length > 0) {
        const [node, backtrack] = stack[stack.length - 1];
        if (backtrack) {
          path[node] = false; // Finished exploring
          stack.pop();
          continue;
        }

        // Mark for backtracking next time we see this node
        stack[stack.length - 1][1] = true;

        for (let neighbor of adj[node]) {
          if (path[neighbor]) return true; // Cycle detected
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            path[neighbor] = true;
            stack.push([neighbor, false]);
          }
        }
      }
    }
  }
  return false;
}
console.log(
  isCycleIterative(4, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 3],
  ])
); // true
console.log(
  isCycleIterative(3, [
    [0, 1],
    [1, 2],
  ])
); // false
// Test Case 1: Cycle exists
console.log(
  isCyclic(4, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 3],
  ])
); // true

// Test Case 2: No cycle
console.log(
  isCyclic(3, [
    [0, 1],
    [1, 2],
  ])
); // false

// Test Case 3: Complex cycle
console.log(
  isCyclic(5, [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 1],
  ])
); // true

// Test Case 4: Disconnected graph with cycle
console.log(
  isCyclic(6, [
    [0, 1],
    [1, 2],
    [3, 4],
    [4, 5],
    [5, 3],
  ])
); // true

// Test Case 5: Self-loop
console.log(
  isCyclic(2, [
    [0, 0],
    [0, 1],
  ])
); // true
