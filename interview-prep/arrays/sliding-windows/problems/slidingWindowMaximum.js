// ========================================================================
// 239. Sliding Window Maximum
// ========================================================================
/*
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
  if (!nums || nums.length === 0 || k === 0) return [];
  if (k === 1) return nums; // Optimization for single element window

  const result = [];
  const deque = []; // Stores indices, not values

  for (let i = 0; i < nums.length; i++) {
    const currNum = nums[i];

    // Step 1: Remove smaller elements from the back
    // While deque not empty AND the last element's value is less then current
    while (deque.length > 0 && nums[deque[deque.length - 1]] < currNum) {
      deque.pop(); // These elements will never be maximum
    }

    // Step 2: Add current index to the back of deque
    deque.push(i);

    // Step 3: Remove front element if it's out of Window
    // The window is [i - k + 1, i]
    if (deque[0] < i - k + 1) {
      deque.shift(); // Remove from front
    }

    // Step 4: Add to result once we have full window
    // First window ends at index k - 1
    if (i >= k - 1) {
      result.push(nums[deque[0]]); // Front is always maximum
    }
  }
  return result;
}
