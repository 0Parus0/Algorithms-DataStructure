/*
880. Decoded String at Index
Medium
Topics
premium lock icon
Companies
You are given an encoded string s. To decode the string to a tape, the encoded string is read one character at a time and the following steps are taken:

If the character read is a letter, that letter is written onto the tape.
If the character read is a digit d, the entire current tape is repeatedly written d - 1 more times in total.
Given an integer k, return the kth letter (1-indexed) in the decoded string.

 

Example 1:

Input: s = "leet2code3", k = 10
Output: "o"
Explanation: The decoded string is "leetleetcodeleetleetcodeleetleetcode".
The 10th letter in the string is "o".
Example 2:

Input: s = "ha22", k = 5
Output: "h"
Explanation: The decoded string is "hahahaha".
The 5th letter is "h".
Example 3:

Input: s = "a2345678999999999999999", k = 1
Output: "a"
Explanation: The decoded string is "a" repeated 8301530446056247680 times.
The 1st letter is "a".
 

Constraints:

2 <= s.length <= 100
s consists of lowercase English letters and digits 2 through 9.
s starts with a letter.
1 <= k <= 109
It is guaranteed that k is less than or equal to the length of the decoded string.
The decoded string is guaranteed to have less than 263 lette
*/

function decodeAtIndex(s, k) {
  let size = 0;
  for (let ch of s) {
    if (isNaN(ch)) {
      size++;
    } else {
      size *= Number(ch);
    }
  }

  for (let i = s.length - 1; i >= 0; i--) {
    const ch = s[i];
    // k === 0 will mean the last char of the string
    k %= size;
    if (k === 0 && isNaN(ch)) {
      return ch;
    }

    if (isNaN(ch)) size -= 1;
    // 1-based indexing Math.ceil -- 0-based indexing Math.floor
    else size = Math.ceil(size / Number(ch));
  }
  return ""; // Fallback
}

function decodeAtIndex(s, k) {
  let size = 0;

  // Step 1: Calculate decoded length
  for (let ch of s) {
    if (isNaN(ch)) {
      size++;
    } else {
      size *= Number(ch);
    }
  }

  // Step 2: Walk backwards to find k-th character
  for (let i = s.length - 1; i >= 0; i--) {
    const ch = s[i];
    if (!isNaN(ch)) {
      size = Math.ceil(size / Number(ch));
      k = k % size || size;
    } else {
      // If it's a letter: if K matches size, this is the answer
      if (k === size) return ch;
      size--;
    }
  }
}

/*
"""
#Plan
Approach: Work Backwards from Target Position

The key insight is that we don't need to build the entire decoded string.
Instead, we can work backwards from position k:

1. First, calculate the total length of the decoded string
2. Then traverse the encoded string backwards:
   - If we encounter a digit d:
        k = k % (length before this repetition)
        If k == 0, set k = length before repetition
   - If we encounter a letter:
        If k == current length or k == 0, this is our answer
        Otherwise, decrease the length

Why this works:
- Digits create repetition cycles: the k-th character in "abc" repeated 3 times
  is the same as the (k % len("abc"))-th character in the original "abc"
- We work backwards to find which original character corresponds to position k

Time Complexity: O(n) where n is length of encoded string
Space Complexity: O(1)
"""
*/

/**
 * Finds the k-th letter in the magically decoded string
 * @param {string} encoded - The encoded string with letters and digits
 * @param {number} k - The position to find (1-indexed)
 * @return {string} - The k-th letter
 */
function findKthDecodedLetter(encoded, k) {
  let decodedLength = 0n; // Use BigInt to handle large numbers

  // First pass: calculate total decoded length
  for (const char of encoded) {
    if (isDigit(char)) {
      decodedLength *= BigInt(parseInt(char));
    } else {
      decodedLength++;
    }
  }

  // Convert k to BigInt for consistency
  let pos = BigInt(k);

  // Second pass: work backwards to find the k-th character
  for (let i = encoded.length - 1; i >= 0; i--) {
    const char = encoded[i];

    if (isDigit(char)) {
      const digit = BigInt(parseInt(char));
      decodedLength /= digit; // Go back to length before repetition
      pos %= decodedLength;
      if (pos === 0n) {
        pos = decodedLength;
      }
    } else {
      if (pos === decodedLength || pos === 0n) {
        return char;
      }
      decodedLength--;
    }
  }

  return ""; // Should never reach here given constraints
}

// Helper function to check if character is a digit
function isDigit(char) {
  return char >= "0" && char <= "9";
}

// Alternative implementation without BigInt (works for smaller constraints)
function findKthDecodedLetterSimple(encoded, k) {
  let length = 0;

  // Calculate total length
  for (const char of encoded) {
    if (isDigit(char)) {
      length *= parseInt(char);
    } else {
      length++;
    }
  }

  let pos = k;

  // Work backwards
  for (let i = encoded.length - 1; i >= 0; i--) {
    const char = encoded[i];

    if (isDigit(char)) {
      const digit = parseInt(char);
      length = Math.floor(length / digit);
      pos %= length;
      if (pos === 0) {
        pos = length;
      }
    } else {
      if (pos === length) {
        return char;
      }
      length--;
    }
  }

  return "";
}

// Custom Test Cases
console.log("Test 1:", findKthDecodedLetter("leet2code3", 10)); // "o"
console.log("Test 2:", findKthDecodedLetter("ha22", 5)); // "h"
console.log("Test 3:", findKthDecodedLetter("a2345678999999999999999", 1)); // "a"
console.log("Test 4:", findKthDecodedLetter("abc3", 5)); // "b"
console.log("Test 5:", findKthDecodedLetter("ab2c3", 7)); // "c"

// Edge cases
console.log("Edge 1 - First char:", findKthDecodedLetter("abc", 1)); // "a"
console.log("Edge 2 - Last char:", findKthDecodedLetter("abc", 3)); // "c"
console.log("Edge 3 - Single letter:", findKthDecodedLetter("a2", 2)); // "a"
console.log("Edge 4 - Only digits after:", findKthDecodedLetter("ab2", 4)); // "b"

// Let's trace through the first example
console.log("\n--- Tracing 'leet2code3' with k=10 ---");
console.log("Step 1: Calculate total length");
console.log("  'leet' → length=4");
console.log("  '2' → 4×2=8");
console.log("  'code' → 8+4=12");
console.log("  '3' → 12×3=36");
console.log("Total decoded length: 36");
console.log("\nStep 2: Work backwards from k=10");
console.log("Processing '3': length=36→12, k=10%12=10");
console.log("Processing 'e': length=12→11, k=10");
console.log("Processing 'd': length=11→10, k=10");
console.log("Processing 'o': length=10→9, k=10 → Found! (k == old length)");
console.log("Result: 'o'");

/*
Implemented O(n) reverse-decoding solution for retrieving the k-th character 
from an encoded string without expanding it. Uses length tracking and modulus 
rewinding to locate the correct character efficiently, supporting extremely 
large decoded outputs (up to 2^63 characters).
*/
