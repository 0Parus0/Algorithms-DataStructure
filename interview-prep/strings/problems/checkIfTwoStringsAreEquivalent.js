/*
1662. Check If Two String Arrays are Equivalent
Given two string arrays word1 and word2, return true if the two arrays represent the same string, and false otherwise.A string is represented by an array if the array elements concatenated in order forms the string.

Example 1:Input: word1 = ["ab", "c"], word2 = ["a", "bc"]
Output: true
Explanation:
word1 represents string "ab" + "c" -> "abc"
word2 represents string "a" + "bc" -> "abc"
The strings are the same, so return true.

Example 2:Input: word1 = ["a", "cb"], word2 = ["ab", "c"]
Output: false
Example 3:Input: word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
Output: true

Constraints:1 <= word1.length, word2.length <= 103
1 <= word1[i].length, word2[i].length <= 103
1 <= sum(word1[i].length), sum(word2[i].length) <= 103
word1[i] and word2[i] consist of lowercase letters.
 
*/

function arrayStringsAreEqual(word1, word2) {
  const l1 = word1.length;
  const l2 = word2.length;
  // Pointers for word1
  let w1 = 0;
  let i = 0;
  // Pointers for word2
  let w2 = 0;
  let j = 0;

  while (w1 < l1 && w2 < l2) {
    if (word1[w1][i] !== word2[w2][j]) return false;
    i++;
    j++;
    if (i === word1[w1].length) {
      w1++;
      i = 0;
    }
    if (j === word2[w2].length) {
      w2++;
      j = 0;
    }
  }

  return w1 === l1 && w2 === l2;
}

function arrayStringsAreEqual1(words1, words2) {
  let w1 = 0; // Word index for words1
  let w2 = 0; // Word index for words2
  let i = 0; // Character index for current word in words1
  let j = 0; // Character index for current word in words2

  // Continue as long as there are words left in both arrays
  while (w1 < words1.length && w2 < words2.length) {
    // 1. Get the current characters
    let char1 = words1[w1][i];
    let char2 = words2[w2][j];

    console.log("Word1-Alphabet:", char1, "| Word2-Alphabet:", char2);

    // 2. Logic: If characters don't match, we can stop early
    if (char1 !== char2) return false;

    // 3. Move to the next character in both
    i++;
    j++;

    // 4. Check if we reached the end of the current word in words1
    if (i === words1[w1].length) {
      w1++; // Move to next word
      i = 0; // Reset character pointer
    }

    // 5. Check if we reached the end of the current word in words2
    if (j === words2[w2].length) {
      w2++; // Move to next word
      j = 0; // Reset character pointer
    }
  }

  // Final check: Both should have finished at the same time
  return w1 === words1.length && w2 === words2.length;
}

// Example:
// arrayStringsAreEqual(["ab", "c"], ["a", "bc"]);

console.log(arrayStringsAreEqual(["abc", "d", "defg"], ["abcddefgl"]));

function printAllAlphabets(word1, word2) {
  let w1 = 0,
    i = 0; // Pointers for word1
  let w2 = 0,
    j = 0; // Pointers for word2

  // Keep going as long as there is something left in word1 OR word2
  while (w1 < word1.length || w2 < word2.length) {
    // 1. If word1 is not finished, print and move pointer
    if (w1 < word1.length) {
      console.log("Word1-Alphabet: ", word1[w1][i]);
      i++;
      // If we reached the end of the current word
      if (i === word1[w1].length) {
        w1++; // Move to next word
        i = 0; // Reset character index
      }
    }

    // 2. If word2 is not finished, print and move pointer
    if (w2 < word2.length) {
      console.log("Word2-Alphabet: ", word2[w2][j]);
      j++;
      // If we reached the end of the current word
      if (j === word2[w2].length) {
        w2++; // Move to next word
        j = 0; // Reset character index
      }
    }
  }
}

// Example usage:
const word1 = ["abc", "d", "defg"];
const word2 = ["abcddefgl"];
// printAllAlphabets(word1, word2);
