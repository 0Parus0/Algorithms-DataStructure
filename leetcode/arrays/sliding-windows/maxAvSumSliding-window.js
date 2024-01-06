function maxAvSumSlidingWindow(arr, k) {
  let max = -Infinity,
    windowSum = 0,
    start = 0;
  for (let end = 0; end < arr.length; end++) {
    console.log(`ran ${end} times`);
    windowSum += arr[end];

    if (end - start + 1 === k) {
      max = Math.max(max, parseFloat(windowSum / k));
      windowSum -= arr[start];
      start++;
    }
  }
  return max;
}
let nums = [1, 12, -5, -6, 50, 3];
console.log(maxAvSumSlidingWindow(nums, 4));
