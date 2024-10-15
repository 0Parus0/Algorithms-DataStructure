/*
Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.

A subarray is a contiguous non-empty sequence of elements within an array.

 

Example 1:

Input: nums = [1,1,1], k = 2
Output: 2
Example 2:

Input: nums = [1,2,3], k = 3
Output: 2
 

Constraints:

1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107
*/
/* Brute Force Solution */

function subArrSumBF(arr, k){
    let n = arr.length;
    let result = 0;
    for(let i = 0; i < n; i++){
        let sum = 0;
        for(let j = i; j < n; j++){
            sum += arr[j];
            if(sum === k)result++;
        }

    }
    return result;
}


function subArrSumEqualK(arr, k){
    let n = arr.length;
    let prefixSum = 0; // prefix sum
    let prefixSumMap = {}; // prefix sum map
    let count = 0; // Number of subarray who's sum equal to k

    // Initialize the map with prefixSum = 0 having frequency 1;
    prefixSumMap[0] = 1;
    
    for(let i = 0; i < n; i++){
        prefixSum += arr[i];

        // Check if (prefixSum - k) exists in the map
        /*  sum(i, j) = prefixSum[j] - prefixSum[i -1];
            k = prefixSum[j] -prefixSum[i - 1];
            prefixSum[j] = k + prefixSum[i -1];
            prefixSum[i - 1] = prefixSum[j] - k;
        */
        if(prefixSumMap[prefixSum - k] !== undefined){
            count += prefixSumMap[prefixSum -k];// increment count by the frequency of (prefixSum -k)

        }
        // Update the frequency of the current prefix sum in the map

        if(prefixSumMap[prefixSum] === undefined){
            prefixSumMap[prefixSum] = 1;
        } else {
            prefixSumMap[prefixSum] += 1;
        }
    }

    return count;

}

/*
Optimized approach explanation
A prefix sum up to an index i is the sum of all elements from the start of the array to index i. Let's denote prefix sum as prefixSum[i].
For any subarray sum from index i to j, the sum can be expressed as:
    sum(i, j) = prefixSum[j] - prefixSum[i -1];
if sum(i, j) = K, this implies:
    prefixSum[j] -prefixSum(i - 1) = K
    prefixSum[j] = prefixSum(i - 1) + K
    This means we need to find if there exist a prefix sum such that the difference between the current prefix sum and that previously encountered prefix sum equals K.

*/




// console.log(subArrSumBF([1, 1, 1], 2));
console.log(-3 % 7)
console.log(subArrSumEqualK([1, 2, 3], 3));
