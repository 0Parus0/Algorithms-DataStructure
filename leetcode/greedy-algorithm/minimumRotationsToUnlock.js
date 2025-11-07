/*
Minimum rotations to unlock a circular lock
Difficulty: EasyAccuracy: 46.67%Submissions: 7K+Points: 2Average Time: 7m
Given a lock made up of N different circular rings. Each ring has 0-9 digit printed on it. There is only one particular code which can open the lock. You can rotate each ring any number of times in either direction. Given the random sequence R and the desired sequence D, find the minimum number of rotations required to open the lock. 

 

Example 1:

Input: R = 222, D = 333
Output: 3
Explaination: Optimal number of rotations for 
getting 3 from 2 is 1. There are three 2 to 3 
transformations. So answer is 1+1+1 = 3.
 

Example 2:

Input: R = 2345, D = 5432
Output: 8
Explaination: The optimal shifts for pairs are: 
(2, 5) = 3, (3, 4) = 1, (4,3) = 1, (5,2) = 3. 
So total shifts = 3+1+1+3 = 8.
 

Your Task:
You do not need to read input or print anything. Your task is to complete the function rotationCount() which takes R and D as input parameters and return the minimum number of rotations required to make R = D.

 

Expected Time Complexity: O(logR)
Expected Auxiliary Space: O(1)
*/
function rotationCount(R, D) {
  let total = 0;

  for (let i = 0; i < R.length; i++) {
    const r = Number(R[i]);
    const d = Number(D[i]);
    const diff = Math.abs(r - d);
    total += Math.min(diff, 10 - diff);
  }

  return total;
}

/*
Complexity Analysis

    Time Complexity: O(n) where n is number of digits

    Space Complexity: O(1)
*/

// Example runs
console.log(rotationCount("222", "333")); // 3
console.log(rotationCount("2345", "5432")); // 8
