/*
1921. Eliminate Maximum Number of Monsters
Medium
Topics
premium lock icon
Companies
Hint
You are playing a video game where you are defending your city from a group of n monsters. You are given a 0-indexed integer array dist of size n, where dist[i] is the initial distance in kilometers of the ith monster from the city.

The monsters walk toward the city at a constant speed. The speed of each monster is given to you in an integer array speed of size n, where speed[i] is the speed of the ith monster in kilometers per minute.

You have a weapon that, once fully charged, can eliminate a single monster. However, the weapon takes one minute to charge. The weapon is fully charged at the very start.

You lose when any monster reaches your city. If a monster reaches the city at the exact moment the weapon is fully charged, it counts as a loss, and the game ends before you can use your weapon.

Return the maximum number of monsters that you can eliminate before you lose, or n if you can eliminate all the monsters before they reach the city.

 

Example 1:

Input: dist = [1,3,4], speed = [1,1,1]
Output: 3
Explanation:
In the beginning, the distances of the monsters are [1,3,4]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,2,3]. You eliminate the second monster.
After a minute, the distances of the monsters are [X,X,2]. You eliminate the third monster.
All 3 monsters can be eliminated.
Example 2:

Input: dist = [1,1,2,3], speed = [1,1,1,1]
Output: 1
Explanation:
In the beginning, the distances of the monsters are [1,1,2,3]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,0,1,2], so you lose.
You can only eliminate 1 monster.
Example 3:

Input: dist = [3,2,4], speed = [5,3,2]
Output: 1
Explanation:
In the beginning, the distances of the monsters are [3,2,4]. You eliminate the first monster.
After a minute, the distances of the monsters are [X,0,2], so you lose.
You can only eliminate 1 monster.
 

Constraints:

n == dist.length == speed.length
1 <= n <= 105
1 <= dist[i], speed[i] <= 105
*/
/**
 * @param {number[]} dist
 * @param {number[]} speed
 * @return {number}
 */

// ========================================================================
// 1. Optimal but slow (Using full sort O(N log N))
// ========================================================================

var eliminateMaximum = function (dist, speed) {
  const n = dist.length;
  const timeToReach = [];

  for (let i = 0; i < n; i++) {
    timeToReach.push(Math.ceil(dist[i] / speed[i]));
  }

  timeToReach.sort((a, b) => a - b);

  for (let i = 0; i < n; i++) {
    if (timeToReach[i] <= i) {
      return i;
    }
  }

  return n;
};

/**
 * @param {number[]} dist
 * @param {number[]} speed
 * @return {number}
 */
var eliminateMaximum = function (dist, speed) {
  const n = dist.length;
  const timeToReach = [];

  // Calculate minutes each monster takes to reach the city
  for (let i = 0; i < n; i++) {
    // Use Math.ceil to get full minutes (monster arrives at the beginning of that minute)
    timeToReach.push(Math.ceil(dist[i] / speed[i]));
  }

  // Sort by arrival time (earliest first)
  timeToReach.sort((a, b) => a - b);

  // Simulate eliminating monsters minute by minute
  for (let i = 0; i < n; i++) {
    // At minute i (0-indexed), we need to have eliminated i monsters already
    // The i-th monster (in sorted order) arrives at timeToReach[i]
    // If it arrives at or before minute i, we lose
    if (timeToReach[i] <= i) {
      return i; // Can only eliminate i monsters (0 to i-1)
    }
  }

  // All monsters eliminated
  return n;
};

// ========================================================================
// 3. Best and Optimal (Using Count Sort) O(N)
// ========================================================================

function eliminateMaximum(dist, speed) {
  const hours = Array.from({ length: dist.length }).fill(0);

  for (let i = 0; i < dist.length; i++) {
    const index = Math.ceil(dist[i] / speed[i]);

    if (index < dist.length) {
      hours[index] = hours[index] + 1;
    }
  }

  let count = 0;
  for (let i = 0; i < hours.length; i++) {
    if (count + hours[i] > i) {
      return i;
    }

    count = count + hours[i];
  }

  return dist.length;
}
