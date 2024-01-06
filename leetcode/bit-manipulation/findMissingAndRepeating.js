/*
Find the missing and repeating number
Read
Courses
Practice
Given an unsorted array of size n. Array elements are in the range of 1 to n. One number from set {1, 2, …n} is missing and one number occurs twice in the array. Find these two numbers.

Examples: 

Input: arr[] = {3, 1, 3}
Output: Missing = 2, Repeating = 3
Explanation: In the array, 2 is missing and 3 occurs twice 

Input: arr[] = {4, 3, 6, 2, 1, 1}
Output: Missing = 5, Repeating = 1


Recommended Problem
Find Missing And Repeating
Arrays
Data Structures
Amazon
Samsung
+3 more
Solve Problem
Submission count: 3.6L
Below are various methods to solve the problems: 

Method 1 (Use count array)
Approach: 

Create a temp array temp[] of size n with all initial values as 0.
Traverse the input array arr[], and do the following for each arr[i] 
if(temp[arr[i]-1] == 0), set temp[arr[i]-1] = 1;
if(temp[arr[i]-1] == 1) output “arr[i]” //repeating number
Traverse temp[] and output ‘i+1’ corresponding to the element of array temp[] having value as 0. (This is the missing number)
Note that, we use ‘arr[i]-1’ as the corresponding element to the ‘arr[i]’ in temp[] array, as indexing in an array starts from 0 to n-1 and the input array arr[] has numbers from 1 to n.
*/
function findDuplicateAndMissing(arr) {
  let n = arr.length,
    missing,
    duplicate;
  // decrease all the values by 1 to make it simple for using 0 based array
  for (let i = 0; i < n; i++) {
    arr[i] = arr[i] - 1;
  }
  //  now add the n which is 7 to every element of the array the number of times it occurred in array
  for (let i = 0; i < n; i++) {
    arr[arr[i] % n] += n;
  }

  // find missing
  for (let i = 0; i < n; i++) {
    if (parseInt(arr[i] / n) === 0) {
      missing = i + 1;
      break;
    }
  }
  // find duplicate
  for (let i = 0; i < n; i++) {
    if (parseInt(arr[i] / n) === 2) duplicate = i + 1;
  }

  /* Using Auxiliary space */
  //   let n = arr.length;
  //   let count = Array.from({ length: n }, (el) => (el = 0));
  //   let missing, duplicate;
  //   for (let i = 0; i < n; i++) {
  //     count[arr[i] - 1]++;
  //   }
  //   console.log(count);
  //   // Find missing
  //   for (let i = 0; i < n; i++) {
  //     if (count[i] === 0) missing = i + 1;
  //   }

  //   // Find duplicate
  //   for (let i = 0; i < n; i++) {
  //     if (count[i] === 2) duplicate = i + 1;
  //   }

  return [missing, duplicate];
}
let arr = [4, 3, 2, 1, 2, 7, 6];
console.log(findDuplicateAndMissing(arr));
