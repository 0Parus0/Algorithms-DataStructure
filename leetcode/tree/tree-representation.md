Tree Representation from an Array

This document explains a common way to represent a binary tree using a simple array. This method is often used for binary heaps and other data structures.
Understanding the Representation

The tree is represented as an array in a level order traversal (also known as Breadth-First Search or BFS order).

For a node at a given index i:

    The left child can be found at index 2*i + 1.

    The right child can be found at index 2*i + 2.

    A value of N or null indicates that no node exists at that position.

Here is an example of an array representation:

root = [8, 3, 10, 1, 6, N, 14, N, N, 4, 7, 13]
Step 1: Starting with the Root

The very first element of the array is always the root node of the tree.

In our example, Index 0 = 8, so the root node of the tree is 8.

Visual representation:
root = [8, 3, 10, 1, 6, N, 14, N, N, 4, 7, 13]

      8

Step 2: Children of the Root

To find the children of the root node 8 at Index 0, we apply the formula:

    Its left child is at 2*0 + 1 = Index 1, which is 3.

    Its right child is at 2*0 + 2 = Index 2, which is 10.

Visual representation:
root = [8, 3, 10, 1, 6, N, 14, N, N, 4, 7, 13]

<!--
      8
   /     \
  3      10

  -->

Step 3: Children of 3

Next, we find the children of the node 3, which is at Index 1:

    Its left child is at 2*1 + 1 = Index 3, which is 1.

    Its right child is at 2*1 + 2 = Index 4, which is 6.

Visual representation:
root = [8, 3, 10, 1, 6, N, 14, N, N, 4, 7, 13]

<!--
      8
     / \
    3   10
   / \
  1   6

   -->

Step 4: Children of 10

Now, we look at node 10, which is at Index 2:

    Its left child is at 2*2 + 1 = Index 5, which is N (null).

    Its right child is at 2*2 + 2 = Index 6, which is 14.

Visual representation:
root = [8, 3, 10, 1, 6, N, 14, N, N, 4, 7, 13]

<!--
      8
     / \
    3   10
   / \  / \
  1   6 N  14

  -->

Step 5: Children of 1 and 6

For node 1 at Index 3:

    Its left child is at 2*3 + 1 = Index 7, which is N.

    Its right child is at 2*3 + 2 = Index 8, which is N.

For node 6 at Index 4:

    Its left child is at 2*4 + 1 = Index 9, which is 4.

    Its right child is at 2*4 + 2 = Index 10, which is 7.

Visual representation:
root = [8, 3, 10, 1, 6, N, 14, N, N, 4, 7, 13]

<!--
      8
     / \
    3   10
   / \  / \
  1   6 N  14
 / \ / \
N  N 4  7
-->

Step 6: Children of 14

Now, for node 14 at Index 6:

    Its left child is at 2*6 + 1 = Index 13, which is 13.

    Its right child is at 2*6 + 2 = Index 14, which is N.

Visual representation:
root = [8, 3, 10, 1, 6, N, 14, N, N, 4, 7, 13]

<!--
      8
     / \
    3   10
   / \  / \
  1   6 N  14
 / \ / \   / \
N  N 4  7 13  N

 -->

Step 7: Children of 4, 7, and 13

Finally, we look at the last remaining nodes with children in the array:

For node 4 at Index 9, its children would be at Index 19 and Index 20, which are both outside the array's bounds. Therefore, it has no children.

For node 7 at Index 10, its children would be at Index 21 and Index 22, both outside the array. It has no children.

For node 13 at Index 11, its children would be at Index 23 and Index 24, both outside the array. It has no children.

This completes the tree's construction from the provided array.
