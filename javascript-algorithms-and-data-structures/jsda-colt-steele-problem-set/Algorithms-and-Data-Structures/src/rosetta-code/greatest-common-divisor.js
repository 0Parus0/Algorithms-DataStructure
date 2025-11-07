// Write a function that returns the greatest common divisor of two integers.
/*
Euclidean Algorithm:
Algorithm used to find the gcd between two integers.
input: Two positive integers a, b
a = b * q + r where 0 <= r < b
b = r * q1 + r1  where 0 <= r1 < r
        .
        .
        .
ri_2 = ri_1 * qi + ri where 0 <= ri < r
ri_1 = ri * qi+1 + 0
The last non-zero remainder (r in this case) is the gcd (greatest common deviser)
Example:
Input: 34, 55
55 = 34 * 1 + 21
34 = 21 * 1 + 13 
21 = 13 * 1 + 8
13 = 8 * 1 + 5
8 = 5 * 1 + 3
5 = 3 * 1 + 2
3 = 2 * 1 + 1
2 = 1 * 2 + 0
The last non-zero remainder is 1 so is our gcd for 34, 55
*/

function gcd(a, b) {
  while (a && b) {
    a %= b;
    b = a ? b % a : b;
  }

  return Math.abs(a || b);
}

function gcdS(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
}

function gcdVS(a, b) {
  while (b !== 0) {
    // This line calculates: r = a % b (the remainder)
    // Which comes from: a = b × q + r
    let r = a % b;

    // Now we set up for the next iteration:
    // We want to find gcd(b, r) since gcd(a, b) = gcd(b, r)
    a = b;
    b = r;
  }
  return Math.abs(a);
}

/**
  Base case: When b === 0, the GCD is |a| (since gcd(a, 0) = |a|)

  Recursive case: gcd(a, b) = gcd(b, a % b) - this directly implements the mathematical property

  Extremely concise: Just 4 lines of code

  Mathematically pure: Follows the definition exactly
 
 */

function gcdR(a, b) {
  if (b === 0) {
    return Math.abs(a);
  }
  return gcdR(b, a % b);
}
console.log(gcdR(-1300, 250)); // 50
console.log(gcdR(111, 13)); // 1
console.log(gcdR(1000, 25)); // 25
console.log(gcdR(111, 15)); // 3
