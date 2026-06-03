This Markdown document organizes the technical topics provided into a clean, structured roadmap.

---

# Data Structures & Algorithms (DSA) Roadmap

## ARRAYS (⭐ ⭐ ⭐ Must Master)

### Essential Patterns

1.  **Two pointers** (converging, parallel, fast-slow)
2.  **Sliding window** (fixed & variable size)
3.  **Prefix sum**
4.  **Difference array**
5.  **Dutch National Flag** (3-way partitioning)
6.  **Kadane's algorithm** (maximum subarray)
7.  **Cyclic sort** (array contains 1..n)
8.  **In-place operations**

### Advanced

9.  **Monotonic stack/queue**
10. **Reservoir sampling**
11. **Boyer-Moore majority vote**
12. **Merge intervals patterns**

---

## STRINGS (⭐ ⭐ Must Know)

### Essential

1.  **Two pointers** (palindrome, reverse)
2.  **Sliding window** (substring problems)
3.  **String building/parsing**
4.  **Anagrams/frequency counting**
5.  **KMP algorithm** (conceptual understanding)
6.  **Rabin-Karp** (rolling hash)

### Important

7.  **Trie** (autocomplete, prefix problems)
8.  **String DP** (edit distance, LCS)
9.  **Palindrome DP/manachers** (conceptual)

---

## LINKED LISTS (⭐⭐ Important)

### Essential Patterns

1.  **Fast-slow pointers** (cycle detection)
2.  **Reverse linked list** (iterative/recursive)
3.  **Merge linked lists**
4.  **Find intersections**
5.  **Add/remove nodes**

### Advanced

6.  **Flatten multilevel lists**
7.  **LRU cache implementation**
8.  **Deep copy with random pointers**

---

## BINARY SEARCH (⭐⭐⭐ Crucial)

### Must Master Variants

1.  **Standard binary search**
2.  **Search in rotated array**
3.  **Find boundaries** (first/last occurrence)
4.  **Search in infinite/unknown size**
5.  **Binary search on answer/value space**
6.  **Matrix search** (rows & columns sorted)

### Advanced

7.  **Bitonic array search**
8.  **Interpolation search** (conceptual)

---

## STACK & QUEUE (⭐⭐ Important)

### Essential Patterns

1.  **Monotonic stack** (next greater element)
2.  **Parentheses validation**
3.  **Calculator/expression evaluation**
4.  **Queue using stacks** & vice versa
5.  **Circular queue/deque**

### Advanced

6.  **Min/max stack/queue**
7.  **Stack for DFS problems**

---

## TREES (⭐⭐⭐ Master All)

### Binary Tree

1.  **DFS traversals** (pre/in/post-order)
2.  **BFS/level order**
3.  **Height/depth calculations**
4.  **Symmetry/mirror checks**
5.  **Path sum problems**
6.  **LCA** (Lowest Common Ancestor)
7.  **Serialization/deserialization**

### Binary Search Tree

8.  **Validate BST**
9.  **Insert/delete/search**
10. **In-order successor/predecessor**
11. **Kth smallest/largest**
12. **Range queries**

### Advanced Tree Structures

13. **Trie (prefix tree)** - _Essential for senior roles_
14. **Segment tree** (range queries)
15. **Fenwick tree (BIT)** - _Conceptual_
16. **AVL/RB trees** - _Conceptual only_

---

## HEAP/PRIORITY QUEUE (⭐⭐ Important)

### Essential Patterns

1.  **K largest/smallest elements**
2.  **Merge K sorted lists/arrays**
3.  **Median finder**
4.  **Task scheduler**
5.  **Top K frequent elements**

### Advanced

6.  **Custom comparator patterns**
7.  **Two-heap techniques**

---

## BACKTRACKING (⭐⭐ Must Know)

### Essential Patterns

1.  **Subsets/combinations/permutations**
2.  **N-Queens/Sudoku**
3.  **Palindrome partitioning**
4.  **Word search** (grid backtracking)
5.  **Generate parentheses**

### Optimization

6.  **Pruning techniques**
7.  **Memoization** in backtracking

---

## DYNAMIC PROGRAMMING (⭐⭐⭐ Senior Must)

### 1D DP

1.  **Fibonacci/Climbing stairs**
2.  **House robber variations**
3.  **Coin change** (unbounded/0-1)
4.  **Longest increasing subsequence**
5.  **Partition problems**

### 2D DP

6.  **Knapsack** (0-1, unbounded)
7.  **Longest common subsequence/substring**
8.  **Edit distance**
9.  **Matrix chain multiplication**
10. **Interleaving string**

### Advanced DP

11. **State machine DP** (buy/sell stock variations)
12. **Bitmask DP** (subset problems)
13. **Digit DP** (range queries)
14. **DP on trees**
15. **DP with probability**

---

## GRAPH (⭐⭐ Know Well)

### Traversal

1.  **BFS** (shortest path in unweighted)
2.  **DFS** (recursive & iterative)
3.  **Topological sort** (Kahn's algorithm, DFS)
4.  **Cycle detection** (directed/undirected)

### Advanced

5.  **Union-Find (Disjoint Set)** - _Crucial_
6.  **Dijkstra** (shortest path, weighted)
7.  **Minimum Spanning Tree** (Kruskal/Prim - conceptual)
8.  **Strongly Connected Components** (conceptual)
9.  **Bipartite checking**

---

## GREEDY (⭐ ⭐ Important)

### Common Patterns

1.  **Interval scheduling**
2.  **Fractional knapsack**
3.  **Huffman coding** (conceptual)
4.  **Activity selection**
5.  **Gas station problem**

---

## SYSTEM DESIGN PATTERNS (⭐⭐⭐ Senior Critical)

### Frontend-Specific

1.  **Virtualized lists** (windowing)
2.  **Debounce/throttle** implementations
3.  **Observer pattern** (custom event systems)
4.  **State management patterns** (Redux, MobX principles)
5.  **Component lifecycle optimization**

### General

6.  **LRU/LFU cache** implementation
7.  **Rate limiting algorithms**
8.  **Pub-sub implementation**
9.  **Singleton/factory patterns**

---

## BIT MANIPULATION (⭐ Basics)

1.  **Common operations** (AND, OR, XOR, shifts)
2.  **Count set bits**
3.  **Power of two checks**
4.  **Single number variations**

---

## GEOMETRY/RANDOM (⭐ Rare)

1.  **Line intersection**
2.  **Point in polygon**
3.  **Reservoir sampling**
4.  **Random number generation** with constraints

---

## Study Priority for Senior Frontend

### Tier 1 (Master)

- **Arrays** (all patterns)
- **Trees** (especially BST, Trie)
- **Dynamic Programming**
- **System Design Patterns**
- **Binary Search** variations

### Tier 2 (Be Comfortable)

- **Graphs** (BFS/DFS/Union-Find)
- **Backtracking**
- **Heaps**
- **Strings** (especially with Tries)

### Tier 3 (Know Basics)

- **Greedy algorithms**
- **Linked Lists**
- **Bit manipulation**
- **Advanced graph algorithms**

---

## Frontend-Specific Algorithm Applications

- **Virtual Scrolling** = Sliding window on steroids
- **Debounce/Throttle** = Time-based sliding window
- **Undo/Redo** = Stack-based operations
- **DOM Diffing** = Tree traversal + DP (edit distance)
- **State Management** = Graph dependency resolution
- **Code Splitting** = Graph traversal for dependencies
