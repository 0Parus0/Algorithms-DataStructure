/*
Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.

A subarray is a contiguous part of an array.

 

Example 1:

Input: nums = [4,5,0,-2,-3,1], k = 5
Output: 7
Explanation: There are 7 subarrays with a sum divisible by k = 5:
[4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
Example 2:

Input: nums = [5], k = 9
Output: 0
 

Constraints:

1 <= nums.length <= 3 * 104
-104 <= nums[i] <= 104
2 <= k <= 104
*/
function subArrDivByK(arr, k) {
    let n = arr.length;
    let map = {};
    map[0] = 1;
    let rem, prefixSum = 0, total = 0;
    for(let i = 0; i < n; i++){
        prefixSum += arr[i];

        rem = prefixSum % k;

        if(rem < 0) rem += k; // If remainder is negative
        if(map[rem] === undefined) {
            map[rem] = 1;
        } else {
            total += map[rem];
            map[rem]++;
        }
    }
    return total;
}

// console.log(subArrDivByK([4,5,0,-2,-3,1], 5))

/*
Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.

A good subarray is a subarray where:

its length is at least two, and
the sum of the elements of the subarray is a multiple of k.
Note that:

A subarray is a contiguous part of the array.
An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.
 

Example 1:

Input: nums = [23,2,4,6,7], k = 6
Output: true
Explanation: [2, 4] is a continuous subarray of size 2 whose elements sum up to 6.
Example 2:

Input: nums = [23,2,6,4,7], k = 6
Output: true
Explanation: [23, 2, 6, 4, 7] is an continuous subarray of size 5 whose elements sum up to 42.
42 is a multiple of 6 because 42 = 7 * 6 and 7 is an integer.
Example 3:

Input: nums = [23,2,6,4,7], k = 13
Output: false
 

Constraints:

1 <= nums.length <= 105
0 <= nums[i] <= 109
0 <= sum(nums[i]) <= 231 - 1
1 <= k <= 231 - 1
*/

function subArrSumIsMultipleOfKBF(arr,k){
    let n = arr.length;
    for(let i = 0; i < n; i++){
        let sum = 0;
        for(let j = i; j < n; j++){
            sum += arr[j];
            if(k !== 0 && sum % k === 0 && j - i + 1 >= 2){
                // console.log(j , i, sum)
                return true;
            }
        }
    }
    return false;
}

// function subArrSumIsMultipleOfK(arr, k) {
//     let n = arr.length;
//     let prefixSum = 0;
//     let map = {0: -1};


//     for(let i = 0; i < n; i ++){
//         prefixSum += arr[i];
//         let rem = prefixSum % k;

//         if (rem < 0) rem + k;

//         if(map[rem] !== undefined && i - map[rem] >= 2 ){
//             return true;
//         }
//         else {
//             map[rem] = i;
//         }
    
//     }
//     return false;
// }



console.log(subArrSumIsMultipleOfKBF([23, 2, 5, 6, 7], 3));