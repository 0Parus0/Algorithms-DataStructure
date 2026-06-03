/*
Given an array of intervals where intervals[i] = [start_i, end_i], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.
Input: intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]
Output: [[1, 6], [8, 10], [15, 18]]
Explanation: Since intervals [1, 3] and [2, 6] overlap, merge them into [1, 6].
Input: intervals = [[1, 4], [4, 5]]
Output: [[1, 5]]
Explanation: Intervals [1, 4] and [4, 5] are considered overlapping.
*/
function merge(intervals) {
  const n = intervals.length;
  intervals = intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const result = [];
  for (let i = 0; i < n; i++) {
    let start = intervals[i][0];
    let end = intervals[i][1];

    if (result.length && end <= result[result.length - 1][1]) {
      continue;
    }

    for (let j = i + 1; j < n; j++) {
      if (intervals[j][0] <= end) {
        end = Math.max(end, intervals[j][1]);
      } else {
        break;
      }
    }
    result.push([start, end]);
  }
  return result;
}

function merge(intervals) {
  const n = intervals.length;
  intervals = intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const result = [];

  for (let i = 0; i < n; i++) {
    if (!result.length || intervals[i][0] > result[result.length - 1][1]) {
      result.push(intervals[i]);
    } else {
      result[result.length - 1][1] = Math.max(
        result[result.length - 1][1],
        intervals[i][1],
      );
    }
  }
  return result;
}

console.log(
  merge([
    [1, 3],
    [2, 6],
    [2, 5],
    [1, 5],
    [8, 10],
    [15, 18],
  ]),
);
