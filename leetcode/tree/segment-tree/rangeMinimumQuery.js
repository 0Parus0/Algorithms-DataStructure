/*
Range Minimum Query
Difficulty: MediumAccuracy: 57.18%Submissions: 10K+Points: 4
Given an array A[ ] and its size N your task is to complete two functions  a constructST  function which builds the segment tree  and a function RMQ which finds range minimum query in a range [a,b] of the given array.

Input:
The task is to complete two functions constructST and RMQ.
The constructST function builds the segment tree and takes two arguments the array A[ ] and the size of the array N.
It returns a pointer to the first element of the segment tree array.
The RMQ function takes 4 arguments the first being the segment tree st constructed, second being the size N and then third and forth arguments are the range of query a and b. The function RMQ returns the min of the elements in the array from index range a and b. There are multiple test cases. For each test case, this method will be called individually.

Output:
The function RMQ should return the min element in the array from range a to b.

Example:

Input (To be used only for expected output) 
1
4
1 2 3 4
2
0 2 2 3
Output
1 3
Explanation
1. For query 1 ie 0 2 the element in this range are 1 2 3 
   and the min element is 1. 
2. For query 2 ie 2 3 the element in this range are 3 4 
   and the min element is 3.
Constraints:
1<=T<=100
1<=N<=10^3+1

1<=A[i]<=10^9
1<=Q(no of queries)<=10000
0<=a<=b
*/

//{  some line which needs removal of quotes };

function constructST(arr, n) {
  const st = new Array(4 * n).fill(0);

  const build = (idx, start, end) => {
    if (start === end) {
      st[idx] = arr[start];
      return;
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * idx + 1;
    const rightChild = 2 * idx + 2;

    build(leftChild, start, mid);
    build(rightChild, mid + 1, end);

    st[idx] = Math.min(st[leftChild], st[rightChild]);
  };
  build(0, 0, n - 1);

  return st;
}

function RMQ(st, n, a, b) {
  const query = (idx, start, end, l, r) => {
    // Case 1: Outside the range
    if (r < start || l > end) {
      return Infinity;
    }

    // Case 2: Inside the range
    if (l <= start && r >= end) {
      return st[idx];
    }

    // Case 3: Partial overlap
    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * idx + 1;
    const rightChild = 2 * idx + 2;

    const leftMin = query(leftChild, start, mid, l, r);
    const rightMin = query(rightChild, mid + 1, end, l, r);

    return Math.min(leftMin, rightMin);
  };
  return query(0, 0, n - 1, a, b);
}
