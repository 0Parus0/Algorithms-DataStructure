/*
Given an array of negative and non-negative integers. You have to make the array beautiful. An array is beautiful if two adjacent integers, arr[i] and arr[i+1] are either negative or non-negative. And you can do the following operation any number of times until the array becomes beautiful.

    If two adjacent integers are different i.e. one of them is negative and other is non-negative, remove them.

Return the beautiful array after performing the above operation.

Note:An empty array is also a beautiful array. There can be many adjacent integers which are different as stated above. So remove different adjacent integers as described above from left to right.

Example 1:

Input: 4 2 -2 1
Output: 4 1
Explanation: As at indices 1 and 2 , 2 and -2 have
different sign, they are removed. And the  the final
array is: 4 1.

Example 2:

Input: 2 -2 1 -1
Output: []
Explanation: As at indices 0 and 1, 2 and -2 have
different sign, so they are removed. Now the array
is 1 -1.Now 1 and -1 are also removed as they have
different sign. So the final array is empty. 

Your Task:
You don't need to read input or print anything. Your task is to complete the function makeBeautiful() which takes an array as an input parameter and returns an array.

Expected Time Complexity: O(N)
Expected Space Complexity: O(N)
*/

function beautifulArr(arr) {
  const stack = [];
  for (let i = 0; i < arr.length; i++) {
    const stackTop = stack[stack.length - 1];
    if (stack.length === 0) stack.push(arr[i]);
    else if (arr[i] >= 0) {
      if (stackTop >= 0) stack.push(arr[i]);
      else stack.pop();
    } else {
      if (stackTop < 0) stack.push(arr[i]);
      else stack.pop();
    }
  }

  return stack;
}

console.log(beautifulArr([4, 2, -2, 1])); // [4, 1]
console.log(beautifulArr([-1, 2, 3, -1])); // [4, 1]

function makeBeautiful(arr) {
  const stack = [];

  for (let i = 0; i < arr.length; i++) {
    // console.log("Processing index:", i, "value:", arr[i]);

    if (stack.length === 0) {
      stack.push(arr[i]);
      // console.log("Stack after push:", stack);
      continue;
    }

    const stackTop = stack[stack.length - 1];
    const current = arr[i];

    // Check if both are non-negative OR both are negative
    const bothNonNegative = stackTop >= 0 && current >= 0;
    const bothNegative = stackTop < 0 && current < 0;

    if (bothNonNegative || bothNegative) {
      // Same signs - push to stack
      stack.push(current);
      // console.log("Same sign - pushed:", current, "Stack:", stack);
    } else {
      // Different signs - remove from stack
      stack.pop();
      // console.log("Different sign - popped. Stack:", stack);
    }
  }

  return stack;
}

// Test with array input
console.log("Result:", makeBeautiful([4, 2, -2, 1])); // Should return [4, 1]
console.log("Result:", makeBeautiful([2, -2, 1, -1])); // Should return []
