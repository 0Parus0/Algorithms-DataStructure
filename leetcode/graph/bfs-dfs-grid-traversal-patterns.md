# 🔍 BFS/DFS Grid Traversal Patterns — Intuitive Comparison

| **Concept**                         | **Pattern 1 — for–for → while (queue)** <br>_(Multi-source spread from known points)_ | **Pattern 2 — while (queue) inside for–for** <br>_(Discover and explore each component)_ | **Pattern 3 — for–for–while (time layers)** <br>_(Simulation / time-based spread)_ |
| ----------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **🧩 Typical Use Case**             | Surrounded Regions, Rotting Oranges, Fire Spread                                      | Number of Islands, Flood Fill, Connected Components                                      | Time-step simulation / multi-layer propagation (3D grid, Word Ladder levels)       |
| **💡 Core Idea**                    | Start BFS/DFS from **known border or infected** cells and spread outward.             | Scan the grid; when a **new region** is found, start BFS/DFS to mark it fully.           | Each **outer loop = time/state layer**; BFS expands one “minute” at a time.        |
| **🧠 BFS Mental Model**             | “Let infection/water spread from all known sources in parallel.”                      | “Expand outward from this one island until it’s fully visited.”                          | “Every minute, all current fires infect neighbors simultaneously.”                 |
| **🧠 DFS Mental Model**             | “Follow one source’s leak deeply, then backtrack.” _(rarely needed here)_             | “Dive through the entire island recursively before moving to the next.”                  | “Follow one time-chain deeply” _(not natural; breaks parallelism)_                 |
| **🔄 Loop Structure**               | `for–for` → collect sources → single `while (queue.length)` BFS                       | `for–for` → when cell unvisited → start `while` BFS or recursive DFS                     | Outer `for–for` simulate time/state → inner `while (queue)` for layer BFS          |
| **🧰 Data Needed Before Traversal** | All starting sources pre-collected (multi-source queue).                              | Just current cell `(i, j)` when discovered.                                              | Queue of sources for current time layer + next layer.                              |
| **🕒 Time Representation**          | BFS levels = distance / minutes. DFS has no time notion.                              | Each BFS/DFS is independent; no global time.                                             | Each outer iteration = 1 time unit (very natural with BFS).                        |
| **⚙️ Queue / Stack Usage**          | One global queue (shared spread). DFS would recurse from each source.                 | New queue/stack per component found.                                                     | Same queue used each minute to simulate progression.                               |
| **💬 Behavior**                     | BFS spreads from all sources together → wave pattern.                                 | BFS/DFS finishes one region completely before starting next.                             | BFS processes each “minute” level → parallel growth.                               |
| **🧠 Analogy**                      | 🌊 “All leaks flood simultaneously.”                                                  | 🏝 “Explore one island until every tile is visited.”                                      | 🔥 “Fire spreads one layer each minute until all burn.”                            |
| **📈 Visualization Idea**           | _(parallel waves — all sources expand at once)_                                       | _(independent islands — each discovered separately)_                                     | _(time layers — wave expands each minute)_                                         |
| **📊 When to Prefer BFS**           | Need shortest time / distance / parallel spread.                                      | Want breadth guarantees or avoid recursion.                                              | Always — time and level simulation fit naturally.                                  |
| **📊 When to Prefer DFS**           | Small grid / single source / no time tracking.                                        | Simpler implementation to count or mark components.                                      | Rarely (use only if explicitly depth-based).                                       |

---

### 💡 Summary

These three traversal patterns capture most real-world BFS/DFS grid problems:

1. **Pattern 1** — Multi-source spread → _parallel propagation from all known sources._
2. **Pattern 2** — Component discovery → _explore disconnected regions one by one._
3. **Pattern 3** — Time simulation → _each iteration represents a “minute” of change._

---

**Suggested filename:**
👉 `bfs-dfs-grid-traversal-patterns.md`
