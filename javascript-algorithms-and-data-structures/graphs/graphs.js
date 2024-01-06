/**
 * **********************
 *    Graph:
 * A graph is a data structure that consists of the following two components:
  1. A finite set of vertices also called as nodes.
  2. A finite set of ordered pair of the form (u, v) called as edge. The pair is ordered because (u, v) is not the same as (v, u) in case of a directed graph(di-graph). The pair of the form (u, v) indicates that there is an edge from vertex u to vertex v. The edges may contain weight/value/cost.
 * 
 * Vertex − Each node of the graph is represented as a vertex. In the following example, the labeled circle represents vertices. Thus, A to G are vertices. We can represent them using an array as shown in the following image. Here A can be identified by index 0. B can be identified using index 1 and so on.

 * Edge − Edge represents a path between two vertices or a line between two vertices. In the following example, the lines from A to B, B to C, and so on represents edges. We can use a two-dimensional array to represent an array as shown in the following image. Here AB can be represented as 1 at row 0, column 1, BC as 1 at row 1, column 2 and so on, keeping other combinations as 0.

 * Adjacency − Two node or vertices are adjacent if they are connected to each other through an edge. In the following example, B is adjacent to A, C is adjacent to B, and so on.

 * Path − Path represents a sequence of edges between the two vertices. In the following example, ABCD represents a path from A to D.
                          A
                        / | \
                       B  E  F
                       |     |
                       C     G
                        \   /
                          D  
                          
  The following two are the most commonly used representations of a graph.

  1. Adjacency Matrix
      Adjacency Matrix is a 2D array of size V x V where V is the number of vertices in a graph. Let the 2D array be adj[][], a slot adj[i][j] = 1 indicates that there is an edge from vertex i to vertex j. Adjacency matrix for undirected graph is always symmetric. Adjacency Matrix is also used to represent weighted graphs. If adj[i][j] = w, then there is an edge from vertex i to vertex j with weight w.

                        A B C D E F G
                      A 0 1 0 0 1 1 0
                      B 1 0 1 0 0 0 0
                      C 0 1 0 1 0 0 0
                      D 0 0 1 0 0 0 1
                      E 1 0 0 0 0 0 0
                      F 1 0 0 0 0 0 1

  2. Adjacency List
      An array of lists is used. The size of the array is equal to the number of vertices. Let the array be an array[]. An entry array[i] represents the list of vertices adjacent to the ith vertex. This representation can also be used to represent a weighted graph. The weights of edges can be represented as lists of pairs. Following is the adjacency list representation of the above graph.
      {
        A: [B, E, F],
        B: [A, C],
        C: [B, D],
        D: [C, G],
        E: [A],
        F: [A, G]
      }

  Differences and Big O 
  * |V| => number of vertices
  * |E| => number of edges
  * Operations    |   Adjacency List |  Adjacency Matrix |
  * Add Vertex    |     O(1)         |  O(|V^2|)  
  * Add Edge      |     O(1)         |  O(1)
  * Remove Vertex |     O(|V| + |E|) |  O(|V^2|)
  * Remove Edge   |     O(|E|)       |  O(1)
  * Query         |     O(|V| + |E|) |  O(1)
  * Storage       |     O(|V| + |E|) |  O(|V^2|)
  * 
  * 
  * Adjacency List : 
  * Can take up less space(in sparse graphs)
  * Faster to iterate over all edges
  * Cab be slower to lookup specific edge
  * Good for "Sparse Graphs"
  * 
  * Adjacency Matrix:
  * Take up more space(in sparse graphs)
  * Slower to iterate over all edges
  * Faster to lookup specific edge
  * Good for "dense Graphs"
 * **********************
*/

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  // removeVertex(vertex) {
  //   for (let v1 of this.adjacencyList[vertex]) {
  //     for (let v2 of this.adjacencyList[v1]) {
  //       this.adjacencyList[v2] = this.adjacencyList[v2].filter(
  //         (v) => v !== vertex
  //       );
  //     }
  //   }
  //   delete this.adjacencyList[vertex];
  // }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }
}

const g = new Graph();
g.addVertex("Tokyo");
g.addVertex("California");
g.addVertex("Hongkong");
g.addVertex("Islamabad");
g.addVertex("Istanbul");
g.addVertex("Lahore");
g.addVertex("Karachi");

g.addEdge("Tokyo", "Islamabad");
g.addEdge("Tokyo", "Hongkong");
g.addEdge("Tokyo", "Lahore");
g.addEdge("Islamabad", "Hongkong");
g.addEdge("Hongkong", "Lahore");
g.addEdge("Hongkong", "Karachi");

g.addEdge("Islamabad", "California");
g.addEdge("Lahore", "Karachi");
g.addEdge("Istanbul", "Karachi");
g.addEdge("Islamabad", "Istanbul");

// g.removeEdge('Islamabad', 'California');

// console.log(JSON.stringify(g.adjacencyList, null, 1));
g.removeVertex("Hongkong");
// console.log("--------------------------");
console.log(JSON.stringify(g.adjacencyList, null, 1));
