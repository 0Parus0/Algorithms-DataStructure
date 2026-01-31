/*
2471. Minimum Number of Operations to Sort a Binary Tree by Level
Medium
Topics
premium lock icon
Companies
Hint
You are given the root of a binary tree with unique values.

In one operation, you can choose any two nodes at the same level and swap their values.

Return the minimum number of operations needed to make the values at each level sorted in a strictly increasing order.

The level of a node is the number of edges along the path between it and the root node.

 

Example 1:


Input: root = [1,4,3,7,6,8,5,null,null,null,null,9,null,10]
Output: 3
Explanation:
- Swap 4 and 3. The 2nd level becomes [3,4].
- Swap 7 and 5. The 3rd level becomes [5,6,8,7].
- Swap 8 and 7. The 3rd level becomes [5,6,7,8].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
Example 2:


Input: root = [1,3,2,7,6,5,4]
Output: 3
Explanation:
- Swap 3 and 2. The 2nd level becomes [2,3].
- Swap 7 and 4. The 3rd level becomes [4,6,5,7].
- Swap 6 and 5. The 3rd level becomes [4,5,6,7].
We used 3 operations so return 3.
It can be proven that 3 is the minimum number of operations needed.
Example 3:


Input: root = [1,2,3,4,5,6]
Output: 0
Explanation: Each level is already sorted in increasing order so return 0.
 

Constraints:

The number of nodes in the tree is in the range [1, 105].
1 <= Node.val <= 105
All the values of the tree are unique.
*/
var minimumOperations = function (root) {
  if (!root) return 0;

  let totalSwaps = 0;
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const levelVals = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      levelVals.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Calculate swaps for this level
    totalSwaps += countSwaps(levelVals);
  }

  return totalSwaps;
};

function countSwaps(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const indexMap = new Map();

  // Create mapping from value to index in sorted array
  for (let i = 0; i < sorted.length; i++) {
    indexMap.set(sorted[i], i);
  }

  const visited = new Array(arr.length).fill(false);
  let swaps = 0;

  for (let i = 0; i < arr.length; i++) {
    if (visited[i] || indexMap.get(arr[i]) === i) {
      continue;
    }

    // Follow the cycle
    let cycleSize = 0;
    let j = i;

    while (!visited[j]) {
      visited[j] = true;
      j = indexMap.get(arr[j]);
      cycleSize++;
    }

    if (cycleSize > 1) {
      swaps += cycleSize - 1;
    }
  }

  return swaps;
}

function countSwaps1(arr) {
  let swaps = 0;
  const sortedArr = [...arr].sort((a, b) => a - b);
  const mp = new Map();
  for (let i = 0; i < arr.length; i++) {
    mp.set(arr[i], i);
  }

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === sortedArr[i]) continue;

    let currIdx = mp.get(sortedArr[i]);
    mp.set(arr[currIdx], i);
    [arr[i], arr[currIdx]] = [arr[currIdx], arr[i]];
    swaps++;
  }

  return swaps;
}

/*
Plan
1. Rephrase the Problem
We have a binary tree with unique node values. We can swap values between any two nodes at the same level. We need to find the minimum number of swaps needed to make each level's values sorted in strictly increasing order.

2. Inputs and Outputs
Input:

root: Root of binary tree with unique values

Output:

Minimum number of swaps needed to sort all levels

3. Data Structures
BFS/Level-order traversal: To get nodes by level

Graph/Array: To track swaps needed per level

Cycle detection: To count minimum swaps for array sorting

4. Approach
Intuition:
This problem reduces to: For each level, we have an array of values. We need minimum swaps to sort it. Since we can swap any two elements in the array, this is a classic problem: minimum swaps to sort array.

Key Insight:
For array sorting with swaps:

Create sorted version of array

Map each value to its target position

Find cycles in the permutation

Minimum swaps = sum of (cycle_size - 1) for all cycles

Algorithm:

BFS to collect values at each level

For each level:

Get current values array

Create sorted version

Create mapping: value → target index in sorted array

Find cycles in permutation

Add (cycle_size - 1) to total swaps

Return total swaps

5. Edge Cases
Single node tree: 0 swaps

Already sorted levels: 0 swaps per level

Level with 2 elements: either 0 or 1 swap

Large levels with many cycles

All values in wrong order (worst case)

6. Time and Space Complexity
Time: O(n log n) for sorting each level

Space: O(n) for storing level arrays
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minimumOperations = function (root) {
  if (!root) return 0;

  let totalSwaps = 0;
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const levelValues = [];

    // Collect values at current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelValues.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Calculate minimum swaps needed for this level
    totalSwaps += minSwapsToSort(levelValues);
  }

  return totalSwaps;
};

// Helper function: minimum swaps to sort array
function minSwapsToSort(arr) {
  const n = arr.length;

  // Create array of [value, original_index] pairs
  const arrPos = arr.map((value, index) => [value, index]);

  // Sort by value
  arrPos.sort((a, b) => a[0] - b[0]);

  // Track visited elements
  const visited = new Array(n).fill(false);
  let swaps = 0;

  // Find cycles in the permutation
  for (let i = 0; i < n; i++) {
    // If already visited or in correct position, skip
    if (visited[i] || arrPos[i][1] === i) {
      continue;
    }

    // Find cycle size
    let cycleSize = 0;
    let j = i;

    while (!visited[j]) {
      visited[j] = true;
      j = arrPos[j][1]; // Move to original position of current element
      cycleSize++;
    }

    // Add swaps for this cycle
    if (cycleSize > 1) {
      swaps += cycleSize - 1;
    }
  }

  return swaps;
}

// Optimized Solution (Map-based):
var minimumOperations = function (root) {
  if (!root) return 0;

  let totalSwaps = 0;
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const levelVals = [];

    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      levelVals.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Calculate swaps for this level
    totalSwaps += countSwaps(levelVals);
  }

  return totalSwaps;
};

function countSwaps(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const indexMap = new Map();

  // Create mapping from value to index in sorted array
  for (let i = 0; i < sorted.length; i++) {
    indexMap.set(sorted[i], i);
  }

  const visited = new Array(arr.length).fill(false);
  let swaps = 0;

  for (let i = 0; i < arr.length; i++) {
    if (visited[i] || indexMap.get(arr[i]) === i) {
      continue;
    }

    // Follow the cycle
    let cycleSize = 0;
    let j = i;

    while (!visited[j]) {
      visited[j] = true;
      j = indexMap.get(arr[j]);
      cycleSize++;
    }

    if (cycleSize > 1) {
      swaps += cycleSize - 1;
    }
  }

  return swaps;
}

// Alternative: Using Object for Index Mapping
var minimumOperations = function (root) {
  let operations = 0;
  const queue = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const currentLevel = [];

    // Build current level
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Calculate swaps for this level
    operations += calculateMinSwaps(currentLevel);
  }

  return operations;
};

function calculateMinSwaps(level) {
  const n = level.length;
  const sortedLevel = [...level].sort((a, b) => a - b);

  // Create value to target index mapping
  const position = {};
  for (let i = 0; i < n; i++) {
    position[sortedLevel[i]] = i;
  }

  const visited = new Array(n).fill(false);
  let swaps = 0;

  for (let i = 0; i < n; i++) {
    if (visited[i] || position[level[i]] === i) {
      continue;
    }

    let cycleLength = 0;
    let j = i;

    while (!visited[j]) {
      visited[j] = true;
      j = position[level[j]];
      cycleLength++;
    }

    swaps += cycleLength - 1;
  }

  return swaps;
}

/**
 * PLAN:
 * 1. Rephrase the problem:
 *    We are given a binary tree. At each level, we can swap values of any two nodes
 *    on that level. Our goal is to make values at every level strictly increasing
 *    using the minimum number of swaps.
 *
 * 2. Inputs and Outputs:
 *    Input:
 *      - root: TreeNode (binary tree root with unique values)
 *    Output:
 *      - number: minimum swaps required
 *
 * 3. Data Structures:
 *    - Queue (for level order traversal)
 *    - Array (to store values at each level)
 *    - Map / Array (to track index positions for swap calculation)
 *
 * 4. Approach:
 *    Intuition:
 *    - Since swaps are allowed only within the same level, each level can be
 *      processed independently.
 *    - For each level, the problem reduces to:
 *        "Minimum number of swaps to sort an array"
 *
 *    Steps:
 *    - Perform BFS to traverse the tree level by level
 *    - For each level:
 *        - Collect node values
 *        - Calculate minimum swaps needed to sort the array
 *    - Sum the swaps across all levels
 *
 * 5. Edge Cases:
 *    - Tree with only one node → 0 swaps
 *    - Levels already sorted → 0 swaps
 *
 * 6. Time and Space Complexity:
 *    - Time: O(n log n)
 *      (Each level sorting dominates, total nodes = n)
 *    - Space: O(n)
 *      (Queue + arrays for level values)
 *
 * 7. Commit Message:
 *    "Solve level-wise sorting using BFS and minimum swap cycle detection"
 */

var minimumOperations = function (root) {
  if (!root) return 0;

  let totalSwaps = 0;
  const queue = [root];

  while (queue.length) {
    const size = queue.length;
    const levelValues = [];

    // Collect values for current level
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      levelValues.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Count swaps needed to sort this level
    totalSwaps += minSwapsToSort(levelValues);
  }

  return totalSwaps;
};

/**
 * Helper function to calculate minimum swaps to sort an array
 */
function minSwapsToSort(arr) {
  const n = arr.length;
  const sorted = [...arr].sort((a, b) => a - b);

  // Map value -> index in sorted array
  const indexMap = new Map();
  for (let i = 0; i < n; i++) {
    indexMap.set(sorted[i], i);
  }

  const visited = new Array(n).fill(false);
  let swaps = 0;

  for (let i = 0; i < n; i++) {
    if (visited[i] || indexMap.get(arr[i]) === i) continue;

    let cycleSize = 0;
    let j = i;

    while (!visited[j]) {
      visited[j] = true;
      j = indexMap.get(arr[j]);
      cycleSize++;
    }

    if (cycleSize > 1) {
      swaps += cycleSize - 1;
    }
  }

  return swaps;
}
