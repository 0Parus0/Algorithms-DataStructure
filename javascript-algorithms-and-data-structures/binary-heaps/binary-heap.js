/**
 * *******************
 *  Binary Heap:
 * *******************
 * A Binary Heap is a Binary Tree with following properties.
 * 1) It’s a complete tree (All levels are completely filled except possibly the last level and the last level has all keys as left as possible). This property of Binary Heap makes them suitable to be stored in an array.

 * 2) A Binary Heap is either Min Heap or Max Heap. In a Min Binary Heap, the key at root must be minimum among all keys present in Binary Heap. The same property must be recursively true for all nodes in Binary Tree. Max Binary Heap is similar to MinHeap.
 * A Binary Heap is a Complete Binary Tree.
 * A binary heap is typically represented as an array.

 * The root element will be at Arr[0].
 Below table shows indexes of other nodes for the nth node, i.e., Arr[n]:
 Math.floor(Arr[(n-1)/2])	Returns the parent node for any child at Arr[n]
 Arr[(2*n)+1]	Returns the left child node for any parent at Arr[n]
 Arr[(2*n)+2]	Returns the right child node for any parent at Arr[n]
*/


/**
 * ***************
 *  Max Binary Heap
 * ***************
 */


class MaxBinaryHeap {
  constructor() {
    this.values = [41, 39, 33, 18, 27, 12];
  }

  insert(element) {
    this.values.push(element);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while(idx > 0) {
      let parentIdx = Math.floor((idx -1) / 2);
      let parent = this.values[parentIdx];
      if(element <= parent)  break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if(this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    
    return max;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while(true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if(leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if(leftChild > element) {
          swap = leftChildIdx;
        }
      }
      if(rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if( 
          (swap === null && rightChild > element) || 
          (swap !== null && rightChild > leftChild)
          ) {
            swap = rightChildIdx;
          }
      }
      if(swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

// const heap = new MaxBinaryHeap();
// heap.insert(55);
// heap.insert(1);
// heap.insert(45);
// heap.insert(199);
// console.log(heap.extractMax());
// console.log(heap.extractMax());
// console.log(heap.extractMax());
// console.log(heap.extractMax());
// console.log(heap.extractMax());
// console.log(heap.extractMax());
// console.log(heap.extractMax());
// console.log(heap.extractMax());
// console.log(heap.extractMax());
// console.log(heap.extractMax());
// console.log(heap.values)


/**
 * *******************
 * Min Binary Heap
 * *******************
 */


class MinBinaryHeap {
  constructor() {
    this.values = [];
  }

  insert(element) {
    this.values.push(element);
    this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];

    while(idx > 0) {
      let parentIdx = Math.floor((idx -1) / 2);
      let parent = this.values[parentIdx];
      if(element >= parent)  break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  extractMax() {
    const min = this.values[0];
    const end = this.values.pop();
    if(this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    
    return min;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];

    while(true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;

      if(leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if(leftChild < element) {
          swap = leftChildIdx;
        }
      }
      if(rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if( 
          (swap === null && rightChild < element) || 
          (swap !== null && rightChild < leftChild)
          ) {
            swap = rightChildIdx;
          }
      }
      if(swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}


const heap = new MinBinaryHeap();
heap.insert(55);
heap.insert(1);
heap.insert(45);
heap.insert(199);
heap.insert(3);
heap.insert(19);
heap.insert(99);
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.extractMax());
console.log(heap.values)
