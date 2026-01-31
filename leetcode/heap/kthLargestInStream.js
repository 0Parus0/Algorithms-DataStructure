/*
Kth Largest in a Stream
Difficulty: MediumAccuracy: 31.59%Submissions: 88K+Points: 4Average Time: 20m
Given an input stream arr[] of n integers. Find the Kth largest element (not Kth largest unique element) after insertion of each element in the stream and if the Kth largest element doesn't exist, the answer will be -1 for that insertion.  return a list of size n after all insertions.

Example 1:

Input:
k = 4, n = 6
arr[] = {1, 2, 3, 4, 5, 6}
Output:
-1 -1 -1 1 2 3
Explanation:
k = 4
For 1, the 4th largest element doesn't
exist so answer will be -1.
For 2, the 4th largest element doesn't
exist so answer will be -1.
For 3, the 4th largest element doesn't
exist so answer will be -1.
For 4, the 4th largest element is 1.
For 5, the 4th largest element is 2.
for 6, the 4th largest element is 3.
Example 2:

Input:
k = 1, n = 2
arr[] = {3, 4}
Output:
3 4 
Explanation: 
For the 1st and 2nd element the 1st largest 
element is itself.
 

Your Task:
You don't need to read input or print anything. Your task is to complete the function kthLargest() which takes 2 Integers k, and n and also an array arr[] of size n as input. After the insertion of each element find Kth largest element in the stream and if the Kth element doesn't exist, the answer will be -1 for that insertion.  return a list of size n after all insertions.

 

Expected Time Complexity: O(nlogk)
Expected Auxiliary Space: O(n)

 

Constraints:
1 ≤ k ≤ n ≤ 105
1 ≤ arr[i] ≤ 105
*/

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

  heapifyDown() {
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.getLeftChildIndex(index);
      if (
        this.hasRightChild(index) &&
        this.rightChild(index) < this.leftChild(index)
      ) {
        smallerChildIndex = this.getRightChildIndex(index);
      }

      if (this.heap[index] <= this.heap[smallerChildIndex]) {
        break;
      } else {
        this.swap(index, smallerChildIndex);
      }
      index = smallerChildIndex;
    }
  }

  size() {
    return this.heap.length;
  }
}

function kthLargest(k, n, arr) {
  const heap = new MinHeap();
  const result = [];

  for (let i = 0; i < n; i++) {
    const num = arr[i];
    if (heap.size() < k) {
      heap.insert(num);
      if (heap.size() < k) {
        result.push(-1);
      } else {
        result.push(heap.peek());
      }
    } else {
      if (num > heap.peek()) {
        heap.extractMin();
        heap.insert(num);
      }
      result.push(heap.peek());
    }
  }

  return result;
}

function kthLargest1(k, n, arr) {
  let heap = new MinHeap();
  let result = [];

  for (let num of arr) {
    heap.insert(num);

    if (heap.size() > k) {
      heap.extractMin(); // keep only k largest
    }

    if (heap.size() < k) {
      result.push(-1);
    } else {
      result.push(heap.peek()); // root = kth largest
    }
  }

  return result;
}

// Test cases
console.log(kthLargest(4, 6, [1, 2, 3, 4, 5, 6])); // Output: [-1, -1, -1, 1, 2, 3]
console.log(kthLargest(1, 2, [3, 4])); // Output: [3, 4]
