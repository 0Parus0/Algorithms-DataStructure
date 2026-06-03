/*
991. Broken Calculator
Medium
Topics
premium lock icon
Companies
There is a broken calculator that has the integer startValue on its display initially. In one operation, you can:

multiply the number on display by 2, or
subtract 1 from the number on display.
Given two integers startValue and target, return the minimum number of operations needed to display target on the calculator.

 

Example 1:

Input: startValue = 2, target = 3
Output: 2
Explanation: Use double operation and then decrement operation {2 -> 4 -> 3}.
Example 2:

Input: startValue = 5, target = 8
Output: 2
Explanation: Use decrement and then double {5 -> 4 -> 8}.
Example 3:

Input: startValue = 3, target = 10
Output: 3
Explanation: Use double, decrement and double {3 -> 6 -> 5 -> 10}.
 

Constraints:

1 <= startValue, target <= 109
*/
/**
 * @param {number} startValue
 * @param {number} target
 * @return {number}
 */
var brokenCalc = function (startValue, target) {
  let operations = 0;

  // Work backwards from target to startValue
  while (target > startValue) {
    if (target % 2 === 0) {
      // If even, divide by 2 (reverse of multiply)
      target /= 2;
    } else {
      // If odd, add 1 (reverse of subtract 1)
      target += 1;
    }
    operations++;
  }

  // Now target <= startValue, need to subtract (startValue - target) times
  operations += startValue - target;

  return operations;
};
// Example 1
console.log(brokenCalc(2, 3)); // Output: 2

// Example 2
console.log(brokenCalc(5, 8)); // Output: 2
// Backward: 8→4 (divide, ops=1), 4<5, ops+= (5-4)=1, total=2

// Example 3
console.log(brokenCalc(3, 10)); // Output: 3

// Edge case: startValue > target
console.log(brokenCalc(10, 3)); // Output: 7
// Just subtract 7 times: 10→9→8→7→6→5→4→3

// Edge case: equal
console.log(brokenCalc(5, 5)); // Output: 0
