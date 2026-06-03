/*
1792. Maximum Average Pass Ratio
Medium
Topics
premium lock icon
Companies
Hint
There is a school that has classes of students and each class will be having a final exam. You are given a 2D integer array classes, where classes[i] = [passi, totali]. You know beforehand that in the ith class, there are totali total students, but only passi number of students will pass the exam.

You are also given an integer extraStudents. There are another extraStudents brilliant students that are guaranteed to pass the exam of any class they are assigned to. You want to assign each of the extraStudents students to a class in a way that maximizes the average pass ratio across all the classes.

The pass ratio of a class is equal to the number of students of the class that will pass the exam divided by the total number of students of the class. The average pass ratio is the sum of pass ratios of all the classes divided by the number of the classes.

Return the maximum possible average pass ratio after assigning the extraStudents students. Answers within 10-5 of the actual answer will be accepted.

 

Example 1:

Input: classes = [[1,2],[3,5],[2,2]], extraStudents = 2
Output: 0.78333
Explanation: You can assign the two extra students to the first class. The average pass ratio will be equal to (3/4 + 3/5 + 2/2) / 3 = 0.78333.
Example 2:

Input: classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
Output: 0.53485
 

Constraints:

1 <= classes.length <= 105
classes[i].length == 2
1 <= passi <= totali <= 105
1 <= extraStudents <= 105
*/
/**
 * @param {number[][]} classes
 * @param {number} extraStudents
 * @return {number}
 */
var maxAverageRatio = function (classes, extraStudents) {
  const heap = [];

  const gain = (p, t) => {
    return (p + 1) / (t + 1) - p / t;
  };

  const swap = (i, j) => {
    const temp = heap[i];
    heap[i] = heap[j];
    heap[j] = temp;
  };

  const push = (node) => {
    heap.push(node);

    let i = heap.length - 1;

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);

      if (heap[parent][0] >= heap[i][0]) {
        break;
      }

      swap(parent, i);

      i = parent;
    }
  };

  const pop = () => {
    const top = heap[0];

    const last = heap.pop();

    if (heap.length > 0) {
      heap[0] = last;

      let i = 0;

      while (true) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        let largest = i;

        if (left < heap.length && heap[left][0] > heap[largest][0]) {
          largest = left;
        }

        if (right < heap.length && heap[right][0] > heap[largest][0]) {
          largest = right;
        }

        if (largest === i) {
          break;
        }

        swap(i, largest);

        i = largest;
      }
    }

    return top;
  };

  // build heap
  for (let [p, t] of classes) {
    push([gain(p, t), p, t]);
  }

  // assign extra students greedily
  while (extraStudents > 0) {
    let [g, p, t] = pop();

    p++;
    t++;

    push([gain(p, t), p, t]);

    extraStudents--;
  }

  // compute final average
  let totalRatio = 0;

  while (heap.length > 0) {
    const [g, p, t] = pop();

    totalRatio += p / t;
  }

  return totalRatio / classes.length;
};

// ========================================================================
// 2. Slow (heap with destructuring)
// ========================================================================

var maxAverageRatio = function (classes, extraStudents) {
  class MaxHeap {
    constructor() {
      this.heap = [];
    }
    push(node) {
      this.heap.push(node);
      this.bubbleUp(this.heap.length - 1);
    }
    pop() {
      const max = this.heap[0];
      const last = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = last;
        this.sinkDown(0);
      }
      return max;
    }
    bubbleUp(idx) {
      while (idx > 0) {
        const parent = Math.floor((idx - 1) / 2);
        if (this.heap[parent].gain >= this.heap[idx].gain) break;
        [this.heap[parent], this.heap[idx]] = [
          this.heap[idx],
          this.heap[parent],
        ];
        idx = parent;
      }
    }
    sinkDown(idx) {
      const length = this.heap.length;
      while (true) {
        let left = 2 * idx + 1;
        let right = 2 * idx + 2;
        let swap = null;
        let element = this.heap[idx];

        if (left < length && this.heap[left].gain > element.gain) swap = left;
        if (
          right < length &&
          this.heap[right].gain >
            (swap === null ? element.gain : this.heap[left].gain)
        )
          swap = right;

        if (swap === null) break;
        [this.heap[idx], this.heap[swap]] = [this.heap[swap], this.heap[idx]];
        idx = swap;
      }
    }
  }

  const heap = new MaxHeap();

  function gain(p, t) {
    return (p + 1) / (t + 1) - p / t;
  }

  for (let [p, t] of classes) {
    heap.push({ gain: gain(p, t), pass: p, total: t });
  }

  for (let i = 0; i < extraStudents; i++) {
    const top = heap.pop();
    top.pass++;
    top.total++;
    top.gain = gain(top.pass, top.total);
    heap.push(top);
  }

  let totalRatio = 0;
  for (let i = 0; i < heap.heap.length; i++) {
    totalRatio += heap.heap[i].pass / heap.heap[i].total;
  }

  return totalRatio / classes.length;
};
