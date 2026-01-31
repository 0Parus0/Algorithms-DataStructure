/*
792. Number of Matching Subsequences
Medium
Topics
premium lock icon
Companies
Given a string s and an array of strings words, return the number of words[i] that is a subsequence of s.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
 

Example 1:

Input: s = "abcde", words = ["a","bb","acd","ace"]
Output: 3
Explanation: There are three strings in words that are a subsequence of s: "a", "acd", "ace".
Example 2:

Input: s = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]
Output: 2
 

Constraints:

1 <= s.length <= 5 * 104
1 <= words.length <= 5000
1 <= words[i].length <= 50
s and words[i] consist of only lowercase English letters.
 
*/
function numMatchingSubseq(s, words) {
  // Preprocess positions of each character in s
  const pos = Array.from({ length: 26 }, () => []);
  for (let i = 0; i < s.length; i++) {
    pos[s.charCodeAt(i) - 97].push(i);
  }

  let count = 0;

  // Binary search helper
  function nextIndex(arr, target) {
    let left = 0,
      right = arr.length - 1,
      ans = -1;

    while (left <= right) {
      const mid = (left + right) >> 1;
      if (arr[mid] >= target) {
        ans = arr[mid];
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }

    return ans;
  }

  // Check each word
  for (let word of words) {
    let prev = -1;
    let valid = true;

    for (let ch of word) {
      const list = pos[ch.charCodeAt(0) - 97];
      if (list.length === 0) {
        valid = false;
        break;
      }

      const next = nextIndex(list, prev + 1);
      if (next === -1) {
        valid = false;
        break;
      }

      prev = next;
    }

    if (valid) count++;
  }

  return count;
}

/*
*⏱ Time & Space Complexity
Time Complexity

Preprocessing: O(n)

Each word: O(k log n)
Overall:
O(n + m * k * log n)
Where

n = s.length

m = number of words

k = word length

Very efficient for constraints.

Space Complexity

Character index lists: O(n)
Total: O(n)s
* Commit Message
Optimized subsequence matching using character index buckets and 
binary search for fast progression. 
Each word is validated in O(k log n) time, enabling efficient 
handling of up to 5000 words and large input strings. 
Clean, scalable, and production-ready implementation.
*/
/* Used Upper Bound */
var numMatchingSubseq = function (s, words) {
  // Step 1: Preprocess positions of each character
  const pos = Array.from({ length: 26 }, () => []);
  for (let i = 0; i < s.length; i++) {
    pos[s.charCodeAt(i) - 97].push(i);
  }

  // Binary search: find smallest index >= target
  const lowerBound = (arr, target) => {
    let l = 0,
      r = arr.length;
    while (l < r) {
      const mid = (l + r) >> 1;
      if (arr[mid] < target) l = mid + 1;
      else r = mid;
    }
    return l;
  };

  let count = 0;

  // Step 2: Check each word
  for (let word of words) {
    let prevIndex = -1;
    let isSubsequence = true;

    for (let ch of word) {
      const list = pos[ch.charCodeAt(0) - 97];
      if (list.length === 0) {
        isSubsequence = false;
        break;
      }

      // Find first index >= prevIndex + 1
      const idx = lowerBound(list, prevIndex + 1);

      if (idx === list.length) {
        isSubsequence = false;
        break;
      }

      prevIndex = list[idx];
    }

    if (isSubsequence) count++;
  }

  return count;
};
/*
"""
#Plan
Approach: Next Letter Pointers (Character Bucketing)

Since we have many words to check against the same string s, we can optimize by:

1. Group words by their next needed character
2. Process s character by character, advancing words that match
3. When a word is fully matched, count it

Algorithm:
- Create buckets for each character (a-z) containing words waiting for that character
- For each char in s:
  - Get all words waiting for this char
  - For each word, move to next character and place in appropriate bucket
  - If word is complete, increment count

Time Complexity: O(n + m * L) where n = len(s), m = num words, L = avg word length
Space Complexity: O(m) for storing word pointers
"""
*/

/**
 * Counts how many codes are hidden sequences in the master code
 * @param {string} masterCode - The master string to search in
 * @param {string[]} secretCodes - Array of codes to check
 * @return {number} - Number of valid hidden sequences
 */
function countHiddenSequences(masterCode, secretCodes) {
  // Create buckets for each character
  const buckets = Array.from({ length: 26 }, () => []);
  let matchCount = 0;

  // Initialize: place each word in bucket for its first character
  for (const word of secretCodes) {
    if (word.length === 0) {
      matchCount++; // empty word is always a subsequence
    } else {
      const firstChar = word[0];
      buckets[charToIndex(firstChar)].push([word, 0]); // [word, currentIndex]
    }
  }

  // Process each character in masterCode
  for (const char of masterCode) {
    const bucketIndex = charToIndex(char);
    const currentBucket = buckets[bucketIndex];
    buckets[bucketIndex] = []; // Clear the bucket

    // Process all words waiting for this character
    for (const [word, index] of currentBucket) {
      const nextIndex = index + 1;

      if (nextIndex === word.length) {
        // Word is fully matched!
        matchCount++;
      } else {
        // Move to next character and place in appropriate bucket
        const nextChar = word[nextIndex];
        buckets[charToIndex(nextChar)].push([word, nextIndex]);
      }
    }
  }

  return matchCount;
}

// Helper function to convert character to bucket index
function charToIndex(char) {
  return char.charCodeAt(0) - "a".charCodeAt(0);
}

// Alternative approach: Binary Search for each character
function countHiddenSequencesBS(masterCode, secretCodes) {
  // Preprocess: store positions of each character in masterCode
  const charPositions = Array.from({ length: 26 }, () => []);

  for (let i = 0; i < masterCode.length; i++) {
    const index = charToIndex(masterCode[i]);
    charPositions[index].push(i);
  }

  let count = 0;

  // Check each word using binary search
  for (const word of secretCodes) {
    if (isSubsequenceBS(word, charPositions)) {
      count++;
    }
  }

  return count;
}

function isSubsequenceBS(word, charPositions) {
  let currentPos = -1;

  for (const char of word) {
    const positions = charPositions[charToIndex(char)];

    // Binary search for the smallest position > currentPos
    let left = 0,
      right = positions.length;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (positions[mid] > currentPos) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    if (left === positions.length) {
      return false; // Character not found after current position
    }

    currentPos = positions[left];
  }

  return true;
}

// Custom Test Cases
console.log(
  "Test 1:",
  countHiddenSequences("abcde", ["a", "bb", "acd", "ace"])
); // 3
console.log(
  "Test 2:",
  countHiddenSequences("dsahjpjauf", [
    "ahjpjau",
    "ja",
    "ahbwzgqnuk",
    "tnmlanowax",
  ])
); // 2
console.log(
  "Test 3:",
  countHiddenSequences("aaaa", ["a", "aa", "aaa", "aaaa"])
); // 4
console.log("Test 4:", countHiddenSequences("abc", ["d", "e", "f"])); // 0
console.log("Test 5:", countHiddenSequences("", ["a", "b"])); // 0

// Edge cases
console.log("Edge 1 - Empty words:", countHiddenSequences("abc", [""])); // 1
console.log("Edge 2 - Empty master:", countHiddenSequences("", [""])); // 1
console.log("Edge 3 - Single char:", countHiddenSequences("a", ["a"])); // 1
console.log("Edge 4 - Long word:", countHiddenSequences("abc", ["abcdef"])); // 0

// Let's trace through the first example
console.log("\n--- Tracing 'abcde' with ['a','bb','acd','ace'] ---");
console.log("Initial buckets:");
console.log("Bucket 'a': ['a'(0), 'acd'(0), 'ace'(0)]");
console.log("Bucket 'b': ['bb'(0)]");
console.log("Processing 'a':");
console.log("  'a' → complete! count=1");
console.log("  'acd' → move to 'c', bucket 'c': ['acd'(1)]");
console.log("  'ace' → move to 'c', bucket 'c': ['acd'(1), 'ace'(1)]");
console.log("Processing 'b':");
console.log("  'bb' → move to 'b', bucket 'b': ['bb'(1)]");
console.log("Processing 'c':");
console.log("  'acd' → move to 'd', bucket 'd': ['acd'(2)]");
console.log("  'ace' → move to 'e', bucket 'e': ['ace'(2)]");
console.log("Processing 'd':");
console.log("  'acd' → complete! count=2");
console.log("Processing 'e':");
console.log("  'ace' → complete! count=3");
console.log("Final count: 3");
