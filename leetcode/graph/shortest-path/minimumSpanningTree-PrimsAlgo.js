/*
Minimum Spanning Tree
Difficulty: MediumAccuracy: 47.82%Submissions: 183K+Points: 4Average Time: 25m
Given a weighted, undirected, and connected graph with V vertices and E edges, your task is to find the sum of the weights of the edges in the Minimum Spanning Tree (MST) of the graph. The graph is provided as a list of edges, where each edge is represented as [u, v, w], indicating an edge between vertex u and vertex v with edge weight w.

Input: V = 3, E = 3, Edges = [[0, 1, 5], [1, 2, 3], [0, 2, 1]]
 
Output: 4
Explanation:

The Spanning Tree resulting in a weight
of 4 is shown above.
Input: V = 2, E = 1, Edges = [[0 1 5]]

 

Output: 5 
Explanation: Only one Spanning Tree is possible which has a weight of 5.
Constraints:
2 ≤ V ≤ 1000
V-1 ≤ E ≤ (V*(V-1))/2
1 ≤ w ≤ 1000
The graph is connected and doesn't contain self-loops & multiple edges.
*/
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp(index) {
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent][0] <= this.heap[index][0]) break;
      [this.heap[index], this.heap[parent]] = [
        this.heap[parent],
        this.heap[index],
      ];
      index = parent;
    }
  }

  heapifyDown(index) {
    const length = this.heap.length;
    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < length &&
        this.heap[leftChild][0] < this.heap[smallest][0]
      )
        smallest = leftChild;
      if (
        rightChild < length &&
        this.heap[rightChild][0] < this.heap[smallest][0]
      )
        smallest = rightChild;

      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

function spanningTree(V, E, edges) {
  // Build adjacency list
  const adj = Array.from({ length: V }, () => []);
  for (let [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }

  // Prim's Algorithm
  const visited = new Array(V).fill(false);
  const minHeap = new MinHeap();

  // Start from vertex 0;
  minHeap.insert([0, 0]); // [weight, vertex];
  let mstWeight = 0; // Track the total weight/cost of the mst

  while (!minHeap.isEmpty()) {
    const [weight, node] = minHeap.extractMin();

    if (visited[node]) continue;
    visited[node] = true;
    mstWeight += weight;

    // Add all adjacent edges
    for (let [neighbor, edgeWeight] of adj[node]) {
      if (!visited[neighbor]) {
        minHeap.insert([edgeWeight, neighbor]);
      }
    }
  }
  return mstWeight;
}

//  To build the minimum spanning tree with Prim's Algorithm
function spanningTreeWithParent(V, E, edges) {
  // Build adjacency list
  const adj = Array.from({ length: V }, () => []);
  for (let [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]);
  }

  let visited = new Array(V).fill(false);
  let mstEdges = [];
  let mstWeight = 0;

  const minHeap = new MinHeap();
  minHeap.insert([0, 0, -1]); // [weight, node, parent];

  while (!minHeap.isEmpty()) {
    let [weight, node, parent] = minHeap.extractMin();

    if (visited[node]) continue;
    visited[node] = true;

    if (parent !== -1) {
      mstEdges.push([parent, node, weight]);
      mstWeight += weight;
    }

    for (let [neighbor, weight] of adj[node]) {
      if (!visited[neighbor]) minHeap.insert([weight, neighbor, node]);
    }
  }

  // Verify we have a complete MST (V -1 edges for V vertices)
  if (mstEdges.length !== V - 1) {
    return { mstWeight: -1, mstEdges: [] }; // Graph is disconnected
  }

  return { mstWeight, mstEdges };
}

function primMSTWithArrayLinearSearch(V, edges) {
  // Build adjacency list
  const adj = Array.from({ length: V }, () => []);
  for (let [u, v, w] of edges) {
    adj[u].push([v, w]);
    adj[v].push([u, w]); // undirected
  }

  let key = new Array(V).fill(Number.MAX_SAFE_INTEGER);
  let parent = new Array(V).fill(-1);
  let visited = new Array(V).fill(false);

  key[0] = 0; // start from node 0

  for (let count = 0; count < V - 1; count++) {
    // 1. Pick minimum key vertex not visited
    let u = -1;
    let minVal = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < V; i++) {
      if (!visited[i] && key[i] < minVal) {
        minVal = key[i];
        u = i;
      }
    }

    visited[u] = true;

    // 2. Update neighbors
    for (let [v, w] of adj[u]) {
      if (!visited[v] && w < key[v]) {
        key[v] = w;
        parent[v] = u;
      }
    }
  }

  // Collect MST edges
  let mstEdges = [];
  let mstWeight = 0;
  for (let v = 1; v < V; v++) {
    mstEdges.push([parent[v], v, key[v]]);
    mstWeight += key[v];
  }

  return { mstWeight, mstEdges };
}

/*
🔑 Comparison

Naive Prim’s (with key[] and linear search):

Time: O(V²)

Space: O(V + E)

Heap Prim’s (with [w,node,parent]):

Time: O(E log V)

Space: O(V + E)

👉 For dense graphs (close to V² edges), O(V²) and O(E log V) are similar.
👉 For sparse graphs (like typical competitive problems where E ≈ V), the heap-based O(E log V) is much better.
*/

// Test Case 1
// const V1 = 3,
//   E1 = 3;
// const edges1 = [
//   [0, 1, 5],
//   [1, 2, 3],
//   [0, 2, 1],
// ];
// console.log(spanningTree(V1, E1, edges1)); // Output: 4

// // Test Case 2
// const V2 = 2,
//   E2 = 1;
// const edges2 = [[0, 1, 5]];
// console.log(spanningTree(V2, E2, edges2)); // Output: 5

// // Test Case 3
// const V3 = 4,
//   E3 = 5;
// const edges3 = [
//   [0, 1, 10],
//   [0, 2, 6],
//   [0, 3, 5],
//   [1, 3, 15],
//   [2, 3, 4],
// ];
// console.log(spanningTree(V3, E3, edges3)); // Output: 19

// Test Case 1
const V1 = 3,
  E1 = 3;
const edges1 = [
  [0, 1, 5],
  [1, 2, 3],
  [0, 2, 1],
];
const result1 = spanningTreeWithParent(V1, E1, edges1);
console.log("MST Weight:", result1.mstWeight); // 4
console.log("MST Edges:", result1.mstEdges); // [[0,2,1], [2,1,3]] or similar

// Test Case 2
const V2 = 2,
  E2 = 1;
const edges2 = [[0, 1, 5]];
const result2 = spanningTreeWithParent(V2, E2, edges2);
console.log("MST Weight:", result2.mstWeight); // 5
console.log("MST Edges:", result2.mstEdges); // [[0,1,5]]

// Test Case 3
const V3 = 4,
  E3 = 5;
const edges3 = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4],
];
const result3 = spanningTreeWithParent(V3, E3, edges3);
console.log("MST Weight:", result3.mstWeight); // 19
console.log("MST Edges:", result3.mstEdges);
