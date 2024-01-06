/*
Count frequencies of all elements in array in O(1) extra space and O(n) time
Read
Courses
Practice
Given an unsorted array of n integers that can contain integers from 1 to n. Some elements can be repeated multiple times and some other elements can be absent from the array. Count the frequency of all elements that are present and print the missing elements.

Examples: 

Input: arr[] = {2, 3, 3, 2, 5}
Output: Below are frequencies of all elements
        1 -> 0
        2 -> 2
        3 -> 2
        4 -> 0
        5 -> 1
Explanation: Frequency of elements 1 is 
0, 2 is 2, 3 is 2, 4 is 0 and 5 is 1.
 
Input: arr[] = {4, 4, 4, 4}
Output: Below are frequencies of all elements
        1 -> 0
        2 -> 0
        3 -> 0
        4 -> 4
Explanation: Frequency of elements 1 is 
0, 2 is 0, 3 is 0 and 4 is 4.
Recommended Problem
Frequencies of Limited Range Array Elements
Arrays
Hash
+1 more
Paytm
VMWare
+3 more
Solve Problem
Submission count: 2.3L
Simple Solution 

Approach: Create an extra space of size n, as elements of the array is in the range 1 to n. Use the extra space as HashMap. Traverse the array and update the count of the current element. Finally, print the frequencies of the HashMap along with the indices.
Algorithm: 
Create an extra space of size n (hm), use it as a HashMap.
Traverse the array from start to end.
For every element update hm[array[i]-1], i.e. hm[array[i]-1]++
Run a loop from 0 to n and print hm[array[i]-1] along with the index i
Implementation:
*/

function findOccurrences(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    arr[i]--;
  }
  // increase every element with n

  for (let i = 0; i < n; i++) {
    arr[arr[i] % n] += n;
  }

  // count frequencies of numbers
  for (let i = 0; i < n; i++) {
    arr[i] = parseInt(arr[i] / n);
  }
  console.log(arr);
}
let arr = [3, 2, 5, 3, 1, 2, 3, 7];
console.log(findOccurrences(arr));
