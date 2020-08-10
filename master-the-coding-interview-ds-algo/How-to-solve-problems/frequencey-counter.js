/**
|--------------------------------------------------
| Naive Solution 1
|--------------------------------------------------
*/

function containsCommonItem (arr1, arr2) {
  if(!arr1.length || !arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    for(let j = 0; j < arr2.length; j++) {
      if(arr1[i] === arr2[j]) return true;
    }
  }
  return false;
} /*  O(a * b) */

/**
|--------------------------------------------------
| Efficient Solution 1
|--------------------------------------------------
*/

function containsCommonItem1(arr1, arr2) {
  if(!arr1.length || !arr2.length) return false;

  let map = {};
  for( let i = 0; i < arr1.length; i++) {
    if(!map[i]) {
      const item = arr1[i];
      map[item] = true;
    }
  }

  for ( let j = 0; j < arr2.length; j++) {
    if(map[arr2[j]]) return true;
  }
  return false;
}

/**
|--------------------------------------------------
| Efficient Solution and elegant
|--------------------------------------------------
*/


function containsCommonItem2(arr1, arr2) {
  if(!arr1.length || !arr2.length) return false;

  let map = {};
  for( let item of arr1) {
    if(!map[item]) {
      map[item] = true;
    }
  }

  for ( let item of arr2) {
    if(map[item]) return true;
  }
  return false;
}




console.log(containsCommonItem2(['a', 'b', 'n'], ['q','l','m']));