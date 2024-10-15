/*
Problem:
Maximum Sum of Subarray with Specific Length for Each Query

You are given an array of integers arr and a list of queries. For each query, you are required to find the maximum sum of any subarray of length equal to the target specified in the query.

Input:

javascript
Copy code
arr = [3, -1, 4, 2, -3, 5]
queries = [2, 3]
Output:

javascript
Copy code
[6, 7]
*/
function maxSumBF(arr, queries){
    let n = arr.length;
    let result = [];
    for(let query of queries){
        let maxSum = -Infinity;
        for(let i = 0; i < n - query; i++) {
            let curSum = 0;
            for(let j = i; j < i + query; j++){
                curSum += arr[j];
                // console.log(curSum, maxSum);
            }
            maxSum = Math.max(maxSum, curSum);
        }
        result.push(maxSum);
    }
    return result;
}

function maxSumOptimized(arr, queries){
    let n = arr.length;
    let result = [];

    for(let query of queries){
        let maxSum = -Infinity;
        let left = 0;
        let windowSum = 0;
        for(let end = 0; end < query; end++){
            windowSum += arr[end];
        }
        maxSum = windowSum;
        
        for(let end = query; end < n; end++){
            windowSum += arr[end];
            windowSum -= arr[end - query];
            maxSum = Math.max(maxSum, windowSum);
        }
        result.push(maxSum);
    }
    return result;
}

const arr = [3, -1, 4, 2, -3, 5];
const queries = [2, 3];
console.log(maxSumOptimized(arr, queries)); // Output: [6, 7]

