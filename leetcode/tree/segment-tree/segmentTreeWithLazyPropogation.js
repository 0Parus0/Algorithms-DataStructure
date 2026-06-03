/*
307. Range Sum Query - Mutable
Medium
Topics
premium lock icon
Companies
Given an integer array nums, handle multiple queries of the following types:

Update the value of an element in nums.
Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
void update(int index, int val) Updates the value of nums[index] to be val.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
 

Example 1:

Input
["NumArray", "sumRange", "update", "sumRange"]
[[[1, 3, 5]], [0, 2], [1, 2], [0, 2]]
Output
[null, 9, null, 8]

Explanation
NumArray numArray = new NumArray([1, 3, 5]);
numArray.sumRange(0, 2); // return 1 + 3 + 5 = 9
numArray.update(1, 2);   // nums = [1, 2, 5]
numArray.sumRange(0, 2); // return 1 + 2 + 5 = 8
 

Constraints:

1 <= nums.length <= 3 * 104
-100 <= nums[i] <= 100
0 <= index < nums.length
-100 <= val <= 100
0 <= left <= right < nums.length
At most 3 * 104 calls will be made to update and sumRange.
*/

/*
 ***********************************************************************************************
 * Segment tree implementation with point updates
 ***********************************************************************************************
 */

class NumArray {
  constructor(nums) {
    this.n = nums.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.build = (nums, 0, 0, this.n - 1);
  }

  // ========================================================================
  // 1. Build Segment tree
  // ========================================================================

  build(nums, node, start, end) {
    if (start === end) {
      this.tree[node] = nums[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const left = 2 * node + 1;
    const right = 2 * node + 2;

    this.build(nums, left, start, mid);
    this.build(nums, right, mid + 1, end);

    this.tree[idx] = this.tree[left] + this.tree[right];
  }
  // ========================================================================
  // 2. Update Segment tree
  // ========================================================================

  /**
   *
   * @param {*} index
   * @param {*} val
   * @param {*} node
   * @param {*} start
   * @param {*} end
   * @returns
   */
  update(index, val, node = 0, start = 0, end = this.n - 1) {
    if (start === end) {
      this.tree[node] = val;
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const left = 2 * node + 1;
    const right = 2 * node + 2;

    if (index <= mid) {
      this.update(index, val, left, start, mid);
    } else {
      this.update(index, val, right, mid + 1, end);
    }

    this.tree[node] = this.tree[left] + this.tree[right];
  }

  // ========================================================================
  // 3. Sum Range
  // ========================================================================

  sumRange(left, right, node = 0, start = 0, end = this.n - 1) {
    // Case 1: Completely outside
    if (right < start || left > end) return 0;

    // Case 2: Completely inside
    if (left <= start && right >= end) {
      return this.tree[node];
    }

    // Case 3: Partial overlap
    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;
    return (
      this.sumRange(left, right, leftChild, start, mid) +
      this.sumRange(left, right, rightChild, mid + 1, end)
    );
  }
}

// ========================================================================
//  Segment tree with lazy propagation
// ========================================================================

class NumArray {
  constructor(nums) {
    this.n = nums.length;
    this.tree = new Array(this.n * 4).fill(0); // segment tree
    this.lazy = new Array(this.n * 4).fill(0); // Lazy propagation array
    this.build(nums, 0, 0, this.n - 1);
  }

  //-----------------------------------------------------------------------------
  //  Build Segment tree
  //-----------------------------------------------------------------------------
  build(nums, node, start, end) {
    if (start === end) {
      // Leaf nodes stores single element
      this.tree[node] = nums[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    // Build left and right subtrees
    this.build(nums, leftChild, start, mid);
    this.build(nums, rightChild, mid + 1, end);

    this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
  }

  //-----------------------------------------------------------------------------
  //  Push lazy value down to children
  //-----------------------------------------------------------------------------

  push(node, start, end) {
    if (this.lazy[node] !== 0) {
      // Apply pending update to current node
      this.tree[node] += (end - start + 1) * this.lazy[node];

      if (start !== end) {
        // Propagate lazy value to children
        const leftChild = 2 * node + 1;
        const rightChild = 2 * node + 2;
        this.lazy[leftChild] += this.lazy[node];
        this.lazy[rightChild] += this.lazy[node];
      }

      // Clear lazy value at current node
      this.lazy[node] = 0;
    }
  }

  //-----------------------------------------------------------------------------
  // Point update using lazy propagation structure
  //-----------------------------------------------------------------------------

  updateLazy(index, val, node = 0, start = 0, end = this.n - 1) {
    // Resolve pending updates
    this.push(node, start, end);

    if (start === end) {
      // Update leaf node
      this.tree[node] = val;
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    if (index <= mid) {
      this.update(index, val, leftChild, start, mid);
    } else {
      this.update(index, val, rightChild, mid + 1, end);
    }

    // Recalculate sum after update
    this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
  }

  // ========================================================================
  // Range sum query with lazy propagation
  // ========================================================================

  sumRange(left, right, node = 0, start = 0, end = this.n - 1) {
    // Resolve any pending updates
    this.push(node, start, end);

    // Case 1: Completely outside
    if (right < start || left > end) {
      return 0;
    }

    // Case 2: Completely inside
    if (left <= start && right >= end) {
      return this.tree[node];
    }

    // Case 3: Partial overlap
    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    return (
      this.sumRange(left, right, leftChild, start, mid) +
      this.sumRange(left, right, rightChild, mid + 1, end)
    );
  }
}
