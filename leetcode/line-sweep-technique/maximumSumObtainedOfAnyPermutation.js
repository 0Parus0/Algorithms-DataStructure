/*
1589. Maximum Sum Obtained of Any Permutation
Medium
Topics
premium lock icon
Companies
Hint
We have an array of integers, nums, and an array of requests where requests[i] = [starti, endi]. The ith request asks for the sum of nums[starti] + nums[starti + 1] + ... + nums[endi - 1] + nums[endi]. Both starti and endi are 0-indexed.

Return the maximum total sum of all requests among all permutations of nums.

Since the answer may be too large, return it modulo 109 + 7.

 

Example 1:

Input: nums = [1,2,3,4,5], requests = [[1,3],[0,1]]
Output: 19
Explanation: One permutation of nums is [2,1,3,4,5] with the following result: 
requests[0] -> nums[1] + nums[2] + nums[3] = 1 + 3 + 4 = 8
requests[1] -> nums[0] + nums[1] = 2 + 1 = 3
Total sum: 8 + 3 = 11.
A permutation with a higher total sum is [3,5,4,2,1] with the following result:
requests[0] -> nums[1] + nums[2] + nums[3] = 5 + 4 + 2 = 11
requests[1] -> nums[0] + nums[1] = 3 + 5  = 8
Total sum: 11 + 8 = 19, which is the best that you can do.
Example 2:

Input: nums = [1,2,3,4,5,6], requests = [[0,1]]
Output: 11
Explanation: A permutation with the max total sum is [6,5,4,3,2,1] with request sums [11].
Example 3:

Input: nums = [1,2,3,4,5,10], requests = [[0,2],[1,3],[1,1]]
Output: 47
Explanation: A permutation with the max total sum is [4,10,5,3,2,1] with request sums [19,18,10].
 

Constraints:

n == nums.length
1 <= n <= 105
0 <= nums[i] <= 105
1 <= requests.length <= 105
requests[i].length == 2
0 <= starti <= endi < n
*/
/**
 * @param {number[]} nums
 * @param {number[][]} requests
 * @return {number}
 */
var maxSumRangeQuery = function (nums, requests) {
  const n = nums.length;
  const MOD = 1_000_000_007n; // Use BigInt for modulo arithmetic

  // 1. Create a difference array to count frequencies of each index
  // We use Int32Array for performance (automatically zero-initialized)
  const counts = new Int32Array(n);

  for (const [start, end] of requests) {
    counts[start]++;
    if (end + 1 < n) {
      counts[end + 1]--;
    }
  }

  // 2. Convert difference array to actual frequencies using prefix sums
  for (let i = 1; i < n; i++) {
    counts[i] += counts[i - 1];
  }

  // 3. Sort both nums and counts in ascending order
  // (Sorting descending also works, as long as they match)
  nums.sort((a, b) => a - b);
  counts.sort();

  // 4. Calculate the maximum sum greedily
  let totalSum = 0n;
  for (let i = 0; i < n; i++) {
    // Only add if the frequency is > 0
    if (counts[i] > 0) {
      totalSum += BigInt(nums[i]) * BigInt(counts[i]);
    }
  }

  return Number(totalSum % MOD);
};

/**
 * @param {number[]} nums
 * @param {number[][]} requests
 * @return {number}
 */
var maxSumRangeQuery = function (nums, requests) {
  nums.sort((a, b) => a - b);

  let mp = new Array(nums.length + 1).fill(0);

  for (let request of requests) {
    let start = request[0];
    let end = request[1];

    mp[start] += 1;

    if (end + 1 < nums.length) {
      mp[end + 1] -= 1;
    }
  }

  for (let i = 1; i < nums.length; i++) {
    mp[i] += mp[i - 1];
  }

  mp.pop();

  mp.sort((a, b) => a - b);

  let sum = 0;
  let MOD = 1e9 + 7;

  for (let i = 0; i < nums.length; i++) {
    sum = (sum + ((nums[i] * mp[i]) % MOD)) % MOD;
  }

  return sum;
};
