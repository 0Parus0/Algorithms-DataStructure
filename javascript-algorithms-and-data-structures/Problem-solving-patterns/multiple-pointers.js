// /**
// |--------------------------------------------------
// |------------- MULTIPLE POINTERS--------------------
// Write a function called sumZero which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.
// sumZero([-3,-2,-1,0,1,2,3]) // [-3,3];
// sumZero([-2,0,1,3]) // undefined
// sumZero([1,2,3]) // undefined
// |--------------------------------------------------
// */

// /**
// |--------------------------------------------------
// | ------------------NAIVE SOLUTION-----------------
// |--------------------------------------------------
// */

// function sumZeroNaive(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = i + 1; j < arr.length; j++ ) {
//       if(arr[i] + arr[j] === 0) {
//         return [arr[i], arr[j]]
//       }
//     }
//   }
// }

// // console.log(sumZeroNaive([-4,-3,-2,-1,0,1,5,8]));
// // console.log(sumZeroNaive([-4,-3,-2,-1,0,1,2,5]));
// // console.log(sumZeroNaive([-4,-3,-2,-1,0,1,3]));
// // console.log(sumZeroNaive([-4,-3,-2,-1,0,5,8,9]));

// /**
// |--------------------------------------------------
// | ---------------MULTIPLE-POINTER-SOLUTION
// |--------------------------------------------------
// */

// function sumZero(arr) {
//   let left = 0;
//   let right = arr.length - 1;
//   while(left < right) {
//     let sum = arr[left] + arr[right];
//     if(sum === 0) {
//       return [arr[left], arr[right]];
//     } else if(sum > 0) {
//       right --;
//     } else {
//       left ++;
//     }
//   }
// }


// // console.log(sumZero([-4,-3,-2,-1,0,1,5,8]));
// // console.log(sumZero([-4,-3,-2,-1,0,1,2,5]));
// // console.log(sumZero([-4,-3,-2,-1,0,1,3]));
// // console.log(sumZero([-4,-3,-2,-1,0,5,8,9]));


// /**
// |--------------------------------------------------
// | ------------------countUniqueValues----------
// Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. There can be negative numbers in the array, but it will always be sorted,
// countUniqueValues([1,1,1,1,1,2]) // 2
// countUniqueValues([1,2,3,3,3,3,4,4,4,4,5,6,7]) // 7
// countUniqueValues([1,2,3,4,5,8,8,8,8]) // 6
// |--------------------------------------------------
// */

// function countUniqueValues(arr) {
//   if (arr.length === 0) return 0;
//   let i = 0;
//   for (let j = 1; j < arr.length; j++){
//     if (arr[i] !== arr[j]) {
//       i++;
//       arr[i] = arr[j]
//     }
//     console.log(i, j);
//   }
//   return i + 1;
// }

// console.log(countUniqueValues([1,1,1,2,3,4,4,7]));
// console.log(countUniqueValues([7, 99, 101, 3030, 3030, 3030, 3067,3067,3067,3067,4000,4000]));
// console.log(countUniqueValues([]));

function sumZeroNaive(arr) {
  if(!arr || !arr.length) return 'please provide a sorted array '
  for(let i = 0; i < arr.length; i++) {
    for(let j = i + 1; j < arr.length; j++) {
      if(arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}

// console.log(sumZeroNaive([-4,-3,-2,-1,0,1,5,8]));
// console.log(sumZeroNaive([-4,-3,-2,-1,0,1,2,5]));
// console.log(sumZeroNaive([-4,-3,-2,-1,0,1,3]));
// console.log(sumZeroNaive([-4,-3,-2,-1,0,5,8,9]));

function sumZero(arr) {
  if(!arr || !arr.length) return 'please provide a sorted array '
  let left = 0;
  let right = arr.length - 1;
  while(left < right) {
    let sum = arr[left] + arr[right];
    if(sum === 0) {
      return [arr[left], arr[right]];
    } else if(sum > 0) {
      right --;
    } else {
      left ++;
    }
  }
}


// console.log(sumZero([-4,-3,-2,-1,0,1,5,8]));
// console.log(sumZero([-4,-3,-2,-1,0,1,2,5]));
// console.log(sumZero([-4,-3,-2,-1,0,1,3]));
// console.log(sumZero([-4,-3,-2,-1,0,5,8,9]));
// console.log(sumZero([]));
// console.log(sumZero());


function countUniqueValuesNaive(arr) {
  if(!arr || !arr.length) return 'please provide a sorted array ';
  const uniqueValues = {};

  for (let i = 0; i < arr.length; i++) {
    uniqueValues[arr[i]] ? uniqueValues[arr[i]] += 1 : uniqueValues[arr[i]] = 1;
    
  }
 const uniqueStrArray =  Object.keys(uniqueValues);
 return uniqueStrArray.length;

 
};

// console.log(countUniqueValuesNaive([1,1,1,1,1]));
// console.log(countUniqueValuesNaive([1,2,3,4]));
// console.log(countUniqueValuesNaive([-4,-3,-2,1,3,5,7]));
// console.log(countUniqueValuesNaive([1,4,4,4,4,4]));


function countUniqueValues(arr) {
  if(!arr.length) return 0;
  let i = 0
  for(let j = 1; j < arr.length; j++) {
    if(arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  console.log(arr);
  return i + 1;
}


// console.log(countUniqueValues([1,1,1,1,1]));
// console.log(countUniqueValues([1,2,3,4]));
// console.log(countUniqueValues([-4,-3,-2,1,3,5,7]));
// console.log(countUniqueValues([1,4,4,4,4,4]));


function maxSubArraySumNaive(arr, num) {
  if(num > arr.length) return null;

  let max = -Infinity;

  for (let i = 0; i < arr.length -num + 1; i++) {
    temp = 0;
    for(let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    // console.log(temp, max)
    if(temp > max) max = temp;
  }
  return max;
}

// console.log(maxSubArraySum([1,2,5,7], 2))
// console.log(maxSubArraySum([1,223,54,7,33,89,77,34,567,1,2,3,4,11], 5))
// console.log(maxSubArraySum([1,2,5,7,3,4,5,6], 4))
// console.log(maxSubArraySum([-1,-2,-5,-7,-3,-4,-5,-6], 4))

function maxSubArraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if(arr.length < num ) return null;

  for(let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for(let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    console.log(arr[i -num]);
    maxSum = Math.max(maxSum, tempSum);
  }

  return maxSum;
}

console.log(maxSubArraySum([1,2,5,7,3,4,5,6], 4))
// console.log(maxSubArraySum([-1,-2,-5,-7,-3,-4,-5,-6], 4))
