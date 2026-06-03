class SegmentTreeMaxIndex {
  constructor(arr) {
    this.n = arr.length;
    this.arr = [...arr];

    // Segment tree to store indices
    // Each node stores the index of max element in it's segment
    this.tree = new Array(4 * this.n).fill(0);

    this.build(0, 0, this.n - 1);
  }

  /**
   * Builds segment tree recursively
   * @param {number} i - Current node index
   * @param {number} l - Start index of segment
   * @param {number} r - End index of segment
   */
  build(i, l, r) {
    // Base case: leaf node
    if (l === r) {
      this.tree[i] = l; // Store index, not value
      return;
    }

    const mid = Math.floor((l + r) / 2);
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;

    // Recursively build left and right subtrees
    this.build(leftChild, l, mid);
    this.build(rightChild, mid + 1, r);

    // Compare values at indices from left and right children
    const leftIdx = this.tree[leftChild];
    const rightIdx = this.tree[rightChild];

    // Choose index with larger value
    // If values are equal, choose smaller index
    if (this.arr[leftIdx] > this.arr[rightIdx]) {
      this.tree[i] = leftIdx;
    } else if (this.arr[leftIdx] < this.arr[rightIdx]) {
      this.tree[i] = rightIdx;
    } else {
      // values are equal, choose smaller index
      this.tree[i] = Math.min(leftIdx, rightIdx);
    }
  }

  query(start, end, i = 0, l = 0, r = this.n - 1) {
    // Case 1: Segment completely outside query range
    if (r < start || l > end) {
      return -1; // Invalid index
    }

    // Case 2: Segment completely inside query range
    if (l <= start && r >= end) {
      return this.tree[i];
    }

    // Case 3: Segment partially overlaps with query range
    const mid = Math.floor((l + r) / 2);
    const leftChild = 2 * i + 1;
    const rightChild = 2 * i + 2;

    const leftIdx = this.query(start, end, leftChild, l, mid);
    const rightIdx = this.query(start, end, rightChild, mid + 1, r);

    // If one side is invalid, return the other
    if (leftIdx === -1) return rightIdx;
    if (rightIdx === -1) return leftIdx;

    // Compare values at indices
    return Math.max(this.arr[leftIdx], this.arr[rightIdx]);
  }

  update(index, val) {
    this.arr[index] = val; // Update original array
    this.updateHelper(0, 0, this.n - 1, index);
  }

  /**
   * Recursive update helper
   */
  updateHelper(node, start, end, index) {
    // Base case: leaf node
    if (start === end) {
      // Leaf node, already points to index
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;

    // Go to left or right child
    if (index <= mid) {
      this.updateHelper(leftChild, start, mid, index);
    } else {
      this.updateHelper(rightChild, mid + 1, end, index);
    }

    // Update current node
    const leftIdx = this.tree[leftChild];
    const rightIdx = this.tree[rightChild];

    if (this.arr[leftIdx] > this.arr[rightIdx]) {
      this.tree[node] = leftIdx;
    } else if (this.arr[leftIdx] < this.arr[rightIdx]) {
      this.tree[node] = rightIdx;
    } else {
      // Values are equal, choose smaller index
      this.tree[node] = Math.min(leftIdx, rightIdx);
    }
  }

  /**
   * Utility method to get value at index
   * @param {number} index - Index to get value from
   * @returns {number} - Value at index
   */
  getValue(index) {
    return this.arr[index];
  }
}

// ======================== Testing ========================

console.log("Test Case 1: Simple array");
const arr1 = [1, 8, 5, 9, 6, 14, 2, 4, 3, 7];
const st1 = new SegmentTreeMaxIndex(arr1);

console.log("Array:", arr1);
console.log(
  "Indices:",
  arr1.map((_, i) => i),
);

const queries1 = [
  [0, 4], // [1, 8, 5, 9, 6] - max=9 at index 3
  [3, 7], // [9, 6, 14, 2, 4] - max=14 at index 5
  [1, 6], // [8, 5, 9, 6, 14, 2] - max=14 at index 5
  [2, 5], // [5, 9, 6, 14] - max=14 at index 5
  [0, 8], // entire except last - max=14 at index 5
];

queries1.forEach(([l, r], idx) => {
  const maxIdx = st1.query(l, r);
  console.log(
    `Query ${idx + 1}: [${l}, ${r}] => Max index = ${maxIdx}, Value = ${arr1[maxIdx]}`,
  );
});

console.log("\n" + "=".repeat(60) + "\n");

console.log("Test Case 2: Array with duplicate maximum values");
const arr2 = [5, 2, 8, 8, 3, 8, 1, 4];
const st2 = new SegmentTreeMaxIndex(arr2);
console.log(st2.tree);

console.log("Array:", arr2);
console.log(
  "Indices:",
  arr2.map((_, i) => i),
);

const queries2 = [
  [0, 3], // [5, 2, 8, 8] - max=8 at smallest index 2
  [2, 5], // [8, 8, 3, 8] - max=8 at smallest index 2
  [3, 6], // [8, 3, 8, 1] - max=8 at smallest index 3
  [0, 7], // entire array - max=8 at smallest index 2
  [4, 7], // [3, 8, 1, 4] - max=8 at index 5
];

queries2.forEach(([l, r], idx) => {
  const maxIdx = st2.query(l, r);
  console.log(
    `Query ${idx + 1}: [${l}, ${r}] => Max index = ${maxIdx}, Value = ${arr2[maxIdx]}`,
  );
});

console.log("\n" + "=".repeat(60) + "\n");

console.log("Test Case 3: With updates");
const arr3 = [1, 3, 5, 7, 9];
const st3 = new SegmentTreeMaxIndex(arr3);

console.log("Initial array:", arr3);
console.log(
  "Query [0, 4]: Max index =",
  st3.query(0, 4),
  ", Value =",
  arr3[st3.query(0, 4)],
);

// Update index 4 from 9 to 2
console.log("\nUpdating index 4 from 9 to 2...");
st3.update(4, 2);
console.log("Array after update:", arr3);
console.log(
  "Query [0, 4]: Max index =",
  st3.query(0, 4),
  ", Value =",
  arr3[st3.query(0, 4)],
);

// Update index 0 from 1 to 10
console.log("\nUpdating index 0 from 1 to 10...");
st3.update(0, 10);
console.log("Array after update:", arr3);
console.log(
  "Query [0, 4]: Max index =",
  st3.query(0, 4),
  ", Value =",
  arr3[st3.query(0, 4)],
);
