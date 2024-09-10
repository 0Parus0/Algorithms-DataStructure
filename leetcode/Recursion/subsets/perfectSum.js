/*Given an array arr[] of integers and an integer K, the task is to print all subsets of the given array with the sum equal to the given target K.
Examples: 
 

Input: arr[] = {5, 10, 12, 13, 15, 18}, K = 30
Output: {12, 18}, {5, 12, 13}, {5, 10, 15}
Explanation: 
Subsets with sum 30 are:
12 + 18 = 30
5 + 12 + 13 = 30
5 + 10 + 15 = 30

Input: arr[] = {1, 2, 3, 4}, K = 5
Output: {2, 3}, {1, 4}
*/
/* When the input array doesn't include the 0 */

function perfectSum1(arr, sum, index = 0, n = arr.length) {
  if (sum === 0) return true;
  if (sum < 0 || index === n) return false;

  return (
    perfectSum(arr, sum, index + 1, n) +
    perfectSum(arr, sum - arr[index], index + 1, n)
  );
}

/* When input array includes 0 */

function perfectSum(arr, sum, index = 0, n = arr.length) {
  if (index === n) return sum === 0;

  return (
    perfectSum(arr, sum, index + 1, n) +
    perfectSum(arr, sum - arr[index], index + 1, n)
  );
}
let arr = [1, 0],
  sum = 1;
console.log(perfectSum(arr, sum));
