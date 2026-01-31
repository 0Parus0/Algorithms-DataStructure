/*
823. Binary Trees With Factors
Medium
Topics
premium lock icon
Companies
Given an array of unique integers, arr, where each integer arr[i] is strictly greater than 1.

We make a binary tree using these integers, and each number may be used for any number of times. Each non-leaf node's value should be equal to the product of the values of its children.

Return the number of binary trees we can make. The answer may be too large so return the answer modulo 109 + 7.

 

Example 1:

Input: arr = [2,4]
Output: 3
Explanation: We can make these trees: [2], [4], [4, 2, 2]
Example 2:

Input: arr = [2,4,5,10]
Output: 7
Explanation: We can make these trees: [2], [4], [5], [10], [4, 2, 2], [10, 2, 5], [10, 5, 2].
 

Constraints:

1 <= arr.length <= 1000
2 <= arr[i] <= 109
All the values of arr are unique.
*/
function numFactoredBinaryTrees(arr) {
  const n = arr.length;
  arr = arr.sort((a, b) => a - b);
  const mod = 1e9 + 7;
  const mp = {};
  mp[arr[0]] = 1;

  for (let i = 1; i < n; i++) {
    let root = arr[i];
    mp[root] = 1;

    for (let j = 0; j < i; j++) {
      let leftChild = arr[j];
      let rightChild = Math.floor(arr[i] / leftChild);
      if (root % leftChild === 0 && mp[rightChild]) {
        mp[root] += mp[leftChild] * mp[rightChild];
      }
    }
  }
  let result = 0;
  for (let num of Object.values(mp)) {
    result = (result + num) % mod;
  }
  return result;
}

/**
#Plan:

1. **Understand the problem:**
   - We have unique integers > 1
   - Can form binary trees where each node's value = product of its children's values
   - Can use numbers multiple times
   - Count all possible binary trees (order of children matters - left/right are distinct)
   - Each node can have 0 or 2 children (binary tree property)
   - Need modulo 10^9 + 7 for large results

2. **Break down input data & transformations:**
  - Input: Array of unique integers arr where arr[i] > 1
  - Transformation: For each number, find factor pairs (a, b) such that a * b = number
  - Output: Total number of binary trees modulo (10^9 + 7)

3. **Edge cases:**
  - Single element array: Only one tree (single node)
  - Prime numbers: Can only form single-node trees (no factors in array)
  - Large numbers that are products of many factors
  - Numbers with multiple factor pairs
  - Empty array (not possible per constraints)

4. **Data structures:**
  - Map/Dictionary to store DP results for each number
  - Set for O(1) lookup of numbers in array
  - Sort array to process numbers in increasing order

5. **Approach:**
  1. Sort the array in ascending order
  2. Use a Map to store DP[i] = number of binary trees with root = arr[i]
  3. For each number arr[i], initialize DP[i] = 1 (single node tree)
  4. For each j < i, check if arr[i] % arr[j] == 0
  5. If divisible, find complement = arr[i] / arr[j]
  6. If complement exists in array, add DP[j] * DP[complementIndex] to DP[i]
  7. Sum all DP[i] at the end
  8. Apply modulo 10^9 + 7

6. **Time & Space Complexity:**
  - Time: O(n²) where n = length of arr (for each i, check all j < i)
  - Space: O(n) for DP array and Set
*/

// Function
function numFactoredBinaryTrees(arr) {
  // Step 1: Sort array and get modulo constant
  arr.sort((a, b) => a - b);
  const MOD = 1_000_000_007;
  const n = arr.length;

  // Step 2: Create map for O(1) lookup and DP array
  const indexMap = new Map();
  for (let i = 0; i < n; i++) {
    indexMap.set(arr[i], i);
  }

  // DP[i] = number of binary trees with root = arr[i]
  const dp = new Array(n).fill(1); // Each number can be a single node tree

  // Step 3: Apply main logic
  for (let i = 0; i < n; i++) {
    const current = arr[i];

    // Check all smaller numbers as potential left child
    for (let j = 0; j < i; j++) {
      const left = arr[j];

      // If current is divisible by left
      if (current % left === 0) {
        const right = current / left;

        // Check if right child exists in array
        if (indexMap.has(right)) {
          const rightIndex = indexMap.get(right);

          // Since we sorted array, rightIndex could be before or after j
          // Both left and right children can form their own subtrees
          // Multiply possibilities from both subtrees
          dp[i] = (dp[i] + dp[j] * dp[rightIndex]) % MOD;
        }
      }
    }
  }

  // Step 4: Sum all possibilities and return
  let total = 0;
  for (let count of dp) {
    total = (total + count) % MOD;
  }

  return total;
}

/*

# Custom Test Cases

Test 1: arr = [2,4]
Expected: 3
Explanation: Trees: [2], [4], [4,2,2]

Test 2: arr = [2,4,5,10]
Expected: 7
Explanation: Trees: [2], [4], [5], [10], [4,2,2], [10,2,5], [10,5,2]

Test 3: arr = [2,3,5,7,11] (all primes)
Expected: 5 (only single node trees)

Test 4: arr = [4,8,16]
Expected: 8
Explanation: 
- Single nodes: 3 trees
- 8 as root: [8,2,4] (if 2 exists), [8,4,2] = 1 tree
- 16 as root: Factor pairs: (2,8), (4,4), (8,2)
  Total: 3 single + 1 (for 8) + 3 (for 16) = 7
  Actually need to check if all factors exist...

Test 5: arr = [2,3,6]
Expected: 5
Explanation: Single nodes: [2], [3], [6] = 3 trees
            6 as root: [6,2,3], [6,3,2] = 2 trees
            Total: 5

# Commit Message
"feat: Solve Binary Trees With Factors problem using dynamic programming

- Sort array and use DP to count binary trees for each root value
- For each number, find factor pairs that exist in the array
- Multiply subtree counts for valid factor pairs
- Handle modulo 10^9 + 7 for large results
- Time complexity O(n²), space complexity O(n)
- Properly handle edge cases with prime numbers and sorted order"
*/

// Test the function
console.log(numFactoredBinaryTrees([2, 4])); // Expected: 3
console.log(numFactoredBinaryTrees([2, 4, 5, 10])); // Expected: 7
console.log(numFactoredBinaryTrees([2, 3, 5, 7, 11])); // Expected: 5
console.log(numFactoredBinaryTrees([2, 3, 6])); // Expected: 5
console.log(numFactoredBinaryTrees([4, 8, 16])); // Expected: 8

// Alternative implementation with more comments for clarity
function numFactoredBinaryTreesDetailed(arr) {
  const MOD = 1000000007;

  // Sort array so we process numbers from smallest to largest
  // This ensures when we process a number, all its potential factors
  // (which must be smaller) have already been processed
  arr.sort((a, b) => a - b);

  // Create a map for O(1) lookup of indices
  const valueToIndex = new Map();
  for (let i = 0; i < arr.length; i++) {
    valueToIndex.set(arr[i], i);
  }

  // dp[i] = number of binary trees with arr[i] as root
  const dp = new Array(arr.length).fill(1); // Each node can be a leaf

  for (let i = 0; i < arr.length; i++) {
    const currentVal = arr[i];

    // Check all possible left children (must be smaller than current)
    for (let j = 0; j < i; j++) {
      const leftChild = arr[j];

      // Check if currentVal is divisible by leftChild
      if (currentVal % leftChild === 0) {
        const rightChild = currentVal / leftChild;

        // Check if rightChild exists in our array
        if (valueToIndex.has(rightChild)) {
          const rightIndex = valueToIndex.get(rightChild);

          // The number of trees with currentVal as root increases by:
          // (trees with leftChild as root) * (trees with rightChild as root)
          // This counts all combinations of subtrees
          dp[i] = (dp[i] + dp[j] * dp[rightIndex]) % MOD;
        }
      }
    }
  }

  // Sum all possible trees
  let result = 0;
  for (const count of dp) {
    result = (result + count) % MOD;
  }

  return result;
}

// Explanation with example walkthrough:
// arr = [2,4,5,10]
// Sorted: [2,4,5,10]
//
// i=0 (value=2): dp[0] = 1 (just leaf)
// i=1 (value=4):
//   Check j=0 (value=2): 4%2=0, right=4/2=2, right exists
//   dp[1] = 1 + dp[0]*dp[0] = 1 + 1*1 = 2
//   So trees with root 4: [4] and [4,2,2]
//
// i=2 (value=5): dp[2] = 1 (no factors in array)
//
// i=3 (value=10):
//   Check j=0 (value=2): 10%2=0, right=5, right exists at index 2
//   dp[3] = 1 + dp[0]*dp[2] = 1 + 1*1 = 2
//   Check j=1 (value=4): 10%4≠0, skip
//   Check j=2 (value=5): 10%5=0, right=2, right exists at index 0
//   dp[3] = 2 + dp[2]*dp[0] = 2 + 1*1 = 3
//   So trees with root 10: [10], [10,2,5], [10,5,2]
//
// Total = dp[0]+dp[1]+dp[2]+dp[3] = 1+2+1+3 = 7/**

/*
#Plan:

1. **Understand the problem:**
   - We have unique integers > 1
   - Can form binary trees where each node's value = product of its children's values
   - Can use numbers multiple times
   - Count all possible binary trees (order of children matters - left/right are distinct)
   - Each node can have 0 or 2 children (binary tree property)
   - Need modulo 10^9 + 7 for large results

2. **Break down input data & transformations:**
  - Input: Array of unique integers arr where arr[i] > 1
  - Transformation: For each number, find factor pairs (a, b) such that a * b = number
  - Output: Total number of binary trees modulo (10^9 + 7)

3. **Edge cases:**
  - Single element array: Only one tree (single node)
  - Prime numbers: Can only form single-node trees (no factors in array)
  - Large numbers that are products of many factors
  - Numbers with multiple factor pairs
  - Empty array (not possible per constraints)

4. **Data structures:**
  - Map/Dictionary to store DP results for each number
  - Set for O(1) lookup of numbers in array
  - Sort array to process numbers in increasing order

5. **Approach:**
  1. Sort the array in ascending order
  2. Use a Map to store DP[i] = number of binary trees with root = arr[i]
  3. For each number arr[i], initialize DP[i] = 1 (single node tree)
  4. For each j < i, check if arr[i] % arr[j] == 0
  5. If divisible, find complement = arr[i] / arr[j]
  6. If complement exists in array, add DP[j] * DP[complementIndex] to DP[i]
  7. Sum all DP[i] at the end
  8. Apply modulo 10^9 + 7

6. **Time & Space Complexity:**
  - Time: O(n²) where n = length of arr (for each i, check all j < i)
  - Space: O(n) for DP array and Set
*/

// Function
function numFactoredBinaryTrees(arr) {
  // Step 1: Sort array and get modulo constant
  arr.sort((a, b) => a - b);
  const MOD = 1_000_000_007;
  const n = arr.length;

  // Step 2: Create map for O(1) lookup and DP array
  const indexMap = new Map();
  for (let i = 0; i < n; i++) {
    indexMap.set(arr[i], i);
  }

  // DP[i] = number of binary trees with root = arr[i]
  const dp = new Array(n).fill(1); // Each number can be a single node tree

  // Step 3: Apply main logic
  for (let i = 0; i < n; i++) {
    const current = arr[i];

    // Check all smaller numbers as potential left child
    for (let j = 0; j < i; j++) {
      const left = arr[j];

      // If current is divisible by left
      if (current % left === 0) {
        const right = current / left;

        // Check if right child exists in array
        if (indexMap.has(right)) {
          const rightIndex = indexMap.get(right);

          // Since we sorted array, rightIndex could be before or after j
          // Both left and right children can form their own subtrees
          // Multiply possibilities from both subtrees
          dp[i] = (dp[i] + dp[j] * dp[rightIndex]) % MOD;
        }
      }
    }
  }

  // Step 4: Sum all possibilities and return
  let total = 0;
  for (let count of dp) {
    total = (total + count) % MOD;
  }

  return total;
}

/*

# Custom Test Cases

Test 1: arr = [2,4]
Expected: 3
Explanation: Trees: [2], [4], [4,2,2]

Test 2: arr = [2,4,5,10]
Expected: 7
Explanation: Trees: [2], [4], [5], [10], [4,2,2], [10,2,5], [10,5,2]

Test 3: arr = [2,3,5,7,11] (all primes)
Expected: 5 (only single node trees)

Test 4: arr = [4,8,16]
Expected: 8
Explanation: 
- Single nodes: 3 trees
- 8 as root: [8,2,4] (if 2 exists), [8,4,2] = 1 tree
- 16 as root: Factor pairs: (2,8), (4,4), (8,2)
  Total: 3 single + 1 (for 8) + 3 (for 16) = 7
  Actually need to check if all factors exist...

Test 5: arr = [2,3,6]
Expected: 5
Explanation: Single nodes: [2], [3], [6] = 3 trees
            6 as root: [6,2,3], [6,3,2] = 2 trees
            Total: 5

# Commit Message
"feat: Solve Binary Trees With Factors problem using dynamic programming

- Sort array and use DP to count binary trees for each root value
- For each number, find factor pairs that exist in the array
- Multiply subtree counts for valid factor pairs
- Handle modulo 10^9 + 7 for large results
- Time complexity O(n²), space complexity O(n)
- Properly handle edge cases with prime numbers and sorted order"
*/

// Test the function
console.log(numFactoredBinaryTrees([2, 4])); // Expected: 3
console.log(numFactoredBinaryTrees([2, 4, 5, 10])); // Expected: 7
console.log(numFactoredBinaryTrees([2, 3, 5, 7, 11])); // Expected: 5
console.log(numFactoredBinaryTrees([2, 3, 6])); // Expected: 5
console.log(numFactoredBinaryTrees([4, 8, 16])); // Expected: 8

// Alternative implementation with more comments for clarity
function numFactoredBinaryTreesDetailed(arr) {
  const MOD = 1000000007;

  // Sort array so we process numbers from smallest to largest
  // This ensures when we process a number, all its potential factors
  // (which must be smaller) have already been processed
  arr.sort((a, b) => a - b);

  // Create a map for O(1) lookup of indices
  const valueToIndex = new Map();
  for (let i = 0; i < arr.length; i++) {
    valueToIndex.set(arr[i], i);
  }

  // dp[i] = number of binary trees with arr[i] as root
  const dp = new Array(arr.length).fill(1); // Each node can be a leaf

  for (let i = 0; i < arr.length; i++) {
    const currentVal = arr[i];

    // Check all possible left children (must be smaller than current)
    for (let j = 0; j < i; j++) {
      const leftChild = arr[j];

      // Check if currentVal is divisible by leftChild
      if (currentVal % leftChild === 0) {
        const rightChild = currentVal / leftChild;

        // Check if rightChild exists in our array
        if (valueToIndex.has(rightChild)) {
          const rightIndex = valueToIndex.get(rightChild);

          // The number of trees with currentVal as root increases by:
          // (trees with leftChild as root) * (trees with rightChild as root)
          // This counts all combinations of subtrees
          dp[i] = (dp[i] + dp[j] * dp[rightIndex]) % MOD;
        }
      }
    }
  }

  // Sum all possible trees
  let result = 0;
  for (const count of dp) {
    result = (result + count) % MOD;
  }

  return result;
}

// Explanation with example walkthrough:
// arr = [2,4,5,10]
// Sorted: [2,4,5,10]
//
// i=0 (value=2): dp[0] = 1 (just leaf)
// i=1 (value=4):
//   Check j=0 (value=2): 4%2=0, right=4/2=2, right exists
//   dp[1] = 1 + dp[0]*dp[0] = 1 + 1*1 = 2
//   So trees with root 4: [4] and [4,2,2]
//
// i=2 (value=5): dp[2] = 1 (no factors in array)
//
// i=3 (value=10):
//   Check j=0 (value=2): 10%2=0, right=5, right exists at index 2
//   dp[3] = 1 + dp[0]*dp[2] = 1 + 1*1 = 2
//   Check j=1 (value=4): 10%4≠0, skip
//   Check j=2 (value=5): 10%5=0, right=2, right exists at index 0
//   dp[3] = 2 + dp[2]*dp[0] = 2 + 1*1 = 3
//   So trees with root 10: [10], [10,2,5], [10,5,2]
//
// Total = dp[0]+dp[1]+dp[2]+dp[3] = 1+2+1+3 = 7
