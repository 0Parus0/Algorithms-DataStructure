function allPairsDijkstra(dist) {
  const n = dist.length;
  const INF = 108;

  // Build adjacency list
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i !== j && dist[i][j] !== INF) {
        adj[i].push([j, dist[i][j]]);
      }
    }
  }

  // For each source, run Dijkstra and update dist matrix
  for (let src = 0; src < n; src++) {
    const distFromSrc = new Array(n).fill(INF);
    distFromSrc[src] = 0;

    const heap = new MinHeap();
    heap.insert([0, src]);

    while (!heap.isEmpty()) {
      const [d, u] = heap.extractMin();
      if (d > distFromSrc[u]) continue;

      for (const [v, w] of adj[u]) {
        const newDist = d + w;
        if (newDist < distFromSrc[v]) {
          distFromSrc[v] = newDist;
          heap.insert([newDist, v]);
        }
      }
    }

    // Update the original matrix
    for (let i = 0; i < n; i++) {
      dist[src][i] = distFromSrc[i];
    }
  }

  return dist;
}
