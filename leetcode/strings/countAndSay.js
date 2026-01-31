/*
38. Count and Say
Medium
Topics
premium lock icon
Companies
Hint
The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

countAndSay(1) = "1"
countAndSay(n) is the run-length encoding of countAndSay(n - 1).
Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "3322251" we replace "33" with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11". Thus the compressed string becomes "23321511".

Given a positive integer n, return the nth element of the count-and-say sequence.

 

Example 1:

Input: n = 4

Output: "1211"

Explanation:

countAndSay(1) = "1"
countAndSay(2) = RLE of "1" = "11"
countAndSay(3) = RLE of "11" = "21"
countAndSay(4) = RLE of "21" = "1211"
Example 2:

Input: n = 1

Output: "1"

Explanation:

This is the base case.

 

Constraints:

1 <= n <= 30
*/

function countAndSay(n) {
  // Step 1: Base case
  if (n === 1) return "1";

  let result = "1";

  // Step 2: Generate next sequence up to n
  for (let round = 2; round <= n; round++) {
    let next = "";
    let i = 0;

    while (i < result.length) {
      let count = 1;
      const currChar = result[i];

      // Count consecutive characters
      while (i < result.length - 1 && result[i + 1] === currChar) {
        count++;
        i++;
      }

      // Append 'count' + digit
      next += count.toString() + currChar;
      i++; // move to next group
    }

    result = next; // update for next round
  }

  return result;
}

/* Recursive with helper function */
function countAndSay(n) {
  // Base case
  if (n === 1) return "1";

  // Recursive case
  const prev = countAndSay(n - 1);
  return describe(prev);

  // Helper function: Converts one term to the next
  function describe(str) {
    let res = "";
    let count = 1;

    for (let i = 0; i < str.length; i++) {
      if (i + 1 < str.length && str[i] === str[i + 1]) {
        count++;
      } else {
        res += count.toString() + str[i];
        count = 1;
      }
    }
    return res;
  }
}

/* Recursive without helper function */
function countAndSay2(n) {
  // Base case:
  if (n === 1) return "1";

  // Recursive call
  let say = countAndSay(n - 1);
  // Processing
  let result = "";
  for (let i = 0; i < say.length; i++) {
    let char = say[i];
    let count = 1;
    while (i < say.length - 1 && say[i] === say[i + 1]) {
      count++;
      i++;
    }

    result += count.toString() + char;
  }
  return result;
}

/*
#Plan
Approach: Iterative Build-up

1. Start with the base case: "1" for n = 1
2. For each subsequent n, process the previous result string:
   - Scan through the string and count consecutive identical digits
   - For each group of consecutive digits, append "count" + "digit" to new result
3. Repeat until we reach the nth generation

Key Insight: Each generation is built by describing the previous generation

Time Complexity: O(2^n) in worst case (string grows exponentially)
Space Complexity: O(2^(n-1)) to store the result
*/
/**
 * Discovers what the nth generation will say in the magical counting sequence
 * @param {number} n - The generation to discover (1-indexed)
 * @return {string} - What that generation will say
 */
function countAndSay1(n) {
  // Base case: first generation always says "1"
  if (n === 1) return "1";

  // Start with generation 1's speech
  let currentSpeech = "1";

  // Build up each generation iteratively
  for (let generation = 2; generation <= n; generation++) {
    let nextSpeech = "";
    let currentDigit = currentSpeech[0];
    let count = 1;

    // Process current speech to generate next generation's speech
    for (let i = 1; i <= currentSpeech.length; i++) {
      // If same digit continues or we've reached the end
      if (i < currentSpeech.length && currentSpeech[i] === currentDigit) {
        count++;
      } else {
        // Append count and digit for this group
        nextSpeech += count.toString() + currentDigit;

        // Reset for next digit group (if not at end)
        if (i < currentSpeech.length) {
          currentDigit = currentSpeech[i];
          count = 1;
        }
      }
    }

    // Move to next generation
    currentSpeech = nextSpeech;
  }

  return currentSpeech;
}

// Custom Test Cases
console.log("Generation 1:", countAndSay(1)); // "1"
console.log("Generation 2:", countAndSay(2)); // "11"
console.log("Generation 3:", countAndSay(3)); // "21"
console.log("Generation 4:", countAndSay(4)); // "1211"
console.log("Generation 5:", countAndSay(5)); // "111221"
console.log("Generation 6:", countAndSay(6)); // "312211"
console.log("Generation 7:", countAndSay(7)); // "13112221"

// Edge case: n = 1 (base case)
console.log("Edge Case n=1:", countAndSay(1)); // "1"

// Let's trace one example to understand the pattern
console.log("\nTracing Generation 4:");
console.log("Gen 3 said: '21'");
console.log("In '21': I see 'one 2' -> '12', then 'one 1' -> '11'");
console.log("Result: '12' + '11' = '1211'");
