/*
Max Value After Range Updates
Problem:
You are given an array of integers arr of length n, initialized to all 0s. You are also given a series of update operations, where each update is a tuple (start, end, val). For each update, you need to add val to the elements of the array between index start and end (inclusive).

After performing all the updates, return the maximum value in the array.

Example:

Input: n = 6, updates = [(1, 3, 5), (0, 2, 3), (2, 5, 2)]
Output: 8

Explanation:
Initial array: [0, 0, 0, 0, 0, 0]
After (1, 3, 5): [0, 5, 5, 5, 0, 0]
After (0, 2, 3): [3, 8, 8, 5, 0, 0]
After (2, 5, 2): [3, 8, 10, 7, 2, 2]

Maximum value in the array is 10.
*/

function maxValueAfterUpdatesBF(n, updates){
    let arr = new Array(n).fill(0);

    for(let update of updates){
        let [L, R, val] = update;

        for(let i = L; i <= R; i++){
            arr[i] += val;
        }

    }
    return Math.max(...arr);
}

function maxValueAfterUpdates(n, updates){
    let arr = new Array(n).fill(0);

    for(let update of updates){
        let [L, R, val] = update;

        arr[L] += val;

        if(R + 1 < n){
            arr[R + 1] -= val
        }
    }
    for(let i = 1; i < n; i++){
        arr[i] += arr[i -1];
    }

    return Math.max(...arr);

}
console.log(maxValueAfterUpdates(6, [[1, 3, 5], [0, 2, 3], [2, 5, 2]]));