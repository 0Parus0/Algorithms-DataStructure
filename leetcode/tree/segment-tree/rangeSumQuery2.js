/*
Sum of Query II
Difficulty: MediumAccuracy: 60.63%Submissions: 19K+Points: 4Average Time: 10m
You are given an array arr[] of n integers and q queries in an array queries[] of length 2*q containing l, r pair for all q queries. You need to compute the following sum over q queries.

 

Note : Array is 1-Indexed.

Examples :

Input: n = 4, arr = {1, 2, 3, 4}, q = 2, queries = {1, 4, 2, 3}
Output: 10 5
Explaination: In the first query we need sum from 1 to 4 which is 1+2+3+4 = 10. In the second query we need sum from 2 to 3 which is 2 + 3 = 5.
Input: n = 5, arr = {26, 30, 48, 29, 8}, q = 2, queries = {4, 4, 2, 3}
Output: 29 78
Explaination: In the first query we need sum from 4 to 4 which is 29. In the second query we need sum from 2 to 3 which is 30 + 48 = 78.
Your Task:
You don't need to read input or print anything. Your task is to complete the function querySum() which takes n, arr, q and queries as input parameters and returns the answer for all the queries.

Expected Time Complexity: O(n+q)
Expected Auxiliary Space: O(n)

Constraints:
1 ≤ n, q ≤ 105
1 ≤ arri ≤ 103
1 ≤ l ≤ r ≤ n
*/

class Solution {
  querySum(n, arr, q, queries) {
    // Build segment tree
    const tree = new Array(4 * n).fill(0);

    // Helper function to build segment tree
    const build = (idx, start, end) => {
      if (start === end) {
        tree[idx] = arr[start];
        return;
      }

      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * idx + 1;
      const rightChild = 2 * idx + 2;

      build(leftChild, start, mid);
      build(rightChild, mid + 1, end);

      tree[idx] = tree[leftChild] + tree[rightChild];
    };

    // Query
    const query = (idx, start, end, l, r) => {
      // Case 1: Completely outside range
      if (r < start || l > end) {
        return 0;
      }

      // Case 2: Completely inside range
      if (l <= start && r >= end) {
        return tree[idx];
      }

      // Case 3: Partially inside
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * idx + 1;
      const rightChild = 2 * idx + 2;

      const leftSum = query(leftChild, start, mid, l, r);
      const rightSum = query(rightChild, mid + 1, end, l, r);

      return leftSum + rightSum;
    };

    // Build segment tree
    build(0, 0, n - 1);

    // Process queries
    const result = [];
    for (let i = 0; i < 2 * q; i += 2) {
      const l = queries[i] - 1;
      const r = queries[i + 1] - 1;
      result.push(query(0, 0, n - 1, l, r));
    }

    return result;
  }
}

class Solution {
  querySum(n, arr, q, queries) {
    // Create prefix sum array
    const prefix = new Array(n + 1).fill(0);

    // Build prefix sums
    for (let i = 0; i < n; i++) {
      prefix[i + 1] = prefix[i] + arr[i];
    }

    // Process queries
    const result = [];
    for (let i = 0; i < q * 2; i += 2) {
      const l = queries[i] - 1;
      const r = queries[i + 1] - 1;

      // Sum[l, r] = prefix[r + 1] - prefix[l];
      const sum = prefix[r + 1] - prefix[l];
      result.push(sum);
    }

    return result;
  }
}
