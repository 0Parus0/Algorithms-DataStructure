/*
174. Dungeon Game
Hard
Topics
premium lock icon
Companies
The demons had captured the princess and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of m x n rooms laid out in a 2D grid. Our valiant knight was initially positioned in the top-left room and must fight his way through dungeon to rescue the princess.

The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

Some of the rooms are guarded by demons (represented by negative integers), so the knight loses health upon entering these rooms; other rooms are either empty (represented as 0) or contain magic orbs that increase the knight's health (represented by positive integers).

To reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

Return the knight's minimum initial health so that he can rescue the princess.

Note that any room can contain threats or power-ups, even the first room the knight enters and the bottom-right room where the princess is imprisoned.

 

Example 1:


Input: dungeon = [[-2,-3,3],[-5,-10,1],[10,30,-5]]
Output: 7
Explanation: The initial health of the knight must be at least 7 if he follows the optimal path: RIGHT-> RIGHT -> DOWN -> DOWN.
Example 2:

Input: dungeon = [[0]]
Output: 1
 

Constraints:

m == dungeon.length
n == dungeon[i].length
1 <= m, n <= 200
-1000 <= dungeon[i][j] <= 1000
*/
function calculateMinimumHP(dungeon) {
  const m = dungeon.length;
  const n = dungeon[0].length;

  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i === m - 1 && j === n - 1) {
        dp[i][j] = Math.max(1, 1 - dungeon[i][j]);
      } else {
        let down = i + 1 < m ? dp[i + 1][j] : Infinity;
        let right = j + 1 < n ? dp[i][j + 1] : Infinity;
        let need = Math.min(down, right) - dungeon[i][j];
        dp[i][j] = Math.max(1, need);
      }
    }
  }

  return dp[0][0];
}

function calculateMinimumHP(dungeon) {
  const m = dungeon.length; // number of rows
  const n = dungeon[0].length; // number of columns

  // dp[i][j] represents the *minimum health needed* to ENTER cell (i, j)
  // and still be able to reach the princess alive.
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  // Traverse from bottom-right (princess) to top-left (start)
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i === m - 1 && j === n - 1) {
        // Base case: bottom-right cell (princess room)
        // If dungeon[i][j] = -5 → need at least 6 HP to survive (1 - (-5))
        // If dungeon[i][j] = +10 → need at least 1 HP (you gain health)
        dp[i][j] = Math.max(1, 1 - dungeon[i][j]);
      } else {
        // Minimum health needed in the next step (either right or down)
        const down = i + 1 < m ? dp[i + 1][j] : Infinity; // going down
        const right = j + 1 < n ? dp[i][j + 1] : Infinity; // going right

        // To survive after leaving current cell:
        // We need enough health so that after adding dungeon[i][j],
        // we still have at least the required health for the next cell.
        const need = Math.min(down, right) - dungeon[i][j];

        // Health can never be less than 1 (if it’s 0 or negative, knight dies)
        dp[i][j] = Math.max(1, need);
      }
    }
  }

  // dp[0][0] now holds the minimum initial health required for the knight
  return dp[0][0];
}

function calculateMinimumHP(dungeon) {
  const m = dungeon.length;
  const n = dungeon[0].length;

  // dp[i][j] = minimum health needed to start at (i, j) and reach the princess
  const dp = Array.from({ length: m }, () => new Array(n).fill(0));

  // Start from bottom-right corner
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (i === m - 1 && j === n - 1) {
        // if dungeon[i][j] is less than zero than its absolute value or one so that the knight is alive
        dp[i][j] = dungeon[i][j] > 0 ? 1 : Math.abs(dungeon[i][j]) + 1;
      } else {
        let down = i + 1 >= m ? Infinity : dp[i + 1][j];
        let right = j + 1 >= n ? Infinity : dp[i][j + 1];

        let result = Math.min(down, right) - dungeon[i][j];

        dp[i][j] = result > 0 ? result : 1;
      }
    }
  }
  return dp[0][0]; // min health required to reach (m - 1, n - 1) from 0, 0;
}
