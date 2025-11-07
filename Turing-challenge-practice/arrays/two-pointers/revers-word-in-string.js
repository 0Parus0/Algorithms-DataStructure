/**
151. Reverse Words in a String
Medium

Given an input string s, reverse the order of the words.

A word is defined as a sequence of non-space characters. The words in s will be separated by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words. The returned string should only have a single space separating the words. Do not include any extra spaces.

 

Example 1:

Input: s = "the sky is blue"
Output: "blue is sky the"

Example 2:

Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.

Example 3:

Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.

 

Constraints:

    1 <= s.length <= 104
    s contains English letters (upper-case and lower-case), digits, and spaces ' '.
    There is at least one word in s.

#Plan:
1. Understand The Problem: 
  - Reverse the order of words in the given string s.
  - Words are sequences of non-space characters.
  - Output should contain words separated by a single space.
  - No leading/trailing spaces.

2. Break down input data & transformation:
  - Input: 
    - String containing words separated by spaces (may have multiple space, leading and/or trailing spaces).
  - Transformation: 
    - Split into words (ignoring empty strings caused by extra spaces).
    - Reverse the order of words.
    - Join them back into a string with a single space.
  
3. Edge cases:
  - Leading/trailing spaces -> remove them in final output. 
  - Multiple space between words -> reduce to single space. 
  - Single word -> return the same word without extra spaces.

4. Data structures: 
 - Array to store split words.

5. Approach:
  - Trim leading/trailing spaces.
  - Split string by spaces.
  - Filter out empty strings (caused by multiple spaces).
  - Reverse the array.
  - Join with a single space.

6. Time and Space Complexity:
  - Time: O(N) (splitting, reversing, and joining all take linear time).
  - Space O(N) (array of words).
*/

function reverseWords(s) {
  // Step 1: Trim spaces and split into words
  let words = s.trim().split(/\s+/); // \s+ matches one or more spaces

  // // Step 2: Reverse the array
  // words.reverse();
  let i = 0,
    j = words.length - 1;
  while (i < j) {
    [words[i], words[j]] = [words[j], words[i]];
    i++;
    j--;
  }
  // Step 3: Join with single space
  return words.join(" ");
}

/* 
# Custom Test Cases
*/
console.log(reverseWords("the sky is blue")); // "blue is sky the"
console.log(reverseWords("  hello world  ")); // "world hello"
console.log(reverseWords("a good   example")); // "example good a"
console.log(reverseWords("single")); // "single"
console.log(reverseWords("   spaced    out   words   ")); // "words out spaced"

/**
Commit message:
Implemented logic for reversing words in a string:
  - Trimmed leading/trailing spaces and handled multiple spaces using regex split(\s+).
  - Reversed words array and joined with a single space for clean output.
  - Covered edge cases: extra spaces, single word multiple spaces between words.
  - Added custom test cases for verification.
*/
