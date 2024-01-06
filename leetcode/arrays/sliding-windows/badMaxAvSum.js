function badMaxAverageSum(arr, k) {
  let max = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    let windowSum = 0;
    console.log(`ran ${i} times`); // 0, 1, 2, 3, 4, 5
    for (let j = 0; j < k && i + k - 1 < arr.length; j++) {
      windowSum += arr[i + j];
    }
    if (windowSum !== 0) max = Math.max(max, parseFloat(windowSum / k));
  }
  if (max === -Infinity) return 0;
  return max;
}

let nums = [1, 12, -5, -6, 50, 3];
console.log(badMaxAverageSum(nums, 4));

// function badMaxAverageSum(arr, k) {
//   let max = -Infinity;
//   for (let i = 0; i < arr.length; i++) {
//     let windowSum = 0;
//     console.log(`ran ${i} times`);// 0, 1, 2, 3, 4;
//     for (let j = 0; j < k; j++) {
//       if (!(i + (k - 1) > arr.length - 1)) {
//         windowSum += nums[i + j];
//       } else {
//         i = nums.length;
//         j = k;
//       }
//     }
//     if (windowSum !== 0) {
//       max = Math.max(max, parseFloat(windowSum / k));
//     }
//   }
//   if (max === -Infinity) return 0;
//   return max;
// }
