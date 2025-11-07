/*
Preorder Traversal and BST
Difficulty: MediumAccuracy: 36.84%Submissions: 41K+Points: 4Average Time: 20m
Given an array arr[ ] of size N consisting of distinct integers, write a program that returns 1 if given array can represent preorder traversal of a possible BST, else returns 0.

Example 1:

Input:
N = 3
arr = {2, 4, 3}
Output: 1
Explaination: Given arr[] can represent
preorder traversal of following BST:
               2
                \
                 4
                /
               3
Example 2:

Input:
N = 3
Arr = {2, 4, 1}
Output: 0
Explaination: Given arr[] cannot represent
preorder traversal of a BST.
Your Task:
You don't need to read input or print anything. Your task is to complete the function canRepresentBST() which takes the array arr[] and its size N as input parameters and returns 1 if given array can represent preorder traversal of a BST, else returns 0.

Expected Time Complexity: O(N)
Expected Auxiliary Space: O(N)

Constraints:
1 ≤ N ≤ 105

0 ≤ arr[i] ≤ 105
*/

// User function Template for javascript

/**
 * @param {number[]} arr
 * @param {number} N
 * @return {number}
 */
class Solution {
  canRepresentBST(arr, N) {
    let index = 0;
    function BST(lower, upper) {
      if (index === N || arr[index] < lower || arr[index] > upper) return;

      let value = arr[index++];
      BST(lower, value);
      BST(value, upper);
    }

    BST(-Infinity, Infinity);
    return index === N ? 1 : 0;
  }
}

class Solution {
  canRepresentBST(arr, N) {
    let index = 0;

    function BST(lower, upper) {
      // If all elements are used → done
      if (index === N) return;

      // If current element is out of valid BST range → stop
      if (arr[index] < lower || arr[index] > upper) return;

      // Take current value and build subtree
      let val = arr[index++];

      // Left subtree → values must be < val
      BST(lower, val);

      // Right subtree → values must be > val
      BST(val, upper);
    }

    // Start with full range
    BST(-Infinity, Infinity);

    // If we consumed all elements → valid preorder
    return index === N ? 1 : 0;
  }
}

class SolutionWithSingleStack {
  canRepresentBST(arr, N) {
    // Initialize an empty stack to keep track of nodes
    let stack = [];
    // Initialize root to negative infinity to represent the current lower bound for the right subtree
    let root = -Infinity;

    // Iterate through each element in the preorder array
    for (let i = 0; i < N; i++) {
      // If the current element is less than the current root, it violates BST property
      if (arr[i] < root) {
        return 0; // Return 0 immediately as it cannot be a valid preorder traversal
      }

      // While the stack is not empty and the current element is greater than the top of the stack
      while (stack.length > 0 && arr[i] > stack[stack.length - 1]) {
        // Pop the top element from the stack and set root to that value
        // This sets the lower bound for the right subtree
        root = stack.pop();
      }

      // Push the current element onto the stack
      // This element will be considered as the root for the left subtree in subsequent iterations
      stack.push(arr[i]);
    }

    // If we successfully process all elements without violations, return 1
    return 1;
  }
}

class SolutionWithTwoStacks {
  canRepresentBST(arr, N) {
    let index = 0; // To traverse the preorder array
    // Initialize two stacks one for lower and one for upper bound
    let lowerStack = [];
    let upperStack = [];

    // Push the initial bounds: lower = -Infinity, upper = Infinity
    lowerStack.push(-Infinity);
    upperStack.push(Infinity);

    // Process until the stacks are empty or all elements of the preorder array are processed
    while (lowerStack.length > 0 && index < N) {
      // Pop the current lower and upper bounds
      let lower = lowerStack.pop();
      let upper = upperStack.pop();

      // Get the current element
      let current = arr[index++]; // index++ increases the index by one after it's been used here

      // Check if the current element is within the bounds
      if (current < lower || current > upper) {
        return 0;
      }

      // For left subtree: lower bound = lower, and upper bound = current
      lowerStack.push(lower);
      upperStack.push(current);

      // For right subtree: lower bound = current, and upper bound = upper
      lowerStack.push(current);
      upperStack.push(upper);
    }
    return index === N ? 1 : 0;
  }
}
