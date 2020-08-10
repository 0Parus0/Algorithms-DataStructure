/**
|--------------------------------------------------
| HELPER METHOD RECURSION;
*******************************************
function outer(input) {
  var outerScopedVariable = [];
  
  function helper(helperInput) {
    // modify the outerScopedVariable
    helper(helperInput--);
  }
  helper(input);
  return outerScopedVariable
}
|--------------------------------------------------
 **/

// function collectOddValues(arr) {
//   let result = [];

//   function helper(helperInput) {
//     if(helperInput.length === 0) return;
//     if(helperInput[0] % 2 !== 0) {
//       result.push(helperInput[0]);
//     }
//     helper(helperInput.slice(1));
//   }
//   helper(arr);
//   return result;
// }

// Pure Recursion PR;

// function collectOddValuesPR(arr) {
//   let newArr = [];
//   if(arr.length === 0) return newArr;
//   if(arr[0] % 2 !== 0) newArr.push(arr[0]);
//   newArr = newArr.concat(collectOddValuesPR(arr.slice(1)));
//   return newArr;
// }

// console.log(collectOddValuesPR([1,2,3,4,5,9,0,5,3]));

function collectOddValues(arr) {
  const result = [];

  function helper(helperInput) {
    console.log(helperInput);
    if(!helperInput.length) return;
    if(helperInput[0] % 2 !== 0) result.push(helperInput[0]);
    helper(helperInput.slice(1));
  }
  helper(arr);
  return result;
}

const numArray = [1,2,3,4,5,9,0,5,31,22,768,09];

// console.log(collectOddValues(numArray));

// Pure Recursion PR

function collectOddValuesPR(arr) {
  let result = [];

  if(!arr.length)return result;
  if(arr[0] % 2 !== 0) result.push(arr[0]);
  result = [...result,...(collectOddValuesPR(arr.slice(1)))]; 
  // result = result.concat(collectOddValuesPR(arr.slice(1)));

  return result;
  
}

// console.log(collectOddValuesPR(numArray));


/**
 * *****************
 * Pure Recursion:
 * *** For arrays, use methods like slice, the spread operator, and concat that make copies of arrays so you don't mutate them
 * *** Remember that strings are immutable so yuo will need to use methods like slice, substr, or substring to make copies of strings
 * *** To make copies of objects use Object.assign, or the spread operator
 * *****************
 */



