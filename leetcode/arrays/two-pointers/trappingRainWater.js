/*
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

 

Example 1:


Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
 

Constraints:

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
*/

function trappedRainWater(heights) {
  let n = heights.length,
    right = n - 1,
    left = 0,
    totalWater = 0;
  let maxLeft = heights[0],
    maxRight = heights[n - 1];
  while (left <= right) {
    if (maxLeft < maxRight) {
      if (maxLeft > heights[left]) {
        totalWater += maxLeft - heights[left];
      } else {
        maxLeft = heights[left];
      }
      left++;
    } else {
      if (maxRight > heights[right]) {
        totalWater += maxRight - heights[right];
      } else {
        maxRight = heights[right];
      }
      right--;
    }
  }
  return totalWater;

  /* Brute Force */
  // let totalWater = 0;
  // for (let p = 0; p < heights.length; p++) {
  //   let maxLeft = 0,
  //     maxRight = 0;
  //   let right = p,
  //     left = p;
  //   while (left >= 0) {
  //     maxLeft = Math.max(maxLeft, heights[left]);
  //     left--;
  //   }
  //   while (right < heights.length) {
  //     maxRight = Math.max(maxRight, heights[right]);
  //     right++;
  //   }

  //   let currentWater = Math.min(maxLeft, maxRight) - heights[p];
  //   if (currentWater >= 0) totalWater += currentWater;
  // }

  // return totalWater;
}

// let heights = [5, 1, 0, 2, 0, 3, 0]; // 9
// heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]; // 6
heights = [4, 2, 0, 3, 2, 5]; //                                                        9
console.log(trappedRainWater(heights));

/*function trapRainWaterWithLeaks(heights) {
    let left = 0, right = heights.length - 1;
    let left_max = 0, right_max = 0;
    let trappedWater = 0;

    while (left < right) {
        if (heights[left] < heights[right]) {
            if (heights[left] === 0) {
                // Handle leak adjustment for left side
                let backtrack_pos = left - 1;
                while (backtrack_pos >= 0 && heights[backtrack_pos] < left_max) {
                    trappedWater -= (left_max - heights[backtrack_pos]);
                    backtrack_pos--;
                }
                left_max = 0;
            } else if (heights[left] > left_max) {
                left_max = heights[left];
            } else {
                trappedWater += left_max - heights[left];
            }
            left++;
        } else {
            if (heights[right] === 0) {
                // Handle leak adjustment for right side
                let backtrack_pos = right + 1;
                while (backtrack_pos < heights.length && heights[backtrack_pos] < right_max) {
                    trappedWater -= (right_max - heights[backtrack_pos]);
                    backtrack_pos++;
                }
                right_max = 0;
            } else if (heights[right] > right_max) {
                right_max = heights[right];
            } else {
                trappedWater += right_max - heights[right];
            }
            right--;
        }
    }
    return trappedWater;
}
*/
