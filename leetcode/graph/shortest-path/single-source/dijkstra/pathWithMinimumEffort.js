/*
1631. Path With Minimum Effort
Medium
Topics
premium lock icon
Companies
Hint
You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.

A route's effort is the maximum absolute difference in heights between two consecutive cells of the route.

Return the minimum effort required to travel from the top-left cell to the bottom-right cell.

 

Example 1:



Input: heights = [[1,2,2],[3,8,2],[5,3,5]]
Output: 2
Explanation: The route of [1,3,5,3,5] has a maximum absolute difference of 2 in consecutive cells.
This is better than the route of [1,2,2,2,5], where the maximum absolute difference is 3.
Example 2:



Input: heights = [[1,2,3],[3,8,4],[5,3,5]]
Output: 1
Explanation: The route of [1,2,3,4,5] has a maximum absolute difference of 1 in consecutive cells, which is better than route [1,3,5,3,5].
Example 3:


Input: heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
Output: 0
Explanation: This route does not require any effort.
 

Constraints:

rows == heights.length
columns == heights[i].length
1 <= rows, columns <= 100
1 <= heights[i][j] <= 106
*/

/**
 * @param {number[][]} heights
 * @return {number}
 */

var delRow = [-1, 0, 1, 0];
var delCol = [0, 1, 0, -1];
var minimumEffortPath = function (heights) {
  const n = heights.length,
    m = heights[0].length;
  const dist = Array.from({ length: n }, () => Array(m).fill(Infinity));
  const pq = new CustomMinPriorityQueue();
  dist[0][0] = 0;
  pq.enqueue([0, 0, 0]);
  while (!pq.isEmpty()) {
    const [effort, row, col] = pq.dequeue();
    if (row == n - 1 && col == m - 1) {
      return effort;
    }

    for (let i = 0; i < 4; i++) {
      let nRow = delRow[i] + row;
      let nCol = delCol[i] + col;

      if (isValid(nRow, nCol, n, m, heights)) {
        let cost = Math.abs(heights[nRow][nCol] - heights[row][col]);
        if (Math.max(cost, effort) < dist[nRow][nCol]) {
          dist[nRow][nCol] = Math.max(cost, effort);
          pq.enqueue([Math.max(cost, effort), nRow, nCol]);
        }
      }
    }
  }
  return -1;
};

var isValid = function (row, col, n, m, heights) {
  return row < n && row >= 0 && col < m && col >= 0;
};

class CustomMinPriorityQueue {
  constructor() {
    this.heap = [];
  }

  enqueue(element) {
    this.heap.push(element);
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    const end = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }
    return min;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (element[0] >= parent[0]) break;
      this.heap[index] = parent;
      index = parentIndex;
    }
    this.heap[index] = element;
  }

  bubbleDown(index) {
    const element = this.heap[index];
    const length = this.heap.length;

    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let swap = null;

      if (leftChild < length && this.heap[leftChild][0] < element[0]) {
        swap = leftChild;
      }
      if (rightChild < length) {
        if (swap === null && this.heap[rightChild][0] < element[0]) {
          swap = rightChild;
        } else if (
          swap !== null &&
          this.heap[rightChild][0] < this.heap[leftChild][0]
        ) {
          swap = rightChild;
        }
      }
      if (swap == null) break;
      this.heap[index] = this.heap[swap];
      index = swap;
    }
    this.heap[index] = element;
  }
}
class MinHeap {
  constructor(arr = []) {
    this.heap = Array.isArray(arr) ? arr.slice() : [];
    if (this.heap.length) {
      this.buildHeap();
    }
  }

  buildHeap() {
    const n = this.heap.length;
    const firstNonLeaf = Math.floor(n / 2) - 1;
    for (let i = firstNonLeaf; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (!this.heap.length) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  heapifyUp(i) {
    while (i > 0) {
      let parent = Math.floor((i - 1) / 2);
      if (this.heap[i][0] < this.heap[parent][0]) {
        [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
        i = parent;
      } else break;
    }
  }

  heapifyDown(i) {
    const n = this.heap.length;
    while (true) {
      let left = 2 * i + 1;
      let right = 2 * i + 2;
      let smallest = i;

      if (left < n && this.heap[left][0] < this.heap[smallest][0])
        smallest = left;
      if (right < n && this.heap[right][0] < this.heap[smallest][0])
        smallest = right;

      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}
function minimumEffortPath(heights) {
  const n = heights.length;
  const m = heights[0].length;
  const row = [0, 0, -1, 1];
  const column = [-1, 1, 0, 0];

  function isValid(x, y) {
    return x < n && x >= 0 && y < m && y >= 0;
  }

  const results = Array.from({ length: n }, () => new Array(m).fill(Infinity));
  const pq = new MinHeap();
  results[0][0] = 0;
  pq.insert(0, [0, 0]);

  while (!pq.isEmpty()) {
    const [diff, [x, y]] = pq.extractMin();

    for (let i = 0; i < 4; i++) {
      const newX = x + row[i];
      const newY = y + column[i];

      if (isValid(newX, newY)) {
        const absDiff = Math.abs(heights[x][y] - heights[newX][newY]);
        const maxDiff = Math.max(diff, absDiff);

        if (results[newX][newY] > maxDiff) {
          results[newX][newY] = maxDiff;
          pq.insert([maxDiff, [newX, newY]]);
        }
      }
    }
  }
  return results[n - 1][m - 1];
}
