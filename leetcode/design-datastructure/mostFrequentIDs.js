/*
3092. Most Frequent IDs
Medium
Topics
premium lock icon
Companies
Hint
The problem involves tracking the frequency of IDs in a collection that changes over time. You have two integer arrays, nums and freq, of equal length n. Each element in nums represents an ID, and the corresponding element in freq indicates how many times that ID should be added to or removed from the collection at each step.

Addition of IDs: If freq[i] is positive, it means freq[i] IDs with the value nums[i] are added to the collection at step i.
Removal of IDs: If freq[i] is negative, it means -freq[i] IDs with the value nums[i] are removed from the collection at step i.
Return an array ans of length n, where ans[i] represents the count of the most frequent ID in the collection after the ith step. If the collection is empty at any step, ans[i] should be 0 for that step.

 

Example 1:

Input: nums = [2,3,2,1], freq = [3,2,-3,1]

Output: [3,3,2,2]

Explanation:

After step 0, we have 3 IDs with the value of 2. So ans[0] = 3.
After step 1, we have 3 IDs with the value of 2 and 2 IDs with the value of 3. So ans[1] = 3.
After step 2, we have 2 IDs with the value of 3. So ans[2] = 2.
After step 3, we have 2 IDs with the value of 3 and 1 ID with the value of 1. So ans[3] = 2.

Example 2:

Input: nums = [5,5,3], freq = [2,-2,1]

Output: [2,0,1]

Explanation:

After step 0, we have 2 IDs with the value of 5. So ans[0] = 2.
After step 1, there are no IDs. So ans[1] = 0.
After step 2, we have 1 ID with the value of 3. So ans[2] = 1.

 

Constraints:

1 <= nums.length == freq.length <= 105
1 <= nums[i] <= 105
-105 <= freq[i] <= 105
freq[i] != 0
The input is generated such that the occurrences of an ID will not be negative in any step.
*/
function mostFrequentIDs(nums, freq) {
  const n = nums.length;
  const count = new Map(); // id -> current frequency
  const freqCount = new Map(); // frequency -> how many IDs have this frequency
  let maxFreq = 0;
  const result = new Array(n);

  for (let i = 0; i < n; i++) {
    const id = nums[i];
    const delta = freq[i];
    const oldFreq = count.get(id) || 0;
    const newFreq = oldFreq + delta;

    // Update freqCount for old frequency
    if (oldFreq > 0) {
      const oldCount = freqCount.get(oldFreq);
      if (oldCount === 1) {
        freqCount.delete(oldFreq);
      } else {
        freqCount.set(oldFreq, oldCount - 1);
      }
    }

    // Update freqCount for new frequency
    if (newFreq > 0) {
      freqCount.set(newFreq, (freqCount.get(newFreq) || 0) + 1);
    }

    // Update count map
    if (newFreq === 0) {
      count.delete(id);
    } else {
      count.set(id, newFreq);
    }

    // Update maxFreq
    if (newFreq > maxFreq) {
      maxFreq = newFreq;
    } else if (oldFreq === maxFreq && !freqCount.has(maxFreq)) {
      // The old max frequency no longer exists, need to find new max
      while (maxFreq > 0 && !freqCount.has(maxFreq)) {
        maxFreq--;
      }
    }

    result[i] = maxFreq;
  }

  return result;
}
// ========================================================================
// 1. SECTION NAME
// ========================================================================

class MaxHeap {
  constructor() {
    this.heap = [];
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
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }

  _bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[index].freq <= this.heap[parent].freq) break;
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
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (
        left < this.heap.length &&
        this.heap[left].freq > this.heap[largest].freq
      ) {
        largest = left;
      }
      if (
        right < this.heap.length &&
        this.heap[right].freq > this.heap[largest].freq
      ) {
        largest = right;
      }
      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [
        this.heap[largest],
        this.heap[index],
      ];
      index = largest;
    }
  }
}

/**
 * @param {number[]} nums
 * @param {number[]} freq
 * @return {number[]}
 */
var mostFrequentIDs = function (nums, freq) {
  const n = nums.length;
  const countMap = new Map(); // id -> current total frequency
  const maxHeap = new MaxHeap();
  const result = new Array(n);

  for (let i = 0; i < n; i++) {
    const id = nums[i];
    const delta = freq[i];

    // 1. Update current frequency for this ID
    const newFreq = (countMap.get(id) || 0) + delta;
    countMap.set(id, newFreq);

    // 2. Push the new state to the heap
    maxHeap.push({ freq: newFreq, id: id });

    // 3. Remove stale entries from the top of the heap
    // A stale entry is one where the freq in the heap != current freq in countMap
    while (maxHeap.size() > 0) {
      const top = maxHeap.peek();
      if (countMap.get(top.id) !== top.freq) {
        maxHeap.pop();
      } else {
        break;
      }
    }

    // 4. The top is now guaranteed to be the current maximum
    result[i] = maxHeap.size() > 0 ? maxHeap.peek().freq : 0;
  }

  return result;
};
