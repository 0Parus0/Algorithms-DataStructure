/*
Given an integer array nums and an integer k, return the number of good subarrays of nums.

A good array is an array where the number of different integers in that array is exactly k.

For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
A subarray is a contiguous part of an array.

 

Example 1:

Input: nums = [1,2,1,2,3], k = 2
Output: 7
Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
Example 2:

Input: nums = [1,2,1,3,4], k = 3
Output: 3
Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
 

Constraints:

1 <= nums.length <= 2 * 104
1 <= nums[i], k <= nums.length
*/

function countSubArr(arr, k) {
    let n = arr.length;
    let start = 0, end = 0, count = 0, total = 0;
    let map = new Map();

    while(end < n) {
       if(!map.has(arr[end]) ) {
        map.set(arr[end], 0);

       }
       map.set(arr[end], map.get(arr[end]) + 1);
       if(map.get(arr[end]) === 1) count++;
       // Window's size decrease
       while(count === k) {
        total += n - end;
        map.set(arr[start], map.get(arr[start]) - 1);
        if(map.get(arr[start]) === 0 ) count--;

        start++;
       }

        // Increase the window size
        end++
    }
    return total;

}

console.log(countSubArr([1,2,1,2,3], 2));

function subArrWithKDiffInt(arr, k) {
    let atLeastK = countSubArr(arr, k);
    let atleastKPlusOne = countSubArr(arr, k + 1);
    return atLeastK - atleastKPlusOne;
}

console.log(subArrWithKDiffInt([1, 2, 1, 2, 3], 2));