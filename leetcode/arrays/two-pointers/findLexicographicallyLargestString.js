/*
3403. Find the Lexicographically Largest String From the Box I
Medium
Topics
premium lock icon
Companies
Hint
You are given a string word, and an integer numFriends.

Alice is organizing a game for her numFriends friends. There are multiple rounds in the game, where in each round:

word is split into numFriends non-empty strings, such that no previous round has had the exact same split.
All the split words are put into a box.
Find the lexicographically largest string from the box after all the rounds are finished.

 

Example 1:

Input: word = "dbca", numFriends = 2

Output: "dbc"

Explanation: 

All possible splits are:

"d" and "bca".
"db" and "ca".
"dbc" and "a".
Example 2:

Input: word = "gggg", numFriends = 4

Output: "g"

Explanation: 

The only possible split is: "g", "g", "g", and "g".

 

Constraints:

1 <= word.length <= 5 * 103
word consists only of lowercase English letters.
1 <= numFriends <= word.length
*/

function findLexLargestStringFinal(s, numFriends) {
  const n = s.length;

  function bestStartingPoint(s) {
    let i = 0; // best starting point
    let j = 1; // keep moving to find the best starting point

    while (j < n) {
      let k = 0;

      // skipping equal chars
      while (j + k < n && s[i + k] === s[j + k]) {
        k++;
      }

      if (j + k < n && s[j + k] > s[i + k]) {
        i = j; // updating best starting point
        j = j + 1;
      } else {
        j = j + k + 1; // skipping already checked chars
      }
    }
    return i;
  }

  if (numFriends === 1) return s;

  let i = bestStartingPoint(s);
  let longestPossibleLength = n - (numFriends - 1);
  let canTakePossible = Math.min(longestPossibleLength, n - i);

  return s.slice(i, i + canTakePossible);
}

/*
🕒 Time & Space Complexity

Time: O(n) — Each character compared at most twice.

Space: O(1)
*/

/*
💬 Commit Message
feat: implement O(n) two-pointer approach for lexicographically largest substring

- Used two-pointer scan to find the best starting point (similar to Duval’s algorithm)
- Avoided substring generation to keep O(n) performance
- Handled maximum allowable prefix length based on numFriends
- Ensured correct slice boundaries for final substring
*/

// Custom Test Cases
console.log(findLexLargestStringFinal("dbca", 2)); // Expected: "dbc"
console.log(findLexLargestStringFinal("gggg", 4)); // Expected: "g"
console.log(findLexLargestStringFinal("abc", 1)); // Expected: "abc"
console.log(findLexLargestStringFinal("abc", 3)); // Expected: "c" (largest single char)
console.log(findLexLargestStringFinal("abcd", 2)); // Expected: "abc" or "bcd"? Let's check
console.log(findLexLargestStringFinal("zba", 2)); // Expected: "zb"
console.log(findLexLargestStringFinal("aaaa", 2)); // Expected: "aaa"
