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
  //dp[i][j] = max fruits collected till [i][j] from source
  const dp = Array.from({ length: n }, () => new Array(n).fill(0));

  // Child1Collect - Diagonal elements
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += fruits[i][i];
  }

  // Before child2 and child3, nullify the cells which can't be visited by child2 and child3

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i < j && i + j < n - 1) {
        dp[i][j] = 0;
      } else if (i > j && i + j < n - 1) {
        dp[i][j] = 0;
      } else {
        dp[i][j] = fruits[i][j];
      }
    }
  }

  // child2 collect fruits
  // cells upper than diagonal : i < j
  for (let i = 1; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      dp[i][j] += Math.max(
        dp[i - 1][j - 1],
        dp[i - 1][j],
        j + 1 < n ? dp[i - 1][j + 1] : 0
      );
    }
  }

  // child3 collect fruits
  // cells lower than the diagonal : i > j
  for (let j = 1; j < n; j++) {
    for (let i = j + 1; i < n; i++) {
      dp[i][j] += Math.max(
        dp[i - 1][j - 1],
        dp[i][j - 1],
        i + 1 < n ? dp[i + 1][j - 1] : 0
      );
    }
  }

  return result + dp[n - 2][n - 1] + dp[n - 1][n - 2];
}

/*
🧮 Complexity
Aspect	Complexity
Time	O(n²)
Space	O(n²) 
*/

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
const counterExample = [
  [10, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 10],
];

console.log("Counterexample result:", maxCollectedFruits(counterExample));
// Your code will give >20, but correct answer is exactly 20
// (only diagonal has fruits, no other valid paths)
