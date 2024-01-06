// capitalizeWords
// Write a recursive function called capitalizeWords.
// Given an array of words, return a new array containing each word capitalized.

// function capitalizeWords(wordsArr) {
//   // result array that will be return
//   const result = [];

//   // base case
//   if (!wordsArr.length) return result;

//   result.push(wordsArr[0].toUpperCase());

//   // recursive call
//   return result.concat(capitalizeWords(wordsArr.slice(1)));
// }

// With Helper Method;

function capitalizeWords(wordsArr) {
  // results array which will be returned
  const result = [];

  function recurse(arr) {
    // base case
    if (!arr.length) return;
    result.push(arr[0].toUpperCase());
    // recursive call
    return recurse(arr.slice(1));
  }
  recurse(wordsArr);
  return result;
}

// console.log(capitalizeWords(["cat", "dog", "lion", "elephant", "zebra"]));
