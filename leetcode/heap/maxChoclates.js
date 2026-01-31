/*
Magician and Chocolates
Programming
Heaps And Maps
medium
30.9% Success
138
16
Bookmark
Problem Description
 
 

Given N bags, each bag contains Bi chocolates. There is a kid and a magician. In one unit of time, kid chooses a random bag i, eats Bi chocolates, then the magician fills the ith bag with floor(Bi/2) chocolates.

Find the maximum number of chocolates that kid can eat in A units of time.

NOTE: 

floor() function returns the largest integer less than or equal to a given number.
Return your answer modulo 109+7


Problem Constraints
1 <= A <= 105
1 <= |B| <= 105
1 <= Bi <= INT_MAX


Input Format
First argument is an integer A.

Second argument is an integer array B of size N.



Output Format
Return an integer denoting the maximum number of chocolates that kid can eat in A units of time.



Example Input
Input 1:

 A = 3
 B = [6, 5]
Input 2:

 A = 5
 b = [2, 4, 6, 8, 10]


Example Output
Output 1:

 14
Output 2:

 33


Example Explanation
Explanation 1:

 At t = 1 kid eats 6 chocolates from bag 0, and the bag gets filled by 3 chocolates. 
 At t = 2 kid eats 5 chocolates from bag 1, and the bag gets filled by 2 chocolates. 
 At t = 3 kid eats 3 chocolates from bag 0, and the bag gets filled by 1 chocolate. 
 so, total number of chocolates eaten are 6 + 5 + 3 = 14
 */

class MaxHeap {
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

    if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
      largest = left;
    }
    if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
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

    if (this.heap[parent] < this.heap[index]) {
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
}

function maxChocolates(A, B) {
  const MOD = 1e9 + 7;
  const heap = new MaxHeap(B);
  let chocolates = 0;

  for (let t = 0; t < A; t++) {
    let maxVal = heap.extractMax();
    if (maxVal === null) break; // 👈 heap empty, stop early

    chocolates = (chocolates + maxVal) % MOD;

    let refill = Math.floor(maxVal / 2);
    if (refill > 0) {
      heap.insert(refill); // 👈 only push if > 0
    }
  }
  return chocolates;
}
