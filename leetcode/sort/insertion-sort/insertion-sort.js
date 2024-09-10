/**
 * ***********************
 *  Insertion Sort Pseudo Code:
 * ***********************
 * Start by picking the second element in the array
 * Now compare the second element with the one before it and swap if necessary
 * Continue to the next element and if it is in the correct order, iterate through the sorted portion(i.e the left side) to place the element in the correct place.
 * Repeat until the array is sorted.
 */

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i - 1;
    let currentVal = arr[i];
    while (j > -1 && arr[j] > currentVal) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentVal;
  }
  // for (let i = 1; i < arr.length; i++) {
  //   let currentVal = arr[i];
  //   let j = i - 1;
  //   for (; j >= 0 && arr[j] > currentVal; j--) {
  //     arr[j + 1] = arr[j];
  //   }
  //   arr[j + 1] = currentVal;
  // }
  return arr;
}

// function insertionSort(arr) {
//   for (let i = 1; i < arr.length; i++) {
//     let currentVal = arr[i];
//     let j;
//     for (j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
//       arr[j + 1] = arr[j];
//       console.log("innerloop", arr);
//     }
//     arr[j + 1] = currentVal;
//     console.log("outerloop", arr);
//   }
//   return arr;
// }

console.log(insertionSort([2, 1, 9, 76, 4]));
