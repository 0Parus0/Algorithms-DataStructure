/* Write a function called same, which accepts two arrays. The function should return true if every value in the array has it's corresponding value squared in the second array. The frequency of values must be the same */

function same(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  // Frequency Counter pattern 1;
  const freqCount1 = {};
  const freqCount2 = {};
  for (let num of arr1) {
    freqCount1[num] = (freqCount1[num] || 0) + 1;
  }
  for (let num of arr2) {
    freqCount2[num] = (freqCount2[num] || 0) + 1;
  }

  for (let key in freqCount1) {
    if (!(key ** 2) in freqCount2) return false;
    if (freqCount2[key ** 2] !== freqCount1[key]) return false;
  }
  return true;

  // Frequency Counter Pattern 2
  // const map1 = new Map();
  // const map2 = new Map();

  // for (let num of arr1) {
  //   if (map1.has(num)) {
  //     map1.set(num, map1.get(num) + 1);
  //   } else {
  //     map1.set(num, 1);
  //   }
  // }
  // for (let num of arr2) {
  //   if (map2.has(num)) {
  //     map2.set(num, map2.get(num) + 1);
  //   } else {
  //     map2.set(num, 1);
  //   }
  // }
  // for (let [key, value] of map1.entries()) {
  //   // console.log({ value }, { key });
  //   if (!map2.has(key ** 2)) return false;
  //   if (map2.get(key ** 2) !== value) return false;
  // }

  // return true;

  // Naive Solution 1
  // for (let i = 0; i < arr1.length; i++) {
  //   // console.log({ i });
  //   for (let j = 0; j < arr2.length; j++) {
  //     // console.log(arr1[i], arr2[j]);
  //     if (arr1[i] ** 2 === arr2[j]) {
  //       arr2.splice(j, 1);
  //     }
  //     // console.log({ j });
  //   }
  // }
  // // console.log(arr1, arr2);
  // if (arr2.length) return false;
  // return true;

  // Naive Solution 2
  // for (let i = 0; i < arr1.length; i++) {
  //   console.log({ arr2 }, { arr1 });
  //   if (arr2.indexOf(arr1[i] ** 2) === -1) return false;

  //   arr2.splice(arr2.indexOf(arr1[i] ** 2), 1);
  // }
  // return true;
}

// console.log(same([1, 3, 2, 2, 3], [4, 9, 4, 9, 1])); // true
// console.log(same([1, 4, 9], [16, 25])); // false
// console.log(same([1, 4, 9], [13, 16, 25])); // false
// console.log(same([1, 2, 1], [1, 1, 4])); // true

/**********************************************************************************/

/* Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman, */

/* Optimize Solution 1 */

function anagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  let myObj = {};
  for (let char of str1) {
    myObj[char] = (myObj[char] || 0) + 1;
  }
  // console.log(myObj);

  for (let char of str2) {
    if (myObj[char]) {
      myObj[char] = myObj[char] - 1;
    } else {
      return false;
    }
  }
  return true;
}

/* Optimize Solution 2 */
// function anagram(str1, str2) {
//   if (str1.length !== str2.length) return false;
//   const myMap = new Map();
//   for (let char of str1) {
//     if (myMap.has(char)) {
//       myMap.set(char, myMap.get(char) + 1);
//     } else {
//       myMap.set(char, 1);
//     }
//   }

//   // console.log(myMap);
//   for (let char of str2) {
//     if (myMap.has(char)) {
//       myMap.set(char, myMap.get(char) - 1);
//     } else {
//       return false;
//     }
//   }
//   return true;
// }

/* Naive Solution */
// function anagram(str1, str2) {
//   if (str1.length !== str2.length) return false;
//   for (let i = 0; i < str1.length; i++) {
//     if (!str2.includes(str1[i])) return false;
//   }
//   return true;
// }

console.log(anagram("aab", "aab"));
console.log(anagram("", ""));
console.log(anagram("name", "main"));
console.log(anagram("twistwithtext", "textwithtwist"));
console.log(anagram("cinema", "iceman"));
console.log(anagram("something", "somethin"));
