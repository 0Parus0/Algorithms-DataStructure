class MinHeap {
  constructor(arr = []) {
    this.heap = Array.isArray(arr) ? arr.slice() : [];
    if (this.heap.length) this.buildHeap();
  }

  build() {
    const n = this.heap.length;
    let firstNonLeaf = Math.floor((n - 1) / 2);
    for (let i = firstNonLeaf; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  heapifyUp(index) {
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent][0] > this.heap[index][0]) {
        [this.heap[parent], this.heap[index]] = [
          this.heap[index],
          this.heap[parent],
        ];
        index = parent;
      } else break;
    }
  }

  heapifyDown(index) {
    while (true) {
      let smallest = index;
      let left = index * 2 + 1;
      let right = index * 2 + 2;

      if (
        left < this.heap.length &&
        this.heap[left][0] < this.heap[smallest][0]
      ) {
        smallest = left;
      }

      if (
        right < this.heap.length &&
        this.heap[right][0] < this.heap[smallest][0]
      ) {
        smallest = right;
      }

      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[index],
        ];
        index = smallest;
      } else break;
    }
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}

function dijkstra(V, edges, src) {
  // Step 1. Create adjacency list
  const adj = Array.from({ length: V }, () => []);
  for (let [u, v, wt] of edges) {
    adj[u].push([v, wt]);
    adj[v].push([u, wt]);
  }

  // Step 2. Initialize distances
  const distance = new Array(V).fill(Infinity);
  distance[src] = 0;

  // Step 3. Initialize Priority Queue(min heap) [distance, vertex]
  const pq = new MinHeap();
  pq.insert([0, src]);

  // Step 4. Process all vertices
  while (!pq.isEmpty()) {
    const [d, u] = pq.extractMin();

    // If we have already found a smaller distance skip
    if (d > distance[u]) continue;

    // Relax all edges from current node
    for (let [v, wt] of adj[u]) {
      let newD = d + wt;
      if (newD < distance[v]) {
        distance[v] = newD;
        pq.insert([newD, v]);
      }
    }
  }
  return distance;
}

/*
Implementation with Binary Min-Heap (Most Common)
O((V + E) log V)

Each extractMin(): O(log V)

Each decreaseKey() (or insert): O(log V)

For V vertices: V × O(log V) for extractMin

For E edges: E × O(log V) for decreaseKey/insert

Total: O((V + E) log V)
*/

/**
 * Common Patterns in Dijkstra Problems
    Single source shortest path - Most common pattern

    Multi-constraint optimization - Cost + stops, time + cost, etc.

    Grid problems - Convert 2D grid to graph nodes

    Probability/Maximization problems - Convert to minimization by taking logs/negatives

    0-1 BFS - When weights are only 0 or 1 (use deque instead of heap)
 */

/**
 * Tips for Solving
 
  * Recognize Dijkstra: When you need shortest/minimum/maximum path with non-negative weights

  * Modify heap comparator: Based on what you're optimizing (distance, cost, probability, etc.)

  * Add constraints to state: (distance, node, stops_left) for multiple constraints

  * Use visited sets carefully: In Dijkstra, you can mark as visited when popping from heap, not when pushing

  *  Avoid negative weights: Dijkstra doesn't work with negative weights (use Bellman-Ford instead)
 */
