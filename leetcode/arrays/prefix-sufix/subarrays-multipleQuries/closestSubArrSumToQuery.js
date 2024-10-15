/*
Closest Subarray Sum to Query Target
Problem: Given an array of integers arr and a list of queries, for each query, find the minimum number of operations required to make the sum of any subarray closest to the query target. Each operation allows incrementing or decrementing an element by 1.

Input:
arr = [2, 3, 5, 1],
queries = [6, 9]

Output:
[1, 3]"
*/
function closestSumBF(arr, queries){
    let n = arr.length;
    let result = [];

    for(let query of queries){

        let minOps = Infinity;

        for(let i = 0; i < n; i++){
            let curSum = 0;
            for(let j = i; j < n; j++){
                curSum += arr[j];
                minOps = Math.min(minOps, Math.abs(curSum - query));
            }
        }
        result.push(minOps);
    }
    return result;
}

function closestSumOptimizedJustPositiveIntegers(arr, queries){
    let n = arr.length;
    let result = [];

    for(let query of queries){
        let minOps = Infinity;
        let prefixSum = 0;
        let prefixMap = new Map();
        prefixMap.set(0, -1);
        
        for(let i = 0; i < n; i++){
            prefixSum += arr[i];


            let requiredSum = (prefixSum - query);
            console.log({ prefixSum, requiredSum})

            if(prefixMap.has(requiredSum)){
                minOps = 0;
                // result.push(0);
                break;
            }

            prefixMap.set(prefixSum, i);
        }
        if(minOps !== 0){
          for(let [sum] of prefixMap ){
            minOps = Math.min(minOps, Math.abs(sum - query));
          }
        }
        result.push(minOps);
    }
    return result;
}
const arr = [-2, -3, 5, 1];
const queries = [4, 0];
console.log(closestSumOptimizedJustPositiveIntegers(arr, queries)); // Output: [1, 0]


function closestSumOptimized(arr, queries) {
    let n = arr.length;
    let result = [];
 


    for (let query of queries) {
        let prefixSum = 0;
        let minOps = Infinity;
        let prefixSums = [0]; // Start with 0 as the initial prefix sum

        // Loop through the array and calculate prefix sums
        for (let i = 0; i < n; i++) {
            prefixSum += arr[i];

            // We want to find the closest prefix sum that when subtracted from current prefix sum gives a value close to the query
            let target = prefixSum - query;

            // Perform binary search to find the closest prefix sum
            let closestPrefixSum = binarySearchClosest(prefixSums, target);

            // Calculate the operations needed
            let currentOps = Math.abs((prefixSum - closestPrefixSum) - query);
            minOps = Math.min(minOps, currentOps);

            // Insert current prefixSum into sorted array of prefixSums (we keep it sorted)
            insertSorted(prefixSums, prefixSum);
        }

        result.push(minOps);
    }
    return result;
}

// Function to perform binary search and return the closest value in the sorted array
function binarySearchClosest(arr, target) {
    let left = 0, right = arr.length - 1;
    let closest = arr[0];

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        // Update closest if current value is closer to the target
        if (Math.abs(arr[mid] - target) < Math.abs(closest - target)) {
            closest = arr[mid];
        }

        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return closest;
}

// Function to insert a value into a sorted array while keeping it sorted
function insertSorted(arr, value) {
    let i = arr.length - 1;

    while (i >= 0 && arr[i] > value) {
        arr[i + 1] = arr[i];
        i--;
    }

    arr[i + 1] = value;
}

// Example usage:
// const arr = [-2, -3, 5, 1];
// const queries = [4, 0];
console.log(closestSumOptimized(arr, queries)); // Output: [1, 0]
