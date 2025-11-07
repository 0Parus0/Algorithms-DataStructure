/**
normalSortedArray = [0, 1, 2, 4, 5, 6, 7]
rotatedSortedArray = [4, 5, 6, 7, 0, 1, 2]

*/

function findPivot(nums) {
  if (nums[0] <= nums[nums.length - 1]) return 0;
  let l = 0;
  let r = nums.length - 1;
  while (l < r) {
    let mid = Math.floor((l + r) / 2);
    console.log({ mid });
    if (nums[mid] >= nums[0]) {
      l = mid + 1;
    } else {
      r = mid;
    }
  }
  return l;
}

function binarySearch(nums, target, l = 0, r = nums.length - 1) {
  while (l <= r) {
    let mid = Math.floor((l + r) / 2);

    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) l = mid + 1;
    else r = mid - 1;
  }

  return -1;
}

function searchInSortedRotated(nums, target) {
  let pivot = findPivot(nums);
  if (pivot === 0) {
    return binarySearch(nums, target);
  } else if (target > nums[nums.length - 1]) {
    return binarySearch(nums, target, 0, pivot - 1);
  } else {
    return binarySearch(nums, target, pivot, nums.length - 1);
  }
}

// console.log(searchInSortedRotated([4, 5, 6, 7, 0, 1, 2], 0));
console.log(searchInSortedRotated([1, 2, 3, 4, 5, 0], 0));
// console.log(searchInSortedRotated([0, 1, 2, 3, 4, 5], 3));
