/*
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

 

Example 1:


Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1
 

Constraints:

n == height.length
2 <= n <= 105
0 <= height[i] <= 104 
*/

// function maxWaterContainer(heights) {
//   let maxWater = 0;
//   for (let i = 0; i < heights.length; i++) {
//     for (let j = heights.length - 1; j > i; j--) {
//       const height = Math.min(heights[i], heights[j]);
//       const width = j - i;
//       const area = height * width;
//       maxWater = Math.max(maxWater, area);
//       console.log({ maxWater }, { area });
//     }
//   }
//   return maxWater;
// }

function maxWaterContainer(heights) {
  let maxWater = 0;
  let left = 0;
  let right = heights.length - 1;
  while (left < right) {
    let height = Math.min(heights[left], heights[right]);
    let width = right - left;
    let area = height * width;
    maxWater = Math.max(maxWater, area);
    console.log({ maxWater }, { area });
    if (heights[left] < heights[right]) left++;
    else right--;
  }
  return maxWater;
}

let heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
// console.log(maxWaterContainer(heights));

function subtractProductAndSum(num) {
  let prod = 1;
  let sum = 0;
  while (num >= 1) {
    let digit = num % 10;
    console.log(num);
    prod = prod * digit;
    sum = sum + digit;
    num = parseInt(num / 10);
  }
  return prod - sum;
}

console.log(subtractProductAndSum(234));
