/*
Profit Maximisation
Programming
Heaps And Maps
easy
78.4% Success
153
5
Bookmark
Asked In:
Problem Description
 
 

 Given an array A , representing seats in each row of a stadium. You need to sell tickets to B people.

Each seat costs equal to the number of vacant seats in the row it belongs to. The task is to maximize the profit by selling the tickets to B people.



Problem Constraints
1 <= |A| <= 100000

1 <= B <= 1000000



Input Format
First argument is the array A.

Second argument is integer B.



Output Format
Return one integer, the answer to the problem.



Example Input
Input 1:

A = [2, 3]
B = 3
Input 2:

A = [1, 4]
B = 2


Example Output
Output 1:

7
Output 2:

7


Example Explanation
Explanation 1:

 First you serve the seat with number = 3. Then with 2 and then with 2. hence answer = 3 + 2 + 2 = 7.
Explanation 2:

 You give both tickets from the row with 4 seats. 4 + 3 = 7.
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
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    let root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.maxHeapify(0);
    return root;
  }

  heapifyUp(index) {
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);

      if (this.heap[parent] < this.heap[index]) {
        [this.heap[parent], this.heap[index]] = [
          this.heap[index],
          this.heap[parent],
        ];
        index = parent; // move up
      } else {
        break; // heap property restored
      }
    }
  }

  heapifyUpRecursive(index) {
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

function maximizeProfit(A, B) {
  const heap = new MaxHeap(A);
  let profit = 0;

  for (let i = 0; i < B; i++) {
    let maxSeats = heap.extractMax();
    if (maxSeats === null) break;

    profit += maxSeats;

    if (maxSeats - 1 > 0) {
      heap.insert(maxSeats - 1);
    }
  }

  return profit;
}
