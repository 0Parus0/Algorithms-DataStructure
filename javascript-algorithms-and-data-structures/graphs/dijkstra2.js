/*
 * Max Probability Path
 */

class NaivePriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

function maxProbability(n, edges, succProb, start, end) {
  const graph = new Array(n).fill(0).map(() => []);
  const dist = new Array(n).fill(Infinity);

  dist[start] = 0;
  for (let i = 0; i < edges.length; i++) {
    const [x, y] = edges[i];
    const p = -Math.log(succProb[i]);
    graph[x].push([y, p]);
    graph[y].push([x, p]);
  }
  const pq = new NaivePriorityQueue();
  pq.enqueue(start, 0);
  while (pq.values.length) {
    const { val: node, priority: d } = pq.dequeue();
    if (d > dist[node]) continue;
    if (node === end) return Math.exp(-d);
    for (const [nei, d2] of graph[node]) {
      if (d + d2 < dist[nei]) {
        dist[nei] = d + d2;
        pq.enqueue(nei, dist[nei]);
      }
    }
  }
  return 0;
}

const n = 3,
  edges = [
    [0, 1],
    [1, 2],
    [0, 2],
  ],
  succProb = [0.5, 0.5, 0.2],
  start = 0,
  end = 2;

console.log(maxProbability(n, edges, succProb, start, end));
