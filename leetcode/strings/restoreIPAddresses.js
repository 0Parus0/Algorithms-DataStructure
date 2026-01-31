/*
93. Restore IP Addresses
Medium
Topics
premium lock icon
Companies
A valid IP address consists of exactly four integers separated by single dots. Each integer is between 0 and 255 (inclusive) and cannot have leading zeros.

For example, "0.1.2.201" and "192.168.1.1" are valid IP addresses, but "0.011.255.245", "192.168.1.312" and "192.168@1.1" are invalid IP addresses.
Given a string s containing only digits, return all possible valid IP addresses that can be formed by inserting dots into s. You are not allowed to reorder or remove any digits in s. You may return the valid IP addresses in any order.

 

Example 1:

Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
Example 2:

Input: s = "0000"
Output: ["0.0.0.0"]
Example 3:

Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
 

Constraints:

1 <= s.length <= 20
s consists of digits only.
*/

/**
 * Restore valid IP addresses using backtracking.
 * Time Complexity: O(3^4) = O(81) per valid path (very small)
 * Space Complexity: O(1) extra (besides recursion stack)
 */

function restoreIpAddresses(s) {
  const result = [];
  const n = s.length;

  // Early pruning: string must be between 4 and 12 chars for a valid IP
  if (n < 4 || n > 12) return result;

  function isValid(segment) {
    // No leading zero unless the segment is exactly "0"
    if (segment.length > 1 && segment[0] === "0") return false;

    // Numeric range check
    const num = Number(segment);
    return num >= 0 && num <= 255;
  }

  function backtrack(index, parts) {
    // If we have 4 parts and consumed all digits → a valid IP
    if (parts.length === 4) {
      if (index === n) {
        result.push(parts.join("."));
      }
      return;
    }

    // Try segment lengths of 1 to 3
    for (let len = 1; len <= 3; len++) {
      if (index + len > n) break; // Out of bounds

      const segment = s.slice(index, index + len);

      if (isValid(segment)) {
        parts.push(segment);
        backtrack(index + len, parts);
        parts.pop(); // Backtrack
      }
    }
  }

  backtrack(0, []);
  return result;
}

function buildIPAddress(s) {
  let n = s.length;
  if (n < 4 || n > 12) return [];
  let result = [];

  function isValid(str) {
    if (str.length > 1 && str[0] === "0") return false; // Check for leading 0s
    let val = Number(str);
    return val >= 0 && val <= 255;
  }

  function solve(idx, curr = "", parts = 0) {
    if (idx === n && parts === 4) {
      // curr = curr.slice(0, curr.length - 1); // Remove trailing dot
      curr = curr.slice(0, -1); // Same as above but with negative indices
      result.push(curr);
      return;
    }
    if (parts >= 4 || idx >= n) return; // Early termination

    // Try 1-digit part
    if (idx + 1 <= n) {
      solve(idx + 1, curr + s.slice(idx, idx + 1) + ".", parts + 1);
    }

    // Try 2-digit part
    if (idx + 2 <= n && isValid(s.slice(idx, idx + 2))) {
      solve(idx + 2, curr + s.slice(idx, idx + 2) + ".", parts + 1);
    }

    // Try 3-digit part

    if (idx + 3 <= n && isValid(s.slice(idx, idx + 3))) {
      solve(idx + 3, curr + s.slice(idx, idx + 3, parts + 1));
    }
  }

  solve(0);
}

function buildIPAddress(s) {
  let n = s.length;
  if (n < 4 || n > 12) return [];
  let result = [];

  function isValid(str) {
    if (str.length > 1 && str[0] === "0") return false; // Fix: only check for leading zero if length > 1
    let val = Number(str);
    return val >= 0 && val <= 255; // Fix: also check lower bound
  }

  function solve(idx, curr = "", parts = 0) {
    if (idx === n && parts === 4) {
      result.push(curr.slice(0, -1)); // Remove trailing dot
      return;
    }

    if (parts >= 4 || idx >= n) return; // Early termination

    // Try 1-digit part
    if (idx + 1 <= n) {
      solve(idx + 1, curr + s.slice(idx, idx + 1) + ".", parts + 1);
    }

    // Try 2-digit part (must be valid)
    if (idx + 2 <= n) {
      let twoDigit = s.slice(idx, idx + 2);
      if (isValid(twoDigit)) {
        solve(idx + 2, curr + twoDigit + ".", parts + 1);
      }
    }

    // Try 3-digit part (must be valid)
    if (idx + 3 <= n) {
      let threeDigit = s.slice(idx, idx + 3);
      if (isValid(threeDigit)) {
        solve(idx + 3, curr + threeDigit + ".", parts + 1);
      }
    }
  }

  solve(0);
  return result;
}

/*
"""
#Plan
Approach: Backtracking with Constraints

We need to place exactly 3 dots to create 4 segments, each satisfying:
1. Value between 0-255
2. No leading zeros (unless the segment is exactly "0")
3. All digits must be used in order

Algorithm:
1. Use recursive backtracking to try all valid dot placements
2. At each step, consider segments of length 1, 2, or 3 digits
3. Validate each segment:
   - Cannot start with '0' if length > 1
   - Must be ≤ 255
4. Stop when we have 4 valid segments and used all digits

Time Complexity: O(3^4) = O(81) since we have 3 choices at each of 4 segments
Space Complexity: O(n) for recursion stack and storing results
"""
*/

/**
 * Generates all valid IP addresses from digit string
 * @param {string} digits - String of digits to convert
 * @return {string[]} - Array of valid IP addresses
 */
function buildIPAddresses(digits) {
  const results = [];
  const n = digits.length;

  // Early exit if string is too short or too long for IP
  if (n < 4 || n > 12) {
    return results;
  }

  /**
   * Backtracking function to build IP segments
   * @param {number} start - Current position in digit string
   * @param {string[]} segments - Current IP segments built so far
   * @param {number} segmentCount - Number of segments completed
   */
  function backtrack(start, segments, segmentCount) {
    // Base case: used all digits and have 4 segments
    if (segmentCount === 4 && start === n) {
      results.push(segments.join("."));
      return;
    }

    // Base case: too many segments or used all digits prematurely
    if (segmentCount === 4 || start === n) {
      return;
    }

    // Try segments of length 1, 2, and 3
    for (let len = 1; len <= 3; len++) {
      const end = start + len;

      // Check if we have enough digits remaining
      if (end > n) continue;

      const segment = digits.substring(start, end);

      // Validate the segment
      if (!isValidSegment(segment)) continue;

      // Add segment and recurse
      segments.push(segment);
      backtrack(end, segments, segmentCount + 1);
      segments.pop(); // backtrack
    }
  }

  /**
   * Validates an IP address segment
   * @param {string} segment - The segment to validate
   * @return {boolean} - True if segment is valid
   */
  function isValidSegment(segment) {
    // Check for leading zeros (except single '0')
    if (segment.length > 1 && segment[0] === "0") {
      return false;
    }

    // Check numeric value range
    const value = parseInt(segment, 10);
    return value >= 0 && value <= 255;
  }

  // Start backtracking from the beginning
  backtrack(0, [], 0);
  return results;
}

// Iterative approach for comparison
function buildIPAddressesIterative(digits) {
  const results = [];
  const n = digits.length;

  // Try all possible dot placements
  for (let i = 1; i < 4 && i < n; i++) {
    for (let j = i + 1; j < i + 4 && j < n; j++) {
      for (let k = j + 1; k < j + 4 && k < n; k++) {
        // Extract the four segments
        const seg1 = digits.substring(0, i);
        const seg2 = digits.substring(i, j);
        const seg3 = digits.substring(j, k);
        const seg4 = digits.substring(k);

        // Validate all segments
        if (
          isValidSegment(seg1) &&
          isValidSegment(seg2) &&
          isValidSegment(seg3) &&
          isValidSegment(seg4)
        ) {
          results.push(`${seg1}.${seg2}.${seg3}.${seg4}`);
        }
      }
    }
  }

  return results;

  function isValidSegment(segment) {
    if (segment.length > 1 && segment[0] === "0") return false;
    const value = parseInt(segment, 10);
    return value >= 0 && value <= 255;
  }
}

// Custom Test Cases
console.log("Test 1:", buildIPAddresses("25525511135"));
// Expected: ["255.255.11.135","255.255.111.35"]

console.log("Test 2:", buildIPAddresses("0000"));
// Expected: ["0.0.0.0"]

console.log("Test 3:", buildIPAddresses("101023"));
// Expected: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

console.log("Test 4:", buildIPAddresses("1111"));
// Expected: ["1.1.1.1"]

console.log("Test 5:", buildIPAddresses("010010"));
// Expected: ["0.10.0.10","0.100.1.0"]

// Edge cases
console.log("Edge 1 - Too short:", buildIPAddresses("123")); // []
console.log("Edge 2 - Too long:", buildIPAddresses("1234567890123")); // []
console.log("Edge 3 - Minimum:", buildIPAddresses("0000")); // ["0.0.0.0"]
console.log("Edge 4 - Maximum:", buildIPAddresses("255255255255")); // ["255.255.255.255"]

// Let's trace through a simple example
console.log("\n--- Tracing '0000' ---");
console.log("Valid segments: '0' (valid), '00' (invalid), '000' (invalid)");
console.log("Only path: 0.0.0.0");
console.log("Result: ['0.0.0.0']");
