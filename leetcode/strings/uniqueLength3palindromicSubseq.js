/*
1930. Unique Length-3 Palindromic Subsequences
Medium
Topics
premium lock icon
Companies
Hint
Given a string s, return the number of unique palindromes of length three that are a subsequence of s.

Note that even if there are multiple ways to obtain the same subsequence, it is still only counted once.

A palindrome is a string that reads the same forwards and backwards.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
 

Example 1:

Input: s = "aabca"
Output: 3
Explanation: The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "aabca")
- "aaa" (subsequence of "aabca")
- "aca" (subsequence of "aabca")
Example 2:

Input: s = "adc"
Output: 0
Explanation: There are no palindromic subsequences of length 3 in "adc".
Example 3:

Input: s = "bbcbaba"
Output: 4
Explanation: The 4 palindromic subsequences of length 3 are:
- "bbb" (subsequence of "bbcbaba")
- "bcb" (subsequence of "bbcbaba")
- "bab" (subsequence of "bbcbaba")
- "aba" (subsequence of "bbcbaba")
 

Constraints:

3 <= s.length <= 105
s consists of only lowercase English letters.
*/
function countPalindromicSubsequence(s) {
  const n = s.length;
  const first = new Array(26).fill(-1);
  const last = new Array(26).fill(-1);

  // Record first and last occurrences of each character
  for (let i = 0; i < n; i++) {
    let idx = s[i].charCodeAt(0) - 97;
    if (first[idx] === -1) first = i;
    last[idx] = i;
  }

  let result = 0;

  // For each character a-z
  for (let c = 0; c < 26; c++) {
    if (first[c] === -1 || first[c] === last[c]) continue; // Need at least 2 occurrences

    let left = first[c];
    let right = last[c];
    let middleSet = new Set();

    for (let i = left + 1; i < right; i++) {
      middleSet.add(s[i]);
    }
    result += middleSet.size; // Each unique middle gives a palindrome c ? c
  }
  return result;
}

/*
"""
#Plan
Approach: Track First and Last Occurrences

For length-3 palindromes, they must be of the form: "aba" where a and b are characters

Key Insight:
1. The outer two characters must be the same
2. The middle character can be anything
3. We can find all unique middle characters between first and last occurrence of each outer character

Algorithm:
1. For each character (a-z), find its first and last occurrence in the string
2. For each character pair (outer characters), count unique middle characters between first and last
3. Sum up all unique middle counts for all outer characters

Time Complexity: O(26 × n) ≈ O(n)
Space Complexity: O(1) - fixed size arrays for 26 letters
"""

Commit Message:
Implemented O(26 * n) solution to count unique length-3 palindromic 
subsequences. For each character, track first and last occurrence
and gather distinct middle characters to form valid c?c palindromes.
Uses efficient set counting and a single scan for optimal performance.

*/
/**
 * Hunts for unique three-letter palindromic sequences
 * @param {string} text - The ancient text to search
 * @return {number} - Number of unique three-letter palindromic sequences
 */
function countThreeLetterPalindromes(text) {
  const firstOccurrence = new Array(26).fill(-1);
  const lastOccurrence = new Array(26).fill(-1);

  // Record first and last occurrence of each character
  for (let i = 0; i < text.length; i++) {
    const idx = charToIndex(text[i]);
    if (firstOccurrence[idx] === -1) {
      firstOccurrence[idx] = i;
    }
    lastOccurrence[idx] = i;
  }

  let count = 0;

  // For each possible outer character
  for (let i = 0; i < 26; i++) {
    const first = firstOccurrence[i];
    const last = lastOccurrence[i];

    // If this character appears at least twice (for outer positions)
    if (first !== -1 && last !== -1 && first < last) {
      // Count unique characters between first and last occurrence
      const uniqueMiddles = new Set();

      for (let j = first + 1; j < last; j++) {
        uniqueMiddles.add(text[j]);
      }

      count += uniqueMiddles.size;
    }
  }

  return count;
}

// More optimized version using precomputation
function countThreeLetterPalindromesOptimized(text) {
  const n = text.length;
  const first = new Array(26).fill(Infinity);
  const last = new Array(26).fill(-1);

  // Find first and last occurrence of each character
  for (let i = 0; i < n; i++) {
    const idx = charToIndex(text[i]);
    first[idx] = Math.min(first[idx], i);
    last[idx] = Math.max(last[idx], i);
  }

  let result = 0;

  // For each character as outer pair
  for (let i = 0; i < 26; i++) {
    if (first[i] >= last[i]) continue; // Need at least two occurrences

    const uniqueBetween = new Set();
    // Check all positions between first and last occurrence
    for (let pos = first[i] + 1; pos < last[i]; pos++) {
      uniqueBetween.add(text[pos]);
    }
    result += uniqueBetween.size;
  }

  return result;
}

// Helper function
function charToIndex(char) {
  return char.charCodeAt(0) - "a".charCodeAt(0);
}

// Alternative approach using prefix sums (for very large constraints)
function countThreeLetterPalindromesPrefix(text) {
  const n = text.length;
  const first = new Array(26).fill(-1);
  const last = new Array(26).fill(-1);

  for (let i = 0; i < n; i++) {
    const idx = charToIndex(text[i]);
    if (first[idx] === -1) first[idx] = i;
    last[idx] = i;
  }

  // Precompute prefix character counts
  const prefix = Array.from({ length: n + 1 }, () => new Array(26).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 26; j++) {
      prefix[i + 1][j] = prefix[i][j] + (charToIndex(text[i]) === j ? 1 : 0);
    }
  }

  let count = 0;

  for (let i = 0; i < 26; i++) {
    if (first[i] === -1 || last[i] === -1 || first[i] >= last[i]) continue;

    // Count how many distinct characters appear between first and last
    for (let j = 0; j < 26; j++) {
      if (prefix[last[i]][j] - prefix[first[i] + 1][j] > 0) {
        count++;
      }
    }
  }

  return count;
}

// Custom Test Cases
console.log("Test 1:", countThreeLetterPalindromes("aabca")); // 3
console.log("Test 2:", countThreeLetterPalindromes("adc")); // 0
console.log("Test 3:", countThreeLetterPalindromes("bbcbaba")); // 4
console.log("Test 4:", countThreeLetterPalindromes("aaa")); // 1
console.log("Test 5:", countThreeLetterPalindromes("abcba")); // 3

// Edge cases
console.log("Edge 1 - Minimum length:", countThreeLetterPalindromes("aaa")); // 1
console.log("Edge 2 - No palindromes:", countThreeLetterPalindromes("abc")); // 0
console.log("Edge 3 - All same:", countThreeLetterPalindromes("aaaa")); // 1
console.log("Edge 4 - Two chars only:", countThreeLetterPalindromes("aab")); // 0

// Let's trace through the first example
console.log("\n--- Tracing 'aabca' ---");
console.log("Character 'a': first=0, last=4");
console.log("  Between positions 0 and 4: characters at [1,2,3] = 'a','b','c'");
console.log(
  "  Unique middles: {'a','b','c'} → 3 palindromes: 'aaa', 'aba', 'aca'"
);
console.log("Character 'b': first=2, last=2 → skip (need at least two)");
console.log("Character 'c': first=3, last=3 → skip");
console.log("Total: 3");
