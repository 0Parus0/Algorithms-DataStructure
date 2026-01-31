/*
1759. Count Number of Homogenous Substrings
Medium
Topics
premium lock icon
Companies
Hint
Given a string s, return the number of homogenous substrings of s. Since the answer may be too large, return it modulo 109 + 7.

A string is homogenous if all the characters of the string are the same.

A substring is a contiguous sequence of characters within a string.

 

Example 1:

Input: s = "abbcccaa"
Output: 13
Explanation: The homogenous substrings are listed as below:
"a"   appears 3 times.
"aa"  appears 1 time.
"b"   appears 2 times.
"bb"  appears 1 time.
"c"   appears 3 times.
"cc"  appears 2 times.
"ccc" appears 1 time.
3 + 1 + 2 + 1 + 3 + 2 + 1 = 13.
Example 2:

Input: s = "xy"
Output: 2
Explanation: The homogenous substrings are "x" and "y".
Example 3:

Input: s = "zzzzz"
Output: 15
 

Constraints:

1 <= s.length <= 105
s consists of lowercase letters.
*/
function countHomogenous(s) {
  const n = s.length;
  const mod = 1e9 + 7;

  let result = 0;
  let len = 0;
  for (let i = 0; i < n; i++) {
    if (i > 0 && s[i] === s[i - 1]) {
      len += 1;
    } else {
      len = 1;
    }
    result = (result + len) % mod;
  }

  return result;
}
function countHomogenous(s) {
  const mod = 1000000007;
  let result = 0;
  let len = 0;

  for (let i = 0; i < s.length; i++) {
    len = i > 0 && s[i] === s[i - 1] ? len + 1 : 1;
    result = (result + len) % mod;
  }

  return result;
}
/*
"""
#Plan
Approach: Group Consecutive Characters and Use Triangular Numbers

Key Insight: For a sequence of n identical consecutive characters:
- The number of uniform substrings = n*(n+1)/2 (triangular number)

Why?
- Length 1 substrings: n choices
- Length 2 substrings: n-1 choices  
- ...
- Length n substrings: 1 choice
Total = n + (n-1) + ... + 1 = n*(n+1)/2

Algorithm:
1. Traverse the string and group consecutive identical characters
2. For each group of length n, add n*(n+1)/2 to total count
3. Return total modulo 10^9+7

Time Complexity: O(n) - single pass through string
Space Complexity: O(1) - only store current group info
"""
*/

/**
 * Counts all uniform substrings in the kingdom
 * @param {string} s - The input string
 * @return {number} - Number of uniform substrings modulo 10^9+7
 */
function countUniformSubstrings(s) {
  const MOD = 1000000007n; // Use BigInt to avoid integer overflow
  let total = 0n;
  let currentLength = 1;

  for (let i = 1; i <= s.length; i++) {
    // If same character continues or we've reached the end
    if (i < s.length && s[i] === s[i - 1]) {
      currentLength++;
    } else {
      // Process the current group of identical characters
      // Triangular number formula: n*(n+1)/2
      const n = BigInt(currentLength);
      const count = (n * (n + 1n)) / 2n;
      total = (total + count) % MOD;

      // Reset for next group
      currentLength = 1;
    }
  }

  return Number(total);
}

// Alternative implementation with running count
function countUniformSubstringsRunning(s) {
  const MOD = 1000000007;
  let total = 0;
  let count = 1;

  for (let i = 1; i <= s.length; i++) {
    if (i < s.length && s[i] === s[i - 1]) {
      count++;
    } else {
      // Add triangular number for current group
      total = (total + Math.floor((count * (count + 1)) / 2)) % MOD;
      count = 1;
    }
  }

  return total;
}

// More explicit grouping approach
function countUniformSubstringsExplicit(s) {
  const MOD = 1000000007;
  let total = 0;
  let start = 0;

  while (start < s.length) {
    let end = start;
    // Expand while characters are the same
    while (end < s.length && s[end] === s[start]) {
      end++;
    }

    const length = end - start;
    // Add triangular number for this homogeneous group
    total = (total + (length * (length + 1)) / 2) % MOD;

    start = end; // Move to next different character
  }

  return total;
}

// Custom Test Cases
console.log("Test 1:", countUniformSubstrings("abbcccaa")); // 13
console.log("Test 2:", countUniformSubstrings("xy")); // 2
console.log("Test 3:", countUniformSubstrings("zzzzz")); // 15
console.log("Test 4:", countUniformSubstrings("a")); // 1
console.log("Test 5:", countUniformSubstrings("aa")); // 3

// Edge cases
console.log("Edge 1 - Single char:", countUniformSubstrings("a")); // 1
console.log("Edge 2 - All different:", countUniformSubstrings("abc")); // 3
console.log("Edge 3 - Long uniform:", countUniformSubstrings("aaaaa")); // 15
console.log("Edge 4 - Mixed long:", countUniformSubstrings("aaabbb")); // 3+6=9

// Let's trace through the first example
console.log("\n--- Tracing 'abbcccaa' ---");
console.log("Group 'a': length=1 → 1*(2)/2 = 1");
console.log("Group 'bb': length=2 → 2*(3)/2 = 3");
console.log("Group 'ccc': length=3 → 3*(4)/2 = 6");
console.log("Group 'aa': length=2 → 2*(3)/2 = 3");
console.log("Total: 1 + 3 + 6 + 3 = 13");
/*
Implemented O(n) solution to count all homogenous substrings. 
Tracks contiguous runs of identical characters and uses 
L*(L+1)/2 formula for efficient accumulation. 
Handles large results using modulo 1e9+7 and ensures minimal 
space usage with a single-pass approach.
*/
