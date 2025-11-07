/**

 */

function firstPosition(nums, k) {
  let l = 0;
  let r = nums.length - 1;
  let result = -1;

  while (l <= r) {
    let mid = Math.floor((l + r) / 2);

    if (nums[mid] < k) {
      l = mid + 1;
    } else if (nums[mid] > k) {
      r = mid - 1;
    } else {
      result = mid;
      r = mid - 1;
    }
  }
  return result;
}

function lastPosition(nums, k) {
  let l = 0;
  let r = nums.length - 1;
  let result = -1;

  while (l <= r) {
    let mid = Math.floor((l + r) / 2);

    if (nums[mid] < k) {
      l = mid + 1;
    } else if (nums[mid] > k) {
      r = mid - 1;
    } else {
      result = mid;
      l = mid + 1;
    }
  }
  return result;
}

function firstAndLastPosition(nums, k) {
  if (nums[0] === nums[nums.length - 1] && k === nums[0]) {
    return [0, nums.length - 1];
  }
  let results = [];
  results.push(firstPosition(nums, k));
  results.push(lastPosition(nums, k));
  return results;
}

console.log(firstAndLastPosition([5, 7, 7, 8, 8, 10], 8));
console.log(firstAndLastPosition([5, 7, 7, 8, 8, 10], 10));
console.log(firstAndLastPosition([5, 7, 7, 8, 8, 10], 5));
console.log(firstAndLastPosition([5], 5));
console.log(firstAndLastPosition([2, 3, 6], 5));
console.log(firstAndLastPosition([2, 2, 2, 2, 2, 2], 5));
