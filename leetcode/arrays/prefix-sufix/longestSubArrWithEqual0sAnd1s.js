/*
Count subarrays with equal number of 1’s and 0’s
Last Updated : 29 Nov, 2023
Given an array arr[] of size n containing 0 and 1 only. The problem is to count the subarrays having an equal number of 0’s and 1’s.

Examples:  

Input: arr[] = {1, 0, 0, 1, 0, 1, 1}
Output: 8
Explanation: The index range for the 8 sub-arrays are: (0, 1), (2, 3), (0, 3), (3, 4), (4, 5)(2, 5), (0, 5), (1, 6)

Input: arr = { 1, 0, 0, 1, 1, 0, 0, 1}
Output: 12
*/
function countSubArrWithEqual01BF(arr){
    let n = arr.length;
    let count = 0;
    for(let i = 0; i < n; i++){
        let sum = 0;
        for(let j = i; j < n; j++){
            // Treat 0s as -1
            sum += arr[j] === 0 ? -1 : 1;
            // If the sum is 0, we have found a subarray with equal 0s and 1s
            if(sum === 0)count++;
        }
    }
    return count;
}

function countSubArrWithEqual01(arr){
    let n = arr.length;
    let count = 0;
    let map = {0: 1};
    let prefixSum = 0
    for(let i = 0; i < n; i++){
        // Treat 0 as -1
        prefixSum += arr[i] === 0 ? -1 : 1;

        if(map[prefixSum] === undefined){
            map[prefixSum] = 1;
        }else {
            count += map[prefixSum];
            map[prefixSum]++;
        }
    }
    return count;
}



// console.log(countSubArrWithEqual01([1, 0, 1, 0, 1]));







/*
Given a binary array nums, return the maximum length of a contiguous subarray with an equal number of 0 and 1.

 

Example 1:

Input: nums = [0,1]
Output: 2
Explanation: [0, 1] is the longest contiguous subarray with an equal number of 0 and 1.
Example 2:

Input: nums = [0,1,0]
Output: 2
Explanation: [0, 1] (or [1, 0]) is a longest contiguous subarray with equal number of 0 and 1.
 

Constraints:

1 <= nums.length <= 105
nums[i] is either 0 or 1.
*/

function findMaxLength(nums){
    let prefixSum = 0;
    let maxLength = 0;
    let prefixSumMap = {0: -1};

    for(let i = 0; i < nums.length; i++){
        // Treat 0 as -1
        prefixSum += nums[i] === 0 ? -1 : 1;

        // If this prefix sum has been seen before, calculate the subarray length
        if(prefixSumMap[prefixSum]) {
            let prevIndex = prefixSumMap[prefixSum];
            maxLength = Math.max(maxLength, i - prevIndex);

        }else {
            // Add the first occurrence of this prefix sum
            prefixSumMap[prefixSum] = i;
        }
    }

    return maxLength;
}

console.log(findMaxLength([0, 1, 0]));