/*
Minimum Workers to Cover All Hours
Difficulty: MediumAccuracy: 55.22%Submissions: 37K+Points: 4
Given an integer array arr[] , where each element arr[i] denotes the range of working hours a person at position i can cover.

A person at index i can work and cover the time interval [i - arr[i], i + arr[i]].

If arr[i] = -1, the person is unavailable and cannot cover any time.

Find the minimum number of people required to cover the entire interval [0, n – 1]. If it is not possible, return -1.

Examples:

Input: arr[] = [-1, 2, 2, -1, 0, 0]
Output: 2
Explanation: 
For arr[] = [-1, 2, 2, -1, 0, 0], each index i represents a person who can cover the interval [i - arr[i], i + arr[i]].
Here:
Index 1 can cover [-1, 3], which becomes [0, 3]
Index 2 can cover [0, 4]
Index 4 can cover [4, 4]
Index 5 can cover [5, 5]
The person at index 2 covers positions 0 to 4, and the person at index 5 covers position 5. Together, they cover the entire interval [0, 5].
So, the minimum number of people required is 2.
Input: arr[] = [2, 3, 4, -1, 2, 0, 0, -1, 0]
Output: -1
Explanation: 
For arr[] = [2, 3, 4, -1, 2, 0, 0, -1, 0]:
Index 0 → covers [0, 2]
Index 1 → covers [0, 4]
Index 2 → covers [0, 6]
Index 4 → covers [2, 6]
Index 5 → covers [5, 5]
Index 6 → covers [6, 6]
Index 8 → covers [8, 8]
No person can cover index 7 because:
arr[7] = -1 (unavailable), and
no other interval extends to position 7.
Since position 7 remains uncovered, it is impossible to cover the entire interval [0, 8].
Hence, the answer is -1.
Constraints:
1 ≤ n ≤ 105
-50 ≤ arr[i] ≤ 50
*/
function minWorkers(arr) {
  const n = arr.length;
  const intervals = [];

  for (let i = 0; i < n; i++) {
    if (arr[i] !== -1) {
      const left = Math.max(0, i - arr[i]);
      const right = Math.min(n - 1, i + arr[i]);
      intervals.push([left, right]);
    }
  }

  // Sort intervals by start, then end
  intervals.sort((a, b) => a[0] - b[0]);

  let count = 0;
  let currEnd = -1;
  let idx = 0;
  let farthest = -1;

  while (currEnd < n - 1) {
    farthest = currEnd;
    // Take all intervals starting <= currEnd+1
    while (idx < intervals.length && intervals[idx][0] <= currEnd + 1) {
      farthest = Math.max(farthest, intervals[idx][1]);
      idx++;
    }

    if (farthest === currEnd) return -1; // no progress

    currEnd = farthest;
    count++;
  }

  return count;
}

/**
 * @param {number[]} arr
 * @returns {number}
 */
function minWorkers(arr) {
  const n = arr.length;

  // maxReach[left] = farthest right endpoint
  const maxReach = new Array(n).fill(-1);

  // Build intervals
  for (let i = 0; i < n; i++) {
    if (arr[i] === -1) continue;

    const left = Math.max(0, i - arr[i]);
    const right = Math.min(n - 1, i + arr[i]);

    maxReach[left] = Math.max(maxReach[left], right);
  }

  let workers = 0;

  let currentEnd = -1;
  let farthest = -1;

  for (let i = 0; i < n; i++) {
    // update best reachable endpoint
    farthest = Math.max(farthest, maxReach[i]);

    // cannot cover this position
    if (i > farthest) {
      return -1;
    }

    // need to activate next worker
    if (i > currentEnd) {
      workers++;
      currentEnd = farthest;
    }
  }

  return workers;
}
