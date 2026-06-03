/*
592. Fraction Addition and Subtraction
Given a string expression representing an expression of fraction addition and subtraction, return the calculation result in string format.

The final result should be an irreducible fraction. If your final result is an integer, change it to the format of a fraction that has a denominator 1. So in this case, 2 should be converted to 2/1.

Example 1:
Input: expression = "-1/2+1/2"
Output: "0/1"
Example 2:
Input: expression = "-1/2+1/2+1/3"
Output: "1/3"
Example 3:
Input: expression = "1/3-1/2"
Output: "-1/6"

Constraints:
The input string only contains '0' to '9', '/', '+' and '-'. So does the output.
Each fraction (input and output) has the format ±numerator/denominator. If the first input fraction or the output is positive, then '+' will be omitted.
The input only contains valid irreducible fractions, where the numerator and denominator of each fraction will always be in the range [1, 10]. If the denominator is 1, it means this fraction is actually an integer in a fraction format defined above.
The number of given fractions will be in the range [1, 10].
The numerator and denominator of the final result are guaranteed to be valid and in the range of 32-bit int.
*/

function fractionAddition(exp) {
  const n = exp.length;
  let nume = 0; // Numerator
  let denom = 1; // Denominator
  let i = 0;

  while (i < n) {
    let isNeg = exp[i] === "-";
    if (exp[i] === "-" || exp[i] === "+") {
      i++;
    }

    let currNume = 0;
    let currDenom = 0;

    // Build the currNume
    while (i < n && !isNaN(exp[i])) {
      let val = Number(exp[i]);
      currNume = currNume * 10 + val;
      i++;
    }
    if (isNeg === true) {
      currNume *= -1;
    }

    i++; // Numerator / Denominator // Skipping the divisor character '/';

    // Build the currDenom
    while (i < n && !isNaN(exp[i])) {
      let val = Number(exp[i]);
      currDenom = currDenom * 10 + val;
      i++;
    }

    nume = nume * currDenom + currNume * denom;
    denom = denom * currDenom;
  }

  const GCD = gcd(nume, denom);
  nume /= GCD;
  denom /= GCD;

  return `${nume}/${denom}`;
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);

  if (!b) return a;
  return gcd(b, a % b);
}

console.log(gcd(-1, 6));

console.log(fractionAddition("-1/3-1/2"));
