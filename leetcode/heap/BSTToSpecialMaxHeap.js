/*
BST to max heap
Difficulty: MediumAccuracy: 67.16%Submissions: 26K+Points: 4
Given a Binary Search Tree. Convert a given BST into a Special Max Heap with the condition that all the values in the left subtree of a node should be less than all the values in the right subtree of the node. This condition is applied on all the nodes in the so converted Max Heap.

Example 1:

Input :
                 4
               /   \
              2     6
            /  \   /  \
           1   3  5    7  

Output : 1 2 3 4 5 6 7 
Exaplanation :
               7
             /   \
            3     6
          /   \  /   \
         1    2 4     5
The given BST has been transformed into a
Max Heap and it's postorder traversal is
1 2 3 4 5 6 7.

Your task :
You don't need to read input or print anything. Your task is to complete the function convertToMaxHeapUtil() which takes the root of the tree as input and converts the BST to max heap.
Note : The driver code prints the postorder traversal of the converted BST.
 
Expected Time Complexity : O(n)
Expected Auxiliary Space : O(n)
 
Constraints :
1 ≤ n ≤ 105
*/
function bstToHeap(root) {
  function convertToMaxHeapUtil(root) {
    let arr = [];

    // Inorder traversal to get sorted array
    function inorder(node) {
      if (!node) return;
      inorder(node.left);
      arr.push(node.data);
      inorder(node.right);
    }
    inorder(root);

    let index = 0;
    // Postorder traversal to assign values
    function postorder(node) {
      if (!node) return;
      postorder(node.left);
      postorder(node.right);
      node.data = arr[index++];
    }
    postorder(root);
  }
  return convertToMaxHeapUtil(root);
}

function convertToMaxHeapUtil(root) {
  let arr = [];
  let stack = [];
  let curr = root;

  // Iterative inorder traversal
  while (curr || stack.length) {
    while (curr) {
      stack.push(curr);
      curr = curr.left;
    }
    curr = stack.pop();
    arr.push(curr.data);
    curr = curr.right;
  }

  // Iterative postorder traversal for assignment
  let index = 0;
  stack = [];
  curr = root;
  let lastVisited = null;

  while (curr || stack.length) {
    if (curr) {
      stack.push(curr);
      curr = curr.left;
    } else {
      let peekNode = stack[stack.length - 1];
      if (peekNode.right && lastVisited !== peekNode.right) {
        curr = peekNode.right;
      } else {
        peekNode.data = arr[index++];
        lastVisited = stack.pop();
      }
    }
  }
}
