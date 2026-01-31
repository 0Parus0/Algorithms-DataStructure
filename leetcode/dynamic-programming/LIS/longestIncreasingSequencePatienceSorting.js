/*
300. Longest Increasing Subsequence
Medium
Topics
premium lock icon
Companies
Given an integer array nums, return the length of the longest strictly increasing subsequence.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104

Approach 2 — Binary Search Optimization (O(n log n))

We can do better using a clever greedy + binary search trick.

Intuition:

We maintain an array tails, where tails[k] = smallest ending number of an increasing subsequence of length k + 1.

Algorithm:

Iterate through each num.

Use binary search to find the place in tails where num should go.

If num is greater than all tails → extend the array (longer LIS).

Otherwise, replace the first element in tails that is ≥ num (smaller end gives more room to grow).
*/
function lengthOfLIS(nums) {
  const n = nums.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(-1));

  function solve(i, p) {
    if (i >= n) return 0;

    if (p !== -1 && dp[i][p] !== -1) return dp[i][p];
    let take = 0;
    if (p === -1 || nums[i] > nums[p]) {
      take = 1 + solve(i + 1, i);
    }

    const skip = solve(i + 1, p);
    if (p !== -1) {
      dp[i][p] = Math.max(take, skip);
    }
    return Math.max(take, skip);
  }

  return solve(0, -1);
}

/* Bottom Up */

function lengthOfLIS(nums) {
  const n = nums.length;
  const dp = new Array(n).fill(1);
  let lis = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        lis = Math.max(lis, dp[i]);
      }
    }
  }
  return lis;
}

/* Patience Sorting or Lazy Sorting */

function lengthOfLIS(nums) {
  const tails = [];

  for (let num of nums) {
    let left = 0,
      right = tails.length;

    // Binary search to find the position to replace
    // Lower bound
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (tails[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    if (left === tails.length) {
      // We didn't find any element bigger/equal to the nums[left]
      tails.push(num); // Extend the subsequence
    } else {
      tails[left] = num; // replace to allow more potential extensions
    }
  }

  return tails.length;
}
