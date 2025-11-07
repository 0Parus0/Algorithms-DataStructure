/*
N meetings in one room
Difficulty: EasyAccuracy: 45.3%Submissions: 367K+Points: 2Average Time: 20m
You are given timings of n meetings in the form of (start[i], end[i]) where start[i] is the start time of meeting i and end[i] is the finish time of meeting i. Return the maximum number of meetings that can be accommodated in a single meeting room, when only one meeting can be held in the meeting room at a particular time. 

Note: The start time of one chosen meeting can't be equal to the end time of the other chosen meeting.

Examples :

Input: start[] = [1, 3, 0, 5, 8, 5], end[] =  [2, 4, 6, 7, 9, 9]
Output: 4
Explanation: Maximum four meetings can be held with given start and end timings. The meetings are - (1, 2), (3, 4), (5,7) and (8,9)
Input: start[] = [10, 12, 20], end[] = [20, 25, 30]
Output: 1
Explanation: Only one meetings can be held with given start and end timings.
Input: start[] = [1, 2], end[] = [100, 99]
Output: 1
Constraints:
1 ≤ n ≤ 105
0 ≤ start[i] < end[i] ≤ 106
*/

function maxMeetings(start, end) {
  const n = start.length;
  if (n === 0) return 0; // Handle empty input

  const meetings = [];

  // Step 1: pair up start and end
  for (let i = 0; i < n; i++) {
    meetings.push([start[i], end[i]]);
  }

  // Step 2: sort by end time
  meetings.sort((a, b) => a[1] - b[1]);

  // Step 3: Select on the basis of earliest end time
  let count = 1;
  let lastEnd = meetings[0][1];

  for (let i = 1; i < n; i++) {
    if (meetings[i][0] > lastEnd) {
      count++;
      lastEnd = meetings[i][1];
    }
  }

  return count;
}

// Example runs
console.log(maxMeetings([1, 3, 0, 5, 8, 5], [2, 4, 6, 7, 9, 9])); // 4
console.log(maxMeetings([10, 12, 20], [20, 25, 30])); // 1
console.log(maxMeetings([1, 2], [100, 99])); // 1

/*
⏱️ Step 6: Complexity

    Time: O(n log n) — sorting meetings

    Space: O(n) — storing meeting pairs
*/
