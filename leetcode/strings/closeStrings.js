/*
1657. Determine if Two Strings Are Close
Medium
Topics
premium lock icon
Companies
Hint
Two strings are considered close if you can attain one from the other using the following operations:

Operation 1: Swap any two existing characters.
For example, abcde -> aecdb
Operation 2: Transform every occurrence of one existing character into another existing character, and do the same with the other character.
For example, aacabb -> bbcbaa (all a's turn into b's, and all b's turn into a's)
You can use the operations on either string as many times as necessary.

Given two strings, word1 and word2, return true if word1 and word2 are close, and false otherwise.

 

Example 1:

Input: word1 = "abc", word2 = "bca"
Output: true
Explanation: You can attain word2 from word1 in 2 operations.
Apply Operation 1: "abc" -> "acb"
Apply Operation 1: "acb" -> "bca"
Example 2:

Input: word1 = "a", word2 = "aa"
Output: false
Explanation: It is impossible to attain word2 from word1, or vice versa, in any number of operations.
Example 3:

Input: word1 = "cabbba", word2 = "abbccc"
Output: true
Explanation: You can attain word2 from word1 in 3 operations.
Apply Operation 1: "cabbba" -> "caabbb"
Apply Operation 2: "caabbb" -> "baaccc"
Apply Operation 2: "baaccc" -> "abbccc"
 

Constraints:

1 <= word1.length, word2.length <= 105
word1 and word2 contain only lowercase English letters.
*/

function closeStrings(word1, word2) {
  // Step 1: length check
  if (word1.length !== word2.length) return false;

  // Step 2: Frequency count maps
  const freq1 = new Map();
  const freq2 = new Map();

  for (let ch of word1) freq1.set(ch, (freq1.get(ch) || 0) + 1);
  for (let ch of word2) freq2.set(ch, (freq1.get(ch) || 0) + 1);

  // Step 3: Compare sets of characters
  const set1 = [...freq1.keys()].sort().join("");
  const set2 = [...freq2.keys()].sort().join("");
  if (set1 !== set2) return false;

  // Step 4: Compare frequency patterns
  const arr1 = [...freq1.values()].sort((a, b) => a - b);
  const arr2 = [...freq2.values()].sort((a, b) => a - b);

  // Step 5: return comparison result
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

/*
"""
#Plan
Approach: Character Frequency Analysis

After analyzing the magical operations:

Operation 1 (Swapping): 
- Allows us to rearrange characters arbitrarily
- Means the ORDER of characters doesn't matter, only COUNTS matter

Operation 2 (Transformation):
- Allows us to swap frequency counts between characters
- Means we can reassign which character has which frequency

Therefore, two strings are close if:
1. They have the same set of unique characters
2. They have the same multiset of frequency counts

Algorithm:
1. If strings have different lengths → return false
2. Count character frequencies for both strings
3. Check if both have same set of characters
4. Check if sorted frequency arrays are identical

Time Complexity: O(n) for counting + O(26 log 26) for sorting → O(n)
Space Complexity: O(1) since we only store 26 character frequencies
"""
*/

/**
 * Determines if two strings are magically equivalent
 * @param {string} wizard1 - First wizard's string
 * @param {string} wizard2 - Second wizard's string
 * @return {boolean} - True if strings are magically equivalent
 */
function areStringsMagicallyEquivalent(wizard1, wizard2) {
  // Different lengths cannot be equivalent
  if (wizard1.length !== wizard2.length) {
    return false;
  }

  // Count character frequencies for both strings
  const freq1 = new Array(26).fill(0);
  const freq2 = new Array(26).fill(0);

  for (let i = 0; i < wizard1.length; i++) {
    freq1[wizard1.charCodeAt(i) - 97]++; // 'a' = 97
    freq2[wizard2.charCodeAt(i) - 97]++;
  }

  // Check condition 1: Same set of characters
  // A character exists in one string if its frequency > 0
  for (let i = 0; i < 26; i++) {
    if ((freq1[i] > 0 && freq2[i] === 0) || (freq1[i] === 0 && freq2[i] > 0)) {
      return false;
    }
  }

  // Check condition 2: Same multiset of frequencies
  // Sort frequency arrays and compare
  const sortedFreq1 = freq1.filter((count) => count > 0).sort((a, b) => a - b);
  const sortedFreq2 = freq2.filter((count) => count > 0).sort((a, b) => a - b);

  // Compare sorted frequency arrays
  if (sortedFreq1.length !== sortedFreq2.length) {
    return false;
  }

  for (let i = 0; i < sortedFreq1.length; i++) {
    if (sortedFreq1[i] !== sortedFreq2[i]) {
      return false;
    }
  }

  return true;
}

// More concise version using JavaScript built-ins
function areStringsMagicallyEquivalentConcise(wizard1, wizard2) {
  if (wizard1.length !== wizard2.length) return false;

  // Get character frequency maps
  const getCharSetAndFreq = (str) => {
    const freq = new Map();
    for (const char of str) {
      freq.set(char, (freq.get(char) || 0) + 1);
    }
    return {
      chars: new Set(str),
      counts: Array.from(freq.values()).sort((a, b) => a - b),
    };
  };

  const analysis1 = getCharSetAndFreq(wizard1);
  const analysis2 = getCharSetAndFreq(wizard2);

  // Compare character sets and sorted frequency counts
  return (
    analysis1.chars.size === analysis2.chars.size &&
    analysis1.chars.size ===
      new Set([...analysis1.chars, ...analysis2.chars]).size &&
    JSON.stringify(analysis1.counts) === JSON.stringify(analysis2.counts)
  );
}

// Custom Test Cases
console.log("Test 1:", areStringsMagicallyEquivalent("abc", "bca")); // true
console.log("Test 2:", areStringsMagicallyEquivalent("a", "aa")); // false
console.log("Test 3:", areStringsMagicallyEquivalent("cabbba", "abbccc")); // true
console.log("Test 4:", areStringsMagicallyEquivalent("abc", "def")); // false
console.log("Test 5:", areStringsMagicallyEquivalent("aabb", "bbaa")); // true
console.log("Test 6:", areStringsMagicallyEquivalent("aaab", "bbba")); // false

// Edge cases
console.log("Edge 1 - Empty strings:", areStringsMagicallyEquivalent("", "")); // true
console.log(
  "Edge 2 - Single char same:",
  areStringsMagicallyEquivalent("a", "a")
); // true
console.log(
  "Edge 3 - Single char different:",
  areStringsMagicallyEquivalent("a", "b")
); // false
console.log(
  "Edge 4 - All same chars:",
  areStringsMagicallyEquivalent("aaa", "aaa")
); // true

// Let's trace one example to understand the logic
console.log("\n--- Tracing 'cabbba' vs 'abbccc' ---");
console.log(
  "Word1: 'cabbba' → chars: {a, b, c}, frequencies: [a:2, b:3, c:1] → sorted: [1, 2, 3]"
);
console.log(
  "Word2: 'abbccc' → chars: {a, b, c}, frequencies: [a:1, b:2, c:3] → sorted: [1, 2, 3]"
);
console.log("Same character set ✓, Same frequency multiset ✓ → Result: true");
