# **Data Structure**

### In computer science, a data structure is a data organization, management, and storage format that enables efficient access and modification. More precisely, a data structure is a collection of data values, the relationships among them, and the functions or operations that can be applied to the data.


# **Algorithm**

### In mathematics and computer science, an algorithm is a finite sequence of well-defined, computer-implementable instructions, typically to solve a class of problems or to perform a computation. Algorithms are unambiguous specifications for performing calculation, data processing, automated reasoning, and other tasks.
---
## Arrays 
### An array is collection of items stored at contiguous memory locations. The idea is to store multiple items of same type together.

* ###  lookup O(1)
* ###  push O(1)
* ###  insert O(n)
* ###  delete O(n) 

## When to use arrays 
* ### Fast lookup;
* ### Fast push/pop;
* ### Ordered
* ### Slow insert(splice);
* ### Slow deletes(slice);
* ### Fixed size ( if using static array)
---
## Hash Tables
### In computing, a hash table (hash map) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found.

* ### Insert O(1)
* ### Lookup O(1)
* ### delete O(1)
* ### search O(1)

### Cons of Hash Tables are When a hash function maps two different keys to the same table address, a collision is said to occur. A simple re-hashing scheme in which the next slot in the table is checked on a collision.
---
## Singly Linked Lists;
### Singly linked list is a basic linked list type  in which the elements are not stored at contiguous memory locations. Singly linked list is a collection of nodes linked together in a sequential way where each node of singly linked list contains a data field and an address field which contains the reference of the next node. The first node is called the head and the last node is called tail.

* ### prepend(add to the beginning) O(1)
* ### append(add to the end) O(1)
* ### lookup O(n)
* ### insert O(n)
* ### delete O(n)
---
## Doubly Linked Lists;
### A doubly linked list is a linked data structure that consists of a set of sequentially linked records called nodes. Each node contains three fields one is data part, and remaining two are called links, that are references to the previous and to the next node in the sequence of nodes.

* ### prepend( add to the beginning) O(1)
* ### append( add to the end) O(1)
* ### lookup O(n)
* ### insert O(n)
* ### delete O(n)

---
* ### Circular linked list: Circular linked list is a linked list where all nodes are connected to form a circle. There is no NULL at the end. A circular linked list can be a singly circular linked list or doubly circular linked list.
---
## Stacks; 
### Stack is a linear data structure which follows a particular order in which the operations are performed. The order may be LIFO(Last In First Out) or FILO(First In Last Out).A stack is a container of objects that are inserted and removed according to the last-in first-out (LIFO) principle. In the push-down stacks only two operations are allowed: push the item into the stack, and pop the item out of the stack. A stack is a limited access data structure - elements can be added and removed from the stack only at the top. push adds an item to the top of the stack, pop removes the item from the top. A helpful analogy is to think of a stack of books; you can remove only the top book, also you can add a new book on the top.

* ### lookup O(n)
* ### pop O(1)
* ### push O(1)
* ### peek O(1)

* ### Arrays are better option for stacks
---
* ### ADT: Abstract Data type (ADT) is a type (or class) for objects whose behaviour is defined by a set of value and a set of operations.The definition of ADT only mentions what operations are to be performed but not how these operations will be implemented. It does not specify how data will be organized in memory and what algorithms will be used for implementing the operations. It is called “abstract” because it gives an implementation-independent view. The process of providing only the essentials and hiding the details is known as abstraction.


## Queues;
### Queue is an abstract data structure, somewhat similar to Stacks. Unlike stacks, a queue is open at both its ends. One end is always used to insert data (enqueue) and the other is used to remove data (dequeue). Queue follows FIFO(First-In-First-Out) methodology, i.e., the data item stored first will be accessed first

* ### lookup O(n)
* ### enqueue O(1)
* ### dequeue O(1)
* ### peek O(1)

* ### Linked-lists are better option for stacks

---
## Trees: Tree can be define as a collection of entities(nodes) linked together to simulate a hierarchy.
### Tree is a non linear data structure
### In a tree nodes can only reference/point to the nodes below them or in other words to only their children not to the siblings and not a child pointing to the parent.
### In a tree there can only be one root node
### Root: The top node in a tree.
### Node: Node is the basic constituent/entity/cell of a tree which contains a value as well as links to its children nodes and is connected to its parent with a link.
### Child: A node directly connected to another node when moving away from the root. The immediate successor of a node is called child of that node.
### Parent: The converse notion of child. The immediate predecessor of a node is called its parent.
### Sibling: A group of nodes with the same parent.
### Descendant – Any successor node on the path from that node to leaf node.
### Subtree: A node with all its descendant nodes is called a subtree of the tree.
### Degree: The number of children a node have is called degree of that node and the maximum number of children of any node in a tree is called the degree of that tree.
### Depth: Depth of a node is length of path from root to that node.Or number of edges from root to that node is depth of that node.
### Height: Height of a node is the longest path from that node to a descendant leaf of its own. Height of a tree is always height of its root node.
### Level : Level of node is equal to depth of that node or the length of path from the root node to that node. Level of the tree is equal to the depth or height of the tree.
### Ancestor – Any predecessor node on the path from root to that node is called its ancestor node.
### Leaf: A node with no children is called leaf node and external node.
### Internal: Any node which has at least one child is called internal node.
### Edge: The connection/link between one node and another.
### Path: Sequence of consecutive edges from source node to destination node.
### In a a tree of n-nodes there are n - 1 edges.
---
## **Binary Tree**:
  ### In a Binary Tree each node can only have at most two children nodes or either zero, one or two child nodes and each child can only have one parent
  ### The maximum number of node at a given level i can only be the 2^i
  ### max number of nodes of height h = (2^h+1) - 1;
  ### min number of nodes of height h = h + 1;
  ### min height : log(n + 1) -1 => where maximum number of nodes of a tree of height h are n i.e n = 2^(h+1) -1;
  ### max height : n - 1 => where minimum number of nodes of a tree of height h are n - 1;

  * ## Full Binary Tree:
    ### In a Full binary tree a node will have either zero or two child nodes but never one child or each node always have two children nodes except if it is a leaf node.
    ### Total number of leaf nodes will be total number of internal nodes + 1
    ### max number of nodes = 2^(h+1) -1
    ### min number of nodes = 2h + 1
    ### max height : log(n + 1) - 1;
    ### min height : (n - 1) / 2
  ---
  * ## Complete Binary Tree: 
  ### In a complete binary tree all levels are completely filled (except the last level) and last level has nodes as left as possible.
    ### max number of nodes = 2^(h+1) -1
    ### min number of nodes = 2^h
    ### max height : log(n + 1) - 1;
    ### min height : log(n)

  ---
  * ## Perfect Binary Tree:
    ### In a perfect binary tree all internal nodes have 2 children and all the leaf nodes are on the same level.
    ### In a Perfect binary tree all the leaf nodes are full and there is no node that has one child.
    * ### The number of total nodes on each level doubles as we move down the tree.
    * ### So the last level will have number of nodes equal to the sum of all the nodes + one on all the levels above the bottom level.
  ---
  * ### **Binary Search Tree**
    ### Binary Search Trees maintain relationships, are flexible, are ordered, and their time complexity is better than O(n)
    * ### All children nodes on the right of a node must be greater than the current node. Or The right sub-tree of any node will have values greater than that node
    * ### All child nodes on the left side of a node must be smaller than the current node Or The left sub-tree of that node will have values less than that node.
    * ### In a binary search tree there can't be duplicates.
    * ### **Deletion** : 
    ### There are three cases in deletion of a node 
      * ### It has no child;
        ### Simply delete the link between that node and its parent node.
      * ### It has one child;
        ### Remove that node and replace it with its Child
      * ### It has two children
        ### There are two ways to remove a node with two children 
        ### 1st is replace that node with its in-order predecessor i.e the largest node on the left subtree of that node
        ### 2nd is replace that node with its in-order successor i.e the smallest node on the right subtree of that node.
    * ### A node can only have up to two child nodes
    * ### lookup O(log N)
    * ### insert O(log N)
    * ### delete O(log N)
    * ### How to calculate numbers of node on a given level
    ### Level 0: 2^0 = 1;
    ### Level 1: 2^1 = 2;
    ### Level 2: 2^2 = 4;
    ### Level 3: 2^3 = 8;

    * ### number of nodes = 2^h -1 =>> where (h) is height or the number of level
    * ### log nodes = number of levels

  ---
  * ## Degenerate Binary tree: 
    ### All internal nodes have only one child. a linked list is a degenerate binary tree.
    ### If all nodes are on left side then the degenerate tree is left skewed degenerate tree and if all nodes are on the right side then the degenerate tree is right skewed degenerate binary tree.


    * ### **Unbalanced BST**:
      ### lookup O(n)
      ### insert O(n)
      ### delete O(n)
      ---
  * ## Binary Heap: A Binary Heap is a Binary Tree with following properties.
    * ### 1) It’s a complete tree (All levels are completely filled except possibly the last level and the last level has all keys as left as possible). This property of Binary Heap makes them suitable to be stored in an array.

    * ### 2) A Binary Heap is either Min Heap or Max Heap. In a Min Binary Heap, the key at root must be minimum among all keys present in Binary Heap. The same property must be recursively true for all nodes in Binary Tree. In a Max Binary Heap the key at root must be maximum among all keys present in Binary Heap and the same property must be recursively true for all nodes in Binary Tree.
    * ### 3) In a Binary Heap the data should be inserted from leaf node and the complete binary tree pattern should kept in mind.
    ---
  * ## AVL Tree: Named after their inventor Adelson, Velski & Landis, AVL trees are height balancing binary search tree. AVL tree checks the height of the left and the right sub-trees and assures that the difference is not more than 1. This difference is called the Balance Factor. 
    * ### BalanceFactor = height(left-subtree) − height(right-subtree) = { -1, 0, 1} or should not be greater than 1;

  * ## Red-Black Tree : Red-Black Tree is a self-balancing Binary Search Tree (BST) where every node follows following rules.
    * ### 1) Every node has a color either red or black.
    * ### 2) Root of tree is always black.
    * ### 3) There are no two adjacent red nodes (A red node cannot have a red parent or red child).
    * ### 4) Every path from a node (including root) to any of its descendant NULL node has the same number of black nodes.

  * ## Trie : A trie is a tree-like data structure whose nodes store the letters of an alphabet. By structuring the nodes in a particular way, words and strings can be retrieved from the structure by traversing down a branch path of the tree.
    * ### Trie is an efficient information reTrieval data structure. Using Trie, search complexities can be brought to optimal limit (key length). If we store keys in binary search tree, a well balanced BST will need time proportional to M * log N, where M is maximum string length and N is number of keys in tree. Using Trie, we can search the key in O(M) time. 

  * ## Splay Tree : Splay Tree is a self - adjusted Binary Search Tree in which every operation on element rearranges the tree so that the element is placed at the root position of the tree.
    * ### Splaying an element, is the process of bringing it to the root position by performing suitable rotation operations.

  * ## B-Tree : B-Tree is a self-balanced search tree in which every node contains multiple keys and has more than two children.

    * ### Here, the number of keys in a node and number of children for a node depends on the order of B-Tree. Every B-Tree has an order.

    * ### B-Tree of Order m has the following properties...

    * ### Property #1 - All leaf nodes must be at same level.
    * ### Property #2 - All nodes except root must have at least [m/2]-1 keys and maximum of m-1 keys.
    * ### Property #3 - All non leaf nodes except root (i.e. all internal nodes) must have at least m/2 children.
    * ### Property #4 - If the root node is a non leaf node, then it must have at least 2 children.
    * ### Property #5 - A non leaf node with n-1 keys must have n number of children.
    * ### Property #6 - All the key values in a node must be in Ascending Order.

---
* ## Graphs: A Graph is a non-linear data structure consisting of nodes and edges. The nodes are sometimes also referred to as vertices and the edges are lines or arcs that connect any two nodes in the graph. ... A Graph consists of a finite set of vertices(or nodes) and set of Edges which connect a pair of nodes.
  * ### There are different ways of graph representation
    * ### Adjacency Matrix
    ### Adjacency matrix is a sequential representation.
    ### It is used to represent which nodes are adjacent to each other. i.e. is there any edge connecting nodes to a graph.
    ###  In this representation, we have to construct a nXn matrix A. If there is any edge from a vertex i to vertex j, then the corresponding element of A, ai,j = 1, otherwise ai,j= 0.

    * ### Adjacency List
      ### Adjacency list is a linked representation.
      ### In this representation, for each vertex in the graph, we maintain the list of its neighbors. It means, every vertex of the graph contains list of its adjacent vertices.
      ### We have an array of vertices which is indexed by the vertex number and for each vertex v, the corresponding array element points to a singly linked list of neighbors of v.
    * ### Edge lists
      ### One simple way to represent a graph is just a list, or array, of |E|∣E∣vertical bar, E, vertical bar edges, which we call an edge list. To represent an edge, we just have an array of two vertex numbers, or an array of objects containing the vertex numbers of the vertices that the edges are incident on. If edges have weights, add either a third element to the array or more information to the object, giving the edge's weight.