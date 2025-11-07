/*
Knight Walk
Difficulty: MediumAccuracy: 37.61%Submissions: 51K+Points: 4
Given a square chessboard, the initial position of Knight and position of a target. Find out the minimum steps a Knight will take to reach the target position.If it cannot reach the target position return -1.

Note:
The initial and the target position co-ordinates of Knight have been given accoring to 1-base indexing.

Example 1:

Input:
N=6
knightPos[ ] = {4, 5}
targetPos[ ] = {1, 1}
Output:
3
Explanation:

Knight takes 3 step to reach from
(4, 5) to (1, 1):
(4, 5) -> (5, 3) -> (3, 2) -> (1, 1). 

Example 2:

Input:
N=8
knightPos[ ] = {7, 7}
targetPos[ ] = {1, 5}
Output:
4
Explanation:
Knight takes 4 steps to reach from
(7, 7) to (1, 5):
(4, 5) -> (6, 5) -> (5, 3) -> (7, 2) -> (1, 5).
 

Your Task:
You don't need to read input or print anything. Your task is to complete the function minStepToReachTarget() which takes the inital position of Knight (KnightPos), the target position of Knight (TargetPos) and the size of the chess board (N) as an input parameters and returns the minimum number of steps required by the knight to reach from its current position to the given target position.If it cannot reach the target position return -1.

Expected Time Complexity: O(N2).
Expected Auxiliary Space: O(N2).

Constraints:
1 <= N <= 1000
1 <= Knight_pos(X, Y), Targer_pos(X, Y) <= N
*/

function minStepToReachTarget(knightPos, targetPos, N) {
  // const startX = knightPos[0] - 1;
  // const startY = knightPos[1] - 1;
  // const targetX = targetPos[0] - 1;
  // const targetY = targetPos[1] - 1;

  const [startX, startY] = [knightPos[0] - 1, knightPos[1] - 1];
  const [targetX, targetY] = [targetPos[0] - 1, targetPos[1] - 1];

  // Edge cases:
  if (startX === targetX && startY === targetY) return 0;

  // Knight moves
  const row = [2, 2, -2, -2, 1, 1, -1, -1];
  const col = [1, -1, 1, -1, 2, -2, 2, -2];

  const visited = Array.from({ length: N }, () => new Array(N).fill(false));

  // Helper:
  function isValid(i, j) {
    return i >= 0 && i < N && j >= 0 && j < N && !visited[i][j];
  }

  const queue = [[startX, startY]];
  let front = 0;
  let steps = 0;
  visited[startX][startY] = true;

  while (front < queue.length) {
    const levelSize = queue.length - front;

    for (let i = 0; i < levelSize; i++) {
      const [r, c] = queue[front++];

      for (let k = 0; k < 8; k++) {
        const nr = r + row[k];
        const nc = c + col[k];

        if (isValid(nr, nc)) {
          if (nr === targetX && nc === targetY) return steps + 1;
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        }
      }
    }
    steps++;
  }
  return -1;
}
// Test cases
console.log(minStepToReachTarget([4, 5], [1, 1], 6)); // Output: 3
console.log(minStepToReachTarget([7, 7], [1, 5], 8)); // Output: 4
console.log(minStepToReachTarget([1, 1], [1, 1], 8)); // Output: 0
console.log(minStepToReachTarget([1, 1], [2, 2], 2)); // Output: -1 (unreachable)
