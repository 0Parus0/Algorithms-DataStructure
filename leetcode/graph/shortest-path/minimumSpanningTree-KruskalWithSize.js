// Optimal kruskal with edges sorting
function kruskalWithSizeSort(V, E, edges) {
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);

  // Initialize Union - Find with size
  const parent = new Array(V);
  const size = new Array(V).fill(1); // Each component starts with size 1

  for (let i = 0; i < V; i++) parent[i] = i;

  const mstEdges = [];
  let mstWeight = 0;
  let edgesUsed = 0;

  for (let [u, v, weight] of edges) {
    if (edgesUsed === V - 1) break;

    if (unionBySize(u, v, parent, size)) {
      mstEdges.push([u, v, weight]);
      mstWeight += weight;
      edgesUsed++;
    }
  }

  return { mstEdges, mstWeight };
}

function find(x, parent) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x], parent);
  }
  return parent[x];
}

function unionBySize(x, y, parent, size) {
  const rootX = find(x, parent);
  const rootY = find(y, parent);

  if (rootX === rootY) return false; //Same component

  // Union by size: attach smaller tree to larger tree
  if (size[rootX] < size[rootY]) {
    parent[rootX] = rootY;
    size[rootY] += size[rootX];
  } else {
    parent[rootY] = rootX;
    size[rootX] += size[rootY];
  }
  return true;
}

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

function kruskalWithSizeHeap(V, E, edges) {
  // Build heap with all edges at once - O(E);
  const minHeap = new MinHeap(edges);

  const parent = new Array(V);
  const size = new Array(V).fill(1);
  for (let i = 0; i < V; i++) parent[i] = i;

  const mstEdges = [];
  let mstWeight = 0;
  let edgesUsed = 0;

  while (!minHeap.isEmpty() && edgesUsed < V - 1) {
    const [u, v, weight] = minHeap.extractMin();
    if (unionBySize(u, v, parent, size)) {
      mstEdges.push([u, v, weight]);
      mstWeight += weight;
      edgesUsed++;
    }
  }
  return { mstWeight, mstEdges };
}
/*
⚡ Complexity

Sorting version:

Sorting edges: O(E log E)

Union-Find: almost O(E α(V)) (inverse Ackermann, basically constant).

Overall: O(E log E)

Heap version:

Build heap: O(E)

Extract min E times: O(E log E)

Union-Find: O(E α(V))

Overall: O(E log E)

Sorting is usually faster in practice (optimized Timsort in JS) unless you’re streaming edges.*/

const V = 4,
  E = 5;
const edges = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4],
];

console.time("Kruskal with Heap + Size");
const result1 = kruskalWithSizeHeap(V, E, edges);
console.timeEnd("Kruskal with Heap + Size");

console.time("Kruskal with Sort + Size");
const result2 = kruskalWithSizeSort(V, E, edges);
console.timeEnd("Kruskal with Sort + Size");

console.log("MST Weight (Heap):", result1.mstWeight); // 19
console.log("MST Weight (Sort):", result2.mstWeight); // 19
console.log("MST Edges (Heap):", result1.mstEdges);
console.log("MST Edges (Sort):", result2.mstEdges);
