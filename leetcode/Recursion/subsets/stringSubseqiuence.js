/*
Given two strings S1 and S2, Count no. of all subsequences of string S1 that are equal to string S2.

Since answer can be huge return answer modulo 1e9+7.

Example 1:

Input: 
S1 = geeksforgeeks
S2 = gks
Output: 4
Explaination: We can pick characters from S1 as a subsequence from indices {0,3,4}, {0,3,12}, {0,11,12} and {8,11,12}.So total 4 subsequences of S1 that are equal to S2.

Your Task:
You don't need to read input or print anything. Your task is to complete the function countWays() which takes the string S1 and S2 as input parameters and returns the number of desired subsequences.


Expected Time Complexity: O(n*m)        [n and m are length of the strings]
Expected Auxiliary Space: O(n*m)


Constraints:
1 ≤ n, m ≤ 500

*/

/*
function subsets(nums, depth = 0, subset = [], results = []) {
  if (depth === nums.length) {
    results.push([...subset]);
  } else {
    // excluding
    subsets(nums, depth + 1, subset, results);
    subset.push(nums[depth]);
    // including
    subsets(nums, depth + 1, subset, results);
    subset.pop();
  }
  return results;
}
*/

function strSubSequences(str, index = 0, subStr = [], result = []) {
  if (index === str.length) {
    result.push([...subStr]);
  } else {
    strSubSequences(str, index + 1, subStr, result);
    subStr.push(str[index]);
    strSubSequences(str, index + 1, subStr, result);
    subStr.pop();
  }
  return result;
}
console.log(strSubSequences("abc"));
