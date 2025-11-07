// ---------- MinHeap ----------
class MinHeap {
  constructor() {
    this.heap = [];
  }

  buildHeap(arr) {
    this.heap = arr.slice();
    for (let i = Math.floor((this.heap.length - 2) / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return root;
  }

  heapifyUp(i) {
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.getKey(this.heap[parent]) > this.getKey(this.heap[i])) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      } else break;
    }
  }

  heapifyDown(i) {
    let n = this.heap.length;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (
        left < n &&
        this.getKey(this.heap[left]) < this.getKey(this.heap[smallest])
      )
        smallest = left;
      if (
        right < n &&
        this.getKey(this.heap[right]) < this.getKey(this.heap[smallest])
      )
        smallest = right;

      if (smallest !== i) {
        [this.heap[i], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[i],
        ];
        i = smallest;
      } else break;
    }
  }

  getKey(val) {
    return Array.isArray(val) ? val[0] : val;
  }

  peek() {
    return this.heap[0];
  }

  // ---------- Traversals ----------
  preOrder(i = 0, res = []) {
    if (i >= this.heap.length) return res;
    res.push(this.heap[i]);
    this.preOrder(2 * i + 1, res);
    this.preOrder(2 * i + 2, res);
    return res;
  }

  inOrder(i = 0, res = []) {
    if (i >= this.heap.length) return res;
    this.inOrder(2 * i + 1, res);
    res.push(this.heap[i]);
    this.inOrder(2 * i + 2, res);
    return res;
  }

  postOrder(i = 0, res = []) {
    if (i >= this.heap.length) return res;
    this.postOrder(2 * i + 1, res);
    this.postOrder(2 * i + 2, res);
    res.push(this.heap[i]);
    return res;
  }

  levelOrder() {
    return [...this.heap];
  }

  // ---------- Heap Sort ----------
  heapSort() {
    const temp = new MinHeap();
    temp.buildHeap([...this.heap]);
    const sorted = [];
    while (temp.heap.length) sorted.push(temp.extractMin());
    return sorted;
  }
}

// ---------- MaxHeap (mirror of MinHeap) ----------
class MaxHeap extends MinHeap {
  heapifyUp(i) {
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.getKey(this.heap[parent]) < this.getKey(this.heap[i])) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      } else break;
    }
  }

  heapifyDown(i) {
    let n = this.heap.length;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let largest = i;

      if (
        left < n &&
        this.getKey(this.heap[left]) > this.getKey(this.heap[largest])
      )
        largest = left;
      if (
        right < n &&
        this.getKey(this.heap[right]) > this.getKey(this.heap[largest])
      )
        largest = right;

      if (largest !== i) {
        [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
        i = largest;
      } else break;
    }
  }

  extractMax() {
    return super.extractMin(); // reuse logic, just reversed comparison
  }

  heapSort() {
    const temp = new MaxHeap();
    temp.buildHeap([...this.heap]);
    const sorted = [];
    while (temp.heap.length) sorted.push(temp.extractMin());
    return sorted.reverse(); // descending
  }
}

// ---------- Example Run ----------
const input = [3, 1, 5, 4, 2, 6];

const minHeap = new MinHeap();
minHeap.buildHeap(input);
console.log("Min-Heap:", minHeap.heap);
console.log("Pre-Order:", minHeap.preOrder());
console.log("In-Order:", minHeap.inOrder());
console.log("Post-Order:", minHeap.postOrder());
console.log("Level-Order:", minHeap.levelOrder());
console.log("Heap Sort (ascending):", minHeap.heapSort());

const maxHeap = new MaxHeap();
maxHeap.buildHeap(input);
console.log("\nMax-Heap:", maxHeap.heap);
console.log("Pre-Order:", maxHeap.preOrder());
console.log("In-Order:", maxHeap.inOrder());
console.log("Post-Order:", maxHeap.postOrder());
console.log("Level-Order:", maxHeap.levelOrder());
console.log("Heap Sort (descending):", maxHeap.heapSort());

/************************************/
class BinaryHeap {
  constructor(heapType = "min", compareKey = 0) {
    this.heap = [];
    this.heapType = heapType; // 'min' or 'max'
    this.compareKey = compareKey; // For array elements, which key to compare
  }

  // Core heap operations (based on your implementation)
  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  extract() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return root;
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  // Enhanced comparison logic
  shouldSwap(child, parent) {
    const childVal = Array.isArray(this.heap[child])
      ? this.heap[child][this.compareKey]
      : this.heap[child];
    const parentVal = Array.isArray(this.heap[parent])
      ? this.heap[parent][this.compareKey]
      : this.heap[parent];

    if (this.heapType === "min") {
      return childVal < parentVal;
    } else {
      return childVal > parentVal;
    }
  }

  heapifyUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.shouldSwap(i, parent)) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      } else {
        break;
      }
    }
  }

  heapifyDown(i) {
    const n = this.heap.length;
    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let extreme = i; // smallest for min-heap, largest for max-heap

      if (left < n && this.shouldSwap(left, extreme)) {
        extreme = left;
      }
      if (right < n && this.shouldSwap(right, extreme)) {
        extreme = right;
      }

      if (extreme !== i) {
        [this.heap[extreme], this.heap[i]] = [this.heap[i], this.heap[extreme]];
        i = extreme;
      } else {
        break;
      }
    }
  }

  // Tree traversal methods
  preOrder(index = 0, result = []) {
    if (index >= this.heap.length) return result;

    result.push(this.heap[index]); // Root
    this.preOrder(2 * index + 1, result); // Left
    this.preOrder(2 * index + 2, result); // Right

    return result;
  }

  inOrder(index = 0, result = []) {
    if (index >= this.heap.length) return result;

    this.inOrder(2 * index + 1, result); // Left
    result.push(this.heap[index]); // Root
    this.inOrder(2 * index + 2, result); // Right

    return result;
  }

  postOrder(index = 0, result = []) {
    if (index >= this.heap.length) return result;

    this.postOrder(2 * index + 1, result); // Left
    this.postOrder(2 * index + 2, result); // Right
    result.push(this.heap[index]); // Root

    return result;
  }

  levelOrder() {
    const result = [];
    if (this.heap.length === 0) return result;

    for (let i = 0; i < this.heap.length; i++) {
      result.push(this.heap[i]);
    }
    return result;
  }

  // Heap visualization
  printHeap() {
    console.log(`\n${this.heapType.toUpperCase()} HEAP:`, this.heap);
    console.log("Level Order:", this.levelOrder());
    console.log("Pre Order:", this.preOrder());
    console.log("In Order:", this.inOrder());
    console.log("Post Order:", this.postOrder());
  }

  // Convert to array (for heap sort)
  toArray() {
    return [...this.heap];
  }
}

// Heap Sort Implementation
class HeapSort {
  static sort(arr, order = "ascending", compareKey = 0) {
    const heapType = order === "ascending" ? "min" : "max";
    const heap = new BinaryHeap(heapType, compareKey);
    const sorted = [];

    // Build heap
    arr.forEach((item) => heap.insert(item));

    // Extract elements in sorted order
    while (!heap.isEmpty()) {
      sorted.push(heap.extract());
    }

    return sorted;
  }

  // In-place heap sort (more memory efficient)
  static sortInPlace(arr, order = "ascending") {
    const n = arr.length;
    const compare = order === "ascending" ? (a, b) => a < b : (a, b) => a > b;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      HeapSort.heapify(arr, n, i, compare);
    }

    // Extract elements from heap
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      HeapSort.heapify(arr, i, 0, compare);
    }

    return arr;
  }

  static heapify(arr, n, i, compare) {
    let extreme = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && compare(arr[left], arr[extreme])) {
      extreme = left;
    }

    if (right < n && compare(arr[right], arr[extreme])) {
      extreme = right;
    }

    if (extreme !== i) {
      [arr[i], arr[extreme]] = [arr[extreme], arr[i]];
      HeapSort.heapify(arr, n, extreme, compare);
    }
  }
}

// Comprehensive Test Suite
class HeapTestRunner {
  static runAllTests() {
    console.log("=== BINARY HEAP COMPREHENSIVE TESTS ===\n");

    this.testBasicOperations();
    this.testArrayElements();
    this.testTraversals();
    this.testHeapSort();
    this.testEdgeCases();
    this.testPerformance();
  }

  static testBasicOperations() {
    console.log("1. BASIC HEAP OPERATIONS:");

    // Min Heap
    const minHeap = new BinaryHeap("min");
    [10, 5, 15, 2, 8, 12, 20].forEach((val) => minHeap.insert(val));

    console.log("Min Heap after inserts:", minHeap.heap);
    console.log("Extract min:", minHeap.extract());
    console.log("After extraction:", minHeap.heap);
    console.log("Peek:", minHeap.peek());
    console.log("Size:", minHeap.size());

    // Max Heap
    const maxHeap = new BinaryHeap("max");
    [10, 5, 15, 2, 8, 12, 20].forEach((val) => maxHeap.insert(val));

    console.log("Max Heap after inserts:", maxHeap.heap);
    console.log("Extract max:", maxHeap.extract());
    console.log("After extraction:", maxHeap.heap);
    console.log("");
  }

  static testArrayElements() {
    console.log("2. ARRAY ELEMENTS (Priority Queue Simulation):");

    const priorityQueue = new BinaryHeap("min", 0); // Compare first element
    const tasks = [
      [3, "Low priority task"],
      [1, "High priority task"],
      [2, "Medium priority task"],
      [1, "Another high priority"],
      [4, "Very low priority"],
    ];

    tasks.forEach((task) => priorityQueue.insert(task));
    console.log("Priority Queue:", priorityQueue.heap);

    console.log("Processing tasks by priority:");
    while (!priorityQueue.isEmpty()) {
      console.log("  Processing:", priorityQueue.extract());
    }
    console.log("");
  }

  static testTraversals() {
    console.log("3. TREE TRAVERSALS:");

    const heap = new BinaryHeap("min");
    [10, 5, 15, 2, 7, 12, 20].forEach((val) => heap.insert(val));

    heap.printHeap();
    console.log("");
  }

  static testHeapSort() {
    console.log("4. HEAP SORT:");

    const testArray = [64, 34, 25, 12, 22, 11, 90, 5, 77];
    console.log("Original array:", testArray);

    console.log(
      "Ascending order (min-heap):",
      HeapSort.sort(testArray, "ascending")
    );
    console.log(
      "Descending order (max-heap):",
      HeapSort.sort(testArray, "descending")
    );

    // In-place sort
    const arrayCopy = [...testArray];
    console.log(
      "In-place ascending:",
      HeapSort.sortInPlace(arrayCopy, "ascending")
    );

    console.log("");
  }

  static testEdgeCases() {
    console.log("5. EDGE CASES:");

    // Empty heap
    const emptyHeap = new BinaryHeap("min");
    console.log("Empty heap size:", emptyHeap.size());
    console.log("Empty heap extract:", emptyHeap.extract());
    console.log("Empty heap peek:", emptyHeap.peek());

    // Single element
    const singleHeap = new BinaryHeap("min");
    singleHeap.insert(42);
    console.log("Single element extract:", singleHeap.extract());
    console.log("After single extraction size:", singleHeap.size());

    // Duplicate values
    const duplicateHeap = new BinaryHeap("min");
    [5, 5, 3, 3, 8, 8].forEach((val) => duplicateHeap.insert(val));
    console.log("Duplicates heap:", duplicateHeap.heap);

    console.log("");
  }

  static testPerformance() {
    console.log("6. PERFORMANCE ANALYSIS:");

    const sizes = [100, 1000, 5000];
    sizes.forEach((size) => {
      const randomArray = Array.from({ length: size }, () =>
        Math.floor(Math.random() * 10000)
      );

      console.log(`\nArray size: ${size}`);

      // Heap sort performance
      const start = performance.now();
      HeapSort.sort(randomArray, "ascending");
      const end = performance.now();

      console.log(`Heap sort time: ${(end - start).toFixed(2)}ms`);

      // In-place sort performance
      const arrayCopy = [...randomArray];
      const startInPlace = performance.now();
      HeapSort.sortInPlace(arrayCopy, "ascending");
      const endInPlace = performance.now();

      console.log(
        `In-place sort time: ${(endInPlace - startInPlace).toFixed(2)}ms`
      );
    });
  }
}

// Usage Examples
class HeapExamples {
  static demonstrate() {
    console.log("=== PRACTICAL USAGE EXAMPLES ===\n");

    // Example 1: Priority Queue
    console.log("1. PRIORITY QUEUE:");
    const pq = new BinaryHeap("min", 0);
    pq.insert([2, "Task B"]);
    pq.insert([1, "Task A"]);
    pq.insert([3, "Task C"]);

    while (!pq.isEmpty()) {
      console.log("  Processing:", pq.extract());
    }

    // Example 2: Kth Largest Element
    console.log("\n2. FIND KTH LARGEST:");
    const findKthLargest = (nums, k) => {
      const heap = new BinaryHeap("min");
      for (let num of nums) {
        heap.insert(num);
        if (heap.size() > k) {
          heap.extract();
        }
      }
      return heap.peek();
    };

    const numbers = [3, 2, 1, 5, 6, 4];
    console.log("3rd largest in [3,2,1,5,6,4]:", findKthLargest(numbers, 3));

    // Example 3: Merge Sorted Arrays
    console.log("\n3. MERGE K SORTED ARRAYS:");
    const mergeSortedArrays = (arrays) => {
      const heap = new BinaryHeap("min", 0);
      const result = [];

      // Insert first element of each array
      arrays.forEach((array, index) => {
        if (array.length > 0) {
          heap.insert([array[0], index, 0]);
        }
      });

      while (!heap.isEmpty()) {
        const [val, arrayIndex, elementIndex] = heap.extract();
        result.push(val);

        if (elementIndex + 1 < arrays[arrayIndex].length) {
          heap.insert([
            arrays[arrayIndex][elementIndex + 1],
            arrayIndex,
            elementIndex + 1,
          ]);
        }
      }

      return result;
    };

    const arrays = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ];
    console.log("Merged arrays:", mergeSortedArrays(arrays));
  }
}

// Run everything
HeapTestRunner.runAllTests();
HeapExamples.demonstrate();

// Export for use in other modules
export { BinaryHeap, HeapSort, HeapTestRunner, HeapExamples };
