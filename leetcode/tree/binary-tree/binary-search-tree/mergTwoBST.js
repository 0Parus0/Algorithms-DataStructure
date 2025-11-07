/*
Merge two BST 's
Difficulty: MediumAccuracy: 64.95%Submissions: 99K+Points: 4
You are given the root of two BSTs, you have to merge this two BST and return the in-order traversal of the new BST.

Examples: 

Input: root1 = [3, 1, 5], root2 = [4, 2, 6]

Output: [1, 2, 3, 4, 5, 6]
Explanation: After merging and sorting the two BST we get [1, 2, 3, 4, 5, 6].
Input: root1 = [8, 2, 10, 1, N], root2 = [5, 3, N, 0, N] 

Output: [0, 1, 2, 3, 5, 8, 10]
Explanation: After merging and sorting the two BST we get [0, 1, 2, 3, 5, 8, 10].
Constraints:
1 ≤ number of nodes ≤ 105
0 ≤ node->data ≤ 105
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function inorder(root, arr) {
  if (!root) return;
  inorder(root.left, arr);
  arr.push(root.data);
  inorder(root.right, arr);
}

function mergeArrays(arr1, arr2) {
  let merged = [];
  let i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) merged.push(arr1[i++]);
    else merged.push(arr2[j++]);
  }

  while (i < arr1.length) merged.push(arr1[i++]);
  while (j < arr2.length) merged.push(arr2[j++]);

  return merged;
}

function mergeBST(root1, root2) {
  let arr1 = [],
    arr2 = [];
  inorder(root1, arr1);
  inorder(root2, arr2);

  return mergeArrays(arr1, arr2);
}
/*
✅ Time and Space Complexity
Operation	Complexity
Inorder traversal	O(n + m)
Merge two arrays	O(n + m)
Total	O(n + m)
Space	O(n + m) (for arrays)
*/
