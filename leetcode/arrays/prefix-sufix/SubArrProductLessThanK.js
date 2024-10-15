/*
Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements in the subarray is strictly less than k.

 

Example 1:

Input: nums = [10,5,2,6], k = 100
Output: 8
Explanation: The 8 subarrays that have product less than 100 are:
[10], [5], [2], [6], [10, 5], [5, 2], [2, 6], [5, 2, 6]
Note that [10, 5, 2] is not included as the product of 100 is not strictly less than k.
Example 2:

Input: nums = [1,2,3], k = 0
Output: 0
 

Constraints:

1 <= nums.length <= 3 * 104
1 <= nums[i] <= 1000
0 <= k <= 106
*/


function subArrProductLessThankBF(arr, k){
    let count = 0;
    let n = arr.length;
    for(let i = 0; i < n; i++){
        let product = 1;
        for(let j = i; j < n; j++){
            product *= arr[j];
            if(product < k) count++
            else break;
        }
    }
    return count;
}

function subArrProductLessThanK(arr, k){
    if(k <= 1)return 0;
    let n = arr.length;
    let count = 0;
    let product = 1;
    let start = 0;
    for(let end = 0; end < n; end++){
        product *= arr[end];

        while(product >= k && start <= k){
            product /= arr[start];
            start++
        }

        count += end - start + 1;
    }
    return count
}

console.log(subArrProductLessThanK([10, 5, 2, 6,], 100));