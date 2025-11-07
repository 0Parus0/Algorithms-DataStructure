/*
239. Sliding Window Maximum
Hard
Topics
premium lock iconCompanies
Hint

You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the max sliding window.

 

Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

Example 2:

Input: nums = [1], k = 1
Output: [1]

 

Constraints:

    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
    1 <= k <= nums.length

*/

function maxSlidingWindow(nums, k) {
  const deque = []; // store indices
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove indices that are out of current window
    if (deque.length && deque[0] <= i - k) {
      deque.shift();
    }

    // Remove elements smaller than current from the back
    while (deque.length && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    // Add current index
    deque.push(i);

    // Starting from i >= k - 1, record max
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// Example:
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]
console.log(maxSlidingWindow([1], 1)); // [1]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindowBF = function (nums, k) {
  const n = nums.length;
  const result = [];

  // Iterate through each starting index of the window
  for (let i = 0; i <= n - k; i++) {
    let max = nums[i]; // Initialize max with the first element of the window

    // Check all elements in the current window to find the maximum
    for (let j = i + 1; j < i + k; j++) {
      if (nums[j] > max) {
        max = nums[j];
      }
    }

    result.push(max);
  }

  return result;
};

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow2 = function (nums, k) {
  const n = nums.length;
  const result = [];
  const deque = []; // stores indices

  for (let i = 0; i < n; i++) {
    // Remove indices that are out of the current window from the front
    if (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }

    // Remove indices from the back whose corresponding values are less than the current value
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    // Add the current index to the back of the deque
    deque.push(i);

    // Start adding to result once we have processed the first k elements
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
};

function maxSlidingWindow1(nums, k) {
  const result = [];
  const deque = [];

  // First window initialization
  for (let i = 0; i < k - 1; i++) {
    if (deque.length === 0) {
      deque.push(i); // if deque is empty
    } else {
      // Check if nums[i] is greater than the element at the index of deque end because we are storing indices in deque pop the index
      while (deque.length > 0 && nums[i] > nums[deque[deque.length - 1]]) {
        deque.pop();
      }
      // if deque is empty or nums[i] is less than deque end push it in to deque
      // basically we are trying to arrange the numbers in first largest, 2nd largest and so on in deque
      deque.push(i);
    }
  }

  for (let i = k - 1; i < nums.length; i++) {
    while (deque.length > 0 && nums[i] > nums[deque[deque.length - 1]]) {
      deque.pop();
    }
    deque.push(i);

    // Check if the current first largest has gone outside the current window. if so remove it
    if (deque[0] <= i - k) {
      deque.shift();
    }
    result.push(nums[deque[0]]);
  }

  return result;
}

function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = [];

  for (let i = 0; i < k - 1; i++) {
    while (deque.length > 0 && nums[i] > nums[deque[deque.length - 1]]) {
      deque.pop();
    }
    deque.push(i);
  }

  for (let i = k - 1; i < nums.length; i++) {
    while (deque.length > 0 && nums[i] > nums[deque[deque.length - 1]]) {
      deque.pop();
    }
    deque.push(i);

    if (deque[0] < i - k + 1) {
      deque.shift();
    }

    result.push(nums[deque[0]]);
  }

  return result;
}

// console.log(maxSlidingWindow1([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3,3,5,5,6,7]
// console.log(maxSlidingWindow1([1], 1)); // [i]
// console.log(maxSlidingWindow1([1, 2, 3, 4], 4)); // [4]
// console.log(maxSlidingWindow1([4, 3, 2, 1], 2)); // [4, 3, 2]
// console.log(maxSlidingWindow1([1, 2, 3, 4], 2)); // [2, 3, 4]
// console.log(maxSlidingWindow1([-1, -2, -3, -4], 2)); // [-1, -2, -3]
// console.log(maxSlidingWindow1([10000, -10000, 5000, -5000], 2)); // [10000, 5000, 5000]

const testCases = [
  { nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3, expected: [3, 3, 5, 5, 6, 7] },
  { nums: [1], k: 1, expected: [1] },
  { nums: [1, 2, 3, 4], k: 4, expected: [4] },
  { nums: [4, 3, 2, 1], k: 2, expected: [4, 3, 2] },
  { nums: [1, 2, 3, 4], k: 2, expected: [2, 3, 4] },
  { nums: [-1, -2, -3, -4], k: 2, expected: [-1, -2, -3] },
  { nums: [1, -1, 2, -2, 3, -3], k: 3, expected: [2, 2, 3, 3] },
  { nums: [10000, -10000, 5000, -5000], k: 2, expected: [10000, 5000, 5000] }, // Corrected expected output
  { nums: [1, 2, 3, 4], k: 1, expected: [1, 2, 3, 4] },
  { nums: [3, 3, 3, 3], k: 2, expected: [3, 3, 3] },
];

testCases.forEach((test, index) => {
  const result = maxSlidingWindowBF(test.nums, test.k);
  const isEqual = JSON.stringify(result) === JSON.stringify(test.expected);
  console.log(`Test ${index + 1}: ${isEqual ? "PASS" : "FAIL"}`);
  if (!isEqual) {
    console.log(`  Expected: ${test.expected}`);
    console.log(`  Got:      ${result}`);
  }
});
