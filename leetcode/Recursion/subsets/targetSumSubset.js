/*
Given a set of non-negative integers and a value sum, the task is to check if there is a subset of the given set whose sum is equal to the given sum. 

Examples: 

Input: set[] = {3, 34, 4, 12, 5, 2}, sum = 9
Output: True
Explanation: There is a subset (4, 5) with sum 9.

Input: set[] = {3, 34, 4, 12, 5, 2}, sum = 30
Output: False
Explanation: There is no subset that add up to 30.
*/

function find(arr, target, index = 0, n = arr.length) {
  if (target === 0) return true;
  if (index === n || target < 0) return false;

  return (
    find(arr, target, index + 1, n) ||
    find(arr, target - arr[index], index + 1, n)
  );
}

console.log(find([5, 6, 5, 4], 12));
