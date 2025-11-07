/*
Minimum Cost of ropes
Difficulty: MediumAccuracy: 42.73%Submissions: 253K+Points: 4
Given an array, arr[] of rope lengths, connect all ropes into a single rope with the minimum total cost. The cost to connect two ropes is the sum of their lengths. 

Examples:

Input: arr[] = [4, 3, 2, 6]
Output: 29
Explanation: First connect 2 and 3 to get [4, 5, 6] with a cost of 5, then connect 4 and 5 to get [9, 6] with a cost of 9, and finally connect 9 and 6 to get one rope with a cost of 15, giving a total minimum cost of 29. Any other order, such as connecting 4 and 6 first, results in a higher total cost of 38.
Input: arr[] = [4, 2, 7, 6, 9]
Output: 62 
Explanation: First, connect ropes 4 and 2, which makes the array [6, 7, 6, 9]. Cost of this operation 4 + 2 = 6. Next, add ropes 6 and 6, which results in [12, 7, 9]. Cost of this operation 6 + 6 = 12. Then, add 7 and 9, which makes the array [12,16]. Cost of this operation 7 + 9 = 16. And finally, add these two which gives [28]. Hence, the total cost is 6 + 12 + 16 + 28 = 62.
Input: arr[] = [10]
Output: 0
Explanation: Since there is only one rope, no connections are needed, so the cost is 0.
Constraints:
1 ≤ arr.size() ≤ 105
1 ≤ arr[i] ≤ 104
*/
class MinHeap {
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

function minCost(arr) {
  if (arr.length <= 1) return 0;

  // Build heap from array in O(n) time
  const heap = new MinHeap(arr);
  let totalCost = 0;

  while (heap.size() > 1) {
    const first = heap.extractMin();
    const second = heap.extractMin();

    const cost = first + second;

    totalCost += cost;
    heap.insert(cost);
  }

  return totalCost;
}

// Test cases
console.log(minCost([4, 3, 2, 6])); // Output: 29
console.log(minCost([4, 2, 7, 6, 9])); // Output: 62
console.log(minCost([10])); // Output: 0
