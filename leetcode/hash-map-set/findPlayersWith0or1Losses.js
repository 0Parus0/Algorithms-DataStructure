/*
2225. Find Players With Zero or One Losses
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer array matches where matches[i] = [winneri, loseri] indicates that the player winneri defeated player loseri in a match.

Return a list answer of size 2 where:

answer[0] is a list of all players that have not lost any matches.
answer[1] is a list of all players that have lost exactly one match.
The values in the two lists should be returned in increasing order.

Note:

You should only consider the players that have played at least one match.
The testcases will be generated such that no two matches will have the same outcome.
 

Example 1:

Input: matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]
Output: [[1,2,10],[4,5,7,8]]
Explanation:
Players 1, 2, and 10 have not lost any matches.
Players 4, 5, 7, and 8 each have lost one match.
Players 3, 6, and 9 each have lost two matches.
Thus, answer[0] = [1,2,10] and answer[1] = [4,5,7,8].
Example 2:

Input: matches = [[2,3],[1,3],[5,4],[6,4]]
Output: [[1,2,5,6],[]]
Explanation:
Players 1, 2, 5, and 6 have not lost any matches.
Players 3 and 4 each have lost two matches.
Thus, answer[0] = [1,2,5,6] and answer[1] = [].
 

Constraints:

1 <= matches.length <= 105
matches[i].length == 2
1 <= winneri, loseri <= 105
winneri != loseri
All matches[i] are unique.
*/

function findWinners(matches) {
  const lossCount = {}; // Player -> number of losses

  // Step 1: Count losses and track all players
  for (let [winner, loser] of matches) {
    if (lossCount[winner] === undefined) lossCount[winner] = 0;
    if (lossCount[loser] === undefined) lossCount[loser] = 0;

    lossCount[loser]++; // increment loser's loss count
  }

  // Step 2: Build result arrays
  const noLoss = [];
  const oneLoss = [];

  for (let player in lossCount) {
    const losses = lossCount[player];

    if (losses === 0) noLoss.push(Number(player));
    else if (losses === 1) oneLoss.push(Number(player));
  }

  noLoss.sort((a, b) => a - b);
  oneLoss.sort((a, b) => a - b);

  return [noLoss, oneLoss];
}

var findWinners = function (matches) {
  const losses = new Map(); // only stores players with >=1 loss
  const players = new Set(); // tracks all players that appeared

  // Process matches in a single pass
  for (const [winner, loser] of matches) {
    players.add(winner);
    players.add(loser);

    losses.set(loser, (losses.get(loser) || 0) + 1);
  }

  const noLoss = [];
  const oneLoss = [];

  // Classify players
  for (const player of players) {
    const count = losses.get(player) || 0;

    if (count === 0) {
      noLoss.push(player);
    } else if (count === 1) {
      oneLoss.push(player);
    }
  }

  noLoss.sort((a, b) => a - b);
  oneLoss.sort((a, b) => a - b);

  return [noLoss, oneLoss];
};

/**
#Plan:

1. **Understand the problem:**
   - We need to process match results where each match has a winner and loser
   - Find all players who have ZERO losses
   - Find all players who have EXACTLY ONE loss
   - Return results in increasing order
   - Only include players who have played at least one match

2. **Break down input data & transformations:**
  - Input: Array of matches, where each match = [winner, loser]
  - Transformation: Count losses for each player, filter by loss count, sort results
  - Output: Array of two arrays: [[zero-loss players], [one-loss players]]

3. **Edge cases:**
  - Single match only
  - Players who only win (never lose)
  - Players who only lose (never win)
  - Large input (up to 10^5 matches)
  - Duplicate players across matches
  - Circular matches (A beats B, B beats C, C beats A)

4. **Data structures:**
  - Object/Map to track loss count for each player
  - Arrays to store results (will be sorted)
  - Alternative: Use Set to track all players

5. **Approach:**
  1. Initialize a loss counter (Object or Map)
  2. Iterate through all matches:
     - Track winner (initialize if not exists)
     - Track loser and increment loss count
  3. Iterate through all tracked players:
     - Add to zeroLoss array if loss count = 0
     - Add to oneLoss array if loss count = 1
  4. Sort both arrays in ascending order
  5. Return [zeroLoss, oneLoss]

6. **Time & Space Complexity:**
  - Time: O(N + M log M) where N = number of matches, M = number of unique players
  - Space: O(M) for storing loss counts of all unique players
*/

// Function
function findWinners(matches) {
  // Step 1: Parse or transform input if needed
  // Input is already in correct format [[winner, loser], ...]

  // Step 2: Set up data structures
  const lossCount = new Map(); // Use Map for better integer key handling

  // Step 3: Apply main logic
  // Process each match and update loss counts
  for (const [winner, loser] of matches) {
    // Ensure winner is tracked (default 0 losses if not in map)
    if (!lossCount.has(winner)) {
      lossCount.set(winner, 0);
    }

    // Update loser's loss count
    lossCount.set(loser, (lossCount.get(loser) || 0) + 1);
  }

  // Initialize result arrays
  const zeroLossPlayers = [];
  const oneLossPlayers = [];

  // Categorize players based on loss count
  for (const [player, losses] of lossCount) {
    if (losses === 0) {
      zeroLossPlayers.push(player);
    } else if (losses === 1) {
      oneLossPlayers.push(player);
    }
  }

  // Sort results in increasing order
  zeroLossPlayers.sort((a, b) => a - b);
  oneLossPlayers.sort((a, b) => a - b);

  // Step 4: Return result
  return [zeroLossPlayers, oneLossPlayers];
}

/*

# Custom Test Cases

Test 1: Provided example
Input: [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]
Expected: [[1,2,10],[4,5,7,8]]

Test 2: Simple case with empty second array
Input: [[2,3],[1,3],[5,4],[6,4]]
Expected: [[1,2,5,6],[]]

Test 3: Single match
Input: [[1,2]]
Expected: [[1],[2]]

Test 4: Circular matches (everyone has one loss)
Input: [[1,2],[2,3],[3,1]]
Expected: [[],[1,2,3]]

Test 5: Player only wins
Input: [[1,2],[1,3],[1,4]]
Expected: [[1],[2,3,4]]

# Commit Message
"feat: Implement solution for Find Players With Zero or One Losses problem

- Use Map to track loss counts for each player
- Process matches in O(N) time
- Categorize players based on loss count (0 or 1)
- Return sorted results as required
- Handle edge cases including large inputs and circular matches"

*/

// Test the function with provided examples
console.log(
  findWinners([
    [1, 3],
    [2, 3],
    [3, 6],
    [5, 6],
    [5, 7],
    [4, 5],
    [4, 8],
    [4, 9],
    [10, 4],
    [10, 9],
  ])
);
// Expected output: [[1,2,10],[4,5,7,8]]

console.log(
  findWinners([
    [2, 3],
    [1, 3],
    [5, 4],
    [6, 4],
  ])
);
// Expected output: [[1,2,5,6],[]]

console.log(findWinners([[1, 2]]));
// Expected output: [[1],[2]]

/**
 * Turing.com Coding Challenge Solution
 * Problem: Find Players With Zero or One Losses
 *
 * This solution demonstrates:
 * 1. Clear problem understanding and planning
 * 2. Efficient algorithm design
 * 3. Proper edge case handling
 * 4. Clean, readable code with comments
 * 5. Performance considerations
 */

function analyzeTournamentResults(matches) {
  // Edge case: Empty input
  if (!matches || matches.length === 0) {
    return [[], []];
  }

  // Use object for simpler syntax, but Map works too
  const playerStats = {};

  // First pass: Count losses for each player
  for (const match of matches) {
    const [winner, loser] = match;

    // Initialize players if not already tracked
    if (playerStats[winner] === undefined) {
      playerStats[winner] = { wins: 0, losses: 0 };
    }
    if (playerStats[loser] === undefined) {
      playerStats[loser] = { wins: 0, losses: 0 };
    }

    // Update statistics
    playerStats[winner].wins++;
    playerStats[loser].losses++;
  }

  // Separate players based on loss count
  const undefeatedPlayers = [];
  const oneLossPlayers = [];

  for (const playerId in playerStats) {
    const player = playerStats[playerId];

    if (player.losses === 0) {
      undefeatedPlayers.push(parseInt(playerId));
    } else if (player.losses === 1) {
      oneLossPlayers.push(parseInt(playerId));
    }
  }

  // Sort results as required
  undefeatedPlayers.sort((a, b) => a - b);
  oneLossPlayers.sort((a, b) => a - b);

  return [undefeatedPlayers, oneLossPlayers];
}

// Test with custom cases
const testCases = [
  {
    input: [
      [1, 3],
      [2, 3],
      [3, 6],
      [5, 6],
      [5, 7],
      [4, 5],
      [4, 8],
      [4, 9],
      [10, 4],
      [10, 9],
    ],
    expected: [
      [1, 2, 10],
      [4, 5, 7, 8],
    ],
    description: "Complex tournament scenario",
  },
  {
    input: [
      [2, 3],
      [1, 3],
      [5, 4],
      [6, 4],
    ],
    expected: [[1, 2, 5, 6], []],
    description: "Some players undefeated, others with multiple losses",
  },
  {
    input: [],
    expected: [[], []],
    description: "Empty tournament",
  },
];

// Run tests
testCases.forEach((testCase, index) => {
  const result = analyzeTournamentResults(testCase.input);
  const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
  console.log(`Test ${index + 1}: ${testCase.description}`);
  console.log(`Result: ${JSON.stringify(result)}`);
  console.log(`Expected: ${JSON.stringify(testCase.expected)}`);
  console.log(`Status: ${passed ? "✓ PASS" : "✗ FAIL"}`);
  console.log("---");
});
