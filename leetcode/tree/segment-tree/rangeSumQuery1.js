/*
303. Range Sum Query - Immutable
Easy
Topics
premium lock icon
Companies
Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
 

Example 1:

Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]

Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
 

Constraints:

1 <= nums.length <= 104
-105 <= nums[i] <= 105
0 <= left <= right < nums.length
At most 104 calls will be made to sumRange.
*/

class NumArrayTree {
  constructor(nums) {
    this.n = nums.length;
    // For segment tree with heap representation, we need 4*n size
    this.tree = new Array(4 * this.n).fill(0);
    this.build(nums, 0, 0, this.n - 1);
  }

  // Build the segment tree recursively
  build(nums, i, start, end) {
    // Base case
    if (start === end) {
      // Leaf i
      this.tree[i] = nums[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;

    // Build left and right subtrees
    this.build(nums, leftChild, start, mid);
    this.build(nums, rightChild, mid + 1, end);

    // Merge: sum of left and right children
    this.tree[i] = this.tree[leftChild] + this.tree[rightChild];
  }

  // Query sum in range [l, r]
  query(i, start, end, l, r) {
    // Case 1: Completely outside the range
    if (r < start || l > end) {
      return 0;
    }

    // Case 2: Completely inside the range
    if (l <= start && r >= end) {
      return this.tree[i];
    }

    // Case 3: Partially inside, need to check both children
    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;

    const leftSum = this.query(leftChild, start, mid, l, r);
    const rightSum = this.query(rightChild, mid + 1, end, l, r);

    return leftSum + rightSum;
  }

  sumRange(left, right) {
    return this.query(0, 0, this.n - 1, left, right);
  }
}

class NumArray {
  /**
   * @param {number[]} nums
   */
  constructor(nums) {
    this.n = nums.length;
    // Size the tree array to 4 * n to prevent out-of-bounds
    this.tree = new Array(4 * this.n).fill(0);

    if (this.n > 0) {
      this.build(nums, 0, 0, this.n - 1);
    }
  }

  /**
   * Build the segment tree recursively
   * @param {number[]} nums - original array
   * @param {number} i - current index in the tree array
   * @param {number} start - start index of the current range in nums
   * @param {number} end - end index of the current range in nums
   */
  build(nums, i, l, r) {
    if (l === r) {
      // Leaf i: stores the single element
      this.tree[i] = nums[l];
      return;
    }

    let mid = Math.floor((l + r) / 2);
    let leftChild = 2 * i + 1;
    let rightChild = 2 * i + 2;

    // Recursively build left and right children
    this.build(nums, leftChild, l, mid);
    this.build(nums, rightChild, mid + 1, r);

    // Internal i stores the sum of its children
    this.tree[i] = this.tree[leftChild] + this.tree[rightChild];
  }

  /**
   * @param {number} left
   * @param {number} right
   * @return {number}
   */
  sumRange(left, right) {
    return this.query(0, 0, this.n - 1, left, right);
  }

  /**
   * Query the sum in range [L, R]
   */
  query(i, start, end, L, R) {
    // Case 1: Range is completely outside [L, R]
    if (R < start || end < L) {
      return 0;
    }

    // Case 2: Range is completely inside [L, R]
    if (L <= start && end <= R) {
      return this.tree[i];
    }

    // Case 3: Range is partially inside and partially outside
    let mid = Math.floor((start + end) / 2);
    let leftSum = this.query(2 * i + 1, start, mid, L, R);
    let rightSum = this.query(2 * i + 2, mid + 1, end, L, R);

    return leftSum + rightSum;
  }
}

/**
 * Example usage:
 * var obj = new NumArray([-2, 0, 3, -5, 2, -1])
 * var param_1 = obj.sumRange(0, 2) // returns 1
 * var param_2 = obj.sumRange(2, 5) // returns -1
 */

// ----------------------------------
// Prefix Sum;
// ----------------------------------
class NumArray {
  constructor(nums) {
    this.prefixSum = new Array(nums.length + 1).fill(0);
    // Build prefix sum array
    for (let i = 0; i < nums.length; i++) {
      this.prefixSum[i + 1] = this.prefixSum[i] + nums[i];
    }
  }

  sumRange(left, right) {
    // sum[left, right] = prefix[right + 1] - prefix[left]
    return this.prefixSum[right + 1] - this.prefixSum[left];
  }
}

// Usage examples:
const numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log(numArray.sumRange(0, 2));
console.log(numArray.sumRange(2, 5));
console.log(numArray.sumRange(0, 5));
