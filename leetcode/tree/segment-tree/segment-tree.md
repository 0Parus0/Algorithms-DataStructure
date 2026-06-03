**Segment Tree** is a versatile tree data structure used for storing information about intervals or segments. It is primarily used to solve problems involving **range queries** (e.g., finding the sum, minimum, or maximum in a range) and **updates** (changing values in the array) efficiently.

Here are the key properties of a segment tree:

## High level properties:

- It's a binary tree
- The root node represents the whole array
- Every leaf node represents a single element
- Internal nodes represent a range
- It's a balanced binary tree
- To represent an array in a segment tree we will need 2 \* n - 1 nodes.
- Height of segment tree representing an array will be ceiling of (log n) base 2

### 1. Structural Properties

- **Binary Tree Structure:** A segment tree is a binary tree where each node represents a specific interval $[L, R]$ of the input array.
- **Root and Leaves:**
  - The **root** node represents the entire array $[0, n-1]$.
  - The **leaf nodes** represent individual elements of the array (intervals of length 1, like $[i, i]$).
- **Recursive Decomposition:** For any internal node representing $[L, R]$, its left child represents the range $[L, \text{mid}]$ and its right child represents $[\text{mid}+1, R]$, where $\text{mid} = \lfloor(L+R)/2\rfloor$.
- **Height:** The tree is balanced, with a height of exactly $\lceil \log_2 n \rceil$.

### 2. Space and Node Count

- **Total Nodes:** For an array of size $n$, the number of nodes is approximately $2n-1$ if $n$ is a power of 2.
- **Memory Allocation:** In a typical array-based implementation (where children of node `i` are `2* i + 1` and `2 * i+2`), the array size is usually set to **$4n$** to safely accommodate cases where $n$ is not a power of 2.
- **Space Complexity:** $O(n)$.

### 3. Time Complexity

| Operation        | Time Complexity                     |
| :--------------- | :---------------------------------- |
| **Build Tree**   | $O(n)$                              |
| **Range Query**  | $O(\log n)$                         |
| **Point Update** | $O(\log n)$                         |
| **Range Update** | $O(\log n)$ (with Lazy Propagation) |

### 4. Operational Properties

- **Associativity Requirement:** For a segment tree to work, the operation being performed (e.g., Sum, Min, Max, GCD) must be **associative**. This means $(a \circ b) \circ c = a \circ (b \circ c)$.
- **Non-Commutative Ops:** While many operations are commutative (like sum or min), a segment tree can also handle non-commutative operations (like matrix multiplication) as long as the order of combining children is strictly maintained.
- **Static Structure:** Once the tree is built, its structure (which node represents which range) is static. Only the values stored in the nodes change.

### 5. Advanced Property: Lazy Propagation

Lazy propagation is a common optimization used when you need to update an entire **range** of elements (e.g., "add 5 to all elements from index 2 to 10").

- **How it works:** Instead of updating every leaf node in the range (which would be $O(n)$), you update a high-level node representing the range and mark it with a "lazy tag."
- **Benefit:** The update is only pushed down to its children when those children are actually accessed in a future query or update, keeping the range update complexity at $O(\log n)$.

### Summary Comparison

| Feature            | Segment Tree                       | Binary Indexed Tree (Fenwick)    |
| :----------------- | :--------------------------------- | :------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Complexity**     | $O(n)$ space, $O(\log n)$ ops      | $O(n)$ space, $O(\log n)$ ops    |
| **Functionality**  | Supports Min, Max, Sum, GCD, etc.  | Primarily supports Prefix Sums   |
| **Implementation** | More complex, requires more memory | Very simple and memory-efficient |
| **Range Updates**  | Efficient via Lazy Propagation     | Limited/Complex for some types   | **Segment Tree** is a versatile tree data structure used for storing information about intervals or segments. It is primarily used to solve problems involving **range queries** (e.g., finding the sum, minimum, or maximum in a range) and **updates** (changing values in the array) efficiently. |

Here are the key properties of a segment tree:

### 1. Structural Properties

- **Binary Tree Structure:** A segment tree is a binary tree where each node represents a specific interval $[L, R]$ of the input array.
- **Root and Leaves:**
  - The **root** node represents the entire array $[0, n-1]$.
  - The **leaf nodes** represent individual elements of the array (intervals of length 1, like $[i, i]$).
- **Recursive Decomposition:** For any internal node representing $[L, R]$, its left child represents the range $[L, \text{mid}]$ and its right child represents $[\text{mid}+1, R]$, where $\text{mid} = \lfloor(L+R)/2\rfloor$.
- **Height:** The tree is balanced, with a height of exactly $\lceil \log_2 n \rceil$.

### 2. Space and Node Count

- **Total Nodes:** For an array of size $n$, the number of nodes is approximately $2n-1$ if $n$ is a power of 2.
- **Memory Allocation:** In a typical array-based implementation (where children of node `i` are `2i` and `2i+1`), the array size is usually set to **$4n$** to safely accommodate cases where $n$ is not a power of 2.
- **Space Complexity:** $O(n)$.

### 3. Time Complexity

| Operation        | Time Complexity                     |
| :--------------- | :---------------------------------- |
| **Build Tree**   | $O(n)$                              |
| **Range Query**  | $O(\log n)$                         |
| **Point Update** | $O(\log n)$                         |
| **Range Update** | $O(\log n)$ (with Lazy Propagation) |

### 4. Operational Properties

- **Associativity Requirement:** For a segment tree to work, the operation being performed (e.g., Sum, Min, Max, GCD) must be **associative**. This means $(a \circ b) \circ c = a \circ (b \circ c)$.
- **Non-Commutative Ops:** While many operations are commutative (like sum or min), a segment tree can also handle non-commutative operations (like matrix multiplication) as long as the order of combining children is strictly maintained.
- **Static Structure:** Once the tree is built, its structure (which node represents which range) is static. Only the values stored in the nodes change.

### 5. Advanced Property: Lazy Propagation

Lazy propagation is a common optimization used when you need to update an entire **range** of elements (e.g., "add 5 to all elements from index 2 to 10").

- **How it works:** Instead of updating every leaf node in the range (which would be $O(n)$), you update a high-level node representing the range and mark it with a "lazy tag."
- **Benefit:** The update is only pushed down to its children when those children are actually accessed in a future query or update, keeping the range update complexity at $O(\log n)$.

### Summary Comparison

| Feature            | Segment Tree                       | Binary Indexed Tree (Fenwick)    |
| :----------------- | :--------------------------------- | :------------------------------- |
| **Complexity**     | $O(n)$ space, $O(\log n)$ ops      | $O(n)$ space, $O(\log n)$ ops    |
| **Functionality**  | Supports Min, Max, Sum, GCD, etc.  | Primarily supports Prefix Sums   |
| **Implementation** | More complex, requires more memory | Very simple and memory-efficient |
| **Range Updates**  | Efficient via Lazy Propagation     | Limited/Complex for some types   |
