/*
Given are N boards of with length of each given in the form of array, and K painters, such that each painter takes 1 unit of time to paint 1 unit of the board. The task is to find the minimum time to paint all boards under the constraints that any painter will only paint continuous sections of boards, say board {2, 3, 4} or only board {1} or nothing but not board {2, 4, 5}.

Examples: 

Input: N = 4, A = {10, 10, 10, 10}, K = 2 

Output : 20


Explanation: Here we can divide the boards into 2 equal sized partitions (Painter 1 will paint boards A1 and A2, and Painter 2 will paint boards A3 and A4). So each painter gets 20 units of board and the total time taken is 20. 

Input: N = 4, A = {10, 20, 30, 40}, K = 2 

Output : 60

Explanation: Since there are only 2 painters, therefore divide first 3 boards to painter 1 (A1, A2 and A3) with time = 60, and last board to painter 2 (A4) with time = 40. Therefore total time taken = 60, which is the minimum possible.

Please note the combination A1 and A4 to Painter 1 with time 50, and A2 and A3 to Painter 2 with time 50, will yield a smaller time (50 units). But this cant be considered due to the constraint that a painter cannot paint non-continuos series of boards.

Recommended Practice
The Painter’s Partition Problem-II
Try It!
Naive Approach for Painter’s Problem: 
A brute force solution is to consider all possible sets of contiguous partitions and calculate the maximum sum partition in each case and return the minimum of all these cases. 

Dynamic Programming Approach for Painter’s Problem
The above approach can be further optimised using Dynamic Programming approach.

From the above examples, it is obvious that the strategy of dividing the boards into k equal partitions won’t work for all cases. We can observe that the problem can be broken down into: Given an array A of non-negative integers and a positive integer k, we have to divide A into k of fewer partitions such that the maximum sum of the elements in a partition, overall partitions is minimized. So for the second example above, possible divisions are: 

One partition: so time is 100. 
Two partitions: (10) & (20, 30, 40), so time is 90. Similarly, we can put the first divider 
after 20 (=> time 70) or 30 (=> time 60); so this means the minimum time: (100, 90, 70, 60) is 60.
Optimal Substructure Approach for Painter’s Problem using DP
We can implement the naive solution using recursion with the following optimal substructure property: 

Assuming that we already have k-1 partitions in place (using k-2 dividers), we now have to put the k-1 th divider to get k partitions.
We can put the k-1 th divider between the i th and i+1 th element where i = 1 to n. 
Please note that putting it before the first element is the same as putting it after the last element.
The total cost of this arrangement can be calculated as the maximum of the following: 
The cost of the last partition: sum(Ai…..An), where the k-1 th divider is before element i. 
This can be found out using a simple helper function to calculate sum of elements between two indices in the array.
The maximum cost of any partition already formed to the left of the k-1 th divider. 
We can observe that this is actually to place the k-2 separators as fairly as possible, so it is a subproblem of the given problem.
*/
function paintersPartition(boardsArr, numPainters) {
  if (boardsArr.length < numPainters) return -1;
  let sumBoards = boardsArr.reduce((total, board) => total + board, 0);
  let start = 0,
    end = sumBoards,
    time = -1;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (possibleSolution(boardsArr, numPainters, mid)) {
      time = mid;
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return time;
}

function possibleSolution(boardsArr, numPainters, mid) {
  let painterCount = 1;
  let boardSum = 0;
  for (let i = 0; i < boardsArr.length; i++) {
    if (boardSum + boardsArr[i] <= mid) {
      boardSum += boardsArr[i];
    } else {
      painterCount++;
      if (painterCount > numPainters || boardsArr[i] > mid) return false;
      boardSum = boardsArr[i];
    }
  }
  return true;
}

let boards = [10, 10, 10, 10];
let painters = 5;
console.log(paintersPartition(boards, painters));
