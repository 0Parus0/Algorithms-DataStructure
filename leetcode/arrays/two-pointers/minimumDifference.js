/*
Find Minimum Difference
You are given two sorted arrays arr1 and arr2. Your task is to find the pair of numbers (one from each array) whose absolute difference is the smallest and return that difference.

Example:

plaintext
Copy code
Input: 
arr1 = [1, 2, 11, 15]
arr2 = [4, 12, 19, 23, 127, 235]

Output: 
1

Explanation:
The pair (11, 12) has the smallest difference of 1.
*/

function pairDiff(arr1, arr2) {
  let n = arr1.length;
  let m = arr2.length;
  let first = 0;
  let second = m - 1;
  let diff = Infinity;

  arr1.sort((a , b) => a - b);
  arr2.sort((a , b) => a - b);
  while (first < n && second < m) {
    let newDiff = Math.abs(arr2[first] - arr1[second]);
    if(newDiff < diff) {
        diff = newDiff;
    }
    if(arr1[first] < arr2[second] ){
         first++;
        } else {
          second++;
        }
  }
  return diff;
}
console.log(pairDiff([-10, -5, 0, 5, 20], [4, 10, 12, 19, 23]));