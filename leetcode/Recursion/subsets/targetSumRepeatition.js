/*
Given a set of m distinct positive integers and a value ‘N’. The problem is to count the total number of ways we can form ‘N’ by doing sum of the array subsets. Repetitions is allowed but rearrangements of elements is not allowed.

Examples : 

Input: arr = {1, 5, 6}, N = 7
Output: 3
Explanation: The different ways are:
1+1+1+1+1+1+1
1+1+5
1+6

Input: arr = {12, 3, 1, 9}, N = 14
Output: 8
*/

function subSumRepeating(arr, sum, index = 0, n = arr.length) {
  if (sum === 0) return 1;
  if (index === n || sum < 0) return 0;

  return (
    subSumRepeating(arr, sum, index + 1, n) +
    subSumRepeating(arr, sum - arr[index], index, n)
  );
}
let arr = [1, 5, 6],
  sum = 7;

console.log(subSumRepeating(arr, sum));
