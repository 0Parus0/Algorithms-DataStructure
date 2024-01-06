/**
 * *****************
 * Quick Sort:
 * *****************
 * *** Pivot Helper Function  Pseudo Code ***
 * The runtime of quick sort depends in part on how one selects the pivot
 * Ideally, the pivot should be chosen so that it's roughly the median value in the data set you're sorting
 * Write a function, it will take three arguments: an array, a start index, and an end index(these can default to 0 and the array length minus 1, respectively).
 * Grab the pivot from the start of the array
 * Store the current pivot index in a variable(this will keep track of where the pivot should end up).
 * Loop through the array from the start until the end
 *    If the pivot is greater than the current element, increment the pivot index variable and then swap the current element with the element at the pivot index
 * Swap the starting element(i.e. the pivot) with the pivot index.
 * Return the pivot index
 * *******************
 * *** QuickSort Pseudo Code ***
 * Call the pivot helper on the array
 * When the helper returns to you the updated pivot index, recursively call the pivot helper on the subarray to the left of that index, and the subarray to the right of that index
 * Your base case occurs when you consider a subarray with less than 2 elements
 * ****************
 */

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function pivot(arr, first = 0) {
  let pivot = arr[first];
  let pivotIdx = first;
  for (let i = first + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      pivotIdx++;
      swap(arr, pivotIdx, i);
    }
  }
  swap(arr, first, pivotIdx);
  return pivotIdx;
}

console.log(pivot([4, 8, 2, 1, 5, 7, 6, 3]));

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIdx = pivot(arr, left);
    quickSort(arr, left, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, right);
  }
  return arr;
}
// function pivot(arr, start = 0, end = arr.length - 1) {
//   let pivot = arr[start];
//   let swapIdx = start;

//   for (let i = start + 1; i < arr.length; i++) {
//     if (pivot > arr[i]) {
//       swapIdx++;
//       swap(arr, swapIdx, i);
//     }
//   }
//   swap(arr, start, swapIdx);
//   return swapIdx;
// }

// //  console.log(pivot([4,8,2,1,5,7,6,3]));

// function quickSort(arr, left = 0, right = arr.length - 1) {
//   if (left < right) {
//     let pivotIndex = pivot(arr, left, right);
//     // left;
//     quickSort(arr, left, pivotIndex - 1);
//     // right
//     quickSort(arr, pivotIndex + 1, right);
//   }
//   return arr;
// }

console.log(quickSort([4, 8, 2, 1, 100, -345, 0, 77, 3]));
