/*
435. Non-overlapping Intervals
Medium
Topics
premium lock icon
Companies
Given an array of intervals intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.

Note that intervals which only touch at a point are non-overlapping. For example, [1, 2] and [2, 3] are non-overlapping.

 

Example 1:

Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.
Example 2:

Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.
Example 3:

Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.
 

Constraints:

1 <= intervals.length <= 105
intervals[i].length == 2
-5 * 104 <= starti < endi <= 5 * 104
*/

function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;

  // Sort by end time
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0; // Number of intervals to remove
  let prevEnd = intervals[0][1]; // end time of the last kept interval

  for (let i = 1; i < intervals.length; i++) {
    const [start, end] = intervals[i];

    if (start < prevEnd) {
      // overlap -> remove this one
      count++;
    } else {
      // no overlap -> keep this one
      prevEnd = end;
    }
  }

  return count;
}

/*
⏱️ Step 6: Complexity

Sorting → O(n log n)

Single pass → O(n)

Space → O(1)
*/

console.log(
  eraseOverlapIntervals([
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 3],
  ])
); // 1
console.log(
  eraseOverlapIntervals([
    [1, 2],
    [1, 2],
    [1, 2],
  ])
); // 2
console.log(
  eraseOverlapIntervals([
    [1, 2],
    [2, 3],
  ])
); // 0
