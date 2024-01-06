/*
Given a non-negative integer x, return the square root of x rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

For example, do not use pow(x, 0.5) in c++ or x ** 0.5 in python.
 

Example 1:

Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
Example 2:

Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned.
 

Constraints:

0 <= x <= 231 - 1
*/
function squareRootBS(num) {
  let start = 0,
    end = num,
    ans;
  while (start <= end) {
    let mid = parseInt((start + end) / 2);
    let square = mid * mid;
    if (square === num) return mid;
    if (square < num) {
      ans = mid;
      start = mid + 1;
    } else end = mid - 1;
  }

  return ans;
}

function preciseSqrt(num, precision, intPart) {
  let ans = squareRootBS(num);
  let count = 0;
  console.log(ans);
  let factor = 1;
  for (let i = 0; i < precision; i++) {
    factor = factor / 10;
    console.log("ran" + count++);
    for (let j = ans; j * j < num; j = j + factor) {
      console.log(j);
      ans = j;
    }
  }

  return ans;
}

// console.log(squareRootBS(350000000000000));
console.log(preciseSqrt(37, 3));
