/*
Given a square matrix mat[][] of size n x n, where mat[i][j] == 1 means person i knows person j, and mat[i][j] == 0 means person i does not know person j, find the celebrity person where,

A celebrity is defined as someone who:

Is known by everyone else
Does not know anyone (except themselves)
Return the index of the celebrity if one exists, otherwise return -1.

Note: It is guaranteed that mat[i][i] == 1 for all i

Examples:  

Input: mat[][] = [[1, 1, 0], 
                             [0, 1, 0], 
                             [0, 1, 1]]
Output: 1
Explanation: 0th and 2nd person both know 1. Therefore, 1 is the celebrity.

Input: mat[][] = [[1, 1], 
                             [1, 1]]
Output: -1
Explanation: The two people at the party both know each other. None of them is a celebrity.

Input: mat[][] = [[1]]
Output: 0
*/

function findCelebrity(mat) {
  const n = mat.length;
  const stack = [];

  // Push all people to stack
  for (let i = 0; i < n; i++) {
    stack.push(i);
  }

  // Eliminate until one candidate remains
  while (stack.length > 1) {
    const a = stack.pop();
    const b = stack.pop();

    if (mat[a][b] === 1) {
      // a knows b → a cannot be celebrity
      stack.push(b);
    } else {
      // a doesn't know b → b cannot be celebrity
      stack.push(a);
    }
  }

  if (stack.length === 0) return -1;

  const candidate = stack.pop();

  // Verify candidate
  for (let i = 0; i < n; i++) {
    if (i === candidate) continue;
    if (mat[i][candidate] === 0 || mat[candidate][i] === 1) {
      return -1;
    }
  }

  return candidate;
}

function findCelebrity1(mat) {
  const n = mat.length;
  let left = 0;
  let right = n - 1;

  // Step 1: Find potential candidate using elimination
  while (left < right) {
    if (mat[left][right] === 1) {
      // left knows right → left cannot be celebrity
      left++;
    } else {
      // left doesn't know right → right cannot be celebrity
      right--;
    }
  }

  const candidate = left;

  // Step 2: Verify if candidate is actually a celebrity
  for (let i = 0; i < n; i++) {
    if (i === candidate) continue;

    // Check: Everyone should know candidate, and candidate shouldn't know anyone
    if (mat[i][candidate] === 0 || mat[candidate][i] === 1) {
      return -1;
    }
  }

  return candidate;
}
