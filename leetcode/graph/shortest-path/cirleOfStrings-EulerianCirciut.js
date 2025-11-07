/*
Circle of strings
Difficulty: HardAccuracy: 15.56%Submissions: 93K+Points: 8Average Time: 28m
Given an array arr of lowercase strings, determine if the strings can be chained together to form a circle.
A string X can be chained together with another string Y if the last character of X is the same as the first character of Y. If every string of the array can be chained with exactly two strings of the array(one with the first character and the second with the last character of the string), it will form a circle.

For example, for the array arr[] = {"for", "geek", "rig", "kaf"} the answer will be Yes as the given strings can be chained as "for", "rig", "geek" and "kaf"

Examples

Input: arr[] = ["abc", "bcd", "cdf"]
Output: 0
Explaination: These strings can't form a circle because no string has 'd'at the starting index.
Input: arr[] = ["ab" , "bc", "cd", "da"]
Output: 1
Explaination: These strings can form a circle of strings.
Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)

Constraints: 
1 ≤ length of strings ≤ 20
*/

function isCircle(arr) {
  const n = arr.length;
  if (n === 0) return 1;

  const inDegree = new Array(26).fill(0);
  const outDegree = new Array(26).fill(0);
  const adj = Array.from({ length: 26 }, () => []);
  const exists = new Array(26).fill(false);

  // Build graph and calculate degrees
  for (const str of arr) {
    const first = str.charCodeAt(0) - 97;
    const last = str.charCodeAt(str.length - 1) - 97;

    adj[first].push(last);
    outDegree[first]++;
    inDegree[last]++;
    exists[first] = exists[last] = true;
  }

  // Check degree condition
  for (let i = 0; i < 26; i++) {
    if (inDegree[i] !== outDegree[i]) return 0;
  }

  // Check connectivity
  const visited = new Array(26).fill(false);

  // Find start vertex
  let start = -1;
  for (let i = 0; i < 26; i++) {
    if (exists[i]) {
      start = i;
      break;
    }
  }

  // DFS using recursion
  function dfs(node) {
    visited[node] = true;
    for (const neighbor of adj[node]) {
      if (!visited[neighbor]) dfs(neighbor);
    }
  }

  dfs(start);

  // All existing vertices should be visited
  for (let i = 0; i < 26; i++) {
    if (exists[i] && !visited[i]) return 0;
  }

  return 1;
}

/*
Time & Space Complexity:

    Time Complexity: O(n + 26) = O(n)

        Building graph: O(n)

        Degree check: O(26)

        DFS: O(26 + n)

    Space Complexity: O(26) = O(1)

        Fixed size arrays for 26 letters

Key Insight:

This problem reduces to checking if a directed graph has an Eulerian circuit:

    Equal in/out degrees for all vertices

    Strongly connected component containing all relevant vertices

The solution efficiently checks both conditions using degree tracking and DFS connectivity check.
*/

// Test Case 1: Can form circle
console.log(isCircle(["ab", "bc", "cd", "da"])); // Output: 1
// Explanation: ab -> bc -> cd -> da -> ab

// Test Case 2: Cannot form circle
console.log(isCircle(["abc", "bcd", "cdf"])); // Output: 0
// Explanation: 'f' appears only at end, no string starts with 'f'

// Test Case 3: Can form circle
console.log(isCircle(["for", "geek", "rig", "kaf"])); // Output: 1
// Explanation: for -> rig -> geek -> kaf -> for

// Test Case 4: Single string (self-loop)
console.log(isCircle(["aa"])); // Output: 1

// Test Case 5: Empty array
console.log(isCircle([])); // Output: 1

// Test Case 6: Two strings that form cycle
console.log(isCircle(["ab", "ba"])); // Output: 1
