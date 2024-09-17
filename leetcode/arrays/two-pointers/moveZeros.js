/*
    Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

    Note that you must do this in-place without making a copy of the array.

    

    Example 1:

    Input: nums = [0,1,0,3,12]
    Output: [1,3,12,0,0]
    Example 2:

    Input: nums = [0]
    Output: [0]
    

    Constraints:

    1 <= nums.length <= 104
    -231 <= nums[i] <= 231 - 1
*/

/* Brute force */

function moveZerosBF(arr) {
    let n = arr.length;

    for(let i = 0; i < n; i++) {
        if(arr[i] === 0) {
            for(let j = i + 1; j < n; j++) {
                if(arr[j] !== 0) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    break;
                }
            }
        }
    }

    return arr;
}

function moveZeros(arr) {
    let n = arr.length;
    let lastNonZeroFoundAt = 0;

    for(let i = 0; i < n; i++) {
        if(arr[i] !== 0) {
            [arr[i], arr[lastNonZeroFoundAt]] = [arr[lastNonZeroFoundAt], arr[i]];
            lastNonZeroFoundAt++;
        }
    }
    // let left = 0; right = n -1;
    // while(left < right) {
    //     if(arr[left] === 0 && arr[right] > 0) {
    //         [arr[left], arr[right]] = [arr[right], arr[left]];
    //         left++;
    //         right--;
    //     }else if(arr[left] > 0) {
    //         left++
    //     } else if(arr[right] === 0) {
    //         right--
    //     }

    // }
    return arr;
}

console.log(moveZeros([0,1,0,3,12]));