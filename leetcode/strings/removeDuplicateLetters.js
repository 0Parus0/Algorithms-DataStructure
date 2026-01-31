/*
Medium
Topics
premium lock icon
Companies
Hint
Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.

 

Example 1:

Input: s = "bcabc"
Output: "abc"
Example 2:

Input: s = "cbacdcbc"
Output: "acdb"
 

Constraints:

1 <= s.length <= 104
s consists of lowercase English letters.
 

Note: This question is the same as 1081: https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/
*/
var removeDuplicateLetters = function (s) {
  const stack = [];
  const seen = new Set();
  const lastIndex = {};

  // Step 1: Record last index of each char
  for (let i = 0; i < s.length; i++) {
    lastIndex[s[i]] = i;
  }

  // Step 2: Build stack
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (seen.has(ch)) continue; // skip duplicates

    // Pop chars that are bigger than current and occur later
    while (
      stack.length &&
      ch < stack[stack.length - 1] &&
      i < lastIndex[stack[stack.length - 1]]
    ) {
      seen.delete(stack.pop());
    }

    stack.push(ch);
    seen.add(ch);
  }

  // Step 3: Convert stack to string
  return stack.join("");
};

/*
🎯 Time & Space Complexity

Time: O(n) — Each char is pushed and popped at most once.

Space: O(1) extra space (stack + set + map ≤ 26 characters).
* Commit message
Implemented removeDuplicateLetters using greedy stack approach.
Maintains lexicographically smallest result while ensuring each character appears once.
Optimized O(n) solution with last occurrence tracking and stack operations.
*/

/*
"""
#Plan
Approach: Stack with Last Occurrence Tracking

We need to build the smallest lexicographical string while ensuring:
- Each character appears exactly once
- We maintain the relative order of first occurrences

Key Insight: Use a stack to build the result and track:
1. Last occurrence of each character (to know if we can remove it safely)
2. Whether a character is already in the result

Algorithm:
1. Track last occurrence index of each character
2. Use stack to build result string
3. For each character:
   - If already in stack, skip
   - While stack not empty and current char < top of stack and top char appears later:
        pop from stack (we can get this character later)
   - Push current character to stack
4. Join stack to get result

Time Complexity: O(n) - each character pushed and popped at most once
Space Complexity: O(1) - fixed size arrays for 26 letters
"""
*/
/**
 * Sculpts the smallest unique-letter string in lex order
 * @param {string} s - Input string with duplicates
 * @return {string} - Smallest string with unique letters
 */
function sculptSmallestUniqueString(s) {
  // Track last occurrence of each character
  const lastOccurrence = new Array(26).fill(-1);
  for (let i = 0; i < s.length; i++) {
    const idx = charToIndex(s[i]);
    lastOccurrence[idx] = i;
  }

  const stack = [];
  const inStack = new Array(26).fill(false);

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const charIdx = charToIndex(char);

    // If character already in result, skip
    if (inStack[charIdx]) continue;

    // While we can make the result smaller by removing from stack
    while (
      stack.length > 0 &&
      char < stack[stack.length - 1] &&
      lastOccurrence[charToIndex(stack[stack.length - 1])] > i
    ) {
      // Remove the top character (we can get it later)
      const removedChar = stack.pop();
      inStack[charToIndex(removedChar)] = false;
    }

    // Add current character to result
    stack.push(char);
    inStack[charIdx] = true;
  }

  return stack.join("");
}

// Helper function
function charToIndex(char) {
  return char.charCodeAt(0) - "a".charCodeAt(0);
}

// Alternative implementation with detailed comments
function sculptSmallestUniqueStringDetailed(s) {
  const lastIndex = new Map();
  // Record the last occurrence of each character
  for (let i = 0; i < s.length; i++) {
    lastIndex.set(s[i], i);
  }

  const stack = [];
  const seen = new Set();

  for (let i = 0; i < s.length; i++) {
    const currentChar = s[i];

    // If we've already included this character, skip
    if (seen.has(currentChar)) continue;

    // While we can improve lex order by removing from stack
    while (
      stack.length > 0 &&
      currentChar < stack[stack.length - 1] &&
      lastIndex.get(stack[stack.length - 1]) > i
    ) {
      // Remove the character from stack and seen set
      const removed = stack.pop();
      seen.delete(removed);
    }

    // Add current character to result
    stack.push(currentChar);
    seen.add(currentChar);
  }

  return stack.join("");
}

// Custom Test Cases
console.log("Test 1:", sculptSmallestUniqueString("bcabc")); // "abc"
console.log("Test 2:", sculptSmallestUniqueString("cbacdcbc")); // "acdb"
console.log("Test 3:", sculptSmallestUniqueString("abcd")); // "abcd"
console.log("Test 4:", sculptSmallestUniqueString("ecbacba")); // "eacb"
console.log("Test 5:", sculptSmallestUniqueString("leetcode")); // "letcod"

// Edge cases
console.log("Edge 1 - Single char:", sculptSmallestUniqueString("a")); // "a"
console.log("Edge 2 - All same:", sculptSmallestUniqueString("aaaa")); // "a"
console.log("Edge 3 - Already unique:", sculptSmallestUniqueString("abc")); // "abc"
console.log("Edge 4 - Reverse order:", sculptSmallestUniqueString("cba")); // "cba"

// Let's trace through the second example
console.log("\n--- Tracing 'cbacdcbc' ---");
console.log("Last occurrences: c:7, b:6, a:2, d:4");
console.log("Processing:");
console.log("  'c' → stack: ['c'], seen: {'c'}");
console.log("  'b' → b < c and c appears later → pop 'c'");
console.log("        stack: ['b'], seen: {'b'}");
console.log("  'a' → a < b and b appears later → pop 'b'");
console.log("        stack: ['a'], seen: {'a'}");
console.log("  'c' → c > a, push → stack: ['a','c'], seen: {'a','c'}");
console.log("  'd' → d > c, push → stack: ['a','c','d'], seen: {'a','c','d'}");
console.log("  'c' → already in stack, skip");
console.log(
  "  'b' → b < d but d's last occurrence (4) < current (6)? No, keep d"
);
console.log(
  "        b < c but c's last occurrence (7) > current (6)? Yes, pop c"
);
console.log("        stack: ['a','d'], b > d? No, b > a? Yes, push b");
console.log("        stack: ['a','d','b'], seen: {'a','d','b'}");
console.log("  'c' → c > b, push → stack: ['a','d','b','c']");
console.log("Result: 'acdb'");
