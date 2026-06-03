/*
649. Dota2 Senate
Medium
Topics
premium lock icon
Companies
In the world of Dota2, there are two parties: the Radiant and the Dire.

The Dota2 senate consists of senators coming from two parties. Now the Senate wants to decide on a change in the Dota2 game. The voting for this change is a round-based procedure. In each round, each senator can exercise one of the two rights:

Ban one senator's right: A senator can make another senator lose all his rights in this and all the following rounds.
Announce the victory: If this senator found the senators who still have rights to vote are all from the same party, he can announce the victory and decide on the change in the game.
Given a string senate representing each senator's party belonging. The character 'R' and 'D' represent the Radiant party and the Dire party. Then if there are n senators, the size of the given string will be n.

The round-based procedure starts from the first senator to the last senator in the given order. This procedure will last until the end of voting. All the senators who have lost their rights will be skipped during the procedure.

Suppose every senator is smart enough and will play the best strategy for his own party. Predict which party will finally announce the victory and change the Dota2 game. The output should be "Radiant" or "Dire".

 

Example 1:

Input: senate = "RD"
Output: "Radiant"
Explanation: 
The first senator comes from Radiant and he can just ban the next senator's right in round 1. 
And the second senator can't exercise any rights anymore since his right has been banned. 
And in round 2, the first senator can just announce the victory since he is the only guy in the senate who can vote.
Example 2:

Input: senate = "RDD"
Output: "Dire"
Explanation: 
The first senator comes from Radiant and he can just ban the next senator's right in round 1. 
And the second senator can't exercise any rights anymore since his right has been banned. 
And the third senator comes from Dire and he can ban the first senator's right in round 1. 
And in round 2, the third senator can just announce the victory since he is the only guy in the senate who can vote.
 

Constraints:

n == senate.length
1 <= n <= 104
senate[i] is either 'R' or 'D'.
*/

// ========================================================================
// 1. Optimal + Intuitive
// ========================================================================

/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
  const n = senate.length;
  const radiant = [];
  const dire = [];

  // Store indices of each party's senators
  for (let i = 0; i < n; i++) {
    if (senate[i] === "R") {
      radiant.push(i);
    } else {
      dire.push(i);
    }
  }

  // Simulate the banning process
  while (radiant.length > 0 && dire.length > 0) {
    const rIndex = radiant.shift();
    const dIndex = dire.shift();

    if (rIndex < dIndex) {
      // Radiant senator bans the Dire senator
      // Radiant senator gets to vote in the next round
      radiant.push(rIndex + n);
    } else {
      // Dire senator bans the Radiant senator
      // Dire senator gets to vote in the next round
      dire.push(dIndex + n);
    }
  }

  return radiant.length > 0 ? "Radiant" : "Dire";
};

// ========================================================================
// 1. Optimal
// ========================================================================

/**
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function (senate) {
  let rad = [];
  let dir = [];
  let n = senate.length;
  let pointer = 0;

  for (let i = 0; i < n; i++) (senate[i] == "R" ? rad : dir).push(i);

  while (pointer < rad.length && pointer < dir.length) {
    (rad[pointer] < dir[pointer] ? rad : dir).push(pointer + n);
    pointer++;
  }
  return pointer < rad.length ? "Radiant" : "Dire";
};

// ========================================================================
// 2. Little slower
// ========================================================================

var predictPartyVictory = function (senate) {
  let arr = senate.split("");
  let rCount = 0;
  let dCount = 0;

  // Count initial bans
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "R") {
      if (dCount > 0) {
        dCount--;
        arr[i] = "x"; // Ban this senator
      } else {
        rCount++;
      }
    } else if (arr[i] === "D") {
      if (rCount > 0) {
        rCount--;
        arr[i] = "x";
      } else {
        dCount++;
      }
    }
  }

  // Count remaining senators
  let rRemaining = arr.filter((c) => c === "R").length;
  let dRemaining = arr.filter((c) => c === "D").length;

  if (rRemaining > dRemaining) return "Radiant";
  if (dRemaining > rRemaining) return "Dire";

  // If equal, check first occurrence
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "R") return "Radiant";
    if (arr[i] === "D") return "Dire";
  }

  return "";
};

// ========================================================================
// 3.  Brute Force
// ========================================================================

var predictPartyVictory = function (senate) {
  let active = [...senate];

  while (true) {
    let newActive = [];
    let banned = new Set();

    for (let i = 0; i < active.length; i++) {
      if (banned.has(i)) continue;

      let found = false;
      // look for someone to ban
      for (let j = i + 1; j < active.length; j++) {
        if (!banned.has(j) && active[j] !== active[i]) {
          banned.add(j);
          found = true;
          break;
        }
      }

      if (!found) {
        // ban from the start
        for (let j = 0; j < i; j++) {
          if (!banned.has(j) && active[j] !== active[i]) {
            banned.add(j);
            found = true;
            break;
          }
        }
      }

      if (!found) {
        // no one to ban, means all remaining are same party
        newActive.push(active[i]);
      } else {
        newActive.push(active[i]); // this senator survives
      }
    }

    // remove banned senators
    active = newActive.filter((_, idx) => !banned.has(idx));

    // check if all same party
    let allR = active.every((s) => s === "R");
    let allD = active.every((s) => s === "D");

    if (allR) return "Radiant";
    if (allD) return "Dire";
  }
};
