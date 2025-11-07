function print(arr, n, index = 0) {
  if (index === n) {
    return;
  }

  console.log(arr[index]);
  return print(arr, n, index + 1);
}

function printReverse(arr, index) {
  if (index === -1) return;
  console.log(arr[index]);
  return printReverse(arr, index - 1);
}

function sumAllElements(nums, index = 0, n = nums.length) {
  if (index === n) {
    return 0;
  }
  let sum = nums[index];
  return (sum += sumAllElements(nums, index + 1, n));
}

function minElement(nums, index, n = nums.length) {
  if (index === n - 1) return nums[index];

  return Math.min(nums[index], minElement(nums, index + 1));
}

// console.log(print([3, 8, 9, 5], 4));
// console.log(printReverse([3, 8, 9, 5], 3));
// console.log(sumAllElements([3, 5, 8, 9], 0, 4));
console.log(minElement([3, 5, 8, 9], 0, 4));
