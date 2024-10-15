/*
Given an array of integers arr, return the number of subarrays with an odd sum.

Since the answer can be very large, return it modulo 109 + 7.

 

Example 1:

Input: arr = [1,3,5]
Output: 4
Explanation: All subarrays are [[1],[1,3],[1,3,5],[3],[3,5],[5]]
All sub-arrays sum are [1,4,9,3,8,5].
Odd sums are [1,9,3,5] so the answer is 4.
Example 2:

Input: arr = [2,4,6]
Output: 0
Explanation: All subarrays are [[2],[2,4],[2,4,6],[4],[4,6],[6]]
All sub-arrays sum are [2,6,12,4,10,6].
All sub-arrays have even sum and the answer is 0.
Example 3:

Input: arr = [1,2,3,4,5,6,7]
Output: 16
*/

function countOddEvnSubArrBF(arr){
    let n = arr.length;
    let oddCount = 0;
    let evenCount = 0;

    for(let i = 0; i < n; i++){
        let sum = 0;
        for(j = i; j < n; j++){
            sum += arr[j];
            if(sum % 2 === 0) evenCount++
            else oddCount++
        }
    }
    return {oddCount, evenCount};
}

function countOddEvnSubArr(arr){
    let n = arr.length;
    let oddCount = 0, evenCount = 1;
    let oddSubarray = 0, evenSubarray = 0;
    let prefixSum = 0;
    for(let i = 0; i < n; i++){
        prefixSum += arr[i];

        // Check if prefixSum is even or odd
        if(prefixSum % 2 === 0){
            evenSubarray += evenCount;
            oddSubarray += oddCount;
            evenCount++
        } else {
            evenSubarray += oddCount;
            oddSubarray += evenCount;
            oddCount++
        }
        console.log({evenCount, oddCount})
    }
    return {evenSubarray, oddSubarray}
}

console.log(countOddEvnSubArr([1, 2, 3]))