/*
520. Detect Capital
Easy
Topics
premium lock icon
Companies
We define the usage of capitals in a word to be right when one of the following cases holds:

All letters in this word are capitals, like "USA".
All letters in this word are not capitals, like "leetcode".
Only the first letter in this word is capital, like "Google".
Given a string word, return true if the usage of capitals in it is right.

 

Example 1:

Input: word = "USA"
Output: true
Example 2:

Input: word = "FlaG"
Output: false
 

Constraints:

1 <= word.length <= 100
word consists of lowercase and uppercase English letters.
*/
function isProperlyCapitalized(word) {
  let capitalCount = 0;
  let n = word.length;

  // Count uppercase letters
  for (let i = 0; i < n; i++) {
    if (word[i] === word[i].toUpperCase()) {
      capitalCount++;
    }
  }

  // Check the three valid cases
  return (
    capitalCount === n || // All the letters are capital
    capitalCount === 0 || // All the letters are lowercase
    (capitalCount === 1 && word[0] === word[0].toUpperCase()) // Only first letter is capital
  );
}
/*
"""
#Plan
Approach: Pattern Matching

We need to check which of the three valid patterns the word matches:

1. All uppercase: Every character is capital
2. All lowercase: Every character is lowercase  
3. Title case: First character capital, rest lowercase

Algorithm:
1. Check if all characters are uppercase
2. Check if all characters are lowercase
3. Check if only first character is uppercase and rest are lowercase
4. Return true if any of these conditions match

We can optimize by:
- Checking the first character to determine likely pattern
- Using early returns when possible

Time Complexity: O(n) - we scan the string once
Space Complexity: O(1) - only using primitive variables
"""
*/

/**
 * Inspects if a word follows royal capitalization rules
 * @param {string} word - The word to inspect
 * @return {boolean} - True if word is properly capitalized
 */
function isProperlyCapitalized(word) {
  // Case 1: All uppercase
  if (word === word.toUpperCase()) {
    return true;
  }

  // Case 2: All lowercase
  if (word === word.toLowerCase()) {
    return true;
  }

  // Case 3: Only first character uppercase, rest lowercase
  if (
    word[0] === word[0].toUpperCase() &&
    word.slice(1) === word.slice(1).toLowerCase()
  ) {
    return true;
  }

  // Doesn't match any valid pattern
  return false;
}

// More efficient single-pass version
function isProperlyCapitalizedEfficient(word) {
  let capitalCount = 0;
  const n = word.length;

  // Count uppercase letters
  for (let i = 0; i < n; i++) {
    if (word[i] === word[i].toUpperCase()) {
      capitalCount++;
    }
  }

  // Check the three valid cases:
  // 1. All capitals (capitalCount === n)
  // 2. All lowercase (capitalCount === 0)
  // 3. Only first capital (capitalCount === 1 AND first char is uppercase)
  return (
    capitalCount === n ||
    capitalCount === 0 ||
    (capitalCount === 1 && word[0] === word[0].toUpperCase())
  );
}

// Regex approach (for completeness)
function isProperlyCapitalizedRegex(word) {
  // Matches: all caps | all lowercase | first capital only
  return /^[A-Z]+$|^[a-z]+$|^[A-Z][a-z]*$/.test(word);
}

// Custom Test Cases
console.log("Test 1:", isProperlyCapitalized("USA")); // true (all caps)
console.log("Test 2:", isProperlyCapitalized("leetcode")); // true (all lowercase)
console.log("Test 3:", isProperlyCapitalized("Google")); // true (title case)
console.log("Test 4:", isProperlyCapitalized("FlaG")); // false (invalid)
console.log("Test 5:", isProperlyCapitalized("gOOGLE")); // false (invalid)
console.log("Test 6:", isProperlyCapitalized("A")); // true (single capital)
console.log("Test 7:", isProperlyCapitalized("a")); // true (single lowercase)

// Edge cases
console.log("Edge 1 - Single char:", isProperlyCapitalized("Z")); // true
console.log("Edge 2 - Two chars valid:", isProperlyCapitalized("Ab")); // true
console.log("Edge 3 - Two chars invalid:", isProperlyCapitalized("aB")); // false
console.log("Edge 4 - All same case:", isProperlyCapitalized("HELLO")); // true
console.log("Edge 5 - Mixed invalid:", isProperlyCapitalized("HeLLo")); // false

// Let's trace the efficient version
console.log("\n--- Tracing Efficient Version ---");
console.log("'USA': capitalCount = 3, n = 3 → capitalCount === n ✓ → true");
console.log("'leetcode': capitalCount = 0 → capitalCount === 0 ✓ → true");
console.log(
  "'Google': capitalCount = 1 AND first char 'G' is uppercase ✓ → true"
);
console.log("'FlaG': capitalCount = 2 → doesn't match any valid case → false");
