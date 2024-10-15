/*
Assume you have an array of length n initialized with all 0's and are given k update operations.

Each operation is represented as a triplet: [startIndex, endIndex, inc] which increments each element of subarray A[startIndex ... endIndex] (startIndex and endIndex inclusive) with inc.

Return the modified array after all k operations were executed.

Example:

Input: length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]
Output: [-2,0,3,5,3]
Explanation:

Initial state:
[0,0,0,0,0]

After applying operation [1,3,2]:
[0,2,2,2,0]

After applying operation [2,4,3]:
[0,2,5,5,3]

After applying operation [0,2,-2]:
[-2,0,3,5,3]
*/

function applyUpdates(n, updates){
    let arr = new Array(n).fill(0);

    for(let update of updates){
        let [L, R, val] = update;

        for(let i = L; i <= R; i++){
            arr[i] += val
        }
    }

    return arr;
}

function applyUpdatesOptimized(n, updates){
    let arr = new Array(n).fill(0);

    // Apply difference array technique
    for(let update of updates){
        let [L, R, val] = update;
        // Increment arr[L] by val
        arr[L] += val;
        // Decrement arr[R + 1] by val, if it's within bounds
        if(R + 1 < n){
            arr[R + 1] -= val;
        }
    }
    // Accumulate the differences
    for(let i = 1; i < n; i++){
        arr[i] += arr[i -1];

    }
    return arr;
}

console.log(applyUpdatesOptimized(5, [[1, 3, 2,], [2, 4, 3], [0, 2, -2]]));