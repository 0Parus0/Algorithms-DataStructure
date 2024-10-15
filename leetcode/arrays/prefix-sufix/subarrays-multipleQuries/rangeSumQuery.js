/*
Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).
 

Example 1:

Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]

Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3
 

Constraints:

1 <= nums.length <= 104
-105 <= nums[i] <= 105
0 <= left <= right < nums.length
At most 104 calls will be made to sumRange.
*/
/* Brute Force Solution */
function rangeSumQueries(array, queries) {
  // To store the results of each query
  let result = [];

  // Loop through each query
  for (let query of queries) {
    let [i, j] = query; // Destructure the start and end indices
    let sum = 0;

    // Calculate the sum of elements from index i to j (inclusive)
    for (let k = i; k <= j; k++) {
      sum += array[k];
    }

    // Push the result for the current query
    result.push(sum);
  }

  return result;
}

// Example Usage
let array = [3, 2, 7, 1];
let queries = [
  [1, 3], // Sum from index 1 to 3
  [0, 2], // Sum from index 0 to 2
];

console.log(rangeSumQueries(array, queries));
// Output: [10, 12]

function rangeSumQuery(arr, queries) {
    let n = arr.length;
    let prefixSum = new Array(n).fill(0);

    // Step 1: compute the prefix sum array
    prefixSum[0] = arr[0];
    for(let i = 1; i < n; i++){
        prefixSum[i] = prefixSum[i - 1] + arr[i];

    }

    let result = [];

    // Step 2: Process each query
    for(let [L, R] of queries){
        let sum = prefixSum[R]; // Sum from index 0 to R

        if(L > 0) {
            sum -= prefixSum[L -1]; // Remove the sum before index L

        }
        
        result.push(sum);
    }
    return result;
}

// let arr = [2, 4, 6, 8, 10];
// let queries = [[1, 3], [2, 4]];
// console.log(rangeSumQuery(arr, queries));