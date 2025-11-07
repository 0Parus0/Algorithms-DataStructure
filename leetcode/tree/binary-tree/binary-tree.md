# 🌳 Binary Tree Cheat Sheet

## 📌 Definition

A **Binary Tree** is a hierarchical data structure in which:

1. Each node has **at most two children** (left child and right child).
2. There is **exactly one root node**.
3. There is **exactly one unique path** between the root and any other node (no cycles).

---

## 📌 Example (Valid Binary Tree)

    A (Root)
    / \
    B C
    /
    D

- `A` → root
- `B` has 1 child (`D`)
- `C` has 0 children (leaf)
- Unique path from root to every node ✅

---

## 📌 Counterexample (Not a Binary Tree)

     A
    / \
    B C
    \ /
     D

- Node `D` has **two parents** (`B` and `C`)
- Multiple paths from root to `D` ❌
- This violates the binary tree rules

---

## 📌 Types of Binary Trees

### 1. Full (Proper) Binary Tree

Every node has **0 or 2 children**.

     1
    / \

2 3
/ \
 4 5

### 2. Complete Binary Tree

All levels are **completely filled**, except possibly the last, which is filled **from left to right**.

     1
    / \
    2 3
    / \
    4 5

### 3. Perfect Binary Tree

Both **full and complete**.

- All internal nodes have 2 children.
- All leaves are at the same level.

      1

  / \
   2 3
  / \ / \
  4 5 6 7

### 4. Balanced Binary Tree

The height difference between the left and right subtrees of every node is **≤ 1**.

- Examples: **AVL Tree, Red-Black Tree**

### 5. Degenerate (Skewed) Binary Tree

Each parent has only **one child**, behaves like a linked list.

**Left-Skewed**

1

/
2
/
3

**Right-Skewed**

1

2

3

---

## 📌 Properties of Binary Trees

For a binary tree with **n nodes** and **height h**:

- **Maximum nodes at level `l`** = `2^l` (if root is level 0).
- **Maximum nodes at level `l`** = `2^(l-1)` (root level = 1).
- **Maximum nodes at depth `d`** = `2^d`
- **Maximum nodes in a binary tree of height h** = `2^(h+1) - 1`.
- **Minimum height with n nodes** = `⌊log₂(n)⌋`.
- **Maximum height with n nodes** = `n - 1` (degenerate tree).

---

## 📌 Traversals

### Depth-First Traversal (DFS)

1. **Preorder**: Root → Left → Right
2. **Inorder**: Left → Root → Right
3. **Postorder**: Left → Right → Root

### Breadth-First Traversal (BFS)

- **Level Order**: Visit nodes level by level.

**Example**

    A

/ \
 B C
/ \
D E

- Preorder: A B D E C
- Inorder: D B E A C
- Postorder: D E B C A
- Level Order (BFS): A B C D E

---

## 📌 Special Binary Trees

- **Binary Search Tree (BST)**: Left < Root < Right.
- **AVL Tree**: Height-balanced BST.
- **Red-Black Tree**: Self-balancing BST with coloring rules.
- **Heap**: Complete binary tree (min-heap or max-heap).
