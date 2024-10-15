/*
Given an array of integers. Find if there is a subarray (of size at-least one) with 0 sum. You just need to return true/false depending upon whether there is a subarray present with 0-sum or not. Printing will be taken care by the driver code.

Example 1:

Input:
n = 5
arr = {4,2,-3,1,6}
Output: 
Yes
Explanation: 
2, -3, 1 is the subarray with sum 0.
Example 2:

Input:
n = 5
arr = {4,2,0,1,6}
Output: 
Yes
Explanation: 
0 is one of the element in the array so there exist a subarray with sum 0.
Your Task:
You only need to complete the function subArrayExists() that takes array and n as parameters and returns true or false.

Expected Time Complexity: O(n).
Expected Auxiliary Space: O(n).

Constraints:
1 <= n <= 104
-105 <= a[i] <= 105
*/
function zeroSumSubArrBF1(arr) {
    let n = arr.length;
    let total = 0;
    for(let i = 0; i < n; i++) {
        for(let j = i; j < n; j++){
            let sum = 0;
            for(let k = i; k <= j; k++) {
                sum += arr[k];
            }
            if(sum === 0) total++;
        }
    }
    return total;
}

function zeroSumSubArrBF2(arr){
    let n = arr.length;
    let total = 0;
    for(let i =0; i < n; i++) {
        let sum = 0;
        for(let j = i; j < n; j++) {
            sum += arr[j];
            if(sum === 0) total++;
        }
    }
    return total;
}

function zeroSumSubArr(arr) {
    let n = arr.length;
    let prefixMap = new Map();
    let prefixSum = 0;
    let total = 0;
    prefixMap.set(0, 1);
    for(let i = 0; i < n; i++) {
        prefixSum += arr[i];
        if(!prefixMap.has(prefixSum)){
            prefixMap.set(prefixSum, 1);
        } else {
            total += prefixMap.get(prefixSum);
            prefixMap.set(prefixSum, prefixMap.get(prefixSum) + 1);
        }
    }
    return total
}

function zeroSumSubarraySet(arr) {
    let prefixSum = 0;
    let sumSet = new Set();

    for (let i = 0; i < arr.length; i++) {
        prefixSum += arr[i];

        // If the prefix sum is zero or we have seen this prefix sum before, return true
        if (prefixSum === 0 || sumSet.has(prefixSum)) {
            return true;
        }

        // Add the current prefix sum to the set
        sumSet.add(prefixSum);
    }

    return false;
}


// console.log(zeroSumSubArr([4, 2, -3, 1, 6]));
console.log(zeroSumSubArr([0,0, 5, 5, 0, 0]));