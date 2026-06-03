/*
1865. Finding Pairs With a Certain Sum
Medium
Topics
premium lock icon
Companies
Hint
You are given two integer arrays nums1 and nums2. You are tasked to implement a data structure that supports queries of two types:

Add a positive integer to an element of a given index in the array nums2.
Count the number of pairs (i, j) such that nums1[i] + nums2[j] equals a given value (0 <= i < nums1.length and 0 <= j < nums2.length).
Implement the FindSumPairs class:

FindSumPairs(int[] nums1, int[] nums2) Initializes the FindSumPairs object with two integer arrays nums1 and nums2.
void add(int index, int val) Adds val to nums2[index], i.e., apply nums2[index] += val.
int count(int tot) Returns the number of pairs (i, j) such that nums1[i] + nums2[j] == tot.
 

Example 1:

Input
["FindSumPairs", "count", "add", "count", "count", "add", "add", "count"]
[[[1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]], [7], [3, 2], [8], [4], [0, 1], [1, 1], [7]]
Output
[null, 8, null, 2, 1, null, null, 11]

Explanation
FindSumPairs findSumPairs = new FindSumPairs([1, 1, 2, 2, 2, 3], [1, 4, 5, 2, 5, 4]);
findSumPairs.count(7);  // return 8; pairs (2,2), (3,2), (4,2), (2,4), (3,4), (4,4) make 2 + 5 and pairs (5,1), (5,5) make 3 + 4
findSumPairs.add(3, 2); // now nums2 = [1,4,5,4,5,4]
findSumPairs.count(8);  // return 2; pairs (5,2), (5,4) make 3 + 5
findSumPairs.count(4);  // return 1; pair (5,0) makes 3 + 1
findSumPairs.add(0, 1); // now nums2 = [2,4,5,4,5,4]
findSumPairs.add(1, 1); // now nums2 = [2,5,5,4,5,4]
findSumPairs.count(7);  // return 11; pairs (2,1), (2,2), (2,4), (3,1), (3,2), (3,4), (4,1), (4,2), (4,4) make 2 + 5 and pairs (5,3), (5,5) make 3 + 4
 

Constraints:

1 <= nums1.length <= 1000
1 <= nums2.length <= 105
1 <= nums1[i] <= 109
1 <= nums2[i] <= 105
0 <= index < nums2.length
1 <= val <= 105
1 <= tot <= 109
At most 1000 calls are made to add and count each.
*/

var FindSumPairs = function (nums1, nums2) {
  this.nums1 = nums1;
  this.nums2 = nums2;
  this.freq = new Map();
  for (let num of nums2) {
    this.freq.set(num, (this.freq.get(num) || 0) + 1);
  }
};

FindSumPairs.prototype.add = function (index, val) {
  let oldVal = this.nums2[index];
  this.freq.set(oldVal, this.freq.get(oldVal) - 1);
  if (this.freq.get(oldVal) === 0) {
    this.freq.delete(oldVal);
  }
  let newVal = oldVal + val;
  this.nums2[index] = newVal;
  this.freq.set(newVal, (this.freq.get(newVal) || 0) + 1);
};

FindSumPairs.prototype.count = function (tot) {
  let count = 0;
  for (let num of this.nums1) {
    let complement = tot - num;
    if (this.freq.has(complement)) {
      count += this.freq.get(complement);
    }
  }
  return count;
};

// ========================================================================
// 1. SECTION NAME
// ========================================================================

class FindSumPairs {
  /**
   * @param {number[]} nums1
   * @param {number[]} nums2
   */
  constructor(nums1, nums2) {
    this.nums1 = nums1;
    this.nums2 = nums2;

    // Frequency map for nums1
    this.counts1 = new Map();
    for (const num of nums1) {
      this.counts1.set(num, (this.counts1.get(num) || 0) + 1);
    }

    // Frequency map for nums2
    this.counts2 = new Map();
    for (const num of nums2) {
      this.counts2.set(num, (this.counts2.get(num) || 0) + 1);
    }
  }

  /**
   * @param {number} index
   * @param {number} val
   * @return {void}
   */
  add(index, val) {
    const oldVal = this.nums2[index];
    const newVal = oldVal + val;

    // Update the array
    this.nums2[index] = newVal;

    // Update the frequency map for nums2
    // Decrement old value count
    this.counts2.set(oldVal, this.counts2.get(oldVal) - 1);

    // Increment new value count
    this.counts2.set(newVal, (this.counts2.get(newVal) || 0) + 1);
  }

  /**
   * @param {number} tot
   * @return {number}
   */
  count(tot) {
    let pairs = 0;

    // Iterate through unique values of nums1 (at most 1000)
    for (const [val1, freq1] of this.counts1) {
      const target = tot - val1;

      // Check if the complement exists in nums2
      if (this.counts2.has(target)) {
        pairs += freq1 * this.counts2.get(target);
      }
    }

    return pairs;
  }
}
