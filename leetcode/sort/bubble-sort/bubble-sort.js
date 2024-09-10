/**
 * ***********************
 *  Bubble Sort:
 *  Pseudo code:
 *  Start looping from with a variable called i the end of the array towards the beginning 
 * Start an inner loop with a variable called j from the beginning until i - 1
 * If arr[j] is greater than arr[j + 1], swap those two values!
 * Return the sorted array
 * ***********************
*/


function swap5(arr, idx1, idx2) {
  let temp = arr[idx1];
  arr[idx1] = arr[idx2];
  arr[idx2] = temp;
}

function swap6(arr, idx1, idx2) {
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

// function bubbleSortNaive(arr) {
//   for(let i = 0; i < arr.length; i++) {
//     for(let j = 0; j < arr.length; j++) {
//       console.log(arr, arr[j], arr[j + 1]);
//       if(arr[j] > arr[j + 1]) {
//         // swap
//         let temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp
//       }
//     }
//   }
//   return arr
// }


// function bubbleSortOptimize(arr) {
//   for(let i = arr.length; i > 0 ; i--) {
//     for(let j = 0; j < i -1; j++) {
//       if(arr[j] > arr[j + 1]) {
//         // swap
//         let temp = arr[j];
//         arr[j] = arr[j + 1];
//         arr[j + 1] = temp
//       }
//     }
//   }
//   return arr
// }



function bubbleSortSupOptimize(arr) {
  let noSwaps;
  for(let i = arr.length; i > 0 ; i--) {
    noSwaps = true;
    for(let j = 0; j < i -1; j++) {
      console.log(arr, arr[j], arr[j + 1]);

      if(arr[j] > arr[j + 1]) {
        // swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        noSwaps = false;
      }
    }
    if(noSwaps) break;
  }
  return arr
}


console.log(bubbleSortSupOptimize([8,1,2,3,4,]));