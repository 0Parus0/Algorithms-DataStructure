/*
68. Text Justification
Hard
Topics
premium lock icon
Companies
Given an array of strings words and a width maxWidth, format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line does not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left-justified, and no extra space is inserted between words.

Note:

A word is defined as a character sequence consisting of non-space characters only.
Each word's length is guaranteed to be greater than 0 and not exceed maxWidth.
The input array words contains at least one word.
 

Example 1:

Input: words = ["This", "is", "an", "example", "of", "text", "justification."], maxWidth = 16
Output:
[
   "This    is    an",
   "example  of text",
   "justification.  "
]
Example 2:

Input: words = ["What","must","be","acknowledgment","shall","be"], maxWidth = 16
Output:
[
  "What   must   be",
  "acknowledgment  ",
  "shall be        "
]
Explanation: Note that the last line is "shall be    " instead of "shall     be", because the last line must be left-justified instead of fully-justified.
Note that the second line is also left-justified because it contains only one word.
Example 3:

Input: words = ["Science","is","what","we","understand","well","enough","to","explain","to","a","computer.","Art","is","everything","else","we","do"], maxWidth = 20
Output:
[
  "Science  is  what we",
  "understand      well",
  "enough to explain to",
  "a  computer.  Art is",
  "everything  else  we",
  "do                  "
]
 

Constraints:

1 <= words.length <= 300
1 <= words[i].length <= 20
words[i] consists of only English letters and symbols.
1 <= maxWidth <= 100
words[i].length <= maxWidth
*/
function fullJustify(words, maxWidth) {
  const result = [];
  let i = 0;

  while (i < words.length) {
    let j = i + 1;
    let lineLength = words[i].length; // total letters
    let gaps = 0;

    // Greedily fit words into the line
    while (j < words.length && lineLength + words[j] + gaps + 1 <= maxWidth) {
      lineLength += words[j].length;
      gaps++;
      j++;
    }

    const isLastLine = j === words.length;
    const totalSpaces = maxWidth - lineLength;

    let baseSpaces = 1;
    let extraSpaces = 0;

    // If not the last line and there is more than one word
    if (!isLastLine && gaps > 0) {
      baseSpaces = Math.floor(totalSpaces / gaps);
      extraSpaces = totalSpaces % gaps;
    }

    result.push(
      buildLine(words, i, j, baseSpaces, extraSpaces, maxWidth, isLastLine)
    );
    i = j; // Move to next line
  }

  function buildLine(words, start, end, base, extra, maxWidth, isLastLine) {
    // If last line -> left justify with single space
    if (isLastLine) {
      const line = words.slice(start, end).join(" ");
      return line + " ".repeat(maxWidth - line.length);
    }

    let line = "";
    for (let k = start; k < end; k++) {
      line += words[k];

      if (k === end - 1) break; // last word -> no space after

      line += " ".repeat(base);
      if (extra > 0) {
        line += " ";
        extra--;
      }
    }

    // Fill tailing space if needed
    while (line.length < maxWidth) line += " ";
    return line;
  }
  return result;
}
/*
"""
#Plan
Approach: Line-by-line processing with space distribution

1. Group words into lines using greedy approach:
   - Add words until adding another would exceed maxWidth
   - Calculate needed spaces and distribute them

2. For each line (except last):
   - If single word: left-justify with spaces at end
   - If multiple words: distribute spaces evenly with left bias

3. Last line: left-justified with single spaces

Algorithm Steps:
- Iterate through words, building lines
- For each line, calculate total spaces needed
- Distribute spaces between words
- Handle edge cases (single word, last line)

Time Complexity: O(n) where n is number of words
Space Complexity: O(n) for output array
"""
*/
/**
 * Formats text according to royal scroll rules
 * @param {string[]} words - Array of words to format
 * @param {number} maxWidth - Maximum width of each line
 * @return {string[]} - Formatted lines
 */
function formatRoyalScroll(words, maxWidth) {
  const result = [];
  let currentLine = [];
  let currentLength = 0;

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    // Check if we can add this word to current line
    // currentLength + word length + spaces between words
    if (currentLength + word.length + currentLine.length <= maxWidth) {
      currentLine.push(word);
      currentLength += word.length;
    } else {
      // Process current line and start new one
      result.push(formatLine(currentLine, currentLength, maxWidth, false));
      currentLine = [word];
      currentLength = word.length;
    }
  }

  // Process the last line (left-justified)
  if (currentLine.length > 0) {
    result.push(formatLine(currentLine, currentLength, maxWidth, true));
  }

  return result;
}

/**
 * Formats a single line according to justification rules
 * @param {string[]} lineWords - Words in the line
 * @param {number} wordsLength - Total length of all words
 * @param {number} maxWidth - Maximum line width
 * @param {boolean} isLastLine - Whether this is the last line
 * @return {string} - Formatted line
 */
function formatLine(lineWords, wordsLength, maxWidth, isLastLine) {
  const totalSpaces = maxWidth - wordsLength;
  const wordCount = lineWords.length;

  // Last line or single word: left-justified
  if (isLastLine || wordCount === 1) {
    return lineWords.join(" ") + " ".repeat(totalSpaces - (wordCount - 1));
  }

  // Multiple words: distribute spaces evenly
  const baseSpaces = Math.floor(totalSpaces / (wordCount - 1));
  const extraSpaces = totalSpaces % (wordCount - 1);

  let result = "";

  for (let i = 0; i < wordCount - 1; i++) {
    result += lineWords[i];
    // Add base spaces + one extra if we have extras remaining
    result += " ".repeat(baseSpaces + (i < extraSpaces ? 1 : 0));
  }

  result += lineWords[wordCount - 1]; // Add last word without trailing spaces
  return result;
}

// Alternative implementation with detailed comments
function formatRoyalScrollDetailed(words, maxWidth) {
  const lines = [];
  let index = 0;

  while (index < words.length) {
    // Start new line with first word
    let currentLine = [words[index]];
    let currentLength = words[index].length;
    index++;

    // Add more words while we have space
    while (
      index < words.length &&
      currentLength + words[index].length + currentLine.length <= maxWidth
    ) {
      currentLine.push(words[index]);
      currentLength += words[index].length;
      index++;
    }

    // Check if this is the last line
    const isLastLine = index === words.length;

    // Format the line
    if (isLastLine || currentLine.length === 1) {
      // Left-justified for last line or single word
      let line = currentLine.join(" ");
      line += " ".repeat(maxWidth - line.length);
      lines.push(line);
    } else {
      // Fully justified for middle lines
      const totalSpaces = maxWidth - currentLength;
      const gaps = currentLine.length - 1;
      const baseSpaces = Math.floor(totalSpaces / gaps);
      const extraSpaces = totalSpaces % gaps;

      let line = "";
      for (let i = 0; i < currentLine.length; i++) {
        line += currentLine[i];
        if (i < currentLine.length - 1) {
          const spaces = baseSpaces + (i < extraSpaces ? 1 : 0);
          line += " ".repeat(spaces);
        }
      }
      lines.push(line);
    }
  }

  return lines;
}

// Custom Test Cases
console.log("Test 1:");
console.log(
  formatRoyalScroll(
    ["This", "is", "an", "example", "of", "text", "justification."],
    16
  )
);
// Expected:
// [
//    "This    is    an",
//    "example  of text",
//    "justification.  "
// ]

console.log("\nTest 2:");
console.log(
  formatRoyalScroll(["What", "must", "be", "acknowledgment", "shall", "be"], 16)
);
// Expected:
// [
//   "What   must   be",
//   "acknowledgment  ",
//   "shall be        "
// ]

console.log("\nTest 3:");
console.log(
  formatRoyalScroll(
    [
      "Science",
      "is",
      "what",
      "we",
      "understand",
      "well",
      "enough",
      "to",
      "explain",
      "to",
      "a",
      "computer.",
      "Art",
      "is",
      "everything",
      "else",
      "we",
      "do",
    ],
    20
  )
);

// Edge cases
console.log("\nEdge 1 - Single word:");
console.log(formatRoyalScroll(["Hello"], 10)); // ["Hello     "]

console.log("\nEdge 2 - Exact fit:");
console.log(formatRoyalScroll(["a", "b", "c"], 5)); // ["a b c"]

console.log("\nEdge 3 - One word per line:");
console.log(formatRoyalScroll(["abc", "def", "ghi"], 3)); // ["abc", "def", "ghi"]

// Let's trace through the first example
console.log("\n--- Tracing Example 1 ---");
console.log("Line 1: ['This', 'is', 'an']");
console.log("Words length: 3+2+2 = 7, Spaces needed: 16-7=9");
console.log("2 gaps, base spaces: 9/2=4, extra: 9%2=1");
console.log("Result: 'This' + 5 spaces + 'is' + 4 spaces + 'an'");
console.log("Line becomes: 'This    is    an'");
