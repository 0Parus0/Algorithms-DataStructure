class weightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if(!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({node: vertex2, weight});
    this.adjacencyList[vertex2].push({node: vertex1, weight});
  }
}


const graph = new weightedGraph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

graph.addEdge('A', 'B', 9);
graph.addEdge('A', 'C', 7);
graph.addEdge('B', 'C', 5);
graph.addEdge('C', 'D', 4);
graph.addEdge('D', 'E', 4);
graph.addEdge('E', 'B', 4);

console.log(JSON.stringify(graph.adjacencyList, null, 2));