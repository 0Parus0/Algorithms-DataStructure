/*
1689. Partitioning Into Minimum Number Of Deci-Binary Numbers
Medium
Topics
premium lock icon
Companies
Hint
A decimal number is called deci-binary if each of its digits is either 0 or 1 without any leading zeros. For example, 101 and 1100 are deci-binary, while 112 and 3001 are not.

Given a string n that represents a positive decimal integer, return the minimum number of positive deci-binary numbers needed so that they sum up to n.

 

Example 1:

Input: n = "32"
Output: 3
Explanation: 10 + 11 + 11 = 32
Example 2:

Input: n = "82734"
Output: 8
Example 3:

Input: n = "27346209830709182346"
Output: 9
 

Constraints:

1 <= n.length <= 105
n consists of only digits.
n does not contain any leading zeros and represents a positive integer.
*/
// ========================================================================
// 1.  Brute Force
// ========================================================================

/**
 * @param {string} n
 * @return {number}
 */
var minPartitions = function (n) {
  let digits = n.split("").map(Number);
  let count = 0;

  while (true) {
    let allZero = true;
    let deciBinaryUsed = false;

    for (let i = 0; i < digits.length; i++) {
      if (digits[i] > 0) {
        digits[i] -= 1;
        deciBinaryUsed = true;
        allZero = false;
      }
    }

    if (deciBinaryUsed) {
      count++;
    }

    if (allZero) {
      break;
    }
  }

  return count;
};

/**
 * @param {string} n
 * @return {number}
 */
var minPartitions = function (n) {
  let maxDigit = 0;

  for (let i = 0; i < n.length; i++) {
    maxDigit = Math.max(maxDigit, n.charCodeAt(i) - 48);
  }

  return maxDigit;
};

/**
 * @param {string} n
 * @return {number}
 */
var minPartitions = function (n) {
  let maxDigit = 0;

  for (let i = 0; i < n.length; i++) {
    // Convert character to integer
    const digit = n.charCodeAt(i) - 48; // '0' is ASCII 48

    // Update the maximum digit found so far
    if (digit > maxDigit) {
      maxDigit = digit;
    }

    // Optimization: If we find a 9, we can return immediately
    // as no digit can be larger than 9.
    if (maxDigit === 9) return 9;
  }

  return maxDigit;
};
