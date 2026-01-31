/*
1980. Find Unique Binary String
Medium
Topics
premium lock icon
Companies
Hint
Given an array of strings nums containing n unique binary strings each of length n, return a binary string of length n that does not appear in nums. If there are multiple answers, you may return any of them.

 

Example 1:

Input: nums = ["01","10"]
Output: "11"
Explanation: "11" does not appear in nums. "00" would also be correct.
Example 2:

Input: nums = ["00","01"]
Output: "11"
Explanation: "11" does not appear in nums. "10" would also be correct.
Example 3:

Input: nums = ["111","011","001"]
Output: "101"
Explanation: "101" does not appear in nums. "000", "010", "100", and "110" would also be correct.
 

Constraints:

n == nums.length
1 <= n <= 16
nums[i].length == n
nums[i] is either '0' or '1'.
All the strings of nums are unique.
*/
function findDifferentBinaryString(nums) {
  let n = nums.length;
  let result = [];
  for (let i = 0; i < n; i++) {
    // Flip the diagonal bit
    result.push(nums[i][i] === "0" ? "1" : "0");
  }

  return result.join("");
}

/*
"""
#Plan
Approach: Diagonal Construction (Cantor's Diagonal Argument)

Key Insight: There are 2^n possible binary strings of length n, but we only have n strings.
Since n <= 16, 2^n (65,536) is much larger than n (16), so many strings are missing.

We can use a clever diagonal construction:
- For position i (0 to n-1), look at the i-th character of the i-th string
- Flip that bit (0→1, 1→0) and use it for our result's i-th position

This guarantees the result differs from every string in at least one position.

Alternative: Since n is small (≤16), we can also brute force check all possibilities.

Time Complexity: O(n) for diagonal method, O(n * 2^n) for brute force
Space Complexity: O(n) for result string
"""
Commit Message:
"Implemented missing binary string finder using diagonal construction. Guarantees finding a valid solution by flipping bits along the diagonal, ensuring the result differs from every input string in at least one position. Efficient O(n) solution."

This solution demonstrates mathematical elegance by applying Cantor's diagonal argument to efficiently solve what appears to be a search problem!
*/

/**
 * Finds a missing binary code from the collection
 * @param {string[]} codes - Array of unique binary strings
 * @return {string} - A binary string not in the collection
 */
function findMissingBinaryCode(codes) {
  const n = codes.length;
  let result = "";

  // Diagonal construction: flip the i-th bit of the i-th string
  for (let i = 0; i < n; i++) {
    // Flip the bit at position i of string i
    const bit = codes[i][i];
    result += bit === "0" ? "1" : "0";
  }

  return result;
}

// Brute force approach (guaranteed to find a solution)
function findMissingBinaryCodeBruteForce(codes) {
  const n = codes.length;
  const codeSet = new Set(codes);

  // Try all possible binary strings of length n
  for (let i = 0; i < 1 << n; i++) {
    // Convert number to binary string with leading zeros
    let candidate = i.toString(2).padStart(n, "0");
    if (!codeSet.has(candidate)) {
      return candidate;
    }
  }

  return ""; // Should never reach here due to constraints
}

// Alternative: Generate by flipping each position
function findMissingBinaryCodeFlip(codes) {
  const n = codes.length;
  let result = "";

  // For each position, choose the less common bit
  for (let i = 0; i < n; i++) {
    let count0 = 0,
      count1 = 0;

    // Count 0s and 1s at position i across all codes
    for (const code of codes) {
      if (code[i] === "0") count0++;
      else count1++;
    }

    // Choose the bit that appears less frequently
    // This increases chances of finding a missing code quickly
    result += count0 <= count1 ? "0" : "1";
  }

  // Verify this code is actually missing (should be with high probability)
  const codeSet = new Set(codes);
  if (!codeSet.has(result)) {
    return result;
  }

  // If by chance it exists, use diagonal method as fallback
  return findMissingBinaryCode(codes);
}

// Custom Test Cases
console.log("Test 1:", findMissingBinaryCode(["01", "10"])); // "11" or "00"
console.log("Test 2:", findMissingBinaryCode(["00", "01"])); // "11" or "10"
console.log("Test 3:", findMissingBinaryCode(["111", "011", "001"])); // "101" etc.
console.log("Test 4:", findMissingBinaryCode(["000", "001", "010"])); // "111" etc.

// Edge cases
console.log("Edge 1 - n=1:", findMissingBinaryCode(["0"])); // "1"
console.log("Edge 2 - n=1:", findMissingBinaryCode(["1"])); // "0"
console.log(
  "Edge 3 - All zeros:",
  findMissingBinaryCode(["000", "001", "010"])
); // "111" etc.

// Let's trace through the examples
console.log("\n--- Tracing Examples ---");
console.log("Input: ['01','10']");
console.log("Position 0: codes[0][0] = '0' → flip to '1'");
console.log("Position 1: codes[1][1] = '0' → flip to '1'");
console.log("Result: '11'");
console.log("\nInput: ['111','011','001']");
console.log("Position 0: codes[0][0] = '1' → flip to '0'");
console.log("Position 1: codes[1][1] = '1' → flip to '0'");
console.log("Position 2: codes[2][2] = '1' → flip to '0'");
console.log("Result: '000' (but '101' is also valid)");
