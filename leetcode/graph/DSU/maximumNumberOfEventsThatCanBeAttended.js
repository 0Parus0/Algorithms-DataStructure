/*
1353. Maximum Number of Events That Can Be Attended
Medium
Topics
premium lock icon
Companies
Hint
You are given an array of events where events[i] = [startDayi, endDayi]. Every event i starts at startDayi and ends at endDayi.

You can attend an event i at any day d where startDayi <= d <= endDayi. You can only attend one event at any time d.

Return the maximum number of events you can attend.

 

Example 1:


Input: events = [[1,2],[2,3],[3,4]]
Output: 3
Explanation: You can attend all the three events.
One way to attend them all is as shown.
Attend the first event on day 1.
Attend the second event on day 2.
Attend the third event on day 3.
Example 2:

Input: events= [[1,2],[2,3],[3,4],[1,2]]
Output: 4
 

Constraints:

1 <= events.length <= 105
events[i].length == 2
1 <= startDayi <= endDayi <= 105
*/
class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  peek() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return top;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;

    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);

      if (this.heap[parent] <= this.heap[idx]) break;

      [this.heap[parent], this.heap[idx]] = [this.heap[idx], this.heap[parent]];

      idx = parent;
    }
  }

  bubbleDown() {
    let idx = 0;
    const n = this.heap.length;

    while (true) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallest = idx;

      if (left < n && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }

      if (right < n && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }

      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];

      idx = smallest;
    }
  }
}

/**
 * @param {number[][]} events
 * @return {number}
 */
var maxEvents = function (events) {
  events.sort((a, b) => a[0] - b[0]);

  const minHeap = new MinHeap();

  let day = 1;
  let i = 0;
  let attended = 0;

  const n = events.length;

  while (i < n || minHeap.size()) {
    // Jump directly to next event day if heap empty
    if (minHeap.size() === 0) {
      day = events[i][0];
    }

    // Add all events starting today
    while (i < n && events[i][0] <= day) {
      minHeap.push(events[i][1]);
      i++;
    }

    // Remove expired events
    while (minHeap.size() && minHeap.peek() < day) {
      minHeap.pop();
    }

    // Attend one event
    if (minHeap.size()) {
      minHeap.pop();
      attended++;
    }

    day++;
  }

  return attended;
};

// ========================================================================
// 1. Using DSU (Best and Optimal)
// ========================================================================

/**
 * @param {number[][]} events
 * @return {number}
 */
var maxEvents = function (events) {
  // 1. Sort by end day
  events.sort((a, b) => a[1] - b[1]);

  const n = events.length;
  const maxDay = events[n - 1][1];

  // 2. parent[i] will store the next available day starting from i
  // We initialize each day to point to itself
  const parent = new Uint32Array(maxDay + 2);
  for (let i = 0; i <= maxDay + 1; i++) {
    parent[i] = i;
  }

  // Standard DSU Find with Path Compression
  const find = (i) => {
    if (parent[i] === i) return i;
    return (parent[i] = find(parent[i]));
  };

  let attended = 0;

  for (const [start, end] of events) {
    // Find the first available day starting from the event's start date
    let availableDay = find(start);

    // If the available day is within the event's duration
    if (availableDay <= end) {
      attended++;
      // Mark this day as used by pointing it to the next day
      parent[availableDay] = find(availableDay + 1);
    }
  }

  return attended;
};
