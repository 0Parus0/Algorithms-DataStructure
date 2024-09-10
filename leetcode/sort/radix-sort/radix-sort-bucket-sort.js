/**
 * **********************
 * Radix Sort:
 * **********************
 * Radix sort is a special sorting algorithm that works on lists of numbers
 * It never makes comparisons between elements!
 * It exploits the fact that information about the size of a number is encoded in the number of digits
 * More digits means a bigger number
 * In Order to implement radix sort, it's helpful to build a few helper functions first:
 * 
 * 
 * ***********************
 * *** getDigit *** Helper
 * ***********************
 *  getDigit(num, place) takes a number and and index/place returns the digit in num at the given place value starting from left;
 *  getDigit(12345, 0) => 5, getDigit(12345, 1) => 4, getDigit(12345,4) => 4
 * ******************************************************************
 * 
 * *************************
 * *** digitCount *** Helper
 * *************************
 * digitCount(num)  takes a number and returns the how many digits are there in the num
 * digitCount(1234) => 4, digitCount(3) => 1, digitCount(203) => 3
 * ******************************************************************

 * 
 * ************************
 * *** mostDigits *** Helper
 * *************************
 * mostDigits(numArray) takes an array of numbers and returns the number of digits of the greatest number in the arrays
 * mostDigits([12, 234, 567, 8765, 98765]) => 5 (because 98765 consists of 5 digits)
 * ******************************************************************
 * *** Radix Sort Pseudo Code ***
 * Define a function that accepts list of numbers
 * Figure out how many digits the largest number has
 * Loop from k = 0 up to this largest number of digits
 * For each iteration of the loop:
 *    * Create buckets for each digit(0, 9)
 *    * Place each number in the corresponding bucket based on its kth digit
 * Replace our existing array with values in our buckets starting with 0 and going up to 9
 * return list at the end
*/

/**
 * *************************
 * *** getDigit *** Helper
 * **************************
 */

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

//  function getDigit(num, i) {
//    return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
//  }

// console.log(getDigit(7342, 0));

/**
 * *************************
 * *** digitCount *** Helper
 * **************************
 */

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// function digitCount(num) {
//   if (num === 0) return 1;
//   return Math.floor(Math.log10(Math.abs(num))) + 1;
// }

/**
 * *************************
 * *** mostDigits *** Helper
 * **************************
 */

function mostDigits(numArr) {
  let maxDigit = 0;
  for (let i = 0; i < numArr.length; i++) {
    maxDigit = Math.max(maxDigit, digitCount(numArr[i]));
  }
  return maxDigit;
}

// function mostDigits(numArray) {
//   let maxDigits = 0;
//   for (let i = 0; i < numArray.length; i++) {
//     maxDigits = Math.max(maxDigits, digitCount(numArray[i]));
//   }
//   return maxDigits;
// }

// console.log(mostDigits([12, 234, 567, 8765, 98765]));

/**
 * *************************
 * *** radixSort ***
 * **************************
 */

function radixSort(numArr) {
  let mostDigitCount = mostDigits(numArr);
  for (let i = 0; i < mostDigitCount; i++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    // let digitBuckets = Array(10).fill([]); this creates 10 references to a single same array in memory

    for (let j = 0; j < numArr.length; j++) {
      let digit = getDigit(numArr[j], i);
      digitBuckets[digit].push(numArr[j]);
    }
    numArr = [].concat(...digitBuckets);
  }
  return numArr;
}

// function radixSort(numArray) {
//   const maxDigitCount = mostDigits(numArray);
//   for (let k = 0; k < maxDigitCount; k++) {
//     let digitBuckets = Array.from({ length: 10 }, () => []);
//     for (let i = 0; i < numArray.length; i++) {
//       let digit = getDigit(numArray[i], k);
//       digitBuckets[digit].push(numArray[i]);
//     }
//     numArray = [].concat(...digitBuckets);
//   }
//   return numArray;
// }

console.log(radixSort([23, 245, 5467, 12]));
