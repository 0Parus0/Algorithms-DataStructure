/*
You are given an array consisting of n integers which denote the position of a stall. You are also given an integer k which denotes the number of aggressive cows. You are given the task of assigning stalls to k cows such that the minimum distance between any two of them is the maximum possible.
The first line of input contains two space-separated integers n and k.
The second line contains n space-separated integers denoting the position of the stalls.

Example 1:

Input:
n=5 
k=3
stalls = [1 2 4 8 9]
Output:
3
Explanation:
The first cow can be placed at stalls[0], 
the second cow can be placed at stalls[2] and 
the third cow can be placed at stalls[3]. 
The minimum distance between cows, in this case, is 3, 
which also is the largest among all possible ways.
Example 2:

Input:
n=5 
k=3
stalls = [10 1 2 7 5]
Output:
4
Explanation:
The first cow can be placed at stalls[0],
the second cow can be placed at stalls[1] and
the third cow can be placed at stalls[4].
The minimum distance between cows, in this case, is 4,
which also is the largest among all possible ways.
Your Task:
Complete the function int solve(), which takes integer n, k, and a vector stalls with n integers as input and returns the largest possible minimum distance between cows.

Expected Time Complexity: O(n*log(10^9)).
Expected Auxiliary Space: O(1).

Constraints:
2 <= n <= 10^5
2 <= k <= n
0 <= stalls[i] <= 10^9

*/
function aggressiveCows(stalls, numCows) {
  if (stalls.length < numCows) return -1;
  stalls = stalls.sort((a, b) => a - b);
  let start = 0,
    ans = -1,
    end = stalls[stalls.length - 1] - stalls[0];

  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    if (possibleSolution(stalls, numCows, mid)) {
      ans = mid;
      start = mid + 1;
    } else end = mid - 1;
  }
  return ans;
}

function possibleSolution(stalls, numCows, mid) {
  let cowCount = 1;
  let lastPosition = stalls[0];
  for (let i = 0; i < stalls.length; i++) {
    if (stalls[i] - lastPosition >= mid) {
      cowCount++;
      if (cowCount === numCows) return true;
      lastPosition = stalls[i];
    }
  }

  return false;
}
let stalls = [10, 1, 2, 7, 5];
let numCows = 3;
console.log(aggressiveCows(stalls, numCows));
