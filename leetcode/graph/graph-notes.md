Graph Algorithms — Exam-Style Cheat Sheet (JS-style pseudocode)
Notation & quick facts

V = number of vertices, E = number of edges.

Graph representations:

Adjacency list: adj = Array.from({length: V}, () => []) → iterate neighbors quickly (O(deg(v))).

Adjacency matrix: mat[V][V] → O(1) edge check, O(V²) memory.

Typical complexities assume adjacency list unless stated.

1. Unweighted — Undirected
   BFS — shortest path (edges count)

Use: shortest path in unweighted graphs, levels, bipartite check.

Idea: level-by-level traversal using queue.

DS: queue, visited[], dist[].

Time: O(V + E) | Space: O(V)

Hint: "waves expanding from start."// BFS from src
function BFS(src){
const visited = Array(V).fill(false);
const dist = Array(V).fill(Infinity);
const q = [];
visited[src] = true; dist[src] = 0; q.push(src);
while(q.length){
const u = q.shift();
for(let v of adj[u]){
if(!visited[v]){
visited[v] = true;
dist[v] = dist[u] + 1;
q.push(v);
}
}
}
return dist;
}

DFS — traversal, components, detect cycles (undirected)

Use: component listing, backtracking, cycle detection, foundational DFS.

Idea: go deep, backtrack; track parent to ignore trivial back-edge.

DS: recursion or explicit stack; visited[].

Time: O(V + E) | Space: O(V) (recursion stack)

function DFS(u, parent){
visited[u] = true;
for(let v of adj[u]){
if(!visited[v]) DFS(v, u);
else if(v !== parent) /_ found cycle _/;
}
}

Connected Components

Use: count/discover components.

Idea: run DFS/BFS from every unvisited node.

Time: O(V + E)

let components = 0;
for(let i=0;i<V;i++){
if(!visited[i]){ components++; DFS(i, -1); }
}

Cycle detection (Undirected) — Union-Find

Use: check if adding edge creates cycle.

Idea: union sets; if two endpoints already in same set → cycle.

DS: DSU (path compression + union by size/rank).

Time: O(E α(V)) ≈ O(E)// union-find (find + union)
if(find(u) === find(v)) cycle = true;
else union(u, v);

Bipartite check (BFS coloring)

Use: check if 2-colorable.

Idea: BFS color nodes alternately; conflict → not bipartite.

Time: O(V + E)

function isBipartite(){
const color = Array(V).fill(-1);
for(let s=0;s<V;s++){
if(color[s] !== -1) continue;
color[s] = 0; q.push(s);
while(q.length){
const u = q.shift();
for(let v of adj[u]){
if(color[v] === -1){ color[v] = 1 - color[u]; q.push(v); }
else if(color[v] === color[u]) return false;
}
}
}
return true;
}

2. Directed — Unweighted
   Topological sort (DFS)

Use: ordering tasks in DAG.

Idea: do DFS, push node on stack after exploring children (postorder).

Time: O(V + E).

Memory hint: "finish times stack".
function topo(){
visited.fill(false);
const stk = [];
function dfs(u){
visited[u]=true;
for(let v of adj[u]) if(!visited[v]) dfs(v);
stk.push(u); // postorder
}
for(let i=0;i<V;i++) if(!visited[i]) dfs(i);
return stk.reverse(); // topological order if DAG
}

Kahn’s Algorithm (BFS)

Use: topological order + detect cycles (if not all nodes processed).

Idea: repeatedly remove nodes with indegree 0.

Time: O(V + E).

function kahn(){
const indeg = Array(V).fill(0);
for(u=0;u<V;u++) for(v of adj[u]) indeg[v]++;
const q=[]; for(i=0;i<V;i++) if(indeg[i]==0) q.push(i);
const order=[];
while(q.length){
const u=q.shift(); order.push(u);
for(let v of adj[u]) { indeg[v]--; if(indeg[v]==0) q.push(v); }
}
if(order.length !== V) /_ cycle exists _/;
return order;
}

Cycle detection (Directed)

Use: detect cycle in directed graph.

Idea: DFS with recStack[] (or colors: 0/1/2).

Time: O(V + E).

function hasCycle(){
const vis = Array(V).fill(0); // 0=un,1=visiting,2=done
function dfs(u){
vis[u]=1;
for(let v of adj[u]){
if(vis[v]===0 && dfs(v)) return true;
else if(vis[v]===1) return true; // back edge
}
vis[u]=2; return false;
}
for(let i=0;i<V;i++) if(vis[i]===0 && dfs(i)) return true;
return false;
}

Strongly Connected Components — Kosaraju

Use: SCC decomposition.

Idea: 1) DFS order stack (finish times). 2) Transpose graph. 3) DFS on transpose popping stack gives SCCs.

Time: O(V + E).

// 1. fill stack by finish time in original graph
// 2. build transpose graph
// 3. pop nodes from stack, DFS on transpose marking nodes of an SCC

Strongly Connected Components — Tarjan

Use: single-pass SCCs using low-link.

Idea: DFS timestamp disc[] + low[], stack of current path. If disc[u] == low[u] pop SCC.

Time: O(V + E).

Memory hint: "low-link = earliest reachable discovery".
function tarjan(){
disc.fill(-1); low.fill(-1); inStack.fill(false); time=0; stack=[];
function dfs(u){
disc[u]=low[u]=time++; stack.push(u); inStack[u]=true;
for(v of adj[u]){
if(disc[v]==-1){ dfs(v); low[u]=min(low[u], low[v]); }
else if(inStack[v]) low[u] = min(low[u], disc[v]);
}
if(low[u]===disc[u]){ // root of SCC
const comp = [];
while(true){ const w = stack.pop(); inStack[w]=false; comp.push(w); if(w===u) break; }
// comp is an SCC
}
}
for(i=0;i<V;i++) if(disc[i]==-1) dfs(i);
}

3. Weighted — Undirected
   Minimum Spanning Tree — Kruskal

Use: MST when edges are given as list; works well when edges sparse.

Idea: sort edges by weight, add if endpoints in different DSU sets.

DS: sort + DSU (union-find).

Time: O(E log E) | Space: O(V)

Memory hint: "Kruskal = sort edges, connect forests."

edges.sort((a,b)=>a[2]-b[2]);
const dsu = new DSU(V);
let mstWeight=0;
for([u,v,w] of edges){
if(dsu.find(u)!==dsu.find(v)){ dsu.union(u,v); mstWeight+=w; }
}

Minimum Spanning Tree — Prim

Use: MST, good with adjacency list & heap.

Idea: grow MST from start; always add cheapest edge to outside.

DS: min-heap/priority queue, visited[].

Time: O(E log V) | Space: O(V)

Memory hint: "Prim = grow the tree outward."
const visited = Array(V).fill(false);
const pq = new MinHeap(); // entries [weight, node, parent]
pq.push([0, src, -1]);
while(!pq.isEmpty()){
const [w,u,p] = pq.pop();
if(visited[u]) continue;
visited[u]=true; // if p!=-1 add edge (p,u)
for([v,wt] of adj[u]) if(!visited[v]) pq.push([wt,v,u]);
}

4. Weighted — Directed (shortest paths)
   Dijkstra (non-negative weights)

Use: shortest path single-source with non-negative weights.

Idea: greedy relax via min-priority queue; always pop node with smallest current dist.

DS: min-heap ([dist,node]), dist[].

Time: O(E log V) | Space: O(V)

Pitfall: fails on negative edges.

Memory hint: "Dijkstra = greedy relax smallest dist first."

dist.fill(Infinity); dist[src]=0;
const pq = new MinHeap(); pq.push([0,src]);
while(!pq.isEmpty()){
const [d,u] = pq.pop();
if(d>dist[u]) continue;
for([v,w] of adj[u]){
if(dist[u]+w < dist[v]){ dist[v] = dist[u]+w; pq.push([dist[v],v]); }
}
}

Bellman-Ford (handles negative weights & detects negative cycles)

Use: single-source with possible negative edges, detects negative cycles.

Idea: relax all edges V-1 times; then one more pass to detect improvements => negative cycle.

Time: O(VE) | Space: O(V)

Memory hint: "Bellman-Ford = repeated relaxations."

dist.fill(Infinity); dist[src]=0;
for(i=1;i<=V-1;i++){
for([u,v,w] of edges) if(dist[u]!=Inf && dist[u]+w < dist[v]) dist[v]=dist[u]+w;
}
for([u,v,w] of edges) if(dist[u]+w < dist[v]) /_ negative cycle _/;

dist.fill(Infinity); dist[src]=0;
for(i=1;i<=V-1;i++){
for([u,v,w] of edges) if(dist[u]!=Inf && dist[u]+w < dist[v]) dist[v]=dist[u]+w;
}
for([u,v,w] of edges) if(dist[u]+w < dist[v]) /_ negative cycle _/;

Floyd-Warshall (all-pairs shortest paths)

Use: all-pairs shortest paths; handles negative edges (no negative cycles allowed).

Idea: dynamic programming, dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]) for all k.

DS: matrix dist[V][V].

Time: O(V³) | Space: O(V²)

Memory hint: "Floyd = try all nodes as intermediate."
for(k=0;k<V;k++)
for(i=0;i<V;i++)
for(j=0;j<V;j++)
if(dist[i][k] !== INF && dist[k][j] !== INF)
dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);

Shortest paths in DAG

Use: single-source when graph is a DAG (weights can be negative but no cycles).

Idea: topologically order nodes, then relax edges in that order once.

Time: O(V + E)

order = topoSort();
dist.fill(Infinity); dist[src]=0;
for(u of order) for([v,w] of adj[u]) if(dist[u]!=Inf && dist[u]+w < dist[v]) dist[v] = dist[u]+w;

5. Special Topics (connectivity & traversal)
   Bridges (Critical Connections)

Use: find edges whose removal increases components.

Idea: DFS disc[] and low[]; edge (u,v) is a bridge if low[v] > disc[u] (v is descendant).

Time: O(V + E)

Memory hint: "low[v] > disc[u] => no back-edge from v's subtree."

function dfs(u, parent){
disc[u]=low[u]=time++;
for(v of adj[u]){
if(v===parent) continue;
if(disc[v]===-1){ dfs(v,u); low[u] = Math.min(low[u], low[v]); if(low[v] > disc[u]) bridges.push([u,v]); }
else low[u] = Math.min(low[u], disc[v]);
}
}

Articulation Points (Cut vertices)

Use: find vertices whose removal disconnects the graph.

Idea: DFS with disc[], low[]. Root is AP if it has ≥2 children; non-root u is AP if some child v has low[v] >= disc[u].

Time: O(V + E).

Memory hint: "root with multiple children OR child's low can't reach above u."
// in DFS after returning from child v:
low[u] = min(low[u], low[v]);
if(parent[u] === -1 && children > 1) ap[u]=true;
if(parent[u] !== -1 && low[v] >= disc[u]) ap[u]=true;

Eulerian Path / Circuit (Undirected)

Use: check if edges can be traversed exactly once (path/circuit).

Idea (undirected):

Eulerian Circuit: graph connected (ignoring isolated vertices) & all vertices even degree.

Eulerian Path (but not circuit): exactly 2 vertices with odd degree & graph connected.

Time: O(V + E)

Memory hint: "degree parity decides path vs circuit."

Hierholzer’s Algorithm (construct Eulerian tour)

Use: produce Euler circuit/path.

Idea: follow edges until stuck → cycle; if unused edges remain on cycle vertices start new cycle & splice in. Use stack.

Time: O(E).

stack = [start]; path=[];
while(stack.length){
let u = stack[stack.length-1];
if(adj[u].length){
v = adj[u].pop(); // remove edge u->v
stack.push(v);
} else path.push(stack.pop());
}
path.reverse(); // Eulerian path/circuit

Hamiltonian Path (visit all vertices exactly once)

Use: check existence (NP-complete). For small n use backtracking or DP bitmask.

Idea: DFS backtracking; or DP dp[mask][u] for n ≤ ~20.

Time: backtracking O(n!), DP O(n \* 2^n).

Memory hint: "Hamiltonian = permutation search; use DP for n small."

// DP bitmask sketch
dp[1<<i][i]=true for all i;
for(mask=0;mask<1<<n;mask++)
for(u=0;u<n;u++) if(dp[mask][u])
for(v of adj[u]) if(!(mask & (1<<v))) dp[mask|(1<<v)][v]=true;
check dp[(1<<n)-1][u] for any u.

Disjoint Set Union (Union-Find)

Use: connectivity, Kruskal, cycle detection in undirected graphs.

Idea: maintain parent[]; find with path compression; union by size or rank.

Time: amortized O(α(n)) per op (≈ constant).

Memory hint: "compress path, attach small to big."

function find(x){ if(parent[x]!==x) parent[x] = find(parent[x]); return parent[x]; }
function union(a,b){ a=find(a); b=find(b); if(a===b) return false; if(size[a]<size[b]) swap(a,b); parent[b]=a; size[a]+=size[b]; return true; }

Quick Decision Table (Which algorithm to pick)

Unweighted shortest path: BFS

Directed cycle or topo order: DFS or Kahn’s

SCCs: Tarjan (single DFS) or Kosaraju (two-pass)

Single-source shortest (non-negative): Dijkstra

Single-source with negative edges: Bellman-Ford

All-pairs shortest: Floyd-Warshall (dense/smaller V)

MST: Kruskal (edge-list) or Prim (adj-list + PQ)

Bridges / Articulation points: Tarjan style disc/low

Eulerian tour: Hierholzer’s algorithm

Hamiltonian path (small N): backtracking or bitmask DP

Final mnemonic memory hints (one-liners)

BFS: Waves / levels.

DFS: Dive deep; backtrack.

Dijkstra: Greedy on shortest frontier.

Bellman-Ford: Relax edges V−1 times.

Floyd: Try every node as intermediate.

Prim: Grow tree from a node.

Kruskal: Sort edges, join forests.

Tarjan: Low-link reveals SCC roots.

Kosaraju: Finish times + transpose.

Hierholzer: Walk cycles, splice them.

Union-Find: Attach small to big; compress paths.
