/*
You are given an array nums consisting of positive integers.

You are also given an integer array queries of size m. For the ith query, you want to make all of the elements of nums equal to queries[i]. You can perform the following operation on the array any number of times:

Increase or decrease an element of the array by 1.
Return an array answer of size m where answer[i] is the minimum number of operations to make all elements of nums equal to queries[i].

Note that after each query the array is reset to its original state.

 

Example 1:

Input: nums = [3,1,6,8], queries = [1,5]
Output: [14,10]
Explanation: For the first query we can do the following operations:
- Decrease nums[0] 2 times, so that nums = [1,1,6,8].
- Decrease nums[2] 5 times, so that nums = [1,1,1,8].
- Decrease nums[3] 7 times, so that nums = [1,1,1,1].
So the total number of operations for the first query is 2 + 5 + 7 = 14.
For the second query we can do the following operations:
- Increase nums[0] 2 times, so that nums = [5,1,6,8].
- Increase nums[1] 4 times, so that nums = [5,5,6,8].
- Decrease nums[2] 1 time, so that nums = [5,5,5,8].
- Decrease nums[3] 3 times, so that nums = [5,5,5,5].
So the total number of operations for the second query is 2 + 4 + 1 + 3 = 10.
Example 2:

Input: nums = [2,9,6,3], queries = [10]
Output: [20]
Explanation: We can increase each value in the array to 10. The total number of operations will be 8 + 1 + 4 + 7 = 20.
 

Constraints:

n == nums.length
m == queries.length
1 <= n, m <= 105
1 <= nums[i], queries[i] <= 109
*/
function minOperationsToEqual(arr, queries) {
    let results = [];
    
    // Iterate over each query
    for (let query of queries) {
        let totalOperations = 0;
        
        // For each query, calculate the total number of operations
        for (let i = 0; i < arr.length; i++) {
            totalOperations += Math.abs(arr[i] - query);  // Calculate |arr[i] - query|
        }
        
        results.push(totalOperations);
    }
    
    return results;
}

//Example usage:
let arr = [3, 1, 6, 8];
let queries = [1, 5];

console.log(minOperationsToEqual(arr, queries));  // Output: [2, 4]

function minOperationsToMakeEqualOpt(arr, queries) {
    let n = arr.length;

    // Step 1: Sort the array
    let sortedArr = [...arr].sort((a, b) => a - b);

    // Step 2: Compute the prefix sum
    let prefixSum = new Array(n).fill(0);
    prefixSum[0] = sortedArr[0];
    for (let i = 1; i < n; i++) {
        prefixSum[i] = prefixSum[i - 1] + sortedArr[i];
    }

    // Step 3: Answer the queries
    let result = [];
    for (let queryValue of queries) {
        // Binary search to find the position where sortedArr[pos] <= queryValue
        let low = 0;
        let high = n - 1;
        let pos = -1;
        
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (sortedArr[mid] <= queryValue) {
                pos = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        // Calculate total operations based on the position
        let totalOperations = 0;

        // For elements <= queryValue (on the left of the position)
        if (pos >= 0) {
            totalOperations += (queryValue * (pos + 1)) - prefixSum[pos];
        }

        // For elements > queryValue (on the right of the position)
        if (pos < n - 1) {
            totalOperations += (prefixSum[n - 1] - (pos >= 0 ? prefixSum[pos] : 0)) - queryValue * (n - pos - 1);
        }

        // Store the result for the current query
        result.push(totalOperations);
    }

    return result;
}

// Test the solution
let arr1 = [2, 9, 6, 3];
let queries1 = [10 ];
console.log(minOperationsToMakeEqualOpt(arr1, queries1)); // Output: [2, 4]
