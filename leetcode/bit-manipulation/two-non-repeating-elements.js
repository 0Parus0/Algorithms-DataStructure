/* Find two non repeating elements in an array where every elements repeats twice */
// This function sets the values of
// *x and *y to non-repeating elements
// in an array arr[] of size n
function UniqueNumbers2(arr, n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    // Xor all the elements of the array
    // all the elements occurring twice will
    // cancel out each other remaining
    // two unique numbers will be xored
    sum = sum ^ arr[i];
  }

  // Bitwise & the sum with it's 2's Complement
  // Bitwise & will give us the sum containing
  // only the rightmost set bit
  let rsbm = sum & -sum;

  // sum1 and sum2 will contains 2 unique
  // elements initialized with 0 box
  // number xored with 0 is number itself
  let sum1 = 0;
  let sum2 = 0;

  // Traversing the array again
  for (let i = 0; i < arr.length; i++) {
    // Bitwise & the arr[i] with the sum
    // Two possibilities either result == 0
    // or result > 0
    if ((arr[i] & rsbm) > 0) {
      // If result > 0 then arr[i] xored
      // with the sum1
      sum1 = sum1 ^ arr[i];
      console.log({ sum1 });
    } else {
      // If result == 0 then arr[i]
      // xored with sum2
      sum2 = sum2 ^ arr[i];
      console.log({ sum2 });
    }
  }

  // Print the two unique numbers
  console.log("The non-repeating " + "elements are " + sum1 + " and " + sum2);
}

arr = [2, 3, 8, 6, 11, 2, 3, 11];
let n = arr.length;

UniqueNumbers2(arr, n);
