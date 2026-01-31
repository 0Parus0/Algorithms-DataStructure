/*
Here is the next problem, rephrase it first then solve it accoding to the guidlines of turing.com
1544. Make The String Great
Easy
Topics
premium lock icon
Companies
Hint
Given a string s of lower and upper case English letters.

A good string is a string which doesn't have two adjacent characters s[i] and s[i + 1] where:

0 <= i <= s.length - 2
s[i] is a lower-case letter and s[i + 1] is the same letter but in upper-case or vice-versa.
To make the string good, you can choose two adjacent characters that make the string bad and remove them. You can keep doing this until the string becomes good.

Return the string after making it good. The answer is guaranteed to be unique under the given constraints.

Notice that an empty string is also good.

 

Example 1:

Input: s = "leEeetcode"
Output: "leetcode"
Explanation: In the first step, either you choose i = 1 or i = 2, both will result "leEeetcode" to be reduced to "leetcode".
Example 2:

Input: s = "abBAcC"
Output: ""
Explanation: We have many possible scenarios, and all lead to the same answer. For example:
"abBAcC" --> "aAcC" --> "cC" --> ""
"abBAcC" --> "abBA" --> "aA" --> ""
Example 3:

Input: s = "s"
Output: "s"
 

Constraints:

1 <= s.length <= 100
s contains only lower and upper case English letters.
*/

function makeNeighborhoodPeaceful(s) {
  const stack = [];

  for (let ch of s) {
    // Check if the current char conflicts with the top of stack
    if (
      stack.length > 0 &&
      stack[stack.length - 1] !== ch &&
      stack[stack.length - 1].toLowerCase() === ch.toLowerCase()
    ) {
      // Conflict found -> remove last character
      stack.pop();
    } else {
      // Otherwise, add current character to stack
      stack.push(ch);
    }
  }

  return stack.join("");
}

/*
"""
#Plan
Approach: Stack-based Elimination

We can think of this as processing characters one by one and eliminating "bad pairs" as we go:

1. Use a stack to build the result string
2. For each character in input:
   - If stack is empty, push current character
   - Else, check if top of stack and current character form a "bad pair":
        * Same letter but different cases
        * Math.abs(charCode - topCharCode) === 32 (ASCII difference between cases)
   - If bad pair found, pop from stack (remove both)
   - Otherwise, push current character
3. Finally, join the stack to form the result

Time Complexity: O(n) - single pass through string
Space Complexity: O(n) - for the stack in worst case
"""
*/

/**
 * Resolves conflicts in the neighborhood of letters
 * @param {string} neighborhood - The original string of letters
 * @return {string} - Peaceful neighborhood after removing quarreling pairs
 */

function makeNeighborhoodPeaceful(neighborhood) {
  const stack = [];

  for (let i = 0; i < neighborhood.length; i++) {
    const currentChar = neighborhood[i];

    if (stack.length === 0) {
      // Stack is empty, just add the character
      stack.push(currentChar);
    } else {
      const topChar = stack[stack.length - 1];

      // Check if current character and top character form a bad pair
      // Same letter but different cases (ASCII difference is 32)
      if (Math.abs(currentChar.charCodeAt(0) - topChar.charCodeAt(0)) === 32) {
        // They quarrel! Remove the top character (both get removed)
        stack.pop();
      } else {
        // They get along, add to neighborhood
        stack.push(currentChar);
      }
    }
  }

  return stack.join("");
}

// Alternative recursive approach (for understanding)
function makeNeighborhoodPeacefulRecursive(neighborhood) {
  for (let i = 0; i < neighborhood.length - 1; i++) {
    // Check if current and next character form bad pair
    if (
      Math.abs(neighborhood.charCodeAt(i) - neighborhood.charCodeAt(i + 1)) ===
      32
    ) {
      // Remove the bad pair and recursively process the rest
      return makeNeighborhoodPeacefulRecursive(
        neighborhood.substring(0, i) + neighborhood.substring(i + 2)
      );
    }
  }
  return neighborhood;
}

// Custom Test Cases
console.log("Test 1:", makeNeighborhoodPeaceful("leEeetcode")); // "leetcode"
console.log("Test 2:", makeNeighborhoodPeaceful("abBAcC")); // ""
console.log("Test 3:", makeNeighborhoodPeaceful("s")); // "s"
console.log("Test 4:", makeNeighborhoodPeaceful("Pp")); // ""
console.log("Test 5:", makeNeighborhoodPeaceful("aAbB")); // ""
console.log("Test 6:", makeNeighborhoodPeaceful("abcCBA")); // ""
console.log("Test 7:", makeNeighborhoodPeaceful("abcdDCBA")); // ""

// Edge cases
console.log("Edge 1 - Empty string:", makeNeighborhoodPeaceful("")); // ""
console.log("Edge 2 - No conflicts:", makeNeighborhoodPeaceful("abc")); // "abc"
console.log("Edge 3 - Single removal:", makeNeighborhoodPeaceful("aA")); // ""

// Let's trace one example to understand the process
console.log("\n--- Tracing 'abBAcC' ---");
console.log("Processing 'a': stack = ['a']");
console.log("Processing 'b': stack = ['a', 'b']");
console.log("Processing 'B': 'b' and 'B' quarrel! Remove 'b' → stack = ['a']");
console.log("Processing 'A': 'a' and 'A' quarrel! Remove 'a' → stack = []");
console.log("Processing 'c': stack = ['c']");
console.log("Processing 'C': 'c' and 'C' quarrel! Remove 'c' → stack = []");
console.log("Final result: ''");
