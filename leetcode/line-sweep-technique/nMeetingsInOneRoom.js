/*
Given two arrays start[] and end[] such that start[i] is the starting time of ith meeting and end[i] is the ending time of ith meeting. Return the minimum number of rooms required to attend all meetings.

Note: A person can also attend a meeting if it's starting time is same as the previous meeting's ending time.

Examples:

Input: start[] = [1, 10, 7], end[] = [4, 15, 10]
Output: 1
Explanation: Since all the meetings are held at different times, it is possible to attend all the meetings in a single room.
Input: start[] = [2, 9, 6], end[] = [4, 12, 10]
Output: 2
Explanation: 1st and 2nd meetings at one room but for 3rd meeting one another room required.
Constraints:
1 ≤ start.size() = end.size() ≤ 105
0 ≤ start[i] < end[i] ≤ 106
*/
function minRooms(start, end) {
  const n = start.length;
  if (n === 0) return 0;

  // Create events array: [time, type]
  // type: +1 for start, -1 for end
  const events = [];

  for (let i = 0; i < n; i++) {
    events.push([start[i], 1]); // Meeting starts
    events.push([end[i], -1]); // Meeting ends
  }

  // Sort events by time
  // IMPORTANT: For same time, process end before start
  // (if a meeting ends at time t, room becomes free for a meeting starting at t)
  events.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1]; // -1 (end) before +1 (start)
    }
    return a[0] - b[0];
  });

  let currentRooms = 0;
  let maxRooms = 0;

  // Sweep through all events
  for (const [time, change] of events) {
    currentRooms += change;
    maxRooms = Math.max(maxRooms, currentRooms);
  }

  return maxRooms;
}
