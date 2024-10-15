/*
You are given an integer array nums and a positive integer k.

Return the number of subarrays where the maximum element of nums appears at least k times in that subarray.

A subarray is a contiguous sequence of elements within an array.

 

Example 1:

Input: nums = [1,3,2,3,3], k = 2
Output: 6
Explanation: The subarrays that contain the element 3 at least 2 times are: [1,3,2,3], [1,3,2,3,3], [3,2,3], [3,2,3,3], [2,3,3] and [3,3].
Example 2:

Input: nums = [1,4,2,1], k = 3
Output: 0
Explanation: No subarray contains the element 4 at least 3 times.
 

Constraints:

1 <= nums.length <= 105
1 <= nums[i] <= 106
1 <= k <= 105
*/
function maxIntKTimes(arr, k) {
    let n = arr.length;
    let start = 0, end = 0, total = 0, count = 0;
    let max = Math.max(...arr);
    
    while(end < n) {
        if(arr[end] === max) {
            count++;
        }
        // Decrease the window's size and add to total
        while(count === k) {
            total += n - end;
            if(arr[start] === max) {
                count--;
            }
            start++
        }

        // Increase the window size;
        end++;
    }
    return total;

}

console.log(maxIntKTimes([1,3,2,3,3], 2));
console.log(maxIntKTimes([1,4,2,1], 3));