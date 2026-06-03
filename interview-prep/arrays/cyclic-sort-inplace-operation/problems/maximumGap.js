/*
Given an integer array nums, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return 0.
You must write an algorithm that runs in linear time and uses linear extra space.

Example 1:
Input: nums = [3,6,9,1]
Output: 3
Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.

Example 2:
Input: nums = [10]
Output: 0
Explanation: The array contains less than 2 elements, therefore return 0.

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 109
*/
function maximumGap(nums) {
  const n = nums.length;
  if (n < 2) return 0;

  let min = Math.min(...nums);
  let max = Math.max(...nums);

  // If all elements are the same, the gap is 0
  if (min === max) return 0;

  // Bucket size calculation: Ensure at least 1
  const bucketSize = Math.ceil((max - min) / (n - 1));
  const numBuckets = n - 1;

  let minBucket = new Array(numBuckets).fill(Infinity);
  let maxBucket = new Array(numBuckets).fill(-Infinity);

  // 1. Fill the buckets
  for (let i = 0; i < n; i++) {
    // Optimization: min and max don't need to be in buckets
    // because we use them as the starting/ending boundaries.
    if (nums[i] === min || nums[i] === max) continue;

    let bucketIdx = Math.floor((nums[i] - min) / bucketSize);

    // Safety check for indices (handling floating point edge cases)
    if (bucketIdx >= numBuckets) bucketIdx = numBuckets - 1;

    minBucket[bucketIdx] = Math.min(minBucket[bucketIdx], nums[i]);
    maxBucket[bucketIdx] = Math.max(maxBucket[bucketIdx], nums[i]);
  }

  let maxGap = 0;
  let previousMax = min; // Start comparing from the global minimum

  // 2. Scan buckets to find the gap
  // FIX: Iterate through the number of buckets, not n
  for (let i = 0; i < numBuckets; i++) {
    // FIX: Check against -Infinity, not -1
    if (maxBucket[i] === -Infinity) continue;

    // Gap is the difference between current bucket min and previous bucket max
    maxGap = Math.max(maxGap, minBucket[i] - previousMax);
    previousMax = maxBucket[i];
  }

  // Final check: gap between the last bucket's max and the global maximum
  maxGap = Math.max(maxGap, max - previousMax);

  return maxGap;
}

console.log(maximumGap([3, 6, 9, 1])); // Output: 3
