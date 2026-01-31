/*
Given two strings s and t of lengths m and n respectively, return the minimum window 
substring
 of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.

 

Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.
 

Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.
*/

function minSubstr(s, t) {
  let n = s.length,
    m = t.length;
  let start = 0,
    end = 0,
    result = Infinity,
    index = -1;
  let total = m;
  let map = new Map();

  for (let i = 0; i < m; i++) {
    map.set(t[i], (map.get(t[i]) || 0) + 1);
  }

  while (end < n) {
    let endChar = s[end];
    // If the character is in t, decrease its frequency
    if (map.has(endChar)) {
      map.set(endChar, map.get(endChar) - 1);

      if (map.get(endChar) >= 0) total--; // Valid match
    }

    // Try to shrink the window when all chars are matched
    while (total === 0) {
      if (result > end - start + 1) {
        result = end - start + 1;
        index = start;
      }

      let startChar = s[start];

      // Restore the frequency of the starting char if it's in t
      if (map.has(startChar)) {
        map.set(startChar, map.get(startChar) + 1);
        if (map.get(startChar) > 0) total++;
      }
      start++;
    }

    // increase window
    end++;
  }
  // console.log(map);
  if (index === -1) return "";

  return s.slice(index, index + result);
}

console.log(minSubstr("ADOBECODEBANC", "ABC"));
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

/*
#Plan:
1. Problem Understanding:
   - Find the minimum window in s that contains all characters of t
   - Characters in t can be in any order in the window
   - If no such window exists, return empty string

2. Sliding Window Approach:
   - Use two pointers: start and end to represent current window
   - Use map to track required characters and their frequencies
   - Expand window by moving end pointer
   - When all characters are matched, try to shrink from left
   - Track the minimum valid window

3. Key Variables:
   - map: Frequency count of characters needed from t
   - total: Number of characters still needed to match
   - result: Length of minimum window found
   - index: Starting index of minimum window

4. Algorithm Steps:
   a. Build frequency map from string t
   b. Initialize start=0, end=0, total=length of t
   c. Expand window by moving end pointer:
        - If current character is in map, decrement frequency
        - If frequency becomes non-negative, decrement total
   d. When total=0 (all characters matched):
        - Update minimum window
        - Shrink from left by moving start pointer
        - Restore frequencies and increment total when needed
   e. Return the minimum window substring

5. Complexity:
   - Time: O(|s| + |t|) - each character processed at most twice
   - Space: O(|t|) - for the frequency map
*/

function minWindowSubstring(s, t) {
  let n = s.length,
    m = t.length;
  let start = 0,
    end = 0,
    minLength = Infinity,
    minStart = -1;
  let charsNeeded = m;
  let freqMap = new Map();

  // Build frequency map for string t
  for (let char of t) {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }

  while (end < n) {
    const endChar = s[end];

    // If character is in t, update frequency
    if (freqMap.has(endChar)) {
      freqMap.set(endChar, freqMap.get(endChar) - 1);
      // Only count as matched if we still need this character
      if (freqMap.get(endChar) >= 0) {
        charsNeeded--;
      }
    }

    // When all characters are matched, try to shrink window
    while (charsNeeded === 0) {
      // Update minimum window
      if (end - start + 1 < minLength) {
        minLength = end - start + 1;
        minStart = start;
      }

      // Shrink from left
      const startChar = s[start];
      if (freqMap.has(startChar)) {
        freqMap.set(startChar, freqMap.get(startChar) + 1);
        // If frequency becomes positive, we need this character again
        if (freqMap.get(startChar) > 0) {
          charsNeeded++;
        }
      }
      start++;
    }

    end++;
  }

  return minStart === -1 ? "" : s.substring(minStart, minStart + minLength);
}

// Alternative implementation with detailed comments and logging
function minWindowSubstringDetailed(s, t) {
  let n = s.length,
    m = t.length;
  let start = 0,
    end = 0,
    minLength = Infinity,
    minStart = -1;
  let charsNeeded = m;
  let freqMap = new Map();

  console.log(
    `Finding minimum window in "${s}" containing all characters of "${t}"`
  );

  // Build frequency map
  for (let char of t) {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }
  console.log("Frequency map:", Object.fromEntries(freqMap));

  while (end < n) {
    const endChar = s[end];
    console.log(`\n[end=${end}] Processing '${endChar}'`);

    if (freqMap.has(endChar)) {
      const oldFreq = freqMap.get(endChar);
      freqMap.set(endChar, oldFreq - 1);
      console.log(
        `  '${endChar}' found in t. Frequency: ${oldFreq} -> ${oldFreq - 1}`
      );

      if (oldFreq - 1 >= 0) {
        charsNeeded--;
        console.log(`  Characters still needed: ${charsNeeded}`);
      }
    }

    // Try to shrink window when all characters are matched
    while (charsNeeded === 0) {
      console.log(
        `  ✓ All characters matched! Window: [${start}, ${end}] = "${s.substring(
          start,
          end + 1
        )}"`
      );

      const currentLength = end - start + 1;
      if (currentLength < minLength) {
        console.log(
          `    New minimum window: length ${currentLength} (was ${minLength})`
        );
        minLength = currentLength;
        minStart = start;
      }

      // Shrink from left
      const startChar = s[start];
      console.log(`  Shrinking from left: removing '${startChar}'`);

      if (freqMap.has(startChar)) {
        const oldFreq = freqMap.get(startChar);
        freqMap.set(startChar, oldFreq + 1);
        console.log(
          `    '${startChar}' frequency: ${oldFreq} -> ${oldFreq + 1}`
        );

        if (oldFreq + 1 > 0) {
          charsNeeded++;
          console.log(
            `    Now need '${startChar}' again. Characters needed: ${charsNeeded}`
          );
        }
      }

      start++;
    }

    end++;
  }

  const result =
    minStart === -1 ? "" : s.substring(minStart, minStart + minLength);
  console.log(`\nFinal result: "${result}"`);
  return result;
}

// Optimized version using array for ASCII characters (faster for large inputs)
function minWindowSubstringOptimized(s, t) {
  const n = s.length,
    m = t.length;
  if (n < m) return "";

  let start = 0,
    end = 0,
    minLength = Infinity,
    minStart = -1;
  let charsNeeded = m;

  // Use array for ASCII characters (128 covers all standard ASCII)
  const freqMap = new Array(128).fill(0);

  // Build frequency map
  for (let char of t) {
    freqMap[char.charCodeAt(0)]++;
  }

  while (end < n) {
    const endCharCode = s.charCodeAt(end);

    // If character is in t
    if (freqMap[endCharCode] > 0) {
      charsNeeded--;
    }
    freqMap[endCharCode]--;

    // When all characters are matched
    while (charsNeeded === 0) {
      // Update minimum window
      if (end - start + 1 < minLength) {
        minLength = end - start + 1;
        minStart = start;
      }

      // Shrink from left
      const startCharCode = s.charCodeAt(start);
      freqMap[startCharCode]++;
      if (freqMap[startCharCode] > 0) {
        charsNeeded++;
      }
      start++;
    }

    end++;
  }

  return minStart === -1 ? "" : s.substring(minStart, minStart + minLength);
}

// Custom Test Cases
console.log("=== Test Case 1 ===");
console.log("Input: s = 'ADOBECODEBANC', t = 'ABC'");
console.log("Output:", minWindowSubstring("ADOBECODEBANC", "ABC"));
console.log("Expected: 'BANC'");
console.log("---");

console.log("=== Test Case 2 ===");
console.log("Input: s = 'a', t = 'a'");
console.log("Output:", minWindowSubstring("a", "a"));
console.log("Expected: 'a'");
console.log("---");

console.log("=== Test Case 3 ===");
console.log("Input: s = 'a', t = 'aa'");
console.log("Output:", minWindowSubstring("a", "aa"));
console.log("Expected: ''");
console.log("---");

console.log("=== Test Case 4 ===");
console.log("Input: s = 'abc', t = 'd'");
console.log("Output:", minWindowSubstring("abc", "d"));
console.log("Expected: ''");
console.log("---");

console.log("=== Test Case 5 ===");
console.log("Input: s = 'bba', t = 'ab'");
console.log("Output:", minWindowSubstring("bba", "ab"));
console.log("Expected: 'ba'");
console.log("---");

console.log("=== Test Case 6 ===");
console.log("Input: s = 'aa', t = 'aa'");
console.log("Output:", minWindowSubstring("aa", "aa"));
console.log("Expected: 'aa'");
console.log("---");

// Compare all implementations
function compareImplementations(s, t) {
  console.log(`\n=== Comparing Implementations for s="${s}", t="${t}" ===`);

  const result1 = minWindowSubstring(s, t);
  const result2 = minWindowSubstringOptimized(s, t);

  console.log("Map version:   ", result1);
  console.log("Array version: ", result2);
  console.log("Results match:", result1 === result2);
}

// Run comparisons
compareImplementations("ADOBECODEBANC", "ABC");
compareImplementations("bba", "ab");

// Run detailed example
console.log("\n=== Detailed Step-by-Step Execution ===");
minWindowSubstringDetailed("ADOBECODEBANC", "ABC");

// Performance test
console.log("\n=== Performance Test ===");
const longS = "a".repeat(10000) + "ABC" + "b".repeat(10000);
const longT = "ABC";

console.time("Map Implementation");
const result1 = minWindowSubstring(longS, longT);
console.timeEnd("Map Implementation");

console.time("Array Implementation");
const result2 = minWindowSubstringOptimized(longS, longT);
console.timeEnd("Array Implementation");

console.log(
  `Results: Map="${result1}", Array="${result2}", Match=${result1 === result2}`
);

/*
Commit Message:
Implement minimum window substring using sliding window approach
  - Used frequency map to track required characters from string t
  - Employed two pointers to maintain sliding window in string s
  - Expanded window to include required characters, then shrunk to find minimum
  - Added optimized array-based version for ASCII characters
  - All implementations handle edge cases including no solution and exact matches
  - Time complexity: O(|s| + |t|), Space complexity: O(|t|)
  - Comprehensive test cases verify correctness and performance
*/
