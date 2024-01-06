/*
Given an array of integers greater than zero, find if it is possible to split it in two subarrays (without reordering the elements), such that the sum of the two subarrays is the same. Print the two subarrays.

Examples : 

Input : Arr[] = { 1 , 2 , 3 , 4 , 5 , 5  }
Output :  { 1 2 3 4 } 
          { 5 , 5 }

Input : Arr[] = { 4, 1, 2, 3 }
Output : {4 1}
         {2 3}

Input : Arr[] = { 4, 3, 2, 1}
Output : Not Possible
Asked In : Facebook interview 

A Simple solution is to run two loop to split array and check it is possible to split array into two parts such that sum of first_part equal to sum of second_part. 
*/
function arrSplitEqualParts(arr) {
  let n = arr.length;

  let sum = arr.reduce((acc, el) => acc + el, 0);
  let prefix = 0;
  for (let i = 0; i < n; i++) {
    prefix += arr[i];
    if (prefix * 2 === sum) return true;
  }
  return false;

  /* Brute Force */
  //   let left = arr[0];
  //   for (let i = 1; i < n; i++) {
  //     let right = 0;
  //     for (let j = i; j < n; j++) {
  //       right += arr[j];
  //     }
  //     // console.log({ left, right });
  //     if (left === right) return true;
  //     left += arr[i];
  //   }
  //   return false;
}

let arr = [4, 1, 2, 8];
console.log(arrSplitEqualParts(arr));
