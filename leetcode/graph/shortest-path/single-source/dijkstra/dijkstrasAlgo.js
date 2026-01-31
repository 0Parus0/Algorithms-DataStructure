/*
Dijkstra Algorithm
Difficulty: MediumAccuracy: 50.83%Submissions: 255K+Points: 4Average Time: 25m
Given an undirected, weighted graph with V vertices numbered from 0 to V-1 and E edges, represented by 2d array edges[][], where edges[i]=[u, v, w] represents the edge between the nodes u and v having w edge weight.
You have to find the shortest distance of all the vertices from the source vertex src, and return an array of integers where the ith element denotes the shortest distance between ith node and source vertex src.

Note: The Graph is connected and doesn't contain any negative weight edge.

Examples:

Input: V = 3, edges[][] = [[0, 1, 1], [1, 2, 3], [0, 2, 6]], src = 2
Output: [4, 3, 0]
Explanation:

Shortest Paths:
For 2 to 0 minimum distance will be 4. By following path 2 -> 1 -> 0
For 2 to 1 minimum distance will be 3. By following path 2 -> 1
For 2 to 2 minimum distance will be 0. By following path 2 -> 2
Input: V = 5, edges[][] = [[0, 1, 4], [0, 2, 8], [1, 4, 6], [2, 3, 2], [3, 4, 10]], src = 0
Output: [0, 4, 8, 10, 10]
Explanation: 

Shortest Paths: 
For 0 to 1 minimum distance will be 4. By following path 0 -> 1
For 0 to 2 minimum distance will be 8. By following path 0 -> 2
For 0 to 3 minimum distance will be 10. By following path 0 -> 2 -> 3 
For 0 to 4 minimum distance will be 10. By following path 0 -> 1 -> 4
Constraints:
1 ≤ V ≤ 105
1 ≤ E = edges.size() ≤ 105
0 ≤ edges[i][j] ≤ 104
0 ≤ src < V
*/

class MinHeap {
  constructor(arr = []) {
    this.heap = Array.isArray(arr) ? arr.slice() : [];
    if (this.heap.length) {
      this.buildHeap();
    }
  }

  buildHeap() {
    const n = this.heap.length;
    const firstNonLeaf = Math.floor(n / 2) - 1;
    for (let i = firstNonLeaf; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (!this.heap.length) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  heapifyUp(i) {
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.heap[i][0] < this.heap[parent][0]) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      } else break;
    }
  }

  heapifyDown(i) {
    const n = this.heap.length;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < n && this.heap[left][0] < this.heap[smallest][0])
        smallest = left;
      if (right < n && this.heap[right][0] < this.heap[smallest][0])
        smallest = right;

      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}
function dijkstra(v, edges, src) {
  // Step 1: create adjacency list
  const adj = Array.from({ length: v }, () => []);

  for (let [u, v, wt] of edges) {
    adj[u].push([v, wt]);
    adj[v].push([u, wt]);
  }

  // Step 2: Initialize distances
  const dist = new Array(v).fill(Number.MAX_SAFE_INTEGER);
  dist[src] = 0;

  // Step 3: Min-heap (priority queue) - [distance, vertex]
  const minHeap = new MinHeap();
  minHeap.insert([0, src]);

  // Step 4: process vertices
  while (!minHeap.isEmpty()) {
    const [currentDist, node] = minHeap.extractMin();

    // If we found a better path already, skip processing
    if (currentDist > dist[node]) {
      continue;
    }

    // Relax all edges from current node
    for (let [neighbor, weight] of adj[node]) {
      const newDist = currentDist + weight;

      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        minHeap.insert([newDist, neighbor]);
      }
    }
  }
  return dist;
}

/*
  | Aspect               | Complexity           | Reason                                              |
  | -------------------- | -------------------- | --------------------------------------------------- |
  | **Time Complexity**  | **O((V + E) log V)** | Each extractMin and insert on heap costs `O(log V)` |
  | **Space Complexity** | **O(V + E)**         | Adjacency list + distance array + heap storage      |
  ✅ Summary

    Time: O((V + E) log V)

    Space: O(V + E)

    Works efficiently for sparse graphs (where E ≈ V)

    For dense graphs (E ≈ V²), complexity approaches O(V² log V)
*/

function dijkstraArray(v, edges, src) {
  // Build adjacency list
  const adj = Array.from({ length: v }, () => []);
  for (let [u, v, wt] of edges) {
    adj[u].push([v, wt]);
    adj[v].push([u, wt]); // Remove if directed graph
  }

  const explored = new Array(v).fill(false);
  const dist = new Array(v).fill(Infinity); // Using Infinity is cleaner
  dist[src] = 0;

  for (let count = 0; count < v; count++) {
    // Find unvisited node with minimum distance
    let minNode = -1;
    let minDist = Infinity;

    for (let i = 0; i < v; i++) {
      if (!explored[i] && dist[i] < minDist) {
        minNode = i;
        minDist = dist[i];
      }
    }

    // If no reachable nodes left, break early
    if (minNode === -1) break;

    explored[minNode] = true;

    // Relax edges
    for (let [neighbor, weight] of adj[minNode]) {
      if (!explored[neighbor]) {
        const newDist = dist[minNode] + weight;
        if (newDist < dist[neighbor]) {
          dist[neighbor] = newDist;
        }
      }
    }
  }

  return dist;
}

// With visited array - REDUNDANT
function dijkstraWithVisited(V, edges, src) {
  const adj = Array.from({ length: V }, () => []);
  for (let [u, v, wt] of edges) {
    adj[u].push([v, wt]);
    adj[v].push([u, wt]);
  }

  const dist = new Array(V).fill(Number.MAX_SAFE_INTEGER);
  const visited = new Array(V).fill(false); // ← Added visited array
  dist[src] = 0;

  const minHeap = new MinHeap();
  minHeap.insert([0, src]);

  while (!minHeap.isEmpty()) {
    const [currentDist, node] = minHeap.extractMin();

    if (visited[node]) continue; // ← Check visited
    visited[node] = true; // ← Mark visited

    // The distance check becomes redundant now!
    // if (currentDist > dist[node]) continue;

    for (let [neighbor, weight] of adj[node]) {
      if (!visited[neighbor]) {
        // ← Extra check
        const newDist = currentDist + weight;
        if (newDist < dist[neighbor]) {
          dist[neighbor] = newDist;
          minHeap.insert([newDist, neighbor]);
        }
      }
    }
  }
  return dist;
}

/*
Time & Space Complexity:

    Time Complexity: O((V + E) log V)

    Space Complexity: O(V + E)

Comparison with Array Approach:
Aspect      Heap Approach	                Array Approach
Time	        O((V + E) log V)	          O(V² + E)
Space	        O(V + E)	                    O(V + E)
Best for	  Large graphs (V > 1000)	       Small graphs
Implementation	More complex	Simpler
*/

// Example 1
const V1 = 3;
const edges1 = [
  [0, 1, 1],
  [1, 2, 3],
  [0, 2, 6],
];
const src1 = 2;
console.log(dijkstra(V1, edges1, src1));
// Output: [4, 3, 0]

// Example 2
const V2 = 5;
const edges2 = [
  [0, 1, 4],
  [0, 2, 8],
  [1, 4, 6],
  [2, 3, 2],
  [3, 4, 10],
];
const src2 = 0;
console.log(dijkstra(V2, edges2, src2));
// Output: [0, 4, 8, 10, 10]
