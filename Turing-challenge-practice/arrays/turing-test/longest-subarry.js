/**
#Plan:

1. **Understand the problem:**
  - Given an array of integers nums and an integer k.
  - We have to find the longest subarray whose sum is less than or equal to k.


2. **Break down input data & transformations:**
  - Input: 
    - An integer array e.g., nums = [1, 2, 1, 0, 1, 1,0 ] 
    - An integer k e.g., k = 4
  - Transformation:
    - Keep expanding a sliding window by moving the right pointer.
    - Keep track of the running sum of the window 
    - If the window sum exceeds k, shrink the window from the left until it's valid again.
    - Track the maximum window size found.
3. **Edge cases:**
  - If nums.length = 1.
  - All elements greater than k -> return 0.
  - Sum never exceeds k -> return full array length.
  - presence fo zero values (should not break the logic) 
  

4. **Data structures:**
  - Two pointers  left and right.
  - A pointer sum to keep track of current window sum
  - A pointer longest to keep track of longest subarray length 

5. **Approach:**
  - Initialize: left = 0, sum = 0, longest = 0
  - Iterate right pointer from 0 -> n - 1:
    - Add nums[right] to sum.
    - While sum > k, shrink the window by subtracting nums[left] and moving left++.
    - Update longest = max(longest, right - left + 1) whenever window sum <= k.
  - Return longest.

6. **Time & Space Complexity:**
  - Time: O(n) (each element is processed at most twice (once when expanding right, once when contracting with left )).
  - Space: O(1) (as we are using just few pointers).

*/

// Function
function longestSubArraySum(nums, k) {
  if (nums.length === 1) return nums[0] <= k ? 1 : 0; // edge case
  let left = 0;
  let sum = 0;
  let longest = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right]; // expand window.

    // Shrink widow until valid
    while (sum > k && left <= right) {
      sum -= nums[left];
      left++;
    }

    // Update answer if window is valid
    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}

/*

# Custom Test Cases

*/
console.log(longestSubArraySum([1, 2, 1, 0, 1, 1, 0], 4)); // 5
console.log(longestSubArraySum([3, 1, 2, 1], 4)); // 3
console.log(longestSubArraySum([2, 2, 2, 2], 4)); // 2
console.log(longestSubArraySum([5], 4)); // 0
console.log(longestSubArraySum([4], 4)); // 1

/**
Commit Message: 
Implement Sliding Window Approach to find out the longest sub array whose sum <= k
  - Initialize right pointer from 0, left pointer from 0 and sum = 0
  - Expand right, shrink left while sum > k
  - Update longest window length whenever sum <= k
  - Handles edge cases like single element and exact sum match
 */
