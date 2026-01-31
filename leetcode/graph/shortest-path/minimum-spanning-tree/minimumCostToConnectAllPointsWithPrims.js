/*
1584. Min Cost to Connect All Points
Medium
Topics
premium lock icon
Companies
Hint
You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].

The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

Return the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.

 

Example 1:


Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
Explanation: 

We can connect the points as shown above to get the minimum cost of 20.
Notice that there is a unique path between every pair of points.
Example 2:

Input: points = [[3,12],[-2,5],[-4,1]]
Output: 18
 

Constraints:

1 <= points.length <= 1000
-106 <= xi, yi <= 106
All pairs (xi, yi) are distinct.
*/

/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  const n = points.length;
  if (n <= 1) return 0;

  // Min-heap implementation
  class MinHeap {
    constructor() {
      this.heap = [];
    }

    insert(val) {
      this.heap.push(val);
      this.heapifyUp(this.heap.length - 1);
    }

    extractMin() {
      if (this.heap.length === 0) return null;
      if (this.heap.length === 1) return this.heap.pop();

      const min = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.heapifyDown(0);
      return min;
    }

    heapifyUp(i) {
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if (this.heap[i][0] < this.heap[parent][0]) {
          [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
          i = parent;
        } else {
          break;
        }
      }
    }

    heapifyDown(i) {
      const n = this.heap.length;
      while (true) {
        let smallest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n && this.heap[left][0] < this.heap[smallest][0]) {
          smallest = left;
        }
        if (right < n && this.heap[right][0] < this.heap[smallest][0]) {
          smallest = right;
        }

        if (smallest === i) break;

        [this.heap[i], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[i],
        ];
        i = smallest;
      }
    }

    isEmpty() {
      return this.heap.length === 0;
    }
  }

  const visited = new Array(n).fill(false);
  const minDist = new Array(n).fill(Infinity);
  minDist[0] = 0;

  const minHeap = new MinHeap();
  minHeap.insert([0, 0]); // [distance, node]

  let totalCost = 0;
  let edgesUsed = 0;

  while (edgesUsed < n) {
    const [dist, node] = minHeap.extractMin();

    if (visited[node]) continue;

    visited[node] = true;
    totalCost += dist;
    edgesUsed++;

    // Update the distances to all other nodes
    for (let nextNode = 0; nextNode < n; nextNode++) {
      if (!visited[nextNode]) {
        const newDist =
          Math.abs(points[node][0] - points[nextNode][0]) +
          Math.abs(points[node][1] - points[nextNode][1]);

        if (newDist < minDist[nextNode]) {
          minDist[nextNode] = newDist;
          minHeap.insert([newDist, nextNode]);
        }
      }
    }
  }

  return totalCost;
};

/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
  const n = points.length;
  if (n <= 1) return 0;

  const visited = new Array(n).fill(false);
  const minDist = new Array(n).fill(Infinity);
  minDist[0] = 0;

  let totalCost = 0;

  for (let i = 0; i < n; i++) {
    // Find the unvisited node with minimum distance
    let minNode = -1;
    let minDistance = Infinity;

    for (let j = 0; j < n; j++) {
      if (!visited[j] && minDist[j] < minDistance) {
        minDistance = minDist[j];
        minNode = j;
      }
    }

    visited[minNode] = true;
    totalCost += minDistance;

    // Update distances to all unvisited nodes
    for (let j = 0; j < n; j++) {
      if (!visited[j]) {
        const dist =
          Math.abs(points[minNode][0] - points[j][0]) +
          Math.abs(points[minNode][1] - points[j][1]);
        if (dist < minDist[j]) {
          minDist[j] = dist;
        }
      }
    }
  }

  return totalCost;
};
