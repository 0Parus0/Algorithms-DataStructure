/*
Shortest Source to Destination Path
Difficulty: MediumAccuracy: 24.69%Submissions: 123K+Points: 4
Given a 2D binary matrix A(0-based index) of dimensions NxM. Find the minimum number of steps required to reach from (0,0) to (X, Y).
Note: You can only move left, right, up and down, and only through cells that contain 1.

Example 1:

Input:
N=3, M=4
A=[[1,0,0,0], 
   [1,1,0,1],
   [0,1,1,1]]
X=2, Y=3 
Output:
5
Explanation:
The shortest path is as follows:
(0,0)->(1,0)->(1,1)->(2,1)->(2,2)->(2,3).
Example 2:

Input:
N=3, M=4
A=[[1,1,1,1],
   [0,0,0,1],
   [0,0,0,1]]
X=0, Y=3
Output:
3
Explanation:
The shortest path is as follows:
(0,0)->(0,1)->(0,2)->(0,3).
Your Task:
You don't need to read input or print anything. Your task is to complete the function shortestDistance() which takes the integer N, M, X, Y, and the 2D binary matrix A as input parameters and returns the minimum number of steps required to go from (0,0) to (X, Y).If it is impossible to go from (0,0) to (X, Y),then function returns -1. If value of the cell (0,0) is 0 (i.e  A[0][0]=0) then return -1.

Constraints:
1 <= N,M <= 250
0 <= X < N
0 <= Y < M
0 <= A[i][j] <= 1
*/

/**
 * @param {number} N
 * @param {number} M
 * @param {number} X
 * @param {number} Y
 * @param {number[][]} A
 * @return {number}
 */

function shortestDistance(N, M, X, Y, A) {
  // Edge Cases: if starting or ending cell is blocked
  if (A[0][0] === 0 || A[X][Y] === 0) return -1;
  if (X === 0 && Y === 0) return 0;

  // Row & Col moves -> up, down, left, right
  const row = [-1, 1, 0, 0];
  const col = [0, 0, -1, 1];

  // Helper: check if cell is inside grid & walkable
  function isValid(i, j) {
    return i >= 0 && i < N && j >= 0 && j < M && A[i][j] === 1;
  }

  // BFS queue: [r, c, distance];
  const queue = [[0, 0, 0]];

  // Mark start as visited
  A[0][0] = 0;

  while (queue.length > 0) {
    const [r, c, dist] = queue.shift();

    // Destination check
    if (r === X && c === Y) return dist;

    // Explore 4 neighbors
    for (let k = 0; k < 4; k++) {
      let nr = r + row[k];
      let nc = c + col[k];

      if (isValid(nr, nc)) {
        A[nr][nc] = 0; // mark visited
        queue.push([nr, nc, dist + 1]);
      }
    }
  }

  return -1; // No path found
}

/*
🧮 Final Complexity Summary
Aspect	Complexity	Explanation
Time Complexity	O(N × M)	Each cell processed once, 4-direction exploration
Space Complexity	O(N × M)	BFS queue in worst case
Traversal Type	BFS	Guarantees shortest path in an unweighted grid
*/

function shortestDistanceOpt(N, M, X, Y, A) {
  // Edge cases:
  if (A[0][0] === 0 || A[X][Y] === 0) return -1;
  if (X === 0 && Y === 0) return 0;

  // Row & Col moves -> up, down, left, right
  const row = [-1, 1, 0, 0];
  const col = [0, 0, -1, 1];

  // Helper: check if cell is inside grid & walkable
  function isValid(i, j) {
    return i >= 0 && i < N && j >= 0 && j < M && A[i][j] === 1;
  }

  // BFS queue -> stores coordinates
  const queue = [[0, 0]];
  let front = 0;
  let steps = 0;

  // Mark start as visited
  A[0][0] = 0;

  while (front < queue.length) {
    let size = queue.length - front; // nodes in current BFS level

    // Process all nodes in this level
    for (let s = 0; s < size; s++) {
      const [r, c] = queue[front++];

      // Destination check
      if (r === X && c === Y) return steps;

      for (let k = 0; k < 4; k++) {
        let nr = r + row[k];
        let nc = c + col[k];

        if (isValid(nr, nc)) {
          A[nr][nc] = 0; // Mark visited
          queue.push([nr, nc]);
        }
      }
    }
    steps++;
  }
  return -1; // No path found
}

// Example 1
const N1 = 3,
  M1 = 4;
const A1 = [
  [1, 0, 0, 0],
  [1, 1, 0, 1],
  [0, 1, 1, 1],
];
const X1 = 2,
  Y1 = 3;
console.log(shortestDistanceOpt(N1, M1, X1, Y1, A1)); // Output: 5

// Example 2
const N2 = 3,
  M2 = 4;
const A2 = [
  [1, 1, 1, 1],
  [0, 0, 0, 1],
  [0, 0, 0, 1],
];
const X2 = 0,
  Y2 = 3;
console.log(shortestDistanceOpt(N2, M2, X2, Y2, A2)); // Output: 3

// Example 3: No path
const N3 = 2,
  M3 = 2;
const A3 = [
  [1, 0],
  [0, 1],
];
const X3 = 1,
  Y3 = 1;
console.log(shortestDistanceOpt(N3, M3, X3, Y3, A3)); // Output: -1
