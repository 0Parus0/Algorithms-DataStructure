/*
944. Delete Columns to Make Sorted
Easy
Topics
premium lock icon
Companies
You are given an array of n strings strs, all of the same length.

The strings can be arranged such that there is one on each line, making a grid.

For example, strs = ["abc", "bce", "cae"] can be arranged as follows:
abc
bce
cae
You want to delete the columns that are not sorted lexicographically. In the above example (0-indexed), columns 0 ('a', 'b', 'c') and 2 ('c', 'e', 'e') are sorted, while column 1 ('b', 'c', 'a') is not, so you would delete column 1.

Return the number of columns that you will delete.

 

Example 1:

Input: strs = ["cba","daf","ghi"]
Output: 1
Explanation: The grid looks as follows:
  cba
  daf
  ghi
Columns 0 and 2 are sorted, but column 1 is not, so you only need to delete 1 column.
Example 2:

Input: strs = ["a","b"]
Output: 0
Explanation: The grid looks as follows:
  a
  b
Column 0 is the only column and is sorted, so you will not delete any columns.
Example 3:

Input: strs = ["zyx","wvu","tsr"]
Output: 3
Explanation: The grid looks as follows:
  zyx
  wvu
  tsr
All 3 columns are not sorted, so you will delete all 3.
 

Constraints:

n == strs.length
1 <= n <= 100
1 <= strs[i].length <= 1000
strs[i] consists of lowercase English letters.
*/

function minDeletionSize(strs) {
  let rows = strs.length;
  let cols = strs[0].length;
  let deleteCount = 0;

  // Check each column
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      if (strs[row][col] > strs[row + 1][col]) {
        deleteCount++;
        break;
      }
    }
  }
  return deleteCount;
}

/*
The Tale of the Library Scroll Inspection
In the Ancient Library, you're the head librarian inspecting a collection of magical scrolls. Each scroll has the same number of symbols arranged in columns.

You notice that some columns of symbols are not in proper alphabetical order from top to bottom. Your duty is to identify and count how many columns need to be removed to make all remaining columns properly ordered.

The Inspection Rule:
A column is considered "out of order" if reading from top to bottom, the symbols are not in non-decreasing alphabetical order.
"""
#Plan
Approach: Column-wise Validation

Since all strings have the same length, we can think of this as a grid:
- Rows: each string in the array
- Columns: characters at the same position across all strings

We need to check each column independently:
1. For each column index from 0 to string length - 1
2. Check if all characters in that column are in non-decreasing order
3. Count how many columns violate this ordering

Algorithm:
- Iterate through each column index
- For each column, iterate through rows and check if current character <= next character
- If we find any violation, increment deletion count

Time Complexity: O(m * n) where m = number of strings, n = length of each string
Space Complexity: O(1) - only using primitive variables
"""
*/

/**
 * Inspects scroll columns and counts disordered columns
 * @param {string[]} scrolls - Array of scroll texts (all same length)
 * @return {number} - Number of columns that need removal
 */
function countDisorderedColumns(scrolls) {
  // If only one scroll or empty, all columns are trivially sorted
  if (scrolls.length <= 1) {
    return 0;
  }

  const numScrolls = scrolls.length;
  const scrollLength = scrolls[0].length;
  let removalCount = 0;

  // Check each column position
  for (let col = 0; col < scrollLength; col++) {
    // Check if this column is sorted
    let isColumnSorted = true;

    for (let row = 0; row < numScrolls - 1; row++) {
      // Compare current character with next character in same column
      if (scrolls[row][col] > scrolls[row + 1][col]) {
        isColumnSorted = false;
        break; // No need to check further in this column
      }
    }

    // If column is not sorted, mark for removal
    if (!isColumnSorted) {
      removalCount++;
    }
  }

  return removalCount;
}

// More concise version using early termination
function countDisorderedColumnsConcise(scrolls) {
  if (scrolls.length <= 1) return 0;

  const numRows = scrolls.length;
  const numCols = scrolls[0].length;
  let badColumns = 0;

  for (let col = 0; col < numCols; col++) {
    for (let row = 1; row < numRows; row++) {
      if (scrolls[row][col] < scrolls[row - 1][col]) {
        badColumns++;
        break; // Move to next column as soon as disorder found
      }
    }
  }

  return badColumns;
}

// Custom Test Cases
console.log("Test 1:", countDisorderedColumns(["cba", "daf", "ghi"])); // 1
console.log("Test 2:", countDisorderedColumns(["a", "b"])); // 0
console.log("Test 3:", countDisorderedColumns(["zyx", "wvu", "tsr"])); // 3
console.log("Test 4:", countDisorderedColumns(["abc", "bce", "cae"])); // 1
console.log("Test 5:", countDisorderedColumns(["abcd", "efgh", "ijkl"])); // 0

// Edge cases
console.log("Edge 1 - Single scroll:", countDisorderedColumns(["abc"])); // 0
console.log("Edge 2 - Single column:", countDisorderedColumns(["a", "b", "c"])); // 0
console.log(
  "Edge 3 - All same:",
  countDisorderedColumns(["aaa", "aaa", "aaa"])
); // 0
console.log("Edge 4 - Empty array:", countDisorderedColumns([])); // 0

// Let's trace through the first example
console.log("\n--- Tracing ['cba','daf','ghi'] ---");
console.log("Column 0: 'c' < 'd' < 'g' → ✓ SORTED");
console.log(
  "Column 1: 'b' < 'c' but 'a' < 'h' → ✗ Column 1: 'b' > 'a' at row 1-2"
);
console.log("Column 2: 'a' < 'f' < 'i' → ✓ SORTED");
console.log("Result: 1 column to remove");
