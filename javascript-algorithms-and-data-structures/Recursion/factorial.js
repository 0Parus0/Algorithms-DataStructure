function factorialIterative(num) {
  let total = 1;
  for (let i = num; i > 1; i--) {
    total *= i;
  }
  return total;
}

// console.log(factorialIterative(3));

function factorialRecursive(num) {
  if (num === 1) return 1;
  return num * factorialRecursive(num - 1);
}

console.log(factorialRecursive(4));

// Helper Method Recursion
