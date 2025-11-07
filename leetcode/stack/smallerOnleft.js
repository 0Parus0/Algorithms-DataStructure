function nextSmallerOnLeft(nums) {
  const stack = [0];
  const result = new Array(nums.length).fill(-1);

  for (let i = 1; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] < nums[stack[stack.length - 1]]) {
      stack.pop();
    }
    result[i] = nums[stack[stack.length - 1]];
    stack.push(i);
    console.log(stack);
  }
  return result;
}

console.log(nextSmallerOnLeft([4, 13, 11, 5, 9, 7, 8, 6]));
