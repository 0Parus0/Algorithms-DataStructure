/*
Given an array where every element occurs three times, except one element which occurs only once. Find the element that occurs once. The expected time complexity is O(n) and O(1) extra space. 

Examples:

Input: arr[] = {12, 1, 12, 3, 12, 1, 1, 2, 3, 3} 
Output: 2 
In the given array all element appear three times except 2 which appears once.

Input: arr[] = {10, 20, 10, 30, 10, 30, 30} 
Output: 20 
In the given array all element appear three times except 20 which appears once. 
*/
function appearsOnce(numArr) {
  let one = 0,
    two = 0,
    common;
  for (let i = 0; i < numArr.length; i++) {
    two = two | (one & numArr[i]);
    one = one ^ numArr[i];
    common = one & two;
    console.log({ one }, { two }, { common });

    // remove from one
    one = one & ~common;
    two = two & ~common;
  }
  return one;
}
let numArr = [12, 1, 12, 3, 12, 1, 1, 2, 3, 3];
// console.log(appearsOnce(numArr));

function appearsOnce1(numArr) {
  let res = 0;
  for (let i = 0; i <= 32; i++) {
    let x = 1 << i;
    let sum = 0;

    for (let j = 0; j < numArr.length; j++) {
      if ((numArr[j] & x) !== 0) sum++;
    }

    if (sum % 3 !== 0) res = res | x;
  }
  return res;
}

console.log(appearsOnce1(numArr));

// Javascript program for the above approach

// Method to find the element that occur only once
// function getSingle(arr, n) {
//   let ones = 0,
//     twos = 0;
//   let common_bit_mask;

//   for (let i = 0; i < n; i++) {
//     /*"one & arr[i]" gives the bits that are there in
// 			both 'ones' and new element from arr[]. We
// 			add these bits to 'twos' using bitwise OR*/
//     twos = twos | (ones & arr[i]);

//     /*"one & arr[i]" gives the bits that are
// 			there in both 'ones' and new element from arr[].
// 			We add these bits to 'twos' using bitwise OR*/
//     ones = ones ^ arr[i];

//     /* The common bits are those bits which appear third time
// 			So these bits should not be there in both 'ones' and 'twos'.
// 			common_bit_mask contains all these bits as 0, so that the bits can
// 			be removed from 'ones' and 'twos'*/
//     common_bit_mask = ~(ones & twos);

//     /*Remove common bits (the bits that appear third time) from 'ones'*/
//     ones &= common_bit_mask;

//     /*Remove common bits (the bits that appear third time) from 'twos'*/
//     twos &= common_bit_mask;
//   }
//   return ones;
// }

// // Driver Code

// let arr = [3, 3, 2, 3];
// let n = arr.length;
// console.log("The element with single occurrence is " + getSingle(arr, n));
