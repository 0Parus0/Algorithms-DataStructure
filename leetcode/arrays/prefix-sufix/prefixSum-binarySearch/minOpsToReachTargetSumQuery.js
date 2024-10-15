/*
Problem:
Minimum Operations to Reach Target Sum for Each Query
Given an array of integers arr and a list of queries, for each query, find the minimum number of operations needed to make the sum of any subarray equal to the target sum specified in the query. Each operation allows incrementing or decrementing an element by 1.

Input:
arr = [1, 3, 2, 4]
queries = [5, 7]

Output:
[1, 2]
*/

function leastOps(arr, queries){
    let n = arr.length;
    let result = [];
    for(let query of queries){
        let least = Infinity;
        for(let i = 0; i < n; i++){
            let sum = 0;
            for(let j = i; j < n; j++){
                sum += arr[j];
               // Calculate the number of operations to make this subarray sum equal query 
                let ops = Math.abs(sum - query);

                // Update the minimum operations for this query
                least = Math.min(ops, least);
            }

        }
        result.push(least);
    }
    return result;
}


function minOperationsToTargetSum(arr, queries) {
    const n = arr.length;
    const results = [];

    // Step 1: Process each query independently
    for (let query of queries) {
        let minOperations = Infinity;

        // Step 2: Initialize prefix sum and a map to store prefix sums
        let prefixSum = 0;
        const prefixMap = new Map();
        prefixMap.set(0, -1); // This handles subarrays starting from index 0

        // Step 3: Traverse through the array and update the prefix sum map
        for (let i = 0; i < n; i++) {
            prefixSum += arr[i];

            // Check if we already have a subarray whose sum is equal to the target
            let requiredPrefix = prefixSum - query;
            if (prefixMap.has(requiredPrefix)) {
                // Found a subarray that sums to the target
                minOperations = 0;
                break;
            }

            // Update the map with the current prefix sum
            prefixMap.set(prefixSum, i);
        }

        // Step 4: If no exact match, calculate the minimum operations
        if (minOperations !== 0) {
            for (let [sum] of prefixMap) {
                
                minOperations = Math.min(minOperations, Math.abs(sum - query));
            }
        }

        // Store the result for the current query
        results.push(minOperations);
    }

    return results;
}

// Example
const arr = [1, 3, 2, 4];
const queries = [5, 7];
console.log(minOperationsToTargetSum(arr, queries));  // Output should be [0, 1]

// console.log(leastOpsOptimized([1, 3, 2, 4], [5, 7]));
// console.log(leastOps([1, 3, 2, 4], [5, 7]));
