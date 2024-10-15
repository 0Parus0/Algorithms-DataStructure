/*
Minimum Value After Range Subtractions
Problem:
You are given an array arr of length n, initialized to all 0s. You are also given a series of update operations, where each update is a tuple (start, end, val). For each update, you need to subtract val from the elements between index start and end (inclusive).

Return the minimum value in the array after all updates are performed.

Example:
Input: n = 7, updates = [(0, 3, 4), (2, 5, 2), (1, 6, 3)]
Output: -3

Explanation:
Initial array: [0, 0, 0, 0, 0, 0, 0]
After (0, 3, 4): [-4, -4, -4, -4, 0, 0, 0]
After (2, 5, 2): [-4, -4, -6, -6, -2, -2, 0]
After (1, 6, 3): [-4, -7, -9, -9, -5, -5, -3]

Minimum value in the array is -9.
*/

function minValue(n, updates){
    let arr = new Array(n).fill(0);

    for(let update of updates){
        let [L, R, val] = update;

        for(let i = L; i <= R; i++){
            arr[i] -= val
        }
    }

    return Math.min(...arr);
}

function minValueOptimized(n, updates){
    let arr = new Array(n).fill(0);

    for(let update of updates){
        let [L, R, val] = update;

        arr[L]  -= val;

        if(R + 1 < n) {
            arr[R + 1] += val
        }

    }

    for(let i = 1; i < n; i++) {
        arr[i] += arr[ i - 1];
    }

    return Math.min(...arr);
}

console.log(minValueOptimized(7, [[0, 3, 4], [2, 5, 2], [1, 6, 3]]));