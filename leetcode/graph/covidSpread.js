/*
Covid Spread
Difficulty: MediumAccuracy: 49.95%Submissions: 20K+Points: 4Average Time: 25m
Aterp is the head nurse at a city hospital. City hospital contains R*C number of wards and the structure of a hospital is in the form of a 2-D matrix.
Given a matrix of dimension R*C where each cell in the matrix can have values 0, 1, or 2 which has the following meaning:
0: Empty ward
1: Cells have uninfected patients
2: Cells have infected patients

An infected patient at ward [i,j] can infect other uninfected patient at indexes [i-1,j], [i+1,j], [i,j-1], [i,j+1] (up, down, left and right) in unit time. Help Aterp determine the minimum units of time after which there won't remain any uninfected patient i.e all patients would be infected. If all patients are not infected after infinite units of time then simply return -1.

 


Example 1:

Input:
3 5
2 1 0 2 1
1 0 1 2 1
1 0 0 2 1 
Output:
2
Explanation:
Patients at positions {0,0}, {0, 3}, {1, 3}
and {2, 3} will infect patient at {0, 1}, 
{1, 0},{0, 4}, {1, 2}, {1, 4}, {2, 4} during 1st 
unit time. And, during 2nd unit time, patient at 
{1, 0} will get infected and will infect patient 
at {2, 0}. Hence, total 2 unit of time is
required to infect all patients.
Example 2:

Input:
3 5
2 1 0 2 1
0 0 1 2 1
1 0 0 2 1
Output:
-1
Explanation:
All patients will not be infected.
 

Your Task:  
You don't need to read input or print anything. Your task is to complete the function helpaterp() which takes a 2-D Matrix hospital as input parameter and returns the minimum units of time in which all patients will be infected or -1 if it is impossible.


Constraints:
1 ≤ R,C ≤ 1000
0 ≤ mat[i][j] ≤ 2
*/
function helpaterp(hospital) {
  const r = hospital.length;
  const c = hospital[0].length;

  const row = [-1, 1, 0, 0]; // row :top, bottom, left, right
  const column = [0, 0, -1, 1]; // column : top, bottom, left, right
  function valid(i, j) {
    return i >= 0 && i < r && j >= 0 && j < c;
  }

  const queue = [];
  let uninfected = 0;

  // Step 1: Collect infected and count uninfected
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (hospital[i][j] === 2) {
        queue.push([i, j]);
      } else if (hospital[i][j] === 1) {
        uninfected++;
      }
    }
  }

  if (uninfected === 0) return 0; // No uninfected -> 0 time
  // If no infected patients but uninfected exist
  if (queue.length === 0 && uninfected > 0) return -1;

  let time = -1; // Will increment per level or we have to subtract 1 at the end if we keep it 0

  while (queue.length > 0) {
    time++;
    let size = queue.length;

    while (size--) {
      let [i, j] = queue.shift();

      for (let k = 0; k < 4; k++) {
        if (
          valid(i + row[k], j + column[k]) &&
          hospital[i + row[k]][j + column[k]] === 1
        ) {
          hospital[i + row[k]][j + column[k]] = 2;
          queue.push([i + row[k], j + column[k]]);
        }
      }
    }
  }
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (hospital[i][j] === 1) return -1;
    }
  }
  return time;
}

function helpaterp1(hospital) {
  const R = hospital.length;
  const C = hospital[0].length;

  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const queue = [];
  let uninfected = 0;

  // Initialize
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (hospital[i][j] === 2) queue.push([i, j]);
      else if (hospital[i][j] === 1) uninfected++;
    }
  }

  if (uninfected === 0) return 0;
  if (queue.length === 0) return -1;

  let time = 0;

  while (queue.length > 0 && uninfected > 0) {
    let size = queue.length;

    while (size--) {
      const [r, c] = queue.shift();

      for (let [dr, dc] of dirs) {
        const nr = r + dr,
          nc = c + dc;

        if (nr >= 0 && nr < R && nc >= 0 && nc < C && hospital[nr][nc] === 1) {
          hospital[nr][nc] = 2;
          uninfected--;
          queue.push([nr, nc]);
        }
      }
    }
    time++;
  }

  return uninfected === 0 ? time : -1;
}

// Test Case 1
console.log(
  helpaterp([
    [2, 1, 0, 2, 1],
    [1, 0, 1, 2, 1],
    [1, 0, 0, 2, 1],
  ])
); // Output: 2

// Test Case 2
console.log(
  helpaterp([
    [2, 1, 0, 2, 1],
    [0, 0, 1, 2, 1],
    [1, 0, 0, 2, 1],
  ])
); // Output: -1

// Test Case 3: All already infected
console.log(
  helpaterp([
    [2, 2],
    [2, 2],
  ])
); // Output: 0

// Test Case 4: No infection possible
console.log(
  helpaterp([
    [2, 0, 1],
    [0, 0, 1],
    [1, 1, 1],
  ])
); // Output: -1
