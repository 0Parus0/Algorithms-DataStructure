/*
869. Reordered Power of 2
Medium
Topics
premium lock icon
Companies
You are given an integer n. We reorder the digits in any order (including the original order) such that the leading digit is not zero.

Return true if and only if we can do this so that the resulting number is a power of two.

 

Example 1:

Input: n = 1
Output: true
Example 2:

Input: n = 10
Output: false
 

Constraints:

1 <= n <= 109
*/
// ========================================================================
// 1.  Best and Optimal
// ========================================================================
function reorderedPowerOf2(n) {
  // Most efficient approach: sort digits and compare with precomputed powers
  const sortedN = n.toString().split("").sort().join("");

  // Generate powers of 2 up to 2^30 (1,073,741,824)
  for (let i = 0; i < 31; i++) {
    const power = 1 << i; // Bit shift for faster calculation
    const sortedPower = power.toString().split("").sort().join("");
    if (sortedN === sortedPower) return true;
  }

  return false;
}

function reorderedPowerOf2_Approach1(n) {
  // Sort the digits of input number
  const sortedN = n.toString().split("").sort().join("");

  // Generate all powers of 2 up to 10^9 (since n <= 10^9)
  // 2^30 is about 1.07 billion, which is > 10^9
  for (let i = 0; i <= 30; i++) {
    const power = Math.pow(2, i);
    const sortedPower = power.toString().split("").sort().join("");

    if (sortedN === sortedPower) {
      return true;
    }
  }

  return false;
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================

function reorderedPowerOf2_Approach2(n) {
  // Create frequency array for the input number
  function getFrequency(num) {
    const freq = new Array(10).fill(0);
    num
      .toString()
      .split("")
      .forEach((digit) => {
        freq[parseInt(digit)]++;
      });
    return freq.join(",");
  }

  const nFreq = getFrequency(n);

  // Check against all powers of 2
  for (let i = 0; i <= 30; i++) {
    const power = Math.pow(2, i);
    if (getFrequency(power) === nFreq) {
      return true;
    }
  }

  return false;
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================

function reorderedPowerOf2_Approach3(n) {
  // Precompute all powers of 2 up to 10^9
  const powers = new Set();
  for (let i = 0; i <= 30; i++) {
    powers.add(Math.pow(2, i));
  }

  const digits = n.toString().split("");
  const used = new Array(digits.length).fill(false);
  const result = new Array(digits.length);

  // Try all permutations using backtracking
  function backtrack(position) {
    if (position === digits.length) {
      const num = parseInt(result.join(""));
      // Check if leading digit is zero
      if (result[0] !== "0" && powers.has(num)) {
        return true;
      }
      return false;
    }

    for (let i = 0; i < digits.length; i++) {
      if (used[i]) continue;

      // Skip duplicate permutations
      if (i > 0 && digits[i] === digits[i - 1] && !used[i - 1]) continue;

      used[i] = true;
      result[position] = digits[i];
      if (backtrack(position + 1)) return true;
      used[i] = false;
    }
    return false;
  }

  // Sort to handle duplicates
  digits.sort();
  return backtrack(0);
}

// ========================================================================
// 1. SECTION NAME
// ========================================================================

function reorderedPowerOf2_Approach4(n) {
  // Create a map to cache results
  const cache = new Map();

  function getKey(num) {
    const freq = new Array(10).fill(0);
    num
      .toString()
      .split("")
      .forEach((d) => {
        freq[parseInt(d)]++;
      });
    return freq.join("-");
  }

  // Precompute and store all power-of-2 keys
  const powerKeys = new Set();
  for (let i = 0; i <= 30; i++) {
    const power = Math.pow(2, i);
    const key = getKey(power);
    powerKeys.add(key);
    cache.set(power, key);
  }

  const nKey = getKey(n);
  return powerKeys.has(nKey);
}

// Test cases
console.log(reorderedPowerOf2(1)); // true
console.log(reorderedPowerOf2(10)); // false
console.log(reorderedPowerOf2(46)); // true (64)
console.log(reorderedPowerOf2(125)); // true (512)
console.log(reorderedPowerOf2(128)); // true
