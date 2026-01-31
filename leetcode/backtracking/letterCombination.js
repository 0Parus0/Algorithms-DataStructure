/*
17. Letter Combinations of a Phone Number
Medium
Topics
premium lock icon
Companies
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.


 

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = "2"
Output: ["a","b","c"]
 

Constraints:

1 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].
*/
function letterCombinations(digits) {
  const n = digits.length;
  const result = [];
  if (n === 0) return result;
  const mp = new Map();
  mp.set("2", "abc");
  mp.set("3", "def");
  mp.set("4", "ghi");
  mp.set("5", "jkl");
  mp.set("6", "mno");
  mp.set("7", "pqrs");
  mp.set("8", "tuv");
  mp.set("9", "wxyz");

  function solve(idx, temp) {
    // base case
    if (idx >= n) {
      result.push(temp.join(""));
      return;
    }

    const str = mp.get(digits[idx]);
    for (let i = 0; i < str.length; i++) {
      // take
      temp.push(str[i]);
      solve(idx + 1, temp);
      temp.pop();
    }
  }
  solve(0, []);
  return result;
}

/*
Plan
Rephrase the Problem
We are given a string of digits (2-9). Each digit maps to a set of letters (like a phone keypad). We need to generate all possible letter combinations that can be formed by taking one letter from each digit in order.

Inputs and Outputs

Input: digits (string, length 1-4, containing digits '2'-'9').

Output: Array of strings representing all possible letter combinations.

Data Structures

A mapping object/dictionary for digit → letters.

An array to store results.

Recursion or iteration to build combinations.

Approach
Intuition:
This is a classic combinatorial problem. For each digit, we choose one of its corresponding letters, and we need all possible combinations.
We can solve it using:

Backtracking (DFS): Build combinations recursively, adding one letter at a time, and backtrack.

Iterative BFS: Start with an empty string, then for each digit, expand all current combinations with each possible letter for that digit.

Steps (backtracking):

If digits is empty → return [].

Create mapping: {'2':'abc', '3':'def', ..., '9':'wxyz'}.

Define recursive function backtrack(index, current):

If index == digits.length → add current to result.

Else, for each letter char mapped to digits[index]:

Append char to current.

Recurse with index+1.

Backtrack (remove last char).

Start recursion with index=0, current=''.

Return result.

Edge Cases

Empty input → return [].

Single digit → all letters for that digit.

Digits containing '1' or '0' → not in constraints, but could be handled if needed.

Time and Space Complexity

Time: O(4^n) where n = digits.length (each digit maps to max 4 letters).

Space: O(n) for recursion depth, plus O(4^n) for storing results.

Commit Message
"Solve Letter Combinations of a Phone Number using backtracking"
*/

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  // If no digits, return empty array
  if (!digits || digits.length === 0) {
    return [];
  }

  // Mapping of digits to letters
  const mapping = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const result = [];

  // Backtracking function
  const backtrack = (index, current) => {
    // If we've processed all digits, add current combination
    if (index === digits.length) {
      result.push(current);
      return;
    }

    // Get letters for current digit
    const digit = digits[index];
    const letters = mapping[digit];

    // Try each letter
    for (let i = 0; i < letters.length; i++) {
      backtrack(index + 1, current + letters[i]);
    }
  };

  backtrack(0, "");
  return result;
};

/**
 * 17. Letter Combinations of a Phone Number
 *
 * =========================
 * PLAN (Interview-ready)
 * =========================
 *
 * 1. Rephrase the problem in my own words
 * -------------------------------------
 * We are given a string of digits where each digit (2–9) maps to a set of letters
 * like on a phone keypad.
 * Our task is to generate all possible strings by choosing exactly one letter
 * for each digit, maintaining the original digit order.
 *
 *
 * 2. Inputs and Outputs
 * ---------------------
 * Input:
 *   - digits: string consisting of characters '2' to '9'
 *
 * Output:
 *   - array of strings representing all possible letter combinations
 *
 *
 * 3. Data Structures
 * ------------------
 * - HashMap / Object for digit → letters mapping
 * - Array to store results
 * - Recursion (DFS / Backtracking)
 *
 *
 * 4. Approach
 * -----------
 * Intuition:
 * This is a combinatorial generation problem.
 * For each digit, we have multiple choices (letters).
 * We need to explore all paths where:
 *   - depth = digits.length
 *   - each level picks one letter from the current digit
 *
 * This naturally fits a backtracking approach:
 * - Start with an empty string
 * - For each digit, try all mapped letters
 * - Append a letter, recurse to the next digit
 * - Once we reach the end, store the built string
 *
 * Implementation Steps:
 * 1. Handle the edge case where digits is empty
 * 2. Define digit-to-letter mapping
 * 3. Use DFS with an index pointing to the current digit
 * 4. When index === digits.length, push the current combination
 *
 *
 * 5. Edge Cases
 * -------------
 * - digits is empty → return []
 * - digits length is 1
 *
 *
 * 6. Time and Space Complexity
 * ----------------------------
 * Time Complexity:
 *   - O(4^n) where n = digits.length
 *     (each digit has at most 4 letters)
 *
 * Space Complexity:
 *   - O(n) recursion stack
 *   - O(4^n) for result storage
 *
 *
 * 7. Commit Message
 * -----------------
 * "Generate phone number letter combinations using DFS backtracking"
 */

var letterCombinations = function (digits) {
  if (digits.length === 0) return [];

  const mapping = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  const result = [];

  function backtrack(index, current) {
    // If we've processed all digits
    if (index === digits.length) {
      result.push(current);
      return;
    }

    const letters = mapping[digits[index]];

    for (let char of letters) {
      backtrack(index + 1, current + char);
    }
  }

  backtrack(0, "");
  return result;
};
