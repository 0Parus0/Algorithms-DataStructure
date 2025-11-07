function nextSmaller(nums) {
  const stack = [];
  const result = new Array(nums.length).fill(-1);

  for (let i = 0; i < nums.length; i++) {
    if (stack.length === 0) {
      stack.push(i);
    } else {
      while (stack.length > 0 && nums[stack[stack.length - 1]] > nums[i]) {
        result[stack[stack.length - 1]] = nums[i];
        stack.pop();
      }
      stack.push(i);
    }
  }
  return result;
}

function nextSmallerRev(nums) {
  const stack = [];
  const result = new Array(nums.length).fill(-1);

  for (let i = nums.length - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[i] < nums[stack[stack.length - 1]]) {
      stack.pop();
    }
    if (nums[i] > nums[stack[stack.length - 1]]) {
      result[i] = nums[stack[stack.length - 1]];
    }
    stack.push(i);
    // console.log({ stack });
  }
  return result;
}

console.log(nextSmallerRev([7, 9, 12, 10, 14, 8, 3, 6, 9]));
