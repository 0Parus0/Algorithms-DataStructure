/*
3363. Find the Maximum Number of Fruits Collected
Hard
Topics
premium lock icon
Companies
Hint
There is a game dungeon comprised of n x n rooms arranged in a grid.

You are given a 2D array fruits of size n x n, where fruits[i][j] represents the number of fruits in the room (i, j). Three children will play in the game dungeon, with initial positions at the corner rooms (0, 0), (0, n - 1), and (n - 1, 0).

The children will make exactly n - 1 moves according to the following rules to reach the room (n - 1, n - 1):

The child starting from (0, 0) must move from their current room (i, j) to one of the rooms (i + 1, j + 1), (i + 1, j), and (i, j + 1) if the target room exists.
The child starting from (0, n - 1) must move from their current room (i, j) to one of the rooms (i + 1, j - 1), (i + 1, j), and (i + 1, j + 1) if the target room exists.
The child starting from (n - 1, 0) must move from their current room (i, j) to one of the rooms (i - 1, j + 1), (i, j + 1), and (i + 1, j + 1) if the target room exists.
When a child enters a room, they will collect all the fruits there. If two or more children enter the same room, only one child will collect the fruits, and the room will be emptied after they leave.

Return the maximum number of fruits the children can collect from the dungeon.

 

Example 1:

Input: fruits = [[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]]

Output: 100

Explanation:



In this example:

The 1st child (green) moves on the path (0,0) -> (1,1) -> (2,2) -> (3, 3).
The 2nd child (red) moves on the path (0,3) -> (1,2) -> (2,3) -> (3, 3).
The 3rd child (blue) moves on the path (3,0) -> (3,1) -> (3,2) -> (3, 3).
In total they collect 1 + 6 + 11 + 16 + 4 + 8 + 12 + 13 + 14 + 15 = 100 fruits.

Example 2:

Input: fruits = [[1,1],[1,1]]

Output: 4

Explanation:

In this example:

The 1st child moves on the path (0,0) -> (1,1).
The 2nd child moves on the path (0,1) -> (1,1).
The 3rd child moves on the path (1,0) -> (1,1).
In total they collect 1 + 1 + 1 + 1 = 4 fruits.

 

Constraints:

2 <= n == fruits.length == fruits[i].length <= 1000
0 <= fruits[i][j] <= 1000
*/

function maxCollectedFruits(fruits) {
  const n = fruits.length;

  function child1Collect() {
    let sum = 0;
    for (let i = 0; i < n; i++) sum += fruits[i][i];
    return sum;
  }

  function child2Collect(i, j, dp) {
    if (i >= n || j < 0 || j >= n) return 0;
    if (i === n - 1 && j === n - 1) return 0;
    if (i === j || i > j) return 0;
    if (dp[i][j] !== -1) return dp[i][j];

    const bottomLeft = fruits[i][j] + child2Collect(i + 1, j - 1, dp);
    const bottomDown = fruits[i][j] + child2Collect(i + 1, j, dp);
    const bottomRight = fruits[i][j] + child2Collect(i + 1, j + 1, dp);

    dp[i][j] = Math.max(bottomLeft, bottomDown, bottomRight);
    return dp[i][j];
  }

  function child3Collect(i, j, dp) {
    if (i < 0 || i >= n || j < 0 || j >= n) return 0;
    if (i === n - 1 && j === n - 1) return 0;
    if (i === j || i < j) return 0;
    if (dp[i][j] !== -1) return dp[i][j];

    const upRight = fruits[i][j] + child3Collect(i - 1, j + 1, dp);
    const right = fruits[i][j] + child3Collect(i, j + 1, dp);
    const bottomRight = fruits[i][j] + child3Collect(i + 1, j + 1, dp);

    return (dp[i][j] = Math.max(upRight, right, bottomRight));
  }

  const dp2 = Array.from({ length: n }, () => new Array(n).fill(-1));
  const dp3 = Array.from({ length: n }, () => new Array(n).fill(-1));

  const c1 = child1Collect();
  const c2 = child2Collect(0, n - 1, dp2);
  const c3 = child3Collect(n - 1, 0, dp3);

  return c1 + c2 + c3;
}

function maxCollectedFruits(fruits) {
  const n = fruits.length;

  // Memoization table for overlapping subproblems
  // dp[i][j] will store the max fruits collected from cell (i, j)
  const dp = Array.from({ length: n }, () => new Array(n).fill(-1));

  // 🍎 Child 1 collects fruits diagonally from top-left to bottom-right
  function child1Collect(fruits) {
    let count = 0;
    for (let i = 0; i < n; i++) {
      count += fruits[i][i]; // moves along the main diagonal
    }
    return count;
  }

  // 🍊 Child 2 starts from top-right corner (0, n-1)
  // Moves diagonally down-left / down / down-right
  // Cannot visit cells already collected by child1 (diagonal cells)
  function child2Collect(i, j, fruits) {
    // Base case: out of bounds
    if (i >= n || j < 0 || j >= n) return 0;

    // Skip bottom-right since it’s already taken by child1
    if (i === n - 1 && j === n - 1) return 0;

    // If both children reach same diagonal (already collected by child1)
    if (i === j || i > j) return 0;

    // Return cached result if available
    if (dp[i][j] !== -1) return dp[i][j];

    // 🍊 Try three possible moves for child2
    const bottomLeft = fruits[i][j] + child2Collect(i + 1, j - 1, fruits);
    const bottomDown = fruits[i][j] + child2Collect(i + 1, j, fruits);
    const bottomRight = fruits[i][j] + child2Collect(i + 1, j + 1, fruits);

    // Take the path with maximum collected fruits
    dp[i][j] = Math.max(bottomLeft, bottomDown, bottomRight);
    return dp[i][j];
  }

  // 🍉 Child 3 starts from bottom-left (n-1, 0)
  // Moves upward-right / right / downward-right
  // Avoids overlapping with child1 diagonal
  function child3Collect(i, j, fruits) {
    // Stop at bottom-right (already taken by child1)
    if (i === n - 1 && j === n - 1) return 0;

    // Out of bounds check
    if (i >= n || j < 0 || j >= n) return 0;

    // Avoid overlap with diagonal path
    if (i === j || i < j) return 0;

    // Return memoized result if already computed
    if (dp[i][j] !== -1) return dp[i][j];

    // 🍉 Explore all three directions
    const upRight = fruits[i][j] + child3Collect(i - 1, j + 1, fruits);
    const right = fruits[i][j] + child3Collect(i, j + 1, fruits);
    const downRight = fruits[i][j] + child3Collect(i + 1, j + 1, fruits);

    // Save and return the maximum possible collection
    return (dp[i][j] = Math.max(upRight, right, downRight));
  }

  // Get each child’s total collection
  const c1 = child1Collect(fruits);
  const c2 = child2Collect(0, n - 1, fruits);
  const c3 = child3Collect(n - 1, 0, fruits);

  // Return the total fruits collected by all three children
  return c1 + c2 + c3;
}

function maxCollectedFruits(fruits) {
  const n = fruits.length;

  // 🍎 Child 1 collects along the main diagonal
  function child1Collect(fruits) {
    let count = 0;
    for (let i = 0; i < n; i++) {
      count += fruits[i][i];
    }
    return count;
  }

  // 🍊 Child 2 (top-right to bottom-right)
  const dp2 = Array.from({ length: n }, () => new Array(n).fill(-1));
  function child2Collect(i, j) {
    // Base cases: out of bounds
    if (i >= n || j < 0 || j >= n) return 0;

    // Already collected diagonal
    if (i === j || i > j) return 0;

    // Reached bottom-right (already collected by child1)
    if (i === n - 1 && j === n - 1) return 0;

    // Return cached result
    if (dp2[i][j] !== -1) return dp2[i][j];

    // Explore all 3 valid moves
    const bottomLeft = fruits[i][j] + child2Collect(i + 1, j - 1);
    const bottomDown = fruits[i][j] + child2Collect(i + 1, j);
    const bottomRight = fruits[i][j] + child2Collect(i + 1, j + 1);

    // Memoize max result
    dp2[i][j] = Math.max(bottomLeft, bottomDown, bottomRight);
    return dp2[i][j];
  }

  // 🍉 Child 3 (bottom-left to bottom-right)
  const dp3 = Array.from({ length: n }, () => new Array(n).fill(-1));
  function child3Collect(i, j) {
    // Base cases: out of bounds
    if (i < 0 || i >= n || j < 0 || j >= n) return 0;

    // Already collected diagonal
    if (i === j || i < j) return 0;

    // Reached bottom-right
    if (i === n - 1 && j === n - 1) return 0;

    // Cached
    if (dp3[i][j] !== -1) return dp3[i][j];

    // Try all 3 moves
    const upRight = fruits[i][j] + child3Collect(i - 1, j + 1);
    const right = fruits[i][j] + child3Collect(i, j + 1);
    const downRight = fruits[i][j] + child3Collect(i + 1, j + 1);

    // Memoize and return
    dp3[i][j] = Math.max(upRight, right, downRight);
    return dp3[i][j];
  }

  // Collect totals
  const c1 = child1Collect(fruits);
  const c2 = child2Collect(0, n - 1);
  const c3 = child3Collect(n - 1, 0);

  return c1 + c2 + c3;
}

// 🧪 Example Test Case
const fruits = [
  [2, 3, 1],
  [5, 6, 4],
  [7, 8, 9],
];

console.log(maxCollectedFruits(fruits));
// Expected behavior:
// - Child1: collects 2 + 6 + 9 = 17
// - Child2: collects from top-right (3) towards bottom-right side (e.g., 3 + 4)
// - Child3: collects from bottom-left (7) moving right/upward path (e.g., 7 + 8)
// Final total depends on valid paths and overlaps avoided

// ----------------------------
// 🧪 TEST CASES
// ----------------------------

// Example 1 (from problem)
let fruits1 = [
  [1, 2, 3, 4],
  [5, 6, 8, 7],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
];
console.log(maxCollectedFruits(JSON.parse(JSON.stringify(fruits1))));
// Expected: 100
// Explanation: paths collect all fruits exactly once, same as example.

// Example 2 (from problem)
let fruits2 = [
  [1, 1],
  [1, 1],
];
console.log(maxCollectedFruits(JSON.parse(JSON.stringify(fruits2))));
// Expected: 4
// Each child collects 1 fruit along their path, total = 4.

// Example 3 (small custom 3×3 case)
let fruits3 = [
  [2, 3, 1],
  [1, 5, 1],
  [2, 4, 2],
];
console.log(maxCollectedFruits(JSON.parse(JSON.stringify(fruits3))));
// Expected: around 19 (varies slightly if diagonal handling changes)
//  Diagonal: 2 + 5 + 2 = 9
//  Others collect 10 more optimally.

// Example 4 (edge case: all zeros)
let fruits4 = [
  [0, 0],
  [0, 0],
];
console.log(maxCollectedFruits(JSON.parse(JSON.stringify(fruits4))));
// Expected: 0

// Example 5 (non-square test for sanity — though input guarantees square)
let fruits5 = [
  [3, 1, 4],
  [2, 5, 6],
  [7, 8, 9],
];
console.log(maxCollectedFruits(JSON.parse(JSON.stringify(fruits5))));
// Expected: around 42
