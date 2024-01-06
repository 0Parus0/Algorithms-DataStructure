// /**
// |--------------------------------------------------
//  Write a function called same, which accepts two arrays.
//  The function should return true if every value in the array has it's corresponding value squared in the second array.
//  The frequency of values must be the same.
//   same([1,2,3], [4,1,9]) --> true
//   same([1,2,3], [1,9]) --> false
//   same([1,2,1], [4,4,1]) --> false (frequency or occurrence should be same)

// |--------------------------------------------------
// */

// // A NAIVE SOLUTION

// function sameNaive(arr1, arr2) {
//   if(arr1.length !== arr2.length) {
//     return false;
//   }
//   for (let i = 0; i < arr1.length; i++) {
//     let correctIndex = arr2.indexOf(arr1[i] ** 2);
//     if(correctIndex === -1) {
//       return false
//     }
//     console.log(arr2);
//     arr2.splice(correctIndex, 1);
//   }
//   return true;
// }



// // console.log(sameNaive([1,2,3,4], [4,1,16,9]));
// // console.log(sameNaive([1,2,2,4], [4,1,16,9]));
// // console.log(sameNaive([1,2,2,4], [4,1,16,4]));

// function sameFreqCount(arr1, arr2) {
//   if(arr1.length !== arr2.length) {
//     return false
//   }
//   let frequencyCounter1 = {};
//   let frequencyCounter2 = {};
//   for(let val of arr1) {
//     frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
//   }
//   for(let val of arr2) {
//     frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
//   }

//   console.log(frequencyCounter1);
//   console.log(frequencyCounter2);

//   for(let key in frequencyCounter1) { // comparing both objects keys
//     if(!(key ** 2 in frequencyCounter2)) {
//       return false;
//     }
//     if(frequencyCounter2[key ** 2] !== frequencyCounter1[key]) { // comparing both objects values
//       return false;
//     }
//   }
 
//   return true
// };


// // console.log(sameFreqCount([1,2,3,4], [4,1,16,9]));
// // console.log(sameFreqCount([1,2,5,4], [4,1,16,9]));
// // console.log(sameFreqCount([1,2,2,4], [1,1,16,4]));


// /**
// |--------------------------------------------------
// | --------------ANAGRAMS----------------
// Given two strings, write a function to determine if the second string is an anagram of the first.
// A word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.
// validAnagram('', '') --> true
// validAnagram('aaz', 'zza') --> false --> frequency should be same as well
// validAnagram('car', 'arc') --> true
// |--------------------------------------------------
// */

// function validAnagram(str1, str2) {
//   if(str1.length !== str2.length) return false;
//   const result = {};

//   for(let char of str1) {
//     // result[char] ? result[char] +=1 : result[char] = 1
//     result[char] = (result[char] || 0) + 1;
//   }

//   for (let char of str2) {
//     if(!result[char]) {
//       return false;
//     } else {
//       result[char] -=1
//     }
//   }
//   return true;
// };

// console.log(validAnagram('abca', 'abba'));
// console.log(validAnagram('aaz', 'zza'));
// console.log(validAnagram('car', 'arc'));
// console.log(validAnagram('', ''));

function sameNaive(arr1, arr2) {
  if(arr1.length !== arr2.length || !arr1.length && !arr2.length) return false;


  for(let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if(correctIndex === -1) return false;
    arr2.splice(correctIndex, 1);
  }
  return true;
}

// console.log(sameNaive([1,3,4], [1,9, 16]));
// console.log(sameNaive([1,3,4], [1,9, 8,16]));
// console.log(sameNaive([], []));
// console.log(sameNaive([1,2], []));

function sameFreqCount(arr1, arr2) {
  if(arr1.length !== arr2.length || !arr1.length && !arr2.length) return false;
  const freqCount = {};
  // const freqCount2 = {};
  
  for(let val of arr2) {
    freqCount[val] = (freqCount[val] || 0 ) + 1;
  }
  // for(let val of arr2) {
  //   freqCount2[val] = (freqCount2[val] || 0) + 1;
  // }

  // for(let key in freqCount1) {
  //   if(!(key ** 2) in freqCount2) return false;
  //   if(freqCount1[key] !== freqCount2[key ** 2] ) return false;   
  // }

  // for(let key in freqCount1) {
  //   if(!freqCount2.hasOwnProperty(key ** 2)) return false;
  //   if(freqCount1[key] !== freqCount2[key ** 2]) return false
  // }

    for(let val of arr1) {
      if(!freqCount[val ** 2]) return false;
      else{ freqCount[val ** 2] -= 1}
    }
  return true;
}

console.log(sameFreqCount([1,3,4], [1,9,16]));
console.log(sameFreqCount([], []));
console.log(sameFreqCount([1,2], []));
console.log(sameFreqCount([1,2,1], [1,4,4]));



function validAnagram(str1, str2) {
  if((str1.length !== str2.length) || (!str1.length && !str2.length)) return false;

  const lookup = {};

  for (let char of str1) {
    lookup[char] ? lookup[char] += 1 : lookup[char] = 1;
  }

  for ( let char of str2) {
    if(!lookup[char]) return false;
    else { lookup[char] -= 1}
  }
  return true;
}


// console.log(validAnagram('abca', 'abba'));
// console.log(validAnagram('aaz', 'zza'));
// console.log(validAnagram('car', 'arc'));
// console.log(validAnagram('', ''));
