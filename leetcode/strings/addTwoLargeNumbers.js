/*
Sum of two large numbers
Given two numbers as strings. The numbers may be very large (may not fit in long long int), the task is to find sum of these two numbers.

Examples: 

Input  : num1 = "3333311111111111", 
         num2 =   "44422222221111"
Output : 3377733333332222

Input  : num1 = "7777555511111111", 
         num2 =    "3332222221111"
Output : 7780887733332222
*/

function findSum(num1, num2) {
  num1 = num1.replace(/^0+/, "");
  num2 = num2.replace(/^0+/, "");

  if (num1 === "" && num2 === "") {
    return "0";
  }
  if (num1.length > num2.length) {
    return add(num1, num2);
  } else {
    return add(num2, num1);
  }
}

function add(num1, num2) {
  let index1 = num1.length - 1;
  let index2 = num2.length - 1;
  let sum = "";
  let carry = 0;
  while (index2 >= 0) {
    let sum1 = parseInt(num1[index1]) + parseInt(num2[index2]) + carry;
    carry = parseInt(sum1 / 10);
    valueToAdd = sum1 % 10;
    sum = valueToAdd + sum;
    index1--;
    index2--;
  }
  // index1 remaining
  while (index1 >= 0) {
    let sum1 = parseInt(num1[index1]) + carry;
    carry = parseInt(sum1 / 10);
    valueToAdd = sum1 % 10;
    sum = valueToAdd + sum;
    index1--;
  }
  if (carry > 0) sum = carry + sum;
    console.log({ sum }, { index1 }, { index2 }, { carry });
  return sum;
}

let num2 = "99999999";
let num1 = "888888";

console.log(findSum(num1, num2));

/* Using BigInt() 
// Define the input strings 
let str = "7777555511111111";
let num1 = "3332222221111";

// Create BigInt objects with arbitrary precision
let a = BigInt(str);
let b = BigInt(num1);

// Add the BigInt objects
let result = a + b;

// Print the result
console.log(result.toString());
*/
