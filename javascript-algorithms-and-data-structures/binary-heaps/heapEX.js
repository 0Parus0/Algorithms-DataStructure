class MaxBinaryHeap {
  constructor() {
    this.values = [47, 33, 39, 25, 18];
  }

  insert(element) {
    this.values.push(element);
    this.bubbleUp();
    return this.values;
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    let element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element < parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
    return this.values;
  }

  extractMax() {
    let max = this.values[0];
    let end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
  }

  sinkDown() {
    let idx = 0;
    let element = this.values[0];
    let len = this.values.length;

    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let swapIdx = null;
      let leftChild, rightChild;

      if (leftChildIdx < len) {
        leftChild = this.values[leftChildIdx];
        if (element < leftChild) swapIdx = leftChildIdx;
      }
      if (rightChildIdx < len) {
        rightChild = this.values[rightChildIdx];
        if (
          (!swapIdx && rightChild > element) ||
          (swapIdx && rightChild > leftChild)
        )
          swapIdx = rightChildIdx;
      }

      if (!swapIdx) break;
      this.values[idx] = this.values[swapIdx];
      this.values[swapIdx] = element;
      idx = swapIdx;
    }
  }
}

const maxHeap = new MaxBinaryHeap();
// console.log(maxHeap.values);
maxHeap.insert(38);
// maxHeap.insert(45);
// maxHeap.insert(7);
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();
maxHeap.extractMax();
console.log(maxHeap.values);
