/*
743. Network Delay Time
Medium
Topics
premium lock icon
Companies
Hint
You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.

We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.

 

Example 1:


Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
Example 2:

Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
Example 3:

Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
 

Constraints:

1 <= k <= n <= 100
1 <= times.length <= 6000
times[i].length == 3
1 <= ui, vi <= n
ui != vi
0 <= wi <= 100
All the pairs (ui, vi) are unique. (i.e., no multiple edges.)
*/

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

function networkDelayTime(times, n, k) {
  // Step 1: create adjacency list
  const adj = Array.from({ length: n + 1 }, () => []);
  for (let [u, v, w] of times) {
    adj[u].push([v, w]); // Directed edges
  }

  // Step 2: Initialize Dijkstra's Algorithm
  const dist = new Array(n + 1).fill(Infinity);
  const pq = new MinHeap();

  dist[k] = 0;
  pq.insert([0, k]); // [distance, node]

  while (!pq.isEmpty()) {
    const [d, u] = pq.extractMin();

    if (d > dist[u]) continue;

    for (let [v, wt] of adj[u]) {
      const newDist = d + wt;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        pq.insert([newDist, v]);
      }
    }
  }

  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }
  return maxTime;
}
