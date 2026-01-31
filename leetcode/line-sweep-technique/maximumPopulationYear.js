/*
1854. Maximum Population Year
Easy
Topics
premium lock icon
Companies
Hint
You are given a 2D integer array logs where each logs[i] = [birthi, deathi] indicates the birth and death years of the ith person.

The population of some year x is the number of people alive during that year. The ith person is counted in year x's population if x is in the inclusive range [birthi, deathi - 1]. Note that the person is not counted in the year that they die.

Return the earliest year with the maximum population.

 

Example 1:

Input: logs = [[1993,1999],[2000,2010]]
Output: 1993
Explanation: The maximum population is 1, and 1993 is the earliest year with this population.
Example 2:

Input: logs = [[1950,1961],[1960,1971],[1970,1981]]
Output: 1960
Explanation: 
The maximum population is 2, and it had happened in years 1960 and 1970.
The earlier year between them is 1960.
 

Constraints:

1 <= logs.length <= 100
1950 <= birthi < deathi <= 2050
*/

/* Difference Array Technique */
function maximumPopulation(logs) {
  // Initialize a difference array with 0s
  const diff = new Array(102).fill(0);
  for (let [birth, death] of logs) {
    // add plus one on the birth and minus one on death
    diff[birth - 1950] += 1;
    diff[death - 1950] -= 1;
  }

  let maxPop = 0;
  let currPop = 0;
  let minYear = 2050;

  for (let i = 0; i < 102; i++) {
    currPop += diff[i];
    if (currPop > maxPop) {
      maxPop = currPop;
      minYear = i + 1950;
    }
  }

  return minYear;
}

function maximumPopulation(logs) {
  const n = logs.length;
  const events = [];
  for (let [birth, death] of logs) {
    events.push([birth, +1]);
    events.push([death, -1]);
  }
  // events.sort((a, b) => {
  //   if (a[0] === b[0]) {
  //     return a[1] - b[1]; // Process decreases (-1) before
  //   }
  //   return a[0] - b[0];
  // });

  //  Same as above
  // Sort by year, and for same year, process deaths before births
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let currPop = 0;
  let maxPop = 0;
  let minYear = 2050;

  for (let [year, num] of events) {
    currPop += num;
    if (currPop > maxPop) {
      maxPop = currPop;
      minYear = year;
    }
  }
  return minYear;
}

console.log(
  maximumPopulation([
    [2008, 2026],
    [2004, 2008],
    [2034, 2035],
    [1999, 2050],
    [2049, 2050],
    [2011, 2035],
    [1966, 2033],
    [2044, 2049],
  ]),
);
