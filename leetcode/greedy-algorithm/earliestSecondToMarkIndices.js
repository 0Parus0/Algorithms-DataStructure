/*
3048. Earliest Second to Mark Indices I
Medium
Topics
premium lock icon
Companies
Hint
You are given two 1-indexed integer arrays, nums and, changeIndices, having lengths n and m, respectively.

Initially, all indices in nums are unmarked. Your task is to mark all indices in nums.

In each second, s, in order from 1 to m (inclusive), you can perform one of the following operations:

Choose an index i in the range [1, n] and decrement nums[i] by 1.
If nums[changeIndices[s]] is equal to 0, mark the index changeIndices[s].
Do nothing.
Return an integer denoting the earliest second in the range [1, m] when all indices in nums can be marked by choosing operations optimally, or -1 if it is impossible.

 

Example 1:

Input: nums = [2,2,0], changeIndices = [2,2,2,2,3,2,2,1]
Output: 8
Explanation: In this example, we have 8 seconds. The following operations can be performed to mark all indices:
Second 1: Choose index 1 and decrement nums[1] by one. nums becomes [1,2,0].
Second 2: Choose index 1 and decrement nums[1] by one. nums becomes [0,2,0].
Second 3: Choose index 2 and decrement nums[2] by one. nums becomes [0,1,0].
Second 4: Choose index 2 and decrement nums[2] by one. nums becomes [0,0,0].
Second 5: Mark the index changeIndices[5], which is marking index 3, since nums[3] is equal to 0.
Second 6: Mark the index changeIndices[6], which is marking index 2, since nums[2] is equal to 0.
Second 7: Do nothing.
Second 8: Mark the index changeIndices[8], which is marking index 1, since nums[1] is equal to 0.
Now all indices have been marked.
It can be shown that it is not possible to mark all indices earlier than the 8th second.
Hence, the answer is 8.
Example 2:

Input: nums = [1,3], changeIndices = [1,1,1,2,1,1,1]
Output: 6
Explanation: In this example, we have 7 seconds. The following operations can be performed to mark all indices:
Second 1: Choose index 2 and decrement nums[2] by one. nums becomes [1,2].
Second 2: Choose index 2 and decrement nums[2] by one. nums becomes [1,1].
Second 3: Choose index 2 and decrement nums[2] by one. nums becomes [1,0].
Second 4: Mark the index changeIndices[4], which is marking index 2, since nums[2] is equal to 0.
Second 5: Choose index 1 and decrement nums[1] by one. nums becomes [0,0].
Second 6: Mark the index changeIndices[6], which is marking index 1, since nums[1] is equal to 0.
Now all indices have been marked.
It can be shown that it is not possible to mark all indices earlier than the 6th second.
Hence, the answer is 6.
Example 3:

Input: nums = [0,1], changeIndices = [2,2,2]
Output: -1
Explanation: In this example, it is impossible to mark all indices because index 1 isn't in changeIndices.
Hence, the answer is -1.
 

Constraints:

1 <= n == nums.length <= 2000
0 <= nums[i] <= 109
1 <= m == changeIndices.length <= 2000
1 <= changeIndices[i] <= n
*/
function earliestSecondToMarkIndices(nums, changeIndices) {
  const n = nums.length;
  const m = changeIndices.length;

  // mapping from index to list of times it appears (1-indexed)
  const positions = Array(n + 1)
    .fill()
    .map(() => []);

  for (let s = 0; s < m; s++) {
    const idx = changeIndices[s];
    positions[idx].push(s + 1); // store 1-indexed seconds
  }

  // Check if all indices appear at least once in changeIndices
  for (let i = 1; i <= n; i++) {
    if (positions[i].length === 0) return -1;
  }

  function canMark(limitSecond) {
    // lastMarkTime[i] = latest occurrence of i within changeIndices[1..limitSecond]
    const lastMarkTime = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
      const posList = positions[i];
      // binary search for largest <= limitSecond
      let left = 0,
        right = posList.length - 1,
        last = -1;
      while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (posList[mid] <= limitSecond) {
          last = posList[mid];
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      if (last === -1) return false;
      lastMarkTime[i] = last;
    }

    // events: which index is marked at each second
    const markAtSec = new Array(limitSecond + 1).fill(-1);
    for (let i = 1; i <= n; i++) {
      if (markAtSec[lastMarkTime[i]] !== -1) return false; // two indices marked at same time? impossible
      markAtSec[lastMarkTime[i]] = i;
    }

    let available = 0;
    for (let t = 1; t <= limitSecond; t++) {
      const idx = markAtSec[t];
      if (idx !== -1) {
        // we must use this second to mark
        if (available < nums[idx - 1]) return false;
        available -= nums[idx - 1];
      } else {
        // free second: we can use for decrement later
        available++;
      }
    }
    return true;
  }

  let left = 1,
    right = m,
    answer = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canMark(mid)) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return answer;
}

/**
 * @param {number[]} nums
 * @param {number[]} changeIndices
 * @return {number}
 */
var earliestSecondToMarkIndices = function (nums, changeIndices) {
  const n = nums.length;
  const m = changeIndices.length;

  // convert to 0-indexed
  changeIndices = changeIndices.map((x) => x - 1);

  function canMark(lastSecond) {
    // last occurrence of each index
    const last = new Array(n).fill(-1);

    for (let s = 0; s < lastSecond; s++) {
      last[changeIndices[s]] = s;
    }

    // every index must appear
    for (let i = 0; i < n; i++) {
      if (last[i] === -1) {
        return false;
      }
    }

    let ops = 0;

    for (let s = 0; s < lastSecond; s++) {
      const idx = changeIndices[s];

      // must mark now
      if (last[idx] === s) {
        // need nums[idx] decrement operations before marking
        if (ops < nums[idx]) {
          return false;
        }

        ops -= nums[idx];
      } else {
        // use this second as decrement opportunity
        ops++;
      }
    }

    return true;
  }

  let left = 1;
  let right = m;
  let ans = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canMark(mid)) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
};
