class MinHeap {
  constructor(arr = []) {
    this.heap = arr;
    this.buildMaxHeap();
  }

  buildMaxHeap() {
    for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
      this.maxHeapify(i);
    }
  }

  maxHeapify(i) {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let largest = i;

    if (left < this.heap.length && this.heap[left] < this.heap[largest]) {
      largest = left;
    }
    if (right < this.heap.length && this.heap[right] < this.heap[largest]) {
      largest = right;
    }

    if (largest !== i) {
      [this.heap[i], this.heap[largest]] = [this.heap[largest], this.heap[i]];
      this.maxHeapify(largest);
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null; // 👈 heap empty
    if (this.heap.length === 1) return this.heap.pop();

    let root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.maxHeapify(0);
    return root;
  }

  heapifyUp(index) {
    if (index === 0) return;

    let parent = Math.floor((index - 1) / 2);

    if (this.heap[parent] > this.heap[index]) {
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      this.heapifyUp(parent);
    }
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  // Build heap from array in O(n) time
  buildHeap(array) {
    this.heap = [...array];
    const firstNonLeafIndex = Math.floor((this.heap.length - 2) / 2);

    for (let i = firstNonLeafIndex; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
  size() {
    return this.heap.length;
  }
}
/****************************************** */
class MinHeap {
  constructor() {
    this.heap = [];
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }
  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  leftChild(parentIndex) {
    return this.heap[this.getLeftChildIndex(parentIndex)];
  }

  rightChild(parentIndex) {
    return this.heap[this.getRightChildIndex(parentIndex)];
  }

  parent(childIndex) {
    return this.heap[this.getParentIndex(childIndex)];
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  peek() {
    return this.heap.length === 0 ? null : this.heap[0];
  }

  buildHeap(array) {
    let firstNonLeafIndex = Math.floor((this.heap.length - 2) / 2);

    for (let i = firstNonLeafIndex; i >= 0; i--) {
      this.heapifyDown();
    }
  }

  heapifyDown(startIndex = 0) {
    let index = startIndex;

    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);

      if (
        this.hasRightChild(index) &&
        this.rightChild(index) < this.leftChild(index)
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] <= this.heap[smallerChildIndex]) break;

      this.swap(index, smallerChildIndex);
      index = smallerChildIndex;
    }
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (this.hasParent(index) && this.parent(index) > this.heap[index]) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  // Optional: Convert heap to sorted array (destructive);

  sort() {
    const sorted = [];
    while (!this.isEmpty()) {
      sorted.push(this.extractMin());
    }
    return sorted;
  }
}

// Min Heap Example
const minHeap = new MinHeap();
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(15);
minHeap.insert(2);
minHeap.insert(7);

console.log("Min Heap:", minHeap.heap); // [2, 5, 15, 10, 7]
console.log("Extract Min:", minHeap.extractMin()); // 2
console.log("After extraction:", minHeap.heap); // [5, 7, 15, 10]

/*
Time Complexity
Operation	            Time Complexity
Insertion	              O(log n)
Deletion	              O(log n)
Peek	                  O(1)
Build Heap from array	  O(n)
*/
