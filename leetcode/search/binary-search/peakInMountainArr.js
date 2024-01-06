/*
An array arr is a mountain if the following properties hold:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i] 
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
Given a mountain array arr, return the index i such that arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1].

You must solve it in O(log(arr.length)) time complexity.

 

Example 1:

Input: arr = [0,1,0]
Output: 1
Example 2:

Input: arr = [0,2,1,0]
Output: 1
Example 3:

Input: arr = [0,10,5,2]
Output: 1
 

Constraints:

3 <= arr.length <= 105
0 <= arr[i] <= 106
arr is guaranteed to be a mountain array.
*/
function findPeak(arr) {
  let start = 0,
    end = arr.length - 1;
  // in this binary search because we are not moving the end back to mid - 1 so the while condition can only be start is less than end other wise it will run forever.
  while (start < end) {
    let mid = parseInt((start + end) / 2);
    if (arr[mid] < arr[mid + 1]) start = mid + 1;
    // because our peak can either at mid or before so we only move the end up to mid not mid - 1;
    else end = mid;
  }
  return start;
}
const nums = [0, 8, 10, 11, 17, 5, 3, 2];
console.log(findPeak(nums));
