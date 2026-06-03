/*
Given an unsorted array arr[] of size n, containing elements from the range 1 to n, it is known that one number in this range is missing, and another number occurs twice in the array, find both the duplicate number and the missing number.

Examples: 

Input: arr[] = [3, 1, 3]
Output: [3, 2]
Explanation: 3 is occurs twice and 2 is missing.

Input: arr[] = [4, 3, 6, 2, 1, 1]
Output: [1, 5] 
Explanation: 1 is occurs twice and 5 is missing.
*/
function findMissingAndrepeated(nums) {
  let n = nums.length;
  let i = 0;

  // Step 1: Cyclic sort
  while (i < n) {
    let correctIdx = nums[i] - 1;
    if (nums[i] !== nums[correctIdx]) {
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
    } else {
      i++;
    }
  }

  // Step 2: Find duplicate and missing
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      // nums[i] is the duplicate (it appears twice)
      // i + 1 is the missing number
      return {
        duplicate: nums[i],
        missing: i + 1,
      };
    }
  }
}

// ========================================================================
// LeetCode missing and repeated (2D Matrix)
// ========================================================================
/*
2965. Find Missing and Repeated Values
Easy
Topics
premium lock icon
Companies
You are given a 0-indexed 2D integer matrix grid of size n * n with values in the range [1, n2]. Each integer appears exactly once except a which appears twice and b which is missing. The task is to find the repeated and missing numbers a and b.

Return a 0-indexed integer array ans of size 2 where ans[0] equals to a and ans[1] equals to b.

 

Example 1:

Input: grid = [[1,3],[2,2]]
Output: [2,4]
Explanation: Number 2 is repeated and number 4 is missing so the answer is [2,4].
Example 2:

Input: grid = [[9,1,7],[8,9,2],[3,4,6]]
Output: [9,5]
Explanation: Number 9 is repeated and number 5 is missing so the answer is [9,5].
 

Constraints:

2 <= n == grid.length == grid[i].length <= 50
1 <= grid[i][j] <= n * n
For all x that 1 <= x <= n * n there is exactly one x that is not equal to any of the grid members.
For all x that 1 <= x <= n * n there is exactly one x that is equal to exactly two of the grid members.
For all x that 1 <= x <= n * n except two of them there is exactly one pair of i, j that 0 <= i, j <= n - 1 and grid[i][j] == x.
*/

function findMissingAndRepeated(grid) {
  const n = grid.length;
  const total = n * n;

  let i = 0;

  // Step 1: Cyclic sort
  while (i < total) {
    // Current coordinates
    let r = Math.floor(i / n);
    let c = i % n;

    // The value at current position
    let val = grid[r][c];

    // The "correct" index for this value is val - 1
    let correctIdx = val - 1;
    let cr = Math.floor(correctIdx / n); // Row
    let cc = correctIdx % n; // Col

    // if the value is not at the correct index swap it with value at correct index
    if (grid[r][c] !== grid[cr][cc]) {
      [grid[r][c], grid[cr][cc]] = [grid[cr][cc], grid[r][c]];
    } else {
      // Otherwise, move to the next index
      i++;
    }
  }

  // Step 2: Find missing and repeated
  for (let i = 0; i < total; i++) {
    let r = Math.floor(i / n);
    let c = i % n;

    // If the value doesn't match the expected (index + 1)
    if (grid[r][c] !== i + 1) {
      return [grid[r][c], i + 1];
    }
  }
}

// ========================================================================
// Second Technique
// ========================================================================

function findMissingAndRepeated(grid) {
  const n = grid.length;
  const size = n * n;
  const freq = new Array(size + 1).fill(0);

  // Step 1: Fill the frequency array
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let val = grid[i][j];

      freq[val]++;
    }
  }

  let repeated = -1;
  let missing = -1;

  // Step 2: Find missing and repeated
  for (let i = 1; i <= size; i++) {
    if (freq[i] === 2) {
      repeated = i;
    } else if (freq[i] === 0) {
      missing = i;
    }

    // Optimization: Stop early if both are found
    if (repeated !== -1 && missing !== -1) break;
  }

  return [repeated, missing];
}
