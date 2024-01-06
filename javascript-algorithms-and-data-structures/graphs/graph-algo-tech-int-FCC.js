const depthFirstIterativePrint = (graph, source) => {
  const result = [];
  const visited = {};

  const stack = [source];
  while (stack.length) {
    let current = stack.pop();
    result.push(current);
    console.log(current);
    visited[current] = true;
    for (let neighbor of graph[current]) {
      if (!visited[neighbor]) stack.push(neighbor);
    }
  }
  return result;
};

const depthFirstRecursivePrint = (graph, source) => {
  const result = [];
  const visited = {};

  (function dfs(vertex) {
    result.push(vertex);
    console.log(vertex);
    visited[vertex] = true;
    for (let neighbor of graph[vertex]) {
      if (!visited[neighbor]) dfs(neighbor);
    }
  })(source);
  return result;
};

const breadthFirstPrint = (graph, source) => {
  const result = [];
  const visited = {};
  const que = [source];
  while (que.length) {
    let current = que.shift();
    result.push(current);
    visited[current] = true;
    console.log(current);
    for (let neighbor of graph[current]) {
      if (!visited[neighbor]) {
        que.push(neighbor);
      }
    }
  }
  return result;
};

const graph = {
  a: ["c", "b"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};

console.log(breadthFirstPrint(graph, "a")); // [ 'a', 'c', 'b', 'e', 'd', 'f' ]
// console.log(depthFirstIterativePrint(graph, "a")); //[ 'a', 'b', 'd', 'f', 'c', 'e' ]
// console.log(depthFirstRecursivePrint(graph, "a")); // [ 'a', 'c', 'e', 'b', 'd', 'f' ]
