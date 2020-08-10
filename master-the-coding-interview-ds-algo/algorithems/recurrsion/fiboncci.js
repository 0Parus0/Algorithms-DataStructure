function fibonacciIterative(number) {
  let arr = [0, 1];
  for(let i = 2; i <= number ; i++) {
    arr.push(arr[i -2] + arr[i -1]);
  }
  return arr[number];
}

console.log(fibonacciIterative(7));

function fibonacciRecursive(number) {
  if(number === 0 || number === 1) {
    return number;
  } else if(number === 2) {
    return 1
  } else {
    return fibonacciRecursive(number -1) + fibonacciRecursive(number -2);
  }
}

console.log(fibonacciRecursive(10));