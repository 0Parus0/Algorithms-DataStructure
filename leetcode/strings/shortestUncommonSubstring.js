/*
3076. Shortest Uncommon Substring in an Array
Medium
Topics
premium lock icon
Companies
Hint
You are given an array arr of size n consisting of non-empty strings.

Find a string array answer of size n such that:

answer[i] is the shortest substring of arr[i] that does not occur as a substring in any other string in arr. If multiple such substrings exist, answer[i] should be the lexicographically smallest. And if no such substring exists, answer[i] should be an empty string.
Return the array answer.

 

Example 1:

Input: arr = ["cab","ad","bad","c"]
Output: ["ab","","ba",""]
Explanation: We have the following:
- For the string "cab", the shortest substring that does not occur in any other string is either "ca" or "ab", we choose the lexicographically smaller substring, which is "ab".
- For the string "ad", there is no substring that does not occur in any other string.
- For the string "bad", the shortest substring that does not occur in any other string is "ba".
- For the string "c", there is no substring that does not occur in any other string.
Example 2:

Input: arr = ["abc","bcd","abcd"]
Output: ["","","abcd"]
Explanation: We have the following:
- For the string "abc", there is no substring that does not occur in any other string.
- For the string "bcd", there is no substring that does not occur in any other string.
- For the string "abcd", the shortest substring that does not occur in any other string is "abcd".
 

Constraints:

n == arr.length
2 <= n <= 100
1 <= arr[i].length <= 20
arr[i] consists only of lowercase English letters.
*/

function shortestUncommonSubstringOpt(arr) {
  const n = arr.length;
  const freq = new Map(); // Substring -> count of strings containing it

  // Step 1: Build global frequency map
  for (let i = 0; i < n; i++) {
    const s = arr[i];
    const seen = new Set();

    // Generating all substrings of the arr[i] string
    for (let len = 1; len <= s.length; len++) {
      for (let start = 0; start + len <= s.length; start++) {
        seen.add(s.slice(start, start + len));
      }
    }
    // Add all unique substrings of arr[i] string to map and add their frequency
    // Unique because if a string has a double letter "apple" and "p" is not present in any other string it's frequency will become two.
    for (let sub of seen) {
      freq.set(sub, (freq.get(sub) || 0) + 1);
    }
  }

  // Step 2: For each string, find shortest substring with freq === 1
  const answer = new Array(n).fill("");

  for (let i = 0; i < n; i++) {
    const s = arr[i];
    let best = "";

    for (let len = 1; len <= s.length; len++) {
      let found = [];
      for (let start = 0; start <= s.length; start++) {
        const sub = s.slice(start, start + len);
        if (freq.get(sub) === 1) {
          found.push(sub);
        }
      }
      if (found.length > 0) {
        found.sort(); // lexicographically smallest
        best = found[0];
      }
    }
    answer[i] = best;
  }

  return answer;
}

function shortestSubstring(arr) {
  const n = arr.length;
  const answer = new Array(n).fill("");

  for (let i = 0; i < n; i++) {
    const s = arr[i];
    let found = "";

    // Try all substring lengths
    for (let len = 1; len <= s.length && !found; len++) {
      // Generate and check substrings in lex order
      const substrings = new Set();

      for (let start = 0; start <= s.length - len; start++) {
        // Generate all substrings
        substrings.add(s.substring(start, start + len));
      }

      // Sort lexicographically
      const sorted = Array.from(substrings).sort();

      for (let sub of sorted) {
        let unique = true;
        // Check if this substring appears in any other string
        for (let j = 0; j < n; j++) {
          if (i !== j && arr[j].includes(sub)) {
            unique = false;
            break;
          }
        }

        if (unique) {
          found = sub;
          break;
        }
      }
    }
    answer[i] = found;
  }

  return answer;
}
