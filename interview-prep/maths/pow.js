/*
50. Pow(x, n)
Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

Example 1:
Input: x = 2.00000, n = 10
Output: 1024.00000

Example 2:
Input: x = 2.10000, n = 3
Output: 9.26100

Example 3:
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25

Constraints:
-100.0 < x < 100.0
-231 <= n <= 231-1
n is an integer.
Either x is not zero or n > 0.
-104 <= xn <= 104
*/

function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  return fastPow(x, n);
  function fastPow(x, n) {
    if (n === 0) return 1;
    let half = fastPow(x, Math.floor(n / 2));
    let result = half * half;

    if (n % 2 === 1) result = result * x;

    return result;
  }
}

// ========================================================================
//                             2. Iterative
// ========================================================================

function myPow(x, n) {
  if (n === 0) return 1;

  // Handle negative exponent
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  let result = 1;
  let currentProduct = x;

  while (n > 0) {
    // If current bit is 1, multiply result by current product
    if (n % 2 === 1) result *= currentProduct;

    // Square the current product for next bit
    currentProduct *= currentProduct;

    // Move to next bit
    n = Math.floor(n / 2);
  }

  return result;
}

console.log(myPow(3, 13));
console.log(Math.pow(3, 13));
