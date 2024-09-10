function factorialIterative(num) {
  let total = 1;
  for (let i = num; i > 1; i--) {
    total *= i;
  }
  return total;
}

// console.log(factorialIterative(3));

function factorialRecursive(num) {
  if (num < 0) return `Factorial is not possible`;
  if (num === 1) return 1;
  return num * factorialRecursive(num - 1);
}

// console.log(factorialRecursive(4));

function pow(num, power) {
  if (power === 0) return 1;
  return num * pow(num, power - 1);
}

console.log(pow(4, 4));

function sqSum(num) {
  if (num < 1) return false;
  if (num === 1) return 1;
  return num * num + sqSum(num - 1);
}
console.log(sqSum(5));
// Helper Method Recursion
