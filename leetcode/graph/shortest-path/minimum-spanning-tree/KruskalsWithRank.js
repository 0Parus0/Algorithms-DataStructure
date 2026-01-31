class MinHeap {
  constructor(items = []) {
    this.heap = [];
    if (items.length > 0) {
      this.buildHeap(items);
    }
  }

  buildHeap(items) {
    this.heap = [...items];
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
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

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp(index) {
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent][2] <= this.heap[index][2]) break;
      [this.heap[index], this.heap[parent]] = [
        this.heap[parent],
        this.heap[index],
      ];
      index = parent;
    }
  }

  heapifyDown(index) {
    let length = this.heap.length;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < length && this.heap[left][2] < this.heap[smallest][2])
        smallest = left;
      if (right < length && this.heap[right][2] < this.heap[smallest][2])
        smallest = right;

      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }
}

function kruskalWithBulkHeap(V, E, edges) {
  // Build heap with all edges at once - O(E);
  const minHeap = new MinHeap(edges);

  const parent = new Array(V);
  const rank = new Array(V).fill(0);
  for (let i = 0; i < V; i++) parent[i] = i;

  const mstEdges = [];
  let mstWeight = 0;
  let edgesUsed = 0;

  while (!minHeap.isEmpty() && edgesUsed < V - 1) {
    const [u, v, weight] = minHeap.extractMin();

    if (union(u, v, parent, rank)) {
      mstEdges.push([u, v, weight]);
      mstWeight += weight;
      edgesUsed++;
    }
  }

  return { mstWeight, mstEdges };
}

// Union-Find functions
function find(x, parent) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x], parent);
  }
  return parent[x];
}

function union(x, y, parent, rank) {
  const rootX = find(x, parent);
  const rootY = find(y, parent);

  if (rootX === rootY) return false;

  if (rank[rootX] < rank[rootY]) {
    parent[rootX] = rootY;
  } else if (rank[rootX] > rank[rootY]) {
    parent[rootY] = rootX;
  } else {
    parent[rootY] = rootX;
    rank[rootX]++;
  }
  return true;
}

function kruskalOptimal(V, E, edges) {
  // Sort edges by weight once - O(E log E)
  edges.sort((a, b) => a[2] - b[2]);

  // Initialize Union - Find
  const parent = new Array(V);
  const rank = new Array(V).fill(0);

  for (let i = 0; i < V; i++) parent[i] = i;

  const mstEdges = [];
  let mstWeight = 0;
  let edgesUsed = 0;

  // Process edges in sorted order - O(E @(V))
  for (const [u, v, weight] of edges) {
    if (edgesUsed === V - 1) break;

    if (union(u, v, parent, rank)) {
      mstEdges.push([u, v, weight]);
      mstWeight += weight;
      edgesUsed++;
    }
  }

  return { mstWeight, mstEdges };
}

const V = 4,
  E = 5;
const edges = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4],
];

console.time("Kruskal with Sorting");
const result1 = kruskalOptimal(V, E, edges);
console.timeEnd("Kruskal with Sorting");

console.time("Kruskal with Bulk Heap");
const result2 = kruskalWithBulkHeap(V, E, edges);
console.timeEnd("Kruskal with Bulk Heap");

console.log("MST Weight:", result1.mstWeight); // 19
console.log("MST Weight:", result2.mstWeight); // 19
