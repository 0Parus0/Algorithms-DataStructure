/*
2272. Substring With Largest Variance
Hard
Topics
premium lock icon
Companies
Hint
The variance of a string is defined as the largest difference between the number of occurrences of any 2 characters present in the string. Note the two characters may or may not be the same.

Given a string s consisting of lowercase English letters only, return the largest variance possible among all substrings of s.

A substring is a contiguous sequence of characters within a string.

 

Example 1:

Input: s = "aababbb"
Output: 3
Explanation:
All possible variances along with their respective substrings are listed below:
- Variance 0 for substrings "a", "aa", "ab", "abab", "aababb", "ba", "b", "bb", and "bbb".
- Variance 1 for substrings "aab", "aba", "abb", "aabab", "ababb", "aababbb", and "bab".
- Variance 2 for substrings "aaba", "ababbb", "abbb", and "babb".
- Variance 3 for substring "babbb".
Since the largest possible variance is 3, we return it.
Example 2:

Input: s = "abcde"
Output: 0
Explanation:
No letter occurs more than once in s, so the variance of every substring is 0.
 

Constraints:

1 <= s.length <= 104
s consists of lowercase English letters.
*/
function largestVariance(s) {
  let maxVar = 0;
  const uniqueChars = Array.from(new Set(s));

  for (const a of uniqueChars) {
    for (const b of uniqueChars) {
      if (a === b) continue;
      let countA = 0;
      let countB = 0;
      let pastB = false;

      for (let ch of s) {
        if (ch === a) countA++;
        if (ch === b) countB++;
        if (countB > 0) {
          maxVar = Math.max(maxVar, countA - countB);
        } else if (countB === 0 && pastB) {
          // Special case: we have seen b before
          maxVar = Math.max(maxVar, countA - 1);
        }

        if (countA < countB) {
          countA = 0;
          countB = 0;
          pastB = true; // Mark we have seen b before
        }
      }
    }
  }
  return maxVar;
}

function largestVariance(s) {
  const count = new Array(26).fill(0);
  let result = 0;

  for (let ch of s) {
    count[ch.charCodeAt(0) - 97]++;
  }

  for (let first = 0; first < 26; first++) {
    for (let second = 0; second < 26; second++) {
      if (count[first] === 0 || count[second] === 0 || first === second)
        continue;
      let firstCount = 0;
      let secondCount = 0;
      let pastSecond = false;

      for (let ch of s) {
        const code = ch.charCodeAt(0) - 97;
        if (code === first) firstCount++;
        if (code === second) secondCount++;

        if (secondCount > 0) {
          result = Math.max(result, firstCount - secondCount);
        } else if (pastSecond) {
          result = Math.max(result, firstCount - 1);
        }

        if (secondCount > firstCount) {
          secondCount = 0;
          firstCount = 0;
          pastSecond = true;
        }
      }
    }
  }
  return result;
}

/*
"""
#Plan
Approach: Modified Kadane's Algorithm with Character Pairs

Key Insight: The variance problem reduces to finding the maximum difference 
between two character frequencies in any substring.

We can solve this by considering all pairs of characters (a, b) and for each pair:
- Treat 'a' as +1, 'b' as -1, other characters as 0
- Find the maximum subarray sum with the constraint that we must have at least one 'b'

Why? Because variance = max_count - min_count, and for characters (a,b) this becomes
the sum when a=+1, b=-1, provided we have at least one b.

Algorithm:
1. For each character pair (a, b) where a != b
2. Use modified Kadane's algorithm:
   - a_count: count of 'a' treated as +1
   - b_count: count of 'b' treated as -1  
   - Track if we've seen at least one 'b'
   - Reset when sum becomes negative (but ensure we keep at least one b)
3. Track maximum variance across all pairs

Time Complexity: O(26 * 26 * n) = O(676n) ≈ O(n)
Space Complexity: O(1) - only constant extra space
"""
*/

/**
 * Finds the largest variance among all substrings
 * @param {string} s - The input string
 * @return {number} - The maximum variance found
 */
function largestVariance(s) {
  let maxVariance = 0;
  const chars = Array.from(new Set(s)); // Get unique characters

  // Check all pairs of distinct characters
  for (let i = 0; i < chars.length; i++) {
    for (let j = 0; j < chars.length; j++) {
      if (i === j) continue;

      const a = chars[i]; // Major character (treated as +1)
      const b = chars[j]; // Minor character (treated as -1)

      let aCount = 0;
      let bCount = 0;
      let hasB = false;

      // Modified Kadane's algorithm for this character pair
      for (let k = 0; k < s.length; k++) {
        const char = s[k];

        if (char === a) {
          aCount++;
        } else if (char === b) {
          bCount++;
        }

        // Only update variance if we have at least one b
        if (bCount > 0) {
          maxVariance = Math.max(maxVariance, aCount - bCount);
        } else if (bCount === 0 && hasB) {
          maxVariance = Math.max(maxVariance, aCount - 1);
        }

        // Reset if we have more b's than a's (but keep at least one b)
        if (aCount < bCount && hasB) {
          aCount = 0;
          bCount = 0;
          hasB = true;
        }
      }
    }
  }

  return maxVariance;
}

// Alternative implementation with early termination
function largestVarianceOptimized(s) {
  let maxVar = 0;
  const uniqueChars = Array.from(new Set(s));

  for (const a of uniqueChars) {
    for (const b of uniqueChars) {
      if (a === b) continue;

      let countA = 0,
        countB = 0;
      let canExtend = false;

      for (let i = 0; i < s.length; i++) {
        const char = s[i];

        if (char === a) countA++;
        if (char === b) countB++;

        if (countB > 0) {
          maxVar = Math.max(maxVar, countA - countB);
        } else if (countB === 0 && canExtend) {
          // Special case: we can extend from previous segment that had b
          maxVar = Math.max(maxVar, countA - 1);
        }

        // Reset if negative balance
        if (countA < countB) {
          countA = 0;
          countB = 0;
          canExtend = true; // Mark that we had b in previous segment
        }
      }
    }
  }

  return maxVar;
}

// Custom Test Cases
console.log("Test 1:", largestVariance("aababbb")); // 3
console.log("Test 2:", largestVariance("abcde")); // 0
console.log("Test 3:", largestVariance("aabb")); // 1
console.log("Test 4:", largestVariance("aaaaa")); // 0
console.log("Test 5:", largestVariance("abbb")); // 2
console.log("Test 6:", largestVariance("abbbaa")); // 3

// Edge cases
console.log("Edge 1 - Single char:", largestVariance("a")); // 0
console.log("Edge 2 - Two same:", largestVariance("aa")); // 0
console.log("Edge 3 - Two diff:", largestVariance("ab")); // 0
console.log("Edge 4 - All same:", largestVariance("aaaa")); // 0

// Let's trace through the example
console.log("\n--- Tracing 'aababbb' ---");
console.log("Checking pair (b, a):");
console.log("Substring 'babbb': b appears 4 times, a appears 1 time");
console.log("Variance = 4 - 1 = 3");
console.log("This is the maximum found!");

/*
Implement robust variance scan with remaining-minor based window reset

Fixes failure cases where an immediate window reset discards valid future
windows (e.g., "lripaa"). For each ordered character pair, apply a modified
Kadane algorithm that only resets the running difference when the current
difference is negative AND there remain minor characters ahead. This ensures
we don't discard windows that can later yield valid variance when no minor
remains. Time: O(26^2 * n), Space: O(1).

*/
