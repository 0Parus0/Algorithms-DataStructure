// capitalizeFirst
// Write a recursive function called capitalizeFirst.
// Given an array of strings, capitalize the first letter of each string in the array.

// function capitalizeFirstLetter(strArr) {
//   // result array that will be returned
//   const result = [];

//   // base case
//   if (!strArr.length) return result;
//   result.push(strArr[0][0].toUpperCase() + strArr[0].slice(1));

//   // recursive call

//   return result.concat(capitalizeFirstLetter(strArr.slice(1)));
// }

// With Helper Method
function capitalizeFirstLetter(strArr) {
  // results array that will be returned
  const result = [];

  function recursive(arr) {
    // base case
    if (!arr.length) return;
    result.push(arr[0][0].toUpperCase() + arr[0].slice(1));
    return recursive(arr.slice(1));
  }
  recursive(strArr);
  return result;
}

// console.log(capitalizeFirstLetter(["cat", "dog", "lion", "elephant", "zebra"]));
