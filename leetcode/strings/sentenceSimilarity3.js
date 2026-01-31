/*
1813. Sentence Similarity III
Medium
Topics
premium lock icon
Companies
Hint
You are given two strings sentence1 and sentence2, each representing a sentence composed of words. A sentence is a list of words that are separated by a single space with no leading or trailing spaces. Each word consists of only uppercase and lowercase English characters.

Two sentences s1 and s2 are considered similar if it is possible to insert an arbitrary sentence (possibly empty) inside one of these sentences such that the two sentences become equal. Note that the inserted sentence must be separated from existing words by spaces.

For example,

s1 = "Hello Jane" and s2 = "Hello my name is Jane" can be made equal by inserting "my name is" between "Hello" and "Jane" in s1.
s1 = "Frog cool" and s2 = "Frogs are cool" are not similar, since although there is a sentence "s are" inserted into s1, it is not separated from "Frog" by a space.
Given two sentences sentence1 and sentence2, return true if sentence1 and sentence2 are similar. Otherwise, return false.

 

Example 1:

Input: sentence1 = "My name is Haley", sentence2 = "My Haley"

Output: true

Explanation:

sentence2 can be turned to sentence1 by inserting "name is" between "My" and "Haley".

Example 2:

Input: sentence1 = "of", sentence2 = "A lot of words"

Output: false

Explanation:

No single sentence can be inserted inside one of the sentences to make it equal to the other.

Example 3:

Input: sentence1 = "Eating right now", sentence2 = "Eating"

Output: true

Explanation:

sentence2 can be turned to sentence1 by inserting "right now" at the end of the sentence.

 

Constraints:

1 <= sentence1.length, sentence2.length <= 100
sentence1 and sentence2 consist of lowercase and uppercase English letters and spaces.
The words in sentence1 and sentence2 are separated by a single space.
*/

function areSentencesSimilar(s1, s2) {
  if (s1.length < s2.length) {
    [s1, s2] = [s2, s1]; // Swap s2 with s1
  }

  let words1 = s1.split(" ");
  let words2 = s2.split(" ");

  let i = 0,
    j = words1.length - 1;
  let k = 0,
    l = words2.length - 1;

  while (i < words1.length && k < words2.length && words1[i] === words2[k]) {
    i++;
    k++;
  }

  while (l >= k && words1[j] === words2[l]) {
    j--;
    l--;
  }

  return l < k;
}

/*
"""
#Plan
Approach: Two-Pointer Word Matching

Key Insight: After insertion, both sentences become identical. This means:
- One sentence is a subsequence of the other when split into words
- The matching words must appear in the same order
- The non-matching words must form a contiguous block that can be inserted

Algorithm:
1. Split both sentences into word arrays
2. Find the longest common prefix (from start)
3. Find the longest common suffix (from end)  
4. Check if prefix + suffix covers the shorter sentence completely

In other words: The shorter sentence should match from the start AND end 
of the longer sentence, with the middle part being the insertable phrase.

Time Complexity: O(m + n) where m, n are number of words
Space Complexity: O(m + n) for storing word arrays
"""
*/
/**
 * Determines if two sentences can be made similar by inserting one phrase
 * @param {string} sentence1 - First sentence
 * @param {string} sentence2 - Second sentence
 * @return {boolean} - True if sentences are similar
 */
function areSentencesSimilar(sentence1, sentence2) {
  // Split sentences into word arrays
  const words1 = sentence1.split(" ");
  const words2 = sentence2.split(" ");

  // Ensure words1 is the shorter array for easier processing
  if (words1.length > words2.length) {
    return areSentencesSimilar(sentence2, sentence1);
  }

  const m = words1.length;
  const n = words2.length;

  // Find longest matching prefix
  let prefixLen = 0;
  while (prefixLen < m && words1[prefixLen] === words2[prefixLen]) {
    prefixLen++;
  }

  // Find longest matching suffix
  let suffixLen = 0;
  while (
    suffixLen < m &&
    words1[m - 1 - suffixLen] === words2[n - 1 - suffixLen]
  ) {
    suffixLen++;
  }

  // Check if prefix + suffix covers the entire shorter sentence
  return prefixLen + suffixLen >= m;
}

// Alternative implementation with clearer variable names
function areSentencesSimilarDetailed(sentence1, sentence2) {
  let words1 = sentence1.split(" ");
  let words2 = sentence2.split(" ");

  // Make sure words1 is the shorter sentence
  if (words1.length > words2.length) {
    [words1, words2] = [words2, words1];
  }

  let left = 0;
  // Match from left until words differ
  while (left < words1.length && words1[left] === words2[left]) {
    left++;
  }

  let right = 0;
  // Match from right until words differ
  while (
    right < words1.length - left &&
    words1[words1.length - 1 - right] === words2[words2.length - 1 - right]
  ) {
    right++;
  }

  // If left + right matches cover entire shorter sentence, they're similar
  return left + right >= words1.length;
}

// Two-pointer approach without array swapping
function areSentencesSimilarTwoPointer(sentence1, sentence2) {
  let words1 = sentence1.split(" ");
  let words2 = sentence2.split(" ");

  // Make sure words1 is the shorter sentence
  if (words1.length > words2.length) {
    [words1, words2] = [words2, words1];
  }

  const m = words1.length;
  const n = words2.length;

  // Two pointers for sentence1
  let i = 0,
    j = m - 1;
  // Two pointers for sentence2
  let x = 0,
    y = n - 1;

  // Match from start
  while (i <= j && x <= y && words1[i] === words2[x]) {
    i++;
    x++;
  }

  // Match from end
  while (i <= j && x <= y && words1[j] === words2[y]) {
    j--;
    y--;
  }

  // If we've matched all words in shorter sentence, they're similar
  return i > j;
}

// Custom Test Cases
console.log("Test 1:", areSentencesSimilar("My name is Haley", "My Haley")); // true
console.log("Test 2:", areSentencesSimilar("of", "A lot of words")); // false
console.log("Test 3:", areSentencesSimilar("Eating right now", "Eating")); // true
console.log(
  "Test 4:",
  areSentencesSimilar("Hello Jane", "Hello my name is Jane")
); // true
console.log("Test 5:", areSentencesSimilar("Frog cool", "Frogs are cool")); // false

// Edge cases
console.log(
  "Edge 1 - Identical:",
  areSentencesSimilar("hello world", "hello world")
); // true
console.log("Edge 2 - Empty insertion:", areSentencesSimilar("a", "a b")); // true
console.log("Edge 3 - Insert at start:", areSentencesSimilar("b", "a b")); // true
console.log("Edge 4 - Insert at end:", areSentencesSimilar("a", "a b")); // true
console.log("Edge 5 - No match:", areSentencesSimilar("a b", "c d")); // false

// Let's trace through the examples
console.log("\n--- Tracing 'My name is Haley' vs 'My Haley' ---");
console.log("Words1: ['My', 'name', 'is', 'Haley']");
console.log("Words2: ['My', 'Haley']");
console.log("Prefix match: 'My' → prefixLen=1");
console.log("Suffix match: 'Haley' → suffixLen=1");
console.log("Total matched: 1 + 1 = 2, shorter length: 2 → 2 >= 2 ✓ → true");

console.log("\n--- Tracing 'of' vs 'A lot of words' ---");
console.log("Words1: ['of']");
console.log("Words2: ['A', 'lot', 'of', 'words']");
console.log("Prefix match: '' → prefixLen=0");
console.log("Suffix match: 'of' → suffixLen=1");
console.log("Total matched: 0 + 1 = 1, shorter length: 1 → 1 >= 1 ✓");
console.log("Wait, this suggests true but expected false! Let me check...");
