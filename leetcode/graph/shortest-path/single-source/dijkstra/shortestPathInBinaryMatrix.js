/*
Medium
Topics
premium lock icon
Companies
Hint
Given an n x n binary matrix grid, return the length of the shortest clear path in the matrix. If there is no clear path, return -1.

A clear path in a binary matrix is a path from the top-left cell (i.e., (0, 0)) to the bottom-right cell (i.e., (n - 1, n - 1)) such that:

All the visited cells of the path are 0.
All the adjacent cells of the path are 8-directionally connected (i.e., they are different and they share an edge or a corner).
The length of a clear path is the number of visited cells of this path.

 

Example 1:


Input: grid = [[0,1],[1,0]]
Output: 2
Example 2:


Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
Example 3:

Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
 

Constraints:

n == grid.length
n == grid[i].length
1 <= n <= 100
grid[i][j] is 0 or 1
*/
function shortestPathBinaryMatrix(grid) {
  const n = grid.length;
  const m = grid[0].length;
  const row = [0, 0, -1, 1, -1, -1, 1, 1];
  const column = [-1, 1, 0, 0, -1, 1, -1, 1];

  if (m === 0 || n === 0 || grid[0][0] !== 0) return -1;

  function isValid(x, y) {
    return x < n && x >= 0 && y < m && y >= 0 && grid[x][y] !== 1;
  }

  const que = [];
  que.push([0, 0]); // [x, y] grid[x][y];
  grid[0][0] = 1;

  let level = 0;
  while (que.length) {
    let len = que.length;
    while (len--) {
      const [x, y] = que.shift();

      if (x === n - 1 && y === m - 1) {
        return level + 1;
      }

      for (let i = 0; i < 8; i++) {
        let newX = x + row[i];
        let newY = y + column[i];

        if (isValid(newX, newY)) {
          que.push([newX, newY]);
          grid[newX][newY] = 1;
        }
      }
    }
    level++;
  }
  return -1;
}

//------------------------------------
// Using Dijkstra's Algorithm
//------------------------------------

/* 1. First, Convert Matrix to Graph with Adjacency List */

class MinHeap {
  // ... (same MinHeap implementation as before)
}

function createGraphFromMatrix(grid) {
  const n = grid.length;
  const m = grid[0].length;

  // 8 directions
  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // Create adjacency list: nodeId -> [[neighborId, weight], ...]
  const adj = new Map();

  // Helper to convert (row, col) to node id
  const getNodeId = (row, col) => row * m + col;

  // Build the graph
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      // Only create node if cell is open (0)
      if (grid[r][c] === 0) {
        const nodeId = getNodeId(r, c);
        adj.set(nodeId, []);

        // Add edges to all valid neighbors
        for (const [dr, dc] of dirs) {
          const nr = r + dr;
          const nc = c + dc;

          // Check bounds and if neighbor is open
          if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === 0) {
            const neighborId = getNodeId(nr, nc);
            // Weight is always 1 for this problem
            adj.get(nodeId).push([neighborId, 1]);
          }
        }
      }
    }
  }

  return { adj, getNodeId, n, m };
}

function shortestPathBinaryMatrixAdjList(grid) {
  const n = grid.length;
  const m = grid[0].length;

  // Quick checks
  if (grid[0][0] === 1 || grid[n - 1][m - 1] === 1) return -1;
  if (n === 1 && m === 1) return 1;

  // Create graph from matrix
  const { adj, getNodeId } = createGraphFromMatrix(grid);

  const start = getNodeId(0, 0);
  const target = getNodeId(n - 1, m - 1);

  // If start or target not in graph (shouldn't happen with our checks)
  if (!adj.has(start) || !adj.has(target)) return -1;

  // Dijkstra's algorithm
  const dist = new Map();
  const pq = new MinHeap();

  // Initialize distances
  for (const nodeId of adj.keys()) {
    dist.set(nodeId, Infinity);
  }
  dist.set(start, 1);
  pq.insert([1, start]); // [distance, nodeId]

  while (!pq.isEmpty()) {
    const [currentDist, nodeId] = pq.extractMin();

    // If we found a better distance already, skip
    if (currentDist > dist.get(nodeId)) continue;

    // If we reached target, return distance
    if (nodeId === target) {
      return currentDist;
    }

    // Relax all edges
    if (adj.has(nodeId)) {
      for (const [neighborId, weight] of adj.get(nodeId)) {
        const newDist = currentDist + weight;

        // If neighbor not in dist (shouldn't happen) or found shorter path
        if (!dist.has(neighborId) || newDist < dist.get(neighborId)) {
          dist.set(neighborId, newDist);
          pq.insert([newDist, neighborId]);
        }
      }
    }
  }

  return -1; // No path found
}

/* 2. More Memory-Efficient Version (Build edges on-the-fly) */

function shortestPathBinaryMatrixAdjListEfficient(grid) {
  const n = grid.length;
  const m = grid[0].length;

  if (grid[0][0] === 1 || grid[n - 1][m - 1] === 1) return -1;
  if (n === 1 && m === 1) return 1;

  const dirs = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  // Convert (row, col) to node id
  const getNodeId = (row, col) => row * m + col;
  const getRowCol = (nodeId) => [Math.floor(nodeId / m), nodeId % m];

  const start = getNodeId(0, 0);
  const target = getNodeId(n - 1, m - 1);

  // Dijkstra's algorithm
  const dist = new Map();
  const pq = new MinHeap();

  // We'll store distances for visited nodes only
  dist.set(start, 1);
  pq.insert([1, start]);

  while (!pq.isEmpty()) {
    const [currentDist, nodeId] = pq.extractMin();

    // Skip if we found a better distance
    if (currentDist > (dist.get(nodeId) || Infinity)) continue;

    // If we reached target
    if (nodeId === target) {
      return currentDist;
    }

    // Get current position
    const [r, c] = getRowCol(nodeId);

    // Generate neighbors on-the-fly
    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      // Check bounds and if cell is open
      if (nr < 0 || nr >= n || nc < 0 || nc >= m || grid[nr][nc] === 1) {
        continue;
      }

      const neighborId = getNodeId(nr, nc);
      const newDist = currentDist + 1; // Weight is always 1

      // If we found a shorter path to neighbor
      const currentBest = dist.get(neighborId) || Infinity;
      if (newDist < currentBest) {
        dist.set(neighborId, newDist);
        pq.insert([newDist, neighborId]);
      }
    }
  }

  return -1;
}
