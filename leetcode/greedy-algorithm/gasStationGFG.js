/*
Gas Station
Difficulty: MediumAccuracy: 34.79%Submissions: 223K+Points: 4Average Time: 20m
There are n gas stations along a circular tour. You are given two integer arrays gas[] and cost[], where gas[i] is the amount of gas available at station i and cost[i] is the gas needed to travel from station i to station (i+1). You have a car with an unlimited gas tank and start with an empty tank at some station. Your task is to return the index of the starting station if it is possible to travel once around the circular route in a clockwise direction without running out of gas at any station; otherwise, return -1.

Note: If a solution exists, it is guaranteed to be unique.

Examples:

Input: gas[] = [4, 5, 7, 4], cost[]= [6, 6, 3, 5]
Output: 2
Explanation: Start at gas station at index 2 and fill up with 7 units of gas. Your tank = 0 + 7 = 7
Travel to station 3. Available gas = (7 – 3 + 4) = 8.
Travel to station 0. Available gas = (8 – 5 + 4) = 7.
Travel to station 1. Available gas = (7 – 6 + 5) = 6.
Return to station 2. Available gas = (6 – 6) = 0.
Input: gas[] = [3, 9], cost[] = [7, 6]
Output: -1
Explanation: There is no gas station to start with such that you can complete the tour.
Constraints:
1 ≤ n ≤ 106
1 ≤ gas[i], cost[i] ≤ 103

*/

// ========================================================================
// 1. Optimal
// ========================================================================

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  const n = gas.length;
  let totalGas = 0;
  let totalCost = 0;
  let tank = 0;
  let startIndex = 0;

  for (let i = 0; i < n; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    tank += gas[i] - cost[i];

    // If running out of gas at this station, try starting from next station
    if (tank < 0) {
      startIndex = i + 1;
      tank = 0; // Reset tank
    }
  }

  // If total gas is less than total cost, impossible to complete
  if (totalGas < totalCost) {
    return -1;
  }

  return startIndex;
};

// ========================================================================
// 2. Optimal
// ========================================================================
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let nGas = gas.length;
  let NetGain = 0;
  let currGain = 0;
  let start = 0;
  for (let i = 0; i < nGas; i++) {
    let gain = gas[i] - cost[i];
    currGain += gain;
    if (currGain < 0) {
      currGain = 0;
      start = i + 1;
    }
    NetGain += gain;
  }
  return NetGain >= 0 ? start : -1;
};

// ========================================================================
// 1. Brute Force (TLE)
// ========================================================================
var canCompleteCircuit = function (gas, cost) {
  const n = gas.length;

  // Try each starting station
  for (let start = 0; start < n; start++) {
    let tank = 0;
    let complete = true;

    // Go around the circuit
    for (let step = 0; step < n; step++) {
      const current = (start + step) % n;
      tank += gas[current];
      tank -= cost[current];

      if (tank < 0) {
        complete = false;
        break;
      }
    }

    if (complete) return start;
  }

  return -1;
};
