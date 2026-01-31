/*
443. String Compression
Medium
Topics
Companies
Hint
Given an array of characters chars, compress it using the following algorithm:

Begin with an empty string s. For each group of consecutive repeating characters in chars:

If the group's length is 1, append the character to s.
Otherwise, append the character followed by the group's length.
The compressed string s should not be returned separately, but instead, be stored in the input character array chars. Note that group lengths that are 10 or longer will be split into multiple characters in chars.

After you are done modifying the input array, return the new length of the array.

You must write an algorithm that uses only constant extra space.

 

Example 1:

Input: chars = ["a","a","b","b","c","c","c"]
Output: Return 6, and the first 6 characters of the input array should be: ["a","2","b","2","c","3"]
Explanation: The groups are "aa", "bb", and "ccc". This compresses to "a2b2c3".
Example 2:

Input: chars = ["a"]
Output: Return 1, and the first character of the input array should be: ["a"]
Explanation: The only group is "a", which remains uncompressed since it's a single character.
Example 3:

Input: chars = ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
Output: Return 4, and the first 4 characters of the input array should be: ["a","b","1","2"].
Explanation: The groups are "a" and "bbbbbbbbbbbb". This compresses to "ab12".
 

Constraints:

1 <= chars.length <= 2000
chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol.
*/

/**
 * Problem Understanding:
 * We’re compressing an array of characters in place.
 * For each consecutive group of same characters:
 *   - If count = 1 → just keep the char.
 *   - If count > 1 → write the char followed by digits of count.
 *
 * The function must modify the input array and return the new length.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function compress(chars) {
  let n = chars.length;
  let index = 0; // write pointer
  let i = 0; // read pointer

  while (i < n) {
    const currChar = chars[i];
    let count = 0;

    // Step 1: Count consecutive occurrences of currChar
    while (i < n && chars[i] === currChar) {
      count++;
      i++;
    }

    // Step 2: Write the character once
    chars[index] = currChar;
    index++;

    // Step 3: If there’s repetition, write each digit of count
    if (count > 1) {
      const countStr = count.toString();
      for (let ch of countStr) {
        chars[index] = ch;
        index++;
      }
    }
  }

  // Step 4: Return new compressed length
  return index;
}

// // Example usage:
// const s = ["a", "a", "b", "b", "c", "c", "c"];
// console.log(compress(s)); // Output: 6

// console.log(
//   compress(["a", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b", "b"]) // Output: 4

// );

/*
#Plan
Approach: Two Pointers Technique

1. Use two pointers - one for reading the original array, one for writing the compressed result
2. Iterate through the array and count consecutive duplicate characters
3. For each group of consecutive duplicates:
   - Write the character at the write pointer
   - If count > 1, convert count to string and write each digit separately
4. Return the new length (write pointer position)

Edge Cases to Handle:
- Single character array
- Arrays with all unique characters
- Groups with counts >= 10 (multi-digit)
- Empty array (though constraints say min length 1)

Time Complexity: O(n) - Single pass through array
Space Complexity: O(1) - In-place modification, constant extra space
*/
/**
 * Compresses array of characters in-place by replacing consecutive duplicates
 * with character and count
 * @param {character[]} chars - Array of characters to compress
 * @return {number} - New length of the compressed array
 */
function compressChorus1(chars) {
  // Edge case: handle empty or single character arrays immediately
  if (chars.length === 0) return 0;
  if (chars.length === 1) return 1;

  let writeIndex = 0; // Tracks where to write compressed characters
  let readIndex = 0; // Scans through original array

  // Iterate through all characters in the array
  while (readIndex < chars.length) {
    const currentChar = chars[readIndex];
    let count = 0;

    // Count consecutive occurrences of the same character
    while (readIndex < chars.length && chars[readIndex] === currentChar) {
      readIndex++;
      count++;
    }

    // Write the character to compressed position
    chars[writeIndex] = currentChar;
    writeIndex++;

    // If count > 1, write the count as separate digits
    if (count > 1) {
      // Convert count to string to handle multi-digit numbers
      const countStr = count.toString();

      // Write each digit of the count separately
      for (let i = 0; i < countStr.length; i++) {
        chars[writeIndex] = countStr[i];
        writeIndex++;
      }
    }
  }

  // Return the new length of the compressed array
  return writeIndex;
}

// Custom Test Cases
console.log(
  "Test Case 1:",
  compressChorus(["a", "a", "b", "b", "c", "c", "c"])
);
// Expected: 6, Array: ["a","2","b","2","c","3"]

console.log("Test Case 2:", compressChorus(["a"]));
// Expected: 1, Array: ["a"]

console.log(
  "Test Case 3:",
  compressChorus([
    "a",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
    "b",
  ])
);
// Expected: 4, Array: ["a","b","1","2"]

console.log("Test Case 4:", compressChorus(["a", "b", "c"]));
// Expected: 3, Array: ["a","b","c"] (all unique characters)

console.log(
  "Test Case 5:",
  compressChorus(["a", "a", "a", "a", "a", "a", "a", "a", "a", "a"])
);
// Expected: 3, Array: ["a","1","0"] (count = 10)

// Edge case: single long sequence
console.log("Test Case 6:", compressChorus(["x", "x", "x", "x", "x"]));
// Expected: 2, Array: ["x","5"]
