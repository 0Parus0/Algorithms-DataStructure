/*
3439. Reschedule Meetings for Maximum Free Time I
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer eventTime denoting the duration of an event, where the event occurs from time t = 0 to time t = eventTime.

You are also given two integer arrays startTime and endTime, each of length n. These represent the start and end time of n non-overlapping meetings, where the ith meeting occurs during the time [startTime[i], endTime[i]].

You can reschedule at most k meetings by moving their start time while maintaining the same duration, to maximize the longest continuous period of free time during the event.

The relative order of all the meetings should stay the same and they should remain non-overlapping.

Return the maximum amount of free time possible after rearranging the meetings.

Note that the meetings can not be rescheduled to a time outside the event.

 

Example 1:

Input: eventTime = 5, k = 1, startTime = [1,3], endTime = [2,5]

Output: 2

Explanation:



Reschedule the meeting at [1, 2] to [2, 3], leaving no meetings during the time [0, 2].

Example 2:

Input: eventTime = 10, k = 1, startTime = [0,2,9], endTime = [1,4,10]

Output: 6

Explanation:



Reschedule the meeting at [2, 4] to [1, 3], leaving no meetings during the time [3, 9].

Example 3:

Input: eventTime = 5, k = 2, startTime = [0,1,2,3,4], endTime = [1,2,3,4,5]

Output: 0

Explanation:

There is no time during the event not occupied by meetings.

 

Constraints:

1 <= eventTime <= 109
n == startTime.length == endTime.length
2 <= n <= 105
1 <= k <= n
0 <= startTime[i] < endTime[i] <= eventTime
endTime[i] <= startTime[i + 1] where i lies in the range [0, n - 2].
*/
/**
 * @param {number} eventTime
 * @param {number} k
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @return {number}
 */
var maxFreeTime = function (eventTime, k, startTime, endTime) {
  const n = startTime.length;
  const gaps = [];

  // left boundary gap
  gaps.push(startTime[0] - 0);

  // middle gaps
  for (let i = 1; i < n; i++) {
    gaps.push(startTime[i] - endTime[i - 1]);
  }

  // right boundary gap
  gaps.push(eventTime - endTime[n - 1]);

  const windowSize = k + 1;

  let left = 0;
  let sum = 0;
  let maxFree = 0;

  for (let right = 0; right < gaps.length; right++) {
    sum += gaps[right];

    if (right - left + 1 > windowSize) {
      sum -= gaps[left];
      left++;
    }

    maxFree = Math.max(maxFree, sum);
  }

  return maxFree;
};

var maxFreeTime = function (eventTime, k, startTime, endTime) {
  // approach 1
  return getAns(eventTime, k, startTime, endTime);
};
var getAns = function (eventTime, k, startTime, endTime) {
  let freeTime = [];

  // start from
  freeTime.push(startTime[0]);

  for (let i = 1; i < startTime.length; i++) {
    freeTime.push(startTime[i] - endTime[i - 1]);
  }

  // end
  freeTime.push(eventTime - endTime[endTime.length - 1]);

  let i = 0;
  let j = 0;

  let n = freeTime.length;

  let maxSum = 0;
  let currSum = 0;

  while (j < n) {
    currSum += freeTime[j];

    if (j - i + 1 > k + 1) {
      currSum -= freeTime[i];
      i++;
    }
    maxSum = Math.max(maxSum, currSum);
    j++;
  }
  return maxSum;
};

var maxFreeTime = function (eventTime, k, startTime, endTime) {
  let n = startTime.length,
    res = 0;
  let sum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    sum[i + 1] = sum[i] + endTime[i] - startTime[i];
  }
  for (let i = k - 1; i < n; i++) {
    let right = i === n - 1 ? eventTime : startTime[i + 1];
    let left = i === k - 1 ? 0 : endTime[i - k];
    res = Math.max(res, right - left - (sum[i + 1] - sum[i - k + 1]));
  }
  return res;
};
