/*
Prerequisite Tasks
Difficulty: MediumAccuracy: 37.81%Submissions: 82K+Points: 4Average Time: 25m
There are a total of N tasks, labeled from 0 to N-1. Some tasks may have prerequisites, for example to do task 0 you have to first complete task 1, which is expressed as a pair: [0, 1]
Given the total number of tasks N and a list of P prerequisite pairs, find if it is possible to finish all tasks.

Examples:

Input: N = 4, P = 3, prerequisites = [[1,0],[2,1],[3,2]]
Output: Yes
Explanation: To do task 1 you should have completed task 0, and to do task 2 you should have finished task 1, and to do task 3 you should have finished task 2. So it is possible.
Input: N = 2, P = 2, prerequisites = [[1,0],[0,1]]
Output: No
Explanation: To do task 1 you should have completed task 0, and to do task 0 you should have finished task 1. So it is impossible.
Constraints:
1 ≤ N ≤ 104
1 ≤ P ≤ 105
*/

function canFinishKahn(n, prerequisites) {
  const adj = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);
  for (let [a, b] of prerequisites) {
    adj[b].push(a);
    indegree[a]++;
  }

  const queue = [];
  for (let i = 0; i < n; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  let count = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    count++;

    for (let neighbor of adj[node]) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return count === n ? "Yes" : "No";
}

function canFinishDFS(n, pre) {
  const adj = Array.from({ length: n }, () => []);
  // Build adjacency list b -> a
  for (let [a, b] of pre) {
    adj[b].push(a);
  }

  const visited = new Array(n).fill(0);

  // 0 = unvisited, 1, = visiting(in recursion stack), 2 = visited
  function dfs(node) {
    if (visited[node] === 1) return false; // cycle detected
    if (visited[node] === 2) return true; // already processed

    visited[node] = 1; // Mark as visiting
    for (let neighbor of adj[node]) {
      if (!dfs(neighbor)) return false;
    }

    visited[node] = 2; // mark as visited
    return true;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i] === 0 && !dfs(i)) return "No";
  }

  return "Yes";
}

console.log(
  canFinishDFS(4, [
    [1, 0],
    [2, 1],
    [3, 2],
  ])
); // Yes
console.log(
  canFinishDFS(2, [
    [1, 0],
    [0, 1],
  ])
); // No

console.log(
  canFinishKahn(4, [
    [1, 0],
    [2, 1],
    [3, 2],
  ])
); // Yes
console.log(
  canFinishKahn(2, [
    [1, 0],
    [0, 1],
  ])
); // No
