/*
Generating all possible Subsequences using Recursion including the empty one.
Read
Courses
Practice
Given an array. The task is to generate and print all of the possible subsequences of the given array using recursion.

Examples: 

Input : [1, 2, 3]
Output : [3], [2], [2, 3], [1], [1, 3], [1, 2], [1, 2, 3], []

Input : [1, 2]
Output : [2], [1], [1, 2], []
 
Approach: For every element in the array, there are two choices, either to include it in the subsequence or not include it. Apply this for every element in the array starting from index 0 until we reach the last index. Print the subsequence once the last index is reached. 

Below diagram shows the recursion tree for array, arr[] = {1, 2}.  
*/
/*Given an integer array nums of unique elements, return all possible 
subsets
 (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

 

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
All the numbers of nums are unique.
*/

/* Time Complexity
 * In a complete binary tree there are (2^N) leaf nodes
 *  (2 * (2^N) - 1) total nodes
 * Time complexity of this algorithm is => (2 * (2^N) -1) + (N * (2^N)) => O(N*2^N);
 */
/* Recursive back tracking solution */
function subsets(nums, depth = 0, subset = [], results = []) {
  if (depth === nums.length) {
    results.push([...subset]);
  } else {
    // excluding
    subsets(nums, depth + 1, subset, results);
    // including
    subset.push(nums[depth]);
    subsets(nums, depth + 1, subset, results);
    subset.pop();
  }
  return results;
}
// console.log(subsets([1, 2, 3]));

/* Recursion with out back tracking */
// function subsets(nums, depth = 0, subset = [], results = []) {
//   if (depth === nums.length) {
//     results.push(subset);
//   } else {
//     // excluding
//     subsets(nums, depth + 1, subset, results);
//     // including
//     subsets(nums, depth + 1, [...subset, nums[depth]], results);
//   }
//   return results;
// }

/* Using bit masking */
/* Time Complexity
 * O(N * 2^N)
 * Space Complexity
 * O(N * 2^N)
 */
// function subsets(nums) {
//   // figuring out how many subsets there are going to be that is 2^n
//   const subsetCount = Math.pow(2, nums.length);
//   const results = [];
//   // generating total number of subsets
//   for (let i = 0; i < subsetCount; i++) {
//     // turing the numbers into binary strings
//     let binaryString = i.toString(2);
//     // this will throw all trailing zeros but we need them
//     binaryString = binaryString.padStart(nums.length, "0");
//     // console.log(binaryString);
//     const subset = [];
//     for (let j = 0; j < binaryString.length; j++) {
//       if (binaryString[j] === "1") {
//         subset.push(nums[j]);
//       }
//     }
//     results.push(subset);
//   }
//   return results;
// }

// console.log(subsets([1, 2, 3]));

// function subsequence(arr) {
//   let result = [];
//   let temp = [];
//   index = 0;
//   function helper(arr, index, temp) {
//     // console.log(temp, index);
//     if (index === arr.length) {
//       // if no empty  subsets/subsequences are included
//       // if (temp.length > 0) result.push(temp);

//       // if empty subsets/subsequences are included
//       result.push(temp);
//       return;
//     }
//     // recursive call to include the arr[i]
//     helper(arr, index + 1, [...temp, arr[index]]);

//     // recursive call to not include the arr[i]
//     helper(arr, index + 1, temp);
//   }
//   helper(arr, index, temp);
//   return result;
// }

// console.log(subsequence([1, 2, 3]));

// function printSubsequences(arr, index = 0, path = [], result = []) {
//   // Print the subsequence when reach
//   // the leaf of recursion tree
//   if (index == arr.length) {
//     // Condition to avoid printing
//     // empty subsequence
//     if (path.length > 0) result.push(`[${path}]`);
//   } else {
//     // Subsequence without including
//     // the element at current index
//     result = result.concat(printSubsequences(arr, index + 1, path));

//     path.push(arr[index]);

//     // Subsequence including the element
//     // at current index
//     result = result.concat(printSubsequences(arr, index + 1, path));

//     // Backtrack to remove the recently
//     // inserted element
//     path.pop();
//   }
//   return result;
// }

// var subsets = function (nums) {
//   let res = []; // the final arr, which we will display
//   let auxArr = [],
//     i = 0; // global vars

//   function recur(nums, i, auxArr) {
//     if (i == nums.length) {
//       res.push(auxArr);
//       return;
//     } //operation of recursion will be upto i=n-1
//     // when it will hit, i==n, it will store the computed arr, in the final arr, and break(return)

//     // take it
//     recur(nums, i + 1, [...auxArr, nums[i]]); //or, we can use 'aux.concat(nums[i])'

//     // dont take
//     recur(nums, i + 1, auxArr);
//   }

//   recur(nums, i, auxArr); // passing the global variable declared already
//   return res; // rerturn the final 2d arr
// };

// console.log(subsets([1, 2, 3]));

function subseq(arr, index = 0, n = arr.length, ans = [], temp = []) {
  if (index === n) {
    ans.push([...temp]);
    return;
  } 
    subseq(arr, index + 1, n, ans, temp);
    temp.push(arr[index]);
    subseq(arr, index + 1, n, ans, temp);
    temp.pop();
  
 return ans;
}


console.log(subseq([1, 2, 3]));
