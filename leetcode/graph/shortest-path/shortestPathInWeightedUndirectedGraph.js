/*
Shortest Path in Weighted undirected graph
Difficulty: MediumAccuracy: 50.0%Submissions: 87K+Points: 4Average Time: 20m
You are given a weighted undirected graph having n vertices numbered from 1 to n and m edges along with their weights. Find the shortest weight path between the vertex 1 and the vertex n,  if there exists a path, and return a list of integers whose first element is the weight of the path, and the rest consist of the nodes on that path. If no path exists, then return a list containing a single element -1.

The input list of edges is as follows - {a, b, w}, denoting there is an edge between a and b, and w is the weight of that edge.

Note: The driver code here will first check if the weight of the path returned is equal to the sum of the weights along the nodes on that path, if equal it will output the weight of the path, else -2. In case the list contains only a single element (-1) it will simply output -1. 

Examples :

Input: n = 5, m= 6, edges = [[1, 2, 2], [2, 5, 5], [2, 3, 4], [1, 4, 1], [4, 3, 3], [3, 5, 1]]
Output: 5
Explanation: Shortest path from 1 to n is by the path 1 4 3 5 whose weight is 5. 
Input: n = 2, m= 1, edges = [[1, 2, 2]]
Output: 2
Explanation: Shortest path from 1 to 2 is by the path 1 2 whose weight is 2. 
Input: n = 2, m= 0, edges = [ ]
Output: -1
Explanation: Since there are no edges, so no answer is possible.
Expected Time Complexity: O(m* log(n))
Expected Space Complexity: O(n+m)

Constraint:
2 <= n <= 106
0 <= m <= 106
1 <= a, b <= n
1 <= w <= 105
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
    let min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  heapifyUp(index) {
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent][0] <= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  heapifyDown(index) {
    let length = this.heap.length;
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

  isEmpty() {
    return this.heap.length === 0;
  }
}

function shortestPath(n, m, edges) {
  // Step 1: Build adjacency list (1-based indexing)
  const adj = Array.from({ length: n }, () => []);

  for (let [u, v, wt] of edges) {
    u--;
    v--; // shift to 0-Index
    adj[u].push([v, wt]);
    adj[v].push([u, wt]);
  }

  // Step 2: Dijkstra's Initialization
  const dist = new Array(n).fill(Number.MAX_SAFE_INTEGER);
  const parent = new Array(n).fill(-1);
  dist[0] = 0;

  const minHeap = new MinHeap();
  minHeap.insert([0, 0]);

  while (!minHeap.isEmpty()) {
    const [d, node] = Minheap.extractMin();
    if (d > dist[node]) continue;

    for (let [neighbor, wt] of adj[node]) {
      if (d + wt < dist[neighbor]) {
        dist[neighbor] = d + wt;
        parent[neighbor] = node;
        minHeap.insert([dist[neighbor], neighbor]);
      }
    }
  }

  // Check if path exists
  if (dist[n - 1] === Number.MAX_SAFE_INTEGER) {
    return [-1];
  }

  // Reconstruct path (still return 1-based node numbers in output)
  const path = [];
  let current = n - 1;
  while (current !== -1) {
    path.push(current + 1); // Convert back to 1-index
    current = parent[current];
  }

  path.reverse();
  return [dist[n - 1], ...path];
}
/*
| Implementation Type                                        | Insert             | ExtractMin | Overall Dijkstra Time                                      |
| ---------------------------------------------------------- | ------------------ | ---------- | ---------------------------------------------------------- |
| ✅ **Proper binary heap** (with `heapifyUp`, `heapifyDown`) | O(log V)           | O(log V)   | **O((V + E) log V)**                                       |
| ⚠️ **Array + sort each time** (`minHeap.sort()`)           | O(log V × E) worst | O(1)       | **O(E log V)** but with big constant factor                |
| 🚫 **Array + linear scan for min**                         | O(1)               | O(V)       | **O(V² + E V)** → simplifies to **O(V²)** for dense graphs |
*/
