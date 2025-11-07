/*
Next Greater Element (NGE) for every element in given Array
Last Updated : 25 Aug, 2025

Given an array arr[] of integers, determine the Next Greater Element (NGE) for every element in the array, maintaining the order of appearance.

    The Next Greater Element for an element x is defined as the first element to the right of x in the array that is strictly greater than x.
    If no such element exists for an element, its Next Greater Element is -1.

Examples: 

    Input: arr[] = [1, 3, 2, 4]
    Output: [3, 4, 4, -1]
    Explanation: The next larger element to 1 is 3, 3 is 4, 2 is 4 and for 4, since it doesn't exist, it is -1.

    Input: arr[] = [6, 8, 0, 1, 3]
    Output: [8, -1, 1, 3, -1]
    Explanation: The next larger element to 6 is 8, for 8 there is no larger elements hence it is -1, for 0 it is 1 , for 1 it is 3 and then for 3 there is no larger element on right and hence -1.

    Input: arr[] = [50, 40, 30, 10]
    Output: [-1, -1, -1, -1]
    Explanation: There is no greater element for any of the elements in the array, so all are -1.
    */

function nextGreater(nums) {
  const stack = [];
  const result = new Array(nums.length).fill(-1);

  for (let i = 0; i < nums.length; i++) {
    if (stack.length === 0) {
      stack.push(i);
    } else {
      // console.log({ stack });
      while (nums[stack[stack.length - 1]] < nums[i] && stack.length > 0) {
        result[stack[stack.length - 1]] = nums[i];
        stack.pop();
      }
      stack.push(i);
    }
    // console.log(stack);
  }
  return result;
}

function nextGreaterRev(nums) {
  const stack = [];
  const n = nums.length;
  const result = new Array(n).fill(-1);
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      stack.pop();
    }

    if (stack.length > 0) {
      result[i] = nums[stack[stack.length - 1]];
    }
    stack.push(i);
  }
  return result;
}

function nextGreater2(nums) {
  // We have to find the next greater for every element considering the nums array as a circular array
  const stack = [0];
  const result = new Array(nums.length).fill(-1);

  for (let i = 1; i < 2 * nums.length - 1; i++) {
    while (
      stack.length > 0 &&
      nums[i % nums.length] > nums[stack[stack.length - 1]]
    ) {
      result[stack[stack.length - 1]] = nums[i % nums.length];
      stack.pop();
    }
    stack.push(i % nums.length);
  }
  return result;
}

function nextGreater3(nums) {
  const n = nums.length;
  const stack = [];
  const result = new Array(n).fill(-1);

  for (let i = 0; i < 2 * n; i++) {
    const idx = i % n;

    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[idx]) {
      result[stack.pop()] = nums[idx];
    }

    if (i < n) {
      stack.push(idx);
    }
  }

  return result;
}
// console.log(nextGreaterRev([8, 6, 4, 7, 4, 9, 10, 8, 12]));
console.log(nextGreater3([6, 10, 7, 4, 8, 9, 4]));
