function fibIt(num) {
  const arr = [0, 1];
  const mapper = {};
  let counter = 0;
  for(let i = 2; i <= num; i++) {
    let a = arr[i -1];
    let b = arr[i -2];
    arr.push(a + b);
  }

  for(let elem in arr) {
    mapper[counter] = arr[elem];
    counter++;
  }

  // return arr[num];
  return mapper;
}

// console.log(fibIt(10));

function fibRec(num) {
  if(num < 2) return num;
  return fibRec(num - 1) + fibRec(num - 2);
}

// console.log(fibRec(10));

function fibonacci(signature, num) {
  let num1 = signature[0],
  num2 = signature[1],
  next,
  count = 2;
  while(count < num ) {
    next = num1 + num2;
    num1 = num2;
    num2 = next;
    signature.push(next);
    count++;
  }
  return signature;
}
// console.log(fibonacci([0,1], 15));

function fibonacciRec(signature, num) {
  if(signature.length >= num){
    return signature;
  }
  signature.push(signature[signature.length - 2] + signature[signature.length - 1]);
  return fibonacciRec(signature, num);
}
// console.log(fibonacciRec([0,1], 15));


function tribonacci(signature, num) {
  if(!num) return [];
  if(num < signature.length) return [signature[num]];
  let num1 = signature[0],
  num2 = signature[1],
  num3 = signature[2],
  next,
  count = 3;
  while (count < num) {
    next = num1 + num2 + num3;
    num1 = num2;
    num2 = num3;
    num3 = next;
    signature.push(next);
    count++;
  }
  return signature;
}

function tribonacciRec(signature, num) {
  if(signature.length >= num) return signature;
  signature.push(signature[signature.length - 3] + signature[signature.length - 2] + signature[signature.length - 1]);
  return tribonacciRec(signature, num);
}

// console.log(tribonacciRec([15,12,5],2));
// console.log(tribonacciRec([0,0,1],10)); // [0, 0, 1, 1, 2, 4, 7, 13, 24, 44]
// console.log(tribonacciRec([0,1,1],10)); //[0, 1, 1, 2, 4, 7, 13, 24, 44, 81]
// console.log(tribonacci([1,0,0],10));
// console.log(tribonacci([1,2,3], 0));
// console.log(tribonacci([1,2,3], 0));
// console.log(tribonacci([1,2,3], 0));
// console.log(tribonacci([1,2,3], 0));
// console.log(tribonacci([1,2,3], 0));


let n = 10000;
let p = 0;
for(let i = 0; p <= n; i++) {
  // console.log('I = ', i);
  console.log('loop ran');
  p = p + i;
}