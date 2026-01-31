# 🌳 Tree Data Structure Cheat Sheet

## 📌 Basic Terms

- **Tree**: A hierarchical data structure consisting of nodes connected by edges.
- **Node**: A fundamental unit containing data and links to children.
- **Edge**: A connection between two nodes (parent → child).
- **Root**: The topmost node of the tree.

- **Leaf Node (External Node)**: A node with no children.
- **Internal Node**: A node that has at least one child.
- **Subtree**: A tree formed by any node and its descendants.
- **Empty Tree**: A tree with no nodes.

---

## 📌 Relationships

- **Parent**: A node that has one or more children.
- **Child**: A node that descends from another node.
- **Sibling**: Nodes with the same parent.
- **Ancestor**: Any node on the path from root to a given node.
- **Descendant**: Any node reachable downward from a given node.

---

## 📌 Properties

- **Depth of a Node**: Distance (#edges) from the root.
- **Height of a Node**: Distance (#edges) to the deepest leaf.
- **Height of Tree**: Height of the root node.
- **Level of a Node**: Depth + 1 (root is level 1).
- **Degree of a Node**: Number of children it has.
- **Degree of Tree**: Maximum degree of any node.

### Example: Depth, Height, Levels

     A (root, depth=0, height=2, level=1)
    / \

B C (depth=1, level=2)
/
D (leaf, depth=2, height=0, level=3)

---

## 📌 Types of Trees

- **Balanced Tree**: Height difference between left & right subtrees ≤ 1.
- **Complete Tree**: All levels are filled except possibly the last, filled left → right.
- **Full (Proper) Binary Tree**: Every node has 0 or 2 children.
- **Perfect Binary Tree**: Full + Complete (all leaves at the same level).

### Visuals

**Complete Tree**
1
/ \
 2 3
/ \
4 5

**Full Binary Tree**
1
/ \
 2 3

**Perfect Binary Tree**
1
/ \
 2 3
/ \ / \
4 5 6 7

---

## 📌 Traversal

- **DFS (Depth First Search)**

  - **Preorder**: Root → Left → Right
  - **Inorder**: Left → Root → Right
  - **Postorder**: Left → Right → Root

- **BFS (Breadth First Search / Level Order)**: Visit nodes level by level.

### Example Tree

    A

/ \
 B C
/ \
D E

- Preorder: A B D E C
- Inorder: D B E A C
- Postorder: D E B C A
- BFS: A B C D E

---

## 📌 Special Trees

- **Binary Tree**: Each node has ≤ 2 children.
- **Binary Search Tree (BST)**: Left < Root < Right.
- **AVL Tree**: Self-balancing BST (height difference ≤ 1).
- **Red-Black Tree**: Self-balancing BST with coloring rules.
- **Trie (Prefix Tree)**: Stores strings by characters.
- **Heap**: Complete binary tree with heap property.

---

✅ This cheat sheet gives you **definitions + ASCII diagrams** for quick recall.
