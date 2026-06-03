/*
204. Count Primes
Given an integer n, return the number of prime numbers that are strictly less than n.

Example 1:
Input: n = 10
Output: 4
Explanation: There are 4 prime numbers less than 10, they are 2, 3, 5, 7.

Example 2:
Input: n = 0
Output: 0

Example 3:
Input: n = 1
Output: 0

Constraints:
0 <= n <= 5 * 106
*/

// ========================================================================
//            2. Optimized
// ========================================================================

function countPrimes1(n) {
  const isPrime = new Array(n + 1).fill(true);
  const result = [];

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i] === true) {
      // Start from i*i, and increment by i
      for (let j = i * i; j <= n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) result.push(i);
  }
  return result;
}

console.log(countPrimes(2)); // [2, 3, 5, 7]

function countPrimes(n) {
  const isPrime = new Array(n + 1).fill(true);
  const result = [];

  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i] === true) {
      for (let j = 2; i * j <= n; j++) {
        isPrime[i * j] = false;
      }
    }
  }

  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) result.push(i);
  }
  return result;
}
