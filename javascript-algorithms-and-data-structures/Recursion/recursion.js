// function countDown(num) {
//   if(num <=0) {
//     console.log('All done!');
//     return;
//   }
//   console.log(num);
//   num--;
//   countDown(num);
// }

// // countDown(5);

// function sumRange(num) {
//   if(num === 1) return 1;/* base case */
//   return num + sumRange(num - 1); /* mutated input every time */
// }

// // sumRange(3);

// function iterativeFactorial(num) {
//   let total = 1;
//   for (let i = num; i > 0; i--) {
//     total *= i;
//   }
//   return total;
// }

// function recursiveFactorial(num) {
//   if(num === 1) return 1;/* base case */
//   return num * recursiveFactorial(num - 1); /* mutated input every time */
// }

// console.log(recursiveFactorial(5));

function countDown(num) {
  if(num <= 0) {
    console.log('All done!');
    return;
  }

  // debugger;
  console.log(num);
  num--;
  countDown(num);
}

// countDown(5);

function sumRange(num) {
  if(num === 1) return 1;
  // console.log(num  - 1)
  return num + sumRange(num -1);
}

console.log(sumRange(10));

function factorial(num) {
  if(num === 1) return 1;
  return num * factorial(num - 1);
}

// console.log(factorial(3));