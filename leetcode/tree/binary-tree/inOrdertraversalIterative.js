/*
Iterative Inorder
Given a binary tree. Find the inorder traversal of the tree without using recursion.

Examples

Input:  

Output: 4 2 5 1 3
Explanation:
Inorder traversal (Left->Root->Right) of 
the tree is 4 2 5 1 3.
Input:

Output: 1 7 10 8 6 10 5 6
Explanation:
Inorder traversal (Left->Root->Right) 
of the tree is 1 7 10 8 6 10 5 6.
 

Your task:
You don't need to read input or print anything. Your task is to complete the function inOrder() which takes the root of the tree as input and returns a list containing the inorder traversal of the tree, calculated without using recursion.

Expected time complexity: O(N)
Expected auxiliary space: O(N)


Constraints:
1 <= Number of nodes <= 105
1 <= Data of a node <= 105
*/
function inOrderIterative(root) {
  const ans = [];
  const stack = []; // track the numbers
  const visited = []; // track how many times the number has been visited
  // When the number/node will be visited the 2nd time we will put it in the ans array
  stack.push(root);
  visited.push(0);

  while (stack.length) {
    let temp = stack.pop();
    let flag = visited.pop();

    // Visiting first time
    if (flag === 0) {
      if (temp.right) {
        stack.push(temp.right);
        visited.push(0);
      }
      stack.push(temp);
      visited.push(1);

      if (temp.left) {
        stack.push(temp.left);
        visited.push(0);
      }
    } else {
      // Visiting 2nd time
      ans.push(temp.data);
    }
  }
  return ans;
}
