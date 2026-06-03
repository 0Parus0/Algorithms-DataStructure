/*
3408. Design Task Manager
Medium
Topics
premium lock icon
Companies
There is a task management system that allows users to manage their tasks, each associated with a priority. The system should efficiently handle adding, modifying, executing, and removing tasks.

Implement the TaskManager class:

TaskManager(vector<vector<int>>& tasks) initializes the task manager with a list of user-task-priority triples. Each element in the input list is of the form [userId, taskId, priority], which adds a task to the specified user with the given priority.

void add(int userId, int taskId, int priority) adds a task with the specified taskId and priority to the user with userId. It is guaranteed that taskId does not exist in the system.

void edit(int taskId, int newPriority) updates the priority of the existing taskId to newPriority. It is guaranteed that taskId exists in the system.

void rmv(int taskId) removes the task identified by taskId from the system. It is guaranteed that taskId exists in the system.

int execTop() executes the task with the highest priority across all users. If there are multiple tasks with the same highest priority, execute the one with the highest taskId. After executing, the taskId is removed from the system. Return the userId associated with the executed task. If no tasks are available, return -1.

Note that a user may be assigned multiple tasks.

 

Example 1:

Input:
["TaskManager", "add", "edit", "execTop", "rmv", "add", "execTop"]
[[[[1, 101, 10], [2, 102, 20], [3, 103, 15]]], [4, 104, 5], [102, 8], [], [101], [5, 105, 15], []]

Output:
[null, null, null, 3, null, null, 5]

Explanation

TaskManager taskManager = new TaskManager([[1, 101, 10], [2, 102, 20], [3, 103, 15]]); // Initializes with three tasks for Users 1, 2, and 3.
taskManager.add(4, 104, 5); // Adds task 104 with priority 5 for User 4.
taskManager.edit(102, 8); // Updates priority of task 102 to 8.
taskManager.execTop(); // return 3. Executes task 103 for User 3.
taskManager.rmv(101); // Removes task 101 from the system.
taskManager.add(5, 105, 15); // Adds task 105 with priority 15 for User 5.
taskManager.execTop(); // return 5. Executes task 105 for User 5.
 

Constraints:

1 <= tasks.length <= 105
0 <= userId <= 105
0 <= taskId <= 105
0 <= priority <= 109
0 <= newPriority <= 109
At most 2 * 105 calls will be made in total to add, edit, rmv, and execTop methods.
The input is generated such that taskId will be valid.
*/
class TaskManager {
  constructor(tasks) {
    this.heap = new PriorityQueue((a, b) => b[2] - a[2] || b[1] - a[1], tasks);
    this.tasks = new Map(tasks.map((task) => [task[1], task]));
  }

  add(userId, taskId, priority) {
    const task = [userId, taskId, priority];
    this.heap.enqueue(task);
    this.tasks.set(taskId, task);
  }

  edit(taskId, newPriority) {
    const oldTask = this.tasks.get(taskId);
    if (!oldTask) return;
    const newTask = [oldTask[0], taskId, newPriority];
    this.tasks.set(taskId, newTask);
    this.heap.enqueue(newTask);
  }

  rmv(taskId) {
    this.tasks.delete(taskId);
  }

  execTop() {
    while (!this.heap.isEmpty()) {
      const task = this.heap.dequeue();
      if (this.tasks.get(task[1])?.every((v, i) => v === task[i])) {
        this.rmv(task[1]);
        return task[0];
      }
    }
    return -1;
  }
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Highest priority wins; if same, highest taskId wins
  _compare(a, b) {
    if (a.priority !== b.priority) {
      return b.priority - a.priority;
    }
    return b.taskId - a.taskId;
  }

  push(val) {
    this.heap.push(val);
    this._bubbleUp();
  }

  pop() {
    if (this.size() === 0) return null;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this._bubbleDown();
    }
    return top;
  }

  peek() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  _bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = (index - 1) >> 1;
      if (this._compare(this.heap[index], this.heap[parent]) >= 0) break;
      [this.heap[index], this.heap[parent]] = [
        this.heap[parent],
        this.heap[index],
      ];
      index = parent;
    }
  }

  _bubbleDown() {
    let index = 0;
    while (true) {
      let left = 2 * index + 1,
        right = 2 * index + 2,
        best = index;
      if (
        left < this.heap.length &&
        this._compare(this.heap[left], this.heap[best]) < 0
      )
        best = left;
      if (
        right < this.heap.length &&
        this._compare(this.heap[right], this.heap[best]) < 0
      )
        best = right;
      if (best === index) break;
      [this.heap[index], this.heap[best]] = [this.heap[best], this.heap[index]];
      index = best;
    }
  }
}

class TaskManager {
  /**
   * @param {number[][]} tasks
   */
  constructor(tasks) {
    this.taskStore = new Map(); // taskId -> { userId, priority }
    this.maxHeap = new MaxHeap();

    for (const [userId, taskId, priority] of tasks) {
      this.add(userId, taskId, priority);
    }
  }

  /**
   * @param {number} userId
   * @param {number} taskId
   * @param {number} priority
   */
  add(userId, taskId, priority) {
    this.taskStore.set(taskId, { userId, priority });
    this.maxHeap.push({ priority, taskId, userId });
  }

  /**
   * @param {number} taskId
   * @param {number} newPriority
   */
  edit(taskId, newPriority) {
    const { userId } = this.taskStore.get(taskId);
    this.taskStore.set(taskId, { userId, priority: newPriority });
    this.maxHeap.push({ priority: newPriority, taskId, userId });
  }

  /**
   * @param {number} taskId
   */
  rmv(taskId) {
    this.taskStore.delete(taskId);
  }

  /**
   * @return {number}
   */
  execTop() {
    while (this.maxHeap.size() > 0) {
      const top = this.maxHeap.peek();
      const storedTask = this.taskStore.get(top.taskId);

      // CRITICAL FIX: Verify that the heap's userId AND priority
      // still match the current version in taskStore.
      if (
        storedTask &&
        storedTask.priority === top.priority &&
        storedTask.userId === top.userId
      ) {
        const userId = top.userId;
        this.taskStore.delete(top.taskId);
        this.maxHeap.pop();
        return userId;
      } else {
        // If it doesn't match, this heap entry is stale (removed or edited)
        this.maxHeap.pop();
      }
    }
    return -1;
  }
}
