/*
2050. Parallel Courses III
Hard
Topics
premium lock icon
Companies
Hint
You are given an integer n, which indicates that there are n courses labeled from 1 to n. You are also given a 2D integer array relations where relations[j] = [prevCoursej, nextCoursej] denotes that course prevCoursej has to be completed before course nextCoursej (prerequisite relationship). Furthermore, you are given a 0-indexed integer array time where time[i] denotes how many months it takes to complete the (i+1)th course.

You must find the minimum number of months needed to complete all the courses following these rules:

You may start taking a course at any time if the prerequisites are met.
Any number of courses can be taken at the same time.
Return the minimum number of months needed to complete all the courses.

Note: The test cases are generated such that it is possible to complete every course (i.e., the graph is a directed acyclic graph).

 

Example 1:


Input: n = 3, relations = [[1,3],[2,3]], time = [3,2,5]
Output: 8
Explanation: The figure above represents the given graph and the time required to complete each course. 
We start course 1 and course 2 simultaneously at month 0.
Course 1 takes 3 months and course 2 takes 2 months to complete respectively.
Thus, the earliest time we can start course 3 is at month 3, and the total time required is 3 + 5 = 8 months.
Example 2:


Input: n = 5, relations = [[1,5],[2,5],[3,5],[3,4],[4,5]], time = [1,2,3,4,5]
Output: 12
Explanation: The figure above represents the given graph and the time required to complete each course.
You can start courses 1, 2, and 3 at month 0.
You can complete them after 1, 2, and 3 months respectively.
Course 4 can be taken only after course 3 is completed, i.e., after 3 months. It is completed after 3 + 4 = 7 months.
Course 5 can be taken only after courses 1, 2, 3, and 4 have been completed, i.e., after max(1,2,3,7) = 7 months.
Thus, the minimum time needed to complete all the courses is 7 + 5 = 12 months.
 

Constraints:

1 <= n <= 5 * 104
0 <= relations.length <= min(n * (n - 1) / 2, 5 * 104)
relations[j].length == 2
1 <= prevCoursej, nextCoursej <= n
prevCoursej != nextCoursej
All the pairs [prevCoursej, nextCoursej] are unique.
time.length == n
1 <= time[i] <= 104
The given graph is a directed acyclic graph.
*/

function minmumTime(n, relations, time) {
  // Step 1: Build graph
  const adj = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);

  for (let [u, v] of relations) {
    u--;
    v--; // Convert to 0-index
    adj[u].push(v);
    indegree[v]++;
  }

  // Step 2: Initialize queue with nodes of indegree 0
  const queue = [];
  const completionTime = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    if (indegree[i] === 0) {
      completionTime[i] = time[i]; // Can start immediately
      queue.push(i);
    }
  }

  // Step 3: Process topological order
  while (queue.length > 0) {
    let node = queue.shift();

    for (let neighbor of adj[node]) {
      completionTime[neighbor] = Math.max(
        completionTime[neighbor],
        completionTime[node] + time[neighbor]
      );
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  // Step 4: Result = max finishing time
  return Math.max(...completionTime);
}

function minimumTime(n, relations, time) {
  const adj = Array.from({ length: n }, () => []);
  const indegree = new Array(n).fill(0);

  // Build graph with 0-indexed vertices
  for (let [u, v] of relations) {
    // v--; u--;
    adj[u - 1].push(v - 1);
    indegree[v - 1]++;
  }

  const completionTime = new Array(n).fill(0);
  const queue = [];
  for (let i = 0; i < n; i++) {
    if (indegree[i] === 0) {
      completionTime[i] = time[i];
      queue.push(i);
    }
  }

  let maxTime = 0;

  while (queue.length > 0) {
    const node = queue.shift();
    maxTime = Math.max(maxTime, completionTime[node]);

    for (let neighbor of adj[node]) {
      // The neighbor can only start after this node finishes
      completionTime[neighbor] = Math.max(
        completionTime[neighbor],
        completionTime[node] + time[neighbor]
      );

      indegree[neighbor]--;
      if (indegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return maxTime;
}
