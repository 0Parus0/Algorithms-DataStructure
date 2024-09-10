/*
Add two numbers represented by two arrays
Given two array A[0….n-1] and B[0….m-1] of size n and m respectively, representing two numbers such that every element of arrays represent a digit. For example, A[] = { 1, 2, 3} and B[] = { 2, 1, 4 } represent 123 and 214 respectively. The task is to find the sum of both the number. In above case, answer is 337. 

Examples : 

Input : n = 3, m = 3
        a[] = { 1, 2, 3 }
        b[] = { 2, 1, 4 }
Output : 337
123 + 214 = 337
Input : n = 4, m = 3
        a[] = { 9, 5, 4, 9 }
        b[] = { 2, 1, 4 }
Output : 9763


The idea is to start traversing both the array simultaneously from the end until we reach the 0th index of either of the array. While traversing each elements of array, add element of both the array and carry from the previous sum. Now store the unit digit of the sum and forward carry for the next index sum. While adding 0th index element if the carry left, then append it to beginning of the number. 

Below is the illustration of approach: 
*/
function sumTwoArr(arr1, arr2) {
  let n = arr1.length,
    m = arr2.length;
  let carry = 0,
    i = n - 1,
    j = m - 1;
  let result = [];
  while (i >= 0 && j >= 0) {
    let val1 = arr1[i],
      val2 = arr2[j];
    let sum = val1 + val2 + carry;
    carry = parseInt(sum / 10);
    sum = sum % 10;
    result.unshift(sum);
    j--, i--;
  }
  while (i >= 0) {
    let sum = arr1[i] + carry;
    carry = parseInt(sum / 10);
    sum = sum % 10;
    result.unshift(sum);
    i--;
  }
  while (j >= 0) {
    let sum = arr2[j] + carry;
    carry = parseInt(sum / 10);
    sum = sum % 10;
    result.unshift(sum);
    j--;
  }
  while (carry !== 0) {
    let sum = carry;
    carry = parseInt(sum / 10);
    sum = sum % 10;
    result.unshift(sum);
  }
  return result;
}
let arr1 = [9, 8, 9, 9, 0],
  arr2 = [9, 9, 9];
console.log(sumTwoArr(arr1, arr2));


/*
The array-form of an integer num is an array representing its digits in left to right order.

For example, for num = 1321, the array form is [1,3,2,1].
Given num, the array-form of an integer, and an integer k, return the array-form of the integer num + k.

 

Example 1:

Input: num = [1,2,0,0], k = 34
Output: [1,2,3,4]
Explanation: 1200 + 34 = 1234
Example 2:

Input: num = [2,7,4], k = 181
Output: [4,5,5]
Explanation: 274 + 181 = 455
Example 3:

Input: num = [2,1,5], k = 806
Output: [1,0,2,1]
Explanation: 215 + 806 = 1021
 

Constraints:

1 <= num.length <= 104
0 <= num[i] <= 9
num does not contain any leading zeros except for the zero itself.
1 <= k <= 104
*/