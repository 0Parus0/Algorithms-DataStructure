// flatten
// Write a recursive function called flatten which accepts an array of arrays
// and returns a new array with all values flattened.

// function flatten(arr) {
//   // new array that will be returned
//   let result = [];
//   for (let value of arr) {
//     if (!(value instanceof Array)) result.push(value);
//     else result = result.concat(flatten(value));
//   }
//   return result;
// }

// With helper method

function flatten(arr) {
  // new array that will be returned
  const result = [];
  // helper method
  function recurse(newArr) {
    for (let value of newArr) {
      if (!(value instanceof Array)) result.push(value);
      else recurse(value);
    }
  }
  recurse(arr);
  return result;
}

console.log(flatten([1, 2, 3, [4, 5]])); // [1, 2, 3, 4, 5]
console.log(flatten([1, [2, [3, 4], [[5]]]])); // [1, 2, 3, 4, 5]
console.log(flatten([[1], [2], [3]])); // [1, 2, 3]
console.log(flatten([[[[1], [[[2]]], [[[[[[[3]]]]]]]]]])); // [1, 2, 3]
