/*
207. Course Schedule
Medium
Topics
premium lock icon
Companies
Hint
There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

For example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.
Return true if you can finish all courses. Otherwise, return false.

 

Example 1:

Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
Example 2:

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
 

Constraints:

1 <= numCourses <= 2000
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
All the pairs prerequisites[i] are unique.
*/
function canFinish(courses, preReq) {
  const adj = Array.from({ length: courses }, () => []);
  const inDeg = new Array(courses).fill(0);

  for (let [u, v] of preReq) {
    // v ---> u
    adj[v].push(u);
    // There is an edge v ---> u
    inDeg[u]++;
  }

  function topologicalSortCheck() {
    const que = [];
    let count = 0;
    for (let i = 0; i < courses; i++) {
      if (inDeg[i] === 0) {
        que.push(i);
        count++;
      }
    }

    while (que.length) {
      let u = que.shift();

      for (let v of adj[u]) {
        inDeg[v]--;
        if (inDeg[v] === 0) {
          count++;
          que.push(v);
        }
      }
    }
    return count === courses;
  }

  return topologicalSortCheck();
}

/* course schedule 2 */

function findOrder(courses, preReq) {
  const adj = Array.from({ length: courses }, () => []);
  const inDeg = new Array(courses).fill(0);

  for (let [u, v] of preReq) {
    adj[v].push(u);
    inDeg[u]++;
  }

  function topologicalSort() {
    const que = [];
    const result = [];
    for (let i = 0; i < courses; i++) {
      if (inDeg[i] === 0) {
        que.push(i);
        result.push(i);
      }
    }

    while (que.length) {
      const u = que.shift();

      for (let v of adj[u]) {
        inDeg[v]--;

        if (inDeg[v] === 0) {
          que.push(v);
          result.push(v);
        }
      }
    }

    return result.length === courses ? result : [];
  }

  return topologicalSort();
}

/* With DFS  Course Schedule 1*/

function canFinishDFS(courses, preReq) {
  const adj = Array.from({ length: courses }, () => []);
  const visited = new Array(courses).fill(false);
  const path = new Array(courses).fill(false);

  for (let [u, v] of preReq) {
    adj[v].push(u);
  }

  function isCycleDFS(u) {
    visited[u] = true;
    path[u] = true;

    for (let v of adj[u]) {
      if (!visited[v] && isCycleDFS(v)) return true;
      else if (path[v]) return true;
    }

    path[u] = false;
    return false;
  }

  for (let i = 0; i < courses; i++) {
    if (!visited[i] && isCycleDFS(i)) return false;
  }

  return true;
}

/* With DFS  Course Schedule 2*/

function findOrder(courses, preReq) {
  const adj = Array.from({ length: courses }, () => []);
  const stack = [];
  const path = new Array(courses).fill(false);
  const visited = new Array(courses).fill(false);
  let hasCycle = false;

  for (let [u, v] of preReq) {
    adj[v].push(u);
  }

  function DFS(u) {
    visited[u] = true;
    path[u] = true;

    for (let v of adj[u]) {
      if (path[v]) return (hasCycle = true);
      if (!visited[v]) DFS(v);
    }
    stack.push(u);
    path[u] = false;
  }

  for (let i = 0; i < courses; i++) {
    if (!visited[i]) DFS(i);
  }

  return !hasCycle ? stack.reverse() : [];
}
