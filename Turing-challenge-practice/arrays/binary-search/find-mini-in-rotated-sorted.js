function findMinimum(nums) {
  if (nums[0] < nums[nums.length - 1]) return nums[0];

  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    let mid = Math.floor((l + r) / 2);

    if (nums[mid] > nums[r]) l = mid + 1;
    else {
      r = mid;
    }
  }
  return nums[l];
}

// console.log(findMinimum([3, 4, 5, 1, 2]));
// console.log(findMinimum([4, 5, 6, 7, 0, 1, 2, 3]));
// console.log(findMinimum([1, 3, 4, 5]));
console.log(findMinimum([1]));
console.log(findMinimum([4, 5, 1, 2, 3]));
