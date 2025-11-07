/*
Alien Dictionary
Difficulty: HardAccuracy: 47.81%Submissions: 206K+Points: 8
A new alien language uses the English alphabet, but the order of letters is unknown. You are given a list of words[] from the alien language’s dictionary, where the words are claimed to be sorted lexicographically according to the language’s rules.

Your task is to determine the correct order of letters in this alien language based on the given words. If the order is valid, return a string containing the unique letters in lexicographically increasing order as per the new language's rules. If there are multiple valid orders, return any one of them.

However, if the given arrangement of words is inconsistent with any possible letter ordering, return an empty string ("").

A string a is lexicographically smaller than a string b if, at the first position where they differ, the character in a appears earlier in the alien language than the corresponding character in b. If all characters in the shorter word match the beginning of the longer word, the shorter word is considered smaller.

Note: Your implementation will be tested using a driver code. It will print true if your returned order correctly follows the alien language’s lexicographic rules; otherwise, it will print false.

Examples:

Input: words[] = ["baa", "abcd", "abca", "cab", "cad"]
Output: true
Explanation: A possible corrct order of letters in the alien dictionary is "bdac".
The pair "baa" and "abcd" suggests 'b' appears before 'a' in the alien dictionary.
The pair "abcd" and "abca" suggests 'd' appears before 'a' in the alien dictionary.
The pair "abca" and "cab" suggests 'a' appears before 'c' in the alien dictionary.
The pair "cab" and "cad" suggests 'b' appears before 'd' in the alien dictionary.
So, 'b' → 'd' → 'a' → 'c' is a valid ordering.
Input: words[] = ["caa", "aaa", "aab"]
Output: true
Explanation: A possible corrct order of letters in the alien dictionary is "cab".
The pair "caa" and "aaa" suggests 'c' appears before 'a'.
The pair "aaa" and "aab" suggests 'a' appear before 'b' in the alien dictionary. 
So, 'c' → 'a' → 'b' is a valid ordering.
Input: words[] = ["ab", "cd", "ef", "ad"]
Output: ""
Explanation: No valid ordering of letters is possible.
The pair "ab" and "ef" suggests "a" appears before "e".
The pair "ef" and "ad" suggests "e" appears before "a", which contradicts the ordering rules.
Constraints:
1 ≤ words.length ≤ 500
1 ≤ words[i].length ≤ 100
words[i] consists only of lowercase English letters.
*/
function findOrder(words) {
  const n = 26;
  const adj = Array.from({ length: n }, () => new Set());
  const indegree = new Array(n).fill(0);
  const exists = new Array(n).fill(false);

  // Mark existing characters
  for (let word of words) {
    for (let char of word) {
      const idx = char.charCodeAt(0) - 97; // 'a' = 97
      exists[idx] = true;
    }
  }

  // Extract ordering rules
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    let j = 0;
    const minLen = Math.min(word1.length, word2.length);

    while (j < minLen && word1[j] === word2[j]) {
      j++;
    }
    if (j < minLen) {
      const u = word1.charCodeAt(j) - 97;
      const v = word2.charCodeAt(j) - 97;

      // Add edge only if not already exits
      if (!adj[u].has(v)) {
        adj[u].add(v);
        indegree[v]++;
      }
    } else if (word1.length > word2.length) {
      return ""; // Invalid ordering
    }
  }

  // Topological sort
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (exists[i] && indegree[i] === 0) {
      queue.push(i);
    }
  }
  const order = [];
  while (queue.length) {
    const node = queue.shift();
    order.push(node);

    for (let neighbor of adj[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  // Verify all existing characters were processed
  let exitingCount = 0;
  for (let i = 0; i < n; i++) {
    if (exists[i]) exitingCount++;
  }

  return order.length === exitingCount
    ? order.map((num) => String.fromCharCode(num + 97)).join("")
    : "";
}

function alienOrder(words) {
  const adj = Array.from({ length: 26 }, () => []);
  const indegree = new Array(26).fill(0);
  const present = new Array(26).fill(false);

  // Step 1: mark present characters
  for (let word of words) {
    for (let ch of word) {
      present[ch.charCodeAt(0) - 97] = true;
    }
  }

  // Step 2: Build graph edges
  for (let i = 0; i < words.length - 1; i++) {
    let w1 = words[i],
      w2 = words[i + 1];
    let minLen = Math.min(w1.length, w2.length);
    let found = false;

    for (let j = 0; j < minLen; j++) {
      let c1 = w1.charCodeAt(j) - 97;
      let c2 = w2.charCodeAt(j) - 97;

      if (c1 !== c2) {
        adj[c1].push(c2);
        indegree[c2]++;
        found = true;
        break;
      }
    }
    // Invalid case: prefix rule ==> Invalid input the result will be empty string
    /*
    ✅ Summary of Prefix Rule in plain English

      If two words share all characters up to the length of the shorter one, and the first word is longer, that’s invalid because it implies the longer word (with the extra suffix) comes before its own prefix — which breaks lexicographical order.
*/
    if (!found && w1.length > w2.length) return "";
  }
  // Step 3: Topological sort
  const queue = [];
  for (let i = 0; i < 26; i++) {
    if (present[i] && indegree[i] === 0) queue.push(i);
  }

  let result = "";
  while (queue.length > 0) {
    let node = queue.shift();
    result += String.fromCharCode(node + 97);

    for (let neighbor of adj[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  // Step 4: Verify if all present chars are used
  const totalChars = present.filter(Boolean).length;
  if (result.length < totalChars) return ""; // Cycle detected
  return result;
}

console.log(alienOrder(["baa", "abcd", "abca", "cab", "cad"]));
// possible output: "bdac"

console.log(alienOrder(["caa", "aaa", "aab"]));
// possible output: "cab"

console.log(alienOrder(["ab", "cd", "ef", "ad"]));
// ""

console.log(alienOrder(["abc", "ab"]));
// "" (invalid prefix case)
