/*
1146. Snapshot Array
Medium
Topics
premium lock icon
Companies
Hint
Implement a SnapshotArray that supports the following interface:

SnapshotArray(int length) initializes an array-like data structure with the given length. Initially, each element equals 0.
void set(index, val) sets the element at the given index to be equal to val.
int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id
 

Example 1:

Input: ["SnapshotArray","set","snap","set","get"]
[[3],[0,5],[],[0,6],[0,0]]
Output: [null,null,0,null,5]
Explanation: 
SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0,5);  // Set array[0] = 5
snapshotArr.snap();  // Take a snapshot, return snap_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5
 

Constraints:

1 <= length <= 5 * 104
0 <= index < length
0 <= val <= 109
0 <= snap_id < (the total number of times we call snap())
At most 5 * 104 calls will be made to set, snap, and get.
*/
class SnapshotArray {
  /**
   * @param {number} length
   */
  constructor(length) {
    this.snapId = 0;
    // history[index] = [[snap_id, value], [snap_id, value], ...]
    // Every index starts with a value of 0 at snap_id 0.
    this.history = Array.from({ length }, () => [[0, 0]]);
  }

  /**
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  set(index, val) {
    const historyList = this.history[index];
    const lastEntry = historyList[historyList.length - 1];

    // If we have already modified this index in the current snap session,
    // we just update the value in the last entry.
    if (lastEntry[0] === this.snapId) {
      lastEntry[1] = val;
    } else {
      // Otherwise, push a new version for the current snap_id
      historyList.push([this.snapId, val]);
    }
  }

  /**
   * @return {number}
   */
  snap() {
    // Return the current id and then increment it for the next session
    return this.snapId++;
  }

  /**
   * @param {number} index
   * @param {number} snap_id
   * @return {number}
   */
  get(index, snap_id) {
    const historyList = this.history[index];

    // Binary Search to find the entry with the largest id <= snap_id
    let left = 0;
    let right = historyList.length - 1;
    let bestIndex = 0;

    while (left <= right) {
      let mid = Math.floor((left + right) / 2);

      if (historyList[mid][0] <= snap_id) {
        bestIndex = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return historyList[bestIndex][1];
  }
}
