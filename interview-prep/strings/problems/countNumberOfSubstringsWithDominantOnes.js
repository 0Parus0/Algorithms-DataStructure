/*
3234. Count the Number of Substrings With Dominant Ones
Medium
Topics
premium lock icon
Companies
Hint
You are given a binary string s.

Return the number of substrings with dominant ones.

A string has dominant ones if the number of ones in the string is greater than or equal to the square of the number of zeros in the string.

 

Example 1:

Input: s = "00011"

Output: 5

Explanation:

The substrings with dominant ones are shown in the table below.

i	j	s[i..j]	Number of Zeros	Number of Ones
3	3	1	0	1
4	4	1	0	1
2	3	01	1	1
3	4	11	0	2
2	4	011	1	2
Example 2:

Input: s = "101101"

Output: 16

Explanation:

The substrings with non-dominant ones are shown in the table below.

Since there are 21 substrings total and 5 of them have non-dominant ones, it follows that there are 16 substrings with dominant ones.

i	j	s[i..j]	Number of Zeros	Number of Ones
1	1	0	1	0
4	4	0	1	0
1	4	0110	2	2
0	4	10110	2	3
1	5	01101	2	3
 

Constraints:

1 <= s.length <= 4 * 104
s consists only of characters '0' and '1'.
*/

function numberOfSubstrings(s) {
  const n = s.length;
  const cumCountOne = new Array(n).fill(0);
  cumCountOne[0] = s[0] === "1" ? 1 : 0;

  for (let i = 1; i < n; i++) {
    // [i...j] = cumCountOne[j] - cumCountOne[i - 1]
    cumCountOne[i] = cumCountOne[i - 1] + (s[i] === "1" ? 1 : 0);
  }

  let result = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      let oneCount = cumCountOne[j] - (i - 1 >= 0 ? cumCountOne[i - 1] : 0);
      let zeroCount = j - i + 1 - oneCount;

      if (zeroCount * zeroCount > oneCount) {
        // Skip j to avoid waste indices
        let wasteIndices = zeroCount * zeroCount - oneCount;
        j += wasteIndices - 1;
      } else if (zeroCount * zeroCount === oneCount) {
        result += 1;
      } else {
        // [i...j] is a dominant string
        result += 1;

        // Try to see how much j can shift to right until substring remains dominant
        let k = Math.floor(Math.sqrt(oneCount)) - zeroCount;
        let next = j + k;

        if (next >= n) {
          // Out of bound, means all indices are valid
          result += n - j - 1;
          break;
        } else {
          result += k;
        }

        j = next;
      }
    }
  }

  return result;
}

/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
  const n = s.length;
  const zeroIndices = [];

  // 1. Collect indices of all zeros
  for (let i = 0; i < n; i++) {
    if (s[i] === "0") zeroIndices.push(i);
  }

  // Add a sentinel value to represent the end of the string
  zeroIndices.push(n);

  let result = 0;
  let zeroPtr = 0;

  // 2. Iterate through each starting position i
  for (let i = 0; i < n; i++) {
    // Keep the pointer at the first zero index that is >= i
    while (zeroPtr < zeroIndices.length && zeroIndices[zeroPtr] < i) {
      zeroPtr++;
    }

    // --- Case Z = 0 (Substrings with no zeros) ---
    // Every substring from s[i...i] to s[i...zeroIndices[zeroPtr]-1] is all 1s.
    // All-1 substrings are always dominant (ones >= 0^2).
    if (zeroIndices[zeroPtr] > i) {
      result += zeroIndices[zeroPtr] - i;
    }

    // --- Case Z > 0 (Substrings with exactly Z zeros) ---
    // We iterate Z up to sqrt(n) because Z^2 cannot exceed n.
    for (let Z = 1; ; Z++) {
      let zSq = Z * Z;
      if (zSq > n - i) break; // Optimization: not enough characters left to be dominant

      let zIdxInArray = zeroPtr + Z - 1;
      // If we don't have Z zeros left in the string, stop
      if (zIdxInArray >= zeroIndices.length - 1) break;

      // The Z-th zero is at:
      let firstIdxOfZthZero = zeroIndices[zIdxInArray];
      // The range for exactly Z zeros ends just before the (Z+1)-th zero:
      let lastIdxBeforeNextZero = zeroIndices[zIdxInArray + 1] - 1;

      /* 
               Requirement for s[i...j]: ones >= Z^2
               Formula for ones: (j - i + 1) - Z
               Equation: (j - i + 1) - Z >= Z^2
               Solving for j: j >= Z^2 + Z + i - 1
            */
      let minJNeeded = zSq + Z + i - 1;

      // We need to find how many j in [firstIdxOfZthZero, lastIdxBeforeNextZero]
      // satisfy j >= minJNeeded.
      let startJ = Math.max(firstIdxOfZthZero, minJNeeded);

      if (startJ <= lastIdxBeforeNextZero) {
        result += lastIdxBeforeNextZero - startJ + 1;
      }
    }
  }

  return result;
};

/**
 * @param {string} s
 * @return {number}
 */
var numberOfSubstrings = function (s) {
  const n = s.length;
  const zeroIndices = [];
  for (let i = 0; i < n; i++) {
    if (s[i] === "0") zeroIndices.push(i);
  }

  let totalDominant = 0;

  // 1. Handle Case: Zero zeros (Substrings of all 1s)
  let consecutiveOnes = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === "1") {
      consecutiveOnes++;
      totalDominant += consecutiveOnes;
    } else {
      consecutiveOnes = 0;
    }
  }

  // 2. Handle Case: k zeros (where 1 <= k <= sqrt(n))
  const maxZeros = Math.floor(Math.sqrt(n));
  const numZerosFound = zeroIndices.length;

  for (let k = 1; k <= maxZeros && k <= numZerosFound; k++) {
    // We slide a window that contains exactly 'k' zeros
    // The window's zeros are zeroIndices[i...i+k-1]
    for (let i = 0; i <= numZerosFound - k; i++) {
      const leftZeroIdx = zeroIndices[i];
      const rightZeroIdx = zeroIndices[i + k - 1];

      // Available '1's to the left of the first zero in our window
      const leftBound = i === 0 ? -1 : zeroIndices[i - 1];
      const leftPadding = leftZeroIdx - leftBound - 1;

      // Available '1's to the right of the last zero in our window
      const rightBound = i + k === numZerosFound ? n : zeroIndices[i + k];
      const rightPadding = rightBound - rightZeroIdx - 1;

      // Current ones inside the minimum window containing k zeros
      const currentOnes = rightZeroIdx - leftZeroIdx + 1 - k;
      const requiredOnes = k * k;

      // Use a small nested loop to check combinations of left and right padding
      // This looks like O(N^2) but leftPadding/rightPadding across the whole
      // string is limited, making the total complexity O(N * sqrt(N))
      for (let lp = 0; lp <= leftPadding; lp++) {
        // Formula: currentOnes + lp + rp >= requiredOnes
        // So: rp >= requiredOnes - currentOnes - lp
        let minRp = Math.max(0, requiredOnes - currentOnes - lp);
        if (minRp <= rightPadding) {
          totalDominant += rightPadding - minRp + 1;
        }
      }
    }
  }

  return totalDominant;
};

console.log(numberOfSubstrings("00011"));
