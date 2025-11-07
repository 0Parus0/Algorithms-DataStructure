/*
Merge K sorted linked lists
Difficulty: MediumAccuracy: 57.01%Submissions: 118K+Points: 4Average Time: 60m
Given an array arr[] of n sorted linked lists of different sizes. Your task is to merge all these lists into a single sorted linked list and return the head of the merged list.

Examples:

Input:
   
Output: 1 -> 2 -> 3 -> 4 -> 7 -> 8 -> 9
Explanation: The arr[] has 3 sorted linked list of size 3, 3, 1.
1st list: 1 -> 3 -> 7
2nd list: 2 -> 4 -> 8
3rd list: 9
The merged list will be: 
    
Input:
   
Output: 1 -> 3 -> 4 -> 5 -> 6 -> 8
Explanation: The arr[] has 3 sorted linked list of size 2, 1, 3.
1st list: 1 -> 3
2nd list: 8
3rd list: 4 -> 5 -> 6
The merged list will be: 
    
Constraints
1 ≤ total no. of nodes ≤ 105
1 ≤ node->data ≤ 103
*/

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
// Min heap technique
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].data <= this.heap[index].data) break;
      [this.heap[parent], this.heap[index]] = [
        this.heap[index],
        this.heap[parent],
      ];
      index = parent;
    }
  }

  heapifyDown() {
    let index = 0;

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (
        left < this.heap.length &&
        this.heap[left].data < this.heap[smallest].data
      )
        smallest = left;
      if (
        right < this.heap.length &&
        this.heap[right].data < this.heap[smallest].data
      )
        smallest = right;

      if (smallest === index) break;
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      index = smallest;
    }
  }

  size() {
    return this.heap.length;
  }
}

function mergeKLists(arr) {
  const heap = new MinHeap();

  const n = arr.length;

  // Insert the first node of each linked list into the heap

  for (let i = 0; i < n; i++) {
    if (arr[i] !== null) {
      heap.insert(arr[i]);
    }
  }

  let dummy = new Node(0);
  let tail = dummy;

  while (heap.size() > 0) {
    let minNode = heap.extractMin();
    tail.next = minNode;
    tail = tail.next;

    if (minNode.next !== null) {
      heap.insert(minNode.next);
    }
  }

  return dummy.next;
}

// Merge sort technique

function mergeKLists(arr) {
  if (arr.length === 0) return null;
  return mergeLists(arr, 0, arr.length - 1);

  function mergeLists(arr, start, end) {
    if (start === end) return arr[start];
    if (start + 1 === end) return mergeTwoLists(arr[start], arr[end]);

    const mid = Math.floor((start + end) / 2);
    const left = mergeLists(arr, start, mid);
    const right = mergeLists(arr, mid + 1, end);
    return mergeTwoLists(left, right);
  }

  function mergeTwoLists(l1, l2) {
    let dummy = new Node(0);
    let tail = dummy;

    while (l1 !== null && l2 !== null) {
      if (l1.data < l2.data) {
        tail.next = l1;
        l1 = l1.next;
      } else {
        tail.next = l2;
        l2 = l2.next;
      }
      tail = tail.next;
    }

    if (l1 !== null) {
      tail.next = l1;
    } else {
      tail.next = l2;
    }

    return dummy.next;
  }
}
