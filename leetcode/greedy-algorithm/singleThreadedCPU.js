/*
1834. Single-Threaded CPU
Medium
You are given n​​​​​​ tasks labeled from 0 to n - 1 represented by a 2D integer array tasks, where tasks[i] = [enqueueTimei, processingTimei] means that the i​​​​​​th​​​​ task will be available to process at enqueueTimei and will take processingTimei to finish processing.

You have a single-threaded CPU that can process at most one task at a time and will act in the following way:

If the CPU is idle and there are no available tasks to process, the CPU remains idle.
If the CPU is idle and there are available tasks, the CPU will choose the one with the shortest processing time. If multiple tasks have the same shortest processing time, it will choose the task with the smallest index.
Once a task is started, the CPU will process the entire task without stopping.
The CPU can finish a task then start a new one instantly.
Return the order in which the CPU will process the tasks.

 

Example 1:

Input: tasks = [[1,2],[2,4],[3,2],[4,1]]
Output: [0,2,3,1]
Explanation: The events go as follows: 
- At time = 1, task 0 is available to process. Available tasks = {0}.
- Also at time = 1, the idle CPU starts processing task 0. Available tasks = {}.
- At time = 2, task 1 is available to process. Available tasks = {1}.
- At time = 3, task 2 is available to process. Available tasks = {1, 2}.
- Also at time = 3, the CPU finishes task 0 and starts processing task 2 as it is the shortest. Available tasks = {1}.
- At time = 4, task 3 is available to process. Available tasks = {1, 3}.
- At time = 5, the CPU finishes task 2 and starts processing task 3 as it is the shortest. Available tasks = {1}.
- At time = 6, the CPU finishes task 3 and starts processing task 1. Available tasks = {}.
- At time = 10, the CPU finishes task 1 and becomes idle.
Example 2:

Input: tasks = [[7,10],[7,12],[7,5],[7,4],[7,2]]
Output: [4,3,2,0,1]
Explanation: The events go as follows:
- At time = 7, all the tasks become available. Available tasks = {0,1,2,3,4}.
- Also at time = 7, the idle CPU starts processing task 4. Available tasks = {0,1,2,3}.
- At time = 9, the CPU finishes task 4 and starts processing task 3. Available tasks = {0,1,2}.
- At time = 13, the CPU finishes task 3 and starts processing task 2. Available tasks = {0,1}.
- At time = 18, the CPU finishes task 2 and starts processing task 0. Available tasks = {1}.
- At time = 28, the CPU finishes task 0 and starts processing task 1. Available tasks = {}.
- At time = 40, the CPU finishes task 1 and becomes idle.
 

Constraints:

tasks.length == n
1 <= n <= 105
1 <= enqueueTimei, processingTimei <= 109
*/

class MinHeap {
  constructor() {
    this.heap = [];
  }

  compare(a, b) {
    if (a[0] === b[0]) return a[1] - b[1];
    return a[0] - b[0];
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

  heapifyUp(index) {
    const val = this.heap[index];
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.compare(val, this.heap[parent]) >= 0) break;
      this.heap[index] = this.heap[parent];
      this.heap[parent] = val;
      index = parent;
    }
  }

  heapifyDown(index) {
    const len = this.heap.length;
    const val = this.heap[index];

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < len && this.compare(this.heap[left], this.heap[smallest]) < 0)
        smallest = left;
      if (
        right < len &&
        this.compare(this.heap[right], this.heap[smallest]) < 0
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

function getOrder(tasks) {
  const n = tasks.length;
  /*
    tasks = [[1, 2], [2, 4], [3, 2]];
    arr = [[1, 2, 0], [2, 4, 1], [3, 2, 2]];
*/
  const arr = tasks.map((t, i) => [...t, i]);
  arr.sort((a, b) => a[0] - b[0]); // Sort by enqueue time

  const pq = new MinHeap();
  const result = [];
  let time = arr[0][0];
  let i = 0;

  while (i < n || pq.size()) {
    // Add all tasks that are available by 'time'
    while (i < n && arr[i][0] <= time) {
      pq.insert([arr[i][1], arr[i][2]]); // [processingTime, index]
      i++;
    }

    if (!pq.size()) {
      // No tasks available → jump time to next task enqueue
      time = arr[i][0];
    } else {
      let [processingTime, index] = pq.extractMin();
      result.push(index);
      time += processingTime;
    }
  }
  return result;
}

/* 
  ⚙️ Complexity Analysis
  Operation	Time Complexity
  Sorting tasks	O(n log n)
  Each heap insert/extract	O(log n)
  Overall	O(n log n)
  Space	O(n)**
*/

function getOrder1(tasks) {
  const n = tasks.length;
  const arr = tasks.map((t, i) => [t[0], t[1], i]);
  arr.sort((a, b) => a[0] - b[0]); // Sort by enqueueTime

  const pq = new MinHeap();
  const result = [];
  let time = 0;
  let i = 0;

  while (i < n || pq.size()) {
    // If no available task, jump time forward
    if (!pq.size() && time < arr[i][0]) time = arr[i][0];

    // Add all tasks available by current time
    while (i < n && arr[i][0] <= time) {
      pq.insert([arr[i][1], arr[i][2]]); // [processingTime, index]
      i++;
    }

    if (pq.size()) {
      const [procTime, index] = pq.extractMin();
      time += procTime;
      result.push(index);
    }
  }

  return result;
}

/*
🕒 Complexity
Step	Complexity
Sorting	O(n log n)
Heap operations	O(n log n)
Total	O(n log n)
Space	O(n)
*/

console.log(
  getOrder1([
    [1, 2],
    [2, 4],
    [3, 2],
    [4, 1],
  ])
);
// ✅ [0,2,3,1]

console.log(
  getOrder1([
    [7, 10],
    [7, 12],
    [7, 5],
    [7, 4],
    [7, 2],
  ])
);
// ✅ [4,3,2,0,1]
const tasks = [
  [1, 2],
  [2, 4],
  [3, 2],
];
