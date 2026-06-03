/*
3440. Reschedule Meetings for Maximum Free Time II
Solved
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer eventTime denoting the duration of an event. You are also given two integer arrays startTime and endTime, each of length n.

These represent the start and end times of n non-overlapping meetings that occur during the event between time t = 0 and time t = eventTime, where the ith meeting occurs during the time [startTime[i], endTime[i]].

You can reschedule at most one meeting by moving its start time while maintaining the same duration, such that the meetings remain non-overlapping, to maximize the longest continuous period of free time during the event.

Return the maximum amount of free time possible after rearranging the meetings.

Note that the meetings can not be rescheduled to a time outside the event and they should remain non-overlapping.

Note: In this version, it is valid for the relative ordering of the meetings to change after rescheduling one meeting.

 

Example 1:

Input: eventTime = 5, startTime = [1,3], endTime = [2,5]

Output: 2

Explanation:



Reschedule the meeting at [1, 2] to [2, 3], leaving no meetings during the time [0, 2].

Example 2:

Input: eventTime = 10, startTime = [0,7,9], endTime = [1,8,10]

Output: 7

Explanation:



Reschedule the meeting at [0, 1] to [8, 9], leaving no meetings during the time [0, 7].

Example 3:

Input: eventTime = 10, startTime = [0,3,7,9], endTime = [1,4,8,10]

Output: 6

Explanation:



Reschedule the meeting at [3, 4] to [8, 9], leaving no meetings during the time [1, 7].

Example 4:

Input: eventTime = 5, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]

Output: 0

Explanation:

There is no time during the event not occupied by meetings.

 

Constraints:

1 <= eventTime <= 109
n == startTime.length == endTime.length
2 <= n <= 105
0 <= startTime[i] < endTime[i] <= eventTime
endTime[i] <= startTime[i + 1] where i lies in the range [0, n - 2].
 
*/
/**
 * @param {number} eventTime
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
var maxFreeTime = function (eventTime, startTime, endTime) {
  const n = startTime.length;

  // 1. Calculate all free time gaps
  const gaps = new Array(n + 1);
  gaps[0] = startTime[0];
  for (let i = 1; i < n; i++) {
    gaps[i] = startTime[i] - endTime[i - 1];
  }
  gaps[n] = eventTime - endTime[n - 1];

  // 2. Pre-calculate Prefix and Suffix maximums of the gaps
  const leftMax = new Array(n + 1);
  leftMax[0] = gaps[0];
  for (let i = 1; i <= n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], gaps[i]);
  }

  const rightMax = new Array(n + 1);
  rightMax[n] = gaps[n];
  for (let i = n - 1; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], gaps[i]);
  }

  let maxFree = 0;

  // 3. Iterate through each meeting to find the best possible free time
  for (let i = 0; i < n; i++) {
    const duration = endTime[i] - startTime[i];
    const gLeft = gaps[i];
    const gRight = gaps[i + 1];

    // Scenario 1: Slide the meeting to one side, merging adjacent gaps
    maxFree = Math.max(maxFree, gLeft + gRight);

    // Scenario 2: Move the meeting to another gap entirely
    // Find the largest gap excluding the two adjacent to current meeting
    const maxExternalGap = Math.max(
      i > 0 ? leftMax[i - 1] : 0,
      i + 2 <= n ? rightMax[i + 2] : 0,
    );

    // If an external gap can fit the current meeting's duration,
    // we can fully merge the space it occupied.
    if (maxExternalGap >= duration) {
      maxFree = Math.max(maxFree, gLeft + duration + gRight);
    }
  }

  return maxFree;
};

function maxFreeTime(eventTime, startTime, endTime) {
  const n = startTime.length;
  if (n === 0) return eventTime;

  const gaps = Array(n + 1).fill(0);
  gaps[0] = startTime[0];

  for (let i = 1; i < n; i++) {
    gaps[i] = startTime[i] - endTime[i - 1];
  }
  gaps[n] = eventTime - endTime[n - 1];

  const largestRight = Array(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    largestRight[i] = Math.max(largestRight[i + 1], gaps[i + 1]);
  }

  let maxFree = 0,
    largestLeft = 0;
  for (let i = 1; i <= n; i++) {
    const duration = endTime[i - 1] - startTime[i - 1];
    const canFitLeft = largestLeft >= duration;
    const canFitRight = largestRight[i] >= duration;

    if (canFitLeft || canFitRight) {
      const merged = gaps[i - 1] + gaps[i] + duration;
      maxFree = Math.max(maxFree, merged);
    }

    maxFree = Math.max(maxFree, gaps[i - 1] + gaps[i]);
    largestLeft = Math.max(largestLeft, gaps[i - 1]);
  }

  return maxFree;
}

function maxFreeTime(eventTime, startTime, endTime) {
  const n = startTime.length;
  if (n === 0) return eventTime;

  const gaps = Array(n + 1).fill(0);
  gaps[0] = startTime[0];

  for (let i = 1; i < n; i++) {
    gaps[i] = startTime[i] - endTime[i - 1];
  }
  gaps[n] = eventTime - endTime[n - 1];

  const largestRight = Array(n + 1).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    largestRight[i] = Math.max(largestRight[i + 1], gaps[i + 1]);
  }

  let maxFree = 0,
    largestLeft = 0;
  for (let i = 1; i <= n; i++) {
    const duration = endTime[i - 1] - startTime[i - 1];
    const canFitLeft = largestLeft >= duration;
    const canFitRight = largestRight[i] >= duration;

    if (canFitLeft || canFitRight) {
      const merged = gaps[i - 1] + gaps[i] + duration;
      maxFree = Math.max(maxFree, merged);
    }

    maxFree = Math.max(maxFree, gaps[i - 1] + gaps[i]);
    largestLeft = Math.max(largestLeft, gaps[i - 1]);
  }

  return maxFree;
}
