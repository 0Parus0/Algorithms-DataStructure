/*
Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.

 

Example 1:

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
Example 2:

Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
Example 3:

Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
 

Constraints:

3 <= nums.length <= 3000
-105 <= nums[i] <= 105
*/

function threeSum(nums, target) {
  nums = nums.sort((a, b) => a - b);
  //   console.log(nums);
  //   let answer = [];
  //   if (nums.length < 3) {
  //     return answer;
  //   }
  //   for (let i = 0; i < nums.length; i++) {
  //     if (nums[i] > 0) {
  //       break;
  //     }
  //     if (i > 0 && nums[i] === nums[i - 1]) {
  //       continue;
  //     }
  //     let low = i + 1;
  //     let high = nums.length - 1;
  //     while (low < high) {
  //       const sum = nums[i] + nums[low] + nums[high];
  //       if (sum > 0) {
  //         high--;
  //       } else if (sum < 0) {
  //         low++;
  //       } else {
  //         answer.push([nums[i], nums[low], nums[high]]);
  //         let lastLowOccurrence = nums[low];
  //         let lastHighOccurrence = nums[high];
  //         while (low < high && nums[low] === lastLowOccurrence) {
  //           low++;
  //         }
  //         while (low < high && nums[high] === lastHighOccurrence) {
  //           high--;
  //         }
  //       }
  //     }
  //   }
  //   return answer;
  //   nums.sort((a, b) => a - b); // Sorted Array
  //      let answer = [];

  //      if (nums.length < 3) {
  //          return answer;
  //      }

  //      if (nums[0] > 0) {
  //          return answer;
  //      }

  //      let hashMap = new Map();

  //      for (let i = 0; i < nums.length; ++i) {
  //          hashMap.set(nums[i], i);
  //      }

  //      for (let i = 0; i < nums.length - 2; ++i) {
  //          if (nums[i] > 0) {
  //              break;
  //          }

  //          for (let j = i + 1; j < nums.length - 1; ++j) {
  //              let required = -1 * (nums[i] + nums[j]);
  //              if (hashMap.has(required) && hashMap.get(required) > j) {
  //                  answer.push([nums[i], nums[j], required]);
  //              }
  //              j = hashMap.get(nums[j]);
  //          }

  //          i = hashMap.get(nums[i]);
  //      }

  //      return answer;

  /* Brute Force */
  let ans = [];
  let n = nums.length;
  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    for (let j = i + 1; j < n - 1; j++) {
      if (j > i + 1 && nums[j] === nums[j - 1]) continue;
      for (let k = j + 1; k < n; k++) {
        if (k > j + 1 && nums[k] === nums[k - 1]) continue;
        if (nums[i] + nums[j] + nums[k] === target) {
          let triplet = [nums[i], nums[j], nums[k]];
          ans.push(triplet);
        }
      }
    }
  }
  return ans;
}
let arr = [-1, 0, 1, 2, -1, -4];
// let arr = [0, 0, 0];
target = 0;

console.log(threeSum(arr, target));
