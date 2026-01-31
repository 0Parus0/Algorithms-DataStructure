/*
1415. The k-th Lexicographical String of All Happy Strings of Length n
Medium
Topics
premium lock icon
Companies
Hint
A happy string is a string that:

consists only of letters of the set ['a', 'b', 'c'].
s[i] != s[i + 1] for all values of i from 1 to s.length - 1 (string is 1-indexed).
For example, strings "abc", "ac", "b" and "abcbabcbcb" are all happy strings and strings "aa", "baa" and "ababbc" are not happy strings.

Given two integers n and k, consider a list of all happy strings of length n sorted in lexicographical order.

Return the kth string of this list or return an empty string if there are less than k happy strings of length n.

 

Example 1:

Input: n = 1, k = 3
Output: "c"
Explanation: The list ["a", "b", "c"] contains all happy strings of length 1. The third string is "c".
Example 2:

Input: n = 1, k = 4
Output: ""
Explanation: There are only 3 happy strings of length 1.
Example 3:

Input: n = 3, k = 9
Output: "cab"
Explanation: There are 12 different happy string of length 3 ["aba", "abc", "aca", "acb", "bab", "bac", "bca", "bcb", "cab", "cac", "cba", "cbc"]. You will find the 9th string = "cab"
 

Constraints:

1 <= n <= 10
1 <= k <= 100
*/
function getHappyString(n, k) {
  const result = "";
  let count = 0;
  const allowed = ["a", "b", "c"];

  function solve(curr) {
    // Early return if we have already found the answer
    if (result !== "") return;

    if (curr.length === n) {
      count++;
      if (count === k) answer = curr;
      return;
    }
    for (let ch of allowed) {
      if (curr.length > 0 && curr[curr.length - 1] === ch) continue;

      // Do
      curr.push(ch);

      // Explore
      solve(curr);

      // Undo
      curr.pop();
    }
  }
  solve("");
  return result;
}

/**
 * 1415. The k-th Lexicographical String of All Happy Strings of Length n
 *
 * =========================
 * PLAN (Interview-ready)
 * =========================
 *
 * 1. Rephrase the problem in my own words
 * -------------------------------------
 * We need to generate strings of length `n` using only characters:
 *   ['a', 'b', 'c']
 *
 * A string is considered "happy" if:
 *   - no two adjacent characters are the same
 *
 * All valid happy strings of length `n` are sorted in lexicographical order.
 * Our task is to return the k-th string in this sorted list.
 * If there are fewer than `k` happy strings, return an empty string.
 *
 *
 * 2. Inputs and Outputs
 * ---------------------
 * Input:
 *   - n: number (length of the string)
 *   - k: number (1-based index in lexicographical order)
 *
 * Output:
 *   - string (k-th happy string) OR "" if it does not exist
 *
 *
 * 3. Data Structures
 * ------------------
 * - Array to store results (or counter-based pruning)
 * - Recursion (DFS / Backtracking)
 *
 *
 * 4. Approach
 * -----------
 * Intuition:
 * This is a controlled backtracking problem.
 * We generate happy strings in lexicographical order:
 *   'a' → 'b' → 'c'
 *
 * Since n ≤ 10 and k ≤ 100:
 * - total possible happy strings = 3 * 2^(n - 1) ≤ 1536
 * - brute-force generation is totally safe
 *
 * Strategy:
 * - Use DFS to build strings character by character
 * - At each step:
 *     - try 'a', 'b', 'c' in order
 *     - skip the character if it equals the previous one
 * - Maintain a counter of how many valid strings we have generated
 * - As soon as the counter reaches `k`, store and return the result
 *
 * Optimization:
 * - Early stopping once k-th string is found
 *
 *
 * 5. Edge Cases
 * -------------
 * - k is larger than total possible happy strings → return ""
 * - n = 1 (just ["a", "b", "c"])
 *
 *
 * 6. Time and Space Complexity
 * ----------------------------
 * Time Complexity:
 *   - O(3 * 2^(n - 1)) in the worst case
 *
 * Space Complexity:
 *   - O(n) recursion stack
 *
 *
 * 7. Commit Message
 * -----------------
 * "Find k-th happy string using lexicographical DFS with early stopping"
 */

var getHappyString = function (n, k) {
  const chars = ["a", "b", "c"];
  let count = 0;
  let answer = "";

  function dfs(path) {
    // Stop early if we already found the answer
    if (answer !== "") return;

    // If a happy string of length n is formed
    if (path.length === n) {
      count++;
      if (count === k) {
        answer = path;
      }
      return;
    }

    for (let ch of chars) {
      // Ensure happiness condition
      if (path.length > 0 && path[path.length - 1] === ch) continue;
      dfs(path + ch);
    }
  }

  dfs("");
  return answer;
};

/*
Plan
Rephrase the Problem
We need to generate all "happy strings" of length n (strings using only 'a','b','c' with no two adjacent chars equal), sort them lexicographically, and return the k-th string (1-indexed). If k exceeds the total number of such strings, return "".

Inputs and Outputs

Input: n (length, 1-10), k (1-100).

Output: k-th happy string or "".

Data Structures

Array to build current string (or string builder).

Recursive DFS to generate strings in lexicographic order.

Counter to track which string we're at.

Approach
Intuition:
Since constraints are small (max total strings = 3 * 2^(n-1) ≤ 3 * 512 = 1536), we can generate all happy strings in lex order and stop when we reach the k-th.

Steps:

Letters available: ['a','b','c'].

Use DFS to build strings:

Start with empty string.

At each position, try each char that is different from previous char.

When length == n, increment count.

If count == k, record result and stop early.

Since we try chars in order 'a','b','c', DFS automatically generates strings in lex order.

If DFS completes without finding k-th, return "".

Edge Cases

n = 1: all three chars are valid.

k larger than possible count → return "".

n up to 10: total possible ≤ 1536, manageable.

Time and Space Complexity

Time: O(3 * 2^(n-1)) in worst case (generate all strings).

Space: O(n) for recursion depth and string building.

Commit Message
"Solve k-th Lexicographical Happy String using DFS with early stop"
*/
/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getHappyString = function (n, k) {
  const chars = ["a", "b", "c"];
  let count = 0;
  let result = "";

  const dfs = (current) => {
    // Early stop if we already found result
    if (result !== "") return;

    if (current.length === n) {
      count++;
      if (count === k) {
        result = current;
      }
      return;
    }

    for (const ch of chars) {
      // Skip if same as last character
      if (current.length > 0 && current[current.length - 1] === ch) {
        continue;
      }
      dfs(current + ch);
    }
  };

  dfs("");
  return result;
};
