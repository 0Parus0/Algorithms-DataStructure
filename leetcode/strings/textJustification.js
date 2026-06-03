/*
68. Text Justification
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
      currentLength + words[index].length + currentLength.length <= maxWidth
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
      // Fully justified lines
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
