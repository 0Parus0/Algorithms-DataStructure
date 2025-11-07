// Max Heap with buildHeap implementation
class MaxHeap {
  constructor(arr = []) {
    this.heap = arr;
    this.buildHeap();
  }

  buildHeap() {
    for (let i = Math.floor(this.heap.length / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  heapifyDown(i) {
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
      this.heapifyDown(largest);
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null; // 👈 heap empty
    if (this.heap.length === 1) return this.heap.pop();

    let root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyUp(0);
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

/***************************** */

class MaxHeap {
  constructor(array = []) {
    this.heap = [];
    if (array.length > 0) {
      this.buildHeap(array);
    }
  }

  // Helper methods
  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }
  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }
  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.heap.length;
  }
  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.heap.length;
  }
  hasParent(index) {
    return this.getParentIndex(index) >= 0;
  }

  leftChild(index) {
    return this.heap[this.getLeftChildIndex(index)];
  }
  rightChild(index) {
    return this.heap[this.getRightChildIndex(index)];
  }
  parent(index) {
    return this.heap[this.getParentIndex(index)];
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

  // Build heap from array
  buildHeap(array) {
    this.heap = [...array];

    const firstNonLeafIndex = Math.floor((this.heap.length - 2) / 2);

    for (let i = firstNonLeafIndex; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  heapifyDown(startIndex = 0) {
    let index = startIndex;

    while (this.hasLeftChild(index)) {
      let largerChildIndex = this.getLeftChildIndex(index);

      if (
        this.hasRightChild(index) &&
        this.rightChild(index) > this.leftChild(index)
      ) {
        largerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] >= this.heap[largerChildIndex]) {
        break;
      }

      this.swap(index, largerChildIndex);
      index = largerChildIndex;
    }
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.heap.length - 1;

    while (this.hasParent(index) && this.parent(index) < this.heap[index]) {
      const parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return max;
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}
// Max Heap Example
const maxHeap = new MaxHeap();
maxHeap.insert(10);
maxHeap.insert(5);
maxHeap.insert(15);
maxHeap.insert(2);
maxHeap.insert(7);

console.log("Max Heap:", maxHeap.heap); // [15, 10, 5, 2, 7]
console.log("Extract Max:", maxHeap.extractMax()); // 15
console.log("After extraction:", maxHeap.heap); // [10, 7, 5, 2]

/*
Time Complexity
Operation	             Time Complexity
Insertion	                O(log n)
Deletion	                O(log n)
Peek	                    O(1)
Build Heap from array	    O(n)
*/
