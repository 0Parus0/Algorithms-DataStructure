/*
Vertical Tree Traversal
Difficulty: MediumAccuracy: 32.87%Submissions: 212K+Points: 4Average Time: 45m
Given a root of a Binary Tree, find the vertical traversal of it starting from the leftmost level to the rightmost level.
If there are multiple nodes passing through a vertical line, then they should be printed as they appear in level order traversal of the tree.

Examples:

Input: root[] = [1, 2, 3, 4, 5, 6, 7, N, N, N, N, N, 8, N, 9]
     Vertical-Taversal-          
Output: [[4], [2], [1, 5, 6], [3, 8], [7], [9]]
Explanation: The below image shows the horizontal distances used to print vertical traversal starting from the leftmost level to the rightmost level.
     
Input: root[] = [1, 2, 3, 4, 5, N, 6]
     
Output: [[4], [2], [1, 5], [3], [6]]
Explanation: From left to right the vertical order will be [[4], [2], [1, 5], [3], [6]]
Constraints:
1 <= number of nodes <= 105
1 <= node->data <= 105
*/
class SolutionWithTwoArrays {
  verticalOrder(root) {
    // your code here
    if (!root) return [];

    // Arrays to store vertical levels
    const leftArr = []; // for negative horizontal distances
    const rightArr = []; // for zero and positive horizontal distances

    // BFS queue -> each element: { node, hd }
    const queue = [{ node: root, hd: 0 }];

    while (queue.length > 0) {
      const { node, hd } = queue.shift();

      if (hd < 0) {
        // Negative horizontal distance -> goes to leftArr
        const index = Math.abs(hd) - 1;
        if (!leftArr[index]) leftArr[index] = [];
        leftArr[index].push(node.data);
      } else {
        // Non-negative horizontal distance -> goes to rightArr
        if (!rightArr[hd]) rightArr[hd] = [];
        rightArr[hd].push(node.data);
      }

      // Add children to queue with updated hd
      if (node.left) queue.push({ node: node.left, hd: hd - 1 });
      if (node.right) queue.push({ node: node.right, hd: hd + 1 });
    }

    // Build final result:
    // Reverse leftArr (so that -3, -2, -1 appear before 0)
    const result = [...leftArr.reverse(), ...rightArr];
    return result;
  }
}

// With map
class SolutionWithMap {
  verticalOrder(root) {
    // your code here
    if (!root) return [];

    const map = new Map();
    const queue = [{ node: root, hd: 0 }];
    let minHd = 0,
      maxHd = 0;

    while (queue.length > 0) {
      const { node, hd } = queue.shift();

      if (!map.has(hd)) map.set(hd, []);
      map.get(hd).push(node.data);

      minHd = Math.min(minHd, hd);
      maxHd = Math.max(maxHd, hd);

      if (node.left) queue.push({ node: node.left, hd: hd - 1 });
      if (node.right) queue.push({ node: node.right, hd: hd + 1 });
    }

    const result = [];
    for (let hd = minHd; hd <= maxHd; hd++) {
      result.push(map.get(hd));
    }

    return result;
  }
}

class SolutionWithoutMap {
  verticalOrderTraversal(root) {
    if (!root) return [];

    // First, find the HD range
    let minHd = 0,
      maxHd = 0;

    function findRange(node, hd) {
      if (!node) return;
      minHd = Math.min(minHd, hd);
      maxHd = Math.max(maxHd, hd);
      findRange(node.left, hd - 1);
      findRange(node.right, hd + 1);
    }

    findRange(root, 0);
    const totalWidth = maxHd - minHd + 1;
    const resultArray = new Array(totalWidth);

    // Initialize all elements as empty arrays
    for (let i = 0; i < totalWidth; i++) {
      resultArray[i] = [];
    }

    // BFS traversal
    const queue = [{ node: root, hd: 0 }];

    while (queue.length > 0) {
      const { node, hd } = queue.shift();

      // Calculate index in resultArray (shift by minHd)
      const index = hd - minHd;
      resultArray[index].push(node.data);

      if (node.left) queue.push({ node: node.left, hd: hd - 1 });
      if (node.right) queue.push({ node: node.right, hd: hd + 1 });
    }

    return resultArray;
  }
}
