/*
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

function sieveOfEratosthenes(n) {
  let primes = Array.from({ length: n }, () => true);
  let highestPrime = Array.from({ length: n }, () => 0);
  let lowestPrime = Array.from({ length: n }, () => 0);
  let count = 0;
  primes[0] = primes[1] = false;
  for (let i = 2; i < n; i++) {
    if (primes[i]) {
      count++;
      lowestPrime[i] = highestPrime[i] = i;
      for (let j = 2 * i; j < n; j += i) {
        primes[j] = false;
        highestPrime[j] = i;
        // console.log(primes, { i, j });
        if (lowestPrime[j] === 0) lowestPrime[j] = i;
      }
    }
  }
  for (let i = 1; i < n; i++) {
    console.log(
      i,
      { lowestPrime: lowestPrime[i] },
      { highestPrime: highestPrime[i] }
    );
  }
  return count;
}

console.log(sieveOfEratosthenes(10));

function countPrime(n) {
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) count++;
  }
  return count;
}

function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (parseInt(num % i) === 0) return false;
  }
  return true;
}

function table(n) {
  for (let i = 1; i <= 10; i++) {
    console.log(`${n} * ${i} = ${i * n} `);
  }
}

// console.log(table(3));

// console.log(countPrime(100));
