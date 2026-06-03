/*
1094. Car Pooling
Medium
Topics
premium lock icon
Companies
Hint
There is a car with capacity empty seats. The vehicle only drives east (i.e., it cannot turn around and drive west).

You are given the integer capacity and an array trips where trips[i] = [numPassengersi, fromi, toi] indicates that the ith trip has numPassengersi passengers and the locations to pick them up and drop them off are fromi and toi respectively. The locations are given as the number of kilometers due east from the car's initial location.

Return true if it is possible to pick up and drop off all passengers for all the given trips, or false otherwise.

 

Example 1:

Input: trips = [[2,1,5],[3,3,7]], capacity = 4
Output: false
Example 2:

Input: trips = [[2,1,5],[3,3,7]], capacity = 5
Output: true
 

Constraints:

1 <= trips.length <= 1000
trips[i].length == 3
1 <= numPassengersi <= 100
0 <= fromi < toi <= 1000
1 <= capacity <= 105
*/

/* Difference Array using constraints */
function carPooling(trips, capacity) {
  const diff = new Array(1001).fill(0);

  // Step 1: build difference array
  for (let [passengers, from, to] of trips) {
    diff[from] += passengers;
    diff[to] -= passengers;
  }

  // Step 2: prefix sum
  let current = 0;
  for (let i = 0; i <= 1000; i++) {
    current += diff[i];
    if (current > capacity) return false;
  }

  return true;
}

/* Line Sweep */

function carPooling(trips, capacity) {
  const events = [];

  for (let [passengers, from, to] of trips) {
    events.push([from, passengers]); // Pickup
    events.push([to, -passengers]); // Drop-off
  }

  events.sort((a, b) => {
    if (a[0] === b[0]) return a[1] - b[1]; // negative first
    return a[0] - b[0];
  });

  let current = 0;
  for (let [, delta] of events) {
    current += delta;
    if (current > capacity) return false;
  }

  return true;
}
