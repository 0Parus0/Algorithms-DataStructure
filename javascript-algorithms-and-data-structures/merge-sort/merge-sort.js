/**
 * **************************
 * Merge Sort Pseudo Code
 * **************************
 *
 * ********************************
 * *** Step 1 *** Merge Function ***
 * *********************************
 * In order to implement merge sort, it's useful to first implement a function responsible for merging two sorted arrays.
 * Given two arrays which are sorted, this helper function should create a new array which is also sorted, and consists of all of the elements in the two input arrays.
 * This function should run in O(n + m) time and O(n + m) space and should not modify the parameters passed to it.
 * ****** Pseudo Code ******
 * Create an empty array, take a look at the smallest values in each input array
 * While there are still values we haven't looked at...
 *    If the value in the first array is smaller than the value in the second array, push the value in the first array into our results and move on to the next value in the first array.
 *    If the value in the first array is larger than the value in the second array, push the value in the second array into our results and move on to the next value in the second array
 *    Once we exhaust one array, push in all remaining values from the other array.
 * ************************************
 * *** Step 2 *** Merge Sort ***
 * ************************************
 * Break up the array into halves until you have arrays that are empty or have one element
 * Once you have smaller sorted arrays, merge those arrays with other sorted arrays until you are back at the full length of the array.
 * Once the arrays has been merged back together, return the merged(and sorted!) array.
 *
 */

//  let data = Array.from({length: 100000}, () => Math.random());

//  console.log(data);

function merge(arr1, arr2) {
  const result = [];
  let i = 0,
    j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }
  return result;
}

console.log(merge([1, 2, 2, 10, 50], [2, 14, 99, 100]));

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
console.log(mergeSort([999, 1, 10, 50, 2, -345, 0, 14, 99, 100]));

// function merge(arr1, arr2) {
//   let results = [];
//   let i = 0;
//   let j = 0;
//   while( i < arr1.length && j < arr2.length) {
//     if(arr2[j] > arr1[i]) {
//       results.push(arr1[i]);
//       i++;
//     } else {
//       results.push(arr2[j]);
//       j++;
//     }
//   }

//   while(i < arr1.length){
//     results.push(arr1[i]);
//     i++
//   }

//   while(j < arr2.length) {
//     results.push(arr2[j]);
//     j++
//   }
//   return results;
// }

// // console.log(merge([1,10,50], [2,14,99,100]));

// function mergeSort(arr) {
//   if(arr.length <= 1) return arr;
//   const mid = Math.floor(arr.length /2);
//   const left = mergeSort(arr.slice(0, mid));
//   const right = mergeSort(arr.slice(mid));
//   return merge(left, right);
// }
